import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import SEOHead from "@/components/SEOHead";
import { SITE, CONTACT, SOCIALS, FOUNDER } from "@/config/site";

/**
 * ContactPage structured data.
 *
 * This is the node an AI assistant reads when someone asks "how do I contact
 * DreamDestination" — and those crawlers (GPTBot, ClaudeBot, PerplexityBot)
 * do not run JavaScript, so what matters is that scripts/prerender.mjs bakes it
 * into the served HTML.
 *
 * `address` is deliberately absent. CONTACT.addressVerified is false in
 * src/config/site.ts, and a partial or invented postal address in structured
 * data is worse than none: Google matches it against the Google Business
 * Profile, and a mismatch damages the local signal rather than creating one.
 * Once the real address is set and verified there, add a PostalAddress here and
 * a LocalBusiness node alongside it.
 */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact DreamDestination",
    url: `${SITE.domain}/contact`,
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.domain },
    mainEntity: {
      "@type": "EducationalOrganization",
      name: SITE.name,
      url: `${SITE.domain}/`,
      telephone: CONTACT.phone,
      ...(CONTACT.emailVerified && CONTACT.email ? { email: CONTACT.email } : {}),
      areaServed: { "@type": "Country", name: "India" },
      founder: { "@type": "Person", name: FOUNDER.name, jobTitle: FOUNDER.role },
      sameAs: SOCIALS.map((s) => s.href),
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: CONTACT.phone,
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
    },
  },
];

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-white">
      {/* Title was 79 characters. The description also claimed "100% education
          loan assistance" — we are not a lender and cannot assist with 100% of
          anything a lender decides. */}
      <SEOHead
        title="Contact DreamDestination | Free Study Abroad Consultation"
        description="Talk to a counsellor about university admissions, education loans for abroad or India, scholarships and student visas. The first consultation is free, with no obligation."
        canonicalUrl="/contact"
        keywords={["contact dreamdestinations", "study abroad guidance", "education loan counsellor", "overseas consultancy contact", "free study abroad consultation"]}
        jsonLd={jsonLd}
      />
      <Header />
      <main className="flex-grow pt-20">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
