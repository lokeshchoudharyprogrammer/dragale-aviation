'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

interface ScrollScrubVideoProps {
  src: string;
  className?: string;
  poster?: string;
  badgeText?: string;
}

export default function ScrollScrubVideo({
  src,
  className = '',
  poster,
  badgeText = 'Scroll to Reveal'
}: ScrollScrubVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  // Mutable refs for zero-overhead animation scrubbing
  const isSeekingRef = useRef<boolean>(false);
  const targetTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(0);
  const isIntersectingRef = useRef<boolean>(true);

  // Detect Mobile / Touch devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 1024 ||
        ('ontouchstart' in window && window.innerWidth < 1024)
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll Progress linked to container position in viewport
  // Starts when card enters 85% of screen, completes when card reaches 25% of screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 25%']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 180,
    mass: 0.2,
    restDelta: 0.001
  });

  // Non-blocking Seek Gate
  const requestSeek = useCallback(() => {
    const video = desktopVideoRef.current;
    if (!video || !isIntersectingRef.current || durationRef.current <= 0) return;

    if (!video.seeking && !isSeekingRef.current) {
      const targetTime = targetTimeRef.current;
      if (Math.abs(video.currentTime - targetTime) > 0.03) {
        isSeekingRef.current = true;
        video.currentTime = targetTime;
      }
    }
  }, []);

  // Update target scrub time on progress change
  useMotionValueEvent(smoothProgress, 'change', (progress: number) => {
    if (durationRef.current > 0) {
      const clamped = Math.max(0, Math.min(1, progress));
      targetTimeRef.current = Math.min(
        clamped * durationRef.current,
        Math.max(0, durationRef.current - 0.02)
      );
      requestSeek();
    }
  });

  // Metadata loaded handler
  const handleLoadedMetadata = () => {
    const video = desktopVideoRef.current;
    if (!video) return;
    durationRef.current = video.duration;
    video.pause();
    if (video.currentTime === 0) {
      video.currentTime = 0.001; // Prime initial frame
    }
    requestSeek();
  };

  const handleSeeked = () => {
    isSeekingRef.current = false;
    const video = desktopVideoRef.current;
    if (!video) return;

    // Catch up if scroll position shifted while frame was decoding
    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  };

  // Intersection Observer to prevent seek execution when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          requestSeek();
        }
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [requestSeek]);

  // Ensure metadata is read even if cached
  useEffect(() => {
    const video = desktopVideoRef.current;
    if (video && video.readyState >= 1 && durationRef.current === 0) {
      durationRef.current = video.duration;
      video.pause();
      if (video.currentTime === 0) {
        video.currentTime = 0.001;
      }
      requestSeek();
    }
  }, [requestSeek]);

  // Mobile Render: Standard auto-playing looping video
  if (isMobile === true) {
    return (
      <div ref={containerRef} className={`relative w-full h-full ${className}`}>
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  // Desktop Render: Scrubbed by scroll
  if (isMobile === false) {
    return (
      <div ref={containerRef} className={`relative w-full h-full ${className}`}>
        <video
          ref={desktopVideoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onSeeked={handleSeeked}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {badgeText && (
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest uppercase text-white/90 flex items-center gap-1.5 pointer-events-none shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] animate-pulse" />
            <span>{badgeText}</span>
          </div>
        )}
      </div>
    );
  }

  // SSR / Pre-Hydration fallback: CSS split rendering to avoid layout shifts
  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {/* Mobile visible */}
      <div className="block lg:hidden w-full h-full">
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {/* Desktop visible */}
      <div className="hidden lg:block w-full h-full">
        <video
          ref={desktopVideoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onSeeked={handleSeeked}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {badgeText && (
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest uppercase text-white/90 flex items-center gap-1.5 pointer-events-none shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] animate-pulse" />
            <span>{badgeText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
