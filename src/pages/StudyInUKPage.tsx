import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap, Globe2, Clock, BookOpen, Briefcase, Users,
  CheckCircle2, ChevronRight, ArrowRight, MapPin, Building2,
  Star, Shield, FileText, Wallet, Phone, MessageCircle,
  Award, Calendar, Heart, Monitor, TrendingUp, Cog,
  PoundSterling, Palette, RefreshCw, UserCheck, Globe,
  BadgeCheck, DollarSign, ExternalLink, Search,
  Sparkles, Grid, MoveHorizontal, Play, Pause, ArrowUpRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CountryHeroBanner from "@/components/CountryHeroBanner";
import {
  UK_SEO, UK_HERO, UK_QUICK_FACTS, UK_WHY_STUDY, UK_WHO_SHOULD_CONSIDER,
  UK_COURSE_CLUSTERS, UK_INTAKES, UK_COST, UK_EDUCATION_LOAN,
  UK_SCHOLARSHIPS, UK_ADMISSION_REQUIREMENTS, UK_APPLICATION_PROCESS,
  UK_STUDENT_VISA, UK_WORK_WHILE_STUDYING, UK_POST_STUDY_WORK,
  UK_CITIES, UK_DOCUMENTS, UK_WHY_DD, UK_LEAD_FORM, UK_AEO_FAQS,
  UK_UNIVERSITIES, getCountryStudyUrl,
  type UKUniversity,
} from "@/data/ukPageData";
import { countriesData } from "@/data/countryData";
import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";

const SITE_DOMAIN = "https://www.dreamdestinationstudyabroad.com";

// ─── Icon Resolver ───
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Globe2, Clock, BookOpen, Briefcase, Users, GraduationCap,
  Monitor, TrendingUp, Cog, PoundSterling, Heart, Palette,
  UserCheck, FileText, Shield, Wallet, RefreshCw, Globe,
};

const getIcon = (name: string) => iconMap[name] || Globe2;

// ─── University Card (reuses Clearbit logo pattern) ───
const getDomainFromUrl = (url: string): string => {
  try {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  } catch {
    return "";
  }
};

