# GEMINI.md - Dragale Aviation Project Knowledge Base

## 1. Project Overview
Dragale Aviation is a Next.js-based marketing and informational website for an Indian startup focused on providing eVTOL (electric Vertical Take-Off and Landing) air ambulance services. It aims to solve the "Golden Hour" challenge in emergency medical services by bypassing traffic and terrain barriers using Medical-First eVTOL aircraft.

## 2. Business Context
- **Domain:** Emergency Medical Services (EMS) / Aviation / Health-Tech.
- **Problem:** Urban congestion and difficult terrain in India prevent ground ambulances from reaching patients in time.
- **Solution:** A network of dedicated medical eVTOLs acting as flying intensive care units.
- **Key Solutions:** Seamless VTOL Patient Transport, Hospital-to-Hospital Transfers, Live Patient Monitoring System.
- **Target Audience:** Hospitals, healthcare networks, emergency coordinators, and investors/stakeholders.

## 3. Core Features and Functionality
- **Home/Landing Page:** High-impact 3D visuals (`@react-three/fiber`) explaining the mission and showcasing the aircraft.
- **Solutions (`/solutions`):** Dynamic pages detailing the three core operational pillars.
- **Blog (`/blog`):** MDX-powered articles on industry regulations, needs, and comparisons.
- **About / Team / Advisors:** Information about the company's mission and leadership.
- **Contact:** Lead generation and inquiries.

## 4. Current Project Status
- The project is a static front-end web application.
- Core pages (Home, About, Solutions, Team, Advisors, Blog, Contact) are implemented.
- 3D models (`taxi.glb`, `Taxi.usdz`) and promotional videos are integrated.
- No backend database or user authentication is currently implemented. It serves as a marketing and product showcase platform.

## 5. Technology Stack
- **Framework:** Next.js 16.1.1 (App Router)
- **Language:** TypeScript 5
- **UI/Styling:** Tailwind CSS v4
- **Core Library:** React 19, React DOM 19
- **3D & Motion:** `three.js` (0.179.1), `@react-three/fiber`, `@react-three/drei`, `framer-motion`
- **Content Management:** `next-mdx-remote`, `gray-matter` (for markdown blogs)
- **Image Optimization:** `sharp`
- **Analytics:** `@vercel/analytics`

## 6. Project Structure
- `src/app/`: Next.js App Router routes (`page.tsx`, `layout.tsx`, etc.). Contains subfolders for `/about`, `/advisors`, `/blog`, `/contact-us`, `/products`, `/solutions`, `/team`.
- `src/components/`: Reusable React components, including complex 3D scenes (`AirplaneModel.tsx`, `LandingHelipadScene.tsx`, `ScrollAirplaneScene.tsx`).
- `src/content/blog/`: MDX files containing blog posts.
- `src/utils/`: Shared utilities (e.g., `solutions.ts` acting as a mini-database).
- `public/`: Static assets (images, videos, 3D models like `taxi.glb`).
- `scripts/`: Maintenance scripts (e.g., `audit-assets.mjs`).

## 7. System Architecture
- **Frontend-Only:** The application is entirely front-end, leveraging Next.js server components for static generation and SEO, combined with client components (e.g., `HomeClient.tsx`, `*Client.tsx`) for interactive 3D and animations.
- **Data Layer:** Content is static. Blog posts are parsed from the file system (MDX). Solution details are stored in `src/utils/solutions.ts`. No external API or database is used.

## 8. Important Application Workflows
- **Routing:** Handled entirely by Next.js App Router.
- **Blog Rendering:** MDX files are read from the `src/content/blog` directory, parsed, and rendered dynamically at `/blog/[slug]`.
- **3D Rendering:** `HomeClient.tsx` lazy-loads heavy 3D scenes (`ScrollAirplaneScene`, `LandingHelipadScene`) to keep the initial bundle small and improve load performance.

