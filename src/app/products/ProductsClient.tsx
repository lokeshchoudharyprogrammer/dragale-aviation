'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CircleX, ArrowRight } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaAmbulance, FaPhone, FaRocket } from 'react-icons/fa';
import DragV16Showcase from '@/components/DragV16Showcase';
import ScrollScrubVideo from '@/components/ScrollScrubVideo';

const PARTICLE_CLASSES = [
  'left-[0%] [animation-delay:0s]',
  'left-[37%] [animation-delay:0.61s]',
  'left-[74%] [animation-delay:1.22s]',
  'left-[11%] [animation-delay:1.83s]',
  'left-[48%] [animation-delay:2.44s]',
  'left-[85%] [animation-delay:3.05s]',
  'left-[22%] [animation-delay:3.66s]',
  'left-[59%] [animation-delay:4.27s]',
  'left-[96%] [animation-delay:4.88s]',
  'left-[33%] [animation-delay:5.49s]',
  'left-[70%] [animation-delay:6.10s]',
  'left-[7%] [animation-delay:6.71s]',
  'left-[44%] [animation-delay:7.32s]',
  'left-[81%] [animation-delay:7.93s]',
  'left-[18%] [animation-delay:8.54s]',
  'left-[55%] [animation-delay:9.15s]',
  'left-[92%] [animation-delay:9.76s]',
  'left-[29%] [animation-delay:0.37s]',
  'left-[66%] [animation-delay:0.98s]',
  'left-[3%] [animation-delay:1.59s]',
];

const aircraftData = {
  model: 'AYUDX2',
  useCase: 'eVTOL Air Ambulance Programme (Under Development)',
  flightType: 'eVTOL (Electric Vertical Takeoff and Landing)',
  configuration: 'Tilt-rotor with Distributed Electric Propulsion',
  medicalEquipment: [
    {
      name: 'Patient Adjustable Stretcher',
      desc: 'Shock-absorbing stretcher for stable patient transport.',
    },
    {
      name: 'Compact Ventilator',
      desc: 'Battery-powered for continuous respiratory support.',
    },
    {
      name: 'Defibrillator',
      desc: 'AED and manual modes for cardiac emergencies.',
    },
    {
      name: 'Multiparameter Patient Monitor',
      desc: 'Tracks SpO2, BP, and ECG in real-time.',
    },
    {
      name: 'Portable Oxygen Supply',
      desc: 'Concentrator with backup cylinder for reliability.',
    },
    {
      name: 'First-Aid and Trauma Kit',
      desc: 'Comprehensive kit for immediate care.',
    },
    {
      name: 'Medical Intercom System',
      desc: 'Links to hospitals for real-time communication.',
    },
    {
      name: 'Temperature-Controlled Compartment',
      desc: 'Stores medications at optimal conditions.',
    },
    {
      name: 'Compact Infusion Pump',
      desc: 'Delivers precise IV medication dosages.',
    },
    {
      name: 'Storage Rack',
      desc: 'Holds IV fluids, gloves, PPE, and meds.',
    },
    {
      name: 'Portable Diagnostic Scanner',
      desc: 'Ultrasound or handheld scanner for trauma triage.',
    },
  ],
  designOptimizations: [
    {
      name: 'Aero-stabilized Structure',
      desc: 'Ensures smooth transport in turbulent conditions.',
    },
    {
      name: 'Noise and Vibration Reduction',
      desc: 'Minimizes patient discomfort during flight.',
    },
    {
      name: 'Temperature-Controlled Cabin',
      desc: 'Maintains optimal conditions for critical care.',
    },
    {
      name: 'Easy-Access Side Door',
      desc: 'Facilitates rapid stretcher and equipment loading.',
    },
    {
      name: 'Layer Protection for Heart Patients',
      desc: 'Specialized shielding for cardiac care.',
    },
    {
      name: 'Redundant Systems',
      desc: 'Ensures safety with backup critical systems.',
    },
  ],
  dimensions: {
    length: '13 meters',
    height: '3 meters',
    wingspan: '14 meters',
    cabinCapacity: [
      '1 Pilot',
      '1 Patient (Stretcher)',
      '1 Doctor',
      '1 Paramedic',
      '1 Family Member / Attendant',
    ],
  },
  performance: {
    mtow: '1900 kg',
    payload: '350 kg',
    cruisingSpeed: '250 km/h',
    maxRange: '150 km',
    flightTime: '45–60 minutes',
    climbRate: '5 m/s',
    serviceCeiling: '1,000 m (3,280 ft)',
    flightProfile: 'Smooth transition from vertical lift to forward cruise',
  },
};

