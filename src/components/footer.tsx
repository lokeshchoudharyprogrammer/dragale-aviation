'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-white px-6 sm:px-12 lg:px-24 py-20 font-sans">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
        
        {/* Logo and About */}
        <div className="flex flex-col space-y-6">
          <Link href="/" className="font-bold text-3xl tracking-tight uppercase">
            DRAGALE
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Dragale Aviation is an aerospace company developing UAV and eVTOL platforms for medical logistics and emergency air ambulance applications.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-lg font-semibold tracking-wide mb-2">Company</h4>
          <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</Link>
          <Link href="/team" className="text-gray-400 hover:text-white transition-colors duration-300">Team</Link>
          <Link href="/products" className="text-gray-400 hover:text-white transition-colors duration-300">Aircraft</Link>
          <Link href="/solutions" className="text-gray-400 hover:text-white transition-colors duration-300">Solutions</Link>
          <Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-300">News & Press</Link>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-lg font-semibold tracking-wide mb-2">Contact</h4>
          <p className="text-gray-400">Jaipur City, India</p>
          <a
            href="mailto:info@dragaleaviation.com"
            className="text-gray-400 hover:text-[#00AEEF] transition-colors duration-300"
          >
            info@dragaleaviation.com
          </a>
        </div>

        {/* Social & CTA */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-lg font-semibold tracking-wide mb-2">Connect</h4>
          <nav className="flex gap-4" role="navigation" aria-label="Social media links">
            <motion.a href="https://www.linkedin.com/company/dragaleaviation/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, color: '#0077b5' }} className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={22} />
            </motion.a>
            <motion.a href="https://x.com/Dragaleaviation" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, color: '#1DA1F2' }} className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
              <FaTwitter size={22} />
            </motion.a>
            <motion.a href="https://www.instagram.com/dragaleaviation/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, color: '#E1306C' }} className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <FaInstagram size={22} />
            </motion.a>
            <motion.a href="https://www.youtube.com/@DragaleAviation" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, color: '#FF0000' }} className="text-gray-400 hover:text-white transition-colors" aria-label="Youtube">
              <FaYoutube size={22} />
            </motion.a>
          </nav>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-[1400px] mx-auto border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
        <p>&copy; {new Date().getFullYear()} Dragale Aviation. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