## 9. Frontend Architecture
- **Server vs. Client Components:** Strict separation. Route entry points (`page.tsx`) are typically server components that import and render client components (`*Client.tsx`) for interactivity (hooks, state, Framer Motion, Three.js).
- **Styling:** Tailwind CSS (v4) is used for utility-first styling.
- **Animations:** Framer Motion handles UI transitions. `@react-three/fiber` handles 3D canvas animations.

## 10. Backend Architecture
- **N/A:** No dedicated backend. All routing and API handling (if any in the future) are done within Next.js.

## 11. Database and Data Models
- **No Database.**
- **Data Models (TypeScript):**
  - `Solution` type in `src/utils/solutions.ts` defines the structure for solution offerings.
  - Blog post frontmatter metadata serves as the model for articles.

## 12. API Documentation
- **N/A:** No external or internal APIs are currently exposed or documented.

## 13. Shared Components and Utilities
- `Navbar.tsx` & `footer.tsx`: Global layout components.
- 3D Components: `AirplaneModel.tsx`, `LandingHelipadScene.tsx`, `ScrollAirplaneScene.tsx`.
- Loaders: `LoadingScreen.tsx`, `GlobalLoader.tsx`.

## 14. Coding Standards and Conventions
- **Client Components:** Use the `'use client'` directive explicitly at the top of files needing interactivity.
- **Lazy Loading:** Heavy components (especially 3D/Three.js) are imported dynamically using `next/dynamic` to optimize performance.
- **TypeScript:** Strict typing is enforced via `tsconfig.json`.

## 15. Development Setup and Commands
- **Install:** `npm install`
- **Dev Server:** `npm run dev` (starts on 0.0.0.0)
- **Turbo Dev Server:** `npm run dev:turbo`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Audit Assets:** `npm run audit:assets`

## 16. Environment Variables and Configuration
- Currently, no specific environment variables (`.env`) are mandated for local development, as there are no external backend integrations.

## 17. Testing Strategy
- No formal testing framework (e.g., Jest, Cypress) is currently visible in the standard `package.json` setup. Validation is primarily through TypeScript and ESLint (`next lint`).

## 18. Deployment and Infrastructure
- The project is deployed on **Vercel**, as indicated by the `@vercel/analytics` package and Next.js optimization patterns.
- Caching for 3D models is configured in `next.config.ts` to improve load times for large assets (`Cache-Control: public, max-age=31536000, immutable`).

## 19. Security and Important Constraints
- Ensure 3D assets are optimized to prevent client-side performance issues (OOM on mobile devices).
- Do not commit large unoptimized 3D models or videos directly to source control if it can be avoided (though currently they reside in `public/`).

## 20. Common Development Tasks
- **Adding a Blog Post:** Create a new `.mdx` file in `src/content/blog/` with the appropriate frontmatter (title, date, description).
- **Adding a Solution:** Edit the `solutions` array in `src/utils/solutions.ts`.

## 21. Known Issues and Technical Debt
- **Performance:** Rendering multiple Three.js canvases simultaneously can be taxing on lower-end devices. The project mitigates this via `next/dynamic`, but continuous monitoring is needed.
- **Missing Tests:** The project lacks a defined unit/E2E testing strategy.

## 22. Troubleshooting
- If 3D models fail to load, check the path in `useGLTF` or `useLoader` hooks relative to the `public/` directory.

## 23. AI Agent Instructions
### Before making changes
- Read this `GEMINI.md` to understand the marketing/static nature of this project.
- Verify if the requested change is for a Server Component or Client Component.

### While making changes
- Respect the separation of Server and Client components.
- Do not add backend ORMs or database drivers unless explicitly requested, as this is a front-end oriented project.
- Maintain the use of Tailwind v4 and Framer Motion for styling and UI animations.
- When adding 3D assets, ensure they are lazy-loaded via `next/dynamic` to avoid bloat.

### After making changes
- Run `npm run lint` to ensure code quality.
- Run `npm run build` to verify that Next.js static generation succeeds.

## 24. Documentation Maintenance
- Update this `GEMINI.md` file when:
  - A backend/database is integrated.
  - New core pages or 3D scenes are added.
  - New environment variables are required.
