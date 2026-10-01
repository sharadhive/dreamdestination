import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ArrowRight, Phone, MessageCircle, CheckCircle2, Sparkles,
  GraduationCap, Briefcase, Target, BookOpen, Globe, DollarSign,
  Award, FileText, FileCheck2, CalendarClock, Users,
  Compass, ShieldCheck, Layers, Wallet
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedLinks from "@/components/RelatedLinks";
import SEOHead from "@/components/SEOHead";

import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";
/* ═══════════════════════════════════════════════════════════
   SEO FOUNDATION
   Primary keyword: study abroad admission consultant
   ═══════════════════════════════════════════════════════════ */
const SEO = {
  title: "Study Abroad Admission Consultant for Indian Students",
  description:
    "Study abroad admission guidance for Indian students — university shortlisting, eligibility checks, SOP and LOR support, application submission, tracking and offer comparison.",
  canonicalUrl: "/admission-guidance",
  keywords: [
    "study abroad admission consultant",
    "study abroad admission guidance",
    "overseas education admission consultant",
    "study abroad application assistance",
    "foreign university admission consultant",
    "university application assistance",
    "study abroad counselling",
    "overseas admission consultant",
    "study abroad consultant for Indian students",
    "university application support",
    "admission consultant for abroad studies",
    "how to apply to foreign universities from India",
    "how to get admission abroad after 12th",
    "how to apply for Master's abroad",
    "how to choose a university abroad",
    "what documents are required to study abroad",
  ],
};

const PHONE = "+919211818710";
const WHATSAPP = "https://wa.me/919211818710";

/* ─── Profile-fit factors ─── */
const FIT_FACTORS = [
  "Academic record", "Career goals", "Subject preferences", "Study budget",
  "English proficiency", "Work experience", "Preferred countries", "Intended intake",
  "Long-term career plans",
];

