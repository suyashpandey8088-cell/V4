# THE ART OF CONTROL

An eight-chapter, scroll-driven Ducati Panigale V4 digital campaign concept. Built as a cinematic editorial experience rather than a dealership or product-listing page.

**Independent, unofficial, non-commercial concept.** Ducati, Panigale and related imagery and trademarks remain the property of their respective owners. No affiliation or endorsement is implied.

## Experience

1. The Awakening — scroll-scrubbed studio-view transition and kinetic opening type
2. Form Meets Function — full-bleed side-profile design study
3. Anatomy of a Beast — reversible two-dimensional component separation and reassembly
4. The Heart of Performance — engine detail, verified specifications and whole-bike transition
5. Aerodynamics in Motion — layered studio views and illustrative airflow
6. The Racing DNA — racing-derived engineering ideas without invented results
7. The Rider’s Command — keyboard/touch-accessible electronics explorer
8. The Final Reveal — three-view finale with official Ducati destinations

All major cinematic motion is tied to scroll progress with GSAP ScrollTrigger. There is no WebGL model or simulated 3D geometry. Native CSS sticky positioning is used for the three long-form secondary chapters.

## Stack

- React 19 + TypeScript + Vite
- GSAP + ScrollTrigger
- Locally hosted Fontsource fonts
- Playwright acceptance tests with Sparticuz Chromium
- Responsive WebP assets and a local SVG failure fallback

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Vite listens on `0.0.0.0:5173`.

```bash
npm run lint       # ESLint
npm run build      # TypeScript project build + optimized Vite output
npm run preview    # Serve the production build on port 4173
npm test           # Browser acceptance suite; starts Vite if needed
```

The Playwright configuration inflates the Chromium runtime libraries bundled by `@sparticuz/chromium`, so no system-wide browser installation is required. Test artifacts are written to `test-results/` and are not committed.

For desktop/mobile screenshot capture while the dev server is running:

```bash
node scripts/capture.mjs
```

Set `BASE_URL` to capture another local or deployed URL.

## Verification coverage

The acceptance suite covers:

- Eight chapters, loader completion and real document progress
- Five pinned sequences and release/reassembly behavior
- Forward and reverse scroll animation
- Chapter-menu navigation, Escape dismissal and optional sound
- Cockpit controls and official final CTA destinations
- Fresh touch-mobile and tablet viewports with overflow checks
- Critical-image failure and the accessible local fallback
- Reduced-motion rendering with all essential content and no pin spacers

The motion preference is read from `prefers-reduced-motion`. Reduced motion removes scroll-scrubbed/pinned sequences while keeping the content, official links and system explorer available. Sound is always initially off and requires a user gesture. Zoom and keyboard navigation are not disabled.

## Data and claims

Specifications are centralized in `src/data/motorcycleSpecifications.ts` and scoped to the **standard Ducati Panigale V4, MY2027, Ducati Red, UK–EU/GB dataset**. V4 S figures and gold-fork imagery are intentionally excluded.

Primary reference, checked during production:

- [Official Ducati Panigale V4 MY2027 model page](https://www.ducati.com/gb/en/bikes/panigale/panigale-v4-2027)
- [Official technical-specification destination](https://www.ducati.com/gb/en/bikes/panigale/panigale-v4-2027/insights?tab=Tech%20Specs)

The displayed `1.14 hp/kg` value is a transparent derivation from published `218 hp / 191 kg`, not a separately claimed Ducati figure. Electronics copy describes listed equipment, not live telemetry. No race results, lap times or CFD performance claims are presented.

The exploded view is explicitly labeled as a **2D component study** made from regions of one render; it is not an assembly guide or exact engineering model. Airflow lines are illustrative visual annotations, not validated CFD output.

## Asset provenance

Visual research began with Ducati’s official MY2027 model page. Matching standard-V4 studio frames were retrieved from search-indexed mirrors, including [SoyMotero’s MY2027 Panigale coverage](https://soymotero.net/motos/ducati/panigale-v4-2027), when direct CDN download was unavailable in the build environment. Local presentation derivatives include resizing, WebP conversion, detail crops and exterior-background alpha mattes.

Only consistent standard Panigale V4 visuals are used. Generic sportbikes, older Panigales, special editions and V4 S-specific imagery were rejected. Asset rights remain with their respective owners; this repository is a non-commercial design concept.

## Performance and deployment

The initial hero image is preloaded, the two primary hero views are eager-loaded, later assets are lazy-loaded, fonts are self-hosted, and GSAP is split into a separate production chunk. Smooth rendering and an LCP target of 2.5 seconds under suitable test conditions are goals, not universal guarantees; device, browser and network conditions affect results.

The project deploys as a standard Vite static application on Vercel (`npm run build`, output directory `dist`). No environment variables or backend services are required.
