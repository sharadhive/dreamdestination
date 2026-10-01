import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ArrowRight, Phone, MessageCircle, CheckCircle2, Sparkles,
  Wallet, Landmark, ShieldCheck, FileText, Users, AlertCircle, Calculator,
  Award, Building2, GraduationCap, Briefcase, Plane, TrendingUp, XCircle,
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
   SEO — primary keyword: financial assistance for study abroad
   ═══════════════════════════════════════════════════════════ */
const SEO = {
  // Was 75 characters with the brand appended; Google adds the site name
  // itself, so the brand is dropped here to keep the keyword phrase whole.
  title: "Education Loan Guidance for Study Abroad & India",
  description:
    "Education loan guidance for Indian students — secured, unsecured and collateral-free routes, PM-Vidyalaxmi for Indian colleges, funding gap planning and visa financial evidence.",
  canonicalUrl: "/financial-assistance",
  keywords: [
    "financial assistance for study abroad", "education loan for study abroad",
    "education loan for abroad studies", "study abroad financial assistance",
    "education loan for Indian students", "unsecured education loan for abroad studies",
    "education loan without collateral", "study abroad loan assistance",
    "scholarships for Indian students", "financial planning for study abroad",
    "education loan consultant", "overseas education loan",
    "student loan for abroad studies", "study abroad scholarship assistance",
    "how much education loan can I get for studying abroad",
    "documents required for education loan", "education loan co-applicant",
    "what if my education loan is rejected",
  ],
};

const PHONE = CONTACT.phone;
const WHATSAPP = CONTACT.whatsapp;

/* ─── Budget components ─── */
const BUDGET_PARTS = [
  "Tuition fees", "Accommodation", "Living expenses", "Insurance",
  "Visa & application fees", "Travel", "Study materials & setup costs",
];

const FUNDING_SOURCES = [
  "Scholarships", "Family resources", "Secured education loans",
  "Collateral-free education loans", "Other eligible funding",
];

/* ─── Cost breakdown ─── */
const COST_GROUPS = [
  { icon: GraduationCap, group: "Education Costs", items: ["Tuition fees", "Application fees", "University deposit", "Study materials", "Evaluation & exam fees"] },
  { icon: Building2, group: "Living Costs", items: ["Accommodation", "Food", "Local transport", "Utilities", "Personal expenses"] },
  { icon: Plane, group: "One-Off Costs", items: ["Visa & application fees", "Student health insurance", "Airfare", "Initial setup on arrival"] },
];

/* ─── Core services ─── */
interface Block {
  num: string;
  icon: typeof Wallet;
  title: string;
  subtitle: string;
  body: string;
  items?: string[];
  note?: string;
}

