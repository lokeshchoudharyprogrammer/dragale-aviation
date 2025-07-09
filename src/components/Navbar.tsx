"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Plane, Info, Phone, ChevronDown } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  {
    name: "Product",
    icon: Plane,
    href: "/products",
    // subItems: [
    //   { name: "AyuRatha (DX1)", href: "/products" },
    //   { name: "Future Models", href: "#" },
    // ],
  },
  { name: "About", icon: Info, href: "/about" },
  { name: "Contact Us", icon: Phone, href: "/contactus" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Scroll handling
  useEffect(() => {
    const updateScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Close mobile menu on swipe right
  useEffect(() => {
    if (!isOpen) return;

    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchX = e.touches[0].clientX;
      if (touchX - touchStartX > 100) {
        setIsOpen(false);
        setExpandedSubMenu(null);
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isOpen || !navRef.current) return;

    const focusableElements = navRef.current.querySelectorAll(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

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
        setIsOpen(false);
        setExpandedSubMenu(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    firstElement?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    show: { x: 0, transition: { duration: 0.3 } },
    exit: { x: "100%", transition: { duration: 0.3 } },
  };

  const subMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    show: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.3 } },
  };

  const handleNavClick = () => {
    if (navigator.vibrate) navigator.vibrate(50);
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-gray-500 focus:text-white">
        Skip to content
      </a>
      <nav
        ref={navRef}
        className={clsx(
          "fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8 py-3 transition-all duration-300 border-1 border-b-gray-500 bg-transparent",
          scrolled ? "bg-transparent" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-white font-semibold text-lg"
          >
            <Link href="/" aria-label="Dragale Aviation Home" className="flex items-center gap-2">
              <Image
                src="/dgw.png"
                alt="Dragale Aviation Logo"
                width={40}
                height={40}
                priority
                className="object-contain"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = "/dragale-logo.png";
                }}
              />
              <span className="hidden sm:inline">Dragale Aviation</span>
            </Link>
          </motion.div>


          {/* Desktop Nav */}
          <motion.ul
            className="hidden md:flex items-center space-x-6"
            variants={navVariants}
            initial="hidden"
            animate="show"
          >
            {/*@ts-ignore */}
            {navItems.map(({ name, icon: Icon, href, subItems }) => (
              <motion.li
                key={name}
                variants={itemVariants}
                className="relative"
                onMouseEnter={() => subItems && setHoveredItem(name)}
                onMouseLeave={() => subItems && setHoveredItem(null)}
              >
                <Link
                  href={href}
                  className="flex items-center space-x-1 text-gray-200 hover:text-gray-400 transition"
                  aria-label={name}
                >
                  <Icon size={18} />
                  <span>{name}</span>
                </Link>
                {subItems && hoveredItem === name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 bg-white/10 backdrop-blur-lg rounded-md shadow-lg p-2"
                  >
                    {/*@ts-ignore */}
                    {subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-200 hover:bg-white/20 rounded transition"
                        onClick={() => setHoveredItem(null)}
                        aria-label={subItem.name}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </motion.li>
            ))}

          </motion.ul>

          {/* Mobile Toggle */}
          <motion.div className="md:hidden">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                if (!isOpen) setExpandedSubMenu(null);
              }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="text-gray-200 hover:text-gray-400 transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-0 left-0 w-full h-screen bg-white/10 backdrop-blur-lg md:hidden z-40"
            >
              <motion.ul className="flex flex-col items-center space-y-4 py-16">
                {/*@ts-ignore */}
                {navItems.map(({ name, icon: Icon, href, subItems }) => (
                  <motion.li
                    key={name}
                    variants={itemVariants}
                    className="w-full text-center"
                    onClick={handleNavClick}
                  >
                    <div
                      className={clsx(
                        "flex items-center justify-center space-x-2 text-gray-200 text-lg p-4",
                        subItems && "cursor-pointer"
                      )}
                      onClick={() => {
                        if (subItems) {
                          setExpandedSubMenu(expandedSubMenu === name ? null : name);
                        } else {
                          setIsOpen(false);
                          setExpandedSubMenu(null);
                        }
                      }}
                      role={subItems ? "button" : undefined}
                      aria-expanded={subItems ? expandedSubMenu === name : undefined}
                    >
                      <Icon size={20} />
                      <Link href={href} aria-label={name} className="flex-1">
                        {name}
                      </Link>
                      {subItems && (
                        <ChevronDown
                          size={20}
                          className={clsx(expandedSubMenu === name && "rotate-180")}
                        />
                      )}
                    </div>
                    {subItems && expandedSubMenu === name && (
                      <motion.div
                        variants={subMenuVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="px-4"
                      >
                        {/*@ts-ignore */}
                        {subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block py-2 text-gray-300 hover:text-gray-400 transition"
                            onClick={() => {
                              setIsOpen(false);
                              setExpandedSubMenu(null);
                            }}
                            aria-label={subItem.name}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </motion.li>
                ))}

              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx>{`
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
          }
        `}</style>
      </nav>
    </>
  );
}