import Link from 'next/link';
import { getAllBlogPosts } from '@/content/blog/posts';

export const dynamic = 'force-static';
export const revalidate = false;

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="pt-24 min-h-screen bg-gray-50 text-gray-900">
      <main className="px-4 sm:px-8 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <header className="w-full pb-12 border-b border-gray-200">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase text-gray-900 leading-none">
              The <span className="text-gray-400">Journal</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 font-light max-w-2xl">
              Thoughts, updates, and deep dives from Dragale Aviation.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="mt-12 text-gray-400 font-light text-lg">No publications available at this time.</p>
          ) : (
            <div className="mt-12 flex flex-col border-t-2 border-gray-900">
              {posts.map((post) => (
                <article key={post.slug} className="border-b border-gray-200 group">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block py-10 hover:bg-white transition-colors px-4 -mx-4 rounded-xl"
                    aria-label={`Read ${post.title}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-4">
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 group-hover:text-gray-500 transition-colors">
                        {post.title}
                      </h2>
                      <time
                        dateTime={post.publishedDateObj.toISOString()}
                        className="text-sm font-bold tracking-widest uppercase text-gray-400 shrink-0"
                      >
                        {post.publishedDate}
                      </time>
                    </div>
                    <p className="text-lg text-gray-600 font-light max-w-4xl leading-relaxed mb-6">
                      {post.description}
                    </p>
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-900 border-b border-gray-900 pb-1 group-hover:text-gray-500 group-hover:border-gray-500 transition-colors">
                      Read Article
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
