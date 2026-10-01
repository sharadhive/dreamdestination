import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { X, Send, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT, ENQUIRY_POPUP } from "@/config/site";
import { sendLeadToWhatsApp, LEAD_CONFIRMATION } from "@/lib/leadToWhatsApp";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITEWIDE ENQUIRY POPUP
 *
 * Appears once per visitor, ENQUIRY_POPUP.delayMs after a page settles, on any
 * page. Collects name, mobile and what the student actually wants, then hands
 * off to WhatsApp through the same path every other form on the site uses.
 *
 * ── WHY IT WAITS, AND WHY THAT NUMBER MATTERS FOR SEO ──
 * Google's intrusive-interstitial guidance penalises pages that cover the
 * content with a dialog "immediately after the user navigates to a page from
 * search results". A popup on arrival is exactly that pattern, and on a site
 * whose whole plan is 555 pages ranking in Google, it would be self-defeating.
 *
 * A delay takes it out of scope — the visitor has seen and read the page before
 * anything appears. Twenty seconds also filters for genuine interest: someone
 * who bounced in three seconds never sees it, so the enquiries that do arrive
 * are from people who actually read something.
 *
 * ── WHY IT IS A BOTTOM SHEET ON MOBILE ──
 * Same reason. A full-screen overlay on a phone is the shape Google's guidance
 * describes most directly. Below `sm` this renders as a sheet anchored to the
 * bottom edge with the page still visible above it, which reads as an offer
 * rather than a wall. On desktop, where the guidance does not apply and a
 * centred dialog converts better, it is a centred dialog.
 *
 * ── WHY IT ONLY SHOWS ONCE ──
 * A popup that returns on every page view is the single fastest way to make a
 * site feel cheap. Dismissal is remembered for ENQUIRY_POPUP.snoozeDays; a
 * submitted enquiry suppresses it permanently. Both are stored per-browser in
 * localStorage, wrapped in try/catch because private windows and blocked site
 * data make it throw — and a storage failure must never stop the page working.
 *
 * ── WHERE IT DOES NOT APPEAR ──
 * /contact — the visitor is already looking at a form, and interrupting someone
 * mid-conversion to hand them a second form is worse than doing nothing.
 * ─────────────────────────────────────────────────────────────────────────── */

/**
 * The "purpose" dropdown.
 *
 * `value` is what gets written into the WhatsApp message, so a counsellor
 * reading the enquiry on their phone knows what it is about before replying.
 * Worded as the student would say it, not as the website names the service —
 * someone types "I need an education loan", not "financial assistance".
 */
const PURPOSES = [
  { value: "Education loan — studying abroad", group: "Funding" },
  { value: "Education loan — studying in India", group: "Funding" },
  { value: "Scholarship guidance", group: "Funding" },
  { value: "Free career counselling", group: "Getting started" },
  { value: "Course and university selection", group: "Getting started" },
  { value: "University admission application", group: "Applications" },
  { value: "Student visa assistance", group: "Applications" },
  { value: "IELTS / PTE / TOEFL / GRE preparation", group: "Applications" },
  { value: "Student accommodation", group: "After the offer" },
  { value: "Travel, forex and insurance", group: "After the offer" },
  { value: "Something else", group: "After the offer" },
] as const;

const GROUPS = ["Getting started", "Funding", "Applications", "After the offer"] as const;

const STORAGE_KEY = "dd_enquiry_popup";

/** How long the "WhatsApp is opening" confirmation stays up before the dialog
 *  closes itself. Long enough to read, short enough not to be in the way. */
const SUCCESS_VISIBLE_MS = 3200;

/**
 * ── OPENING THE FORM ON DEMAND ──
 *
 * Any button anywhere on the site can open this form by calling
 * `openEnquiryPopup()`, optionally naming which of the PURPOSES above it should
 * start on. It is wired through a DOM event rather than React context on
 * purpose: the popup is mounted once at the top of the app, outside the router,
 * and a context provider around the whole tree would re-render every page on
 * every keystroke typed into this form.
 *
 * A manual open ALWAYS opens — it ignores the 7-day snooze and the "already
 * submitted" flag, because the visitor just asked for it by clicking a button.
 */
