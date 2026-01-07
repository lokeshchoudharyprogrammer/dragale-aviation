import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type BlogPostFrontmatter = {
  title: string;
  description: string;
  publishedDate: string;
};

export type BlogPostSummary = BlogPostFrontmatter & {
  slug: string;
  publishedDateObj: Date;
};

export type BlogPost = BlogPostSummary & {
  content: string;
};

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

function assertValidFrontmatter(
  data: Record<string, unknown>,
  filePath: string,
): BlogPostFrontmatter {
  const allowedKeys = new Set(['title', 'description', 'publishedDate']);
  for (const key of Object.keys(data)) {
    if (!allowedKeys.has(key)) {
      throw new Error(
        `[blog] Unsupported frontmatter field "${key}" in ${filePath}. Allowed: title, description, publishedDate.`,
      );
    }
  }

  const title = data.title;
  const description = data.description;
  const publishedDate = data.publishedDate;

  if (typeof title !== 'string' || title.trim().length === 0) {
    throw new Error(`[blog] Missing/invalid "title" in ${filePath}.`);
  }

  if (typeof description !== 'string' || description.trim().length === 0) {
    throw new Error(`[blog] Missing/invalid "description" in ${filePath}.`);
  }

  if (typeof publishedDate !== 'string' || publishedDate.trim().length === 0) {
    throw new Error(`[blog] Missing/invalid "publishedDate" in ${filePath}.`);
  }

  const parsedDate = new Date(publishedDate);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(
      `[blog] Invalid "publishedDate" in ${filePath}. Use an ISO-like date string (e.g. 2026-01-05).`,
    );
  }

  return {
    title: title.trim(),
    description: description.trim(),
    publishedDate: publishedDate.trim(),
  };
}

function assertNoH1InMdxBody(mdxBody: string, filePath: string) {
  // Requirement: one H1 per post (from title). Enforce that MDX body doesn't define an H1.
  if (/^#\s+/m.test(mdxBody)) {
    throw new Error(
      `[blog] Do not include an H1 ("# ") in the MDX body for ${filePath}. The page renders the H1 from frontmatter.title.`,
    );
  }
}

function assertNoMarkdownImageSyntax(mdxBody: string, filePath: string) {
  // Strict rule: Markdown image syntax is not allowed. Use next/image explicitly.
  if (/!\[[^\]]*\]\([^\)]+\)/m.test(mdxBody)) {
    throw new Error(
      `[blog] Markdown image syntax (![]()) is not allowed in ${filePath}. Use \"import Image from 'next/image'\" and an explicit <Image /> tag with width/height/alt and a local /images/* src.`,
    );
  }
}

function assertNoRawImgTags(mdxBody: string, filePath: string) {
  // Strict rule: no raw <img> tags in MDX.
  if (/<img\b/i.test(mdxBody)) {
    throw new Error(
      `[blog] Raw <img> tags are not allowed in ${filePath}. Use next/image <Image /> instead.`,
    );
  }
}

