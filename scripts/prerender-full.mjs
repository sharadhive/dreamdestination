/**
 * Full-content prerender.
 *
 *   npm run prerender:full      (after `npm run build`)
 *
 * WHAT THIS DOES, AND WHY
 * scripts/prerender.mjs bakes each route's <title>, description and Open Graph
 * tags into its HTML. That fixes link previews and gives crawlers the right
 * metadata — but the <body> is still an empty <div id="root">.
 *
 * Google executes JavaScript, so it eventually sees the content. GPTBot,
 * PerplexityBot, ClaudeBot and most other AI crawlers largely do not. Neither
 * do some smaller search engines. To them, every page currently looks blank.
 *
 * This script opens each built route in headless Chromium, waits for React to
 * render, and writes the resulting HTML back into dist/. The page still boots
 * the same SPA in a real browser — the difference is only what a crawler sees
 * when it reads the raw file.
 *
 * DELIBERATE DESIGN CHOICES
 * • Puppeteer is an OPTIONAL dependency. If it isn't installed this exits
 *   cleanly rather than breaking your build, because `npm run build` must keep
 *   working on a machine without a 170MB Chromium download.
 * • This runs as a SEPARATE command, not in `postbuild`. It adds minutes to a
 *   build, and you don't want that on every deploy.
 * • The app still renders client-side on top of the prerendered markup. React's
 *   createRoot replaces the container contents, so there is no hydration
 *   mismatch risk — the tradeoff is that the prerendered HTML is for crawlers,
 *   not a performance optimisation for users.
 *
 * If your hosting runs this in CI, run it after the build and deploy dist/.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join, extname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = join(ROOT, "dist");
const DOMAIN = "https://www.dreamdestinationstudyabroad.com";
const PORT = 4178;

/** Give a page this long to finish rendering before moving on. */
const RENDER_TIMEOUT_MS = 20000;
/* Second-chance timeout. A handful of routes time out under load rather than
   because anything is wrong with them — four tabs racing the same local server
   is enough to push a heavy page past 20 seconds. Those get retried one at a
   time with this longer budget instead of shipping as empty pages. */
const RETRY_TIMEOUT_MS = 60000;
/** Render this many pages at once. Higher is faster but heavier on memory. */
const CONCURRENCY = 4;
/**
 * Analytics endpoints. Requests to these are blocked during prerendering and any
 * script element they injected is stripped before the HTML is written, so a
 * build never pollutes GA4 or Clarity with fake traffic and never bakes a
 * runtime-injected tag into a static file.
 */
const ANALYTICS_HOSTS = [
  "googletagmanager.com",
  "google-analytics.com",
  "analytics.google.com",
  "clarity.ms",
  "connect.facebook.net",
  "facebook.com/tr",
];

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp",
  ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2",
  ".xml": "application/xml", ".txt": "text/plain",
};

/* ─── A minimal static server with SPA fallback, so no dev dependency is needed ─── */
function serveDist() {
  return new Promise(resolvePromise => {
    const server = createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const candidates = [
        join(DIST, urlPath),
        join(DIST, urlPath, "index.html"),
        join(DIST, "index.html"), // SPA fallback
      ];
      for (const file of candidates) {
        if (!file.startsWith(DIST)) continue; // no path traversal
        if (existsSync(file) && statSync(file).isFile()) {
          res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
          res.end(readFileSync(file));
          return;
        }
      }
      res.writeHead(404).end("Not found");
    });
    server.listen(PORT, () => resolvePromise(server));
  });
}

