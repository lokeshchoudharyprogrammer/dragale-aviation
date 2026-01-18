'use client';

import { CirclePause, Play, Volume, VolumeOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

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
const ContactClient = dynamic(() => import('./contact-us/ContactClient'), {
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
        <section className="relative w-[90%] max-w-7xl m-auto my-12 rounded-3xl overflow-hidden md:h-[60vh] h-[30vh]   min-h-[300px] border border-white/20">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/founders/newlogo.png"
            className="absolute inset-0 w-full h-full md:object-cover object-contain object-top"
            ref={ref}
            aria-label="Dragale Aviation promotional video"
          >
            <source src="/dargale_aviation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {isPlaying ? (
            <button
              onClick={handleStopVideo}
              type="button"
              aria-label="Pause hero video"
              title="Pause hero video"
              className="absolute bottom-4 left-4 z-10 bg-black/60 text-white px-4 py-2 text-sm rounded-lg hover:bg-black/80 transition"
            >
              <CirclePause />
            </button>
          ) : (
            <button
              onClick={handlePlayVideo}
              type="button"
              aria-label="Play hero video"
              title="Play hero video"
              className="absolute bottom-4 left-4 z-10 bg-black/60 text-white px-4 py-2 text-sm rounded-lg hover:bg-black/80 transition"
            >
              <Play />
            </button>
          )}

          <button
            onClick={handlePlayVoice}
            type="button"
            aria-label={
              isVoicePlaying ? 'Unmute hero video' : 'Mute hero video'
            }
            title={isVoicePlaying ? 'Unmute hero video' : 'Mute hero video'}
            className="absolute bottom-4 left-20 z-10 bg-black/60 text-white px-4 py-2 text-sm rounded-lg hover:bg-black/80 transition"
          >
            {!isVoicePlaying ? <VolumeOff /> : <Volume />}
          </button>
         
        </section>

        {/* About Company Section */}
        <section className="w-[90%] max-w-4xl mx-auto text-center mt-10 mb-4 px-4">
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
            care—ensuring patients reach help swiftly when every second counts.{' '}
            <br></br>
            <Link
              href="/solutions"
              className="text-gray-300/90 underline underline-offset-4 hover:text-white transition"
            >
              Explore our aviation solutions
            </Link>
            .
          </p>
        </section>
      </main>

      {/* <section className="w-[90%] max-w-7xl mx-auto my-12 rounded-3xl overflow-hidden" style={{ height: '70vh' }}>
        <AirplaneModel />
      </section> */}
      {/* Sticky Footer */}
      <div className="bg-gradient-to-br from-gray-900 to-black text-white space-y-10 sm:space-y-0">
        <ProductsClient headingLevel={2} />
        <AboutClient headingLevel={2} />
        <AdvisorsClient headingLevel={2} />
        <TeamClient headingLevel={2} />
        <ContactClient headingLevel={2} />
      </div>
    </div>
  );
}
