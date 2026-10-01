import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, MapPin, DollarSign, Award, Briefcase, Clock, ChevronRight, Globe2, BookOpen, Users, Shield, Building2, ArrowRight, Star, CheckCircle2, Wallet, Calendar, Sparkles, Phone, MessageCircle, AlertCircle, Building, Check, ArrowUpRight, Search, Grid, MoveHorizontal, Play, Pause, FileText, TrendingUp, Monitor, Cog, Heart, Palette, UserCheck, Globe, BadgeCheck, BarChart3 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CountryHeroBanner from "@/components/CountryHeroBanner";
import { FRANCE_PAGE_DATA, type FranceInstitution } from "@/data/francePageData";
import { countriesData } from "@/data/countryData";
import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";

const SITE_DOMAIN = "https://www.dreamdestinationstudyabroad.com";
const D = FRANCE_PAGE_DATA;
const iconMap: Record<string, React.FC<{ className?: string }>> = { GraduationCap, BookOpen, Briefcase, Users, Sparkles, Award, UserCheck, FileText, Shield, Wallet, Globe, Monitor, Cog, Heart, Palette, TrendingUp, BarChart3, BadgeCheck };
const getIcon = (name: string) => iconMap[name] || Globe2;

const InstitutionCard: React.FC<{ uni: FranceInstitution; index: number }> = ({ uni, index }) => {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="relative group shrink-0 w-[310px] md:w-[350px] bg-card/90 backdrop-blur-md rounded-2xl p-6 border border-border/80 shadow-3d-card shadow-3d-hover transition-all duration-500 flex flex-col justify-between transform-style-3d hover:z-20 cursor-pointer" style={{ transform: `perspective(1000px) rotateY(${index % 2 === 0 ? "1deg" : "-1deg"})` }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-red-500/5 rounded-2xl pointer-events-none group-hover:from-blue-500/10 group-hover:to-red-500/15 transition-all duration-500" />
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="relative w-14 h-14 rounded-xl bg-white p-2 border border-border/60 shadow-md shrink-0 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
            {!imgErr && uni.logo ? (<img src={uni.logo} alt={`${uni.name} logo`} width={64} height={64} className="w-full h-full object-contain" loading="lazy" onError={() => setImgErr(true)} />) : (<div className="w-full h-full rounded-lg bg-gradient-to-r from-blue-600 to-red-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">{uni.name.slice(0, 2).toUpperCase()}</div>)}
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-600 font-bold text-xs rounded-full shadow-sm shrink-0 border border-blue-500/20"><Award className="w-3.5 h-3.5" /><span>{uni.qsRanking || "Top French Institution"}</span></div>
        </div>
        <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-blue-600 transition-colors leading-tight mb-2 line-clamp-2">{uni.name}</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3"><MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" /><span className="truncate">{uni.location}</span></div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 border border-blue-500/20 flex items-center gap-1"><Building2 className="w-3 h-3" /> {uni.type}</span>
          {uni.postStudyWork && (<span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-red-500/10 text-red-600 border border-red-500/20 flex items-center gap-1"><Check className="w-3 h-3" /> Post-Study Options</span>)}
        </div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {uni.popularPrograms.slice(0, 3).map((s, i) => (<span key={i} className="px-2.5 py-1 bg-muted/80 text-muted-foreground text-[11px] font-medium rounded-md border border-border/40">{s}</span>))}
          {uni.popularPrograms.length > 3 && (<span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-[10px] font-semibold rounded-md">+{uni.popularPrograms.length - 3} more</span>)}
        </div>
      </div>
      <div className="pt-3 border-t border-border/40 flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1"><DollarSign className="w-4 h-4 text-blue-600" /> {uni.avgTuition}</span>
        <a href="#lead-form" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-white bg-blue-500/10 group-hover:bg-blue-600 group-hover:text-white px-3 py-1.5 rounded-lg transition-all duration-300 shadow-sm">Apply Now <ArrowUpRight className="w-3.5 h-3.5" /></a>
      </div>
    </div>
  );
};

const generateJsonLd = () => [
  { "@context": "https://schema.org", "@type": "WebPage", name: D.seo.title, description: D.seo.description, url: `${SITE_DOMAIN}/study-in-france`, inLanguage: "en", isPartOf: { "@type": "WebSite", name: "DreamDestination", url: SITE_DOMAIN }, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_DOMAIN }, { "@type": "ListItem", position: 2, name: "Countries", item: `${SITE_DOMAIN}/countries` }, { "@type": "ListItem", position: 3, name: "Study in France", item: `${SITE_DOMAIN}/study-in-france` }] }, about: { "@type": "Country", name: "France" }, keywords: D.seo.keywords.join(", ") },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: D.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  { "@context": "https://schema.org", "@type": "EducationalOrganization", name: "DreamDestination", url: SITE_DOMAIN, areaServed: { "@type": "Country", name: "France" } },
];

const StudyInFrancePage = () => {
  const [uniSearch, setUniSearch] = useState("");
  const [viewMode, setViewMode] = useState<"marquee" | "grid">("marquee");
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCourseStream, setSelectedCourseStream] = useState(0);
  const [formState, setFormState] = useState({ fullName: "", phone: "", email: "", highestQualification: "Bachelor's Degree", graduationYear: "2024", gpa: "", preferredCourse: "", preferredIntake: "September 2027", workExp: "0-2 Years", needLoan: "Yes", institutionType: "Not Sure!", languagePref: "Not Sure!", preferredCity: "Not Sure!" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hands the enquiry to WhatsApp. Before this, the form discarded it.
    sendLeadToWhatsApp("Study in France", formState);
    setFormSubmitted(true);
  };

  const filteredUnis = D.institutions.filter((uni) => uniSearch === "" || uni.name.toLowerCase().includes(uniSearch.toLowerCase()) || uni.location.toLowerCase().includes(uniSearch.toLowerCase()) || uni.popularPrograms.some((p) => p.toLowerCase().includes(uniSearch.toLowerCase())));
  const marqueeUnis = [...D.institutions, ...D.institutions];
  const relatedCountries = countriesData.filter((c) => c.slug !== "france").slice(0, 6);
  const jsonLd = generateJsonLd();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-blue-500/20 selection:text-blue-600">
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

      <div className="sticky top-[73px] z-40 bg-background/90 backdrop-blur-md border-b text-xs py-2.5 hidden md:block shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between overflow-x-auto whitespace-nowrap gap-6 no-scrollbar">
          <span className="font-bold text-blue-600 flex items-center gap-1.5 shrink-0"><span>🇫🇷</span> Study in France</span>
          <div className="flex items-center gap-5 text-muted-foreground font-medium">
            <a href="#overview" className="hover:text-primary transition-colors">Overview</a>
            <a href="#why-fr" className="hover:text-primary transition-colors">Why France</a>
            <a href="#institutions" className="hover:text-primary transition-colors">Institutions</a>
            <a href="#courses" className="hover:text-primary transition-colors">Courses</a>
            <a href="#intakes" className="hover:text-primary transition-colors">Intakes</a>
            <a href="#cost" className="hover:text-primary transition-colors">Cost</a>
            <a href="#loans" className="hover:text-primary transition-colors">Loans</a>
            <a href="#eef" className="hover:text-primary transition-colors">Études en France</a>
            <a href="#visa" className="hover:text-primary transition-colors">Visa</a>
            <a href="#faqs" className="hover:text-primary transition-colors">FAQs</a>
          </div>
          <a href="#lead-form" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded-full transition-colors shrink-0 shadow-sm">Apply Now</a>
        </div>
      </div>

      <main className="flex-1 pt-20">
                {/* Hero */}
        <CountryHeroBanner
          breadcrumb={[{ label: "Home", to: "/" }, { label: "Countries", to: "/countries" }, { label: "Study in France" }]}
          countryName="France"
          flag="🇫🇷"
          heading="Best Study in France for Indian Students"
          subheading="Official Admissions Partner for Top French Universities & Grandes Écoles"
          description={D.hero.description}
          valueProposition={D.hero.valueProposition}
          badgeText={D.hero.badge}
          stats={{
            universities: `${D.institutions.length}+ Institutions`,
            avgCost: D.atAGlance.stats[1]?.value || "€2,770 - €15,000/yr",
            workPermit: D.atAGlance.stats[4]?.value || "5-Year Visa / 2-Year APS",
            visaSuccessRate: "VLS-TS Étudiant",
          }}
          cta1Text={D.hero.primaryCta}
          cta1Href="#lead-form"
          cta2Text="View Institutions"
          cta2Href="#institutions"
        />

        {/* At A Glance */}
        <section id="overview" className="py-16 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="text-center max-w-2xl mx-auto mb-10"><h2 className="text-2xl md:text-3xl font-bold">{D.atAGlance.title}</h2></div><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">{D.atAGlance.stats.map((s, i) => (<div key={i} className="bg-card border rounded-xl p-4 text-center shadow-soft hover:shadow-elegant transition-all"><span className="text-xs text-muted-foreground font-medium block mb-1">{s.label}</span><span className="text-sm md:text-base font-extrabold text-blue-600 dark:text-blue-400 block">{s.value}</span></div>))}</div></div></section>

        {/* Why France */}
        <section id="why-fr" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-16"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Why Study in <span className="text-blue-600">France?</span></h2><p className="text-muted-foreground text-base">{D.whyFrance.subtitle}</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{D.whyFrance.reasons.map((r, i) => { const Icon = getIcon(r.icon); return (<div key={i} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group"><div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${i % 2 === 0 ? "bg-blue-500/10 text-blue-600" : "bg-red-500/10 text-red-600"}`}><Icon className="w-6 h-6" /></div><h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">{r.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p></div>); })}</div>
          <div className="mt-12 bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-red-500/10 border border-blue-500/20 rounded-2xl p-6 md:p-8"><div className="max-w-4xl mx-auto"><h3 className="text-xl font-bold mb-3 text-center">{D.whoShouldConsider.heading}</h3><p className="text-sm text-muted-foreground text-center mb-6">{D.whoShouldConsider.intro}</p><div className="grid md:grid-cols-2 gap-3 mb-4">{D.whoShouldConsider.points.map((p, i) => (<div key={i} className="flex items-start gap-2 bg-card/80 backdrop-blur p-3 rounded-xl border"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /><span className="text-sm text-foreground">{p}</span></div>))}</div><div className="text-center"><Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold" asChild><a href="#lead-form">{D.whoShouldConsider.cta.text}</a></Button></div></div></div>
        </div></section>

        {/* Institution Types — France-specific */}
        <section id="institution-types" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Unique French System</span><h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">{D.institutionTypes.title}</h2><p className="text-muted-foreground text-sm">{D.institutionTypes.subtitle}</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">{D.institutionTypes.types.map((t, i) => (<div key={i} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all group"><div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${i % 2 === 0 ? "bg-blue-500/10 text-blue-600" : "bg-red-500/10 text-red-600"}`}><Building2 className="w-6 h-6" /></div><h3 className="font-bold text-lg mb-2">{t.title}</h3><p className="text-xs text-muted-foreground leading-relaxed mb-3">{t.description}</p><p className="text-xs font-semibold text-blue-600">Best for: {t.bestFor}</p></div>))}</div>
          <div className="mt-8 bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 max-w-6xl mx-auto flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300"><AlertCircle className="w-5 h-5 shrink-0 text-blue-500" /><span>{D.institutionTypes.keyAdvice}</span></div>
        </div></section>

        {/* Institutions */}
        <section className="py-16 bg-background relative overflow-hidden" id="institutions">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div><div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 text-xs font-bold rounded-full mb-3"><Sparkles className="w-3.5 h-3.5" /><span>{D.institutions.length} Top French Institutions</span></div><h2 className="text-3xl md:text-4xl font-bold">Top Institutions in <span className="text-blue-600">France</span></h2></div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input type="text" placeholder="Search institution or course..." value={uniSearch} onChange={(e) => setUniSearch(e.target.value)} className="pl-9 pr-4 py-2 bg-card border border-border/80 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-44 md:w-60 shadow-soft" id="fr-institution-search" /></div>
                <div className="flex items-center bg-card border border-border/80 rounded-xl p-1 shadow-soft">
                  <button onClick={() => setViewMode("marquee")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "marquee" ? "bg-blue-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><MoveHorizontal className="w-3.5 h-3.5" /> Slider</button>
                  <button onClick={() => setViewMode("grid")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "grid" ? "bg-blue-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><Grid className="w-3.5 h-3.5" /> Grid</button>
                </div>
                {viewMode === "marquee" && !uniSearch && (<button onClick={() => setIsPlaying(!isPlaying)} className="p-2 bg-card border border-border/80 rounded-xl text-muted-foreground hover:text-blue-600 transition-colors shadow-soft">{isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</button>)}
              </div>
            </div>
            {uniSearch ? (<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">{filteredUnis.length > 0 ? filteredUnis.map((u, i) => (<div key={i} className="w-full"><InstitutionCard uni={u} index={i} /></div>)) : (<div className="col-span-full py-12 text-center text-muted-foreground">No institutions found.</div>)}</div>) : viewMode === "marquee" ? (<div className="relative w-full overflow-hidden py-6 perspective-1000"><div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" /><div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" /><div className={`flex gap-6 w-max ${isPlaying ? "animate-marquee-3d" : ""}`}>{marqueeUnis.map((u, i) => (<InstitutionCard key={`${u.name}-${i}`} uni={u} index={i} />))}</div></div>) : (<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">{filteredUnis.map((u, i) => (<div key={i} className="w-full"><InstitutionCard uni={u} index={i} /></div>))}</div>)}
            <div className="text-center mt-10 bg-card border rounded-xl p-8 shadow-soft max-w-2xl mx-auto"><h3 className="text-xl font-bold mb-2">Need help choosing a French institution?</h3><p className="text-sm text-muted-foreground mb-4">Share your profile for personalised guidance on universities, Grandes Écoles, and business schools.</p><a href="#lead-form" className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all text-sm">Get Profile Guidance <ArrowRight className="w-4 h-4" /></a></div>
          </div>
        </section>

        {/* Popular Courses */}
        <section id="courses" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Popular Courses in <span className="text-blue-600">France</span></h2></div><div className="flex flex-wrap gap-2 mb-8 justify-center">{D.popularCourses.map((c, i) => (<button key={i} onClick={() => setSelectedCourseStream(i)} className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all border ${selectedCourseStream === i ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-card text-muted-foreground border-border/60 hover:text-foreground"}`}>{c.category}</button>))}</div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{D.popularCourses.map((c, i) => { const Icon = getIcon(c.icon); return (<div key={i} className={`bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all ${selectedCourseStream === i ? "ring-2 ring-blue-500/40" : ""}`}><div className="flex items-center gap-3 mb-4"><div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i % 2 === 0 ? "bg-blue-500/10 text-blue-600" : "bg-red-500/10 text-red-600"}`}><Icon className="w-5 h-5" /></div><h3 className="font-bold text-lg">{c.category}</h3></div><div className="flex flex-wrap gap-2">{c.courses.map((co, ci) => (<span key={ci} className="text-xs px-3 py-1.5 rounded-lg bg-muted text-foreground font-medium hover:bg-blue-500/10 hover:text-blue-600 transition-colors cursor-pointer">{co}</span>))}</div></div>); })}</div></div></section>

        {/* Master's & MBA */}
        <section id="masters" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Master's in France for <span className="text-blue-600">Indian Students</span></h2><p className="text-muted-foreground text-sm max-w-2xl mx-auto">{D.mastersInFrance.description}</p></div><div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft mb-8"><div className="grid md:grid-cols-2 gap-3 mb-6">{D.mastersInFrance.considerations.map((c, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /><span>{c}</span></div>))}</div><h3 className="font-bold mb-3">Popular Master's Specialisations</h3><div className="flex flex-wrap gap-2 mb-6">{D.mastersInFrance.popularSpecialisations.map((s, i) => (<span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-600 font-semibold">{s}</span>))}</div><div className="text-center"><a href="#lead-form" className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all"><BadgeCheck className="w-5 h-5" />{D.mastersInFrance.cta.text}</a></div></div>
          {/* MBA Section */}
          <div className="bg-card border rounded-2xl p-6 shadow-soft"><h3 className="font-bold text-xl mb-2">{D.mbaInFrance.heading}</h3><div className="flex flex-wrap gap-2 mb-4">{D.mbaInFrance.areas.map((a, i) => (<span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 font-semibold">{a}</span>))}</div><h4 className="font-semibold text-sm mb-3">Before choosing an MBA, compare:</h4><div className="grid md:grid-cols-2 gap-2">{D.mbaInFrance.checkBefore.map((c, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />{c}</div>))}</div></div>
        </div></div></section>

        {/* Intakes */}
        <section id="intakes" className="py-20 bg-muted/30 border-y"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-16"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">France Intakes & <span className="text-blue-600">Planning Timeline</span></h2></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">{D.intakes.map((intake, i) => (<div key={i} className={`bg-card border rounded-2xl p-6 shadow-soft ${i === 0 ? "ring-2 ring-blue-500/30" : ""}`}><span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3 ${i === 0 ? "bg-blue-500/10 text-blue-600" : "bg-muted text-muted-foreground"}`}>{intake.status}</span><h3 className="text-xl font-bold mb-2">{intake.season}</h3><p className="text-xs text-muted-foreground mb-4">{intake.description}</p><div className="pt-3 border-t text-xs font-semibold text-foreground flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-500" />{intake.timeline}</div></div>))}</div><div className="max-w-4xl mx-auto space-y-4"><h3 className="text-xl font-bold text-center mb-6">When Should Indian Students Start Preparing?</h3>{D.timeline.map((s, i) => (<div key={i} className="bg-card border rounded-xl p-5 shadow-soft flex flex-col md:flex-row items-start md:items-center gap-4"><div className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs shrink-0">{s.phase}</div><div className="flex-1"><h4 className="font-bold text-sm text-foreground">{s.title}</h4><p className="text-xs text-muted-foreground mt-0.5">{s.details}</p></div></div>))}</div></div></section>

        {/* Cost */}
        <section id="cost" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Cost of Studying in <span className="text-blue-600">France</span></h2><p className="text-muted-foreground text-sm">{D.costOfStudy.intro}</p></div><div className="max-w-4xl mx-auto"><div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft mb-8"><h3 className="font-bold text-lg mb-4">Indicative Tuition (2026–27)</h3><div className="space-y-3 mb-6">{D.costOfStudy.breakdown.map((b, i) => (<div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-muted/40 gap-2 border"><span className="font-semibold text-sm text-foreground">{b.level}</span><div className="flex items-center gap-3 text-sm"><span className="font-bold text-blue-600">{b.cost}</span><span className="text-xs text-muted-foreground">({b.note})</span></div></div>))}</div></div>
          {/* Financial Requirement 2026 — France-specific highlight */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 md:p-8 rounded-2xl mb-8 ring-2 ring-blue-400/30"><div className="flex items-center gap-2 mb-3"><Sparkles className="w-5 h-5" /><h3 className="font-bold text-xl">{D.financialRequirement.heading}</h3></div><div className="grid md:grid-cols-2 gap-4 mb-3"><div className="bg-white/10 p-4 rounded-xl"><p className="text-xs opacity-80">New Minimum (from Aug 2026)</p><p className="text-3xl font-extrabold">{D.financialRequirement.amount}</p></div><div className="bg-white/10 p-4 rounded-xl"><p className="text-xs opacity-80">Previous</p><p className="text-xl font-bold opacity-60 line-through">€615/month</p></div></div><p className="text-xs opacity-75">{D.financialRequirement.disclaimer}</p></div>
          {/* Cost of Living */}
          <div className="bg-card border rounded-2xl p-6 shadow-soft mb-8"><h3 className="font-bold text-lg mb-2">{D.costOfLiving.title}</h3><p className="text-xs text-muted-foreground mb-4">{D.costOfLiving.intro}</p><div className="grid grid-cols-2 md:grid-cols-3 gap-3">{D.costOfLiving.cities.map((c, i) => (<div key={i} className="p-3 bg-muted/50 rounded-xl border"><p className="font-semibold text-sm text-foreground">{c.name}</p><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.costLevel === "Very High" ? "bg-red-500/10 text-red-600" : c.costLevel === "Moderate-High" ? "bg-orange-500/10 text-orange-600" : "bg-blue-500/10 text-blue-600"}`}>{c.costLevel}</span><p className="text-[11px] text-muted-foreground mt-1">{c.note}</p></div>))}</div></div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-700 dark:text-amber-300"><AlertCircle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" /><div><strong>Important:</strong> {D.costOfStudy.disclaimer}</div></div></div></div></section>

        {/* Scholarships */}
        <section id="scholarships" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Scholarships in <span className="text-blue-600">France</span></h2><p className="text-muted-foreground text-sm">{D.scholarships.intro}</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">{D.scholarships.categories.map((c, i) => (<div key={i} className="bg-card p-6 rounded-xl border shadow-soft"><div className="flex items-center gap-3 mb-4"><div className={`p-2 rounded-lg ${i === 0 ? "bg-blue-500/10 text-blue-600" : "bg-red-500/10 text-red-600"}`}><Award className="w-5 h-5" /></div><h3 className="font-bold text-lg">{c.title}</h3></div><ul className="space-y-2">{c.items.map((it, ii) => (<li key={ii} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />{it}</li>))}</ul></div>))}</div><div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5 max-w-4xl mx-auto"><p className="text-xs text-blue-600 font-bold uppercase tracking-wide mb-1">Important</p><p className="text-sm text-foreground">{D.scholarships.disclaimer}</p></div></div></section>

        {/* Education Loans */}
        <section id="loans" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Education Loan for <span className="text-blue-600">France</span></h2><p className="text-muted-foreground text-sm">{D.educationLoan.intro}</p></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"><div className="bg-card border rounded-2xl p-6 text-center shadow-soft"><Wallet className="w-8 h-8 text-blue-600 mx-auto mb-3" /><span className="text-xs text-muted-foreground font-medium block">Maximum</span><span className="text-2xl font-extrabold">{D.educationLoan.maxAmount}</span></div><div className="bg-card border rounded-2xl p-6 text-center shadow-soft"><Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" /><span className="text-xs text-muted-foreground font-medium block">Unsecured</span><span className="text-2xl font-extrabold">{D.educationLoan.unsecuredMax}</span></div><div className="bg-card border rounded-2xl p-6 text-center shadow-soft"><Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" /><span className="text-xs text-muted-foreground font-medium block">Interest Rate</span><span className="text-2xl font-extrabold">{D.educationLoan.interestRate}</span></div></div><div className="bg-card border rounded-2xl p-6 md:p-8 max-w-5xl mx-auto shadow-soft mb-8"><div className="grid md:grid-cols-2 gap-8"><div><h3 className="text-lg font-bold mb-4">Services:</h3><div className="grid gap-3">{D.educationLoan.services.map((s, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />{s}</div>))}</div></div><div><h3 className="text-lg font-bold mb-4">Highlights:</h3><div className="grid gap-3">{D.educationLoan.highlights.map((h, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{h}</div>))}</div></div></div></div><div className="text-center"><a href={`tel:${D.educationLoan.phoneNumber}`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all"><Phone className="w-5 h-5" />Call {D.educationLoan.phoneNumber} for Loan Options</a></div></div></section>

        {/* Études en France — France-specific */}
        <section id="eef" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><div className="text-center mb-12"><span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Mandatory for Indian Students</span><h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">{D.etudesEnFrance.heading}</h2><p className="text-muted-foreground text-sm max-w-2xl mx-auto">{D.etudesEnFrance.intro}</p></div><div className="bg-blue-600 text-white p-6 rounded-2xl mb-6"><p className="text-xs font-bold uppercase tracking-wide mb-2 opacity-80">General Process Flow</p><p className="text-sm font-semibold">{D.etudesEnFrance.process}</p></div><div className="bg-card border rounded-2xl p-6 shadow-soft mb-6"><h3 className="font-bold mb-4">Before Applying, Ensure:</h3><div className="grid md:grid-cols-2 gap-3">{D.etudesEnFrance.checkList.map((c, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />{c}</div>))}</div></div>
          {/* Campus France */}
          <div className="bg-card border rounded-2xl p-6 shadow-soft"><h3 className="font-bold text-lg mb-2">{D.campusFrance.heading}</h3><p className="text-sm text-muted-foreground mb-3">{D.campusFrance.description}</p><div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl"><p className="text-xs text-amber-700 dark:text-amber-300">{D.campusFrance.disclaimer}</p></div></div>
        </div></div></section>

        {/* Application Process */}
        <section id="application" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">How to Apply to <span className="text-blue-600">Study in France</span></h2><div className="relative mt-12"><div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-500/20 hidden md:block" /><div className="space-y-6">{D.applicationProcess.map((s, i) => (<div key={i} className="flex gap-6 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}><div className="shrink-0 hidden md:block"><div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-elegant z-10 relative">{s.step}</div></div><div className="flex-1 bg-card p-5 rounded-xl border shadow-soft"><div className="flex items-center gap-2 mb-1 md:hidden"><span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">{s.step}</span></div><h3 className="font-bold text-base mb-1">Step {s.step} — {s.title}</h3><p className="text-sm text-muted-foreground">{s.description}</p></div></div>))}</div></div></div></div></section>

        {/* Student Visa */}
        <section id="visa" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">France Student Visa <span className="text-blue-600">(VLS-TS)</span></h2><p className="text-muted-foreground text-center mb-8 text-sm">{D.studentVisa.intro}</p><div className="bg-blue-600 text-white p-5 rounded-xl mb-6"><p className="text-xs font-bold uppercase tracking-wide mb-2 opacity-80">General Process Flow</p><p className="text-sm font-semibold">{D.studentVisa.journey}</p></div><div className="bg-card rounded-2xl border shadow-elegant p-6 mb-6"><h3 className="font-bold text-lg mb-4">Visa Documents</h3><div className="grid md:grid-cols-2 gap-3">{D.studentVisa.requirements.map((r, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />{r}</div>))}</div></div><div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-700 dark:text-amber-300 flex items-start gap-3"><AlertCircle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" /><span>{D.studentVisa.processingNote}</span></div></div></div></section>

        {/* Work While Studying */}
        <section id="work-study" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Working While <span className="text-blue-600">Studying</span> in France</h2><div className="bg-card p-8 rounded-2xl border shadow-elegant"><p className="text-muted-foreground leading-relaxed mb-4">{D.workWhileStudying.intro}</p><p className="text-sm text-muted-foreground mb-4">{D.workWhileStudying.details}</p><div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-xl"><p className="text-sm text-orange-800 dark:text-orange-200 flex items-start gap-2"><Shield className="w-4 h-4 shrink-0 mt-0.5" /><span><strong>Important: </strong>{D.workWhileStudying.disclaimer}</span></p></div></div>
          {/* Internships */}
          <div className="bg-card p-6 rounded-xl border shadow-soft mt-6"><h3 className="font-bold text-lg mb-3 text-blue-600">{D.internships.heading}</h3><p className="text-sm text-muted-foreground mb-3">{D.internships.intro}</p><div className="grid md:grid-cols-2 gap-2">{D.internships.checkList.map((c, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />{c}</div>))}</div></div>
        </div></div></section>

        {/* Post-Study & Learning French */}
        <section id="post-study" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-xl border shadow-soft"><h3 className="font-bold text-xl mb-3">{D.postStudyOptions.heading}</h3><p className="text-sm text-muted-foreground mb-3">{D.postStudyOptions.intro}</p><div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl"><p className="text-xs text-amber-700 dark:text-amber-300">{D.postStudyOptions.disclaimer}</p></div></div>
          <div className="bg-card p-6 rounded-xl border shadow-soft"><h3 className="font-bold text-xl mb-3">{D.learningFrench.heading}</h3><p className="text-sm text-muted-foreground mb-4">{D.learningFrench.intro}</p><a href="#lead-form" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg text-sm transition-all"><BookOpen className="w-4 h-4" />{D.learningFrench.cta.text}</a></div>
        </div></div></div></section>

        {/* Cities */}
        <section id="cities" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Popular French Cities for <span className="text-blue-600">Indian Students</span></h2></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">{D.cities.map((c, i) => (<div key={i} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all group"><h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors mb-2">{c.name}</h3><p className="text-xs text-muted-foreground mb-3 leading-relaxed">{c.description}</p><div className="pt-3 border-t text-[11px] text-muted-foreground"><strong className="text-foreground">Institutions:</strong> {c.universities}</div></div>))}</div></div></section>

        {/* Why DD */}
        <section id="why-dd" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="text-blue-600">DreamDestination</span>?</h2></div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">{D.whyDD.map((w, i) => { const Icon = getIcon(w.icon); return (<div key={i} className="bg-card p-6 rounded-xl border shadow-soft hover:shadow-elegant transition-smooth group"><div className={`p-3 rounded-xl ${i % 3 === 0 ? "bg-blue-500/10 text-blue-600" : i % 3 === 1 ? "bg-red-500/10 text-red-600" : "bg-emerald-500/10 text-emerald-600"} w-fit mb-4`}><Icon className="w-6 h-6" /></div><h3 className="font-bold text-base mb-2 group-hover:text-blue-600 transition-smooth">{w.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{w.description}</p></div>); })}</div></div></section>

        {/* Lead Form — France-specific with extra fields */}
        <section id="lead-form" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto bg-card border-2 border-blue-500/30 rounded-3xl p-6 md:p-10 shadow-elegant"><div className="text-center max-w-2xl mx-auto mb-8 space-y-2"><span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Free Online Counselling</span><h2 className="text-2xl md:text-3xl font-extrabold">Check My <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-600">France Study Options</span></h2></div>
          {formSubmitted ? (<div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4 animate-fade-in"><CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" /><h3 className="text-2xl font-bold">WhatsApp is opening</h3><p className="text-sm text-muted-foreground">Press Send in WhatsApp to reach our France Specialist. Your enquiry is not received until you send the message.</p><button type="button" onClick={() => setFormSubmitted(false)} className="px-6 py-2.5 rounded-xl border border-emerald-500/20 text-emerald-600 font-semibold text-xs">Submit Another</button></div>) : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="text-xs font-semibold block mb-1">Full Name *</label><input type="text" required placeholder="Your Name" value={formState.fullName} onChange={e => setFormState({...formState, fullName: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30" /></div><div><label className="text-xs font-semibold block mb-1">Mobile *</label><input type="tel" required placeholder="+91 98765 43210" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30" /></div><div><label className="text-xs font-semibold block mb-1">Email *</label><input type="email" required placeholder="email@example.com" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30" /></div></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="text-xs font-semibold block mb-1">Preferred Course</label><input type="text" placeholder="e.g. MSc Data Science" value={formState.preferredCourse} onChange={e => setFormState({...formState, preferredCourse: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background" /></div><div><label className="text-xs font-semibold block mb-1">Target Intake</label><select value={formState.preferredIntake} onChange={e => setFormState({...formState, preferredIntake: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background"><option>September 2027</option><option>January 2027</option><option>September 2028</option></select></div><div><label className="text-xs font-semibold block mb-1">Institution Type</label><select value={formState.institutionType} onChange={e => setFormState({...formState, institutionType: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background"><option>University</option><option>Grande École</option><option>Business School</option><option>Engineering School</option><option>Not Sure!</option></select></div></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="text-xs font-semibold block mb-1">Language Preference</label><select value={formState.languagePref} onChange={e => setFormState({...formState, languagePref: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background"><option>English</option><option>French</option><option>Not Sure!</option></select></div><div><label className="text-xs font-semibold block mb-1">Need Loan?</label><select value={formState.needLoan} onChange={e => setFormState({...formState, needLoan: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background"><option>Yes</option><option>No</option><option>Not Sure</option></select></div><div><label className="text-xs font-semibold block mb-1">Preferred City</label><select value={formState.preferredCity} onChange={e => setFormState({...formState, preferredCity: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background"><option>Paris</option><option>Lyon</option><option>Toulouse</option><option>Lille</option><option>Bordeaux</option><option>Grenoble</option><option>Nantes</option><option>Not Sure!</option></select></div></div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 text-white font-bold py-4 rounded-xl text-base shadow-elegant transition-all" id="fr-form-submit">Check My France Study Options</button>
          </form>)}
        </div></div></section>

        {/* FAQs */}
        <section id="faqs" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="max-w-3xl mx-auto"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked <span className="text-blue-600">Questions</span></h2></div><Accordion type="single" collapsible className="space-y-3">{D.faqs.map((faq, i) => (<AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-6 shadow-soft data-[state=open]:shadow-elegant transition-smooth"><AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:text-blue-600 py-5 [&[data-state=open]]:text-blue-600">{faq.question}</AccordionTrigger><AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{faq.answer}</AccordionContent></AccordionItem>))}</Accordion></div></div></section>

        {/* Related Countries */}
        <section className="py-16 bg-background"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Other <span className="text-blue-600">Destinations</span></h2></div><div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-5xl mx-auto">{relatedCountries.map((c) => (<Link key={c.slug} to={`/countries/${c.slug}`} className="bg-card rounded-xl border p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth group"><div className="flex items-center gap-3 mb-3"><span className="text-3xl">{c.flag}</span><div><h3 className="font-bold group-hover:text-blue-600 transition-smooth">{c.name}</h3><p className="text-xs text-muted-foreground">{c.universities} Universities</p></div></div><div className="flex items-center justify-between text-xs text-muted-foreground"><span>{c.avgCost}</span><span className="flex items-center gap-1 text-blue-600 font-medium">Explore <ArrowRight className="w-3 h-3" /></span></div></Link>))}</div></div></section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-red-700 text-white"><div className="container mx-auto px-4 text-center"><div className="max-w-2xl mx-auto"><span className="text-6xl mb-6 block">🇫🇷</span><h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Study in France?</h2><p className="text-lg opacity-90 mb-8">Book a free consultation with our France education experts.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><a href="tel:+919211818710" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl shadow-lg"><Phone className="w-5 h-5" />Call Now</a><a href="https://wa.me/919211818710" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20"><MessageCircle className="w-5 h-5" />WhatsApp Us</a></div></div></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default StudyInFrancePage;
