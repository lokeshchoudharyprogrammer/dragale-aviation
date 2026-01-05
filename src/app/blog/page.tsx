import Link from 'next/link';
import { getAllBlogPosts } from '@/content/blog/posts';

export const dynamic = 'force-static';
export const revalidate = false;

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <main className="px-4 sm:px-8 lg:px-16 py-12">
        <div className="max-w-5xl mx-auto">
          <header className="text-center max-w-3xl mx-auto relative p-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Blog
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-200">
              Thoughts and updates from Dragle Aviation.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="mt-6 text-center text-gray-300">No posts yet.</p>
          ) : (
            <ul className="mt-6 grid grid-cols-1 gap-4">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block rounded-2xl shadow-xl bg-white/5 backdrop-blur-3xl overflow-hidden border border-white/10 hover:border-gray-400/30 transition-all p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    aria-label={`Read ${post.title}`}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                        <h2 className="text-xl sm:text-2xl font-semibold text-white">
                          {post.title}
                        </h2>
                        <time
                          dateTime={post.publishedDateObj.toISOString()}
                          className="text-sm text-gray-400"
                        >
                          {post.publishedDate}
                        </time>
                      </div>
                      <p className="text-gray-300">{post.description}</p>
                      <span className="text-gray-300 text-xs underline underline-offset-4">
                        Read more
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
