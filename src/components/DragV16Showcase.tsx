'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Package, 
  Activity, 
  Heart, 
  Thermometer, 
  Pill, 
  Building2, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  CheckCircle2,
  Wind,
  Navigation,
  Layers,
  Sparkles,
  Film,
  Camera,
  Boxes
} from 'lucide-react';

// ── VIDEOS DATA (From public/videos/drag-v16/ & public/DRAG V-16 Video/) ──
const dragV16Videos = [
  {
    id: 'intro',
    src: '/videos/drag-v16/drag-v16-intro.mp4',
    poster: '/videos/drag-v16/drag-v16-intro-poster.jpg',
    tag: 'Airframe Turntable',
    badge: '360° Inspection',
    title: '360° Airframe Architecture',
    subtitle: 'High-Aspect Carbon-Composite Airframe',
    durationText: '0:29',
    description: '360-degree aerodynamic inspection highlighting the high-wing cantilever design, V-tail, and low-drag composite fuselage engineered for extreme stability across diverse weather conditions.',
    telemetry: [
      { label: 'Airframe', value: 'Carbon Composite CFRP' },
      { label: 'Wing Config', value: 'High-Wing Rigid Span' },
      { label: 'Tail Config', value: 'V-Tail' },
      { label: 'Aero Profile', value: 'L/D Optimized Cruise' },
    ],
    highlights: [
      'High-wing layout shields propulsion from ground and rooftop debris',
      'V-tail configuration optimizes yaw and pitch authority in crosswinds',
      'Streamlined aerodynamic pod maximizes battery endurance to 160 km'
    ]
  },
  {
    id: 'cargo',
    src: '/videos/drag-v16/drag-v16-cargo.mp4',
    poster: '/videos/drag-v16/drag-v16-cargo-poster.jpg',
    tag: 'Medical Logistics',
    badge: 'Payload Bay',
    title: 'Medical Cargo Compartment',
    subtitle: 'Automated Dual-Pod Deployment',
    durationText: '0:07',
    description: 'Automated lower-fuselage belly hatch reveals twin medical payload pods. Engineered for rapid turnarounds between hospitals, diagnostic laboratories, blood banks and healthcare facilities.',
    telemetry: [
      { label: 'Payload Capacity', value: '16 kg' },
      { label: 'Turnaround Time', value: '< 45 Seconds' },
      { label: 'Mission Focus', value: 'Medical Cargo' },
      { label: 'Airframe Weight', value: '46 kg MTOW' },
    ],
    highlights: [
      'Twin dedicated pods engineered for rapid medical cargo loading',
      'Enclosed belly-hatch mechanism keeps specimens protected en route',
      'Shock-isolated internal suspension protects blood bags and lab vials'
    ]
  },
  {
    id: 'flight',
    src: '/videos/drag-v16/drag-v16-flight.mp4',
    poster: '/videos/drag-v16/drag-v16-flight-poster.jpg',
    tag: 'BVLOS Flight Corridor',
    badge: 'Flight Simulation',
    title: 'Designated Medical Skyway Transit',
    subtitle: 'High-Speed Point-to-Point Medical Delivery',
    durationText: '0:16',
    description: 'High-speed flight navigating low-altitude corridors to link regional healthcare facilities, diagnostic laboratories, blood banks and clinics.',
    telemetry: [
      { label: 'Cruising Speed', value: '160 km/h' },
      { label: 'Range', value: '160 km' },
      { label: 'Operating Altitude', value: '400 ft AGL' },
      { label: 'Propulsion', value: 'Electric' },
    ],
    highlights: [
      'Low-altitude corridor transit cruising at 400 ft AGL',
      'Dedicated point-to-point medical logistics connectivity',
      'Long-range electric propulsion supporting up to 160 km'
    ]
  }
];

