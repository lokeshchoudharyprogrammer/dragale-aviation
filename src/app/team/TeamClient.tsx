'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaLinkedin } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';
import { Person } from '../../../utils/types';
import TeamModal from '@/components/TeamModal';

const teamData: Person[] = [
  {
    name: 'Ankit Soni',
    role: 'Design Director',
    bio: `Ankit Soni is an Industrial Designer with a Master’s Degree in Automotive Design and 7+ years of experience across design consultation, academia, and creative leadership. He has strong expertise in R&D, project management, and design innovation, contributing to organizations such as MFable Creative Lab, Gugu Energy, and Sayl Electric.`,
    img: '/team/ankit_soni.jpeg',
    linkedin: 'https://www.linkedin.com/in/ankit-sonie-b3580b13b/',
  },
  {
    name: 'Sujay Patel',
    role: 'Industrial Designer',
    bio: `Sujay Patel is an Industrial Designer with a Master’s Degree in Automotive Design and 5+ years of experience in the manufacturing industry. He focuses on enhancing safety, usability, and productivity through user-centered design. Sujay’s expertise spans industrial design, UI/UX, CAD modeling, CMF, and product development.`,
    img: '/team/sujay.png',
    linkedin: 'https://www.linkedin.com/in/sujay-patel-589724152/',
  },
  {
    name: 'Syed Mujahid',
    role: 'Aerospace Design Engineer',
    bio: `Syed Mujahid serves as an Aerospace Design Engineer at Dragale Aviation, contributing to the design and development of UAV and eVTOL platforms for medical logistics and emergency air ambulance applications. His work spans aircraft conceptual design, structural CAD modelling, propulsion architecture, subsystem integration, weight estimation, and rapid prototyping. He has contributed to the design of a medical logistics UAV with a 16 kg payload capacity and 46 kg maximum take-off weight, as well as the digital modelling of an eVTOL air ambulance configuration. His responsibilities also include material selection, 3D-printed prototype fabrication, component integration, computational fluid dynamics (CFD) analysis, and ground and flight testing of UAV prototypes.`,
    img: '/team/syed.jpg',
    linkedin: 'https://www.linkedin.com/in/syed-mujahid-496064228/',
  },
  {
    name: 'Jeeves Saini',
    role: 'UAV Systems Engineer',
    bio: `Jeeves Saini serves as a UAV Systems Engineer at Dragale Aviation, contributing to the development of advanced UAV and eVTOL platforms for medical logistics and emergency air ambulance applications. His work focuses on UAV and eVTOL assembly, systems integration, avionics, autonomous flight systems, and flight operations. By working at the intersection of aerospace engineering and autonomous technologies, he supports the development of reliable aerial platforms designed to advance time-critical medical transportation and emergency healthcare delivery.`,
    img: '/team/jeeves_saini.jpg',
  },
  {
    name: 'Medhansh Singhal',
    role: 'Embedded Systems Engineer',
    bio: `Medhansh Singhal serves as an Embedded Systems Engineer at Dragale Aviation, contributing to the development of embedded electronics and control systems for UAV and eVTOL platforms designed for medical logistics and emergency air ambulance applications. His work focuses on embedded firmware, sensor integration, hardware–software interfacing, and real-time system performance. By supporting the integration of reliable electronic systems with autonomous flight technologies, he contributes to the engineering development of aerial platforms intended to advance time-critical medical transportation.`,
    img: '/team/medhansh_singhal.jpg',
  },
];

interface TeamClientProps {
  headingLevel?: 1 | 2;
  contained?: boolean;
}

const TeamPage: React.FC<TeamClientProps> = ({
  headingLevel = 1,
  contained = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Person | null>(null);
  const isNested = headingLevel === 2;

  const handleCardClick = (person: Person) => {
    setSelectedMember(person);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
  };

  return (
    <section
      className={`bg-white text-gray-900 w-full relative ${
        contained
          ? 'py-12 md:py-20'
          : isNested
          ? 'pt-16 pb-20 md:pt-24 md:pb-28'
          : 'pt-28 pb-24 md:pt-36 md:pb-32'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          {headingLevel === 1 ? (
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter uppercase text-gray-900 mb-4 drop-shadow-sm">
              Our <span className="text-gray-400">Team</span>
            </h1>
          ) : (
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase text-gray-900 mb-4 drop-shadow-sm">
              Our <span className="text-gray-400">Team</span>
            </h2>
          )}
          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-light leading-relaxed">
            The aerospace engineers, industrial designers, and systems architects pioneering India’s medical-first eVTOL air ambulance fleet.
          </p>
        </motion.div>

        {/* Responsive Grid of All Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {teamData.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group bg-slate-50/70 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Portrait Photo */}
                <div
                  onClick={() => handleCardClick(person)}
                  className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-200 mb-6 cursor-pointer shadow-inner"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(person);
                    }
                  }}
                  aria-label={`View full profile of ${person.name}`}
                >
                  <Image
                    src={person.img}
                    alt={`${person.name} - ${person.role}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-xs font-semibold text-white tracking-wider uppercase bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full">
                      View Profile
                    </span>
                  </div>
                </div>

                {/* Role Badge & Social */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-slate-700 bg-slate-200/70 px-3 py-1 rounded-full">
                    {person.role}
                  </span>
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name}'s LinkedIn profile`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-400 hover:text-[#0A66C2] transition-colors p-1"
                    >
                      <FaLinkedin size={18} />
                    </a>
                  )}
                </div>

                {/* Name */}
                <h3
                  onClick={() => handleCardClick(person)}
                  className="text-2xl font-bold text-gray-900 tracking-tight mb-3 cursor-pointer group-hover:text-blue-900 transition-colors"
                >
                  {person.name}
                </h3>

                {/* Bio Excerpt */}
                <p className="text-sm text-gray-600 font-light leading-relaxed line-clamp-3 mb-6">
                  {person.bio.trim()}
                </p>
              </div>

              {/* Bottom Action Area */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleCardClick(person)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-gray-900 hover:text-blue-700 transition-colors group/btn"
                >
                  <span>Read Full Bio</span>
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  />
                </button>
                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-slate-500 hover:text-[#0A66C2] transition-colors"
                  >
                    Connect
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <TeamModal
          selectedMember={selectedMember}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default TeamPage;
