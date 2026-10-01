import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ArrowRight, Phone, MessageCircle, CheckCircle2, Sparkles,
  GraduationCap, Building2, BookOpen, Globe, Wallet, Award, FileText,
  CalendarClock, Users, Compass, ShieldCheck, Briefcase, Cpu, Stethoscope,
  Landmark, MapPin, Plane, ClipboardCheck, TrendingUp,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedLinks from "@/components/RelatedLinks";
import SEOHead from "@/components/SEOHead";
import CountryHeroBanner from "@/components/CountryHeroBanner";
import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";

/* ═══════════════════════════════════════════════════════════
   SEO FOUNDATION
   Primary keyword: study in India for international students
   NOTE: unlike every other page on this site, this page targets
   INBOUND students — international students coming to India.
   ═══════════════════════════════════════════════════════════ */
const SEO = {
  title: "Study in India for International Students 2026",
  description:
    "Study in India for international students with guidance on universities, courses, fees, scholarships, admissions, student visas and education opportunities.",
  canonicalUrl: "/study-in-india",
  keywords: [
    "study in India for international students", "study in India", "study in India for foreign students",
    "study in India for international students 2026", "Indian universities for international students",
    "universities in India for international students", "colleges in India for international students",
    "international students in India", "education consultant India", "study abroad consultant India",
    "Indian university admission", "university admission in India",
    "courses in India for international students", "bachelor's in India for international students",
    "master's in India for international students", "MBA in India for international students",
    "engineering in India for international students", "medical education in India",
    "cost of studying in India", "scholarships in India for international students",
    "student visa India", "India student visa requirements", "Study in India programme",
    "Study in India portal", "international education India",
  ],
};

const PHONE = "+919211818710";
const WHATSAPP = "https://wa.me/919211818710";

/* ─── At a glance ─── */
const AT_A_GLANCE = [
  { label: "Study Levels", value: "Bachelor's, Master's, MBA, PhD, Diploma" },
  { label: "Popular Fields", value: "Engineering, IT, Business, Medicine, Science, Law, Design" },
  { label: "Language of Instruction", value: "English, and regional languages depending on the programme" },
  { label: "Institution Types", value: "IITs, IIMs, NITs, central & state universities, private universities" },
  { label: "Inbound Programme", value: "Study in India (Government of India)" },
  { label: "Popular Study Hubs", value: "Bengaluru, Delhi NCR, Mumbai, Pune, Hyderabad, Chennai" },
];

/* ─── Why India ─── */
const WHY_INDIA = [
  { icon: Building2, title: "A Very Large Education System", desc: "India hosts thousands of universities, institutes and colleges across almost every discipline." },
  { icon: Cpu, title: "Strong in Technology & Engineering", desc: "Engineering, computer science, IT, AI, data science, electronics and biotechnology are established strengths." },
  { icon: Briefcase, title: "Established Management Education", desc: "Dedicated business schools alongside university-based management programmes." },
  { icon: BookOpen, title: "Wide Academic Choice", desc: "Engineering, medicine, sciences, law, humanities, arts, design, hospitality and more." },
  { icon: Wallet, title: "Cost Advantage", desc: "Often more affordable than many Western destinations, though costs vary widely between public and private institutions." },
  { icon: Globe, title: "Growing Internationalisation", desc: "The National Education Policy places explicit emphasis on international collaboration and student mobility." },
];

/* ─── Who should consider ─── */
const WHO_SHOULD = [
  "Want a quality international degree at a comparatively lower cost",
  "Are interested in engineering or technology",
  "Want to study business or management",
  "Are drawn to science or research",
  "Are considering medicine or healthcare",
  "Want to experience India's culture and languages",
  "Are looking for a wide range of programme options",
];

const STRONG_FIELDS = [
  "Engineering", "Computer Science", "Information Technology", "Data Science",
  "Artificial Intelligence", "Business & Management", "Medicine", "Pharmaceutical Sciences",
  "Biotechnology", "Law", "Design",
];

/* ─── Institution types ─── */
const INSTITUTION_TYPES = [
  { icon: Cpu, name: "IITs", full: "Indian Institutes of Technology", areas: ["Engineering", "Technology", "Computer Science", "Research"] },
  { icon: Briefcase, name: "IIMs", full: "Indian Institutes of Management", areas: ["Management", "Business", "Finance", "Entrepreneurship"] },
  { icon: Building2, name: "NITs", full: "National Institutes of Technology", areas: ["Engineering", "Technology", "Sciences"] },
  { icon: Landmark, name: "Central & State Universities", full: "Public universities across India", areas: ["Broad range of disciplines", "Large campuses", "Research programmes"] },
  { icon: GraduationCap, name: "Private Universities", full: "Privately run institutions", areas: ["Technology", "Business", "Design", "Sciences", "Humanities"] },
  { icon: ShieldCheck, name: "Deemed Universities", full: "Other recognised institutions", areas: ["Check recognition", "Check accreditation", "Check programme eligibility"] },
];

/* ─── Institutions ─── */
/*
 * Institution NAMES only, grouped by type — deliberately without rankings,
 * tuition figures or intake numbers.
 *
 * Two reasons. First, an international student's real question at this stage is
 * "what kind of institution should I even be looking at", and the type is what
 * answers it: an IIT, a central university and a private university are three
 * different admission routes, fee structures and application calendars. Second,
 * a rank or a fee attached to a name is a claim with a date on it — it goes
 * stale within a year and this page has no mechanism to keep 40 of them current.
 *
 * Anyone adding a figure here needs a named source and a checked date, the same
 * bar every other number on this site is held to.
 */
