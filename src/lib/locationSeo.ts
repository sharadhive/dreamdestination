/**
 * URLs, keywords and indexing policy for the generated location pages.
 *
 * ── URL STRUCTURE ──
 * Canonical:  /study-abroad-consultants-in-<slug>          (site root)
 *
 * These pages used to live under /locations/. They were moved to the root
 * because the extra segment added nothing: it is not a word anyone searches
 * for, it pushed the keyword further from the domain, and it made every
 * location URL longer for no gain. /locations still exists as the hub page
 * that links to them all, and the old URLs 301 to the new ones (see the
 * redirect rules in public/_redirects, public/.htaccess, public/web.config and
 * vercel.json, plus the client-side fallback in App.tsx).
 *
 * "consultants" is the canonical word rather than "consultancy": people search
 * for the people, not the company type. "consultancy" is kept as an alias so
 * both spellings land on the same page instead of competing.
 *
 * Aliases that redirect to the canonical URL:
 *   /locations/study-abroad-consultants-in-<slug>   (the previous structure)
 *   /study-abroad-consultancy-in-<slug>
 *   /study-abroad-consultant-in-<slug>
 *   /education-loan-in-<slug>
 *   /overseas-education-consultants-in-<slug>
 *   /<slug>                                          (bare city name)
 *
 * Aliases redirect rather than render. Two URLs serving the same content is
 * duplicate content; one URL with several doorways into it is not. The page
 * ranks for "education loan in Mumbai" because of what is written ON it, not
 * because a URL contains those words.
 *
 * ── INDEXING GATE ──
 * We generate a location page for every state and city in src/data/locations.ts.
 *
 * The threshold below decides how many of them enter the index and the sitemap.
 * It is currently 3 — EVERYTHING is indexable, by an explicit business decision.
 *
 * What that trades off, stated plainly so nobody has to rediscover it:
 * Google's scaled-content-abuse policy targets mass-produced near-identical
 * pages. The usual outcome is not a manual penalty but "Crawled – currently not
 * indexed" in Search Console — the weakest pages earn nothing and can dampen
 * sitewide quality signals. The defence is that each page is genuinely
 * different, which is why LocationPage.tsx varies eight prose blocks and four
 * FAQ answers per place (see the copy-variation note there), and why every page
 * carries its own state scheme, its own neighbouring-city set and its own
 * former-name copy.
 *
 * That is the strongest defence available from data alone. The durable one is
 * local proof — a student from that city, a local partner, an office address —
 * which has to come from the business, not from this file.
 *
 * IF Search Console later shows the tier-3 set stuck on "Crawled – currently
 * not indexed", drop this back to 2 and use ALWAYS_INDEX to promote individual
 * cities as they earn real local content. Nothing else has to change.
 */

import {
  ALIAS_SLUG_TO_CANONICAL,
  placeAliases,
  type CityInfo,
  type StateInfo,
} from "@/data/locations";

/** Cities at or above this tier are indexable. 1 = metros only, 3 = everything. */
export const INDEX_TIER_THRESHOLD: 1 | 2 | 3 = 3;

/** City slugs to index regardless of tier — use once a page has real local content. */
export const ALWAYS_INDEX: string[] = [];

/** City slugs to keep out of the index regardless of tier. */
export const NEVER_INDEX: string[] = [];

export const isCityIndexable = (city: CityInfo): boolean => {
  if (NEVER_INDEX.includes(city.slug)) return false;
  if (ALWAYS_INDEX.includes(city.slug)) return true;
  return city.tier <= INDEX_TIER_THRESHOLD;
};

/** Every state page is indexable: each carries distinct scheme and city data. */
export const isStateIndexable = (_state: StateInfo): boolean => true;

/* ─── URLs ─── */

/** The hub page that links to every location. Not a prefix for the pages themselves. */
export const LOCATION_HUB = "/locations";

/** The path segment the old structure used. Kept only to build redirects. */
export const LEGACY_LOCATION_BASE = "/locations";

export const cityUrl = (slug: string) => `/study-abroad-consultants-in-${slug}`;
export const stateUrl = (slug: string) => `/study-abroad-consultants-in-${slug}`;

