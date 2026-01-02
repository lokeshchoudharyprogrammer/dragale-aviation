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
    linkedin: '',
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
    linkedin: '',
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

const TeamPage: React.FC<{ headingLevel?: 1 | 2 }> = ({ headingLevel = 1 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Person | null>(null);

  const handleCardClick = (person: Person) => {
    console.log('Clicked:', person.name);
    setSelectedMember(person);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
  };

  return (
    <section className="min-h-screen  bg-black text-white px-6 py-30 flex flex-col  items-center justify-center p-8 w-[80%">
      <div>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mb-16 text-center" // 🔥 change from text-center → text-left
        >
          {headingLevel === 2 ? (
            <h2 className="text-4xl sm:text-5xl font-semibold mb-4 text-white leading-tight">
              Meet Our Team
            </h2>
          ) : (
            <h1 className="text-4xl sm:text-5xl font-semibold mb-4 text-white leading-tight">
              Meet Our Team
            </h1>
          )}
          <p className="text-gray-300 text-lg leading-relaxed">
            A group of talented individuals dedicated to building thoughtful and
            high-quality products.
          </p>
        </motion.div>
      </div>

      <div className="flex gap-10 flex-wrap items-center items-center justify-center p-8 w-[80%]">
        <TeamCard
          teamData={teamData}
          cardVariants={cardVariants}
          badgeVariants={badgeVariants}
          handleCardClick={(person) => handleCardClick(person as Person)}
          nameHeadingLevel={headingLevel === 1 ? 2 : 3}
          width={'40%'}
        />
      </div>
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
