/**
 * Post-build prerender.
 *
 * The app is a single-page application: React writes the page's <title> and
 * Open Graph tags at runtime. Google executes JavaScript so it copes, but
 * WhatsApp, LinkedIn, Facebook, X and most AI crawlers do NOT — they read the
 * raw HTML only. Without this step every shared link shows the homepage's
 * title, description and image regardless of which page was shared.
 *
 * This script writes one real HTML file per route into dist/, each carrying
 * that route's own metadata, while still booting the same SPA in the browser.
 * The output is plain static files, so it behaves identically on Vercel,
 * Netlify and cPanel/Apache.
 *
 * Route metadata is READ FROM THE SOURCE rather than duplicated here: every
 * page declares a `canonicalUrl`, which gives us the route, and a title and
 * description alongside it. Change a page's SEO block and this picks it up.
 *
 * Run: node scripts/prerender.mjs   (wired to "postbuild" in package.json)
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = join(ROOT, "dist");
const SRC = join(ROOT, "src");

const DOMAIN = "https://www.dreamdestinationstudyabroad.com";
const SITE_NAME = "DreamDestination";
const DEFAULT_OG_IMAGE = `${DOMAIN}/og-image.jpg`;

/** Per-page branded social card, when one exists in public/og/. */
function ogImageFor(route) {
  const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
  const file = join(ROOT, "public", "og", `${slug}.jpg`);
  return existsSync(file) ? `${DOMAIN}/og/${slug}.jpg` : DEFAULT_OG_IMAGE;
}

/* ── Routes whose metadata isn't declared as a plain string literal ── */
const OVERRIDES = {
  "/": null, // homepage keeps the metadata already in index.html
  /* Was 82 characters of title and 186 of description — Google cut both off
     mid-sentence, so the part that made someone click was never shown. */
  "/countries": {
    title: "Study Abroad Countries for Indian Students",
    description:
      "Compare study destinations — USA, UK, Canada, Australia, Germany and more. Universities, costs, education loans, scholarships and student visa guidance.",
  },
  "/privacy-policy": {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `How ${SITE_NAME} collects, uses, stores and protects the personal information of students who use our study abroad services.`,
  },
  /* Renamed from /terms-of-service, which now 301s here. The old key was left
     behind after the rename, so this route silently fell back to the HOMEPAGE
     title and description — six URLs sharing one set of tags. */
  "/terms-and-conditions": {
    title: `Terms and Conditions | ${SITE_NAME}`,
    description: `The terms that apply when you use the ${SITE_NAME} website and our study abroad advisory services, including what we do and do not promise.`,
  },
  "/about": {
    title: `About ${SITE_NAME} | Study Abroad Consultants in India`,
    description: `Who we are and how we work: one counsellor for course choice, admissions, education loans, scholarships and the student visa. We take no commission from any lender.`,
  },
  "/contact": {
    title: `Contact ${SITE_NAME} | Free Student Consultation`,
    description: `Talk to a counsellor about studying abroad or in India — shortlisting, admissions, education loans, scholarships and student visas. The first consultation is free.`,
  },
  "/blogs": {
    title: `Study Abroad Blog | Loan, Visa & Admission Guides`,
    description: `Practical guides for Indian students on education loans, student visas, university admissions, scholarships and choosing where to study.`,
  },
  "/reviews": {
    title: `Student Reviews & Video Stories | ${SITE_NAME}`,
    description: `Where we publish reviews and video stories from the students we work with, covering admissions, education loans, scholarships and student visas.`,
  },
  "/disclaimer": {
    title: `Disclaimer | ${SITE_NAME}`,
    description: `Important information about the accuracy and limits of the study abroad guidance published on the ${SITE_NAME} website.`,
  },
  "/cookie-policy": {
    title: `Cookie Policy | ${SITE_NAME}`,
    description: `How ${SITE_NAME} uses cookies and similar technologies on its website, and how you can control them.`,
  },
};

/* ── Helpers ── */

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(entry)) out.push(full);
  }
  return out;
}

const unescape = s => s.replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, " ").trim();

/** Find `key: "value"` nearest to a position, searching a window around it. */
function findNear(text, index, keys, window = 2500) {
  const start = Math.max(0, index - window);
  const slice = text.slice(start, index + window);
  for (const key of keys) {
    const re = new RegExp(`\\b${key}\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`);
    const m = slice.match(re);
    if (m) return unescape(m[1]);
  }
  return null;
}

