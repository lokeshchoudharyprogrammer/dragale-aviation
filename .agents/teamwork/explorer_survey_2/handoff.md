# Handoff Report: Frontend Architecture & Styling Survey for `/teamwork-preview`

## 1. Observation

### 1.1 Project Architecture & Core Dependencies
- **`package.json`**:
  - Next.js: `16.1.1` (Turbopack enabled)
  - React / React-DOM: `19.0.0`
  - Motion / Animations: `framer-motion: ^12.9.4`
  - Styling: `tailwindcss: ^4`, `@tailwindcss/postcss: ^4`, `clsx: ^2.1.1`
  - 3D / WebGL: `three: ^0.179.1`, `@react-three/fiber: ^9.3.0`, `@react-three/drei: ^10.6.1`
  - Icons: `lucide-react: ^0.506.0`, `react-icons: ^5.5.0`
- **Build Status**:
  - `npm run build` completed with return code `0` in `2.4s`, compiling 23 routes statically via Turbopack.
  - Notice on linting: `npm run lint` invokes `next lint`, which throws `Invalid project directory provided, no such directory: /Users/lokeshchoudhary/lokesh/dragale-aviation/lint` due to Next.js 16 CLI flag syntax. `npx eslint .` runs but reveals pre-existing warnings and unescaped quotes in legacy files (`HomeClient.tsx`, `ProductsClient.tsx`, etc.).

### 1.2 Layout & Global Wrappers (`src/app/layout.tsx`)
- Server Component root:
  - Font: `Archivo` from `next/font/google` (`weights: 100, 400, 700`, latin subset, CSS variable `--font-archivo`).
  - `<body>` class: `${archivo.variable} antialiased` (lines 74-75).
  - Global Elements mounted unconditionally on every route:
    1. `<GlobalLoader />` (line 86)
    2. `<header><Navbar /></header>` (lines 87-89)
    3. `{children}` (line 90)
    4. `<Analytics />` (line 91)
    5. `<Footer />` (line 92)

### 1.3 Global Loader Mechanics (`src/components/GlobalLoader.tsx`)
- Client Component with WebGL initialization and progress listener (`useProgress()` from `@react-three/drei`).
- Fullscreen fixed overlay:
  - Line 84: `className="fixed inset-0 z-[100] w-full h-screen bg-white overflow-hidden font-sans"`
  - Timers:
    - Line 60: On `progress === 100`, sets a 3-second delay (`setTimeout(() => setShow(false), 3000)`).
    - Line 70: Failsafe timer sets 10 seconds (`setTimeout(() => setShow(false), 10000)`).
- Critical Impact: In test automation or immediate page inspection, elements below `z-[100]` will be obscured until the loader timer finishes (3 to 10 seconds).

### 1.4 Navbar Mechanics & Contrast Constraints (`src/components/Navbar.tsx`)
- Fixed header at top of viewport:
  - Line 53: `className="fixed top-0 left-0 right-0 z-[100] h-[70px] flex items-center transition-all"`
- Dynamic route check:
  - Line 20: `const pathname = usePathname();`
  - Line 22: `const isHomePage = pathname === '/';`
  - Line 23: `const shouldBeSolid = isScrolled || !isHomePage;`
  - Line 26-30: `backgroundColor = useTransform(scrollY, [0, 50], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'])`
  - Line 75: `style={{ color: !isHomePage ? '#111111' : textColor }}`
- Critical Impact: On any page other than `/` (including `/teamwork-preview`):
  - At `scrollY = 0`, the navbar background is **transparent** (`rgba(255, 255, 255, 0)`), but the text color is forced to **`#111111`** (black).
  - If `/teamwork-preview` starts with a dark or black video hero at `top: 0`, the black navigation links (`AIRCRAFT`, `AUTONOMOUS`, `SAFETY`, etc.) will have low or zero contrast unless the page accounts for top padding, an underlying backdrop, or a light container header.

### 1.5 Footer Specifications (`src/components/footer.tsx`)
- Line 9: `className="bg-[#111111] text-white px-6 sm:px-12 lg:px-24 py-20 font-sans"`
- Clean dark 4-column footer (`Company`, `Contact`, `Connect` with LinkedIn/Twitter/Instagram/YouTube, and copyright).

### 1.6 Styling System & Design Tokens
- **Tailwind Setup**:
  - `postcss.config.mjs`: `plugins: ["@tailwindcss/postcss"]`
  - `src/app/globals.css`: Line 2 `@import "tailwindcss";`
  - `tailwind.config.ts`: specifies `content: ['./src/**/*.{js,ts,jsx,tsx,mdx}']`, theme font: `archivo: ['var(--font-archivo)']`.