const BLOCKS: Block[] = [
  {
    num: "01", icon: Calculator, title: "Financial Assessment",
    subtitle: "Understand what you actually need to fund",
    body: "We start with your full study plan rather than a loan application. Knowing the real number first is what stops students borrowing more than they need — or discovering a shortfall at the visa stage.",
    items: ["Target country & university", "Programme and tuition", "Estimated living costs", "Available family funds", "Scholarship possibilities", "Co-applicant profile", "Intended intake"],
  },
  {
    num: "02", icon: Wallet, title: "Total Cost Planning",
    subtitle: "A lower tuition fee does not mean a lower total cost",
    body: "We break down every cost attached to your programme so you can compare universities on what you will actually pay, not on the headline tuition figure.",
  },
  {
    num: "03", icon: Landmark, title: "Education Loan Guidance",
    subtitle: "Understand the lending landscape before you apply",
    body: "Eligible students can fund some or all approved study costs through an education loan, in line with the lender's policy. We explain how the options differ.",
    items: ["Bank education loans", "NBFC education loans", "Secured loans (with collateral)", "Unsecured loans (collateral-free)", "Document requirements", "Co-applicant requirements", "What the loan covers", "Repayment schedules"],
    note: "Loan amount, interest rate, tenure, collateral requirements and approval are decided by the lender based on your profile.",
  },
  {
    num: "04", icon: ShieldCheck, title: "Secured Education Loans",
    subtitle: "Higher funding against approved collateral",
    body: "With acceptable collateral — residential or commercial property, land, fixed deposits or other assets the lender accepts — some lenders offer significantly larger loan amounts.",
    items: ["Potential loan amounts", "What collateral is accepted and how it is valued", "Co-applicant criteria", "Documentation required", "The application journey", "Which terms to compare"],
    note: "Whether collateral is acceptable, and what it is valued at, is entirely the lender's decision.",
  },
  {
    num: "05", icon: TrendingUp, title: "Unsecured (Collateral-Free) Loans",
    subtitle: "For students without property to pledge",
    body: "Collateral-free education loans may be available to eligible students. Eligibility varies widely between lenders and depends on more than your academic record.",
    items: ["University and course chosen", "Country of study", "Academic performance", "Co-applicant's income", "Credit history", "Existing financial commitments", "Loan amount requested", "Employability of the programme"],
    note: "Unsecured loan approval is never guaranteed. We help you understand your likely options and prepare properly before approaching lenders.",
  },
  {
    num: "06", icon: FileText, title: "Loan Eligibility Assessment",
    subtitle: "Know where you stand before you apply anywhere",
    body: "Submitting applications to several lenders without assessing your profile first can leave a trail of rejections that makes the next application harder. We assess first.",
    items: ["Student profile — academics, course, university, admission status", "Co-applicant profile — income, employment, credit score, existing debts", "Funding requirement — tuition, accommodation, living costs"],
  },
  {
    num: "07", icon: Users, title: "Co-Applicant Guidance",
    subtitle: "The part most students underestimate",
    body: "For most education loans the co-applicant is assessed as closely as the student. Lenders typically look at their relationship to you, income stability, employment or business history, creditworthiness and capacity to repay.",
    items: ["Relationship to the student", "Income and financial stability", "Employment or business history", "Credit profile", "Repayment capacity"],
  },
  {
    num: "08", icon: Calculator, title: "Working Out the Right Loan Amount",
    subtitle: "Borrowing too much and too little both cost you",
    body: "Borrow more than you need and you carry a heavier repayment for years. Borrow too little and you hit a shortfall after you have already moved abroad.",
    note: "Total study cost − (scholarships + available personal funds) = your funding gap. The final loan amount should follow from that figure and what the lender will sanction.",
  },
  {
    num: "09", icon: Award, title: "Scholarship Planning Alongside Your Loan",
    subtitle: "Funding rarely comes from one source",
    body: "A scholarship that reduces tuition reduces the loan you need. Most students end up combining personal funds, a scholarship and a loan — which is why the two should be planned together rather than in sequence.",
    items: ["Personal funds", "Scholarships", "Education loan", "Other eligible funding"],
  },
  {
    num: "10", icon: FileText, title: "Visa Financial Planning",
    subtitle: "Your funding has to satisfy immigration, not just the university",
    body: "Many destinations require evidence that you can meet tuition and living costs. Requirements vary by country, visa type, course length, city and the rules in force at the time.",
    items: ["Bank statements", "Loan sanction letter", "Scholarship letter", "Sponsor documents", "Income documents", "Other accepted proof"],
    note: "Always verify financial requirements against the current official visa rules for your destination.",
  },
  {
    num: "11", icon: ShieldCheck, title: "Financial Document Review",
    subtitle: "Accurate, consistent, genuine, verifiable",
    body: "Most avoidable problems at the loan and visa stage come from inconsistent paperwork rather than insufficient funds. We review what you have arranged and identify the gaps.",
    items: ["Bank statements", "Income documents", "Loan documents", "Scholarship documents", "Sponsor documents", "Fee receipts", "Declarations of finance"],
    note: "Never submit fabricated or altered financial documents. It can result in permanent bans from universities and immigration authorities.",
  },
];

