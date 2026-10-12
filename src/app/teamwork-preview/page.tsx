import type { Metadata } from 'next';
import TeamworkPreviewClient from './TeamworkPreviewClient';

export const metadata: Metadata = {
  title: 'AYUDX2 eVTOL Experience | Dragale Aviation',
  description:
    'Experience the cinematic, scroll-synchronized showcase of Dragale Aviation AYUDX2 medical eVTOL air ambulance. Precision 360 airframe inspection, flight dynamics, and life-support specifications.',
  openGraph: {
    title: 'AYUDX2 eVTOL Experience | Dragale Aviation',
    description:
      'Explore the medical-first eVTOL air ambulance platform under development. High-speed emergency patient transport, hospital-to-hospital transfers, and onboard ICU specifications.',
    type: 'website',
    url: 'https://dragaleaviation.com/teamwork-preview',
    images: [
      {
        url: '/images/og-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Dragale Aviation AYUDX2 Medical eVTOL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AYUDX2 eVTOL Experience | Dragale Aviation',
    description:
      'Cinematic scroll-driven inspection of the AYUDX2 medical eVTOL platform.',
  },
};

export default function TeamworkPreviewPage() {
  return <TeamworkPreviewClient />;
}
