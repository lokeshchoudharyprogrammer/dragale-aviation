# Explorer Survey Report: Video Assets & Aircraft Specifications

**Agent:** `explorer_survey_1`  
**Working Directory:** `/Users/lokeshchoudhary/lokesh/dragale-aviation/.agents/teamwork/explorer_survey_1/`  
**Date:** 2026-10-10  
**Target Recipient:** `orchestrator_1` (`5cc4c2f8-7e5a-4522-92eb-17e2f39156a4`)  
**Context:** Scroll-driven video aviation experience on `/teamwork-preview` for Dragale Aviation

---

## 1. Observation

### 1.1 Video Asset Inventory & Technical Probing
Through filesystem exploration, `ffprobe`, `ffmpeg`, and visual inspection, fourteen (14) video files were identified across `videos/` (10 files) and `public/` (4 files). All video streams use the H.264 (AVC) codec.

| # | File Path | File Size (Bytes / MB) | Resolution | Aspect Ratio | FPS | Duration | Audio Codec (Bitrate) | MD5 Checksum |
|---|-----------|------------------------|------------|--------------|-----|----------|-----------------------|--------------|
| 1 | `videos/ayu_dx2_intro_video.mp4` | 1,789,795 (1.71 MB) | 1920x1080 | 16:9 | 24.0 | 5.23s | AAC (2.3 kbps) | `3601db6bbcde06f3265e2d18f2fb372b` |
| 2 | `videos/ground_view_video_with_360_view_of_the_video.mp4` | 10,168,449 (9.70 MB) | 1920x1080 | 16:9 | 24.0 | 21.89s | AAC (2.3 kbps) | `c8ec494e42295367fcb3eda4af36a729` |
| 3 | `videos/helipad_leading_video.mp4` | 5,116,944 (4.88 MB) | 1920x1080 | 16:9 | 24.0 | 10.84s | AAC (2.3 kbps) | `546f4c281a6f5256122341db3193bc8d` |
| 4 | `videos/hero_section_video.mp4` | 30,472,522 (29.06 MB) | 1920x1080 | 16:9 | 24.0 | 85.93s | AAC (2.3 kbps) | `49660133f5b1ea09ee7d9a7c7b554964` |
| 5 | `videos/hlipad_leading_video_2.mp4` | 5,628,694 (5.37 MB) | 1920x1080 | 16:9 | 24.0 | 17.09s | AAC (2.3 kbps) | `172b7b4d33d1a6db09e1fb59b3730224` |
| 6 | `videos/modal_is_coming_from_sky.mp4` | 2,397,220 (2.29 MB) | 1920x1080 | 16:9 | 24.0 | 12.54s | AAC (2.3 kbps) | `c3834a97fb467108037d592fbe82505f` |
| 7 | `videos/sky_view_video.mp4` | 1,748,590 (1.67 MB) | 1920x1080 | 16:9 | 24.0 | 8.55s | AAC (2.3 kbps) | `5036c70b3c9ec796d136e0bc940e6fbf` |
| 8 | `videos/sky_view_video_with_back_view_of_the_video.mp4` | 4,162,262 (3.97 MB) | 1920x1080 | 16:9 | 24.0 | 10.47s | AAC (2.3 kbps) | `14cb133acc5889ff7c30271b04066941` |
| 9 | `videos/sky_view_video_with_front_view_of_the_video.mp4` | 3,959,831 (3.78 MB) | 1920x1080 | 16:9 | 24.0 | 8.81s | AAC (2.3 kbps) | `3109d7b22883d8ed6c5f277309ff7744` |
| 10 | `videos/sky_view_video_with_top_view_of_the_video.mp4` | 4,865,260 (4.64 MB) | 1920x1080 | 16:9 | 24.0 | 7.51s | AAC (2.3 kbps) | `a15d429951f9d24baf5de441b0710806` |
| 11 | `public/Nighttime_aerial.mp4` | 11,051,623 (10.54 MB) | 1920x1080 | 16:9 | 24.0 | 10.00s | AAC (140.0 kbps) | `9b97a504839328bdb83ee622ac02fae5` |
| 12 | `public/dargale_aviation.mp4` | 25,825,121 (24.63 MB) | 1920x1080 | 16:9 | 30.0 | 43.54s | AAC (131.8 kbps) | `20bd101e60dd51e5ea2736f054fe14e9` |
| 13 | `public/showcase_video.mp4` | 10,168,449 (9.70 MB) | 1920x1080 | 16:9 | 24.0 | 21.89s | AAC (2.3 kbps) | `c8ec494e42295367fcb3eda4af36a729` |
| 14 | `public/video.mp4` | 1,958,063 (1.87 MB) | 768x432 | 16:9 | 25.0 | 10.04s | None (No audio) | `842e48c215d2665274cd3d8d81012df2` |

