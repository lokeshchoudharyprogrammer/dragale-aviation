'use client';

import { motion, useMotionValue } from 'framer-motion';
import { Briefcase, Home, Info, Lightbulb, Phone, Plane } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

const navItems = [
  { icon: Home, href: '/', label: 'Home', color: '#fff' },
  { icon: Plane, href: '/products', label: 'Products', color: '#fff' },
  { icon: Lightbulb, href: '/solutions', label: 'Solutions', color: '#fff' },
  { icon: Info, href: '/about', label: 'About', color: '#fff' },
  { icon: Phone, href: '/contact-us', label: 'Contact', color: '#fff' },
  { icon: Briefcase, href: '/advisors', label: 'Advisors', color: '#fff' },
];

function MagneticIcon({
  icon: Icon,
  href,
  label,
  color,
}: (typeof navItems)[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const [showLabel, setShowLabel] = useState(false);

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
    setShowLabel(true);
  }
  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    e.currentTarget.style.boxShadow = '';
    setShowLabel(false);
  }

  return (
    <Link href={href} aria-label={label} passHref>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onHoverStart={() => setShowLabel(true)}
        onHoverEnd={() => setShowLabel(false)}
        whileHover={{ scale: 1.3, y: -5, boxShadow: `0 0 18px ${color}` }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ x: localX, y: localY }}
        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 cursor-pointer outline-none relative select-none"
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {/* Glow behind icon */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ filter: 'blur(8px)' }}
          animate={{
            boxShadow: [
              `0 0 8px ${color}`,
              `0 0 18px ${color}`,
              `0 0 8px ${color}`,
            ],
          }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        />
        <Icon
          size={20}
          stroke={color}
          strokeWidth={2}
          className="relative z-10"
        />

        {/* Hover/focus label */}
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={showLabel ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded-md bg-black/60 text-white text-[10px] sm:text-xs leading-none whitespace-nowrap pointer-events-none backdrop-blur-md border border-white/10 shadow-md z-50"
        >
          {label}
        </motion.span>
      </motion.div>
    </Link>
  );
}

export default function ResponsiveIconNavbar() {
  return (
    <motion.div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(100%-1.5rem,36rem)]"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <nav
        className="
          relative flex justify-between gap-1
          px-3 py-2 sm:px-8 sm:py-3 rounded-full
          overflow-visible backdrop-blur-xl bg-white/10 border border-white/20
          shadow-lg shadow-black/50
          before:absolute before:inset-[-3px] before:rounded-full before:border before:border-white/10 before:pointer-events-none
          sm:justify-center
          gap-0.5 sm:gap-9
          "
        aria-label="Primary navigation"
      >
        {/* Clip-only layer (keeps shimmer/glaze inside pill) */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          {/* Light reflection shimmer */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-150%', '150%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {navItems.map((item) => (
          <MagneticIcon key={item.label} {...item} />
        ))}
      </nav>
    </motion.div>
  );
}