const getInitials = (name: string): string => {
  const cleanName = name.replace(/University|College|Institute|of|Technology|and|Science|London|the/gi, "").trim();
  const words = cleanName.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const UniversityCard: React.FC<{ uni: UKUniversity; index: number; isGrid?: boolean }> = ({ uni, index, isGrid = false }) => {
  const [imageError, setImageError] = useState(false);
  const domain = getDomainFromUrl(uni.website);
  const logoUrl = domain ? `https://logo.clearbit.com/${domain}` : "";
  const fallbackLogoUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : "";

  return (
    <div
      className={`relative group ${isGrid ? "w-full max-w-full" : "shrink-0 w-[270px] sm:w-[310px] md:w-[350px]"} bg-card/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-border/80 shadow-3d-card shadow-3d-hover transition-all duration-500 flex flex-col justify-between transform-style-3d hover:z-20 cursor-pointer`}
      style={{ transform: `perspective(1000px) rotateY(${index % 2 === 0 ? "1deg" : "-1deg"})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl pointer-events-none group-hover:from-primary/10 group-hover:to-secondary/15 transition-all duration-500" />
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="relative w-14 h-14 rounded-xl bg-white p-2 border border-border/60 shadow-md shrink-0 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
            {!imageError && logoUrl ? (
              <img
                src={logoUrl}
                alt={`${uni.name} logo`} width={64} height={64}
                className="w-full h-full object-contain"
                loading="lazy"
                onError={(e) => {
                  if (fallbackLogoUrl && (e.currentTarget.src !== fallbackLogoUrl)) {
                    e.currentTarget.src = fallbackLogoUrl;
                  } else {
                    setImageError(true);
                  }
                }}
              />
            ) : (
              <div className="w-full h-full rounded-lg bg-gradient-hero flex items-center justify-center text-white font-bold text-sm shadow-inner">
                {getInitials(uni.name)}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-gradient-gold text-secondary-foreground font-bold text-xs rounded-full shadow-gold shrink-0">
            <Award className="w-3.5 h-3.5" />
            <span>{uni.ranking}</span>
          </div>
        </div>
        <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors leading-tight mb-2 line-clamp-2">
          {uni.name}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="truncate">{uni.location}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {uni.popularSubjects.slice(0, 3).map((subj, i) => (
            <span key={i} className="px-2.5 py-1 bg-muted/80 text-muted-foreground text-[11px] font-medium rounded-md border border-border/40">
              {subj}
            </span>
          ))}
          {uni.popularSubjects.length > 3 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-semibold rounded-md">
              +{uni.popularSubjects.length - 3} more
            </span>
          )}
        </div>
      </div>
      <div className="pt-3 border-t border-border/40 flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
          <GraduationCap className="w-4 h-4 text-primary" /> {uni.tier === "top" ? "Top University" : "University"}
        </span>
        <a
          href={uni.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 bg-primary/10 group-hover:bg-primary group-hover:text-white px-3 py-1.5 rounded-lg transition-all duration-300 shadow-sm"
          onClick={(e) => e.stopPropagation()}
        >
          Official Site <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

// ─── Generate JSON-LD ───
const generateUKJsonLd = () => {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: UK_SEO.title,
      description: UK_SEO.metaDescription,
      url: `${SITE_DOMAIN}/study-in-uk`,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: "DreamDestination", url: SITE_DOMAIN },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_DOMAIN },
          { "@type": "ListItem", position: 2, name: "Countries", item: `${SITE_DOMAIN}/countries` },
          { "@type": "ListItem", position: 3, name: "Study in UK", item: `${SITE_DOMAIN}/study-in-uk` },
        ],
      },
      about: { "@type": "Country", name: "United Kingdom" },
      keywords: UK_SEO.keywords.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: UK_AEO_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "DreamDestination",
      description: "DreamDestination is a leading study abroad consultancy providing comprehensive education services including university admission, education loans, visa assistance, and scholarship guidance for students looking to study in the United Kingdom.",
      url: SITE_DOMAIN,
      areaServed: { "@type": "Country", name: "United Kingdom" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Study in UK Services",
        itemListElement: UK_WHY_DD.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item.title, description: item.description },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Top Colleges and Universities in the United Kingdom",
      description: `List of top ${UK_UNIVERSITIES.length} colleges and universities in the UK for Indian students`,
      numberOfItems: UK_UNIVERSITIES.length,
      itemListElement: UK_UNIVERSITIES.map((uni, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CollegeOrUniversity",
          name: uni.name,
          address: { "@type": "PostalAddress", addressLocality: uni.location },
          url: uni.website,
        },
      })),
    },
  ];
};

// ════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ════════════════════════════════════════════════════════════
const StudyInUKPage = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<"marquee" | "grid">("marquee");
  const [uniSearch, setUniSearch] = useState("");
  const [showTopOnly, setShowTopOnly] = useState(false);
  const [formState, setFormState] = useState({
    fullName: "",
    phone: "",
    email: "",
    highestQualification: "Bachelor's Degree",
    graduationYear: "2024",
    gpa: "",
    preferredCourse: "",
    preferredIntake: "September 2026 (Fall)",
    preferredRegion: "London",
    workExp: "0-2 Years",
    approxBudget: "£15,000 - £25,000",
    needLoan: "Yes",
    valueGraduateRoute: "Yes"
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = generateUKJsonLd();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hands the enquiry to WhatsApp. Before this, the form discarded it.
    sendLeadToWhatsApp("Study in UK", formState);
    setFormSubmitted(true);
  };

  // ─── Derived / computed variables ───
  const filteredUnis = UK_UNIVERSITIES.filter((uni) => {
    const matchesSearch =
      !uniSearch ||
      uni.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
      uni.popularSubjects.some((s) =>
        s.toLowerCase().includes(uniSearch.toLowerCase())
      );
    const matchesTier = !showTopOnly || uni.tier === "top";
    return matchesSearch && matchesTier;
  });

  // Duplicate for infinite marquee effect
  const marqueeUnis = [...UK_UNIVERSITIES, ...UK_UNIVERSITIES];

  const relatedCountries = countriesData
    .filter((c) => c.slug !== "uk")
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      <SEOHead
        title={UK_SEO.title}
        description={UK_SEO.metaDescription}
        keywords={UK_SEO.keywords}
        canonicalUrl={UK_SEO.canonicalUrl}
        jsonLd={jsonLd}
      />
      <Header />

      {/*
        The language-selection popup used to render here. Removed on purpose.

        It opened 1.2 seconds after the page loaded and covered the content —
        which is exactly the intrusive-interstitial pattern Google penalises on
        pages people arrive at from a search result. These 20 country pages are
        the site's main search landing pages, so it was doing the most damage
        precisely where it mattered most. It also offered the DESTINATION
        country's language (German on the Germany page, French on France), while
        the audience is Indian students who read the site in English.

        Language can still be changed any time from the switcher in the header.
        The sitewide enquiry form now covers these pages instead, on the same
        20-second delay as everywhere else — see EnquiryPopup.tsx.
      */}

      <main className="pt-20">
        {/* ═══ STICKY SUB-HEADER NAV ═══ */}
        <div className="sticky top-[73px] z-40 bg-background/90 backdrop-blur-md border-b text-xs py-2.5 hidden md:block shadow-sm">
          <div className="container mx-auto px-4 flex items-center justify-between overflow-x-auto whitespace-nowrap gap-6 no-scrollbar">
            <span className="font-bold text-primary flex items-center gap-1.5 shrink-0">
              <span>🇬🇧</span> Study in UK
            </span>
            <div className="flex items-center gap-5 text-muted-foreground font-medium">
              <a href="#quick-facts" className="hover:text-primary transition-colors">Quick Facts</a>
              <a href="#why-study-in-uk" className="hover:text-primary transition-colors">Why UK</a>
              <a href="#universities" className="hover:text-primary transition-colors">Universities</a>
              <a href="#courses" className="hover:text-primary transition-colors">Courses</a>
              <a href="#intakes" className="hover:text-primary transition-colors">Intakes</a>
              <a href="#cost" className="hover:text-primary transition-colors">Cost</a>
              <a href="#education-loan" className="hover:text-primary transition-colors">Education Loan</a>
              <a href="#student-visa" className="hover:text-primary transition-colors">Visa</a>
              <a href="#post-study-work" className="hover:text-primary transition-colors">Graduate Route</a>
              <a href="#faqs" className="hover:text-primary transition-colors">FAQs</a>
            </div>
            <a
              href="#lead-form"
              className="bg-gradient-hero text-white font-semibold px-3 py-1 rounded-full transition-colors shrink-0 shadow-sm hover:opacity-90"
            >
              Apply Now
            </a>
          </div>
        </div>

        {/* ═══ 1. BREADCRUMB ═══ */}
                {/* ═══ 2. HERO SECTION ═══ */}
        <CountryHeroBanner
          breadcrumb={[{ label: "Home", to: "/" }, { label: "Countries", to: "/countries" }, { label: "Study in UK" }]}
          countryName="United Kingdom"
          flag="🇬🇧"
          heading={UK_HERO.heading}
          subheading={UK_HERO.subheading}
          description={UK_HERO.description}
          valueProposition={UK_HERO.valueProposition}
          badgeText="Study in the UK - DreamDestination Official Guide"
          stats={{
            universities: `${UK_UNIVERSITIES.length}+ Top Unis`,
            avgCost: "£13,000 - £25,000",
            workPermit: "2-3 Yrs Graduate Route",
            visaSuccessRate: "Student visa (PBS)",
          }}
          cta1Text={UK_HERO.cta1.text}
          cta1Href={UK_HERO.cta1.href}
          cta2Text={UK_HERO.cta2.text}
          cta2Href={UK_HERO.cta2.href}
        />

        {/* ═══ 3. QUICK FACTS ═══ */}
        <section className="bg-card border-b shadow-soft" id="quick-facts">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Quick Facts — <span className="text-gradient-hero">Study in the UK</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: GraduationCap, label: "Study Levels", value: UK_QUICK_FACTS.studyLevels },
                { icon: Calendar, label: "Major Intakes", value: UK_QUICK_FACTS.majorIntakes },
                { icon: BookOpen, label: "Popular Fields", value: UK_QUICK_FACTS.popularFields },
                { icon: Shield, label: "Student Visa", value: UK_QUICK_FACTS.studentVisa },
              ].map((item, i) => (
                <div key={i} className="bg-gradient-subtle rounded-xl p-5 border text-center hover:shadow-elegant transition-smooth">
                  <item.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="font-semibold text-sm text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
            {/* Graduate Route Info Box */}
            <div className="max-w-4xl mx-auto mt-8 bg-primary/5 border border-primary/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">Graduate Route</p>
                  <p className="text-sm text-muted-foreground">{UK_QUICK_FACTS.graduateRoute}</p>
                  <p className="text-xs text-muted-foreground mt-2 italic">{UK_QUICK_FACTS.graduateRouteDisclaimer}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 4. WHY STUDY IN THE UK ═══ */}
        <section className="py-16 bg-background" id="why-study-in-uk">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Study in the <span className="text-gradient-hero">United Kingdom</span>?
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Students interested in studying in the UK might find it appealing because of the opportunity to receive internationally recognized education, specialized courses, and exposure to a multicultural academic environment.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {UK_WHY_STUDY.map((item, index) => {
                const Icon = getIcon(item.icon);
                return (
                  <div key={index} className="bg-card p-6 rounded-xl border shadow-soft hover:shadow-elegant transition-smooth animate-fade-in group" style={{ animationDelay: `${index * 0.08}s` }}>
                    <div className={`p-3 rounded-xl ${index % 2 === 0 ? "bg-gradient-hero" : "bg-gradient-gold"} text-white w-fit mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-smooth">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 5. WHO SHOULD CONSIDER ═══ */}
        <section className="py-16 bg-gradient-subtle" id="who-should-consider">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                {UK_WHO_SHOULD_CONSIDER.heading}
              </h2>
              <p className="text-muted-foreground text-center mb-8">{UK_WHO_SHOULD_CONSIDER.intro}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {UK_WHO_SHOULD_CONSIDER.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card p-4 rounded-xl border shadow-soft">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{point}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic text-center mb-6">{UK_WHO_SHOULD_CONSIDER.disclaimer}</p>
              <div className="text-center">
                <a href={UK_WHO_SHOULD_CONSIDER.cta.href} className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-hero text-white font-bold rounded-xl shadow-elegant hover-glow-primary transition-smooth">
                  <BadgeCheck className="w-5 h-5" />
                  {UK_WHO_SHOULD_CONSIDER.cta.text}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 6. TOP UNIVERSITIES ═══ */}
        <section className="py-16 bg-background relative overflow-hidden" id="universities">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{UK_UNIVERSITIES.length}+ Universities</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Top Universities in the <span className="text-gradient-hero">United Kingdom</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-2xl">
                  No one university is the "best" for all students. The best college for your course depends on your academic profile, budget, location, and career goals.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search university or subject..."
                    value={uniSearch}
                    onChange={(e) => setUniSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-card border border-border/80 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-44 md:w-60 shadow-soft"
                    id="university-search"
                  />
                </div>
                <div className="flex items-center bg-card border border-border/80 rounded-xl p-1 shadow-soft">
                  <button onClick={() => { setViewMode("marquee"); setShowTopOnly(false); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "marquee" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                    <MoveHorizontal className="w-3.5 h-3.5" /> 3D Slider
                  </button>
                  <button onClick={() => { setViewMode("grid"); setShowTopOnly(false); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "grid" && !showTopOnly ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                    <Grid className="w-3.5 h-3.5" /> All Unis
                  </button>
                  <button onClick={() => { setViewMode("grid"); setShowTopOnly(true); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "grid" && showTopOnly ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                    <Star className="w-3.5 h-3.5" /> Top 25
                  </button>
                </div>
                {viewMode === "marquee" && !uniSearch && (
                  <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 bg-card border border-border/80 rounded-xl text-muted-foreground hover:text-primary transition-colors shadow-soft" title={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>

            {uniSearch ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {filteredUnis.length > 0 ? (
                  filteredUnis.map((uni, idx) => (
                    <div key={idx} className="w-full"><UniversityCard uni={uni} index={idx} isGrid={true} /></div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-muted-foreground">No universities found matching "{uniSearch}".</div>
                )}
              </div>
            ) : viewMode === "marquee" ? (
              <div className="relative w-full overflow-hidden py-6 perspective-1000">
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                <div className={`flex gap-6 w-max ${isPlaying ? "animate-marquee-3d" : ""}`}>
                  {marqueeUnis.map((uni, idx) => (
                    <UniversityCard key={`${uni.name}-${idx}`} uni={uni} index={idx} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {filteredUnis.map((uni, idx) => (
                  <div key={idx} className="w-full"><UniversityCard uni={uni} index={idx} isGrid={true} /></div>
                ))}
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center mt-6 italic">
              Rankings are based on the Complete University Guide 2026 and QS 2026. Rankings are a snapshot and should not be the only measure used to make university choices.
            </p>

            {/* University CTA */}
            <div className="text-center mt-10 bg-card border rounded-xl p-8 shadow-soft max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-2">Not sure which university in the UK fits you?</h3>
              <p className="text-sm text-muted-foreground mb-4">Share your academics, preferred course, and budget. Our counsellors can assist you to narrow down your choices.</p>
              <a href="#lead-form" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-hero text-white font-bold rounded-xl hover-glow-primary transition-smooth">
                Get University Guidance <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* ═══ 7. POPULAR COURSES ═══ */}
        <section className="py-16 bg-gradient-subtle" id="courses">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Popular Courses to Study in the <span className="text-gradient-hero">UK</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The most sought-after courses for Indian students in the United Kingdom.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {UK_COURSE_CLUSTERS.map((cluster, i) => {
                const Icon = getIcon(cluster.icon);
                return (
                  <div key={i} className="bg-card p-6 rounded-xl border shadow-soft hover:shadow-elegant transition-smooth group animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                    <div className={`p-3 rounded-xl ${i % 2 === 0 ? "bg-gradient-hero" : "bg-gradient-accent"} text-white w-fit mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-smooth">{cluster.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cluster.courses.map((course, ci) => (
                        <span key={ci} className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full hover:bg-primary/20 transition-smooth cursor-pointer">
                          {course}
                        </span>
                      ))}
                    </div>
                    {/* Internal link placeholder for future course pages */}
                    <div className="mt-4 pt-3 border-t border-border/40">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        Detailed course pages coming soon
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 8. UK INTAKES ═══ */}
        <section className="py-16 bg-background" id="intakes">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                UK Intakes for <span className="text-gradient-hero">Indian Students</span>
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Your choice of intake may impact course availability, university options, scholarship deadlines and preparation.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {UK_INTAKES.intakes.map((intake, i) => (
                  <div key={i} className={`bg-card p-6 rounded-xl border shadow-soft ${intake.isPrimary ? "ring-2 ring-primary/30" : ""}`}>
                    {intake.isPrimary && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full mb-3">
                        <Star className="w-3 h-3" /> Most Popular
                      </span>
                    )}
                    <h3 className="font-bold text-lg mb-2">{intake.name}</h3>
                    <p className="text-sm text-muted-foreground">{intake.description}</p>
                  </div>
                ))}
              </div>
              {/* AEO Answer Block */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <p className="text-xs text-primary font-bold uppercase tracking-wide mb-1">AEO — Quick Answer</p>
                <p className="text-sm text-foreground font-medium">{UK_INTAKES.aeoAnswer}</p>
              </div>
              <p className="text-xs text-muted-foreground italic text-center mt-4">{UK_INTAKES.disclaimer}</p>
            </div>
          </div>
        </section>

        {/* ═══ 9. COST OF STUDY ═══ */}
        <section className="py-16 bg-gradient-subtle" id="cost">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Cost of Studying in the <span className="text-gradient-hero">UK</span> for Indian Students
              </h2>
              <p className="text-muted-foreground text-center mb-8">{UK_COST.intro}</p>

              <div className="bg-card rounded-2xl border shadow-elegant overflow-hidden mb-8">
                <div className="p-6 bg-gradient-hero text-white">
                  <p className="font-mono text-sm md:text-base text-center">{UK_COST.formula}</p>
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-4">Budget Items to Consider</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {UK_COST.budgetItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-gradient-subtle border-t">
                  <h4 className="font-bold text-sm mb-3">Official UK Financial Requirement</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card p-4 rounded-xl border text-center">
                      <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">London</p>
                      <p className="font-bold text-lg text-primary">{UK_COST.londonCost}</p>
                      <p className="text-xs text-muted-foreground">per month (up to 9 months)</p>
                    </div>
                    <div className="bg-card p-4 rounded-xl border text-center">
                      <MapPin className="w-5 h-5 text-secondary mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">Outside London</p>
                      <p className="font-bold text-lg text-secondary">{UK_COST.outsideLondonCost}</p>
                      <p className="text-xs text-muted-foreground">per month (up to 9 months)</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic mt-3">Subject to applicable rules and exemptions.</p>
                </div>
              </div>

              <div className="text-center">
                <a href={UK_COST.cta.href} className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-hero text-white font-bold rounded-xl hover-glow-primary transition-smooth">
                  <DollarSign className="w-5 h-5" />
                  {UK_COST.cta.text}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 10. EDUCATION LOAN ═══ */}
        <section className="py-16 bg-background" id="education-loan">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DreamDestination Differentiator</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Education Loan for <span className="text-gradient-hero">Studying in the UK</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{UK_EDUCATION_LOAN.intro}</p>
              </div>

              <p className="text-muted-foreground text-center mb-8">{UK_EDUCATION_LOAN.valueProposition}</p>

              <div className="bg-card rounded-2xl border shadow-elegant p-6 mb-8">
                <h3 className="font-bold text-lg mb-4">We Can Help You With</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {UK_EDUCATION_LOAN.services.map((service, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Unsecured Loan */}
                <div className="bg-card p-6 rounded-xl border shadow-soft">
                  <h3 className="font-bold text-base mb-3 text-primary">{UK_EDUCATION_LOAN.unsecuredLoan.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{UK_EDUCATION_LOAN.unsecuredLoan.answer}</p>
                </div>
                {/* Rejected Loan */}
                <div className="bg-card p-6 rounded-xl border shadow-soft">
                  <h3 className="font-bold text-base mb-3 text-primary">{UK_EDUCATION_LOAN.rejectedLoan.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{UK_EDUCATION_LOAN.rejectedLoan.answer}</p>
                </div>
              </div>

              <div className="text-center">
                <a href={`tel:${UK_EDUCATION_LOAN.phoneNumber}`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-gold text-secondary-foreground font-bold rounded-xl shadow-gold hover-glow-gold transition-smooth">
                  <Phone className="w-5 h-5" />
                  Call {UK_EDUCATION_LOAN.phoneNumber} for Loan Options
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 11. SCHOLARSHIPS ═══ */}
        <section className="py-16 bg-gradient-subtle" id="scholarships">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Scholarships to Study in the <span className="text-gradient-hero">UK</span>
              </h2>
              <p className="text-muted-foreground text-center mb-8">{UK_SCHOLARSHIPS.intro}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {UK_SCHOLARSHIPS.categories.map((cat, i) => (
                  <div key={i} className="bg-card p-6 rounded-xl border shadow-soft">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${i === 0 ? "bg-gradient-hero" : "bg-gradient-gold"} text-white`}>
                        <Award className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg">{cat.title}</h3>
                    </div>
                    {cat.description && <p className="text-sm text-muted-foreground">{cat.description}</p>}
                    {cat.items && (
                      <ul className="space-y-2 mt-3">
                        {cat.items.map((item, ii) => (
                          <li key={ii} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <p className="text-xs text-primary font-bold uppercase tracking-wide mb-1">AEO — Scholarships Answer</p>
                <p className="text-sm text-foreground font-medium">{UK_SCHOLARSHIPS.aeoAnswer}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 12. ADMISSION REQUIREMENTS ═══ */}
        <section className="py-16 bg-background" id="admission-requirements">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                UK Admission <span className="text-gradient-hero">Requirements</span>
              </h2>
              <p className="text-muted-foreground text-center mb-8">{UK_ADMISSION_REQUIREMENTS.intro}</p>
              <div className="bg-card rounded-2xl border shadow-elegant p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {UK_ADMISSION_REQUIREMENTS.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gradient-subtle rounded-lg">
                      <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-primary">{i + 1}</span>
                      </div>
                      <span className="text-sm text-foreground">{req}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-xl">
                  <p className="text-sm text-orange-800 dark:text-orange-200 flex items-start gap-2">
                    <Shield className="w-4 h-4 shrink-0 mt-0.5" />
                    {UK_ADMISSION_REQUIREMENTS.disclaimer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 13. APPLICATION PROCESS ═══ */}
        <section className="py-16 bg-gradient-subtle" id="application-process">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                How to Apply to <span className="text-gradient-hero">UK Universities</span> from India
              </h2>
              <div className="relative mt-12">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />
                <div className="space-y-6">
                  {UK_APPLICATION_PROCESS.map((step, i) => (
                    <div key={i} className="flex gap-6 animate-fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
                      <div className="shrink-0 hidden md:block">
                        <div className="w-12 h-12 rounded-full bg-gradient-hero text-white flex items-center justify-center font-bold text-sm shadow-elegant z-10 relative">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1 bg-card p-5 rounded-xl border shadow-soft">
                        <div className="flex items-center gap-2 mb-1 md:hidden">
                          <span className="w-7 h-7 rounded-full bg-gradient-hero text-white flex items-center justify-center font-bold text-xs">
                            {step.step}
                          </span>
                        </div>
                        <h3 className="font-bold text-base mb-1">Step {step.step} — {step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 14. STUDENT VISA ═══ */}
        <section className="py-16 bg-background" id="student-visa">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                UK Student Visa for <span className="text-gradient-hero">Indian Students</span>
              </h2>
              <p className="text-muted-foreground text-center mb-8">{UK_STUDENT_VISA.intro}</p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card p-5 rounded-xl border shadow-soft text-center">
                  <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Visa Fee</p>
                  <p className="font-bold text-2xl text-primary">{UK_STUDENT_VISA.fee}</p>
                  <p className="text-xs text-muted-foreground mt-1">from outside the UK</p>
                </div>
                <div className="bg-card p-5 rounded-xl border shadow-soft text-center">
                  <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Processing Time</p>
                  <p className="font-bold text-lg">~3 weeks</p>
                  <p className="text-xs text-muted-foreground mt-1">may vary in some cases</p>
                </div>
                <div className="bg-card p-5 rounded-xl border shadow-soft text-center">
                  <Heart className="w-6 h-6 text-destructive mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Health Surcharge</p>
                  <p className="font-bold text-lg">{UK_STUDENT_VISA.ihs.amount}</p>
                  <p className="text-xs text-muted-foreground mt-1">{UK_STUDENT_VISA.ihs.note}</p>
                </div>
              </div>

              <div className="bg-card rounded-2xl border shadow-elegant p-6 mb-8">
                <h3 className="font-bold text-lg mb-4">Common Requirements</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {UK_STUDENT_VISA.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <p className="text-xs text-primary font-bold uppercase tracking-wide mb-1">Visa Process Flow</p>
                <p className="text-sm text-foreground font-medium">{UK_STUDENT_VISA.process}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 15. WORK WHILE STUDYING ═══ */}
        <section className="py-16 bg-gradient-subtle" id="work-while-studying">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Working While <span className="text-gradient-hero">Studying</span> in the UK
              </h2>
              <div className="bg-card p-8 rounded-2xl border shadow-elegant">
                <p className="text-muted-foreground leading-relaxed mb-4">{UK_WORK_WHILE_STUDYING.intro}</p>
                <div className="bg-gradient-hero text-white p-5 rounded-xl mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-6 h-6" />
                    <span className="font-bold text-lg">Up to 20 hours/week</span>
                  </div>
                  <p className="text-sm opacity-90">during term time (full-time during vacations)</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{UK_WORK_WHILE_STUDYING.details}</p>
                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-xl">
                  <p className="text-sm text-orange-800 dark:text-orange-200 flex items-start gap-2">
                    <Shield className="w-4 h-4 shrink-0 mt-0.5" />
                    <strong>Important: </strong>{UK_WORK_WHILE_STUDYING.disclaimer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 16. POST-STUDY WORK ═══ */}
        <section className="py-16 bg-background" id="post-study-work">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                After Studying in the <span className="text-gradient-hero">UK</span>
              </h2>
              <p className="text-muted-foreground text-center mb-8">{UK_POST_STUDY_WORK.intro}</p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {UK_POST_STUDY_WORK.rules.map((rule, i) => (
                  <div key={i} className={`bg-card p-6 rounded-xl border shadow-soft text-center ${i === 0 ? "ring-2 ring-primary/30" : ""}`}>
                    <Calendar className="w-6 h-6 text-primary mx-auto mb-3" />
                    <p className="font-bold text-2xl text-gradient-hero mb-1">{rule.duration}</p>
                    <p className="text-xs text-muted-foreground">{rule.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center italic mb-6">{UK_POST_STUDY_WORK.note}</p>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <p className="text-xs text-primary font-bold uppercase tracking-wide mb-1">AEO — Post-Study Work Answer</p>
                <p className="text-sm text-foreground font-medium">{UK_POST_STUDY_WORK.aeoAnswer}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 17. POPULAR CITIES ═══ */}
        <section className="py-16 bg-gradient-subtle" id="cities">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Popular UK Cities for <span className="text-gradient-hero">Indian Students</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {UK_CITIES.map((city, i) => (
                <div key={i} className="bg-card p-6 rounded-xl border shadow-soft hover:shadow-elegant transition-smooth group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-smooth">{city.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{city.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 18. DOCUMENTS ═══ */}
        <section className="py-16 bg-background" id="documents">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Documents Required to <span className="text-gradient-hero">Study in the UK</span>
              </h2>
              <p className="text-muted-foreground text-center mb-8">{UK_DOCUMENTS.intro}</p>
              <div className="bg-card rounded-2xl border shadow-elegant p-6">
                <div className="grid md:grid-cols-2 gap-3">
                  {UK_DOCUMENTS.documents.map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gradient-subtle rounded-lg">
                      <FileText className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{doc}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic mt-4">{UK_DOCUMENTS.disclaimer}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 19. WHY DreamDestination ═══ */}
        <section className="py-16 bg-gradient-subtle" id="why-DreamDestination">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Students Choose <span className="text-gradient-hero">DreamDestination</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Students choose DreamDestination for their trip to the UK for a number of reasons.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {UK_WHY_DD.map((item, i) => {
                const Icon = getIcon(item.icon);
                return (
                  <div key={i} className="bg-card p-6 rounded-xl border shadow-soft hover:shadow-elegant transition-smooth group animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                    <div className={`p-3 rounded-xl ${i % 3 === 0 ? "bg-gradient-hero" : i % 3 === 1 ? "bg-gradient-gold" : "bg-gradient-accent"} text-white w-fit mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-smooth">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 20. QUALIFIED LEAD FORM SECTION ═══ */}
        <section id="lead-form" className="py-20 bg-background relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-card border-2 border-primary/30 rounded-3xl p-6 md:p-10 shadow-elegant">
              
              <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                <span className="text-xs font-extrabold text-primary uppercase tracking-widest">Free Online Counselling</span>
                <h2 className="text-2xl md:text-3xl font-extrabold">
                  Get Your <span className="text-gradient-hero">UK Profile Assessment</span>
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Fill out your academic details to receive personalized course, UK university, loan, and Graduate Route visa recommendations.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h3 className="text-2xl font-bold text-foreground">WhatsApp is opening</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Press Send in WhatsApp to reach our UK Education Specialist. Your enquiry is not received until you send the message.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl border border-emerald-500/20 text-emerald-600 font-semibold hover:bg-emerald-500/10 transition-colors text-xs"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Full Name *</label>
                      <input 
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formState.fullName}
                        onChange={e => setFormState({...formState, fullName: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Mobile Number *</label>
                      <input 
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formState.phone}
                        onChange={e => setFormState({...formState, phone: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Email Address *</label>
                      <input 
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={e => setFormState({...formState, email: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>

                  {/* Academic Profile */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Highest Qualification</label>
                      <select 
                        value={formState.highestQualification}
                        onChange={e => setFormState({...formState, highestQualification: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <option>12th Standard</option>
                        <option>3-Year Diploma</option>
                        <option>Bachelor's Degree</option>
                        <option>Master's Degree</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Graduation Year</label>
                      <select 
                        value={formState.graduationYear}
                        onChange={e => setFormState({...formState, graduationYear: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <option>2026 (Pursuing)</option>
                        <option>2025</option>
                        <option>2024</option>
                        <option>2023</option>
                        <option>2022 or earlier</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Current Score (% / CGPA)</label>
                      <input 
                        type="text"
                        placeholder="e.g. 78% or 8.2 CGPA"
                        value={formState.gpa}
                        onChange={e => setFormState({...formState, gpa: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Preferred Field / Course</label>
                      <input 
                        type="text"
                        placeholder="e.g. Data Science / MBA"
                        value={formState.preferredCourse}
                        onChange={e => setFormState({...formState, preferredCourse: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Target Intake</label>
                      <select 
                        value={formState.preferredIntake}
                        onChange={e => setFormState({...formState, preferredIntake: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <option>September 2026 (Fall)</option>
                        <option>January 2027 (Winter)</option>
                        <option>May 2027 (Spring)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Preferred UK Region / City</label>
                      <select 
                        value={formState.preferredRegion}
                        onChange={e => setFormState({...formState, preferredRegion: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <option>London</option>
                        <option>Manchester</option>
                        <option>Birmingham</option>
                        <option>Edinburgh</option>
                        <option>Glasgow</option>
                        <option>Bristol</option>
                        <option>Any Region</option>
                      </select>
                    </div>
                  </div>

                  {/* Finance & Qualification Questions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Do you require an Education Loan?</label>
                      <select 
                        value={formState.needLoan}
                        onChange={e => setFormState({...formState, needLoan: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <option>Yes (Secured / Unsecured)</option>
                        <option>No (Self Funded)</option>
                        <option>Not Sure</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Are Post-Study Work Options (Graduate Route) Important?</label>
                      <select 
                        value={formState.valueGraduateRoute}
                        onChange={e => setFormState({...formState, valueGraduateRoute: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <option>Yes (Crucial Priority)</option>
                        <option>No</option>
                        <option>Need Guidance</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-hero hover:opacity-90 text-white font-bold py-4 rounded-xl text-base shadow-elegant transition-all"
                    id="uk-form-submit"
                  >
                    Check My UK Study Options
                  </button>

                </form>
              )}

            </div>
          </div>
        </section>

        {/* ═══ 21. AEO FAQ ═══ */}
        <section className="py-16 bg-gradient-subtle" id="faqs">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Frequently Asked <span className="text-gradient-hero">Questions</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Everything you need to know about studying in the United Kingdom
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {UK_AEO_FAQS.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-card border rounded-xl px-6 shadow-soft data-[state=open]:shadow-elegant transition-smooth"
                  >
                    <AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:text-primary py-5 [&[data-state=open]]:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ═══ RELATED COUNTRIES ═══ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore Other <span className="text-gradient-hero">Destinations</span>
              </h2>
              <p className="text-muted-foreground text-lg">Discover more study abroad opportunities</p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {relatedCountries.map((relCountry, index) => (
                <Link
                  key={relCountry.slug}
                  to={getCountryStudyUrl(relCountry.slug)}
                  className="bg-card rounded-xl border p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth group animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{relCountry.flag}</span>
                    <div>
                      <h3 className="font-bold group-hover:text-primary transition-smooth">{relCountry.name}</h3>
                      <p className="text-xs text-muted-foreground">{relCountry.universities} Universities</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{relCountry.avgCost}</span>
                    <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/countries" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-hero text-white rounded-xl font-semibold hover-glow-primary transition-smooth">
                View All Countries <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ CONTACT CTA ═══ */}
        <section id="contact" className="py-16 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <span className="text-6xl mb-6 block">🇬🇧</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Study in the United Kingdom?
              </h2>
              <p className="text-lg opacity-90 mb-8 leading-relaxed">
                Book a free consultation with our UK education experts.
                We'll guide you through university selection, education loans, visa processing, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${UK_EDUCATION_LOAN.phoneNumber}`} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-gold text-secondary-foreground font-bold rounded-xl shadow-gold hover-glow-gold transition-smooth">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a href="https://wa.me/919211818710" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-smooth">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StudyInUKPage;
