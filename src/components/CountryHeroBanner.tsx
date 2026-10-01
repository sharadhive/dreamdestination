import { 
  Building2, 
  DollarSign, 
  Briefcase, 
  BadgeCheck, 
  MessageCircle, 
  GraduationCap, 
  Sparkles, 
  Phone, 
  CheckCircle2, 
  ArrowRight,
  Award,
  ShieldCheck,
  Star,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/*
 * JPEG, not PNG, and deliberately so.
 *
 * These are photographs. As 1024x1024 PNGs the banners weighed about 550 KB
 * each, and each one is the largest element on its page — the Largest
 * Contentful Paint for every country page. Cropped to the artwork and
 * re-encoded they are 80-215 KB.
 *
 * The *-banner.png files beside these are the originals: mockups of a banner
 * hanging on a wall, drop shadow and grey surround included, and in four cases
 * a headline and a painted-on "LEARN MORE" button baked into the artwork.
 * Nothing imports them any more, so they can be deleted.
 */
import ukBanner from "@/assets/uk-banner.jpg";
import usaBanner from "@/assets/usa-banner.jpg";
import canadaBanner from "@/assets/canada-banner.jpg";
import australiaBanner from "@/assets/australia-banner.jpg";
import germanyBanner from "@/assets/germany-banner.jpg";
import franceBanner from "@/assets/france-banner.jpg";
import russiaBanner from "@/assets/russia-banner.jpg";
import dubaiBanner from "@/assets/dubai-banner.jpg";
import irelandBanner from "@/assets/ireland-banner.jpg";
import newZealandBanner from "@/assets/new-zealand-banner.jpg";
import japanBanner from "@/assets/japan-banner.jpg";
import indiaBanner from "@/assets/india-banner.jpg";
import globalCountriesBanner from "@/assets/global-countries-banner.jpg";
import italyBanner from "@/assets/italy-banner.jpg";
import netherlandsBanner from "@/assets/netherlands-banner.jpg";
import mauritiusBanner from "@/assets/mauritius-banner.jpg";
import spainBanner from "@/assets/spain-banner.jpg";
import switzerlandBanner from "@/assets/switzerland-banner.jpg";
import chinaBanner from "@/assets/china-banner.jpg";
/* Ukraine and Iran banners exist and are mapped below, but /countries/ukraine and
   /countries/iran render through CountryPage.tsx, which uses a gradient hero
   rather than this component. The mapping is here so the artwork is wired the
   moment those pages are given a banner hero. */
import ukraineBanner from "@/assets/ukraine-banner.jpg";
import iranBanner from "@/assets/iran-banner.jpg";
import singaporeBanner from "@/assets/singapore-banner.jpg";
import malaysiaBanner from "@/assets/malaysia-banner.jpg";

export interface CountryHeroBannerProps {
  countryName: string;
  flag: string;
  heading?: string;
  subheading?: string;
  description: string;
  valueProposition?: string;
  badgeText?: string;
  stats?: {
    universities?: string;
    avgCost?: string;
    workPermit?: string;
    visaSuccessRate?: string;
  };
  cta1Text?: string;
  cta1Href?: string;
  cta2Text?: string;
  cta2Href?: string;
  bgImageUrl?: string;
  /**
   * Breadcrumb trail, rendered floating over the banner instead of in a bar
   * above it. The last item is the current page and is not a link.
   */
  breadcrumb?: { label: string; to?: string }[];
}

const countryBannerMap: Record<string, string> = {
  "uk": ukBanner,
  "united kingdom": ukBanner,
  "great britain": ukBanner,
  "usa": usaBanner,
  "united states": usaBanner,
  "united states of america": usaBanner,
  "canada": canadaBanner,
  "australia": australiaBanner,
  "germany": germanyBanner,
  "france": franceBanner,
  "russia": russiaBanner,
  "dubai": dubaiBanner,
  "uae": dubaiBanner,
  "united arab emirates": dubaiBanner,
  "ireland": irelandBanner,
  "new zealand": newZealandBanner,
  "japan": japanBanner,
  "india": indiaBanner,
  "in": indiaBanner,
  "gb": ukBanner,
  "us": usaBanner,
  "ca": canadaBanner,
  "au": australiaBanner,
  "de": germanyBanner,
  "fr": franceBanner,
  "ru": russiaBanner,
  "ae": dubaiBanner,
  "ie": irelandBanner,
  "nz": newZealandBanner,
  "jp": japanBanner,
  "italy": italyBanner,
  "it": italyBanner,
  "netherlands": netherlandsBanner,
  "nl": netherlandsBanner,
  "mauritius": mauritiusBanner,
  "mu": mauritiusBanner,
  "spain": spainBanner,
  "es": spainBanner,
  "switzerland": switzerlandBanner,
  "ch": switzerlandBanner,
  "china": chinaBanner,
  "cn": chinaBanner,
  "singapore": singaporeBanner,
  "sg": singaporeBanner,
  "malaysia": malaysiaBanner,
  "my": malaysiaBanner,
  "ukraine": ukraineBanner,
  "ua": ukraineBanner,
  "iran": iranBanner,
  "ir": iranBanner,
  // The /countries hub: a place-less page rather than one country.
  "all study destinations": globalCountriesBanner,
};

const getCountryIsoCode = (countryName: string, flagEmoji?: string): string => {
  if (flagEmoji && flagEmoji.length >= 2) {
    try {
      const codePoints = Array.from(flagEmoji).map(c => c.codePointAt(0) || 0);
      if (codePoints.length >= 2 && codePoints[0] >= 0x1F1E6 && codePoints[0] <= 0x1F1FF) {
        const char1 = String.fromCharCode(codePoints[0] - 0x1F1E6 + 97);
        const char2 = String.fromCharCode(codePoints[1] - 0x1F1E6 + 97);
        return (char1 + char2).toLowerCase();
      }
    } catch {
      // Fallback to name map if parsing fails
    }
  }

  const nameMap: Record<string, string> = {
    "uk": "gb",
    "united kingdom": "gb",
    "great britain": "gb",
    "usa": "us",
    "united states": "us",
    "united states of america": "us",
    "canada": "ca",
    "australia": "au",
    "germany": "de",
    "france": "fr",
    "ireland": "ie",
    "new zealand": "nz",
    "dubai": "ae",
    "uae": "ae",
    "united arab emirates": "ae",
    "russia": "ru",
    "japan": "jp",
    "china": "cn",
    "singapore": "sg",
    "switzerland": "ch",
    "italy": "it",
    "spain": "es",
    "netherlands": "nl",
    "poland": "pl",
    "sweden": "se",
    "norway": "no",
    "finland": "fi",
    "denmark": "dk",
    "austria": "at",
    "belgium": "be",
    "czech republic": "cz",
    "hungary": "hu",
    "malaysia": "my",
    "south korea": "kr",
    "india": "in",
  };

  const cleanName = countryName.toLowerCase().trim();
  // No "|| gb" default here on purpose. Returning Britain for anything
  // unrecognised meant an unmapped page silently displayed the wrong country's
  // flag — which is exactly what the /countries hub was doing.
  return nameMap[cleanName] || "";
};

const CountryHeroBanner = ({
  countryName,
  flag,
  heading,
  subheading,
  description,
  valueProposition,
  badgeText,
  stats,
  cta1Text = "Get Free Consultation",
  cta1Href = "#contact",
  cta2Text = "View Top Colleges",
  cta2Href = "#universities",
  bgImageUrl,
  breadcrumb
}: CountryHeroBannerProps) => {
  const isoCode = getCountryIsoCode(countryName, flag);

  const cleanName = countryName.toLowerCase().trim();
  const defaultBg = countryBannerMap[cleanName] || (isoCode ? countryBannerMap[isoCode] : undefined);
  const activeBg = bgImageUrl || defaultBg;

  return (
    /*
     * LAYERING — read this before touching the classes below.
     *
     * Every background layer here used to carry a NEGATIVE z-index. A child
     * with a negative z-index does not sit behind its parent's own background
     * unless the parent establishes a stacking context, and `relative` alone
     * does not establish one. So the banner image and all the overlays were
     * painting behind this section's opaque `bg-slate-950` — invisible on every
     * country page. That is why the hero looked like a plain dark block with
     * text floating on it.
     *
     * `isolate` establishes the stacking context; layers sit at z-0 and the
     * content container at z-10.
     *
     * SPACING — the site header is `fixed`, so it takes up no space in the
     * flow. With only py-12 here the badge pill slid under it at scroll-top.
     * The top padding now clears the header and leaves breathing room.
     */
    /*
     * Built to match the About page's hero (src/pages/AboutPage.tsx): a
     * contained, rounded banner card inside the container rather than a
     * full-bleed band across the viewport.
     *
     * The card is roughly 2.4:1, and the banner artwork is authored at exactly
     * 1920x800 to suit it, so `object-cover` crops next to nothing on a desktop
     * instead of throwing away half the composition. Each banner carries its own
     * dark navy on the left — that is where the headline sits — and the flag and
     * landmark on the right.
     *
     * LAYERING: these layers previously used a negative z-index, which put them
     * behind the section's own opaque background and made the banner invisible
     * on every country page. Layers are at z-0, content at z-10, and the card
     * itself paints no background of its own.
     *
     * SPACING: do NOT add header clearance here. The only consumer,
     * GenericStudyPage, already puts a breadcrumb bar with `pt-20` directly
     * above this hero, and on wider screens a sticky sub-nav above that. Adding
     * pt-24 here on top of that produced roughly 190px of dead white space
     * between the breadcrumb and the card.
     */
    <section className="relative pt-4 pb-6 lg:pt-4 lg:pb-8">
      <div className="container mx-auto px-4">
        <div className="relative isolate w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-slate-950 text-white min-h-[360px] sm:min-h-[400px] lg:min-h-[440px] flex items-center px-5 py-6 sm:px-8 sm:py-7 lg:px-12 lg:py-6">

      {/* The banner. object-right on small screens keeps the flag and landmark
          in frame when the card is far narrower than the artwork. */}
      {activeBg ? (
        <img
          src={activeBg}
          alt={`Study in ${countryName} — flag and landmarks`}
          width={1920}
          height={800}
          loading="eager"
          decoding="async"
          className="absolute inset-0 z-0 h-full w-full object-cover object-right pointer-events-none sm:object-center"
        />
      ) : (
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 via-slate-950 to-slate-950 pointer-events-none" />
      )}

      {/* Readability mask. Heavy on the left where the headline sits, clearing
          on the right so the flag and landmark are actually visible — the About
          banner masks edge to edge because its artwork is only texture; here it
          is the point. */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/45 pointer-events-none lg:via-slate-950/65 lg:to-transparent" />

      {/* Decorative Ambient Lighting Glows */}
      <div className="absolute top-0 right-0 z-0 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 z-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column (8 Cols on LG): Main Content, Title, CTAs & Guarantees */}
          <div className="lg:col-span-8 space-y-3 text-left animate-fade-in">
            
            {/*
              Breadcrumb, floating on the banner.

              It used to be a full-width bar above the hero with its own
              background and border, which cost roughly 50px of vertical space
              at the top of every country page and pushed the banner down. Over
              the artwork it costs nothing: plain text, no card, no border.

              Gold on the current page, muted white on the links, with a
              drop-shadow so it stays legible wherever the artwork is bright.
            */}
            {breadcrumb && breadcrumb.length > 0 && (
              <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
                {breadcrumb.map((crumb, i) => {
                  const isLast = i === breadcrumb.length - 1;
                  return (
                    <span key={crumb.label} className="inline-flex items-center gap-2">
                      {i > 0 && <ChevronRight className="w-3 h-3 text-white/40 shrink-0" aria-hidden="true" />}
                      {crumb.to && !isLast ? (
                        <Link
                          to={crumb.to}
                          className="text-white/70 drop-shadow transition-colors hover:text-secondary"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span
                          className="font-semibold text-gradient-gold drop-shadow"
                          aria-current={isLast ? "page" : undefined}
                        >
                          {crumb.label}
                        </span>
                      )}
                    </span>
                  );
                })}
              </nav>
            )}

            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-secondary animate-pulse shrink-0" />
              <span>{badgeText || `Study in ${countryName} - DreamDestination Guide`}</span>
            </div>

            {/* Title Header */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-white drop-shadow-lg">
                {heading ? (
                  heading
                ) : (
                  <>
                    Study in <span className="text-gradient-gold">{countryName}</span>
                  </>
                )}
              </h1>
              {subheading && (
                <p className="text-sm sm:text-base lg:text-lg text-secondary font-bold tracking-wide">
                  {subheading}
                </p>
              )}
            </div>

            {/* Country Description */}
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light max-w-2xl drop-shadow">
              {description}
            </p>

            {valueProposition && (
              <p className="text-xs text-white/75 italic max-w-2xl">
                {valueProposition}
              </p>
            )}

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a href={cta1Href}>
                <Button size="lg" className="bg-gradient-gold text-secondary-foreground font-extrabold shadow-gold hover-glow-gold px-6 py-5 rounded-xl flex items-center gap-2 text-sm">
                  <MessageCircle className="w-5 h-5" />
                  {cta1Text}
                </Button>
              </a>

              <a href={cta2Href}>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-primary font-bold px-6 py-5 rounded-xl flex items-center gap-2 text-sm transition-all">
                  <GraduationCap className="w-5 h-5" />
                  {cta2Text}
                </Button>
              </a>
            </div>

            {/* Key Guarantees Row */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/90 font-medium">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                100% Free Counseling
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-secondary shrink-0" />
                Collateral-Free Loan Assistance
              </span>
            </div>

          </div>

          {/* Right Column (4 Cols on LG): Completely clear of any card/border to let the full flag image shine */}
          <div className="hidden lg:block lg:col-span-4" />

        </div>

        {/* Stat Badges Strip Integrated at Bottom of Full Width Hero */}
        {stats && (
          <div className="mt-5 pt-4 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-3 text-center max-w-3xl">
            {stats.universities && (
              <div className="bg-slate-950/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 hover:border-secondary/40 transition-all">
                <Building2 className="w-4 h-4 text-secondary mx-auto mb-1 opacity-90" />
                <p className="text-[10px] text-white/70 uppercase tracking-wider">Universities</p>
                <p className="text-sm sm:text-base font-extrabold text-white truncate">{stats.universities}</p>
              </div>
            )}

            {stats.avgCost && (
              <div className="bg-slate-950/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 hover:border-secondary/40 transition-all">
                <DollarSign className="w-4 h-4 text-secondary mx-auto mb-1 opacity-90" />
                <p className="text-[10px] text-white/70 uppercase tracking-wider">Avg Tuition</p>
                <p className="text-sm sm:text-base font-extrabold text-secondary truncate">{stats.avgCost}</p>
              </div>
            )}

            {stats.workPermit && (
              <div className="bg-slate-950/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 hover:border-secondary/40 transition-all">
                <Briefcase className="w-4 h-4 text-secondary mx-auto mb-1 opacity-90" />
                <p className="text-[10px] text-white/70 uppercase tracking-wider">Work Permit</p>
                <p className="text-sm sm:text-base font-extrabold text-white truncate">{stats.workPermit.split("(")[0].trim()}</p>
              </div>
            )}

            {stats.visaSuccessRate && (
              <div className="bg-slate-950/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 hover:border-secondary/40 transition-all">
                <BadgeCheck className="w-4 h-4 text-secondary mx-auto mb-1 opacity-90" />
                <p className="text-[10px] text-white/70 uppercase tracking-wider">Visa Success</p>
                <p className="text-sm sm:text-base font-extrabold text-secondary truncate">{stats.visaSuccessRate}</p>
              </div>
            )}
          </div>
        )}

      </div>
        </div>
      </div>
    </section>
  );
};

export default CountryHeroBanner;
