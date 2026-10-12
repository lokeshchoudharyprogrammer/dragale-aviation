'use client';

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { useScrollProgress } from './ScrollVideoPinnedSequence';
import { 
  Gauge, 
  BatteryCharging, 
  Volume2, 
  Activity, 
  HeartPulse, 
  ShieldCheck, 
  Plane, 
  Wind,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

interface SpecCardOverlayProps {
  progress?: MotionValue<number>;
  className?: string;
}

export default function SpecCardOverlay({
  progress: externalProgress,
  className = '',
}: SpecCardOverlayProps) {
  const contextProgress = useScrollProgress();
  const progress = externalProgress || contextProgress;

  // Fallback motion values when rendered outside ScrollVideoPinnedSequence context
  // When progress is null, render all cards or default
  const dummyProgress = {
    get: () => 0.1,
  } as unknown as MotionValue<number>;

  const activeProgress = progress || dummyProgress;

  // Phase 1 (0.00 - 0.30): Cruise Speed, Range, Acoustics
  const opacityP1 = useTransform(activeProgress, [0, 0.05, 0.25, 0.30], [1, 1, 1, 0]);
  const yP1 = useTransform(activeProgress, [0, 0.05, 0.25, 0.30], [0, 0, 0, -20]);
  const pointerEventsP1 = useTransform(activeProgress, (v: number) => (v < 0.30 ? 'auto' : 'none'));

  // Phase 2 (0.30 - 0.65): Stretcher-First ICU Cabin & Medical Suite
  const opacityP2 = useTransform(activeProgress, [0.28, 0.34, 0.60, 0.65], [0, 1, 1, 0]);
  const yP2 = useTransform(activeProgress, [0.28, 0.34, 0.60, 0.65], [20, 0, 0, -20]);
  const pointerEventsP2 = useTransform(activeProgress, (v: number) => (v >= 0.30 && v < 0.65 ? 'auto' : 'none'));

  // Phase 3 (0.65 - 1.00): Distributed Electric Propulsion & Airframe
  const opacityP3 = useTransform(activeProgress, [0.63, 0.69, 0.95, 1.0], [0, 1, 1, 1]);
  const yP3 = useTransform(activeProgress, [0.63, 0.69, 0.95, 1.0], [20, 0, 0, 0]);
  const pointerEventsP3 = useTransform(activeProgress, (v: number) => (v >= 0.65 ? 'auto' : 'none'));

  return (
    <div className={`relative h-full w-full pointer-events-none p-6 md:p-12 lg:p-16 flex flex-col justify-between ${className}`}>
      {/* Top Telemetry Header HUD Bar */}
      <div className="flex items-center justify-between w-full pointer-events-auto">
        <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00AEEF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00AEEF]"></span>
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-[#00AEEF]">
            AYU DX2 TELEMETRY STREAM
          </span>
        </div>

        {/* Phase Progress Indicator */}
        <div className="hidden sm:flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-gray-300">
          <span className="text-gray-400">PHASE</span>
          <span className="text-[#00AEEF] font-bold">1: CRUISE</span>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">2: ICU CABIN</span>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">3: DEP PROPULSION</span>
        </div>
      </div>

      {/* Center / Lower Overlay HUD Cards Area */}
      <div className="relative w-full max-w-4xl mx-auto my-auto min-h-[360px] flex items-center justify-center">
        {/* ================= PHASE 1: HIGH SPEED CRUISE ================= */}
        <motion.div
          style={{ opacity: opacityP1, y: yP1, pointerEvents: pointerEventsP1 }}
          className="absolute inset-x-0 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(0,174,239,0.15)] pointer-events-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#00AEEF] flex items-center gap-1.5 mb-1">
                <Wind className="w-3.5 h-3.5 text-[#00AEEF]" />
                Phase 1 (0.00 – 0.30) • Flight Dynamics
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
                High-Speed Cruise & Regional Transit
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#00AEEF]/20 text-[#00AEEF] px-3 py-1 rounded-full text-xs font-mono border border-[#00AEEF]/40 self-start md:self-auto">
              <Activity className="w-3.5 h-3.5" />
              IN-TRANSIT ICU
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="border-l-4 border-[#00AEEF] pl-4 py-1 bg-black/30 rounded-r-lg">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-[#00AEEF]" /> Cruising Speed
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
                250 km/h (150 mph)
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Top forward flight velocity</div>
            </div>

            <div className="border-l-4 border-[#00AEEF] pl-4 py-1 bg-black/30 rounded-r-lg">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <BatteryCharging className="w-3.5 h-3.5 text-[#00AEEF]" /> Operating Range
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
                150 km (100 mi)
              </div>
              <div className="text-xs text-gray-400 mt-0.5">45–60 min flight endurance</div>
            </div>

            <div className="border-l-4 border-[#00AEEF] pl-4 py-1 bg-black/30 rounded-r-lg">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-[#00AEEF]" /> Acoustic Profile
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
                &lt;65 dBA
              </div>
              <div className="text-xs text-gray-400 mt-0.5">20 dBA quieter than helicopters</div>
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-3.5 border border-white/10 flex items-center justify-between text-xs sm:text-sm text-gray-300">
            <span className="font-medium text-white">Inter-Facility Golden Hour Benchmark:</span>
            <span className="font-mono text-[#00AEEF] font-semibold">
              Jaipur to Delhi in 60–70 minutes (vs 5–6 hours road ambulance)
            </span>
          </div>
        </motion.div>

        {/* ================= PHASE 2: STRETCHER-FIRST ICU CABIN ================= */}
        <motion.div
          style={{ opacity: opacityP2, y: yP2, pointerEvents: pointerEventsP2 }}
          className="absolute inset-x-0 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(0,174,239,0.15)] pointer-events-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#00AEEF] flex items-center gap-1.5 mb-1">
                <HeartPulse className="w-3.5 h-3.5 text-[#00AEEF]" />
                Phase 2 (0.30 – 0.65) • Clinical Architecture
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
                Stretcher-First Intensive Care Cabin
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#00AEEF]/20 text-[#00AEEF] px-3 py-1 rounded-full text-xs font-mono border border-[#00AEEF]/40 self-start md:self-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
              FULL ICU CAPABILITY
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="border-l-4 border-[#00AEEF] pl-4 py-1 bg-black/30 rounded-r-lg">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400">
                Cabin Layout & Crew Capacity
              </div>
              <div className="text-lg sm:text-xl font-bold text-white font-sans mt-0.5">
                1 Pilot, 1 Stretcher Patient, 2 Medics, 1 Attendant
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Shock-absorbing stretcher + Doctor & Paramedic crew</div>
            </div>

            <div className="border-l-4 border-[#00AEEF] pl-4 py-1 bg-black/30 rounded-r-lg">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400">
                Medical Useful Payload
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
                350 kg
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Dedicated to life-support suite and clinical crew</div>
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-4 border border-white/10">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
              Onboard Intensive Care Medical Suite
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-300">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AEEF]" /> Compact Ventilator</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AEEF]" /> Defibrillator (AED/Manual)</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AEEF]" /> Multiparameter Monitor</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AEEF]" /> Portable Oxygen Supply</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AEEF]" /> Precision Infusion Pump</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AEEF]" /> Trauma Diagnostic Scanner</div>
            </div>
          </div>
        </motion.div>

        {/* ================= PHASE 3: DEP PROPULSION & SAFETY ================= */}
        <motion.div
          style={{ opacity: opacityP3, y: yP3, pointerEvents: pointerEventsP3 }}
          className="absolute inset-x-0 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(0,174,239,0.15)] pointer-events-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#00AEEF] flex items-center gap-1.5 mb-1">
                <Plane className="w-3.5 h-3.5 text-[#00AEEF]" />
                Phase 3 (0.65 – 1.00) • Airframe & Propulsion
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
                Redundant Distributed Electric Propulsion
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#00AEEF]/20 text-[#00AEEF] px-3 py-1 rounded-full text-xs font-mono border border-[#00AEEF]/40 self-start md:self-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
              SAFETY-FIRST ARCHITECTURE
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="border-l-4 border-[#00AEEF] pl-4 py-1 bg-black/30 rounded-r-lg">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400">
                Propulsion Motors
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
                12 DEP Motors
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Independent direct-drive units across dual booms</div>
            </div>

            <div className="border-l-4 border-[#00AEEF] pl-4 py-1 bg-black/30 rounded-r-lg">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-[#00AEEF]" /> Airframe Dimensions
              </div>
              <div className="text-lg sm:text-xl font-bold text-white font-sans mt-0.5">
                13m length, 14m wingspan, 3m height
              </div>
              <div className="text-xs text-gray-400 mt-0.5">13m × 14m × 3m airframe envelope</div>
            </div>

            <div className="border-l-4 border-[#00AEEF] pl-4 py-1 bg-black/30 rounded-r-lg">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400">
                Max Take-Off Weight (MTOW)
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
                1900 kg
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Optimized lightweight composite structure</div>
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-3.5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-300 gap-2">
            <span className="font-medium text-white">Redundant Safety Systems:</span>
            <span className="font-mono text-[#00AEEF] font-semibold">
              Redundant flight-critical systems • Dual battery packs • Zero single point of failure
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt Bar */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-gray-400 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00AEEF]"></span>
          <span>SCROLL TO SCRUB 360° AIRFRAME VIEW</span>
        </div>
        <div className="text-gray-400">
          DRAGALE AVIATION • AYU DX2
        </div>
      </div>
    </div>
  );
}
