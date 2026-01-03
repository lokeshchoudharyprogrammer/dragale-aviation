import type { Metadata } from 'next';
import Link from 'next/link';
import SolutionsClient from './SolutionsClient';

import { solutions } from '../../utils/solutions';

export const metadata: Metadata = {
  title: 'Medical Air Transport Solutions | Dragale Aviation',
  description:
    'Explore Dragale Aviation’s air medical transport solutions designed for critical care, emergency evacuation, and rapid intercity patient transfer.',
};

export default function Page() {
  return (
    <>
      <nav aria-label="Solutions" className="sr-only">
        <ul>
          {solutions.map((solution) => (
            <li key={solution.slug}>
              <Link href={`/solutions/${solution.slug}`}>{solution.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <SolutionsClient />
    </>
  );
}
