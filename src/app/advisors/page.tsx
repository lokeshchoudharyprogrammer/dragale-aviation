"use client";

import SocialBadge from "@/components/SocialBadge";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AdvisorsPage() {
    const headerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    };
    const danBio = [
        `Dan Sloat is Founder & President of the Advanced Air Mobility Institute, a 501(c)3 international nonprofit research center dedicated to educating & advocating for the broadest public benefit through the aviation ecosystem. He is a global top 20 AAM industry leader according to eVTOL Insights Powerbook and earned Community Engagement Team of the Year 2024.`,
        `As President of Electro.Aero, Dan a is a champion of charging protocol harmonization for reliable and affordable electric aviation infrastructure networks. As Academic Coordinator of the Master's in AAM at ITAerea Aeronautical Business School in Spain, he seeks to inspire the next generation of aviators and frequently gives guest lectures including Sapienza Technical University in Rome, Kansas State University Aerospace Campus, and Embry-Riddle.`,
        `At the inaugural AAM Symposium hosted by ICAO, the United Nations’ aviation agency, Dan was a featured Keynote Speaker. He travels extensively to promote public acceptance of AAM technology to now 25 cities across 16 nations including presentations at EBACE, K-UAM, and NASA.`,
        `Previously, he led an American vertiport company as CEO and led the aviation division of an energy company as Chief Aeronautics Officer. As a United States Air Force Captain, he earned a Humanitarian Service Medal for his efforts to aid refugees in Syria.`,
        `After his military commitment, Dan earned a Masters in Economics, a Masters in Business Administration, and a Juris Doctor. He is a part 61 private pilot and part 107 remote drone pilot. Dan is an adjunct professor of Advanced Air Mobility at the University of Arkansas, a Fellow of the Royal Aeronautical Society and sits on the World Economic Forum AVIATE committee to advise on the future of autonomous flight.`
    ];

    return (
        <div className="pt-40 min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-16 px-6">

            <motion.div
                className="max-w-4xl mx-auto mb-16 text-center"
                variants={headerVariants}
                initial="hidden"
                animate="visible"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-widest text-white">
                    Board of Advisors
                </h1>
                <motion.div
                    className="mt-4 mx-auto "
                    animate={{
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                />
            </motion.div>

            {/* Premium Full-Width Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}

                style={{
                    borderBottom: `1.5px dashed #fff`,
                }}
                className=" relative text-left pb-5 mt-20 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 pb-12 border-b border-white/20"
            >
                {/* Profile Image */}
                <div className="relative w-40 h-40 flex-shrink-0 rounded-full overflow-hidden shadow-2xl border-2 border-[#0077b5]/0 border border-dashed">
                    <Image
                        src="/advisor.jpeg"
                        alt="Dan Sloat"
                        fill
                        sizes="(max-width: 768px) 256px, 256px"
                        className="object-cover object-center"
                    />
                </div>

                {/* Name + Title + Social */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="font-stretch-normal line-clamp-3 text-5xl font-extrabold tracking-tight text-white leading-tight">
                        Dan Sloat
                    </h1>
                    <div className="w-24 h-[2px] bg-white mx-auto md:mx-0 mt-2 rounded-full"></div>

                    <p className="font-stretch-normal line-clamp-3  mt-4 text-xl text-gray-300 font-medium leading-relaxed max-w-2xl">
                        Founder & President, Advanced Air Mobility Institute
                    </p>

                    <div className="mt-6">
                        <SocialBadge
                            icon="FaLinkedin"
                            label="LinkedIn"
                            link="https://www.linkedin.com/in/dan-sloat/"
                            color="#0077b5"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Bio Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-4xl mx-auto mt-12"
            >
                <h2 className="text-3xl font-bold text-white relative inline-block">
                    Biography
                    <span className="block w-20 h-[2px] bg-white mt-2 rounded-full"></span>
                </h2>

                <div className="space-y-6 text-gray-300 text-lg leading-relaxed text-justify mt-8">
                    {danBio.map((paragraph, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                        >
                            {paragraph}
                        </motion.p>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
