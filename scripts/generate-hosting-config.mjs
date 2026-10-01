/**
 * Generates vercel.json (and the copy Vite ships inside dist/) from the app's
 * own data, so the routing rules can never drift out of sync with the code.
 *
 * ── WHY THIS IS GENERATED AND NOT HAND-WRITTEN ──
 * Two kinds of URL have to 301 to a canonical location page:
 *
 *   1. Keyword prefixes — /education-loan-in-mumbai, /student-visa-consultants-in-pune.
 *      A fixed list, mirroring ALIAS_PREFIXES in src/lib/locationSeo.ts.
 *
 *   2. Former place names — /study-abroad-consultants-in-bangalore must reach
 *      the Bengaluru page. That list comes from PLACE_ALIASES in
 *      src/data/locations.ts and grows whenever a new alias is added. Hand-
 *      copying it into a JSON file is how a redirect silently goes missing.
 *
 * Both were previously handled only by the React router, which means the
 * browser loads an empty SPA shell, runs JavaScript, and then navigates. A
 * crawler that does not execute JavaScript sees a 200 with no content, and the
 * shell's canonical still points at the homepage at that instant. A real 301
 * from the edge avoids all of it.
 *
 * ── WHY TWO OUTPUT FILES ──
 * Vercel reads vercel.json from the root of whatever is uploaded. A Git deploy
 * uploads the repo, so it needs vercel.json at the repo root. A drag-and-drop
 * deploy uploads dist/, so it needs one there too — and Vite only copies files
 * it finds in public/. Writing both is the only way both deploy styles work.
 *
 * Deliberately NO buildCommand or outputDirectory in the generated file: the
 * same JSON ends up inside dist/, and build settings in an already-built folder
 * make Vercel try to build it again. Set those in the Vercel dashboard.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const CANONICAL_PREFIX = "study-abroad-consultants-in";

/** Must mirror ALIAS_PREFIXES in src/lib/locationSeo.ts, minus the canonical one. */
const ALIAS_PREFIXES = [
  "study-abroad-consultancy-in",
  "study-abroad-consultant-in",
  "overseas-education-consultants-in",
  "overseas-education-consultant-in",
  "abroad-education-consultants-in",
  "education-loan-in",
  "student-visa-consultants-in",
  "study-abroad-in",
];

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** Parse PLACE_ALIASES out of src/data/locations.ts — one source of truth. */
function readAliasSlugs() {
  const file = join(ROOT, "src", "data", "locations.ts");
  const text = readFileSync(file, "utf8");

  const block = text.match(/export const PLACE_ALIASES[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (!block) throw new Error("PLACE_ALIASES not found in src/data/locations.ts");

  const aliases = new Map();
  for (const m of block[1].matchAll(/^\s*"?([a-z0-9-]+)"?:\s*\[([^\]]*)\],/gm)) {
    aliases.set(m[1], [...m[2].matchAll(/"([^"]+)"/g)].map((x) => x[1]));
  }

  // A slug that is itself a canonical place must never be remapped: "aurangabad"
  // is its own page and appears in PLACE_ALIASES only so the old NAME reaches
  // the page copy.
  const out = [];
  for (const [canonical, names] of aliases) {
    for (const name of names) {
      const slug = slugify(name);
      if (slug && slug !== canonical && !aliases.has(slug)) {
        out.push({ from: slug, to: canonical });
      }
    }
  }
  return out;
}

const aliasSlugs = readAliasSlugs();

const redirects = [
  // The previous URL structure. These are in the already-published sitemap.
  { source: "/locations/:slug", destination: "/:slug", permanent: true },

  // Keyword-prefix spellings. One rule each, any place.
  ...ALIAS_PREFIXES.map((prefix) => ({
    source: `/${prefix}-:slug`,
    destination: `/${CANONICAL_PREFIX}-:slug`,
    permanent: true,
  })),

  // Former place names, under the canonical prefix and bare.
  // /study-abroad-consultants-in-bangalore  and  /bangalore  →  Bengaluru's page.
  ...aliasSlugs.flatMap(({ from, to }) => [
    {
      source: `/${CANONICAL_PREFIX}-${from}`,
      destination: `/${CANONICAL_PREFIX}-${to}`,
      permanent: true,
    },
    { source: `/${from}`, destination: `/${CANONICAL_PREFIX}-${to}`, permanent: true },
  ]),
];

const cache = (value) => [{ key: "Cache-Control", value }];
const IMMUTABLE = "public, max-age=31536000, immutable";
const WEEK = "public, max-age=604800";
const HOUR = "public, max-age=3600";

const headers = [
  // Vite fingerprints everything in /assets/, so a change produces a new
  // filename and these can be cached forever. Vercel's default for plain static
  // output is max-age=0, must-revalidate — a round trip on every page view.
  { source: "/assets/(.*)", headers: cache(IMMUTABLE) },
  { source: "/og/(.*)", headers: cache(WEEK) },
  { source: "/logo.png", headers: cache(WEEK) },
  { source: "/og-image.jpg", headers: cache(WEEK) },
  { source: "/apple-touch-icon.png", headers: cache(WEEK) },
  { source: "/favicon.ico", headers: cache(WEEK) },
  { source: "/favicon.png", headers: cache(WEEK) },
  {
    source: "/sitemap.xml",
    headers: [...cache(HOUR), { key: "Content-Type", value: "application/xml; charset=utf-8" }],
  },
  { source: "/robots.txt", headers: cache(HOUR) },
  {
    source: "/(.*)",
    headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=(), payment=()" },
    ],
  },
];

const config = {
  $schema: "https://openapi.vercel.sh/vercel.json",
  cleanUrls: true,
  trailingSlash: false,
  redirects,
  headers,
  // Applied only when no static file matches, so the prerendered
  // /study-abroad-consultants-in-mumbai/index.html still wins.
  rewrites: [{ source: "/(.*)", destination: "/index.html" }],
};

const json = JSON.stringify(config, null, 2) + "\n";
const targets = [join(ROOT, "vercel.json"), join(ROOT, "public", "vercel.json")];

for (const target of targets) {
  if (!existsSync(dirname(target))) continue;
  writeFileSync(target, json, "utf8");
}

/* ─────────────────────────────────────────────────────────────────────────────
 * public/_redirects — Netlify
 *
 * Netlify placeholders match a WHOLE path segment, so the keyword-prefix rules
 * (/education-loan-in-:slug) cannot be expressed here the way they are in
 * vercel.json. Enumerating them would mean 8 prefixes × 513 places, so on
 * Netlify those URLs stay with the client-side router in App.tsx — a slower
 * redirect, but the same destination.
 *
 * The former-name rules ARE literal paths, so they work fine and are written
 * out in full: those are the URLs most likely to be typed or linked.
 * ─────────────────────────────────────────────────────────────────────────── */
const netlify = [
  "# GENERATED by scripts/generate-hosting-config.mjs — do not edit by hand.",
  "# Source of truth: PLACE_ALIASES in src/data/locations.ts.",
  "",
  "# ─── Legacy location URLs ─────────────────────────────────────────────────",
  "# Location pages moved from /locations/<slug> to /<slug> at the site root.",
  "# Those URLs are in the previously published sitemap, so they get a real 301.",
  "/locations/*    /:splat    301!",
  "",
  "# ─── Former place names ───────────────────────────────────────────────────",
  "# Renaming a city did not move its search volume. One indexable URL per",
  "# place; the old name redirects to it.",
  ...aliasSlugs.flatMap(({ from, to }) => [
    `/${CANONICAL_PREFIX}-${from}    /${CANONICAL_PREFIX}-${to}    301!`,
    `/${from}    /${CANONICAL_PREFIX}-${to}    301!`,
  ]),
  "",
  "# ─── Keyword-prefix spellings ─────────────────────────────────────────────",
  "# /education-loan-in-mumbai and the rest are handled by the router in",
  "# App.tsx on Netlify — see the note in this file's generator. On Vercel they",
  "# are real edge 301s.",
  "",
  "# ─── SPA fallback ─────────────────────────────────────────────────────────",
  "# No \"!\" here on purpose. Netlify serves a real file when one exists and",
  "# only falls through to this rule when nothing matches, so the prerendered",
  "# /study-abroad-consultants-in-mumbai/index.html wins. Adding \"!\" would",
  "# force every prerendered page to be replaced by the homepage shell.",
  "/*    /index.html   200",
  "",
].join("\n");

const redirectsFile = join(ROOT, "public", "_redirects");
if (existsSync(dirname(redirectsFile))) {
  writeFileSync(redirectsFile, netlify, "utf8");
}

const VERCEL_REDIRECT_LIMIT = 1024;
if (redirects.length > VERCEL_REDIRECT_LIMIT) {
  console.warn(
    `hosting config: ${redirects.length} redirects exceeds Vercel's limit of ${VERCEL_REDIRECT_LIMIT}. ` +
      `Move the former-name rules to a rewrite with a lookup instead.`
  );
}

console.log(
  `hosting config: wrote vercel.json, public/vercel.json and public/_redirects — ` +
    `${redirects.length} Vercel redirects (${ALIAS_PREFIXES.length} keyword prefixes, ` +
    `${aliasSlugs.length} former place names), ${headers.length} header rules`
);
