# Technical Architecture Survey: Scroll-Synchronized Video Scrubbing

**Agent**: `explorer_survey_3`  
**Working Directory**: `/Users/lokeshchoudhary/lokesh/dragale-aviation/.agents/teamwork/explorer_survey_3/`  
**Target Milestone**: Technical Architecture & Survey for `/teamwork-preview` Scroll-Synchronized Aviation Experience  
**Date**: 2026-10-10  

---

## 1. Observation

### 1.1 Existing Dependencies and Environment
Inspected `/Users/lokeshchoudhary/lokesh/dragale-aviation/package.json`:
```json
"dependencies": {
  "@react-three/drei": "^10.6.1",
  "@react-three/fiber": "^9.3.0",
  "clsx": "^2.1.1",
  "framer-motion": "^12.9.4",
  "lucide-react": "^0.506.0",
  "next": "^16.1.1",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwindcss": "^4"
}
```
Verified via Node.js runtime inspection:
`framer-motion` v12.9.4 exports:
- `useScroll`: true
- `useSpring`: true
- `useTransform`: true
- `useMotionValueEvent`: true

### 1.2 Local Video Files Inventory & ffprobe Stream Inspection
Scanned repository video assets:
- **Root Directory `videos/`**:
  - `videos/ayu_dx2_intro_video.mp4` (1.7 MB, 1080p, 24 fps, duration: 5.226s, 125 frames)
  - `videos/modal_is_coming_from_sky.mp4` (2.3 MB, 1080p, 24 fps, duration: 12.544s, 301 frames)
  - `videos/helipad_leading_video.mp4` (4.9 MB, 1080p, 24 fps, duration: 10.837s, 260 frames)
  - `videos/hlipad_leading_video_2.mp4` (5.4 MB)
  - `videos/sky_view_video.mp4` (1.7 MB, 1080p, 24 fps, duration: 8.554s, 205 frames)
  - `videos/sky_view_video_with_front_view_of_the_video.mp4` (3.8 MB)
  - `videos/sky_view_video_with_back_view_of_the_video.mp4` (4.0 MB)
  - `videos/sky_view_video_with_top_view_of_the_video.mp4` (4.6 MB)
  - `videos/ground_view_video_with_360_view_of_the_video.mp4` (9.7 MB, 1080p, 24 fps, duration: 21.888s, 525 frames)
  - `videos/hero_section_video.mp4` (29 MB, duration: 85.93s)
- **Public Directory `public/`**:
  - `public/showcase_video.mp4` (9.7 MB, 1080p, 24 fps, duration: 21.888s)
  - `public/dargale_aviation.mp4` (25 MB)
  - `public/Nighttime_aerial.mp4` (11 MB)
  - `public/video.mp4` (1.9 MB, 768x432, 25 fps, duration: 10.04s)

**Keyframe Interval Analysis (`ffprobe -show_frames pict_type`):**
- `videos/ayu_dx2_intro_video.mp4`: I-frames at `0.000s`, `0.750s`, `1.500s`, `2.250s`, `2.750s` (~18 frames / 0.75s GOP).
- `videos/modal_is_coming_from_sky.mp4`: I-frames at `0.000s`, `0.375s`, `0.541s`, `0.666s`, `0.750s` (~9–18 frames / 0.375s GOP).
- `videos/helipad_leading_video.mp4`: I-frames every ~0.75s.
- `videos/sky_view_video.mp4`: I-frames every ~0.75s.

*Critical Asset Placement Finding*: The videos in `/videos/` reside outside `public/`. Next.js static file serving serves strictly from `public/`. To be accessible in browser `<video src="...">`, assets must be moved or symlinked into `public/videos/` (or served via an API route).

### 1.3 Existing Project Scroll Implementations
Observed `/Users/lokeshchoudhary/lokesh/dragale-aviation/src/components/ScrollAirplaneScene.tsx` (lines 141–158):
```tsx
const onScroll = () => {
  const el = sectionRef.current;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const raw = (vh - rect.top) / (el.offsetHeight + vh);
  setScrollProgress(Math.max(0, Math.min(1, raw)));
};
window.addEventListener('scroll', onScroll, { passive: true });
```
Observed issue: `setScrollProgress` updates React state on every native scroll event. For 3D WebGL or `<video>` scrubbing, firing React state updates on every scroll tick causes continuous React re-render thrashing and high main-thread latency.

