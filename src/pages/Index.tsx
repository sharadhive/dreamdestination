import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Countries from "@/components/Countries";
import Testimonials from "@/components/Testimonials";
import FAQ, { faqData } from "@/components/FAQ";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { SITE, CONTACT, SOCIALS, SERVICE_ROUTES, CONTENT_ROUTES, FOUNDER } from "@/config/site";
import { countriesData } from "@/data/countryData";
import { getCountryUrl } from "@/lib/countryUrl";

/**
 * ── WHY THE HOMEPAGE HAS ITS OWN <SEOHead> ──
 *
 * It was once the only rendering route on the site without one. It inherited
 * whatever static tags sit in index.html and, crucially, emitted NO
 * <link rel="canonical"> from the app at all.
 *
 * That matters more on the homepage than anywhere else, because the homepage is
 * the URL that accumulates the most duplicate forms: the apex domain, the www
 * host, "/" versus "", and anything arriving with a tracking query string. A
 * page with no canonical lets Google pick which of those to index, and it does
 * not always pick the one you would.
 *
 * It also means the homepage — the strongest page on the domain — was
 * publishing no structured data of its own beyond the site-wide organisation
 * node in index.html. The WebPage, FAQPage and ItemList nodes below are what an
 * AI assistant reads when asked "who helps with education loans in India": those
 * crawlers (GPTBot, ClaudeBot, PerplexityBot) do not execute JavaScript, which
 * is exactly why scripts/prerender.mjs bakes this into the served HTML.
 *
 * ⚠️ THIS FILE HAS BEEN SILENTLY REVERTED TO A NO-SEOHead VERSION SEVERAL TIMES
 * — most likely an editor holding a stale buffer, or a Lovable sync writing back
 * an older snapshot. If you open this file and the <SEOHead> block below is
 * missing, that has happened again, and the homepage is shipping with no
 * canonical and no structured data. Check before every build.
 *
 * ── THE FAQ SCHEMA IS IMPORTED, NOT RETYPED ──
 * faqData comes from the FAQ component itself. Structured data that says
 * something different to the visible page is a spam signal, and the only
 * reliable way to keep the two identical is to have one source.
 */
const HOME_TITLE = "DreamDestination | Study Abroad & Education Loan Help";
const HOME_DESCRIPTION =
  "Free counselling for Indian students: university admissions, education loans for studying abroad and in India, scholarships, student visas and accommodation.";

