import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ArrowRight, ArrowDown, Phone, MessageCircle, CheckCircle2, Sparkles,
  FileText, Shield, AlertTriangle, Eye, ClipboardCheck, Globe, Users, Building2,
  Search, Briefcase, GraduationCap, Heart, BookOpen, MapPin, Plane, Key, Lock
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedLinks from "@/components/RelatedLinks";
import SEOHead from "@/components/SEOHead";

import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";
const SEO = {
  title: "Student Visa Assistance for Indian Students",
  description: "Get student visa assistance for studying abroad with document, financial proof, application and interview guidance for Indian students.",
  canonicalUrl: "https://www.dreamdestinationstudyabroad.com/visa-assistance",
  keywords: ["student visa assistance","student visa consultant","study abroad visa assistance","student visa for Indian students","overseas education visa consultant","student visa guidance","student visa application assistance","student visa documentation","student visa interview preparation","education visa assistance"],
};

const VISA_STEPS = [
  { num:"01",title:"Visa Profile Assessment",subtitle:"Know Your Visa Requirements",desc:"We understand your study plan and gather key information for your visa application.",items:["Destination country","University & Course","Course duration & Intake","Admission status","Previous education","Work experience","Financial situation","Sponsorship & Education loan","Past overseas travel"] },
  { num:"02",title:"Country-Specific Visa Guidance",subtitle:"Every Destination Has Its Own Rules",desc:"A UK student visa differs from a US F-1 visa. Canada, Australia, Germany, Italy, and Netherlands requirements vary considerably.",note:"We tailor guidance to: Country → Visa Category → University → Course → Documents → Financial Proof → Application" },
  { num:"03",title:"Document Preparation",subtitle:"Arrange All Necessary Documents",desc:"We help you organize every document needed for your specific destination and visa type.",docSections:[
    {label:"Identity",docs:["Valid Passport","Previous Passport (if applicable)","Passport-size photographs","Government-issued ID"]},
    {label:"Academic",docs:["Class 10 & 12 Certificates","Degree Certificate","Academic Transcripts","Relevant Certificates"]},
    {label:"University",docs:["Offer Letter","Admission Letter","Enrolment Confirmation","CAS / I-20 / COE (where applicable)"]},
    {label:"Financial",docs:["Bank Statements","Education Loan Documents","Scholarship Letter","Sponsor & Income Documents","Tax documents (if applicable)"]},
    {label:"Additional",docs:["Health/Medical Documents","Police Clearance (if required)","Insurance","Accommodation Proof","English Test Results"]},
  ]},
  { num:"04",title:"Financial Proof Guidance",subtitle:"Present Your Financial Information Properly",desc:"Financial documents are critical for visa applications.",sources:["Personal Funds","Family/Sponsor Funds","Scholarship","Education Loan","Combination of Eligible Sources"],covers:["Tuition expenses","Living expenses","Accommodation costs","Travel costs","Insurance","Other required expenses"] },
  { num:"05",title:"Education Loan & Visa Documentation",subtitle:"Applying With an Education Loan?",desc:"We help you understand loan documents relevant to your visa financial documentation.",docs:["Loan Sanction Letter","Loan Agreement","Disbursement Evidence","Fee Payment Evidence","Bank Statements","Sponsor/Co-applicant Documents"],note:"An education loan is not a guarantee of a visa. Applications are assessed overall by immigration authorities." },
  { num:"06",title:"Scholarship & Financial Aid Documentation",subtitle:"Include Your Scholarship Info Properly",desc:"If you've been awarded a scholarship, additional documentation may be required for visa.",docs:["Scholarship Award Letter","Scholarship Amount","Tuition Waiver Details","Funding Period","Supporting financial documents"] },
  { num:"07",title:"Visa Application Form Assistance",subtitle:"Fill In Your Application Carefully",desc:"Accurate information is required on visa forms.",sections:["Personal information","Passport details","Academic history","University & Course details","Travel history","Financial information","Sponsor details","Previous visa information"],focus:"Accuracy, consistency, completeness, and truthfulness." },
  { num:"08",title:"Document Review",subtitle:"Check Everything Before Submission",desc:"Discrepancies can cause confusion and questions during immigration review.",checks:["Name mismatches","Date inconsistencies","Missing documents","Incorrect information","Unclear financial evidence","Incomplete forms"] },
  { num:"09",title:"SOP / Study Plan Guidance",subtitle:"Be Clear About Your Study Intentions",desc:"Some destinations require a written statement or study plan.",covers:["Academic background","Why the selected course","Why the institution","Why the destination","Career objectives","Relevant experience","Funding plan","Post-study plans"] },
  { num:"10",title:"Visa Interview Preparation",subtitle:"Be Prepared If an Interview Is Required",desc:"We prepare you for questions about your course, university, finances, and career plans.",questionAreas:[
    {area:"About Your Course",qs:["What do you want to achieve?","What areas will you study?","How does it relate to former studies?"]},
    {area:"About Your University",qs:["Why did you select this university?","What others did you consider?"]},
    {area:"About Your Finances",qs:["What are your funding sources?","How will you control spending?"]},
    {area:"About Your Career",qs:["What are your career plans after studies?"]},
  ]},
  { num:"11",title:"Mock Visa Interview",subtitle:"Practice Before the Actual Interview",desc:"Get comfortable articulating your study approach conversationally.",prep:["Clear communication","Consistent answers","Understanding your course & university","Financial awareness","Genuine study objectives"],goal:"Confidence — not memorized answers." },
  { num:"12",title:"Biometrics & Appointment Guidance",subtitle:"Understand Your Next Steps",desc:"We guide you through the process for your specific destination.",steps:["Book an appointment","Submit biometrics","Attend visa application center","Attend interview (if required)","Submit original documents","Provide photographs","Complete medical procedures"] },
];

