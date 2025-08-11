"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowDownToDot, CircleX } from "lucide-react";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { FaAmbulance, FaPhone, FaRocket } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

const aircraftData = {
  model: "AyuRatha (DX1)",
  useCase: "Air Ambulance – Hospital-to-Hospital / Emergency Response",
  flightType: "VTOL (Vertical Takeoff and Landing)",
  configuration: "Tilt-rotor with EDF-assisted Cruise",
  medicalEquipment: [
    {
      name: "Patient Adjustable Stretcher",
      desc: "Shock-absorbing stretcher for stable patient transport.",
    },
    {
      name: "Compact Ventilator",
      desc: "Battery-powered for continuous respiratory support.",
    },
    {
      name: "Defibrillator",
      desc: "AED and manual modes for cardiac emergencies.",
    },
    {
      name: "Multiparameter Patient Monitor",
      desc: "Tracks SpO2, BP, and ECG in real-time.",
    },
    {
      name: "Portable Oxygen Supply",
      desc: "Concentrator with backup cylinder for reliability.",
    },
    {
      name: "First-Aid and Trauma Kit",
      desc: "Comprehensive kit for immediate care.",
    },
    {
      name: "Medical Intercom System",
      desc: "Links to hospitals for real-time communication.",
    },
    {
      name: "Temperature-Controlled Compartment",
      desc: "Stores medications at optimal conditions.",
    },
    {
      name: "Compact Infusion Pump",
      desc: "Delivers precise IV medication dosages.",
    },
    {
      name: "Storage Rack",
      desc: "Holds IV fluids, gloves, PPE, and meds.",
    },
    {
      name: "Portable Diagnostic Scanner",
      desc: "Ultrasound or handheld scanner for trauma triage.",
    },
  ],
  designOptimizations: [
    {
      name: "Aero-stabilized Structure",
      desc: "Ensures smooth transport in turbulent conditions.",
    },
    {
      name: "Noise and Vibration Reduction",
      desc: "Minimizes patient discomfort during flight.",
    },
    {
      name: "Temperature-Controlled Cabin",
      desc: "Maintains optimal conditions for critical care.",
    },
    {
      name: "Easy-Access Side Door",
      desc: "Facilitates rapid stretcher and equipment loading.",
    },
    {
      name: "Layer Protection for Heart Patients",
      desc: "Specialized shielding for cardiac care.",
    },
    {
      name: "Redundant Systems",
      desc: "Ensures safety with backup critical systems.",
    },
  ],
  dimensions: {
    length: "13 meters",
    height: "3 meters",
    wingspan: "14 meters",
    cabinCapacity: [
      "1 Pilot",
      "1 Patient (Stretcher)",
      "1 Doctor",
      "1 Paramedic",
      "1 Family Member / Attendant",
    ],
  },
  performance: {
    mtow: "1900 kg",
    payload: "500 kg",
    cruisingSpeed: "250 km/h",
    maxRange: "270 km",
    flightTime: "45–60 minutes",
    climbRate: "5 m/s",
    serviceCeiling: "1,000 m (3,280 ft)",
    flightProfile: "Smooth transition from vertical lift to forward cruise",
  },
};

const whyAyuRatha = [
  {
    title: "Unmatched Speed",
    desc: "250 km/h cruising speed for rapid emergency response and fast travel.",
    icon: <FaRocket />,
  },
  {
    title: "Advanced Medical Systems",
    desc: "Equipped with cutting-edge tools for critical care and medical equipment.",
    icon: <FaAmbulance />,
  },
  {
    title: "Safety First",
    desc: "Redundant systems and aero-stability ensure secure transport.",
    icon: <FaPhone />,
  },
];

const performanceHighlights = [
  { title: "Cruising Speed", value: "250 km/h", desc: "Reach patients faster than traditional ambulances." },
  { title: "Maximum Range", value: "270 km", desc: "Cover long distances for hospital transfers." },
  { title: "Flight Time", value: "45–60 min", desc: "Sustained operations for critical missions." },
];

