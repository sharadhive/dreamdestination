import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ArrowRight, ArrowDown, Phone, MessageCircle, CheckCircle2, Sparkles,
  GraduationCap, Briefcase, Target, BookOpen, Globe, Users, TrendingUp, DollarSign,
  Award, Lightbulb, Map, Compass, BarChart3, Brain, Code, Palette, Cog, Building2,
  UserCheck, FileText, HeartHandshake, Shield, Layers
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedLinks from "@/components/RelatedLinks";
import SEOHead from "@/components/SEOHead";

import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";
import { SITE, CONTACT } from "@/config/site";
/* ─── SEO ─── */
const SEO = {
  title: "Career Counselling for Study Abroad",
  description: "Get career counselling for studying abroad. Choose the right course, country and university based on your academic profile, goals and budget.",
  canonicalUrl: "https://www.dreamdestinationstudyabroad.com/career-counselling",
  keywords: ["career counselling for study abroad","study abroad career counselling","overseas career counselling","career counselling for Indian students","study abroad counselling","career counselling for abroad studies","foreign education career counselling","overseas education counselling","course selection counselling","university selection counselling","study abroad consultant","career guidance for students","career counselling after 12th","career counselling after graduation"],
};

/* ─── Flow Data ─── */
const DECISION_FLOW = ["Interests","Skills","Academic Background","Career Goal","Course","Country","University","Career Opportunities"];
const CAREER_ROADMAP = [
  "Understand Your Profile","Identify Career Direction","Choose Course","Select Country",
  "Shortlist Universities","Build Skills & Experience","Study Abroad","Internship / Industry Exposure","Explore Career Opportunities"
];

/* ─── Process Steps ─── */
const PROCESS_STEPS = [
  { num: "01", title: "Understand Your Profile", subtitle: "Begin with Your Story", description: "Before making a recommendation, we understand your current situation and the course/university you are interested in.", items: ["Academic background","Percentage/CGPA","Subjects studied","Skills & Interests","Projects & Internships","Work experience","Career goals","Preferred countries","Financial considerations","Intended intake"] },
  { num: "02", title: "Career Direction Planning", subtitle: "What's Your Plan For Your Career?", description: "We work with you to brainstorm possible career directions according to your profile.", examples: [{ from: "Engineering Graduate", to: "Technology / AI / Data / Management" },{ from: "Commerce Graduate", to: "Finance / Business Analytics / Accounting / Management" },{ from: "Computer Science Graduate", to: "Software / AI / Data Science / Cybersecurity" },{ from: "Design Student", to: "UX / Product Design / Architecture / Creative Fields" }] },
  { num: "03", title: "Course Selection", subtitle: "Pick a Course That's Relevant for Your Career", description: "We help you compare programs instead of chasing popularity.", items: ["Curriculum","Specializations","Academic requirements","Duration & Tuition fees","Skills developed","Internship opportunities","Industry relevance","Career direction"] },
  { num: "04", title: "Career Change Guidance", subtitle: "Thinking About a Career Change?", description: "Career transitions should be carefully planned based on your full profile.", examples: [{ from: "Mechanical Engineering", to: "Data Science" },{ from: "Commerce", to: "Business Analytics" },{ from: "IT", to: "Cybersecurity" },{ from: "Engineering", to: "MBA" },{ from: "Design", to: "Product Design" }] },
  { num: "05", title: "Country Selection", subtitle: "Which Country Suits Your Career Plan?", description: "We help you compare destinations across multiple dimensions.", categories: [{ label: "Education", points: ["University quality","Course availability","Teaching style","Research opportunities"] },{ label: "Career", points: ["Relevant industries","Internship opportunities","Graduate pathways","Local employment"] },{ label: "Financial", points: ["Tuition","Living costs","Scholarships","Education loan needs"] },{ label: "Lifestyle", points: ["Location & Culture","Language","Student environment","Safety"] }] },
  { num: "06", title: "University Selection", subtitle: "Discover Universities Where You Belong", description: "Choosing a university should not rely solely on world rankings.", items: ["Program curriculum","University reputation","Course specialization","Location & Tuition fees","Entry requirements","Internship & Research opportunities","Career relevance","Scholarship availability"] },
  { num: "07", title: "University Shortlisting", subtitle: "Create a Balanced University List", description: "We help you create a balanced shortlist in three categories.", tiers: [{ name: "Ambitious", color: "amber", desc: "Competitive admission based on your profile" },{ name: "Target", color: "emerald", desc: "Strong match with your academic profile" },{ name: "Alternative", color: "blue", desc: "Appropriate academic and financial options" }] },
  { num: "08", title: "Career & Course Fit Assessment", subtitle: "Does Your Course Align With Your Career Goal?", description: "We help you ask the right questions before applying.", items: ["Does the course align with my career goals?","Is my previous education appropriate?","What skills will I develop?","Are relevant electives available?","Are internships available?","What jobs could this qualification lead to?","Is it the right price for my plans?"] },
];

