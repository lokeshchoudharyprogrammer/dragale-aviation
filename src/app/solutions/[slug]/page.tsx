import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  getSolutionBySlug,
  isSolutionSlug,
  solutions,
} from '../../../utils/solutions';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getSolutionOrNotFound(slug: string) {
  if (!isSolutionSlug(slug)) {
    notFound();
  }

  const solution = getSolutionBySlug(slug);
  if (!solution) {
    notFound();
  }

  return solution;
}

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionOrNotFound(slug);

  return {
    title: solution.seo.title,
    description: solution.seo.description,
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolutionOrNotFound(slug);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <main className="px-4 sm:px-8 lg:px-16 py-12">
        <article className="max-w-4xl mx-auto">
          <header className="space-y-4">
            <Link
              href="/solutions"
              className="text-gray-300 text-sm underline"
              aria-label="Back to solutions"
            >
              Back to Solutions
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {solution.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-200">
              {solution.shortDescription}
            </p>
          </header>

          <section className="mt-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              {solution.content.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {solution.content.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-gray-200 text-sm sm:text-base leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