/* ─── Routes come from the sitemap, plus whatever prerender.mjs already wrote ─── */
function readRoutes() {
  const file = join(ROOT, "public", "sitemap.xml");
  if (!existsSync(file)) throw new Error("public/sitemap.xml missing — run `npm run build` first");
  const xml = readFileSync(file, "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(m => m[1].replace(DOMAIN, "") || "/")
    .map(p => (p.length > 1 ? p.replace(/\/+$/, "") : "/"));
}

function outputPath(route) {
  return route === "/" ? join(DIST, "index.html") : join(DIST, route.replace(/^\//, ""), "index.html");
}

async function loadPuppeteer() {
  try {
    const mod = await import("puppeteer");
    return mod.default ?? mod;
  } catch {
    return null;
  }
}

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("dist/index.html not found — run `npm run build` first.");
    process.exit(1);
  }

  const puppeteer = await loadPuppeteer();
  if (!puppeteer) {
    console.log(
      "prerender:full — puppeteer is not installed, so page content was not prerendered.\n" +
      "  Your pages still have correct titles, descriptions and Open Graph tags from\n" +
      "  the standard prerender step, so link previews work. What is missing is the\n" +
      "  page BODY for crawlers that do not run JavaScript (most AI crawlers).\n\n" +
      "  To enable:  npm install --save-dev puppeteer\n" +
      "  Then:       npm run build && npm run prerender:full\n"
    );
    process.exit(0);
  }

  const routes = readRoutes();
  const server = await serveDist();
  console.log(`prerender:full — rendering ${routes.length} routes with headless Chromium...`);

  /**
   * Launching Chrome is the one step that can fail for reasons that have
   * nothing to do with this site: a CI image missing a shared library, a
   * browser download that did not complete, a sandbox restriction.
   *
   * This script runs as part of `npm run build`, so a throw here would fail the
   * whole deploy and take the site down over a rendering optimisation. It must
   * degrade instead: the pages still have their titles, descriptions, canonical
   * URLs and Open Graph tags from the standard prerender step, which is exactly
   * where the site was before this step existed.
   */
  let browser;
  try {
    browser = await puppeteer.launch({
      // `headless: "new"` is deprecated from Puppeteer 22 onward; true now
      // selects the same modern headless mode without the warning.
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
  } catch (err) {
    server.close();
    console.warn(
      "\nprerender:full — could not start headless Chrome, so page CONTENT was not\n" +
      "  prerendered. The build is fine and every page still has its own title,\n" +
      "  description, canonical URL and Open Graph tags.\n\n" +
      `  Reason: ${err.message}\n\n` +
      "  What this costs: crawlers that do not run JavaScript (most AI assistants)\n" +
      "  see the metadata but not the page text. Run `npm run build` on a machine\n" +
      "  where Chrome can start to produce a fully prerendered dist/.\n"
    );
    process.exit(0);
  }

  let done = 0;
  const failed = [];

  /**
   * @param route  the path to render
   * @param opts   { timeout, waitUntil } — the retry pass passes a longer
   *               timeout and a more forgiving load condition. networkidle0
   *               demands the network go completely quiet, which a page with a
   *               long-lived connection never satisfies; domcontentloaded plus
   *               the #root check below is what actually matters for the HTML.
   */
  async function renderRoute(route, opts = {}) {
    const timeout = opts.timeout ?? RENDER_TIMEOUT_MS;
    const waitUntil = opts.waitUntil ?? "networkidle0";
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1280, height: 900 });
      // Images and fonts don't affect the HTML we capture — skipping them is much faster.
      await page.setRequestInterception(true);
      page.on("request", req => {
        const type = req.resourceType();
        if (type === "image" || type === "font" || type === "media") { req.abort(); return; }
        // Never let the prerenderer fire analytics. Two reasons: every prerendered
        // route would otherwise register as a real pageview in GA4 and a real
        // session in Clarity, and the tags inject their own <script> elements
        // which would then be frozen into the static HTML.
        if (ANALYTICS_HOSTS.some(h => req.url().includes(h))) { req.abort(); return; }
        req.continue();
      });

      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil,
        timeout,
      });

      // Wait until React has actually put something in #root.
      await page.waitForFunction(
        () => {
          const root = document.getElementById("root");
          return root && root.children.length > 0;
        },
        { timeout }
      );

      const html = await page.evaluate(hosts => {
        // Strip anything that shouldn't be frozen into a static file.
        document.querySelectorAll("[data-prerender-strip]").forEach(el => el.remove());

        // Remove analytics <script> elements that the tag snippets injected at
        // runtime. The snippets themselves live in index.html and must survive,
        // so anything written by hand there is either inline (no src) or carries
        // data-analytics. Everything else pointing at an analytics host was
        // created by JavaScript and has no business in a static file.
        document.querySelectorAll("script[src]").forEach(el => {
          const src = el.getAttribute("src") || "";
          if (!el.hasAttribute("data-analytics") && hosts.some(h => src.includes(h))) {
            el.remove();
          }
        });

        // ── Strip WebGL canvases ──
        // Three.js (HeroGlobe3D) appends a <canvas> imperatively via
        // container.appendChild(renderer.domElement). React's virtual DOM knows
        // nothing about it, so when the browser hydrates the prerendered HTML,
        // React sees a child that shouldn't be there and removes it — then the
        // useEffect creates a fresh one, but the hydration damage is already
        // done (the container may have collapsed to 0×0). Removing the canvas
        // from the static file means hydration finds exactly what it expects,
        // and the useEffect creates the canvas cleanly.
        document.querySelectorAll("canvas[data-engine]").forEach(el => el.remove());

        // ── Strip Google Translate runtime elements ──
        // The Google Translate widget injects several elements at runtime that
        // should not be frozen into static HTML.
        document.querySelectorAll(".skiptranslate, #google_translate_element *").forEach(el => el.remove());

        return "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
      }, ANALYTICS_HOSTS);

      const out = outputPath(route);
      if (!existsSync(dirname(out))) {
        const { mkdirSync } = await import("node:fs");
        mkdirSync(dirname(out), { recursive: true });
      }
      writeFileSync(out, html, "utf8");
      done++;
      if (done % 20 === 0) console.log(`  ${done}/${routes.length}`);
    } catch (err) {
      failed.push({ route, message: err.message });
    } finally {
      await page.close();
    }
  }

  // Simple concurrency pool
  const queue = [...routes];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const route = queue.shift();
        if (route) await renderRoute(route);
      }
    })
  );

  /* ── Second chance ──
   * Anything that failed above is retried one at a time, with a longer timeout
   * and a looser load condition. A route that ships without content is the one
   * outcome this whole script exists to prevent, so it is worth the extra
   * seconds to rescue the few that lost a race. */
  if (failed.length) {
    const retrying = failed.splice(0, failed.length);
    console.log(`\nprerender:full — retrying ${retrying.length} route(s) that timed out, one at a time...`);
    for (const { route } of retrying) {
      await renderRoute(route, { timeout: RETRY_TIMEOUT_MS, waitUntil: "domcontentloaded" });
    }
    const rescued = retrying.length - failed.length;
    console.log(`  rescued ${rescued}/${retrying.length}`);
  }

  await browser.close();
  server.close();

  // Prove it worked rather than claiming it did: measure the text actually
  // written into a sample of the files. An empty root div here means the render
  // silently produced nothing, which is the failure this whole step exists to
  // prevent.
  const sample = routes.slice(0, 5).map(r => {
    const f = outputPath(r);
    if (!existsSync(f)) return { route: r, chars: 0 };
    const html = readFileSync(f, "utf8");
    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<style[\s\S]*?<\/style>/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return { route: r, chars: text.length };
  });

  console.log(`\nprerender:full — ${done} route(s) rendered with full content.`);
  console.log("  text baked into the HTML (a crawler that runs no JavaScript sees this):");
  for (const s of sample) {
    console.log(`    ${String(s.chars).padStart(7)} chars  ${s.route}`);
  }
  if (sample.every(s => s.chars < 500)) {
    console.warn(
      "\n  WARNING: the prerendered pages contain almost no text. The render ran but\n" +
      "  produced empty pages — check for a runtime error on page load.\n"
    );
  }
  if (failed.length) {
    console.warn(`${failed.length} route(s) failed and kept their metadata-only HTML:`);
    for (const f of failed) console.warn(`  ${f.route} — ${f.message}`);
  }
}

main().catch(err => {
  console.error("prerender:full failed:", err.message);
  process.exit(1);
});