#### Key Direct Observations on Assets:
1. **Identical Files:** `public/showcase_video.mp4` and `videos/ground_view_video_with_360_view_of_the_video.mp4` have the exact same MD5 hash (`c8ec494e42295367fcb3eda4af36a729`) and byte size (`10,168,449 bytes`).
2. **Visual Markings & Aircraft Designation:** Visual inspection of extracted frames reveals:
   - In `videos/ayu_dx2_intro_video.mp4`, giant 3D block letters on the runway explicitly state: **`AYU DX2`** ("AYU" in white, "DX2" in crimson red).
   - In `videos/helipad_leading_video.mp4`, `videos/hlipad_leading_video_2.mp4`, `videos/sky_view_video_with_front_view_of_the_video.mp4`, and `videos/sky_view_video_with_top_view_of_the_video.mp4`, the upper wing and fuselage decals verbatim read:
     - Starboard/Left wing: **`DRAGALE AVIATION`**
     - Port/Right wing: **`AYU DX2`**
     - Fuselage Pod: Red Star of Life / Medical Cross emblem on both sides and rear door.
   - Airframe configuration across all 10 `videos/` clips is identical: high main wing, 12 distributed electric rotors mounted on dual longitudinal booms (3 rotors per boom, 2 booms per wing), an inverted V-tail stabilizer, sleek cockpit pod with large glass canopy, and landing skids.
3. **Composite Nature of `hero_section_video.mp4`:** `videos/hero_section_video.mp4` is an 85.9-second multi-scene compilation that concatenates the ground 360 orbit (0–22s), helipad landing (22–34s), sky cruise (34–46s), urban top-down view (46–56s), urban rear view (56–68s), and urban front-three-quarter flight (68–85s).
4. **Third-Party Watermarks:**
   - `public/video.mp4` contains an unmistakable iStock watermark across the center screen and low resolution (768x432).
   - `public/Nighttime_aerial.mp4` contains a small Gemini AI sparkle icon in the bottom right corner.
5. **Next.js Serving Constraint:** Video files in `/videos/` at the repository root are outside the Next.js static asset root (`/public/`). Next.js App Router cannot serve `/videos/<file>` directly over HTTP unless copied or symlinked into `public/` (e.g., `public/videos/`).

---

### 1.2 Aircraft Specifications & Content Citations

#### Model Identifiers & Core Overview
- **Model Name:** `AyuRatha (DX1)` (`src/app/products/ProductsClient.tsx:39, 267, 274`) / `AYU DX2` (Visual livery markings on 3D renders).
- **Generation:** `Generation 1 eVTOL` / `1st Generation Air Ambulance` (`src/app/HomeClient.tsx:181, 183`).
- **Use Case:** `Air Ambulance – Hospital-to-Hospital / Emergency Response` (`src/app/products/ProductsClient.tsx:40`).
- **Flight Type:** `eVTOL (Electric Vertical Takeoff and Landing)` (`src/app/products/ProductsClient.tsx:41`).
- **Configuration:** `Tilt-rotor with EDF-assisted Cruise` (`src/app/products/ProductsClient.tsx:42`), `Lift + Cruise architecture` (`src/content/blog/eVTOL-Air-Ambulance-vs-Helicopter-EMS-A-Mission-by-Mission-Comparison.mdx:50`).
- **Propulsion:** `Distributed Electric Propulsion (DEP)` with multiple independent motors and battery packs (`src/content/blog/eVTOL-Air-Ambulance-vs-Helicopter-EMS-A-Mission-by-Mission-Comparison.mdx:65`, `src/content/blog/Why-Road-Ambulances-Alone-Cant-Solve-Indias-Emergency-Response-Crisis.mdx:52`).

