'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, ShieldCheck, HeartHandshake } from 'lucide-react';

interface PreviewCTAProps {
  className?: string;
}

export default function PreviewCTA({ className = '' }: PreviewCTAProps) {
  return (
    <section className={`relative w-full py-24 sm:py-32 bg-[#020205] text-white px-6 lg:px-12 overflow-hidden border-t border-white/10 ${className}`}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00AEEF]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00AEEF] uppercase tracking-widest mb-6">
          <HeartHandshake className="w-3.5 h-3.5 text-[#00AEEF]" />
          <span>JOIN THE CRITICAL CARE AVIATION REVOLUTION</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 font-sans">
          Deploy the Flying ICU for Your Healthcare Network.
        </h2>

        <p className="text-base sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10 font-sans">
          Whether you are a hospital director, state disaster management coordinator, or healthcare partner, 
          partner with Dragale Aviation to eliminate transit barriers and protect the Golden Hour.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact-us"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00AEEF] hover:bg-[#0098d4] text-black font-bold px-8 py-4 rounded-full text-sm font-mono uppercase tracking-wider shadow-[0_0_30px_rgba(0,174,239,0.3)] transition-all cursor-pointer"
          >
            <span>Request Clinical Briefing</span>
            <Mail className="w-4 h-4" />
          </Link>

          <Link
            href="/solutions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full text-sm font-mono uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
          >
            <span>Explore Clinical Solutions</span>
            <ArrowRight className="w-4 h-4 text-[#00AEEF]" />
          </Link>
        </div>

        {/* Reassurance points */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#00AEEF]" />
            <span>DGCA Rule 133A Regulatory Alignment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#00AEEF]" />
            <span>Zero Direct Carbon Emissions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#00AEEF]" />
            <span>Point-to-Point Rooftop Access</span>
          </div>
        </div>
      </div>
    </section>
  );
}
