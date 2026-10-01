import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initMetaPixel, trackPageView } from "@/lib/metaPixel";

/**
 * Loads the Meta Pixel once and fires a PageView on every route change.
 *
 * ── WHY A COMPONENT AND NOT A SCRIPT TAG ──
 * This is a single-page app. Meta's copy-paste snippet in index.html fires
 * exactly one PageView per full page load, so a student who lands on the
 * homepage and then reads four location pages is recorded as a single pageview.
 * Every retargeting audience built on "visited /financial-assistance" would come
 * back empty, and every ad spend decision made from that data would be wrong.
 *
 * Mounted inside <BrowserRouter> in App.tsx, next to <ScrollToTop />, which
 * exists for the same reason — SPA navigation does not behave like a page load.
 *
 * Renders nothing. Does nothing at all until META_PIXEL.id is set in
 * src/config/site.ts — no script, no request, no cookie.
 */
const MetaPixelRouteTracker = () => {
  const location = useLocation();
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      // initMetaPixel fires its own first PageView, so don't double-count it.
      initMetaPixel();
      firstRun.current = false;
      return;
    }
    trackPageView();
  }, [location.pathname, location.search]);

  return null;
};

export default MetaPixelRouteTracker;
