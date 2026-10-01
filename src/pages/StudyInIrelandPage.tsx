import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, MapPin, DollarSign, Award, Briefcase, Clock, ChevronRight, Globe2, BookOpen, Users, Shield, Building2, ArrowRight, Star, CheckCircle2, Wallet, Calendar, Sparkles, Phone, MessageCircle, AlertCircle, Building, Check, ArrowUpRight, Search, Grid, MoveHorizontal, Play, Pause, FileText, TrendingUp, Monitor, Cog, Heart, Palette, UserCheck, Globe, BadgeCheck, BarChart3 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CountryHeroBanner from "@/components/CountryHeroBanner";
import { IRELAND_PAGE_DATA, type IrelandUniversity } from "@/data/irelandPageData";
import { countriesData } from "@/data/countryData";
import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";

const SITE_DOMAIN = "https://www.dreamdestinationstudyabroad.com";
const D = IRELAND_PAGE_DATA;
const iconMap: Record<string, React.FC<{ className?: string }>> = { GraduationCap, BookOpen, Briefcase, Users, Sparkles, Award, UserCheck, FileText, Shield, Wallet, Globe, Monitor, Cog, Heart, Palette, TrendingUp, BarChart3, BadgeCheck, Building2, Building };
const getIcon = (name: string) => iconMap[name] || Globe2;

const UniversityCard: React.FC<{ uni: IrelandUniversity; index: number }> = ({ uni, index }) => {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="relative group shrink-0 w-[310px] md:w-[350px] bg-card/90 backdrop-blur-md rounded-2xl p-6 border border-border/80 shadow-3d-card shadow-3d-hover transition-all duration-500 flex flex-col justify-between transform-style-3d hover:z-20 cursor-pointer" style={{ transform: `perspective(1000px) rotateY(${index % 2 === 0 ? "1deg" : "-1deg"})` }}>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 rounded-2xl pointer-events-none group-hover:from-emerald-500/10 group-hover:to-green-500/15 transition-all duration-500" />
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="relative w-14 h-14 rounded-xl bg-white p-2 border border-border/60 shadow-md shrink-0 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
            {!imgErr && uni.logo ? (<img src={uni.logo} alt={`${uni.name} logo`} width={64} height={64} className="w-full h-full object-contain" loading="lazy" onError={() => setImgErr(true)} />) : (<div className="w-full h-full rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">{uni.name.slice(0, 2).toUpperCase()}</div>)}
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-emerald-500/10 text-emerald-600 font-bold text-xs rounded-full shadow-sm shrink-0 border border-emerald-500/20"><Award className="w-3.5 h-3.5" /><span>{uni.qsRanking || "Top Irish University"}</span></div>
        </div>
        <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-emerald-600 transition-colors leading-tight mb-2 line-clamp-2">{uni.name}</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3"><MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" /><span className="truncate">{uni.location}</span></div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1"><Building2 className="w-3 h-3" /> {uni.type}</span>
          {uni.postStudyWork && (<span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-green-500/10 text-green-600 border border-green-500/20 flex items-center gap-1"><Check className="w-3 h-3" /> Graduate Programme</span>)}
        </div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {uni.popularPrograms.slice(0, 3).map((s, i) => (<span key={i} className="px-2.5 py-1 bg-muted/80 text-muted-foreground text-[11px] font-medium rounded-md border border-border/40">{s}</span>))}
          {uni.popularPrograms.length > 3 && (<span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 text-[10px] font-semibold rounded-md">+{uni.popularPrograms.length - 3} more</span>)}
        </div>
      </div>
      <div className="pt-3 border-t border-border/40 flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1"><DollarSign className="w-4 h-4 text-emerald-600" /> {uni.avgTuition}</span>
        <a href="#lead-form" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-white bg-emerald-500/10 group-hover:bg-emerald-600 group-hover:text-white px-3 py-1.5 rounded-lg transition-all duration-300 shadow-sm">Apply Now <ArrowUpRight className="w-3.5 h-3.5" /></a>
      </div>
    </div>
  );
};

const generateJsonLd = () => [
  { "@context": "https://schema.org", "@type": "WebPage", name: D.seo.title, description: D.seo.description, url: `${SITE_DOMAIN}/study-in-ireland`, inLanguage: "en", isPartOf: { "@type": "WebSite", name: "DreamDestination", url: SITE_DOMAIN }, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_DOMAIN }, { "@type": "ListItem", position: 2, name: "Countries", item: `${SITE_DOMAIN}/countries` }, { "@type": "ListItem", position: 3, name: "Study in Ireland", item: `${SITE_DOMAIN}/study-in-ireland` }] }, about: { "@type": "Country", name: "Ireland" }, keywords: D.seo.keywords.join(", ") },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: D.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  { "@context": "https://schema.org", "@type": "EducationalOrganization", name: "DreamDestination", url: SITE_DOMAIN, areaServed: { "@type": "Country", name: "Ireland" } },
];

