import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Dragale Aviation | Emergency Air Ambulance Services',
  description:
    'Get in touch with Dragale Aviation for emergency air ambulance services, medical transport inquiries, or partnership opportunities.',
};

export default function Page() {
  return <ContactClient />;
}