### 1.4 Existing Aircraft Specifications
Observed `/Users/lokeshchoudhary/lokesh/dragale-aviation/src/app/products/ProductsClient.tsx` (lines 38–137):
- **Model**: AyuRatha (DX1) / Ayu DX2
- **Cruising Speed**: 250 km/h
- **Max Range**: 150 km
- **Flight Time**: 45–60 minutes
- **MTOW**: 1900 kg | **Payload**: 350 kg
- **Climb Rate**: 5 m/s | **Service Ceiling**: 1,000 m (3,280 ft)
- **Dimensions**: Length 13m, Height 3m, Wingspan 14m
- **Cabin**: 1 Pilot, 1 Patient (Stretcher), 1 Doctor, 1 Paramedic, 1 Family Member
- **Flight Profile**: Smooth transition from vertical lift to forward cruise

---

## 2. Logic Chain

### 2.1 The Browser Video Seeking Bottleneck & The "Seeking Gate" Pattern
1. **The Root Cause of Stuttering**:
   - Setting `video.currentTime = T` instructs the browser media decoder to seek to timestamp `T`.
   - The browser marks `video.seeking = true`.
   - In H.264 video, decoding requires jumping back to the nearest prior Intra-frame (I-frame) and decoding successive P/B-frames forward.
   - If JavaScript sets `video.currentTime` on every scroll event or RAF tick (which fires at 60Hz–120Hz) while `video.seeking` is already `true`, the browser's media pipeline cancels previous seeks, queues decoder tasks, or thrashes the hardware decoder buffers.
   - In WebKit (Safari / iOS) and Chromium (Chrome/Edge), this manifests as frame freezes, choppy playback, white/black flashing, or total video stalls.
2. **Why `fastSeek()` is Not the Solution**:
   - `video.fastSeek()` jumps to the nearest keyframe rather than the exact target frame.
   - With 0.75s keyframe spacing, `fastSeek` produces coarse, jerky 18-frame leaps.
   - Furthermore, `fastSeek` is not universally supported across all browsers.
3. **The Solution: The "Seeking Gate" State Machine**:
   - Store the latest scroll-derived target time in a mutable ref (`targetTimeRef`).
   - Maintain a boolean flag `isSeekingRef`.
   - When a scroll event occurs:
     - Update `targetTimeRef.current = targetTime`.
     - If `!video.seeking && !isSeekingRef.current`, initiate seek:
       `isSeekingRef.current = true; video.currentTime = targetTime;`
   - Attach an event listener for `'seeked'` on `<video>`:
     - On `'seeked'`, set `isSeekingRef.current = false`.
     - Check if `Math.abs(video.currentTime - targetTimeRef.current) > 0.033` (more than ~1 frame difference).
     - If there is a lag, immediately dispatch the next seek:
       `isSeekingRef.current = true; video.currentTime = targetTimeRef.current;`
   - *Result*: At any instant, at most ONE seek is queued in the browser engine. As soon as the decoder completes that frame, it jumps directly to the latest scroll position without queuing intermediary discarded frames.

### 2.2 Pinned / Sticky Container Layout & Scroll Progression
1. **Container Geometry**:
   - Outer container: `<div ref={containerRef} className="relative h-[400vh]">`
   - Inner sticky frame: `<div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden">`
   - Using `h-[100dvh]` prevents mobile toolbar resizing glitches (where dynamic address bars cause 100vh jumping).
2. **Scroll Budget & Pacing**:
   - If container height is `400vh` and viewport is `100vh`, total scroll distance is `300vh` (e.g., ~2400px–3600px).
   - For an 8–10 second video, this provides ~300px per second of video playback.
   - This ratio provides tactile, controllable scrubbing without rushing or dragging.
3. **Natural Exit / Release**:
   - With CSS `position: sticky`, when the scroll passes the bottom edge of `containerRef`, the sticky container unpins and scrolls out of view naturally into the subsequent section with zero JavaScript layout recalculations.

