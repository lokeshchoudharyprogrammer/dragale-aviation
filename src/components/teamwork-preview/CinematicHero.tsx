'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronDown, Activity, Sparkles } from 'lucide-react';

interface CinematicHeroProps {
  onScrollCueClick?: () => void;
  className?: string;
}

export default function CinematicHero({
  onScrollCueClick,
  className = '',
}: CinematicHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleScrollDown = () => {
    if (onScrollCueClick) {
      onScrollCueClick();
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={`relative min-h-screen w-full bg-[#050a1f] flex flex-col justify-between overflow-hidden ${className}`}>
      {/* Background Ambient Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src="/animated-videos/dx2-intro.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a1f] via-[#050a1f]/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#050a1f]/80 pointer-events-none" />
      </div>

      {/* Top Header Spacing with Contrast Underlay for Navbar (#111111 text at scrollY=0) */}
      <div className="relative z-30 pt-[80px] px-6 lg:px-12 w-full max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-[#00AEEF]">
            <Sparkles className="w-3.5 h-3.5 text-[#00AEEF]" />
            <span>MEDICAL-FIRST EVTOL PLATFORM</span>
          </div>
          <div className="text-xs font-mono text-gray-400 hidden sm:block">
            DIRECT EMERGENCY TRAUMA TRANSFER
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-30 px-6 lg:px-12 w-full max-w-[1400px] mx-auto my-auto py-12">
        <div className="max-w-4xl">
          {/* Eyebrow model designation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#00AEEF] font-semibold">
              AYUDX2
            </span>
            <span className="h-px w-12 bg-[#00AEEF]/50" />
            <span className="text-xs font-mono text-gray-400 tracking-wider">
              GENERATION 1 AIR AMBULANCE
            </span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-[90px] font-bold tracking-tight text-white leading-[1.05] font-sans mb-6"
          >
            The Golden Hour, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#00AEEF]">
              Redefined.
            </span>
          </motion.h1>

          {/* Narrative Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 font-medium leading-relaxed max-w-2xl mb-8"
          >
            Bypassing traffic gridlock and geographical barriers with high-speed medical eVTOL transit.
            Transforming emergency transport into flying intensive care across India’s critical medical corridors.
          </motion.p>

          {/* Quick Metrics Badge Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mb-8"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 border-l-4 border-l-[#00AEEF]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Cruise Speed</div>
              <div className="text-lg font-bold text-white mt-0.5">250 km/h (150 mph)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 border-l-4 border-l-[#00AEEF]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Transit Reduction</div>
              <div className="text-lg font-bold text-white mt-0.5">Up to 80% Faster</div>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 border-l-4 border-l-[#00AEEF]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Emissions</div>
              <div className="text-lg font-bold text-white mt-0.5">Zero Operational</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Controls & Scroll Cue */}
      <div className="relative z-30 px-6 lg:px-12 w-full max-w-[1400px] mx-auto pb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Ambient Video Audio & Playback Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#00AEEF]" />
                <span>PAUSE REEL</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#00AEEF]" />
                <span>PLAY REEL</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="p-2.5 bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md border border-white/20 text-white rounded-full transition-all duration-200 cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-gray-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#00AEEF]" />
            )}
          </button>
        </div>

        {/* Scroll Cue Animation */}
        <button
          type="button"
          onClick={handleScrollDown}
          className="group flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5 text-[#00AEEF]">
            <Activity className="w-3.5 h-3.5" />
            <span>EXPLORE AIRCRAFT IN 360°</span>
          </span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#00AEEF] transition-colors">
            <ChevronDown className="w-4 h-4 text-white animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
