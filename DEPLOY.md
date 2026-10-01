# Deploying dreamdestinationstudyabroad.com

The site is a Vite + React single-page app that **builds to plain static files**.
There is no server, no Node runtime and no database in production — so the same
`dist/` folder deploys unchanged to Vercel, Netlify or ordinary cPanel hosting.

```
npm install
npm run build      # runs prebuild → vite build → postbuild
```

`npm run build` runs three steps automatically:

| Step | Script | What it does |
|------|--------|--------------|
| `prebuild` | `scripts/generate-sitemap.mjs` | Regenerates `public/sitemap.xml` from the real route list |
| `build` | `vite build` | Compiles the app into `dist/` |
| `postbuild` | `scripts/prerender.mjs` | Writes one real HTML file per route into `dist/`, each with its own title, description, canonical and Open Graph tags |

The prerender step is what makes shared links work. Without it, a link to
`/study-in-uk` posted on WhatsApp or LinkedIn shows the **homepage's** title and
image, because those scrapers do not run JavaScript. After it, `dist/study-in-uk/index.html`
is a real file carrying the UK page's own metadata.

### Optional: full-content prerendering

`postbuild` bakes each route's **metadata** into its HTML. That fixes link
previews everywhere. It does not put the page **body** into the HTML — so
crawlers that do not run JavaScript still see an empty `<div id="root">`.

Google runs JavaScript and copes. GPTBot, PerplexityBot, ClaudeBot and most
other AI crawlers largely do not. If you want your content to appear in AI
answers, run the full prerender:

```
npm install --save-dev puppeteer     # one time, ~170MB
npm run build
npm run prerender:full
```

This opens each of the 132 routes in headless Chromium, waits for React to
render, and writes the full HTML back into `dist/`. It adds a few minutes, which
is why it is a separate command rather than part of `postbuild`.

If puppeteer is not installed the command exits cleanly and tells you so — your
build never breaks because of it.

### Verify before deploying

```
npm run verify
```

Checks all location pages against the sitemap, and every built page for
duplicate titles, duplicate canonicals and canonicals that disagree with their
own URL. Exits non-zero on failure, so it can gate a deploy.

---

Watch the build output for this warning:

```
prerender: no metadata found for N route(s)
```

It means a page has no `title` / `description` / `canonicalUrl` block the script can
find. Fix the page's SEO block or add the route to `OVERRIDES` in
`scripts/prerender.mjs` — do not ignore it, those pages lose their meta tags.

---

## Vercel (current host)

There are two ways to deploy to Vercel and they behave differently. Knowing
which one you are using matters.

### If the project is connected to Git (recommended)

Vercel clones the repo, runs the build itself and reads `vercel.json` from the
repo root. Nothing else to configure.

- Build command: `npm run build`
- Output directory: `dist`

This is the better setup: every push deploys, and the build is reproducible
rather than depending on one laptop.

### If you drag the `dist` folder onto Vercel ("Vercel Drop")

This works, but there is a trap. **Vercel reads `vercel.json` from the root of
whatever you upload.** The repo-root `vercel.json` is not inside `dist/`, so a
dropped folder arrives with no routing rules at all: the SPA fallback never
applies, and any URL without a matching file returns Vercel's own
`404: NOT_FOUND` page instead of the app.

That is why `public/vercel.json` exists. Vite copies everything in `public/`
into `dist/` at build time, so the dropped folder carries its own routing config
and behaves the same as a Git deploy. Do not delete it, and keep it identical to
the root `vercel.json`.

The routing itself:

```json
{
  "redirects": [{ "source": "/locations/:slug", "destination": "/:slug", "permanent": true }],
  "rewrites":  [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Vercel matches real files **before** applying rewrites, so
`/study-abroad-consultants-in-mumbai` serves the prerendered
`dist/study-abroad-consultants-in-mumbai/index.html`, and only genuinely
unknown paths fall through to the SPA shell.

### One thing drag-and-drop gets right

Because the build runs on your own machine, the full prerender step runs there
too — where Chrome is already installed and reliable. Hosted build environments
are the awkward place to run headless Chrome, not your laptop. So a locally
built `dist/` is, if anything, the *safer* way to get fully prerendered pages.

Check the build log for the `prerender:full` block before you upload. If it
reports healthy character counts per page, the folder you are about to drop
contains readable content for every crawler.

## Netlify

`public/_redirects` is copied into `dist/` at build time and does the same job:

```
/*    /index.html   200
```

- Build command: `npm run build`
- Publish directory: `dist`

## cPanel / Hostinger / any Apache host

1. Run `npm run build` locally.
2. Upload the **contents** of `dist/` into `public_html/` (not the `dist` folder itself).
3. `public/.htaccess` is included in the build output and handles three things:
   - forces `https://www.dreamdestinationstudyabroad.com`
   - serves real files and directories directly
   - sends anything else to `index.html` so deep links work on refresh

Requirements: `mod_rewrite` and `mod_headers` enabled. Both are standard on
cPanel hosting. If deep links 404 after upload, `mod_rewrite` is off — ask the
host to enable it.

> Apache serves `dist/admission-guidance/index.html` automatically because the
> `.htaccess` rules skip rewriting for real directories. Do not remove that
> condition, or every prerendered page will be replaced by the homepage.

---

## After any deploy — quick checks

1. Open `https://www.dreamdestinationstudyabroad.com/admission-guidance` directly in a new
   tab. It must load the page, not a 404.
2. Refresh it. Still fine.
3. Paste that URL into a WhatsApp chat with yourself. The preview must show the
   **Admission Guidance** title, not the homepage title.
4. `https://www.dreamdestinationstudyabroad.com/sitemap.xml` must load and list ~37 URLs.
5. Submit that sitemap in Google Search Console.

## Files that control all of this

```
vercel.json                    Vercel routing
public/_redirects              Netlify routing
public/.htaccess               Apache routing, canonical host, cache headers
public/web.config              Windows/IIS routing
public/robots.txt              Crawler rules + sitemap pointer
public/sitemap.xml             Generated — do not edit by hand
scripts/generate-sitemap.mjs   Sitemap generator
scripts/prerender.mjs          Per-route HTML + meta tag generator
scripts/prerender-full.mjs     Optional full-content prerender (needs puppeteer)
scripts/verify-routes.mjs      Route, sitemap, title and canonical verification
src/data/locations.ts          States and cities behind the location pages
src/lib/locationSeo.ts         Location URLs, keywords and the indexing gate
src/config/site.ts             Brand, phone, email, address, social links
src/lib/countryUrl.ts          Single source of truth for country page URLs
```
