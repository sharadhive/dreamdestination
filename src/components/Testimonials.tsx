import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, Users, Globe2, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CONTACT } from "@/config/site";

/* ─────────────────────────────────────────────────────────────────────────────
 * ⚠️ THIS SECTION USED TO CARRY SIX FABRICATED REVIEWS. READ THIS BEFORE EDITING.
 *
 * The previous version shipped six invented students — "Priya Sharma, MS in
 * Computer Science, Stanford University, ₹75 Lakhs, 2023" and five more — each
 * with a stock Unsplash portrait presented as that student's photograph, a
 * five-star rating, a named university and a loan amount.
 *
 * None of them existed. That is not marketing puff, it is a fabricated review,
 * and it carries three distinct risks:
 *
 *   • Google's spam policies treat fabricated reviews and misrepresentation as
 *     grounds for a manual action against the whole site, not one page.
 *   • India's Central Consumer Protection Authority guidelines on fake reviews
 *     (and IS 19000:2022) make publishing invented consumer reviews a
 *     consumer-protection matter, with the named universities as an aggravating
 *     detail.
 *   • The stock portraits are licensed images of real people, attributed to
 *     invented identities and invented quotes.
 *
 * Alongside them sat four invented statistics — "50K+ Happy Students", "98%
 * Success Rate", "₹5000Cr+ Loans Disbursed", "4.9★ Average Rating".
 *
 * ── HOW TO PUT REAL ONES BACK ──
 * Fill the array below, one entry per student, and the carousel renders again
 * automatically. Each entry needs ALL of:
 *   1. A real student who actually used DreamDestination.
 *   2. Their written permission to publish the quote, their first name and
 *      their course/university. Keep that permission on file.
 *   3. Their own words, not a rewritten version of them.
 *   4. A real photograph they supplied, or no photo at all — `image` is
 *      optional and the layout handles its absence. Never a stock portrait.
 *   5. A loan amount only if they agreed to publish it. `loanAmount` is
 *      optional; leave it out rather than estimating.
 *
 * Until that exists, the honest block below renders instead. An empty
 * testimonials section costs far less than a fabricated one.
 * ─────────────────────────────────────────────────────────────────────────── */
interface Testimonial {
  /** Real student, with written permission on file. */
  name: string;
  course: string;
  university: string;
  rating: number;
  /** Optional. A photo the student supplied — never a stock portrait. */
  image?: string;
  /** Their own words. */
  testimonial: string;
  /** Optional, and only with permission. */
  loanAmount?: string;
  year: string;
}

const testimonials: Testimonial[] = [];

/**
 * Facts that are true today and checkable from the site itself, replacing the
 * four invented counters. Every one of these can be verified by clicking
 * through — which is the entire point.
 */