export const ENQUIRY_EVENT = "dd:open-enquiry";

export const openEnquiryPopup = (purpose?: string): void => {
  window.dispatchEvent(new CustomEvent(ENQUIRY_EVENT, { detail: { purpose } }));
};

type StoredState = { dismissedAt?: number; submitted?: boolean };

const SESSION_KEY = "dd_enquiry_shown";

/** All storage access is guarded — private windows and blocked site data throw. */
const readState = (): StoredState => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredState) : {};
  } catch {
    return {};
  }
};

const writeState = (next: StoredState): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readState(), ...next }));
  } catch {
    /* Nothing to do. The popup simply reappears next visit. */
  }
};

/**
 * Mark the popup as "already shown" for THIS TAB only.
 *
 * sessionStorage is per-tab: closing the tab or opening a new tab resets it.
 * This is exactly the behaviour the owner wants: show once when someone
 * arrives, don't show again while they browse, show again if they come back
 * in a new tab.
 */
const markShownInTab = (): void => {
  try { window.sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* ok */ }
};
const wasShownInTab = (): boolean => {
  try { return window.sessionStorage.getItem(SESSION_KEY) === "1"; } catch { return false; }
};

const shouldShow = (): boolean => {
  // Permanently submitted → never show in any tab.
  const s = readState();
  if (s.submitted) return false;
  // Already shown in this tab (dismissed or fired) → don't show again.
  if (wasShownInTab()) return false;
  return true;
};

