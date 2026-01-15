'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TeamCard from '@/components/TeamCard';
import { Person } from '../../../utils/types';
import TeamModal from '@/components/TeamModal';

const teamData = [
  {
    name: 'Ankit Soni',
    role: 'Design Director',
    bio: `
Ankit Soni is an Industrial Designer with a Master’s Degree in Automotive Design and 7+ years of experience across design consultation, academia, and creative leadership. 
He has strong expertise in R&D, project management, and design innovation, contributing to organizations such as MFable Creative Lab, Gugu Energy, and Sayl Electric, with global collaborations including Tigris Mobility, Bullhorn USA, and Velocity Wheel NY. 
Currently, he serves as Design Director at Hydrone Aviation Pvt. Ltd. and Hypsat Pvt. Ltd., driving innovation in sustainable mobility and advanced product development. 
Ankit has also mentored future designers at the World University of Design (WUD) and United World Institute of Design (UID), Ahmedabad, specializing in transportation and industrial design.
    `,
    achievements: `
- Design Director at Hydrone Aviation Pvt. Ltd. & Hypsat Pvt. Ltd.
- Led design projects for MFable Creative Lab, Gugu Energy, Sayl Electric
- Global collaborations with Tigris Mobility, Bullhorn USA, Velocity Wheel NY
- Mentored students at WUD and UID in transportation & industrial design
    `,
    img: '/team/ankit_soni.jpeg',
    linkedin: 'https://www.linkedin.com/in/ankit-sonie-b3580b13b/',
  },

  {
    name: 'Sujay Patel',
    role: 'Industrial Designer',
    bio: `
Sujay Patel is an Industrial Designer with a Master’s Degree in Automotive Design and 5+ years of experience in the manufacturing industry. 
He focuses on enhancing safety, usability, and productivity through user-centered design. 
Sujay’s expertise spans industrial design, UI/UX, CAD modeling, CMF, and product development. 
Passionate about technology and human factors, he creates impactful design solutions blending functionality, innovation, and aesthetics.
    `,
    achievements: `
- 5+ years in industrial design and product development
- Expert in UI/UX, CAD modeling, CMF
- Designed user-centered solutions enhancing safety and productivity
- Passionate about innovative, functional, and aesthetic design
    `,
    img: '/team/sujay.png',
    linkedin: 'https://www.linkedin.com/in/sujay-patel-589724152/',
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const badgeVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
};

const TeamPage: React.FC<{ headingLevel?: 1 | 2; contained?: boolean }> = ({
  headingLevel = 1,
  contained = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Person | null>(null);
  const isNested = headingLevel === 2;

  const handleCardClick = (person: Person) => {
    console.log('Clicked:', person.name);
    setSelectedMember(person);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
  };

  const nameHeadingLevel = isNested ? 3 : 2;

  return (
    <section
      className={`bg-black text-white w-full flex flex-col ${
        isNested
          ? 'pt-6 gap-8'
          : 'min-h-screen px-6 py-20 gap-14 items-center justify-center'
      }`}
    >
      {isNested ? (
        <div
          className={`mx-auto max-w-6xl w-full ${
            contained ? '' : 'px-4 sm:px-8 lg:px-16'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full pb-6 section-divider text-left"
          >
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Meet Our Team
            </h2>
            <p className="text-gray-300 text-base leading-relaxed max-w-3xl">
              A group of talented individuals dedicated to building thoughtful
              and high-quality products.
            </p>
          </motion.div>

          <div className="w-full mt-6 flex gap-8 flex-wrap justify-center md:justify-start items-start">
            <TeamCard
              teamData={teamData}
              cardVariants={cardVariants}
              badgeVariants={badgeVariants}
              handleCardClick={(person) => handleCardClick(person as Person)}
              nameHeadingLevel={nameHeadingLevel}
              width={'40%'}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="max-w-6xl w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl w-full pb-6 section-divider text-left"
            >
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                Meet Our Team
              </h1>
              <p className="text-gray-300 text-base leading-relaxed max-w-3xl">
                A group of talented individuals dedicated to building thoughtful
                and high-quality products.
              </p>
            </motion.div>
          </div>

          <div className="max-w-6xl w-full mx-auto mt-6 flex gap-8 flex-wrap justify-center md:justify-start items-start">
            <TeamCard
              teamData={teamData}
              cardVariants={cardVariants}
              badgeVariants={badgeVariants}
              handleCardClick={(person) => handleCardClick(person as Person)}
              nameHeadingLevel={nameHeadingLevel}
              width={'40%'}
            />
          </div>
        </>
      )}
      {isModalOpen && (
        <TeamModal
          selectedMember={selectedMember}
          isOpen={isModalOpen}
          onClose={closeModal}
          badgeVariants={badgeVariants}
        />
      )}
    </section>
  );
};

export default TeamPage;
