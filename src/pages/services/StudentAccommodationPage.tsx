import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ArrowRight, ArrowDown, Phone, MessageCircle, CheckCircle2, Sparkles,
  Home, MapPin, DollarSign, Shield, Key, Bus, Wifi, Users, Building2, Heart,
  AlertTriangle, FileText, Globe, Search, Eye, ClipboardCheck, Plane, Star, X
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedLinks from "@/components/RelatedLinks";
import SEOHead from "@/components/SEOHead";
import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";

const SEO = {
  title: "Student Accommodation Abroad for Indian Students",
  description: "Find student accommodation abroad with guidance on location, budget, room types, booking, contracts and pre-departure planning for Indian students.",
  canonicalUrl: "https://www.dreamdestinationstudyabroad.com/student-accommodation",
  keywords: ["student accommodation abroad","student accommodation for Indian students","overseas student accommodation","accommodation for international students","study abroad accommodation","student housing abroad","student rooms abroad","student accommodation consultant","accommodation assistance for students","affordable student accommodation abroad"],
};

const BOOKING_FLOW = ["University","Location","Budget","Accommodation Type","Facilities","Contract","Booking"];

const PROCESS_STEPS = [
  { num: "01", title: "Understand Your Requirements", subtitle: "Share Your Needs With Us", desc: "Each student has their own accommodation preferences.", items: ["Destination","University","Campus/location","Budget","Preferred room type","Move-in date","Duration of stay","Private/shared preference","Lifestyle preferences","Distance preference","Accommodation facilities"] },
  { num: "02", title: "Location Guidance", subtitle: "Pick an Area That Works for Your Student Life", desc: "The cheapest room may not be the best if you face a long commute daily.", factors: [{ label: "University Distance", desc: "Easy to reach campus" },{ label: "Public Transport", desc: "Bus, train, or other modes available?" },{ label: "Daily Essentials", desc: "Shops, banks, and pharmacies nearby?" },{ label: "Student Environment", desc: "Is it a good area for students?" },{ label: "Overall Cost", desc: "Fits your complete monthly budget?" }] },
  { num: "03", title: "Explore Accommodation Types", subtitle: "Pick the Type of Stay That Fits You", desc: "Multiple options to suit different needs and budgets.", types: [
    { name: "Student Residence", desc: "Dedicated student accommodation with study areas, common rooms, laundry, Wi-Fi, security, and social spaces." },
    { name: "Shared Apartment", desc: "Live with other students — single or shared room with common kitchen/living spaces and shared costs." },
    { name: "Private Room", desc: "More personal space while remaining part of a communal student residence or apartment." },
    { name: "Studio Apartment", desc: "Combined living and sleeping space with private facilities. Ideal for privacy and independence." },
    { name: "Homestay", desc: "Live with a host family to experience local culture and lifestyle in a family environment." },
    { name: "Private Rental", desc: "Independently rented apartments or rooms, subject to local rental regulations and availability." },
  ]},
  { num: "04", title: "Accommodation Shortlisting", subtitle: "Compare Before You Book", desc: "We help students compare practical options.", compareItems: ["Distance from university","Rent (weekly/monthly)","Deposit amount","Bills included or additional","Room type (private/shared/studio)","Bathroom (private/shared)","Kitchen (shared/private)","Internet (included/paid)","Laundry (on-site/off-site)","Transport options nearby","Contract duration & terms","Cancellation policy"] },
  { num: "05", title: "Budget-Based Guidance", subtitle: "Options That Align With Your Budget", desc: "Multiple factors affect accommodation cost.", budgetCalc: ["Weekly rent × duration of stay","+ Deposit","+ Utilities/Additional charges","+ Transport","= Realistic Accommodation Cost"], factors: ["Country","City","University location","Room type","Property","Facilities","Contract duration"] },
  { num: "06", title: "Private vs. Shared", subtitle: "Which One Is Right for You?", desc: "Consider budget, privacy, location, lifestyle, and commute — not just price.", comparison: { private: ["Increased privacy","Less dependence","Typically more expensive","Good for personal space"], shared: ["More social interaction","Lower per-capita cost","Shared facilities","Good for students open to roommates"] } },
  { num: "07", title: "Student Residence Guidance", subtitle: "Purpose-Built Student Accommodation", desc: "Housing designed for student needs.", facilities: ["Wi-Fi","Study rooms","Laundry","Gym","Common areas","Social spaces","Security","Bike storage","Maintenance support"] },
  { num: "08", title: "Homestay Guidance", subtitle: "Experience Local Life With a Host Family", desc: "A chance to live with a local family.", benefits: ["Cultural exposure","Local guidance","Home-style environment","Language practice opportunities","Help with transition"] },
];