### 2.3 Frame Rate, RAF vs. Framer Motion `useSpring`
1. **Direct scroll mapping** creates stepped judder during rapid wheel flicks.
2. **Manual RAF loop** requires custom lerp math and active loop cancellation management to prevent CPU drain when idle.
3. **Framer Motion `useSpring` Integration**:
   - `useScroll({ target: containerRef, offset: ["start start", "end end"] })` yields `scrollYProgress` (0 to 1).
   - `useSpring(scrollYProgress, { damping: 30, stiffness: 200, mass: 0.5 })` creates an inertia-smoothed spring curve.
   - When the user scrolls fast and stops, `useSpring` decelerates with physical inertia rather than halting abruptly.
   - Using `useMotionValueEvent(smoothProgress, "change", (latest) => ...)`:
     - Bypasses React state (`useState`), causing ZERO component re-renders.
     - Feeds the smoothed value directly into `targetTimeRef` and triggers the Seeking Gate.

### 2.4 HTML5 Video Attributes & Preloading Lifecycle
1. **Attributes Required**:
   - `preload="metadata"`: Fetches MOOV header and duration without buffering entire 10MB–30MB payload upfront.
   - `muted`: Required by browser autoplay & media execution policies.
   - `playsInline`: Mandatory for iOS Safari to prevent forced fullscreen QuickTime overlay.
   - `disablePictureInPicture`: Prevents OS picture-in-picture floaters.
   - `disableRemotePlayback`: Prevents AirPlay prompt hijacking.
   - `aria-hidden="true"`: Designates video as visual presentation.
2. **Metadata & First-Frame Initialization**:
   - On `onLoadedMetadata`:
     - Capture `video.duration`.
     - In WebKit (iOS/macOS Safari), `<video>` often shows a blank/black rectangle until first playback or seek.
     - Setting `video.currentTime = 0.001` immediately upon `loadedmetadata` primes the decoder and renders frame 0 to the canvas/compositor.

### 2.5 IntersectionObserver & Resource Conservation
1. **Lifecycle Management**:
   - Video scrubbing and spring tracking must only execute when the component is within or near the viewport.
   - An `IntersectionObserver` on `containerRef` with `rootMargin: "200px 0px"`:
     - Sets an `isInView` ref.
     - When `false`, suppresses seek requests and pauses any media activity.
     - Automatically cleans up via `observer.disconnect()` on unmount.

### 2.6 Mobile & Browser Specific Caveats
1. **iOS Low Power Mode**:
   - Throttles hardware video decoding. The Seeking Gate ensures no dropped seek loops occur even when decode time increases from 16ms to 50ms.
2. **Keyframe (GOP) Interval**:
   - Videos with GOP <= 24 frames (~0.75s) seek smoothly.
   - Our ffprobe inspection confirmed that the project's videos (`ayu_dx2_intro_video.mp4`, `modal_is_coming_from_sky.mp4`) have keyframes every 9–18 frames, making them well-suited for scrubbing.
3. **Audio Tracks**:
   - Videos with embedded audio tracks incur audio decoder overhead. For pure scrubbing, audio should be muted via the HTML attribute.

---

## 3. Caveats

1. **Asset Directory Location**:
   - The video files in `/videos/` cannot be served by Next.js until placed in `/public/videos/`. A task must copy or move them before route rendering.
2. **Bandwidth on Low-Tier Mobile**:
   - The 1080p video files range between 2 MB and 10 MB. On slow 3G mobile connections, seeking into unbuffered byte ranges may experience brief network pauses until the range request resolves. Providing an explicit poster image ensures visual stability during initial load.
3. **No Project Source Modification**:
   - Per read-only explorer constraints, no files in `src/` were modified. The implementation architecture and code recipe are fully documented below for the implementer agent.

---

## 4. Conclusion & Recommended Architecture

### 4.1 Optimal Architecture Summary
The recommended architecture combines **CSS sticky positioning**, **Framer Motion v12 primitives**, and the **Seeking Gate state machine**:
1. **Container**: `h-[400vh]` parent with `sticky top-0 h-[100dvh]` child.
2. **Scroll Tracker**: Framer Motion `useScroll({ target: containerRef })` + `useSpring(scrollYProgress, { damping: 30, stiffness: 200, mass: 0.5 })`.
3. **Zero Re-renders**: Subscription via `useMotionValueEvent` and `useTransform` without React `useState` re-render triggers.
4. **Seeking Engine**: Dedicated Seeking Gate on `<video>` listening to `seeked` events to prevent decode queue congestion.
5. **Preload & Priming**: `preload="metadata"`, `muted`, `playsInline`, initializing `currentTime = 0.001` on `loadedmetadata`.
6. **Efficiency**: `IntersectionObserver` gating to disable processing when out of viewport.