/* ─── Loan rejection ─── */
const REJECTION_REASONS = [
  "Unsatisfactory credit history", "Insufficient co-applicant income",
  "High existing debt", "Co-applicant profile", "University or course not on the lender's list",
  "Loan amount above the lender's limit", "Missing or incomplete documentation",
];

/* ─── Documentation ─── */
const DOC_GROUPS = [
  { title: "For the Student", items: ["Passport", "Admission / offer letter", "Academic certificates", "Academic transcripts", "KYC documents", "Course details"] },
  { title: "For the Co-Applicant", items: ["PAN / Aadhaar or equivalent KYC", "Salary slips", "Bank statements", "Income tax returns", "Business documents, if self-employed"] },
  { title: "For the Application", items: ["University fee structure", "Detailed expense estimate", "Details of existing loans", "Collateral documents, if applicable"] },
];

/* ─── Student types ─── */
const STUDENT_TYPES = [
  { icon: GraduationCap, title: "Bachelor's Students", points: ["Total education cost analysis", "Scholarship identification", "Loan requirement assessment", "Co-applicant documentation", "Long-term repayment view"] },
  { icon: Briefcase, title: "Master's Students", points: ["University and course cost", "Scholarship options", "Loan amount needed", "Unsecured loan availability", "Financial proof for the visa"] },
  { icon: TrendingUp, title: "Working Professionals", points: ["Existing finances", "Income-based requirement and return on investment", "Loan requirement", "Repayment planning against salary"] },
];

/* ─── Course groups ─── */
const COURSE_GROUPS = [
  { area: "STEM", items: ["Computer Science", "Data Science", "Artificial Intelligence", "Engineering", "Cyber Security"] },
  { area: "Business", items: ["MBA", "Finance", "Business Analytics", "International Business"] },
  { area: "Healthcare", items: ["Nursing", "Public Health", "Biotechnology", "Healthcare Management"] },
  { area: "Creative", items: ["Architecture", "Fashion", "Design", "Animation"] },
];

/* ─── Process ─── */
const PROCESS = [
  { num: "01", title: "Profile Assessment", desc: "Understand your academic and financial position." },
  { num: "02", title: "Cost Estimation", desc: "Price the full study plan, not just tuition." },
  { num: "03", title: "Scholarship Identification", desc: "Find awards you genuinely qualify for." },
  { num: "04", title: "Funding Gap", desc: "Establish exactly how much must be arranged." },
  { num: "05", title: "Loan Route Selection", desc: "Assess secured and unsecured options against your profile." },
  { num: "06", title: "Documentation Support", desc: "Organise what each funding source requires." },
  { num: "07", title: "Visa Financial Planning", desc: "Prepare financial evidence for the visa stage." },
];

/* ─── Mistakes ─── */
const MISTAKES = [
  { t: "Counting only tuition", d: "Living costs, travel, insurance and setup costs are part of the real number." },
  { t: "Relying on a scholarship you haven't been awarded", d: "Plan the funding that works without it, then treat the award as a reduction." },
  { t: "Applying to one lender without checking eligibility", d: "Compare several before applying anywhere." },
  { t: "Ignoring the co-applicant's profile", d: "Their income and credit history often matter more than yours." },
  { t: "Borrowing more than you need", d: "Every extra lakh is repaid with interest for years." },
  { t: "Leaving funding until the visa stage", d: "Loan processing, sanction and disbursement all take time." },
  { t: "Submitting inconsistent documents", d: "Mismatched names, dates or figures cause delays and queries." },
  { t: "Expecting an unsecured loan with a weak credit profile", d: "Understand the criteria before you count on it." },
];

