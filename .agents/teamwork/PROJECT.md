# Project: Dragale Aviation — Premium Scroll-Driven Aviation Experience (`/teamwork-preview`)

## Architecture
- **Framework**: Next.js 16.1.1 (App Router), React 19, Tailwind CSS v4, Framer Motion v12.9.4.
- **Route**: `/teamwork-preview`
  - `src/app/teamwork-preview/page.tsx`: Server Component for Next.js metadata, OpenGraph, layout containment, and SEO.
  - `src/app/teamwork-preview/TeamworkPreviewClient.tsx`: Client Component orchestrator for cinematic scroll pacing, progress metrics, and section composition.
- **Components**:
  - `src/components/teamwork-preview/CinematicHero.tsx`: Ambient video hero introducing AYU DX2 / AyuRatha with scroll cue and audio/play controls.
  - `src/components/teamwork-preview/MissionIntro.tsx`: Golden Hour EMS typography and context.
  - `src/components/teamwork-preview/ScrollVideoPinnedSequence.tsx`: Pinned sticky container (`relative h-[400vh]` parent, `sticky top-0 h-[100dvh]` child) with the Seeking Gate engine for zero-render scroll-synchronized video playback.
  - `src/components/teamwork-preview/SpecCardOverlay.tsx`: Phase-synced aerospace HUD telemetry overlays (cruising speed, range, cabin layout, medical equipment, acoustic profile).
  - `src/components/teamwork-preview/AircraftSpecsGrid.tsx`: Verified technical specifications grid from `ProductsClient.tsx` and `solutions.ts`.
  - `src/components/teamwork-preview/PreviewCTA.tsx`: Next section CTA linking to `/solutions` and `/contact-us`.
- **Assets**:
  - Symlink `public/videos -> ../videos` allowing Next.js to serve all 10 Full HD MP4 files cleanly (verified in M1).
- **Design Tokens**:
  - Dark Midnight `#050a1f`, Jet Black `#020205`/`#111111`, Electric Cyan `#00AEEF`.
  - Glassmorphic panels: `bg-white/10 backdrop-blur-md border border-white/20`.
  - Telemetry badges: `border-l-4 border-[#00AEEF]`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Asset Availability & Symlinking | Symlink `public/videos -> ../videos` so Next.js static server serves all 10 Full HD clips | M1 | Survey 1, 2, 3 (VERIFIED) |