/* ─── Specialised Counselling Sections ─── */
const SPECIALISED = [
  { icon: GraduationCap, title: "Bachelor's Career Counselling", subtitle: "Career Guidance After Class 12", description: "Your choice of bachelor's degree may impact your future education and career.", paths: [{ area: "Technology", items: ["Computer Science","AI","Data Science","Cybersecurity"] },{ area: "Engineering", items: ["Mechanical","Civil","Electrical","Electronics"] },{ area: "Business", items: ["Business Management","Finance","Economics","Marketing"] },{ area: "Creative Fields", items: ["Architecture","Fashion","Design","Media"] },{ area: "Life Sciences", items: ["Biotechnology","Biomedical Sciences","Health Sciences"] }] },
  { icon: BookOpen, title: "Master's Career Counselling", subtitle: "Select Your Master's Purposefully", description: "A master's should stem from a clear reason and career direction.", reasons: ["Deepen technical knowledge","Focus on a specialization","Build research experience","Develop management skills","Make a career change","Secure overseas experience"] },
  { icon: Briefcase, title: "MBA & Management Counselling", subtitle: "Should You Go For an MBA?", description: "An MBA isn't necessarily the right option for every graduate.", areas: ["Finance","Marketing","Business Analytics","International Business","Entrepreneurship","Supply Chain","Strategy","Technology Management"], considerations: ["Academic background","Work experience","Career goals","Management interests","Specialization","Program format","Tuition cost","Expected career direction"] },
  { icon: Code, title: "STEM Career Counselling", subtitle: "Technology & Engineering Career Exploration", description: "If you're considering STEM, we help you explore specific avenues.", paths: [{ area: "Data", items: ["Data Analytics","Business Analytics","Data Science"] },{ area: "AI", items: ["Artificial Intelligence","Machine Learning","Computing"] },{ area: "Cybersecurity", items: ["IT/CS → Cybersecurity","Security Engineering"] },{ area: "Engineering", items: ["Degree → Specialization","Industry Role"] }] },
  { icon: TrendingUp, title: "Working Professionals", subtitle: "Empowering Your Next Career Step", description: "We consider your current role, experience, industry, skills, and career progression to find the right study abroad path.", considerations: ["Current role & experience","Industry & Skills","Career progression","Desired direction","Need for specialization","Interest in management"] },
  { icon: Layers, title: "Career Switchers", subtitle: "Important Considerations When Redirecting Goals", description: "A career change requires careful assessment before selecting a new program.", steps: [{ label: "Current Profile", desc: "What's your background?" },{ label: "Transferable Skills", desc: "What can you take to a new field?" },{ label: "Skill Gap", desc: "What do you need to learn?" },{ label: "Academic Requirement", desc: "What's needed for the new industry?" },{ label: "New Career Path", desc: "What opportunities will this create?" }] },
];

/* ─── Integration Sections ─── */
const PLANNING_INTEGRATIONS = [
  { icon: DollarSign, title: "Career + Budget Planning", description: "Your dream course should align with your budget.", comparisons: ["Course","University","Tuition","Living Cost","Scholarships","Education Loan Requirement","Career Direction"] },
  { icon: Award, title: "Career + Scholarship Planning", description: "Explore funding sources alongside course selection.", factors: ["Academic performance","Country","University","Program","Research area","Financial circumstances"] },
  { icon: Building2, title: "Career + Education Loan Planning", description: "Know the financial commitment before applying.", explains: ["Estimated tuition","Living costs","Available funds","Scholarship possibilities","Potential education loan requirement"] },
];

