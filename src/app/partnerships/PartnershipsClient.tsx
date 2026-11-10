'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface Partner {
  name: string;
  role: string;
  url: string;
  domain: string;
  logo: string;
  logoDark: boolean; // true = logo is white, needs dark background
  logoWidth: number;
  logoHeight: number;
  logoClass: string;
  summary: string;
  highlights: string[];
}

const partners: Partner[] = [
  {
    name: 'Avionyz',
    role: 'Media Partner',
    url: 'https://www.avionyz.com/',
    domain: 'avionyz.com',
    logo: '/partners/avionyz-logo.png',
    logoDark: false,
    logoWidth: 1908,
    logoHeight: 386,
    logoClass: 'w-3/5 h-auto',
    summary:
      'Avionyz is a dedicated aviation news platform delivering reliable coverage, industry updates, events, and insights. As our media partner, Avionyz helps amplify Dragale Aviation’s story across the global aviation community.',
    highlights: [
      'Aviation news, events & industry insights',
      'Amplifies our eVTOL air ambulance programme',
      'Reaches aviation professionals worldwide',
    ],
  },
  {
    name: 'MyOnlineJet',
    role: 'Infrastructure Partner',
    url: 'https://myonlinejet.com/',
    domain: 'myonlinejet.com',
    logo: '/partners/myonlinejet-white.png',
    logoDark: true,
    logoWidth: 1280,
    logoHeight: 341,
    logoClass: 'w-3/5 h-auto',
    summary:
      'MyOnlineJet is an aviation infrastructure technology company focused on urban air mobility, vertiport networks, and next-generation transport systems. As our infrastructure partner, it supports the ground ecosystem our aircraft need to operate.',
    highlights: [
      'Urban air mobility & vertiport networks',
      'Next-generation transport systems',
      'Ground infrastructure for medical eVTOL missions',
    ],
  },
  {
    name: 'ASR Aviation',
    role: 'Charter Partner',
    url: 'https://asraviation.com/',
    domain: 'asraviation.com',
    logo: '/partners/asr-aviation-logo.png',
    logoDark: true,
    logoWidth: 888,
    logoHeight: 802,
    logoClass: 'h-3/4 w-auto',
    summary:
      'ASR Aviation provides private jet and helicopter charter options across India, Dubai, the USA, Europe and selected international destinations. As our charter partner, ASR Aviation extends our air mobility ecosystem with on-demand charter access.',
    highlights: [
      'Private jet & helicopter charter worldwide',
      'Coverage across India, Dubai, USA & Europe',
      'On-demand charter access, subject to availability',
    ],
  },
];

const PartnershipsClient: React.FC = () => {
  return (
    <section className="bg-white text-gray-900 w-full relative pt-28 pb-24 md:pt-36 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter uppercase text-gray-900 mb-4 drop-shadow-sm">
            Our <span className="text-gray-400">Partners</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-light leading-relaxed">
            The brands standing alongside Dragale Aviation to build India’s medical-first eVTOL air ambulance ecosystem.
          </p>
        </motion.div>

        {/* Partner cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-slate-50/70 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Logo (links to partner site) */}
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${partner.name} (${partner.domain})`}
                  className={`relative flex items-center justify-center w-full aspect-[16/7] rounded-2xl overflow-hidden mb-6 shadow-inner border ${
                    partner.logoDark
                      ? 'bg-[#111111] border-[#111111]'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={partner.logoWidth}
                    height={partner.logoHeight}
                    unoptimized={partner.logo.endsWith('.svg')}
                    className={`object-contain ${partner.logoClass} transition-transform duration-500 ease-out group-hover:scale-105`}
                  />
                  <span className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#00AEEF] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </a>

                {/* Role badge + domain */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-slate-700 bg-slate-200/70 px-3 py-1 rounded-full">
                    {partner.role}
                  </span>
                  <span className="text-xs font-mono font-semibold text-gray-500">
                    {partner.domain}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 group-hover:text-[#00AEEF] transition-colors mb-3">
                  {partner.name}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed mb-5">
                  {partner.summary}
                </p>

                <ul className="space-y-2 mb-6">
                  {partner.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#00AEEF] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase bg-[#111111] text-white hover:bg-[#00AEEF] hover:shadow-lg hover:shadow-[#00AEEF]/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-sm self-start"
              >
                Visit Website <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mt-16 md:mt-20"
        >
          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-light leading-relaxed mb-6">
            Interested in partnering with Dragale Aviation?
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase bg-[#111111] text-white hover:bg-[#00AEEF] hover:shadow-lg hover:shadow-[#00AEEF]/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-sm"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipsClient;
