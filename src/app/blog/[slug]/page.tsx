import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import BlogMdxImage from '@/components/BlogMdxImage';
import {
  getAllBlogPosts,
  getAllBlogSlugs,
  getBlogPostBySlug,
} from '@/content/blog/posts';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getAllBlogPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="pt-24 min-h-screen bg-white text-gray-900">
      <main className="px-4 sm:px-8 lg:px-16 py-12">
        <article className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Back to all blog posts"
            >
              <span aria-hidden="true">←</span>
              <span>Back to all blogs</span>
            </Link>
          </div>

          <header className="w-full pb-12 border-b border-gray-200">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed mb-6">
              {post.description}
            </p>
            <time
              dateTime={post.publishedDateObj.toISOString()}
              className="block text-xs font-bold tracking-widest uppercase text-gray-400"
            >
              {post.publishedDate}
            </time>
          </header>

          <section className="py-12">
            <div className="blog-content prose prose-lg prose-gray max-w-none">
              <MDXRemote
                source={post.content}
                components={{ Image: BlogMdxImage }}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>
          </section>

          {relatedPosts.length > 0 ? (
            <section className="mt-16 pt-12 border-t-2 border-gray-900">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
                Related posts
              </h2>
              <ul className="grid grid-cols-1 gap-0 border-t border-gray-200">
                {relatedPosts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="block py-6 border-b border-gray-200 group"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                          <span className="text-lg font-bold tracking-tight text-gray-900 group-hover:text-gray-500 transition-colors">
                            {p.title}
                          </span>
                          <time
                            dateTime={p.publishedDateObj.toISOString()}
                            className="text-xs font-bold tracking-widest uppercase text-gray-400"
                          >
                            {p.publishedDate}
                          </time>
                        </div>
                        <span className="text-sm text-gray-600 font-light max-w-2xl">
                          {p.description}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      </main>
    </div>
  );
}
