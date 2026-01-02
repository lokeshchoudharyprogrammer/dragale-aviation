import type { Metadata } from 'next';
import AdvisorsClient from './AdvisorsClient';

export const metadata: Metadata = {
  title: 'Advisors | Industry & Aviation Experts at Dragale Aviation',
  description:
    'Learn about the advisors guiding Dragale Aviation with expertise in aviation, healthcare, and advanced air mobility.',
};

export default function Page() {
  return <AdvisorsClient />;
}
