import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Star, Users, DollarSign, CheckCircle2, ShieldCheck, 
  Sparkles, GraduationCap, Phone, MessageCircle, Clock, Award, Building2
} from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";
import HeroGlobe3D from "@/components/HeroGlobe3D";
import { CONTACT } from "@/config/site";
import { openEnquiryPopup } from "@/components/EnquiryPopup";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 bg-gradient-subtle overflow-hidden">
      {/* Background Decorative Glow Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl floating pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl floating pointer-events-none" style={{ animationDelay: '1.5s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Content (7 cols on lg) */}
          <div className="lg:col-span-7 min-w-0 space-y-8 animate-fade-in">
            
            {/* Top Pill Badge */}
            <div className="inline-flex max-w-full items-center gap-2.5 px-3.5 sm:px-4 py-2 bg-card/80 backdrop-blur-md border border-primary/20 rounded-full shadow-soft">
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-secondary animate-ping" />
              <Sparkles className="w-4 h-4 text-secondary fill-secondary shrink-0" />
              <span className="text-[11px] sm:text-xs md:text-sm font-bold text-foreground tracking-wide truncate sm:whitespace-normal">
                Study Abroad & Overseas Education Loan Specialists
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Turn Your <span className="text-gradient-hero">Global Study</span> Dreams Into Reality
              </h1>
              
              {/* .hero-summary is referenced by the speakable specification in
                  the homepage JSON-LD (see Index.tsx) — it is the sentence a
                  voice assistant reads aloud when answering from this page.
                  Do not remove the class without removing it there too. */}
              <p className="hero-summary text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-normal">
                Guiding Indian students through university admissions, <strong className="text-foreground font-semibold">collateral-free education loans</strong>, scholarships and the <strong className="text-foreground font-semibold">student visa process</strong> — end to end, and free to start.
              </p>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card/90 backdrop-blur-md p-4 rounded-xl border border-border/80 shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="p-2.5 bg-primary/10 rounded-lg w-fit mb-2 text-primary">
                  <DollarSign className="w-5 h-5" />
                </div>
                <p className="font-bold text-base text-foreground">Education Loans</p>
                <p className="text-xs text-muted-foreground mt-0.5">Secured & collateral-free options</p>
              </div>

              <div className="bg-card/90 backdrop-blur-md p-4 rounded-xl border border-border/80 shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="p-2.5 bg-secondary/10 rounded-lg w-fit mb-2 text-secondary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="font-bold text-base text-foreground">Collateral-Free Route</p>
                <p className="text-xs text-muted-foreground mt-0.5">Where the lender allows it</p>
              </div>

              <div className="bg-card/90 backdrop-blur-md p-4 rounded-xl border border-border/80 shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="p-2.5 bg-accent/10 rounded-lg w-fit mb-2 text-accent">
                  <Building2 className="w-5 h-5" />
                </div>
                <p className="font-bold text-base text-foreground">22 Countries</p>
                <p className="text-xs text-muted-foreground mt-0.5">Study destinations covered</p>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/*
                This used to be <a href="#calculator">, which opened the EMI
                calculator. A button that says "Apply" has to start an
                application — sending someone to a calculator instead is a
                broken promise, and it was the single most prominent CTA on the
                site. It now opens the enquiry form with the loan purpose
                already selected. The calculator is still one tap away from the
                floating button on every page, and from "Estimate My Education
                Loan" further down this page.
              */}
              <Button
                size="lg"
                onClick={() => openEnquiryPopup("Education loan — studying abroad")}
                className="bg-gradient-gold text-secondary-foreground font-bold shadow-gold hover-glow-gold text-base px-8 py-6 rounded-xl w-full sm:w-auto"
              >
                Apply for Loan Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              {/*
                Was <a href="#contact">. There is no id="contact" on the
                homepage — the contact section renders on /contact, not here —
                so this button scrolled nowhere and did nothing. It now opens
                the enquiry form set to free counselling.
              */}
              <Button
                size="lg"
                variant="outline"
                onClick={() => openEnquiryPopup("Free career counselling")}
                className="border-primary/30 text-primary hover:bg-primary/5 hover-glow-primary font-bold text-base px-8 py-6 rounded-xl w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 mr-2" />
                Get Free Consultation
              </Button>

              <a 
                href={CONTACT.whatsapp}
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center justify-center p-3.5 bg-emerald-500/10 text-emerald-600 rounded-xl hover:bg-emerald-500/20 transition-colors border border-emerald-500/20"
                title="WhatsApp Us"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            {/* Trust Indicators & Student Avatars */}
            <div className="pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-6">
              {/* Avatars + Rating */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Free first consultation</p>
                  <p className="text-xs text-muted-foreground">No cost, no obligation — talk to a counsellor first</p>
                </div>
              </div>

              {/* Quick Stats Badges */}
              <div className="flex items-center gap-6 text-xs text-muted-foreground font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Transparent guidance, no false promises</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-secondary" />
                  <span>RBI-regulated banks & NBFCs</span>
                </div>
              </div>
            </div>

            {/* Destination Flags Ticker */}
            <div className="flex max-w-full items-center gap-2 pt-2 text-xs text-muted-foreground overflow-x-auto pb-2 scrollbar-none">
              <span className="font-semibold text-foreground shrink-0">Popular Destinations:</span>
              {[
                { flag: "🇬🇧", name: "UK" },
                { flag: "🇺🇸", name: "USA" },
                { flag: "🇨🇦", name: "Canada" },
                { flag: "🇦🇺", name: "Australia" },
                { flag: "🇩🇪", name: "Germany" },
                { flag: "🇯🇵", name: "Japan" },
                { flag: "🇮🇳", name: "India" },
                { flag: "🇪🇺", name: "Europe" },
              ].map((dest, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-card border border-border/60 rounded-full shrink-0 flex items-center gap-1 hover:border-primary/40 transition-colors cursor-default shadow-xs"
                >
                  <span>{dest.flag}</span>
                  <span className="font-medium">{dest.name}</span>
                </span>
              ))}
            </div>

          </div>

          {/* Right Column: Freely Floating Interactive 3D Earth Globe Model (5 cols on lg) */}
          <div className="lg:col-span-5 min-w-0 w-full relative lg:animate-slide-in-right flex items-center justify-center">
            <HeroGlobe3D />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;