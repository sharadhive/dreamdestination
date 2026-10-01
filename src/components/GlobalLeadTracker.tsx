import { useEffect, useRef } from "react";
import { trackLead } from "@/lib/metaPixel";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * GLOBAL LEAD TRACKER — WhatsApp clicks, Call clicks
 *
 * Mount this ONCE at the top of the app (inside BrowserRouter, next to
 * MetaPixelRouteTracker). It uses event delegation on `document` to detect
 * clicks on WhatsApp and telephone links ANYWHERE on the site — header,
 * footer, hero sections, floating buttons, country pages, service pages,
 * location pages, dynamically rendered CTAs — without editing each file.
 *
 * ── WHY EVENT DELEGATION ──
 * This site has 30+ pages with hardcoded <a href="https://wa.me/..."> and
 * <a href="tel:..."> links scattered across JSX. Editing every file to add
 * an onClick handler would be fragile — any new page or component added
 * later would miss the tracking. A single document-level listener catches
 * them all, including ones rendered dynamically after mount.
 *
 * ── DUPLICATE PREVENTION ──
 * Event bubbling means a click on <Phone /> inside <a href="tel:..."> fires
 * for both elements. We walk up to the <a> and only fire once per <a>.
 * We also mark each <a> with a data attribute after firing to prevent
 * double-fires within a 2-second window (e.g. rapid double-clicks).
 *
 * ── SAFETY ──
 * trackLead swallows errors silently — if fbq is blocked, the WhatsApp or
 * call action still works. The listener is passive and never calls
 * preventDefault().
 * ─────────────────────────────────────────────────────────────────────────── */

/** Cooldown in ms — ignore repeated clicks on the same link within this window. */
const COOLDOWN_MS = 2000;
const MARKER_ATTR = "data-dd-lead-tracked";

/**
 * Walk up the DOM from the click target to find the nearest <a> ancestor
 * (or the element itself if it is an <a>).
 */
const findAnchorAncestor = (el: HTMLElement | null): HTMLAnchorElement | null => {
  let current = el;
  while (current) {
    if (current.tagName === "A") return current as HTMLAnchorElement;
    current = current.parentElement;
  }
  return null;
};

/**
 * Is this anchor a WhatsApp link?
 * Matches wa.me links and CONTACT.whatsapp patterns.
 */
const isWhatsAppLink = (href: string): boolean => {
  if (!href) return false;
  const lower = href.toLowerCase();
  return lower.includes("wa.me/") || lower.includes("api.whatsapp.com/");
};

/**
 * Is this anchor a telephone link?
 */
const isTelLink = (href: string): boolean => {
  if (!href) return false;
  return href.toLowerCase().startsWith("tel:");
};

/**
 * Check and set cooldown. Returns true if the event should be fired.
 */
const shouldFire = (anchor: HTMLAnchorElement): boolean => {
  const lastFired = anchor.getAttribute(MARKER_ATTR);
  if (lastFired) {
    const elapsed = Date.now() - parseInt(lastFired, 10);
    if (elapsed < COOLDOWN_MS) return false;
  }
  anchor.setAttribute(MARKER_ATTR, String(Date.now()));
  return true;
};

/**
 * React component that sets up the global click listener.
 * Renders nothing.
 */
const GlobalLeadTracker = () => {
  const listenerAttached = useRef(false);

  useEffect(() => {
    if (listenerAttached.current) return;
    listenerAttached.current = true;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = findAnchorAncestor(target);
      if (!anchor) return;

      const href = anchor.href || anchor.getAttribute("href") || "";

      if (isWhatsAppLink(href)) {
        if (shouldFire(anchor)) {
          try {
            trackLead("WhatsApp Enquiry");
          } catch {
            /* Measurement must never block the action. */
          }
        }
      } else if (isTelLink(href)) {
        if (shouldFire(anchor)) {
          try {
            trackLead("Call Enquiry");
          } catch {
            /* Measurement must never block the action. */
          }
        }
      }
    };

    // Use capture phase to ensure we see the click even if a handler above
    // stops propagation — but do NOT prevent default or stop propagation
    // ourselves. The user action must always go through.
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      listenerAttached.current = false;
    };
  }, []);

  return null;
};

export default GlobalLeadTracker;
