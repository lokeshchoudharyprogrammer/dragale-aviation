'use client';

import SocialBadge from '@/components/SocialBadge';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useRef } from 'react';
import { Star } from 'lucide-react';

const fadeUpItem = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const ScrollSection = ({ section, index, progress, total }: any) => {
  const sectionLength = 1 / total;
  const start = index * sectionLength;
  const end = (index + 1) * sectionLength;

  // Make the transition sharp so sections don't overlap. 
  // 15% of the section length for fading in, 15% for fading out.
  const transitionLength = sectionLength * 0.15; 

  const fadeInStart = index === 0 ? 0 : start;
  const fadeInEnd = index === 0 ? 0 : start + transitionLength;
  
  const fadeOutStart = index === total - 1 ? 1 : end - transitionLength;
  const fadeOutEnd = index === total - 1 ? 1 : end;

  const opacity = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [100, 0, 0, -100]
  );
  
  const pointerEvents = useTransform(opacity, (o) => o > 0.5 ? 'auto' : 'none');

  return (
    <motion.div style={{ opacity, y, pointerEvents }} className="absolute inset-0 flex flex-col justify-start pt-4 md:pt-12">
      <h4 className="text-sm md:text-base font-medium tracking-wider uppercase text-gray-500 mb-6 md:mb-8 pb-3 border-b border-gray-200 flex items-center gap-2">
        <Star className="w-4 h-4 text-gray-400" />
        {section.title}
      </h4>
      <ul className="space-y-6 md:space-y-8">
        {section.bullets.map((bullet: string, bIdx: number) => (
          <li key={bIdx} className="flex items-start gap-4">
            <span className="text-gray-300 mt-3 text-[10px] tracking-tighter">●</span>
            <span className="text-lg md:text-2xl font-light text-gray-800 leading-relaxed">
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default function AdvisorsClient({
  headingLevel = 1,
  contained = false,
}: {
  headingLevel?: 1 | 2;
  contained?: boolean;
}) {
  const isEmbedded = headingLevel === 2;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Subtle image parallax effect while pinned
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.05]);
  const imageY = useTransform(smoothProgress, [0, 1], ['-2%', '2%']);

  const bioIntro =
    'Dan Sloat is the Founder & President of the Advanced Air Mobility Institute, a global nonprofit research organization dedicated to advancing the aviation and AAM ecosystem for public benefit. He is recognized as a top global AAM industry leader and regularly advises governments, academia, and industry on electric and autonomous aviation adoption.';

  const bioSections = useMemo(
    () => [
      {
        id: 'intro',
        title: 'Biography',
        bullets: [bioIntro],
      },
      {
        id: 'electro-academics',
        title: 'Electro.Aero & Academic Roles',
        bullets: [
          'President of Electro.Aero',
          "Academic Coordinator (Master's in AAM)",
          'Guest lectures at global universities',
        ],
      },
      {
        id: 'speaking-influence',
        title: 'Speaking & Global Influence',
        bullets: [
          'ICAO keynote speaker',
          'Presentations across 25+ cities, 16 countries',
          'EBACE, K-UAM, NASA',
        ],
      },
      {
        id: 'leadership-military',
        title: 'Leadership & Military Service',
        bullets: [
          'CEO of vertiport company',
          'Chief Aeronautics Officer',
          'USAF Captain + Humanitarian Service Medal',
        ],
      },
      {
        id: 'education-credentials',
        title: 'Education & Credentials',
        bullets: [
          'Masters in Economics & MBA',
          'Juris Doctor',
          'Part 61 private pilot & Part 107 drone pilot',
        ],
      },
      {
        id: 'advisory-roles',
        title: 'Advisory Roles',
        bullets: [
          'Adjunct professor (University of Arkansas)',
          'Fellow of Royal Aeronautical Society',
          'World Economic Forum AVIATION committee',
        ],
      },
    ],
    []
  );

  return (
    <div className={(() => {
        if (contained) return 'py-16 lg:py-24';
        if (isEmbedded) return 'bg-white pt-24 pb-0 lg:pt-32 border-t border-gray-100';
        return 'pt-24 md:pt-32 pb-0 min-h-screen bg-white';
      })()}
    >
      {/* Non-sticky Intro Section */}
      <div className="max-w-[80rem] mx-auto px-4 sm:px-8 lg:px-12 mb-8 md:mb-16">
        <motion.div
          className={`${isEmbedded ? 'mb-8' : 'mb-12'}`}
          variants={fadeUpItem}
          initial="hidden"
          animate="visible"
        >
          {headingLevel === 2 ? (
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900">
              Board of <span className="text-gray-400 font-light">Advisors</span>
            </h2>
          ) : (
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">
              Board of <span className="text-gray-400 font-light">Advisors</span>
            </h1>
          )}
        </motion.div>

        <motion.div
          variants={fadeUpItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <h3 className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed mb-6">
            Guiding the development of advanced aeromedical platforms requires visionary leadership. Our board brings together world-renowned experts in aerospace, regulatory affairs, and critical care.
          </h3>
          <p className="text-base text-gray-400 font-light tracking-wide border-l border-gray-200 pl-4">
            Together, we are developing medical-first eVTOL and UAV platforms designed for time-critical emergency applications.
          </p>
        </motion.div>
      </div>

      {/* Scroll-based Sequence Container */}
      <div 
        ref={containerRef} 
        style={{ height: `${bioSections.length * 70}vh` }} 
        className="relative w-full"
      >
        {/* Pinned Section */}
        <div className="sticky top-0 md:top-[5vh] h-[100dvh] md:h-[90vh] w-full flex flex-col justify-start pt-8 md:pt-12 overflow-hidden bg-white">
          <div className="max-w-[80rem] w-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row gap-8 lg:gap-20 items-start h-full">
            
            {/* Left Column: Fixed-Size Portrait */}
            <div className="w-48 sm:w-64 md:w-80 flex-shrink-0">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-50 shadow-2xl">
                <motion.div style={{ scale: imageScale, y: imageY }} className="w-full h-full origin-center relative">
                  <Image
                    src="/advisor.jpeg"
                    alt="Dan Sloat, Founder and President of Advanced Air Mobility Institute"
                    fill
                    sizes="(max-width: 768px) 192px, 320px"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                </motion.div>
              </div>

              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h2 className="text-xl md:text-2xl font-medium text-gray-900 tracking-tight">
                    Dan Sloat
                  </h2>
                  <p className="mt-1 text-xs font-semibold tracking-widest uppercase text-gray-400">
                    Founder & President, AAMI
                  </p>
                </div>
                <div className="pt-1">
                  <SocialBadge
                    icon="FaLinkedin"
                    label="LinkedIn"
                    link="https://www.linkedin.com/in/dan-sloat/"
                    color="#9ca3af"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Scrolling Bio Sections */}
            <div className="relative flex-1 w-full h-64 md:h-[500px]">
              {bioSections.map((section, idx) => (
                <ScrollSection 
                  key={section.id} 
                  section={section} 
                  index={idx} 
                  progress={smoothProgress} 
                  total={bioSections.length} 
                />
              ))}
            </div>

            {/* Vertical Scroll Progress Timeline on the right */}
            <div className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 h-32 md:h-64 w-[2px] bg-gray-100 rounded-full overflow-hidden z-20 hidden md:block">
              <motion.div 
                style={{ scaleY: smoothProgress, originY: 0 }}
                className="w-full h-full bg-gray-900"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
