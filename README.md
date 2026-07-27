# Bundle Builder — Wyze Security System

> **🚀 Live Demo**: (https://wyze-bundle-builder-git-main-mahetabhafezs-projects.vercel.app/)
> **🧪 Tested with**: Vitest (Run `npm run test` to execute unit tests)


A two-column, data-driven bundle builder: a 4-step accordion on the left, a
live review panel on the right. React + Vite on the frontend, no UI
framework (plain CSS with a small token system); a small Express API as
the optional backend.

## Run it

### Frontend only (no backend needed)

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`). This works
standalone — product data comes from `src/data/products.js`.

```bash
npm run build     # production build to dist/
npm run preview   # serve that build locally
```

### With the backend (bonus)

```bash
cd server
npm install
npm start          # http://localhost:4000
```

Then, in the project root, copy `.env.example` to `.env` (already points at
`http://localhost:4000`) and restart `npm run dev`. On load, the app fetches
`GET /api/catalog` from the server and uses that instead of the bundled
local data. If the server isn't running, or the fetch fails for any reason,
the app silently falls back to the local data — there's no broken state
either way.

Requires Node 18+ for both.

## About the Figma file

I never had authenticated access to the linked Figma file — it's behind
Figma's login wall. The build was done against screenshots shared over the
course of the conversation (mobile + two desktop frames, plus a couple of
zoomed-in crops of the review panel and product cards). Product names,
badges, seed quantities, the indigo/violet accent, the dark badge pills,
the review panel's stacked pricing, the scalloped guarantee seal, and the
icon set were all reconstructed from those screenshots and refined over
several rounds of feedback. A few exact cent values weren't fully legible
at screenshot zoom, so those are my best reconstruction to match the
visible "Save X%" badges and panel totals rather than confirmed exact
figures — worth a final pass against Figma Dev Mode if you get access.

## Structure

src/
  data/products.js       — the source data (steps, products, seed state, copy)
  lib/
    catalog.js             — the live data store the app actually reads from;
                              starts as the local module, optionally
                              overwritten by the backend before first render
    selections.js          — pure helpers: totals, grouping, quantity math
  components/
    StepSection.jsx         — one accordion step (header + product grid + Next)
    ProductCard.jsx          — badge, image, variant chips, stepper, pricing
    VariantSelector.jsx      — color chip row (renders actual <img> swatches)
    QuantityStepper.jsx      — shared +/- control (cards + review lines)
    ReviewPanel.jsx          — grouped summary, totals, checkout, save link
    Icons.jsx
  App.jsx                  — top-level state, persistence, layout
  main.jsx                 — resolves the catalog, *then* mounts <App/>

server/
  index.js                — Express API (GET /api/catalog, /api/steps,
                             /api/products/:stepId)
  data/catalog.json        — same data as src/data/products.js, as JSON
```

`src/data/products.js` is the single source of truth for the bundled
(no-backend) experience; `server/data/catalog.json` mirrors it for the API.
Nothing in the components has per-product markup — everything renders from
whichever catalog `src/lib/catalog.js` ends up holding.

## How the optional backend wires in

This was the part worth being careful about: swapping the data source
can't require a loading spinner or break the "app loads looking exactly
like the design" requirement.

`src/lib/catalog.js` exports a single mutable `catalog` object, seeded from
the static `products.js` import. `main.jsx` calls `loadCatalog()` — which
tries `fetch(`${VITE_API_URL}/api/catalog`)` and, on success, overwrites
the fields on that object — and only calls `ReactDOM.createRoot(...).render()`
*after* that promise settles (success or failure). So there's exactly one
render, and by the time any component reads `catalog.STEPS` /
`catalog.PRODUCTS` / etc., the data is already final. No components ever
see a loading state, and none of them talk to `fetch` directly — they just
read `catalog` at render time.

One deliberate detail: catalog fields are read *inside* component
functions/hooks (e.g. `const { STEPS } = catalog` inside `App()`), never
destructured at module scope. Module-scope destructuring would capture
whatever `catalog.STEPS` pointed to at import time — which, because static
imports evaluate before the `loadCatalog()` promise resolves, would always
be the stale local data even when the backend responds successfully. Reading
`catalog.X` at call time (after the app has mounted, which only happens
post-bootstrap) is what makes this actually work.

## Key decisions

- **Selection model**: `selections` is `{ [productId]: { [variantId]: qty } }`.
  Products without color options use a fixed `'_'` key so the same shape
  works everywhere (cards, review lines, totals) without special-casing.
- **Active variant vs. stored quantity are separate.** `activeVariants`
  tracks which color chip is "on" for each card; `selections` holds every
  variant's own count independently. Switching the chip only changes what
  the card's stepper displays — it never touches another variant's count.
- **The review panel is derived, not stored.** It's rebuilt each render from
  `selections` (`buildReviewLines`), so it can never drift out of sync with
  the cards — same data, two views.
- **"Required" item / disabled stepper**: the Wyze Sense Hub is bundled in
  free and locked at qty 1 (matches its "(Required)" label in the design) —
  a concrete instance of the disabled-stepper state called for in the brief.
- **Save for later** writes the full state (`selections`, `activeVariants`,
  open step) to `localStorage` only when the link is clicked — not on every
  keystroke — so "configure → save → leave → return" is an explicit,
  predictable action rather than silent autosave. On load, a saved state
  (if present) replaces the seed data and a small banner confirms it was
  restored.
- **Card prices vs. review-panel prices use different colors** (warm
  red-orange on cards, brand purple in the review panel) — a deliberate
  contextual distinction visible in the design, not an inconsistency.
- **Backend is additive, not required.** The frontend's default behavior
  (no `.env`, no server running) is byte-for-byte what it was before the
  backend existed — the fetch is opt-in via `VITE_API_URL` and fails silently.

## Responsiveness

Two-column desktop layout collapses to a single stacked column at `960px`.
The product grid is a fixed 2 columns on desktop (with a lone trailing
odd-count card centered under the grid, not stretched full-width), dropping
to 1 column at `420px`. The card footer (price + stepper) stacks vertically
on the smallest screens so nothing gets cramped. The accordion's open/close
uses a CSS `grid-template-rows: 0fr → 1fr` transition for a smooth height
animation without JS measuring.

##What I didn't finish / would do with more time
1-Checkout Flow: Checkout is currently a stub alert (window.alert), as scoped in the brief. Integrating a real payment gateway (like Stripe) would be the next step for a production e-commerce flow.

2-Backend Persistence: The backend reads catalog.json once at boot and serves it read-only. Since persistence is explicitly scoped to client-side localStorage in the brief, there's no write endpoint. If user systems need to be saved server-side, a POST /api/systems endpoint backed by a database would be added.

3-Automated Tests: Unit tests have been successfully implemented using Vitest (src/lib/selections.test.js) covering core selection logic and totals math. Future work could add integration tests for the Express backend routes.

4-CORS Configuration: CORS on the server is wide open (cors() with no origin allowlist) — fine for a local take-home demo, but should be restricted to the frontend's specific origin before production deployment.

5-Database Backend: Migrating the static catalog.json on the Express server to a lightweight database (like SQLite or MongoDB) for dynamic product management.