/* ─── Core process steps ─── */
interface Tier { name: string; desc: string; color: "amber" | "emerald" | "blue" }
interface ProcessStep {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  tiers?: Tier[];
  note?: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    title: "Profile Assessment",
    subtitle: "Understand your academic and career strengths",
    description:
      "We look past your marksheet to understand you as a candidate. Counselling begins with a full review of your profile.",
    items: [
      "Course, subject and percentage/CGPA", "Academic backlogs", "Work experience (if any)",
      "English proficiency", "Career and job goals", "Preferred study destinations",
      "Course and specialisation preferences", "Intended intake", "Approximate study budget",
    ],
    note: "From these, we identify which academic pathways are realistic for you and where your candidature can be strengthened.",
  },
  {
    num: "02",
    title: "Course Selection",
    subtitle: "Let your career goal drive the programme, not the other way round",
    description:
      "Choosing between Data Science, Computer Science, Business Analytics, Mechanical Engineering, an MBA or Finance depends on how each programme maps to your goals.",
    items: [
      "Curriculum and learning framework", "Available specialisations", "Entry criteria",
      "Relevance to your career objective", "Duration and teaching mode", "Tuition cost",
      "Study location", "Internship opportunities", "Career progression after the course",
    ],
  },
  {
    num: "03",
    title: "Country Selection",
    subtitle: "Find a destination that suits your profile",
    description:
      "No single country suits every student. We compare destinations against your profile, budget and post-study plans.",
    items: [
      "Total cost of education", "University admission requirements", "Post-study work options",
      "Career and industry relevance", "Current student visa rules", "Language and lifestyle fit",
    ],
  },
  {
    num: "04",
    title: "University Shortlisting",
    subtitle: "Build a balanced list, not a random one",
    description:
      "Applying everywhere rarely helps. We build a shortlist in three tiers so your applications work together rather than compete.",
    tiers: [
      { name: "Ambitious", color: "amber", desc: "Competitive institutions where admission is a stretch on your current profile." },
      { name: "Target", color: "emerald", desc: "Universities whose published criteria closely match your scores and experience." },
      { name: "Alternative", color: "blue", desc: "Solid additional options that keep academic and financial routes open." },
    ],
    items: [
      "Course content", "Entry score requirements", "Tuition within your budget", "Study location",
      "Scholarship availability", "Career outcomes", "Internship options", "Application deadlines",
    ],
  },
  {
    num: "05",
    title: "Eligibility & Entry Requirements",
    subtitle: "Know your prerequisites before you apply",
    description:
      "Every course and university sets its own requirements. We verify yours against each shortlisted programme.",
    items: [
      "Academic qualifications", "Course prerequisites", "Minimum scores or grade points",
      "Required language tests and target scores", "Entrance tests such as GRE or GMAT",
      "Minimum work experience", "Internship and work certificates", "Professional certifications",
    ],
    note: "Entry requirements can change each year and can differ between departments within the same university — always confirm against the university's own website.",
  },
  {
    num: "06",
    title: "Application Strategy",
    subtitle: "Decide where, when and what to submit",
    description:
      "A strong application is a considered presentation of your whole academic journey. We plan for quality across a focused set of applications rather than volume.",
    items: [
      "Where to apply", "When to apply", "What each university needs",
      "How to present your profile", "Deadline mapping", "Per-university document checklist",
    ],
  },
  {
    num: "07",
    title: "Document Preparation & Review",
    subtitle: "Organise your application materials properly",
    description:
      "We review your documents the way an admissions officer would — checking completeness, consistency and accuracy.",
    items: [
      "Class 10 and 12 marksheets and certificates", "Degree certificate and transcripts",
      "Offer or appointment letters", "Experience letters and payslips", "Internship certificates",
      "English proficiency scorecards", "Passport", "Portfolio, where relevant",
    ],
  },
  {
    num: "08",
    title: "Statement of Purpose (SOP) Guidance",
    subtitle: "Connect your past, present and future in one narrative",
    description:
      "A strong SOP links what you have done, why you are choosing this course and university, and where you intend to go next.",
    items: [
      "Past: academic record and relevant experience",
      "Present: why this course and this university",
      "Future: your defined career direction",
    ],
    note: "We guide structure, relevance and tone. The content must be your own — universities check for plagiarism, and copied material can cost you the admission.",
  },
  {
    num: "09",
    title: "Letter of Recommendation (LOR) Guidance",
    subtitle: "Choose your recommenders carefully",
    description:
      "We help you identify who is best placed to speak for you and what a strong recommendation should cover.",
    items: [
      "Academic performance", "Research ability", "Practical and technical aptitude",
      "Work ethic and reliability", "Leadership and initiative", "Notable achievements",
    ],
    note: "Everything in a recommendation must be something the recommender can genuinely verify.",
  },
  {
    num: "10",
    title: "Test Planning: IELTS, TOEFL, PTE, GRE & More",
    subtitle: "Know which test you need and what score to aim for",
    description:
      "Requirements differ by country, university and programme. We tell you which tests your shortlist accepts and the scores you should target.",
    items: ["IELTS", "TOEFL", "PTE", "Duolingo English Test", "GRE", "GMAT", "SAT", "ACT"],
  },
  {
    num: "11",
    title: "Application Submission",
    subtitle: "Apply with everything in place",
    description:
      "Once your shortlist and documents are final, we take you through each submission step.",
    items: [
      "Application form guidance", "Document checklist and confirmation", "Full review before submission",
      "Final SOP and LOR feedback", "Score report uploads", "Application fee guidance",
      "Deadline follow-up", "Coordinated multi-university submission",
    ],
    note: "Where an application is submitted directly on a university's official portal, you keep control of your own credentials and the final submission.",
  },
  {
    num: "12",
    title: "Application Tracking",
    subtitle: "The work doesn't stop at submit",
    description:
      "We monitor each application and keep you informed at every stage.",
    items: [
      "Application status updates", "Additional document requests", "University correspondence",
      "Interview scheduling", "Conditional offer letters", "Unconditional offer letters",
      "Deposit deadlines", "Next steps and milestones",
    ],
  },
  {
    num: "13",
    title: "University Interview Preparation",
    subtitle: "Prepare properly where an interview is required",
    description:
      "Some universities interview applicants. We prepare you with structured practice rather than scripted answers.",
    items: [
      "Your academic background", "Why this course and university", "Why this country",
      "Career goals and how the course supports them", "Work and project experience",
      "How you will fund your studies", "Clarifications on your profile",
    ],
    note: "The aim is that you answer naturally and consistently — not that you memorise responses.",
  },
  {
    num: "14",
    title: "Offer Letter Evaluation",
    subtitle: "Getting an offer is a milestone; choosing the right one is the decision",
    description:
      "When several offers arrive, we help you compare them properly instead of defaulting to the best-known name.",
    items: [
      "University and course details", "Total tuition payable", "Scholarships, grants and bursaries",
      "Study location", "Programme duration and structure", "Relevance to your career goal",
      "Internship opportunities", "Financial requirements", "Visa implications for that destination",
    ],
  },
];

