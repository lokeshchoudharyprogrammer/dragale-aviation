import type { Metadata } from 'next';
import SolutionsClient from './SolutionsClient';

export const metadata: Metadata = {
  title: 'Medical Air Transport Solutions | Dragale Aviation',
  description:
    'Explore Dragale Aviation’s air medical transport solutions designed for critical care, emergency evacuation, and rapid intercity patient transfer.',
};

export default function Page() {
  return <SolutionsClient />;
}
