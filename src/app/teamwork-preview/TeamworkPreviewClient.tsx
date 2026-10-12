'use client';

import React from 'react';
import CinematicHero from '@/components/teamwork-preview/CinematicHero';
import MissionIntro from '@/components/teamwork-preview/MissionIntro';
import ScrollVideoPinnedSequence from '@/components/teamwork-preview/ScrollVideoPinnedSequence';
import SpecCardOverlay from '@/components/teamwork-preview/SpecCardOverlay';
import AircraftSpecsGrid from '@/components/teamwork-preview/AircraftSpecsGrid';
import PreviewCTA from '@/components/teamwork-preview/PreviewCTA';

export default function TeamworkPreviewClient() {
  return (
    <main className="relative w-full min-h-screen bg-[#020205] text-white pt-[70px]">
      {/* Header and Navbar Contrast Containment for #111111 links at scrollY=0 */}
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-0 right-0 h-[70px] bg-gradient-to-b from-white/90 via-white/40 to-transparent pointer-events-none z-[40]" 
      />

      {/* 1. Cinematic Ambient Video Hero */}
      <header className="relative w-full">
        <CinematicHero />
      </header>

      {/* 2. Mission Typography & Emergency Response Context */}
      <MissionIntro />

      {/* 3. Pinned Scroll-Driven 360 Video Sequence with HUD Telemetry Overlay */}
      <section className="relative w-full">
        <ScrollVideoPinnedSequence
          videoSrc="/animated-videos/ground-360-view.mp4"
        >
          <SpecCardOverlay />
        </ScrollVideoPinnedSequence>
      </section>

      {/* 4. Complete Technical Matrix & 5 Operational Pillars */}
      <AircraftSpecsGrid />

      {/* 5. Clinical Conversion Call to Action */}
      <PreviewCTA />
    </main>
  );
}
