'use client';

import React, { useRef, useEffect, useCallback, createContext, useContext, useState } from 'react';
import { useScroll, useSpring, useMotionValueEvent, MotionValue } from 'framer-motion';

export const ScrollProgressContext = createContext<MotionValue<number> | null>(null);

export function useScrollProgress(): MotionValue<number> | null {
  return useContext(ScrollProgressContext);
}

interface ScrollVideoPinnedSequenceProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  children?: React.ReactNode;
  scrollSpeedMultiplier?: number; // vh per second of video
  startOffset?: 'start start' | 'start end';
}

export default function ScrollVideoPinnedSequence({
  videoSrc,
  posterSrc = '/images/preview-poster.jpg',
  className = '',
  children,
  scrollSpeedMultiplier = 100, // 100vh per second by default
  startOffset = 'start end',
}: ScrollVideoPinnedSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [containerHeight, setContainerHeight] = useState('400vh'); // fallback

  // Mutable state refs (Zero React re-renders during high-frequency scroll)
  const isSeekingRef = useRef<boolean>(false);
  const targetTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(0);
  const isIntersectingRef = useRef<boolean>(true);

  // 1. Framer Motion Scroll & Inertia Spring
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // By default, start progress when container TOP hits viewport BOTTOM (start end).
    // This makes the video start moving as it slides up into view.
    offset: [startOffset, 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 200,
    mass: 0.5,
    restDelta: 0.0001,
  });

  // 2. Seeking Gate Engine
  const requestSeek = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isIntersectingRef.current || durationRef.current <= 0) return;

    // Gate: only set currentTime if decoder is not currently seeking
    if (!video.seeking && !isSeekingRef.current) {
      const targetTime = targetTimeRef.current;
      if (Math.abs(video.currentTime - targetTime) > 0.03) {
        isSeekingRef.current = true;
        video.currentTime = targetTime;
      }
    }
  }, []);

  // 3. Listen to smoothProgress without component re-renders
  useMotionValueEvent(smoothProgress, 'change', (latestProgress: number) => {
    if (durationRef.current > 0) {
      // Map the full scroll distance to the video's full duration.
      targetTimeRef.current = Math.min(
        Math.max(0, latestProgress * durationRef.current),
        Math.max(0, durationRef.current - 0.01)
      );
      requestSeek();
    }
  });

  // 4. Video Event Handlers & First-Frame Priming
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    durationRef.current = video.duration;
    
    // Dynamically adjust scroll container height based on video length
    const calculatedHeight = Math.max(150, Math.round(video.duration * scrollSpeedMultiplier));
    setContainerHeight(`${calculatedHeight}vh`);

    // Prime the first frame on iOS / Safari to prevent black rectangle
    if (video.currentTime === 0) {
      video.currentTime = 0.001;
    }
    requestSeek();
  };

  const handleSeeked = () => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (!video) return;

    // If target moved during in-flight seek, immediately service latest position
    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.warn('Video failed to load or encountered playback error:', e);
  };

  // 5. IntersectionObserver Lifecycle Guard
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
      { rootMargin: '200px 0px 200px 0px', threshold: 0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [requestSeek]);

  return (
    <ScrollProgressContext.Provider value={smoothProgress}>
      <div
        ref={containerRef}
        style={{ height: containerHeight }}
        className={`relative w-full bg-black ${className}`}
      >
        {/* Sticky Viewport Container: natural release on container exit */}
        <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            preload="metadata"
            muted={true}
            playsInline={true}
            disablePictureInPicture={true}
            disableRemotePlayback={true}
            aria-hidden="true"
            onLoadedMetadata={handleLoadedMetadata}
            onSeeked={handleSeeked}
            onError={handleError}
            className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          />

          {/* Ambient Vignette & Telemetry Backdrop Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/70 pointer-events-none" />

          {/* Overlay Content / Telemetry Passing Through */}
          <div className="relative z-10 h-full w-full pointer-events-none">
            {children}
          </div>
        </div>
      </div>
    </ScrollProgressContext.Provider>
  );
}
