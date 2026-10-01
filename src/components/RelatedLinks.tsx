import { Link } from "react-router-dom";
import { ArrowRight, Compass, Globe2, MapPin } from "lucide-react";
import { SERVICE_ROUTES } from "@/config/site";
import { STATES } from "@/data/locations";
import { cityUrl } from "@/lib/locationSeo";

/**
 * Site-wide internal linking block.
 *
 * Every page that renders this gains links into the three page clusters —
 * services, destinations and locations — which is what lets crawlers reach
 * deep pages and lets ranking signal flow between related pages instead of
 * pooling on the homepage.
 *
 * Pass `currentPath` so a page never links to itself.
 */

const DESTINATIONS = [
  { name: "UK", to: "/study-in-uk" },
  { name: "USA", to: "/study-in-usa" },
  { name: "Canada", to: "/study-in-canada" },
  { name: "Australia", to: "/study-in-australia" },
  { name: "Germany", to: "/study-in-germany" },
  { name: "Ireland", to: "/study-in-ireland" },
  { name: "New Zealand", to: "/study-in-new-zealand" },
  { name: "France", to: "/study-in-france" },
  { name: "Netherlands", to: "/study-in-netherlands" },
  { name: "Dubai / UAE", to: "/study-in-dubai" },
  { name: "Singapore", to: "/study-in-singapore" },
  { name: "India (for international students)", to: "/study-in-india" },
];

/** Metro and major cities, drawn from the location dataset so the two stay in step. */
const TOP_CITIES = STATES.flatMap(s => s.cities)
  .filter(c => c.tier === 1 || c.tier === 2)
  .slice(0, 30);

/**
 * ANCHOR TEXT IS THE POINT OF THIS BLOCK.
 *
 * A link reading "Mumbai" tells a search engine almost nothing. A link reading
 * "Education loan in Mumbai", sitting on the education loan page and pointing at
 * the Mumbai page, tells it what that destination page is about and what this
 * page is about. Anchor text is one of the few internal signals that genuinely
 * still carries weight.
 *
 * So the city links change wording depending on which service page renders them.
 * Nine service pages x 30 cities is 270 keyword-matched internal links, all of
 * them accurate descriptions of where they lead — which is the difference
 * between internal linking and keyword stuffing.
 *
 * A path with no entry here falls back to the plain city name.
 */
const CITY_LABEL_BY_PATH: Record<string, (city: string) => string> = {
  "/financial-assistance":    c => `Education loan in ${c}`,
  "/visa-assistance":         c => `Student visa consultants in ${c}`,
  "/admission-guidance":      c => `Admission guidance in ${c}`,
  "/career-counselling":      c => `Career counselling in ${c}`,
  "/scholarship-assistance":  c => `Scholarship guidance in ${c}`,
  "/student-accommodation":   c => `Student accommodation help in ${c}`,
  "/test-preparations":       c => `IELTS & test prep in ${c}`,
  "/travel-forex-assistance": c => `Student forex in ${c}`,
  "/insurance-assistance":    c => `Student insurance in ${c}`,
  "/countries":               c => `Study abroad consultants in ${c}`,
};

interface RelatedLinksProps {
  /** Current route, so the block never links back to the page you are on. */
  currentPath?: string;
  /** Accent colour class for headings, to match the host page. */
  accent?: string;
  heading?: string;
  showServices?: boolean;
  showDestinations?: boolean;
  showCities?: boolean;
}

const RelatedLinks = ({
  currentPath = "",
  accent = "text-primary",
  heading = "Explore More",
  showServices = true,
  showDestinations = true,
  showCities = true,
}: RelatedLinksProps) => {
  // Accept either "/visa-assistance" or a full canonical URL.
  const path = currentPath.startsWith("http")
    ? (() => { try { return new URL(currentPath).pathname; } catch { return currentPath; } })()
    : currentPath;

  const cityLabel = CITY_LABEL_BY_PATH[path] ?? ((c: string) => c);
  const hasServiceLabel = path in CITY_LABEL_BY_PATH;

  const services = SERVICE_ROUTES.filter(s => s.to !== path);
  const destinations = DESTINATIONS.filter(d => d.to !== path);
  const cities = TOP_CITIES.filter(c => cityUrl(c.slug) !== path);

  const columns = [showServices, showDestinations, showCities].filter(Boolean).length;
  if (columns === 0) return null;

  const gridCols =
    columns === 3 ? "md:grid-cols-3" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-1";

  const linkCls =
    "text-sm text-muted-foreground hover:text-primary transition-smooth block py-1";

  return (
    <section className="py-14 bg-muted/40 border-y" aria-label="Related pages">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-extrabold text-center mb-10">{heading}</h2>

        <div className={`grid grid-cols-1 ${gridCols} gap-10 max-w-6xl mx-auto`}>
          {showServices && (
            <nav aria-label="Our services">
              <div className="flex items-center gap-2 mb-4">
                <Compass className={`w-4 h-4 ${accent}`} />
                <h3 className="font-extrabold text-sm">Our Services</h3>
              </div>
              <div className="space-y-0.5">
                {services.map(s => (
                  <Link key={s.to} to={s.to} className={linkCls}>{s.label}</Link>
                ))}
              </div>
            </nav>
          )}

          {showDestinations && (
            <nav aria-label="Study destinations">
              <div className="flex items-center gap-2 mb-4">
                <Globe2 className={`w-4 h-4 ${accent}`} />
                <h3 className="font-extrabold text-sm">Study Destinations</h3>
              </div>
              <div className="space-y-0.5">
                {destinations.slice(0, 11).map(d => (
                  <Link key={d.to} to={d.to} className={linkCls}>Study in {d.name}</Link>
                ))}
                <Link to="/countries" className={`${linkCls} font-semibold text-primary`}>
                  All destinations →
                </Link>
              </div>
            </nav>
          )}

          {showCities && (
            <nav aria-label="Locations we serve">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className={`w-4 h-4 ${accent}`} />
                <h3 className="font-extrabold text-sm">
                  {hasServiceLabel ? "Serving Students Across India" : "Popular Cities"}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cities.map(c => (
                  <Link
                    key={c.slug}
                    to={cityUrl(c.slug)}
                    className="px-2.5 py-1 rounded-lg bg-card border text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                  >
                    {cityLabel(c.name)}
                  </Link>
                ))}
              </div>
              <Link
                to="/locations"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline mt-4"
              >
                All locations across India <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedLinks;
