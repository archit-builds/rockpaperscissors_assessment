# RPS.studio — Employee Dashboard

A minimalist, professional Employee Dashboard built for the Junior Frontend Developer take-home assignment. Covers attendance tracking, leave management, a searchable team directory, and company announcements with an AI-powered summarizer.

## Setup

**Requirements:** Node.js 20+

```bash
npm install
cp .env.example .env      # then add your Groq API key
npm run dev               # http://localhost:5173
```

To regenerate the mock data fixtures (optional — already committed):

```bash
npm run generate-mock-data
```

### Environment variables

| Variable            | Description                                                                                                                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_GROQ_API_KEY` | API key for [Groq](https://console.groq.com/keys), used by the AI announcement summarizer (`llama-3.3-70b-versatile`). The app runs fine without it — the summarizer button will show a graceful "unavailable" state instead of crashing. |

### Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server                 |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run oxlint                           |

## Tech Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite** — build tool
- **Tailwind CSS v4** — CSS-first config via `@theme` in `src/index.css`, no `tailwind.config.js` needed
- **Zustand** — client/UI state (theme, sidebar, directory filters)
- **TanStack Query** — server-state (fetching, caching, loading/error states, mutations)
- **React Hook Form + Zod** — leave request form and validation
- **react-day-picker** — calendar date selection
- **Recharts** — attendance trend chart
- **Groq API** (`llama-3.3-70b-versatile`) — AI announcement summarizer
- **react-hot-toast** — notifications
- **lucide-react** — icons

## Architecture

```
src/
  api/            Mock "backend" — simulates network latency + occasional
                  failures on top of static JSON fixtures, so the app has to
                  handle real async state instead of importing JSON directly.
  hooks/          TanStack Query wrappers + business-logic hooks (debounce, etc.)
  store/          Zustand stores — client-only UI state, never server data.
  components/     Grouped by feature (attendance/, leave/, directory/,
                  announcements/) plus common/ (Button, Card, Modal, Input…)
                  and layout/ (Sidebar, Topbar).
  pages/          One page component per route, composed from the above.
  lib/            Utilities: date formatting, the Groq client, validation
                  schemas, classnames helper.
  types/          Shared TypeScript interfaces.
```

**Why this split:** `api/` never leaks into components directly — everything
goes through a `hooks/` wrapper using TanStack Query, so loading/error/cache
behavior is consistent everywhere. Zustand is intentionally kept to
UI-only state; putting server data in it would create two sources of truth.

## AI Feature — Announcement Summarizer

Each announcement has a "Summarize with AI" button (plus a "Summarize all"
bulk action) that calls Groq's `llama-3.3-70b-versatile` model to produce a
1–2 sentence summary, preserving dates/deadlines/amounts exactly. Summaries
are cached per-announcement for the session so the same card is never
re-summarized, and a failed call shows an inline "unavailable" message
instead of breaking the page.

**Trade-off / production note:** the Groq API is called directly from the
browser here, which is fine for a take-home but exposes the API key
client-side. In a real deployment this call should be proxied through a
lightweight backend endpoint that holds the key server-side.

## AI Tools Used

- Claude (Anthropic) was used as a coding assistant to scaffold and build
  this application.
- Groq's `llama-3.3-70b-versatile` model powers the in-app AI announcement
  summarizer feature.

## Assumptions

- The logged-in user is hardcoded (Archit Srivastava, `emp-01`) — there's no auth flow.
- Leave balances (Sick: 10, Casual: 8, Earned: 15) are fixed annual allotments;
  "used" days are derived from approved leave requests in the mock data.
- The mock API is in-memory only — submitted leave requests persist for the
  browser session but reset on a full reload, since there's no real backend.
- Attendance, leave, and announcement data is deterministically generated
  (see `scripts/generate-mock-data.mjs`) rather than hand-written, to get
  realistic volume (18 employees × 30 days of attendance, etc.)

## Trade-offs

- Chose **Zustand over Redux** — the app's client state surface (theme,
  sidebar, filters) is small enough that Redux's boilerplate wasn't justified.
- Chose a **mock API layer with simulated latency/failure** over a real
  backend, to stay in scope for a 2–3 day assignment while still forcing
  proper async UI handling (loading skeletons, error states, retries).
- **Avatar images** are generated from initials + a color rather than fetched
  from a placeholder image service, to keep the UI consistent and avoid
  external network dependency/broken images.
- **Route-level code-splitting** (`React.lazy`) is used to keep the initial
  bundle small; this was added once the bundle-size warning showed up during
  the build, rather than prematurely optimizing.


## Deployment

Deploy to [Vercel](https://vercel.com):

```bash
npm i -g vercel
vercel
```

Add `VITE_GROQ_API_KEY` as an environment variable in the Vercel project
settings — never commit it to the repository.
