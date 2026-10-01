import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { 
  Award, 
  Users, 
  Globe, 
  Shield, 
  Target, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  Building2,
  ShieldCheck,
  Star
} from "lucide-react";
import globalEducationImage from "@/assets/global-education.jpg";
import studentsStudyingImage from "@/assets/students-studying.jpg";
import aboutHeroBanner from "@/assets/about-hero-banner.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SITE, CONTACT, SOCIALS, FOUNDER } from "@/config/site";

/**
 * AboutPage structured data.
 *
 * The About page is where Google and AI assistants look to establish who is
 * behind the site, so this node is what connects the domain to the
 * organisation, its phone number and its verified social profiles.
 *
 * `address` is intentionally absent — CONTACT.addressVerified is false in
 * src/config/site.ts. Add a PostalAddress here once a real, verifiable street
 * address exists, and match it exactly to the Google Business Profile.
 */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About DreamDestination",
    url: `${SITE.domain}/about`,
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.domain },
    mainEntity: {
      "@type": "EducationalOrganization",
      name: SITE.name,
      url: `${SITE.domain}/`,
      description: SITE.description,
      telephone: CONTACT.phone,
      ...(CONTACT.emailVerified && CONTACT.email ? { email: CONTACT.email } : {}),
      areaServed: { "@type": "Country", name: "India" },
      sameAs: SOCIALS.map((s) => s.href),
      founder: { "@type": "Person", name: FOUNDER.name, jobTitle: FOUNDER.role },
      knowsAbout: [
        "Education loans for studying abroad",
        "Education loans for studying in India",
        "PM-Vidyalaxmi scheme",
        "Section 80E tax deduction",
        "University admissions",
        "Student visas",
        "Scholarships",
      ],
    },
  },
];

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description: "Complete clarity in all processes with no hidden fees or charges",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(30,58,138,0.25)]"
  },
  {
    icon: Heart,
    title: "Student-First",
    description: "Every decision is made keeping student welfare and success at the center",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(234,179,8,0.25)]"
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Committed to delivering the highest quality of service and support",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(14,165,233,0.25)]"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Guidance across 22 study destinations, plus education loans for courses inside India",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(30,58,138,0.25)]"
  }
];

/**
 * ⚠️ EVERY FIGURE HERE MUST BE VERIFIABLE.
 *
 * This array previously read: 10+ Years Experience, 50K+ Students Placed,
 * 200+ University Partners, ₹5000Cr+ Loans Disbursed. None of those could be
 * evidenced, and the last one — five thousand crore of lending — is a claim
 * about a regulated activity DreamDestination does not perform at all. It is
 * not a lender and disburses nothing.
 *
 * An About page is where a search quality rater looks to work out who is behind
 * a money-related site. Unverifiable counters there do more damage than
 * anywhere else on the domain.
 *
 * The replacements are all checkable from the site itself. If real numbers
 * become available — a student count from CRM records, a genuine written
 * university agreement — they can go back in, with the source noted here.
 */