const SAFETY_CHECKLIST = [
  { icon: MapPin, label: "Check the Address", desc: "Confirm the actual property location." },
  { icon: Building2, label: "Check the Provider", desc: "Establish who operates/manages the facility." },
  { icon: FileText, label: "Check the Contract", desc: "Browse terms before paying." },
  { icon: DollarSign, label: "Verify Total Cost", desc: "Don't base decisions solely on rent." },
  { icon: Star, label: "Check Reviews", desc: "Search for student-specific experiences." },
  { icon: X, label: "Cancellation Terms", desc: "Know penalties for plan changes." },
  { icon: Shield, label: "Payment Details", desc: "Only book through official/authorised channels." },
];

const PRE_ARRIVAL = ["Accommodation confirmed","Booking confirmation received","Contract reviewed","Deposit/payment completed","Check-in date confirmed","Check-in instructions received","Address saved","Transport from airport planned","Emergency contact saved","Important documents safely kept"];

const MOVE_IN = ["Room condition","Furniture","Appliances","Keys/access card","Internet","Utilities","Bathroom","Kitchen","Existing damage"];

const MISTAKES = [
  { num: "01", title: "Booking without checking location", desc: "Always verify the exact property location." },
  { num: "02", title: "Considering only the rent", desc: "Extras can significantly vary the total fee." },
  { num: "03", title: "Ignoring the contract", desc: "Know the duration, notice, and cancellation clauses." },
  { num: "04", title: "Paying through unverified channels", desc: "Use normal/approved payment methods only." },
  { num: "05", title: "Booking too late", desc: "Popular cities have limited availability during major intakes." },
  { num: "06", title: "Deciding based only on photos", desc: "Review facilities, location, reviews, and true conditions." },
  { num: "07", title: "Ignoring university commute", desc: "Low rent + high transport costs = expensive." },
  { num: "08", title: "Not reviewing refund policy", desc: "Critical if visa or admission timing changes." },
];

const BUDGET_TIERS = [
  { tier: "Budget-Conscious", focus: ["Shared rooms","Shared apartments","University residences","Good transport areas"] },
  { tier: "Mid-Range", focus: ["Private rooms","Student residences","Ensuite rooms","Shared apartments"] },
  { tier: "Premium", focus: ["Studios","Premium student residences","Private apartments"] },
];

const DESTINATIONS = [
  { region: "UK", cities: "London, Manchester, Birmingham, Leeds, Liverpool, Glasgow" },
  { region: "USA", cities: "New York, Boston, Chicago, Los Angeles, San Francisco, Austin" },
  { region: "Canada", cities: "Toronto, Vancouver, Montreal, Ottawa, Calgary" },
  { region: "Australia", cities: "Sydney, Melbourne, Brisbane, Adelaide, Perth" },
  { region: "Europe", cities: "Germany, France, Italy, Netherlands, Ireland, Spain, Switzerland" },
  { region: "Asia & Middle East", cities: "Singapore, Malaysia, Dubai (UAE), Mauritius" },
];

const WHY_DD = [
  { title: "Personalised Shortlisting", desc: "Based on your university, budget, location, and preferences." },
  { title: "Multiple Accommodation Types", desc: "Shared, private, studios, and homestays across countries." },
  { title: "Budget-Focused Guidance", desc: "Align accommodation costs with your total study abroad budget." },
  { title: "Location-Based Planning", desc: "Distance to university, transport, and convenience factored in." },
  { title: "Booking Guidance", desc: "Key factors to consider and contract term adherence." },
  { title: "Visa-Aware Planning", desc: "Plan accommodation with overall admission and visa process." },
  { title: "Pan-India Online Support", desc: "Accommodation guidance from anywhere in India." },
];

const SEVEN_STEPS = [
  { num: "01", title: "Share Your Requirements", desc: "Country, university, budget and preferences." },
  { num: "02", title: "Set Accommodation Budget", desc: "Know approximate amount per week/month." },
  { num: "03", title: "Explore Suitable Options", desc: "Check options and what to expect." },
  { num: "04", title: "Compare", desc: "Compare rent, location, facilities, and terms." },
  { num: "05", title: "Review Before Booking", desc: "Check deposit, payment, cancellation, and refund." },
  { num: "06", title: "Secure Accommodation", desc: "Finish booking via the provider." },
  { num: "07", title: "Prepare for Move-In", desc: "Have confirmation and check-in info ready." },
];

