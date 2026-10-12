'use client';

import React, { useState, useEffect } from 'react';
import ScrollVideoPinnedSequence from './teamwork-preview/ScrollVideoPinnedSequence';
import MobileCanvasSequence from './MobileCanvasSequence';

interface AdaptiveScrollSequenceProps {
  videoSrc: string;
  sequenceFolder: string;
  frameCount: number;
  posterSrc?: string;
  className?: string;
  children?: React.ReactNode;
  scrollSpeedMultiplier?: number;
  startOffset?: 'start start' | 'start end';
}

export default function AdaptiveScrollSequence({
  videoSrc,
  sequenceFolder,
  frameCount,
  posterSrc,
  className = '',
  children,
  scrollSpeedMultiplier = 100,
  startOffset = 'start end',
}: AdaptiveScrollSequenceProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        ('ontouchstart' in window && window.innerWidth < 1024)
      );
    };
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Before hydration, render CSS-split structure to prevent layout shifts
  if (isMobile === null) {
    return (
      <div className={className}>
        <div className="hidden md:block">
          <ScrollVideoPinnedSequence
            videoSrc={videoSrc}
            posterSrc={posterSrc}
            scrollSpeedMultiplier={scrollSpeedMultiplier}
            startOffset={startOffset}
          >
            {children}
          </ScrollVideoPinnedSequence>
        </div>
        <div className="block md:hidden">
          <MobileCanvasSequence
            sequenceFolder={sequenceFolder}
            frameCount={frameCount}
            scrollSpeedMultiplier={60}
            startOffset={startOffset}
          >
            {children}
          </MobileCanvasSequence>
        </div>
      </div>
    );
  }

  // Mobile Device: Ultra-smooth Interactive Canvas Image Sequence
  if (isMobile) {
    return (
      <MobileCanvasSequence
        sequenceFolder={sequenceFolder}
        frameCount={frameCount}
        className={className}
        scrollSpeedMultiplier={60}
        startOffset={startOffset}
      >
        {children}
      </MobileCanvasSequence>
    );
  }

  // Desktop Device: Pristine Original Video Scroll Sequence
  return (
    <ScrollVideoPinnedSequence
      videoSrc={videoSrc}
      posterSrc={posterSrc}
      className={className}
      scrollSpeedMultiplier={scrollSpeedMultiplier}
      startOffset={startOffset}
    >
      {children}
    </ScrollVideoPinnedSequence>
  );
}