const verifiableFacts = [
  {
    icon: Globe2,
    figure: "22",
    label: "Study destinations covered",
    note: "Plus guidance for students staying in India",
  },
  {
    icon: Users,
    figure: "480+",
    label: "Cities and 35 states served",
    note: "Counselling runs online, so location is not a barrier",
  },
  {
    icon: IndianRupee,
    figure: "Staged",
    label: "Multiple disbursement",
    note: "Released in instalments, timed to your fee deadlines",
  },
  {
    icon: ShieldCheck,
    figure: "₹0",
    label: "Commission taken from lenders",
    note: "And no fee for education loan guidance — first consult free",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasTestimonials = testimonials.length > 0;

  const nextTestimonial = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
            {hasTestimonials ? (
              <>Student <span className="text-gradient-success">Success Stories</span></>
            ) : (
              <>What We Will — And <span className="text-gradient-success">Won't</span> — Promise</>
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {hasTestimonials
              ? "In their own words, published with permission."
              : "We would rather show you nothing than show you reviews we made up. Student stories go here as students agree to share them — until then, here is what you can hold us to."}
          </p>
        </div>

        {hasTestimonials ? (
          <>
            {/* Main Testimonial Display */}
            <div className="max-w-4xl mx-auto mb-12 animate-slide-in-left">
              <div className="bg-card p-8 lg:p-12 rounded-2xl shadow-elegant relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-24 h-24 text-primary" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-center relative z-10">
                  <div className="text-center lg:text-left">
                    {testimonials[currentIndex].image && (
                      <div className="w-32 h-32 mx-auto lg:mx-0 mb-6 rounded-full overflow-hidden shadow-elegant">
                        <img
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          width={128}
                          height={128}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{testimonials[currentIndex].name}</h3>
                    <p className="text-primary font-semibold mb-1">{testimonials[currentIndex].course}</p>
                    <p className="text-muted-foreground text-sm mb-4">{testimonials[currentIndex].university}</p>

                    <div className="flex justify-center lg:justify-start items-center space-x-1 mb-4">
                      {Array.from({ length: testimonials[currentIndex].rating }, (_, i) => (
                        <Star key={i} className="w-5 h-5 text-accent fill-current" />
                      ))}
                    </div>

                    <div className="flex justify-center lg:justify-start items-center space-x-4 text-sm text-muted-foreground">
                      {testimonials[currentIndex].loanAmount && (
                        <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                          {testimonials[currentIndex].loanAmount}
                        </span>
                      )}
                      <span>{testimonials[currentIndex].year}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <Quote className="w-8 h-8 text-primary mb-4" />
                    <blockquote className="text-lg lg:text-xl leading-relaxed text-foreground mb-6 font-medium">
                      "{testimonials[currentIndex].testimonial}"
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center space-x-4 mb-12">
                <Button variant="outline" size="sm" onClick={prevTestimonial} aria-label="Previous student story">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to story ${index + 1}`}
                      className={`w-3 h-3 rounded-full transition-smooth ${
                        index === currentIndex ? "bg-primary scale-125" : "bg-muted hover:bg-primary/50"
                      }`}
                    />
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={nextTestimonial} aria-label="Next student story">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          /* ── The honest stand-in ── */
          <div className="max-w-4xl mx-auto mb-14 grid md:grid-cols-2 gap-5">
            <div className="bg-card rounded-2xl border border-border/80 p-6 md:p-7 shadow-soft">
              <h3 className="font-extrabold text-lg mb-4 text-foreground">What we will do</h3>
              <ul className="space-y-3">
                {[
                  "Work out the real cost and the real funding gap before you apply anywhere",
                  "Build a shortlist from your profile, including universities we earn nothing from",
                  "Compare lenders on total cost of borrowing, not the headline rate",
                  "Time the loan sanction so it lands before your visa appointment",
                  "Tell you plainly when your plan is a poor fit, and why",
                  "Give you the first consultation free, with no obligation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-2xl border border-border/80 p-6 md:p-7 shadow-soft">
              <h3 className="font-extrabold text-lg mb-4 text-foreground">What we will not promise</h3>
              <ul className="space-y-3">
                {[
                  "An interest rate — we are not a lender and have none to offer",
                  "A loan amount, or that any lender will approve you at all",
                  "An approval timeline on a bank's behalf",
                  "Admission to any university — that decision is theirs",
                  "A visa — that decision belongs to the immigration authority",
                  "A success-rate percentage we cannot evidence",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-4 h-4 shrink-0 mt-0.5 text-muted-foreground/70 font-bold leading-none text-center">×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Verifiable facts — replaces the four invented counters */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 animate-fade-in">
          {verifiableFacts.map(({ icon: Icon, figure, label, note }) => (
            <div key={label} className="text-center p-6 bg-card rounded-xl shadow-soft border border-border/60">
              <Icon className="w-6 h-6 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-extrabold text-foreground mb-1.5">{figure}</div>
              <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{note}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14 animate-fade-in">
          <div className="bg-gradient-hero p-8 rounded-2xl shadow-elegant text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Start with the free consultation</h3>
            <p className="text-base md:text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Bring your marksheets, a budget and a rough idea of where you want to go. You will leave
              knowing what you qualify for, what it costs and what you would need to borrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-gold text-secondary-foreground font-semibold shadow-gold hover-glow-gold" asChild>
                <Link to="/contact">Book a free consultation</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <a href={`tel:${CONTACT.phone}`}>Call {CONTACT.phoneDisplay}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
