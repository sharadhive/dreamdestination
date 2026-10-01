import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, Phone, MessageCircle, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedLinks from "@/components/RelatedLinks";
import SEOHead from "@/components/SEOHead";
import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";

const SITE_DOMAIN = "https://www.dreamdestinationstudyabroad.com";

export interface ServicePageData {
  seo: { title: string; description: string; canonicalUrl: string; keywords: string[] };
  hero: { icon: string; badge: string; title: string; highlight: string; description: string; primaryCta: string; secondaryCta: string };
  intro: { heading: string; paragraphs: string[] };
  whatWeOffer: { heading: string; items: { title: string; description: string }[] };
  howItWorks: { heading: string; steps: { step: number; title: string; description: string }[] };
  whoIsItFor: { heading: string; points: string[] };
  keyBenefits: { heading: string; benefits: string[] };
  whyDD: { heading: string; points: string[] };
  faqs: { question: string; answer: string }[];
  ctaSection: { heading: string; description: string };

  /* ─── Optional richer sections ─── */

  /** Detailed blocks, each with its own H2 — the main SEO body of the page. */
  deepDive?: {
    heading: string;
    intro?: string;
    blocks: { num: string; title: string; subtitle?: string; body: string; items?: string[]; note?: string }[];
  };
  /** Grouped checklist, e.g. documents required. */
  checklist?: { heading: string; intro?: string; groups: { title: string; items: string[] }[] };
  /** Common mistakes, numbered. */
  mistakes?: { heading: string; items: { title: string; description: string }[] };
  /** Comparison table. */
  comparison?: { heading: string; intro?: string; columns: string[]; rows: string[][]; note?: string };
}

