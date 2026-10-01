import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, MapPin, DollarSign, Award, Briefcase, Clock, ChevronRight, Globe2, BookOpen, Users, Shield, Building2, ArrowRight, Star, CheckCircle2, Wallet, Calendar, Sparkles, Phone, MessageCircle, AlertCircle, Building, Check, ArrowUpRight, Search, Grid, MoveHorizontal, Play, Pause, FileText, TrendingUp, Monitor, Cog, Heart, Palette, UserCheck, Globe, BadgeCheck, BarChart3 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CountryHeroBanner from "@/components/CountryHeroBanner";
import { NZ_PAGE_DATA, type NZUniversity } from "@/data/nzPageData";
import { countriesData } from "@/data/countryData";
import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";

const SITE_DOMAIN = "https://www.dreamdestinationstudyabroad.com";
const D = NZ_PAGE_DATA;
const iconMap: Record<string, React.FC<{ className?: string }>> = { GraduationCap, BookOpen, Briefcase, Users, Sparkles, Award, UserCheck, FileText, Shield, Wallet, Globe, Monitor, Cog, Heart, Palette, TrendingUp, BarChart3, BadgeCheck };
const getIcon = (name: string) => iconMap[name] || Globe2;

const UniversityCard: React.FC<{ uni: NZUniversity; index: number }> = ({ uni, index }) => {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="relative group shrink-0 w-[310px] md:w-[350px] bg-card/90 backdrop-blur-md rounded-2xl p-6 border border-border/80 shadow-3d-card shadow-3d-hover transition-all duration-500 flex flex-col justify-between transform-style-3d hover:z-20 cursor-pointer" style={{ transform: `perspective(1000px) rotateY(${index % 2 === 0 ? "1deg" : "-1deg"})` }}>
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-emerald-500/5 rounded-2xl pointer-events-none group-hover:from-teal-500/10 group-hover:to-emerald-500/15 transition-all duration-500" />
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="relative w-14 h-14 rounded-xl bg-white p-2 border border-border/60 shadow-md shrink-0 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
            {!imgErr && uni.logo ? (<img src={uni.logo} alt={`${uni.name} logo`} width={64} height={64} className="w-full h-full object-contain" loading="lazy" onError={() => setImgErr(true)} />) : (<div className="w-full h-full rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">{uni.name.slice(0, 2).toUpperCase()}</div>)}
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-teal-500/10 text-teal-600 font-bold text-xs rounded-full shadow-sm shrink-0 border border-teal-500/20"><Award className="w-3.5 h-3.5" /><span>{uni.qsRanking || "Top NZ University"}</span></div>
        </div>
        <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-teal-600 transition-colors leading-tight mb-2 line-clamp-2">{uni.name}</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3"><MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" /><span className="truncate">{uni.location}, {uni.region}</span></div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1"><Building2 className="w-3 h-3" /> {uni.type}</span>
          {uni.postStudyWork && (<span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 border border-teal-500/20 flex items-center gap-1"><Check className="w-3 h-3" /> Post-Study Work</span>)}
        </div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {uni.popularPrograms.slice(0, 3).map((s, i) => (<span key={i} className="px-2.5 py-1 bg-muted/80 text-muted-foreground text-[11px] font-medium rounded-md border border-border/40">{s}</span>))}
          {uni.popularPrograms.length > 3 && (<span className="px-2 py-1 bg-teal-500/10 text-teal-600 text-[10px] font-semibold rounded-md">+{uni.popularPrograms.length - 3} more</span>)}
        </div>
      </div>
      <div className="pt-3 border-t border-border/40 flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1"><DollarSign className="w-4 h-4 text-teal-600" /> {uni.avgTuition}</span>
        <a href="#lead-form" className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-white bg-teal-500/10 group-hover:bg-teal-600 group-hover:text-white px-3 py-1.5 rounded-lg transition-all duration-300 shadow-sm">Apply Now <ArrowUpRight className="w-3.5 h-3.5" /></a>
      </div>
    </div>
  );
};

const generateJsonLd = () => [
  { "@context": "https://schema.org", "@type": "WebPage", name: D.seo.title, description: D.seo.description, url: `${SITE_DOMAIN}/study-in-new-zealand`, inLanguage: "en", isPartOf: { "@type": "WebSite", name: "DreamDestination", url: SITE_DOMAIN }, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_DOMAIN }, { "@type": "ListItem", position: 2, name: "Countries", item: `${SITE_DOMAIN}/countries` }, { "@type": "ListItem", position: 3, name: "Study in New Zealand", item: `${SITE_DOMAIN}/study-in-new-zealand` }] }, about: { "@type": "Country", name: "New Zealand" }, keywords: D.seo.keywords.join(", ") },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: D.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  { "@context": "https://schema.org", "@type": "EducationalOrganization", name: "DreamDestination", url: SITE_DOMAIN, areaServed: { "@type": "Country", name: "New Zealand" } },
];

