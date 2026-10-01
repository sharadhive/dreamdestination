import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ArrowRight, Phone, MessageCircle, CheckCircle2, Sparkles,
  Award, Search, ShieldCheck, GraduationCap, BookOpen, Briefcase, Cpu,
  Microscope, FileText, CalendarClock, PenLine, Users, AlertCircle, Wallet,
  Globe2, Trophy, HeartHandshake,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import RelatedLinks from "@/components/RelatedLinks";
import { SITE, CONTACT } from "@/config/site";

import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";
/* ═══════════════════════════════════════════════════════════
   SEO — primary keyword: scholarship assistance for study abroad
   ═══════════════════════════════════════════════════════════ */
const SEO = {
  title: "Scholarship Assistance for Study Abroad",
  description:
    "Find study abroad scholarships for Indian students with profile-based guidance on eligibility, applications, documents, essays and funding options.",
  canonicalUrl: "/scholarship-assistance",
  keywords: [
    "scholarship assistance for study abroad", "study abroad scholarships",
    "scholarships for Indian students", "scholarship assistance",
    "overseas education scholarships", "international student scholarships",
    "scholarships to study abroad", "fully funded scholarships abroad",
    "scholarships for Indian students abroad", "study abroad scholarship consultant",
    "scholarship guidance for Indian students", "education funding for study abroad",
    "how to get a scholarship to study abroad", "merit based scholarship abroad",
    "need based scholarship for international students", "MBA scholarship abroad",
  ],
};

const PHONE = CONTACT.phone;
const WHATSAPP = CONTACT.whatsapp;

/* ─── Criteria scholarships judge on ─── */
const CRITERIA = [
  "Academic performance", "Course or field of study", "Country", "University",
  "Nationality", "Leadership", "Extracurricular achievements", "Research background",
  "Work experience", "Financial circumstances", "Application deadlines",
];

/* ─── What the service covers ─── */
const SERVICE_COVERS = [
  "Understand what scholarships exist", "Find awards matching your profile",
  "Verify eligibility before applying", "Understand what each award actually pays",
  "Gather the required documents", "Build a stronger application",
  "Prepare essays and personal statements", "Review your SOP and supporting documents",
  "Track deadlines", "Submit through the correct official channel",
];

/* ─── Scholarship types ─── */
interface Kind { icon: typeof Award; title: string; desc: string; items: string[]; note?: string }

const KINDS: Kind[] = [
  {
    icon: Trophy, title: "Merit-Based Scholarships",
    desc: "Awarded on demonstrated achievement rather than financial need.",
    items: ["Academic performance", "Standardised test results", "Leadership", "Achievements", "Extracurricular activity", "Research output", "Work experience"],
    note: "A strong academic record helps, but each award weighs these differently.",
  },
  {
    icon: HeartHandshake, title: "Need-Based Scholarships",
    desc: "Consider financial circumstances alongside academic or other criteria.",
    items: ["Proof of family income", "Tax documents", "Employment certificates", "Bank statements", "Financial affidavits"],
    note: "Documentation requirements vary widely by awarding institution.",
  },
  {
    icon: GraduationCap, title: "University Scholarships",
    desc: "Many universities set aside funding specifically for international students.",
    items: ["Awards granted on admission", "Merit grants", "Excellence awards", "Tuition fee reductions", "General international student awards", "Department or faculty-specific awards"],
  },
  {
    icon: Globe2, title: "Government Scholarships",
    desc: "Government-funded awards for students from other countries.",
    items: ["Tuition fees", "Living expenses", "Travel costs", "Health insurance", "Research expenses"],
    note: "Eligibility and coverage differ substantially between programmes.",
  },
];