/** The one prefix that renders. Everything else in ALIAS_PREFIXES redirects here. */
export const CANONICAL_PREFIX = "study-abroad-consultants-in";

/**
 * Alias prefixes that redirect to the canonical location page.
 *
 * ORDER MATTERS: parseLocationSlug takes the first prefix that matches, so the
 * longest/most specific spellings must come first. "study-abroad-consultants-in"
 * has to be tested before "study-abroad-in", or "study-abroad-consultants-in-pune"
 * would never reach the right branch.
 */
export const ALIAS_PREFIXES = [
  "study-abroad-consultants-in",
  "study-abroad-consultancy-in",
  "study-abroad-consultant-in",
  "overseas-education-consultants-in",
  "overseas-education-consultant-in",
  "abroad-education-consultants-in",
  "education-loan-in",
  "student-visa-consultants-in",
  "study-abroad-in",
];

/**
 * Pull the place slug out of a URL segment.
 *
 * React Router v6 dynamic segments must match a WHOLE path segment — a path
 * like "study-abroad-consultants-in-:slug" never matches anything. So the route
 * is "/:locationSlug" and the prefix is stripped here instead.
 *
 *   "study-abroad-consultants-in-maharashtra" -> "maharashtra"
 *   "education-loan-in-mumbai"                -> "mumbai"
 *   "mumbai"                                  -> "mumbai"
 */
export const parseLocationSlug = (segment: string): string | null => {
  if (!segment) return null;
  for (const prefix of ALIAS_PREFIXES) {
    if (segment.startsWith(`${prefix}-`)) {
      const rest = segment.slice(prefix.length + 1);
      return rest || null;
    }
  }
  return segment;
};

/** True when the segment already uses the canonical prefix. */
export const isCanonicalSegment = (segment: string): boolean =>
  segment.startsWith(`${CANONICAL_PREFIX}-`);

/**
 * Map a former-name slug onto the canonical one: "bangalore" → "bengaluru".
 * Returns the input unchanged when it is not an alias.
 *
 * Deliberately NOT folded into parseLocationSlug. If parsing resolved aliases,
 * /study-abroad-consultants-in-bangalore would satisfy isCanonicalSegment and
 * RENDER the Bengaluru page at a second URL — textbook duplicate content. The
 * router resolves the alias and then redirects, so there stays exactly one
 * indexable URL per place.
 */
export const resolveAliasSlug = (slug: string): string =>
  ALIAS_SLUG_TO_CANONICAL[slug] ?? slug;

/** True when this slug is a former name that should redirect rather than render. */
export const isAliasSlug = (slug: string): boolean => slug in ALIAS_SLUG_TO_CANONICAL;

/* ─── Keywords ─── */

/**
 * The query variants a single location page realistically competes for,
 * grouped by search intent.
 *
 * ── WHY CLUSTERS, NOT ONE FLAT LIST ──
 * <meta name="keywords"> has been ignored by Google since 2009. Listing
 * "education loan in Nashik" in a meta tag does nothing on its own — the page
 * ranks for it because that phrase appears in a heading, in body copy that
 * actually answers the query, in an FAQ, and in internal anchor text pointing
 * at the page.
 *
 * So these clusters exist to DRIVE THE PAGE CONTENT. Each cluster maps to a
 * real section in LocationPage.tsx:
 *
 *   consultancy  → the H1 and the hero copy
 *   loanAbroad   → the "Education Loan in <place> for Studying Abroad" section
 *   loanIndia    → the "Education Loan for Studying in India" section
 *   visa         → the student visa section
 *   admission    → the university admission section
 *   scholarship  → the scholarship section
 *   tests        → the test prep / accommodation section
 *   destinations → the destination link grid
 *
 * The meta tag still gets a spread of them (see locationMetaKeywords) because
 * AI assistants that read the raw HTML do parse it, and it costs nothing. But
 * the meta tag is the side effect, not the strategy.
 *
 * ── WHY "education loan for studying in India" IS HERE ──
 * DreamDestination arranges education loan guidance for domestic courses as
 * well as overseas ones. That is a materially different search intent with its
 * own scheme (PM-Vidyalaxmi, which explicitly excludes foreign institutions),
 * and a page that only talks about overseas loans cannot answer it.
 */
