"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CircleX } from "lucide-react";

interface TeamMember {
    name: string;
    role: string;
    img: string;
    bio: string;
    achievements: string;
}

interface TeamModalProps {
    selectedMember: TeamMember | null;
    isOpen: boolean;
    onClose: () => void;
    badgeVariants?: any;
}

const TeamModal: React.FC<TeamModalProps> = ({
    selectedMember,
    isOpen,
    onClose,
    badgeVariants,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = React.useState<"bio" | "achievements">("bio");


    useEffect(() => {
        if (selectedMember && modalRef.current) {
            
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Tab") {
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        (lastElement as HTMLElement)?.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        (firstElement as HTMLElement)?.focus();
                    }
                }
                if (e.key === "Escape") {
                    onClose();
                }
            };

            document.addEventListener("keydown", handleKeyDown);
            (firstElement as HTMLElement)?.focus();

            return () => document.removeEventListener("keydown", handleKeyDown);
        }
    }, [selectedMember]);
    return (
        <AnimatePresence>
            {isOpen && selectedMember && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 flex justify-center items-center z-50 p-4 bg-black/50"
                    onClick={onClose}
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
                        className="bg-black/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl max-w-3xl w-full relative border border-gray-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white text-xl"
                            aria-label="Close modal"
                        >
                            <CircleX />
                        </motion.button>

                        <div className="flex flex-col sm:flex-row gap-6">
                            {/* Image */}
                            <div className="w-32 h-32 relative rounded-full overflow-hidden shadow-lg flex-shrink-0 mx-auto sm:mx-0 bg-white">
                                <Image
                                    src={selectedMember?.img}
                                    alt={`Photo of ${selectedMember?.name}`}
                                    width={128}
                                    height={128}
                                    className="object-cover rounded-full"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h3
                                    id="team-member-name"
                                    className="text-2xl font-bold text-white"
                                >
                                    {selectedMember?.name}
                                </h3>
                                <motion.span
                                    variants={badgeVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full border border-gray-600 text-white bg-black/20"
                                >
                                    {selectedMember?.role}
                                </motion.span>

                                {/* Tabs */}
                                <div
                                    className="flex gap-4 mt-6 border-b border-gray-700"
                                    role="tablist"
                                >
                                    <button
                                        onClick={() => setActiveTab("bio")}
                                        className={`pb-2 text-sm font-semibold ${activeTab === "bio" ? "border-b-2 border-white text-white" : "text-gray-400"
                                            }`}
                                        aria-selected={activeTab === "bio"}
                                        role="tab"
                                        tabIndex={activeTab === "bio" ? 0 : -1}
                                    >
                                        Bio
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("achievements")}
                                        className={`pb-2 text-sm font-semibold ${activeTab === "achievements"
                                            ? "border-b-2 border-white text-white"
                                            : "text-gray-400"
                                            }`}
                                        aria-selected={activeTab === "achievements"}
                                        role="tab"
                                        tabIndex={activeTab === "achievements" ? 0 : -1}
                                    >
                                        Achievements
                                    </button>
                                </div>

                                {/* Tab Panels */}
                                <div
                                    id="bio-panel"
                                    role="tabpanel"
                                    aria-labelledby="bio-tab"
                                    className={`mt-4 text-sm leading-relaxed text-gray-300 ${activeTab !== "bio" ? "hidden" : ""
                                        }`}
                                >
                                    {selectedMember?.bio?.trim()}
                                </div>
                                <div
                                    id="achievements-panel"
                                    role="tabpanel"
                                    aria-labelledby="achievements-tab"
                                    className={`mt-4 text-sm leading-relaxed text-gray-300 ${activeTab !== "achievements" ? "hidden" : ""
                                        }`}
                                >
                                    <ul className="list-disc pl-5">
                                        {selectedMember?.achievements
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
    );
};

export default TeamModal;