/**
 * Build route → { title, description } by scanning every source file for
 * canonicalUrl string literals.
 */
function collectRouteMeta() {
  const map = new Map();
  const files = walk(SRC);

  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const re = /canonicalUrl\s*:\s*"((?:[^"\\]|\\.)*)"/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      const raw = unescape(m[1]);
      let path;
      try {
        path = /^https?:\/\//i.test(raw) ? new URL(raw).pathname : raw;
      } catch {
        continue;
      }
      if (!path.startsWith("/")) path = `/${path}`;
      if (path.length > 1) path = path.replace(/\/+$/, "");

      const title = findNear(text, m.index, ["title"]);
      const description = findNear(text, m.index, ["description", "metaDescription"]);
      if (title && description && !map.has(path)) {
        map.set(path, { title, description });
      }
    }
  }

  for (const [path, meta] of Object.entries(OVERRIDES)) {
    if (meta && path.startsWith("/")) map.set(path, meta);
  }
  return map;
}

/**
 * Country routes are generated from data rather than declared page-by-page,
 * so build their metadata from countryData.ts when a page has no SEO block.
 */
function countryFallbacks() {
  const file = join(SRC, "data", "countryData.ts");
  if (!existsSync(file)) return new Map();
  const text = readFileSync(file, "utf8");

  // Country entries declare `slug` immediately followed by `name`.
  const re = /slug:\s*"([a-z0-9-]+)"\s*,\s*\n\s*name:\s*"((?:[^"\\]|\\.)*)"/g;
  const map = new Map();
  let m;
  while ((m = re.exec(text)) !== null) {
    const slug = m[1];
    const name = unescape(m[2]);
    map.set(slug, {
      title: `Study in ${name} for Indian Students | ${SITE_NAME}`,
      description: `Study in ${name} — universities, courses, tuition fees, scholarships, education loans, student visa requirements and career guidance for Indian students.`,
    });
  }
  return map;
}

/**
 * Location pages are generated from src/data/locations.ts, not declared
 * page-by-page, so build their metadata the same way LocationPage does.
 */