const whyAyuRatha = [
  {
    title: 'Unmatched Speed',
    desc: '250 km/h cruising speed for rapid emergency response and fast travel.',
    href: '/solutions/seamless-vtol-patient-transport',
    linkText: 'Learn more about seamless eVTOL transport',
    icon: <FaRocket />,
  },
  {
    title: 'Advanced Medical Systems',
    desc: 'Equipped with cutting-edge tools for critical care and medical equipment.',
    href: '/solutions/live-patient-monitoring-system',
    linkText: 'Learn more about live patient monitoring',
    icon: <FaAmbulance />,
  },
  {
    title: 'Safety First',
    desc: 'Redundant systems and aero-stability ensure secure transport.',
    href: '/solutions/redundant-safety-systems',
    linkText: 'Learn more about redundant safety systems',
    icon: <FaPhone />,
  },
];

export default function Aircraft({
  headingLevel = 1,
}: {
  headingLevel?: 1 | 2;
}) {
  const isEmbedded = headingLevel === 2;
  type SelectedItem = { name: string; desc: string };

  const [selectedProduct, setSelectedProduct] = useState<'ayuratha' | 'drag-v16'>('ayuratha');
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('technical');
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkModel = () => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const model = params.get('model');
        if (model === 'drag-v16') {
          setSelectedProduct('drag-v16');
        } else if (model === 'ayuratha') {
          setSelectedProduct('ayuratha');
        }
      }
    };

    checkModel();
    window.addEventListener('popstate', checkModel);
    return () => window.removeEventListener('popstate', checkModel);
  }, []);

  const handleProductChange = (model: 'ayuratha' | 'drag-v16') => {
    setSelectedProduct(model);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('model', model);
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -75% 0px' }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-scroll the mobile tab bar to keep active tab in view
  useEffect(() => {
    if (tabContainerRef.current) {
      const activeButton = tabContainerRef.current.querySelector(`[data-tab-id="${activeTab}"]`) as HTMLButtonElement;
      if (activeButton) {
        const container = tabContainerRef.current;
        const scrollLeft = activeButton.offsetLeft - container.offsetWidth / 2 + activeButton.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleItemClick = (item: SelectedItem) => {
    setSelectedItem(item);
  };
  const closeTooltip = () => {
    setSelectedItem(null);
  };

  // Focus trap for modal
  useEffect(() => {
    if (selectedItem && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (!firstElement || !lastElement) return;
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
        if (e.key === 'Escape') {
          closeTooltip();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedItem]);

  return (
    <>
      <Head>
        {selectedProduct === 'drag-v16' ? (
          <>
            <title>DRAG V-16 Medical Logistics UAV - Dragale Aviation</title>
            <meta
              name="description"
              content="Discover the DRAG V-16 Medical Logistics UAV by Dragale Aviation, engineered for blood products, lab samples, vaccines, and emergency supply transport with 16 kg payload and 160 km range."
            />
            <meta
              name="keywords"
              content="DRAG V-16, medical drone, UAV, medical logistics, Dragale Aviation, vaccine transport, blood delivery, emergency supplies, India"
            />
            <meta
              property="og:title"
              content="DRAG V-16 Medical Logistics UAV - Dragale Aviation"
            />
            <meta
              property="og:description"
              content="16 kg payload capacity, 160 km operational range medical UAV for healthcare logistics across India."
            />
            <meta property="og:image" content="/images/drag-v16/drag-v16-flight.jpeg" />
          </>
        ) : (
          <>
            <title>AYUDX2 eVTOL Air Ambulance - Dragale Aviation</title>
            <meta
              name="description"
              content="AYUDX2 is Dragale Aviation's eVTOL air ambulance programme, designed around the requirements of emergency medical transportation and dedicated patient care."
            />
            <meta
              name="keywords"
              content="AYUDX2, eVTOL, air ambulance, Dragale Aviation, medical transport, VTOL, emergency response, critical care, India"
            />
            <meta
              property="og:title"
              content="AYUDX2 eVTOL Air Ambulance - Dragale Aviation"
            />
            <meta
              property="og:description"
              content="AYUDX2 is Dragale Aviation's eVTOL air ambulance programme under development for dedicated emergency medical transportation."
            />
            <meta property="og:image" content="/images/aircraft/front_view.jpeg" />
          </>
        )}
        <meta
          property="og:url"
          content="https://dragaleaviation.com/products"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Vehicle',
            name: 'AYUDX2 eVTOL Air Ambulance',
            description:
              'Dedicated eVTOL air ambulance programme under development for hospital-to-hospital and emergency medical transport.',
            brand: {
              '@type': 'Brand',
              name: 'Dragale Aviation',
            },
            model: 'AYUDX2',
            vehicleConfiguration: 'Tilt-rotor with Distributed Electric Propulsion',
            maximumSpeed: '250 km/h',
            vehicleSeatingCapacity: '5',
          })}
        </script>
        <style>{`
          
          @media (prefers-reduced-motion: reduce) {
            .motion-div, .motion-h1, .motion-p, .motion-a, .motion-button {
              transition: none !important;
              animation: none !important;
            }
          }

          .aircraft-bg {
            position: absolute;
            inset: 0;
            background:
              radial-gradient(circle at 30% 20%, rgba(0, 0, 0, 0.02), transparent 45%),
              radial-gradient(circle at 70% 65%, rgba(0, 0, 0, 0.02), transparent 50%),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.7), rgba(255, 255, 255, 0.9)),
              url('/evtol-silhouette.png');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            filter: saturate(1.1) contrast(0.95);
          }

          @media (min-width: 768px) {
            .aircraft-bg {
              background-size: 110%;
            }
          }

          .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            animation: float 15s infinite linear;
          }
          @keyframes float {
            0% { transform: translateY(0); opacity: 0.2; }
            50% { opacity: 0.5; }
            100% { transform: translateY(-100vh); opacity: 0.2; }
          }
        `}</style>
      </Head>
      <div
        className={
          isEmbedded
            ? 'bg-slate-50 text-gray-900'
            : 'pt-10 min-h-screen bg-white text-gray-900'
        }
      >
        {/* Product Model Switcher Bar */}
        {!isEmbedded && (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-24 sm:pt-28 pb-4 relative z-20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-slate-100/90 backdrop-blur-md rounded-2xl sm:rounded-full border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleProductChange('ayuratha')}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl sm:rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedProduct === 'ayuratha'
                      ? 'bg-white text-gray-900 shadow-md border border-gray-200'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-white/60'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#00AEEF]" />
                  <span>AYUDX2</span>
                  <span className="hidden sm:inline text-[10px] font-normal text-gray-400">• eVTOL Ambulance</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleProductChange('drag-v16')}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl sm:rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedProduct === 'drag-v16'
                      ? 'bg-white text-gray-900 shadow-md border border-gray-200'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-white/60'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>DRAG V-16</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-[#00AEEF]/15 text-[#00AEEF]">NEW</span>
                  <span className="hidden sm:inline text-[10px] font-normal text-gray-400">• Medical UAV</span>
                </button>
              </div>

              <div className="hidden md:flex items-center gap-3 text-xs text-gray-500 px-4">
                <span className="font-medium">Dragale Aviation Aircraft</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="font-semibold text-gray-700">2 Active Platforms</span>
              </div>
            </div>
          </div>
        )}

        {selectedProduct === 'drag-v16' ? (
          <DragV16Showcase
            headingLevel={headingLevel}
            onSelectAyuRatha={() => handleProductChange('ayuratha')}
          />
        ) : (
          <main
            id="aircraft"
            className={`px-4 sm:px-8 lg:px-16 ${
              isEmbedded ? 'py-8 scroll-mt-28' : 'py-12'
            } relative`}
          >
          {/* Video Background */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
          >
            <div className="aircraft-bg opacity-30" aria-hidden="true" />
            {/* Particle Effect */}
            {PARTICLE_CLASSES.map((particleClassName, i) => (
              <div key={i} className={`particle ${particleClassName}`} />
            ))}
          </motion.div>

          {/* Sleek Hero Section */}
          <motion.div
            className={`${
              isEmbedded ? 'mt-8' : 'mt-20'
            } w-full max-w-7xl mx-auto relative z-10 flex flex-col items-center justify-center text-center`}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-4xl"
            >
              {headingLevel === 2 ? (
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter uppercase text-gray-900 leading-none mb-6">
                  AYUDX2 <br /><span className="text-gray-400">eVTOL</span>
                </h2>
              ) : (
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter uppercase text-gray-900 leading-none mb-6">
                  AYUDX2 <br /><span className="text-gray-400">eVTOL</span>
                </h1>
              )}

              <p className="text-xl md:text-3xl text-gray-600 font-light tracking-wide mb-8">
                AYUDX2 — eVTOL Air Ambulance
              </p>

              <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed mb-12">
                AYUDX2 is Dragale Aviation&apos;s eVTOL air ambulance programme, designed around the
                requirements of emergency medical transportation. The aircraft is being developed to support the
                aerial transportation of patients and medical personnel, with a focus on dedicated medical
                missions and integration of patient-care requirements into the aircraft design.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-semibold tracking-widest uppercase text-gray-900">
                <div className="flex items-center gap-2 border-b border-transparent hover:border-gray-900 transition-colors pb-1 cursor-default">
                  eVTOL Technology
                </div>
                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                <div className="flex items-center gap-2 border-b border-transparent hover:border-gray-900 transition-colors pb-1 cursor-default">
                  Advanced Medical Suite
                </div>
                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                <div className="flex items-center gap-2 border-b border-transparent hover:border-gray-900 transition-colors pb-1 cursor-default">
                  Redundant Safety
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Premium Visuals / Gallery */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto mt-24 md:mt-32 relative z-10"
            aria-labelledby="aircraft-visuals"
          >
            <div className="space-y-16 lg:space-y-32">
              
              {/* Feature 1: Exterior (Image Right) */}
              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
                <div className="w-full lg:w-5/12 order-2 lg:order-1 text-left">
                  <p className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-3">Exterior</p>
                  <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tighter">
                    Rapid Response <br/>Architecture
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    An eVTOL-first design tuned for fast dispatch, smooth transition to cruise, and reliable performance in time-critical missions. Precision aerodynamics ensure stability in all phases of flight.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">350 <span className="text-sm text-gray-500 font-normal">kg</span></p>
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">Payload</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">250 <span className="text-sm text-gray-500 font-normal">km/h</span></p>
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">Cruise</p>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-7/12 order-1 lg:order-2">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gray-100"
                  >
                    <video
                      src="/animated-videos/helipad-landing-2.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Feature 2: Interior (Image Left) */}
              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
                <div className="w-full lg:w-7/12">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gray-100"
                  >
                    <ScrollScrubVideo
                      src="/videos/DX1_video.mp4"
                      badgeText="Scroll to Reveal"
                    />
                  </motion.div>
                </div>

                <div className="w-full lg:w-5/12 text-left">
                  <p className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-3">Interior</p>
                  <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tighter">
                    Critical-Care <br/>Cabin
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Built for treatment in transit. A focused clinical layout designed around rapid patient access, real-time monitoring, and stable care delivery during flight.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">Seamless</p>
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">Stretcher Access</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">Live</p>
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">Monitoring</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.section>

          {/* Why AyuRatha Section - Premium Light Accordion Variant */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto mt-24 md:mt-40 mb-32 px-4 sm:px-6 lg:px-8"
          >
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 lg:mb-20">
              <div className="max-w-2xl">
                <span className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4 block">
                  The Advantage
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tighter">
                  Why AYUDX2?
                </h2>
              </div>
              <p className="text-gray-500 text-lg lg:max-w-sm mt-6 lg:mt-0 font-light leading-relaxed">
                Redefining aerial medical transport through innovation, speed, and uncompromising safety.
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row min-h-[500px] gap-6 w-full">
              {whyAyuRatha.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="group relative flex-1 flex flex-col justify-end overflow-hidden rounded-[2rem] p-8 lg:p-10 bg-white border border-gray-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] lg:hover:flex-[2.2]"
                >
                  {/* Subtle background shift on hover instead of color inversion */}
                  <div className="absolute inset-0 bg-gray-50 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none" />

                  <div className="absolute top-10 left-10 text-4xl lg:text-5xl text-gray-300 transition-all duration-700 ease-out group-hover:scale-110 group-hover:text-gray-900 group-hover:-translate-y-2">
                    {item.icon}
                  </div>
                  
                  <div className="mt-32 lg:mt-auto z-10 relative">
                    <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-2 text-gray-900 transition-transform duration-500 group-hover:-translate-y-1">
                      {item.title}
                    </h3>
                    
                    <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                      <div className="overflow-hidden opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-700 lg:delay-100">
                        <div className="pt-4 mt-2">
                          <p className="text-lg leading-relaxed mb-6 font-light text-gray-600 transition-colors duration-500">
                            {item.desc}
                          </p>
                          
                          {item.href ? (
                            <Link
                              href={item.href}
                              className="inline-flex items-center text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-gray-500 transition-colors group/link"
                            >
                              {item.linkText || 'Learn more'}
                              <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Premium Specifications Section - Split View (ScrollSpy) */}
          <motion.div className="max-w-[1400px] mx-auto mt-24 md:mt-40 mb-32 border-t border-gray-200 pt-16 px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
              
              {/* Left Column: Interactive Menu */}
              <div className="w-full lg:w-1/3 sticky top-[70px] lg:top-32 z-30 bg-white/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none pt-4 pb-2 lg:py-0 mb-8 lg:mb-0 border-b border-gray-100 lg:border-b-0">
                <div 
                  ref={tabContainerRef}
                  className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible space-x-8 lg:space-x-0 lg:space-y-8 lg:border-l border-gray-100 py-2 lg:py-4 hide-scrollbar"
                >
                  {[
                    { id: 'technical', label: 'Technical Specs' },
                    { id: 'medical', label: 'Medical Equipment' },
                    { id: 'design', label: 'Design Optimizations' },
                    { id: 'dimensions', label: 'Physical Dimensions' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      data-tab-id={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`whitespace-nowrap text-left text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight transition-all duration-300 relative lg:pl-8 ${
                        activeTab === tab.id ? 'text-gray-900' : 'text-gray-300 hover:text-gray-400'
                      }`}
                    >
                      {activeTab === tab.id && (
                        <>
                          <motion.div 
                            layoutId="activeMenuIndicatorDesktop" 
                            className="hidden lg:block absolute left-[-1px] top-0 bottom-0 w-1 bg-[#00AEEF]"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                          <motion.div 
                            layoutId="activeMenuIndicatorMobile" 
                            className="lg:hidden absolute left-0 right-0 -bottom-[11px] h-[3px] bg-[#00AEEF] rounded-t-md"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        </>
                      )}
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Vertically Stacked Content */}
              <div className="w-full lg:w-2/3 space-y-32 pb-32">
                
                {/* 1. Technical Specs */}
                <div 
                  id="technical" 
                  ref={el => { sectionRefs.current[0] = el; }}
                  className="scroll-mt-40"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tighter uppercase mb-10 border-b border-gray-100 pb-4">
                      Technical Specifications
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                      {Object.entries(aircraftData.performance).map(([key, value], index) => (
                        <div key={index} className="flex flex-col">
                          <p className="text-xs font-semibold tracking-widest uppercase text-[#00AEEF] mb-3">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-3xl font-light text-gray-900 leading-tight">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* 2. Medical Equipment */}
                <div 
                  id="medical" 
                  ref={el => { sectionRefs.current[1] = el; }}
                  className="scroll-mt-40"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tighter uppercase mb-6 border-b border-gray-100 pb-4">
                      Medical Equipment
                    </h3>
                    <div className="flex flex-col border-t border-gray-100">
                      {aircraftData.medicalEquipment.map((item, index) => (
                        <div 
                          key={index} 
                          className="group flex flex-col md:flex-row justify-between py-8 border-b border-gray-100 hover:border-gray-900 transition-all duration-300 cursor-pointer" 
                          onClick={() => handleItemClick(item)}
                        >
                          <p className="text-2xl font-medium text-gray-900 md:w-5/12 group-hover:text-[#00AEEF] transition-colors pr-6">
                            {item.name}
                          </p>
                          <p className="text-gray-500 text-lg font-light md:w-7/12 mt-3 md:mt-0">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* 3. Design Optimizations */}
                <div 
                  id="design" 
                  ref={el => { sectionRefs.current[2] = el; }}
                  className="scroll-mt-40"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tighter uppercase mb-6 border-b border-gray-100 pb-4">
                      Design Optimizations
                    </h3>
                    <div className="flex flex-col border-t border-gray-100">
                      {aircraftData.designOptimizations.map((item, index) => (
                        <div 
                          key={index} 
                          className="group flex flex-col md:flex-row justify-between py-8 border-b border-gray-100 hover:border-gray-900 transition-all duration-300 cursor-pointer" 
                          onClick={() => handleItemClick(item)}
                        >
                          <p className="text-2xl font-medium text-gray-900 md:w-5/12 group-hover:text-[#00AEEF] transition-colors pr-6">
                            {item.name}
                          </p>
                          <p className="text-gray-500 text-lg font-light md:w-7/12 mt-3 md:mt-0">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* 4. Physical Dimensions */}
                <div 
                  id="dimensions" 
                  ref={el => { sectionRefs.current[3] = el; }}
                  className="scroll-mt-40"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tighter uppercase mb-10 border-b border-gray-100 pb-4">
                      Physical Dimensions
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                      {Object.entries(aircraftData.dimensions).map(([key, value], index) => (
                        <div key={index} className="flex flex-col">
                          <p className="text-xs font-semibold tracking-widest uppercase text-[#00AEEF] mb-3">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <div className="text-3xl font-light text-gray-900 leading-tight">
                            {Array.isArray(value) ? (
                              <ul className="list-disc list-inside space-y-3 mt-2 text-xl font-light">
                                {value.map((v, i) => <li key={i}>{v}</li>)}
                              </ul>
                            ) : (
                              value
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* DRAG V-16 Discovery Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto mt-20 mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 to-[#0a192f] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-white/10"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold uppercase tracking-widest mb-4">
                New Product Announcement
              </div>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                Explore the DRAG V-16 Medical UAV
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                Designed for rapid point-to-point medical supply delivery, cold-chain transport for vaccines and pathology samples, with a 16 kg payload capacity and 160 km range.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleProductChange('drag-v16')}
              className="whitespace-nowrap px-8 py-4 rounded-full bg-[#00AEEF] hover:bg-white hover:text-gray-900 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shrink-0 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>View DRAG V-16 Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Tooltip Modal */}
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 "
                onClick={closeTooltip}
                role="dialog"
                aria-labelledby="item-details-title"
                aria-modal="true"
              >
                <motion.div
                  ref={modalRef}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full relative border border-gray-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeTooltip}
                    className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-900 transition-all "
                    aria-label="Close modal"
                  >
                    <CircleX />
                  </motion.button>
                  <h3
                    id="item-details-title"
                    className="text-lg font-semibold text-gray-900"
                  >
                    {selectedItem?.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-4">
                    {selectedItem?.desc}
                  </p>
                  <motion.a
                    href="/contact-us"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: '#374151',
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 inline-flex border-2 border-solid border-gray-900 bg-gray-900 text-white py-2 px-8 rounded-full font-semibold text-sm shadow-md transition duration-300"
                  >
                    Contact for Details
                  </motion.a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      )}
        <div className="hidden md:visible lg:visible xl:visible"></div>
      </div>
    </>
  );
}
