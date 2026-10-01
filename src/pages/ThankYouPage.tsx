import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Phone, MessageCircle, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { CONTACT, SITE } from "@/config/site";
import { trackLead } from "@/lib/metaPixel";

/**
 * ── THANK YOU PAGE ──
 *
 * Every form on the site redirects here after submission. This is the page
 * that fires the Meta Pixel "Lead" conversion event, so Meta can attribute
 * the lead back to the ad that brought the visitor.
 *
 * WHY A DEDICATED PAGE INSTEAD OF AN INLINE "THANK YOU" MESSAGE
 *
 *   1. Meta Pixel attribution: The pixel fires a standard "Lead" event on
 *      mount. Meta's ad optimisation only counts events on a real page load —
 *      a DOM-only state change inside the same component is invisible to the
 *      pixel's built-in event deduplication and often gets swallowed.
 *
 *   2. GA4 destination goal: A URL-based conversion (/thank-you) is the
 *      simplest goal type to configure in GA4 and needs no custom events.
 *
 *   3. The visitor gets a clean, full-screen confirmation with next steps
 *      rather than a small inline message in the same section they just
 *      filled out.
 *
 * The page is noindex — it has no content worth ranking and should never
 * appear in search results.
 */

const ThankYouPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ── Fire Meta Pixel Lead event on mount ── */
  useEffect(() => {
    try {
      trackLead("Form Submission — Thank You Page", {
        page_path: "/thank-you",
        value: 1,
        currency: "INR",
      });
    } catch {
      /* Measurement is best-effort. Never block the page. */
    }

    /* GA4 event — separate from Meta so one failing doesn't stop the other */
    try {
      const w = window as unknown as {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
      };
      if (typeof w.gtag === "function") {
        w.gtag("event", "generate_lead", {
          form_source: "thank_you_page",
          page_path: "/thank-you",
          method: "form_redirect",
        });
      } else if (Array.isArray(w.dataLayer)) {
        w.dataLayer.push({
          event: "generate_lead",
          form_source: "thank_you_page",
          page_path: "/thank-you",
          method: "form_redirect",
        });
      }
    } catch {
      /* As above. */
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead
        title="Thank You | DreamDestination"
        description="Your enquiry has been received. Our counsellors will contact you shortly."
        canonicalUrl="/thank-you"
        noIndex
      />
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Success icon */}
          <div className="mx-auto w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>

          {/* Main message */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Thank You for Your Enquiry!
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
              Our study abroad counsellors will get in touch with you within{" "}
              <strong className="text-foreground">24 hours</strong>.
            </p>
          </div>

          {/* What happens next */}
          <div className="bg-card border rounded-2xl p-6 text-left space-y-4 shadow-soft">
            <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
              What happens next?
            </h2>
            <div className="space-y-3">
              {[
                { step: "1", text: "Our counsellor reviews your profile and requirements" },
                { step: "2", text: "We call or WhatsApp you to discuss your options" },
                { step: "3", text: "You receive a personalised study abroad plan" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    {item.step}
                  </span>
                  <p className="text-sm text-foreground pt-0.5">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact options */}
          <div className="bg-muted/40 border rounded-2xl p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Can't wait? Reach us now:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${CONTACT.phone}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-md w-full sm:w-auto justify-center"
              >
                <Phone className="w-4 h-4" />
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-md w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              {CONTACT.emailVerified && CONTACT.email && (
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border text-foreground font-semibold text-sm hover:bg-muted transition-colors shadow-xs w-full sm:w-auto justify-center"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  Email Us
                </a>
              )}
            </div>
          </div>

          {/* Back to homepage */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Homepage
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYouPage;