#### Verified Physical & Cabin Dimensions
- **Length:** `13 meters` (`src/app/products/ProductsClient.tsx:116`).
- **Height:** `3 meters` (`src/app/products/ProductsClient.tsx:117`).
- **Wingspan:** `14 meters` (`src/app/products/ProductsClient.tsx:118`).
- **Cabin Capacity:**
  - `1 Pilot` (`src/app/products/ProductsClient.tsx:120`)
  - `1 Patient (Stretcher)` (`src/app/products/ProductsClient.tsx:121`)
  - `1 Doctor` (`src/app/products/ProductsClient.tsx:122`)
  - `1 Paramedic` (`src/app/products/ProductsClient.tsx:123`)
  - `1 Family Member / Attendant` (`src/app/products/ProductsClient.tsx:124`)
  - Condensed passenger metric: `4 pax` (`src/app/HomeClient.tsx:225`).
- **Cabin Architecture:** `Stretcher-First Design` (`src/content/blog/WhyIndiaNeeds.mdx:62`, `src/content/blog/Why-Road-Ambulances-Alone-Cant-Solve-Indias-Emergency-Response-Crisis.mdx:50`).

#### Verified Flight Dynamics & Performance
- **Cruising Speed / Top Speed:** `250 km/h` (`src/app/products/ProductsClient.tsx:130`, `src/content/blog/Why-Road-Ambulances-Alone-Cant-Solve-Indias-Emergency-Response-Crisis.mdx:44, 60`) / `150 mph` (`src/app/HomeClient.tsx:217`).
- **Max Range:** `150 km` (`src/app/products/ProductsClient.tsx:131`) / `100 mi` (`src/app/HomeClient.tsx:221`).
- **Max Take-Off Weight (MTOW):** `1900 kg` (`src/app/products/ProductsClient.tsx:128`).
- **Payload:** `350 kg` (`src/app/products/ProductsClient.tsx:129`).
- **Flight Time / Endurance:** `45–60 minutes` (`src/app/products/ProductsClient.tsx:132`).
- **Charge Time:** `15 min` (`src/app/HomeClient.tsx:229`).
- **Climb Rate:** `5 m/s` (`src/app/products/ProductsClient.tsx:133`).
- **Service Ceiling:** `1,000 m (3,280 ft)` (`src/app/products/ProductsClient.tsx:134`).
- **Flight Profile:** `Smooth transition from vertical lift to forward cruise` (`src/app/products/ProductsClient.tsx:135`).

#### Acoustics, Safety & Economics
- **Noise Signature:** `<65 dBA` (20 dBA quieter than turbine helicopters like Bell 407 at >85 dBA) (`src/content/blog/eVTOL-Air-Ambulance-vs-Helicopter-EMS-A-Mission-by-Mission-Comparison.mdx:9, 26, 36`).
- **Operating Cost (OpEx):** `$200 – $400 per hour` (~90% cost reduction vs $1,500–$3,000 / INR 1.5–3 Lakhs/hr for turbine helicopters) (`src/content/blog/eVTOL-Air-Ambulance-vs-Helicopter-EMS-A-Mission-by-Mission-Comparison.mdx:9, 25`, `src/content/blog/Why-Road-Ambulances-Alone-Cant-Solve-Indias-Emergency-Response-Crisis.mdx:30, 52, 64`).
- **Corridor Benchmark (Jaipur to Delhi):** `60–70 minutes` via AyuRatha vs `5–6 hours` by road ambulance (`src/content/blog/Why-Road-Ambulances-Alone-Cant-Solve-Indias-Emergency-Response-Crisis.mdx:44`, `src/content/blog/eVTOL-Air-Ambulance-vs-Helicopter-EMS-A-Mission-by-Mission-Comparison.mdx:43`).
- **Transit Time Reduction:** `cutting transport times by up to 80% with zero operational emissions` (`src/app/HomeClient.tsx:212`).

