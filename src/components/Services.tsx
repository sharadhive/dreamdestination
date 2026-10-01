import { GraduationCap, DollarSign, FileText, Award, BookOpen, Plane, ArrowRight, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/site";
import { openEnquiryPopup } from "@/components/EnquiryPopup";

const services = [
  {
    icon: DollarSign,
    title: "Education Loans — Abroad & India",
    description: "Secured, unsecured and collateral-free routes compared against your profile. We take no commission from any lender.",
    features: ["Funding gap worked out first", "Sanction timed to your visa file", "PM-Vidyalaxmi for Indian colleges", "Section 80E position explained"],
    badge: "No Fee",
    /* Pre-selects this card's service in the enquiry form's dropdown. */
    purpose: "Education loan — studying abroad",
    gradient: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-500"
  },
  {
    icon: GraduationCap,
    title: "University Admission Support",
    description: "Personalized shortlisting of top QS-ranked universities matching your academic profile and budget.",
    features: ["SOP & LOR Drafting", "UCAS / Direct Applications", "Profile Enhancement", "1-on-1 Counselor Sessions"],
    badge: "Free Consultation",
    /* Pre-selects this card's service in the enquiry form's dropdown. */
    purpose: "University admission application",
    gradient: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-500"
  },
  {
    icon: FileText,
    title: "Student Visa Processing",
    description: "Document checklist for your exact visa category, financial evidence checked against the current rule, full review before submission.",
    features: ["Financial evidence review", "CAS / I-20 guidance", "Mock visa interviews", "Checked before submission"],
    badge: "Most Files Fail On Money",
    /* Pre-selects this card's service in the enquiry form's dropdown. */
    purpose: "Student visa assistance",
    gradient: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-500"
  },
  {
    icon: Award,
    title: "Scholarship Assistance",
    description: "Discover and apply for fully-funded and merit-based government & university scholarships.",
    features: ["Eligibility screened first", "Essay and statement guidance", "University & government awards", "Deadlines tracked — many close early"],
    badge: "Do This Before The Loan",
    /* Pre-selects this card's service in the enquiry form's dropdown. */
    purpose: "Scholarship guidance",
    gradient: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-500"
  },
  {
    icon: BookOpen,
    title: "IELTS / TOEFL & GRE Prep",
    description: "Which test your course and visa route actually require — students routinely sit the wrong one — and a date planned around the deadline.",
    features: ["Right test for your visa route", "Exemption check first", "Mock tests and material", "Score timed to the deadline"],
    badge: "Exam Ready",
    /* Pre-selects this card's service in the enquiry form's dropdown. */
    purpose: "IELTS / PTE / TOEFL / GRE preparation",
    gradient: "from-cyan-500/20 to-cyan-500/5",
    iconColor: "text-cyan-500"
  },
  {
    icon: Plane,
    title: "Travel & Forex Support",
    description: "Pre-departure briefing, forex and fee-transfer guidance at disbursement, and help finding somewhere to live once you have an offer.",
    features: ["Forex student cards", "Halls vs private housing", "Deposit & guarantor terms explained", "Pre-departure checklist"],
    badge: "Post-Arrival",
    /* Pre-selects this card's service in the enquiry form's dropdown. */
    purpose: "Travel, forex and insurance",
    gradient: "from-rose-500/20 to-rose-500/5",
    iconColor: "text-rose-500"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4">
            <GraduationCap className="w-4 h-4" />
            <span>End-to-End Overseas Solutions</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Everything You Need to <span className="text-gradient-hero">Study Abroad</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From funding your education to landing at your university campus, we take care of every step with complete transparency.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="bg-card p-5 sm:p-6 md:p-8 rounded-2xl border border-border/80 shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3.5 rounded-xl bg-gradient-to-br ${service.gradient} ${service.iconColor} border border-border/40 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-[11px] font-bold rounded-full">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-2 text-xs text-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/*
                  Was <Link to="/contact">, which took the visitor off the
                  homepage to a full contact page and made them describe which
                  service they had been reading about. It now opens the enquiry
                  form in place with that service already chosen, so the card
                  they clicked is the enquiry we receive. The contact page is
                  still reachable from the header, the footer and the banner
                  below for anyone who wants the longer form.
                */}
                <div className="block pt-4 border-t border-border/40">
                  <Button
                    variant="outline"
                    onClick={() => openEnquiryPopup(service.purpose)}
                    className="w-full justify-between hover-glow-primary group-hover:bg-primary group-hover:text-white transition-all text-xs md:text-sm font-bold"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* High Conversion Banner */}
        <div className="bg-gradient-hero rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full inline-block mb-4">
              ✨ Free 1-on-1 Counseling Session
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold mb-4 leading-tight">
              Unsure About Your Loan Eligibility or University Selection?
            </h3>
            <p className="text-base md:text-lg opacity-90 mb-8 leading-relaxed">
              Talk to our senior education financing consultants today. We will evaluate your profile and provide a customized roadmap free of cost.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-gold text-secondary-foreground font-bold shadow-gold hover-glow-gold text-sm md:text-base px-8 py-6 rounded-xl w-full sm:w-auto">
                  <Phone className="w-4 h-4 mr-2" />
                  Book Free Consultation
                </Button>
              </Link>
              {/* Was hardcoded to a WhatsApp number that is not this business's,
                  so every tap on this CTA was a lost lead. It now comes from
                  CONTACT, like every other WhatsApp link on the site. */}
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/20 text-sm md:text-base px-8 py-6 rounded-xl w-full sm:w-auto">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;