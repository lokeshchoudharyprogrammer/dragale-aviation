import type { Metadata, Viewport } from 'next';
import { Archivo, Geist } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '../components/Navbar';
import GlobalLoader from '../components/GlobalLoader';

import { Analytics } from '@vercel/analytics/react';
import { Footer } from '../components/footer';

// const archivo = Archivo({
//   subsets: ['latin'],
//   weight: ['100', '400', '700'], // thin, normal, bold
//   variable: '--font-archivo', // optional, for Tailwind
// });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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



// const GTM_ID = 'GTM-TK7SGHK6';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        {/* <Script id="gtm" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script> */}
        {/* End Google Tag Manager */}
        {/* <link rel="preload" href="/models/2-draco.glb" as="fetch" crossOrigin="anonymous" /> */}
      </head>
      <body
        suppressHydrationWarning
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${geistSans.variable}  antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        {/* <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript> */}
        {/* End Google Tag Manager (noscript) */}
        {/* <GlobalLoader /> */}
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
