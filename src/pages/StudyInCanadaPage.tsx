import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  GraduationCap, MapPin, DollarSign, Award, Briefcase, Clock,
  ChevronRight, ExternalLink, Globe2, BookOpen, Users, Shield,
  Building2, ArrowRight, Star, CheckCircle2, Wallet, Calendar,
  Sparkles, HelpCircle, Phone, MessageCircle, AlertCircle, FileCheck2,
  Building, Compass, Check, ArrowUpRight, Search, Grid, MoveHorizontal,
  Play, Pause
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CountryHeroBanner from "@/components/CountryHeroBanner";
import { CANADA_PAGE_DATA } from "@/data/canadaPageData";
import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";

// ─── Canada University Card (3D Tilt & Logo Fallback) ───
const CanadaUniversityCard: React.FC<{ uni: typeof CANADA_PAGE_DATA.universities[0]; index: number }> = ({ uni, index }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="relative group shrink-0 w-[310px] md:w-[350px] bg-card/90 backdrop-blur-md rounded-2xl p-6 border border-border/80 shadow-3d-card shadow-3d-hover transition-all duration-500 flex flex-col justify-between transform-style-3d hover:z-20 cursor-pointer"
      style={{ transform: `perspective(1000px) rotateY(${index % 2 === 0 ? "1deg" : "-1deg"})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-amber-500/5 rounded-2xl pointer-events-none group-hover:from-red-500/10 group-hover:to-amber-500/15 transition-all duration-500" />
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
              <div className="w-full h-full rounded-lg bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                {uni.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-red-500/10 text-red-600 font-bold text-xs rounded-full shadow-sm shrink-0 border border-red-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>{uni.qsRanking || "DLI Registered"}</span>
          </div>
        </div>
        <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-red-600 transition-colors leading-tight mb-2 line-clamp-2">
          {uni.name}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
          <span className="truncate">{uni.location}, {uni.province}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {uni.pgwpEligible && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <Check className="w-3 h-3" /> PGWP Eligible
            </span>
          )}
          {uni.coOpAvailable && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> Co-Op Placements
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
            <span className="px-2 py-1 bg-red-500/10 text-red-600 text-[10px] font-semibold rounded-md">
              +{uni.popularPrograms.length - 3} more
            </span>
          )}
        </div>
      </div>
      <div className="pt-3 border-t border-border/40 flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
          <GraduationCap className="w-4 h-4 text-red-600" /> {uni.type}
        </span>
        <a
          href="#lead-form"
          className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-white bg-red-500/10 group-hover:bg-red-600 group-hover:text-white px-3 py-1.5 rounded-lg transition-all duration-300 shadow-sm"
        >
          Apply Now <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

const StudyInCanadaPage = () => {
  const [activeTab, setActiveTab] = useState<"All" | "University" | "College">("All");
  const [selectedCourseStream, setSelectedCourseStream] = useState<number>(0);
  const [uniSearch, setUniSearch] = useState("");
  const [viewMode, setViewMode] = useState<"marquee" | "grid">("marquee");
  const [isPlaying, setIsPlaying] = useState(true);
  const [showTopOnly, setShowTopOnly] = useState(false);
  
  // Lead form state
  const [formState, setFormState] = useState({
    fullName: "",
    phone: "",
    email: "",
    highestQualification: "Bachelor's Degree",
    graduationYear: "2024",
    gpa: "",
    preferredCourse: "",
    preferredIntake: "September 2026 (Fall)",
    preferredProvince: "Ontario",
    workExp: "0-2 Years",
    approxBudget: "₹15-25 Lakhs",
    needLoan: "Yes",
    valuePgwp: "Yes"
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hands the enquiry to WhatsApp. Before this, the form discarded it.
    sendLeadToWhatsApp("Study in Canada", formState);
    setFormSubmitted(true);
  };

  const filteredUniversities = CANADA_PAGE_DATA.universities.filter(uni => {
    const matchesTab = activeTab === "All" || uni.type === activeTab;
    const matchesSearch =
      uniSearch === "" ||
      uni.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
      uni.location.toLowerCase().includes(uniSearch.toLowerCase()) ||
      uni.province.toLowerCase().includes(uniSearch.toLowerCase()) ||
      uni.popularPrograms.some(p => p.toLowerCase().includes(uniSearch.toLowerCase()));
    const matchesTier = !showTopOnly || uni.type === "University";
    return matchesTab && matchesSearch && matchesTier;
  });

  const topUnis = CANADA_PAGE_DATA.universities.filter(u => u.type === "University");
  const marqueeUnis = [...topUnis, ...topUnis];

  // Generate JSON-LD Schema for Canada Page
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalCredential",
      "name": "Study in Canada Consultancy",
      "description": CANADA_PAGE_DATA.seo.description,
      "educationalLevel": "Higher Education",
      "credentialCategory": "Degree"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": CANADA_PAGE_DATA.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-red-500/20 selection:text-red-600">
      <SEOHead
        title={CANADA_PAGE_DATA.seo.title}
        description={CANADA_PAGE_DATA.seo.description}
        canonicalUrl={CANADA_PAGE_DATA.seo.canonicalUrl}
        keywords={CANADA_PAGE_DATA.seo.keywords}
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

      {/* pt-20 clears the fixed site header, which takes no space in the
          document flow. Matches StudyInUKPage. */}
      <main className="flex-1 pt-20">
      {/* ─── Sticky Sub-Header Nav ─── */}
      <div className="sticky top-[73px] z-40 bg-background/90 backdrop-blur-md border-b text-xs py-2.5 hidden md:block shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between overflow-x-auto whitespace-nowrap gap-6 no-scrollbar">
          <span className="font-bold text-red-600 flex items-center gap-1.5 shrink-0">
            <span>🇨🇦</span> Study in Canada
          </span>
          <div className="flex items-center gap-5 text-muted-foreground font-medium">
            <a href="#overview" className="hover:text-primary transition-colors">Overview</a>
            <a href="#why-canada" className="hover:text-primary transition-colors">Why Canada</a>
            <a href="#universities" className="hover:text-primary transition-colors">Universities & Colleges</a>
            <a href="#univ-vs-college" className="hover:text-primary transition-colors">Univ vs College</a>
            <a href="#courses" className="hover:text-primary transition-colors">Popular Courses</a>
            <a href="#cost" className="hover:text-primary transition-colors">Tuition & Costs</a>
            <a href="#loans" className="hover:text-primary transition-colors">Education Loans</a>
            <a href="#pgwp" className="hover:text-primary transition-colors">PGWP & DLI</a>
            <a href="#faqs" className="hover:text-primary transition-colors">AEO FAQs</a>
          </div>
          <a
            href="#lead-form"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded-full transition-colors shrink-0 shadow-sm"
          >
            Apply Now
          </a>
        </div>
      </div>

        {/* ─── HERO SECTION ─── */}
        <CountryHeroBanner
          breadcrumb={[{ label: "Home", to: "/" }, { label: "Countries", to: "/countries" }, { label: "Study in Canada" }]}
          countryName="Canada"
          flag="🇨🇦"
          heading="Best Study in Canada for Indian Students"
          subheading={CANADA_PAGE_DATA.hero.badge}
          description={CANADA_PAGE_DATA.hero.description}
          valueProposition={CANADA_PAGE_DATA.hero.valueProposition}
          badgeText="Study in Canada - DreamDestination Official Guide"
          stats={{
            universities: `${CANADA_PAGE_DATA.universities.length}+ Institutions`,
            avgCost: "₹15 - 25 Lakhs/yr",
            workPermit: "3-Year PGWP",
            visaSuccessRate: "Study Permit",
          }}
          cta1Text={CANADA_PAGE_DATA.hero.primaryCta}
          cta1Href="#lead-form"
          cta2Text={CANADA_PAGE_DATA.hero.secondaryCta}
          cta2Href="tel:+919211818710"
        />

        {/* ─── CANADA AT A GLANCE ─── */}
        <section id="overview" className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">{CANADA_PAGE_DATA.atAGlance.title}</h2>
              <p className="text-muted-foreground text-sm mt-2">Essential facts and parameters for Indian students planning higher education in Canada</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {CANADA_PAGE_DATA.atAGlance.stats.map((stat, idx) => (
                <div key={idx} className="bg-card border rounded-xl p-4 text-center shadow-soft hover:shadow-elegant transition-all">
                  <span className="text-xs text-muted-foreground font-medium block mb-1">{stat.label}</span>
                  <span className="text-sm md:text-base font-extrabold text-red-600 dark:text-red-400 block">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY STUDY IN CANADA ─── */}
        <section id="why-canada" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Why India's Students Select <span className="text-red-600">Canada</span>
              </h2>
              <p className="text-muted-foreground text-base">
                {CANADA_PAGE_DATA.whyCanada.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CANADA_PAGE_DATA.whyCanada.reasons.map((reason, index) => (
                <div 
                  key={index}
                  className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-red-600 transition-colors">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>

            {/* Who should consider Canada callout */}
            <div className="mt-12 bg-gradient-to-r from-red-600/10 via-red-500/5 to-amber-500/10 border border-red-500/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-foreground">Who Should Consider Studying in Canada?</h4>
                <p className="text-sm text-muted-foreground">
                  Students seeking internationally recognized qualifications, paid co-op internships, multicultural campus life, and up to 3 years of post-study work eligibility.
                </p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold shrink-0" asChild>
                <a href="#lead-form">Get Profile Assessment</a>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── 6. TOP UNIVERSITIES & COLLEGES ─── */}
        <section className="py-16 bg-background relative overflow-hidden" id="universities">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-600 text-xs font-bold rounded-full mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{CANADA_PAGE_DATA.universities.length}+ DLIs & Institutions</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Top Universities & Colleges in <span className="text-red-600">Canada</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-2xl">
                  Compare tuition fees, popular programs, co-op availability, and PGWP eligibility across premier DLIs in Canada.
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
                    className="pl-9 pr-4 py-2 bg-card border border-border/80 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 w-44 md:w-60 shadow-soft"
                    id="canada-university-search"
                  />
                </div>
                <div className="flex items-center bg-card border border-border/80 rounded-xl p-1 shadow-soft">
                  <button onClick={() => { setViewMode("marquee"); setShowTopOnly(false); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "marquee" ? "bg-red-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                    <MoveHorizontal className="w-3.5 h-3.5" /> 3D Slider
                  </button>
                  <button onClick={() => { setViewMode("grid"); setShowTopOnly(false); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "grid" && !showTopOnly ? "bg-red-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                    <Grid className="w-3.5 h-3.5" /> All DLIs
                  </button>
                  <button onClick={() => { setViewMode("grid"); setShowTopOnly(true); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "grid" && showTopOnly ? "bg-red-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                    <Star className="w-3.5 h-3.5" /> Top Unis
                  </button>
                </div>
                {viewMode === "marquee" && !uniSearch && (
                  <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 bg-card border border-border/80 rounded-xl text-muted-foreground hover:text-red-600 transition-colors shadow-soft" title={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>

            {/* Filter Tabs for Category */}
            <div className="flex items-center gap-2 mb-8 bg-muted/50 p-1 rounded-xl w-fit">
              {(["All", "University", "College"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === tab 
                      ? "bg-card text-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "All" ? "All Institutions" : tab === "University" ? "Universities" : "Colleges & Polytechnics"}
                </button>
              ))}
            </div>

            {uniSearch ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {filteredUniversities.length > 0 ? (
                  filteredUniversities.map((uni, idx) => (
                    <div key={idx} className="w-full"><CanadaUniversityCard uni={uni} index={idx} /></div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-muted-foreground">No institutions found matching "{uniSearch}".</div>
                )}
              </div>
            ) : viewMode === "marquee" ? (
              <div className="relative w-full overflow-hidden py-6 perspective-1000">
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                <div className={`flex gap-6 w-max ${isPlaying ? "animate-marquee-3d" : ""}`}>
                  {marqueeUnis.map((uni, idx) => (
                    <CanadaUniversityCard key={`${uni.name}-${idx}`} uni={uni} index={idx} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {filteredUniversities.map((uni, idx) => (
                  <div key={idx} className="w-full"><CanadaUniversityCard uni={uni} index={idx} /></div>
                ))}
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center mt-6 italic">
              Rankings and DLI details are updated as per official QS 2026 and IRCC records. Rankings are indicative.
            </p>

            {/* University CTA */}
            <div className="text-center mt-10 bg-card border rounded-xl p-8 shadow-soft max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-2">Not sure which university or college in Canada fits you?</h3>
              <p className="text-sm text-muted-foreground mb-4">Share your academics, preferred course, and budget. Our counsellors can assist you to narrow down your choices.</p>
              <a href="#lead-form" className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all text-sm">
                Get Profile Guidance <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ─── UNIVERSITY VS COLLEGE COMPARISON ─── */}
        <section id="univ-vs-college" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Search Intent Deep Dive</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">
                {CANADA_PAGE_DATA.universityVsCollege.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {CANADA_PAGE_DATA.universityVsCollege.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Universities Card */}
              <div className="bg-card border-2 border-red-500/20 rounded-2xl p-8 shadow-soft relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{CANADA_PAGE_DATA.universityVsCollege.universities.title}</h3>
                
                <div className="space-y-4 text-sm mb-6">
                  <div>
                    <span className="font-semibold text-foreground block mb-2">Qualifications Offered:</span>
                    <ul className="grid grid-cols-2 gap-2 text-xs">
                      {CANADA_PAGE_DATA.universityVsCollege.universities.offers.map((off, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-muted-foreground">
                          <Check className="w-3.5 h-3.5 text-red-500" />
                          <span>{off}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-semibold text-foreground block mb-1">Academic Focus:</span>
                    <p className="text-xs text-muted-foreground">{CANADA_PAGE_DATA.universityVsCollege.universities.focus}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-foreground block mb-1">Best Suited For:</span>
                    <p className="text-xs text-muted-foreground font-medium text-red-600 dark:text-red-400">
                      {CANADA_PAGE_DATA.universityVsCollege.universities.bestFor}
                    </p>
                  </div>
                </div>
              </div>

              {/* Colleges Card */}
              <div className="bg-card border-2 border-blue-500/20 rounded-2xl p-8 shadow-soft relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-6">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{CANADA_PAGE_DATA.universityVsCollege.colleges.title}</h3>

                <div className="space-y-4 text-sm mb-6">
                  <div>
                    <span className="font-semibold text-foreground block mb-2">Qualifications Offered:</span>
                    <ul className="grid grid-cols-2 gap-2 text-xs">
                      {CANADA_PAGE_DATA.universityVsCollege.colleges.offers.map((off, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-muted-foreground">
                          <Check className="w-3.5 h-3.5 text-blue-500" />
                          <span>{off}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-semibold text-foreground block mb-1">Applied Focus:</span>
                    <p className="text-xs text-muted-foreground">{CANADA_PAGE_DATA.universityVsCollege.colleges.focus}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-foreground block mb-1">Best Suited For:</span>
                    <p className="text-xs text-muted-foreground font-medium text-blue-600 dark:text-blue-400">
                      {CANADA_PAGE_DATA.universityVsCollege.colleges.bestFor}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Key Advice Alert */}
            <div className="mt-8 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 max-w-5xl mx-auto flex items-center gap-3 text-xs text-amber-700 dark:text-amber-300">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-500" />
              <span>{CANADA_PAGE_DATA.universityVsCollege.keyAdvice}</span>
            </div>
          </div>
        </section>

        {/* ─── POPULAR COURSES ─── */}
        <section id="courses" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Popular Courses to Study in <span className="text-red-600">Canada</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                High-demand degree & diploma specializations offering robust job markets and PGWP career outcomes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CANADA_PAGE_DATA.popularCourses.map((cat, idx) => (
                <div key={idx} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <h3 className="font-bold text-lg">{cat.category}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {cat.courses.map((course, cIdx) => (
                      <span key={cIdx} className="text-xs px-3 py-1.5 rounded-lg bg-muted text-foreground font-medium hover:bg-red-500/10 hover:text-red-600 transition-colors">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CANADA INTAKES & TIMELINE ─── */}
        <section className="py-20 bg-muted/30 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Canada Intakes & <span className="text-red-600">Planning Timeline</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Understand major admission cycles and follow our step-by-step roadmap for a smooth study permit process
              </p>
            </div>

            {/* Intakes Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {CANADA_PAGE_DATA.intakes.map((intake, idx) => (
                <div key={idx} className="bg-card border rounded-2xl p-6 shadow-soft">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 inline-block mb-3">
                    {intake.status}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{intake.season}</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{intake.description}</p>
                  <div className="pt-3 border-t text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-red-500" />
                    <span>{intake.timeline}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline Steps */}
            <div className="max-w-4xl mx-auto space-y-4">
              <h3 className="text-xl font-bold text-center mb-6">12–18 Month Study Plan Roadmap</h3>
              {CANADA_PAGE_DATA.timelineSteps.map((step, idx) => (
                <div key={idx} className="bg-card border rounded-xl p-5 shadow-soft flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="px-3.5 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs shrink-0">
                    {step.phase}
                  </div>
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
                Cost of Studying in <span className="text-red-600">Canada</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Tuition fees and official IRCC living expense requirements for international students
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-card border rounded-2xl p-6 md:p-8 shadow-soft">
              <div className="space-y-4 mb-8">
                {CANADA_PAGE_DATA.costOfStudy.breakdown.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-muted/40 gap-2 border">
                    <span className="font-semibold text-sm text-foreground">{item.type}</span>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-bold text-red-600">{item.cost}</span>
                      <span className="text-xs text-muted-foreground">({item.approxInr})</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 text-xs text-red-700 dark:text-red-300">
                <Shield className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                <div>
                  <strong className="block mb-0.5">IRCC Financial Requirement Update (2026):</strong>
                  {CANADA_PAGE_DATA.costOfStudy.proofOfFundsNote}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── EDUCATION LOANS ─── */}
        <section id="loans" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Education Finance</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">
                Education Loan for Studying in <span className="text-red-600">Canada</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Explore collateral and non-collateral education financing options tailored to top Canadian DLIs
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              <div className="bg-card border rounded-2xl p-6 text-center shadow-soft">
                <Wallet className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <span className="text-xs text-muted-foreground font-medium block">Maximum Loan Amount</span>
                <span className="text-2xl font-extrabold text-foreground">{CANADA_PAGE_DATA.educationLoan.maxAmount}</span>
              </div>
              
              <div className="bg-card border rounded-2xl p-6 text-center shadow-soft">
                <Shield className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <span className="text-xs text-muted-foreground font-medium block">Unsecured Limit (No Collateral)</span>
                <span className="text-2xl font-extrabold text-foreground">{CANADA_PAGE_DATA.educationLoan.unsecuredMax}</span>
              </div>

              <div className="bg-card border rounded-2xl p-6 text-center shadow-soft">
                <Clock className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <span className="text-xs text-muted-foreground font-medium block">Interest Rate Range</span>
                <span className="text-2xl font-extrabold text-foreground">{CANADA_PAGE_DATA.educationLoan.interestRate}</span>
              </div>
            </div>

            <div className="bg-card border rounded-2xl p-6 md:p-8 max-w-5xl mx-auto shadow-soft">
              <h3 className="text-lg font-bold mb-4">Loan Highlights & Features:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {CANADA_PAGE_DATA.educationLoan.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── DLI & PAL/TAL & PGWP ─── */}
        <section id="pgwp" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                DLI, PAL/TAL & <span className="text-red-600">PGWP Rules (2026)</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Crucial IRCC regulatory guidance for international applicants
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
              
              {/* DLI Box */}
              <div className="bg-card border rounded-2xl p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-4">
                  <FileCheck2 className="w-6 h-6 text-red-600" />
                  <h3 className="font-bold text-lg">{CANADA_PAGE_DATA.dliAndPalInfo.dliTitle}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {CANADA_PAGE_DATA.dliAndPalInfo.dliDesc}
                </p>
              </div>

              {/* PAL/TAL Box */}
              <div className="bg-card border rounded-2xl p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-red-600" />
                  <h3 className="font-bold text-lg">{CANADA_PAGE_DATA.dliAndPalInfo.palTitle}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {CANADA_PAGE_DATA.dliAndPalInfo.palDesc}
                </p>
              </div>

            </div>

            {/* PGWP Breakdown */}
            <div className="bg-gradient-to-br from-red-600/10 via-background to-background border-2 border-red-500/20 rounded-2xl p-8 max-w-5xl mx-auto shadow-elegant">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-600" />
                <span>{CANADA_PAGE_DATA.pgwpInfo.title}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {CANADA_PAGE_DATA.pgwpInfo.keyPoints.map((point, idx) => (
                  <div key={idx} className="bg-card border rounded-xl p-4 shadow-soft">
                    <p className="text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── POPULAR CITIES ─── */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Popular Canadian <span className="text-red-600">Student Cities</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Explore top education and career hubs across Canadian provinces
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {CANADA_PAGE_DATA.cities.map((city, idx) => (
                <div key={idx} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">{city.name}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 font-semibold">
                      {city.province}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{city.description}</p>
                  <div className="pt-3 border-t text-[11px] text-muted-foreground">
                    <strong className="text-foreground">Institutions:</strong> {city.Universities}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── QUALIFIED LEAD FORM SECTION ─── */}
        <section id="lead-form" className="py-20 bg-background relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-card border-2 border-red-500/30 rounded-3xl p-6 md:p-10 shadow-elegant">
              
              <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                <span className="text-xs font-extrabold text-red-600 uppercase tracking-widest">Free Online Counselling</span>
                <h2 className="text-2xl md:text-3xl font-extrabold">
                  Get Your <span className="text-red-600">Canada Profile Assessment</span>
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Fill out your academic details to receive personalized course, DLI university, loan, and study permit recommendations.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h3 className="text-2xl font-bold text-foreground">WhatsApp is opening</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Press Send in WhatsApp to reach our Canada Education Specialist. Your enquiry is not received until you send the message.
                  </p>
                  <Button 
                    onClick={() => setFormSubmitted(false)}
                    variant="outline" 
                    className="border-emerald-500/20 text-emerald-600"
                  >
                    Submit Another Query
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold block mb-1">Full Name *</label>
                      <input 
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formState.fullName}
                        onChange={e => setFormState({...formState, fullName: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1">Mobile Number *</label>
                      <input 
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formState.phone}
                        onChange={e => setFormState({...formState, phone: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1">Email Address *</label>
                      <input 
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={e => setFormState({...formState, email: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  {/* Academic Profile */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold block mb-1">Highest Qualification</label>
                      <select 
                        value={formState.highestQualification}
                        onChange={e => setFormState({...formState, highestQualification: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option>12th Standard</option>
                        <option>3-Year Diploma</option>
                        <option>Bachelor's Degree</option>
                        <option>Master's Degree</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1">Graduation Year</label>
                      <select 
                        value={formState.graduationYear}
                        onChange={e => setFormState({...formState, graduationYear: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option>2026 (Pursuing)</option>
                        <option>2025</option>
                        <option>2024</option>
                        <option>2023</option>
                        <option>2022 or earlier</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1">Current Score (% / CGPA)</label>
                      <input 
                        type="text"
                        placeholder="e.g. 78% or 8.2 CGPA"
                        value={formState.gpa}
                        onChange={e => setFormState({...formState, gpa: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold block mb-1">Preferred Field / Course</label>
                      <input 
                        type="text"
                        placeholder="e.g. Data Science / MBA"
                        value={formState.preferredCourse}
                        onChange={e => setFormState({...formState, preferredCourse: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1">Target Intake</label>
                      <select 
                        value={formState.preferredIntake}
                        onChange={e => setFormState({...formState, preferredIntake: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option>September 2026 (Fall)</option>
                        <option>January 2027 (Winter)</option>
                        <option>May 2027 (Spring)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1">Preferred Province</label>
                      <select 
                        value={formState.preferredProvince}
                        onChange={e => setFormState({...formState, preferredProvince: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option>Ontario</option>
                        <option>British Columbia</option>
                        <option>Alberta</option>
                        <option>Quebec</option>
                        <option>Any Province</option>
                      </select>
                    </div>
                  </div>

                  {/* Finance & Qualification Questions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold block mb-1">Do you require an Education Loan?</label>
                      <select 
                        value={formState.needLoan}
                        onChange={e => setFormState({...formState, needLoan: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option>Yes (Secured / Unsecured)</option>
                        <option>No (Self Funded)</option>
                        <option>Not Sure</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1">Are Post-Study Work Options (PGWP) Important?</label>
                      <select 
                        value={formState.valuePgwp}
                        onChange={e => setFormState({...formState, valuePgwp: e.target.value})}
                        className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option>Yes (Crucial Priority)</option>
                        <option>No</option>
                        <option>Need Guidance</option>
                      </select>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-xl text-base shadow-lg shadow-red-600/20"
                  >
                    Check My Canada Study Options
                  </Button>

                </form>
              )}

            </div>
          </div>
        </section>

        {/* ─── 20 AEO FAQS ─── */}
        <section id="faqs" className="py-20 bg-muted/30 border-t">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">AEO Answer Engine Optimized</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">
                Frequently Asked Questions About Studying in <span className="text-red-600">Canada</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Get direct answers to common queries regarding study permits, PGWP, DLI requirements, and education loans
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {CANADA_PAGE_DATA.faqs.map((faq, idx) => (
                <AccordionItem 
                  key={idx} 
                  value={`faq-${idx}`} 
                  className="bg-card border rounded-2xl px-6 py-2 shadow-soft border-b-0"
                >
                  <AccordionTrigger className="hover:no-underline text-left font-bold text-sm md:text-base text-foreground py-3">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs md:text-sm text-muted-foreground leading-relaxed pt-1 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default StudyInCanadaPage;