const POST_STEPS = [
  { num:"13",title:"Health & Medical Requirements",items:["Medical examination","Chest X-ray","Health insurance","Vaccination records","Medical certificate"] },
  { num:"14",title:"Police Clearance & Background",items:["PCC requirement check","Where to obtain it","Country-specific needs","Legalization/apostille if required"] },
  { num:"15",title:"Accommodation Documentation",items:["University accommodation confirmation","Rental agreement","Temporary booking","Host declaration","Other accepted proof"] },
];

const SUBMISSION_FLOW = ["Application Form","University Documents","Financial Evidence","Identity Documents","Supporting Documents","Biometrics / Appointment","Submission"];

const COUNTRY_VISA = [
  { country:"UK Student Visa",items:["CAS","Financial requirements","TB testing where applicable","Visa application","Biometrics","Credibility/interview aspects"] },
  { country:"USA F-1 Student Visa",items:["I-20","SEVIS","DS-160","Visa appointment","Interview preparedness","Financial documentation"] },
  { country:"Canada Study Permit",items:["Letter of Acceptance","Provincial regulations","Financial evidence","Application documents","Biometrics","Study permit process"] },
  { country:"Australia Student Visa",items:["Confirmation of Enrolment","Genuine student requirements","Financial proof","Medical checks","Visa application"] },
  { country:"Germany Student Visa",items:["University admission","APS where applicable","Proof of funds","Health insurance","Visa application","Post-entry residence"] },
  { country:"Italy Student Visa",items:["University admission","Pre-enrolment","Financial documentation","Accommodation","Visa application","Post-entry residence"] },
  { country:"Netherlands Visa / Residence",items:["University admission","Institution-handled intake process","Financial requirements","Residence permit","Entry documents"] },
];

const EIGHT_STEP_PROCESS = [
  {num:"01",title:"Profile & Visa Assessment"},{num:"02",title:"Country-Specific Requirement Check"},
  {num:"03",title:"Document Checklist"},{num:"04",title:"Financial Proof Planning"},
  {num:"05",title:"Application Preparation"},{num:"06",title:"Document Review"},
  {num:"07",title:"Biometrics & Interview Prep"},{num:"08",title:"Pre-Departure Guidance"},
];

const MISTAKES = [
  {num:"01",title:"Incomplete Application",desc:"A missing piece can result in delays or extra communication."},
  {num:"02",title:"Contradictory Details",desc:"University, financial, and visa information must all be consistent."},
  {num:"03",title:"Insufficient Financial Proof",desc:"Demonstrate sufficient finances before submitting."},
  {num:"04",title:"Memorising Interview Answers",desc:"Visa interviews require natural and truthful responses."},
  {num:"05",title:"Ignoring Prior Refusal",desc:"Investigate past refusal reasons before resubmitting."},
  {num:"06",title:"Submitting Fake Documents",desc:"Never use any type of document forgery."},
  {num:"07",title:"Applying Too Late",desc:"Plan around your university's start date and typical processing times."},
];