#### Onboard Medical Suite (`src/app/products/ProductsClient.tsx:43-88`)
1. **Patient Adjustable Stretcher:** Shock-absorbing stretcher for stable patient transport.
2. **Compact Ventilator:** Battery-powered for continuous respiratory support.
3. **Defibrillator:** AED and manual modes for cardiac emergencies.
4. **Multiparameter Patient Monitor:** Tracks SpO2, BP, and ECG in real-time.
5. **Portable Oxygen Supply:** Concentrator with backup cylinder for reliability.
6. **First-Aid and Trauma Kit:** Comprehensive kit for immediate care.
7. **Medical Intercom System:** Links to hospitals for real-time communication.
8. **Temperature-Controlled Compartment:** Stores medications at optimal conditions.
9. **Compact Infusion Pump:** Delivers precise IV medication dosages.
10. **Storage Rack:** Holds IV fluids, gloves, PPE, and meds.
11. **Portable Diagnostic Scanner:** Ultrasound or handheld scanner for trauma triage.

#### Airframe Design Optimizations (`src/app/products/ProductsClient.tsx:89-114`)
1. **Aero-stabilized Structure:** Ensures smooth transport in turbulent conditions.
2. **Noise and Vibration Reduction:** Minimizes patient discomfort and protects spinal injury patients (`src/content/blog/Why-Road-Ambulances-Alone-Cant-Solve-Indias-Emergency-Response-Crisis.mdx:51`).
3. **Temperature-Controlled Cabin:** Maintains optimal conditions for critical care.
4. **Easy-Access Side Door:** Facilitates rapid stretcher and equipment loading.
5. **Layer Protection for Heart Patients:** Specialized shielding for cardiac care.
6. **Redundant Systems:** Ensures safety with backup critical systems.

---

### 1.3 Operational Pillars (`src/utils/solutions.ts`)
The project defines five clinical operational pillars:
1. `seamless-vtol-patient-transport` (Lines 29–54): **Seamless VTOL Patient Transport** — Vertical takeoff and landing capability for fast, reliable patient transport from dense cities to remote zones.
2. `hospital-to-hospital-transfers` (Lines 55–79): **Hospital-to-Hospital Transfers** — Efficient inter-facility patient transfers that reduce transit time and improve handoff quality for critical cases.
3. `live-patient-monitoring-system` (Lines 80–104): **Live Patient Monitoring System** — Real-time vital monitoring during transport so clinicians can track trends, respond early, and arrive prepared.
4. `critical-heart-patient-support` (Lines 105–129): **Critical Heart Patient Support** — Specialized transport support for cardiac patients with careful stabilization, monitoring, and coordinated escalation pathways.
5. `redundant-safety-systems` (Lines 130–155): **Redundant Safety Systems** — Redundant flight-critical systems and safety-first design choices to improve reliability across demanding medical transport missions.

---

## 2. Logic Chain

1. **Mapping Videos to Specific Aircraft:**
   - *Premise (Observation 1.1):* All 10 video files in `videos/` display the identical airframe featuring 12 distributed electric rotors, inverted V-tail, red medical cross, and fuselage/wing decals reading `DRAGALE AVIATION` and `AYU DX2`.
   - *Premise (Observation 1.2):* `src/app/products/ProductsClient.tsx:39` defines the signature aircraft as `AyuRatha (DX1)`.
   - *Inference:* The video footage depicts the high-fidelity 3D CGI rendering of Dragale Aviation's signature medical eVTOL platform—branded on the aircraft airframe as **AYU DX2** and documented in website text as **AyuRatha (DX1)**.

