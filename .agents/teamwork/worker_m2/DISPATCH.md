## 2026-10-10T05:55:07Z
You are worker_m2, the Core Implementation Worker for Dragale Aviation.
Your working directory is: /Users/lokeshchoudhary/lokesh/dragale-aviation/.agents/teamwork/worker_m2/
Your parent is orchestrator_1 (conversation ID: 5cc4c2f8-7e5a-4522-92eb-17e2f39156a4).

Read these files first:
1. ORIGINAL_REQUEST.md at: /Users/lokeshchoudhary/lokesh/dragale-aviation/.agents/teamwork/ORIGINAL_REQUEST.md
2. PROJECT.md at: /Users/lokeshchoudhary/lokesh/dragale-aviation/.agents/teamwork/PROJECT.md
3. TEST_INFRA.md at: /Users/lokeshchoudhary/lokesh/dragale-aviation/.agents/teamwork/TEST_INFRA.md
4. TEST_READY.md at: /Users/lokeshchoudhary/lokesh/dragale-aviation/TEST_READY.md
5. Explorer Survey Reports:
   - /Users/lokeshchoudhary/lokesh/dragale-aviation/.agents/teamwork/explorer_survey_1/handoff.md (Video mapping & verified specs)
   - /Users/lokeshchoudhary/lokesh/dragale-aviation/.agents/teamwork/explorer_survey_2/handoff.md (App architecture, navbar contrast, Tailwind v4 design tokens)
   - /Users/lokeshchoudhary/lokesh/dragale-aviation/.agents/teamwork/explorer_survey_3/handoff.md (Seeking Gate state machine, Framer Motion inertia spring, sticky container code recipe)
6. Domain Skill:
   Read and follow /Users/lokeshchoudhary/.gemini/config/plugins/modern-web-guidance-plugin/skills/modern-web-guidance/SKILL.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Exclusive File Ownership:
You own and will implement:
- `src/components/teamwork-preview/ScrollVideoPinnedSequence.tsx`
- `src/components/teamwork-preview/SpecCardOverlay.tsx`
- `src/components/teamwork-preview/CinematicHero.tsx`
- `src/components/teamwork-preview/MissionIntro.tsx`
- `src/components/teamwork-preview/AircraftSpecsGrid.tsx`
- `src/components/teamwork-preview/PreviewCTA.tsx`
- `src/app/teamwork-preview/TeamworkPreviewClient.tsx`
- `src/app/teamwork-preview/page.tsx`

Implementation Requirements:
1. `src/components/teamwork-preview/ScrollVideoPinnedSequence.tsx`:
   - Must be `'use client'`.
   - Implement the complete Seeking Gate state machine (`!video.seeking && !isSeekingRef.current`, listening to native `'seeked'` event, dirty target follow-up, sub-frame deadband threshold 0.03s).
   - Use Framer Motion `useScroll({ target: containerRef, offset: ['start start', 'end end'] })` and `useSpring(scrollYProgress, { damping: 30, stiffness: 200, mass: 0.5 })`.
   - Subscribe via `useMotionValueEvent(smoothProgress, 'change', ...)` to update `targetTimeRef.current` without causing React `useState` re-renders (ZERO re-renders on scroll).
   - Container layout: outer track `relative h-[400vh] w-full bg-black`, sticky frame `sticky top-0 h-screen h-[100dvh] w-full overflow-hidden`.
   - HTML5 video attributes: `preload="metadata"`, `muted={true}`, `playsInline={true}`, `disablePictureInPicture={true}`, `disableRemotePlayback={true}`, `aria-hidden="true"`.
   - iOS/WebKit first-frame priming: set `currentTime = 0.001` on `loadedmetadata`.
   - Guard with `IntersectionObserver` (`rootMargin: "200px 0px"`) to halt seeking when offscreen.
   - Forward/backward scrubbing: monotonic forward progression on scroll down, monotonic reverse progression on scroll up.
2. `src/components/teamwork-preview/SpecCardOverlay.tsx`:
   - Interactive aerospace HUD telemetry overlay with glowing border (`border-l-4 border-[#00AEEF]`), glassmorphism (`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl`).
   - Sync overlay cards to scroll phases:
     * Phase 1 (0.00 – 0.30): Cruise Speed `250 km/h (150 mph)`, Range `150 km (100 mi)`, acoustic signature `<65 dBA`.
     * Phase 2 (0.30 – 0.65): Stretcher-First ICU Cabin (`1 Pilot, 1 Stretcher Patient, 2 Medics, 1 Attendant`), Payload `350 kg`, Medical Suite (Ventilator, Defibrillator, Multiparameter Monitor, Oxygen Supply, Infusion Pump).
     * Phase 3 (0.65 – 1.00): Distributed Electric Propulsion (`12 DEP Motors`), Dimensions (`13m length, 14m wingspan, 3m height`), MTOW `1900 kg`, Redundant Safety Systems.
3. `src/components/teamwork-preview/CinematicHero.tsx`:
   - Ambient video hero with AYU DX2 / AyuRatha reveal, Golden Hour headline, audio/play controls, and scroll cue.
   - Header contrast protection: ensure top spacing or subtle backdrop so `#111111` Navbar text remains clearly legible at `scrollY = 0`.
4. `src/components/teamwork-preview/MissionIntro.tsx`:
   - Emergency medical services context: Golden Hour, bypassing traffic congestion, Jaipur to Delhi corridor (60-70 mins vs 5-6 hours road).
5. `src/components/teamwork-preview/AircraftSpecsGrid.tsx`:
   - Comprehensive technical matrix citing exact figures from `ProductsClient.tsx` and all 5 operational pillars from `solutions.ts`.
6. `src/components/teamwork-preview/PreviewCTA.tsx`:
   - Conversion CTA linking to `/solutions` and `/contact-us`.
7. `src/app/teamwork-preview/TeamworkPreviewClient.tsx`:
   - Orchestrates the full cinematic sequence: Hero -> Mission Intro -> Pinned Scroll Sequence (scrubbing `/videos/ground_view_video_with_360_view_of_the_video.mp4` or `/showcase_video.mp4`) -> Aircraft Specs Grid -> CTA.
8. `src/app/teamwork-preview/page.tsx`:
   - Server Component exporting `metadata: Metadata` with SEO title, description, and OpenGraph. Renders `TeamworkPreviewClient`.

Verification:
- Run `node scripts/test-teamwork-preview.mjs --full` — MUST pass 100% (69/69 PASS, exit code 0).
- Run `npm run build` — MUST complete with exit code 0 and prerender `/teamwork-preview`.
- Document all build and test command outputs in `handoff.md`.
