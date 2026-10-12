// SERVER FILE CHECK

'use client';

import Image from "next/image";
import TeamModal from '@/components/TeamModal';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Person } from '../../../utils/types';
import AdvisorsClient from '../advisors/AdvisorsClient';
import TeamPage from '../team/TeamClient';
import './about.css';

const teamData = [
  {
    name: 'Shivanshu Tank',
    role: 'Founder & CEO',
    bio: `
      Driven by a mission to transform emergency medical transport, Shivanshu Tank founded Dragale Aviation to create India’s first air ambulance eVTOL. With a Bachelor’s in Computer Science & Engineering, he blends technical expertise with visionary leadership to deliver faster, safer, and smarter critical care solutions.
    `,
    img: '/founders/shivanshu.jpeg',
    linkedin: 'https://www.linkedin.com/in/shivanshu-tank-556b00232/',
  },
  // {
  //   name: 'Syed Mujahid',
  //   role: 'CTO',
  //   bio: `
  //     Syed Mujahid, an Aerospace Engineering expert, leads the design of Dragale’s eVTOL air ambulance. His experience at Mallard Enterprises and as a Youth Ambassador & Advisor at the Advanced Air Mobility Institute ensures cutting-edge innovation and safety in every system.

  //   `,
  //   achievements: `
  //     - Designed core eVTOL propulsion system
  //     - Published research on urban air mobility
  //     - Speaker at Global Aviation Summit 2024
  //   `,
  //   img: '/founders/syed.jpg',
  //   linkedin: 'https://www.linkedin.com/in/syed-mujahid-496064228/',
  // },
];

export default function About({ headingLevel = 1 }: { headingLevel?: 1 | 2 }) {
  const ref = useRef(null);
  const modalRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedMember, setSelectedMember] = useState<Person | null>(null);
  const text = 'Meet Our Visionaries';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isEmbedded = headingLevel === 2;

  const [showTeam, setShowTeam] = useState(false);
  const [showAdvisors, setShowAdvisors] = useState(false);

  useEffect(() => {
    if (location.pathname === '/about') {
      setShowTeam(true);
      setShowAdvisors(true);
    }
  }, []);

  const handleCardClick = (person: Person) => {
    setSelectedMember(person);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  useEffect(() => {
    if (selectedMember && modalRef.current) {
      const focusableElements = (
        modalRef.current as HTMLElement
      ).querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            (lastElement as HTMLElement)?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            (firstElement as HTMLElement)?.focus();
          }
        }
        if (e.key === 'Escape') {
          closeModal();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      (firstElement as HTMLElement)?.focus();

      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedMember]);

  const badgeVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.1,
      y: -2,
      transition: { type: 'spring', stiffness: 400, damping: 15 },
    },
  };

  return (
    <>
      <section
        className={
          isEmbedded
            ? 'bg-white text-gray-900'
            : 'min-h-screen bg-white pt-10 text-gray-900'
        }
      >
        <main
          id="about"
          className={`px-4 sm:px-8 lg:px-16 ${
            isEmbedded ? 'py-8 space-y-8 scroll-mt-28' : 'py-16 space-y-12'
          } max-w-6xl mx-auto`}
        >
          {/* Hero */}
          <div className="relative min-h-[40vh] flex flex-col justify-center pb-20 pt-16 border-b border-gray-100">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {headingLevel === 2 ? (
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight mb-8">
                  Dragale <span className="text-gray-400">Aviation</span>
                </h2>
              ) : (
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight mb-8">
                  Dragale <span className="text-gray-400">Aviation</span>
                </h1>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                At Dragale Aviation, we’re redefining emergency medical transport
                with India’s first eVTOL air ambulance. Our mission is to deliver
                rapid, safe, and innovative critical care.
              </p>
            </motion.div>
          </div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="py-20 md:py-24 border-b border-gray-100 relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                    Our Vision
                  </h2>
                </motion.div>
              </div>
              
              <div className="md:col-span-8">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-light leading-relaxed"
                >
                  We envision a future where advanced air mobility transforms lives. By pioneering eVTOL technology, Dragale Aviation aims to make emergency medical transport <span className="font-bold text-gray-900">accessible, efficient, and sustainable</span> across India and beyond.
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Animated Heading */}
          <div className="pt-20 pb-12 overflow-hidden" aria-label="Meet Our Visionaries">
            <h2
              ref={ref}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 inline-flex"
            >
              <AnimatePresence>
                {text.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 100 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </AnimatePresence>
            </h2>
          </div>

          {/* Founder Spotlights */}
          <div className="pb-32 space-y-24" aria-label="Team Members">
            {teamData.map((person, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative py-8 md:py-12 lg:py-16">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
                    
                    {/* Image side */}
                    <div className={`lg:col-span-5 relative ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                        className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
                        onClick={() => handleCardClick(person as Person)}
                      >
                        <Image
                          src={person.img}
                          alt={person.name}
                          fill
                          className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                      </motion.div>
                    </div>
                    
                    {/* Content side */}
                    <div className={`lg:col-span-7 flex flex-col justify-center ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
                          {person.name}
                        </h3>
                        <p className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-8 border-b border-gray-200 pb-4 inline-block">
                          {person.role}
                        </p>
                        
                        <div className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed mb-10 whitespace-pre-line">
                          {person.bio.trim()}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-6">
                          <button
                            onClick={() => handleCardClick(person as Person)}
                            className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-white bg-gray-900 border border-gray-900 px-6 py-3 rounded-full hover:bg-white hover:text-gray-900 transition-colors duration-300"
                          >
                            Read Full Bio
                          </button>
                          {person.linkedin && (
                            <a
                              href={person.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-gray-900 border border-gray-900 px-6 py-3 rounded-full hover:bg-gray-900 hover:text-white transition-colors duration-300"
                            >
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          {/* Team Section */}
          {showTeam && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="border-t border-gray-200 pt-24 pb-16"
            >
              <TeamPage headingLevel={2} contained />
            </motion.div>
          )}

          {/* Advisors Section */}
          {showAdvisors ? (
            <motion.section 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="border-t border-gray-200 pt-24 pb-16"
            >
              <AdvisorsClient headingLevel={2} contained />
            </motion.section>
          ) : null}

          {/* Modal Pop-Up */}
          <TeamModal
            selectedMember={selectedMember}
            isOpen={isModalOpen}
            onClose={closeModal}
            badgeVariants={badgeVariants}
          />
        </main>
      </section>
    </>
  );
}
