'use client';

import SocialBadge from '@/components/SocialBadge';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useState } from 'react';

export default function AdvisorsClient({
  headingLevel = 1,
  contained = false,
}: {
  headingLevel?: 1 | 2;
  contained?: boolean;
}) {
  const isEmbedded = headingLevel === 2;
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches;

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);

  const bioIntro =
    'Dan Sloat is the Founder & President of the Advanced Air Mobility Institute, a global nonprofit research organization dedicated to advancing the aviation and AAM ecosystem for public benefit. He is recognized as a top global AAM industry leader and regularly advises governments, academia, and industry on electric and autonomous aviation adoption.';

  const bioSections = useMemo(
    () => [
      {
        id: 'electro-academics',
        title: 'Electro.Aero + academic roles',
        bullets: [
          'President of Electro.Aero',
          "Academic Coordinator (Master's in AAM)",
          'Guest lectures at global universities',
        ],
      },
      {
        id: 'speaking-influence',
        title: 'Speaking & global influence',
        bullets: [
          'ICAO keynote speaker',
          'Presentations across 25+ cities, 16 countries',
          'EBACE, K-UAM, NASA',
        ],
      },
      {
        id: 'leadership-military',
        title: 'Previous leadership & military service',
        bullets: [
          'CEO of vertiport company',
          'Chief Aeronautics Officer',
          'USAF Captain + Humanitarian Service Medal',
        ],
      },
      {
        id: 'education-credentials',
        title: 'Education & credentials',
        bullets: [
          'Masters in Economics',
          'MBA',
          'Juris Doctor',
          'Part 61 private pilot',
          'Part 107 drone pilot',
        ],
      },
      {
        id: 'advisory-roles',
        title: 'Advisory roles',
        bullets: [
          'Adjunct professor (University of Arkansas)',
          'Fellow of Royal Aeronautical Society',
          'World Economic Forum AVIATION committee',
        ],
      },
    ],
    []
  );

  const toggleSection = (id: string) => {
    setOpenSectionId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={(() => {
        if (contained) return 'py-10';
        if (isEmbedded)
          return 'bg-gradient-to-b from-black via-gray-950 to-black py-10 px-4 sm:px-8 lg:px-16';
        return 'pt-40 min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-16 px-6';
      })()}
    >
      <div
        aria-hidden="true"
        className="border-t border-white/20 sm:mt-0 sm:mb-10"
      />
      <motion.div
        className={`${
          isEmbedded ? 'mb-8' : 'mb-16'
        } max-w-4xl mx-auto text-center`}
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        {headingLevel === 2 ? (
          <h2 className="text-5xl md:text-6xl font-extrabold uppercase tracking-widest text-white">
            Board of Advisors
          </h2>
        ) : (
          <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-widest text-white">
            Board of Advisors
          </h1>
        )}
        <motion.div
          className="mt-4 mx-auto "
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Premium Full-Width Header */}
      <motion.div
        initial={isMobile ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0 : 0.8 }}
        className={`relative text-left ${
          isEmbedded ? 'mt-8' : 'mt-20'
        } max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 pb-12 border-b border-white/20`}
      >
        {/* Profile Image */}
        <div className="relative w-40 h-40 flex-shrink-0 rounded-full overflow-hidden shadow-2xl border-2 border-[#0077b5]/0 border border-solid">
          <Image
            src="/advisor.jpeg"
            alt="Dan Sloat, Founder and President of Advanced Air Mobility Institute"
            fill
            sizes="(max-width: 768px) 256px, 256px"
            className="object-cover object-center"
          />
        </div>

        {/* Name + Title + Social */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-stretch-normal line-clamp-3 text-5xl font-extrabold tracking-tight text-white leading-tight">
            Dan Sloat
          </h2>
          <div className="w-24 h-[2px] bg-white mx-auto md:mx-0 mt-2 rounded-full"></div>

          <p className="font-stretch-normal line-clamp-3  mt-4 text-xl text-gray-300 font-medium leading-relaxed max-w-2xl">
            Founder & President, Advanced Air Mobility Institute
          </p>

          <div className="mt-6">
            <SocialBadge
              icon="FaLinkedin"
              label="LinkedIn"
              link="https://www.linkedin.com/in/dan-sloat/"
              color="#0077b5"
            />
          </div>
        </div>
      </motion.div>

      {/* Bio Section */}
      <motion.div
        initial={isMobile ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: isMobile ? 0 : 0.4, duration: isMobile ? 0 : 0.8 }}
        className="max-w-4xl mx-auto mt-12"
      >
        <h2 className="text-3xl font-bold text-white relative inline-block">
          Biography
          <span className="block w-20 h-[2px] bg-white mt-2 rounded-full"></span>
        </h2>

        <div className="mt-8 space-y-4">
          <div>
            <motion.p
              initial={isMobile ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: isMobile ? 0 : 0.05,
                duration: isMobile ? 0 : undefined,
              }}
              className={`text-gray-300 text-base md:text-lg leading-relaxed text-justify md:line-clamp-none ${
                isIntroExpanded ? 'line-clamp-none' : 'line-clamp-3'
              }`}
            >
              {bioIntro}
            </motion.p>

            <div className="mt-2 flex justify-end md:hidden">
              <button
                type="button"
                onClick={() => setIsIntroExpanded((v) => !v)}
                className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
              >
                {isIntroExpanded ? 'Read less' : 'Read more'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {bioSections.map((section, index) => {
              const isOpen = openSectionId === section.id;

              return (
                <motion.div
                  key={section.id}
                  initial={isMobile ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: isMobile ? 0 : 0.1 + index * 0.06,
                    duration: isMobile ? 0 : undefined,
                  }}
                  className={`h-full rounded-lg md:rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden ${
                    isOpen ? 'md:col-span-2' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="w-full min-h-[72px] md:min-h-[84px] px-4 py-3 md:px-5 md:py-4 flex items-center justify-between gap-3 md:gap-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-white font-semibold text-base md:text-lg leading-snug">
                      {section.title}
                    </span>
                    <span
                      className={`shrink-0 inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/15 text-white/90 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="px-4 md:px-5"
                      >
                        <div className="pb-4 md:pb-5">
                          <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm md:text-base leading-relaxed">
                            {section.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
