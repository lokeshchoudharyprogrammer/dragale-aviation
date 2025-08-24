"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { CircleX } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import { Person } from "../../../utils/types";

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
    img: "/founders/shivanshu.png",
    linkedin: "https://www.linkedin.com/in/shivanshu-tank-556b00232/",

  },
  {
    name: "Syed Mujahid",
    role: "Co-Founder & CTO",
    bio: `
      Syed Mujahid, an Aerospace Engineering expert, leads the design of Dragale’s eVTOL air ambulance. His experience at Mallard Enterprises and as a Youth Ambassador & Advisor at the Advanced Air Mobility Institute ensures cutting-edge innovation and safety in every system.

    `,
    achievements: `
      - Designed core eVTOL propulsion system
      - Published research on urban air mobility
      - Speaker at Global Aviation Summit 2024
    `,
    img: "/founders/syed.jpg",
    linkedin: "https://www.linkedin.com/in/syed-mujahid-496064228/",
  },
];


export default function About() {
  const ref = useRef(null);
  const modalRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedMember, setSelectedMember] = useState<Person | null>(null);
  const [activeTab, setActiveTab] = useState("bio");
  const text = "Meet Our Visionaries";
  const primaryColor = "#fff"; // purple


  const handleCardClick = (person: Person) => {
    setSelectedMember(person);
    setActiveTab("bio");
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  useEffect(() => {
    if (selectedMember && modalRef.current) {
      // @ts-expect-error dont ask again here bcz this is crt 
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleKeyDown = (e: KeyboardEvent) => {
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
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const badgeVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.1, y: -2, transition: { type: "spring", stiffness: 400, damping: 15 } },
  };

  return (
    <>
      <section className="min-h-screen bg-black pt-20 text-white">
        <main id="about" className="px-4 sm:px-8 lg:px-16 py-16 space-y-12 max-w-6xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative text-left pb-5"
            style={{
              borderBottom: `1.5px dashed #fff`,
            }}
          >
            <h1
              className="text-3xl sm:text-4xl font-extrabold mb-4"
              style={{
                background: `#fff`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Dragale Aviation
            </h1>
            <p className="font-stretch-normal line-clamp-3 text-gray-300 text-base leading-relaxed max-w-3xl">
              At Dragale Aviation, we’re redefining emergency medical transport with India’s first eVTOL air ambulance. Our mission is to deliver rapid, safe, and innovative critical care, ensuring every patient reaches help when it matters most.
            </p>
          </motion.div>






          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative text-left pb-5"
            style={{
              borderBottom: `1.5px dashed #fff`,
            }}
          >
            <h2 className="text-2xl font-semibold mb-4" style={{ color: primaryColor }}>
              Our Vision
            </h2>
            <p className="font-stretch-normal line-clamp-3  text-gray-400 text-base max-w-3xl">
              We envision a future where advanced air mobility transforms lives. By pioneering eVTOL technology, Dragale Aviation aims to make emergency medical transport accessible, efficient, and sustainable across India and beyond.
            </p>
          </motion.div>

          {/* Animated Heading */}
          <div className="flex justify-start relative text-left pb-5"

            style={{
              borderBottom: `1.5px dashed #fff`,
            }}
            role="heading" aria-level={2} aria-label="Meet Our Visionaries">
            <AnimatePresence>
              {text.split("").map((char, i) => (
                <motion.span
                  ref={ref}
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="text-2xl sm:text-4xl font-bold tracking-tight select-none"
                  style={{ color: primaryColor }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          {/* Team Grid */}
          <section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
            aria-label="Team Members"
          >
            {teamData.map((person, index) => (
              <Tilt
                key={index}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                transitionSpeed={300}
                scale={1.02}
                glareEnable={true}
                glareMaxOpacity={0.15}
                glareColor={primaryColor}
                glareBorderRadius="20px"
              >
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="font-stretch-normal line-clamp-3 relative bg-white/5 backdrop-blur-3xl p-6 rounded-2xl shadow-xl border border-white/20 hover:border-gray-500 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 group"
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
                    className="w-24 h-24 relative rounded-full overflow-hidden shadow-lg mx-auto mb-4 bg-white"
                  >
                    <Image
                      src={person.img}
                      alt={`Photo of ${person.name}`}
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
                    <h3 className="font-stretch-normal line-clamp-3 text-lg font-semibold text-white">{person.name}</h3>
                    <motion.span
                      variants={badgeVariants}
                      initial="initial"
                      whileHover="hover"
                      className="font-stretch-normal line-clamp-3  bg-gray-900/30 text-#fff-300 text-xs py-1 px-3 rounded-full font-medium mt-2 inline-block border border-#fff-500/40"
                    >
                      {person.role}
                    </motion.span>
                  </motion.div>

                  {/* Social Link */}
                  {person.linkedin && (
                    <motion.a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, color: primaryColor }}
                      className="absolute top-4 right-4 text-gray-400"
                      aria-label={`Visit ${person.name}'s LinkedIn profile`}
                    >
                      <FaLinkedin size={20} />
                    </motion.a>
                  )}
                </motion.div>
              </Tilt>
            ))}
          </section>

          {/* Modal Pop-Up */}
          <AnimatePresence>
            {selectedMember && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0  flex justify-center items-center z-50 p-4"
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
                  className="bg-white/5 backdrop-blur-3xl p-6 sm:p-8 rounded-2xl shadow-2xl max-w-3xl w-full relative border "
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-xl "
                    aria-label="Close modal"
                  >
                    <CircleX />
                  </motion.button>
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Image */}
                    <div className="w-32 h-32 relative rounded-full overflow-hidden shadow-xl flex-shrink-0 mx-auto sm:mx-0 bg-white">
                      <Image
                        src={selectedMember.img}
                        alt={`Photo of ${selectedMember.name}`}
                        layout="intrinsic"
                        width={128}
                        height={128}
                        className="object-cover rounded-full"
                      />
                    </div>

                    {/* Member Info */}
                    <div className="flex-1">
                      <h3 id="team-member-name" className="font-stretch-normal line-clamp-3  text-2xl font-bold" style={{ color: primaryColor }}>
                        {selectedMember.name}
                      </h3>
                      <motion.span
                        variants={badgeVariants}
                        initial="initial"
                        whileHover="hover"
                        className="font-stretch-normal line-clamp-3  bg-gray-900/30 text-#fff-300 text-xs py-1 px-3 rounded-full font-medium mt-2 inline-block border "
                      >
                        {selectedMember.role}
                      </motion.span>

                      {/* Tabs */}
                      <div
                        className="flex gap-4 mt-6 border-b "
                        role="tablist"
                        aria-label="Team member details tabs"
                      >
                        <button
                          onClick={() => setActiveTab("bio")}
                          className={`pb-2 text-sm font-semibold ${activeTab === "bio"
                            ? "text-#fff-400 border-b-2 "
                            : "text-#fff-300 "
                            }`}
                          aria-selected={activeTab === "bio"}
                          aria-controls="bio-panel"
                          role="tab"
                          tabIndex={activeTab === "bio" ? 0 : -1}
                        >
                          Bio
                        </button>
                        <button
                          onClick={() => setActiveTab("achievements")}
                          className={`pb-2 text-sm font-semibold ${activeTab === "achievements"
                            ? "text-#fff-400"
                            : "text-#fff-400"
                            }`}
                          aria-selected={activeTab === "achievements"}
                          aria-controls="achievements-panel"
                          role="tab"
                          tabIndex={activeTab === "achievements" ? 0 : -1}
                        >
                          Achievements
                        </button>
                      </div>

                      <div
                        id="bio-panel"
                        role="tabpanel"
                        aria-labelledby="bio-tab"
                        aria-live="polite"
                        className="mt-4 text-#fff-300 text-sm leading-relaxed whitespace-pre-line"
                        hidden={activeTab !== "bio"}
                      >
                        {selectedMember.bio.trim()}
                      </div>
                      <div
                        id="achievements-panel"
                        role="tabpanel"
                        aria-labelledby="achievements-tab"
                        aria-live="polite"
                        className="mt-4 text-#fff-300 text-sm leading-relaxed"
                        hidden={activeTab !== "achievements"}
                      >
                        <ul className="list-disc pl-5">
                          {selectedMember.achievements
                            .trim()
                            .split("\n")
                            .map((item, i) => (
                              <li key={i}>{item.trim().replace(/^- /, "")}</li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </section>
    </>
  );
}
