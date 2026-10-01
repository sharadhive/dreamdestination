import { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Youtube,
  Clock,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Globe,
  Compass,
  GraduationCap,
  ShieldCheck,
  Building2,
  ExternalLink,
} from "lucide-react";
import dreamDestinationsLogo from "@/assets/companylogo.png";
import { SITE, CONTACT, SOCIALS, SERVICE_ROUTES, LEGAL_ROUTES } from "@/config/site";
import { getCountryUrl } from "@/lib/countryUrl";
import { STATES } from "@/data/locations";
import { cityUrl, stateUrl } from "@/lib/locationSeo";

/* ─── Smart navigation: scrolls to section on homepage, navigates to /#section from other pages ─── */
const useSmartFooterNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (hash: string) => {
      if (location.pathname === "/") {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.location.hash = hash;
        }
      } else {
        navigate("/" + hash);
      }
    },
    [location.pathname, navigate]
  );
};

/* Homepage sections — these scroll rather than navigate. */
const SECTION_LINKS = [
  { label: "Loan Calculator", hash: "#calculator" },
  { label: "Success Stories", hash: "#testimonials" },
  { label: "FAQs", hash: "#faq" },
];

/* Real routes. */
const PAGE_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
  { label: "Blog", to: "/blogs" },
  { label: "Student Reviews", to: "/reviews" },
  { label: "All Study Destinations", to: "/countries" },
  { label: "Locations Across India", to: "/locations" },
  { label: "Study in India (International Students)", to: "/study-in-india" },
  { label: "Career Counselling", to: "/career-counselling" },
];

/** Metros — surfaced directly, never hidden behind a toggle. */
const METRO_CITIES = STATES.flatMap((s) => s.cities).filter((c) => c.tier === 1);

/** Every state, alphabetical, each with its full city list inside a dropdown. */
const ALL_STATES = [...STATES].sort((a, b) => a.name.localeCompare(b.name));

const TOTAL_CITIES = STATES.reduce((n, s) => n + s.cities.length, 0);

/* Destination links use the shared helper so they never point at a redirect. */
const FOOTER_DESTINATIONS = [
  { name: "UK", slug: "uk" },
  { name: "USA", slug: "usa" },
  { name: "Canada", slug: "canada" },
  { name: "Australia", slug: "australia" },
  { name: "Germany", slug: "germany" },
  { name: "Ireland", slug: "ireland" },
  { name: "New Zealand", slug: "new-zealand" },
  { name: "France", slug: "france" },
  { name: "Netherlands", slug: "netherlands" },
  { name: "Italy", slug: "italy" },
  { name: "Singapore", slug: "singapore" },
  { name: "Dubai / UAE", slug: "dubai" },
];

