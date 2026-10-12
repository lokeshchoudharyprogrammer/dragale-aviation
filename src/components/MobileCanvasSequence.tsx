'use client';

import React, { useRef, useEffect, useState, useCallback, createContext, useContext } from 'react';
import { useScroll, useSpring, useMotionValueEvent, MotionValue } from 'framer-motion';

export const MobileScrollProgressContext = createContext<MotionValue<number> | null>(null);

export function useMobileScrollProgress(): MotionValue<number> | null {
  return useContext(MobileScrollProgressContext);
}

interface MobileCanvasSequenceProps {
  sequenceFolder: string; // e.g. "/sequences/sky-arrival"
  frameCount: number;     // e.g. 67
  framePrefix?: string;   // e.g. "frame_"
  frameExtension?: string;// e.g. "webp"
  className?: string;
  children?: React.ReactNode;
  scrollSpeedMultiplier?: number;
  startOffset?: 'start start' | 'start end';
}

export default function MobileCanvasSequence({
  sequenceFolder,
  frameCount,
  framePrefix = 'frame_',
  frameExtension = 'webp',
  className = '',
  children,
  scrollSpeedMultiplier = 60, // 60vh per second (natural thumb distance on phone)
  startOffset = 'start end',
}: MobileCanvasSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isLoadedRef = useRef<boolean[]>([]);
  const activeFrameIndexRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [isReady, setIsReady] = useState(false);

  // 1. Framer Motion Scroll & Inertia Spring
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [startOffset, 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 35,
    stiffness: 250,
    mass: 0.2,
    restDelta: 0.001,
  });

  // Draw a specific frame index with object-fit: cover onto the canvas
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use the requested frame if loaded, otherwise fall back to the nearest loaded frame
    let img = imagesRef.current[index];
    if (!img || !isLoadedRef.current[index]) {
      // Find closest loaded frame
      for (let offset = 1; offset < frameCount; offset++) {
        if (index - offset >= 0 && isLoadedRef.current[index - offset]) {
          img = imagesRef.current[index - offset];
          break;
        }
        if (index + offset < frameCount && isLoadedRef.current[index + offset]) {
          img = imagesRef.current[index + offset];
          break;
        }
      }
    }

    if (!img) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    if (!imgWidth || !imgHeight) return;

    // object-fit: cover math
    const hRatio = canvasWidth / imgWidth;
    const vRatio = canvasHeight / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const destWidth = imgWidth * ratio;
    const destHeight = imgHeight * ratio;
    const destX = (canvasWidth - destWidth) / 2;
    const destY = (canvasHeight - destHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight, destX, destY, destWidth, destHeight);
    activeFrameIndexRef.current = index;
  }, [frameCount]);

  // Request frame draw via requestAnimationFrame for 60/120fps ProMotion
  const requestDraw = useCallback((index: number) => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      renderFrame(index);
    });
  }, [renderFrame]);

  // 2. Preload WebP Image Sequence
  useEffect(() => {
    imagesRef.current = [];
    isLoadedRef.current = new Array(frameCount).fill(false);

    // Format number to 3 digits (e.g. 1 -> "001")
    const getFrameUrl = (idx: number) => {
      const numStr = String(idx + 1).padStart(3, '0');
      return `${sequenceFolder}/${framePrefix}${numStr}.${frameExtension}`;
    };

    // Priority 1: Load the first 3 frames immediately so canvas renders without delay
    for (let i = 0; i < Math.min(3, frameCount); i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        isLoadedRef.current[i] = true;
        if (i === 0) {
          setIsReady(true);
          requestDraw(0);
        }
      };
      imagesRef.current[i] = img;
    }

    // Priority 2: Progressively load remaining frames
    for (let i = 3; i < frameCount; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        isLoadedRef.current[i] = true;
        // If current scroll frame just loaded, update it
        if (activeFrameIndexRef.current === i) {
          requestDraw(i);
        }
      };
      imagesRef.current[i] = img;
    }

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [sequenceFolder, frameCount, framePrefix, frameExtension, requestDraw]);

  // 3. Handle Canvas Resize with Device Pixel Ratio for crisp retina displays
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      requestDraw(activeFrameIndexRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [requestDraw]);

  // 4. Listen to scroll progress and update frame index in real-time
  useMotionValueEvent(smoothProgress, 'change', (progress: number) => {
    const rawIndex = Math.floor(progress * frameCount);
    const frameIndex = Math.min(frameCount - 1, Math.max(0, rawIndex));
    if (frameIndex !== activeFrameIndexRef.current) {
      requestDraw(frameIndex);
    }
  });

  return (
    <MobileScrollProgressContext.Provider value={smoothProgress}>
      <div
        ref={containerRef}
        style={{ height: `${Math.max(160, Math.round((frameCount / 18) * scrollSpeedMultiplier))}vh` }}
        className={`relative w-full bg-black ${className}`}
      >
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-500 ${
              isReady ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ width: '100%', height: '100%' }}
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
    </MobileScrollProgressContext.Provider>
  );
}