2. **Mapping Videos to Operational Pillars:**
   - *Helipad Landing Shots (`helipad_leading_video.mp4` [10.84s] & `hlipad_leading_video_2.mp4` [17.09s]):* Directly depict vertical descent and precision touchdown on a hospital helipad. This directly maps to **Pillar 1: Seamless VTOL Patient Transport** (`solutions.ts:31-53`), supported by metrics: VTOL capability, climb/descent rate `5 m/s` (`ProductsClient.tsx:133`), and `<65 dBA` noise profile allowing urban rooftop vertiport access (`eVTOL-Air-Ambulance...mdx:26`).
   - *Urban Canyon Flight Shots (`sky_view_video_with_front_view_of_the_video.mp4` [8.81s], `sky_view_video_with_top_view_of_the_video.mp4` [7.51s], `sky_view_video_with_back_view_of_the_video.mp4` [10.47s], `sky_view_video.mp4` [8.55s]):* Feature the aircraft cruising at speed past skyscrapers and above congested city avenues. This directly maps to **Pillar 2: Hospital-to-Hospital Transfers** (`solutions.ts:55-78`), supported by cruise speed `250 km/h (150 mph)` (`ProductsClient.tsx:130`, `HomeClient.tsx:217`), range `150 km (100 mi)` (`ProductsClient.tsx:131`, `HomeClient.tsx:221`), and the 60–70 minute corridor transit time (`Why-Road-Ambulances...mdx:44`).
   - *360-Degree Ground Orbital Inspection (`ground_view_video_with_360_view_of_the_video.mp4` / `public/showcase_video.mp4` [21.89s]):* Smoothly pans around the stationary aircraft, exposing all structural components: 12 DEP motors, dual boom architecture, dimensions, and cabin access doors. This maps directly to **Pillar 5: Redundant Safety Systems** (`solutions.ts:130-153`) and physical dimensions (`13m length, 14m wingspan, 1900kg MTOW, 350kg payload`) (`ProductsClient.tsx:116-129`).
   - *Title & Intro Sequence (`ayu_dx2_intro_video.mp4` [5.23s]):* Shows the hovering arrival and reveals the 3D logo typography. This serves as the introductory hook for the scroll journey.

3. **Performance Suitability for Scroll-Driven Scrubbing:**
   - *Premise (Observation 1.1):* Frame scrubbing requires frequent `currentTime` seeking on `<video>` elements.
   - *Inference:* Using smaller, targeted video clips (such as `ground_view_video_with_360_view_of_the_video.mp4` at 10.17 MB or `sky_view_video_with_front_view_of_the_video.mp4` at 3.96 MB) will provide fluid, instantaneous seek performance without layout shifts or memory exhaustion. Relying on the 30.5 MB `hero_section_video.mp4` for multiple scroll sections risks buffering pauses and high memory footprint.

---

## 3. Caveats

1. **Static Serving Directory:** The 10 primary video files currently reside in `/videos/` at the repository root. Next.js App Router only serves static assets located under `/public/`. For `/teamwork-preview` to load these videos via HTML `<video src="...">`, they must be copied or symlinked to `public/videos/` (or `public/`).
2. **Model Designation Discrepancy:** The website's text references `AyuRatha (DX1)`, whereas the 3D visual assets verbatim display `AYU DX2`. This should be handled gracefully by displaying the name as "AyuRatha DX2" or "AyuRatha DX1/DX2" to bridge the copy and visual assets without confusing the user.
3. **Metric vs. Imperial Units:** `ProductsClient.tsx` uses metric (`250 km/h`, `150 km`), while `HomeClient.tsx` uses imperial (`150 mph`, `100 mi`). As calculated, 150 mph = 241 km/h and 100 mi = 161 km. The preview page should present dual units (e.g. `250 km/h (150 mph)`) to maintain fidelity with both source files.
4. **Watermarked Third-Party Footage:** `public/video.mp4` contains an iStock watermark, and `public/Nighttime_aerial.mp4` contains a Gemini watermark. These must NOT be used for the primary scroll-driven aircraft experience. Only the clean, proprietary 3D renders from `videos/` should be utilized.
5. **Audio Muting Requirement:** The clips in `videos/` contain low-bitrate AAC audio streams (~2.3 kbps). During scroll-synchronized playback, the audio stream will cause stutter or noise unless `<video>` elements are explicitly set to `muted={true}`.