const INSTITUTIONS = [
  { group: "Indian Institutes of Technology (IITs)", items: ["IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur", "IIT Hyderabad", "IIT Roorkee", "IIT Guwahati", "IIT Indore", "IIT BHU Varanasi"] },
  { group: "Indian Institutes of Management (IIMs)", items: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "IIM Lucknow", "IIM Kozhikode", "IIM Indore", "IIM Udaipur", "IIM Shillong"] },
  { group: "Central Universities", items: ["University of Delhi", "Jawaharlal Nehru University", "Banaras Hindu University", "University of Hyderabad", "Jamia Millia Islamia", "Aligarh Muslim University", "Visva-Bharati", "Pondicherry University"] },
  { group: "Science & Research Institutions", items: ["Indian Institute of Science (IISc), Bengaluru", "IISER Pune", "IISER Kolkata", "Tata Institute of Fundamental Research", "Indian Statistical Institute", "National Institute of Immunology"] },
  { group: "National Institutes of Technology (NITs)", items: ["NIT Tiruchirappalli", "NIT Surathkal", "NIT Warangal", "NIT Rourkela", "NIT Calicut", "MNNIT Allahabad", "MNIT Jaipur", "VNIT Nagpur"] },
  { group: "State & Technical Universities", items: ["Anna University, Chennai", "Savitribai Phule Pune University", "University of Mumbai", "University of Calcutta", "Osmania University", "Jadavpur University", "Panjab University"] },
  { group: "Private & Deemed Universities", items: ["BITS Pilani", "Manipal Academy of Higher Education", "VIT Vellore", "SRM Institute of Science and Technology", "Amity University", "Symbiosis International University", "Ashoka University", "Shiv Nadar University", "Christ University, Bengaluru", "Thapar Institute of Engineering and Technology"] },
  { group: "Specialist Institutions", items: ["National Law School of India University (law)", "NALSAR Hyderabad (law)", "National Institute of Design (design)", "NIFT (fashion technology)", "AIIMS New Delhi (medicine)", "Indian School of Business (management)", "TISS Mumbai (social sciences)", "Indian Institute of Foreign Trade (trade)"] },
];

/* ─── Courses ─── */
const COURSE_GROUPS = [
  { icon: Cpu, area: "Engineering & Technology", items: ["Computer Science", "Mechanical", "Electrical", "Civil", "Electronics", "Chemical", "Aerospace"] },
  { icon: Cpu, area: "Computer Science & IT", items: ["Computer Science", "Information Technology", "Software Engineering", "Artificial Intelligence", "Cybersecurity", "Cloud Computing"] },
  { icon: TrendingUp, area: "Data & AI", items: ["Data Science", "Data Analytics", "Artificial Intelligence", "Machine Learning", "Business Analytics"] },
  { icon: Briefcase, area: "Business & Management", items: ["BBA", "MBA", "Finance", "Marketing", "International Business", "Entrepreneurship"] },
  { icon: BookOpen, area: "Sciences", items: ["Physics", "Chemistry", "Mathematics", "Biotechnology", "Life Sciences"] },
  { icon: Stethoscope, area: "Medicine & Healthcare", items: ["Medicine", "Nursing", "Pharmacy", "Physiotherapy", "Allied Health Sciences"] },
  { icon: Compass, area: "Other Disciplines", items: ["Law", "Architecture", "Design", "Hospitality", "Tourism", "Humanities", "Social Sciences"] },
];

/* ─── Study levels ─── */
const STUDY_LEVELS = [
  {
    icon: GraduationCap, title: "Bachelor's in India", subtitle: "Undergraduate study for international students",
    intro: "Undergraduate programmes are available across engineering, computer science, business, sciences, medicine, design, humanities, law and pharmacy.",
    checkTitle: "Compare before you choose",
    check: ["Institution and its recognition", "Course content", "Admission requirements", "Tuition", "Accommodation", "Career opportunities", "Location"],
  },
  {
    icon: BookOpen, title: "Master's in India", subtitle: "Postgraduate study across technology, business and science",
    intro: "Popular postgraduate areas include Computer Science, Data Science, Artificial Intelligence, Business Analytics, MBA, Engineering, Finance, Biotechnology, Public Health and Economics.",
    checkTitle: "Check before applying",
    check: ["Your bachelor's qualification and its recognition in India", "Academic requirements", "Entrance examinations", "Language requirements", "Programme eligibility", "Tuition", "Institution accreditation"],
  },
  {
    icon: Briefcase, title: "MBA in India", subtitle: "A large and established management education sector",
    intro: "Options include general MBA, Business Management, Finance, Marketing, International Business, Business Analytics, Operations and Entrepreneurship.",
    checkTitle: "Compare before you choose",
    check: ["Institution and accreditation", "Entrance requirements", "Programme duration", "Tuition", "Specialisation offered", "Internship opportunities", "Career services"],
  },
  {
    icon: Cpu, title: "Engineering in India", subtitle: "One of India's largest higher-education streams",
    intro: "Popular fields include Computer Science, Mechanical, Electrical, Electronics, Civil, Chemical, Aerospace and Biotechnology, offered by IITs, NITs, IIITs, universities and private engineering institutions.",
    checkTitle: "What to compare",
    check: ["Curriculum depth", "Project-based learning", "Faculty experience", "Industry exposure", "Internship opportunities", "Career support"],
  },
];

