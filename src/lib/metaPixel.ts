import { META_PIXEL } from "@/config/site";

/**
 * Meta (Facebook) Pixel — SPA integration layer.
 *
 * ── HOW THE PIXEL IS LOADED ──
 * The base pixel code (fbq('init', …) + first PageView) lives in index.html
 * as Meta's standard copy-paste snippet. That fires on every full page load
 * and initialises the fbq queue even before React mounts.
 *
 * This module handles the SPA side:
 *   • initMetaPixel() — called once from MetaPixelRouteTracker on mount.
 *     It does NOT inject a second script or call fbq('init') again, because
 *     index.html already did both. It just marks the module as ready so
 *     subsequent calls to trackPageView / trackEvent / trackLead go through.
 *   • trackPageView() — fired on every React Router route change so every
 *     SPA navigation is recorded, not just the first page load.
 *   • trackEvent() / trackLead() — for conversion events.
 *
 * ── NOTHING FIRES WHEN THE PIXEL IS OFF ──
 * If META_PIXEL.id is empty or META_PIXEL.enabled is false, every function
 * here is a no-op. If an ad-blocker removes fbq from the page, the optional
 * chaining on window.fbq?.() swallows the call silently.
 */

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  }
}

const isConfigured = (): boolean =>
  META_PIXEL.enabled && typeof META_PIXEL.id === "string" && META_PIXEL.id.trim().length > 0;

let initialised = false;

/**
 * Mark the pixel as ready for SPA tracking. The pixel script and init call
 * are in index.html, so this does NOT inject anything — it only flips the
 * internal flag so trackPageView / trackEvent / trackLead start working.
 *
 * Called once from MetaPixelRouteTracker on mount. Safe to call more than once.
 * The first PageView is NOT fired here because index.html already fires one.
 */
export const initMetaPixel = (): boolean => {
  if (!isConfigured() || initialised || typeof window === "undefined") return false;
  initialised = true;
  return true;
};

/**
 * A PageView for an in-app route change.
 *
 * NOT called on the first mount — index.html already fires the initial
 * PageView. Only subsequent SPA navigations need this.
 */
export const trackPageView = (): void => {
  if (!isConfigured() || !initialised) return;
  window.fbq?.("track", "PageView");
};

/**
 * A standard Meta event. Use the standard names where one fits — "Lead",
 * "Contact", "CompleteRegistration", "ViewContent" — because Meta's ad
 * optimisation only understands those; a custom name still records, but cannot
 * be optimised towards.
 */
export const trackEvent = (event: string, params?: Record<string, unknown>): void => {
  if (!isConfigured() || !initialised) return;
  window.fbq?.("track", event, params);
};

/**
 * Fire a Meta "Lead" event.
 *
 * This is the event that matters commercially: it is what a Meta lead campaign
 * optimises for, so every form submission, WhatsApp click and call click on
 * the site should fire it.
 *
 * `source` says which interaction it was ("Study Abroad Enquiry", "WhatsApp
 * Enquiry", "Call Enquiry"), so you can see in Events Manager which actions
 * actually produce leads rather than just traffic.
 *
 * Safe to call when fbq is not available (ad-blocker, privacy mode) — the
 * call is silently swallowed and never prevents the user action from working.
 */
export const trackLead = (source: string, extra?: Record<string, unknown>): void => {
  trackEvent("Lead", { content_name: source, ...extra });
};