const Footer = () => {
  const smartNavigate = useSmartFooterNav();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-background via-card/90 to-muted/40 border-t border-border/80 pt-16 pb-8 overflow-hidden text-foreground">
      {/* Background Decorative Ambient Glows */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* ─── Top Highlights Banner / Quick Action Callout ─── */}
        <div className="mb-14 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border border-primary/20 backdrop-blur-md shadow-elegant flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-md shrink-0 hidden sm:flex">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Trusted Study Abroad Advisors
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                Ready to Begin Your Global Education Journey?
              </h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                Get expert guidance on admissions, education loans, scholarships, and visas tailored specifically for Indian students.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-emerald-600/30 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card hover:bg-muted border border-border text-foreground font-medium text-sm transition-all duration-300 shadow-xs hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4 text-primary" />
              Call Advisor
            </a>
          </div>
        </div>

        {/* ─── Main Footer Grid (5 Columns) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand + Contact Hub (Cols 1-2) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Link to="/" className="inline-flex items-center space-x-3 group mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-sm opacity-40 group-hover:opacity-100 transition duration-300" />
                  <img
                    src={dreamDestinationsLogo}
                    alt={`${SITE.name} logo`}
                    width={44}
                    height={44}
                    className="relative w-11 h-11 object-contain bg-card p-1 rounded-xl shadow-xs"
                  />
                </div>
                <div>
                  <span className="text-2xl font-extrabold text-gradient-hero tracking-tight block leading-tight">
                    {SITE.name}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    {SITE.tagline}
                  </span>
                </div>
              </Link>

              <p className="text-muted-foreground leading-relaxed text-sm max-w-md">
                Guiding Indian students through every stage of studying abroad — career counselling,
                university admissions, funding, visas, and accommodation.
              </p>
            </div>

            {/* Structured Interactive Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${CONTACT.phone}`}
                className="p-3 rounded-xl bg-card hover:bg-primary/5 border border-border/70 hover:border-primary/30 transition-all duration-300 group flex items-start gap-3 shadow-2xs"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Call Support</div>
                  <div className="text-sm font-semibold group-hover:text-primary transition-colors truncate">
                    {CONTACT.phoneDisplay}
                  </div>
                </div>
              </a>

              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-card hover:bg-emerald-500/5 border border-border/70 hover:border-emerald-500/30 transition-all duration-300 group flex items-start gap-3 shadow-2xs"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Instant Advice</div>
                  <div className="text-sm font-semibold group-hover:text-emerald-600 transition-colors truncate">
                    WhatsApp Us
                  </div>
                </div>
              </a>

              {CONTACT.emailVerified && CONTACT.email && (
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="p-3 rounded-xl bg-card hover:bg-primary/5 border border-border/70 hover:border-primary/30 transition-all duration-300 group flex items-start gap-3 shadow-2xs sm:col-span-2"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Official Email</div>
                    <div className="text-sm font-semibold group-hover:text-primary transition-colors break-all">
                      {CONTACT.email}
                    </div>
                  </div>
                </a>
              )}

              {CONTACT.addressVerified && CONTACT.address && (
                <div className="p-3 rounded-xl bg-card border border-border/70 flex items-start gap-3 shadow-2xs sm:col-span-2">
                  <div className="p-2 rounded-lg bg-secondary/10 text-secondary-foreground shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Headquarters</div>
                    <div className="text-xs text-foreground mt-0.5 leading-snug">{CONTACT.address}</div>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-card border border-border/70 flex items-start gap-3 shadow-2xs sm:col-span-2">
                <div className="p-2 rounded-lg bg-muted text-muted-foreground shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Working Hours</div>
                  <div className="text-xs font-medium text-foreground mt-0.5">{CONTACT.officeHours}</div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            {SOCIALS.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <span>Connect With Us</span>
                  <div className="h-px bg-border flex-1" />
                </h4>
                <div className="flex items-center space-x-2">
                  {SOCIALS.map(({ label, href, icon }) => {
                    const Icon = icon === "linkedin" ? Linkedin : icon === "youtube" ? Youtube : Instagram;
                    const hoverColor =
                      icon === "linkedin"
                        ? "hover:bg-sky-600 hover:text-white"
                        : icon === "youtube"
                        ? "hover:bg-red-600 hover:text-white"
                        : "hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white";
                    return (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={`p-2.5 rounded-xl bg-card border border-border/80 text-muted-foreground ${hoverColor} transition-all duration-300 hover:-translate-y-1 shadow-2xs hover:shadow-md`}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quick Links Column */}
          <nav aria-label="Quick links" className="space-y-4">
            <div>
              <h3 className="text-base font-bold tracking-tight text-foreground">Quick Links</h3>
              <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full mt-1.5" />
            </div>
            <ul className="space-y-1">
              {PAGE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-200 py-1"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-transform shrink-0 mr-1.5" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              {SECTION_LINKS.map((link) => (
                <li key={link.hash}>
                  <button
                    type="button"
                    onClick={() => smartNavigate(link.hash)}
                    className="group flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-200 py-1 bg-transparent border-none cursor-pointer w-full text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-transform shrink-0 mr-1.5" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Our Services Column */}
          <nav aria-label="Our services" className="space-y-4">
            <div>
              <h3 className="text-base font-bold tracking-tight text-foreground">Our Services</h3>
              <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full mt-1.5" />
            </div>
            <ul className="space-y-1">
              {SERVICE_ROUTES.map((service) => (
                <li key={service.to}>
                  <Link
                    to={service.to}
                    className="group flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-200 py-1"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-transform shrink-0 mr-1.5" />
                    <span>{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Study Destinations Column */}
          <nav aria-label="Study destinations" className="space-y-4">
            <div>
              <h3 className="text-base font-bold tracking-tight text-foreground">Study Destinations</h3>
              <div className="w-8 h-0.5 bg-gradient-to-r from-secondary to-accent rounded-full mt-1.5" />
            </div>
            <ul className="space-y-1">
              {FOOTER_DESTINATIONS.map((dest) => (
                <li key={dest.slug}>
                  <Link
                    to={getCountryUrl(dest.slug)}
                    className="group flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-200 py-1"
                  >
                    <Globe className="w-3.5 h-3.5 text-secondary/70 group-hover:text-primary group-hover:scale-110 transition-all shrink-0 mr-1.5" />
                    <span>Study in {dest.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                to="/countries"
                className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white border border-primary/20 px-3.5 py-2 rounded-xl transition-all duration-300 shadow-2xs hover:shadow-md group"
              >
                <span>View All Countries</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </nav>
        </div>

        {/* ─── Locations Across India Hub ─── */}
        <section aria-label="Locations we serve" className="mb-14 rounded-3xl bg-card/60 border border-border/70 p-6 md:p-8 backdrop-blur-sm shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-border/50">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                <Compass className="w-3.5 h-3.5" /> Pan-India Support Network
              </div>
              <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                Study Abroad &amp; Education Loan Guidance Across India
              </h3>
            </div>
            <Link
              to="/locations"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-glow bg-primary/5 hover:bg-primary/10 px-3.5 py-2 rounded-xl border border-primary/10 transition-all shrink-0 w-fit"
            >
              <span>All {ALL_STATES.length} States &amp; {TOTAL_CITIES} Cities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Metro Cities Tags */}
          <div className="mb-8">
            <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              <span>Major Tier-1 Cities</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {METRO_CITIES.map((c) => (
                <Link
                  key={c.slug}
                  to={cityUrl(c.slug)}
                  className="px-3 py-1.5 rounded-xl bg-background border border-border/70 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/40 transition-all duration-200 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* State & City Accordion Grid (<details> for SEO & prerender compatibility) */}
          <nav aria-label="All states and cities">
            <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span>Browse by State &amp; Union Territory</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {ALL_STATES.map((st) => (
                <details
                  key={st.slug}
                  className="group rounded-xl border border-border/60 bg-background/80 hover:bg-background transition-all duration-200 shadow-2xs overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-2 cursor-pointer list-none px-3.5 py-2.5 text-xs font-medium text-foreground/90 hover:text-primary transition-all select-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-2 truncate">
                      {st.name}
                      {st.scheme && (
                        <span
                          className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"
                          title="Verified Government Education Scheme Available"
                          aria-label="Verified Scheme"
                        />
                      )}
                    </span>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-semibold text-muted-foreground/70 bg-muted px-1.5 py-0.5 rounded-md">
                        {st.cities.length}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 group-open:rotate-180 group-open:text-primary" />
                    </span>
                  </summary>

                  <div className="px-3.5 pb-3 pt-1 border-t border-border/40 bg-muted/20 space-y-1">
                    <Link
                      to={stateUrl(st.slug)}
                      className="block text-xs font-semibold text-primary hover:underline py-1"
                    >
                      Study Abroad Consultants in {st.name} →
                    </Link>
                    <div className="space-y-0.5 pt-0.5">
                      {st.cities.map((c) => (
                        <Link
                          key={c.slug}
                          to={cityUrl(c.slug)}
                          className="block text-[11px] text-muted-foreground hover:text-primary transition-colors py-0.5 px-1 rounded hover:bg-primary/5"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-border/40 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
              <span>
                Green indicator marks states with verified government education loan or scholarship schemes.
              </span>
            </div>
          </nav>
        </section>

        {/* ─── Bottom Copyright & Legal Section ─── */}
        <div className="pt-8 border-t border-border/80">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-muted-foreground text-center md:text-left font-medium">
              © {year} <span className="font-bold text-foreground">{SITE.name}</span>. All rights reserved.
            </div>

            <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium">
              {LEGAL_ROUTES.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-card/40 border border-border/50 text-[11px] text-muted-foreground/80 text-center max-w-4xl mx-auto leading-relaxed shadow-2xs">
            {SITE.name} provides study abroad guidance and support services. Admission decisions rest with
            universities, visa decisions with the relevant immigration authorities, and loan approvals,
            interest rates and terms with the lender — each subject to their own eligibility criteria.
            We do not guarantee admission, a visa, a scholarship or loan approval.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
