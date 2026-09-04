import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  GraduationCap, MapPin, DollarSign, Award, Briefcase, Clock,
  ChevronRight, ExternalLink, FileText, Globe2, BookOpen,
  Users, Shield, Building2, ArrowRight, Star, CheckCircle2,
  Wallet, Calendar, Languages, BadgeCheck, Phone, MessageCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { countriesData, getCountryBySlug, generateJsonLd, type CountryData } from "@/data/countryData";
import LanguagePopup from "@/components/LanguagePopup";

const SITE_DOMAIN = "https://dreamdestinations.co.in";

const CountryPage = () => {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const navigate = useNavigate();
  const country = getCountryBySlug(countrySlug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [countrySlug]);

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center animate-fade-in">
            <div className="text-8xl mb-6">🌍</div>
            <h1 className="text-4xl font-bold mb-4">Country Not Found</h1>
            <p className="text-muted-foreground text-lg mb-8">
              The country page you're looking for doesn't exist.
            </p>
            <Link
              to="/countries"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-hero text-white rounded-xl font-semibold hover-glow-primary transition-smooth"
            >
              Browse All Countries <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const jsonLd = generateJsonLd(country);
  const relatedCountries = countriesData
    .filter((c) => c.slug !== country.slug)
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      <SEOHead
        title={country.metaTitle}
        description={country.metaDescription}
        keywords={country.keywords}
        canonicalUrl={`${SITE_DOMAIN}/countries/${country.slug}`}
        jsonLd={jsonLd}
      />
      <Header />

      {/* Language Popup */}
      <LanguagePopup
        countrySlug={country.slug}
        countryName={country.name}
        countryFlag={country.flag}
      />

      <main className="pt-20">
        {/* ─── Breadcrumb ─── */}
        <div className="bg-gradient-subtle border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/countries" className="hover:text-primary transition-smooth">Countries</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">Study in {country.name}</span>
            </nav>
          </div>
        </div>

        {/* ─── Hero Banner ─── */}
        <section className={`relative overflow-hidden ${country.gradient} text-white`}>
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-10 left-10 w-56 h-56 bg-white/5 rounded-full blur-3xl" style={{ animationDelay: "1.5s" }} />
            <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-white/3 rounded-full blur-2xl animate-pulse-glow" />
          </div>

          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="max-w-4xl animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-6xl md:text-7xl drop-shadow-lg">{country.flag}</span>
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Study in {country.name}
                  </h1>
                  <p className="text-lg md:text-xl opacity-90 mt-2 font-medium">
                    {country.heroTagline}
                  </p>
                </div>
              </div>
              <p className="text-base md:text-lg opacity-85 max-w-3xl leading-relaxed mb-8">
                {country.description}
              </p>

              {/* Hero Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: Building2, label: "Universities", value: country.universities },
                  { icon: DollarSign, label: "Avg Tuition", value: country.avgCost },
                  { icon: Briefcase, label: "Work Visa", value: country.workPermit.split("(")[0].trim() },
                  { icon: BadgeCheck, label: "Visa Success", value: country.visaSuccessRate },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4 hover:bg-white/15 transition-smooth"
                  >
                    <stat.icon className="w-5 h-5 mb-2 opacity-80" />
                    <p className="text-xs opacity-70 uppercase tracking-wide">{stat.label}</p>
                    <p className="font-bold text-sm md:text-base">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-gold text-secondary-foreground font-bold rounded-xl shadow-gold hover-glow-gold transition-smooth text-sm md:text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  Get Free Consultation
                </a>
                <a
                  href="#colleges"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-smooth text-sm md:text-base"
                >
                  <GraduationCap className="w-5 h-5" />
                  View Top Colleges
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Quick Stats Bar ─── */}
        <section className="bg-card border-b shadow-soft">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {[
                { icon: Building2, label: "Total Colleges", value: `${country.collegeCount}+` },
                { icon: DollarSign, label: "Avg Tuition", value: country.avgCost },
                { icon: Award, label: "Scholarships", value: "Available" },
                { icon: Shield, label: "Visa Success", value: country.visaSuccessRate },
                { icon: Calendar, label: "Intakes", value: country.intakeMonths.split(",")[0] + "+" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="font-bold text-foreground text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── About Section ─── */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About Studying in <span className="text-gradient-hero">{country.name}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {country.longDescription}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-xl border shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Globe2 className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">Country Quick Facts</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    {[
                      { label: "Currency", value: country.currency },
                      { label: "Language", value: country.language },
                      { label: "Living Cost", value: country.livingCost },
                      { label: "Intake Months", value: country.intakeMonths },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card p-6 rounded-xl border shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <BookOpen className="w-5 h-5 text-secondary" />
                    </div>
                    <h3 className="font-bold text-lg">Popular Programs</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {country.programs.map((prog, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {prog}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Scholarships:</strong> {country.scholarships}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong className="text-foreground">Work Permit:</strong> {country.workPermit}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Top Colleges ─── */}
        <section id="colleges" className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Top Colleges & Universities in <span className="text-gradient-hero">{country.name}</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore our partner universities and top-ranked institutions for Indian students
              </p>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {country.colleges.map((college, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-1 p-6 group animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-base group-hover:text-primary transition-smooth leading-snug">
                        {college.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{college.location}</span>
                      </div>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 bg-gradient-hero text-white text-xs font-bold rounded-lg">
                      {college.ranking}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {college.programs.slice(0, 4).map((prog, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] rounded-full"
                      >
                        {prog}
                      </span>
                    ))}
                    {college.programs.length > 4 && (
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] rounded-full">
                        +{college.programs.length - 4} more
                      </span>
                    )}
                  </div>

                  <a
                    href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
                  >
                    Visit Website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Services Section ─── */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Services for <span className="text-gradient-hero">{country.name}</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                End-to-end support for your study abroad journey to {country.name}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {country.services.map((service, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-xl border shadow-soft hover:shadow-elegant transition-smooth animate-fade-in group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${index % 2 === 0 ? "bg-gradient-hero" : "bg-gradient-gold"} text-white shrink-0`}>
                      {index === 0 ? <GraduationCap className="w-6 h-6" /> :
                       index === 1 ? <Wallet className="w-6 h-6" /> :
                       index === 2 ? <FileText className="w-6 h-6" /> :
                       <Globe2 className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1.5 group-hover:text-primary transition-smooth">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, fi) => (
                          <div key={fi} className="flex items-center gap-1.5 text-xs text-foreground">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Education Loan Section ─── */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Education Loan for <span className="text-gradient-hero">{country.name}</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Hassle-free education loans with competitive rates and quick processing
                </p>
              </div>

              <div className="bg-card rounded-2xl border shadow-elegant overflow-hidden animate-fade-in">
                <div className="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border">
                  {[
                    { label: "Max Loan Amount", value: country.educationLoan.maxAmount, icon: DollarSign },
                    { label: "Interest Rate", value: country.educationLoan.interestRate, icon: Star },
                    { label: "Collateral", value: country.educationLoan.collateral, icon: Shield },
                    { label: "Repayment", value: country.educationLoan.repaymentPeriod, icon: Clock },
                    { label: "Processing", value: country.educationLoan.processingTime, icon: Calendar },
                  ].map((item, i) => (
                    <div key={i} className="p-5 text-center">
                      <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="font-bold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gradient-subtle border-t">
                  <h4 className="font-bold mb-3">Loan Highlights</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {country.educationLoan.highlights.map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Eligibility & Requirements ─── */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Eligibility & <span className="text-gradient-hero">Requirements</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to apply for studying in {country.name}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Entry Requirements */}
              <div className="bg-card p-6 rounded-xl border shadow-soft animate-fade-in">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-gradient-hero rounded-lg text-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">Entry Requirements</h3>
                </div>
                <ul className="space-y-3">
                  {country.eligibility.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* English Tests */}
              <div className="bg-card p-6 rounded-xl border shadow-soft animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-gradient-gold rounded-lg text-white">
                    <Languages className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">English Tests</h3>
                </div>
                <ul className="space-y-3">
                  {country.englishTests.map((test, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <BadgeCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents Required */}
              <div className="bg-card p-6 rounded-xl border shadow-soft animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-gradient-accent rounded-lg text-white">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">Documents Required</h3>
                </div>
                <ul className="space-y-3">
                  {country.documentsRequired.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Frequently Asked <span className="text-gradient-hero">Questions</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Everything you need to know about studying in {country.name}
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {country.faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-card border rounded-xl px-6 shadow-soft data-[state=open]:shadow-elegant transition-smooth"
                  >
                    <AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:text-primary py-5 [&[data-state=open]]:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ─── Related Countries ─── */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore Other <span className="text-gradient-hero">Destinations</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover more study abroad opportunities
              </p>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {relatedCountries.map((relCountry, index) => (
                <Link
                  key={relCountry.slug}
                  to={`/countries/${relCountry.slug}`}
                  className="bg-card rounded-xl border p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth group animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{relCountry.flag}</span>
                    <div>
                      <h3 className="font-bold group-hover:text-primary transition-smooth">
                        {relCountry.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {relCountry.universities} Universities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{relCountry.avgCost}</span>
                    <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/countries"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-hero text-white rounded-xl font-semibold hover-glow-primary transition-smooth"
              >
                View All Countries <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Contact CTA ─── */}
        <section id="contact" className="py-16 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <span className="text-6xl mb-6 block">{country.flag}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Study in {country.name}?
              </h2>
              <p className="text-lg opacity-90 mb-8 leading-relaxed">
                Book a free consultation with our {country.name} education experts.
                We'll guide you through university selection, education loans, visa processing, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+918800000000"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-gold text-secondary-foreground font-bold rounded-xl shadow-gold hover-glow-gold transition-smooth"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/918800000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-smooth"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CountryPage;
