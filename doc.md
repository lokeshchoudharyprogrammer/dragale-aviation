# Dragale Aviation Website Architecture & Design Document

## Objective
To build a highly polished, professional, and visually stunning website for Dragale Aviation that closely mirrors the layout, design principles, and user experience of [Wisk.aero](https://wisk.aero/), while adapting the content to focus on Medical Air Ambulance Services (eVTOL).

## Design System & Theme
- **Primary Color Palette:**
  - **Brand Blue:** `#00AEEF` (Dragale Aviation primary color)
  - **Deep Navy/Black:** `#111111` (For high-contrast text and dark backgrounds)
  - **Clean White:** `#FFFFFF` (For spacious, modern sections)
  - **Light Gray:** `#F9F9F9` & `#E5E7EB` (For secondary section backgrounds and borders)
- **Typography:**
  - **Primary Font:** Archivo (already configured via next/font)
  - **Characteristics:** Clean, modern sans-serif. Large, bold headings with high-contrast tight tracking. Clean, legible body text with generous line-height.
- **Layout Principles:**
  - Full-width hero sections (100vh).
  - Sticky, transparent-to-solid navigation bar.
  - Large, immersive imagery and videos.
  - Minimalist component design with generous whitespace (padding/margins).
  - Smooth scroll animations (fade-in, slide-up) using Framer Motion.

## Page Structure
1. **Global Loader:**
   - (Already completed). Features a centered 3D plane and a smooth progress bar. DO NOT TOUCH.
2. **Navigation Bar (Navbar):**
   - Fixed/Sticky at the top.
   - Transparent background initially, transitioning to solid white/black on scroll.
   - Left: Dragale Aviation Logo.
   - Center: Links (Aircraft, Autonomous, Safety, Solutions, Company).
   - Right: CTA Button (Contact Us).
3. **Home Page (`/`):**
   - **Hero Section:** Full-screen video/image background. Headline: "The Future of Medical Air Transport." Subtext about autonomous, all-electric air ambulance service.
   - **Mission Section:** Bold, oversized text stating the core mission (Saving lives with zero emissions and immediate response).
   - **Aircraft Showcase:** Highlighting the eVTOL ambulance. Stats grid (Speed, Range, Patient Capacity, Charge Time).
   - **Safety & Autonomy:** Two-column layout (Image on one side, text on the other) explaining autonomous flight and safety redundancy.
   - **News/Blog Teaser:** Cards linking to recent articles.
4. **Footer:**
   - Comprehensive footer with logo, site map links, social media icons, and legal disclaimers.

## Technical Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Elements:** React Three Fiber / Drei (Already in place for loader)
