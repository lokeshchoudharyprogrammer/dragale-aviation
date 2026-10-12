# Original User Request

## Initial Request — 2026-10-10T05:27:57Z

# Teamwork Project Prompt — Draft

> Status: Ready for launch — awaiting user approval.
> Goal: Craft prompt → get user approval → delegate to teamwork_preview
> Requested team: Full team

Implement a premium, immersive scroll-driven aviation experience on a new `/teamwork-preview` page in the existing Next.js project. The page will synchronize local video assets with scroll progress to create a cinematic storytelling sequence, accurately pairing existing aircraft specifications with their matching video footage.

Working directory: `/Users/lokeshchoudhary/lokesh/dragale-aviation`
Integrity mode: development

## Requirements

### R1. Map and Integrate Local Video Assets
Identify and map the existing video files in `videos/` to the correct aircraft models and context found in the website's content. Do not guess or invent data; use existing specifications and fallback gracefully if data is missing. 

### R2. Scroll-Synchronized Playback
Implement scroll-driven video playback where the video progress is tightly bound to the user's scroll position. Support forwards and backwards scrubbing. Use pinned (sticky) sections so the video remains in focus while text and specifications transition in and out.

### R3. Premium Cinematic UI and Pacing
Structure the page into a cohesive journey (Hero -> Introduction -> Pinned Scroll Sequence -> Features -> Next Section). Maintain the existing Tailwind CSS v4 and Framer Motion aesthetic. Prioritize strong composition, restrained text, smooth transitions, and a responsive layout that works across devices. 

### R4. Performance and Technical Adherence
Avoid unnecessary re-renders or layout shifts. Implement appropriate preloading (`preload="metadata"`) and cleanup of scroll observers. Do not introduce new dependencies unless absolutely necessary.

## Acceptance Criteria

### Functionality & Code Quality (Agent-as-Judge & Manual Review)
- [ ] **Routing:** The `/teamwork-preview` route loads successfully without console errors.
- [ ] **Scroll Sync:** A scroll listener accurately maps window scroll position to the `currentTime` of the `<video>` elements. Scrolling down advances the video; scrolling up reverses it.
- [ ] **Content Accuracy:** Displayed specifications explicitly match the data available in the existing website (e.g., `utils/solutions.ts` or MDX files). No hallucinated stats.
- [ ] **Pinning:** The sticky container logic correctly pins the video during the sequence and releases it naturally when the scroll range completes.
- [ ] **Architecture:** The implementation strictly uses Next.js App Router (Client Components for interactivity), Tailwind v4, and existing libraries (Framer Motion).