function locationFallbacks() {
  const file = join(SRC, "data", "locations.ts");
  if (!existsSync(file)) return new Map();
  const text = readFileSync(file, "utf8");
  const map = new Map();

  /*
   * MUST MIRROR cityMeta / stateMeta IN src/lib/locationSeo.ts, BYTE FOR BYTE.
   *
   * These strings land in the prerendered HTML, which is what a crawler that
   * does not run JavaScript reads. The React app then writes its own version
   * on hydration. If the two disagree, Google indexes one title and users see
   * another — and the drift is silent, because both halves look fine on their
   * own. If you change a title or description in locationSeo.ts, change it
   * here in the same commit.
   */
  const aliasMap = new Map();
  const aliasBlock = text.match(/export const PLACE_ALIASES[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (aliasBlock) {
    for (const a of aliasBlock[1].matchAll(/^\s*"?([a-z0-9-]+)"?:\s*\[([^\]]*)\],/gm)) {
      aliasMap.set(a[1], [...a[2].matchAll(/"([^"]+)"/g)].map(x => x[1]));
    }
  }
  const alsoKnown = slug => {
    const a = aliasMap.get(slug);
    return a && a.length ? ` Also searched as ${a.join(" or ")}.` : "";
  };

  // States: `slug` then `name` then `capital`
  for (const m of text.matchAll(/slug:\s*"([a-z0-9-]+)",\s*\n\s*name:\s*"([^"]*)",\s*\n\s*capital:/g)) {
    const [, slug, name] = m;
    map.set(`/study-abroad-consultants-in-${slug}`, {
      title: `Study Abroad Consultants in ${name} | Education Loan Help`,
      description: `Study abroad guidance for students across ${name}.${alsoKnown(slug)} Course and university choice, education loans for abroad and India, visas and scholarships.`,
    });
  }

  // Cities: inline `{ slug, name, tier, stateSlug, stateName }`
  for (const m of text.matchAll(/\{\s*slug:\s*"([a-z0-9-]+)",\s*name:\s*"([^"]*)",\s*tier:\s*\d,\s*stateSlug:\s*"[a-z0-9-]+",\s*stateName:\s*"([^"]*)"/g)) {
    const [, slug, name, stateName] = m;
    const route = `/study-abroad-consultants-in-${slug}`;
    if (map.has(route)) continue; // a state of the same slug wins
    map.set(route, {
      title: `Study Abroad Consultants in ${name} | Education Loan Help`,
      description: `Study abroad consultants in ${name}, ${stateName}.${alsoKnown(slug)} Free counselling, education loans for abroad and India, visas, scholarships, admissions.`,
    });
  }

  map.set("/locations", {
    title: `Study Abroad Consultants Across India | ${SITE_NAME}`,
    description: "Find study abroad guidance, education loan support and student visa assistance for your state and city across India.",
  });

  return map;
}

/** Routes to emit, taken from the sitemap so the two can never disagree. */
function readSitemapRoutes() {
  const file = join(ROOT, "public", "sitemap.xml");
  if (!existsSync(file)) {
    throw new Error("public/sitemap.xml missing — run scripts/generate-sitemap.mjs first");
  }
  const xml = readFileSync(file, "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(m => m[1].replace(DOMAIN, "") || "/")
    .map(p => (p.length > 1 ? p.replace(/\/+$/, "") : "/"));
}

const escapeHtml = s =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function injectMeta(html, { title, description, url, image }) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);

  let out = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${t}</title>`);

  const setMeta = (attr, key, value) => {
    const re = new RegExp(`(<meta\\s+${attr}=["']${key}["']\\s+content=["'])[\\s\\S]*?(["']\\s*/?>)`, "i");
    if (re.test(out)) {
      out = out.replace(re, `$1${value}$2`);
    } else {
      out = out.replace(/<\/head>/i, `    <meta ${attr}="${key}" content="${value}" />\n  </head>`);
    }
  };

  setMeta("name", "description", d);
  setMeta("property", "og:title", t);
  setMeta("property", "og:description", d);
  setMeta("property", "og:url", url);
  setMeta("property", "og:image", image);
  setMeta("property", "og:image:width", "1200");
  setMeta("property", "og:image:height", "630");
  setMeta("property", "og:image:alt", t);
  setMeta("name", "twitter:title", t);
  setMeta("name", "twitter:description", d);
  setMeta("name", "twitter:image", image);

  out = out.replace(
    /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
    `<link rel="canonical" href="${url}" />`
  );

  return out;
}

/* ── Main ── */

function main() {
  const indexPath = join(DIST, "index.html");
  if (!existsSync(indexPath)) {
    console.error("dist/index.html not found — run `vite build` first.");
    process.exit(1);
  }

  const shell = readFileSync(indexPath, "utf8");
  const meta = collectRouteMeta();
  const countries = countryFallbacks();
  const locations = locationFallbacks();
  const routes = readSitemapRoutes();

  let written = 0;
  let derived = 0;
  const missing = [];

  for (const route of routes) {
    if (route === "/") continue; // dist/index.html already covers it

    let entry = meta.get(route) ?? locations.get(route);

    if (!entry) {
      // Country routes: derive from countryData rather than giving up.
      const slug = route.match(/^\/study-in-([a-z0-9-]+)$/)?.[1] ?? route.match(/^\/countries\/([a-z0-9-]+)$/)?.[1];
      const alias = slug === "dubai" ? "uae" : slug;
      entry = (slug && (countries.get(slug) ?? countries.get(alias))) || null;
      if (entry) derived++;
    }

    if (!entry) {
      missing.push(route);
      continue;
    }

    const html = injectMeta(shell, {
      title: entry.title,
      description: entry.description,
      url: `${DOMAIN}${route}`,
      image: ogImageFor(route),
    });

    const dir = join(DIST, route.replace(/^\//, ""));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html, "utf8");
    written++;
  }

  console.log(`prerender: ${written} route(s) written to dist/` + (derived ? ` (${derived} country page(s) derived from countryData)` : ""));

  if (missing.length) {
    console.warn(
      `prerender: no metadata found for ${missing.length} route(s) — these will fall back to the homepage tags:\n  ` +
        missing.join("\n  ") +
        `\n  Fix: give the page an SEO block with title, description and canonicalUrl as plain strings, ` +
        `or add an entry to OVERRIDES in scripts/prerender.mjs.`
    );
  }
}

main();
