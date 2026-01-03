#!/usr/bin/env node
/**
 * Asset audit for Next.js public/ assets.
 * - Finds exact duplicates by SHA-256
 * - Finds likely-unused public assets by searching references in src/ + README.md
 * - Finds referenced-but-missing assets (e.g. /foo.png referenced in code but not present in public/)
 */

import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const repoRoot = process.cwd();
const publicDir = path.join(repoRoot, 'public');

function parseArgs(argv) {
  const args = {
    moveUnused: false,
    dryRun: false,
    trashDirName: '_trash',
  };

  for (const raw of argv) {
    if (raw === '--move-unused' || raw === '--trash') args.moveUnused = true;
    // Prefer --simulate when running via npm (npm itself consumes --dry-run)
    else if (raw === '--simulate' || raw === '--dry-run') args.dryRun = true;
    else if (raw.startsWith('--trash-dir=')) {
      const value = raw.slice('--trash-dir='.length).trim();
      if (value) args.trashDirName = value.replace(/^\/+|\/+$/g, '');
    }
  }

  return args;
}

const textExtensions = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.json',
  '.md',
  '.css',
  '.scss',
  '.sass',
  '.html',
  '.txt',
]);

function toPosix(p) {
  return p.split(path.sep).join('/');
}

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function listFilesRecursive(dir) {
  const results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await listFilesRecursive(fullPath)));
    } else if (entry.isFile()) {
      results.push(fullPath);
    }
  }
  return results;
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function moveFileSafely(srcPath, destPath) {
  const destDir = path.dirname(destPath);
  await ensureDir(destDir);

  // Avoid overwriting existing files in trash.
  let finalPath = destPath;
  const ext = path.extname(destPath);
  const base = destPath.slice(0, destPath.length - ext.length);
  let counter = 1;
  while (await pathExists(finalPath)) {
    finalPath = `${base}__dup${counter}${ext}`;
    counter += 1;
  }

  await fs.rename(srcPath, finalPath);
  return finalPath;
}

async function readAllTextFiles(roots) {
  const files = [];

  for (const root of roots) {
    const abs = path.isAbsolute(root) ? root : path.join(repoRoot, root);
    if (!(await pathExists(abs))) continue;

    const stat = await fs.stat(abs);
    if (stat.isFile()) {
      files.push(abs);
      continue;
    }

    const listed = await listFilesRecursive(abs);
    for (const f of listed) {
      const ext = path.extname(f).toLowerCase();
      if (textExtensions.has(ext)) files.push(f);
    }
  }

  const contentsByFile = new Map();
  await Promise.all(
    files.map(async (f) => {
      try {
        const content = await fs.readFile(f, 'utf8');
        contentsByFile.set(f, content);
      } catch {
        // ignore unreadable text files
      }
    }),
  );

  return contentsByFile;
}

function findMatchesInText(contentsByFile, needles) {
  const matchedFiles = [];
  for (const [file, content] of contentsByFile) {
    for (const needle of needles) {
      if (!needle) continue;
      if (content.includes(needle)) {
        matchedFiles.push(file);
        break;
      }
    }
  }
  return matchedFiles;
}

