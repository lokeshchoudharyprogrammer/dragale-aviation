'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaLinkedin } from 'react-icons/fa';

interface AdvisorCardProps {
  name: string;
  title: string;
  bio: string[];
  image: string;
  linkedin: string;
}

export default function AdvisorCard({
  name,
  title,
  bio,
  image,
  linkedin,
}: AdvisorCardProps) {
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches;

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, y: 40 }}
      {...(isMobile
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true } })}
      transition={{ duration: isMobile ? 0 : 0.6 }}
      whileHover={{ scale: 1.04 }}
      className=" relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl shadow-2xl p-0 flex flex-col items-center max-w-3xl w-full border border-white/20 hover:border-white/40 transition-all overflow-hidden group"
    >
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 blur-3xl transition duration-700"></div>

      {/* HEADER */}
      <div className="w-full p-8 flex flex-col items-center relative z-10">
        <div className="relative">
          <Image
            src={image}
            alt={`${name}, ${title}`}
            width={180}
            height={180}
            className="rounded-full object-cover border-4 border-white shadow-lg relative z-10"
          />
          {/* Halo Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/40 to-purple-400/40 blur-xl z-0"></div>
        </div>

        <h3 className="mt-6 text-3xl font-extrabold text-white tracking-wide text-center">
          {name}
        </h3>
        <p className="mt-2 text-base text-green-300 font-medium text-center max-w-lg">
          {title}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/10"></div>

      {/* BIO */}
      <div className="px-8 py-6 space-y-4 text-gray-200 text-[15px] leading-relaxed text-justify max-w-2xl relative z-10">
        {bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/10 mt-auto"></div>

      {/* FOOTER */}
      <div className="p-6 flex justify-center">
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 text-white text-sm md:text-base font-medium backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <FaLinkedin size={18} /> View LinkedIn
        </a>
      </div>
    </motion.div>
  );
}