// ── HIGH-RES PHOTOGRAPHIC STILLS ──
const dragV16Stills = [
  {
    id: 'flight-still',
    src: '/images/drag-v16/drag-v16-flight.jpeg',
    tag: 'Forward Cruise Flight',
    title: 'High-Speed Aerodynamic Transit',
    subtitle: '160 km/h Cruise Velocity at Sunset',
    caption: 'Tuned for low-drag cruise efficiency, achieving 160 km/h over regional healthcare routes with minimal acoustic footprint.',
    specs: [
      { label: 'Cruising Speed', value: '160 km/h' },
      { label: 'Max Range', value: '160 km' },
      { label: 'Flight Ceiling', value: '400 ft AGL' }
    ]
  },
  {
    id: 'airframe-still',
    src: '/images/drag-v16/drag-v16-airframe.jpeg',
    tag: 'V-Tail Airframe',
    title: 'Precision Structural Architecture',
    subtitle: 'High-Wing Rigidity & Distributed Propulsion',
    caption: 'Engineered with high-wing stability and V-tail structure for rock-solid stability across challenging weather conditions.',
    specs: [
      { label: 'Airframe Structure', value: 'Aviation Carbon CFRP' },
      { label: 'MTOW', value: '46 kg' },
      { label: 'Tail Configuration', value: 'V-Tail' }
    ]
  },
  {
    id: 'urban-still',
    src: '/images/drag-v16/drag-v16-urban.jpeg',
    tag: 'Hospital Integration',
    title: 'Hospital Rooftop & Clinic Approach',
    subtitle: 'Precision Point-to-Point Medical Delivery',
    caption: 'Designed for safe point-to-point operations between hospital rooftops, diagnostic labs, and blood banks with digital custody handshake.',
    specs: [
      { label: 'Landing Profile', value: 'Short-Run / Helipad FATO' },
      { label: 'Custody Tracking', value: 'QR/RFID Digital Handshake' },
      { label: 'Turnaround', value: 'Under 45 Seconds' }
    ]
  }
];

const missionApplications = [
  {
    icon: <Heart className="w-6 h-6 text-[#00AEEF]" />,
    title: 'Blood & Blood Products',
    desc: 'Rapid transport of urgent packed red blood cells, plasma, and life-saving platelets between blood banks, trauma centers, and healthcare facilities.'
  },
  {
    icon: <Activity className="w-6 h-6 text-[#00AEEF]" />,
    title: 'Diagnostic Lab Samples',
    desc: 'Time-critical transfer of diagnostic pathology specimens, biopsies, and urgent clinical test samples between remote collection centers and central labs.'
  },
  {
    icon: <Thermometer className="w-6 h-6 text-[#00AEEF]" />,
    title: 'Cold-Chain Vaccine Delivery',
    desc: 'Temperature-regulated transport for vaccines, diagnostic biologicals, and medical supplies with digital monitoring.'
  },
  {
    icon: <Pill className="w-6 h-6 text-[#00AEEF]" />,
    title: 'Medicines & Pharmaceuticals',
    desc: 'Rapid delivery of essential pharmaceuticals, anti-snake venoms, rare medications, and emergency antidotes across congested cities or hills.'
  },
  {
    icon: <Package className="w-6 h-6 text-[#00AEEF]" />,
    title: 'Emergency Medical Supplies',
    desc: 'Immediate dispatch of trauma packs, emergency surgical consumables, defibrillator spares, and critical medical hardware directly to point of care.'
  },
  {
    icon: <Building2 className="w-6 h-6 text-[#00AEEF]" />,
    title: 'Medical Logistics Networks',
    desc: 'Healthcare logistics infrastructure connecting hospital networks, diagnostic centers, and regional health facilities.'
  }
];

const technicalSpecs = [
  { label: 'Aircraft Model', value: 'DRAG V-16' },
  { label: 'Manufacturer', value: 'Dragale Aviation Private Limited' },
  { label: 'Aircraft Type', value: 'Fixed-wing UAV' },
  { label: 'Primary Application', value: 'Medical Logistics & Supply Transport' },
  { label: 'Payload Capacity', value: '16 kg' },
  { label: 'Maximum Take-Off Weight (MTOW)', value: '46 kg' },
  { label: 'Range', value: '160 km' },
  { label: 'Endurance', value: '1 Hour' },
  { label: 'Cruise Speed', value: '160 km/h' },
  { label: 'Operating Altitude', value: '400 ft' },
  { label: 'Wing Configuration', value: 'High-wing' },
  { label: 'Tail Configuration', value: 'V-tail' },
  { label: 'Propulsion', value: 'Electric' }
];