- **Palette**:
  - Electric Blue / Cyan: `#00AEEF` (primary brand color for CTAs, active indicators, borders, glowing accents).
  - Deep Navy / Midnight: `#050a1f` (3D backgrounds and showcase section).
  - Jet Black / Charcoal: `#111111` (footer, dark navbar text, hero base), `#020205`, `bg-black`.
  - Light Gray / Surfaces: `#F9F9F9`, `bg-gray-50`, `bg-white`.
  - Accent / Safety Green: `#22c55e`.
  - Text Muted: `text-gray-400`, `text-gray-500`, `text-gray-600`.
- **Glassmorphism & Card Styles**:
  - Glass controls: `bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white rounded-full` (`HomeClient.tsx:130`).
  - Dark glass controls: `bg-black/50 hover:bg-[#00AEEF] hover:text-white backdrop-blur-md border border-white/20 rounded-full` (`ShowcaseVideoSection.tsx:75`).
  - Glow shadow: `shadow-[0_0_50px_rgba(0,174,239,0.15)]`.
  - Spec highlight cards: `border-l-4 border-[#00AEEF] pl-6` (`HomeClient.tsx:216-231`).
- **Typography Scale**:
  - Large Hero Display: `text-5xl md:text-7xl lg:text-[100px] font-bold tracking-tight leading-[1.1]`
  - Section Headlines: `text-4xl md:text-6xl lg:text-[70px] font-bold tracking-tight leading-[1.1]`
  - Eyebrow / Kicker tags: `text-sm font-semibold tracking-widest uppercase text-gray-400` or `text-[#00AEEF]`
  - Body Text: `text-lg md:text-xl font-medium text-gray-400` or `text-gray-600 leading-relaxed max-w-2xl`

### 1.7 Existing Multimedia & 3D Patterns
- Dynamic Imports: Heavy interactive scenes are imported dynamically with `{ ssr: false }` and custom spin loaders in `HomeClient.tsx`:
  - `ScrollAirplaneScene`: `dynamic(() => import('../components/ScrollAirplaneScene'), { ssr: false, loading: ... })`
  - `LandingHelipadScene`: `dynamic(() => import('../components/LandingHelipadScene'), { ssr: false, loading: ... })`
- Scroll progress calculation pattern in `ScrollAirplaneScene.tsx` (lines 142-158):
  - Uses `getBoundingClientRect()` with passive scroll listener: `(vh - rect.top) / (el.offsetHeight + vh)`.
- Video element attributes:
  - `autoPlay`, `loop`, `muted`, `playsInline`, `preload="none"` or `preload="metadata"`.

### 1.8 Video Assets & Storage Location
- Root directory contains `videos/` with 10 Full HD (1920x1080) H.264 video files:
  1. `videos/hero_section_video.mp4`: 1920x1080, 85.93s, 29.06MB
  2. `videos/ayu_dx2_intro_video.mp4`: 1920x1080, 5.23s, 1.71MB
  3. `videos/sky_view_video_with_front_view_of_the_video.mp4`: 1920x1080, 8.81s, 3.78MB
  4. `videos/sky_view_video_with_back_view_of_the_video.mp4`: 1920x1080, 10.47s, 3.97MB
  5. `videos/sky_view_video_with_top_view_of_the_video.mp4`: 1920x1080, 7.51s, 4.64MB
  6. `videos/ground_view_video_with_360_view_of_the_video.mp4`: 1920x1080, 21.89s, 9.70MB (MD5 matches `public/showcase_video.mp4`)
  7. `videos/helipad_leading_video.mp4`: 1920x1080, 10.84s, 4.88MB
  8. `videos/hlipad_leading_video_2.mp4`: 1920x1080, 17.09s, 5.37MB
  9. `videos/modal_is_coming_from_sky.mp4`: 1920x1080, 12.54s, 2.29MB
  10. `videos/sky_view_video.mp4`: 1920x1080, 8.55s, 1.67MB
- **Critical Asset Serving Observation**:
  - In Next.js, static assets served via URL path `/videos/...` must be located inside the `public/` directory.
  - Currently, `videos/` is at the project root (`/Users/lokeshchoudhary/lokesh/dragale-aviation/videos/`), while `public/` does not contain a `videos` directory.
  - To enable `<video src="/videos/..." />` without 404 errors, either a symlink `public/videos -> ../videos` must exist, or files must be linked/copied to `public/videos`.

