import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Dragale Aviation | Innovating Emergency Air Medical Services',
  description:
    'Learn about Dragale Aviation’s mission, vision, and commitment to transforming emergency medical transport through advanced air ambulance solutions.',
};

export default function Page() {
  return <AboutClient />;
}