/* ─── Timeline ─── */
const TIMELINE = [
  { when: "6–12 months before", items: ["Research institutions", "Select your course", "Check eligibility", "Compare tuition", "Explore scholarships", "Estimate living costs"] },
  { when: "4–6 months before", items: ["Prepare documents", "Submit applications", "Complete entrance requirements where applicable"] },
  { when: "After admission", items: ["Accept your offer", "Arrange finances", "Complete the visa process", "Arrange accommodation"] },
  { when: "Before travel", items: ["Student visa in hand", "Accommodation confirmed", "Travel booked", "Insurance arranged", "Financial planning done"] },
];

/* ─── Costs (indicative planning ranges only) ─── */
const TUITION_RANGES = [
  { level: "Bachelor's", range: "₹50,000 – ₹5,00,000+ per year" },
  { level: "Master's", range: "₹75,000 – ₹6,00,000+ per year" },
  { level: "MBA", range: "₹2,00,000 – ₹15,00,000+ per year" },
  { level: "Engineering", range: "Varies significantly by institution" },
  { level: "Medicine", range: "Varies significantly by institution" },
];

const LIVING_COSTS = ["Accommodation", "Food", "Local transport", "Mobile & internet", "Study materials", "Healthcare", "Personal expenses"];

/* ─── Cities ─── */
const CITIES = [
  { name: "Bengaluru", known: "IT, startups, technology and engineering" },
  { name: "Mumbai", known: "Finance, business, media and management" },
  { name: "Delhi NCR", known: "Universities, government, business and research" },
  { name: "Pune", known: "Education, IT, engineering and student life" },
  { name: "Hyderabad", known: "Technology, pharmaceuticals and business" },
  { name: "Chennai", known: "Engineering, technology and education" },
  { name: "Ahmedabad", known: "Management, business and entrepreneurship" },
];

/* ─── Study in India application steps ─── */
const SII_STEPS = [
  { num: "01", title: "Register", desc: "Create a profile on the Study in India portal where applicable." },
  { num: "02", title: "Explore Courses", desc: "Compare university, course, location, tuition and eligibility." },
  { num: "03", title: "Apply", desc: "Submit applications — the portal allows applying to several participating institutions." },
  { num: "04", title: "Receive Offers", desc: "Participating institutions issue offer letters to eligible applicants." },
  { num: "05", title: "Choose Your Offer", desc: "Select the institution and programme that fits your goals and budget." },
  { num: "06", title: "Student Visa", desc: "Complete the applicable Indian student visa or e-visa process." },
  { num: "07", title: "Travel", desc: "Arrange accommodation, insurance and arrival logistics." },
  { num: "08", title: "Post-Arrival Registration", desc: "Complete immigration registration where required after arriving." },
];

/* ─── Documents ─── */
const DOCUMENTS = [
  "Valid passport", "Academic certificates", "Academic transcripts",
  "Class 10 / 12 equivalent documents", "Bachelor's degree (for postgraduate study)",
  "English-language evidence where required", "Entrance examination results where applicable",
  "Passport photographs", "Admission / offer letter", "Financial documents",
  "Visa documents", "Study in India registration details where applicable",
  "Equivalence certificate where your qualification needs one",
  "Statement of purpose or motivation letter, where the institution asks for one",
  "Letters of recommendation, where the institution asks for them",
  "Medical and health documentation as required by the institution",
  "Proof of accommodation arrangements",
];

/* ─── Careers ─── */
const CAREER_AREAS = [
  { area: "Technology", roles: ["Software Developer", "Data Analyst", "Data Scientist", "AI Engineer", "Cybersecurity Analyst", "Cloud Engineer"] },
  { area: "Finance", roles: ["Financial Analyst", "Risk Analyst", "Accounting", "FinTech", "Investment Research"] },
  { area: "Business", roles: ["Business Analyst", "Marketing", "Operations", "Consulting", "Supply Chain"] },
  { area: "Engineering", roles: ["Mechanical Engineer", "Electrical Engineer", "Civil Engineer", "Electronics Engineer", "Manufacturing"] },
  { area: "Healthcare", roles: ["Healthcare Management", "Pharmacy", "Research", "Allied Health", "Clinical Research"] },
  { area: "Design & Media", roles: ["Product Design", "UX Design", "Communication Design", "Animation", "Media Production"] },
  { area: "Law & Policy", roles: ["Corporate Law", "International Law", "Policy Research", "Compliance"] },
  { area: "Research & Academia", roles: ["PhD Research", "Laboratory Research", "Teaching Assistantship", "Scientific Writing"] },
];

const INTERNSHIP_SECTORS = ["IT", "Software", "Finance", "Consulting", "Engineering", "Healthcare", "Marketing", "Startups", "Research", "Manufacturing", "Media & Design", "Renewable Energy", "Logistics", "EdTech"];

