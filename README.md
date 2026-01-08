# Dragale Aviation

**Revolutionizing Emergency Medical Transport in India with Medical-First eVTOLs.**

Dragale Aviation is a pioneering initiative dedicated to transforming emergency medical services (EMS) in India. By leveraging advanced **eVTOL (electric Vertical Take-Off and Landing)** technology, the project aims to solve the critical "Golden Hour" challenge—ensuring patients receive life-saving care within the first 60 minutes of trauma or medical emergency.

Unlike standard air taxis designed for commuters, Dragale's aircraft are designed as **"Medical-First"** vehicles—effectively **flying intensive care units** optimized for patient stability, medical crew ergonomics, and rapid response.

---

## 🚀 Mission & Vision

**The Problem:**
In India, urban congestion and difficult terrain often prevent ground ambulances from reaching patients or hospitals in time. Traditional helicopter EMS is expensive, scarce, and operationally complex.

**The Solution:**
A network of dedicated medical eVTOLs that can:
- Bypass traffic and terrain barriers.
- Land closer to the point of need (dense cities, remote zones).
- Provide hospital-level care during transit.

---

## 🏥 Key Solutions

This platform showcases three core operational pillars:

### 1. Seamless VTOL Patient Transport
Vertical takeoff capabilities allow for rapid extraction from dense urban centers or remote locations directly to medical facilities. We focus on reducing "friction points" like traffic jams and complex transfer handoffs.

### 2. Hospital-to-Hospital Transfers
High-speed, coordinated inter-facility transport for patients needing higher levels of care (e.g., transferring a cardiac patient from a local clinic to a specialty heart center).

### 3. Live Patient Monitoring System
A tech-enabled ecosystem that transmits real-time patient vitals from the aircraft to the receiving hospital. This allows doctors on the ground to track trends and prepare for the patient's arrival before they land.

---

## 🛠️ Technology Stack

This website is built as a high-performance, scalable platform to communicate Dragale's vision.

- **Framework:** [Next.js 16.1](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **UI/Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Core Library:** React 19
- **3D & Motion:**
  - `three.js` & `@react-three/fiber` (for 3D aircraft models)
  - `framer-motion` (for smooth UI transitions)
- **Content Management:** MDX (Markdown + JSX) for blogs and articles.

---

## 📂 Project Structure

```bash
src/
├── app/                 # Main application routes (Next.js App Router)
│   ├── about/           # About Us page
│   ├── solutions/       # Dynamic solutions pages (/solutions/[slug])
│   ├── blog/            # MDX-powered blog
│   └── ...
├── components/          # Reusable UI components (Navbar, 3D Models, etc.)
├── content/             # MDX files for blog posts
└── utils/               # Shared utilities
    └── solutions.ts     # Single source of truth for solution data
```

## ⚡ Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Open in Browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📚 Learn More

Check out our **Blog** section within the app to read in-depth articles on:
- *Why India Needs Dedicated eVTOL Air Ambulances*
- *Regulatory Readiness for Medical eVTOL Operations*
- *eVTOL Air Ambulance vs. Helicopter EMS*
