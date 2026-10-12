import React from 'react';
import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { FaLinkedin } from 'react-icons/fa';

interface Person {
  name: string;
  role: string;
  img: string;
  linkedin?: string;
}

interface TeamCardProps {
  teamData: Person[];
  primaryColor?: string;
  cardVariants: Variants;
  badgeVariants: Variants;
  handleCardClick?: (person: Person) => void;
  width?: string;
  nameHeadingLevel?: 2 | 3;
}

const TeamCard: React.FC<TeamCardProps> = ({
  teamData = [],
  primaryColor = '#000',
  cardVariants,
  badgeVariants,
  handleCardClick,
  width = '100%',
  nameHeadingLevel = 3,
}) => {
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches;

  return (
    <>
      {teamData.map((person, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          initial={isMobile ? false : 'initial'}
          {...(isMobile
            ? { animate: 'animate' }
            : { whileInView: 'animate', viewport: { once: true } })}
          transition={{
            duration: isMobile ? 0 : 0.6,
            delay: isMobile ? 0 : index * 0.1,
          }}
          className="relative group cursor-pointer border-t border-gray-200 pt-8 mt-8 flex flex-col md:flex-row items-center md:items-start gap-8"
          onClick={() => handleCardClick?.(person)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleCardClick?.(person)}
          aria-label={`View details about ${person.name}`}
          style={{ width, maxWidth: '800px', margin: '0 auto' }}
        >
          {/* Image */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: isMobile ? 0 : 0.5,
              delay: isMobile ? 0 : index * 0.1 + 0.1,
            }}
            className="w-32 h-32 md:w-48 md:h-48 relative rounded-full overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500"
          >
            <Image
              src={person.img}
              alt={`${person.name}, ${person.role}`}
              fill
              priority={index === 0}
              loading={index > 0 ? 'lazy' : undefined}
              className="object-cover"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: isMobile ? 0 : 0.5,
              delay: isMobile ? 0 : index * 0.1 + 0.2,
            }}
            className="flex flex-col text-center md:text-left flex-1"
          >
            {nameHeadingLevel === 2 ? (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                {person.name}
              </h2>
            ) : (
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                {person.name}
              </h3>
            )}
            <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mt-2 mb-4">
              {person.role}
            </p>
            
            <p className="text-gray-600 font-light leading-relaxed line-clamp-3 md:line-clamp-4">
              {person.role === 'Founder & CEO' 
                ? "Driven by a mission to transform emergency medical transport, Shivanshu Tank founded Dragale Aviation to create India’s first air ambulance eVTOL. With a Bachelor’s in Computer Science & Engineering, he blends technical expertise with visionary leadership to deliver faster, safer, and smarter critical care solutions."
                : "A key visionary leading the technical and operational strategy for Dragale Aviation's advanced air mobility solutions."}
            </p>

            <span className="text-sm font-semibold tracking-widest uppercase text-gray-900 border-b border-gray-900 pb-1 mt-6 self-center md:self-start group-hover:text-gray-500 group-hover:border-gray-500 transition-colors">
              Read Full Bio
            </span>
          </motion.div>

          {/* LinkedIn */}
          {person.linkedin && person.linkedin?.length > 3 && (
            <motion.a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-8 right-0 text-gray-400 hover:text-[#0a66c2] transition-colors"
              aria-label={`Visit ${person.name}'s LinkedIn profile`}
            >
              <FaLinkedin size={24} />
            </motion.a>
          )}
        </motion.div>
      ))}
    </>
  );
};

export default TeamCard;