/* ─── Study level guidance ─── */
const LEVELS = [
  { icon: GraduationCap, title: "Bachelor's", points: ["Class 10 and 12 performance", "Entrance exam requirements", "Extracurricular achievements", "Leadership", "Sports", "University-specific criteria"] },
  { icon: BookOpen, title: "Master's", points: ["Bachelor's academic standing", "Relevant coursework", "Work experience", "Professional achievements", "Research experience", "Career goals"] },
  { icon: Briefcase, title: "MBA", points: ["Academic record", "Professional background", "Leadership", "Career progression", "GMAT/GRE where required", "Career objectives"] },
  { icon: Microscope, title: "PhD & Research", points: ["Research grants", "University-funded scholarships", "Doctoral fellowships", "Research assistantships", "Faculty-sponsored funding"] },
];

/* ─── Subject areas ─── */
const SUBJECTS = [
  { area: "STEM", items: ["Computer Science", "Data Science", "Artificial Intelligence", "Engineering", "Biotechnology", "Mathematics"] },
  { area: "Business", items: ["Finance", "Economics", "Management", "International Business", "Marketing"] },
  { area: "Other Fields", items: ["Healthcare", "Environmental Studies", "Social Sciences", "Design", "Hospitality", "Research"] },
];

/* ─── Funding coverage ─── */
const COVERAGE = [
  { title: "Fully Funded", desc: "May cover several cost areas at once — tuition, living expenses, travel, insurance and other specified costs. Usually highly competitive." },
  { title: "Partially Funded", desc: "Contributes towards tuition, accommodation, food or other specific costs. Far more common than full funding." },
  { title: "Tuition Reduction", desc: "Reduces your tuition by a fixed amount or percentage. What remains still has to be funded." },
  { title: "Living Allowance", desc: "Supports accommodation, food, transport or a monthly stipend. Amount and duration vary by programme." },
];

/* ─── 10-step process ─── */
const PROCESS = [
  { num: "01", title: "Profile Assessment", desc: "Review your academic and professional background." },
  { num: "02", title: "Scholarship Research", desc: "Identify opportunities that plausibly fit." },
  { num: "03", title: "Eligibility Check", desc: "Verify requirements as the provider states them." },
  { num: "04", title: "Shortlisting", desc: "Prioritise by fit and deadline, not by headline amount." },
  { num: "05", title: "Document Preparation", desc: "Organise what each award requires." },
  { num: "06", title: "Application Strategy", desc: "Read the selection criteria and answer them directly." },
  { num: "07", title: "Essay Preparation", desc: "Write a clear, honest statement tailored to the award." },
  { num: "08", title: "Application Review", desc: "Check for completeness, coherence and relevance." },
  { num: "09", title: "Submission", desc: "Apply through the official channel only." },
  { num: "10", title: "Deadline Tracking", desc: "Monitor dates, correspondence and outcomes." },
];

/* ─── Essay themes ─── */
const ESSAY_THEMES = [
  "Why you deserve the scholarship", "Academic achievements", "Professional ambitions",
  "Leadership", "Community service", "Financial circumstances",
  "Motivation for your chosen course", "How the award advances your goals", "Future plans",
];

/* ─── Documents ─── */
const DOC_GROUPS = [
  { title: "Academic", items: ["Class 10 certificate", "Class 12 certificate", "Bachelor's degree", "Academic transcripts", "Other academic certificates"] },
  { title: "Application", items: ["Passport", "CV / résumé", "Statement of Purpose", "Scholarship essay", "Personal statement", "Letters of recommendation"] },
  { title: "Supporting", items: ["Employment letters", "Published research", "Portfolio, where relevant", "Achievement certificates", "Evidence of leadership or community service"] },
  { title: "Financial", items: ["Income statements", "Tax returns", "Bank statements", "Income affidavits"] },
];

/* ─── Mistakes ─── */
const MISTAKES = [
  { t: "Not checking eligibility first", d: "Most scholarships set specific criteria. Applying without meeting them wastes the effort entirely." },
  { t: "Chasing only the largest amounts", d: "Bigger awards are more competitive and often carry more conditions." },
  { t: "Missing deadlines", d: "Scholarship deadlines frequently close before university application deadlines." },
  { t: "Using one generic essay everywhere", d: "Your answer should address that award's stated selection criteria." },
  { t: "Overlooking university scholarships", d: "Students focus on government and external awards and miss the funding their own university offers." },
  { t: "Applying to too few", d: "Apply to every award you genuinely qualify for, within the rules each one sets." },
  { t: "Assuming every scholarship is fully funded", d: "Most are partial. Check exactly what is covered before you plan around it." },
  { t: "Waiting until you've accepted an offer", d: "Some awards require applications before or alongside your university application." },
];