export const locationKeywordClusters = (
  place: string,
  stateName?: string,
  aliases: string[] = []
): Record<string, string[]> => {
  const p = place.toLowerCase();
  const s = stateName?.toLowerCase();

  const clusters: Record<string, string[]> = {
    /* ── A. Generic study-abroad + B. Consultant intent ── */
    consultancy: [
      `study abroad consultants in ${p}`,
      `study abroad consultancy in ${p}`,
      `study abroad consultant in ${p}`,
      `study abroad agency in ${p}`,
      `study abroad advisor in ${p}`,
      `study abroad counsellor in ${p}`,
      `overseas education consultants in ${p}`,
      `overseas education consultancy in ${p}`,
      `overseas education consultant in ${p}`,
      `overseas education agency in ${p}`,
      `overseas education advisor in ${p}`,
      `overseas education counsellor in ${p}`,
      `overseas study consultants in ${p}`,
      `abroad education consultants in ${p}`,
      `abroad study consultants in ${p}`,
      `foreign education consultants in ${p}`,
      `foreign education consultancy in ${p}`,
      `foreign education agency in ${p}`,
      `foreign study consultants in ${p}`,
      `international education consultants in ${p}`,
      `international education consultancy in ${p}`,
      `international study consultants in ${p}`,
      `international university consultant in ${p}`,
      `foreign university consultant in ${p}`,
      `education abroad consultants in ${p}`,
      `education consultancy in ${p}`,
      `education consultant in ${p}`,
      `best study abroad consultants in ${p}`,
      `top overseas education consultants in ${p}`,
      `study overseas consultants in ${p}`,
    ],

    /* ── R. Counselling intent ── */
    counselling: [
      `study abroad counselling in ${p}`,
      `study abroad counseling in ${p}`,
      `overseas education counselling in ${p}`,
      `overseas education counseling in ${p}`,
      `free study abroad counselling in ${p}`,
      `free study abroad counseling in ${p}`,
      `study abroad career counselling in ${p}`,
      `study abroad guidance in ${p}`,
    ],

    /* ── I. Education loan — abroad ── */
    loanAbroad: [
      `education loan in ${p}`,
      `education loan for abroad studies in ${p}`,
      `education loan for study abroad from ${p}`,
      `education loan for overseas studies in ${p}`,
      `overseas education loan in ${p}`,
      `overseas education loan consultant in ${p}`,
      `study abroad education loan ${p}`,
      `study abroad loan consultant in ${p}`,
      `education loan consultant in ${p}`,
      `education loan consultants in ${p}`,
      `education loan consultancy in ${p}`,
      `education loan agency in ${p}`,
      `education loan assistance in ${p}`,
      `education loan assistance for abroad studies in ${p}`,
      `student education loan consultant in ${p}`,
      `foreign education loan consultant in ${p}`,
      `education loan without collateral in ${p}`,
      `collateral free education loan in ${p}`,
      `unsecured education loan in ${p}`,
      `student loan in ${p}`,
      `education loan help in ${p}`,
      `education loan process in ${p}`,
      `education loan documents required in ${p}`,
      `education loan for MS in USA from ${p}`,
      `education loan for MBBS abroad from ${p}`,
      `education loan for MBA abroad from ${p}`,
    ],

    /* ── I. Education loan — domestic ── */
    loanIndia: [
      `education loan for studying in India from ${p}`,
      `education loan in ${p} for Indian colleges`,
      `domestic education loan in ${p}`,
      `PM Vidyalaxmi education loan ${p}`,
      `education loan without guarantor in ${p}`,
      `education loan interest subsidy ${p}`,
      `Vidya Lakshmi portal help ${p}`,
      `education loan for MBBS in India from ${p}`,
      `education loan for engineering college from ${p}`,
      `education loan for MBA in India from ${p}`,
    ],

    /* ── I. Education loan — per country ── */
    loanByCountry: [
      `education loan for UK studies ${p}`,
      `education loan for USA studies ${p}`,
      `education loan for Canada studies ${p}`,
      `education loan for Australia studies ${p}`,
      `education loan for Germany studies ${p}`,
      `education loan for Ireland studies ${p}`,
      `education loan for France studies ${p}`,
      `education loan for New Zealand studies ${p}`,
      `education loan for Dubai studies ${p}`,
      `education loan for Singapore studies ${p}`,
      `education loan for Italy studies ${p}`,
      `education loan for Malaysia studies ${p}`,
      `education loan for Switzerland studies ${p}`,
      `education loan for Netherlands studies ${p}`,
      `education loan for Spain studies ${p}`,
      `education loan for Japan studies ${p}`,
    ],

    /* ── G. Student visa intent — generic + country-specific ── */
    visa: [
      `student visa consultant in ${p}`,
      `student visa consultants in ${p}`,
      `student visa consultancy in ${p}`,
      `student visa agency in ${p}`,
      `student visa assistance in ${p}`,
      `student visa counselling in ${p}`,
      `student visa documentation assistance in ${p}`,
      `study visa consultant in ${p}`,
      `study visa consultants in ${p}`,
      `study visa consultancy in ${p}`,
      `study visa agency in ${p}`,
      `overseas student visa consultant ${p}`,
      `international student visa consultant ${p}`,
      `UK student visa consultant in ${p}`,
      `USA F1 visa consultant in ${p}`,
      `Canada study permit consultant in ${p}`,
      `Australia student visa consultant in ${p}`,
      `Germany student visa consultant in ${p}`,
      `Ireland student visa consultant in ${p}`,
      `New Zealand student visa consultant in ${p}`,
      `France student visa consultant in ${p}`,
      `Italy student visa consultant in ${p}`,
      `Japan student visa consultant in ${p}`,
      `Dubai student visa consultant in ${p}`,
      `Singapore student visa consultant in ${p}`,
    ],

    /* ── H. University admission intent ── */
    admission: [
      `university admission guidance in ${p}`,
      `university admission consultant in ${p}`,
      `university admission consultants in ${p}`,
      `abroad admission consultants in ${p}`,
      `overseas admission consultant in ${p}`,
      `overseas admission consultants in ${p}`,
      `foreign university admission consultant in ${p}`,
      `international university admission consultant in ${p}`,
      `overseas university admission consultant in ${p}`,
      `study abroad admission consultant ${p}`,
      `university application consultant in ${p}`,
      `MS abroad consultants in ${p}`,
      `MBA abroad consultants in ${p}`,
      `PhD abroad guidance in ${p}`,
      `nursing abroad consultants in ${p}`,
      `MBBS abroad consultants in ${p}`,
      `SOP writing help in ${p}`,
      `LOR guidance in ${p}`,
    ],

    /* ── J. Scholarship intent ── */
    scholarship: [
      `scholarship guidance in ${p}`,
      `study abroad scholarships for ${p} students`,
      `study abroad scholarship consultant in ${p}`,
      `study abroad scholarship consultants in ${p}`,
      `scholarship consultants in ${p}`,
      `overseas scholarship consultant in ${p}`,
      `international scholarship consultant in ${p}`,
      `foreign scholarship consultant in ${p}`,
      `merit scholarship assistance in ${p}`,
      `scholarship application help in ${p}`,
      `scholarship assistance for study abroad in ${p}`,
      `UK scholarships for Indian students ${p}`,
      `USA scholarships for Indian students ${p}`,
      `Canada scholarships for Indian students ${p}`,
      `Australia scholarships for Indian students ${p}`,
      `Germany scholarships for Indian students ${p}`,
    ],

    /* ── Q. Exam/test intent ── */
    tests: [
      `IELTS guidance in ${p}`,
      `IELTS PTE TOEFL help in ${p}`,
      `test preparation for study abroad in ${p}`,
      `GRE GMAT guidance in ${p}`,
      `student accommodation help in ${p}`,
      `IELTS coaching in ${p}`,
      `PTE coaching in ${p}`,
      `TOEFL coaching in ${p}`,
      `GRE coaching in ${p}`,
      `GMAT coaching in ${p}`,
    ],

    /* ── D. Destination country intent — all 20 countries ── */
    destinations: [
      `study in UK from ${p}`,
      `study in USA from ${p}`,
      `study in Canada from ${p}`,
      `study in Australia from ${p}`,
      `study in Germany from ${p}`,
      `study in Ireland from ${p}`,
      `study in New Zealand from ${p}`,
      `study in France from ${p}`,
      `study in Dubai from ${p}`,
      `study in UAE from ${p}`,
      `study in Singapore from ${p}`,
      `study in Switzerland from ${p}`,
      `study in Italy from ${p}`,
      `study in Netherlands from ${p}`,
      `study in Spain from ${p}`,
      `study in Malaysia from ${p}`,
      `study in Mauritius from ${p}`,
      `study in Japan from ${p}`,
      `study in China from ${p}`,
      `study in Russia from ${p}`,
    ],

    /* ── E. City + country consultant intent (Tier 2 keywords) ── */
    countryConsultants: [
      `UK study abroad consultant ${p}`,
      `UK education consultant ${p}`,
      `UK university consultant ${p}`,
      `UK admission consultant ${p}`,
      `USA study abroad consultant ${p}`,
      `USA education consultant ${p}`,
      `USA university consultant ${p}`,
      `Canada study abroad consultant ${p}`,
      `Canada education consultant ${p}`,
      `Canada university consultant ${p}`,
      `Australia study abroad consultant ${p}`,
      `Australia education consultant ${p}`,
      `Germany study abroad consultant ${p}`,
      `Germany education consultant ${p}`,
      `Ireland education consultant ${p}`,
      `France education consultant ${p}`,
      `Dubai education consultant ${p}`,
      `Singapore education consultant ${p}`,
      `New Zealand education consultant ${p}`,
      `Japan education consultant ${p}`,
      `Italy education consultant ${p}`,
      `Switzerland education consultant ${p}`,
    ],

    /* ── K. Course + country intent (Tier 3 keywords) ── */
    courseCountry: [
      `MBA in UK from ${p}`,
      `MS in USA from ${p}`,
      `masters in Canada from ${p}`,
      `engineering in Germany from ${p}`,
      `computer science in USA from ${p}`,
      `data science in Australia from ${p}`,
      `MBA in Dubai from ${p}`,
      `nursing in Australia from ${p}`,
      `MBBS in Russia from ${p}`,
      `MBBS in China from ${p}`,
      `MBA in Singapore from ${p}`,
      `hospitality in Switzerland from ${p}`,
      `MBA abroad from ${p}`,
      `MS abroad from ${p}`,
      `MBBS abroad from ${p}`,
      `engineering abroad from ${p}`,
    ],

    /* ── M. Intake/deadline intent ── */
    intake: [
      `study abroad application deadlines ${p}`,
      `study abroad intake counselling ${p}`,
      `September intake consultant ${p}`,
      `January intake consultant ${p}`,
      `UK September intake ${p}`,
      `Canada September intake ${p}`,
      `Australia February intake ${p}`,
      `USA Fall intake ${p}`,
    ],

    /* ── S. "near me" and local intent ── */
    local: [
      `study abroad consultant near ${p}`,
      `overseas education consultant near ${p}`,
      `education loan consultant near ${p}`,
      `student visa consultant near ${p}`,
    ],
  };

  // A city page should also pick up the odd state-level query, but a state page
  // must not repeat its own name back to itself.
  if (s && s !== p) {
    clusters.state = [
      `study abroad consultants in ${s}`,
      `study abroad consultancy in ${s}`,
      `overseas education consultants in ${s}`,
      `overseas education consultant in ${s}`,
      `student visa consultants in ${s}`,
      `education loan in ${s}`,
      `education loan consultant in ${s}`,
      `education loan for studying in India from ${s}`,
      `study abroad consultant in ${p}, ${s}`,
      `overseas education consultant in ${p}, ${s}`,
      `student visa consultant in ${p}, ${s}`,
      `education loan consultant in ${p}, ${s}`,
    ];
  }

  /*
   * Former and alternate names — see PLACE_ALIASES in src/data/locations.ts.
   *
   * "Bangalore" still outdraws "Bengaluru" by a wide margin, and the same holds
   * for Trichy, Vizag, Gurgaon, Calicut and the rest. Only the highest-intent
   * patterns are repeated for an alias: the point is to be findable under the
   * old name, not to double the keyword count.
   */
  const aliasTerms = aliases.filter(a => a.toLowerCase() !== p);
  if (aliasTerms.length) {
    clusters.aliases = aliasTerms.flatMap(a => {
      const al = a.toLowerCase();
      return [
        `study abroad consultants in ${al}`,
        `study abroad consultancy in ${al}`,
        `study abroad consultant in ${al}`,
        `overseas education consultants in ${al}`,
        `overseas education consultant in ${al}`,
        `foreign education consultants in ${al}`,
        `international education consultants in ${al}`,
        `education consultancy in ${al}`,
        `education loan in ${al}`,
        `education loan consultant in ${al}`,
        `education loan agency in ${al}`,
        `education loan without collateral in ${al}`,
        `student visa consultants in ${al}`,
        `study visa consultants in ${al}`,
        `education loan for studying in India from ${al}`,
        `best study abroad consultants in ${al}`,
        `overseas education counselling in ${al}`,
        `study abroad counselling in ${al}`,
      ];
    });
  }

  return clusters;
};

