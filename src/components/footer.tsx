'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-black px-4 sm:px-8 lg:px-16 py-6"
    >
      <div className=" max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-300 text-center sm:text-left">
          <p className="font-medium">Dragale Aviation</p>

          <p>Jaipur City, India</p>
          <p>
            Email:{' '}
            <a
              href="mailto:info@dragaleaviation.com"
              className="hover:text-gray-400 transition"
            >
              info@dragaleaviation.com
            </a>
          </p>
        </div>
        <nav
          className="flex gap-6"
          role="navigation"
          aria-label="Social media links"
        >
          <motion.a
            href="https://www.linkedin.com/company/dragaleaviation/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: 'white' }}
            className="text-gray-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </motion.a>
          <motion.a
            href="https://x.com/Dragaleaviation"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: 'white' }}
            className="text-gray-300"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </motion.a>
          {/* <motion.a
            href="https://facebook.com"
            target="_blank"
            whileHover={{ scale: 1.2, color: "white" }}
            className="text-gray-300"
            aria-label="Facebook"
          >
            <FaFacebook size={20} />
          </motion.a> */}
          <motion.a
            href="https://www.instagram.com/dragaleaviation/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: 'white' }}
            className="text-gray-300"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </motion.a>

          <motion.a
            href="https://www.youtube.com/@DragaleAviation"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: 'white' }}
            className="text-gray-300"
            aria-label="Youtube"
          >
            <FaYoutube size={20} />
          </motion.a>
        </nav>
      </div>
    </motion.footer>
  );
};