/* ─── Skill Gap ─── */
const SKILL_AREAS = [
  { area: "Technology", skills: ["Programming","Data tools","Cloud","AI/ML","Cybersecurity"], icon: Code },
  { area: "Business", skills: ["Analytics","Communication","Leadership","Financial modelling"], icon: BarChart3 },
  { area: "Design", skills: ["Portfolio","Software skills","Creative projects","Industry experience"], icon: Palette },
  { area: "Engineering", skills: ["Technical software","Projects","Certifications","Practical experience"], icon: Cog },
];

/* ─── Academic Pathways ─── */
const ACADEMIC_PATHS = [
  { from: "B.Tech / BE", to: "Engineering / Data / AI / CS / Management" },
  { from: "BCA / BSc CS", to: "Software / Data Science / AI / Cybersecurity" },
  { from: "B.Com / BBA", to: "Finance / Business Analytics / Management / MBA" },
  { from: "BA", to: "Social Sciences / Media / Public Policy / Management" },
  { from: "Design Background", to: "Architecture / Fashion / Product / UX / Creative" },
];

/* ─── Who Benefits ─── */
const WHO_BENEFITS = [
  { icon: GraduationCap, title: "Class 12 Students", desc: "Confused about which bachelor's course/country?" },
  { icon: BookOpen, title: "Final-Year Students", desc: "Exploring master's degree options?" },
  { icon: Target, title: "Graduates", desc: "Looking for the right postgraduate specialization?" },
  { icon: Briefcase, title: "Working Professionals", desc: "Looking for MBA or international career options?" },
  { icon: Compass, title: "Career Switchers", desc: "Interested in a new career direction?" },
  { icon: Lightbulb, title: "Undecided Students", desc: "Many interests but unsure which way to go?" },
];

/* ─── 8-Step Process ─── */
const EIGHT_STEPS = [
  { num: "01", title: "Profile Assessment", desc: "Know your academic and career background." },
  { num: "02", title: "Interest & Goal Discussion", desc: "Clarify your future career goals." },
  { num: "03", title: "Career Direction", desc: "Investigate suitable career paths." },
  { num: "04", title: "Course Selection", desc: "Brainstorm programs relevant to your goals." },
  { num: "05", title: "Country Comparison", desc: "Compare destinations according to needs." },
  { num: "06", title: "University Shortlisting", desc: "Create a well-rounded list of options." },
  { num: "07", title: "Financial Planning", desc: "Discuss tuition, scholarships, and financial aid." },
  { num: "08", title: "Admission Roadmap", desc: "Step from counselling to action." },
];

