import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
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
  cardVariants: any;
  badgeVariants: any;
  handleCardClick?: (person: Person) => void;
  width?: string; // 👈 new prop for % width control
  nameHeadingLevel?: 2 | 3;
}

const TeamCard: React.FC<TeamCardProps> = ({
  teamData = [],
  primaryColor = '#00bcd4',
  cardVariants,
  badgeVariants,
  handleCardClick,
  width = '100%',
  nameHeadingLevel = 3,
}) => {
  return (
    <>
      {teamData.map((person, index) => (
        <Tilt
          key={index}
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          perspective={1000}
          transitionSpeed={300}
          scale={1.02}
          glareEnable={true}
          glareMaxOpacity={0.15}
          glareColor={primaryColor}
          glareBorderRadius="20px"
          style={{ width, minWidth: '250px', maxWidth: '500px' }} // 👈 consistent width in %
        >
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative bg-white/5 backdrop-blur-3xl p-6 rounded-2xl shadow-xl border border-white/20 hover:border-gray-500 transition-all cursor-pointer group mx-auto"
            onClick={() => handleCardClick?.(person)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick?.(person)}
            aria-label={`View details about ${person.name}`}
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
              className="w-24 h-24 relative rounded-full overflow-hidden shadow-lg mx-auto mb-4 bg-white"
            >
              <Image
                src={person.img}
                alt={`${person.name}, ${person.role}`}
                width={96}
                height={96}
                priority={index === 0}
                loading={index > 0 ? 'lazy' : undefined}
                className="object-cover rounded-full"
              />
            </motion.div>

            {/* Name & Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className="text-center"
            >
              {nameHeadingLevel === 2 ? (
                <h2 className="text-lg font-semibold text-white">
                  {person.name}
                </h2>
              ) : (
                <h3 className="text-lg font-semibold text-white">
                  {person.name}
                </h3>
              )}
              <motion.span
                variants={badgeVariants}
                initial="initial"
                whileHover="hover"
                className="bg-gray-900/30 text-gray-300 text-xs py-1 px-3 rounded-full font-medium mt-2 inline-block border border-white/40"
              >
                {person.role}
              </motion.span>
            </motion.div>

            {/* LinkedIn */}
            {person.linkedin && person.linkedin?.length > 3 && (
              <motion.a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: primaryColor }}
                className="absolute top-4 right-4 text-gray-400"
                aria-label={`Visit ${person.name}'s LinkedIn profile`}
              >
                <FaLinkedin size={20} />
              </motion.a>
            )}
          </motion.div>
        </Tilt>
      ))}
    </>
  );
};

export default TeamCard;
