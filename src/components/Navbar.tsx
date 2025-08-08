"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Home, Plane, Info, Phone, Briefcase } from "lucide-react";
import Link from "next/link";

const navItems = [
  { icon: Home, href: "/", label: "Home", color: "#ec4899" },
  { icon: Plane, href: "/products", label: "Products", color: "#3b82f6" },
  { icon: Info, href: "/about", label: "About", color: "#8b5cf6" },
  { icon: Phone, href: "/contactus", label: "Contact", color: "#22c55e" },
  { icon: Briefcase, href: "/advisors", label: "Advisors", color: "#facc15" },
];

function MagneticIcon({ icon: Icon, href, label, color }: typeof navItems[0]) {
  const ref = useRef<HTMLDivElement>(null);

  // Local motion values for magnetic effect per icon
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    // Subtle magnetic effect
    localX.set(offsetX * 0.25);
    localY.set(offsetY * 0.25);
  }

  function handleMouseLeave() {
    localX.set(0);
    localY.set(0);
  }

  function handleFocus(e: React.FocusEvent<HTMLDivElement>) {
    e.currentTarget.style.boxShadow = `0 0 15px ${color}`;
  }
  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    e.currentTarget.style.boxShadow = "";
  }

  return (
    <Link href={href} aria-label={label} passHref>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.3, y: -5, boxShadow: `0 0 18px ${color}` }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ x: localX, y: localY }}
        className="flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 cursor-pointer outline-none relative select-none"
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {/* Glow behind icon */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ filter: "blur(8px)" }}
          animate={{
            boxShadow: [
              `0 0 8px ${color}`,
              `0 0 18px ${color}`,
              `0 0 8px ${color}`,
            ],
          }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
        <Icon size={20} stroke={color} strokeWidth={2} className="relative z-10" />
      </motion.div>
    </Link>
  );
}

export default function ResponsiveIconNavbar() {
  return (
    <motion.div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full w-sm sm:max-w-lg"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <nav
        className="
          relative flex justify-between gap-1
          px-8 py-3 sm:px-8 p-9  rounded-full
          backdrop-blur-xl bg-white/10 border border-white/20
          shadow-lg shadow-black/50 overflow-hidden
          before:absolute before:inset-[-3px] before:rounded-full before:border before:border-dashed before:border-white/10 before:pointer-events-none
          sm:justify-center
          sm:gap-9
          "
        aria-label="Primary navigation"
      >
        {/* Light reflection shimmer */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
          animate={{ x: ["-150%", "150%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />

        {navItems.map((item) => (
          <MagneticIcon key={item.label} {...item} />
        ))}
      </nav>
    </motion.div>
  );
}
