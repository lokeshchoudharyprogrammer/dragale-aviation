'use client';

import React from 'react';
import { Clock, ShieldAlert, Route, HeartPulse, Building2 } from 'lucide-react';

interface MissionIntroProps {
  className?: string;
}

export default function MissionIntro({ className = '' }: MissionIntroProps) {
  return (
    <section className={`relative w-full py-24 sm:py-32 bg-[#020205] text-white px-6 lg:px-12 overflow-hidden ${className}`}>
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00AEEF]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00AEEF] uppercase tracking-widest mb-4">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>THE GOLDEN HOUR CRITICAL MANDATE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            When minutes determine survival, congestion cannot be the barrier.
          </h2>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-sans">
            In medical emergencies, the Golden Hour dictates patient outcomes. India’s metropolitan traffic 
            and rugged inter-city terrains turn vital ambulance transfers into dangerous delays. 
            Dragale Aviation bridges this divide with medical-first eVTOL air ambulances designed for rapid, 
            zero-emission point-to-point ICU transport.
          </p>
        </div>

        {/* Corridor Benchmark Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Road Ambulance Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-red-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  GROUND AMBULANCE CONSTRAINTS
                </span>
                <span className="text-xs font-mono text-gray-500">CONVENTIONAL EMS</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Congestion, Road Vibration &amp; Critical Delay
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Trapped in urban traffic gridlocks and delayed at highway toll barriers. Continuous road bumps 
                cause mechanical shock, exacerbating spinal injuries and cardiac destabilization during transit.
              </p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-gray-400 uppercase">Jaipur to Delhi Corridor</div>
                  <div className="text-2xl sm:text-3xl font-bold text-red-400 font-sans mt-0.5">
                    5–6 Hours
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-gray-400 uppercase">Survival Window</div>
                  <div className="text-sm font-semibold text-gray-300 mt-0.5">Severely Compromised</div>
                </div>
              </div>
            </div>
          </div>

          {/* eVTOL Air Ambulance Card */}
          <div className="bg-gradient-to-br from-white/10 to-[#00AEEF]/10 backdrop-blur-md border border-[#00AEEF]/30 rounded-2xl p-8 sm:p-10 shadow-[0_0_40px_rgba(0,174,239,0.1)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00AEEF]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#00AEEF] flex items-center gap-1.5">
                  <Route className="w-4 h-4 text-[#00AEEF]" />
                  DRAGALE AVIATION AYU DX2
                </span>
                <span className="text-xs font-mono bg-[#00AEEF]/20 text-[#00AEEF] px-2.5 py-0.5 rounded-full border border-[#00AEEF]/40 font-semibold">
                  80% TIME SAVINGS
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Point-to-Point Aerial ICU Velocity
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Straight-line flight bypasses gridlock completely. Smooth aero-stabilized flight with continuous 
                hospital intercom, live multi-vital telemetry, and shock-absorbing active stretcher suspension.
              </p>
            </div>

            <div className="border-t border-white/15 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-gray-300 uppercase">Jaipur to Delhi Corridor</div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#00AEEF] font-sans mt-0.5 flex items-center gap-2">
                    <span>60–70 Minutes</span>
                    <Clock className="w-6 h-6 text-[#00AEEF]" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-gray-300 uppercase">Golden Hour Status</div>
                  <div className="text-sm font-semibold text-green-400 mt-0.5">Fully Preserved</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Highlights Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-[#00AEEF] pl-5 py-2">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1.5 mb-1">
              <Building2 className="w-4 h-4 text-[#00AEEF]" />
              Hospital-to-Hospital
            </div>
            <div className="text-white font-bold text-lg mb-1">Direct Helipad Transfers</div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Touchdown directly on hospital rooftops or designated vertiports under DGCA Rule 133A compliance.
            </p>
          </div>

          <div className="border-l-4 border-[#00AEEF] pl-5 py-2">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1.5 mb-1">
              <HeartPulse className="w-4 h-4 text-[#00AEEF]" />
              Continuous ICU Care
            </div>
            <div className="text-white font-bold text-lg mb-1">Life-Support in Flight</div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Doctor and paramedic accompany the patient with onboard ventilator, defibrillator, and ECG monitoring.
            </p>
          </div>

          <div className="border-l-4 border-[#00AEEF] pl-5 py-2">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1.5 mb-1">
              <Clock className="w-4 h-4 text-[#00AEEF]" />
              Acoustic Profile
            </div>
            <div className="text-white font-bold text-lg mb-1">&lt;65 dBA Quiet Flight</div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Distributed electric rotors generate 20 dBA less noise than turbine helicopters for dense urban access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