function assertValidNextImageUsage(mdxBody: string, filePath: string) {
  const hasImageTag = /<Image\b/.test(mdxBody);
  if (!hasImageTag) return;

  const hasNextImageImport =
    /^\s*import\s+Image\s+from\s+['"]next\/image['"]\s*;?\s*$/m.test(
      mdxBody,
    );

  if (!hasNextImageImport) {
    throw new Error(
      `[blog] ${filePath} uses <Image /> but is missing \"import Image from 'next/image'\" at the top of the MDX file.`,
    );
  }

  // Lightweight validation of each <Image .../> block.
  // This intentionally avoids a full JSX parser; it enforces required attributes and local src.
  const tagMatches = mdxBody.matchAll(/<Image\b[\s\S]*?(?:\/>|>)/g);
  for (const match of tagMatches) {
    const tag = match[0];

    const hasAlt = /\balt\s*=/.test(tag);
    const hasWidth = /\bwidth\s*=\s*\{/.test(tag) || /\bwidth\s*=\s*"\d+"/.test(tag);
    const hasHeight =
      /\bheight\s*=\s*\{/.test(tag) || /\bheight\s*=\s*"\d+"/.test(tag);

    if (!hasAlt || !hasWidth || !hasHeight) {
      throw new Error(
        `[blog] Invalid <Image /> in ${filePath}. Each <Image /> must include alt, width, and height.`,
      );
    }

    // Enforce local images under /public/images via src="/images/..." (or src={'/images/...'}).
    const srcMatch = tag.match(/\bsrc\s*=\s*(?:\{\s*)?(["'])([^"']+)\1/);
    if (!srcMatch) {
      throw new Error(
        `[blog] Invalid <Image /> in ${filePath}. Each <Image /> must include a src pointing to a local /images/* path.`,
      );
    }

    const srcValue = srcMatch[2];
    if (/^https?:\/\//i.test(srcValue)) {
      throw new Error(
        `[blog] Remote image URLs are not allowed in ${filePath}. Use local images from /public/images (src like \"/images/...\").`,
      );
    }

    if (!srcValue.startsWith('/images/')) {
      throw new Error(
        `[blog] Blog images must be served from /public/images (src must start with \"/images/\"). Found: ${srcValue} in ${filePath}.`,
      );
    }
  }
}

function stripAllowedMdxImportsForRendering(mdxBody: string, filePath: string) {
  // next-mdx-remote/rsc renders MDX from a source string; ESM imports inside the MDX body
  // are not reliably supported. We still REQUIRE the authoring pattern to exist in the file,
  // but we strip the allowed import before rendering.
  const allowedImageImport = /^\s*import\s+Image\s+from\s+['"]next\/image['"]\s*;?\s*$/gm;
  const stripped = mdxBody.replace(allowedImageImport, '').trimStart();

  // Keep the system minimal: no other imports are allowed inside post content.
  if (/^\s*import\s+/m.test(stripped)) {
    throw new Error(
      `[blog] Unsupported import in ${filePath}. Only "import Image from 'next/image'" is allowed inside MDX posts.`,
    );
  }

  return stripped;
}

function getMdxFilePaths(): string[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) return [];

  return fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((name) => name.toLowerCase().endsWith('.mdx'))
    .map((name) => path.join(BLOG_CONTENT_DIR, name));
}

function slugFromFilePath(filePath: string): string {
  return path.basename(filePath, path.extname(filePath));
}

export function getAllBlogPosts(): BlogPostSummary[] {
  const posts = getMdxFilePaths().map((filePath) => {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    const frontmatter = assertValidFrontmatter(
      data as Record<string, unknown>,
      filePath,
    );
    assertNoH1InMdxBody(content, filePath);
    assertNoMarkdownImageSyntax(content, filePath);
    assertNoRawImgTags(content, filePath);
    assertValidNextImageUsage(content, filePath);

    return {
      slug: slugFromFilePath(filePath),
      ...frontmatter,
      publishedDateObj: new Date(frontmatter.publishedDate),
    } satisfies BlogPostSummary;
  });

  return posts.sort(
    (a, b) => b.publishedDateObj.getTime() - a.publishedDateObj.getTime(),
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const frontmatter = assertValidFrontmatter(data as Record<string, unknown>, filePath);
  assertNoH1InMdxBody(content, filePath);
  assertNoMarkdownImageSyntax(content, filePath);
  assertNoRawImgTags(content, filePath);
  assertValidNextImageUsage(content, filePath);

  const renderableContent = stripAllowedMdxImportsForRendering(content, filePath);

  return {
    slug,
    ...frontmatter,
    publishedDateObj: new Date(frontmatter.publishedDate),
    content: renderableContent,
  } satisfies BlogPost;
}

export function getAllBlogSlugs(): string[] {
  return getAllBlogPosts().map((p) => p.slug);
}
