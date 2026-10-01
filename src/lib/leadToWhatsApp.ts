/**
 * Every enquiry form on this site routes through here.
 *
 * ── WHY THIS EXISTS ──
 * Before this file, all 21 forms on the site did the same thing:
 *
 *     const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
 *
 * They prevented the browser's own submit, flipped a state flag to show a
 * "thank you, we'll be in touch within 24 hours" message, and discarded the
 * student's name, phone number and requirement. There was no backend, no email
 * service, no API endpoint. Every lead ever submitted was lost, and the visitor
 * was told otherwise.
 *
 * ── WHY WHATSAPP ──
 * The site builds to static files with no server, so there is nowhere to POST
 * to. WhatsApp's click-to-chat link carries the whole enquiry in the URL, which
 * means:
 *   • nothing can be silently lost — the message either sends or the student
 *     sees that it did not;
 *   • no spam folder, unlike an email form;
 *   • the student keeps a copy in their own chat history;
 *   • it lands in a thread that can be replied to immediately.
 *
 * ── HONESTY RULE ──
 * The form no longer claims the enquiry has been received. WhatsApp opens with
 * the message pre-written and the student still has to press send. Any
 * confirmation text must say that, not "we have received your enquiry".
 */

import { CONTACT } from "@/config/site";
import { trackLead as trackMetaLead } from "@/lib/metaPixel";

/** Ordered so the message reads naturally. Unknown keys are appended as-is. */
const FIELD_LABELS: Record<string, string> = {
  fullName: "Name",
  name: "Name",
  phone: "Phone",
  mobile: "Phone",
  email: "Email",
  city: "City",
  country: "Destination",
  destination: "Destination",
  course: "Course",
  preferredCourse: "Course",
  university: "University",
  intake: "Intake",
  preferredIntake: "Intake",
  highestQualification: "Qualification",
  graduationYear: "Graduation year",
  gpa: "Score",
  workExp: "Work experience",
  needLoan: "Needs education loan",
  loanRequired: "Needs education loan",
  loanAmount: "Loan amount",
  loanPartner: "Preferred lender",
  collateral: "Collateral available",
  admissionStatus: "Admission status",
  ieltsStatus: "English test status",
  scholarship: "Scholarship interest",
  previousRefusal: "Previous visa refusal",
  postStudyWork: "Post-study work interest",
  message: "Message",
};

const FIELD_ORDER = Object.keys(FIELD_LABELS);

export interface LeadFields {
  [key: string]: string | number | boolean | undefined | null;
}

/**
 * Fire the GA4 lead event.
 *
 * This is the piece that finally answers "which of my 209 pages actually
 * produces enquiries". It is wrapped in a try/catch and optional calls because
 * an ad blocker removing gtag must never stop the enquiry itself from being
 * sent — the lead matters more than the measurement.
 */
const trackLead = (source: string, fieldCount: number) => {
  try {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: unknown[];
    };
    if (typeof w.gtag === "function") {
      w.gtag("event", "generate_lead", {
        form_source: source,
        page_path: window.location.pathname,
        fields_completed: fieldCount,
        method: "whatsapp",
      });
    } else if (Array.isArray(w.dataLayer)) {
      // GTM is present but gtag is not — push the event so a GTM tag can catch it.
      w.dataLayer.push({
        event: "generate_lead",
        form_source: source,
        page_path: window.location.pathname,
        fields_completed: fieldCount,
        method: "whatsapp",
      });
    }
  } catch {
    /* Measurement is best-effort. Never block the enquiry. */
  }

  /*
   * Meta Pixel "Lead".
   *
   * Separate try/catch on purpose: a failure in one measurement pipeline must
   * not stop the other, and neither may stop the WhatsApp handoff. "Lead" is a
   * Meta STANDARD event name — that matters, because Meta can only optimise ad
   * delivery towards standard events. A custom name would still be recorded but
   * would be useless for lead campaigns.
   *
   * No-ops entirely until a pixel ID is set in src/config/site.ts.
   */
  try {
    trackMetaLead("Study Abroad Enquiry", { form_source: source, fields_completed: fieldCount, method: "whatsapp", page_path: window.location.pathname });
  } catch {
    /* As above. */
  }
};

/** Build the readable message that lands in WhatsApp. */
export const buildLeadMessage = (source: string, fields: LeadFields): string => {
  const filled = Object.entries(fields).filter(([, v]) => {
    if (v === undefined || v === null) return false;
    return String(v).trim() !== "";
  });

  // Known fields in a sensible order first, then anything unrecognised.
  const sorted = [...filled].sort((a, b) => {
    const ai = FIELD_ORDER.indexOf(a[0]);
    const bi = FIELD_ORDER.indexOf(b[0]);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  const lines = sorted.map(([k, v]) => {
    const label = FIELD_LABELS[k] ?? k.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase());
    return `${label}: ${String(v).trim()}`;
  });

  return [
    "New enquiry from dreamdestinationstudyabroad.com",
    "",
    `Enquiry about: ${source}`,
    `Page: ${window.location.pathname}`,
    "",
    ...lines,
  ].join("\n");
};

/**
 * Hand the enquiry to WhatsApp.
 *
 * Must be called from inside a real user gesture (a form submit handler) or the
 * browser will treat window.open as a popup and block it. If it is blocked
 * anyway, we fall back to navigating the current tab — losing the page is far
 * better than losing the lead.
 *
 * @param source  Human-readable name of the form, e.g. "Education Loan" or
 *                "Study in Canada". Appears in the message and in GA4.
 * @param fields  The form's state object. Empty values are dropped.
 * @returns       true if a WhatsApp window or navigation was initiated.
 */
export const sendLeadToWhatsApp = (source: string, fields: LeadFields): boolean => {
  const text = buildLeadMessage(source, fields);
  const digits = CONTACT.whatsapp.replace(/\D/g, "").slice(-12);
  const url = `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;

  trackLead(source, Object.values(fields).filter(v => String(v ?? "").trim() !== "").length);

  try {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) {
      // Popup blocked — navigate instead rather than dropping the enquiry.
      // The lead is always more important than the thank-you page measurement.
      window.location.href = url;
      return true;
    }
    // WhatsApp opened in a new tab. Redirect the current tab to /thank-you
    // so the Meta Pixel fires a Lead conversion on a proper page load.
    // Small delay lets the browser finish opening the new tab first.
    setTimeout(() => {
      window.location.href = "/thank-you";
    }, 300);
    return true;
  } catch {
    window.location.href = url;
    return true;
  }
};

/**
 * The confirmation wording every form should use after submit.
 *
 * Deliberately does NOT say the enquiry has been received, because it has not
 * been until the student presses send inside WhatsApp.
 */
export const LEAD_CONFIRMATION = {
  title: "WhatsApp is opening",
  body: "Your enquiry is ready with all your details filled in — press send in WhatsApp and it reaches our counsellors straight away.",
  buttonLabel: "Send Enquiry on WhatsApp",
} as const;
