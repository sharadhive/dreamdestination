import { Link } from "react-router-dom";
import { ArrowRight, Compass, Globe2, MapPin, BookOpen, Building2 } from "lucide-react";
import { SERVICE_ROUTES, CONTENT_ROUTES } from "@/config/site";
import { countriesData } from "@/data/countryData";
import { getCountryUrl } from "@/lib/countryUrl";
import { STATES } from "@/data/locations";
import { cityUrl, stateUrl } from "@/lib/locationSeo";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * HOMEPAGE INTERNAL LINK HUB
 *
 * ── WHY THIS SECTION EXISTS ──
 * The homepage is the strongest page on this domain — it collects the most
 * external links and gets crawled most often. Before this section, almost none
 * of that strength reached the other 552 URLs: the homepage linked to the nine
 * services (inside a dropdown), a handful of countries, and nothing else. The
 * footer carried the location links, and footer links are discounted relative to
 * links in the body of a page.
 *
 * Meanwhile 513 location pages had no route from the homepage at all. A page
 * Google can only reach through a sitemap is a page Google deprioritises — and
 * with 342 of those newly switched to indexable, crawl priority is the whole
 * game over the next few months.
 *
 * ── HOW THE SELECTION IS MADE ──
 * Nothing here is a hand-maintained list. Everything derives from the same data
 * the rest of the site uses, so this section can never drift out of sync:
 *
 *   • Services      → SERVICE_ROUTES in config/site.ts (all nine)
 *   • Destinations  → countriesData, ordered as the data file orders them
 *   • Locations     → tier-1 cities from data/locations.ts, plus the largest
 *                     states by city count. Tier 1 first because those are the
 *                     pages with real search volume; the rest are reachable from
 *                     /locations and from each state page.
 *   • Content       → CONTENT_ROUTES (blog, reviews)
 *
 * ── WHY PLAIN <Link> AND NOT A CAROUSEL ──
 * Every link here is a real anchor in the initial HTML, rendered at page load.
 * Links inside a carousel, an accordion or anything that mounts on interaction
 * are worth much less — and on this site they also have to survive
 * scripts/prerender.mjs, which snapshots the DOM. A link that is not in that
 * snapshot does not exist for GPTBot, ClaudeBot or PerplexityBot, none of which
 * run JavaScript.
 * ─────────────────────────────────────────────────────────────────────────── */

/** Metros — tier 1 is the set with genuine standalone search volume. */
const metroCities = STATES.flatMap((s) => s.cities)
  .filter((c) => c.tier === 1)
  .sort((a, b) => a.name.localeCompare(b.name));

/** The states worth a direct link from the homepage: most cities served. */
const topStates = [...STATES]
  .sort((a, b) => b.cities.length - a.cities.length)
  .slice(0, 12)
  .sort((a, b) => a.name.localeCompare(b.name));

const totalCities = STATES.reduce((n, s) => n + s.cities.length, 0);

const LinkPill = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="px-3 py-1.5 bg-card border border-border/70 rounded-lg text-xs font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-all"
  >
    {children}
  </Link>
);

const Block = ({
  icon: Icon,
  title,
  note,
  hubTo,
  hubLabel,
  children,
}: {
  icon: typeof Compass;
  title: string;
  note: string;
  hubTo: string;
  hubLabel: string;
  children: React.ReactNode;
}) => (
  <div className="bg-card/70 backdrop-blur-sm border border-border/70 rounded-2xl p-6 shadow-soft">
    <div className="flex items-start justify-between gap-4 mb-1.5">
      <div className="flex items-center gap-2.5">
        <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" />
        </span>
        <h3 className="font-extrabold text-base text-foreground">{title}</h3>
      </div>
    </div>
    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{note}</p>
    <div className="flex flex-wrap gap-2 mb-4">{children}</div>
    <Link
      to={hubTo}
      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
    >
      {hubLabel} <ArrowRight className="w-3.5 h-3.5" />
    </Link>
  </div>
);

const HomeInternalLinks = () => {
  return (
    <section id="explore" className="py-16 lg:py-20 bg-gradient-subtle border-t">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4">
            <Compass className="w-4 h-4" />
            <span>Everything on this site, in one place</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Explore DreamDestination
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Nine services, 22 study destinations, and a page for every state and{" "}
            {totalCities > 0 ? `${totalCities}+ cities` : "city"} across India — whichever way you
            want to start.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 max-w-6xl mx-auto">
          <Block
            icon={Compass}
            title="What we help with"
            note="Each service has its own page with the process, the documents and the honest limits."
            hubTo="/contact"
            hubLabel="Talk to a counsellor"
          >
            {SERVICE_ROUTES.map((s) => (
              <LinkPill key={s.to} to={s.to}>{s.label}</LinkPill>
            ))}
          </Block>

          <Block
            icon={Globe2}
            title="Study destinations"
            note="Universities, real costs, the visa route by its official name, and post-study work rights."
            hubTo="/countries"
            hubLabel="Compare all 22 destinations"
          >
            {countriesData.map((c) => (
              <LinkPill key={c.slug} to={getCountryUrl(c.slug)}>{c.name}</LinkPill>
            ))}
          </Block>

          <Block
            icon={MapPin}
            title="Counselling in your city"
            note="We work online, so a student in a smaller town gets the same support as one in a metro."
            hubTo="/locations"
            hubLabel={`All ${totalCities}+ cities and 35 states`}
          >
            {metroCities.map((c) => (
              <LinkPill key={c.slug} to={cityUrl(c.slug)}>{c.name}</LinkPill>
            ))}
          </Block>

          <Block
            icon={Building2}
            title="By state"
            note="Each state page carries its own government scheme information, where one could be verified."
            hubTo="/locations"
            hubLabel="Browse every state"
          >
            {topStates.map((s) => (
              <LinkPill key={s.slug} to={stateUrl(s.slug)}>{s.name}</LinkPill>
            ))}
          </Block>
        </div>

        {/* Read and judge — the pages that build trust rather than sell. */}
        <div className="max-w-6xl mx-auto mt-5">
          <div className="bg-card/70 backdrop-blur-sm border border-border/70 rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </span>
              <h3 className="font-extrabold text-base text-foreground">Read, then decide</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Judge the advice before you commit to anyone — including us.
            </p>
            <div className="flex flex-wrap gap-2">
              {CONTENT_ROUTES.map((c) => (
                <LinkPill key={c.to} to={c.to}>{c.label}</LinkPill>
              ))}
              <LinkPill to="/about">About us</LinkPill>
              <LinkPill to="/contact">Contact</LinkPill>
              <LinkPill to="/financial-assistance">Education loan guidance</LinkPill>
              <LinkPill to="/study-in-india">Study in India</LinkPill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeInternalLinks;
