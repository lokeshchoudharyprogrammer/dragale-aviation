'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaAmbulance } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';

const cardData = [
  {
    desc: 'Seamless VTOL Patient Transport',
    details:
      'Our eVTOL design enables vertical takeoff and landing, ensuring rapid access to remote or congested areas for seamless patient transport.',
    img: '/images/unnamed.jpg',
  },
  {
    desc: 'Hospital-to-Hospital Transfers',
    details:
      'Efficiently transfer patients between medical facilities with our high-speed eVTOL, reducing transit time for critical care.',
    img: '/images/unnamed.jpg',
  },
  {
    desc: 'Live Patient Monitoring System',
    details:
      'Real-time monitoring systems track vital signs during transport, ensuring medical teams are informed and prepared.',
    img: '/images/unnamed.jpg',
  },
  {
    desc: 'Critical Heart Patient Support',
    details:
      'Specialized equipment and trained staff provide life-saving care for heart patients during air transport.',
    img: '/images/unnamed.jpg',
  },
];

export default function Home() {
  const router = useRouter();

  const cardHrefMap: Record<string, string> = {
    'Seamless VTOL Patient Transport':
      '/solutions/seamless-vtol-patient-transport',
    'Hospital-to-Hospital Transfers':
      '/solutions/hospital-to-hospital-transfers',
    'Live Patient Monitoring System':
      '/solutions/live-patient-monitoring-system',
    'Critical Heart Patient Support':
      '/solutions/critical-heart-patient-support',
  };

  const navigateToHref = (href: string) => {
    router.push(href);
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <>
      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        {/* Breadcrumb Navigation */}

        <main id="solutions" className="px-4 sm:px-8 lg:px-16 py-12">
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.2, 0.3, 0.2] }}
            transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute top-1/3 left-1/3 opacity-10 text-gray-400"
              animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
              transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
            >
              <FaAmbulance size={40} />
            </motion.div>
          </motion.div>

          {/* Hero Section */}
          <motion.div className="text-center max-w-4xl mx-auto relative  p-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            >
              Revolutionizing Air Ambulance Transport
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg sm:text-xl text-gray-200"
            >
              Pioneering India’s first eVTOL air ambulance for rapid, safe, and
              innovative critical care.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 max-w-3xl mx-auto text-sm sm:text-base text-gray-300"
              id="hero-desc"
            >
              Dragale’s eVTOL ambulance delivers unmatched speed (200 km/h),
              range (150 km), and advanced medical capabilities, ensuring
              patients receive life-saving care when every second counts.
            </motion.p>
            <motion.a
              href="/contact-us"
              whileHover={{ scale: 1.05, backgroundColor: '#6B7280' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 inline-flex bg-gray-500 text-white py-3 px-8 rounded-full font-medium text-base shadow-md hover:bg-gray-600 transition duration-300 navbar-glass"
              aria-label="Contact us for eVTOL ambulance inquiries"
              aria-describedby="hero-desc"
            >
              Get in Touch
            </motion.a>
            <motion.div
              className="mt-2 w-full h-15 bg-[url('/evtol-silhouette.png')] bg-center bg-contain bg-no-repeat opacity-30"
              animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.4, 0.3] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto mt-0"
          >
            {cardData.map((card, index) => (
              <Tilt
                key={index}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1000}
                transitionSpeed={300}
                scale={1.02}
              >
                {(() => {
                  const href = cardHrefMap[card.desc];

                  return (
                    <motion.div
                      variants={cardVariants}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative rounded-2xl shadow-xl bg-white/5 backdrop-blur-3xl overflow-hidden border border-white/10 hover:border-gray-400/30 transition-all group cursor-pointer"
                      onClick={() => {
                        if (!href) return;
                        navigateToHref(href);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && href && navigateToHref(href)
                      }
                      aria-label={`Learn more about ${card.desc}`}
                    >
                      {href ? (
                        <Link href={href} className="sr-only" tabIndex={-1}>
                          {card.desc}
                        </Link>
                      ) : null}
                      {/* Image Section */}
                      <div className="relative w-full h-48 overflow-hidden">
                        <motion.div
                          className="absolute inset-0 border border-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{ opacity: [0.2, 0.3, 0.2] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                        <Image
                          src={card.img}
                          alt="Air ambulance aircraft used for emergency medical transport"
                          fill
                          priority={index === 0}
                          loading={index > 0 ? 'lazy' : undefined}
                          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </div>

                      {/* Description */}
                      <div className="bg-white/10 backdrop-blur-md p-4 text-center">
                        <p className="text-sm sm:text-base text-gray-200 font-medium">
                          {card.desc}
                        </p>
                        {href ? (
                          <Link legacyBehavior href={href}>
                            <motion.a
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="mt-2 text-gray-300 text-xs underline"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              aria-label={`View details for ${card.desc}`}
                            >
                              Learn More
                            </motion.a>
                          </Link>
                        ) : null}
                      </div>
                    </motion.div>
                  );
                })()}
              </Tilt>
            ))}
          </motion.div>
        </main>

        {/* <Footer /> */}
      </div>
    </>
  );
}
