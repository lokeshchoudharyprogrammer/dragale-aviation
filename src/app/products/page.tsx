import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title:
    'Air Ambulance Aircraft & Medical Aviation Products | Dragale Aviation',
  description:
    'Discover Dragale Aviation’s specialized air ambulance aircraft and medical aviation products built for safety, speed, and critical patient care.',
};

export default function Page() {
  return <ProductsClient />;
}
