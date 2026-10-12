# Implementation Plan & Task List

- [ ] **Phase 1: Foundation & Navbar**
  - [ ] Analyze existing `Navbar.tsx` and upgrade it to match the sleek, sticky design of Wisk.aero.
  - [ ] Implement scroll-detection so the Navbar changes from transparent to solid when scrolling.
  - [ ] Ensure mobile menu matches the premium feel (smooth slide-in or fade).

- [ ] **Phase 2: Home Page Hero Section**
  - [ ] Overhaul `src/app/page.tsx`.
  - [ ] Create a 100vh Hero section with a dark overlay and a high-quality background (placeholder image/video if needed).
  - [ ] Add large, bold typography for the main headline, utilizing Framer Motion for a smooth slide-up entrance.

- [ ] **Phase 3: Mission & Core Features**
  - [ ] Build a "Statement" section with oversized text that reveals on scroll.
  - [ ] Build a Features grid (Autonomous, Electric, Safe, Fast) with minimalist icons or clean typography.

- [ ] **Phase 4: Aircraft Showcase Section**
  - [ ] Create a dedicated section to showcase the aircraft specs.
  - [ ] Implement a clean, modern specs grid (e.g., Speed: 150mph, Range: 100 miles, etc.).
  - [ ] Include an image or secondary 3D canvas (optional, depending on performance) showing the aircraft.

- [ ] **Phase 5: Safety & Technology**
  - [ ] Implement alternating two-column layouts (Text left/Image right, Image left/Text right) to explain the technology, similar to Wisk.aero's deep-dives.

- [ ] **Phase 6: Footer Refinement**
  - [ ] Upgrade `Footer.tsx` to match a premium aerospace aesthetic (clean columns, subtle text colors, clean social icons).

- [ ] **Phase 7: Polish & Mobile Responsiveness**
  - [ ] Test across viewport sizes.
  - [ ] Ensure all Framer Motion scroll animations trigger correctly using `whileInView`.
  - [ ] Verify the loader logic remains untouched and functions perfectly before the home page reveals.
