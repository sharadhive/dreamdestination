/**
 * Route and SEO verification.
 *
 *   npm run verify          — checks data → URLs → sitemap consistency
 *   npm run build           — then `npm run verify` also checks the built HTML
 *
 * What it catches:
 *   • a location in the dataset with no URL in the sitemap (and vice versa)
 *   • an indexable page missing from the sitemap
 *   • a noindex page wrongly listed in the sitemap
 *   • a prerendered page missing from dist/
 *   • DUPLICATE <title> across pages
 *   • DUPLICATE or wrong <link rel="canonical">
 *   • a page whose canonical does not match its own URL
 *
 * Exit code 1 on any error, so it can gate a deploy.
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = join(ROOT, "dist");
const DOMAIN = "https://www.dreamdestinationstudyabroad.com";

/** Mirrors src/lib/locationSeo.ts */
const CANONICAL_PREFIX = "study-abroad-consultants-in";
const INDEX_TIER_THRESHOLD = 2;
const locationUrl = slug => `/locations/${CANONICAL_PREFIX}-${slug}`;

const errors = [];
const warnings = [];
const ok = [];

const fail = m => errors.push(m);
const warn = m => warnings.push(m);
const pass = m => ok.push(m);

/* ─── 1. Read the dataset ─── */

function readLocations() {
  const file = resolve(ROOT, "src/data/locations.ts");
  if (!existsSync(file)) throw new Error("src/data/locations.ts not found");
  const src = readFileSync(file, "utf8");

  const states = [...src.matchAll(/slug:\s*"([a-z0-9-]+)",\s*\n\s*name:\s*"([^"]*)",\s*\n\s*capital:/g)]
    .map(m => ({ slug: m[1], name: m[2] }));

  const cities = [...src.matchAll(
    /\{\s*slug:\s*"([a-z0-9-]+)",\s*name:\s*"([^"]*)",\s*tier:\s*(\d),\s*stateSlug:\s*"([a-z0-9-]+)"/g
  )].map(m => ({ slug: m[1], name: m[2], tier: Number(m[3]), stateSlug: m[4] }));

  if (!states.length) throw new Error("No states parsed from locations.ts — has its shape changed?");
  if (!cities.length) throw new Error("No cities parsed from locations.ts — has its shape changed?");
  return { states, cities };
}

/* ─── 2. Sitemap ─── */

function readSitemap() {
  const file = resolve(ROOT, "public/sitemap.xml");
  if (!existsSync(file)) throw new Error("public/sitemap.xml not found — run `npm run sitemap`");
  const xml = readFileSync(file, "utf8");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const dupes = urls.filter((u, i) => urls.indexOf(u) !== i);
  if (dupes.length) fail(`sitemap contains duplicate URLs: ${[...new Set(dupes)].join(", ")}`);
  return new Set(urls.map(u => u.replace(DOMAIN, "") || "/"));
}

/* ─── 3. Built HTML ─── */

function readBuilt(path) {
  const file = path === "/" ? join(DIST, "index.html") : join(DIST, path.replace(/^\//, ""), "index.html");
  if (!existsSync(file)) return null;
  const html = readFileSync(file, "utf8");
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? null;
  const canonicals = [...html.matchAll(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/gi)].map(m => m[1]);
  const robots = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i)?.[1] ?? null;
  return { file, title, canonicals, robots };
}

/* ─── Main ─── */

function main() {
  const { states, cities } = readLocations();
  const sitemap = readSitemap();
  const distExists = existsSync(join(DIST, "index.html"));

  console.log(`Dataset: ${states.length} states/UTs, ${cities.length} cities`);
  console.log(`Sitemap: ${sitemap.size} URLs`);
  console.log(distExists ? "dist/ found — checking built HTML too\n" : "dist/ not built — skipping HTML checks (run `npm run build` first)\n");

  const expected = [];
  for (const s of states) expected.push({ url: locationUrl(s.slug), name: s.name, indexable: true, kind: "state" });
  const stateSlugs = new Set(states.map(s => s.slug));
  for (const c of cities) {
    if (stateSlugs.has(c.slug)) continue; // resolves to the state page
    expected.push({ url: locationUrl(c.slug), name: c.name, indexable: c.tier <= INDEX_TIER_THRESHOLD, kind: "city" });
  }

  // Sitemap membership
  for (const e of expected) {
    const inSitemap = sitemap.has(e.url);
    if (e.indexable && !inSitemap) fail(`${e.name}: indexable but missing from sitemap (${e.url})`);
    if (!e.indexable && inSitemap) fail(`${e.name}: noindex but present in sitemap (${e.url})`);
  }
  pass(`${expected.filter(e => e.indexable).length} indexable location URLs checked against the sitemap`);

  // Built HTML: existence, uniqueness, canonical correctness
  if (distExists) {
    const titles = new Map();
    const canonicals = new Map();
    let built = 0;

    const allPaths = [...sitemap];
    for (const path of allPaths) {
      const page = readBuilt(path);
      if (!page) { fail(`${path}: in the sitemap but not prerendered into dist/`); continue; }
      built++;

      if (!page.title) fail(`${path}: no <title>`);
      else {
        if (titles.has(page.title)) fail(`DUPLICATE TITLE — "${page.title}"\n    ${titles.get(page.title)}\n    ${path}`);
        else titles.set(page.title, path);
      }

      if (page.canonicals.length === 0) fail(`${path}: no canonical link`);
      else if (page.canonicals.length > 1) fail(`${path}: ${page.canonicals.length} canonical links (must be exactly 1)`);
      else {
        const c = page.canonicals[0];
        const want = `${DOMAIN}${path === "/" ? "/" : path}`;
        if (c !== want) fail(`${path}: canonical points at ${c} (expected ${want})`);
        if (canonicals.has(c)) fail(`DUPLICATE CANONICAL — ${c}\n    ${canonicals.get(c)}\n    ${path}`);
        else canonicals.set(c, path);
      }

      if (page.robots?.includes("noindex")) warn(`${path}: in the sitemap but its HTML says noindex`);
    }
    pass(`${built} built pages checked for unique titles and correct canonicals`);
  }

  // Report
  console.log("─".repeat(64));
  for (const m of ok) console.log(`  OK    ${m}`);
  for (const m of warnings) console.log(`  WARN  ${m}`);
  for (const m of errors) console.log(`  ERROR ${m}`);
  console.log("─".repeat(64));

  if (errors.length) {
    console.error(`\n${errors.length} error(s). Fix these before deploying.`);
    process.exit(1);
  }
  console.log(`\nAll checks passed${warnings.length ? ` (${warnings.length} warning(s))` : ""}.`);
}

main();