const GenericServicePage: React.FC<{ data: ServicePageData }> = ({ data: D }) => {
  const [formState, setFormState] = useState({ fullName: "", phone: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hands the enquiry to WhatsApp. Before this, the form discarded it.
    sendLeadToWhatsApp(D.hero.title, formState);
    setFormSubmitted(true);
  };

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebPage", name: D.seo.title, description: D.seo.description, url: D.seo.canonicalUrl, inLanguage: "en-IN", isPartOf: { "@type": "WebSite", name: "DreamDestination", url: SITE_DOMAIN }, keywords: D.seo.keywords.join(", ") },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: D.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) },
    { "@context": "https://schema.org", "@type": "Service", name: D.hero.title, description: D.seo.description, areaServed: { "@type": "Country", name: "India" }, provider: { "@type": "EducationalOrganization", name: "DreamDestination", url: SITE_DOMAIN } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_DOMAIN}/` },
      { "@type": "ListItem", position: 2, name: D.hero.title, item: D.seo.canonicalUrl },
    ] },
    { "@context": "https://schema.org", "@type": "HowTo", name: D.howItWorks.heading, step: D.howItWorks.steps.map((st, i) => ({ "@type": "HowToStep", position: i + 1, name: st.title, text: st.description })) },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 selection:text-amber-600">
      <SEOHead title={D.seo.title} description={D.seo.description} canonicalUrl={D.seo.canonicalUrl} keywords={D.seo.keywords} jsonLd={jsonLd} />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gradient-subtle border-b pt-20">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">{D.hero.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-amber-50/60 via-background to-background dark:from-amber-950/10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="container mx-auto px-4 pt-12 md:pt-16">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /><span>{D.hero.badge}</span>
              </div>
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-6xl md:text-7xl drop-shadow-lg">{D.hero.icon}</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                {D.hero.title.split(D.hero.highlight)[0]}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-blue-600">{D.hero.highlight}</span>
                {D.hero.title.split(D.hero.highlight)[1] || ""}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{D.hero.description}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button size="lg" className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-amber-600/20 transition-all text-base w-full sm:w-auto" asChild>
                  <a href="#lead-form"><span>{D.hero.primaryCta}</span><ArrowRight className="w-5 h-5 ml-2" /></a>
                </Button>
                <Button size="lg" variant="outline" className="border-amber-500/20 text-foreground hover:bg-amber-500/5 font-semibold px-8 py-6 rounded-xl text-base w-full sm:w-auto" asChild>
                  <a href="tel:+919211818710"><Phone className="w-5 h-5 mr-2 text-amber-600" /><span>{D.hero.secondaryCta}</span></a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">{D.intro.heading}</h2>
              <div className="space-y-4">
                {D.intro.paragraphs.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed text-base">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{D.whatWeOffer.heading}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {D.whatWeOffer.items.map((item, i) => (
                <div key={i} className="bg-card border rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 font-bold text-sm text-white ${i % 3 === 0 ? "bg-amber-500" : i % 3 === 1 ? "bg-blue-500" : "bg-emerald-500"}`}>
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-amber-600 transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{D.howItWorks.heading}</h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-amber-500/20 hidden md:block" />
                <div className="space-y-6">
                  {D.howItWorks.steps.map((s, i) => (
                    <div key={i} className="flex gap-6 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                      <div className="shrink-0 hidden md:block">
                        <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-elegant z-10 relative">{s.step}</div>
                      </div>
                      <div className="flex-1 bg-card p-5 rounded-xl border shadow-soft">
                        <div className="flex items-center gap-2 mb-1 md:hidden">
                          <span className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs">{s.step}</span>
                        </div>
                        <h3 className="font-bold text-base mb-1">{s.title}</h3>
                        <p className="text-sm text-muted-foreground">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Is It For + Key Benefits */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft">
                <h2 className="text-2xl font-bold mb-6">{D.whoIsItFor.heading}</h2>
                <div className="space-y-3">
                  {D.whoIsItFor.points.map((p, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gradient-subtle rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft">
                <h2 className="text-2xl font-bold mb-6">{D.keyBenefits.heading}</h2>
                <div className="space-y-3">
                  {D.keyBenefits.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gradient-subtle rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why DreamDestination */}
        <section className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{D.whyDD.heading}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {D.whyDD.points.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card p-4 rounded-xl border shadow-soft">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-amber-600">{i + 1}</span>
                    </div>
                    <span className="text-sm text-foreground font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section id="lead-form" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-card border-2 border-amber-500/30 rounded-3xl p-6 md:p-10 shadow-elegant">
              <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
                <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">Free Consultation</span>
                <h2 className="text-2xl md:text-3xl font-extrabold">
                  Get <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-blue-600">Expert Guidance</span>
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground">Fill your details and our experts will contact you within 24 hours.</p>
              </div>
              {formSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Request Received!</h3>
                  <p className="text-sm text-muted-foreground">Thank you, {formState.fullName || "Student"}! Our specialist will reach out within 24 hours.</p>
                  <button type="button" onClick={() => setFormSubmitted(false)} className="px-6 py-2.5 rounded-xl border border-emerald-500/20 text-emerald-600 font-semibold hover:bg-emerald-500/10 transition-colors text-xs">Submit Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div><label className="text-xs font-semibold block mb-1" htmlFor="gs-name">Full Name *</label><input id="gs-name" type="text" required placeholder="Your Name" value={formState.fullName} onChange={e => setFormState({...formState, fullName: e.target.value})} className="w-full text-sm p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-amber-500/30" /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="gs-phone">Mobile *</label><input id="gs-phone" type="tel" required placeholder="+91 98765 43210" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})} className="w-full text-sm p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-amber-500/30" /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="gs-email">Email *</label><input id="gs-email" type="email" required placeholder="email@example.com" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} className="w-full text-sm p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-amber-500/30" /></div>
                  </div>
                  <div><label className="text-xs font-semibold block mb-1" htmlFor="gs-msg">How can we help?</label><textarea id="gs-msg" placeholder="Tell us about your requirements..." rows={3} value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} className="w-full text-sm p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-amber-500/30 resize-none" /></div>
                  <button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:opacity-90 text-white font-bold py-4 rounded-xl text-base shadow-elegant transition-all">{D.hero.primaryCta}</button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="py-20 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked <span className="text-amber-600">Questions</span></h2>
              </div>
              <Accordion type="single" collapsible className="space-y-3">
                {D.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-6 shadow-soft data-[state=open]:shadow-elegant transition-smooth">
                    <AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:text-amber-600 py-5 [&[data-state=open]]:text-amber-600">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-amber-600 via-amber-700 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{D.ctaSection.heading}</h2>
              <p className="text-lg opacity-90 mb-8 leading-relaxed">{D.ctaSection.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+919211818710" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-amber-700 font-bold rounded-xl shadow-lg transition-all"><Phone className="w-5 h-5" />Call Now</a>
                <a href="https://wa.me/919211818710" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-smooth"><MessageCircle className="w-5 h-5" />WhatsApp Us</a>
              </div>
            </div>
          </div>
        </section>
        {/* ─── Deep dive: the main keyword-bearing body ─── */}
        {D.deepDive && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">{D.deepDive.heading}</h2>
              {D.deepDive.intro && (
                <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto text-sm">{D.deepDive.intro}</p>
              )}
              <div className="max-w-5xl mx-auto space-y-6">
                {D.deepDive.blocks.map((b) => (
                  <article key={b.num} className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-elegant transition-all duration-300">
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-extrabold text-lg shadow-elegant">{b.num}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-extrabold mb-1">{b.title}</h3>
                        {b.subtitle && <p className="text-sm font-semibold text-amber-600 mb-3">{b.subtitle}</p>}
                        <p className="text-sm text-muted-foreground mb-4">{b.body}</p>
                        {b.items && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {b.items.map((i) => (
                              <div key={i} className="flex items-start gap-2 p-2 bg-muted/60 rounded-lg text-xs font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" /><span>{i}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {b.note && <p className="text-xs text-muted-foreground mt-4 pl-3 border-l-2 border-amber-500/40 italic">{b.note}</p>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Comparison table ─── */}
        {D.comparison && (
          <section className="py-20 bg-muted/40 border-y">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">{D.comparison.heading}</h2>
                {D.comparison.intro && <p className="text-center text-muted-foreground mb-10 text-sm">{D.comparison.intro}</p>}
                <div className="overflow-x-auto rounded-2xl border shadow-soft">
                  <table className="w-full text-sm min-w-[520px]">
                    <thead className="bg-muted/60">
                      <tr>{D.comparison.columns.map((c) => <th key={c} className="text-left font-bold p-4">{c}</th>)}</tr>
                    </thead>
                    <tbody>
                      {D.comparison.rows.map((row, ri) => (
                        <tr key={ri} className="border-t">
                          {row.map((cell, ci) => (
                            <td key={ci} className={`p-4 ${ci === 0 ? "font-semibold" : "text-muted-foreground"}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {D.comparison.note && <p className="text-xs text-muted-foreground italic mt-4">{D.comparison.note}</p>}
              </div>
            </div>
          </section>
        )}

        {/* ─── Checklist ─── */}
        {D.checklist && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">{D.checklist.heading}</h2>
              {D.checklist.intro && <p className="text-center text-muted-foreground mb-12 text-sm max-w-2xl mx-auto">{D.checklist.intro}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                {D.checklist.groups.map((g) => (
                  <div key={g.title} className="bg-card border rounded-2xl p-5 shadow-soft">
                    <h3 className="font-extrabold text-sm mb-3">{g.title}</h3>
                    <ul className="space-y-2">
                      {g.items.map((i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />{i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Mistakes ─── */}
        {D.mistakes && (
          <section className="py-20 bg-muted/40 border-y">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12">{D.mistakes.heading}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
                {D.mistakes.items.map((m, i) => (
                  <div key={m.title} className="bg-card border rounded-2xl p-5 shadow-soft flex items-start gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs">{i + 1}</span>
                    <div>
                      <h3 className="font-bold text-sm mb-1">{m.title}</h3>
                      <p className="text-xs text-muted-foreground">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <RelatedLinks currentPath={D.seo.canonicalUrl} accent="text-amber-600" />
      </main>
      <Footer />
    </div>
  );
};

export default GenericServicePage;
