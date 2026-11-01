# IDEA SPRINT 2026 // IEDC BOOTCAMP CEC

> **Official Event Microsite for IDEA SPRINT 2026** — A premier 24-hour student ideathon hosted by **IEDC BOOTCAMP CEC** (Innovation and Entrepreneurship Development Centre, College of Engineering Chengannur).

[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-000000?style=flat-square)](https://github.com/darkroomengineering/lenis)
[![License: MIT](https://img.shields.io/badge/License-MIT-FF5500?style=flat-square&logoColor=white)](./LICENSE)

---

## Overview

**IDEA SPRINT 2026** is an intensive 24-hour student ideathon engineered to challenge multidisciplinary undergraduate teams to transform hypotheses and raw concepts into viable, defensible venture prototypes.

This repository contains the production-ready frontend microsite architecture. Built with an adaptive industrial-tech aesthetic, the platform features high-contrast typography, subtle technical grid overlays, international safety orange (`#FF5500`), solar amber (`#F59E0B`), electric cyan (`#38BDF8`), and emerald accents, hardware-accelerated smooth scrolling, and complete modular section decoupling.

---

## Architecture & Directory Layout

The codebase enforces strict modularity and separation of concerns. Every major section is self-contained with its own folder, subcomponents, and barrel export:

```
src/
├── assets/                  # Static media, icons, and branding assets
│   ├── fonts/
│   ├── images/
│   └── logos/
│
├── components/
│   ├── common/              # Universal shared components
│   │   ├── Button.tsx       # Polymorphic button/anchor with variants & loading state
│   │   ├── Container.tsx    # Responsive grid container with optional tech borders
│   │   ├── Preloader.tsx    # Minimalist cinematic launch sequence with WebGL MagicRings & Idea2026
│   │   └── SectionHeading.tsx # High-contrast editorial headers with mono tags
│   │
│   ├── layout/              # Structural layout components
│   │   ├── Navbar.tsx       # Responsive header, mobile drawer, CTA, smooth navigation
│   │   ├── Footer.tsx       # Organizer identity, campus info, socials, quick links
│   │   └── PageLayout.tsx   # Root layout with a11y skip-links and ambient grid
│   │
│   └── ui/                  # Atom-level primitives
│       ├── Badge.tsx        # Technical status badges and pills
│       ├── Card.tsx         # Dark surface card with optional corner crosshairs
│       └── MagicRings/      # React Bits WebGL2 concentric energy rings shader component
│
├── sections/                # Independent, self-contained event sections
│   ├── Hero/
│   │   ├── Hero.tsx         # Event title, IEDC identity, CTAs, centerpiece container
│   │   ├── Countdown.tsx    # Standby-aware timer (handles unannounced dates gracefully)
│   │   └── index.ts
│   │
│   ├── About/
│   │   ├── About.tsx        # Mission intel, purpose/vision, 4 sprint pillars
│   │   └── index.ts
│   │
│   ├── Schedule/
│   │   ├── Schedule.tsx     # Day 1 & Day 2 switcher, provisional schedule notice
│   │   ├── ScheduleDay.tsx  # Timeline node hierarchy with expandable item details
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
│   └── index.ts
│
├── hooks/
│   ├── useCountdown.ts      # Pure countdown hook with unannounced date standby mode
│   └── useSmoothScroll.ts   # Lenis smooth-scroller with prefers-reduced-motion fallback
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
│   └── globals.css          # Tailwind v4 theme, design tokens, technical grid patterns
│
├── App.tsx                  # Root application composition & preloader mount
└── main.tsx                 # React 19 StrictMode entrypoint
```

---

## Key Website Features

### 1. Standby-Aware Countdown
- Controlled by `EVENT_CONFIG.isDateAnnounced` in [`src/config/event.ts`](./src/config/event.ts).
- When dates are pending announcement, the component avoids displaying fabricated numbers and renders a clean **"DATE TBA // SPRINT TIMER STANDBY"** status (`-- D : -- H : -- M : -- S`).
- Once a target ISO date string is supplied, the 1-second interval timer synchronizes automatically.

### 2. IDEA FORGE: Interactive Ideation Lab
- Interactive ideation workbench for prospective squads.
- Allows filtering by domain (`CleanTech & Energy`, `Healthcare & Assistive`, `AI & Machine Learning`, `Fintech & Open Commerce`).
- Interactive **"Roll New Seed"** button dynamically presents problem vectors, target cohorts, and real-world implementation constraints.

### 3. Application Terminal (Registration)
- Accessible form architecture with semantic `<label for="...">` associations, `aria-invalid`, and `aria-describedby` error handling.
- Validates team leader credentials, squad size (2–4 members), department, study year, track, and rules agreement.
- Displays an instant confirmation receipt card upon valid submission.

### 4. Interactive Schedule
- Tabbed interface between **Day 01** and **Day 02**.
- Data-driven timeline with category-coded badges (`ceremony`, `hacking`, `mentoring`, `pitch`).
- Expandable nodes displaying venue locations and milestone guidelines.

### 5. Architectural Centerpiece Slot
- Dedicated visual container reserved in the Hero section for future custom WebGL 3D canvas or shader implementations in Stage 2.

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
| `--color-background` | `#0C0D0E` | Deep matte carbon primary canvas |
| `--color-surface` | `#131518` | Elevated card & panel surface layer |
| `--color-surface-subtle` | `#191C21` | Secondary surface hover state |
| `--color-accent` | `#FF5500` | International safety orange brand accent |
| `--color-accent-amber` | `#F59E0B` | Solar amber milestone & prize accent |
| `--color-accent-cyan` | `#38BDF8` | Technical cyan architecture accent |
| `--color-accent-emerald` | `#10B981` | Verification & live admittance accent |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.07)` | Controlled 1px borders |
| `--font-sans` | `Plus Jakarta Sans` | Primary editorial body copy |
| `--font-display` | `Space Grotesk` | High-impact headings |
| `--font-mono` | `JetBrains Mono` | Numbers, tags, timestamps, code |

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
| `npm run dev` | Starts the Vite local development server with HMR |
| `npm run build` | Runs strict TypeScript verification (`tsc -b`) and builds production assets |
| `npm run lint` | Runs ultra-fast code quality checks with `oxlint` |
| `npm run preview` | Locally serves the production build for smoke testing |

---

## Accessibility & Performance Standards

- **Color Scheme**: Native `<meta name="color-scheme" content="dark">` eliminates white-flash FOUC on browser canvas initialization.
- **Keyboard Navigation**: Comprehensive `:focus-visible` outlines on all interactive buttons, tabs, inputs, and anchors.
- **Screen Reader Support**: Skip-to-content bypass link (`#main-content`), ARIA live regions for form state transitions, and accessible landmark elements (`<header>`, `<main>`, `<footer>`, `<nav>`).
- **Reduced Motion**: Automatically honors user OS preferences by disabling Lenis smooth scroll and dampening CSS transitions via `@media (prefers-reduced-motion: reduce)`.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

Developed with pride for **IEDC BOOTCAMP CEC** (College of Engineering Chengannur).