### 1.9 Aircraft Specifications Data Sources
- **`src/app/products/ProductsClient.tsx` (lines 38-137)**:
  - Aircraft: **AyuRatha (DX1)** and next-generation iterations.
  - Use Case: `Air Ambulance – Hospital-to-Hospital / Emergency Response`
  - Flight Type: `eVTOL (Electric Vertical Takeoff and Landing)`
  - Configuration: `Tilt-rotor with EDF-assisted Cruise`
  - Dimensions: Length `13 meters`, Height `3 meters`, Wingspan `14 meters`
  - Cabin Capacity: `1 Pilot`, `1 Patient (Stretcher)`, `1 Doctor`, `1 Paramedic`, `1 Family Member / Attendant`
  - Performance:
    - MTOW: `1900 kg`
    - Payload: `350 kg`
    - Cruising Speed: `250 km/h`
    - Max Range: `150 km`
    - Flight Time: `45–60 minutes`
    - Climb Rate: `5 m/s`
    - Service Ceiling: `1,000 m (3,280 ft)`
    - Flight Profile: `Smooth transition from vertical lift to forward cruise`
  - Medical Equipment: Shock-absorbing stretcher, compact ventilator, defibrillator, multiparameter patient monitor, portable oxygen supply, first-aid and trauma kit, medical intercom system, temperature-controlled compartment, infusion pump, portable diagnostic scanner.
- **`src/utils/solutions.ts`**:
  - `seamless-vtol-patient-transport`
  - `hospital-to-hospital-transfers`
  - `live-patient-monitoring-system`
  - `critical-heart-patient-support`
  - `redundant-safety-systems`

---

## 2. Logic Chain

1. **Next.js App Router Structure**:
   - `src/app/layout.tsx` is the root Server Component layout. Any new page under `src/app/` will be wrapped by `RootLayout`, inheriting `<GlobalLoader />`, `<Navbar />`, and `<Footer />`.
   - Therefore, `/teamwork-preview` must be created as `src/app/teamwork-preview/page.tsx` as a Server Component to supply Next.js metadata (`title: 'AyuRatha eVTOL Experience | Dragale Aviation'`), ensuring SEO compliance.
   - All interactive scroll listeners, video scrubber DOM refs, and Framer Motion hooks require the `'use client'` directive. Therefore, `page.tsx` must render a dedicated Client Component (`TeamworkPreviewClient.tsx`).

2. **Component Decomposition**:
   - The user request requires a structured cinematic journey: `Hero -> Introduction -> Pinned Scroll Sequence -> Features -> Next Section`.
   - To prevent a monolithic 800+ line client file and ensure testability and separation of concerns, the page should be decomposed into:
     - `src/app/teamwork-preview/page.tsx` (Server Component: SEO, viewport, layout metadata)
     - `src/app/teamwork-preview/TeamworkPreviewClient.tsx` (Client orchestrator: section transitions, progress state)
     - `src/components/teamwork-preview/CinematicHero.tsx` (Client Component: ambient hero video, audio toggle, play/pause, scroll indicator)
     - `src/components/teamwork-preview/MissionIntro.tsx` (Client Component: mission typography, Golden Hour challenge context)
     - `src/components/teamwork-preview/ScrollVideoPinnedSequence.tsx` (Client Component: tall container, sticky viewport, video scrub engine, phase-synced HUD overlays)
     - `src/components/teamwork-preview/SpecCardOverlay.tsx` (Client Component: aerospace telemetry HUD cards for cruise speed, range, cabin, medical gear)
     - `src/components/teamwork-preview/AircraftSpecsGrid.tsx` (Client Component: structured grid verifying official stats from `ProductsClient.tsx`)
     - `src/components/teamwork-preview/PreviewCTA.tsx` (Client Component: seamless link to `/solutions` and `/contact-us`)

3. **Styling System Adherence**:
   - Because the project uses Tailwind v4 with the Archivo typeface, all elements must use semantic Tailwind utility classes without relying on custom third-party design frameworks.
   - The color scheme should strictly adhere to:
     - Backgrounds: `#050a1f` (deep aerospace midnight) and `#020205` / `#111111` for high-tech dark sections; `#F9F9F9` / `#ffffff` for contrast specification sections.
     - Brand Accent: `#00AEEF` for telemetry indicators, active timeline bars, border highlights, and CTA hover states.
     - Glassmorphism: `backdrop-blur-md bg-white/10 border border-white/20` matching `HomeClient.tsx` and `ShowcaseVideoSection.tsx`.