/* ─── Destinations ─── */
const DESTINATIONS = [
  { name: "UK", to: "/study-in-uk" }, { name: "USA", to: "/study-in-usa" },
  { name: "Canada", to: "/study-in-canada" }, { name: "Australia", to: "/study-in-australia" },
  { name: "New Zealand", to: "/study-in-new-zealand" }, { name: "Germany", to: "/study-in-germany" },
  { name: "Ireland", to: "/study-in-ireland" }, { name: "France", to: "/study-in-france" },
  { name: "Italy", to: "/study-in-italy" }, { name: "Netherlands", to: "/study-in-netherlands" },
  { name: "Switzerland", to: "/study-in-switzerland" }, { name: "Singapore", to: "/study-in-singapore" },
  { name: "Malaysia", to: "/study-in-malaysia" }, { name: "Dubai / UAE", to: "/study-in-dubai" },
  { name: "Mauritius", to: "/study-in-mauritius" },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: "What financial assistance is available for studying abroad?", a: "Students can explore scholarships, education loans, personal funds and other eligible funding sources depending on their destination, university and individual circumstances." },
  { q: "Can I get an education loan to study abroad?", a: "Eligible Indian students can apply for education loans through banks and NBFCs, subject to the lender's eligibility criteria and approval process." },
  { q: "Can I get an education loan without collateral?", a: "Some lenders offer unsecured education loans for eligible students. Eligibility depends on factors such as the university, course, academic profile, co-applicant and lender policy." },
  { q: "How much education loan can I get for studying abroad?", a: "The amount varies by lender and student profile. It depends on tuition, living expenses, university, course, co-applicant profile, collateral and repayment capacity. Secured loans generally allow higher amounts than unsecured ones." },
  { q: "Does an education loan cover living expenses?", a: "Depending on the loan product, eligible living and other study-related expenses may be included. Confirm the exact coverage with the lender before you rely on it." },
  { q: "Can an education loan cover tuition fees?", a: "Yes. Eligible education-loan products can be used toward approved tuition and educational expenses, subject to the lender's terms." },
  { q: "What documents are required for an education loan?", a: "Requirements vary by lender but commonly include admission documents, academic records, KYC, income documents, bank statements and co-applicant information." },
  { q: "What is an unsecured education loan?", a: "An unsecured education loan generally does not require you to pledge property or another asset as collateral. Approval remains subject to the lender's eligibility criteria." },
  { q: "What if my education loan is rejected?", a: "Understand the likely reason first — credit history, co-applicant income, existing debt, the university or course, or incomplete documents. Depending on the cause you may be able to strengthen the application or approach a different lender." },
  { q: "Can I apply for another education loan after a rejection?", a: "Potentially, yes. But understand why the first application was declined before approaching another lender, or you are likely to repeat the outcome." },
  { q: "Can scholarships reduce my education loan requirement?", a: "Yes. A scholarship that reduces tuition or another eligible expense reduces the total you need to fund, and therefore the loan you need to take." },
  { q: "How can I find scholarships to study abroad?", a: "Scholarships are offered by universities, governments, regional bodies and other organisations. Eligibility and deadlines vary, and several close before university application deadlines." },
  { q: "Do you guarantee scholarships?", a: "No. Scholarship decisions are made by the scholarship provider based on its own eligibility and selection criteria." },
  { q: "Do you guarantee education loan approval?", a: "No. Loan approval, amount, interest rate, collateral requirements and terms are determined entirely by the lender." },
  { q: "Can my parents be my education-loan co-applicant?", a: "Depending on the lender's policy, parents may be eligible co-applicants. The lender will assess their income, credit profile and other criteria." },
  { q: "What is a co-applicant's role in an education loan?", a: "A co-applicant may be required to meet the lender's income and credit requirements and shares responsibility for repayment as set out in the loan agreement." },
  { q: "Do I need an education loan for a student visa?", a: "Not necessarily. Financial requirements depend on the destination and visa category. Accepted evidence may include personal funds, sponsorship, scholarships or education loans depending on the applicable rules." },
  { q: "Can I use a scholarship and an education loan together?", a: "In many cases students combine funding sources. How much it reduces your loan depends on the scholarship terms and the lender's policy." },
  { q: "Should I take a secured or unsecured education loan?", a: "It depends on your funding requirement, available collateral, university and course, co-applicant profile and the terms each lender offers." },
  { q: "How early should I start arranging an education loan?", a: "Start financial planning well before the visa stage. Loan processing, sanction and disbursement all take time, and the sanction letter is often part of your visa financial evidence." },
];

