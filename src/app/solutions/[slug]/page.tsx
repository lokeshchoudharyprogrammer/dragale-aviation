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

  const relatedSlugs = Array.from(new Set(solution.relatedSlugs ?? []))
    .filter((s) => s && s !== solution.slug)
    .filter((s) => isSolutionSlug(s));

  const relatedSolutions = relatedSlugs
    .map((s) => getSolutionBySlug(s))
    .filter((s): s is NonNullable<ReturnType<typeof getSolutionBySlug>> =>
      Boolean(s)
    );

  return (
    <div className="pt-24 min-h-screen bg-gray-50 text-gray-900">
      <main className="px-4 sm:px-8 lg:px-16 py-12">
        <article className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Back to solutions"
            >
              <span aria-hidden="true">←</span>
              <span>Back to solutions</span>
            </Link>
          </div>

          <header className="w-full pb-12 border-b border-gray-200">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 mb-6">
              {solution.title}
            </h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              {solution.shortDescription}
            </p>
          </header>

          <section className="py-12">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
              {solution.content.heading}
            </h2>
            <div className="space-y-6">
              {solution.content.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-lg text-gray-600 font-light leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {relatedSolutions.length > 0 ? (
            <section className="mt-16 pt-12 border-t-2 border-gray-900" aria-labelledby="related-solutions">
              <h2
                id="related-solutions"
                className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-8"
              >
                Related Solutions
              </h2>
              <ul className="grid grid-cols-1 gap-0 border-t border-gray-200">
                {relatedSolutions.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/solutions/${s.slug}`}
                      className="block py-6 border-b border-gray-200 group"
                    >
                      <span className="text-lg font-bold tracking-tight text-gray-900 group-hover:text-gray-500 transition-colors">
                        {s.title}
                      </span>
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