const WHY_DD = [
  {title:"Country-Specific Guidance",desc:"We don't approach every country's visa process identically."},
  {title:"Document-Specific Support",desc:"Help understanding and collating required documents."},
  {title:"Financial Documentation",desc:"Guidance on how funds, scholarships, loans feature in your application."},
  {title:"Interview Preparation",desc:"Preparatory guidance for interviews and credibility assessments."},
  {title:"Refusal Review",desc:"Review your refusal information before helping you plan next steps."},
  {title:"End-to-End Journey",desc:"Visa process linked to: Admission → Scholarship → Loan → Visa → Pre-Departure."},
];

const FAQS = [
  {q:"What is student visa assistance?",a:"Student visa assistance helps students understand applicable visa requirements, organise documents, prepare financial evidence, complete applications and prepare for interviews where required."},
  {q:"Do you help with student visa applications?",a:"Yes. DreamDestination provides guidance through the student visa preparation and application journey, including document checklists, financial documentation, application guidance and interview preparation where applicable."},
  {q:"Do you guarantee student visa approval?",a:"No. Visa decisions are made by the relevant immigration authority. We provide preparation and guidance but cannot guarantee visa issuance."},
  {q:"What documents are required for a student visa?",a:"Requirements vary by country, but commonly include a passport, university documents, financial evidence, academic documents and other destination-specific supporting documents."},
  {q:"How much bank balance is required for a student visa?",a:"There is no single worldwide amount. Financial requirements depend on the destination, visa category, course and applicable immigration rules."},
  {q:"Can an education loan be used as financial proof?",a:"In some destinations, education-loan documentation can form part of the financial evidence. The exact accepted documents depend on the country's rules."},
  {q:"What happens if my student visa is rejected?",a:"The first step should be to understand the refusal reason. Depending on the destination, you may have options such as reapplying, appealing or addressing the identified issue."},
  {q:"Can I reapply after a student visa refusal?",a:"Potentially, yes. The appropriate route depends on the destination and refusal circumstances."},
  {q:"Do you help with visa interviews?",a:"Yes. Where interviews are required, we help students prepare through question practice and mock interviews."},
  {q:"Can you help with visa documentation?",a:"Yes. We help students understand and organise the documentation relevant to their destination and visa category."},
  {q:"Do you help with biometrics?",a:"We can guide students on the applicable appointment and biometric process, although biometrics must be completed through the authorised channel."},
  {q:"How early should I start my student visa preparation?",a:"Ideally, start preparing your visa documents well before your course start date so you have time to arrange financial, medical and other required documents."},
  {q:"Is visa assistance available online?",a:"Yes. DreamDestination can provide online guidance to students across India."},
  {q:"Can parents attend the visa counselling session?",a:"Yes. Parents or sponsors can participate where their financial documentation or sponsorship is relevant."},
  {q:"Do you provide visa assistance for all countries?",a:"We provide guidance for major study destinations. Availability depends on the destination, visa category and current immigration requirements."},
];

const COUNTRIES_LIST = ["UK","USA","Canada","Australia","New Zealand","Germany","Ireland","France","Italy","Netherlands","Switzerland","Spain","Singapore","Malaysia","Dubai/UAE","Mauritius"];

