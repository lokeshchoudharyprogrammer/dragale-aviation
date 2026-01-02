'use client';

import { CirclePause, Play, Volume, VolumeOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';

const AboutClient = dynamic(() => import('./about/AboutClient'), {
  ssr: false,
});
const AdvisorsClient = dynamic(() => import('./advisors/AdvisorsClient'), {
  ssr: false,
});
const ProductsClient = dynamic(() => import('./products/ProductsClient'), {
  ssr: false,
});
const TeamClient = dynamic(() => import('./team/TeamClient'), { ssr: false });
const ContactClient = dynamic(() => import('./contactus/ContactClient'), {
  ssr: false,
});

export default function Leading() {
  const [mounted, setMounted] = useState(false);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleStopVideo = () => {
    if (ref.current) {
      // @ts-expect-error this crt deont ask me again ok
      ref.current?.pause();

      setIsPlaying(false);
    }
  };

  const handlePlayVideo = () => {
    if (ref.current) {
      // @ts-expect-error this crt deont ask me again ok
      ref.current?.play();

      setIsPlaying(true);
    }
  };

  const handlePlayVoice = () => {
    setIsVoicePlaying(!isVoicePlaying);
    if (ref.current) {
      // @ts-expect-error this crt deont ask me again ok
      ref.current.muted = isVoicePlaying;
      // @ts-expect-error this crt deont ask me again ok
      ref.current?.play();

      setIsPlaying(true);
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false)
  //   }, 5000) // Show model for 4 seconds

  //   return () => clearTimeout(timer)
  // }, [])

  // if (loading) return <LoadingScreen onFinish={() => setLoading(false)} />

  return (
    <div className="pt-13 flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      {/* Main content grows to fill space */}
      <main className="flex-grow overflow-hidden">
        {/* Hero Video Section */}
        <section
          className="relative w-[90%] max-w-7xl m-auto my-12 rounded-3xl overflow-hidden  "
          style={{
            height: '60vh',
            minHeight: '300px',
            border: `1.2px dashed white`,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            ref={ref}
          >
            <source src="/dargale_aviation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {isPlaying ? (
            <button
              onClick={handleStopVideo}
              className="absolute bottom-4 left-4 z-10 bg-black/60 text-white px-4 py-2 text-sm rounded-lg hover:bg-black/80 transition"
            >
              <CirclePause />
            </button>
          ) : (
            <button
              onClick={handlePlayVideo}
              className="absolute bottom-4 left-4 z-10 bg-black/60 text-white px-4 py-2 text-sm rounded-lg hover:bg-black/80 transition"
            >
              <Play />
            </button>
          )}

          <button
            onClick={handlePlayVoice}
            className="absolute bottom-4 left-20 z-10 bg-black/60 text-white px-4 py-2 text-sm rounded-lg hover:bg-black/80 transition"
          >
            {!isVoicePlaying ? <VolumeOff /> : <Volume />}
          </button>
          {/* Blurred Overlay */}
          {/* <div
            className="absolute inset-0"
            style={{
              background: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              // zIndex: 1,
            }}
          ></div> */}
        </section>

        {/* About Company Section */}
        <section className="w-[90%] max-w-4xl mx-auto text-center my-10 px-4">
          <h1 className="font-bold text-3xl md:text-4xl text-3xl sm:text-4xl font-bold text-white mb-4">
            Dragale Aviation
          </h1>
          <p className="font-medium text-gray-300 text-sm sm:text-base leading-relaxed">
            At{' '}
            <span className="font-semibold text-white">Dragale Aviation</span>,
            we’re pioneering emergency medical transport with India’s first{' '}
            <span className="font-semibold text-white">
              eVTOL air ambulance
            </span>
            . Our mission is to deliver rapid, safe, and innovative critical
            care—ensuring patients reach help swiftly when every second counts.
          </p>
        </section>
      </main>

      {/* <section className="w-[90%] max-w-7xl mx-auto my-12 rounded-3xl overflow-hidden" style={{ height: '70vh' }}>
        <AirplaneModel />
      </section> */}
      {/* Sticky Footer */}
      <div className=" bg-gradient-to-br from-gray-900 to-black text-white">
        <ProductsClient />
        <AboutClient />
        <AdvisorsClient />
        <TeamClient />
        <ContactClient />
      </div>
    </div>
  );
}
