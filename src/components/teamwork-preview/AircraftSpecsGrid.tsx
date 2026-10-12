'use client';

import React, { useState } from 'react';
import { 
  Gauge, 
  BatteryCharging, 
  Plane, 
  Weight, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck, 
  HeartPulse, 
  Activity, 
  Volume2, 
  Maximize2,
  Radio,
  Building,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

interface AircraftSpecsGridProps {
  className?: string;
}

export default function AircraftSpecsGrid({ className = '' }: AircraftSpecsGridProps) {
  const [activeTab, setActiveTab] = useState<'specs' | 'medical' | 'pillars'>('specs');

  // Authoritative specs from ProductsClient.tsx
  const primarySpecs = [
    { label: 'Cruising Speed', value: '250 km/h (150 mph)', sub: 'Top cruise velocity in forward flight', icon: Gauge },
    { label: 'Maximum Range', value: '150 km (100 mi)', sub: 'Covers regional & inter-city corridors', icon: BatteryCharging },
    { label: 'Max Take-Off Weight (MTOW)', value: '1900 kg', sub: 'Optimized lightweight composite structure', icon: Weight },
    { label: 'Medical Payload', value: '350 kg', sub: 'Dedicated to intensive care suite & medics', icon: HeartPulse },
    { label: 'Airframe Dimensions', value: '13m length × 14m wingspan × 3m height', sub: 'Compact footprint for hospital helipads', icon: Maximize2 },
    { label: 'Cabin Configuration', value: '1 Pilot, 1 Stretcher Patient, 2 Medics, 1 Attendant', sub: 'Stretcher-first medical ICU layout', icon: Plane },
    { label: 'Propulsion System', value: '12 DEP Motors', sub: 'Distributed Electric Propulsion on dual booms', icon: Activity },
    { label: 'Flight Endurance', value: '45–60 minutes', sub: 'Reserve capacity for alternate vertiports', icon: Clock },
    { label: 'Vertical Climb Rate', value: '5 m/s', sub: 'Rapid clearance of urban obstacle fields', icon: ArrowUpRight },
    { label: 'Service Ceiling', value: '1,000 m (3,280 ft)', sub: 'Low-altitude urban air mobility airspace', icon: Plane },
    { label: 'Acoustic Signature', value: '<65 dBA', sub: '20 dBA quieter than turbine helicopters', icon: Volume2 },
  ];

  // Authoritative medical equipment from ProductsClient.tsx
  const medicalSuite = [
    { name: 'Patient Adjustable Stretcher', desc: 'Shock-absorbing active suspension for spinal trauma stability' },
    { name: 'Compact Ventilator', desc: 'Battery-powered continuous mechanical ventilation' },
    { name: 'Defibrillator', desc: 'Biphasic AED and manual modes for critical cardiac resuscitation' },
    { name: 'Multiparameter Patient Monitor', desc: 'Real-time telemetry tracking SpO2, blood pressure, and 12-lead ECG' },
    { name: 'Portable Oxygen Supply', desc: 'Medical-grade concentrator with pressurized backup cylinder' },
    { name: 'Precision Infusion Pump', desc: 'Micro-dose intravenous medication delivery during transit' },
    { name: 'Medical Intercom System', desc: 'Direct encrypted audio link linking flight medics to receiving surgeons' },
    { name: 'Temperature-Controlled Compartment', desc: 'Cold-chain storage for blood units, pharmaceuticals, and antivenom' },
    { name: 'Portable Diagnostic Scanner', desc: 'Handheld trauma ultrasound for in-flight abdominal & cardiac triage' },
    { name: 'First-Aid and Trauma Kit', desc: 'Comprehensive critical bleeding and airway emergency instruments' },
  ];

  // 5 Operational Pillars from solutions.ts
  const operationalPillars = [
    {
      id: 'seamless-vtol-patient-transport',
      title: 'Seamless VTOL Patient Transport',
      tagline: 'Rapid rooftop & vertiport patient extraction',
      desc: 'Vertical takeoff and landing capability allows direct pickup from urban rooftops, rural health centers, and emergency sites, completely eliminating highway gridlock.',
      icon: Plane,
    },
    {
      id: 'hospital-to-hospital-transfers',
      title: 'Hospital-to-Hospital Transfers',
      tagline: 'Inter-facility tertiary care corridor transit',
      desc: 'Connects regional district hospitals to advanced tertiary care centers in under 70 minutes (e.g. Jaipur to Delhi in 60–70 mins vs 5–6 hours by road).',
      icon: Building,
    },
    {
      id: 'live-patient-monitoring-system',
      title: 'Live Patient Monitoring System',
      tagline: 'Continuous telemetry stream to receiving hospital',
      desc: 'High-bandwidth satellite and 5G uplink continuously streams patient vitals (ECG, SpO2, hemodynamics) to emergency room physicians before the aircraft lands.',
      icon: Radio,
    },
    {
      id: 'critical-heart-patient-support',
      title: 'Critical Heart Patient Support',
      tagline: 'Cardiac-specialized vibration dampening',
      desc: 'Specialized electromagnetic shielding, anti-vibration stretcher dampening, and onboard defibrillation protocols designed specifically for acute myocardial infarction cases.',
      icon: HeartPulse,
    },
    {
      id: 'redundant-safety-systems',
      title: 'Redundant Safety Systems',
      tagline: 'Zero single point of failure',
      desc: '12 independent electric motors, isolated dual battery buses, and multi-channel redundant flight computers with fail-operational return-to-base safety protocols.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className={`relative w-full py-24 sm:py-32 bg-[#050a1f] text-white px-6 lg:px-12 ${className}`}>
      <div className="max-w-[1400px] mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-[#00AEEF] uppercase tracking-widest mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>OFFICIAL AIRCRAFT SPECIFICATION MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
              Engineered for the Extremes of Critical Care
            </h2>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-[#00AEEF] text-black font-bold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('medical')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'medical'
                  ? 'bg-[#00AEEF] text-black font-bold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Medical Suite
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pillars')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'pillars'
                  ? 'bg-[#00AEEF] text-black font-bold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              5 Clinical Pillars
            </button>
          </div>
        </div>

        {/* TAB 1: FLIGHT & AIRFRAME SPECIFICATIONS */}
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-fadeIn">
            {primarySpecs.map((spec, i) => {
              const IconComp = spec.icon;
              return (
                <div
                  key={i}
                  className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-2xl p-6 border-l-4 border-l-[#00AEEF] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                        {spec.label}
                      </span>
                      <IconComp className="w-4 h-4 text-[#00AEEF]" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-white font-sans">
                      {spec.value}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-white/5 font-sans">
                    {spec.sub}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: ONBOARD ICU MEDICAL SUITE */}
        {activeTab === 'medical' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fadeIn">
            {medicalSuite.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between border-l-4 border-l-[#00AEEF]"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#00AEEF]">
                    <CheckCircle2 className="w-4 h-4 text-[#00AEEF]" />
                    <span className="text-xs font-mono uppercase tracking-wider">ICU Standard</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 font-sans">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: 5 CLINICAL OPERATIONAL PILLARS */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {operationalPillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-gradient-to-b from-white/10 to-white/5 border border-white/15 rounded-2xl p-8 flex flex-col justify-between border-l-4 border-l-[#00AEEF] shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#00AEEF]/20 flex items-center justify-center text-[#00AEEF]">
                        <IconComp className="w-5 h-5 text-[#00AEEF]" />
                      </div>
                      <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">
                        {pillar.id}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 font-sans">
                      {pillar.title}
                    </h3>
                    <div className="text-xs font-mono text-[#00AEEF] mb-3">
                      {pillar.tagline}
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed font-sans mb-6">
                      {pillar.desc}
                    </p>
                  </div>

                  <Link
                    href={`/solutions#${pillar.id}`}
                    className="inline-flex items-center gap-2 text-xs font-mono text-white hover:text-[#00AEEF] transition-colors pt-4 border-t border-white/10"
                  >
                    <span>EXPLORE PILLAR DETAILS</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#00AEEF]" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Operational Corridor Callout Banner */}
        <div className="mt-12 bg-black/60 rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#00AEEF] uppercase tracking-wider mb-1">
              DGCA REGULATORY READINESS
            </div>
            <div className="text-base sm:text-lg font-bold text-white">
              Compliant with DGCA Rule 133A Vertiport Standards &amp; Indian Airspace Regulations
            </div>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border border-white/20 transition-all self-start sm:self-auto shrink-0"
          >
            <span>Full Products Architecture</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#00AEEF]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
