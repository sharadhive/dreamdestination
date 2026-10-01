import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Calculator, X } from "lucide-react";
import { LoanCalculatorPanel } from "@/components/LoanCalculator";

/**
 * The education loan EMI calculator, as a floating button on every page.
 *
 * ── WHY IT MOVED ──
 * It used to be a section on the homepage with a "Calculator" item in the
 * navbar. That meant a student reading about education loans in Nashik, or
 * about studying in Canada, had to navigate away from what they were reading to
 * work out an EMI — and the navbar item spent a slot on a tool rather than on a
 * destination. As a floating button it is available from all 500+ pages without
 * taking any space on any of them.
 *
 * ── WHY THE #calculator HASH STILL WORKS ──
 * The old section had id="calculator", and several places still link to it:
 * the hero CTA, the "How It Works" CTA and the footer's Loan Calculator link.
 * Rather than break three working calls to action, this component treats
 * #calculator as an instruction to open the dialog. So every one of those links
 * still does what a visitor expects, and a direct link to
 * dreamdestinationstudyabroad.com/#calculator opens the calculator too.
 *
 * The hash is cleared on close, otherwise clicking the same link twice would
 * not fire another hashchange and the dialog would refuse to reopen.
 *
 * ── POSITION ──
 * Stacked ABOVE FloatingContactWidget in the bottom-right corner, not opposite
 * it. Bottom-left looked tidier in isolation, but the site's content is
 * left-aligned — on the country pages the pill sat directly on top of the hero
 * paragraph. A right-hand stack keeps the whole left edge of every page clear,
 * and the vertical offset is large enough that neither button is a mis-tap
 * risk for the other on a phone.
 */
const FloatingCalculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    // Drop #calculator so the same link can open it again.
    if (window.location.hash === "#calculator") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    triggerRef.current?.focus();
  }, []);

  /*
   * #calculator, from any link anywhere on the site — and it arrives by two
   * different routes that need two different listeners:
   *
   *   • A plain <a href="#calculator"> (the hero and How It Works CTAs) changes
   *     the hash directly and fires `hashchange`. React Router never sees it.
   *   • The footer uses navigate("/#calculator"), a React Router history push.
   *     That does NOT fire `hashchange`, so only useLocation() catches it.
   *
   * Handling one and not the other leaves half the calculator links dead.
   */
  useEffect(() => {
    if (location.hash === "#calculator") setIsOpen(true);
  }, [location]);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#calculator") setIsOpen(true);
    };
    openFromHash(); // also covers landing directly on /#calculator
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  // Escape to close, and keep the page behind from scrolling under the dialog.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Pauses the WebGL globe while this is open — see HeroGlobe3D.tsx.
    document.documentElement.classList.add("dd-overlay-open");

    // Move focus into the dialog so a keyboard user is not left behind it.
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.documentElement.classList.remove("dd-overlay-open");
    };
  }, [isOpen, close]);

  /* Safety net — never leave the page locked or the globe paused if this
     component is torn down while open. */
  useEffect(
    () => () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("dd-overlay-open");
    },
    []
  );

  return (
    <>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Open the education loan EMI calculator"
        title="Education loan EMI calculator"
        className="group fixed bottom-[4.75rem] right-4 sm:bottom-[5.5rem] sm:right-6 z-50 flex items-center justify-center rounded-full border-2 border-white/40 bg-gradient-hero p-3.5 text-white shadow-2xl transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Calculator className="h-5 w-5 shrink-0 transition-transform group-hover:-rotate-12" />
        {/* Icon only, with the name in a tooltip on hover. A labelled pill here
            would sit directly above the "Contact Counselors" pill and read as
            one two-line blob rather than two separate controls. The accessible
            name is on aria-label above. */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:block">
          Loan Calculator
        </span>
      </button>

      {/* Dialog */}
      {isOpen && (
        <div
          /* No backdrop-blur: see the note in EnquiryPopup.tsx. Blurring a
              full-viewport layer over the animated hero re-rasterises the page
              every frame and stalls the main thread. */
          className="fixed inset-0 z-[60] flex items-end justify-center bg-background/85 p-0 sm:items-center sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="loan-calculator-title"
            tabIndex={-1}
            className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-2xl border border-border/80 bg-gradient-subtle p-4 shadow-2xl outline-none sm:rounded-2xl sm:p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="mb-1.5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                  <Calculator className="h-3.5 w-3.5" />
                  <span>EMI &amp; Repayment Estimator</span>
                </div>
                <h2 id="loan-calculator-title" className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  Education Loan Calculator
                </h2>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  Set the amount, tenure and rate to see the monthly EMI. Every figure
                  here is an estimate — the lender decides the real one.
                </p>
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Close the calculator"
                className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <LoanCalculatorPanel />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCalculator;