/* ─── Financial planning blocks ─── */
const FINANCE_BLOCKS = [
  {
    icon: Award,
    title: "Scholarship Guidance",
    description: "We help you find awards that reduce your tuition and understand what each one requires.",
    items: ["University scholarships", "Merit-based awards", "Need-based awards", "Government scholarships", "Regional scholarships", "Programme-specific awards"],
    check: ["Eligibility", "Deadlines", "Required documents", "Application process", "Conditions attached"],
    note: "Scholarship availability depends on the institution and destination.",
    link: { to: "/scholarship-assistance", label: "Scholarship Assistance" },
  },
  {
    icon: Wallet,
    title: "Education Loan Guidance",
    description: "Admission and funding should be planned together, not one after the other.",
    items: ["Bank and NBFC options", "Secured and unsecured loans", "Co-applicant requirements", "Documents needed", "Approximate funding available", "Financial plan for the visa stage"],
    check: ["Tuition fees", "Accommodation and travel", "Living expenses and insurance", "Other study-related costs"],
    note: "Loan eligibility, amount and terms are decided by the lender.",
    link: { to: "/financial-assistance", label: "Financial Assistance" },
  },
];

/* ─── Deadlines ─── */
const DEADLINES = [
  "Application deadline", "Scholarship deadline", "Test date", "Document submission date",
  "Offer acceptance date", "Tuition deposit date", "Visa timelines",
];

/* ─── The 12-step study abroad journey ─── */
const JOURNEY = [
  { step: "01", label: "Free profile assessment", to: "" },
  { step: "02", label: "Course & career guidance", to: "/career-counselling" },
  { step: "03", label: "Country selection", to: "/countries" },
  { step: "04", label: "University shortlisting", to: "" },
  { step: "05", label: "Eligibility check", to: "" },
  { step: "06", label: "Document preparation", to: "" },
  { step: "07", label: "SOP & LOR guidance", to: "" },
  { step: "08", label: "Application submission", to: "" },
  { step: "09", label: "Offer evaluation", to: "" },
  { step: "10", label: "Scholarship & loan guidance", to: "/financial-assistance" },
  { step: "11", label: "Student visa assistance", to: "/visa-assistance" },
  { step: "12", label: "Pre-departure guidance", to: "/student-accommodation" },
];

/* ─── Document checklist ─── */
const DOC_CHECKLIST = [
  { icon: GraduationCap, group: "Academic Documents", items: ["Class 10 marksheet & certificate", "Class 12 marksheet & certificate", "Bachelor's degree certificate", "Academic transcripts", "Diploma certificates, if any"] },
  { icon: Globe, group: "English Proficiency", items: ["IELTS", "TOEFL", "PTE", "Duolingo English Test"] },
  { icon: Briefcase, group: "Profile Documents", items: ["Updated CV / resume", "Internship certificates", "Work experience letters", "Professional certificates", "Achievement certificates"] },
  { icon: FileText, group: "Application Documents", items: ["Statement of Purpose", "Letters of Recommendation", "Portfolio (if applicable)", "Passport", "Entrance exam scores (if applicable)"] },
];

/* ─── Who it's for ─── */
const WHO_FOR = [
  { icon: GraduationCap, title: "Class 12 Students", desc: "Planning a bachelor's degree abroad." },
  { icon: BookOpen, title: "Bachelor's Graduates", desc: "Applying for a master's or postgraduate programme." },
  { icon: Briefcase, title: "Working Professionals", desc: "Considering a master's, MBA or career-linked programme." },
  { icon: Compass, title: "Career Switchers", desc: "Exploring a new field through overseas study." },
  { icon: Target, title: "Undecided Students", desc: "Unsure which course or country fits best." },
  { icon: Users, title: "Parents & Sponsors", desc: "Wanting a clear picture of cost, timeline and outcomes." },
];

