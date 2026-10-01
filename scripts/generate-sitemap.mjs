/**
 * Generates public/sitemap.xml from the app's actual routes.
 *
 * Runs automatically before every build (see the "prebuild" script in
 * package.json), so the sitemap can never drift out of date.
 *
 * Rule: only canonical URLs go in. Anything that merely redirects
 * (e.g. /countries/uk → /study-in-uk) is deliberately excluded.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const DOMAIN = "https://www.dreamdestinationstudyabroad.com";

/** Must mirror src/lib/countryUrl.ts */
const CUSTOM_PAGE_SLUGS = [
  "uk", "canada", "usa", "australia", "new-zealand", "ireland", "france",
  "germany", "dubai", "switzerland", "malaysia", "mauritius", "italy",
  "singapore", "netherlands", "india", "spain", "russia", "china", "japan",
];
const SLUG_ALIASES = { uae: "dubai" };

const SERVICE_ROUTES = [
  "/career-counselling",
  "/admission-guidance",
  "/financial-assistance",
  "/scholarship-assistance",
  "/visa-assistance",
  "/student-accommodation",
  "/test-preparations",
  "/travel-forex-assistance",
  "/insurance-assistance",
];

// /terms-of-service was renamed to /terms-and-conditions and 301s there.
// A sitemap must list only the destination, never the redirect.
const LEGAL_ROUTES = ["/privacy-policy", "/terms-and-conditions", "/disclaimer", "/cookie-policy"];

/**
 * Standalone pages that are not services, countries or locations.
 *
 * These were missing from the sitemap entirely — /about and /contact render
 * real pages and are linked from the header, but Google was only ever finding
 * them by crawling. /about in particular carries the E-E-A-T signals (who runs
 * this business, what it does) that a study-abroad site is judged on.
 */
const CORE_ROUTES = ["/about", "/contact"];

/**
 * Content pages that will grow over time.
 *
 * /blogs and /reviews are listed even while they are empty, deliberately: they
 * are linked from the header, the footer and the homepage hub, so Google will
 * find them anyway, and having them in the sitemap from day one means the crawl
 * is already established when the first real post or review goes up.
 *
 * changefreq is weekly because that is the intended publishing rhythm. Individual
 * blog posts get added here when /blogs/:slug is built — do not add that route
 * until posts exist, or the sitemap advertises pages that render nothing.
 */
const CONTENT_ROUTES = ["/blogs", "/reviews"];

/**
 * Location pages. Only pages the quality gate marks indexable go in the
 * sitemap — a sitemap full of URLs that carry <meta name="robots" content="noindex">
 * is a contradiction Search Console reports as an error.
 * Read straight out of src/lib/locationSeo.ts rather than copied here. A
 * hand-copied constant is how the sitemap ends up listing pages that carry
 * noindex — a contradiction Search Console reports as an error, and one that
 * nobody notices because both files look correct on their own.
 */
const INDEX_TIER_THRESHOLD = (() => {
  const src = readFileSync(resolve(ROOT, "src/lib/locationSeo.ts"), "utf8");
  const m = src.match(/INDEX_TIER_THRESHOLD\s*:\s*1\s*\|\s*2\s*\|\s*3\s*=\s*([123])/);
  if (!m) throw new Error("INDEX_TIER_THRESHOLD not found in src/lib/locationSeo.ts");
  return Number(m[1]);
})();

function readLocations() {
  const src = readFileSync(resolve(ROOT, "src/data/locations.ts"), "utf8");
  const stateSlugs = [...src.matchAll(/^\s{2}\{\n\s{4}slug:\s*"([a-z0-9-]+)"/gm)].map(m => m[1]);
  const cities = [...src.matchAll(/\{\s*slug:\s*"([a-z0-9-]+)",\s*name:\s*"[^"]*",\s*tier:\s*(\d)/g)]
    .map(m => ({ slug: m[1], tier: Number(m[2]) }));
  return { stateSlugs, cities };
}

/** Pull country slugs straight out of the data file so the two never disagree. */
function readCountrySlugs() {
  const src = readFileSync(resolve(ROOT, "src/data/countryData.ts"), "utf8");
  const slugs = [...src.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map(m => m[1]);
  if (slugs.length === 0) throw new Error("No country slugs found in countryData.ts");
  return [...new Set(slugs)];
}

function countryUrl(slug) {
  const resolved = SLUG_ALIASES[slug] ?? slug;
  return CUSTOM_PAGE_SLUGS.includes(resolved) ? `/study-in-${resolved}` : `/countries/${slug}`;
}

function build() {
  const today = new Date().toISOString().slice(0, 10);
  const slugs = readCountrySlugs();

  /** @type {{path: string, priority: string, changefreq: string}[]} */
  const entries = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/countries", priority: "0.9", changefreq: "weekly" },
    ...SERVICE_ROUTES.map(path => ({ path, priority: "0.9", changefreq: "monthly" })),
    ...slugs.map(slug => ({ path: countryUrl(slug), priority: "0.8", changefreq: "monthly" })),
    ...CONTENT_ROUTES.map(path => ({ path, priority: "0.8", changefreq: "weekly" })),
    ...CORE_ROUTES.map(path => ({ path, priority: "0.7", changefreq: "monthly" })),
    ...LEGAL_ROUTES.map(path => ({ path, priority: "0.3", changefreq: "yearly" })),
  ];

  // Location pages
  const { stateSlugs, cities } = readLocations();
  const stateSet = new Set(stateSlugs);
  entries.push({ path: "/locations", priority: "0.7", changefreq: "monthly" });
  for (const slug of stateSlugs) {
    entries.push({ path: `/study-abroad-consultants-in-${slug}`, priority: "0.6", changefreq: "monthly" });
  }
  let skipped = 0;
  for (const city of cities) {
    // A slug that is also a state resolves to the state page — don't list it twice.
    if (stateSet.has(city.slug)) continue;
    if (city.tier > INDEX_TIER_THRESHOLD) { skipped++; continue; }
    entries.push({ path: `/study-abroad-consultants-in-${city.slug}`, priority: "0.5", changefreq: "monthly" });
  }
  if (skipped) {
    console.log(`sitemap: ${skipped} tier-3 city page(s) excluded by the indexing quality gate`);
  }

  // De-duplicate: aliased slugs (uae → dubai) can resolve to the same URL.
  const seen = new Set();
  const unique = entries.filter(e => !seen.has(e.path) && seen.add(e.path));

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    unique
      .map(
        e =>
          `  <url>\n` +
          `    <loc>${DOMAIN}${e.path}</loc>\n` +
          `    <lastmod>${today}</lastmod>\n` +
          `    <changefreq>${e.changefreq}</changefreq>\n` +
          `    <priority>${e.priority}</priority>\n` +
          `  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`;

  writeFileSync(resolve(ROOT, "public/sitemap.xml"), xml, "utf8");
  console.log(`sitemap.xml written — ${unique.length} URLs`);
}

build();