/* ─── Why DD ─── */
const WHY_DD = [
  { icon: Users, title: "Profile-Based Counselling", desc: "We start with your academic background, career goals and preferred field before suggesting a programme." },
  { icon: Compass, title: "Course & University Selection", desc: "Compare Indian institutions against your academic and career objectives, not just rankings." },
  { icon: FileText, title: "Admission Assistance", desc: "Support with documentation and application preparation." },
  { icon: Award, title: "Scholarship Guidance", desc: "Explore institution scholarships and fee-waiver opportunities you may be eligible for." },
  { icon: ClipboardCheck, title: "Visa Guidance", desc: "Understand the applicable student visa process and documentation." },
  { icon: Plane, title: "Pre-Departure Support", desc: "Prepare for accommodation, travel and arrival requirements." },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: "Can international students study in India?", a: "Yes. International students can apply to eligible Indian higher-education institutions and programmes, including through the Study in India programme." },
  { q: "What is Study in India?", a: "Study in India is a Government of India initiative designed to attract international students to Indian higher-education institutions, with a single portal for exploring courses, applying and tracking your application." },
  { q: "How many courses are available through Study in India?", a: "The official portal states that students can explore 24,000+ courses across 1,200+ Indian institutes. Check the portal for current figures." },
  { q: "What courses can international students study in India?", a: "International students can explore engineering, technology, sciences, management, law, arts and humanities, nursing, paramedical fields, hospitality and other disciplines." },
  { q: "What are the best universities in India for international students?", a: "There is no single best institution. Students commonly consider IITs, IIMs, NITs, central and state universities and eligible private universities — the right choice depends on your course. The strongest institution for computer science is often not the strongest for an MBA or for medicine." },
  { q: "Is India affordable for international students?", a: "India can offer relatively cost-effective education, but tuition and living expenses vary significantly by institution, programme and city. Private and specialised programmes can cost considerably more than public institutions." },
  { q: "How much does it cost to study in India?", a: "Cost depends on the course, university, city and study level. Always confirm current fees directly with the institution rather than relying on indicative ranges." },
  { q: "Can international students study engineering in India?", a: "Yes. Engineering is one of India's major higher-education fields, with options including IITs, NITs, IIITs and other institutions." },
  { q: "Can international students study Computer Science in India?", a: "Yes. Computer Science and IT programmes are widely available across Indian universities and technology institutions." },
  { q: "Can international students study an MBA in India?", a: "Yes. International students can apply to eligible management programmes, subject to each institution's admission requirements." },
  { q: "Can international students study medicine in India?", a: "International students can explore eligible medical and healthcare programmes, subject to the applicable institution, regulatory and admission requirements. Medical admission rules in India are strict — verify eligibility before applying." },
  { q: "Do international students need a visa to study in India?", a: "International students generally require the appropriate Indian visa or immigration permission for study, subject to nationality and programme requirements." },
  { q: "What documents are required for an India student visa?", a: "Documents can include a valid passport, admission or offer documentation, academic records, financial evidence and other documents required under the applicable visa process. Requirements vary by nationality." },
  { q: "What is an SII ID?", a: "The Study in India programme issues registered international students a unique Student ID used to track their journey through the programme." },
  { q: "Can international students apply to multiple Indian universities?", a: "Yes. The Study in India platform allows students to submit applications to multiple participating institutions." },
  { q: "Are scholarships available for international students in India?", a: "Yes. Participating institutions may offer scholarships and fee waivers. The Study in India programme states that scholarships are institute-driven rather than provided directly by the programme itself." },
  { q: "How much scholarship can international students get in India?", a: "Some participating institutions offer fee waivers reported to range from 10% to 100%, depending on institutional policy and student merit. Nobody can guarantee you a scholarship." },
  { q: "Can international students work while studying in India?", a: "Do not assume a student visa carries work rights. Whether any employment or internship is permitted depends on your specific visa and immigration conditions, and on institution rules. Verify before accepting any paid work." },
  { q: "What happens after arriving in India?", a: "International students may need to complete immigration registration (e-FRRO/FRRO) within a specified period after arrival — the Study in India portal currently indicates 14 days. Confirm the current requirement at the time you travel." },
  { q: "Which cities are best for international students in India?", a: "Popular education hubs include Bengaluru, Mumbai, Delhi NCR, Pune, Hyderabad, Chennai and Ahmedabad. The right city usually follows your course and institution." },
  { q: "Is India good for international students?", a: "India can be a strong option for students interested in technology, engineering, business, science and medicine, particularly when institution and programme selection are done carefully." },
  { q: "Is India good for Computer Science?", a: "India has a large Computer Science and technology education ecosystem, including IITs, NITs, IIITs and many universities." },
  { q: "Is India good for Data Science?", a: "Data Science, AI, analytics and related programmes are available across Indian universities and institutions." },
  { q: "Is India good for an MBA?", a: "India has a large management education sector, including specialised business schools and university-based MBA programmes." },
  { q: "Can I study in India in English?", a: "Many higher-education programmes, particularly at universities and professional institutions, are taught in English — but the language of instruction depends on the specific programme." },
];

const STUDY_LEVEL_OPTIONS = ["Bachelor's", "Master's", "MBA", "PhD", "Diploma"];
const INSTITUTION_OPTIONS = ["IIT", "NIT", "IIM", "Central University", "State University", "Private University", "Not Sure"];
const CITY_OPTIONS = ["Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Hyderabad", "Chennai", "Ahmedabad", "Not Sure"];

