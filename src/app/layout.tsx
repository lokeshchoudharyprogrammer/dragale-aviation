import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';

import { Analytics } from '@vercel/analytics/react';
import { Footer } from '../components/footer';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['100', '400', '700'], // thin, normal, bold
  variable: '--font-archivo', // optional, for Tailwind
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: 'Dragale Aviation - Air Ambulance Services',
  description:
    'Dragale Aviation offers reliable and quick air ambulance services for medical emergencies. Our team ensures prompt, safe, and comfortable air transport for critical patients.',
  keywords:
    'air ambulance, medical transport, emergency air service, air evacuation, patient air transport, emergency healthcare, medical flight',

  creator: 'Dragale Aviation',
  publisher: 'Dragale Aviation',

  robots: 'index, follow',
  icons: {
    icon: './founders/newlogo.png',
    shortcut: './founders/newlogo.png',
    apple: './founders/newlogo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${archivo.variable}  antialiased`}
      >
        <header>
          <Navbar />
        </header>
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
