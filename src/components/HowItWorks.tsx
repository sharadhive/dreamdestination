import { Link } from "react-router-dom";
import {
  Compass, Globe2, GraduationCap, Wallet, Award, FileText, Home,
  ArrowRight, ShieldCheck, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/site";

import { openEnquiryPopup } from "@/components/EnquiryPopup";
/**
 * The seven-stage student journey.
 *
 * Each stage links to the service page that owns it. That matters twice over:
 * a student can jump straight to the stage they are actually at, and the
 * homepage passes ranking signal to all seven service pages instead of being a
 * dead end.
 */
const STAGES = [
  {
    n: "01",
    icon: Compass,
    title: "Career Counselling",
    description: "Work out what you actually want from studying abroad before choosing anything else.",
    to: "/career-counselling",
  },
  {
    n: "02",
    icon: Globe2,
    title: "Country & Course",
    description: "Compare destinations and programmes against your profile, budget and career goal.",
    to: "/countries",
  },
  {
    n: "03",
    icon: GraduationCap,
    title: "University Admission",
    description: "A balanced shortlist, documents, SOP and LOR guidance, and applications submitted on time.",
    to: "/admission-guidance",
  },
  {
    n: "04",
    icon: Wallet,
    title: "Education Loan",
    description: "Work out your real funding gap, then compare secured and collateral-free loan routes.",
    to: "/financial-assistance",
  },
  {
    n: "05",
    icon: Award,
    title: "Scholarships",
    description: "Find awards you genuinely qualify for — several close before university deadlines.",
    to: "/scholarship-assistance",
  },
  {
    n: "06",
    icon: FileText,
    title: "Student Visa",
    description: "Country-specific documents, financial evidence and interview preparation.",
    to: "/visa-assistance",
  },
  {
    n: "07",
    icon: Home,
    title: "Accommodation & Departure",
    description: "Housing, contracts, forex and everything ready before you fly.",
    to: "/student-accommodation",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-subtle relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-14 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Seven Stages, One Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            One Partner for the <span className="text-gradient-hero">Entire Student Journey</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Most students end up juggling one agency for admission, another for the loan and a third for the visa.
            We cover every stage — and you can join at whichever one you are on.
          </p>
        </div>

        {/* Stage Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            return (
              <Link
                key={stage.n}
                to={stage.to}
                className="bg-card p-6 rounded-2xl border border-border/80 shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1.5 group flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="w-10 h-10 rounded-full bg-gradient-hero text-white font-bold text-sm flex items-center justify-center shadow-md">
                    {stage.n}
                  </span>
                  <span className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5" />
                  </span>
                </div>

                <h3 className="text-base font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {stage.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {stage.description}
                </p>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}

          {/* Closing tile */}
          <div className="bg-gradient-hero text-white p-6 rounded-2xl shadow-elegant flex flex-col justify-center">
            <h3 className="text-base font-bold mb-2">Already partway through?</h3>
            <p className="text-sm opacity-90 mb-4">
              Plenty of students come to us with an offer already in hand and only need the loan or the visa.
            </p>
            {/* Was href="#contact", a dead anchor on this page. No purpose is
                pre-selected here on purpose — these students arrive at very
                different points, so they pick. */}
            <button
              type="button"
              onClick={() => openEnquiryPopup()}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/15 border border-white/25 rounded-lg px-3 py-2 w-fit hover:bg-white/25 transition-colors"
            >
              Tell us where you are <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-card rounded-2xl border border-border/80 p-8 shadow-elegant text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-3">Start Wherever You Are</h3>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-6">
            The first consultation is free and there is no obligation. Work out your options before you commit
            to a university, a lender or a consultant.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/*
              Was <a href="#calculator">, which opened the EMI calculator. A
              calculator returns a number; it does not start anything. This now
              opens the enquiry form with the loan purpose pre-selected, so the
              student gets an answer about their own profile from a counsellor.
              The calculator is still one tap away on the floating button, on
              every page, for anyone who just wants to run the numbers.
            */}
            <Button
              size="lg"
              onClick={() => openEnquiryPopup("Education loan — studying abroad")}
              className="bg-gradient-gold text-secondary-foreground font-bold shadow-gold hover-glow-gold text-sm md:text-base px-8 py-6 rounded-xl w-full sm:w-auto"
            >
              Check My Loan Eligibility
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 font-bold text-sm md:text-base px-8 py-6 rounded-xl w-full sm:w-auto" asChild>
              <a href={`tel:${CONTACT.phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                Talk to a Counsellor
              </a>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
