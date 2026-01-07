import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
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
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <main className="px-4 sm:px-8 lg:px-16 py-12">
        <article className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200 hover:border-gray-400/30 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Back to all blog posts"
            >
              <span aria-hidden="true">←</span>
              <span>Back to all blogs</span>
            </Link>
          </div>

          <header className="text-center max-w-3xl mx-auto relative p-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {post.title}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-200">
              {post.description}
            </p>
            <time
              dateTime={post.publishedDateObj.toISOString()}
              className="mt-4 block text-sm text-gray-400"
            >
              {post.publishedDate}
            </time>
          </header>

          <section className="rounded-2xl shadow-xl bg-white/5 backdrop-blur-3xl overflow-hidden border border-white/10 p-6 sm:p-8">
            <div className="blog-content">
              <MDXRemote
                source={post.content}
                components={{ Image }}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>
          </section>

          {relatedPosts.length > 0 ? (
            <section className="mt-6 rounded-2xl shadow-xl bg-white/5 backdrop-blur-3xl overflow-hidden border border-white/10 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Related posts
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-3">
                {relatedPosts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="block rounded-xl border border-white/10 bg-white/5 px-4 py-4 hover:border-gray-400/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                          <span className="text-base sm:text-lg font-semibold text-white">
                            {p.title}
                          </span>
                          <time
                            dateTime={p.publishedDateObj.toISOString()}
                            className="text-xs text-gray-400"
                          >
                            {p.publishedDate}
                          </time>
                        </div>
                        <span className="text-sm text-gray-300">
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
