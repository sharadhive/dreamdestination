import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  /** Either a full URL or a path such as "/career-counselling". Always normalised to the live domain. */
  canonicalUrl: string;
  ogImage?: string;
  /** Render `noindex, follow` — used by the location-page quality gate. */
  noIndex?: boolean;
  jsonLd?: object[];
}

export const SITE_DOMAIN = "https://www.dreamdestinationstudyabroad.com";
export const SITE_NAME = "DreamDestination";

/** Normalise any canonical value (path or legacy/incorrect absolute URL) to the live domain. */
const toAbsoluteUrl = (input: string): string => {
  if (!input) return SITE_DOMAIN;
  let path = input;
  if (/^https?:\/\//i.test(input)) {
    try {
      path = new URL(input).pathname;
    } catch {
      return SITE_DOMAIN;
    }
  }
  if (!path.startsWith("/")) path = `/${path}`;
  // Strip trailing slash except for the homepage, to keep one canonical form per page.
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return `${SITE_DOMAIN}${path}`;
};

/**
 * Slugs that actually have a branded card in public/og/.
 *
 * WHY A LIST AND NOT JUST A TEMPLATE
 * The previous version derived `/og/<slug>.jpg` for EVERY page without checking
 * the file existed. Pages with no card — the newer country pages, and all 515
 * location pages — advertised an og:image pointing at a 404. A social scraper or
 * an AI crawler reading that tag got a dead image rather than falling back to
 * the site card, which is worse than having no per-page card at all.
 *
 * scripts/prerender.mjs checks the filesystem independently, so the SERVED HTML
 * was always correct. This fixes what the React app writes into the live DOM.
 *
 * Keep in step with public/og/ — run scripts/generate-og-images.py after adding
 * a slug to its PAGES / COUNTRIES list, then add the slug here.
 */
const OG_CARDS = new Set([
  "admission-guidance",
  "career-counselling",
  "cookie-policy",
  "countries",
  // Ukraine and Iran render at /countries/<slug> rather than /study-in-<slug>,
  // so their card filenames carry the countries- prefix that defaultOgImage
  // derives from the path.
  "countries-iran",
  "countries-ukraine",
  "disclaimer",
  "financial-assistance",
  "home",
  "insurance-assistance",
  "locations",
  "privacy-policy",
  "scholarship-assistance",
  "student-accommodation",
  "study-in-australia",
  "study-in-canada",
  "study-in-china",
  "study-in-dubai",
  "study-in-france",
  "study-in-germany",
  "study-in-india",
  "study-in-ireland",
  "study-in-italy",
  "study-in-japan",
  "study-in-malaysia",
  "study-in-mauritius",
  "study-in-netherlands",
  "study-in-new-zealand",
  "study-in-russia",
  "study-in-singapore",
  "study-in-spain",
  "study-in-switzerland",
  "study-in-uk",
  "study-in-usa",
  "terms-and-conditions",
  "test-preparations",
  "travel-forex-assistance",
  "visa-assistance",
]);

/** The page's own branded card where one exists, the site-wide card otherwise. */
const defaultOgImage = (canonicalUrl: string): string => {
  const path = toAbsoluteUrl(canonicalUrl).replace(SITE_DOMAIN, "");
  const slug = path === "" || path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "-");
  return OG_CARDS.has(slug)
    ? `${SITE_DOMAIN}/og/${slug}.jpg`
    : `${SITE_DOMAIN}/og-image.jpg`;
};

const SEOHead = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  noIndex = false,
  jsonLd = [],
}: SEOHeadProps) => {
  const resolvedOgImage = ogImage ?? defaultOgImage(canonicalUrl);
  // Serialise so a new array literal on every render doesn't re-run the effect.
  const keywordsKey = keywords.join(", ");
  const jsonLdKey = JSON.stringify(jsonLd);

  useEffect(() => {
    const absoluteUrl = toAbsoluteUrl(canonicalUrl);

    // Update title
    document.title = title;

    // Helper to set/create meta tags
    const setMeta = (attr: string, attrValue: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("name", "description", description);
    if (keywordsKey.length > 0) {
      setMeta("name", "keywords", keywordsKey);
    }
    setMeta(
      "name",
      "robots",
      noIndex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"
    );

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", absoluteUrl);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", absoluteUrl);
    setMeta("property", "og:image", resolvedOgImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", title);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:locale", "en_IN");
    setMeta("property", "og:site_name", SITE_NAME);

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", resolvedOgImage);

    // JSON-LD structured data
    // Remove old dynamic JSON-LD scripts
    document.querySelectorAll("script[data-seo-jsonld]").forEach((el) => el.remove());

    const parsed: object[] = JSON.parse(jsonLdKey);
    parsed.forEach((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", `schema-${index}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup on unmount
    return () => {
      document.querySelectorAll("script[data-seo-jsonld]").forEach((el) => el.remove());
      // Reset to default title
      document.title = "DreamDestination - Study Abroad Consultants & Education Loans";
    };
  }, [title, description, keywordsKey, canonicalUrl, resolvedOgImage, noIndex, jsonLdKey]);

  return null; // This component renders nothing — it only manipulates <head>
};

export default SEOHead;
