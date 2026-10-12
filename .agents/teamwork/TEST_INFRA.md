# E2E Test Infra: Dragale Aviation (`/teamwork-preview`)

## Test Philosophy
- Opaque-box, requirement-driven. Derives strictly from `ORIGINAL_REQUEST.md` acceptance criteria.
- Methodology: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Combinatorial + Real-World Workload Testing.
- Progressive testability: Verification mechanism validates routes, DOM structures, video attributes, scroll math, and authentic specs.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---------|---------------------|:------:|:------:|:------:|:------:|
| F1 | Route Loading & Build | ORIGINAL_REQUEST §Routing | 5 | 5 | ✓ | ✓ |
| F2 | Local Video Asset Accessibility | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| F3 | Scroll Synchronization & Seeking | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| F4 | Sticky Pinning & Geometry Release | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| F5 | Aircraft Specifications Accuracy | ORIGINAL_REQUEST §Content Accuracy | 5 | 5 | ✓ | ✓ |

## Test Architecture
- Test runner: `node scripts/test-teamwork-preview.mjs`
- Invocation: Invoked after static compilation or against local Next.js server.
- Pass/Fail Semantics: Exit code 0 if all assertions pass; Exit code 1 with structured failure report if any assertion fails.
- Directory layout:
  - `scripts/test-teamwork-preview.mjs`: Standalone runner exercising route build output, HTML rendering, video assets existence, spec citations, and scroll logic emulation.

## Test Tiers & Coverage Thresholds
- **Tier 1 (Feature Coverage, ≥25 cases)**:
  - Route `/teamwork-preview` exports metadata, renders valid HTML.
  - Video files exist in `public/videos/` with matching checksums and valid H.264 streams.
  - `<video>` has `preload="metadata"`, `muted`, `playsinline`.
  - Pinned container uses `relative h-[400vh]` with `sticky top-0 h-[100dvh]`.
  - Displayed specs explicitly cite verified values (`250 km/h`, `150 km`, `1900 kg`, `350 kg`, `13m x 14m x 3m`, 5 pillars).
- **Tier 2 (Boundary & Corner Cases, ≥25 cases)**:
  - Scroll at 0% (top boundary): video `currentTime` clamped to 0 or 0.001.
  - Scroll at 100% (bottom boundary): video `currentTime` clamped to `duration - 0.01`.
  - Negative scroll / overscroll bounce handling (`clamp(0, 1)`).
  - Rapid reverse scroll (forward-backward scrubbing direction changes).
  - Missing metadata fallback / unready video state handling.
- **Tier 3 (Cross-Feature Combinations, ≥5 cases)**:
  - Scroll progress ↔ HUD Spec phase synchronization (Speed at Phase 1, Cabin at Phase 2, DEP motors at Phase 3).
  - Pinned video exit ↔ CTA section reveal continuity.
  - Navbar contrast overlay ↔ Hero video header alignment.
- **Tier 4 (Real-World Application Scenarios, ≥5 cases)**:
  - Scenario 1: End-to-end user scroll journey from Hero through Pinned Sequence to CTA.
  - Scenario 2: Hospital EMS coordinator reviewing inter-facility specs (`Jaipur to Delhi 60-70 mins`).
  - Scenario 3: Clinician verifying onboard ICU equipment list (Ventilator, Defibrillator, Monitor).
  - Scenario 4: Fast wheel scrubbing followed by pause (inertia spring settling).
  - Scenario 5: Full build and static export compilation (`npm run build`).
