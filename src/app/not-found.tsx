import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="pt-24 min-h-screen bg-gray-50 text-gray-900 flex flex-col justify-center">
      <main className="px-4 sm:px-8 lg:px-16 py-12">
        <section className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter text-gray-900 mb-6">
            404
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 uppercase">
            Page Not <span className="text-gray-400">Found</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 font-light max-w-lg mb-12">
            The page you’re looking for doesn’t exist or may have been moved.
          </p>

          <Link
            href="/"
            className="bg-gray-900 text-white font-semibold py-4 px-12 rounded-full uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
            aria-label="Go back to the homepage"
          >
            Return to Home
          </Link>

          <div className="mt-24 w-full border-t border-gray-200 pt-8">
            <p className="text-gray-500 font-light text-sm uppercase tracking-widest">
              If you reached this page from a link on our site, please let us know.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
