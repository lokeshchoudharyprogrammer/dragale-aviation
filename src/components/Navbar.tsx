'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronDown, ArrowRight } from 'lucide-react';

const productsList = [
  {
    id: 'ayudx2',
    name: 'AYUDX2',
    category: 'eVTOL Air Ambulance (Under Development)',
    desc: 'eVTOL air ambulance programme being developed for dedicated patient and medical transport.',
    stats: 'Dedicated Medical Mission Profile',
    image: '/images/aircraft/front_view.jpeg',
    href: '/products?model=ayudx2',
    badge: 'Under Development'
  },
  {
    id: 'drag-v16',
    name: 'DRAG V-16',
    category: 'Fixed-Wing UAV for Medical Logistics',
    desc: 'Fixed-wing unmanned aerial vehicle being developed for hospital, lab & blood logistics.',
    stats: '16 kg Payload • 160 km Range',
    image: '/images/drag-v16/drag-v16-flight.jpeg',
    href: '/products?model=drag-v16',
    badge: 'Medical UAV'
  }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  
  const isHomePage = pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldBeSolid = isScrolled || !isHomePage;

  const handleMouseEnterProducts = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsProductsDropdownOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProductsDropdownOpen(false);
    }, 200);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center transition-all duration-500 ${
        shouldBeSolid 
          ? 'h-[70px] bg-white/85 backdrop-blur-xl border-b border-gray-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)]' 
          : 'h-[100px] bg-transparent border-b border-transparent'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }} 
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div className="flex items-center z-50">
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`relative flex items-center transition-all duration-500 group-hover:scale-105 ${!shouldBeSolid ? 'brightness-0 invert' : ''}`}>
              <Image 
                src="/logo.png" 
                alt="Dragale Aviation" 
                width={40} 
                height={40} 
                className="object-contain"
              />
            </div>
            <span className={`text-xl md:text-2xl font-black tracking-tighter transition-colors duration-500 ${
              shouldBeSolid ? 'text-gray-900' : 'text-white'
            }`}>
              DRAGALE <span className="text-[#00AEEF] font-semibold transition-colors duration-500 group-hover:text-gray-900">AVIATION</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav - Right aligned */}
        <div className="hidden lg:flex items-center space-x-10">
          <nav className="flex items-center space-x-8">
            
            {/* 1. Products Item with Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={handleMouseEnterProducts}
              onMouseLeave={handleMouseLeaveProducts}
            >
              <Link
                href="/products"
                className="relative group flex items-center gap-1.5 py-2"
                onClick={() => setIsProductsDropdownOpen(false)}
              >
                <span 
                  className={`text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
                    shouldBeSolid ? 'text-gray-900 group-hover:text-[#00AEEF]' : 'text-white group-hover:text-gray-300'
                  }`}
                >
                  Products
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isProductsDropdownOpen ? 'rotate-180' : ''} ${shouldBeSolid ? 'text-gray-700' : 'text-white'}`} />
                {/* Animated underline */}
                <span className={`absolute bottom-0 left-0 w-0 h-[2px] rounded-full transition-all duration-300 ease-out group-hover:w-full ${
                  shouldBeSolid ? 'bg-[#00AEEF]' : 'bg-white'
                }`}></span>
              </Link>

              {/* Products Dropdown Menu */}
              <AnimatePresence>
                {isProductsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[580px] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-100 p-6 z-50 text-gray-900"
                  >
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        Aircraft & Aerial Platforms
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#00AEEF]">
                        2 Active Models
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {productsList.map((product) => (
                        <Link
                          key={product.id}
                          href={product.href}
                          onClick={() => setIsProductsDropdownOpen(false)}
                          className="group/item flex items-center gap-4 p-3.5 rounded-2xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-gray-200"
                        >
                          <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200/60 shadow-sm">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover/item:scale-105 transition-transform duration-500"
                            />
                          </div>

                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-base font-black text-gray-900 group-hover/item:text-[#00AEEF] transition-colors">
                                {product.name}
                              </h4>
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                product.id === 'drag-v16'
                                  ? 'bg-[#00AEEF]/15 text-[#00AEEF] border border-[#00AEEF]/30'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {product.badge}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-1 mb-1">
                              {product.desc}
                            </p>
                            <span className="text-[11px] font-mono font-semibold text-gray-700 block">
                              {product.stats}
                            </span>
                          </div>

                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover/item:text-[#00AEEF] group-hover/item:translate-x-1 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-gray-400">Medical-First Aviation Architecture</span>
                      <Link
                        href="/products"
                        onClick={() => setIsProductsDropdownOpen(false)}
                        className="font-bold text-[#00AEEF] hover:underline flex items-center gap-1"
                      >
                        View Full Specifications <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Nav Items */}
            {[
              { href: '/solutions', label: 'Solutions' },
              { href: '/blog', label: 'Blogs' },
              { href: '/about', label: 'About' }
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative group py-2"
              >
                <span 
                  className={`text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
                    shouldBeSolid ? 'text-gray-900 group-hover:text-[#00AEEF]' : 'text-white group-hover:text-gray-300'
                  }`}
                >
                  {item.label}
                </span>
                {/* Animated underline */}
                <span className={`absolute bottom-0 left-0 w-0 h-[2px] rounded-full transition-all duration-300 ease-out group-hover:w-full ${
                  shouldBeSolid ? 'bg-[#00AEEF]' : 'bg-white'
                }`}></span>
              </Link>
            ))}
          </nav>

          <Link
            href="/contact-us"
            className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:scale-95 ${
              shouldBeSolid
                ? 'bg-[#111111] text-white hover:bg-[#00AEEF] hover:shadow-[#00AEEF]/20' 
                : 'bg-white text-black hover:bg-[#00AEEF] hover:text-white hover:shadow-white/20'
            }`}
          >
            Contact
          </Link>
        </div>
        
        {/* Mobile menu Toggle */}
        <div className="lg:hidden flex items-center z-50">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 focus:outline-none transition-transform duration-300 active:scale-90`}
            aria-label="Toggle Navigation Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-[2px] rounded-full transition-all duration-300 ${shouldBeSolid || isMobileMenuOpen ? 'bg-gray-900' : 'bg-white'} ${isMobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
              <span className={`w-full h-[2px] rounded-full transition-all duration-300 ${shouldBeSolid || isMobileMenuOpen ? 'bg-gray-900' : 'bg-white'} ${isMobileMenuOpen ? 'opacity-0 translate-x-2' : ''}`} />
              <span className={`w-full h-[2px] rounded-full transition-all duration-300 ${shouldBeSolid || isMobileMenuOpen ? 'bg-gray-900' : 'bg-white'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
            </div>
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl lg:hidden flex flex-col px-6 py-8 border-t border-gray-100/50 z-40 overflow-hidden"
          >
            <div className="flex flex-col space-y-2">
              
              {/* Products Mobile Accordion */}
              <div className="border-b border-gray-100/50 py-3">
                <button
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="w-full flex items-center justify-between text-lg font-black text-gray-900 uppercase tracking-widest text-left"
                >
                  <span>Products</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${mobileProductsOpen ? 'rotate-180 text-[#00AEEF]' : ''}`} />
                </button>

                <AnimatePresence>
                  {mobileProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pl-2 flex flex-col space-y-3 pt-2"
                    >
                      <Link
                        href="/products?model=ayudx2"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between py-1 text-sm font-bold text-gray-700 hover:text-[#00AEEF]"
                      >
                        <span>AYUDX2 • eVTOL Air Ambulance</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      </Link>
                      <Link
                        href="/products?model=drag-v16"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between py-1 text-sm font-bold text-[#00AEEF]"
                      >
                        <span>DRAG V-16 • Fixed-Wing Medical UAV</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#00AEEF]" />
                      </Link>
                      <Link
                        href="/products"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-xs uppercase tracking-widest font-semibold text-gray-400 pt-1"
                      >
                        View All Products →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {[
                { href: '/solutions', label: 'Solutions' },
                { href: '/blog', label: 'Blogs' },
                { href: '/about', label: 'About' }
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-black text-gray-900 uppercase tracking-widest border-b border-gray-100/50 py-4 hover:text-[#00AEEF] hover:pl-2 transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="pt-6 pb-2"
              >
                <Link
                  href="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center px-8 py-4 bg-[#111111] hover:bg-[#00AEEF] transition-colors duration-300 rounded-full text-white text-sm font-bold tracking-widest uppercase shadow-md active:scale-95"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