/* ─── Student profiles ─── */
const PROFILES = [
  { icon: Trophy, title: "High Academic Achievers", desc: "Merit and excellence awards, government scholarships and university merit funding are usually the strongest routes." },
  { icon: Briefcase, title: "Working Professionals", desc: "Awards weighing career impact, leadership and professional achievement — including MBA-specific scholarships." },
  { icon: Microscope, title: "Research Scholars", desc: "Research grants, doctoral fellowships and assistantships, which often combine tuition with a research allowance." },
  { icon: Wallet, title: "Students Needing Financial Support", desc: "Need-based awards and partial university funding, usually alongside an education loan to close the gap." },
  { icon: Users, title: "Well-Rounded Profiles", desc: "Awards recognising sport, the arts, student leadership or volunteering alongside academics." },
];

/* ─── Destinations ─── */
const DESTINATIONS = [
  { name: "UK", to: "/study-in-uk", note: "University awards plus external and government-backed funding." },
  { name: "USA", to: "/study-in-usa", note: "University-funded awards, fellowships and private grants." },
  { name: "Canada", to: "/study-in-canada", note: "University scholarships and entrance award packages." },
  { name: "Australia", to: "/study-in-australia", note: "University award packages and national scholarship schemes." },
  { name: "New Zealand", to: "/study-in-new-zealand", note: "University and government-backed awards." },
  { name: "Germany", to: "/study-in-germany", note: "Programme-specific university awards and external scholarships." },
  { name: "France", to: "/study-in-france", note: "Government and university scholarship schemes." },
  { name: "Ireland", to: "/study-in-ireland", note: "University, government and external opportunities." },
  { name: "Netherlands", to: "/study-in-netherlands", note: "University funding and national schemes for non-EEA students." },
  { name: "Switzerland", to: "/study-in-switzerland", note: "Institution-level funding, varying by programme." },
  { name: "Singapore", to: "/study-in-singapore", note: "University and external body scholarships." },
  { name: "Malaysia", to: "/study-in-malaysia", note: "University awards and external funding." },
  { name: "Mauritius", to: "/study-in-mauritius", note: "University-led programmes and external scholarships." },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: "How can I get a scholarship to study abroad?", a: "Eligibility depends on the individual scholarship. Research university, government and external opportunities, check the criteria carefully, and submit a complete application before the deadline. Applying to awards you genuinely qualify for beats applying to many at random." },
  { q: "Can Indian students get scholarships to study abroad?", a: "Yes. Indian students can apply for scholarships wherever they meet the eligibility criteria. Opportunities are offered by universities, governments, private organisations and other institutions." },
  { q: "What are the different types of study abroad scholarships?", a: "Common categories include merit-based, need-based, destination-specific, subject-specific, university-specific and other profile-based scholarships." },
  { q: "Can I get a fully funded scholarship?", a: "Some scholarships are fully funded, but they are usually highly competitive and carry specific eligibility criteria. Many others provide only partial support." },
  { q: "Does a scholarship cover the full tuition fee?", a: "Not necessarily. Some cover full tuition, while others provide a fixed amount or a percentage reduction. Always check what a specific award actually pays before planning around it." },
  { q: "Can I apply for multiple scholarships?", a: "Generally you can explore multiple scholarships you are eligible for, but check each one's rules on simultaneous applications and on combining awards. Never assume two can be stacked." },
  { q: "Do I need a high percentage to get a scholarship?", a: "Not always. Some awards consider leadership, extracurricular achievements, financial need, research, professional experience or other criteria alongside — or instead of — academic scores." },
  { q: "Can working professionals apply for scholarships?", a: "Yes. Several scholarships and funding opportunities are open to postgraduate and professional applicants, subject to each one's criteria." },
  { q: "Can I get a scholarship for an MBA abroad?", a: "Yes, depending on the university, programme and award. MBA scholarships often weigh academic performance, professional experience, leadership and career progression." },
  { q: "Can I get a scholarship for a master's abroad?", a: "Yes. Master's students can explore university, government, merit-based and subject-specific scholarship opportunities." },
  { q: "Can I get a scholarship after receiving an offer letter?", a: "Potentially. Some scholarships require or prefer an admission offer, while others run a separate application process with their own deadline. Check the specific requirements." },
  { q: "Can a scholarship and an education loan be used together?", a: "In many cases, yes. A scholarship reduces the amount you need to fund, and an education loan can cover part of what remains — subject to the scholarship terms and the lender's policy." },
  { q: "How early should I start looking for scholarships?", a: "Start several months before your intended intake. Some scholarship deadlines fall before university application deadlines, which catches students out every year." },
  { q: "Does DreamDestination guarantee a scholarship?", a: "No. Scholarship selection is made by the university, government, organisation or provider concerned. We help you identify relevant opportunities and prepare stronger applications — nothing more, and we would not claim otherwise." },
];