const StudyInIndiaPage = () => {
  const [form, setForm] = useState({
    fullName: "", country: "", mobile: "", email: "", qualification: "", percentage: "",
    course: "", level: "", institutionType: "", city: "", budget: "", scholarship: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hands the enquiry to WhatsApp. Before this, the form discarded it.
    sendLeadToWhatsApp("Study in India", form);
    setFormSubmitted(true);
  };
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const pageUrl = "https://www.dreamdestinationstudyabroad.com/study-in-india";

  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "WebPage", name: SEO.title, description: SEO.description,
      url: pageUrl, inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: "DreamDestination", url: "https://www.dreamdestinationstudyabroad.com" },
      keywords: SEO.keywords.join(", "),
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.dreamdestinationstudyabroad.com/" },
        { "@type": "ListItem", position: 2, name: "Study Destinations", item: "https://www.dreamdestinationstudyabroad.com/countries" },
        { "@type": "ListItem", position: 3, name: "Study in India", item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org", "@type": "Service",
      name: "Study in India Admission Guidance for International Students",
      serviceType: "International student admission consulting",
      description: SEO.description,
      provider: { "@type": "EducationalOrganization", name: "DreamDestination", url: "https://www.dreamdestinationstudyabroad.com", telephone: PHONE },
    },
    {
      "@context": "https://schema.org", "@type": "HowTo",
      name: "How to apply to study in India as an international student",
      step: SII_STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc })),
    },
  ];

  const inputCls = "w-full text-sm p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-colors";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-emerald-500/20 selection:text-emerald-600">
      <SEOHead title={SEO.title} description={SEO.description} canonicalUrl={SEO.canonicalUrl} keywords={SEO.keywords} jsonLd={jsonLd} />
      <Header />

      <main className="flex-1 pt-20">
        {/* ═══ STICKY SUB-HEADER NAV ═══ */}
        {/*
          Same in-page nav every other destination page carries. top-[73px] parks
          it directly under the fixed site header — do not add margin or extra
          padding here, the parent <main> already clears the header.
          Every href below must match a section id further down this file.
        */}
        <div className="sticky top-[73px] z-40 bg-background/90 backdrop-blur-md border-b text-xs py-2.5 hidden md:block shadow-sm">
          <div className="container mx-auto px-4 flex items-center justify-between overflow-x-auto whitespace-nowrap gap-6 no-scrollbar">
            <span className="font-bold text-primary flex items-center gap-1.5 shrink-0">
              <span>🇮🇳</span> Study in India
            </span>
            <div className="flex items-center gap-5 text-muted-foreground font-medium">
              <a href="#at-a-glance" className="hover:text-primary transition-colors">At a Glance</a>
              <a href="#why-india" className="hover:text-primary transition-colors">Why India</a>
              <a href="#institutions" className="hover:text-primary transition-colors">Institutes</a>
              <a href="#courses" className="hover:text-primary transition-colors">Courses</a>
              <a href="#intakes" className="hover:text-primary transition-colors">Intakes</a>
              <a href="#cost" className="hover:text-primary transition-colors">Cost</a>
              <a href="#scholarships" className="hover:text-primary transition-colors">Scholarships</a>
              <a href="#student-visa" className="hover:text-primary transition-colors">Visa</a>
              <a href="#cities" className="hover:text-primary transition-colors">Cities</a>
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

        {/* ═══ HERO ═══ */}
        {/*
          Was a bespoke light-theme hero with a 🇮🇳 emoji standing in for artwork
          and its own breadcrumb bar above it. Now the same CountryHeroBanner
          every other destination uses, so this page can serve as an ad landing
          page with the rest of them.
        */}
        <CountryHeroBanner
          breadcrumb={[{ label: "Home", to: "/" }, { label: "Countries", to: "/countries" }, { label: "Study in India" }]}
          countryName="India"
          flag="🇮🇳"
          heading="Study in India for International Students"
          subheading="For International Students · Updated for 2026"
          badgeText="Study in India - DreamDestination Official Guide"
          description="Find the right university, course and career path in one of the world's largest higher-education systems — across engineering, technology, management, sciences, medicine, humanities, law and design."
          /*
           * This page was passing neither `valueProposition` nor `stats`, which
           * every other destination page does — which is why its hero had a
           * noticeably emptier left-hand column than the UK, USA or Germany
           * pages sitting beside it in the navigation.
           *
           * Both values below are drawn from figures ALREADY ON THIS PAGE, so
           * there is nothing new to verify and nothing that can drift out of
           * step with the sections further down:
           *   institutes  → the Study in India portal figure cited in "India at a Glance"
           *   tuition     → the TUITION_RANGES planning table
           *   visa route  → the visa section
           *
           * The third tile renders under the label "Work Permit". India has no
           * automatic post-study stay-back for international students, and this
           * page's own FAQ says plainly "do not assume a student visa carries
           * work rights". So the tile says exactly that rather than implying a
           * permit exists — a hero stat that contradicts the FAQ 600 lines below
           * it is worse than no stat at all.
           */
          valueProposition="One counsellor for the whole route — shortlisting institutions, the application, fees and funding, the student visa file and your first weeks after landing."
          stats={{
            universities: "1,200+ Institutes",
            avgCost: "₹50,000 – ₹6,00,000/yr",
            workPermit: "Check your visa conditions",
            visaSuccessRate: "Student Visa (S)",
          }}
          cta1Text="Explore My Study Options in India"
          cta1Href="#lead-form"
          cta2Text="Talk to an India Counsellor"
          cta2Href={`tel:${PHONE}`}
        />

        {/* ═══ INTRO ═══ */}
        <section className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-5">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">More Than Picking a University</h2>
              <p className="text-muted-foreground leading-relaxed">
                Choosing where to study is a decision that shapes far more than the next few years. Which institution
                suits your profile? Which course fits your goals? What will tuition and living costs actually come to?
                Are scholarships available to you? What are the admission criteria, and which visa will you need?
              </p>
              <p className="text-muted-foreground leading-relaxed">
                DreamDestination helps international students understand their options in India and work through the
                admission process with personalised online guidance — from shortlisting institutions to preparing your
                visa documentation.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ AT A GLANCE ═══ */}
        <section id="at-a-glance" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">India at a Glance</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              The official Study in India portal currently lists 24,000+ courses across 1,200+ Indian institutes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {AT_A_GLANCE.map(item => (
                <div key={item.label} className="bg-card border rounded-2xl p-5 shadow-soft">
                  <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide mb-1.5">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHY INDIA ═══ */}
        <section id="why-india" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Why Study in India?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {WHY_INDIA.map(w => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-base font-extrabold mb-2 group-hover:text-emerald-600 transition-colors">{w.title}</h3>
                    <p className="text-sm text-muted-foreground">{w.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ WHO SHOULD CONSIDER ═══ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Is India Right for You?</h2>
              <p className="text-center text-muted-foreground mb-10">India may suit you if you:</p>
              <div className="space-y-2.5 mb-12">
                {WHO_SHOULD.map(w => (
                  <div key={w} className="flex items-start gap-3 p-3 bg-muted/60 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{w}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-extrabold text-center mb-5">India Is Particularly Strong For</h3>
              <div className="flex flex-wrap justify-center gap-2.5">
                {STRONG_FIELDS.map(f => (
                  <span key={f} className="px-4 py-2 rounded-xl bg-card border text-xs font-semibold shadow-soft">{f}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ INSTITUTION TYPES ═══ */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Types of Institutions in India</h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">
              India has several categories of higher-education institution, each with different strengths.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {INSTITUTION_TYPES.map(t => {
                const Icon = t.icon;
                return (
                  <div key={t.name} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-base font-extrabold">{t.name}</h3>
                    <p className="text-xs text-emerald-600 font-semibold mb-3">{t.full}</p>
                    <ul className="space-y-1.5">
                      {t.areas.map(a => (
                        <li key={a} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />{a}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="max-w-4xl mx-auto mt-8 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
              <p className="text-sm font-bold text-emerald-600 mb-2">Before you apply, always verify</p>
              <p className="text-sm text-muted-foreground">
                Institution recognition · Programme · Degree awarded · Accreditation · Admission eligibility.
                Indian institutions are commonly assessed on NIRF ranking, NAAC grade and Institution of
                National Importance or Institution of Eminence status.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ INSTITUTIONS ═══ */}
        <section id="institutions" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Universities & Institutions to Explore</h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">
              This is not a ranking. The right institution depends entirely on your course — the strongest place for
              computer science is often not the strongest for an MBA, medicine or the humanities.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {INSTITUTIONS.map(group => (
                <div key={group.group} className="bg-card border rounded-2xl p-6 shadow-soft">
                  <h3 className="text-sm font-extrabold mb-4">{group.group}</h3>
                  <ul className="space-y-2">
                    {group.items.map(i => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-1" />{i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ COURSES ═══ */}
        <section id="courses" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Popular Courses for International Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {COURSE_GROUPS.map(g => {
                const Icon = g.icon;
                return (
                  <div key={g.area} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant transition-all">
                    <div className="flex items-center gap-2.5 mb-3">
                      <Icon className="w-5 h-5 text-emerald-600 shrink-0" />
                      <h3 className="font-extrabold text-sm">{g.area}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map(i => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-muted/60 text-[11px] font-medium">{i}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ STUDY LEVELS ═══ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Study Levels in Detail</h2>
            <div className="max-w-5xl mx-auto space-y-6">
              {STUDY_LEVELS.map(level => {
                const Icon = level.icon;
                return (
                  <article key={level.title} className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-elegant transition-all duration-300">
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="shrink-0 w-13 h-13 p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-elegant">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-extrabold mb-1">{level.title}</h3>
                        <p className="text-sm font-semibold text-emerald-600 mb-3">{level.subtitle}</p>
                        <p className="text-sm text-muted-foreground mb-4">{level.intro}</p>
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">{level.checkTitle}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {level.check.map(c => (
                            <div key={c} className="flex items-start gap-2 p-2 bg-muted/60 rounded-lg text-xs font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span>{c}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ INTAKES & TIMELINE ═══ */}
        <section id="intakes" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Intakes & When to Start Planning</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Most Indian academic years begin around <strong>July–August</strong>. Some universities and private
                institutions also offer a January intake, rolling admissions or programme-specific cycles — always
                confirm the actual dates for your course and institution.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {TIMELINE.map(t => (
                  <div key={t.when} className="bg-card border rounded-2xl p-5 shadow-soft">
                    <div className="flex items-center gap-2 mb-3">
                      <CalendarClock className="w-4 h-4 text-emerald-600 shrink-0" />
                      <h3 className="font-extrabold text-xs">{t.when}</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {t.items.map(i => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />{i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ COSTS ═══ */}
        <section id="cost" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Cost of Studying in India</h2>
              <p className="text-center text-muted-foreground mb-10">
                Costs depend on institution, course, study level and city.
              </p>

              <div className="overflow-x-auto rounded-2xl border shadow-soft mb-4">
                <table className="w-full text-sm min-w-[420px]">
                  <thead className="bg-muted/60">
                    <tr>
                      <th className="text-left font-bold p-4">Study Level</th>
                      <th className="text-left font-bold p-4">Indicative Annual Tuition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TUITION_RANGES.map(r => (
                      <tr key={r.level} className="border-t">
                        <td className="p-4 font-semibold">{r.level}</td>
                        <td className="p-4 text-muted-foreground">{r.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground italic mb-14">
                These are broad planning ranges only. Private institutions and specialised programmes can cost
                considerably more. Always confirm current fees directly with the institution.
              </p>

              <h3 className="text-xl font-extrabold text-center mb-3">Cost of Living</h3>
              <p className="text-center text-sm text-muted-foreground mb-8">
                Living costs are higher in major metros and vary considerably with lifestyle.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {LIVING_COSTS.map(c => (
                  <div key={c} className="flex items-center gap-2 p-3 bg-muted/60 rounded-xl text-xs font-medium">
                    <Wallet className="w-3.5 h-3.5 text-emerald-500 shrink-0" /><span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SCHOLARSHIPS ═══ */}
        <section id="scholarships" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Scholarships for International Students</h2>
              <p className="text-center text-muted-foreground mb-10">Funding can come from several directions.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {["Universities", "Government programmes", "ICCR scholarships", "Institution-specific awards", "Fee waivers", "External organisations"].map(s => (
                  <div key={s} className="flex items-center gap-2 p-3 bg-card border rounded-xl text-xs font-medium shadow-soft">
                    <Award className="w-3.5 h-3.5 text-emerald-500 shrink-0" /><span>{s}</span>
                  </div>
                ))}
              </div>
              <div className="bg-card border rounded-2xl p-6 shadow-soft">
                <p className="text-sm text-muted-foreground mb-3">
                  The Study in India programme states that scholarships are <strong>institute-driven</strong> rather
                  than awarded by the programme itself. Participating institutions may offer fee waivers reported to
                  range from 10% to 100%, depending on institutional policy and academic merit.
                </p>
                <p className="text-sm font-semibold text-emerald-600">
                  Eligibility is decided by the institution or scholarship provider. We will never promise you a
                  “guaranteed scholarship” — no consultant can.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ ADMISSION REQUIREMENTS ═══ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Admission Requirements</h2>
              <p className="text-center text-muted-foreground mb-10">
                Requirements vary by university, course, your qualification, your country and study level.
                International students are commonly asked for:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {DOCUMENTS.map(d => (
                  <div key={d} className="flex items-start gap-2 p-3 bg-muted/60 rounded-xl text-xs font-medium">
                    <FileText className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span>{d}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic mt-6 text-center">
                Not every Indian institution applies the same eligibility criteria — check each one individually.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ STUDY IN INDIA PROGRAMME ═══ */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">The Study in India Programme</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                Study in India (SII) is a Government of India initiative to bring international students to Indian
                higher-education institutions. Its portal acts as a single point for registering, exploring courses,
                applying to institutions, receiving offers, completing visa paperwork and handling post-arrival
                registration. Registered students receive a unique SII Student ID.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SII_STEPS.map(s => (
                  <div key={s.num} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-bold text-xs mb-3">{s.num}</span>
                    <h3 className="font-bold text-sm mb-1">{s.title}</h3>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ VISA ═══ */}
        <section id="student-visa" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">India Student Visa</h2>
              <p className="text-center text-muted-foreground mb-10">
                International students need the appropriate Indian visa or immigration permission to study in India.
                The exact process depends on your nationality, course, institution, study duration and the immigration
                rules in force at the time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border rounded-2xl p-6 shadow-soft">
                  <h3 className="font-extrabold text-sm mb-3">Documents commonly required</h3>
                  <ul className="space-y-2">
                    {["Valid passport", "Institution offer letter", "Study in India ID where applicable", "Passport photographs", "Academic documents", "Financial documents", "Completed visa application", "Any other documents immigration requests"].map(d => (
                      <li key={d} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />{d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card border rounded-2xl p-6 shadow-soft">
                  <h3 className="font-extrabold text-sm mb-3">After you arrive</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    International students may need to complete immigration registration after arriving in India.
                    The Study in India portal currently indicates that students arriving through the programme must
                    register with e-FRRO / FRRO / FRRP within <strong>14 days</strong>.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Immigration procedures change — confirm the current requirement at the time you travel.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 text-center">
                <p className="text-sm text-muted-foreground">
                  Always verify current requirements through official Indian immigration and visa channels before travelling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ WORK, INTERNSHIPS, CAREERS ═══ */}
        <section id="careers" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">Working, Internships & Careers</h2>

              <div className="bg-card border-2 border-amber-500/30 rounded-2xl p-6 shadow-soft mb-10">
                <h3 className="font-extrabold text-sm mb-2">Can international students work while studying in India?</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Do not assume that holding a student visa gives you the right to work. Whether any employment or
                  internship is permitted depends on the conditions attached to your specific visa and immigration
                  status, and on your institution's rules.
                </p>
                <p className="text-sm font-semibold text-amber-600">
                  Verify what is permitted before accepting any paid work.
                </p>
              </div>

              <h3 className="text-lg font-extrabold mb-4">Internship Sectors</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {INTERNSHIP_SECTORS.map(s => (
                  <span key={s} className="px-3.5 py-2 rounded-xl bg-card border text-xs font-semibold shadow-soft">{s}</span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mb-12">
                Before choosing a university, check its internship opportunities, industry connections, career
                services, practical projects and placement support.
              </p>

              <h3 className="text-lg font-extrabold mb-5">Career Areas After Studying in India</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {CAREER_AREAS.map(c => (
                  <div key={c.area} className="bg-card border rounded-2xl p-5 shadow-soft">
                    <h4 className="font-extrabold text-sm mb-3 text-emerald-600">{c.area}</h4>
                    <ul className="space-y-1.5">
                      {c.roles.map(r => (
                        <li key={r} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic mt-6">
                Career outcomes depend on your qualification, skills, experience, employer demand and the work
                authorisation available to you. No institution or consultant can guarantee employment.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ CITIES ═══ */}
        <section id="cities" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Popular Student Cities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {CITIES.map(c => (
                <div key={c.name} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h3 className="font-extrabold text-sm">{c.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.known}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHY DD ═══ */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Why Choose DreamDestination?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {WHY_DD.map(w => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-base font-extrabold mb-2 group-hover:text-emerald-600 transition-colors">{w.title}</h3>
                    <p className="text-sm text-muted-foreground">{w.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ LEAD FORM ═══ */}
        <section id="lead-form" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-card border-2 border-emerald-500/30 rounded-3xl p-6 md:p-10 shadow-elegant">
              <div className="text-center mb-8 space-y-2">
                <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest">Free Assessment</span>
                <h2 className="text-2xl md:text-3xl font-extrabold">
                  Find the Right <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-emerald-600">Study Option in India</span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  Share your details and a counsellor will map out suitable institutions and programmes for your profile.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Request Received</h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you, {form.fullName || "Student"}. Our counsellor will reach out within 24 hours.
                  </p>
                  <button type="button" onClick={() => setFormSubmitted(false)} className="px-6 py-2.5 rounded-xl border border-emerald-500/20 text-emerald-600 font-semibold hover:bg-emerald-500/10 transition-colors text-xs">Submit Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="in-name">Full Name *</label><input id="in-name" type="text" required placeholder="Your Name" value={form.fullName} onChange={set("fullName")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="in-country">Country of Residence *</label><input id="in-country" type="text" required placeholder="e.g. Nepal, Nigeria, UAE" value={form.country} onChange={set("country")} className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="in-mobile">Mobile / WhatsApp *</label><input id="in-mobile" type="tel" required placeholder="Include country code" value={form.mobile} onChange={set("mobile")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="in-email">Email *</label><input id="in-email" type="email" required placeholder="email@example.com" value={form.email} onChange={set("email")} className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="in-qual">Highest Qualification</label><input id="in-qual" type="text" placeholder="e.g. High School, Bachelor's" value={form.qualification} onChange={set("qualification")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="in-pct">Percentage / GPA</label><input id="in-pct" type="text" placeholder="e.g. 82% or 3.4 GPA" value={form.percentage} onChange={set("percentage")} className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="in-course">Preferred Course</label><input id="in-course" type="text" placeholder="e.g. Computer Science, MBA" value={form.course} onChange={set("course")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="in-level">Preferred Study Level</label><select id="in-level" value={form.level} onChange={set("level")} className={inputCls}><option value="">Select</option>{STUDY_LEVEL_OPTIONS.map(o => <option key={o}>{o}</option>)}</select></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="in-inst">Preferred Institution Type</label><select id="in-inst" value={form.institutionType} onChange={set("institutionType")} className={inputCls}><option value="">Select</option>{INSTITUTION_OPTIONS.map(o => <option key={o}>{o}</option>)}</select></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="in-city">Preferred City</label><select id="in-city" value={form.city} onChange={set("city")} className={inputCls}><option value="">Select</option>{CITY_OPTIONS.map(o => <option key={o}>{o}</option>)}</select></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="in-budget">Approximate Annual Budget</label><input id="in-budget" type="text" placeholder="e.g. ₹3,00,000 / USD 4,000" value={form.budget} onChange={set("budget")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="in-schol">Need Scholarship Guidance?</label><select id="in-schol" value={form.scholarship} onChange={set("scholarship")} className={inputCls}><option value="">Select</option><option>Yes</option><option>No</option><option>Not Sure</option></select></div>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:opacity-90 text-white font-bold py-4 rounded-xl text-base shadow-elegant transition-all">
                    Check My India Study Options
                  </button>
                  <p className="text-[11px] text-center text-muted-foreground">
                    We use your details only to contact you about studying in India.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ═══ FAQS ═══ */}
        <section id="faqs" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
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

        {/* ═══ FINAL CTA ═══ */}
        <section className="py-16 bg-gradient-to-r from-orange-500 via-emerald-600 to-emerald-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Study in India?</h2>
              <p className="text-lg opacity-90 mb-8">Get free guidance on institutions, courses, scholarships and the student visa process.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-emerald-700 font-bold rounded-xl shadow-lg transition-all"><Phone className="w-5 h-5" />Call Now</a>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-smooth"><MessageCircle className="w-5 h-5" />WhatsApp Us</a>
              </div>
            </div>
          </div>
        </section>
        <RelatedLinks currentPath="/study-in-india" accent="text-emerald-600" />
      </main>

      <Footer />
    </div>
  );
};

export default StudyInIndiaPage;