export default function DragV16Showcase({
  headingLevel = 1,
  onSelectAyuRatha
}: {
  headingLevel?: 1 | 2;
  onSelectAyuRatha?: () => void;
}) {
  // Gallery mode: 'video' | 'stills'
  const [mediaMode, setMediaMode] = useState<'video' | 'stills'>('video');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [selectedStillIndex, setSelectedStillIndex] = useState(0);
  
  // Video player controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState('0:00');
  const [videoDuration, setVideoDuration] = useState('0:00');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const isManualNavRef = useRef(false);
  const manualNavTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll-based switching for the sticky gallery
  const { scrollYProgress } = useScroll({
    target: gallerySectionRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress: number) => {
    if (isManualNavRef.current) return;
    let nextIdx = 0;
    if (progress >= 0.65) {
      nextIdx = 2;
    } else if (progress >= 0.32) {
      nextIdx = 1;
    } else {
      nextIdx = 0;
    }
    if (mediaMode === 'video') {
      setSelectedVideoIndex(nextIdx);
    } else {
      setSelectedStillIndex(nextIdx);
    }
  });

  // Switch video and trigger playback
  const handleSelectVideo = useCallback((idx: number) => {
    setSelectedVideoIndex(idx);
    setIsPlaying(true);
    isManualNavRef.current = true;
    if (manualNavTimerRef.current) clearTimeout(manualNavTimerRef.current);
    manualNavTimerRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 1000);

    if (gallerySectionRef.current) {
      const rect = gallerySectionRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const sectionTop = rect.top + currentScroll;
      const totalScrollable = gallerySectionRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const fraction = idx === 0 ? 0.15 : idx === 1 ? 0.5 : 0.85;
        const targetY = sectionTop + fraction * totalScrollable;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  }, []);

  const handleSelectStill = (idx: number) => {
    setSelectedStillIndex(idx);
    isManualNavRef.current = true;
    if (manualNavTimerRef.current) clearTimeout(manualNavTimerRef.current);
    manualNavTimerRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 1000);

    if (gallerySectionRef.current) {
      const rect = gallerySectionRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const sectionTop = rect.top + currentScroll;
      const totalScrollable = gallerySectionRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const fraction = idx === 0 ? 0.15 : idx === 1 ? 0.5 : 0.85;
        const targetY = sectionTop + fraction * totalScrollable;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  // Video element event handlers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setVideoProgress((current / dur) * 100);

    const curMins = Math.floor(current / 60);
    const curSecs = Math.floor(current % 60);
    setVideoCurrentTime(`${curMins}:${curSecs < 10 ? '0' : ''}${curSecs}`);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    const dur = videoRef.current.duration;
    if (!isNaN(dur)) {
      const durMins = Math.floor(dur / 60);
      const durSecs = Math.floor(dur % 60);
      setVideoDuration(`${durMins}:${durSecs < 10 ? '0' : ''}${durSecs}`);
    }
    if (isPlaying) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const targetTime = pos * videoRef.current.duration;
    videoRef.current.currentTime = targetTime;
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // When active video changes, reset and play
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.load();
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [selectedVideoIndex, mediaMode]);

  useEffect(() => {
    return () => {
      if (manualNavTimerRef.current) {
        clearTimeout(manualNavTimerRef.current);
      }
    };
  }, []);

  const currentVideo = dragV16Videos[selectedVideoIndex];
  const currentStill = dragV16Stills[selectedStillIndex];

  return (
    <div className="w-full bg-white text-gray-900 font-sans">
      
      {/* ── 1. HERO HEADER ──────────────────────────────────────────────── */}
      <section className="relative w-full pt-12 pb-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/30 text-xs font-bold tracking-widest uppercase text-[#00AEEF] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-pulse" />
            Medical Logistics UAV • 16 kg Payload • BVLOS
          </motion.div>

          {headingLevel === 2 ? (
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-gray-900 leading-none mb-6">
              DRAG <span className="text-[#00AEEF]">V-16</span>
            </h2>
          ) : (
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-gray-900 leading-none mb-6">
              DRAG <span className="text-[#00AEEF]">V-16</span>
            </h1>
          )}

          <p className="text-xl sm:text-3xl text-gray-600 font-light tracking-wide mb-6">
            DRAG V-16 — Fixed-Wing UAV for Medical Logistics
          </p>

          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal">
            DRAG V-16 is a fixed-wing unmanned aerial vehicle being developed by Dragale Aviation for medical logistics applications. With a payload capacity of 16 kg, it is designed to support the transportation of essential medical supplies between hospitals, diagnostic laboratories, blood banks and healthcare facilities.
          </p>
        </div>

        {/* ── 2. KEY SPEC HIGHLIGHTS PILL BAR ────────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12 pt-8 border-t border-gray-100"
        >
          <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-1">Payload</span>
            <span className="text-2xl sm:text-3xl font-black text-gray-900">16 <span className="text-sm font-normal text-gray-500">kg</span></span>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-1">Range</span>
            <span className="text-2xl sm:text-3xl font-black text-gray-900">160 <span className="text-sm font-normal text-gray-500">km</span></span>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-1">Cruise Speed</span>
            <span className="text-2xl sm:text-3xl font-black text-gray-900">160 <span className="text-sm font-normal text-gray-500">km/h</span></span>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-1">Endurance</span>
            <span className="text-2xl sm:text-3xl font-black text-gray-900">1 <span className="text-sm font-normal text-gray-500">Hour</span></span>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-1">MTOW</span>
            <span className="text-2xl sm:text-3xl font-black text-gray-900">46 <span className="text-sm font-normal text-gray-500">kg</span></span>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-1">Propulsion</span>
            <span className="text-2xl sm:text-3xl font-black text-[#00AEEF]">Electric</span>
          </div>
        </motion.div>
      </section>

      {/* ── 3. INTERACTIVE CINEMATIC VIDEO & IMAGE SHOWCASE ──────────────── */}
      <section 
        ref={gallerySectionRef}
        className="relative w-full bg-[#0a0a0c] text-white h-[260vh]"
      >
        <div className="sticky top-16 md:top-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center py-6 sm:py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full">
          
          {/* Header Bar with Mode Switcher (Video vs Stills) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00AEEF]/15 border border-[#00AEEF]/30 text-xs font-bold tracking-widest uppercase text-[#00AEEF] mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] animate-pulse" />
                {mediaMode === 'video' ? 'Interactive Video Showcase' : 'High-Res Engineering Stills'}
              </div>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
                {mediaMode === 'video' ? currentVideo.title : currentStill.title}
              </h3>
            </div>

            {/* Mode Toggle Button Pill */}
            <div className="flex items-center gap-3">
              <div className="inline-flex p-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setMediaMode('video')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    mediaMode === 'video'
                      ? 'bg-[#00AEEF] text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Cinematic Video</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </button>
                <button
                  type="button"
                  onClick={() => setMediaMode('stills')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    mediaMode === 'stills'
                      ? 'bg-[#00AEEF] text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Technical Stills</span>
                </button>
              </div>

              {/* Progress counter */}
              <div className="hidden sm:flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs font-mono font-bold text-white">
                <span className="text-[#00AEEF]">
                  {mediaMode === 'video' ? selectedVideoIndex + 1 : selectedStillIndex + 1}
                </span>
                <span className="text-gray-500">/</span>
                <span>{mediaMode === 'video' ? dragV16Videos.length : dragV16Stills.length}</span>
              </div>
            </div>
          </div>

          {/* Main Media Display Viewport */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[58vh] rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/15 group">
            
            {mediaMode === 'video' ? (
              // ── VIDEO VIEWPORT ──
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  key={currentVideo.id}
                  src={currentVideo.src}
                  poster={currentVideo.poster}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  className="w-full h-full object-cover object-center"
                />

                {/* Video Overlays: Gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/40 pointer-events-none" />

                {/* Top Telemetry Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none text-[11px] font-mono">
                

                 
                </div>

                {/* Live Info & Description Box (Bottom Left) */}
                <div className="absolute bottom-16 sm:bottom-14 left-4 right-4 sm:left-6 sm:right-28 pointer-events-none">
                  {/* <span className="text-xs font-mono uppercase tracking-widest text-[#00AEEF] block mb-1">
                    {currentVideo.subtitle}
                  </span>
                  <h4 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                    {currentVideo.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed hidden sm:block">
                    {currentVideo.description}
                  </p> */}
                </div>

                {/* Video Playback Controls Bar (Bottom) */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 sm:px-6 flex items-center justify-between gap-3">
                  
                  {/* Play/Pause & Audio Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-2 rounded-full bg-white/10 hover:bg-[#00AEEF] text-white transition-all cursor-pointer backdrop-blur-md border border-white/10"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-white/10 hover:bg-[#00AEEF] text-white transition-all cursor-pointer backdrop-blur-md border border-white/10"
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <span className="text-[11px] font-mono text-gray-300 ml-1">
                      {videoCurrentTime} / {videoDuration || currentVideo.durationText}
                    </span>
                  </div>

                  {/* Scrubber Timeline Bar */}
                  <div 
                    onClick={handleSeek}
                    className="flex-1 mx-2 sm:mx-4 h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer relative overflow-hidden transition-all"
                  >
                    <div 
                      className="h-full bg-[#00AEEF] rounded-full transition-all duration-100"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>

                  {/* Fullscreen & Reset Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime = 0;
                          videoRef.current.play().catch(() => {});
                        }
                      }}
                      className="p-2 rounded-full bg-white/10 hover:bg-[#00AEEF] text-white transition-all cursor-pointer backdrop-blur-md border border-white/10 hidden sm:block"
                      title="Replay video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleFullscreen}
                      className="p-2 rounded-full bg-white/10 hover:bg-[#00AEEF] text-white transition-all cursor-pointer backdrop-blur-md border border-white/10"
                      aria-label="Toggle Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            ) : (
              // ── STILLS VIEWPORT ──
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStill.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentStill.src}
                    alt={currentStill.title}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />

                  {/* Gradient Overlay for Caption readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                  {/* Live Caption */}
                  <div className="absolute bottom-6 left-6 right-16 sm:bottom-8 sm:left-8 sm:right-24 flex flex-col pointer-events-none">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#00AEEF] block mb-1">
                      {currentStill.subtitle}
                    </span>
                    <h4 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                      {currentStill.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                      {currentStill.caption}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Manual Navigation Arrows (Overlay) */}
            <div className="absolute inset-y-0 left-3 right-3 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none z-10">
              <button
                type="button"
                onClick={() => {
                  if (mediaMode === 'video') {
                    handleSelectVideo((selectedVideoIndex - 1 + dragV16Videos.length) % dragV16Videos.length);
                  } else {
                    handleSelectStill((selectedStillIndex - 1 + dragV16Stills.length) % dragV16Stills.length);
                  }
                }}
                className="pointer-events-auto p-2.5 rounded-full bg-black/60 hover:bg-[#00AEEF] text-white border border-white/20 backdrop-blur-md transition-all duration-300 shadow-lg active:scale-90 cursor-pointer"
                aria-label="Previous view"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (mediaMode === 'video') {
                    handleSelectVideo((selectedVideoIndex + 1) % dragV16Videos.length);
                  } else {
                    handleSelectStill((selectedStillIndex + 1) % dragV16Stills.length);
                  }
                }}
                className="pointer-events-auto p-2.5 rounded-full bg-black/60 hover:bg-[#00AEEF] text-white border border-white/20 backdrop-blur-md transition-all duration-300 shadow-lg active:scale-90 cursor-pointer"
                aria-label="Next view"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Thumbnails Row (Interactive Selector Pills) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-5">
            {mediaMode === 'video' ? (
              dragV16Videos.map((vid, idx) => (
                <button
                  key={vid.id}
                  type="button"
                  onClick={() => handleSelectVideo(idx)}
                  className={`relative p-3 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                    selectedVideoIndex === idx 
                      ? 'bg-white/15 border-2 border-[#00AEEF] shadow-lg scale-[1.01]' 
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-black">
                    <Image
                      src={vid.poster}
                      alt={vid.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className={`w-4 h-4 ${selectedVideoIndex === idx ? 'text-[#00AEEF] fill-[#00AEEF]' : 'text-white/80'}`} />
                    </div>
                    {selectedVideoIndex === idx && (
                      <div className="absolute inset-0 border-2 border-[#00AEEF] rounded-lg" />
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs uppercase font-mono tracking-wider text-[#00AEEF] font-semibold truncate">
                        {vid.tag}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 shrink-0">
                        {vid.durationText}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white leading-tight truncate mt-0.5">
                      {vid.title}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{vid.subtitle}</p>
                  </div>
                </button>
              ))
            ) : (
              dragV16Stills.map((still, idx) => (
                <button
                  key={still.id}
                  type="button"
                  onClick={() => handleSelectStill(idx)}
                  className={`relative p-3 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                    selectedStillIndex === idx 
                      ? 'bg-white/15 border-2 border-[#00AEEF] shadow-lg scale-[1.01]' 
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10">
                    <Image
                      src={still.src}
                      alt={still.title}
                      fill
                      className="object-cover"
                    />
                    {selectedStillIndex === idx && (
                      <div className="absolute inset-0 border-2 border-[#00AEEF] rounded-lg" />
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-bold text-white leading-tight flex items-center justify-between">
                      <span className="truncate">{still.title}</span>
                      {selectedStillIndex === idx && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] shrink-0" />
                      )}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 truncate">{still.subtitle}</p>
                  </div>
                </button>
              ))
            )}
          </div>

        </div>
      </section>

      {/* ── 4. DEEP DIVE: IMAGE + VIDEO AEROSPACE ARCHITECTURE ───────────── */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-gray-100">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#00AEEF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Engineering Integration
          </div>
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
            Engineered for Real-World Medical Missions
          </h3>
          <p className="text-gray-600 text-base sm:text-lg font-light mt-3">
            Combining aerodynamic high-wing UAV design with automated climate-regulated payload bays and redundant BVLOS navigation.
          </p>
        </div>

        <div className="space-y-16 lg:space-y-24">
          
          {/* FEATURE 1: The BloodBank Medical Cargo Bay (Video BOXES.mp4 + Specs) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-black border border-gray-200 aspect-[16/10] group">
              <video
                src="/videos/drag-v16/drag-v16-cargo.mp4"
                poster="/videos/drag-v16/drag-v16-cargo-poster.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                <span className="flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-[#00AEEF]" />
                  Belly Hatch Mechanism: Automated Deployment
                </span>
                <span className="bg-[#00AEEF] text-white px-2.5 py-0.5 rounded-full font-bold">
                  45s Turnaround
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#00AEEF] uppercase mb-2">
                <Thermometer className="w-4 h-4" />
                Active Cold-Chain Architecture
              </div>
              <h4 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                The BloodBank: Precision Temperature-Regulated Pods
              </h4>
              <p className="text-gray-600 text-base leading-relaxed mb-6 font-normal">
                Equipped with custom climate-controlled medical cargo pods maintaining an unbroken cold chain. Active thermo-electric modules keep red blood cells and platelets between <strong>+2°C and +8°C</strong>, or sub-zero conditions down to <strong>-20°C</strong> for specialized clinical trial specimens.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">Payload Weight</span>
                  <span className="text-xl font-bold text-gray-900">16 kg Dedicated</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">Temperature Range</span>
                  <span className="text-xl font-bold text-[#00AEEF]">+2°C to +8°C</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">Cargo Security</span>
                  <span className="text-xl font-bold text-gray-900">Dual Electro-Lock</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">Digital Custody</span>
                  <span className="text-xl font-bold text-gray-900">Live RFID & QR</span>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE 2: High-Wing V-Tail Airframe (Photo drag-v16-airframe.jpeg + Intro Video) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#00AEEF] uppercase mb-2">
                <Wind className="w-4 h-4" />
                Structural Aero Stability
              </div>
              <h4 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                V-Tail & High-Wing Aerodynamics
              </h4>
              <p className="text-gray-600 text-base leading-relaxed mb-6 font-normal">
                The V-tail layout isolates control surfaces from fuselage prop wash, maintaining exceptional pitch and yaw authority even during severe monsoon gusts and turbulent conditions. High-wing placement guarantees ample ground clearance on unpaved helipads.
              </p>

              <ul className="space-y-3 border-t border-gray-100 pt-6 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00AEEF] shrink-0 mt-0.5" />
                  <span><strong>Full Carbon Prepreg Unibody:</strong> High torsional rigidity.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00AEEF] shrink-0 mt-0.5" />
                  <span><strong>Electric Propulsion:</strong> High-efficiency direct-drive brushless motors for low acoustic signature.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00AEEF] shrink-0 mt-0.5" />
                  <span><strong>All-Weather Flight Validation:</strong> Operable in rain, heat, and high-altitude mountain winds across India.</span>
                </li>
              </ul>
            </div>

            <div className="order-1 lg:order-2 relative rounded-3xl overflow-hidden shadow-xl bg-black border border-gray-200 aspect-[16/10] group">
              <Image
                src="/images/drag-v16/drag-v16-airframe.jpeg"
                alt="DRAG V-16 V-Tail Airframe"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#00AEEF]" />
                  Aviation CFRP Airframe Structure
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full font-bold">
                  MTOW 46 kg
                </span>
              </div>
            </div>
          </div>

          {/* FEATURE 3: Point-to-Point BVLOS Flight Transit (Video 0001-0400.mp4 + Photo drag-v16-urban.jpeg) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-black border border-gray-200 aspect-[16/10] group">
              <video
                src="/videos/drag-v16/drag-v16-flight.mp4"
                poster="/videos/drag-v16/drag-v16-flight-poster.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                <span className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#00AEEF]" />
                  Designated Urban Medical Skyway Corridor
                </span>
                <span className="bg-emerald-500 text-white px-2.5 py-0.5 rounded-full font-bold">
                  160 km/h Cruise
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#00AEEF] uppercase mb-2">
                <Navigation className="w-4 h-4" />
                Air Corridor Healthcare Transit
              </div>
              <h4 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                BVLOS Skyways Bypassing Urban Traffic
              </h4>
              <p className="text-gray-600 text-base leading-relaxed mb-6 font-normal">
                DRAG V-16 is designed to cruise through designated low-altitude air corridors at <strong>400 ft AGL</strong>, traveling 160 km in 60 minutes. Ground ambulance journeys delayed 3 to 4 hours in heavy metro traffic or ghat roads are compressed into minutes, protecting critical patient treatment timelines.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">Operating Profile</span>
                  <span className="text-base font-bold text-gray-900">400 ft Air Corridor</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">Cruise Speed</span>
                  <span className="text-base font-bold text-gray-900">160 km/h</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">Range</span>
                  <span className="text-base font-bold text-gray-900">160 km</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">Propulsion</span>
                  <span className="text-base font-bold text-emerald-600">All-Electric</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. MEDICAL MISSION APPLICATIONS ─────────────────────────────── */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Healthcare Supply Networks</p>
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 leading-tight mb-4">
            Medical Mission Applications
          </h3>
          <p className="text-base sm:text-lg text-gray-500 font-light">
            Engineered specifically to solve the logistical barriers in time-critical emergency supply networks across India and challenging terrains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {missionApplications.map((app, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-[#00AEEF] hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#00AEEF]/10 transition-all duration-300">
                {app.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00AEEF] transition-colors">
                {app.title}
              </h4>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                {app.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 6. TECHNICAL SPECIFICATIONS MATRIX ─────────────────────────── */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Engineering Data</p>
            <h3 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
              Technical Specifications
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Conceptual aircraft specifications subject to flight validation and applicable DGCA regulatory frameworks.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {technicalSpecs.map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col sm:flex-row justify-between py-4 px-6 sm:px-8 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-500 sm:w-1/2">
                    {item.label}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-gray-900 sm:w-1/2 sm:text-right mt-1 sm:mt-0">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 7. COMPARISON: AYUDX2 vs DRAG V-16 ───────────────────────── */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Two Pillars of Medical Aviation</p>
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
            Compare Dragale Aviation Platforms
          </h3>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            From critical patient air-ambulance evacuation to aerial cold-chain medical logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* AYUDX2 Card */}
          <div className="rounded-3xl p-8 sm:p-10 border border-gray-200 bg-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-gray-100 text-gray-700 mb-4">
                eVTOL Air Ambulance (Under Development)
              </div>
              <h4 className="text-3xl font-extrabold text-gray-900 mb-2">AYUDX2</h4>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-light">
                AYUDX2 is Dragale Aviation&apos;s eVTOL air ambulance programme, designed around the requirements of emergency medical transportation and dedicated patient care.
              </p>

              <div className="space-y-4 border-t border-gray-100 pt-6 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Mission</span>
                  <span className="font-bold text-gray-900">Dedicated Medical & Patient Transport</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Payload Capacity</span>
                  <span className="font-bold text-gray-900">350 kg (Stretcher + Medical Crew)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Cruising Speed</span>
                  <span className="font-bold text-gray-900">250 km/h</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Range</span>
                  <span className="font-bold text-gray-900">150 km</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Configuration</span>
                  <span className="font-bold text-gray-900">Tilt-Rotor with Distributed Propulsion</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link 
                href="/products?model=ayudx2" 
                onClick={(e) => {
                  if (onSelectAyuRatha) {
                    e.preventDefault();
                    onSelectAyuRatha();
                  }
                }}
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#00AEEF] hover:text-gray-900 transition-colors"
              >
                Inspect AYUDX2 Specifications <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* DRAG V-16 Card */}
          <div className="rounded-3xl p-8 sm:p-10 border-2 border-[#00AEEF] bg-[#00AEEF]/5 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#00AEEF] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
              Medical UAV
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#00AEEF]/20 text-[#00AEEF] mb-4">
                Fixed-Wing UAV
              </div>
              <h4 className="text-3xl font-extrabold text-gray-900 mb-2">DRAG V-16</h4>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-light">
                Point-to-point healthcare logistics platform for blood banks, pathology samples, vaccines, and surgical supplies.
              </p>

              <div className="space-y-4 border-t border-gray-200/60 pt-6 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Mission</span>
                  <span className="font-bold text-gray-900">Healthcare Logistics & Supply Delivery</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Payload Capacity</span>
                  <span className="font-bold text-gray-900">16 kg</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Cruising Speed</span>
                  <span className="font-bold text-gray-900">160 km/h</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Range</span>
                  <span className="font-bold text-gray-900">160 km</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Configuration</span>
                  <span className="font-bold text-gray-900">High-Wing • V-Tail</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200/60">
              <Link
                href="/contact-us"
                className="block text-center py-3.5 px-6 rounded-full bg-[#111111] hover:bg-[#00AEEF] text-white text-sm font-bold tracking-widest uppercase transition-all shadow-md"
              >
                Inquire for DRAG V-16 Pilot Programs
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── 8. PARTNERSHIP CALL TO ACTION ─────────────────────────────── */}
      <section className="w-full bg-[#111111] text-white py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase text-[#00AEEF] mb-4">
            Advancing Medical Logistics
          </p>
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">
            Partner with Dragale Aviation
          </h3>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-10">
            We welcome enquiries from hospitals, diagnostic laboratories, blood banks, and healthcare organizations interested in medical UAV logistics and potential pilot programmes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#00AEEF] hover:bg-white hover:text-black text-white text-sm font-bold tracking-widest uppercase transition-all shadow-lg active:scale-95"
            >
              Explore Collaboration Opportunities
            </Link>
            <Link
              href="/solutions"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold tracking-widest uppercase transition-all border border-white/20"
            >
              Discover Our Solutions
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
