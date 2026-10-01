# DreamDestination

The website for DreamDestination — a study abroad consultancy helping Indian
students with career counselling, university admissions, education loans,
scholarships, student visas and accommodation.

Live at **https://www.dreamdestinationstudyabroad.com**

## Running it locally

Requires Node 20 or later.

```
npm install
npm run dev          # http://localhost:8080
```

## Building

```
npm run build
```

`npm run build` runs three steps in order, and all three matter:

| Step | Script | What it does |
|------|--------|--------------|
| `prebuild` | `scripts/generate-sitemap.mjs` | Regenerates `public/sitemap.xml` from the real route list |
| `build` | `vite build` | Compiles the app into `dist/` |
| `postbuild` | `scripts/prerender.mjs` | Writes one real HTML file per route, each with its own title, description, canonical and Open Graph tags |

Running `vite build` on its own skips the sitemap and leaves every page sharing
the homepage's meta tags, so always use `npm run build`.

```
npm run verify       # checks routes, sitemap, duplicate titles and canonicals
```

See [DEPLOY.md](./DEPLOY.md) for deployment and domain setup.

## How the site is put together

**Stack:** Vite 5, React 18, TypeScript, Tailwind CSS, shadcn/ui,
React Router 6, Three.js for the hero globe.

It is a single-page app that builds to plain static files — no server, no
database — so the same `dist/` folder deploys unchanged to Netlify, Vercel or
ordinary Apache hosting.

### The files that control the important behaviour

```
src/config/site.ts             Brand, phone, email, address, social links
src/lib/countryUrl.ts          Single source of truth for country page URLs
src/lib/locationSeo.ts         Location URLs, keywords and the indexing gate
src/data/locations.ts          States and cities behind the location pages
src/data/countryData.ts        Country dataset behind /countries
src/components/SEOHead.tsx     Per-page title, canonical, Open Graph, JSON-LD
scripts/generate-sitemap.mjs   Sitemap generator
scripts/prerender.mjs          Per-route HTML and meta tag generator
scripts/verify-routes.mjs      Route, sitemap, title and canonical verification
public/_redirects              Netlify routing
public/.htaccess               Apache routing, canonical host, cache headers
netlify.toml                   Netlify build settings and headers
```

### Two conventions worth knowing before you edit

**Contact details are never hardcoded.** Everything reads from
`src/config/site.ts`, and unverified values (`emailVerified`, `addressVerified`)
hide the field rather than printing a placeholder. Changing the phone number is
a one-line edit there, not a find-and-replace.

**Canonical URLs are normalised.** Pages declare a `canonicalUrl` and
`SEOHead` rewrites it onto the live domain, so a stale host in a page's SEO
block cannot leak into the served canonical tag. The prerenderer does the same
independently.

### Location pages and the indexing gate

Cities carry a `tier` in `src/data/locations.ts`. `INDEX_TIER_THRESHOLD` in
`src/lib/locationSeo.ts` decides which tiers are indexable and which are
rendered for visitors but kept out of the index and the sitemap. Tier 3 is
excluded by default: those pages exist and work, but they stay out of the index
until they carry genuinely local content rather than templated text. Lowering
that bar without adding real per-page substance is how a site ends up with a few
hundred pages sitting in "Crawled — currently not indexed".
