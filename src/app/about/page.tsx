"use client";

import { Footer } from "../../components/footer";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import Tilt from "react-parallax-tilt";


const teamData = [
  {
    name: "Shivanshu Tank",
    role: "Founder & CEO",
    bio: `
      Driven by a mission to transform emergency medical transport, Shivanshu Tank founded Dragale Aviation to create India’s first air ambulance eVTOL. With a Bachelor’s in Computer Science & Engineering, he blends technical expertise with visionary leadership to deliver faster, safer, and smarter critical care solutions.
    `,
    achievements: `
      - Founded Dragale Aviation in 2023
      - Led development of eVTOL prototype
      - Recognized as a Young Innovator by India Tech Awards
    `,
    img: "/founders/shivanshu.jpg",
    badge: "Founder",
    linkedin: "https://www.linkedin.com/in/shivanshu-tank-556b00232/",
  },
  {
    name: "Syed Mujahid",
    role: "Co-Founder & CTO",
    bio: `
      Syed Mujahid, an Aerospace Engineering expert, leads the design of Dragale’s eVTOL air ambulance. His experience at Mallard Enterprises and as a Youth Ambassador at the Advanced Air Mobility Institute ensures cutting-edge innovation and safety in every system.
    `,
    achievements: `
      - Designed core eVTOL propulsion system
      - Published research on urban air mobility
      - Speaker at Global Aviation Summit 2024
    `,
    img: "/founders/syed.jpg",
    badge: "Founder",
    linkedin: "https://www.linkedin.com/in/syed-mujahid-496064228/",
  },
  // {
  //   name: "Pushpendra Kumar Jangid",
  //   role: "Co-Founder & ESIS",
  //   bio: `
  //     Pushpendra, with a diploma and degree in Electrical Engineering, drives the integration of advanced electrical systems for Dragale’s eVTOL. His focus on reliability and precision ensures every mission is powered safely and efficiently.
  //   `,
  //   achievements: `
  //     - Developed eVTOL battery management system
  //     - Patented electrical integration module
  //     - Mentored 50+ engineering students
  //   `,
  //   img: "/founders/pushpendra.png",
  //   badge: "Founder",
  //   linkedin: "https://linkedin.com/in/pushpendrajangid",
  // },
];

