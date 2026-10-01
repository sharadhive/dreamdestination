import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap, MapPin, DollarSign, Award, Briefcase, Clock,
  ChevronRight, Globe2, BookOpen, Users, Shield,
  Building2, ArrowRight, Star, CheckCircle2, Wallet, Calendar,
  Sparkles, Phone, MessageCircle, AlertCircle,
  Building, Check, ArrowUpRight, Search, Grid, MoveHorizontal,
  Play, Pause, FileText, TrendingUp, Monitor, Cog, Heart,
  Palette, UserCheck, Globe, BadgeCheck, BarChart3,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CountryHeroBanner from "@/components/CountryHeroBanner";
import { USA_PAGE_DATA, type USAUniversity } from "@/data/usaPageData";
import { countriesData } from "@/data/countryData";
import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";

const SITE_DOMAIN = "https://www.dreamdestinationstudyabroad.com";

// ─── Icon Map ───
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  GraduationCap, BookOpen, Briefcase, Users, Sparkles, Award,
  UserCheck, FileText, Shield, Wallet, Globe, Monitor, Cog,
  Heart, Palette, TrendingUp, BarChart3,
};
const getIcon = (name: string) => iconMap[name] || Globe2;

// ─── USA University Card ───
const USAUniversityCard: React.FC<{ uni: USAUniversity; index: number }> = ({ uni, index }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="relative group shrink-0 w-[310px] md:w-[350px] bg-card/90 backdrop-blur-md rounded-2xl p-6 border border-border/80 shadow-3d-card shadow-3d-hover transition-all duration-500 flex flex-col justify-between transform-style-3d hover:z-20 cursor-pointer"
      style={{ transform: `perspective(1000px) rotateY(${index % 2 === 0 ? "1deg" : "-1deg"})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-red-500/5 rounded-2xl pointer-events-none group-hover:from-blue-500/10 group-hover:to-red-500/15 transition-all duration-500" />
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="relative w-14 h-14 rounded-xl bg-white p-2 border border-border/60 shadow-md shrink-0 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
            {!imageError && uni.logo ? (
              <img
                src={uni.logo}
                alt={`${uni.name} logo`} width={64} height={64}
                className="w-full h-full object-contain"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full rounded-lg bg-gradient-to-r from-blue-600 to-red-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                {uni.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-600 font-bold text-xs rounded-full shadow-sm shrink-0 border border-blue-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>{uni.qsRanking || "Top US University"}</span>
          </div>
        </div>

        <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-blue-600 transition-colors leading-tight mb-2 line-clamp-2">
          {uni.name}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span className="truncate">{uni.location}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border flex items-center gap-1 ${uni.type === "Public" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-purple-500/10 text-purple-600 border-purple-500/20"}`}>
            <Building2 className="w-3 h-3" /> {uni.type}
          </span>
          {uni.stemOpt && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 border border-blue-500/20 flex items-center gap-1">
              <Check className="w-3 h-3" /> STEM OPT Eligible
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {uni.popularPrograms.slice(0, 3).map((subj, i) => (
            <span key={i} className="px-2.5 py-1 bg-muted/80 text-muted-foreground text-[11px] font-medium rounded-md border border-border/40">
              {subj}
            </span>
          ))}
          {uni.popularPrograms.length > 3 && (
            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-[10px] font-semibold rounded-md">
              +{uni.popularPrograms.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-border/40 flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-blue-600" /> {uni.avgTuition}
        </span>
        <a
          href="#lead-form"
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-white bg-blue-500/10 group-hover:bg-blue-600 group-hover:text-white px-3 py-1.5 rounded-lg transition-all duration-300 shadow-sm"
        >
          Apply Now <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

// ─── JSON-LD Generator ───
const generateUSAJsonLd = () => [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: USA_PAGE_DATA.seo.title,
    description: USA_PAGE_DATA.seo.description,
    url: `${SITE_DOMAIN}/study-in-usa`,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "DreamDestination", url: SITE_DOMAIN },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_DOMAIN },
        { "@type": "ListItem", position: 2, name: "Countries", item: `${SITE_DOMAIN}/countries` },
        { "@type": "ListItem", position: 3, name: "Study in USA", item: `${SITE_DOMAIN}/study-in-usa` },
      ],
    },
    about: { "@type": "Country", name: "United States" },
    keywords: USA_PAGE_DATA.seo.keywords.join(", "),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: USA_PAGE_DATA.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "DreamDestination",
    description: "DreamDestination is a leading study abroad consultancy providing comprehensive education services for students looking to study in the United States.",
    url: SITE_DOMAIN,
    areaServed: { "@type": "Country", name: "United States" },
  },
];

// ════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ════════════════════════════════════════════
const StudyInUSAPage = () => {
  const [activeTab, setActiveTab] = useState<"All" | "Public" | "Private">("All");
  const [uniSearch, setUniSearch] = useState("");
  const [viewMode, setViewMode] = useState<"marquee" | "grid">("marquee");
  const [isPlaying, setIsPlaying] = useState(true);
  const [showTopOnly, setShowTopOnly] = useState(false);
  const [selectedCourseStream, setSelectedCourseStream] = useState<number>(0);

  const [formState, setFormState] = useState({
    fullName: "",
    phone: "",
    email: "",
    highestQualification: "Bachelor's Degree",
    graduationYear: "2024",
    gpa: "",
    preferredCourse: "",
    preferredIntake: "Fall 2026 (August)",
    workExp: "0-2 Years",
    approxBudget: "USD 30,000 - 50,000",
    needLoan: "Yes",
    stemInterest: "Yes",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hands the enquiry to WhatsApp. Before this, the form discarded it.
    sendLeadToWhatsApp("Study in USA", formState);
    setFormSubmitted(true);
  };

  // ─── Computed Variables ───
  const filteredUniversities = USA_PAGE_DATA.universities.filter((uni) => {
    const matchesTab = activeTab === "All" || uni.type === activeTab;
    const matchesSearch =
      uniSearch === "" ||
      uni.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
      uni.location.toLowerCase().includes(uniSearch.toLowerCase()) ||
      uni.state.toLowerCase().includes(uniSearch.toLowerCase()) ||
      uni.popularPrograms.some((p) => p.toLowerCase().includes(uniSearch.toLowerCase()));
    const matchesTier = !showTopOnly || uni.type === "Private";
    return matchesTab && matchesSearch && matchesTier;
  });

  const topUnis = USA_PAGE_DATA.universities.slice(0, 10);
  const marqueeUnis = [...topUnis, ...topUnis];

  const relatedCountries = countriesData
    .filter((c) => c.slug !== "usa")
    .slice(0, 6);

  const jsonLd = generateUSAJsonLd();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-blue-500/20 selection:text-blue-600">
      <SEOHead
        title={USA_PAGE_DATA.seo.title}
        description={USA_PAGE_DATA.seo.description}
        canonicalUrl={USA_PAGE_DATA.seo.canonicalUrl}
        keywords={USA_PAGE_DATA.seo.keywords}
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

      {/* ─── Sticky Sub-Header Nav ─── */}
      <div className="sticky top-[73px] z-40 bg-background/90 backdrop-blur-md border-b text-xs py-2.5 hidden md:block shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between overflow-x-auto whitespace-nowrap gap-6 no-scrollbar">
          <span className="font-bold text-blue-600 flex items-center gap-1.5 shrink-0">
            <span>🇺🇸</span> Study in USA
          </span>
          <div className="flex items-center gap-5 text-muted-foreground font-medium">
            <a href="#overview" className="hover:text-primary transition-colors">Overview</a>
            <a href="#why-usa" className="hover:text-primary transition-colors">Why USA</a>
            <a href="#universities" className="hover:text-primary transition-colors">Universities</a>
            <a href="#courses" className="hover:text-primary transition-colors">Courses</a>
            <a href="#intakes" className="hover:text-primary transition-colors">Intakes</a>
            <a href="#cost" className="hover:text-primary transition-colors">Cost</a>
            <a href="#loans" className="hover:text-primary transition-colors">Education Loans</a>
            <a href="#f1-visa" className="hover:text-primary transition-colors">F-1 Visa</a>
            <a href="#opt-stem" className="hover:text-primary transition-colors">OPT & STEM OPT</a>
            <a href="#faqs" className="hover:text-primary transition-colors">FAQs</a>
          </div>
          <a
            href="#lead-form"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded-full transition-colors shrink-0 shadow-sm"
          >
            Apply Now
          </a>
        </div>
      </div>

      <main className="flex-1 pt-20">
        {/* ─── BREADCRUMB ─── */}
                {/* ─── HERO SECTION ─── */}
        <CountryHeroBanner
          breadcrumb={[{ label: "Home", to: "/" }, { label: "Countries", to: "/countries" }, { label: "Study in USA" }]}
          countryName="United States"
          flag="🇺🇸"
          heading="Best Study in the USA for Indian Students"
          subheading={USA_PAGE_DATA.hero.badge}
          description={USA_PAGE_DATA.hero.description}
          valueProposition={USA_PAGE_DATA.hero.valueProposition}
          badgeText="Study in the USA - DreamDestination Official Guide"
          stats={{
            universities: `${USA_PAGE_DATA.universities.length}+ Universities`,
            avgCost: "USD 25,000 - 45,000",
            workPermit: "3 Years STEM OPT",
            visaSuccessRate: "F-1 Visa Support",
          }}
          cta1Text={USA_PAGE_DATA.hero.primaryCta}
          cta1Href="#lead-form"
          cta2Text={USA_PAGE_DATA.hero.secondaryCta}
          cta2Href="tel:+919211818710"
        />

        {/* ─── USA AT A GLANCE ─── */}
        <section id="overview" className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">{USA_PAGE_DATA.atAGlance.title}</h2>
              <p className="text-muted-foreground text-sm mt-2">Essential facts and parameters for Indian students planning higher education in the USA</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {USA_PAGE_DATA.atAGlance.stats.map((stat, idx) => (
                <div key={idx} className="bg-card border rounded-xl p-4 text-center shadow-soft hover:shadow-elegant transition-all">
                  <span className="text-xs text-muted-foreground font-medium block mb-1">{stat.label}</span>
                  <span className="text-sm md:text-base font-extrabold text-blue-600 dark:text-blue-400 block">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY STUDY IN USA ─── */}
        <section id="why-usa" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Why Study in the <span className="text-blue-600">USA?</span>
              </h2>
              <p className="text-muted-foreground text-base">{USA_PAGE_DATA.whyUSA.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {USA_PAGE_DATA.whyUSA.reasons.map((reason, index) => {
                const Icon = getIcon(reason.icon);
                return (
                  <div
                    key={index}
                    className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${index % 2 === 0 ? "bg-blue-500/10 text-blue-600" : "bg-red-500/10 text-red-600"}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Who should consider USA */}
            <div className="mt-12 bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-red-500/10 border border-blue-500/20 rounded-2xl p-6 md:p-8">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-xl font-bold mb-3 text-center">{USA_PAGE_DATA.whoShouldConsider.heading}</h3>
                <p className="text-sm text-muted-foreground text-center mb-6">{USA_PAGE_DATA.whoShouldConsider.intro}</p>
                <div className="grid md:grid-cols-2 gap-3 mb-6">
                  {USA_PAGE_DATA.whoShouldConsider.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 bg-card/80 backdrop-blur p-3 rounded-xl border">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{point}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic text-center mb-4">{USA_PAGE_DATA.whoShouldConsider.disclaimer}</p>
                <div className="text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold" asChild>
                    <a href="#lead-form">{USA_PAGE_DATA.whoShouldConsider.cta.text}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TOP UNIVERSITIES ─── */}
        <section className="py-16 bg-muted/30 border-y relative overflow-hidden" id="universities">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 text-xs font-bold rounded-full mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{USA_PAGE_DATA.universities.length}+ Top US Universities</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Top Universities in the <span className="text-blue-600">USA</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-2xl">
                  No one university is the best for all students. Compare course fit, tuition, STEM OPT eligibility, and career relevance.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search university or course..."
                    value={uniSearch}
                    onChange={(e) => setUniSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-card border border-border/80 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-44 md:w-60 shadow-soft"
                    id="usa-university-search"
                  />
                </div>
                <div className="flex items-center bg-card border border-border/80 rounded-xl p-1 shadow-soft">
                  <button onClick={() => { setViewMode("marquee"); setShowTopOnly(false); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "marquee" ? "bg-blue-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                    <MoveHorizontal className="w-3.5 h-3.5" /> 3D Slider
                  </button>
                  <button onClick={() => { setViewMode("grid"); setShowTopOnly(false); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "grid" && !showTopOnly ? "bg-blue-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                    <Grid className="w-3.5 h-3.5" /> All Unis
                  </button>
                  <button onClick={() => { setViewMode("grid"); setShowTopOnly(true); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "grid" && showTopOnly ? "bg-blue-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                    <Star className="w-3.5 h-3.5" /> Top Private
                  </button>
                </div>
                {viewMode === "marquee" && !uniSearch && (
                  <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 bg-card border border-border/80 rounded-xl text-muted-foreground hover:text-blue-600 transition-colors shadow-soft" title={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mb-8 bg-muted/50 p-1 rounded-xl w-fit">
              {(["All", "Public", "Private"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {tab === "All" ? "All Universities" : tab === "Public" ? "Public Universities" : "Private Universities"}
                </button>
              ))}
            </div>

            {uniSearch ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {filteredUniversities.length > 0 ? (
                  filteredUniversities.map((uni, idx) => (
                    <div key={idx} className="w-full"><USAUniversityCard uni={uni} index={idx} /></div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-muted-foreground">No universities found matching "{uniSearch}".</div>
                )}
              </div>
            ) : viewMode === "marquee" ? (
              <div className="relative w-full overflow-hidden py-6 perspective-1000">
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
                <div className={`flex gap-6 w-max ${isPlaying ? "animate-marquee-3d" : ""}`}>
                  {marqueeUnis.map((uni, idx) => (
                    <USAUniversityCard key={`${uni.name}-${idx}`} uni={uni} index={idx} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {filteredUniversities.map((uni, idx) => (
                  <div key={idx} className="w-full"><USAUniversityCard uni={uni} index={idx} /></div>
                ))}
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center mt-6 italic">
              Rankings based on QS World University Rankings 2026. Rankings are indicative and should not be the sole factor in university selection.
            </p>

            <div className="text-center mt-10 bg-card border rounded-xl p-8 shadow-soft max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-2">Not sure which US university fits your profile?</h3>
              <p className="text-sm text-muted-foreground mb-4">Share your academics, preferred course, and budget. Our counsellors can help you narrow down your choices.</p>
              <a href="#lead-form" className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all text-sm">
                Get Profile Guidance <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ─── PUBLIC VS PRIVATE ─── */}
        <section id="public-vs-private" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Know Before You Apply</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">{USA_PAGE_DATA.publicVsPrivate.title}</h2>
              <p className="text-muted-foreground text-sm">{USA_PAGE_DATA.publicVsPrivate.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Public */}
              <div className="bg-card border-2 border-emerald-500/20 rounded-2xl p-8 shadow-soft">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{USA_PAGE_DATA.publicVsPrivate.publicUni.title}</h3>
                <p className="text-xs text-muted-foreground mb-4">{USA_PAGE_DATA.publicVsPrivate.publicUni.description}</p>
                <ul className="grid grid-cols-2 gap-2 text-xs mb-4">
                  {USA_PAGE_DATA.publicVsPrivate.publicUni.offers.map((off, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{off}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-semibold text-emerald-600">{USA_PAGE_DATA.publicVsPrivate.publicUni.bestFor}</p>
              </div>

              {/* Private */}
              <div className="bg-card border-2 border-blue-500/20 rounded-2xl p-8 shadow-soft">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-6">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{USA_PAGE_DATA.publicVsPrivate.privateUni.title}</h3>
                <p className="text-xs text-muted-foreground mb-4">{USA_PAGE_DATA.publicVsPrivate.privateUni.description}</p>
                <ul className="grid grid-cols-2 gap-2 text-xs mb-4">
                  {USA_PAGE_DATA.publicVsPrivate.privateUni.offers.map((off, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-blue-500" />
                      <span>{off}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-semibold text-blue-600">{USA_PAGE_DATA.publicVsPrivate.privateUni.bestFor}</p>
              </div>
            </div>

            <div className="mt-8 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 max-w-5xl mx-auto flex items-center gap-3 text-xs text-amber-700 dark:text-amber-300">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-500" />
              <span>{USA_PAGE_DATA.publicVsPrivate.keyAdvice}</span>
            </div>
          </div>
        </section>

        {/* ─── POPULAR COURSES ─── */}
        <section id="courses" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Popular Courses to Study in the <span className="text-blue-600">USA</span>
              </h2>
              <p className="text-muted-foreground text-sm">High-demand programmes offering robust job markets and OPT/STEM OPT career pathways</p>
            </div>

            {/* Course Stream Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {USA_PAGE_DATA.popularCourses.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCourseStream(idx)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all border ${selectedCourseStream === idx ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-card text-muted-foreground border-border/60 hover:text-foreground"}`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {USA_PAGE_DATA.popularCourses.map((cat, idx) => {
                const Icon = getIcon(cat.icon);
                return (
                  <div
                    key={idx}
                    className={`bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all ${selectedCourseStream === idx ? "ring-2 ring-blue-500/40 shadow-elegant" : ""}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${idx % 2 === 0 ? "bg-blue-500/10 text-blue-600" : "bg-red-500/10 text-red-600"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg">{cat.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.courses.map((course, cIdx) => (
                        <span key={cIdx} className="text-xs px-3 py-1.5 rounded-lg bg-muted text-foreground font-medium hover:bg-blue-500/10 hover:text-blue-600 transition-colors cursor-pointer">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── MS IN USA ─── */}
        <section id="ms-usa" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">High-Value Section</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">
                  MS in the USA for <span className="text-blue-600">Indian Students</span>
                </h2>
                <p className="text-muted-foreground text-sm max-w-2xl mx-auto">{USA_PAGE_DATA.msInUSA.description}</p>
              </div>

              <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft">
                <h3 className="font-bold text-lg mb-4">Key Considerations When Applying for an MS:</h3>
                <div className="grid md:grid-cols-2 gap-3 mb-6">
                  {USA_PAGE_DATA.msInUSA.considerations.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 mb-6">
                  <p className="text-sm text-foreground font-medium">{USA_PAGE_DATA.msInUSA.note}</p>
                </div>
                <div className="text-center">
                  <a href={USA_PAGE_DATA.msInUSA.cta.href} className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
                    <BadgeCheck className="w-5 h-5" />
                    {USA_PAGE_DATA.msInUSA.cta.text}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── INTAKES & TIMELINE ─── */}
        <section id="intakes" className="py-20 bg-muted/30 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                USA Intakes & <span className="text-blue-600">Planning Timeline</span>
              </h2>
              <p className="text-muted-foreground text-sm">Understand major admission cycles and follow our step-by-step roadmap</p>
            </div>

            {/* Intakes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {USA_PAGE_DATA.intakes.map((intake, idx) => (
                <div key={idx} className={`bg-card border rounded-2xl p-6 shadow-soft ${idx === 0 ? "ring-2 ring-blue-500/30" : ""}`}>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3 ${idx === 0 ? "bg-blue-500/10 text-blue-600" : "bg-muted text-muted-foreground"}`}>
                    {intake.status}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{intake.season}</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{intake.description}</p>
                  <div className="pt-3 border-t text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>{intake.timeline}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="max-w-4xl mx-auto space-y-4">
              <h3 className="text-xl font-bold text-center mb-6">When Should Indian Students Start Preparing?</h3>
              {USA_PAGE_DATA.timeline.map((step, idx) => (
                <div key={idx} className="bg-card border rounded-xl p-5 shadow-soft flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs shrink-0">{step.phase}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-foreground">{step.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── COST OF STUDY ─── */}
        <section id="cost" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Cost of Studying in the <span className="text-blue-600">USA</span>
              </h2>
              <p className="text-muted-foreground text-sm">{USA_PAGE_DATA.costOfStudy.intro}</p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Tuition Table */}
              <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft mb-8">
                <h3 className="font-bold text-lg mb-4">Indicative Annual Tuition (Planning Range)</h3>
                <div className="space-y-3 mb-6">
                  {USA_PAGE_DATA.costOfStudy.breakdown.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-muted/40 gap-2 border">
                      <span className="font-semibold text-sm text-foreground">{item.level}</span>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="font-bold text-blue-600">{item.cost}</span>
                        <span className="text-xs text-muted-foreground">({item.note})</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="font-bold mb-3">Budget Items to Consider</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {USA_PAGE_DATA.costOfStudy.budgetItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost of Living Cities */}
              <div className="bg-card border rounded-2xl p-6 shadow-soft mb-8">
                <h3 className="font-bold text-lg mb-2">Cost of Living Varies by City</h3>
                <p className="text-xs text-muted-foreground mb-4">{USA_PAGE_DATA.costOfLiving.intro}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {USA_PAGE_DATA.costOfLiving.cities.map((city, i) => (
                    <div key={i} className="p-3 bg-muted/50 rounded-xl border">
                      <p className="font-semibold text-sm text-foreground">{city.name}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${city.costLevel === "Very High" ? "bg-red-500/10 text-red-600" : city.costLevel === "High" ? "bg-orange-500/10 text-orange-600" : "bg-emerald-500/10 text-emerald-600"}`}>
                        {city.costLevel}
                      </span>
                      <p className="text-[11px] text-muted-foreground mt-1">{city.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-700 dark:text-amber-300">
                <AlertCircle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                <div>
                  <strong className="block mb-0.5">Important Disclaimer:</strong>
                  {USA_PAGE_DATA.costOfStudy.disclaimer}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SCHOLARSHIPS ─── */}
        <section id="scholarships" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Scholarships in the <span className="text-blue-600">USA</span>
              </h2>
              <p className="text-muted-foreground text-sm">{USA_PAGE_DATA.scholarships.intro}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              {USA_PAGE_DATA.scholarships.categories.map((cat, i) => (
                <div key={i} className="bg-card p-6 rounded-xl border shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${i === 0 ? "bg-blue-500/10 text-blue-600" : "bg-amber-500/10 text-amber-600"}`}>
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg">{cat.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {cat.items.map((item, ii) => (
                      <li key={ii} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5 max-w-4xl mx-auto">
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wide mb-1">Important</p>
              <p className="text-sm text-foreground">{USA_PAGE_DATA.scholarships.disclaimer}</p>
            </div>
          </div>
        </section>

        {/* ─── EDUCATION LOANS ─── */}
        <section id="loans" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">DreamDestination Differentiator</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">
                Education Loan for Studying in the <span className="text-blue-600">USA</span>
              </h2>
              <p className="text-muted-foreground text-sm">{USA_PAGE_DATA.educationLoan.intro}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              <div className="bg-card border rounded-2xl p-6 text-center shadow-soft">
                <Wallet className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <span className="text-xs text-muted-foreground font-medium block">Maximum Loan Amount</span>
                <span className="text-2xl font-extrabold text-foreground">{USA_PAGE_DATA.educationLoan.maxAmount}</span>
              </div>
              <div className="bg-card border rounded-2xl p-6 text-center shadow-soft">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <span className="text-xs text-muted-foreground font-medium block">Unsecured Limit (No Collateral)</span>
                <span className="text-2xl font-extrabold text-foreground">{USA_PAGE_DATA.educationLoan.unsecuredMax}</span>
              </div>
              <div className="bg-card border rounded-2xl p-6 text-center shadow-soft">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <span className="text-xs text-muted-foreground font-medium block">Interest Rate Range</span>
                <span className="text-2xl font-extrabold text-foreground">{USA_PAGE_DATA.educationLoan.interestRate}</span>
              </div>
            </div>

            {/* Services & Highlights */}
            <div className="bg-card border rounded-2xl p-6 md:p-8 max-w-5xl mx-auto shadow-soft mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">We Can Help You With:</h3>
                  <div className="grid gap-3">
                    {USA_PAGE_DATA.educationLoan.services.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Loan Highlights:</h3>
                  <div className="grid gap-3">
                    {USA_PAGE_DATA.educationLoan.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Unsecured & Rejected Loan */}
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
              <div className="bg-card p-6 rounded-xl border shadow-soft">
                <h3 className="font-bold text-base mb-3 text-blue-600">{USA_PAGE_DATA.educationLoan.unsecuredLoan.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{USA_PAGE_DATA.educationLoan.unsecuredLoan.answer}</p>
              </div>
              <div className="bg-card p-6 rounded-xl border shadow-soft">
                <h3 className="font-bold text-base mb-3 text-blue-600">{USA_PAGE_DATA.educationLoan.rejectedLoan.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{USA_PAGE_DATA.educationLoan.rejectedLoan.answer}</p>
              </div>
            </div>

            <div className="text-center">
              <a href={`tel:${USA_PAGE_DATA.educationLoan.phoneNumber}`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all">
                <Phone className="w-5 h-5" />
                Call {USA_PAGE_DATA.educationLoan.phoneNumber} for Loan Options
              </a>
            </div>
          </div>
        </section>

        {/* ─── ADMISSION REQUIREMENTS ─── */}
        <section id="admission" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                USA Admission <span className="text-blue-600">Requirements</span>
              </h2>
              <p className="text-muted-foreground text-center mb-8 text-sm">{USA_PAGE_DATA.admissionRequirements.intro}</p>

              <div className="bg-card rounded-2xl border shadow-elegant p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {USA_PAGE_DATA.admissionRequirements.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gradient-subtle rounded-lg">
                      <div className="w-7 h-7 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-blue-600">{i + 1}</span>
                      </div>
                      <span className="text-sm text-foreground">{req}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                  <p className="text-sm text-foreground flex items-start gap-2">
                    <BadgeCheck className="w-4 h-4 shrink-0 mt-0.5 text-blue-500" />
                    <span><strong>AEO Answer:</strong> {USA_PAGE_DATA.admissionRequirements.aeoAnswer}</span>
                  </p>
                </div>
                <p className="text-xs text-muted-foreground italic mt-4 text-center">{USA_PAGE_DATA.admissionRequirements.disclaimer}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── APPLICATION PROCESS ─── */}
        <section id="application" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                How to Apply to <span className="text-blue-600">US Universities</span> from India
              </h2>
              <div className="relative mt-12">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-500/20 hidden md:block" />
                <div className="space-y-6">
                  {USA_PAGE_DATA.applicationProcess.map((step, i) => (
                    <div key={i} className="flex gap-6 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                      <div className="shrink-0 hidden md:block">
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-elegant z-10 relative">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1 bg-card p-5 rounded-xl border shadow-soft">
                        <div className="flex items-center gap-2 mb-1 md:hidden">
                          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">{step.step}</span>
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

        {/* ─── F-1 VISA ─── */}
        <section id="f1-visa" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                F-1 Student Visa for <span className="text-blue-600">Indian Students</span>
              </h2>
              <p className="text-muted-foreground text-center mb-8 text-sm">{USA_PAGE_DATA.f1Visa.intro}</p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card p-5 rounded-xl border shadow-soft text-center">
                  <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Visa Application Fee</p>
                  <p className="font-bold text-2xl text-blue-600">{USA_PAGE_DATA.f1Visa.visaFee}</p>
                  <p className="text-xs text-muted-foreground mt-1">MRV Fee</p>
                </div>
                <div className="bg-card p-5 rounded-xl border shadow-soft text-center">
                  <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">SEVIS Fee</p>
                  <p className="font-bold text-2xl text-blue-600">{USA_PAGE_DATA.f1Visa.sevisFee}</p>
                  <p className="text-xs text-muted-foreground mt-1">I-901 SEVIS Fee</p>
                </div>
                <div className="bg-card p-5 rounded-xl border shadow-soft text-center">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Processing Time</p>
                  <p className="font-bold text-lg">Varies by Consulate</p>
                  <p className="text-xs text-muted-foreground mt-1">Apply well in advance</p>
                </div>
              </div>

              {/* Journey */}
              <div className="bg-blue-600 text-white p-5 rounded-xl mb-6">
                <p className="text-xs font-bold uppercase tracking-wide mb-2 opacity-80">Typical F-1 Journey</p>
                <p className="text-sm font-semibold">{USA_PAGE_DATA.f1Visa.journey}</p>
              </div>

              {/* Documents */}
              <div className="bg-card rounded-2xl border shadow-elegant p-6 mb-8">
                <h3 className="font-bold text-lg mb-4">Common F-1 Visa Documents</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {USA_PAGE_DATA.f1Visa.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visa Interview */}
              <div className="bg-card rounded-2xl border shadow-soft p-6">
                <h3 className="font-bold text-lg mb-3">{USA_PAGE_DATA.visaInterview.heading}</h3>
                <p className="text-sm text-muted-foreground mb-4">{USA_PAGE_DATA.visaInterview.intro}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">Common Interview Questions</p>
                    <ul className="space-y-2">
                      {USA_PAGE_DATA.visaInterview.commonQuestions.map((q, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-blue-500 shrink-0 font-bold">→</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">How We Help You Prepare</p>
                    <ul className="space-y-2">
                      {USA_PAGE_DATA.visaInterview.ourHelp.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic mt-4">{USA_PAGE_DATA.visaInterview.disclaimer}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WORK WHILE STUDYING ─── */}
        <section id="work-study" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Working While <span className="text-blue-600">Studying</span> in the USA
              </h2>
              <div className="bg-card p-8 rounded-2xl border shadow-elegant">
                <p className="text-muted-foreground leading-relaxed mb-4">{USA_PAGE_DATA.workWhileStudying.intro}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{USA_PAGE_DATA.workWhileStudying.details}</p>
                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-xl">
                  <p className="text-sm text-orange-800 dark:text-orange-200 flex items-start gap-2">
                    <Shield className="w-4 h-4 shrink-0 mt-0.5" />
                    <span><strong>Important: </strong>{USA_PAGE_DATA.workWhileStudying.disclaimer}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── OPT & STEM OPT ─── */}
        <section id="opt-stem" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Crucial for USA SEO</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">
                  OPT & STEM OPT for <span className="text-blue-600">International Students</span>
                </h2>
                <p className="text-muted-foreground text-sm max-w-2xl mx-auto">{USA_PAGE_DATA.optAndStemOpt.intro}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card p-6 rounded-xl border shadow-soft ring-2 ring-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-sm">OPT</div>
                    <h3 className="font-bold text-lg">{USA_PAGE_DATA.optAndStemOpt.opt.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{USA_PAGE_DATA.optAndStemOpt.opt.description}</p>
                  <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                    <p className="text-2xl font-extrabold text-blue-600 text-center">12 Months</p>
                    <p className="text-xs text-muted-foreground text-center">Standard OPT Duration</p>
                  </div>
                </div>
                <div className="bg-card p-6 rounded-xl border shadow-soft ring-2 ring-emerald-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">STEM</div>
                    <h3 className="font-bold text-lg">{USA_PAGE_DATA.optAndStemOpt.stemOpt.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{USA_PAGE_DATA.optAndStemOpt.stemOpt.description}</p>
                  <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg">
                    <p className="text-2xl font-extrabold text-emerald-600 text-center">+24 Months</p>
                    <p className="text-xs text-muted-foreground text-center">STEM OPT Extension (36 Total)</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5 mb-4">
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wide mb-1">AEO — OPT & STEM OPT Answer</p>
                <p className="text-sm text-foreground font-medium">{USA_PAGE_DATA.optAndStemOpt.aeoAnswer}</p>
              </div>
              <p className="text-xs text-muted-foreground italic text-center">{USA_PAGE_DATA.optAndStemOpt.disclaimer}</p>
            </div>
          </div>
        </section>

        {/* ─── POPULAR CITIES ─── */}
        <section id="cities" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Popular USA Cities for <span className="text-blue-600">Indian Students</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {USA_PAGE_DATA.cities.map((city, idx) => (
                <div key={idx} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">{city.name}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 font-semibold shrink-0">{city.state}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{city.description}</p>
                  <div className="pt-3 border-t text-[11px] text-muted-foreground">
                    <strong className="text-foreground">Universities:</strong> {city.universities}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DOCUMENTS ─── */}
        <section id="documents" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Documents to <span className="text-blue-600">Study in the USA</span>
              </h2>
              <p className="text-muted-foreground text-center mb-8 text-sm">{USA_PAGE_DATA.documents.intro}</p>
              <div className="bg-card rounded-2xl border shadow-elegant p-6">
                <div className="grid md:grid-cols-2 gap-3">
                  {USA_PAGE_DATA.documents.list.map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gradient-subtle rounded-lg">
                      <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="text-sm text-foreground">{doc}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic mt-4 text-center">{USA_PAGE_DATA.documents.disclaimer}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHY DreamDestination ─── */}
        <section id="why-dd" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="text-blue-600">DreamDestination</span> for Your USA Journey?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {USA_PAGE_DATA.whyDD.map((item, i) => {
                const Icon = getIcon(item.icon);
                return (
                  <div key={i} className="bg-card p-6 rounded-xl border shadow-soft hover:shadow-elegant transition-smooth group animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                    <div className={`p-3 rounded-xl ${i % 3 === 0 ? "bg-blue-500/10 text-blue-600" : i % 3 === 1 ? "bg-amber-500/10 text-amber-600" : "bg-red-500/10 text-red-600"} w-fit mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base mb-2 group-hover:text-blue-600 transition-smooth">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── LEAD FORM ─── */}
        <section id="lead-form" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-card border-2 border-blue-500/30 rounded-3xl p-6 md:p-10 shadow-elegant">

              <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Free Online Counselling</span>
                <h2 className="text-2xl md:text-3xl font-extrabold">
                  Get Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-600">USA Profile Assessment</span>
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Fill out your academic details to receive personalised course, university, loan, and STEM OPT recommendations.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h3 className="text-2xl font-bold text-foreground">WhatsApp is opening</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Press Send in WhatsApp to reach our USA Education Specialist. Your enquiry is not received until you send the message.
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
                      <input type="text" required placeholder="John Doe" value={formState.fullName}
                        onChange={e => setFormState({ ...formState, fullName: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Mobile Number *</label>
                      <input type="tel" required placeholder="+91 98765 43210" value={formState.phone}
                        onChange={e => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Email Address *</label>
                      <input type="email" required placeholder="john@example.com" value={formState.email}
                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
                    </div>
                  </div>

                  {/* Academic Profile */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Highest Qualification</label>
                      <select value={formState.highestQualification} onChange={e => setFormState({ ...formState, highestQualification: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                        <option>12th Standard</option>
                        <option>Bachelor's Degree</option>
                        <option>Master's Degree</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Graduation Year</label>
                      <select value={formState.graduationYear} onChange={e => setFormState({ ...formState, graduationYear: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                        <option>2026 (Pursuing)</option>
                        <option>2025</option>
                        <option>2024</option>
                        <option>2023</option>
                        <option>2022 or earlier</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Current Score (% / CGPA)</label>
                      <input type="text" placeholder="e.g. 78% or 8.2 CGPA" value={formState.gpa}
                        onChange={e => setFormState({ ...formState, gpa: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Preferred Field / Course</label>
                      <input type="text" placeholder="e.g. MS Computer Science / MBA" value={formState.preferredCourse}
                        onChange={e => setFormState({ ...formState, preferredCourse: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Target Intake</label>
                      <select value={formState.preferredIntake} onChange={e => setFormState({ ...formState, preferredIntake: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                        <option>Fall 2026 (August)</option>
                        <option>Spring 2027 (January)</option>
                        <option>Fall 2027 (August)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Work Experience</label>
                      <select value={formState.workExp} onChange={e => setFormState({ ...formState, workExp: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                        <option>0-2 Years</option>
                        <option>2-5 Years</option>
                        <option>5+ Years</option>
                        <option>No Experience (Fresh Graduate)</option>
                      </select>
                    </div>
                  </div>

                  {/* Finance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Do you require an Education Loan?</label>
                      <select value={formState.needLoan} onChange={e => setFormState({ ...formState, needLoan: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                        <option>Yes (Secured / Unsecured)</option>
                        <option>No (Self Funded)</option>
                        <option>Not Sure</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1 text-foreground">Are STEM OPT opportunities important to you?</label>
                      <select value={formState.stemInterest} onChange={e => setFormState({ ...formState, stemInterest: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                        <option>Yes (High Priority)</option>
                        <option>No</option>
                        <option>Need Guidance</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 text-white font-bold py-4 rounded-xl text-base shadow-elegant transition-all"
                    id="usa-form-submit"
                  >
                    Get My USA Study Plan
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ─── AEO FAQ ─── */}
        <section id="faqs" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Frequently Asked <span className="text-blue-600">Questions</span>
                </h2>
                <p className="text-muted-foreground text-lg">Everything you need to know about studying in the United States</p>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {USA_PAGE_DATA.faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-card border rounded-xl px-6 shadow-soft data-[state=open]:shadow-elegant transition-smooth"
                  >
                    <AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:text-blue-600 py-5 [&[data-state=open]]:text-blue-600">
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

        {/* ─── RELATED COUNTRIES ─── */}
        <section className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore Other <span className="text-blue-600">Destinations</span>
              </h2>
              <p className="text-muted-foreground text-lg">Discover more study abroad opportunities</p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {relatedCountries.map((relCountry, index) => (
                <Link
                  key={relCountry.slug}
                  to={`/countries/${relCountry.slug}`}
                  className="bg-card rounded-xl border p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth group animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{relCountry.flag}</span>
                    <div>
                      <h3 className="font-bold group-hover:text-blue-600 transition-smooth">{relCountry.name}</h3>
                      <p className="text-xs text-muted-foreground">{relCountry.universities} Universities</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{relCountry.avgCost}</span>
                    <span className="flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/countries" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-smooth">
                View All Countries <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── CONTACT CTA ─── */}
        <section id="contact" className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-red-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <span className="text-6xl mb-6 block">🇺🇸</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Study in the United States?
              </h2>
              <p className="text-lg opacity-90 mb-8 leading-relaxed">
                Book a free consultation with our USA education experts.
                We'll guide you through university selection, education loans, F-1 visa processing, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${USA_PAGE_DATA.educationLoan.phoneNumber}`} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold rounded-xl shadow-lg transition-all">
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

export default StudyInUSAPage;