const FinancialAssistancePage = () => {
  const [form, setForm] = useState({
    fullName: "", mobile: "", email: "", city: "", qualification: "", country: "",
    course: "", university: "", intake: "", tuition: "", ownFunds: "", loanNeeded: "", scholarshipHelp: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const pageUrl = `${SITE.domain}/financial-assistance`;
  const inputCls = "w-full text-sm p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-colors";

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
        { "@type": "ListItem", position: 2, name: "Financial Assistance", item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org", "@type": "Service",
      name: "Education Loan & Financial Assistance for Study Abroad",
      serviceType: "Education loan and study abroad funding guidance",
      description: SEO.description,
      areaServed: { "@type": "Country", name: "India" },
      provider: { "@type": "EducationalOrganization", name: SITE.name, url: SITE.domain, telephone: PHONE },
    },
    {
      "@context": "https://schema.org", "@type": "HowTo",
      name: "How to arrange finance for studying abroad",
      step: PROCESS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc })),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-emerald-500/20 selection:text-emerald-600">
      <SEOHead title={SEO.title} description={SEO.description} canonicalUrl={SEO.canonicalUrl} keywords={SEO.keywords} jsonLd={jsonLd} />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gradient-subtle border-b pt-20">
          <div className="container mx-auto px-4 py-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">Financial Assistance</span>
            </nav>
          </div>
        </div>

        {/* HERO */}
        <section className="relative pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-emerald-50/60 via-background to-background dark:from-emerald-950/10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] max-w-full bg-emerald-500/8 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="container mx-auto px-4 pt-12 md:pt-16">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /><span>Education Loans & Funding for Indian Students</span>
              </div>
              <span className="text-6xl md:text-7xl drop-shadow-lg block">💰</span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-600">Education Loan</span> & Financial Assistance
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Plan your study abroad finances properly — scholarships, secured and collateral-free loans,
                funding gap analysis and the financial evidence your visa will need.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-emerald-600/20 text-base w-full sm:w-auto" asChild>
                  <a href="#lead-form"><span>Check My Funding Options</span><ArrowRight className="w-5 h-5 ml-2" /></a>
                </Button>
                <Button size="lg" variant="outline" className="border-emerald-500/20 hover:bg-emerald-500/5 font-semibold px-8 py-6 rounded-xl text-base w-full sm:w-auto" asChild>
                  <a href={`tel:${PHONE}`}><Phone className="w-5 h-5 mr-2 text-emerald-600" /><span>Talk to an Advisor</span></a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* WHY PLANNING MATTERS */}
        <section className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6">Why Financial Planning Comes First</h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-center">
                Committing to a university without a clear picture of the full cost is how students end up in
                difficulty a year later. Your study abroad budget is more than tuition.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                {BUDGET_PARTS.map((b, i, arr) => (
                  <div key={b} className="flex items-center gap-2">
                    <span className="px-4 py-2.5 rounded-xl bg-card border text-xs md:text-sm font-semibold shadow-soft">{b}</span>
                    {i < arr.length - 1 && <span className="text-emerald-500 font-bold">+</span>}
                  </div>
                ))}
              </div>
              <p className="text-center text-sm font-semibold mb-4">Funding usually comes from a combination of:</p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {FUNDING_SOURCES.map(f => (
                  <span key={f} className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-400">{f}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COST BREAKDOWN */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">What Your Study Abroad Budget Includes</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-sm">
              A lower tuition fee does not always mean a lower total cost.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {COST_GROUPS.map(g => {
                const Icon = g.icon;
                return (
                  <div key={g.group} className="bg-card border rounded-2xl p-6 shadow-soft">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-extrabold text-sm mb-3">{g.group}</h3>
                    <ul className="space-y-2">
                      {g.items.map(i => (
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

        {/* CORE SERVICE BLOCKS */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">Our Financial Assistance Services</h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto text-sm">
              From working out what you need, to having the documentation your lender and your visa both accept.
            </p>
            <div className="max-w-5xl mx-auto space-y-6">
              {BLOCKS.map(b => {
                const Icon = b.icon;
                return (
                  <article key={b.num} className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-elegant transition-all duration-300">
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center shadow-elegant">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2.5 mb-1 flex-wrap">
                          <span className="text-xs font-extrabold text-emerald-600">{b.num}</span>
                          <h3 className="text-lg md:text-xl font-extrabold">{b.title}</h3>
                        </div>
                        <p className="text-sm font-semibold text-emerald-600 mb-3">{b.subtitle}</p>
                        <p className="text-sm text-muted-foreground mb-4">{b.body}</p>
                        {b.items && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {b.items.map(i => (
                              <div key={i} className="flex items-start gap-2 p-2 bg-muted/60 rounded-lg text-xs font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span>{i}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {b.note && (
                          <p className="text-xs text-muted-foreground mt-4 pl-3 border-l-2 border-emerald-500/40 italic">{b.note}</p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* LOAN REJECTION */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border-2 border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-soft">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                  <h2 className="text-xl md:text-2xl font-extrabold">Education Loan Rejected? It Isn't the End of the Plan</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-5">
                  One rejection does not mean every lender will decline you — but applying again without
                  understanding why usually produces the same result. Common reasons:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                  {REJECTION_REASONS.map(r => (
                    <div key={r} className="flex items-start gap-2 p-2.5 bg-muted/60 rounded-lg text-xs">
                      <XCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" /><span>{r}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold mb-2">Our approach: review → understand → reassess → explore alternatives.</p>
                <p className="text-xs text-muted-foreground italic">No consultant can guarantee loan approval. Any who does is not being straight with you.</p>
              </div>
            </div>
          </div>
        </section>

        {/* DOCUMENTS */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">Education Loan Document Checklist</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-sm">
              Exact requirements differ between lenders — these are what most ask for.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {DOC_GROUPS.map(g => (
                <div key={g.title} className="bg-card border rounded-2xl p-6 shadow-soft">
                  <h3 className="font-extrabold text-sm mb-4">{g.title}</h3>
                  <ul className="space-y-2">
                    {g.items.map(i => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <FileText className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />{i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STUDENT TYPES */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12">Guidance by Student Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {STUDENT_TYPES.map(t => {
                const Icon = t.icon;
                return (
                  <div key={t.title} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-extrabold text-sm mb-3">{t.title}</h3>
                    <ul className="space-y-2">
                      {t.points.map(p => (
                        <li key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* COURSES + DESTINATIONS */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">Funding by Course and Destination</h2>
              <p className="text-center text-muted-foreground mb-12 text-sm">
                Lender criteria often differ by programme and country, so your funding plan should match both.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {COURSE_GROUPS.map(g => (
                  <div key={g.area} className="bg-card border rounded-2xl p-5 shadow-soft">
                    <h3 className="font-extrabold text-sm mb-3 text-emerald-600">{g.area}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map(i => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-muted/60 text-[11px] font-medium">{i}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-center font-extrabold text-sm mb-5">Destinations we plan finances for</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {DESTINATIONS.map(d => (
                  <Link key={d.to} to={d.to} className="px-3.5 py-2 rounded-xl bg-card border text-xs font-semibold shadow-soft hover:border-emerald-500/40 hover:text-emerald-600 transition-all">
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12">Our 7-Step Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {PROCESS.map(s => (
                <div key={s.num} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-bold text-sm mb-3">{s.num}</span>
                  <h3 className="font-bold text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISTAKES */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12">Eight Mistakes That Cost Students Money</h2>
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

        {/* LEAD FORM */}
        <section id="lead-form" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-card border-2 border-emerald-500/30 rounded-3xl p-6 md:p-10 shadow-elegant">
              <div className="text-center mb-8 space-y-2">
                <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest">Free Assessment</span>
                <h2 className="text-2xl md:text-3xl font-extrabold">
                  What Funding Plan <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600">Works for You?</span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  Share your details and we will map out your funding gap and the routes available to you.
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
                <form onSubmit={e => { e.preventDefault(); sendLeadToWhatsApp("Education Loan", form); setSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="fa-name">Full Name *</label><input id="fa-name" required value={form.fullName} onChange={set("fullName")} className={inputCls} placeholder="Your name" /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="fa-mobile">Mobile *</label><input id="fa-mobile" type="tel" required value={form.mobile} onChange={set("mobile")} className={inputCls} placeholder="+91 98765 43210" /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="fa-email">Email *</label><input id="fa-email" type="email" required value={form.email} onChange={set("email")} className={inputCls} placeholder="email@example.com" /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="fa-city">Current City</label><input id="fa-city" value={form.city} onChange={set("city")} className={inputCls} placeholder="Mumbai" /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="fa-qual">Highest Qualification</label><select id="fa-qual" value={form.qualification} onChange={set("qualification")} className={inputCls}><option value="">Select</option><option>Class 12</option><option>Bachelor's</option><option>Master's</option><option>Working Professional</option></select></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="fa-country">Preferred Country</label><select id="fa-country" value={form.country} onChange={set("country")} className={inputCls}><option value="">Select</option>{DESTINATIONS.map(d => <option key={d.name}>{d.name}</option>)}<option>Not sure</option></select></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="fa-course">Preferred Course</label><input id="fa-course" value={form.course} onChange={set("course")} className={inputCls} placeholder="e.g. MSc Data Science" /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="fa-uni">University / Offer Status</label><input id="fa-uni" value={form.university} onChange={set("university")} className={inputCls} placeholder="e.g. Offer received" /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="fa-intake">Intake</label><select id="fa-intake" value={form.intake} onChange={set("intake")} className={inputCls}><option value="">Select</option><option>Jan 2027</option><option>May 2027</option><option>Sep 2027</option><option>Jan 2028</option><option>Not sure</option></select></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="fa-tuition">Approximate Tuition Fee</label><input id="fa-tuition" value={form.tuition} onChange={set("tuition")} className={inputCls} placeholder="e.g. ₹25 Lakhs" /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="fa-loan">Education Loan Required?</label><select id="fa-loan" value={form.loanNeeded} onChange={set("loanNeeded")} className={inputCls}><option value="">Select</option><option>Yes</option><option>No</option><option>Not sure</option></select></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="fa-schol">Need Scholarship Guidance?</label><select id="fa-schol" value={form.scholarshipHelp} onChange={set("scholarshipHelp")} className={inputCls}><option value="">Select</option><option>Yes</option><option>No</option><option>Not sure</option></select></div>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:opacity-90 text-white font-bold py-4 rounded-xl text-base shadow-elegant transition-all">
                    Get My Free Financial Assessment
                  </button>
                  <p className="text-[11px] text-center text-muted-foreground">
                    We use your details only to contact you about your study abroad funding.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12">
                Frequently Asked <span className="text-emerald-600">Questions</span>
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-6 shadow-soft data-[state=open]:shadow-elegant transition-smooth">
                    <AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:text-emerald-600 py-5 [&[data-state=open]]:text-emerald-600">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <RelatedLinks currentPath="/financial-assistance" accent="text-emerald-600" />

        {/* FINAL CTA */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 via-emerald-700 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Know Your Funding Before You Commit</h2>
              <p className="text-lg opacity-90 mb-8">Get a free assessment of your costs, funding gap and loan options.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-emerald-700 font-bold rounded-xl shadow-lg transition-all"><Phone className="w-5 h-5" />Call Now</a>
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

export default FinancialAssistancePage;
