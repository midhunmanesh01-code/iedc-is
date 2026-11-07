# IDEA SPRINT 2026 // IEDC BOOTCAMP CEC

> **Official Event Microsite for IDEA SPRINT 2026** — A premier 24-hour student ideathon hosted by **IEDC BOOTCAMP CEC** (Innovation and Entrepreneurship Development Centre, College of Engineering Chengannur).

[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-000000?style=flat-square)](https://github.com/darkroomengineering/lenis)
[![Motion](https://img.shields.io/badge/Motion-React_14-FF0055?style=flat-square)](https://motion.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-FFC928?style=flat-square&logoColor=black)](./LICENSE)

---

## Overview

**IDEA SPRINT 2026** is an intensive 24-hour student ideathon engineered to challenge multidisciplinary undergraduate engineering teams to transform hypotheses and raw concepts into viable, defensible venture prototypes.

This repository contains the production-ready frontend microsite architecture. Built around a signature **engineering blueprint drafting aesthetic**, the platform features:
- Precision blueprint grid backdrops and drafting line work.
- Strict technical palette: Drafting Navy (`#102b52` / `#0b1a30`), Amber Gold (`#ffc928`), and Electric Cyan (`#59d6e8`).
- Silky hardware-accelerated smooth scrolling powered by Lenis with zero Chromium scroll-anchor jitter.
- Custom precision drafting scroll ruler with interactive click-and-drag scrubbing.
- Interactive physics-driven tear ticket pass, live countdown timer, expandable 24-hour schedule, and idea forge sandbox.

---

## Architecture & Directory Layout

The codebase enforces strict modularity and separation of concerns. Every major section is self-contained with its own folder, subcomponents, and barrel export:

```
src/
├── assets/                  # Static media, vectors, fonts, and branding assets
│   ├── fonts/               # Local font fallbacks
│   ├── images/              # Event imagery
│   └── logos/               # Official IEDC brand marks (PNG & standalone SVG)
│       ├── iedc-logo-2.png
│       └── iedc-logo-2.svg  # High-fidelity standalone vector logo
│
├── components/
│   ├── common/              # Universal shared components
│   │   ├── Button.tsx       # Polymorphic button/anchor with variants & loading state
│   │   ├── Container.tsx    # Responsive grid container with optional tech borders
│   │   ├── Preloader.tsx    # Cinematic launch sequence with WebGL MagicRings & Idea2026
│   │   └── SectionHeading.tsx # High-contrast editorial headers with mono tags
│   │
│   ├── layout/              # Structural layout components
│   │   ├── Navbar.tsx       # Responsive header, morphing brand mark, drawer & smooth nav
│   │   ├── Footer.tsx       # Organizer identity, campus info, socials, quick links
│   │   ├── DraftingRuler.tsx # Precision metric drafting scroll ruler & live coordinate tracker
│   │   └── PageLayout.tsx   # Root layout with blueprint grid & a11y landmarks
│   │
│   └── ui/                  # Interactive UI primitives
│       ├── Badge.tsx        # Technical status badges and pills
│       ├── Card.tsx         # Dark surface card with optional corner crosshairs
│       ├── SplitText.tsx    # Word/character staggered typography reveal component
│       ├── TearTicket/      # Interactive physics-based canvas tear ticket pass
│       └── MagicRings/      # WebGL2 concentric energy rings shader component
│
├── sections/                # Independent, self-contained event sections
│   ├── Hero/
│   │   ├── Hero.tsx         # Event title, headline, CTAs, centerpiece container
│   │   ├── BlueprintSchematic.tsx # Industrial CAD blueprint overlay schematic
│   │   └── SprintReactor.tsx # Animated atom gyroscope centerpiece with glowing core
│   │
│   ├── Countdown/
│   │   └── CountdownSection.tsx # Digital timer with glowing gold colons & atmospheric bridge
│   │
│   ├── About/
│   │   ├── About.tsx        # Mission/Vision dual-tilt cards, stats counter, sprint pillars
│   │   └── index.ts         # Scroll-scrubbed timeline spine & sequential pillar entrance
│   │
│   ├── Schedule/
│   │   ├── Schedule.tsx     # 24H itinerary, Day 1 & Day 2 switcher, smooth collapsible accordion
│   │   └── index.ts
│   │
│   ├── Interactive/
│   │   ├── IdeaForge.tsx    # IDEA FORGE: domain filter & randomized sprint challenge seed generator
│   │   └── index.ts
│   │
│   ├── Registration/
│   │   ├── Registration.tsx # Application terminal & squad eligibility guidelines
│   │   ├── RegistrationForm.tsx # Client-side validation, error states & confirmation receipt
│   │   └── index.ts
│   │
│   ├── FAQ/
│   │   ├── FAQ.tsx          # Collapsible briefing cards & applicant FAQ terminal
│   │   └── index.ts
│   │
│   └── index.ts
│
├── hooks/
│   ├── useCountdown.ts      # Pure countdown hook with unannounced date standby mode
│   └── useSmoothScroll.ts   # Lenis smooth-scroller with lock, offset & numeric coord support
│
├── config/                  # Centralized event data & content (decoupled from UI)
│   ├── event.ts             # Central event metadata (dates, contacts, placeholders)
│   ├── navigation.ts        # Navigation links & brand tokens
│   └── schedule.ts          # Provisional Day 1 & Day 2 itinerary
│
├── types/                   # Strict TypeScript definitions
│   ├── event.ts             # Event metadata, form state, and error types
│   └── schedule.ts          # Schedule days, timeline items, and categories
│
├── styles/
│   └── globals.css          # Tailwind v4 theme, design tokens, hidden scrollbars, grid patterns
│
├── App.tsx                  # Root application composition & preloader mount
└── main.tsx                 # React 19 StrictMode entrypoint
```

---

## Key Website Features

### 1. Precision Drafting Scroll Ruler
- Anchored to the right edge (`fixed right-2 sm:right-3.5 top-1/2 -translate-y-1/2`), replacing conventional scrollbars with a custom **architectural metric drafting scale**.
- Features laser-etched minor, medium, and major tick intervals rendered via vector patterns.
- An amber-gold (`#ffc928`) datum needle tracks your exact viewport depth with fluid spring physics (`useSpring`).
- Live percentage badge (`Y: 042%`) slides out on hover or active scrubbing.
- Clicking or dragging anywhere along the ruler smoothly glides to that target scroll coordinate via Lenis.
- Native browser scrollbars are cleanly suppressed across Chromium, WebKit, and Firefox for an uninterrupted canvas experience.

### 2. Standby-Aware Countdown Section
- Seamlessly bridges the Hero and About sections with glowing cyan and gold atmospheric glows.
- Custom digital timer with vertically aligned, glowing amber colons (`:`) and pill status badge.
- When dates are pending announcement, the component avoids displaying fabricated numbers and renders a clean **"DATE TBA // SPRINT TIMER STANDBY"** status (`-- D : -- H : -- M : -- S`).
- Automatically synchronizes once a target ISO date string is supplied in [`src/config/event.ts`](./src/config/event.ts).

### 3. Sprint Pillars with Scroll Timeline
- Editorial vertical timeline featuring an animated, scroll-scrubbed glowing spine line connecting the milestone nodes.
- Each sprint pillar enters with a cinematic, scroll-triggered unblur & slide transition that reveals sequentially as the user scrolls into each step.
- Active checkpoint focus spotlight illuminates the active pillar node with a radiating radar pulse when in the reading focal sweet spot.

### 4. Zero-Shutter Collapsible Schedule
- Tabbed interface between **Day 01** and **Day 02**.
- Data-driven timeline with category-coded badges (`ceremony`, `hacking`, `mentoring`, `pitch`).
- Smooth accordion expansion powered by Framer Motion `AnimatePresence` with `overflow-anchor: none` to stop browser scroll-anchoring collisions with Lenis.
- Progressive section linking allows attendees to jump directly from Day 01 to Day 02 with a single click.

### 5. IDEA FORGE: Interactive Ideation Lab
- Interactive ideation workbench for prospective squads.
- Allows filtering by domain (`CleanTech & Energy`, `Healthcare & Assistive`, `AI & Machine Learning`, `Fintech & Open Commerce`).
- Interactive **"Roll New Seed"** button dynamically presents problem vectors, target cohorts, and real-world implementation constraints.

### 6. Interactive Registration Terminal & Tear Ticket Pass
- Physics-driven, tactile **Tear Ticket Pass** that attendees can drag and tear open interactively.
- Accessible form architecture with semantic `<label for="...">` associations, `aria-invalid`, and `aria-describedby` error handling.
- Validates team leader credentials, squad size (2–4 members), department, study year, track, and rules agreement.
- Displays an instant confirmation receipt card upon valid submission.

### 7. Official IEDC BOOTCAMP CEC Branding & Favicon
- Linked vector SVG favicon ([`public/favicon.svg`](./public/favicon.svg)) displaying the official IEDC mark centered on a dark squircle (`#081526`) with a cyan rim, ensuring crisp contrast on both light and dark browser tabs.
- Dedicated standalone SVG asset ([`src/assets/logos/iedc-logo-2.svg`](./src/assets/logos/iedc-logo-2.svg)).

---

## Centralized Event Configuration

All core event properties are managed centrally in [`src/config/event.ts`](./src/config/event.ts):

```typescript
export const EVENT_CONFIG: EventConfig = {
  name: 'IDEA SPRINT 2026',
  organizer: 'IEDC BOOTCAMP CEC',
  isDateAnnounced: false, // Set to true once the committee ratifies dates
  startDate: null,        // e.g. "2026-03-20T09:00:00+05:30"
  endDate: null,
  durationHours: 24,
  venue: 'College of Engineering Chengannur (CEC)',
  registrationStatus: 'upcoming',
  contact: {
    email: 'iedc@ceconline.edu',
    address: 'College of Engineering Chengannur, Alappuzha, Kerala - 689121',
  },
  // ...
}
```

---

## Design System Tokens

The styling foundation is defined using Tailwind CSS v4 design tokens in [`src/styles/globals.css`](./src/styles/globals.css):

| Token | Value | Role |
| :--- | :--- | :--- |
| `--color-background` | `#102b52` | Primary technical drafting navy canvas |
| `--color-surface` | `#163866` | Elevated card & panel surface layer |
| `--color-surface-subtle` | `#122f59` | Secondary surface hover state |
| `--color-accent` | `#ffc928` | Drafting gold / amber signature accent |
| `--color-accent-cyan` | `#59d6e8` | Electric technical cyan accent |
| `--color-accent-emerald` | `#10b981` | Live status & verification accent |
| `--color-border-subtle` | `rgba(89, 214, 232, 0.15)` | Controlled 1px blueprint borders |
| `--font-sans` | `Plus Jakarta Sans` | Primary editorial body copy |
| `--font-display` | `Space Grotesk` | High-impact headings |
| `--font-mono` | `JetBrains Mono` | Numbers, tags, timestamps, code |
| `--font-heading` | `Oswald` | High-contrast display tags |

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20.0.0 or higher recommended)
- `npm` (v10+ or v11+)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iedc-bootcamp-cec/iedc-is.git
   cd iedc-is
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server with HMR on `localhost:5173` |
| `npm run build` | Runs strict TypeScript verification (`tsc -b`) and builds production assets |
| `npm run lint` | Runs ultra-fast code quality checks with `oxlint` |
| `npm run preview` | Locally serves the production build for smoke testing |

---

## Accessibility & Performance Standards

- **Color Scheme**: Native `<meta name="color-scheme" content="dark">` eliminates white-flash FOUC on browser canvas initialization.
- **Scroll Stabilization**: `overflow-anchor: none` on scrollable containers prevents Chromium's native scroll-anchoring engine from firing conflicting layout shifts against Lenis.
- **Keyboard Navigation**: Comprehensive `:focus-visible` outlines on all interactive buttons, tabs, inputs, and anchors.
- **Screen Reader Support**: Skip-to-content bypass link (`#main-content`), ARIA live regions for form state transitions, and accessible landmark elements (`<header>`, `<main>`, `<footer>`, `<nav>`, `<aside>`).
- **Reduced Motion**: Automatically honors user OS preferences by disabling Lenis smooth scroll and dampening transitions via `@media (prefers-reduced-motion: reduce)`.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

Developed with pride for **IEDC BOOTCAMP CEC** (College of Engineering Chengannur).