const VisaAssistancePage = () => {
  useEffect(()=>{window.scrollTo(0,0)},[]);
  const [formSubmitted,setFormSubmitted]=useState(false);
  const [form,setForm]=useState({fullName:"",mobile:"",email:"",city:"",country:"",university:"",course:"",intake:"",admissionStatus:"",ieltsStatus:"",loanRequired:"",scholarship:"",previousRefusal:"no"});
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hands the enquiry to WhatsApp. Before this line the form discarded it.
    sendLeadToWhatsApp("Student Visa Assistance", form);
    setFormSubmitted(true);
  };
  const set=(k:string)=>(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>setForm({...form,[k]:e.target.value});
  const inputCls="w-full text-sm p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-colors";

  const jsonLd=[
    {"@context":"https://schema.org","@type":"WebPage",name:SEO.title,description:SEO.description,url:SEO.canonicalUrl,inLanguage:"en-IN",isPartOf:{"@type":"WebSite",name:"DreamDestination",url:"https://www.dreamdestinationstudyabroad.com"},keywords:SEO.keywords.join(", ")},
    {"@context":"https://schema.org","@type":"FAQPage",mainEntity:FAQS.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))},
    {"@context":"https://schema.org","@type":"Service",name:"Student Visa Assistance",description:SEO.description,provider:{"@type":"Organization",name:"DreamDestination",url:"https://www.dreamdestinationstudyabroad.com"}},
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 selection:text-amber-600">
      <SEOHead title={SEO.title} description={SEO.description} canonicalUrl={SEO.canonicalUrl} keywords={SEO.keywords} jsonLd={jsonLd} />
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-subtle border-b pt-20"><div className="container mx-auto px-4 py-3"><nav className="flex items-center gap-2 text-sm text-muted-foreground"><Link to="/" className="hover:text-primary transition-smooth">Home</Link><ChevronRight className="w-3 h-3" /><span className="text-foreground font-medium">Visa Assistance</span></nav></div></div>

        {/* HERO */}
        <section className="relative pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-amber-50/60 via-background to-background dark:from-amber-950/10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="container mx-auto px-4 pt-12 md:pt-16">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-semibold"><Sparkles className="w-3.5 h-3.5" /><span>Expert Visa Guidance for Indian Students</span></div>
              <span className="text-6xl md:text-7xl drop-shadow-lg block">📋</span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">Student <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-blue-600">Visa Assistance</span> for Indian Students</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Get your student visa application organised, reviewed, and ready. Expert guidance on documentation, financial proof, application, and interview preparation.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button size="lg" className="bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold px-8 py-6 rounded-xl shadow-lg text-base w-full sm:w-auto" asChild><a href="#lead-form"><span>Get Free Visa Guidance</span><ArrowRight className="w-5 h-5 ml-2" /></a></Button>
                <Button size="lg" variant="outline" className="border-amber-500/20 hover:bg-amber-500/5 font-semibold px-8 py-6 rounded-xl text-base w-full sm:w-auto" asChild><a href="tel:+919211818710"><Phone className="w-5 h-5 mr-2 text-amber-600" /><span>Check My Visa Requirements</span></a></Button>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4"><div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">Why Student Visa Guidance Matters</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Receiving an offer letter is a significant achievement, but it's just the beginning. Financial proof, health/insurance requirements, application forms, biometrics, interviews, and immigration requirements are all part of the student visa process.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">All countries have different immigration policies, paperwork, and forms. This is why you should always plan your visa with official requirements for your destination in mind.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">{["Passport","University admission documents","Financial evidence","Academic documents","Visa application forms","Accommodation info","Health/medical documents","Insurance","English-language evidence","Biometrics","Visa interview preparation"].map(it=><div key={it} className="flex items-center gap-2 p-2.5 bg-card border rounded-lg text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />{it}</div>)}</div>
          </div></div>
        </section>

        {/* PROCESS STEPS 01-12 */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Our Visa Assistance Process</h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">Comprehensive step-by-step visa guidance for your destination.</p>
            <div className="max-w-5xl mx-auto space-y-8">
              {VISA_STEPS.map(step=>(
                <div key={step.num} className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-extrabold text-lg shadow-elegant">{step.num}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-extrabold mb-1">{step.title}</h3>
                      <p className="text-sm font-semibold text-amber-600 mb-3">{step.subtitle}</p>
                      <p className="text-sm text-muted-foreground mb-4">{step.desc}</p>
                      {step.items&&<div className="grid grid-cols-2 md:grid-cols-3 gap-2">{step.items.map(it=><div key={it} className="flex items-center gap-2 p-2 bg-muted/60 rounded-lg text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />{it}</div>)}</div>}
                      {step.note&&<div className="mt-3 p-3 bg-amber-500/10 rounded-xl text-xs text-amber-700 dark:text-amber-400 font-medium">{step.note}</div>}
                      {step.docSections&&<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{step.docSections.map(s=><div key={s.label} className="bg-muted/60 rounded-xl p-3"><h4 className="text-xs font-bold text-amber-600 mb-2">{s.label}</h4><ul className="space-y-1">{s.docs.map(d=><li key={d} className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />{d}</li>)}</ul></div>)}</div>}
                      {step.sources&&<div className="mt-3"><h4 className="text-xs font-bold mb-2">Possible Funding Sources</h4><div className="flex flex-wrap gap-2">{step.sources.map(s=><span key={s} className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold">{s}</span>)}</div></div>}
                      {step.docs&&<div className="grid grid-cols-2 md:grid-cols-3 gap-2">{step.docs.map(d=><div key={d} className="flex items-center gap-2 p-2 bg-muted/60 rounded-lg text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />{d}</div>)}</div>}
                      {step.sections&&<div className="grid grid-cols-2 md:grid-cols-4 gap-2">{step.sections.map(s=><div key={s} className="flex items-center gap-2 p-2 bg-muted/60 rounded-lg text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />{s}</div>)}</div>}
                      {step.focus&&<div className="mt-3 p-3 bg-emerald-500/10 rounded-xl text-xs text-emerald-700 dark:text-emerald-400 font-semibold">Our Focus: {step.focus}</div>}
                      {step.checks&&<div className="grid grid-cols-2 md:grid-cols-3 gap-2">{step.checks.map(c=><div key={c} className="flex items-center gap-2 p-2 bg-red-500/5 rounded-lg text-xs font-medium"><AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />{c}</div>)}</div>}
                      {step.covers&&!step.sources&&<div className="grid grid-cols-2 md:grid-cols-3 gap-2">{step.covers.map(c=><div key={c} className="flex items-center gap-2 p-2 bg-muted/60 rounded-lg text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />{c}</div>)}</div>}
                      {step.questionAreas&&<div className="grid grid-cols-1 md:grid-cols-2 gap-3">{step.questionAreas.map(qa=><div key={qa.area} className="bg-muted/60 rounded-xl p-3"><h4 className="text-xs font-bold text-amber-600 mb-2">{qa.area}</h4><ul className="space-y-1">{qa.qs.map(q=><li key={q} className="text-xs text-muted-foreground">• {q}</li>)}</ul></div>)}</div>}
                      {step.prep&&<div className="space-y-1.5">{step.prep.map(p=><p key={p} className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />{p}</p>)}</div>}
                      {step.goal&&<div className="mt-3 p-3 bg-amber-500/10 rounded-xl text-xs text-amber-700 dark:text-amber-400 font-semibold">The Goal: {step.goal}</div>}
                      {step.steps&&<div className="grid grid-cols-2 md:grid-cols-3 gap-2">{step.steps.map(s=><div key={s} className="flex items-center gap-2 p-2 bg-muted/60 rounded-lg text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />{s}</div>)}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SUBMISSION FLOW */}
        <section className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-8">Visa Application Submission Flow</h2>
            <div className="flex flex-col items-center gap-0 max-w-xs mx-auto">{SUBMISSION_FLOW.map((s,i)=>(<div key={s} className="flex flex-col items-center"><div className={`px-6 py-3 rounded-xl text-sm font-bold border-2 w-full text-center ${i===0?"bg-amber-500 text-white border-amber-500":i===SUBMISSION_FLOW.length-1?"bg-emerald-500 text-white border-emerald-500":"bg-card border-border"}`}>{s}</div>{i<SUBMISSION_FLOW.length-1&&<ArrowDown className="w-4 h-4 text-amber-500 my-1" />}</div>))}</div>
          </div>
        </section>

        {/* COUNTRY-SPECIFIC */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Country-Wise Visa Assistance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {COUNTRY_VISA.map(c=>(
                <div key={c.country} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all">
                  <h3 className="font-bold text-base mb-3 text-amber-600">{c.country}</h3>
                  <ul className="space-y-2">{c.items.map(it=><li key={it} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />{it}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8-STEP PROCESS */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Our 8-Step Visa Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {EIGHT_STEP_PROCESS.map(s=>(
                <div key={s.num} className="bg-card border rounded-2xl p-5 shadow-soft hover:-translate-y-1 transition-all duration-300">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-bold text-sm mb-3">{s.num}</span>
                  <h3 className="font-bold text-sm">{s.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISTAKES */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Top 7 <span className="text-amber-600">Visa Mistakes</span> to Avoid</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {MISTAKES.map(m=>(
                <div key={m.num} className="bg-card border rounded-2xl p-5 shadow-soft"><span className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center font-bold text-xs mb-3">{m.num}</span><h3 className="font-bold text-sm mb-1">{m.title}</h3><p className="text-xs text-muted-foreground">{m.desc}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY DD */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Why Choose DreamDestination?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {WHY_DD.map(w=>(
                <div key={w.title} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group"><Shield className="w-8 h-8 text-amber-600 mb-3 group-hover:scale-110 transition-transform" /><h3 className="font-bold text-sm mb-1 group-hover:text-amber-600 transition-colors">{w.title}</h3><p className="text-xs text-muted-foreground">{w.desc}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* LEAD FORM */}
        <section id="lead-form" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-card border-2 border-amber-500/30 rounded-3xl p-6 md:p-10 shadow-elegant">
              <div className="text-center mb-8 space-y-2">
                <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">Free Assessment</span>
                <h2 className="text-2xl md:text-3xl font-extrabold">Check Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-blue-600">Student Visa</span> Requirements</h2>
              </div>
              {formSubmitted?(
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4 animate-fade-in"><CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" /><h3 className="text-2xl font-bold">Assessment Request Received!</h3><p className="text-sm text-muted-foreground">Our visa specialist will reach out within 24 hours.</p><button type="button" onClick={()=>setFormSubmitted(false)} className="px-6 py-2.5 rounded-xl border border-emerald-500/20 text-emerald-600 font-semibold hover:bg-emerald-500/10 transition-colors text-xs">Submit Another</button></div>
              ):(
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1">Full Name *</label><input type="text" required placeholder="Your Name" value={form.fullName} onChange={set("fullName")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1">Mobile *</label><input type="tel" required placeholder="+91 98765 43210" value={form.mobile} onChange={set("mobile")} className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1">Email *</label><input type="email" required placeholder="email@example.com" value={form.email} onChange={set("email")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1">Preferred Country *</label><select required value={form.country} onChange={set("country")} className={inputCls}><option value="">Select</option>{COUNTRIES_LIST.map(c=><option key={c}>{c}</option>)}</select></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1">University</label><input type="text" placeholder="University name" value={form.university} onChange={set("university")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1">Course</label><input type="text" placeholder="Course name" value={form.course} onChange={set("course")} className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1">Intake</label><select value={form.intake} onChange={set("intake")} className={inputCls}><option value="">Select</option><option>Jan 2026</option><option>May 2026</option><option>Sep 2026</option><option>Jan 2027</option></select></div>
                    <div><label className="text-xs font-semibold block mb-1">Admission Status</label><select value={form.admissionStatus} onChange={set("admissionStatus")} className={inputCls}><option value="">Select</option><option>Offer Received</option><option>Applied</option><option>Not Yet Applied</option></select></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1">Education Loan Required?</label><select value={form.loanRequired} onChange={set("loanRequired")} className={inputCls}><option value="">Select</option><option>Yes</option><option>No</option><option>Not Sure</option></select></div>
                    <div><label className="text-xs font-semibold block mb-1">Previous Visa Refusal?</label><select value={form.previousRefusal} onChange={set("previousRefusal")} className={inputCls}><option value="no">No</option><option value="yes">Yes</option></select></div>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:opacity-90 text-white font-bold py-4 rounded-xl text-base shadow-elegant transition-all">Get My Free Visa Assessment</button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4"><div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Frequently Asked <span className="text-amber-600">Questions</span></h2>
            <Accordion type="single" collapsible className="space-y-3">{FAQS.map((f,i)=>(<AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-6 shadow-soft data-[state=open]:shadow-elegant transition-smooth"><AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:text-amber-600 py-5 [&[data-state=open]]:text-amber-600">{f.q}</AccordionTrigger><AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{f.a}</AccordionContent></AccordionItem>))}</Accordion>
          </div></div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 bg-gradient-to-r from-amber-600 via-amber-700 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center"><div className="max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Apply for Your Student Visa?</h2>
            <p className="text-lg opacity-90 mb-8">Get expert guidance and increase your chances of visa success.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919211818710" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-amber-700 font-bold rounded-xl shadow-lg transition-all"><Phone className="w-5 h-5" />Call Now</a>
              <a href="https://wa.me/919211818710" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-smooth"><MessageCircle className="w-5 h-5" />WhatsApp Us</a>
            </div>
          </div></div>
        </section>
        <RelatedLinks currentPath="/visa-assistance" />
      </main>
      <Footer />
    </div>
  );
};

export default VisaAssistancePage;