const FAQS = [
  { q: "What is student accommodation assistance?", a: "Student accommodation assistance helps international students explore and compare suitable housing options based on their university, location, budget, room preference and move-in requirements." },
  { q: "Can you help Indian students find accommodation abroad?", a: "Yes. DreamDestination can guide Indian students in exploring accommodation options relevant to their destination, university, budget and preferences." },
  { q: "What types of student accommodation are available abroad?", a: "Common options include student residences, shared apartments, private rooms, studios, homestays and private rentals." },
  { q: "Which accommodation is best for international students?", a: "There is no single best option. The right choice depends on your budget, university location, privacy preference, lifestyle and contract requirements." },
  { q: "Is student accommodation cheaper than private accommodation?", a: "Not necessarily. Costs vary by city, property, room type and included facilities. Students should compare the total cost rather than rent alone." },
  { q: "Should I choose accommodation near my university?", a: "Living near campus can reduce commuting time and transport costs, but students should compare rent, transport access and overall convenience." },
  { q: "How much does student accommodation cost?", a: "The cost depends on the country, city, property and room type. Major cities are often more expensive than smaller university towns." },
  { q: "Can I book accommodation before getting my visa?", a: "This depends on the accommodation provider and your destination. Before paying a non-refundable amount, check the provider's cancellation and refund policy." },
  { q: "Do I need accommodation proof for a student visa?", a: "This depends on the destination and visa category. Some visa processes may require accommodation evidence, while others may have different requirements." },
  { q: "Can I get accommodation after reaching the country?", a: "It may be possible, but availability can be limited in popular student cities, particularly around major university intakes. Planning early can provide more choices." },
  { q: "What is purpose-built student accommodation?", a: "Purpose-built student accommodation is housing specifically designed for students and may include facilities such as study spaces, common rooms, laundry and social areas." },
  { q: "What is a student homestay?", a: "A homestay allows a student to live with a host family, providing an opportunity to experience local culture and everyday life." },
  { q: "Should I choose a private or shared room?", a: "A private room generally provides more personal space, while shared accommodation can offer social interaction and may reduce individual costs." },
  { q: "What should I check before booking student accommodation?", a: "Check the location, rent, deposit, bills, room type, facilities, contract duration, cancellation policy, transport access and total cost." },
  { q: "Is accommodation guaranteed after applying?", a: "No. Accommodation availability depends on the provider, location, booking date and available inventory." },
  { q: "Can I change my accommodation after booking?", a: "That depends on the accommodation provider's contract and cancellation/modification policy." },
  { q: "What happens if my student visa is refused after I book accommodation?", a: "Your options depend on the provider's cancellation and refund terms. This is why students should understand those terms before making payment." },
  { q: "Can I get accommodation for my spouse or family?", a: "Family accommodation depends on the destination, property availability, visa situation and rental rules." },
  { q: "Do you help with accommodation contracts?", a: "We can guide students on what important terms to review. The final rental agreement is between the student and the accommodation provider/landlord." },
  { q: "Can I get accommodation assistance online?", a: "Yes. DreamDestination can provide accommodation guidance online to students across India." },
];

const COUNTRIES_LIST = ["UK","USA","Canada","Australia","New Zealand","Germany","Ireland","France","Italy","Netherlands","Switzerland","Spain","Singapore","Malaysia","Dubai/UAE","Mauritius"];

const StudentAccommodationPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({ fullName:"",mobile:"",email:"",city:"",destination:"",university:"",course:"",intake:"",prefCity:"",budget:"",roomType:"",moveIn:"" });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hands the enquiry to WhatsApp. Before this, the form discarded it.
    sendLeadToWhatsApp("Student Accommodation", form);
    setFormSubmitted(true);
  };
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => setForm({...form,[k]:e.target.value});
  const inputCls = "w-full text-sm p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-colors";

  const jsonLd = [
    { "@context":"https://schema.org","@type":"WebPage",name:SEO.title,description:SEO.description,url:SEO.canonicalUrl,inLanguage:"en-IN",isPartOf:{"@type":"WebSite",name:"DreamDestination",url:"https://www.dreamdestinationstudyabroad.com"},keywords:SEO.keywords.join(", ") },
    { "@context":"https://schema.org","@type":"FAQPage",mainEntity:FAQS.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}})) },
    { "@context":"https://schema.org","@type":"Service",name:"Student Accommodation Assistance",description:SEO.description,provider:{"@type":"Organization",name:"DreamDestination",url:"https://www.dreamdestinationstudyabroad.com"} },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 selection:text-amber-600">
      <SEOHead title={SEO.title} description={SEO.description} canonicalUrl={SEO.canonicalUrl} keywords={SEO.keywords} jsonLd={jsonLd} />
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gradient-subtle border-b pt-20"><div className="container mx-auto px-4 py-3"><nav className="flex items-center gap-2 text-sm text-muted-foreground"><Link to="/" className="hover:text-primary transition-smooth">Home</Link><ChevronRight className="w-3 h-3" /><span className="text-foreground font-medium">Student Accommodation</span></nav></div></div>

        {/* HERO */}
        <section className="relative pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-amber-50/60 via-background to-background dark:from-amber-950/10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="container mx-auto px-4 pt-12 md:pt-16">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-semibold"><Sparkles className="w-3.5 h-3.5" /><span>Safe · Convenient · Budget-Friendly</span></div>
              <span className="text-6xl md:text-7xl drop-shadow-lg block">🏠</span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]"><span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-blue-600">Student Accommodation</span> Assistance for Indian Students</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Find your perfect home away from home. Accommodation guidance — safe, convenient, and budget-friendly for students studying abroad.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button size="lg" className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-amber-600/20 text-base w-full sm:w-auto" asChild><a href="#lead-form"><span>Find My Accommodation Options</span><ArrowRight className="w-5 h-5 ml-2" /></a></Button>
                <Button size="lg" variant="outline" className="border-amber-500/20 hover:bg-amber-500/5 font-semibold px-8 py-6 rounded-xl text-base w-full sm:w-auto" asChild><a href="tel:+919211818710"><Phone className="w-5 h-5 mr-2 text-amber-600" /><span>Get Free Accommodation Guidance</span></a></Button>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4"><div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">Why Planning Accommodation Matters</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Finding the right residence in a new country is among the most challenging aspects of preparing for study abroad. Before you arrive, you need to consider location, rent, university proximity, house type, facilities, transport access, contract terms, deposit, cancellation policies, and your budget.</p>
            <p className="text-muted-foreground leading-relaxed mb-8">Your room in a new country is your first home. Picking the right location can ease your transition and daily student life.</p>
            {/* Booking Flow */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">{BOOKING_FLOW.map((s,i,arr) => (<div key={s} className="flex items-center gap-2"><span className={`px-4 py-2 rounded-xl text-xs font-bold border ${i===0?"bg-amber-500 text-white border-amber-500":i===arr.length-1?"bg-emerald-500 text-white border-emerald-500":"bg-card border-border"}`}>{s}</span>{i<arr.length-1&&<ArrowRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />}</div>))}
            </div>
          </div></div>
        </section>

        {/* PROCESS STEPS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Our Accommodation Assistance Process</h2>
            <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">A structured approach to finding the right place to live.</p>
            <div className="max-w-5xl mx-auto space-y-8">
              {PROCESS_STEPS.map(step => (
                <div key={step.num} className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-extrabold text-lg shadow-elegant">{step.num}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-extrabold mb-1">{step.title}</h3>
                      <p className="text-sm font-semibold text-amber-600 mb-3">{step.subtitle}</p>
                      <p className="text-sm text-muted-foreground mb-4">{step.desc}</p>
                      {step.items && <div className="grid grid-cols-2 md:grid-cols-3 gap-2">{step.items.map(it=><div key={it} className="flex items-center gap-2 p-2 bg-muted/60 rounded-lg text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />{it}</div>)}</div>}
                      {step.factors && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {step.factors.map(f => {
                            /*
                             * The two steps carrying `factors` use different shapes:
                             * step 02 lists { label, desc } pairs, step 05 lists
                             * plain strings. This previously read f.label and f.desc
                             * unconditionally, so step 05 rendered seven empty cards
                             * on the live page — and it was a real type error too.
                             */
                            const label = typeof f === "string" ? f : f.label;
                            const desc = typeof f === "string" ? null : f.desc;
                            return (
                              <div key={label} className="bg-muted/60 rounded-xl p-3">
                                <h4 className="text-xs font-bold text-amber-600 mb-1">{label}</h4>
                                {desc && <p className="text-xs text-muted-foreground">{desc}</p>}
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {step.types && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{step.types.map(t=><div key={t.name} className="bg-muted/60 rounded-xl p-4 border border-transparent hover:border-amber-500/20 transition-colors"><h4 className="font-bold text-sm mb-1">{t.name}</h4><p className="text-xs text-muted-foreground">{t.desc}</p></div>)}</div>}
                      {step.compareItems && <div className="grid grid-cols-2 md:grid-cols-3 gap-2">{step.compareItems.map(it=><div key={it} className="flex items-center gap-2 p-2 bg-muted/60 rounded-lg text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />{it}</div>)}</div>}
                      {step.budgetCalc && <div className="bg-muted/60 rounded-xl p-4 mt-2"><h4 className="text-xs font-bold text-amber-600 mb-2">Budget Planning</h4>{step.budgetCalc.map(c=><p key={c} className="text-xs text-foreground font-medium">{c}</p>)}<p className="text-[10px] text-muted-foreground mt-2 italic">A better indication than just rent.</p></div>}
                      {step.comparison && <div className="grid md:grid-cols-2 gap-4"><div className="bg-muted/60 rounded-xl p-4"><h4 className="font-bold text-sm mb-2">Private</h4>{step.comparison.private.map(p=><p key={p} className="text-xs text-muted-foreground flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-amber-500 shrink-0" />{p}</p>)}</div><div className="bg-muted/60 rounded-xl p-4"><h4 className="font-bold text-sm mb-2">Shared</h4>{step.comparison.shared.map(p=><p key={p} className="text-xs text-muted-foreground flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />{p}</p>)}</div></div>}
                      {step.facilities && <div className="flex flex-wrap gap-2">{step.facilities.map(f=><span key={f} className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold">{f}</span>)}</div>}
                      {step.benefits && <div className="space-y-1.5">{step.benefits.map(b=><p key={b} className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />{b}</p>)}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SAFETY CHECKLIST */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Accommodation Safety Checklist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {SAFETY_CHECKLIST.map(s => { const Icon = s.icon; return (
                <div key={s.label} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group">
                  <Icon className="w-8 h-8 text-amber-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-sm mb-1">{s.label}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ); })}
            </div>
          </div>
        </section>

        {/* BUDGET TIERS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Flexibility With Different Budgets</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {BUDGET_TIERS.map((t,i) => (
                <div key={t.tier} className={`rounded-2xl border-2 p-6 ${i===0?"border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/10":i===1?"border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/10":"border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/10"}`}>
                  <h3 className="font-bold text-lg mb-3">{t.tier}</h3>
                  <ul className="space-y-2">{t.focus.map(f=><li key={f} className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />{f}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DESTINATIONS */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Accommodation Support for Main Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {DESTINATIONS.map(d => (
                <div key={d.region} className="bg-card border rounded-2xl p-5 shadow-soft"><h3 className="font-bold text-base mb-2 text-amber-600">{d.region}</h3><p className="text-sm text-muted-foreground">{d.cities}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* CHECKLISTS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft">
                <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2"><Plane className="w-6 h-6 text-amber-600" /> Pre-Arrival Checklist</h2>
                <div className="space-y-2">{PRE_ARRIVAL.map(p=><div key={p} className="flex items-center gap-3 p-2.5 bg-muted/60 rounded-lg"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /><span className="text-sm">{p}</span></div>)}</div>
              </div>
              <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft">
                <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2"><Key className="w-6 h-6 text-amber-600" /> Move-In Day Checklist</h2>
                <div className="space-y-2">{MOVE_IN.map(p=><div key={p} className="flex items-center gap-3 p-2.5 bg-muted/60 rounded-lg"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /><span className="text-sm">{p}</span></div>)}</div>
                <div className="mt-4 p-3 bg-amber-500/10 rounded-xl"><p className="text-xs text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-2"><AlertTriangle className="w-4 h-4 shrink-0" />Take photos/videos at move-in to document existing conditions.</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* MISTAKES */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Common Accommodation <span className="text-amber-600">Mistakes to Avoid</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {MISTAKES.map(m=>(
                <div key={m.num} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant transition-all">
                  <span className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center font-bold text-xs mb-3">{m.num}</span>
                  <h3 className="font-bold text-sm mb-1">{m.title}</h3>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7 STEPS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Our 7-Step Process</h2>
            <p className="text-center text-muted-foreground mb-12">Simple steps from requirements to move-in.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {SEVEN_STEPS.map(s=>(
                <div key={s.num} className="bg-card border rounded-2xl p-5 shadow-soft hover:-translate-y-1 transition-all duration-300">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-bold text-sm mb-3">{s.num}</span>
                  <h3 className="font-bold text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY DD */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Why Choose DreamDestination?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {WHY_DD.map(w=>(
                <div key={w.title} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group">
                  <Home className="w-8 h-8 text-amber-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-sm mb-1 group-hover:text-amber-600 transition-colors">{w.title}</h3>
                  <p className="text-xs text-muted-foreground">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEAD FORM */}
        <section id="lead-form" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-card border-2 border-amber-500/30 rounded-3xl p-6 md:p-10 shadow-elegant">
              <div className="text-center mb-8 space-y-2">
                <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">Free Guidance</span>
                <h2 className="text-2xl md:text-3xl font-extrabold">Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-blue-600">Student Accommodation</span></h2>
                <p className="text-xs text-muted-foreground">Tell us your needs and we'll help you find suitable options.</p>
              </div>
              {formSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Request Received!</h3>
                  <p className="text-sm text-muted-foreground">Thank you, {form.fullName || "Student"}! Our accommodation specialist will reach out within 24 hours.</p>
                  <button type="button" onClick={()=>setFormSubmitted(false)} className="px-6 py-2.5 rounded-xl border border-emerald-500/20 text-emerald-600 font-semibold hover:bg-emerald-500/10 transition-colors text-xs">Submit Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1">Full Name *</label><input type="text" required placeholder="Your Name" value={form.fullName} onChange={set("fullName")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1">Mobile *</label><input type="tel" required placeholder="+91 98765 43210" value={form.mobile} onChange={set("mobile")} className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1">Email *</label><input type="email" required placeholder="email@example.com" value={form.email} onChange={set("email")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1">Study Destination *</label><select required value={form.destination} onChange={set("destination")} className={inputCls}><option value="">Select</option>{COUNTRIES_LIST.map(c=><option key={c}>{c}</option>)}</select></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1">University</label><input type="text" placeholder="University name" value={form.university} onChange={set("university")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1">Intake</label><select value={form.intake} onChange={set("intake")} className={inputCls}><option value="">Select</option><option>Jan 2026</option><option>May 2026</option><option>Sep 2026</option><option>Jan 2027</option><option>Not Sure</option></select></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1">Monthly/Weekly Budget</label><input type="text" placeholder="e.g. £600/month" value={form.budget} onChange={set("budget")} className={inputCls} /></div>
                    <div><label className="text-xs font-semibold block mb-1">Preferred Room Type</label><select value={form.roomType} onChange={set("roomType")} className={inputCls}><option value="">Select</option><option>Private Room</option><option>Shared Room</option><option>Studio</option><option>Homestay</option><option>Not Sure</option></select></div>
                  </div>
                  <div><label className="text-xs font-semibold block mb-1">Preferred Move-In Date</label><input type="text" placeholder="e.g. September 2026" value={form.moveIn} onChange={set("moveIn")} className={inputCls} /></div>
                  <button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:opacity-90 text-white font-bold py-4 rounded-xl text-base shadow-elegant transition-all">Find Accommodation Options</button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4"><div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Frequently Asked <span className="text-amber-600">Questions</span></h2>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((f,i)=>(
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-6 shadow-soft data-[state=open]:shadow-elegant transition-smooth">
                  <AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:text-amber-600 py-5 [&[data-state=open]]:text-amber-600">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div></div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 bg-gradient-to-r from-amber-600 via-amber-700 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center"><div className="max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help Finding Accommodation?</h2>
            <p className="text-lg opacity-90 mb-8">Let us help you find safe, affordable student housing near your university.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919211818710" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-amber-700 font-bold rounded-xl shadow-lg transition-all"><Phone className="w-5 h-5" />Call Now</a>
              <a href="https://wa.me/919211818710" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-smooth"><MessageCircle className="w-5 h-5" />WhatsApp Us</a>
            </div>
          </div></div>
        </section>
        <RelatedLinks currentPath="/student-accommodation" />
      </main>
      <Footer />
    </div>
  );
};

export default StudentAccommodationPage;
