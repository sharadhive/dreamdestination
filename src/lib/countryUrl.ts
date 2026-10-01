/**
 * Single source of truth for country page URLs.
 *
 * Previously duplicated in Header.tsx, Countries.tsx and CountriesIndex.tsx —
 * which meant adding a new custom country page required three edits and any
 * one of them could silently drift out of sync.
 */

/** Countries that have a dedicated /study-in-{slug} page. */
export const CUSTOM_PAGE_SLUGS = [
  "uk", "canada", "usa", "australia", "new-zealand", "ireland", "france",
  "germany", "dubai", "switzerland", "malaysia", "mauritius", "italy",
  "singapore", "netherlands", "india", "spain", "russia", "china", "japan",
] as const;

/**
 * Data slugs that differ from their custom page slug.
 * countryData uses "uae"; the dedicated page lives at /study-in-dubai.
 */
const SLUG_ALIASES: Record<string, string> = {
  uae: "dubai",
};

/**
 * Canonical URL for a country. Always returns the final destination —
 * never a URL that only redirects — so links, sitemaps and structured
 * data all agree.
 */
export const getCountryUrl = (slug: string): string => {
  const resolved = SLUG_ALIASES[slug] ?? slug;
  if ((CUSTOM_PAGE_SLUGS as readonly string[]).includes(resolved)) {
    return `/study-in-${resolved}`;
  }
  return `/countries/${slug}`;
};

/** Absolute canonical URL, for sitemaps and JSON-LD. */
export const getCountryAbsoluteUrl = (slug: string, domain: string): string =>
  `${domain}${getCountryUrl(slug)}`;