async function sha256File(filePath) {
  const data = await fs.readFile(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

function normalizeWebPath(webPath) {
  // Ensure it begins with / and uses forward slashes.
  const withLeading = webPath.startsWith('/') ? webPath : `/${webPath}`;
  return withLeading.replace(/\\/g, '/');
}

function buildNeedlesForPublicAsset(webPath) {
  const normalized = normalizeWebPath(webPath);
  const noLeadingSlash = normalized.slice(1);
  const encoded = encodeURI(normalized);

  const needles = new Set([
    normalized,
    encoded,
    noLeadingSlash,
    `./${noLeadingSlash}`,
  ]);

  return [...needles];
}

function extractLikelyAssetRefs(text) {
  // Capture /foo/bar.ext in strings, url(), tailwind bg-[url('...')], etc.
  const assetExts =
    '(?:png|jpe?g|webp|svg|gif|ico|mp4|mov|webm|glb|gltf|usdz|pdf)';

  const absoluteRe = new RegExp(
    String.raw`(?:^|[\s"'\(\[])(\/[^\s"'\)\]]+?\.${assetExts})(?=$|[\s"'\)\]])`,
    'gi',
  );

  // Also capture simple relative refs like ./founders/foo.png
  const relativeRe = new RegExp(
    String.raw`(?:^|[\s"'\(\[])(\.?\.\/[^\s"'\)\]]+?\.${assetExts})(?=$|[\s"'\)\]])`,
    'gi',
  );

  const foundAbs = new Set();
  const foundRel = new Set();

  for (const match of text.matchAll(absoluteRe)) {
    foundAbs.add(match[1]);
  }
  for (const match of text.matchAll(relativeRe)) {
    foundRel.add(match[1]);
  }

  return {
    absolute: [...foundAbs],
    relative: [...foundRel],
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!(await pathExists(publicDir))) {
    console.error(`No public/ directory found at: ${publicDir}`);
    process.exitCode = 1;
    return;
  }

  const textContents = await readAllTextFiles(['src', 'README.md']);

  const publicFiles = await listFilesRecursive(publicDir);
  const publicAssets = publicFiles
    .filter((p) => !p.endsWith(`${path.sep}.DS_Store`))
    .map((absPath) => {
      const rel = toPosix(path.relative(publicDir, absPath));
      const webPath = normalizeWebPath(rel);
      return { absPath, rel, webPath };
    })
    // Never consider trash contents as "public assets".
    .filter((a) => !a.rel.startsWith(`${args.trashDirName}/`));

  // 1) Find likely-unused assets (heuristic search)
  const used = [];
  const unused = [];

  for (const asset of publicAssets) {
    const needles = buildNeedlesForPublicAsset(asset.webPath);
    const matches = findMatchesInText(textContents, needles);
    if (matches.length > 0) {
      used.push({
        ...asset,
        referencedIn: matches
          .slice(0, 10)
          .map((p) => toPosix(path.relative(repoRoot, p))),
        referencedInCount: matches.length,
      });
    } else {
      unused.push(asset);
    }
  }

  // 2) Find referenced-but-missing absolute asset paths (e.g. /evtol-og-image.webp)
  const allAbsRefs = new Map();
  const allRelRefs = new Map();

  for (const [file, content] of textContents) {
    const refs = extractLikelyAssetRefs(content);
    const relFile = toPosix(path.relative(repoRoot, file));

    for (const ref of refs.absolute) {
      const list = allAbsRefs.get(ref) ?? [];
      list.push(relFile);
      allAbsRefs.set(ref, list);
    }

    for (const ref of refs.relative) {
      const list = allRelRefs.get(ref) ?? [];
      list.push(relFile);
      allRelRefs.set(ref, list);
    }
  }

  const missingAbsoluteRefs = [];
  for (const [ref, files] of allAbsRefs) {
    const absOnDisk = path.join(publicDir, ref.slice(1));
    const absDecodedOnDisk = path.join(
      publicDir,
      decodeURI(ref.slice(1)),
    );
    if (!(await pathExists(absOnDisk)) && !(await pathExists(absDecodedOnDisk))) {
      missingAbsoluteRefs.push({
        ref,
        referencedIn: files.slice(0, 10),
        referencedInCount: files.length,
      });
    }
  }

  // Note: relative refs might refer to app/ route metadata files, not necessarily public/.
  const relativeRefsNotInPublic = [];
  for (const [ref, files] of allRelRefs) {
    const normalized = ref.startsWith('./') ? ref.slice(2) : ref;
    const absOnDisk = path.join(publicDir, normalized);
    const absDecodedOnDisk = path.join(publicDir, decodeURI(normalized));

    if (!(await pathExists(absOnDisk)) && !(await pathExists(absDecodedOnDisk))) {
      relativeRefsNotInPublic.push({
        ref,
        referencedIn: files.slice(0, 10),
        referencedInCount: files.length,
        note: 'May be intended relative to an app/ route segment, not public/.',
      });
    }
  }

  // 3) Find duplicates by SHA-256
  const byHash = new Map();
  for (const asset of publicAssets) {
    const stat = await fs.stat(asset.absPath);
    const hash = await sha256File(asset.absPath);
    const group = byHash.get(hash) ?? { hash, size: stat.size, files: [] };
    group.files.push({ rel: asset.rel, webPath: asset.webPath });
    byHash.set(hash, group);
  }

  const duplicates = [...byHash.values()]
    .filter((g) => g.files.length > 1)
    .sort((a, b) => b.size - a.size);

  // 4) Optionally move unused assets into public/_trash (preserve paths)
  const movedUnused = [];
  if (args.moveUnused) {
    const trashRoot = path.join(publicDir, args.trashDirName);
    await ensureDir(trashRoot);

    for (const asset of unused) {
      const destPath = path.join(trashRoot, asset.rel);
      if (args.dryRun) {
        movedUnused.push({ from: asset.rel, to: toPosix(path.relative(publicDir, destPath)), dryRun: true });
        continue;
      }
      const movedTo = await moveFileSafely(asset.absPath, destPath);
      movedUnused.push({
        from: asset.rel,
        to: toPosix(path.relative(publicDir, movedTo)),
        dryRun: false,
      });
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    options: {
      moveUnused: args.moveUnused,
      dryRun: args.dryRun,
      trashDirName: args.trashDirName,
    },
    publicFileCount: publicAssets.length,
    usedCount: used.length,
    unusedCount: unused.length,
    duplicateGroupsCount: duplicates.length,
    used,
    unused,
    duplicates,
    missingAbsoluteRefs,
    relativeRefsNotInPublic,
    movedUnused,
  };

  const outPath = path.join(repoRoot, 'asset-audit.json');
  await fs.writeFile(outPath, JSON.stringify(report, null, 2), 'utf8');

  console.log('Asset audit complete.');
  console.log(`- Report: ${toPosix(path.relative(repoRoot, outPath))}`);
  console.log(`- public/ files: ${report.publicFileCount}`);
  console.log(`- used: ${report.usedCount}`);
  console.log(`- unused: ${report.unusedCount}`);
  console.log(`- duplicate groups (exact hash): ${report.duplicateGroupsCount}`);

  if (args.moveUnused) {
    console.log(
      `- moved unused to public/${args.trashDirName}/: ${movedUnused.length}${args.dryRun ? ' (dry-run)' : ''}`,
    );
  }

  if (report.missingAbsoluteRefs.length > 0) {
    console.log(`- referenced-but-missing (absolute): ${report.missingAbsoluteRefs.length}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