const StudyInNZPage = () => {
  const [uniSearch, setUniSearch] = useState("");
  const [viewMode, setViewMode] = useState<"marquee" | "grid">("marquee");
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCourseStream, setSelectedCourseStream] = useState(0);
  const [formState, setFormState] = useState({ fullName: "", phone: "", email: "", highestQualification: "Bachelor's Degree", graduationYear: "2024", gpa: "", preferredCourse: "", preferredIntake: "February 2027", workExp: "0-2 Years", needLoan: "Yes", postStudyWork: "Yes" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hands the enquiry to WhatsApp. Before this, the form discarded it.
    sendLeadToWhatsApp("Study in New Zealand", formState);
    setFormSubmitted(true);
  };

  const filteredUnis = D.universities.filter((uni) => uniSearch === "" || uni.name.toLowerCase().includes(uniSearch.toLowerCase()) || uni.location.toLowerCase().includes(uniSearch.toLowerCase()) || uni.region.toLowerCase().includes(uniSearch.toLowerCase()) || uni.popularPrograms.some((p) => p.toLowerCase().includes(uniSearch.toLowerCase())));
  const marqueeUnis = [...D.universities, ...D.universities];
  const relatedCountries = countriesData.filter((c) => c.slug !== "new-zealand").slice(0, 6);
  const jsonLd = generateJsonLd();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-teal-500/20 selection:text-teal-600">
      <SEOHead title={D.seo.title} description={D.seo.description} canonicalUrl={D.seo.canonicalUrl} keywords={D.seo.keywords} jsonLd={jsonLd} />
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

      {/* Sticky Nav */}
      <div className="sticky top-[73px] z-40 bg-background/90 backdrop-blur-md border-b text-xs py-2.5 hidden md:block shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between overflow-x-auto whitespace-nowrap gap-6 no-scrollbar">
          <span className="font-bold text-teal-600 flex items-center gap-1.5 shrink-0"><span>🇳🇿</span> Study in New Zealand</span>
          <div className="flex items-center gap-5 text-muted-foreground font-medium">
            <a href="#overview" className="hover:text-primary transition-colors">Overview</a>
            <a href="#why-nz" className="hover:text-primary transition-colors">Why NZ</a>
            <a href="#universities" className="hover:text-primary transition-colors">Universities</a>
            <a href="#provider-types" className="hover:text-primary transition-colors">Uni vs Poly vs PTE</a>
            <a href="#courses" className="hover:text-primary transition-colors">Courses</a>
            <a href="#intakes" className="hover:text-primary transition-colors">Intakes</a>
            <a href="#cost" className="hover:text-primary transition-colors">Cost</a>
            <a href="#loans" className="hover:text-primary transition-colors">Loans</a>
            <a href="#visa" className="hover:text-primary transition-colors">Visa</a>
            <a href="#post-study" className="hover:text-primary transition-colors">Post-Study Work</a>
            <a href="#faqs" className="hover:text-primary transition-colors">FAQs</a>
          </div>
          <a href="#lead-form" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-3 py-1 rounded-full transition-colors shrink-0 shadow-sm">Apply Now</a>
        </div>
      </div>

      <main className="flex-1 pt-20">        {/* Hero */}
        <CountryHeroBanner
          breadcrumb={[{ label: "Home", to: "/" }, { label: "Countries", to: "/countries" }, { label: "Study in New Zealand" }]}
          countryName="New Zealand"
          flag="🇳🇿"
          heading="Best Study in New Zealand for Indian Students"
          subheading="Official Admissions Partner for All 8 NZ Universities & Institutes of Technology"
          description={D.hero.description}
          valueProposition={D.hero.valueProposition}
          badgeText={D.hero.badge}
          stats={{
            universities: `${D.universities.length} Universities`,
            avgCost: D.atAGlance.stats[1]?.value || "NZ$ 22,000 - 35,000/yr",
            workPermit: D.atAGlance.stats[4]?.value || "3-Year Post-Study Visa",
            visaSuccessRate: "Fee Paying Student Visa",
          }}
          cta1Text={D.hero.primaryCta}
          cta1Href="#lead-form"
          cta2Text="View Universities"
          cta2Href="#universities"
        />

        {/* At A Glance */}
        <section id="overview" className="py-16 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="text-center max-w-2xl mx-auto mb-10"><h2 className="text-2xl md:text-3xl font-bold">{D.atAGlance.title}</h2><p className="text-muted-foreground text-sm mt-2">Essential facts for Indian students planning higher education in New Zealand</p></div><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">{D.atAGlance.stats.map((s, i) => (<div key={i} className="bg-card border rounded-xl p-4 text-center shadow-soft hover:shadow-elegant transition-all"><span className="text-xs text-muted-foreground font-medium block mb-1">{s.label}</span><span className="text-sm md:text-base font-extrabold text-teal-600 dark:text-teal-400 block">{s.value}</span></div>))}</div></div></section>

        {/* Why NZ */}
        <section id="why-nz" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-16"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Why Study in <span className="text-teal-600">New Zealand?</span></h2><p className="text-muted-foreground text-base">{D.whyNZ.subtitle}</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{D.whyNZ.reasons.map((r, i) => { const Icon = getIcon(r.icon); return (<div key={i} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group"><div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${i % 2 === 0 ? "bg-teal-500/10 text-teal-600" : "bg-emerald-500/10 text-emerald-600"}`}><Icon className="w-6 h-6" /></div><h3 className="text-lg font-bold mb-2 group-hover:text-teal-600 transition-colors">{r.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p></div>); })}</div>
          {/* Who should consider */}
          <div className="mt-12 bg-gradient-to-r from-teal-600/10 via-teal-500/5 to-emerald-500/10 border border-teal-500/20 rounded-2xl p-6 md:p-8"><div className="max-w-4xl mx-auto"><h3 className="text-xl font-bold mb-3 text-center">{D.whoShouldConsider.heading}</h3><p className="text-sm text-muted-foreground text-center mb-6">{D.whoShouldConsider.intro}</p><div className="grid md:grid-cols-2 gap-3 mb-6">{D.whoShouldConsider.points.map((p, i) => (<div key={i} className="flex items-start gap-2 bg-card/80 backdrop-blur p-3 rounded-xl border"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /><span className="text-sm text-foreground">{p}</span></div>))}</div><p className="text-xs text-muted-foreground italic text-center mb-4">{D.whoShouldConsider.disclaimer}</p><div className="text-center"><Button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold" asChild><a href="#lead-form">{D.whoShouldConsider.cta.text}</a></Button></div></div></div>
        </div></section>

        {/* Universities */}
        <section className="py-16 bg-muted/30 border-y relative overflow-hidden" id="universities">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div><div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-600 text-xs font-bold rounded-full mb-3"><Sparkles className="w-3.5 h-3.5" /><span>All 8 NZ Universities</span></div><h2 className="text-3xl md:text-4xl font-bold">Top Universities in <span className="text-teal-600">New Zealand</span></h2><p className="text-muted-foreground text-sm md:text-base mt-2 max-w-2xl">All eight New Zealand universities are ranked in the top 2% globally. Compare course fit, tuition, location, and career relevance.</p></div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input type="text" placeholder="Search university or course..." value={uniSearch} onChange={(e) => setUniSearch(e.target.value)} className="pl-9 pr-4 py-2 bg-card border border-border/80 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 w-44 md:w-60 shadow-soft" id="nz-university-search" /></div>
                <div className="flex items-center bg-card border border-border/80 rounded-xl p-1 shadow-soft">
                  <button onClick={() => setViewMode("marquee")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "marquee" ? "bg-teal-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><MoveHorizontal className="w-3.5 h-3.5" /> 3D Slider</button>
                  <button onClick={() => setViewMode("grid")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "grid" ? "bg-teal-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><Grid className="w-3.5 h-3.5" /> All Unis</button>
                </div>
                {viewMode === "marquee" && !uniSearch && (<button onClick={() => setIsPlaying(!isPlaying)} className="p-2 bg-card border border-border/80 rounded-xl text-muted-foreground hover:text-teal-600 transition-colors shadow-soft">{isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</button>)}
              </div>
            </div>
            {uniSearch ? (<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">{filteredUnis.length > 0 ? filteredUnis.map((u, i) => (<div key={i} className="w-full"><UniversityCard uni={u} index={i} /></div>)) : (<div className="col-span-full py-12 text-center text-muted-foreground">No universities found matching "{uniSearch}".</div>)}</div>) : viewMode === "marquee" ? (<div className="relative w-full overflow-hidden py-6 perspective-1000"><div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" /><div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" /><div className={`flex gap-6 w-max ${isPlaying ? "animate-marquee-3d" : ""}`}>{marqueeUnis.map((u, i) => (<UniversityCard key={`${u.name}-${i}`} uni={u} index={i} />))}</div></div>) : (<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">{filteredUnis.map((u, i) => (<div key={i} className="w-full"><UniversityCard uni={u} index={i} /></div>))}</div>)}
            <div className="text-center mt-10 bg-card border rounded-xl p-8 shadow-soft max-w-2xl mx-auto"><h3 className="text-xl font-bold mb-2">Not sure which NZ university fits your profile?</h3><p className="text-sm text-muted-foreground mb-4">Share your academics, preferred course, and budget. Our counsellors can help you narrow down your choices.</p><a href="#lead-form" className="inline-flex items-center gap-2 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-600/20 transition-all text-sm">Get Profile Guidance <ArrowRight className="w-4 h-4" /></a></div>
          </div>
        </section>

        {/* University vs Polytechnic vs PTE — NZ-specific */}
        <section id="provider-types" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Know Before You Apply</span><h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">{D.uniVsInstituteVsPte.title}</h2><p className="text-muted-foreground text-sm">{D.uniVsInstituteVsPte.subtitle}</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border-2 border-teal-500/20 rounded-2xl p-8 shadow-soft"><div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center mb-6"><Building2 className="w-6 h-6" /></div><h3 className="text-xl font-bold mb-3">{D.uniVsInstituteVsPte.university.title}</h3><p className="text-xs text-muted-foreground mb-4">{D.uniVsInstituteVsPte.university.focus}</p><ul className="space-y-2 text-xs mb-4">{D.uniVsInstituteVsPte.university.offers.map((o, i) => (<li key={i} className="flex items-center gap-1.5 text-muted-foreground"><Check className="w-3.5 h-3.5 text-teal-500" /><span>{o}</span></li>))}</ul><p className="text-xs font-semibold text-teal-600">{D.uniVsInstituteVsPte.university.bestFor}</p></div>
            <div className="bg-card border-2 border-emerald-500/20 rounded-2xl p-8 shadow-soft"><div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6"><Cog className="w-6 h-6" /></div><h3 className="text-xl font-bold mb-3">{D.uniVsInstituteVsPte.institute.title}</h3><p className="text-xs text-muted-foreground mb-4">{D.uniVsInstituteVsPte.institute.focus}</p><ul className="space-y-2 text-xs mb-4">{D.uniVsInstituteVsPte.institute.offers.map((o, i) => (<li key={i} className="flex items-center gap-1.5 text-muted-foreground"><Check className="w-3.5 h-3.5 text-emerald-500" /><span>{o}</span></li>))}</ul><p className="text-xs font-semibold text-emerald-600">{D.uniVsInstituteVsPte.institute.bestFor}</p></div>
            <div className="bg-card border-2 border-blue-500/20 rounded-2xl p-8 shadow-soft"><div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-6"><Building className="w-6 h-6" /></div><h3 className="text-xl font-bold mb-3">{D.uniVsInstituteVsPte.pte.title}</h3><p className="text-xs text-muted-foreground mb-4">{D.uniVsInstituteVsPte.pte.focus}</p><ul className="space-y-2 text-xs mb-4">{D.uniVsInstituteVsPte.pte.offers.map((o, i) => (<li key={i} className="flex items-center gap-1.5 text-muted-foreground"><Check className="w-3.5 h-3.5 text-blue-500" /><span>{o}</span></li>))}</ul><p className="text-xs font-semibold text-blue-600">{D.uniVsInstituteVsPte.pte.bestFor}</p></div>
          </div>
          <div className="mt-8 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 max-w-5xl mx-auto flex items-center gap-3 text-xs text-amber-700 dark:text-amber-300"><AlertCircle className="w-5 h-5 shrink-0 text-amber-500" /><span>{D.uniVsInstituteVsPte.keyAdvice}</span></div>
        </div></section>

        {/* Popular Courses */}
        <section id="courses" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Popular Courses to Study in <span className="text-teal-600">New Zealand</span></h2></div><div className="flex flex-wrap gap-2 mb-8 justify-center">{D.popularCourses.map((c, i) => (<button key={i} onClick={() => setSelectedCourseStream(i)} className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all border ${selectedCourseStream === i ? "bg-teal-600 text-white border-teal-600 shadow-md" : "bg-card text-muted-foreground border-border/60 hover:text-foreground"}`}>{c.category}</button>))}</div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{D.popularCourses.map((c, i) => { const Icon = getIcon(c.icon); return (<div key={i} className={`bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all ${selectedCourseStream === i ? "ring-2 ring-teal-500/40 shadow-elegant" : ""}`}><div className="flex items-center gap-3 mb-4"><div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i % 2 === 0 ? "bg-teal-500/10 text-teal-600" : "bg-emerald-500/10 text-emerald-600"}`}><Icon className="w-5 h-5" /></div><h3 className="font-bold text-lg">{c.category}</h3></div><div className="flex flex-wrap gap-2">{c.courses.map((co, ci) => (<span key={ci} className="text-xs px-3 py-1.5 rounded-lg bg-muted text-foreground font-medium hover:bg-teal-500/10 hover:text-teal-600 transition-colors cursor-pointer">{co}</span>))}</div></div>); })}</div></div></section>

        {/* Master's */}
        <section id="masters" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><div className="text-center mb-12"><span className="text-xs font-bold text-teal-600 uppercase tracking-widest">High-Value Section</span><h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">Master's in New Zealand for <span className="text-teal-600">Indian Students</span></h2><p className="text-muted-foreground text-sm max-w-2xl mx-auto">{D.mastersInNZ.description}</p></div><div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft"><h3 className="font-bold text-lg mb-4">Key Considerations:</h3><div className="grid md:grid-cols-2 gap-3 mb-6">{D.mastersInNZ.considerations.map((c, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" /><span>{c}</span></div>))}</div><div className="bg-teal-500/5 border border-teal-500/20 rounded-xl p-4 mb-6"><p className="text-sm text-foreground font-medium">{D.mastersInNZ.note}</p></div><div className="text-center"><a href={D.mastersInNZ.cta.href} className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-600/20 transition-all"><BadgeCheck className="w-5 h-5" />{D.mastersInNZ.cta.text}</a></div></div></div></div></section>

        {/* Intakes & Timeline */}
        <section id="intakes" className="py-20 bg-muted/30 border-y"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-16"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">NZ Intakes & <span className="text-teal-600">Planning Timeline</span></h2></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">{D.intakes.map((intake, i) => (<div key={i} className={`bg-card border rounded-2xl p-6 shadow-soft ${i === 0 ? "ring-2 ring-teal-500/30" : ""}`}><span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3 ${i === 0 ? "bg-teal-500/10 text-teal-600" : "bg-muted text-muted-foreground"}`}>{intake.status}</span><h3 className="text-xl font-bold mb-2">{intake.season}</h3><p className="text-xs text-muted-foreground mb-4 leading-relaxed">{intake.description}</p><div className="pt-3 border-t text-xs font-semibold text-foreground flex items-center gap-1.5"><Calendar className="w-4 h-4 text-teal-500" /><span>{intake.timeline}</span></div></div>))}</div><div className="max-w-4xl mx-auto space-y-4"><h3 className="text-xl font-bold text-center mb-6">When Should Indian Students Start Preparing?</h3>{D.timeline.map((s, i) => (<div key={i} className="bg-card border rounded-xl p-5 shadow-soft flex flex-col md:flex-row items-start md:items-center gap-4"><div className="px-3.5 py-1.5 rounded-lg bg-teal-600 text-white font-bold text-xs shrink-0">{s.phase}</div><div className="flex-1"><h4 className="font-bold text-sm text-foreground">{s.title}</h4><p className="text-xs text-muted-foreground mt-0.5">{s.details}</p></div></div>))}</div></div></section>

        {/* Cost */}
        <section id="cost" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Cost of Studying in <span className="text-teal-600">New Zealand</span></h2><p className="text-muted-foreground text-sm">{D.costOfStudy.intro}</p></div><div className="max-w-4xl mx-auto"><div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft mb-8"><h3 className="font-bold text-lg mb-4">Indicative Annual Tuition</h3><div className="space-y-3 mb-6">{D.costOfStudy.breakdown.map((b, i) => (<div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-muted/40 gap-2 border"><span className="font-semibold text-sm text-foreground">{b.level}</span><div className="flex items-center gap-3 text-sm"><span className="font-bold text-teal-600">{b.cost}</span><span className="text-xs text-muted-foreground">({b.note})</span></div></div>))}</div><h3 className="font-bold mb-3">Budget Items</h3><div className="grid md:grid-cols-2 gap-2">{D.costOfStudy.budgetItems.map((b, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" /><span>{b}</span></div>))}</div></div>
          {/* Proof of Funds */}
          <div className="bg-teal-600 text-white p-6 rounded-2xl mb-8"><h3 className="font-bold text-lg mb-3">{D.proofOfFunds.title}</h3><div className="grid md:grid-cols-2 gap-4"><div className="bg-white/10 p-4 rounded-xl"><p className="text-xs opacity-80">Annual Requirement</p><p className="text-2xl font-extrabold">{D.proofOfFunds.amount}</p></div><div className="bg-white/10 p-4 rounded-xl"><p className="text-xs opacity-80">Monthly (Under 12 months)</p><p className="text-2xl font-extrabold">{D.proofOfFunds.monthlyAmount}</p></div></div><p className="text-xs mt-4 opacity-80">{D.proofOfFunds.note}</p></div>
          {/* Cost of Living */}
          <div className="bg-card border rounded-2xl p-6 shadow-soft mb-8"><h3 className="font-bold text-lg mb-2">Cost of Living by City</h3><p className="text-xs text-muted-foreground mb-4">{D.costOfLiving.intro}</p><div className="grid grid-cols-2 md:grid-cols-3 gap-3">{D.costOfLiving.cities.map((c, i) => (<div key={i} className="p-3 bg-muted/50 rounded-xl border"><p className="font-semibold text-sm text-foreground">{c.name}</p><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.costLevel === "High" ? "bg-orange-500/10 text-orange-600" : c.costLevel === "Moderate-High" ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600"}`}>{c.costLevel}</span><p className="text-[11px] text-muted-foreground mt-1">{c.note}</p></div>))}</div></div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-700 dark:text-amber-300"><AlertCircle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" /><div><strong className="block mb-0.5">Disclaimer:</strong>{D.costOfStudy.disclaimer}</div></div></div></div></section>

        {/* Scholarships */}
        <section id="scholarships" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Scholarships in <span className="text-teal-600">New Zealand</span></h2><p className="text-muted-foreground text-sm">{D.scholarships.intro}</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">{D.scholarships.categories.map((c, i) => (<div key={i} className="bg-card p-6 rounded-xl border shadow-soft"><div className="flex items-center gap-3 mb-4"><div className={`p-2 rounded-lg ${i === 0 ? "bg-teal-500/10 text-teal-600" : "bg-blue-500/10 text-blue-600"}`}><Award className="w-5 h-5" /></div><h3 className="font-bold text-lg">{c.title}</h3></div><ul className="space-y-2">{c.items.map((it, ii) => (<li key={ii} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />{it}</li>))}</ul></div>))}</div><div className="bg-teal-500/5 border border-teal-500/20 rounded-xl p-5 max-w-4xl mx-auto"><p className="text-xs text-teal-600 font-bold uppercase tracking-wide mb-1">Important</p><p className="text-sm text-foreground">{D.scholarships.disclaimer}</p></div></div></section>

        {/* Education Loans */}
        <section id="loans" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><span className="text-xs font-bold text-teal-600 uppercase tracking-widest">DreamDestination Differentiator</span><h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">Education Loan for <span className="text-teal-600">New Zealand</span></h2><p className="text-muted-foreground text-sm">{D.educationLoan.intro}</p></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"><div className="bg-card border rounded-2xl p-6 text-center shadow-soft"><Wallet className="w-8 h-8 text-teal-600 mx-auto mb-3" /><span className="text-xs text-muted-foreground font-medium block">Maximum Loan</span><span className="text-2xl font-extrabold text-foreground">{D.educationLoan.maxAmount}</span></div><div className="bg-card border rounded-2xl p-6 text-center shadow-soft"><Shield className="w-8 h-8 text-teal-600 mx-auto mb-3" /><span className="text-xs text-muted-foreground font-medium block">Unsecured</span><span className="text-2xl font-extrabold text-foreground">{D.educationLoan.unsecuredMax}</span></div><div className="bg-card border rounded-2xl p-6 text-center shadow-soft"><Clock className="w-8 h-8 text-teal-600 mx-auto mb-3" /><span className="text-xs text-muted-foreground font-medium block">Interest Rate</span><span className="text-2xl font-extrabold text-foreground">{D.educationLoan.interestRate}</span></div></div><div className="bg-card border rounded-2xl p-6 md:p-8 max-w-5xl mx-auto shadow-soft mb-8"><div className="grid md:grid-cols-2 gap-8"><div><h3 className="text-lg font-bold mb-4">Services:</h3><div className="grid gap-3">{D.educationLoan.services.map((s, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" /><span>{s}</span></div>))}</div></div><div><h3 className="text-lg font-bold mb-4">Highlights:</h3><div className="grid gap-3">{D.educationLoan.highlights.map((h, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /><span>{h}</span></div>))}</div></div></div></div><div className="text-center"><a href={`tel:${D.educationLoan.phoneNumber}`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all"><Phone className="w-5 h-5" />Call {D.educationLoan.phoneNumber} for Loan Options</a></div></div></section>

        {/* Admission & Application */}
        <section id="admission" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Admission <span className="text-teal-600">Requirements</span></h2><p className="text-muted-foreground text-center mb-8 text-sm">{D.admissionRequirements.intro}</p><div className="bg-card rounded-2xl border shadow-elegant p-6 mb-6"><div className="grid md:grid-cols-2 gap-4">{D.admissionRequirements.requirements.map((r, i) => (<div key={i} className="flex items-start gap-3 p-3 bg-gradient-subtle rounded-lg"><div className="w-7 h-7 bg-teal-500/10 rounded-full flex items-center justify-center shrink-0"><span className="text-xs font-bold text-teal-600">{i + 1}</span></div><span className="text-sm text-foreground">{r}</span></div>))}</div><div className="mt-6 p-4 bg-teal-500/5 border border-teal-500/20 rounded-xl"><p className="text-sm text-foreground flex items-start gap-2"><BadgeCheck className="w-4 h-4 shrink-0 mt-0.5 text-teal-500" /><span><strong>AEO Answer:</strong> {D.admissionRequirements.aeoAnswer}</span></p></div></div></div></div></section>

        {/* Application Process */}
        <section id="application" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">How to Apply to <span className="text-teal-600">Study in NZ</span></h2><div className="relative mt-12"><div className="absolute left-6 top-0 bottom-0 w-0.5 bg-teal-500/20 hidden md:block" /><div className="space-y-6">{D.applicationProcess.map((s, i) => (<div key={i} className="flex gap-6 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}><div className="shrink-0 hidden md:block"><div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-elegant z-10 relative">{s.step}</div></div><div className="flex-1 bg-card p-5 rounded-xl border shadow-soft"><div className="flex items-center gap-2 mb-1 md:hidden"><span className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">{s.step}</span></div><h3 className="font-bold text-base mb-1">Step {s.step} — {s.title}</h3><p className="text-sm text-muted-foreground">{s.description}</p></div></div>))}</div></div></div></div></section>

        {/* Student Visa */}
        <section id="visa" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">NZ Student Visa <span className="text-teal-600">(Fee Paying)</span></h2><p className="text-muted-foreground text-center mb-8 text-sm">{D.studentVisa.intro}</p><div className="bg-teal-600 text-white p-5 rounded-xl mb-6"><p className="text-xs font-bold uppercase tracking-wide mb-2 opacity-80">Typical Visa Journey</p><p className="text-sm font-semibold">{D.studentVisa.journey}</p></div><div className="bg-card rounded-2xl border shadow-elegant p-6 mb-6"><h3 className="font-bold text-lg mb-4">Common Visa Documents</h3><div className="grid md:grid-cols-2 gap-3">{D.studentVisa.requirements.map((r, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" /><span>{r}</span></div>))}</div></div></div></div></section>

        {/* Work While Studying */}
        <section id="work-study" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Working While <span className="text-teal-600">Studying</span> in NZ</h2><div className="bg-card p-8 rounded-2xl border shadow-elegant"><p className="text-muted-foreground leading-relaxed mb-4">{D.workWhileStudying.intro}</p><p className="text-sm text-muted-foreground leading-relaxed mb-4">{D.workWhileStudying.details}</p><div className="bg-teal-500/5 border border-teal-500/20 rounded-xl p-4 mb-4"><p className="text-sm text-foreground flex items-start gap-2"><GraduationCap className="w-4 h-4 shrink-0 mt-0.5 text-teal-500" /><span><strong>PhD & Research Master's: </strong>{D.workWhileStudying.phdNote}</span></p></div><div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-xl"><p className="text-sm text-orange-800 dark:text-orange-200 flex items-start gap-2"><Shield className="w-4 h-4 shrink-0 mt-0.5" /><span><strong>Important: </strong>{D.workWhileStudying.disclaimer}</span></p></div></div></div></div></section>

        {/* Post-Study Work — NZ-specific with 2026 update */}
        <section id="post-study" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Post-Study Work Visa in <span className="text-teal-600">New Zealand</span></h2><p className="text-muted-foreground text-sm">{D.postStudyWork.intro}</p></div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card p-6 rounded-xl border shadow-soft"><h3 className="font-bold text-lg mb-2">{D.postStudyWork.degreeLevel.title}</h3><p className="text-sm text-muted-foreground">{D.postStudyWork.degreeLevel.description}</p></div>
            <div className="bg-card p-6 rounded-xl border shadow-soft"><h3 className="font-bold text-lg mb-2">{D.postStudyWork.nonDegree.title}</h3><p className="text-sm text-muted-foreground">{D.postStudyWork.nonDegree.description}</p></div>
          </div>
          {/* 2026 Update — NZ-specific highlight */}
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-6 md:p-8 rounded-2xl mb-6 ring-2 ring-teal-400/30"><div className="flex items-center gap-2 mb-3"><Sparkles className="w-5 h-5" /><h3 className="font-bold text-xl">{D.postStudyWork.update2026.title}</h3></div><p className="text-sm opacity-95 leading-relaxed mb-3">{D.postStudyWork.update2026.details}</p><p className="text-xs opacity-75 italic">{D.postStudyWork.update2026.disclaimer}</p></div>
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3 text-xs text-amber-700 dark:text-amber-300"><AlertCircle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" /><span>{D.postStudyWork.disclaimer}</span></div>
        </div></div></section>

        {/* Cities */}
        <section id="cities" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Popular NZ Cities for <span className="text-teal-600">Indian Students</span></h2></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">{D.cities.map((c, i) => (<div key={i} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all group"><div className="flex items-center justify-between mb-3"><h3 className="font-bold text-lg group-hover:text-teal-600 transition-colors">{c.name}</h3><span className="text-xs px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-600 font-semibold shrink-0">{c.region}</span></div><p className="text-xs text-muted-foreground mb-3 leading-relaxed">{c.description}</p><div className="pt-3 border-t text-[11px] text-muted-foreground"><strong className="text-foreground">Universities:</strong> {c.universities}</div></div>))}</div></div></section>

        {/* Why DD */}
        <section id="why-dd" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="text-teal-600">DreamDestination</span>?</h2></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">{D.whyDD.map((w, i) => { const Icon = getIcon(w.icon); return (<div key={i} className="bg-card p-6 rounded-xl border shadow-soft hover:shadow-elegant transition-smooth group"><div className={`p-3 rounded-xl ${i % 3 === 0 ? "bg-teal-500/10 text-teal-600" : i % 3 === 1 ? "bg-emerald-500/10 text-emerald-600" : "bg-blue-500/10 text-blue-600"} w-fit mb-4`}><Icon className="w-6 h-6" /></div><h3 className="font-bold text-base mb-2 group-hover:text-teal-600 transition-smooth">{w.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{w.description}</p></div>); })}</div></div></section>

        {/* Lead Form */}
        <section id="lead-form" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto bg-card border-2 border-teal-500/30 rounded-3xl p-6 md:p-10 shadow-elegant"><div className="text-center max-w-2xl mx-auto mb-8 space-y-2"><span className="text-xs font-extrabold text-teal-600 uppercase tracking-widest">Free Online Counselling</span><h2 className="text-2xl md:text-3xl font-extrabold">Check My <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">New Zealand Options</span></h2></div>
          {formSubmitted ? (<div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4 animate-fade-in"><CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" /><h3 className="text-2xl font-bold text-foreground">WhatsApp is opening</h3><p className="text-sm text-muted-foreground max-w-md mx-auto">Press Send in WhatsApp to reach our NZ Specialist. Your enquiry is not received until you send the message.</p><button type="button" onClick={() => setFormSubmitted(false)} className="px-6 py-2.5 rounded-xl border border-emerald-500/20 text-emerald-600 font-semibold hover:bg-emerald-500/10 transition-colors text-xs">Submit Another Query</button></div>) : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="text-xs font-semibold block mb-1">Full Name *</label><input type="text" required placeholder="Your Name" value={formState.fullName} onChange={e => setFormState({...formState, fullName: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-teal-500/30" /></div><div><label className="text-xs font-semibold block mb-1">Mobile Number *</label><input type="tel" required placeholder="+91 98765 43210" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-teal-500/30" /></div><div><label className="text-xs font-semibold block mb-1">Email *</label><input type="email" required placeholder="email@example.com" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-teal-500/30" /></div></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="text-xs font-semibold block mb-1">Highest Qualification</label><select value={formState.highestQualification} onChange={e => setFormState({...formState, highestQualification: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background"><option>12th Standard</option><option>Bachelor's Degree</option><option>Master's Degree</option><option>Other</option></select></div><div><label className="text-xs font-semibold block mb-1">Preferred Course</label><input type="text" placeholder="e.g. MS Computer Science" value={formState.preferredCourse} onChange={e => setFormState({...formState, preferredCourse: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background" /></div><div><label className="text-xs font-semibold block mb-1">Target Intake</label><select value={formState.preferredIntake} onChange={e => setFormState({...formState, preferredIntake: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background"><option>February 2027</option><option>July 2027</option><option>February 2028</option></select></div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="text-xs font-semibold block mb-1">Need Education Loan?</label><select value={formState.needLoan} onChange={e => setFormState({...formState, needLoan: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background"><option>Yes</option><option>No</option><option>Not Sure</option></select></div><div><label className="text-xs font-semibold block mb-1">Post-study work important?</label><select value={formState.postStudyWork} onChange={e => setFormState({...formState, postStudyWork: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background"><option>Yes</option><option>No</option><option>Need Guidance</option></select></div></div>
            <button type="submit" className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:opacity-90 text-white font-bold py-4 rounded-xl text-base shadow-elegant transition-all" id="nz-form-submit">Check My New Zealand Options</button>
          </form>)}
        </div></div></section>

        {/* FAQs */}
        <section id="faqs" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="max-w-3xl mx-auto"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked <span className="text-teal-600">Questions</span></h2></div><Accordion type="single" collapsible className="space-y-3">{D.faqs.map((faq, i) => (<AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-6 shadow-soft data-[state=open]:shadow-elegant transition-smooth"><AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:text-teal-600 py-5 [&[data-state=open]]:text-teal-600">{faq.question}</AccordionTrigger><AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{faq.answer}</AccordionContent></AccordionItem>))}</Accordion></div></div></section>

        {/* Related Countries */}
        <section className="py-16 bg-background"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Other <span className="text-teal-600">Destinations</span></h2></div><div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-5xl mx-auto">{relatedCountries.map((c, i) => (<Link key={c.slug} to={`/countries/${c.slug}`} className="bg-card rounded-xl border p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth group"><div className="flex items-center gap-3 mb-3"><span className="text-3xl">{c.flag}</span><div><h3 className="font-bold group-hover:text-teal-600 transition-smooth">{c.name}</h3><p className="text-xs text-muted-foreground">{c.universities} Universities</p></div></div><div className="flex items-center justify-between text-xs text-muted-foreground"><span>{c.avgCost}</span><span className="flex items-center gap-1 text-teal-600 font-medium group-hover:gap-2 transition-all">Explore <ArrowRight className="w-3 h-3" /></span></div></Link>))}</div></div></section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 text-white"><div className="container mx-auto px-4 text-center"><div className="max-w-2xl mx-auto"><span className="text-6xl mb-6 block">🇳🇿</span><h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Study in New Zealand?</h2><p className="text-lg opacity-90 mb-8 leading-relaxed">Book a free consultation with our NZ education experts.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><a href="tel:+919211818710" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-teal-700 font-bold rounded-xl shadow-lg transition-all"><Phone className="w-5 h-5" />Call Now</a><a href="https://wa.me/919211818710" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-smooth"><MessageCircle className="w-5 h-5" />WhatsApp Us</a></div></div></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default StudyInNZPage;
