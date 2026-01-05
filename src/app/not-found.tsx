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
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <main className="px-4 sm:px-8 lg:px-16 py-12">
        <section className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Page not found
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-200">
            The page you’re looking for doesn’t exist or may have moved.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex bg-gray-500 text-white py-3 px-8 rounded-full font-medium text-base shadow-md hover:bg-gray-600 transition duration-300 navbar-glass"
              aria-label="Go back to the homepage"
            >
              Back to Home
            </Link>
          </div>

          <div className="mt-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 sm:p-8 text-left">
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              If you reached this page from a link on our site, let us know and
              we’ll fix it.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