const achievements = [
  { number: "22", label: "Study Destinations", icon: Globe, detail: "Plus guidance for courses in India" },
  { number: "480+", label: "Cities Served", icon: Users, detail: "Across all 35 states and UTs" },
  { number: "Staged", label: "Multiple Disbursement", icon: GraduationCap, detail: "Loan released in instalments, timed to your fee deadlines" },
  { number: "₹0", label: "Lender Commission", icon: Award, detail: "And no fee for education loan guidance" }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-white">
      {/* Title was 81 characters, and "India's Premier … Platform" was both
          truncated away and an unverifiable superlative on a money-related
          site. */}
      <SEOHead
        title="About DreamDestination | Study Abroad Consultants"
        description="Who we are, how we work and what we will not promise. Independent study abroad counselling and education loan guidance for Indian students — we take no lender commission."
        canonicalUrl="/about"
        keywords={["about dreamdestinations", "study abroad consultants", "education loan guidance india", "overseas education consultancy"]}
        jsonLd={jsonLd}
      />
      <Header />

      <main className="flex-grow pt-20 pb-16 lg:pb-24 overflow-hidden relative">
        {/* Ambient Lighting Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-secondary/10 blur-[110px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-10 w-[450px] h-[350px] bg-accent/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Ambient Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--muted-foreground)/0.12)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10 opacity-60" />

        {/* ─── FULL-WIDTH HERO BANNER SECTION ─── */}
        <section className="relative py-8 lg:py-12">
          <div className="container mx-auto px-4 relative z-10">
            
            {/* FULL SIZE BANNER CARD */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl min-h-[440px] sm:min-h-[520px] flex items-center justify-center p-6 sm:p-12 lg:p-16 border border-white/10 text-white group">
              {/* Full Size Background Image */}
              <img
                src={aboutHeroBanner}
                alt="DreamDestination global education banner" width={1024} height={1024}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 -z-10"
              />
              {/* Dark Rich Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-primary/85 to-slate-950/90 -z-10" />
              
              {/* Decorative Subtle Glowing Circles */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none -z-10" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none -z-10" />

              {/* Banner Content Container */}
              <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
                  <Sparkles className="w-4 h-4 text-secondary animate-pulse shrink-0" />
                  <span>Independent counselling — we take no commission from lenders</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                  Empowering Student Futures Across <span className="text-gradient-gold">Global Destinations</span>
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
                  DreamDestination is a study abroad consultancy. We handle course choice, admissions, education loans
                  — for courses abroad and inside India — scholarships, student visas and accommodation, as one connected
                  process rather than as separate services.
                </p>

                {/* Banner CTA Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <Link to="/contact">
                    <Button size="lg" className="bg-gradient-gold text-secondary-foreground font-extrabold shadow-gold hover-glow-gold px-8 py-6 rounded-2xl flex items-center gap-2 text-base">
                      Start Your Journey
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>

                  <Link to="/countries">
                    <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-primary font-bold px-8 py-6 rounded-2xl flex items-center gap-2 text-base transition-all">
                      Explore Destinations
                    </Button>
                  </Link>
                </div>

                {/* Stat Badges Strip on Full Size Banner */}
                <div className="pt-6 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                    <div className="text-xl sm:text-2xl font-black text-secondary">22</div>
                    <p className="text-xs text-white/80">Study destinations</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                    <div className="text-xl sm:text-2xl font-black text-white">480+</div>
                    <p className="text-xs text-white/80">Cities served</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                    <div className="text-xl sm:text-2xl font-black text-secondary">Staged</div>
                    <p className="text-xs text-white/80">Multiple disbursement</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                    <div className="text-xl sm:text-2xl font-black text-white">₹0</div>
                    <p className="text-xs text-white/80">Lender commission</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ATTRACTIVE HIGHLIGHT INFO BANNER GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto mt-10">
              <div className="bg-card/90 backdrop-blur-xl p-6 rounded-3xl border border-border/80 shadow-soft hover:shadow-elegant hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center space-x-3.5 mb-3">
                  <div className="p-3 bg-gradient-hero rounded-2xl text-white shadow-sm shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Experience</p>
                    <h4 className="font-extrabold text-foreground text-base">One counsellor</h4>
                  </div>
                </div>
                <div className="text-2xl font-black text-primary">Start to finish</div>
                <p className="text-xs text-muted-foreground mt-0.5">Admission, loan and visa handled together</p>
              </div>

              <div className="bg-card/90 backdrop-blur-xl p-6 rounded-3xl border border-border/80 shadow-soft hover:shadow-elegant hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center space-x-3.5 mb-3">
                  <div className="p-3 bg-gradient-gold rounded-2xl text-secondary-foreground shadow-sm shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Loan Capital</p>
                    <h4 className="font-extrabold text-foreground text-base">Abroad and India</h4>
                  </div>
                </div>
                <div className="text-2xl font-black text-secondary">Both routes</div>
                <p className="text-xs text-muted-foreground mt-0.5">Regular education loans and PM-Vidyalaxmi</p>
              </div>

              <div className="bg-card/90 backdrop-blur-xl p-6 rounded-3xl border border-border/80 shadow-soft hover:shadow-elegant hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center space-x-3.5 mb-3">
                  <div className="p-3 bg-gradient-accent rounded-2xl text-white shadow-sm shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Global Reach</p>
                    <h4 className="font-extrabold text-foreground text-base">22 Destinations</h4>
                  </div>
                </div>
                <div className="text-2xl font-black text-accent">480+ cities</div>
                <p className="text-xs text-muted-foreground mt-0.5">Counselling runs online, across India</p>
              </div>

              <div className="bg-card/90 backdrop-blur-xl p-6 rounded-3xl border border-border/80 shadow-soft hover:shadow-elegant hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center space-x-3.5 mb-3">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary shadow-sm shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Services</p>
                    <h4 className="font-extrabold text-foreground text-base">End-to-End</h4>
                  </div>
                </div>
                <div className="text-2xl font-black text-foreground">No loan fee</div>
                <p className="text-xs text-muted-foreground mt-0.5">Lender charges are theirs, and disclosed</p>
              </div>
            </div>

          </div>
        </section>

        {/* Achievements / Statistics Bar */}
        <section className="py-12 my-4">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className="relative group bg-card/80 backdrop-blur-xl border border-border/70 p-6 sm:p-8 rounded-2xl shadow-soft hover:shadow-elegant hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-gradient-hero group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider bg-muted/60 px-2.5 py-1 rounded-md">
                        Verified
                      </span>
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary group-hover:text-gradient-hero transition-all duration-300 tracking-tight">
                      {achievement.number}
                    </div>
                    <p className="text-base sm:text-lg font-bold text-foreground mt-1">
                      {achievement.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {achievement.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story & Mission Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Mission & Story Text */}
              <div className="space-y-8 animate-slide-in-left">
                <div className="bg-card/70 backdrop-blur-md p-8 rounded-3xl border border-border/70 shadow-soft relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                    Our Mission
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-4">
                    To democratize international education by making it accessible and affordable for every 
                    deserving student, regardless of their financial background. We believe education should 
                    never be limited by financial constraints.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                    We are not a lender, and we take no commission from any lender. That is the whole basis of the
                    advice: a shortlist that follows your profile rather than a partner list, and a plain answer when
                    the plan you arrived with is a poor fit.
                  </p>
                </div>

                <div className="bg-card/70 backdrop-blur-md p-8 rounded-3xl border border-border/70 shadow-soft">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6 flex items-center gap-3">
                    <Shield className="w-7 h-7 text-secondary" />
                    Why Students Trust Us
                  </h2>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-muted/70 transition-colors border border-border/40">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-base mb-1">Transparent Process</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          No hidden fees, clear documentation, and honest guidance at every step.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-muted/70 transition-colors border border-border/40">
                      <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary shrink-0 mt-0.5">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-base mb-1">Expert Team</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Certified counselors with deep knowledge of international education systems.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-muted/70 transition-colors border border-border/40">
                      <div className="p-2.5 rounded-xl bg-accent/10 text-accent shrink-0 mt-0.5">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-base mb-1">End-to-End Support</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          From course selection to post-arrival support, we're with you throughout.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Image Grid */}
              <div className="space-y-6 animate-slide-in-right relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-card group">
                  <img
                    src={globalEducationImage}
                    alt="Global education network with university connections worldwide" width={1200} height={800}
                    className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                    <div>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-2 inline-block">
                        Worldwide Network
                      </span>
                      <h4 className="font-extrabold text-2xl">Global Network</h4>
                      <p className="text-sm text-white/80">22 study destinations</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                      <Globe className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-card group">
                  <img
                    src={studentsStudyingImage}
                    alt="Diverse international students working together in modern library" width={1200} height={600}
                    className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                    <div>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-2 inline-block">
                        Proven Track Record
                      </span>
                      <h4 className="font-extrabold text-2xl">Student Success</h4>
                      <p className="text-sm text-white/80">Guided by honest counselling</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                      <Heart className="w-6 h-6 text-secondary fill-secondary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*
          ─── HOW WE WORK ───

          This section was added because /about carried about 320 words, which is
          thin for the page a search quality rater reads to decide who is behind
          a site about money and major life decisions. A page that says a company
          is "trusted" and "leading" without saying what it actually does, what it
          charges, or what it refuses to promise gives that reader nothing to
          assess.

          Everything below is a statement about DreamDestination' own conduct —
          which is the one category of claim on this page that does not need an
          external source, because the business controls it.
        */}
        <section className="py-12 lg:py-16" id="how-we-work">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
                  How we actually work
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  DreamDestination was founded by <strong className="text-foreground font-semibold">{FOUNDER.name}</strong>.
                  Four things about how it works are worth knowing before you decide whether to talk
                  to us. Two of them are the reason students come to us; the other two are the reason
                  some students should go elsewhere.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-10">
                {[
                  {
                    h: "We are not a lender, and not a lending agent",
                    p: "We take no commission from any bank or NBFC, and we charge nothing for education loan guidance. That means we have no reason to steer you towards one lender over another, and no rate to quote you — the amount, the interest rate, the collateral requirement and the approval itself are the lender's decisions, always.",
                  },
                  {
                    h: "One counsellor carries the whole file",
                    p: "Course choice, admission, funding and the visa are one connected problem. The university's fee structure sets the loan amount; the loan sanction letter is what your visa financial evidence rests on. Splitting those across separate agencies is where deadlines usually slip, so the same person handles all four.",
                  },
                  {
                    h: "Loans for courses in India, not only abroad",
                    p: "Plenty of students are joining an Indian college rather than going overseas, and that is a different product with different rules. PM-Vidyalaxmi is collateral-free and guarantor-free but covers Indian institutions only — foreign institutions are excluded entirely. We check which of the two routes you are on before anything is submitted.",
                  },
                  {
                    h: "We work online, across India",
                    p: "Counselling, document review and application support all run over video and email. That is why a student in a smaller town gets the same support as one in a metro, and why there is no travel cost attached to a first conversation. The first consultation is free and carries no obligation.",
                  },
                ].map(({ h, p }) => (
                  <div key={h} className="bg-card/80 backdrop-blur-md p-6 rounded-2xl border border-border/70 shadow-soft">
                    <h3 className="font-extrabold text-base sm:text-lg text-foreground mb-2.5">{h}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p}</p>
                  </div>
                ))}
              </div>

              <div className="bg-muted/40 border border-border/70 rounded-2xl p-6 sm:p-8">
                <h3 className="font-extrabold text-lg text-foreground mb-3">What we will not tell you</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  A good deal of study abroad marketing consists of numbers nobody can check. We would
                  rather be the firm that publishes fewer claims than the firm that publishes better
                  ones. So you will not find any of the following on this site:
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {[
                    "An interest rate, because we do not set one",
                    "A loan amount you will be approved for",
                    "How fast a bank will approve your file",
                    "A visa or admission success percentage",
                    "A count of universities we are 'partnered' with",
                    "A student testimonial we did not receive",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="shrink-0 mt-0.5 font-bold text-muted-foreground/70 leading-none">×</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed mt-5">
                  Where this site does publish a figure — the PM-Vidyalaxmi terms, the Section 80E
                  rules, a state government scheme — it names the source and the date it was checked,
                  and where a state scheme could not be verified from a public source, the page says
                  exactly that instead of estimating. Students borrow money against this information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
                Our Core <span className="text-gradient-success">Values</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Guided by principles that prioritize student growth, transparency, and uncompromised excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className={`group relative bg-card/80 backdrop-blur-xl border border-border/70 p-8 rounded-3xl shadow-soft hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center flex flex-col items-center ${value.glowColor}`}
                  >
                    <div className={`w-20 h-20 mb-6 ${value.bgColor} rounded-3xl border ${value.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                      <Icon className={`w-10 h-10 ${value.color}`} />
                    </div>
                    <h3 className="text-xl font-extrabold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="relative rounded-3xl bg-gradient-to-br from-primary via-primary-glow to-primary p-8 sm:p-12 lg:p-16 shadow-2xl text-white overflow-hidden border border-white/10">
              {/* Background Glow Overlay */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-secondary" /> Ready To Take The First Step?
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  Join Our Success Story
                </h2>

                <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto">
                  Be part of a community that believes in making international education 
                  accessible, affordable, and achievable for everyone.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-gold text-secondary-foreground font-extrabold text-base rounded-2xl shadow-gold hover-glow-gold hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Start Your Journey
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    to="/countries"
                    className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-extrabold text-base rounded-2xl hover:bg-white hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Explore Destinations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