4. **Layout Shift & Performance Optimizations**:
   - Pinned sequence requires explicit height on the parent scroll track (e.g. `min-h-[400vh]` or `500vh`) with `sticky top-0 h-screen w-full` for the child video container. This eliminates Cumulative Layout Shift (CLS).
   - Video elements must use `preload="metadata"` and `playsInline` to prevent autoplay/fullscreen lockouts on iOS Safari.
   - Video scrubbing must throttle time assignments via `requestAnimationFrame` with a seeking guard (`isSeeking` flag / `seeked` event) to avoid browser frame thrashing and audio pops.

5. **Header Contrast Solution**:
   - Since `Navbar.tsx` evaluates `!isHomePage` as `true` on `/teamwork-preview`, it defaults link color to `#111111` (black) against a transparent background at `scrollY = 0`.
   - If `/teamwork-preview` begins with a dark video, the black links will be hard to see.
   - Solution: Either the hero section includes a subtle light glass top header bar / gradient (`bg-gradient-to-b from-white/20 to-transparent`), or the page wraps the top in a contrast-preserving backdrop.

---

## 3. Caveats

- **Video Asset Pathing**: Files currently live in `/videos/` at repository root. Next.js does not serve root `/videos` via HTTP without symlinking to `public/videos` or using route streaming. The implementer must create the symlink (`ln -s ../videos public/videos`) or copy files.
- **Hardware Decoder Scrubbing Limits**: Scrubbing video at 60fps on mobile Safari or low-power Android can introduce latency if keyframe intervals (GOP) are wide. The implementation should clamp or debounce scrub updates using rAF.
- **Pre-existing Lint Errors**: The repository has 34 pre-existing ESLint errors in other files (`HomeClient.tsx`, `ProductsClient.tsx`, etc.). New code in `/teamwork-preview` must be 100% clean and free of lint errors, but running `npx eslint .` repository-wide will report pre-existing codebase errors.

---

## 4. Conclusion

The application architecture is well-suited for a premium scroll-synchronized video experience. All required dependencies (`next@16.1.1`, `react@19`, `framer-motion@12.9.4`, `@tailwindcss/postcss@4`, `lucide-react`) are already installed.

### Proposed Route & Component Architecture

```
src/
├── app/
│   └── teamwork-preview/
│       ├── page.tsx                    # [Server Component] Metadata, SEO, viewports
│       └── TeamworkPreviewClient.tsx   # [Client Component] Flow orchestrator
└── components/
    └── teamwork-preview/
        ├── CinematicHero.tsx           # [Client] Hero video with audio/play toggle & scroll cue
        ├── MissionIntro.tsx            # [Client] Typography statement on Golden Hour EMS
        ├── ScrollVideoPinnedSequence.tsx # [Client] Tall scroll track + sticky video scrubber
        ├── SpecCardOverlay.tsx         # [Client] Phase-based aerospace HUD overlays
        ├── AircraftSpecsGrid.tsx       # [Client] Verified specs grid from ProductsClient.tsx
        └── PreviewCTA.tsx              # [Client] Conversion CTA to /solutions & /contact-us
```

### Proposed Design Tokens & Styling Map

| Element | Style Pattern / Tailwind Classes |
|---|---|
| **Background Dark** | `#050a1f` (deep navy), `#020205` / `bg-black` |
| **Accent Glow** | `#00AEEF`, `shadow-[0_0_50px_rgba(0,174,239,0.15)]` |
| **Glass Containers** | `bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl` |
| **Telemetry Badges** | `border-l-4 border-[#00AEEF] pl-4 font-mono text-[#00AEEF]` |
| **Typography Display** | `font-sans text-5xl md:text-7xl font-bold tracking-tight text-white` |
| **Specs Data Source** | `AyuRatha DX1/DX2`: 250 km/h, 150 km, 1900 kg MTOW, 350 kg payload, 13m×14m×3m |

---

## 5. Verification Method

1. **Build Verification**:
   ```bash
   npm run build
   ```
   *Expected result*: Compiles without errors; lists `/teamwork-preview` as a prerendered static route (○ or ●) in Next.js build output.

2. **File & Boundary Inspection**:
   - Inspect `src/app/teamwork-preview/page.tsx`: Verify it does NOT contain `'use client'` and exports `metadata: Metadata`.
   - Inspect `src/app/teamwork-preview/TeamworkPreviewClient.tsx`: Verify `'use client'` is at line 1.
   - Inspect `public/videos/`: Verify symlink or files exist so `/videos/hero_section_video.mp4` returns HTTP 200.

3. **Invalidation Conditions**:
   - If `/teamwork-preview` triggers a Next.js build error or hydration error due to `window` access outside `useEffect`.
   - If video assets return 404 when loaded via `/videos/...`.
   - If specifications contradict `src/app/products/ProductsClient.tsx` or `src/utils/solutions.ts`.
