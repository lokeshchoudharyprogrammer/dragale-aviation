import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title:
    'Dragale Aviation | Air Ambulance & Emergency Medical Flights in India',
  description:
    'Dragale Aviation provides rapid air ambulance and emergency medical flight services in India, ensuring safe, time-critical patient transport when every second matters.',
};

export default function Page() {
  return <HomeClient />;
}