---

## 4. Conclusion & Complete Inventory Table

All assets and specifications are fully surveyed, cross-referenced, and ready for immediate implementation on the `/teamwork-preview` route.

### Ready-for-Implementation Video & Spec Mapping Inventory Table

| Sequence / Section | Target Web Video Path | Original Asset Path | Duration / Size | Matching Aircraft Model | Matching Operational Pillar | Verified Specifications to Display (Exact Citations) |
|---|---|---|---|---|---|---|
| **1. Hero Section** | `/videos/ayu_dx2_intro_video.mp4` | `videos/ayu_dx2_intro_video.mp4` | 5.23s / 1.79 MB | **Ayu DX2** / AyuRatha | **Hero Introduction** | • Model: `AYU DX2 / AyuRatha` (`ProductsClient.tsx:39`)<br>• Mission: `India's First Medical-First eVTOL Air Ambulance` (`Why-Road-Ambulances...mdx:48`)<br>• Zero Operational Emissions (`HomeClient.tsx:212`) |
| **2. Pinned Sequence 1: 360° Architecture** | `/showcase_video.mp4` (or `/videos/ground_view_video_with_360_view_of_the_video.mp4`) | `videos/ground_view_video_with_360_view_of_the_video.mp4` | 21.89s / 10.17 MB | **Ayu DX2** / AyuRatha (DX1) | **Redundant Safety Systems** (`solutions.ts:130-155`) | • Length: `13 meters` (`ProductsClient.tsx:116`)<br>• Wingspan: `14 meters` (`ProductsClient.tsx:118`)<br>• Height: `3 meters` (`ProductsClient.tsx:117`)<br>• MTOW: `1900 kg` (`ProductsClient.tsx:128`)<br>• Payload: `350 kg` (`ProductsClient.tsx:129`)<br>• Propulsion: `12 Direct-Drive DEP Motors` (`eVTOL-Air-Ambulance...mdx:27, 65`)<br>• Redundant Battery Management Systems (`Regulatory-Readiness...mdx:27`) |
| **3. Pinned Sequence 2: Urban Canyon Cruise** | `/videos/sky_view_video_with_front_view_of_the_video.mp4` | `videos/sky_view_video_with_front_view_of_the_video.mp4` | 8.81s / 3.96 MB | **Ayu DX2** / AyuRatha (DX1) | **Hospital-to-Hospital Transfers** (`solutions.ts:55-79`) | • Cruise Speed: `250 km/h (150 mph)` (`ProductsClient.tsx:130`, `HomeClient.tsx:217`)<br>• Range: `150 km (100 mi)` (`ProductsClient.tsx:131`, `HomeClient.tsx:221`)<br>• Acoustic Signature: `<65 dBA` (20 dBA quieter than helicopters) (`eVTOL-Air-Ambulance...mdx:26`)<br>• Inter-City Transit: `Jaipur to Delhi in 60–70 min` vs `5–6 hr road` (`Why-Road-Ambulances...mdx:44`)<br>• Transport Time Reduction: `Up to 80%` (`HomeClient.tsx:212`) |
| **4. Pinned Sequence 3: Precision Helipad Touchdown** | `/videos/helipad_leading_video.mp4` (or `/videos/hlipad_leading_video_2.mp4`) | `videos/helipad_leading_video.mp4` | 10.84s / 5.12 MB | **Ayu DX2** / AyuRatha (DX1) | **Seamless VTOL Patient Transport** (`solutions.ts:29-54`) | • Modality: `Vertical Takeoff & Landing (VTOL)` (`ProductsClient.tsx:41`)<br>• Climb/Descent Rate: `5 m/s` (`ProductsClient.tsx:133`)<br>• Service Ceiling: `1,000 m (3,280 ft)` (`ProductsClient.tsx:134`)<br>• Fast Charge: `15 minutes` (`HomeClient.tsx:229`)<br>• Infrastructure: `DGCA Rule 133A Vertiport Compliance` (`Regulatory-Readiness...mdx:9, 72`) |
| **5. Care Capabilities & Cabin Section** | `/videos/sky_view_video_with_back_view_of_the_video.mp4` | `videos/sky_view_video_with_back_view_of_the_video.mp4` | 10.47s / 4.16 MB | **Ayu DX2** / AyuRatha (DX1) | **Live Patient Monitoring & Critical Care** (`solutions.ts:80-129`) | • Cabin: `1 Pilot + 1 Stretcher Patient + 2 Medics + 1 Attendant` (`ProductsClient.tsx:119-125`)<br>• Layout: `Stretcher-First Cabin Architecture` (`WhyIndiaNeeds.mdx:62`)<br>• Vibration Dampening for Spinal Trauma (`Why-Road-Ambulances...mdx:51`)<br>• Real-time SpO2, BP, ECG Monitoring (`ProductsClient.tsx:57-58`)<br>• OpEx: `$200 – $400 / hour` (`eVTOL-Air-Ambulance...mdx:25`) |