### 4.2 Production-Ready Component Blueprint

Here is the recommended implementation blueprint for `ScrollVideoScrubber.tsx`:

```tsx
'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

interface ScrollVideoScrubberProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ScrollVideoScrubber({
  videoSrc,
  posterSrc,
  className = '',
  children,
}: ScrollVideoScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Mutable state refs (avoid React re-renders during high-frequency scroll)
  const isSeekingRef = useRef<boolean>(false);
  const targetTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(0);
  const isIntersectingRef = useRef<boolean>(false);

  // 1. Framer Motion Scroll & Inertia Spring
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
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
  useMotionValueEvent(smoothProgress, 'change', (latestProgress) => {
    if (durationRef.current > 0) {
      targetTimeRef.current = Math.min(
        Math.max(0, latestProgress * durationRef.current),
        durationRef.current - 0.01
      );
      requestSeek();
    }
  });

  // 4. Video Event Handlers & First-Frame Priming
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    durationRef.current = video.duration;
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

    // If scroll advanced while seeking was in flight, immediately service latest position
    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
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
    return () => observer.disconnect();
  }, [requestSeek]);

  return (
    <div
      ref={containerRef}
      className={`relative h-[400vh] w-full bg-black ${className}`}
    >
      {/* Sticky Viewport Container: natural release on container exit */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          preload="metadata"
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          onLoadedMetadata={handleLoadedMetadata}
          onSeeked={handleSeeked}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />

        {/* Ambient Dark Gradient for Spec Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

        {/* Overlay Content / Specifications passing through */}
        <div className="relative z-10 h-full w-full pointer-events-none">
          {children}
        </div>
      </div>
    </div>
  );
}
```

### 4.3 Specification Storytelling Journey Structure
The `/teamwork-preview` page can structure the journey as:
1. **Hero Section (0–100vh)**:
   - Aircraft model introduction: **AyuRatha DX2 Medical eVTOL**.
   - Headline: "The Golden Hour, Redefined."
2. **Pinned Video Sequence (100–500vh)**:
   - Scrubbed Video: `modal_is_coming_from_sky.mp4` transitioning or `ground_view_video_with_360_view_of_the_video.mp4`.
   - **Phase 1 (0%–30%)**: Flight Profile & Speed (250 km/h cruising speed, 150 km max range).
   - **Phase 2 (30%–70%)**: Clinical Intensive Care Cabin (ICU-configured stretcher, ventilator, defibrillator, multiparameter monitor).
   - **Phase 3 (70%–100%)**: Redundant Safety & Helipad Transition (Tilt-rotor EDF, 1900 kg MTOW, 5 m/s climb rate).
3. **Features & Comparison Grid**:
   - Real data from `src/utils/solutions.ts` (Seamless VTOL Patient Transport, Hospital-to-Hospital Transfers, Live Patient Monitoring).
4. **Call to Action / Inquiries**:
   - Direct link to `/contact-us` and `/products`.

---

## 5. Verification Method

To independently verify the architecture and recommendations:

1. **Verify Video Streams and Keyframe Structure**:
   ```bash
   ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate,nb_frames:format=duration -of default=noprint_wrappers=1 videos/ayu_dx2_intro_video.mp4
   ffprobe -v error -select_streams v:0 -show_frames -show_entries frame=pict_type,pts_time -of csv=p=0 videos/ayu_dx2_intro_video.mp4 | grep ",I" | head -n 5
   ```
2. **Verify Framer Motion v12 API Exports**:
   ```bash
   node -e "const fm = require('framer-motion'); console.log({ useScroll: !!fm.useScroll, useSpring: !!fm.useSpring, useTransform: !!fm.useTransform, useMotionValueEvent: !!fm.useMotionValueEvent });"
   ```
3. **Verify Next.js Project Integrity**:
   ```bash
   npm run lint
   npm run build
   ```
4. **Invalidation Conditions**:
   - If a video file is encoded with an extremely long GOP (>120 frames / >5 seconds without an I-frame), seek latency will exceed 100ms and require re-encoding with `ffmpeg -i input.mp4 -g 15 -keyint_min 15 output.mp4`.
   - If `containerRef` is nested inside an ancestor element with `overflow: hidden`, CSS `sticky` will fail to pin, requiring removal of the clipping rule on the parent.