| 2 | E2E Testing Infrastructure | Automated E2E verification runner for route, DOM, video scrubbing, and spec assertions | M1 | E2E Track / ORIGINAL_REQUEST (VERIFIED) |
| 3 | Route Scaffolding & SEO Metadata | `src/app/teamwork-preview/page.tsx` Server Component exporting title, description, openGraph | M2 | Survey 2 / R3, R4 (VERIFIED) |
| 4 | Seeking Gate Scroll Engine | `ScrollVideoPinnedSequence.tsx` with Framer Motion `useScroll` + `useSpring`, Seeking Gate state machine, and zero React re-renders | M2 | Survey 3 / R2, R4 (VERIFIED) |
| 5 | Pinned Sticky Geometry & Release | Container `h-[400vh]` with `sticky top-0 h-[100dvh]` child and clean CSS release | M2 | Survey 3 / R2, R4 (VERIFIED) |
| 6 | Video Lifecycle & First-Frame Priming | `preload="metadata"`, `muted`, `playsInline`, `currentTime=0.001` priming for iOS/WebKit | M2 | Survey 3 / R1, R4 (VERIFIED) |
| 7 | Cinematic Hero Section | `CinematicHero.tsx` with model reveal, headline, ambient video, and scroll indicator | M3 | Survey 1, 2 / R3 (VERIFIED) |
| 8 | Mission Intro Section | `MissionIntro.tsx` explaining Golden Hour EMS, traffic bypass, and hospital-to-hospital need | M3 | Survey 1, 2 / R3 (VERIFIED) |
| 9 | Phase-Synced HUD Spec Overlays | `SpecCardOverlay.tsx` displaying synchronized aircraft specs as user scrolls through video | M3 | Survey 1, 2 / R1, R3 (VERIFIED) |
| 10 | Verified Aircraft Specs Grid | `AircraftSpecsGrid.tsx` with authentic citations: 250 km/h, 150 km range, 1900 kg MTOW, 350 kg payload, 13m×14m×3m, 4 pax + stretcher | M3 | Survey 1 / R1 (VERIFIED) |
| 11 | Operational Pillars Integration | Display 5 pillars from `solutions.ts` (VTOL Transport, H2H Transfers, Live Monitoring, Cardiac Care, Redundant Safety) | M3 | Survey 1 / R1 (VERIFIED) |
| 12 | Conversion CTA & Next Section | `PreviewCTA.tsx` with clear pathways to `/solutions` and `/contact-us` | M3 | Survey 2 / R3 (VERIFIED) |
| 13 | Header Contrast & Layout Shift Safety | Navbar contrast preservation and zero Cumulative Layout Shift (CLS) | M3 | Survey 2 / R4 (VERIFIED) |
| 14 | E2E Acceptance Test Pass (Tiers 1-4) | Pass 100% of automated and opaque-box E2E test suite (69/69 PASS) | M4 | ORIGINAL_REQUEST (VERIFIED) |
| 15 | Adversarial Hardening (Tier 5) & Forensic Audit | Stress testing (30/30 probes pass) + Forensic Auditor CLEAN verdict | M4 | Project Pattern (VERIFIED) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Asset Setup & Test Infrastructure | Create `public/videos` symlink, create test harness `scripts/test-teamwork-preview.mjs` covering Tiers 1-4 | none | DONE |
| M2 | Core Scroll-Synchronized Video Engine | Build `ScrollVideoPinnedSequence.tsx` with Seeking Gate, Framer Motion inertia spring, sticky pinning | M1 | DONE |
| M3 | UI Journey & Page Assembly | Build `CinematicHero.tsx`, `MissionIntro.tsx`, `SpecCardOverlay.tsx`, `AircraftSpecsGrid.tsx`, `PreviewCTA.tsx`, `TeamworkPreviewClient.tsx`, and `page.tsx` | M2 | DONE |
| M4 | Final Milestone: E2E Verification & Forensic Audit | Pass 100% E2E test suite (Tiers 1-4), adversarial stress testing (Tier 5), and Forensic Audit | M3 | DONE |

## Interface Contracts
### ScrollVideoPinnedSequence ↔ SpecCardOverlay
- `videoSrc: string`: URL to local video asset (`/videos/ground_view_video_with_360_view_of_the_video.mp4` / `/showcase_video.mp4`).
- `children: React.ReactNode`: Overlay content rendered over the sticky video canvas.
- Phase thresholds:
  - Phase 1 (0.00 – 0.30): High-speed cruise & range specs (`250 km/h`, `150 km range`).
  - Phase 2 (0.30 – 0.65): Stretcher-first medical ICU cabin & diagnostic equipment (`1 Pilot, 1 Stretcher Patient, 2 Medics, 1 Attendant`).
  - Phase 3 (0.65 – 1.00): Redundant DEP propulsion & airframe dimensions (`12 DEP motors, 13m length, 14m wingspan, 1900 kg MTOW`).

### Page ↔ Layout
- Route URL: `/teamwork-preview`.
- Navbar integration: Page begins with a subtle top gradient / background containment so black navbar text maintains contrast at `scrollY = 0`.

## Code Layout
- `public/videos/`: Symlink to `../videos` (allows Next.js static asset serving)
- `src/app/teamwork-preview/page.tsx`: Server Component entry point
- `src/app/teamwork-preview/TeamworkPreviewClient.tsx`: Client Component page coordinator
- `src/components/teamwork-preview/ScrollVideoPinnedSequence.tsx`: Sticky video scrub engine
- `src/components/teamwork-preview/CinematicHero.tsx`: Video hero section
- `src/components/teamwork-preview/MissionIntro.tsx`: Mission typography section
- `src/components/teamwork-preview/SpecCardOverlay.tsx`: Interactive HUD telemetry
- `src/components/teamwork-preview/AircraftSpecsGrid.tsx`: Technical specifications matrix
- `src/components/teamwork-preview/PreviewCTA.tsx`: Bottom call-to-action
- `scripts/test-teamwork-preview.mjs`: E2E test harness