export default function Aircraft() {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentHighlight, setCurrentHighlight] = useState(0);
  const modalRef = useRef(null);
  // @ts-ignore
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  // @ts-ignore
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeTooltip = () => {
    setSelectedItem(null);
  };

  // Auto-cycle performance highlights
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % performanceHighlights.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Focus trap for modal
  useEffect(() => {
    if (selectedItem && modalRef.current) {
      // @ts-ignore
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      // @ts-ignore
      const handleKeyDown = (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
        if (e.key === "Escape") {
          closeTooltip();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      firstElement.focus();

      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedItem]);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const statsVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const statItemVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Head>
        <title>AyuRatha eVTOL Ambulance - Dragale Aviation</title>
        <meta
          name="description"
          content="Discover the AyuRatha (DX1) eVTOL air ambulance by Dragale Aviation, featuring advanced VTOL technology for rapid hospital-to-hospital and emergency medical transport."
        />
        <meta
          name="keywords"
          content="eVTOL, air ambulance, AyuRatha, Dragale Aviation, medical transport, VTOL, emergency response, critical care, India"
        />
        <meta property="og:title" content="AyuRatha eVTOL Ambulance - Dragale Aviation" />
        <meta
          property="og:description"
          content="Explore the technical specifications of the AyuRatha eVTOL, India’s first air ambulance for rapid and safe medical transport."
        />
        <meta property="og:image" content="/evtol-og-image.webp" />
        <meta property="og:url" content="https://dragaleaviation.com/aircraft" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Vehicle",
            name: "AyuRatha (DX1) eVTOL Ambulance",
            description: "India’s first eVTOL air ambulance for hospital-to-hospital and emergency medical transport.",
            brand: {
              "@type": "Brand",
              name: "Dragale Aviation",
            },
            model: "DX1",
            vehicleConfiguration: "Tilt-rotor with EDF-assisted Cruise",
            maximumSpeed: "250 km/h",
            vehicleSeatingCapacity: "5",
          })}
        </script>
        <style>{`
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          @media (prefers-reduced-motion: reduce) {
            .motion-div, .motion-h1, .motion-p, .motion-a, .motion-button {
              transition: none !important;
              animation: none !important;
            }
          }
          .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.2);
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
      <div className="pt-10 min-h-screen bg-black text-white">

        <main id="aircraft" className="px-4 sm:px-8 lg:px-16 py-12 relative">
          {/* Video Background */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-30"
              poster="/dgw.png"
            >
              <source src="/dargale_aviation.mp4" type="video/mp4" />
            </video>
            {/* Particle Effect */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                }}
              />
            ))}
          </motion.div>

          {/* Hero Section */}
          <motion.div className="mt-10 text-center max-w-5xl mx-auto relative z-10">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
              <motion.div
                className="bg-white/5 backdrop-blur-3xl p-8 rounded-2xl border-dash border-white/10 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#fff]/60 flex items-center justify-center gap-2"
                >
                  <FaRocket className="text-[#fff]" /> AyuRatha eVTOL Ambulance
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-4 text-lg sm:text-xl text-gray-200"
                >
                  Redefining Emergency Medical Transport
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-4 max-w-3xl mx-auto text-sm sm:text-base text-gray-300"
                  id="hero-desc"
                >
                  The AyuRatha (DX1) delivers life-saving care with advanced medical systems and VTOL precision.                </motion.p>
                <motion.div
                  className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="text-gray-200 text-sm">
                    <FaRocket className="mx-auto text-[#fff] mb-2" />
                    VTOL Technology
                  </div>
                  <div className="text-gray-200 text-sm">
                    <FaAmbulance className="mx-auto text-[#fff] mb-2" />
                    Advanced Medical Suite
                  </div>
                  <div className="text-gray-200 text-sm">
                    <FaPhone className="mx-auto text-[#fff] mb-2" />
                    Redundant Safety Systems
                  </div>
                </motion.div>

              </motion.div>
            </Tilt>

          </motion.div>



          {/* Performance Highlights Carousel */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mt-8 text-center"
            role="region"
            aria-live="polite"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Performance Highlights</h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHighlight}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 backdrop-blur-3xl p-6 rounded-2xl border border-white/10"
              >
                <h3 className="text-lg font-medium text-white">{performanceHighlights[currentHighlight].title}</h3>
                <p className="text-2xl font-bold text-gray-400 mt-2">{performanceHighlights[currentHighlight].value}</p>
                <p className="text-sm text-gray-300 mt-2">{performanceHighlights[currentHighlight].desc}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-2 mt-4">
              {performanceHighlights.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${index === currentHighlight ? "bg-gray-400" : "bg-gray-500"
                    }`}
                  onClick={() => setCurrentHighlight(index)}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                  role="button"
                  aria-label={`View ${performanceHighlights[index].title}`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setCurrentHighlight(index)}
                />
              ))}
            </div>
          </motion.div> */}

          {/* Why AyuRatha Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto mt-8"

          >
            <h2 className="text-2xl font-semibold text-white text-center mb-6">Why AyuRatha?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4"

            >
              {whyAyuRatha.map((item, index) => (
                <Tilt
                  key={index}
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={1000}
                  scale={1.02}
                >
                  <motion.div
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.1 }}
                    style={{
                      borderBottom: `1.5px dashed #fff`,
                    }}
                    className="bg-white/5 backdrop-blur-3xl p-6 rounded-2xl border border-white/10 hover:border-gray-400/30 transition-all text-center"
                  >
                    <div className="text-2xl text-[#fff] mb-2">{item.icon}</div>
                    <h3 className="text-lg font-medium text-white">{item.title}</h3>
                    <p className="text-sm text-gray-300 mt-2">{item.desc}</p>
                  </motion.div>
                </Tilt>
              ))}
            </div>
          </motion.div>

          {/* Collapsible Sections */}
          <motion.div className="max-w-7xl mx-auto mt-8 space-y-6">
            {/* Technical Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10"
              style={{
                borderBottom: `1.5px dashed #fff`,
              }}
            >
              <motion.button
                onClick={() => toggleSection("technical")}
                className="w-full p-4 flex justify-between items-center text-left text-lg font-semibold text-white "
                aria-expanded={expandedSection === "technical"}
                aria-controls="technical-section"
              >
                Technical Specifications
                <motion.span
                  animate={{ rotate: expandedSection === "technical" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowDownToDot className="text-[#fff]" />
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {expandedSection === "technical" && (
                  <motion.div
                    id="technical-section"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {Object.entries(aircraftData.performance).map(([key, value], index) => (
                      <Tilt
                        key={index}
                        tiltMaxAngleX={8}
                        tiltMaxAngleY={8}
                        perspective={1000}
                        scale={1.02}
                      >
                        <motion.div
                          variants={cardVariants}
                          initial="initial"
                          animate="animate"
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-gray-400/30 transition-all group relative"
                        >
                          <p className="text-sm text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </p>
                          <p className="text-base font-medium text-gray-200">{value}</p>
                          <motion.div
                            className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center text-sm text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          >
                            Key performance metric for efficient medical transport.
                          </motion.div>
                        </motion.div>
                      </Tilt>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Medical Equipment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10"
              style={{
                borderBottom: `1.5px dashed #fff`,
              }}
            >
              <motion.button
                onClick={() => toggleSection("equipment")}
                className="w-full p-4 flex justify-between items-center text-left text-lg font-semibold text-white "
                aria-expanded={expandedSection === "equipment"}
                aria-controls="equipment-section"
              >
                Medical Equipment
                <motion.span
                  animate={{ rotate: expandedSection === "equipment" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowDownToDot className="text-[#fff]" />
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {expandedSection === "equipment" && (
                  <motion.div
                    id="equipment-section"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 "
                  >
                    {aircraftData.medicalEquipment.map((item, index) => (
                      <Tilt
                        key={index}
                        tiltMaxAngleX={8}
                        tiltMaxAngleY={8}
                        perspective={1000}
                        scale={1.02}
                      >
                        <motion.div
                          variants={cardVariants}
                          initial="initial"
                          animate="animate"
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-gray-400/30 transition-all group relative cursor-pointer"
                          onClick={() => handleItemClick(item)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === "Enter" && handleItemClick(item)}
                          aria-label={`Learn more about ${item.name}`}
                        >
                          <p className="text-base font-medium text-gray-200">{item.name}</p>
                          <motion.div
                            className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center text-sm text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {item.desc}
                          </motion.div>
                        </motion.div>
                      </Tilt>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Design Optimizations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10"
              style={{
                borderBottom: `1.5px dashed #fff`,
              }}
            >
              <motion.button
                onClick={() => toggleSection("design")}
                className="w-full p-4 flex justify-between items-center text-left text-lg font-semibold text-white "
                aria-expanded={expandedSection === "design"}
                aria-controls="design-section"
              >
                Design Optimizations
                <motion.span
                  animate={{ rotate: expandedSection === "design" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowDownToDot className="text-[#fff]" />
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {expandedSection === "design" && (
                  <motion.div
                    id="design-section"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {aircraftData.designOptimizations.map((item, index) => (
                      <Tilt
                        key={index}
                        tiltMaxAngleX={8}
                        tiltMaxAngleY={8}
                        perspective={1000}
                        scale={1.02}
                      >
                        <motion.div
                          variants={cardVariants}
                          initial="initial"
                          animate="animate"
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-gray-400/30 transition-all group relative cursor-pointer"
                          onClick={() => handleItemClick(item)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === "Enter" && handleItemClick(item)}
                          aria-label={`Learn more about ${item.name}`}
                        >
                          <p className="text-base font-medium text-gray-200">{item.name}</p>
                          <motion.div
                            className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center text-sm text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {item.desc}
                          </motion.div>
                        </motion.div>
                      </Tilt>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Physical Dimensions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10"
              style={{
                borderBottom: `1.5px dashed #fff`,
              }}
            >
              <motion.button
                onClick={() => toggleSection("dimensions")}
                className="w-full p-4 flex justify-between items-center text-left text-lg font-semibold text-white "
                aria-expanded={expandedSection === "dimensions"}
                aria-controls="dimensions-section"
              >
                Physical Dimensions
                <motion.span
                  animate={{ rotate: expandedSection === "dimensions" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowDownToDot className="text-[#fff]" />
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {expandedSection === "dimensions" && (
                  <motion.div
                    id="dimensions-section"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {Object.entries(aircraftData.dimensions).map(([key, value], index) => (
                      <Tilt
                        key={index}
                        tiltMaxAngleX={8}
                        tiltMaxAngleY={8}
                        perspective={1000}
                        scale={1.02}
                      >
                        <motion.div
                          variants={cardVariants}
                          initial="initial"
                          animate="animate"
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-gray-400/30 transition-all"
                        >
                          <p className="text-sm text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </p>
                          <p className="text-base font-medium text-gray-200">
                            {Array.isArray(value) ? value.join(", ") : value}
                          </p>
                        </motion.div>
                      </Tilt>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </motion.div>

          {/* Tooltip Modal */}
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4 "
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
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="bg-white/5 backdrop-blur-3xl p-6 rounded-2xl shadow-2xl max-w-md w-full relative border border-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeTooltip}
                    className="absolute top-4 right-4 text-xl text-gray-300 hover:text-gray-400 transition-all "
                    aria-label="Close modal"
                  >
                    <CircleX/>
                  </motion.button>
                  <h3 id="item-details-title" className="text-lg font-semibold text-white">
                    {/*  @ts-ignore */}
                    {selectedItem.name}
                  </h3>
                  {/*  @ts-ignore */}
                  <p className="text-gray-200 text-sm mt-4">{selectedItem.desc}</p>
                  <motion.a
                    href="/contactus"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#fff", // Tailwind gray-600 equivalent, slightly darker
                      
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 inline-flex border-2 border-dashed border-white/100 bg-gray-700 text-white py-2 px-8 rounded-full font-semibold text-sm shadow-md transition duration-300"
                  >
                    Contact for Details
                  </motion.a>

                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>


        </main>
        <div className='hidden md:visible lg:visible xl:visible'>


        </div>
      </div>
    </>
  );
}