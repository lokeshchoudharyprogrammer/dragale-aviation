import type { Metadata } from 'next';
import PartnershipsClient from './PartnershipsClient';

export const metadata: Metadata = {
  title: 'Partnerships | Media & Infrastructure Partners of Dragale Aviation',
  description:
    'Dragale Aviation partners with Avionyz (media partner) and MyOnlineJet (infrastructure partner) to build India’s medical-first eVTOL air ambulance ecosystem.',
};

export default function Page() {
  return <PartnershipsClient />;
}
