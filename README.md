# Bridge — Academia–Industry Collaboration Portal

Frontend starter for the hackathon problem statement: a portal connecting
students, industry, academicians, and institutions across skill development,
internships, and placements.

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS + React Router + Zustand + Recharts

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build
npm run preview   # serve the production build locally
```

Then open the printed local URL. From the landing page, click any role card
(or go to `/login`) to enter a mocked dashboard — there's no real backend yet,
auth is a Zustand store persisted to `localStorage` so you stay logged in
across refreshes.

## Architecture

```
src/
  app/                    reserved for app-level providers as the app grows
  components/
    ui/                   design-system primitives (Button, Card, Badge, Field, ProgressBar, StatCard)
    layout/                SiteHeader/Footer (public pages) + Sidebar/Topbar/DashboardShell (app shell)
    marketing/             landing-page-only visual pieces (e.g. PathwayDiagram)
  features/                one folder per domain capability, each owning its own data + components
    auth/
    skill-assessment/      questionnaire, scoring logic, results chart
    internships/           listings + match-score calculation
    placements/            job openings
    learning-programs/     recommended courses/workshops
    portfolio/             verified student portfolio items
    dashboard/
      academician/         FDP / training / consultancy / research opportunities
      institution/         analytics (demand trend, placement funnel, department readiness)
  pages/                   route-level components, grouped by role (student/industry/academician/institution)
  store/                   Zustand stores (authStore, skillProfileStore)
  types/domain.ts          shared TypeScript models for the whole app
  config/roles.ts          per-role nav items, labels, taglines — the single source of truth for role UI
  lib/cn.ts                className merge helper
  styles/index.css         Tailwind layers + base styles
```

**Why feature-based?** Each pillar from the problem statement (skill
development, internships, placements, academic collaboration) is a self-contained
folder with its own mock data and components. When you're ready to connect a
real backend, each `features/*/data/*.ts` file is the one place to swap a
hardcoded array for an API call — the pages and components don't need to change.

## Design system

Tokens live in `tailwind.config.js`:
- **Colors** — `ink` (text), `paper` (backgrounds), `teal` (growth/skills accent),
  `gold` (opportunity/industry accent), `rose` (gaps/alerts)
- **Type** — IBM Plex Serif for headlines (`font-display`), IBM Plex Sans for UI (`font-sans`)
- **Surfaces** — mostly flat, hairline-bordered cards rather than heavy drop shadows

## Routing & auth model

- `/` — public landing page
- `/login` — mock role picker (no password, this is a prototype)
- `/app/student/*`, `/app/industry/*`, `/app/academician/*`, `/app/institution/*` —
  role-gated dashboards. `RequireRole` (in `components/layout/DashboardShell.tsx`)
  redirects to `/login` if signed out, or to the correct role's dashboard if
  signed in as a different role.

## What's mocked and where to plug in a real backend next

| Area | Currently | Replace with |
|---|---|---|
| Auth | `store/authStore.ts`, instant "login" | Real auth endpoint / JWT / session |
| Skill assessment | `features/skill-assessment/data/scoring.ts`, client-side scoring | Server-side scoring endpoint |
| Internships / Jobs | Static arrays in `features/internships/data`, `features/placements/data` | `GET /internships`, `GET /jobs`, `POST /applications` |
| Postings form | Appends to local React state only | `POST /internships` (industry role) |
| Analytics | Static arrays in `features/dashboard/institution/analytics.ts` | Aggregation endpoints per institution |

## Suggested next screens to build

- Application tracking detail view (per internship/job, with status timeline)
- Institution → per-department drill-down and CSV export
- Notifications (new match, application status change)
- Document upload for resumes/certificates (Secure document management)
