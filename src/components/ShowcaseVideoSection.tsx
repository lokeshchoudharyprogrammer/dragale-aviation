'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function ShowcaseVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="w-full bg-[#050a1f] py-24 md:py-32 px-6 lg:px-12 flex flex-col items-center justify-center border-t border-white/5">
      <div className="max-w-[1400px] w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-[70px] font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Experience the <span className="text-[#00AEEF]">Future</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto">
            See our electric air ambulance platform in motion.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,174,239,0.15)] bg-black border border-white/10 group"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-opacity duration-500"
          >
            <source src="/animated-videos/showcase_video.mp4" type="video/mp4" />
          </video>

          {/* Interactive Overlay & Gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Large Center Play Button when Paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                <Play size={40} className="ml-2" />
              </div>
            </div>
          )}

          {/* Video Controls (Bottom Right) */}
          <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-20 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              className="bg-black/50 hover:bg-[#00AEEF] hover:text-white backdrop-blur-md border border-white/20 text-white p-3 md:p-4 rounded-full transition-all duration-300"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
