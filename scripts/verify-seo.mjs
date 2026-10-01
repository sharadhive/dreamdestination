/**
 * verify-seo.mjs — does the built site actually contain anything?
 *
 * Run:  npm run verify:seo
 *
 * ── WHY THIS EXISTS ──
 * A Vite build "succeeds" whether or not the prerender step managed to bake page
 * content into the HTML. When it silently fails, every file in dist/ still looks
 * healthy: correct <title>, correct description, correct canonical, valid
 * JSON-LD — and a completely empty <div id="root"></div> underneath.
 *
 * That site works perfectly for humans and is invisible to machines. Googlebot
 * has to queue it for JavaScript rendering, which across hundreds of pages
 * usually settles on "Crawled – currently not indexed". Crawlers that run no
 * JavaScript at all — GPTBot, ClaudeBot, PerplexityBot — see the title and a
 * blank page, so the site cannot appear in AI answers.
 *
 * It is the most expensive possible failure precisely because nothing looks
 * broken. This script makes it visible in one command, and returns a non-zero
 * exit code so CI can refuse to ship it.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(resolve(__dirname, ".."), "dist");

/** Below this many characters of body text, a page is not worth indexing. */
const MIN_CHARS = 500;
/** How many of the worst offenders to name individually. */
const SHOW = 15;

if (!existsSync(DIST)) {
  console.error("dist/ not found — run `npm run build` first.");
  process.exit(1);
}

/** Every index.html under dist/, including the root one. */
function findPages(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "assets" || entry === "og") continue;
      findPages(full, out);
    } else if (entry === "index.html") {
      out.push(full);
    }
  }
  return out;
}

/** The text a crawler that runs no JavaScript would actually read. */
function visibleText(html) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return (body ? body[1] : "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const pages = findPages(DIST);
if (!pages.length) {
  console.error("No index.html files found under dist/.");
  process.exit(1);
}

const rows = pages.map(file => {
  const html = readFileSync(file, "utf8");
  const route = "/" + file.slice(DIST.length + 1).replace(/[\\/]?index\.html$/, "").replace(/\\/g, "/");
  return {
    route: route === "/" ? "/" : route,
    chars: visibleText(html).length,
    h1: (html.match(/<h1[\s>]/gi) || []).length,
    title: /<title>(.*?)<\/title>/is.test(html),
    desc: /<meta\s+name="description"/i.test(html),
    canonical: /<link\s+rel="canonical"/i.test(html),
    jsonLd: (html.match(/application\/ld\+json/g) || []).length,
  };
});

const empty = rows.filter(r => r.chars < MIN_CHARS);
const noH1 = rows.filter(r => r.h1 === 0);
const pct = n => ((n / rows.length) * 100).toFixed(1) + "%";

console.log("\n══════════════════════════════════════════════════════════════");
console.log("  BUILT SITE — WHAT A CRAWLER ACTUALLY RECEIVES");
console.log("══════════════════════════════════════════════════════════════\n");
console.log(`  Pages in dist/            ${rows.length}`);
console.log(`  With <title>              ${rows.filter(r => r.title).length}`);
console.log(`  With meta description     ${rows.filter(r => r.desc).length}`);
console.log(`  With canonical            ${rows.filter(r => r.canonical).length}`);
console.log(`  With JSON-LD              ${rows.filter(r => r.jsonLd > 0).length}`);
console.log(`  With an <h1>              ${rows.length - noH1.length}`);
console.log(`  With real body text       ${rows.length - empty.length}  (${pct(rows.length - empty.length)})`);
console.log(`  EMPTY (< ${MIN_CHARS} chars)       ${empty.length}  (${pct(empty.length)})`);

const withText = rows.filter(r => r.chars >= MIN_CHARS);
if (withText.length) {
  const avg = Math.round(withText.reduce((a, r) => a + r.chars, 0) / withText.length);
  console.log(`  Average text on those     ${avg.toLocaleString()} chars`);
}

if (empty.length) {
  console.log(`\n  Empty pages (first ${Math.min(SHOW, empty.length)}):`);
  for (const r of empty.slice(0, SHOW)) {
    console.log(`    ${String(r.chars).padStart(6)} chars  ${r.route}`);
  }
  if (empty.length > SHOW) console.log(`    ...and ${empty.length - SHOW} more`);

  console.log(
    "\n  ──────────────────────────────────────────────────────────\n" +
    "  These pages have metadata but no content. Humans see them\n" +
    "  fine — React renders in the browser. Crawlers do not:\n\n" +
    "    Googlebot     queues them for JS rendering; at this volume\n" +
    "                  that usually ends as\n" +
    "                  \"Crawled - currently not indexed\".\n" +
    "    GPTBot,       run no JavaScript at all. They receive the\n" +
    "    ClaudeBot,    title and a blank page, so the site cannot\n" +
    "    PerplexityBot appear in AI answers.\n\n" +
    "  Fix: run  npm run prerender:full  and read its output. It\n" +
    "  reports the exact reason it could not bake content in\n" +
    "  (puppeteer missing, Chrome failing to launch, page errors).\n" +
    "  ──────────────────────────────────────────────────────────\n"
  );
  process.exit(1);
}

console.log("\n  All pages carry real content. Safe to deploy.\n");
process.exit(0);
