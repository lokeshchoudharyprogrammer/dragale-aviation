import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const BLOG_DIR = path.join(process.cwd(), 'public', 'images', 'blog');

async function listPngFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listPngFiles(full)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      files.push(full);
    }
  }
  return files;
}

async function optimizeOne(pngPath) {
  const outPath = pngPath.replace(/\.png$/i, '.webp');

  const input = sharp(pngPath, { failOn: 'none' });
  const meta = await input.metadata();

  // Blog images are rendered around 800px wide. Generate a 2x source (~1600px)
  // so the browser still has a crisp option without shipping multi-megabyte originals.
  const targetWidth = 1600;
  const resizeWidth = meta.width && meta.width > targetWidth ? targetWidth : undefined;

  const pipeline = sharp(pngPath, { failOn: 'none' })
    .resize(resizeWidth ? { width: resizeWidth, withoutEnlargement: true } : undefined)
    .webp({ quality: 78, effort: 5 });

  await pipeline.toFile(outPath);

  const inStat = await fs.stat(pngPath);
  const outStat = await fs.stat(outPath);

  return {
    file: path.basename(pngPath),
    inMb: (inStat.size / 1024 / 1024).toFixed(2),
    outMb: (outStat.size / 1024 / 1024).toFixed(2),
  };
}

async function main() {
  const files = await listPngFiles(BLOG_DIR);
  if (files.length === 0) {
    console.log('[optimize-blog-images] No PNG files found.');
    return;
  }

  console.log(`[optimize-blog-images] Found ${files.length} PNG(s) under ${BLOG_DIR}`);

  const results = [];
  for (const file of files) {
    // Skip if webp already exists (idempotent)
    const webp = file.replace(/\.png$/i, '.webp');
    try {
      await fs.access(webp);
      continue;
    } catch {
      // not found; proceed
    }

    results.push(await optimizeOne(file));
  }

  if (results.length === 0) {
    console.log('[optimize-blog-images] All WebP files already exist.');
    return;
  }

  console.table(results);
  console.log('[optimize-blog-images] Done.');
}

main().catch((err) => {
  console.error('[optimize-blog-images] Failed:', err);
  process.exitCode = 1;
});