/* ─── Countries ─── */
const COUNTRY_LINKS = [
  { name: "UK", to: "/study-in-uk" }, { name: "USA", to: "/study-in-usa" },
  { name: "Canada", to: "/study-in-canada" }, { name: "Australia", to: "/study-in-australia" },
  { name: "New Zealand", to: "/study-in-new-zealand" }, { name: "Germany", to: "/study-in-germany" },
  { name: "Ireland", to: "/study-in-ireland" }, { name: "France", to: "/study-in-france" },
  { name: "Italy", to: "/study-in-italy" }, { name: "Netherlands", to: "/study-in-netherlands" },
  { name: "Switzerland", to: "/study-in-switzerland" }, { name: "Singapore", to: "/study-in-singapore" },
  { name: "Malaysia", to: "/study-in-malaysia" }, { name: "Dubai / UAE", to: "/study-in-dubai" },
  { name: "Mauritius", to: "/study-in-mauritius" },
];

/* ─── Why DreamDestination ─── */
const WHY_DD = [
  { icon: Users, title: "Personalised Counselling", desc: "Recommendations built on your strengths and goals, not a generic programme list." },
  { icon: Layers, title: "Course–Country–University Matching", desc: "We check how your profile maps to programme requirements and destination options." },
  { icon: FileCheck2, title: "Application-Focused Support", desc: "Detailed help from document collection through to final essays." },
  { icon: ShieldCheck, title: "Transparent Guidance", desc: "Clear about requirements, costs and timelines. No guarantees we cannot honour." },
  { icon: DollarSign, title: "Integrated Financial Planning", desc: "Admission decisions made alongside tuition, living costs and funding options." },
  { icon: Globe, title: "Pan-India Online Support", desc: "Full guidance from anywhere in India — no office visit required." },
];

/* ─── FAQs (AEO) ─── */
const FAQS = [
  { q: "What does a study abroad admission consultant do?", a: "A study abroad admission consultant helps students with course selection, university shortlisting, eligibility assessment, application documents, university applications, offer evaluation, scholarships and related admission guidance." },
  { q: "How does the study abroad admission process work?", a: "The process generally involves choosing a course and destination, checking eligibility, shortlisting universities, preparing documents, submitting applications, receiving offers, arranging finances and completing the applicable visa process." },
  { q: "How to apply to foreign universities from India?", a: "Shortlist universities whose published requirements you meet, prepare your academic documents, SOP and LORs, take any required English or entrance tests, and submit each application through the university's official portal before its deadline." },
  { q: "How to get admission abroad after 12th?", a: "Choose a destination and bachelor's programme, meet the English-language and academic requirements, prepare your Class 10 and 12 documents along with your SOP, and apply within the intake deadline. Planning from Class 12 gives you the widest choice." },
  { q: "How to apply for a Master's abroad?", a: "Most master's applications need your bachelor's transcripts and degree, an English test score, an SOP, LORs and a CV. Some programmes also require GRE or GMAT scores or relevant work experience." },
  { q: "Can you help me choose the right university?", a: "Yes. University selection can be based on your academic profile, course preference, budget, career goals, eligibility and preferred destination." },
  { q: "How to choose a university abroad?", a: "Look beyond rankings at course content, entry requirements, tuition and living costs, location, scholarship availability, internship options and career outcomes for that programme." },
  { q: "Can I apply to multiple universities?", a: "Yes. Students can apply to multiple universities where their profile meets the relevant requirements and application timelines. A balanced shortlist across ambitious, target and alternative options is usually more effective than many similar applications." },
  { q: "What documents are required to study abroad?", a: "Typically Class 10 and 12 certificates, degree certificate and transcripts, English proficiency scores, a Statement of Purpose, Letters of Recommendation, a CV, your passport, and any programme-specific requirements." },
  { q: "Do you help with SOP writing?", a: "We provide SOP guidance, including structure, relevance and university-specific considerations. The final content should accurately represent your genuine experiences and goals." },
  { q: "Do you help with LORs?", a: "Yes. We guide students on selecting appropriate recommenders and understanding what a relevant, authentic LOR should cover." },
  { q: "Can you help if I don't have IELTS yet?", a: "Yes. We can help you understand which English-language test may be required for your shortlisted programmes and plan your application timeline accordingly." },
  { q: "Can I study abroad with a low percentage?", a: "Possibly. Eligibility depends on the destination, university, course and your overall academic profile. We can help identify programmes whose published requirements you may meet." },
  { q: "Can working professionals apply for study abroad programmes?", a: "Yes. Many universities offer postgraduate programmes suitable for applicants with professional experience, although requirements vary by programme." },
  { q: "How early should I start my application?", a: "Ideally, start researching destinations and universities at least a year before your target intake so you have time for tests, documents, scholarships and the visa process." },
  { q: "Do you provide education loan assistance?", a: "Yes. We provide guidance on education-loan planning, documentation and potentially suitable lender options, subject to lender criteria." },
  { q: "What happens if my university application is rejected?", a: "A rejection from one university does not mean all applications will be unsuccessful. We can review the available feedback and help you evaluate other suitable options." },
  { q: "Can a consultant help with university applications?", a: "Yes. A consultant can help with shortlisting, eligibility checks, document preparation, SOP and LOR guidance, submission and tracking. The admission decision always rests with the university." },
  { q: "Do you guarantee admission?", a: "No. Admission decisions are made by universities based on their own eligibility and selection criteria. We provide guidance and application support but cannot guarantee admission." },
];

