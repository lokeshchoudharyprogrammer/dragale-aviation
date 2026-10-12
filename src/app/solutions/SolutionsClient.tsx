'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const cardData = [
  {
    desc: 'Seamless VTOL Patient Transport',
    details:
      'Our medical-first eVTOL airframe is engineered for vertical takeoff and landing, facilitating rapid emergency access across urban congestion and challenging terrain.',
    img: '/images/aircraft/left_side_view.jpeg',
  },
  {
    desc: 'Hospital-to-Hospital Transfers',
    details:
      'Dedicated point-to-point aerial transfers connecting trauma centers and specialty care facilities with predictable flight corridors.',
    img: '/images/aircraft/front_top_view.jpeg',
  },
  {
    desc: 'Live Patient Monitoring System',
    details:
      'Integrated medical cabin with dedicated power for ventilators, monitors, and telemetry to support uninterrupted care en route.',
    img: '/images/Ayuratha-inside.png',
  },
  {
    desc: 'Critical Heart Patient Support',
    details:
      'Stretcher-first cabin architecture designed to accommodate advanced cardiac support systems and specialized critical care personnel.',
    img: '/images/aircraft/front_view.jpeg',
  },
];

export default function Home() {
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches;

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
      <div className="pt-24 min-h-screen bg-gray-50 text-gray-900">
        <main id="solutions" className="px-4 sm:px-8 lg:px-16 py-12">
          {/* Hero Section */}
          <motion.div className="max-w-6xl mx-auto w-full pb-16 border-b border-gray-200">
            <motion.h1
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              {...(isMobile
                ? { animate: { opacity: 1, y: 0 } }
                : {
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                  })}
              transition={{ duration: isMobile ? 0 : 0.6 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase text-gray-900 leading-none"
            >
              Revolutionizing <br/> <span className="text-gray-400">Air Ambulance</span>
            </motion.h1>
            <motion.p
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              {...(isMobile
                ? { animate: { opacity: 1, y: 0 } }
                : {
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                  })}
              transition={{
                duration: isMobile ? 0 : 0.6,
                delay: isMobile ? 0 : 0.2,
              }}
              className="mt-8 text-xl sm:text-2xl font-light text-gray-600 max-w-3xl leading-relaxed"
            >
              Pioneering India’s first eVTOL air ambulance for rapid, safe, and
              innovative critical care.
            </motion.p>
            <motion.p
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              {...(isMobile
                ? { animate: { opacity: 1, y: 0 } }
                : {
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                  })}
              transition={{
                duration: isMobile ? 0 : 0.6,
                delay: isMobile ? 0 : 0.4,
              }}
              className="mt-6 text-sm sm:text-base text-gray-500 font-medium tracking-wide uppercase max-w-2xl"
              id="hero-desc"
            >
              Speed (200 km/h) • Range (150 km) • Advanced Medical Capabilities
            </motion.p>
          </motion.div>

          {/* Cards List */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 20 }}
            {...(isMobile
              ? { animate: { opacity: 1, y: 0 } }
              : {
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                })}
            transition={{ duration: isMobile ? 0 : 0.6 }}
            className="max-w-6xl mx-auto mt-12 flex flex-col border-t-2 border-gray-900"
          >
            {cardData.map((card, index) => {
              const href = cardHrefMap[card.desc];

              const CardBody = (
                <motion.div
                  variants={cardVariants}
                  initial={isMobile ? false : 'initial'}
                  {...(isMobile
                    ? { animate: 'animate' }
                    : { whileInView: 'animate', viewport: { once: true } })}
                  transition={{
                    duration: isMobile ? 0 : 0.6,
                    delay: isMobile ? 0 : index * 0.1,
                  }}
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-16 group"
                >
                  {/* Description */}
                  <div className="flex-1 md:pr-8">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 group-hover:text-gray-500 transition-colors mb-4">
                      {card.desc}
                    </h2>
                    <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">
                      {card.details}
                    </p>
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-900 border-b border-gray-900 pb-1 group-hover:text-gray-500 group-hover:border-gray-500 transition-colors">
                      Learn More
                    </span>
                  </div>

                  {/* Image Section */}
                  <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shrink-0">
                    <div className="absolute inset-0 bg-gray-900/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <Image
                      src={card.img}
                      alt={`${card.desc} — Dragale Aviation eVTOL air ambulance solution`}
                      fill
                      priority={index === 0}
                      loading={index > 0 ? 'lazy' : undefined}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </motion.div>
              );

              return (
                <div key={index} className="border-b border-gray-200 py-16">
                  {href ? (
                    <Link
                      href={href}
                      aria-label={`Learn more about ${card.desc}`}
                      className="block focus:outline-none"
                    >
                      {CardBody}
                    </Link>
                  ) : (
                    CardBody
                  )}
                </div>
              );
            })}
          </motion.div>
        </main>
      </div>
    </>
  );
}