const homeJsonLd = () => {
  const flatFaqs = faqData.flatMap((group) => group.faqs);
  const abs = (path: string) => `${SITE.domain}${path}`;

  /*
   * The organisation node is referenced by @id from several other nodes rather
   * than repeated. That is what turns a pile of separate snippets into a graph:
   * Google (and an AI assistant reading the JSON) can see that the publisher of
   * the site, the provider of the nine services and the subject of the About
   * page are all the same entity, instead of three unrelated organisations that
   * happen to share a name.
   */
  const ORG_ID = `${SITE.domain}/#organization`;
  const SITE_ID = `${SITE.domain}/#website`;

  return [
    /* ─── 1. The organisation ─── */
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "@id": ORG_ID,
      name: SITE.name,
      alternateName: "Dream Destination",
      url: `${SITE.domain}/`,
      description: SITE.description,
      telephone: CONTACT.phone,
      ...(CONTACT.emailVerified && CONTACT.email ? { email: CONTACT.email } : {}),
      areaServed: { "@type": "Country", name: "India" },
      founder: { "@type": "Person", name: FOUNDER.name, jobTitle: FOUNDER.role },
      sameAs: SOCIALS.map((s) => s.href),
      logo: {
        "@type": "ImageObject",
        url: `${SITE.domain}/logo.png`,
        width: 512,
        height: 473,
      },
      image: `${SITE.domain}/og/home.jpg`,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: CONTACT.phone,
          ...(CONTACT.emailVerified && CONTACT.email ? { email: `mailto:${CONTACT.email}` } : {}),
          contactType: "customer support",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "10:00",
            closes: "19:00",
          },
        },
      ],
      /*
       * knowsAbout is the most directly useful property on this whole page for
       * AEO. When an assistant is deciding which source can answer "does
       * PM-Vidyalaxmi cover studying abroad", this is the machine-readable
       * statement that this organisation is a source on that exact topic.
       */
      knowsAbout: [
        "Education loans for studying abroad",
        "Education loans for studying in India",
        "PM-Vidyalaxmi scheme",
        "Section 80E education loan tax deduction",
        "Collateral-free education loans",
        "University admissions for Indian students",
        "Student visa applications",
        "Scholarships for Indian students",
        "IELTS, PTE, TOEFL, GRE and GMAT preparation",
        "Student accommodation abroad",
      ],
      /*
       * The service catalogue. This is what lets Google and an assistant answer
       * "what does DreamDestination do" with the nine specific services and
       * their URLs — and route a user straight to the right page rather than
       * the homepage.
       */
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Study abroad and education loan services",
        itemListElement: SERVICE_ROUTES.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.label,
            url: abs(s.to),
            provider: { "@id": ORG_ID },
            areaServed: { "@type": "Country", name: "India" },
            serviceType: s.label,
          },
        })),
      },
      /* Stated plainly, because it is the single most misunderstood fact about
         this business and the one an assistant is most likely to get wrong. */
      disambiguatingDescription:
        "DreamDestination is an education consultancy, not a lender or a lending agent. It does not set interest rates, loan amounts or approval decisions — those belong to the bank or NBFC — and it takes no commission from any lender.",
    },

    /* ─── 2. The website ─── */
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": SITE_ID,
      name: SITE.name,
      alternateName: "Dream Destination",
      url: `${SITE.domain}/`,
      inLanguage: "en-IN",
      publisher: { "@id": ORG_ID },
    },

    /* ─── 3. This page ─── */
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE.domain}/#webpage`,
      name: HOME_TITLE,
      description: HOME_DESCRIPTION,
      url: `${SITE.domain}/`,
      inLanguage: "en-IN",
      isPartOf: { "@id": SITE_ID },
      about: { "@id": ORG_ID },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE.domain}/og/home.jpg` },
      /*
       * speakable marks the parts a voice assistant should read aloud when
       * answering from this page. Restricted to the title and description
       * because those are the two things that are true, short, and make sense
       * without any surrounding page.
       */
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".hero-summary"],
      },
    },

    /* ─── 4. Breadcrumb ─── */
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
      ],
    },

    /* ─── 5. FAQs — imported from the visible page, never retyped ─── */
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE.domain}/#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: flatFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },

    /*
     * ─── 6. Site navigation ───
     *
     * SiteNavigationElement tells Google what the site's main sections are, in
     * the publisher's own words. It is one of the inputs to sitelinks — the
     * indented sub-links under a result — and it gives an AI assistant a direct
     * route to the right page instead of making it guess from the homepage.
     *
     * Destinations and locations are deliberately represented by their hub
     * pages rather than all 535 URLs: a navigation list of 535 items describes
     * nothing. The hubs link onward, and so does the Explore section.
     */
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Main sections of the DreamDestination website",
      itemListElement: [
        ...SERVICE_ROUTES.map((s, i) => ({
          "@type": "SiteNavigationElement",
          position: i + 1,
          name: s.label,
          url: abs(s.to),
        })),
        ...[
          { label: "All study destinations", to: "/countries" },
          { label: "Study abroad consultants by city", to: "/locations" },
          ...CONTENT_ROUTES.map((c) => ({ label: c.label, to: c.to })),
          { label: "About DreamDestination", to: "/about" },
          { label: "Contact", to: "/contact" },
        ].map((s, i) => ({
          "@type": "SiteNavigationElement",
          position: SERVICE_ROUTES.length + i + 1,
          name: s.label,
          url: abs(s.to),
        })),
      ],
    },

    /*
     * ─── 7. The destination hub ───
     *
     * Named separately so that an assistant asked "which countries does
     * DreamDestination cover" has a list to read rather than a page to
     * interpret. Built from countriesData so it cannot drift.
     */
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Study destinations covered",
      numberOfItems: countriesData.length,
      itemListElement: countriesData.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `Study in ${c.name}`,
        url: `${SITE.domain}${getCountryUrl(c.slug)}`,
      })),
    },
  ];
};

const Index = () => {
  // Scroll behaviour (top on navigation, smooth scroll to #hash sections) is
  // handled globally by <ScrollToTop /> in App.tsx.
  return (
    <div className="min-h-screen">
      <SEOHead
        title={HOME_TITLE}
        description={HOME_DESCRIPTION}
        canonicalUrl="/"
        keywords={[
          "study abroad consultants in India",
          "education loan for abroad studies",
          "education loan for studying in India",
          "overseas education consultants",
          "student visa consultants India",
          "scholarship guidance India",
          "PM Vidyalaxmi education loan",
          "collateral free education loan",
          "free study abroad counselling",
        ]}
        jsonLd={homeJsonLd()}
      />
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <Services />
        <HowItWorks />
        <Countries />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
