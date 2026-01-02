import type { Metadata } from 'next';
import TeamClient from './TeamClient';

export const metadata: Metadata = {
  title: 'Our Team | Aviation & Medical Experts at Dragale Aviation',
  description:
    'Meet the experienced aviation professionals, medical experts, and advisors behind Dragale Aviation’s emergency air medical services.',
};

export default function Page() {
  return <TeamClient />;
}