const ScholarshipAssistancePage = () => {
  const [form, setForm] = useState({
    fullName: "", mobile: "", email: "", qualification: "", percentage: "",
    course: "", country: "", intake: "", workExp: "", scholarshipNeeded: "", loanNeeded: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const pageUrl = `${SITE.domain}/scholarship-assistance`;
  const inputCls = "w-full text-sm p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-colors";

  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "WebPage", name: SEO.title, description: SEO.description,
      url: pageUrl, inLanguage: "en-IN",
      isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.domain },
      keywords: SEO.keywords.join(", "),
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Scholarship Assistance", item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org", "@type": "Service",
      name: "Scholarship Assistance for Study Abroad",
      serviceType: "Scholarship search and application guidance",
      description: SEO.description,
      areaServed: { "@type": "Country", name: "India" },
      provider: { "@type": "EducationalOrganization", name: SITE.name, url: SITE.domain, telephone: PHONE },
    },
    {
      "@context": "https://schema.org", "@type": "HowTo",
      name: "How to apply for a study abroad scholarship",
      step: PROCESS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc })),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 selection:text-amber-600">
      <SEOHead title={SEO.title} description={SEO.description} canonicalUrl={SEO.canonicalUrl} keywords={SEO.keywords} jsonLd={jsonLd} />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gradient-subtle border-b pt-20">
          <div className="container mx-auto px-4 py-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">Scholarship Assistance</span>
            </nav>
          </div>
        </div>

        {/* HERO */}
        <section className="relative pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-amber-50/60 via-background to-background dark:from-amber-950/10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] max-w-full bg-amber-500/8 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="container mx-auto px-4 pt-12 md:pt-16">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /><span>Scholarships for Indian Students</span>
              </div>
              <span className="text-6xl md:text-7xl drop-shadow-lg block">🎖️</span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600">Scholarship Assistance</span> for Study Abroad
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Find scholarships matched to your profile, programme and destination — and build applications
                strong enough to win them.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button size="lg" className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-amber-600/20 text-base w-full sm:w-auto" asChild>
                  <a href="#lead-form"><span>Check My Scholarship Options</span><ArrowRight className="w-5 h-5 ml-2" /></a>
                </Button>
                <Button size="lg" variant="outline" className="border-amber-500/20 hover:bg-amber-500/5 font-semibold px-8 py-6 rounded-xl text-base w-full sm:w-auto" asChild>
                  <a href={`tel:${PHONE}`}><Phone className="w-5 h-5 mr-2 text-amber-600" /><span>Talk to an Advisor</span></a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* WHY IT MATTERS */}
        <section className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-5">Winning a Scholarship Is Not About Finding the Biggest One</h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-center text-sm">
                Scholarships set specific criteria, and they support different things — some cover tuition,
                others living costs, travel or research. Matching your profile to the right award matters far
                more than chasing the largest figure.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mb-8">
                {CRITERIA.map(c => (
                  <div key={c} className="flex items-center gap-2 p-2.5 bg-card border rounded-xl text-xs font-medium shadow-soft">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" /><span>{c}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 text-center">
                <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                  Profile matching → eligibility check → strong application → funding plan
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IT INVOLVES */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">What Scholarship Assistance Involves</h2>
              <p className="text-center text-muted-foreground mb-10 text-sm">
                The goal is not to promise you an award. It is to find the opportunities you can realistically
                win, and to make those applications as strong as they can be.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICE_COVERS.map(c => (
                  <div key={c} className="flex items-start gap-2.5 p-3 bg-muted/60 rounded-xl text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" /><span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TYPES */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12">Types of Scholarship</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {KINDS.map(k => {
                const Icon = k.icon;
                return (
                  <div key={k.title} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="font-extrabold text-base mb-2">{k.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{k.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {k.items.map(i => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-muted/60 text-[11px] font-medium">{i}</span>
                      ))}
                    </div>
                    {k.note && <p className="text-[11px] text-muted-foreground italic">{k.note}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* COVERAGE */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">Fully Funded vs Partially Funded</h2>
              <p className="text-center text-muted-foreground mb-10 text-sm">
                Check exactly what an award covers before you assume anything from the headline amount.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                {COVERAGE.map(c => (
                  <div key={c.title} className="bg-card border rounded-2xl p-5 shadow-soft">
                    <h3 className="font-extrabold text-sm mb-2 text-amber-600">{c.title}</h3>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-card border-2 border-amber-500/25 rounded-2xl p-6 shadow-soft">
                <h3 className="font-extrabold text-sm mb-4">How a scholarship changes your funding plan</h3>
                <div className="flex flex-wrap items-center gap-2.5 mb-4 text-sm">
                  <span className="px-3.5 py-2 rounded-xl bg-muted/60 font-semibold">Total cost</span>
                  <span className="text-amber-500 font-bold">−</span>
                  <span className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 font-semibold text-amber-700 dark:text-amber-400">Scholarship</span>
                  <span className="text-amber-500 font-bold">−</span>
                  <span className="px-3.5 py-2 rounded-xl bg-muted/60 font-semibold">Personal funds</span>
                  <span className="text-amber-500 font-bold">=</span>
                  <span className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 font-semibold text-emerald-700 dark:text-emerald-400">Funding gap</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  A scholarship rarely covers everything, so most students end up combining an award, family
                  funds and an education loan. Working out the gap early is what makes the rest of the plan realistic.
                </p>
                <Link to="/financial-assistance" className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:underline">
                  Plan the remaining funding <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BY STUDY LEVEL */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12">Scholarships by Study Level</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {LEVELS.map(l => {
                const Icon = l.icon;
                return (
                  <div key={l.title} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant transition-all">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="font-extrabold text-sm mb-3">{l.title}</h3>
                    <ul className="space-y-1.5">
                      {l.points.map(p => (
                        <li key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SUBJECTS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12">Subject-Specific Scholarships</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {SUBJECTS.map(s => {
                const Icon = s.area === "STEM" ? Cpu : s.area === "Business" ? Briefcase : BookOpen;
                return (
                  <div key={s.area} className="bg-card border rounded-2xl p-6 shadow-soft">
                    <div className="flex items-center gap-2.5 mb-4">
                      <Icon className="w-5 h-5 text-amber-600" />
                      <h3 className="font-extrabold text-sm">{s.area}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.items.map(i => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-muted/60 text-[11px] font-medium">{i}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12">Our 10-Step Application Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {PROCESS.map(s => (
                <div key={s.num} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-bold text-xs mb-3">{s.num}</span>
                  <h3 className="font-bold text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ESSAY + LOR */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <PenLine className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-lg font-extrabold mb-2">Scholarship Essays & Statements</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Most scholarships ask for an essay or personal statement. They vary in length and focus, but
                  they are all asking the same underlying question: why you?
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {ESSAY_THEMES.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-lg bg-muted/60 text-[11px] font-medium">{t}</span>
                  ))}
                </div>
                <p className="text-xs font-semibold text-amber-600">
                  Your story. Your achievements. Your goals. Your reason for this award.
                </p>
              </div>

              <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-lg font-extrabold mb-2">Recommendations & SOP Alignment</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Your university application and your scholarship application should tell one consistent story.
                  Selection panels notice when they don't.
                </p>
                <ul className="space-y-2">
                  {["Choosing the right recommender", "Academic versus professional referees", "Which achievements they should cover", "Consistency of career goals across documents", "Consistency of course choice and reasoning", "How each award wants it submitted"].map(i => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />{i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DOCUMENTS */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">Scholarship Document Checklist</h2>
            <p className="text-center text-muted-foreground mb-12 text-sm max-w-2xl mx-auto">
              Exact requirements depend on the awarding body — these cover most applications.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {DOC_GROUPS.map(g => (
                <div key={g.title} className="bg-card border rounded-2xl p-5 shadow-soft">
                  <h3 className="font-extrabold text-sm mb-3">{g.title}</h3>
                  <ul className="space-y-2">
                    {g.items.map(i => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />{i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEADLINES */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-card border-2 border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-soft">
              <div className="flex items-start gap-3 mb-3">
                <CalendarClock className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <h2 className="text-xl font-extrabold">The Deadline Trap</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Scholarship deadlines often fall <strong>before</strong> university application deadlines. Every
                year students secure a university place and then discover the funding they were counting on
                closed weeks earlier.
              </p>
              <p className="text-sm font-semibold text-amber-600">
                Start scholarship planning before you finish your university applications, not after.
              </p>
            </div>
          </div>
        </section>

        {/* MISTAKES */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12">Eight Mistakes to Avoid</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {MISTAKES.map((m, i) => (
                <div key={m.t} className="bg-card border rounded-2xl p-5 shadow-soft flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{m.t}</h3>
                    <p className="text-xs text-muted-foreground">{m.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROFILES */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12">Which Scholarships Suit Your Profile?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {PROFILES.map(p => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="font-extrabold text-sm mb-2">{p.title}</h3>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DESTINATIONS */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">Scholarships by Destination</h2>
            <p className="text-center text-muted-foreground mb-12 text-sm max-w-2xl mx-auto">
              Availability, value and eligibility all depend on the application cycle, the institution and your
              own profile — always confirm against the provider's current terms.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {DESTINATIONS.map(d => (
                <Link key={d.to} to={d.to} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant hover:border-amber-500/40 transition-all group">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-extrabold text-sm group-hover:text-amber-600 transition-colors">{d.name}</h3>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-amber-600 transition-all" />
                  </div>
                  <p className="text-xs text-muted-foreground">{d.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TRANSPARENCY */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-card border rounded-2xl p-6 md:p-8 shadow-soft">
              <div className="flex items-start gap-3 mb-3">
                <ShieldCheck className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <h2 className="text-xl font-extrabold">What We Will and Won't Promise</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                We do not promise you a scholarship, and you should be cautious of anyone who does. Selection
                is made entirely by the university, government or organisation funding the award.
              </p>
              <p className="text-sm text-muted-foreground">
                What we do is find the opportunities where your profile genuinely fits the criteria, make sure
                you meet the requirements before you spend time applying, and help you put together an
                application that represents you properly.
              </p>
            </div>
          </div>
        </section>

        {/* LEAD FORM */}
        <section id="lead-form" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-card border-2 border-amber-500/30 rounded-3xl p-6 md:p-10 shadow-elegant">
              <div className="text-center mb-8 space-y-2">
                <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">Free Assessment</span>
                <h2 className="text-2xl md:text-3xl font-extrabold">
                  Find Scholarships for <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-emerald-600">Your Profile</span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  Tell us about your background and we will identify awards you may genuinely qualify for.
                </p>
              </div>
              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Request Received</h3>
                  <p className="text-sm text-muted-foreground">Thank you, {form.fullName || "Student"}. An advisor will be in touch within 24 hours.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="px-6 py-2.5 rounded-xl border border-emerald-500/20 text-emerald-600 font-semibold hover:bg-emerald-500/10 transition-colors text-xs">Submit Another</button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); sendLeadToWhatsApp("Scholarship Assistance", form); setSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="sc-name">Full Name *</label><input id="sc-name" required value={form.fullName} onChange={set("fullName")} className={inputCls} placeholder="Your name" /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="sc-mobile">Mobile *</label><input id="sc-mobile" type="tel" required value={form.mobile} onChange={set("mobile")} className={inputCls} placeholder="+91 98765 43210" /></div>
                  </div>
                  <div><label className="text-xs font-semibold block mb-1" htmlFor="sc-email">Email *</label><input id="sc-email" type="email" required value={form.email} onChange={set("email")} className={inputCls} placeholder="email@example.com" /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="sc-qual">Highest Qualification</label><select id="sc-qual" value={form.qualification} onChange={set("qualification")} className={inputCls}><option value="">Select</option><option>Class 12</option><option>Bachelor's</option><option>Master's</option><option>Working Professional</option></select></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="sc-pct">Percentage / CGPA</label><input id="sc-pct" value={form.percentage} onChange={set("percentage")} className={inputCls} placeholder="e.g. 82% or 8.6 CGPA" /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="sc-course">Interested Course</label><input id="sc-course" value={form.course} onChange={set("course")} className={inputCls} placeholder="e.g. MSc Data Science" /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="sc-country">Preferred Country</label><select id="sc-country" value={form.country} onChange={set("country")} className={inputCls}><option value="">Select</option>{DESTINATIONS.map(d => <option key={d.name}>{d.name}</option>)}<option>Not sure</option></select></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="sc-intake">Preferred Intake</label><select id="sc-intake" value={form.intake} onChange={set("intake")} className={inputCls}><option value="">Select</option><option>Jan 2027</option><option>Sep 2027</option><option>Jan 2028</option><option>Not sure</option></select></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="sc-exp">Work Experience</label><select id="sc-exp" value={form.workExp} onChange={set("workExp")} className={inputCls}><option value="">Select</option><option>None</option><option>Less than 1 year</option><option>1-3 years</option><option>3-5 years</option><option>5+ years</option></select></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="sc-need">Scholarship Required?</label><select id="sc-need" value={form.scholarshipNeeded} onChange={set("scholarshipNeeded")} className={inputCls}><option value="">Select</option><option>Yes</option><option>No</option><option>Not sure</option></select></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="sc-loan">Education Loan Required?</label><select id="sc-loan" value={form.loanNeeded} onChange={set("loanNeeded")} className={inputCls}><option value="">Select</option><option>Yes</option><option>No</option><option>Not sure</option></select></div>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:opacity-90 text-white font-bold py-4 rounded-xl text-base shadow-elegant transition-all">
                    Get My Scholarship Assessment
                  </button>
                  <p className="text-[11px] text-center text-muted-foreground">
                    We use your details only to contact you about scholarship options.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12">
                Frequently Asked <span className="text-amber-600">Questions</span>
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-6 shadow-soft data-[state=open]:shadow-elegant transition-smooth">
                    <AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:text-amber-600 py-5 [&[data-state=open]]:text-amber-600">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <RelatedLinks currentPath="/scholarship-assistance" accent="text-amber-600" />

        {/* FINAL CTA */}
        <section className="py-16 bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't Leave Funding on the Table</h2>
              <p className="text-lg opacity-90 mb-8">Get a free assessment of the scholarships your profile qualifies for.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-amber-700 font-bold rounded-xl shadow-lg transition-all"><Phone className="w-5 h-5" />Call Now</a>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-smooth"><MessageCircle className="w-5 h-5" />WhatsApp Us</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ScholarshipAssistancePage;