const StudyInIrelandPage = () => {
  const [uniSearch, setUniSearch] = useState("");
  const [viewMode, setViewMode] = useState<"marquee" | "grid">("marquee");
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCourseStream, setSelectedCourseStream] = useState(0);
  const [formState, setFormState] = useState({ fullName: "", phone: "", email: "", highestQualification: "Bachelor's Degree", graduationYear: "2024", gpa: "", preferredCourse: "", preferredIntake: "September 2027", workExp: "0-2 Years", needLoan: "Yes", postStudyWork: "Yes" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hands the enquiry to WhatsApp. Before this, the form discarded it.
    sendLeadToWhatsApp("Study in Ireland", formState);
    setFormSubmitted(true);
  };

  const filteredUnis = D.universities.filter((uni) => uniSearch === "" || uni.name.toLowerCase().includes(uniSearch.toLowerCase()) || uni.location.toLowerCase().includes(uniSearch.toLowerCase()) || uni.popularPrograms.some((p) => p.toLowerCase().includes(uniSearch.toLowerCase())));
  const marqueeUnis = [...D.universities, ...D.universities];
  const relatedCountries = countriesData.filter((c) => c.slug !== "ireland").slice(0, 6);
  const jsonLd = generateJsonLd();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-emerald-500/20 selection:text-emerald-600">
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
          <span className="font-bold text-emerald-600 flex items-center gap-1.5 shrink-0"><span>🇮🇪</span> Study in Ireland</span>
          <div className="flex items-center gap-5 text-muted-foreground font-medium">
            <a href="#overview" className="hover:text-primary transition-colors">Overview</a>
            <a href="#why-ie" className="hover:text-primary transition-colors">Why Ireland</a>
            <a href="#universities" className="hover:text-primary transition-colors">Universities</a>
            <a href="#courses" className="hover:text-primary transition-colors">Courses</a>
            <a href="#intakes" className="hover:text-primary transition-colors">Intakes</a>
            <a href="#cost" className="hover:text-primary transition-colors">Cost</a>
            <a href="#loans" className="hover:text-primary transition-colors">Loans</a>
            <a href="#visa" className="hover:text-primary transition-colors">Visa & Stamp 2</a>
            <a href="#faqs" className="hover:text-primary transition-colors">FAQs</a>
          </div>
          <a href="#lead-form" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1 rounded-full transition-colors shrink-0 shadow-sm">Apply Now</a>
        </div>
      </div>

      <main className="flex-1 pt-20">
                {/* Hero */}
        <CountryHeroBanner
          breadcrumb={[{ label: "Home", to: "/" }, { label: "Countries", to: "/countries" }, { label: "Study in Ireland" }]}
          countryName="Ireland"
          flag="🇮🇪"
          heading="Best Study in Ireland for Indian Students"
          subheading="Official Admissions Partner for Top Universities in Ireland"
          description={D.hero.description}
          valueProposition={D.hero.valueProposition}
          badgeText={D.hero.badge}
          stats={{
            universities: `${D.universities.length}+ Universities`,
            avgCost: D.atAGlance.stats[1]?.value || "€10,000 - €25,000/yr",
            workPermit: D.atAGlance.stats[4]?.value || "2-Year Post-Study Visa",
            visaSuccessRate: "Long Stay D + Stamp 2",
          }}
          cta1Text={D.hero.primaryCta}
          cta1Href="#lead-form"
          cta2Text="View Universities"
          cta2Href="#universities"
        />

        {/* At A Glance */}
        <section id="overview" className="py-16 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="text-center max-w-2xl mx-auto mb-10"><h2 className="text-2xl md:text-3xl font-bold">{D.atAGlance.title}</h2></div><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">{D.atAGlance.stats.map((s, i) => (<div key={i} className="bg-card border rounded-xl p-4 text-center shadow-soft hover:shadow-elegant transition-all"><span className="text-xs text-muted-foreground font-medium block mb-1">{s.label}</span><span className="text-sm md:text-base font-extrabold text-emerald-600 dark:text-emerald-400 block">{s.value}</span></div>))}</div></div></section>

        {/* Why Ireland */}
        <section id="why-ie" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-16"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Why Study in <span className="text-emerald-600">Ireland?</span></h2><p className="text-muted-foreground text-base">{D.whyIreland.subtitle}</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{D.whyIreland.reasons.map((r, i) => { const Icon = getIcon(r.icon); return (<div key={i} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group"><div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${i % 2 === 0 ? "bg-emerald-500/10 text-emerald-600" : "bg-green-500/10 text-green-600"}`}><Icon className="w-6 h-6" /></div><h3 className="text-lg font-bold mb-2 group-hover:text-emerald-600 transition-colors">{r.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p></div>); })}</div>
          <div className="mt-12 bg-gradient-to-r from-emerald-600/10 via-emerald-500/5 to-green-500/10 border border-emerald-500/20 rounded-2xl p-6 md:p-8"><div className="max-w-4xl mx-auto"><h3 className="text-xl font-bold mb-3 text-center">{D.whoShouldConsider.heading}</h3><p className="text-sm text-muted-foreground text-center mb-6">{D.whoShouldConsider.intro}</p><div className="grid md:grid-cols-2 gap-3 mb-4">{D.whoShouldConsider.points.map((p, i) => (<div key={i} className="flex items-start gap-2 bg-card/80 backdrop-blur p-3 rounded-xl border"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-sm text-foreground">{p}</span></div>))}</div><div className="flex flex-wrap gap-2 justify-center mb-6">{D.whoShouldConsider.suitableFor.map((s, i) => (<span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">{s}</span>))}</div><div className="text-center"><Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold" asChild><a href="#lead-form">{D.whoShouldConsider.cta.text}</a></Button></div></div></div>
        </div></section>

        {/* Institution Types — Ireland-specific */}
        <section id="institution-types" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Important for SEO</span><h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">{D.institutionTypes.title}</h2></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">{D.institutionTypes.types.map((t, i) => { const Icon = getIcon(t.icon); return (<div key={i} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all group"><div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${i % 2 === 0 ? "bg-emerald-500/10 text-emerald-600" : "bg-green-500/10 text-green-600"}`}><Icon className="w-6 h-6" /></div><h3 className="font-bold text-lg mb-2">{t.title}</h3><p className="text-xs text-muted-foreground leading-relaxed">{t.description}</p></div>); })}</div>
          <div className="mt-8 bg-card border rounded-xl p-6 max-w-5xl mx-auto shadow-soft"><h3 className="font-bold mb-3">Before Selecting an Institution, Check:</h3><div className="grid md:grid-cols-2 gap-2">{D.institutionTypes.checkList.map((c, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{c}</div>))}</div><p className="text-xs text-muted-foreground italic mt-4">{D.institutionTypes.disclaimer}</p></div>
        </div></section>

        {/* Universities */}
        <section className="py-16 bg-background relative overflow-hidden" id="universities">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div><div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 text-xs font-bold rounded-full mb-3"><Sparkles className="w-3.5 h-3.5" /><span>{D.universities.length} Top Irish Universities</span></div><h2 className="text-3xl md:text-4xl font-bold">Top Universities in <span className="text-emerald-600">Ireland</span></h2></div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input type="text" placeholder="Search university or course..." value={uniSearch} onChange={(e) => setUniSearch(e.target.value)} className="pl-9 pr-4 py-2 bg-card border border-border/80 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 w-44 md:w-60 shadow-soft" id="ie-university-search" /></div>
                <div className="flex items-center bg-card border border-border/80 rounded-xl p-1 shadow-soft">
                  <button onClick={() => setViewMode("marquee")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "marquee" ? "bg-emerald-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><MoveHorizontal className="w-3.5 h-3.5" /> Slider</button>
                  <button onClick={() => setViewMode("grid")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "grid" ? "bg-emerald-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><Grid className="w-3.5 h-3.5" /> Grid</button>
                </div>
                {viewMode === "marquee" && !uniSearch && (<button onClick={() => setIsPlaying(!isPlaying)} className="p-2 bg-card border border-border/80 rounded-xl text-muted-foreground hover:text-emerald-600 transition-colors shadow-soft">{isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</button>)}
              </div>
            </div>
            {uniSearch ? (<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">{filteredUnis.length > 0 ? filteredUnis.map((u, i) => (<div key={i} className="w-full"><UniversityCard uni={u} index={i} /></div>)) : (<div className="col-span-full py-12 text-center text-muted-foreground">No universities found.</div>)}</div>) : viewMode === "marquee" ? (<div className="relative w-full overflow-hidden py-6 perspective-1000"><div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" /><div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" /><div className={`flex gap-6 w-max ${isPlaying ? "animate-marquee-3d" : ""}`}>{marqueeUnis.map((u, i) => (<UniversityCard key={`${u.name}-${i}`} uni={u} index={i} />))}</div></div>) : (<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">{filteredUnis.map((u, i) => (<div key={i} className="w-full"><UniversityCard uni={u} index={i} /></div>))}</div>)}
            <div className="text-center mt-10 bg-card border rounded-xl p-8 shadow-soft max-w-2xl mx-auto"><h3 className="text-xl font-bold mb-2">Need help choosing an Irish university?</h3><p className="text-sm text-muted-foreground mb-4">Share your profile and get personalised guidance.</p><a href="#lead-form" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all text-sm">Get Profile Guidance <ArrowRight className="w-4 h-4" /></a></div>
          </div>
        </section>

        {/* Popular Courses */}
        <section id="courses" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Popular Courses in <span className="text-emerald-600">Ireland</span></h2></div><div className="flex flex-wrap gap-2 mb-8 justify-center">{D.popularCourses.map((c, i) => (<button key={i} onClick={() => setSelectedCourseStream(i)} className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all border ${selectedCourseStream === i ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-card text-muted-foreground border-border/60 hover:text-foreground"}`}>{c.category}</button>))}</div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{D.popularCourses.map((c, i) => { const Icon = getIcon(c.icon); return (<div key={i} className={`bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all ${selectedCourseStream === i ? "ring-2 ring-emerald-500/40" : ""}`}><div className="flex items-center gap-3 mb-4"><div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i % 2 === 0 ? "bg-emerald-500/10 text-emerald-600" : "bg-green-500/10 text-green-600"}`}><Icon className="w-5 h-5" /></div><h3 className="font-bold text-lg">{c.category}</h3></div><div className="flex flex-wrap gap-2">{c.courses.map((co, ci) => (<span key={ci} className="text-xs px-3 py-1.5 rounded-lg bg-muted text-foreground font-medium hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors cursor-pointer">{co}</span>))}</div></div>); })}</div></div></section>

        {/* Masters & MBA */}
        <section id="masters" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Master's in Ireland for <span className="text-emerald-600">Indian Students</span></h2><p className="text-muted-foreground text-sm max-w-2xl mx-auto">{D.mastersInIreland.description}</p></div><div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft mb-8"><div className="grid md:grid-cols-2 gap-3 mb-6">{D.mastersInIreland.considerations.map((c, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /><span>{c}</span></div>))}</div><h3 className="font-bold mb-3">Popular Specialisations</h3><div className="flex flex-wrap gap-2 mb-6">{D.mastersInIreland.popularSpecialisations.map((s, i) => (<span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 font-semibold">{s}</span>))}</div><div className="text-center"><a href="#lead-form" className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all"><BadgeCheck className="w-5 h-5" />{D.mastersInIreland.cta.text}</a></div></div></div></div></section>

        {/* Intakes & Timeline */}
        <section id="intakes" className="py-20 bg-muted/30 border-y"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-16"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ireland Intakes & <span className="text-emerald-600">Planning Timeline</span></h2></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">{D.intakes.map((intake, i) => (<div key={i} className={`bg-card border rounded-2xl p-6 shadow-soft ${i === 0 ? "ring-2 ring-emerald-500/30" : ""}`}><span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3 ${i === 0 ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"}`}>{intake.status}</span><h3 className="text-xl font-bold mb-2">{intake.season}</h3><p className="text-xs text-muted-foreground mb-4">{intake.description}</p><div className="pt-3 border-t text-xs font-semibold text-foreground flex items-center gap-1.5"><Calendar className="w-4 h-4 text-emerald-500" />{intake.timeline}</div></div>))}</div><div className="max-w-4xl mx-auto space-y-4"><h3 className="text-xl font-bold text-center mb-6">When Should You Start Preparing?</h3>{D.timeline.map((s, i) => (<div key={i} className="bg-card border rounded-xl p-5 shadow-soft flex flex-col md:flex-row items-start md:items-center gap-4"><div className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs shrink-0">{s.phase}</div><div className="flex-1"><h4 className="font-bold text-sm text-foreground">{s.title}</h4><p className="text-xs text-muted-foreground mt-0.5">{s.details}</p></div></div>))}</div></div></section>

        {/* Cost */}
        <section id="cost" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Cost of Studying in <span className="text-emerald-600">Ireland</span></h2><p className="text-muted-foreground text-sm">{D.costOfStudy.intro}</p></div><div className="max-w-4xl mx-auto"><div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft mb-8"><h3 className="font-bold text-lg mb-4">Indicative Annual Tuition</h3><div className="space-y-3 mb-6">{D.costOfStudy.breakdown.map((b, i) => (<div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-muted/40 gap-2 border"><span className="font-semibold text-sm text-foreground">{b.level}</span><div className="flex items-center gap-3 text-sm"><span className="font-bold text-emerald-600">{b.cost}</span><span className="text-xs text-muted-foreground">({b.note})</span></div></div>))}</div></div><div className="bg-card border rounded-2xl p-6 shadow-soft mb-8"><h3 className="font-bold text-lg mb-2">Cost of Living by City</h3><div className="grid grid-cols-2 md:grid-cols-3 gap-3">{D.costOfLiving.cities.map((c, i) => (<div key={i} className="p-3 bg-muted/50 rounded-xl border"><p className="font-semibold text-sm text-foreground">{c.name}</p><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.costLevel === "Very High" ? "bg-red-500/10 text-red-600" : c.costLevel === "Moderate-High" ? "bg-orange-500/10 text-orange-600" : c.costLevel === "Moderate" ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600"}`}>{c.costLevel}</span><p className="text-[11px] text-muted-foreground mt-1">{c.note}</p></div>))}</div></div><div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-700 dark:text-amber-300"><AlertCircle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" /><div><strong>Disclaimer:</strong> {D.costOfStudy.disclaimer}</div></div></div></div></section>

        {/* Scholarships */}
        <section id="scholarships" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Scholarships in <span className="text-emerald-600">Ireland</span></h2><p className="text-muted-foreground text-sm">{D.scholarships.intro}</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">{D.scholarships.categories.map((c, i) => (<div key={i} className="bg-card p-6 rounded-xl border shadow-soft"><div className="flex items-center gap-3 mb-4"><div className={`p-2 rounded-lg ${i === 0 ? "bg-emerald-500/10 text-emerald-600" : "bg-blue-500/10 text-blue-600"}`}><Award className="w-5 h-5" /></div><h3 className="font-bold text-lg">{c.title}</h3></div><ul className="space-y-2">{c.items.map((it, ii) => (<li key={ii} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{it}</li>))}</ul></div>))}</div></div></section>

        {/* Education Loans */}
        <section id="loans" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">DreamDestination Differentiator</span><h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">Education Loan for <span className="text-emerald-600">Ireland</span></h2></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"><div className="bg-card border rounded-2xl p-6 text-center shadow-soft"><Wallet className="w-8 h-8 text-emerald-600 mx-auto mb-3" /><span className="text-xs text-muted-foreground font-medium block">Maximum</span><span className="text-2xl font-extrabold">{D.educationLoan.maxAmount}</span></div><div className="bg-card border rounded-2xl p-6 text-center shadow-soft"><Shield className="w-8 h-8 text-emerald-600 mx-auto mb-3" /><span className="text-xs text-muted-foreground font-medium block">Unsecured</span><span className="text-2xl font-extrabold">{D.educationLoan.unsecuredMax}</span></div><div className="bg-card border rounded-2xl p-6 text-center shadow-soft"><Clock className="w-8 h-8 text-emerald-600 mx-auto mb-3" /><span className="text-xs text-muted-foreground font-medium block">Interest Rate</span><span className="text-2xl font-extrabold">{D.educationLoan.interestRate}</span></div></div><div className="text-center"><a href="tel:+919211818710" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all"><Phone className="w-5 h-5" />Call for Loan Options</a></div></div></section>

        {/* Student Visa & Stamp 2 — Ireland-specific */}
        <section id="visa" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Ireland Student Visa & <span className="text-emerald-600">Stamp 2</span></h2><p className="text-muted-foreground text-center mb-8 text-sm">{D.studentVisa.intro}</p><div className="bg-emerald-600 text-white p-5 rounded-xl mb-6"><p className="text-xs font-bold uppercase tracking-wide mb-2 opacity-80">Typical Journey</p><p className="text-sm font-semibold">{D.studentVisa.journey}</p></div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card rounded-2xl border shadow-elegant p-6"><h3 className="font-bold text-lg mb-4">Visa Documents</h3><div className="space-y-3">{D.studentVisa.requirements.map((r, i) => (<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{r}</div>))}</div></div>
            <div className="space-y-6">
              {/* Work While Studying — Stamp 2 */}
              <div className="bg-card p-6 rounded-xl border shadow-soft"><h3 className="font-bold text-lg mb-3 text-emerald-600">{D.workWhileStudying.heading}</h3><p className="text-sm text-muted-foreground mb-2">{D.workWhileStudying.intro}</p><div className="grid grid-cols-2 gap-3 mb-3"><div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 text-center"><p className="text-xs text-muted-foreground">Term Time</p><p className="font-bold text-lg text-emerald-600">{D.workWhileStudying.termTime}</p></div><div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 text-center"><p className="text-xs text-muted-foreground">Vacation</p><p className="font-bold text-lg text-emerald-600">{D.workWhileStudying.vacationTime}</p></div></div><p className="text-xs text-muted-foreground italic">{D.workWhileStudying.disclaimer}</p></div>
              {/* Third Level Graduate Programme */}
              <div className="bg-card p-6 rounded-xl border shadow-soft ring-2 ring-emerald-500/20"><h3 className="font-bold text-lg mb-2 text-emerald-600">{D.thirdLevelGraduateProgramme.heading}</h3><p className="text-sm text-muted-foreground mb-2">{D.thirdLevelGraduateProgramme.intro}</p><p className="text-sm font-semibold text-emerald-600">{D.thirdLevelGraduateProgramme.level9Duration}</p><p className="text-xs text-muted-foreground mt-2 italic">{D.thirdLevelGraduateProgramme.disclaimer}</p></div>
            </div>
          </div>
          {/* Eligible Programmes — Ireland-specific */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 md:p-8 rounded-2xl mb-6"><div className="flex items-center gap-2 mb-3"><Shield className="w-5 h-5" /><h3 className="font-bold text-xl">{D.eligibleProgrammes.heading}</h3></div><p className="text-sm opacity-95 leading-relaxed mb-4">{D.eligibleProgrammes.intro}</p><div className="grid md:grid-cols-2 gap-3">{D.eligibleProgrammes.checkBefore.map((c, i) => (<div key={i} className="flex items-center gap-2 text-sm opacity-90"><Check className="w-4 h-4 shrink-0" />{c}</div>))}</div><p className="text-xs opacity-75 italic mt-4">{D.eligibleProgrammes.note}</p></div>
        </div></div></section>

        {/* Cities */}
        <section id="cities" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center max-w-3xl mx-auto mb-14"><h2 className="text-3xl md:text-4xl font-extrabold mb-4">Popular Irish Cities for <span className="text-emerald-600">Indian Students</span></h2></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">{D.cities.map((c, i) => (<div key={i} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all group"><h3 className="font-bold text-lg group-hover:text-emerald-600 transition-colors mb-2">{c.name}</h3><p className="text-xs text-muted-foreground mb-3 leading-relaxed">{c.description}</p><div className="pt-3 border-t text-[11px] text-muted-foreground"><strong className="text-foreground">Institutions:</strong> {c.universities}</div></div>))}</div></div></section>

        {/* Why DD */}
        <section id="why-dd" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="text-emerald-600">DreamDestination</span>?</h2></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">{D.whyDD.map((w, i) => { const Icon = getIcon(w.icon); return (<div key={i} className="bg-card p-6 rounded-xl border shadow-soft hover:shadow-elegant transition-smooth group"><div className={`p-3 rounded-xl ${i % 3 === 0 ? "bg-emerald-500/10 text-emerald-600" : i % 3 === 1 ? "bg-green-500/10 text-green-600" : "bg-blue-500/10 text-blue-600"} w-fit mb-4`}><Icon className="w-6 h-6" /></div><h3 className="font-bold text-base mb-2 group-hover:text-emerald-600 transition-smooth">{w.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{w.description}</p></div>); })}</div></div></section>

        {/* Lead Form */}
        <section id="lead-form" className="py-20 bg-background"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto bg-card border-2 border-emerald-500/30 rounded-3xl p-6 md:p-10 shadow-elegant"><div className="text-center max-w-2xl mx-auto mb-8 space-y-2"><span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest">Free Online Counselling</span><h2 className="text-2xl md:text-3xl font-extrabold">Check My <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600">Ireland Study Options</span></h2></div>
          {formSubmitted ? (<div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4 animate-fade-in"><CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" /><h3 className="text-2xl font-bold">WhatsApp is opening</h3><p className="text-sm text-muted-foreground max-w-md mx-auto">Press Send in WhatsApp to reach our Ireland Specialist. Your enquiry is not received until you send the message.</p><button type="button" onClick={() => setFormSubmitted(false)} className="px-6 py-2.5 rounded-xl border border-emerald-500/20 text-emerald-600 font-semibold hover:bg-emerald-500/10 text-xs">Submit Another Query</button></div>) : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="text-xs font-semibold block mb-1">Full Name *</label><input type="text" required placeholder="Your Name" value={formState.fullName} onChange={e => setFormState({...formState, fullName: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500/30" /></div><div><label className="text-xs font-semibold block mb-1">Mobile *</label><input type="tel" required placeholder="+91 98765 43210" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500/30" /></div><div><label className="text-xs font-semibold block mb-1">Email *</label><input type="email" required placeholder="email@example.com" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500/30" /></div></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="text-xs font-semibold block mb-1">Preferred Course</label><input type="text" placeholder="e.g. MSc Data Science" value={formState.preferredCourse} onChange={e => setFormState({...formState, preferredCourse: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background" /></div><div><label className="text-xs font-semibold block mb-1">Target Intake</label><select value={formState.preferredIntake} onChange={e => setFormState({...formState, preferredIntake: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background"><option>September 2027</option><option>January 2027</option><option>September 2028</option></select></div><div><label className="text-xs font-semibold block mb-1">Need Loan?</label><select value={formState.needLoan} onChange={e => setFormState({...formState, needLoan: e.target.value})} className="w-full text-xs p-3 rounded-xl border bg-background"><option>Yes</option><option>No</option><option>Not Sure</option></select></div></div>
            <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:opacity-90 text-white font-bold py-4 rounded-xl text-base shadow-elegant transition-all" id="ie-form-submit">Check My Ireland Study Options</button>
          </form>)}
        </div></div></section>

        {/* FAQs */}
        <section id="faqs" className="py-20 bg-muted/40 border-y"><div className="container mx-auto px-4"><div className="max-w-3xl mx-auto"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked <span className="text-emerald-600">Questions</span></h2></div><Accordion type="single" collapsible className="space-y-3">{D.faqs.map((faq, i) => (<AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-6 shadow-soft data-[state=open]:shadow-elegant transition-smooth"><AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:text-emerald-600 py-5 [&[data-state=open]]:text-emerald-600">{faq.question}</AccordionTrigger><AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{faq.answer}</AccordionContent></AccordionItem>))}</Accordion></div></div></section>

        {/* Related Countries */}
        <section className="py-16 bg-background"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Other <span className="text-emerald-600">Destinations</span></h2></div><div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-5xl mx-auto">{relatedCountries.map((c) => (<Link key={c.slug} to={`/countries/${c.slug}`} className="bg-card rounded-xl border p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth group"><div className="flex items-center gap-3 mb-3"><span className="text-3xl">{c.flag}</span><div><h3 className="font-bold group-hover:text-emerald-600 transition-smooth">{c.name}</h3><p className="text-xs text-muted-foreground">{c.universities} Universities</p></div></div><div className="flex items-center justify-between text-xs text-muted-foreground"><span>{c.avgCost}</span><span className="flex items-center gap-1 text-emerald-600 font-medium">Explore <ArrowRight className="w-3 h-3" /></span></div></Link>))}</div></div></section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 text-white"><div className="container mx-auto px-4 text-center"><div className="max-w-2xl mx-auto"><span className="text-6xl mb-6 block">🇮🇪</span><h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Study in Ireland?</h2><p className="text-lg opacity-90 mb-8">Book a free consultation with our Ireland education experts.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><a href="tel:+919211818710" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-emerald-700 font-bold rounded-xl shadow-lg"><Phone className="w-5 h-5" />Call Now</a><a href="https://wa.me/919211818710" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20"><MessageCircle className="w-5 h-5" />WhatsApp Us</a></div></div></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default StudyInIrelandPage;
