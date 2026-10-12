'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export interface AircraftSlide {
  image: string;
  title: string;
  heading: string;
  desc: string;
  statLabel: string;
  statValue: string;
}

export const allAircraftSlides: AircraftSlide[] = [
  {
    image: '/images/aircraft/front_view.jpeg',
    title: 'AYUDX2 Programme',
    heading: 'eVTOL Air Ambulance Under Development.',
    desc: 'Designed around dedicated emergency medical transportation requirements, bypassing ground congestion.',
    statLabel: 'Emissions',
    statValue: 'Zero'
  },
  {
    image: '/images/aircraft/front_top_view.jpeg',
    title: 'Performance',
    heading: 'Aerodynamic Efficiency.',
    desc: 'Optimized for forward flight efficiency and rapid response between healthcare facilities.',
    statLabel: 'Top Speed',
    statValue: '250 km/h'
  },
  {
    image: '/images/aircraft/left_side_view.jpeg',
    title: 'Capacity',
    heading: 'Spacious Medical Cabin.',
    desc: 'Designed to accommodate critical care medical personnel along with dedicated life-saving equipment.',
    statLabel: 'Capacity',
    statValue: 'Medical Crew'
  },
  {
    image: '/images/aircraft/left_full_side_view.jpeg',
    title: 'Sustainability',
    heading: 'Quiet & Clean Flights.',
    desc: 'All-electric distributed propulsion engineered for lower acoustic signatures in urban healthcare zones.',
    statLabel: 'Powertrain',
    statValue: 'Electric'
  },
  {
    image: '/images/aircraft/left_top_view.jpeg',
    title: 'Range',
    heading: 'Regional Connectivity.',
    desc: 'Engineered for regional healthcare transfers connecting specialized medical centers and remote communities.',
    statLabel: 'Design Range',
    statValue: '150 km'
  },
  {
    image: '/images/aircraft/back_view.jpeg',
    title: 'Technology',
    heading: 'Fly-By-Wire Precision.',
    desc: 'Next-generation avionics architecture engineered for flight stability and precision vertical maneuvers.',
    statLabel: 'Safety',
    statValue: 'Redundant'
  }
];

export default function ScrollAircraftShowcase({ 
  slides = allAircraftSlides,
  sectionSubtitle = "360° Aircraft Tour",
  sectionTitle = "Explore the details."
}: { 
  slides?: AircraftSlide[],
  sectionSubtitle?: string,
  sectionTitle?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let idx = Math.floor(latest * slides.length);
    if (idx >= slides.length) idx = slides.length - 1;
    if (idx !== activeIdx) {
      setActiveIdx(idx);
    }
  });

  return (
    <div ref={containerRef} className="relative w-full bg-[#F9F9F9]" style={{ height: `${slides.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 lg:px-12 py-24">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[1400px] w-full text-center md:text-left mb-12"
        >
          <h3 className="text-xl md:text-2xl font-bold tracking-widest uppercase text-gray-500 mb-2">{sectionSubtitle}</h3>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#111111] leading-none">
            {sectionTitle}
          </h2>
        </motion.div>

        <div className="max-w-[1400px] w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative">
          
          {/* Images Container */}
          <div className="w-full lg:w-3/5 relative aspect-video lg:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-white">
            {slides.map((slide, idx) => (
              <div 
                key={`img-${idx}`}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === activeIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img 
                  src={slide.image} 
                  alt={slide.heading} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>

          {/* Text Container */}
          <div className="w-full lg:w-2/5 text-left relative min-h-[350px] flex items-center">
            {slides.map((slide, idx) => (
              <div 
                key={`text-${idx}`}
                className={`absolute inset-x-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${
                  idx === activeIdx 
                    ? 'opacity-100 translate-y-0 z-10 pointer-events-auto' 
                    : 'opacity-0 translate-y-8 z-0 pointer-events-none'
                }`}
              >
                <h3 className="text-xl md:text-2xl font-bold tracking-widest uppercase text-[#00AEEF] mb-4">
                  {slide.title}
                </h3>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#111111] leading-none mb-6">
                  {slide.heading}
                </h2>
                <p className="text-lg md:text-xl mb-10 font-medium text-gray-600 leading-relaxed">
                  {slide.desc}
                </p>
                
                <div className="border-l-4 border-[#00AEEF] pl-6">
                  <h4 className="text-4xl md:text-5xl font-bold text-[#111111] mb-2">{slide.statValue}</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">{slide.statLabel}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
        
        {/* Progress Dots */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3">
          {slides.map((_, idx) => (
            <div 
              key={`dot-${idx}`} 
              className={`h-2 rounded-full transition-all duration-500 ${idx === activeIdx ? 'w-8 bg-[#00AEEF]' : 'w-2 bg-gray-300'}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