const COUNTRIES = COUNTRY_LINKS.map(c => c.name);

const AdmissionGuidancePage = () => {
  const [form, setForm] = useState({
    fullName: "", mobile: "", email: "", city: "", qualification: "", percentage: "",
    gradYear: "", workExp: "", course: "", country: "", intake: "", budget: "", testStatus: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hands the enquiry to WhatsApp. Before this line the form collected every
    // field, showed a confirmation, and threw the enquiry away.
    sendLeadToWhatsApp("Admission Guidance", form);
    setFormSubmitted(true);
  };
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const pageUrl = "https://www.dreamdestinationstudyabroad.com/admission-guidance";

  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "WebPage", name: SEO.title, description: SEO.description,
      url: pageUrl, inLanguage: "en-IN",
      isPartOf: { "@type": "WebSite", name: "DreamDestination", url: "https://www.dreamdestinationstudyabroad.com" },
      keywords: SEO.keywords.join(", "),
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.dreamdestinationstudyabroad.com/" },
        { "@type": "ListItem", position: 2, name: "Admission Guidance", item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org", "@type": "Service",
      name: "Study Abroad Admission Guidance", serviceType: "University admission consulting",
      description: SEO.description, areaServed: { "@type": "Country", name: "India" },
      provider: { "@type": "EducationalOrganization", name: "DreamDestination", url: "https://www.dreamdestinationstudyabroad.com", telephone: PHONE },
    },
    {
      "@context": "https://schema.org", "@type": "HowTo",
      name: "How to apply to foreign universities from India",
      description: "The end-to-end process Indian students follow to secure admission to a university abroad.",
      step: PROCESS_STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.description })),
    },
  ];

  const inputCls = "w-full text-sm p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors";
  const selectCls = inputCls;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-blue-500/20 selection:text-blue-600">
      <SEOHead title={SEO.title} description={SEO.description} canonicalUrl={SEO.canonicalUrl} keywords={SEO.keywords} jsonLd={jsonLd} />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gradient-subtle border-b pt-20">
          <div className="container mx-auto px-4 py-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">Admission Guidance</span>
            </nav>
          </div>
        </div>

        {/* ═══ 1. HERO ═══ */}
        <section className="relative pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/60 via-background to-background dark:from-blue-950/10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] max-w-full bg-blue-500/8 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="container mx-auto px-4 pt-12 md:pt-16">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /><span>Admission Guidance for Indian Students</span>
              </div>
              <span className="text-6xl md:text-7xl drop-shadow-lg block">🎓</span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-amber-600">Study Abroad Admission</span> Guidance
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Turn your study abroad plan into a well-built university application — from profile assessment and shortlisting to your offer letter.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-blue-600/20 text-base w-full sm:w-auto" asChild>
                  <a href="#lead-form"><span>Get Free Admission Guidance</span><ArrowRight className="w-5 h-5 ml-2" /></a>
                </Button>
                <Button size="lg" variant="outline" className="border-blue-500/20 hover:bg-blue-500/5 font-semibold px-8 py-6 rounded-xl text-base w-full sm:w-auto" asChild>
                  <a href={`tel:${PHONE}`}><Phone className="w-5 h-5 mr-2 text-blue-600" /><span>Talk to an Admission Expert</span></a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 2. INTRODUCTION ═══ */}
        <section className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-5">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">More Than Filling in Application Forms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Applying to study abroad means finding the right course, shortlisting universities that genuinely fit your profile,
                understanding eligibility and entry requirements, gathering the right documents, and submitting an application that
                presents your academic and professional strengths clearly — on time.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                DreamDestination offers admission counselling built specifically for Indian students. From your first profile
                evaluation through to comparing offer letters, we cover each step so you can make informed decisions at every stage.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Not sure which course or country suits you yet? Start with our{" "}
                <Link to="/career-counselling" className="text-blue-600 font-semibold hover:underline">career counselling</Link>{" "}
                — admission guidance works best once your direction is clear.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 3. WHY IT MATTERS ═══ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Why Admission Guidance Matters</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Choosing a university is not the same as choosing the highest-ranked university. The right one is the one that fits your profile.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {FIT_FACTORS.map(f => (
                  <div key={f} className="flex items-center gap-2 p-3 bg-muted/60 rounded-xl text-xs md:text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /><span>{f}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-8">
                Our approach balances three things at once: <strong>profile fit</strong>, <strong>academic eligibility</strong> and <strong>study cost</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 4. PROCESS STEPS ═══ */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Our Step-by-Step Admission Process</h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">
              Fourteen structured stages, from understanding your profile to choosing between your offers.
            </p>
            <div className="max-w-5xl mx-auto space-y-8">
              {PROCESS_STEPS.map(step => (
                <article key={step.num} className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center font-extrabold text-lg shadow-elegant">{step.num}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-extrabold mb-1">{step.title}</h3>
                      <p className="text-sm font-semibold text-blue-600 mb-3">{step.subtitle}</p>
                      <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

                      {step.tiers && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          {step.tiers.map(tier => (
                            <div key={tier.name} className={`rounded-xl border-2 p-4 text-center ${tier.color === "amber" ? "border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10" : tier.color === "emerald" ? "border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/10" : "border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/10"}`}>
                              <h4 className="font-bold text-sm mb-1">{tier.name} Options</h4>
                              <p className="text-xs text-muted-foreground">{tier.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.items && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {step.items.map(item => (
                            <div key={item} className="flex items-start gap-2 p-2 bg-muted/60 rounded-lg text-xs font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" /><span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.note && (
                        <p className="text-xs text-muted-foreground mt-4 pl-3 border-l-2 border-blue-500/40 italic">{step.note}</p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 5. FINANCIAL PLANNING ═══ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Planning Admission and Funding Together</h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">
              An academically perfect university is the wrong choice if the total cost doesn't work. We plan both at the same time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {FINANCE_BLOCKS.map(block => {
                const Icon = block.icon;
                return (
                  <div key={block.title} className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-elegant transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-extrabold mb-2">{block.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{block.description}</p>
                    <ul className="space-y-1.5 mb-4">
                      {block.items.map(i => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />{i}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-muted/60 rounded-xl p-3 mb-4">
                      <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wide mb-1.5">What we help you check</p>
                      <p className="text-xs text-muted-foreground">{block.check.join(" · ")}</p>
                    </div>
                    <p className="text-[11px] text-muted-foreground italic mb-4">{block.note}</p>
                    <Link to={block.link.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline">
                      {block.link.label}<ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Loan rejection */}
            <div className="max-w-5xl mx-auto mt-8 bg-card border rounded-2xl p-6 md:p-8 shadow-soft">
              <h3 className="text-lg font-extrabold mb-2">If Your Education Loan Is Declined</h3>
              <p className="text-sm text-muted-foreground mb-4">
                One rejection does not end your study abroad plan. We help you understand the likely reason and look at other routes.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["Co-applicant profile", "Income proof", "Credit history", "University or programme eligibility", "Loan amount requested", "Existing debts", "Lender's own policy"].map(r => (
                  <div key={r} className="flex items-start gap-2 p-2 bg-muted/60 rounded-lg text-xs">
                    <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" /><span>{r}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground italic mt-4">No lender approval can be guaranteed by any consultant.</p>
            </div>
          </div>
        </section>

        {/* ═══ 6. TOTAL COST ═══ */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Know the Full Cost Before You Decide</h2>
              <p className="text-muted-foreground mb-10">Your total study budget is more than tuition alone.</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {["Tuition", "Accommodation", "Living expenses", "Insurance", "Visa charges", "Air tickets", "Other study costs"].map((c, i, arr) => (
                  <div key={c} className="flex items-center gap-2">
                    <span className="px-4 py-2.5 rounded-xl bg-card border text-xs md:text-sm font-semibold shadow-soft">{c}</span>
                    {i < arr.length - 1 && <span className="text-blue-500 font-bold">+</span>}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-8">
                We build this picture with you before you commit to a university, so an attractive offer doesn't turn into a financial problem later.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 7. DEADLINES ═══ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Deadline Management</h2>
              <p className="text-center text-muted-foreground mb-12">
                Universities all run to different calendars. We map every date that matters so none of them decides your plan for you.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {DEADLINES.map(d => (
                  <div key={d} className="bg-card border rounded-xl p-4 shadow-soft flex items-center gap-2.5">
                    <CalendarClock className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-semibold">{d}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5 text-center">
                <p className="text-sm font-semibold text-blue-600 mb-1">Start early</p>
                <p className="text-xs text-muted-foreground">
                  Ideally, begin researching destinations and universities at least a year before your target intake.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 8. JOURNEY ═══ */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Your Study Abroad Journey</h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">
              Admission is one stage of twelve. Each one connects to the next.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {JOURNEY.map(j => {
                const card = (
                  <div className="h-full bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center font-bold text-xs mb-3">{j.step}</span>
                    <h3 className="font-bold text-sm">{j.label}</h3>
                    {j.to && <span className="text-[11px] text-blue-600 font-semibold inline-flex items-center gap-1 mt-1.5">Learn more <ArrowRight className="w-3 h-3" /></span>}
                  </div>
                );
                return j.to ? <Link key={j.step} to={j.to} className="block">{card}</Link> : <div key={j.step}>{card}</div>;
              })}
            </div>
          </div>
        </section>

        {/* ═══ 9. DOCUMENT CHECKLIST ═══ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Admission Documentation Checklist</h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">
              What most universities ask for. Individual programmes may require more.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {DOC_CHECKLIST.map(group => {
                const Icon = group.icon;
                return (
                  <div key={group.group} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-extrabold text-sm mb-3">{group.group}</h3>
                    <ul className="space-y-2">
                      {group.items.map(i => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />{i}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 10. WHO IS IT FOR ═══ */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Who Can Take Admission Guidance?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
              {WHO_FOR.map(w => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="bg-card border rounded-2xl p-4 text-center shadow-soft hover:shadow-elegant transition-all group">
                    <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-xs mb-1">{w.title}</h3>
                    <p className="text-[10px] text-muted-foreground">{w.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 11. COUNTRIES ═══ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Destinations We Support</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Programme availability varies by country and intake.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
              {COUNTRY_LINKS.map(c => (
                <Link key={c.name} to={c.to} className="px-4 py-2.5 rounded-xl bg-card border text-sm font-semibold shadow-soft hover:border-blue-500/40 hover:text-blue-600 transition-all">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 12. WHY DD ═══ */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Why DreamDestination for Admission Guidance?</h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">Guidance tailored to you, not to a partner list.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {WHY_DD.map(w => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-base font-extrabold mb-2 group-hover:text-blue-600 transition-colors">{w.title}</h3>
                    <p className="text-sm text-muted-foreground">{w.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 13. LEAD FORM ═══ */}
        <section id="lead-form" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-card border-2 border-blue-500/30 rounded-3xl p-6 md:p-10 shadow-elegant">
              <div className="text-center mb-8 space-y-2">
                <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Free Assessment</span>
                <h2 className="text-2xl md:text-3xl font-extrabold">
                  Get Your Free <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-amber-600">Profile Assessment</span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  Share your details and an admission counsellor will map out a realistic university shortlist for you.
                </p>
              </div>
              {formSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Request Received</h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you, {form.fullName || "Student"}. Our admission counsellor will reach out within 24 hours.
                  </p>
                  <button type="button" onClick={() => setFormSubmitted(false)} className="px-6 py-2.5 rounded-xl border border-emerald-500/20 text-emerald-600 font-semibold hover:bg-emerald-500/10 transition-colors text-xs">Submit Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="ag-name">Full Name *</label><input id="ag-name" type="text" required placeholder="Your Name" value={form.fullName} onChange={set("fullName")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="ag-mobile">Mobile *</label><input id="ag-mobile" type="tel" required placeholder="+91 98765 43210" value={form.mobile} onChange={set("mobile")} className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="ag-email">Email *</label><input id="ag-email" type="email" required placeholder="email@example.com" value={form.email} onChange={set("email")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="ag-city">Current City</label><input id="ag-city" type="text" placeholder="Mumbai" value={form.city} onChange={set("city")} className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="ag-qual">Highest Qualification *</label><select id="ag-qual" required value={form.qualification} onChange={set("qualification")} className={selectCls}><option value="">Select</option><option>Class 12</option><option>Diploma</option><option>Bachelor's</option><option>Master's</option><option>Working Professional</option></select></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="ag-pct">Percentage / CGPA</label><input id="ag-pct" type="text" placeholder="e.g. 75% or 8.5 CGPA" value={form.percentage} onChange={set("percentage")} className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="ag-year">Graduation Year</label><input id="ag-year" type="text" placeholder="e.g. 2025" value={form.gradYear} onChange={set("gradYear")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="ag-exp">Work Experience</label><select id="ag-exp" value={form.workExp} onChange={set("workExp")} className={selectCls}><option value="">Select</option><option>None</option><option>Less than 1 year</option><option>1-3 years</option><option>3-5 years</option><option>5+ years</option></select></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="ag-course">Preferred Course</label><input id="ag-course" type="text" placeholder="e.g. MSc Data Science, MBA" value={form.course} onChange={set("course")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="ag-country">Preferred Country</label><select id="ag-country" value={form.country} onChange={set("country")} className={selectCls}><option value="">Select</option>{COUNTRIES.map(c => <option key={c}>{c}</option>)}<option>Not Sure</option></select></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="ag-intake">Intended Intake</label><select id="ag-intake" value={form.intake} onChange={set("intake")} className={selectCls}><option value="">Select</option><option>Jan 2027</option><option>May 2027</option><option>Sep 2027</option><option>Jan 2028</option><option>Sep 2028</option><option>Not Sure</option></select></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="ag-test">IELTS / TOEFL / PTE Status</label><select id="ag-test" value={form.testStatus} onChange={set("testStatus")} className={selectCls}><option value="">Select</option><option>Score available</option><option>Test booked</option><option>Preparing</option><option>Not started</option></select></div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-1" htmlFor="ag-budget">Approximate Budget</label>
                    <select id="ag-budget" value={form.budget} onChange={set("budget")} className={selectCls}><option value="">Select</option><option>Below ₹10 Lakhs</option><option>₹10-20 Lakhs</option><option>₹20-40 Lakhs</option><option>₹40-60 Lakhs</option><option>₹60 Lakhs+</option><option>Not Sure</option></select>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 text-white font-bold py-4 rounded-xl text-base shadow-elegant transition-all">
                    Get My Free Profile Assessment
                  </button>
                  <p className="text-[11px] text-center text-muted-foreground">
                    We use your details only to contact you about your study abroad plan.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ═══ 14. FREE CONSULTATION CTA ═══ */}
        <section className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-amber-50 dark:from-blue-950/20 dark:to-amber-950/20 border-2 border-blue-500/20 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Still Deciding Where or What to Study?</h2>
              <p className="text-muted-foreground mb-2">You don't need a finished plan before speaking to a counsellor.</p>
              <p className="text-sm text-muted-foreground mb-6">
                Tell us your academic profile, career goal, preferred course, budget, destination and intake — we'll help you build a realistic admission roadmap.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-5 rounded-xl shadow-lg text-base" asChild>
                <a href="#lead-form"><MessageCircle className="w-5 h-5 mr-2" />Get My Free Profile Assessment</a>
              </Button>
            </div>
          </div>
        </section>

        {/* ═══ 15. FAQS ═══ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
                Frequently Asked <span className="text-blue-600">Questions</span>
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-6 shadow-soft data-[state=open]:shadow-elegant transition-smooth">
                    <AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:text-blue-600 py-5 [&[data-state=open]]:text-blue-600">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ═══ 16. FINAL CTA ═══ */}
        <section className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-amber-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Application?</h2>
              <p className="text-lg opacity-90 mb-8">Get a free profile assessment and a university shortlist built around you.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl shadow-lg transition-all"><Phone className="w-5 h-5" />Call Now</a>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-smooth"><MessageCircle className="w-5 h-5" />WhatsApp Us</a>
              </div>
            </div>
          </div>
        </section>
        <RelatedLinks currentPath="/admission-guidance" accent="text-blue-600" />
      </main>

      <Footer />
    </div>
  );
};

export default AdmissionGuidancePage;
