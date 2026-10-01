import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Reconciles the two halves of this site:
 *
 *  - The homepage behaves like a one-page site: its nav targets are #hash
 *    sections that must be scrolled to smoothly.
 *  - Every other route is a real page that must open at the top.
 *
 * React Router does neither by default — it leaves the scroll position exactly
 * where it was — so without this you land halfway down a new page.
 *
 * Hash targets are resolved with a retry loop rather than a fixed timeout,
 * because the homepage renders a Three.js globe and several large images: the
 * section you are scrolling to often does not exist yet at the moment the
 * route changes.
 */

/** Extra breathing room below the fixed header, in pixels. */
const EXTRA_OFFSET = 16;
/** Give slow sections up to this long to appear before giving up. */
const MAX_WAIT_MS = 3000;

const getHeaderOffset = (): number => {
  const header = document.querySelector("header");
  const height = header instanceof HTMLElement ? header.offsetHeight : 0;
  return height + EXTRA_OFFSET;
};

const scrollToElement = (el: Element) => {
  const top = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });

  // Move keyboard focus with the scroll so the jump works for screen readers too.
  if (el instanceof HTMLElement) {
    const hadTabIndex = el.hasAttribute("tabindex");
    if (!hadTabIndex) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
    if (!hadTabIndex) el.addEventListener("blur", () => el.removeAttribute("tabindex"), { once: true });
  }
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // No hash: this is a page navigation — start at the top, instantly.
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      return;
    }

    let cancelled = false;
    const startedAt = Date.now();
    let frame = 0;

    const attempt = () => {
      if (cancelled) return;

      let el: Element | null = null;
      try {
        el = document.querySelector(hash);
      } catch {
        // An invalid selector (e.g. "#123") would otherwise throw.
        el = document.getElementById(hash.slice(1));
      }

      if (el) {
        scrollToElement(el);
        return;
      }

      if (Date.now() - startedAt < MAX_WAIT_MS) {
        frame = window.requestAnimationFrame(attempt);
      } else {
        // Section never appeared — fall back to the top of the page.
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }
    };

    frame = window.requestAnimationFrame(attempt);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