export default function About() {
  const ref = useRef(null);
  const modalRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeTab, setActiveTab] = useState("bio");
  const text = "Meet Our Visionaries";
  // @ts-ignore
  const handleCardClick = (person) => {
    setSelectedMember(person);
    setActiveTab("bio");
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  // Focus trap for modal
  useEffect(() => {
    if (selectedMember && modalRef.current) {
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
          closeModal();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      firstElement.focus();

      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedMember]);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const badgeVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.1,
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 15 },
    },
  };

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20 text-white">
        {/* Breadcrumb Navigation */}


        <main id="about" className="px-4 sm:px-8 lg:px-16 py-16 space-y-12">
          {/* Animated Background */}


          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto relative"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center justify-center gap-2 mb-4">
              Dragale Aviation
            </h1>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              At Dragale Aviation, we’re redefining emergency medical transport with India’s first eVTOL air ambulance. Our mission is to deliver rapid, safe, and innovative critical care, ensuring every patient reaches help when it matters most.
            </p>

          </motion.div>

          {/* Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Our Vision</h2>
            <p className="text-gray-300 text-sm sm:text-base">
              We envision a future where advanced air mobility transforms lives. By pioneering eVTOL technology, Dragale Aviation aims to make emergency medical transport accessible, efficient, and sustainable across India and beyond.
            </p>
          </motion.div>

          {/* Heading */}
          <div className="flex justify-center">
            <AnimatePresence>
              {text.split("").map((char, i) => (
                <motion.span
                  ref={ref}
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="text-xl sm:text-3xl font-bold tracking-tight"
                >
                  {char === " " ? <span> </span> : char}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {teamData.map((person, index) => (
              <Tilt
                key={index}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                transitionSpeed={300}
                scale={1.02}
              >
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative bg-white/5 backdrop-blur-3xl p-6 rounded-2xl shadow-xl border border-white/10 hover:border-gray-400/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 group"
                  onClick={() => handleCardClick(person)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleCardClick(person)}
                  aria-label={`View details about ${person.name}`}
                >



                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                    className="w-24 h-24 relative rounded-full overflow-hidden shadow-md mx-auto mb-4"
                  >
                    <Image
                      src={person.img}
                      alt={person.name}
                      layout="intrinsic"
                      width={96}
                      height={96}
                      priority={index === 0}
                      loading={index > 0 ? "lazy" : undefined}
                      className="object-cover rounded-full"
                    />
                  </motion.div>

                  {/* Name and Role */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="text-center"
                  >
                    <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                    <motion.span
                      variants={badgeVariants}
                      initial="initial"
                      whileHover="hover"
                      className="bg-gray-900/20 text-white text-xs py-1 px-3 rounded-full font-medium mt-2 inline-block border border-gray-400/30"
                    >
                      {person.role}
                    </motion.span>
                    {/* <p className="text-gray-300 text-sm mt-1">{person.role}</p> */}
                  </motion.div>

                  {/* Social Link */}
                  {person.linkedin && (
                    <motion.a
                      href={person.linkedin}
                      target="_blank"
                      whileHover={{ scale: 1.2, color: "white" }}
                      className="absolute top-4 right-4 text-gray-300"
                      aria-label={`Visit ${person.name}'s LinkedIn profile`}
                    >
                      <FaLinkedin size={20} />
                    </motion.a>
                  )}
                </motion.div>
              </Tilt>
            ))}
          </div>

          {/* Modal Pop-Up */}
          <AnimatePresence>
            {selectedMember && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
                onClick={closeModal}
                role="dialog"
                aria-labelledby="team-member-name"
                aria-modal="true"
              >
                <motion.div
                  ref={modalRef}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="bg-white/5 backdrop-blur-3xl p-6 sm:p-8 rounded-2xl shadow-2xl max-w-3xl w-full relative border border-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-xl text-gray-300 hover:text-gray-400 "
                    aria-label="Close modal"
                  >
                    ×
                  </motion.button>
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Image */}
                    <div className="w-32 h-32 relative rounded-full overflow-hidden shadow-xl flex-shrink-0 mx-auto sm:mx-0">
                      <Image
                        //   @ts-ignore
                        src={selectedMember.img}
                        //   @ts-ignore
                        alt={selectedMember.name}
                        layout="intrinsic"
                        width={128}
                        height={128}
                        className="object-cover rounded-full"
                      />
                    </div>

                    {/* Member Info */}
                    <div className="flex-1">
                      <h3 id="team-member-name" className="text-2xl font-bold text-white">
                        {/*@ts-ignore */}
                        {selectedMember.name}
                      </h3>
                      <motion.span
                        variants={badgeVariants}
                        initial="initial"
                        whileHover="hover"
                        className="bg-gray-900/20 text-white text-xs py-1 px-3 rounded-full font-medium mt-2 inline-block border border-gray-400/30"
                      >
                        {/*@ts-ignore */}
                        {selectedMember.role}
                      </motion.span>
                      {/*@ts-ignore */}
                      {/* <p className="text-gray-300 text-sm mt-1">{selectedMember.role}</p> */}

                      {/* Tabs */}
                      <div className="flex gap-4 mt-4 border-b border-white/10">
                        <button
                          onClick={() => setActiveTab("bio")}
                          className={`pb-2 text-sm font-medium ${activeTab === "bio" ? "text-gray-400 border-b-2 border-gray-400" : "text-gray-300"
                            }`}
                          aria-selected={activeTab === "bio"}
                          aria-controls="bio-panel"
                        >
                          Bio
                        </button>
                        <button
                          onClick={() => setActiveTab("achievements")}
                          className={`pb-2 text-sm font-medium ${activeTab === "achievements" ? "text-gray-400 border-b-2 border-gray-400" : "text-gray-300"
                            }`}
                          aria-selected={activeTab === "achievements"}
                          aria-controls="achievements-panel"
                        >
                          Achievements
                        </button>
                      </div>
                      <div
                        id="bio-panel"
                        role="region"
                        aria-live="polite"
                        className="mt-4 text-gray-200 text-sm leading-relaxed"
                        hidden={activeTab !== "bio"}
                      >
                        {/*@ts-ignore */}
                        {selectedMember.bio.trim()}
                      </div>
                      <div
                        id="achievements-panel"
                        role="region"
                        aria-live="polite"
                        className="mt-4 text-gray-200 text-sm leading-relaxed"
                        hidden={activeTab !== "achievements"}
                      >
                        <ul className="list-disc pl-5">
                          {/*@ts-ignore */}
                          {selectedMember.achievements.trim().split("\n").map((item, i) => (
                            <li key={i}>{item.trim().replace("- ", "")}</li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      {/* <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 inline-flex bg-gray-900/20 text-white py-2 px-6 rounded-full font-medium text-sm shadow-md hover:bg-gray-600 transition duration-300 navbar-glass"
                      >
                        Contact Us
                      </motion.a> */}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </>
  );
}