---

## 5. Verification Method

To independently verify the observations, measurements, and citations in this report:

1. **Verify Video Metadata:**
   ```bash
   ffprobe -v error -show_entries format=duration,size,bit_rate -show_entries stream=width,height,r_frame_rate,codec_name -of default=noprint_wrappers=1 videos/ayu_dx2_intro_video.mp4
   ```
   *Expected result:* `width=1920`, `height=1080`, `r_frame_rate=24/1`, `duration=5.226000`, `size=1789795`.

2. **Verify MD5 Matching of Showcase Video:**
   ```bash
   md5 -q videos/ground_view_video_with_360_view_of_the_video.mp4 public/showcase_video.mp4
   ```
   *Expected result:* Both return `c8ec494e42295367fcb3eda4af36a729`.

3. **Verify Aircraft Livery Marking:**
   Extract and inspect frame at 5 seconds from `videos/helipad_leading_video.mp4`:
   ```bash
   ffmpeg -y -ss 5 -i videos/helipad_leading_video.mp4 -vframes 1 /tmp/test_frame.jpg && view_file /tmp/test_frame.jpg
   ```
   *Expected result:* Wing decals read `DRAGALE AVIATION` and `AYU DX2`.

4. **Verify Specification File Citations:**
   - Inspect `src/app/products/ProductsClient.tsx` lines 38–137 for model dimensions (`13m x 14m x 3m`), cruising speed (`250 km/h`), range (`150 km`), and medical equipment list.
   - Inspect `src/utils/solutions.ts` lines 29–155 for the five operational pillars.
   - Inspect `src/content/blog/eVTOL-Air-Ambulance-vs-Helicopter-EMS-A-Mission-by-Mission-Comparison.mdx` lines 23–30 for OpEx (`$200–$400`) and acoustic profile (`<65 dBA`).
   - Inspect `src/content/blog/Why-Road-Ambulances-Alone-Cant-Solve-Indias-Emergency-Response-Crisis.mdx` lines 43–45 for the 60–70 min Jaipur-Delhi corridor.

5. **Invalidation Conditions:**
   - If `videos/` contains additional video files not listed in Section 1.1.
   - If the visual markings on `helipad_leading_video.mp4` do not display `AYU DX2`.
   - If `src/app/products/ProductsClient.tsx` contains specifications differing from the quoted values.
