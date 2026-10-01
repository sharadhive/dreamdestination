/**
 * Single source of truth for brand, contact and social details.
 *
 * ⚠️ CONFIRM BEFORE LAUNCH: the email and postal address below are marked
 * `verified: false`. Anything not verified is hidden from the site rather than
 * shown as a placeholder. Set the real value and flip the flag to true.
 */

export const SITE = {
  name: "DreamDestination",
  tagline: "Study Abroad Experts",
  domain: "https://www.dreamdestinationstudyabroad.com",
  description:
    "Study abroad consultancy helping Indian students with career counselling, university admissions, education loans, scholarships, student visas and accommodation.",
} as const;

export const CONTACT = {
  /**
   * The single number for every call button, WhatsApp link and form handoff on
   * the site. Change it here and it changes everywhere — nothing else should
   * hardcode a phone number.
   */
  phone: "+919211818710",
  phoneDisplay: "+91 92118 18710",
  whatsapp: "https://wa.me/919211818710",

  /** Set the real business email, then flip verified to true. */
  email: "info@dreamdestinationstudyabroad.com",
  emailVerified: true,

  /** Set the real office address, then flip verified to true. */
  address: "",
  addressVerified: false,

  officeHours: "Mon – Sat, 10:00 AM – 7:00 PM IST",
} as const;

/**
 * Only add a platform here once the profile actually exists.
 *
 * These also feed the `sameAs` array in the site's organisation schema, which is
 * how Google and AI assistants connect the website to the same business
 * elsewhere on the web. An unverified or dead profile link weakens that signal
 * rather than strengthening it, so every entry here must be a live profile.
 */
export const SOCIALS: { label: string; href: string; icon: "instagram" | "linkedin" | "youtube" }[] = [
  { label: "Instagram", href: "https://www.instagram.com/dreamdestinationstudyabroad.com/", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dream-destination-6aa983435/", icon: "linkedin" },
  { label: "YouTube", href: "https://www.youtube.com/@DreamDestination-v6d", icon: "youtube" },
];

/**
 * The person behind the business.
 *
 * Named deliberately. Search quality raters are told to look for who is
 * responsible for a site about money and major life decisions, and "a company"
 * is a weaker answer than a person. It also feeds the `founder` property in the
 * organisation schema, which is how Google and AI assistants attribute the
 * business to a real human rather than an anonymous brand.
 */
export const FOUNDER = {
  name: "Rajesh Tiwari",
  role: "Founder",
} as const;

/** Main service routes — kept in one place so the header and footer never drift apart. */
export const SERVICE_ROUTES = [
  { label: "Career Counselling", to: "/career-counselling" },
  { label: "Admission Guidance", to: "/admission-guidance" },
  { label: "Financial Assistance", to: "/financial-assistance" },
  { label: "Scholarship Assistance", to: "/scholarship-assistance" },
  { label: "Student Visa Assistance", to: "/visa-assistance" },
  { label: "Student Accommodation", to: "/student-accommodation" },
  { label: "Test Preparations", to: "/test-preparations" },
  { label: "Travel & Forex Assistance", to: "/travel-forex-assistance" },
  { label: "Insurance Assistance", to: "/insurance-assistance" },
] as const;

export const LEGAL_ROUTES = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  // Renamed from "Terms of Service" at /terms-of-service. "Terms and Conditions"
  // is the phrase Indian users search for and the one Indian consumer law uses,
  // and the old URL 301s here. Safe to change now because nothing is indexed yet
  // — after launch this rename would cost link equity.
  { label: "Terms and Conditions", to: "/terms-and-conditions" },
  { label: "Disclaimer", to: "/disclaimer" },
  { label: "Cookie Policy", to: "/cookie-policy" },
] as const;

/**
 * Content routes — pages that will grow over time rather than being written once.
 *
 * Kept beside SERVICE_ROUTES so the header, footer, sitemap script and homepage
 * internal-link hub all read one list and can never drift apart. Adding a page
 * here puts it in all four places at once.
 */
export const CONTENT_ROUTES = [
  { label: "Blog", to: "/blogs", description: "Guides on loans, visas, admissions and destinations" },
  { label: "Reviews", to: "/reviews", description: "Student reviews and video stories" },
] as const;

