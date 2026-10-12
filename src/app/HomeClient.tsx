'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import ScrollVideoPinnedSequence from '../components/teamwork-preview/ScrollVideoPinnedSequence';
import AdaptiveScrollSequence from '../components/AdaptiveScrollSequence';
import ScrollAircraftShowcase, { allAircraftSlides } from '../components/teamwork-preview/ScrollAircraftShowcase';

const AboutClient = dynamic(() => import('./about/AboutClient'), { ssr: false });
const AdvisorsClient = dynamic(() => import('./advisors/AdvisorsClient'), { ssr: false });
const ProductsClient = dynamic(() => import('./products/ProductsClient'), { ssr: false });
const TeamClient = dynamic(() => import('./team/TeamClient'), { ssr: false });
const ContactClient = dynamic(() => import('./contact-us/ContactClient'), { ssr: false });



const LandingHelipadScene = dynamic(
  () => import('../components/LandingHelipadScene'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full flex items-center justify-center" style={{ height: '100vh', background: 'radial-gradient(circle at 50% 100%, #0d1e3d 0%, #020205 70%)' }}>
        <div className="w-12 h-12 border-2 border-[#00AEEF] border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  },
);

const ShowcaseVideoSection = dynamic(() => import('../components/ShowcaseVideoSection'), { ssr: false });

export default function Leading() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111] selection:bg-[#00AEEF] selection:text-white font-sans">
      <main className="flex-grow w-full">
        
        {/* HERO SECTION - Scroll Driven */}
        <section className="relative w-full bg-black text-white">
          <AdaptiveScrollSequence
            videoSrc="/animated-videos/sky-arrival.mp4"
            sequenceFolder="/sequences/sky-arrival"
            frameCount={67}
            scrollSpeedMultiplier={120}
            startOffset="start start"
          >
            {/* Hero Content positioned near bottom-left */}
            <div className="absolute bottom-16 sm:bottom-24 lg:bottom-32 left-0 w-full px-6 lg:px-12 z-10 max-w-[1400px] mx-auto right-0">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="text-3xl sm:text-5xl md:text-7xl lg:text-[100px] font-bold tracking-tight leading-[1.1] mb-6"
              >
                All-Electric <br />
                Air Ambulance.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="text-base sm:text-lg md:text-2xl text-gray-200 max-w-3xl mb-8 font-light"
              >
                Dragale Aviation is an aerospace company developing UAV and eVTOL platforms for medical logistics and emergency air ambulance applications.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex items-center space-x-6"
              >
                <Link
                  href="/solutions"
                  className="pointer-events-auto bg-white text-black hover:bg-[#00AEEF] hover:text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-bold tracking-wide transition-all duration-300 shadow-xl"
                >
                  Discover Our Solutions
                </Link>
              </motion.div>
            </div>
          </AdaptiveScrollSequence>
        </section>

        {/* ── SCROLL-DRIVEN HELIPAD VIDEO SECTION ─────────────────────────── */}
        <section className="relative w-full bg-black text-white">
          <AdaptiveScrollSequence
            videoSrc="/animated-videos/helipad-landing.mp4"
            sequenceFolder="/sequences/helipad-landing"
            frameCount={61}
            scrollSpeedMultiplier={120}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 lg:p-12 z-10 pointer-events-none">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold tracking-tight mb-4 sm:mb-6"
              >
                Precision Landing.<br />
                <span className="text-[#00AEEF]">Anywhere.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-base sm:text-lg md:text-2xl text-gray-300 max-w-2xl px-2"
              >
                Designed for urban environments and remote locations, our eVTOL ensures rapid medical extraction when conventional transport fails.
              </motion.p>
            </div>
          </AdaptiveScrollSequence>
        </section>

        {/* BOLD MISSION STATEMENT */}
        <section className="w-full bg-white py-32 md:py-48 px-6 lg:px-12 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[1200px] mx-auto text-left md:text-center"
          >
            <h2 className="text-4xl md:text-6xl lg:text-[80px] font-bold tracking-tight text-[#111111] leading-[1.1] mb-12">
              We're making rapid, zero-emission critical care <span className="text-[#00AEEF]">a reality for everyone.</span>
            </h2>
          </motion.div>
        </section>

        {/*  AIRCRAFT SECTION */}
        <ScrollAircraftShowcase 
          slides={allAircraftSlides.slice(0, 3)}
          sectionSubtitle="360° Aircraft Tour"
          sectionTitle="Explore the details." 
        />
        <ScrollAircraftShowcase 
          slides={allAircraftSlides.slice(3)}
          sectionSubtitle="Engineering Excellence"
          sectionTitle="Beyond the surface." 
        />
        
        {/* ── TWO DEVELOPMENT PROGRAMMES (Page 4 Requirements) ───────────── */}
        <section className="w-full bg-slate-50 py-24 sm:py-32 px-6 lg:px-12 border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <span className="text-xs font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-3">
                Development Programmes
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                Purpose-Built Medical Flight Platforms
              </h2>
              <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
                Dragale Aviation is developing specialized unmanned and vertical takeoff platforms engineered around the exacting requirements of time-critical healthcare delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* PROGRAMME 1: DRAG V-16 */}
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm flex flex-col justify-between group hover:shadow-xl hover:border-gray-300 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00AEEF]/10 text-[#00AEEF] border border-[#00AEEF]/30">
                      Programme 01 • Fixed-Wing UAV
                    </span>
                    <span className="text-xs font-mono text-gray-400">16 kg Payload</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                    DRAG V-16 — Fixed-Wing UAV for Medical Logistics
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-8 font-light">
                    DRAG V-16 is a fixed-wing unmanned aerial vehicle being developed by Dragale Aviation for medical logistics applications. With a payload capacity of 16 kg, it is designed to support the transportation of essential medical supplies between hospitals, diagnostic laboratories, blood banks and healthcare facilities.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-gray-100 mb-8">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-semibold">Payload</span>
                      <span className="text-lg font-bold text-gray-900">16 kg</span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-semibold">Range</span>
                      <span className="text-lg font-bold text-gray-900">160 km</span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-semibold">Cruise</span>
                      <span className="text-lg font-bold text-gray-900">160 km/h</span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-semibold">Tail</span>
                      <span className="text-lg font-bold text-[#00AEEF]">V-Tail</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/products?model=drag-v16"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 hover:bg-[#00AEEF] text-white rounded-full text-sm font-bold tracking-wide transition-colors duration-300"
                >
                  <span>Explore DRAG V-16 UAV</span>
                  <span className="text-xs font-normal">→</span>
                </Link>
              </div>

              {/* PROGRAMME 2: AYUDX2 */}
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm flex flex-col justify-between group hover:shadow-xl hover:border-gray-300 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-500/30">
                      Programme 02 • Under Development
                    </span>
                    <span className="text-xs font-mono text-gray-400">eVTOL Ambulance</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                    AYUDX2 — eVTOL Air Ambulance
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-8 font-light">
                    AYUDX2 is Dragale Aviation's eVTOL air ambulance programme, designed around the requirements of emergency medical transportation. The aircraft is being developed to support the aerial transportation of patients and medical personnel, with a focus on dedicated medical missions and integration of patient-care requirements into the aircraft design.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-gray-100 mb-8">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-semibold">Mission</span>
                      <span className="text-lg font-bold text-gray-900">Medical</span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-semibold">Cabin</span>
                      <span className="text-lg font-bold text-gray-900">Stretcher</span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-semibold">Power</span>
                      <span className="text-lg font-bold text-gray-900">Electric</span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-semibold">Status</span>
                      <span className="text-lg font-bold text-amber-600">In R&D</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/products?model=ayudx2"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 hover:bg-[#00AEEF] text-white rounded-full text-sm font-bold tracking-wide transition-colors duration-300"
                >
                  <span>Explore AYUDX2 eVTOL</span>
                  <span className="text-xs font-normal">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Other components embedded smoothly */}
      <div className="bg-white text-gray-900 border-t border-gray-100">
        <ProductsClient headingLevel={2} />
        <AboutClient headingLevel={2} />
        <TeamClient headingLevel={2} />
        <AdvisorsClient headingLevel={2} />
        <ContactClient headingLevel={2} />
      </div>
    </div>
  );
}