/* ─── Why DD ─── */
const WHY_DD = [
  { icon: UserCheck, title: "Profile-Based Counselling", desc: "Recommendations based on your academic and professional background." },
  { icon: Target, title: "Career-Focused Approach", desc: "We relate educational choices to your career intentions." },
  { icon: BookOpen, title: "Course Comparison", desc: "Research the difference between relevant programs before applying." },
  { icon: Globe, title: "Country Comparison", desc: "Compare education, cost, career market, and lifestyle." },
  { icon: Layers, title: "University Shortlisting", desc: "Build balanced lists rather than random applications." },
  { icon: DollarSign, title: "Financial Awareness", desc: "Consider tuition, living costs, loan needs, and scholarships." },
  { icon: HeartHandshake, title: "End-to-End Support", desc: "Link counselling to admission, finance, visa, and pre-departure." },
  { icon: Shield, title: "Honest Guidance", desc: "No premium university listings. We start with your goal." },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: "What is career counselling for studying abroad?", a: "Career counselling for studying abroad helps students connect their academic background, interests and career goals with suitable courses, countries and universities." },
  { q: "Why should I take career counselling before studying abroad?", a: "It can help you make more informed decisions about your course, destination, university, budget and potential career direction before making a major educational investment." },
  { q: "Can a counsellor help me choose a course?", a: "Yes. A counsellor can help you compare suitable courses based on your academic background, interests, skills and career goals." },
  { q: "Can you help me choose between two different courses?", a: "Yes. We can help you compare factors such as curriculum, eligibility, duration, cost, skills developed and potential career relevance." },
  { q: "Can you help me choose the right country?", a: "Yes. Country selection can be evaluated based on your course, academic profile, budget, career goals and other personal preferences." },
  { q: "I don't know what career I want. Can you help?", a: "Yes. Career counselling can help you explore possible academic and career directions based on your interests, education, skills and goals." },
  { q: "Can I change my career through studying abroad?", a: "Potentially. Some programmes can support a career transition, but you should carefully evaluate prerequisites, curriculum and the skills required for the target field." },
  { q: "Can engineering students switch to Data Science?", a: "Depending on the programme requirements and your academic background, some engineering graduates may be eligible for Data Science or related programmes." },
  { q: "Can commerce students study Business Analytics abroad?", a: "Potentially, depending on the university's prerequisites, quantitative background and programme-specific eligibility requirements." },
  { q: "Is an MBA suitable for fresh graduates?", a: "Some MBA programmes accept fresh graduates, while others prefer or require professional experience. Requirements vary by institution." },
  { q: "Can working professionals get career counselling?", a: "Yes. Working professionals can receive guidance based on their current role, experience, career goals and desired study pathway." },
  { q: "Do you provide career counselling for Class 12 students?", a: "Yes. We can help Class 12 students explore Bachelor's courses, countries and universities based on their interests and academic profile." },
  { q: "Do you guarantee a job after studying abroad?", a: "No. Career counselling can help you make informed academic decisions, but employment depends on your qualifications, skills, experience, employer requirements and labour-market conditions." },
  { q: "Do you guarantee a particular salary?", a: "No. Salary outcomes vary according to industry, location, employer, experience, skills and other factors." },
  { q: "Does studying at a top-ranked university guarantee a successful career?", a: "No. Rankings are only one factor. Course relevance, skills, experience, internships and individual career development also matter." },
  { q: "Can career counselling help with education-loan planning?", a: "Yes. Your intended course and university can be considered alongside tuition, living expenses, scholarships and potential education-loan requirements." },
  { q: "Can career counselling help me choose a university within my budget?", a: "Yes. Budget can be included as a key factor when comparing courses, universities and destinations." },
  { q: "Is career counselling free?", a: "DreamDestination offers a free initial career/study-abroad consultation." },
];

const COUNTRIES = ["UK","USA","Canada","Australia","Germany","Ireland","France","Italy","Netherlands","Switzerland","Spain","New Zealand","Singapore","Malaysia","Dubai (UAE)","Mauritius"];

/* ═══════════════════════════════════════════════════════════════ */

const CareerCounsellingPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({ fullName: "", mobile: "", email: "", city: "", ageGroup: "", qualification: "", percentage: "", gradYear: "", workExp: "", careerField: "", country: "", course: "", intake: "", budget: "" });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hands the enquiry to WhatsApp. Before this line the form discarded it.
    sendLeadToWhatsApp("Career Counselling", form);
    setFormSubmitted(true);
  };
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const pageUrl = `${SITE.domain}/career-counselling`;

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebPage", name: SEO.title, description: SEO.description, url: pageUrl, inLanguage: "en-IN", isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.domain }, keywords: SEO.keywords.join(", ") },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
      { "@type": "ListItem", position: 2, name: "Career Counselling", item: pageUrl },
    ] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "Service", name: "Career Counselling for Study Abroad", serviceType: "Study abroad career counselling", description: SEO.description, areaServed: { "@type": "Country", name: "India" }, provider: { "@type": "EducationalOrganization", name: SITE.name, url: SITE.domain, telephone: CONTACT.phone } },
    { "@context": "https://schema.org", "@type": "HowTo", name: "8 Steps to a More Informed Study Plan", step: EIGHT_STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc })) },
  ];

  const inputCls = "w-full text-sm p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-colors";
  const selectCls = inputCls;

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
              <span className="text-foreground font-medium">Career Counselling</span>
            </nav>
          </div>
        </div>

        {/* ═══ 1. HERO ═══ */}
        <section className="relative pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-amber-50/60 via-background to-background dark:from-amber-950/10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="container mx-auto px-4 pt-12 md:pt-16">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /><span>Career Counselling for Indian Students</span>
              </div>
              <span className="text-6xl md:text-7xl drop-shadow-lg block">🧭</span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-blue-600">Career Counselling</span> for Study Abroad
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Create a study abroad plan by reflecting on your career goals. Select the right course, country & university for your future.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button size="lg" className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-amber-600/20 text-base w-full sm:w-auto" asChild>
                  <a href="#lead-form"><span>Get Free Career Counselling</span><ArrowRight className="w-5 h-5 ml-2" /></a>
                </Button>
                <Button size="lg" variant="outline" className="border-amber-500/20 hover:bg-amber-500/5 font-semibold px-8 py-6 rounded-xl text-base w-full sm:w-auto" asChild>
                  <a href="tel:+919211818710"><Phone className="w-5 h-5 mr-2 text-amber-600" /><span>Discuss Your Career Goals</span></a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 2. INTRODUCTION ═══ */}
        <section className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-5">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">Your Dreams Are Our First Priority</h2>
              <p className="text-muted-foreground leading-relaxed">Embarking on the adventure of studying abroad is a significant investment in your time, money, and career direction. Deciding on a course just because it's popular, or picking a university based solely on ranking, may not always be the best choice.</p>
              <p className="text-muted-foreground leading-relaxed">Our career counsellors' knowledge about you — your focus and interest in studies, your skills, working experience, budget, and career plans — enables us to help you choose courses and countries that best fit you and find the right university.</p>
              <p className="text-muted-foreground leading-relaxed">From those who have just completed Class 12, to those seeking a master's, working professionals aiming for an MBA, or individuals who want to reconnect with their interest in study abroad — we have a plan to assist you in making a better-informed study abroad decision.</p>
            </div>
          </div>
        </section>

        {/* ═══ 3. WHAT IS CAREER COUNSELLING ═══ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">What Is Career Counselling For Study Abroad?</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">The question isn't just "Where could I go?" — it's "What educational avenue leads to the career I desire?"</p>
              {/* Decision Flow */}
              <div className="flex flex-col items-center gap-0">
                {DECISION_FLOW.map((step, i) => (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`px-6 py-3 rounded-xl text-sm font-bold border-2 transition-all ${i === 0 ? "bg-amber-500 text-white border-amber-500 shadow-lg" : i === DECISION_FLOW.length - 1 ? "bg-emerald-500 text-white border-emerald-500 shadow-lg" : "bg-card border-border hover:border-amber-500/40"}`}>
                      {step}
                    </div>
                    {i < DECISION_FLOW.length - 1 && <ArrowDown className="w-4 h-4 text-amber-500 my-1" />}
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-8">The counselling process allows us to reflect on these decisions together — without making decisions unilaterally.</p>
            </div>
          </div>
        </section>

        {/* ═══ 4. PROCESS STEPS (01-08) ═══ */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">The Career Counselling Process</h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">Our structured 8-step approach ensures every important decision is covered.</p>
            <div className="max-w-5xl mx-auto space-y-8">
              {PROCESS_STEPS.map((step, idx) => (
                <div key={step.num} className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-extrabold text-lg shadow-elegant">{step.num}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-extrabold mb-1">{step.title}</h3>
                      <p className="text-sm font-semibold text-amber-600 mb-3">{step.subtitle}</p>
                      <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

                      {step.items && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {step.items.map(item => (
                            <div key={item} className="flex items-center gap-2 p-2 bg-muted/60 rounded-lg text-xs font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" /><span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.examples && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {step.examples.map(ex => (
                            <div key={ex.from} className="flex items-center gap-2 p-3 bg-muted/60 rounded-xl text-sm">
                              <span className="font-semibold text-foreground">{ex.from}</span>
                              <ArrowRight className="w-4 h-4 text-amber-500 shrink-0" />
                              <span className="text-muted-foreground">{ex.to}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.categories && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {step.categories.map(cat => (
                            <div key={cat.label} className="bg-muted/60 rounded-xl p-4">
                              <h4 className="text-sm font-bold mb-2 text-amber-600">{cat.label}</h4>
                              <ul className="space-y-1.5">
                                {cat.points.map(p => (
                                  <li key={p} className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />{p}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.tiers && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {step.tiers.map(tier => (
                            <div key={tier.name} className={`rounded-xl border-2 p-4 text-center ${tier.color === "amber" ? "border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10" : tier.color === "emerald" ? "border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/10" : "border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/10"}`}>
                              <h4 className="font-bold text-sm mb-1">{tier.name} Options</h4>
                              <p className="text-xs text-muted-foreground">{tier.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 5. SPECIALISED COUNSELLING ═══ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Specialised Career Counselling</h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">Tailored guidance based on your educational stage and career ambitions.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {SPECIALISED.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-extrabold mb-1 group-hover:text-amber-600 transition-colors">{s.title}</h3>
                    <p className="text-xs font-semibold text-amber-600 mb-2">{s.subtitle}</p>
                    <p className="text-sm text-muted-foreground mb-4">{s.description}</p>
                    {s.paths && (
                      <div className="space-y-2">
                        {s.paths.map(p => (
                          <div key={p.area} className="bg-muted/60 rounded-lg p-2.5">
                            <span className="text-xs font-bold text-foreground">{p.area}: </span>
                            <span className="text-xs text-muted-foreground">{p.items.join(" · ")}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {s.reasons && <ul className="space-y-1.5">{s.reasons.map(r => <li key={r} className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />{r}</li>)}</ul>}
                    {s.areas && <div className="flex flex-wrap gap-1.5 mb-3">{s.areas.map(a => <span key={a} className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 text-[10px] font-semibold">{a}</span>)}</div>}
                    {s.considerations && <ul className="space-y-1 mt-2">{s.considerations.map(c => <li key={c} className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-3 h-3 text-amber-500 shrink-0" />{c}</li>)}</ul>}
                    {s.steps && <div className="space-y-2">{s.steps.map((st, j) => <div key={st.label} className="flex items-center gap-3 bg-muted/60 rounded-lg p-2.5"><span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">{j+1}</span><div><span className="text-xs font-bold">{st.label}</span><span className="text-xs text-muted-foreground ml-1">— {st.desc}</span></div></div>)}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 6. PLANNING INTEGRATIONS ═══ */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Career + Financial Planning</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {PLANNING_INTEGRATIONS.map(p => {
                const Icon = p.icon;
                const items = p.comparisons || p.factors || p.explains || [];
                return (
                  <div key={p.title} className="bg-card border rounded-2xl p-6 shadow-soft">
                    <Icon className="w-8 h-8 text-amber-600 mb-4" />
                    <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                    <ul className="space-y-2">{items.map(it => <li key={it} className="flex items-center gap-2 text-xs"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />{it}</li>)}</ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 7. CAREER ROADMAP ═══ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Your Study Abroad Career Roadmap</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">A clear map that guides you beyond just getting an admission letter.</p>
            <div className="max-w-3xl mx-auto flex flex-col items-center gap-0">
              {CAREER_ROADMAP.map((stage, i) => (
                <div key={stage} className="flex flex-col items-center">
                  <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 min-w-[280px] transition-all ${i === 0 ? "bg-amber-500 text-white border-amber-500 shadow-lg" : i === CAREER_ROADMAP.length - 1 ? "bg-emerald-500 text-white border-emerald-500 shadow-lg" : "bg-card border-border hover:border-amber-500/30"}`}>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i === 0 || i === CAREER_ROADMAP.length - 1 ? "bg-white/20 text-white" : "bg-amber-500/10 text-amber-600"}`}>{i + 1}</span>
                    <span className="text-sm font-semibold">{stage}</span>
                  </div>
                  {i < CAREER_ROADMAP.length - 1 && <ArrowDown className="w-4 h-4 text-amber-500 my-1" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 8. SKILL GAP + ACADEMIC PATHWAYS ═══ */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Skill Gap */}
              <div>
                <h2 className="text-2xl font-extrabold mb-2">Skill Gap Identification</h2>
                <p className="text-sm text-muted-foreground mb-6">A degree is only one component of your career profile. We help you understand the wider skills needed.</p>
                <div className="space-y-4">
                  {SKILL_AREAS.map(s => {
                    const Icon = s.icon;
                    return (
                      <div key={s.area} className="bg-card border rounded-xl p-4 shadow-soft">
                        <div className="flex items-center gap-2 mb-2"><Icon className="w-4 h-4 text-amber-600" /><span className="font-bold text-sm">{s.area}</span></div>
                        <div className="flex flex-wrap gap-1.5">{s.skills.map(sk => <span key={sk} className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-semibold">{sk}</span>)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Academic Pathways */}
              <div>
                <h2 className="text-2xl font-extrabold mb-2">Academic Background Pathways</h2>
                <p className="text-sm text-muted-foreground mb-6">Explore suitable progression pathways based on your existing degree.</p>
                <div className="space-y-3">
                  {ACADEMIC_PATHS.map(p => (
                    <div key={p.from} className="bg-card border rounded-xl p-4 shadow-soft flex items-center gap-3">
                      <span className="font-bold text-sm text-foreground shrink-0">{p.from}</span>
                      <ArrowRight className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-sm text-muted-foreground">{p.to}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground mt-4 italic">Eligibility depends on the specific program and institution.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 9. COUNTRIES ═══ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-8">Countries We Cover</h2>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {COUNTRIES.map(c => <span key={c} className="px-4 py-2 rounded-full bg-card border text-sm font-medium hover:border-amber-500/40 hover:bg-amber-500/5 transition-colors cursor-default">{c}</span>)}
            </div>
          </div>
        </section>

        {/* ═══ 10. OUR APPROACH ═══ */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">How We Differ in Career Counselling</h2>
            <p className="text-center text-muted-foreground mb-12">No premium listing of universities. We start with your goal.</p>
            <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2">
              {["Profile","Interests","Career Direction","Course","Country","University","Budget","Application Strategy"].map((s, i, arr) => (
                <div key={s} className="flex items-center gap-2">
                  <span className={`px-4 py-2 rounded-xl text-xs font-bold border ${i === 0 ? "bg-amber-500 text-white border-amber-500" : i === arr.length - 1 ? "bg-emerald-500 text-white border-emerald-500" : "bg-card border-border"}`}>{s}</span>
                  {i < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">Maintaining a long-term goal in the middle of every decision.</p>
          </div>
        </section>

        {/* ═══ 11. WHY DD ═══ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Why Choose DreamDestination?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {WHY_DD.map(w => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group">
                    <Icon className="w-8 h-8 text-amber-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-sm mb-1 group-hover:text-amber-600 transition-colors">{w.title}</h3>
                    <p className="text-xs text-muted-foreground">{w.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 12. WHO BENEFITS ═══ */}
        <section className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Who Can Benefit From Career Counselling?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {WHO_BENEFITS.map(w => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="bg-card border rounded-2xl p-4 text-center shadow-soft hover:shadow-elegant transition-all group">
                    <Icon className="w-8 h-8 text-amber-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-xs mb-1">{w.title}</h3>
                    <p className="text-[10px] text-muted-foreground">{w.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 13. 8 STEPS ═══ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">8 Steps to a More Informed Study Plan</h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">Our career counselling homework gets you from exploration to action.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {EIGHT_STEPS.map(s => (
                <div key={s.num} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-bold text-sm mb-3">{s.num}</span>
                  <h3 className="font-bold text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 14. LEAD FORM ═══ */}
        <section id="lead-form" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-card border-2 border-amber-500/30 rounded-3xl p-6 md:p-10 shadow-elegant">
              <div className="text-center mb-8 space-y-2">
                <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">Free Assessment</span>
                <h2 className="text-2xl md:text-3xl font-extrabold">Get Your Personalised <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-blue-600">Career Roadmap</span></h2>
                <p className="text-xs text-muted-foreground">Fill your details and our career experts will create a customised study abroad plan.</p>
              </div>
              {formSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Assessment Request Received!</h3>
                  <p className="text-sm text-muted-foreground">Thank you, {form.fullName || "Student"}! Our career counsellor will reach out within 24 hours.</p>
                  <button type="button" onClick={() => setFormSubmitted(false)} className="px-6 py-2.5 rounded-xl border border-emerald-500/20 text-emerald-600 font-semibold hover:bg-emerald-500/10 transition-colors text-xs">Submit Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="cc-name">Full Name *</label><input id="cc-name" type="text" required placeholder="Your Name" value={form.fullName} onChange={set("fullName")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="cc-mobile">Mobile *</label><input id="cc-mobile" type="tel" required placeholder="+91 98765 43210" value={form.mobile} onChange={set("mobile")} className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="cc-email">Email *</label><input id="cc-email" type="email" required placeholder="email@example.com" value={form.email} onChange={set("email")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="cc-city">Current City</label><input id="cc-city" type="text" placeholder="Mumbai" value={form.city} onChange={set("city")} className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="cc-age">Age Group</label><select id="cc-age" value={form.ageGroup} onChange={set("ageGroup")} className={selectCls}><option value="">Select</option><option>16-18</option><option>19-22</option><option>23-25</option><option>26-30</option><option>30+</option></select></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="cc-qual">Highest Qualification *</label><select id="cc-qual" value={form.qualification} onChange={set("qualification")} className={selectCls} required><option value="">Select</option><option>Class 12</option><option>Bachelor's</option><option>Master's</option><option>Working Professional</option></select></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="cc-pct">Percentage / CGPA</label><input id="cc-pct" type="text" placeholder="e.g. 75% or 8.5 CGPA" value={form.percentage} onChange={set("percentage")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="cc-grad">Graduation Year</label><input id="cc-grad" type="text" placeholder="e.g. 2024" value={form.gradYear} onChange={set("gradYear")} className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="cc-exp">Work Experience</label><select id="cc-exp" value={form.workExp} onChange={set("workExp")} className={selectCls}><option value="">Select</option><option>None</option><option>Less than 1 year</option><option>1-3 years</option><option>3-5 years</option><option>5+ years</option></select></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="cc-field">Preferred Career Field</label><input id="cc-field" type="text" placeholder="e.g. Data Science, MBA" value={form.careerField} onChange={set("careerField")} className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="cc-country">Preferred Country</label><select id="cc-country" value={form.country} onChange={set("country")} className={selectCls}><option value="">Select</option>{COUNTRIES.map(c => <option key={c}>{c}</option>)}<option>Not Sure</option></select></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="cc-intake">Intended Intake</label><select id="cc-intake" value={form.intake} onChange={set("intake")} className={selectCls}><option value="">Select</option><option>Jan 2026</option><option>May 2026</option><option>Sep 2026</option><option>Jan 2027</option><option>Sep 2027</option><option>Not Sure</option></select></div>
                  </div>
                  <div><label className="text-xs font-semibold block mb-1" htmlFor="cc-budget">Approximate Budget</label><select id="cc-budget" value={form.budget} onChange={set("budget")} className={selectCls}><option value="">Select</option><option>Below ₹10 Lakhs</option><option>₹10-20 Lakhs</option><option>₹20-40 Lakhs</option><option>₹40-60 Lakhs</option><option>₹60 Lakhs+</option><option>Not Sure</option></select></div>
                  <button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:opacity-90 text-white font-bold py-4 rounded-xl text-base shadow-elegant transition-all">Get My Free Career Assessment</button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ═══ 15. FREE COUNSELLING CTA ═══ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-amber-50 to-blue-50 dark:from-amber-950/20 dark:to-blue-950/20 border-2 border-amber-500/20 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Not Sure About Studying Abroad?</h2>
              <p className="text-muted-foreground mb-2">You're not alone! It's not necessary to have everything planned before meeting a counsellor.</p>
              <p className="text-sm text-muted-foreground mb-6">Tell us your interests, skills, career goals, and budget — we'll work with you to explore <strong>Courses + Countries + Universities + Career Pathways.</strong></p>
              <Button size="lg" className="bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold px-8 py-5 rounded-xl shadow-lg text-base" asChild>
                <a href="#lead-form"><MessageCircle className="w-5 h-5 mr-2" />Discuss My Career Goals</a>
              </Button>
            </div>
          </div>
        </section>

        {/* ═══ 16. FAQS ═══ */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Frequently Asked <span className="text-amber-600">Questions</span></h2>
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

        {/* ═══ 17. FINAL CTA ═══ */}
        <section className="py-16 bg-gradient-to-r from-amber-600 via-amber-700 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Career Abroad?</h2>
              <p className="text-lg opacity-90 mb-8">Get a personalised study abroad career roadmap — start with a free consultation today.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+919211818710" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-amber-700 font-bold rounded-xl shadow-lg transition-all"><Phone className="w-5 h-5" />Call Now</a>
                <a href="https://wa.me/919211818710" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-smooth"><MessageCircle className="w-5 h-5" />WhatsApp Us</a>
              </div>
            </div>
          </div>
        </section>
        <RelatedLinks currentPath="/career-counselling" accent="text-amber-600" />
      </main>

      <Footer />
    </div>
  );
};

export default CareerCounsellingPage;