const EnquiryPopup = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", email: "", purpose: "", destination: "" });
  const [error, setError] = useState<string | null>(null);


  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<Element | null>(null);
  const armed = useRef(false);
  const timerRef = useRef<number | null>(null);
  /* Mirrors `manual` for the close() callback, which is memoised with [] deps
     and would otherwise capture a stale value. */
  const manualRef = useRef(false);

  /* The live pathname, readable from inside the timer without re-arming it. */
  const pathnameRef = useRef(location.pathname);
  pathnameRef.current = location.pathname;

  /** Is this route allowed to show the popup at all? */
  const isEligible = useCallback((path: string) => {
    if (!ENQUIRY_POPUP.enabled) return false;
    if (ENQUIRY_POPUP.suppressedRoutes.includes(path)) return false;
    if (ENQUIRY_POPUP.showOn === "home" && path !== "/") return false;
    return true;
  }, []);

  /* ── The timer ──
   *
   * ⚠️ The cleanup here deliberately does NOT clear the timeout.
   *
   * It used to, and that was a real bug: this effect re-runs on every route
   * change, so navigating anywhere inside the first twenty seconds destroyed
   * the pending timer — while `armed` stayed true and blocked it from ever
   * being set again. Anyone who clicked a link before the timer fired never saw
   * the popup for the rest of their visit. The timeout is now owned by a ref
   * and cleared only when the component unmounts (see the effect below). */
  useEffect(() => {
    if (armed.current) return;
    if (!isEligible(location.pathname)) return;
    if (!shouldShow()) return;

    armed.current = true;
    timerRef.current = window.setTimeout(() => {
      // Re-check at fire time against the CURRENT route: twenty seconds is long
      // enough to have navigated somewhere the popup should not appear, and
      // long enough to have submitted another form on the site.
      if (isEligible(pathnameRef.current) && shouldShow()) {
        markShownInTab();
        previouslyFocused.current = document.activeElement;
        setOpen(true);
      } else {
        // Not eligible right now — let it arm again if they reach a page that is.
        armed.current = false;
      }
    }, ENQUIRY_POPUP.delayMs);
  }, [location.pathname, isEligible]);

  /* ── Opened by a button ──
   *
   * Deliberately unconditional. If someone clicks "Apply for Loan Now" we show
   * the form, even if they dismissed the automatic one an hour ago. */
  useEffect(() => {
    const onOpenRequest = (e: Event) => {
      const purpose = (e as CustomEvent<{ purpose?: string }>).detail?.purpose;
      if (purpose && PURPOSES.some((p) => p.value === purpose)) {
        setForm((f) => ({ ...f, purpose }));
      }
      previouslyFocused.current = document.activeElement;
      setSent(false);
      setError(null);
      manualRef.current = true;
      setOpen(true);
    };

    window.addEventListener(ENQUIRY_EVENT, onOpenRequest);
    return () => window.removeEventListener(ENQUIRY_EVENT, onOpenRequest);
  }, []);

  /* Clear the pending timer only when the component actually goes away. */
  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    []
  );

  const close = useCallback((remember = true) => {
    setOpen(false);
    // Mark this tab as "popup already shown" so it never fires again during
    // this browsing session, regardless of how many pages the visitor views.
    markShownInTab();
    // A submitted enquiry is permanent (localStorage). A dismissal is
    // per-tab only (sessionStorage) — opening a new tab shows it again.
    if (remember && !manualRef.current) {
      // no-op for dismissal now; sessionStorage handles it
    }
    manualRef.current = false;
    // Do NOT reset armed — the popup must not re-arm on page navigation.
    // Send focus back where it was, so a keyboard user is not dropped at the
    // top of the document.
    const prev = previouslyFocused.current as HTMLElement | null;
    prev?.focus?.();
  }, []);

  /* ── After a successful submit: show the confirmation, then close itself ──
   *
   * The visitor has already been handed off to WhatsApp at this point, so the
   * confirmation is there to explain what just happened, not to be dismissed.
   * Leaving it sitting on the page means they come back from WhatsApp to a
   * dialog they have to close for no reason. It clears itself instead.
   *
   * `close(false)` because a submitted enquiry is not a dismissal — submit()
   * has already written `submitted: true`, which suppresses the popup for good.
   * The "Back to the page" button is still there for anyone who does not want
   * to wait. */
  useEffect(() => {
    if (!sent) return;
    const t = window.setTimeout(() => close(false), SUCCESS_VISIBLE_MS);
    return () => window.clearTimeout(t);
  }, [sent, close]);

  /* ── Escape to close, and stop the page scrolling behind the dialog ── */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      // Minimal focus trap: keep Tab inside the dialog.
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    /*
     * Tell the rest of the page that a full-screen overlay is up.
     *
     * HeroGlobe3D watches for this class and stops its WebGL render loop while
     * it is present. Without that, the browser is compositing a full-viewport
     * translucent layer on top of a scene that is redrawing 60 times a second,
     * and the main thread has nothing left for clicks — which is what made the
     * header stop responding whenever this dialog was open.
     */
    document.documentElement.classList.add("dd-overlay-open");

    // Focus the first field, but not on touch devices — that pops the keyboard
    // up over the dialog the moment it appears, which is hostile.
    const isCoarse = window.matchMedia?.("(pointer: coarse)").matches;
    if (!isCoarse) firstFieldRef.current?.focus();
    else dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.documentElement.classList.remove("dd-overlay-open");
    };
  }, [open, close]);

  /*
   * Safety net. If this component is ever unmounted while open — a route change
   * that swaps the tree, a hot reload in development, an error boundary — the
   * effect cleanup above may not get the chance to run, and the page would be
   * left permanently unscrollable with the globe paused. Both are released here
   * unconditionally.
   */
  useEffect(
    () => () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("dd-overlay-open");
    },
    []
  );

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [k]: e.target.value });
    if (error) setError(null);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = form.name.trim();
    const mobile = form.mobile.replace(/\s+/g, "");
    if (name.length < 2) return setError("Please tell us your name.");
    if (!/^(\+?91[-\s]?)?[6-9]\d{9}$/.test(mobile)) {
      return setError("Please enter a valid 10-digit Indian mobile number.");
    }
    if (!form.purpose) return setError("Please choose what you need help with.");

    sendLeadToWhatsApp("Website Enquiry Popup", {
      name,
      mobile,
      email: form.email.trim() || undefined,
      purpose: form.purpose,
      destination: form.destination.trim() || undefined,
      page: window.location.pathname,
    });

    writeState({ submitted: true });
    markShownInTab();
    setSent(true);
  };

  if (!open) return null;

  return (
    <div
      /*
       * No `backdrop-blur` here, deliberately.
       *
       * A blur on a full-viewport element forces the browser to re-rasterise
       * everything behind it on every single frame. Over the animated hero on
       * the front page that is the most expensive thing on the entire site, and
       * it was a direct cause of the page locking up while this was open. A
       * flat scrim costs nothing and reads the same. Raised the opacity from
       * /60 to /70 to keep the same separation without the blur.
       */
      className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/70 p-0 sm:items-center sm:p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-popup-title"
        aria-describedby="enquiry-popup-desc"
        tabIndex={-1}
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl border border-border/80 bg-card shadow-2xl outline-none sm:rounded-3xl"
      >
        {/* Close — generous hit area, top-right, always reachable. */}
        <button
          type="button"
          onClick={() => close()}
          aria-label="Close this form"
          className="absolute right-3 top-3 z-10 rounded-full p-2 text-muted-foreground bg-background/80 backdrop-blur-sm hover:bg-muted hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <X className="h-4.5 w-4.5 w-[18px] h-[18px]" />
        </button>

        {sent ? (
          /* ── Confirmation ── */
          <div className="p-7 sm:p-9 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h2 id="enquiry-popup-title" className="text-xl font-extrabold tracking-tight mb-2">
              {LEAD_CONFIRMATION.title}
            </h2>
            <p id="enquiry-popup-desc" className="text-sm text-muted-foreground leading-relaxed mb-6">
              {LEAD_CONFIRMATION.body}
            </p>
            <Button onClick={() => close(false)} className="font-semibold w-full sm:w-auto">
              Back to the page
            </Button>
          </div>
        ) : (
          <>
            {/* ── Header ── */}
            <div className="bg-gradient-hero text-white px-6 pt-7 pb-6 sm:px-8 rounded-t-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold backdrop-blur-sm mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Free first consultation</span>
              </div>
              <h2 id="enquiry-popup-title" className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
                Tell us what you need, and we will come back to you
              </h2>
              <p id="enquiry-popup-desc" className="mt-2 text-sm text-white/85 leading-relaxed">
                One counsellor handles course choice, admission, funding and the visa — because those
                four depend on each other.
              </p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={submit} className="px-6 py-6 sm:px-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ep-name" className="block text-xs font-bold text-foreground mb-1.5">
                    Full name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="ep-name"
                    ref={firstFieldRef}
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    className="w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label htmlFor="ep-mobile" className="block text-xs font-bold text-foreground mb-1.5">
                    Mobile <span className="text-primary">*</span>
                  </label>
                  <input
                    id="ep-mobile"
                    type="tel"
                    required
                    inputMode="numeric"
                    autoComplete="tel"
                    value={form.mobile}
                    onChange={set("mobile")}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              {/* The dropdown — the field that makes the enquiry actionable. */}
              <div>
                <label htmlFor="ep-purpose" className="block text-xs font-bold text-foreground mb-1.5">
                  What do you need help with? <span className="text-primary">*</span>
                </label>
                <select
                  id="ep-purpose"
                  required
                  value={form.purpose}
                  onChange={set("purpose")}
                  className="w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="" disabled>
                    Select a purpose…
                  </option>
                  {GROUPS.map((g) => (
                    <optgroup key={g} label={g}>
                      {PURPOSES.filter((p) => p.group === g).map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.value}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ep-destination" className="block text-xs font-bold text-foreground mb-1.5">
                    Destination <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="ep-destination"
                    type="text"
                    value={form.destination}
                    onChange={set("destination")}
                    placeholder="UK, Canada, India…"
                    className="w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label htmlFor="ep-email" className="block text-xs font-bold text-foreground mb-1.5">
                    Email <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="ep-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              {error && (
                <p role="alert" className="text-xs font-semibold text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" className="w-full font-bold shadow-gold bg-gradient-gold text-secondary-foreground">
                <Send className="mr-2 h-4 w-4" />
                {LEAD_CONFIRMATION.buttonLabel}
              </Button>

              {/* The honest note. It is also the reason to trust the form. */}
              <div className="flex items-start gap-2 pt-1">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Your details go straight to our counsellors on WhatsApp — no account, no spam. The
                  first consultation is free and we take no commission from any lender. Prefer to
                  talk now?{" "}
                  <a href={`tel:${CONTACT.phone}`} className="font-semibold text-primary hover:underline">
                    {CONTACT.phoneDisplay}
                  </a>
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EnquiryPopup;