/**
 * ── META PIXEL ──
 *
 * Set `id` to the real pixel ID from Meta Events Manager (a 15–16 digit number)
 * and the pixel loads on every page. Leave it empty and NOTHING loads — no
 * script, no network request, no cookie.
 *
 * That gating is deliberate rather than cautious. A pixel with a placeholder ID
 * still fires requests to Meta from every visitor, still sets cookies, and still
 * puts you inside the consent and privacy-policy obligations — while collecting
 * nothing usable. Off until it is real is the only sensible default.
 *
 * WHEN YOU SWITCH IT ON, two things must follow:
 *   1. The privacy policy and cookie policy have to name Meta as a third party
 *      that receives data. Both pages already describe analytics cookies; add
 *      Meta by name in src/pages/legal/LegalPage.tsx.
 *   2. Check whether you need a consent banner for your audience. Indian DPDP
 *      Act rules and EU visitors both point the same way.
 *
 * Events fired (see src/lib/metaPixel.ts): PageView on every route change, and
 * Lead whenever a student submits an enquiry that hands off to WhatsApp.
 */
export const META_PIXEL = {
  id: "1722801308806118",
  /** Flip to false to disable without deleting the ID. */
  enabled: true,
} as const;

/**
 * ── SITEWIDE ENQUIRY POPUP ──
 *
 * See src/components/EnquiryPopup.tsx for the component.
 *
 * `delayMs` is the single most important number here.
 *
 * It is currently 0 — the form opens as soon as the page renders, on whatever
 * page the visitor lands on. That is a deliberate choice by the site owner to
 * put the enquiry form in front of every visitor immediately.
 *
 * The trade-off, recorded here so it is not forgotten: Google's
 * intrusive-interstitial guidance singles out dialogs that cover content
 * "immediately after the user navigates to a page from search results". A
 * zero delay is that pattern. It is a mobile ranking signal rather than a
 * hard penalty, but it works against a site built to rank.
 *
 * Raising this to 15000-20000 restores the safe behaviour: the visitor reads
 * the page first, a three-second bounce never sees the form, and the enquiries
 * that do arrive come from people who actually read something.
 *
 * `snoozeDays` is how long a dismissal is remembered per browser. A popup that
 * returns on every page view is the fastest way to make a site feel cheap. A
 * submitted enquiry suppresses it permanently, regardless of this value.
 */
export const ENQUIRY_POPUP: {
  enabled: boolean;
  delayMs: number;
  snoozeDays: number;
  showOn: "home" | "all";
  suppressedRoutes: string[];
} = {
  enabled: true,
  /*
   * 2 000 ms = 2 seconds.
   *
   * Just long enough for React to finish rendering the page (avoids the
   * flash-and-vanish race at 0ms) but fast enough that the visitor sees the
   * form almost immediately. Going to 0 causes a hydration race condition
   * that makes the popup vanish on mount.
   *
   * ⚠️ Google's interstitial guidance: a popup under ~5 seconds from arrival
   * may trigger the mobile interstitial penalty. The owner has chosen speed
   * over that risk. To play it safe later, raise this to 15000.
   */
  delayMs: 2000,
  /**
   * No longer used — dismissal is now per-tab via sessionStorage.
   * Kept for type compatibility. The popup shows once per tab session:
   * closing the tab or opening a new tab resets it.
   */
  snoozeDays: 0,

  /**
   * WHERE THE AUTOMATIC POPUP APPEARS.
   *
   *   "home" — the front page only. Every other page is left alone.
   *   "all"  — any page except `suppressedRoutes` below.
   *
   * Change this one word to switch; nothing else needs editing.
   *
   * Set to "all": the 20 country pages are the site's main search landing pages
 * and no longer have a popup of their own — the language-selection dialog that
 * opened there after 1.2 seconds has been removed from all of them — so the
 * enquiry form is what greets a visitor, on the same 20-second delay as
 * everywhere else.
 *
 * "home" is the more conservative setting. The plan for this site is 555 pages
   * ranking in Google, and every one of them is a landing page someone arrives
   * at from a search result. A dialog on all of them is a much bigger surface
   * for Google's intrusive-interstitial guidance than a dialog on the one page
   * people mostly reach by typing the brand name.
   *
   * This does NOT affect buttons that open the form deliberately — "Apply for
   * Loan Now" in the hero calls openEnquiryPopup() and works on any page,
   * whatever this is set to.
   */
  showOn: "all",

  /** Never show the automatic popup on these paths, even when showOn is "all". */
  suppressedRoutes: ["/contact", "/thank-you"],
};
