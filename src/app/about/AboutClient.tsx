// SERVER FILE CHECK

'use client';

import TeamCard from '@/components/TeamCard';
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
    achievements: `
      - Founded Dragale Aviation in 2023
      - Led development of eVTOL prototype
      - Recognized as a Young Innovator by India Tech Awards
    `,
    img: '/founders/shivanshu.jpeg',
    linkedin: 'https://www.linkedin.com/in/shivanshu-tank-556b00232/',
  },
  {
    name: 'Syed Mujahid',
    role: 'CTO',
    bio: `
      Syed Mujahid, an Aerospace Engineering expert, leads the design of Dragale’s eVTOL air ambulance. His experience at Mallard Enterprises and as a Youth Ambassador & Advisor at the Advanced Air Mobility Institute ensures cutting-edge innovation and safety in every system.

    `,
    achievements: `
      - Designed core eVTOL propulsion system
      - Published research on urban air mobility
      - Speaker at Global Aviation Summit 2024
    `,
    img: '/founders/syed.jpg',
    linkedin: 'https://www.linkedin.com/in/syed-mujahid-496064228/',
  },
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

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };
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
            ? 'bg-black text-white'
            : 'min-h-screen bg-black pt-10 text-white'
        }
      >
        <main
          id="about"
          className={`px-4 sm:px-8 lg:px-16 ${
            isEmbedded ? 'py-8 space-y-8 scroll-mt-28' : 'py-16 space-y-12'
          } max-w-6xl mx-auto`}
        >
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative text-left pb-5 section-divider"
          >
            {headingLevel === 2 ? (
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-clip-white">
                Dragale Aviation
              </h2>
            ) : (
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-clip-white">
                Dragale Aviation
              </h1>
            )}
            <p className="font-stretch-normal line-clamp-3 text-gray-300 text-base leading-relaxed max-w-3xl">
              At Dragale Aviation, we’re redefining emergency medical transport
              with India’s first eVTOL air ambulance. Our mission is to deliver
              rapid, safe, and innovative critical care, ensuring every patient
              reaches help when it matters most.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative text-left pb-5 section-divider"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Our Vision
            </h2>
            <p className="font-stretch-normal line-clamp-3  text-gray-400 text-base max-w-3xl">
              We envision a future where advanced air mobility transforms lives.
              By pioneering eVTOL technology, Dragale Aviation aims to make
              emergency medical transport accessible, efficient, and sustainable
              across India and beyond.
            </p>
          </motion.div>

          {/* Animated Heading */}
          <h2
            ref={ref}
            className="flex justify-start relative text-left pb-5 section-divider"
            aria-label="Meet Our Visionaries"
          >
            <AnimatePresence>
              {text.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="text-2xl sm:text-4xl font-bold tracking-tight select-none text-white"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </AnimatePresence>
          </h2>

          {/* Team Grid */}
          <section
            className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 justify-center  items-center"
            aria-label="Team Members"
          >
            <TeamCard
              teamData={teamData}
              cardVariants={cardVariants}
              badgeVariants={badgeVariants}
              handleCardClick={(person) => handleCardClick(person as Person)}
            />
          </section>

          {/* Team Section */}
          {showTeam && <TeamPage headingLevel={2} contained />}

          {/* Advisors Section */}
          {showAdvisors ? (
            <section>
              <AdvisorsClient headingLevel={2} contained />
            </section>
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