/** Every keyword for a place, flattened. Used for the keyword export/CSV. */
export const locationKeywords = (
  place: string,
  stateName?: string,
  aliases: string[] = []
): string[] => Object.values(locationKeywordClusters(place, stateName, aliases)).flat();

/** How many go in the meta tag. A tag with 80 terms reads as spam to a human reviewer. */
export const META_KEYWORD_LIMIT = 45;

/**
 * A spread across clusters rather than the first 30 of a flat list, so the meta
 * tag represents every intent the page actually covers instead of just the
 * consultancy and overseas-loan ones.
 */
export const locationMetaKeywords = (
  place: string,
  stateName?: string,
  aliases: string[] = []
): string[] => {
  const clusters = Object.values(locationKeywordClusters(place, stateName, aliases));
  const out: string[] = [];
  let row = 0;
  while (out.length < META_KEYWORD_LIMIT) {
    let added = false;
    for (const c of clusters) {
      if (c[row]) {
        out.push(c[row]);
        added = true;
        if (out.length >= META_KEYWORD_LIMIT) break;
      }
    }
    if (!added) break; // every cluster exhausted
    row++;
  }
  return out;
};

/* ─── Page metadata ─── */

export const cityMeta = (city: CityInfo) => {
  const aliases = placeAliases(city.slug);
  // The old name goes in the description, not the title: the title has no room
  // and Google rewrites crowded ones anyway, while a description is where a
  // searcher scanning results for "Bangalore" recognises the page as theirs.
  const alsoKnown = aliases.length ? ` Also searched as ${aliases.join(" or ")}.` : "";
  return {
    // Kept under ~60 characters so Google shows it whole. "Education Loan"
    // earns its place because it is the highest-intent query this page targets
    // — someone searching it is further down the funnel than someone searching
    // "study abroad".
    title: `Study Abroad Consultants in ${city.name} | Education Loan Help`,
    // Kept near 155 characters. The old version ran to 237 and Google cut it
    // mid-sentence in the SERP — the tail ("...and accommodation for students
    // from Nashik") was never shown, so it was doing no work at all.
    description:
      `Study abroad consultants in ${city.name}, ${city.stateName}.${alsoKnown} Free counselling, education loans for abroad and India, visas, scholarships, admissions.`,
    h1: `Study Abroad Consultants in ${city.name}`,
    keywords: locationMetaKeywords(city.name, city.stateName, aliases),
    aliases,
  };
};

export const stateMeta = (state: StateInfo) => {
  const aliases = placeAliases(state.slug);
  const alsoKnown = aliases.length ? ` Also searched as ${aliases.join(" or ")}.` : "";
  return {
    title: `Study Abroad Consultants in ${state.name} | Education Loan Help`,
    description:
      // No scheme name here on purpose. scripts/prerender.mjs has to reproduce
      // this string byte-for-byte, and parsing per-state scheme data out of
      // locations.ts in the build script is a drift waiting to happen. The
      // scheme is described in full on the page itself.
      `Study abroad guidance for students across ${state.name}.${alsoKnown} Course and university choice, education loans for abroad and India, visas and scholarships.`,
    h1: `Study Abroad Consultants in ${state.name}`,
    keywords: locationMetaKeywords(state.name, undefined, aliases),
    aliases,
  };
};
