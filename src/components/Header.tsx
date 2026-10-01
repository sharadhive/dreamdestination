import { useState, useCallback, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, Phone, MessageCircle, ChevronDown, Globe2, 
  Sparkles, ArrowRight, GraduationCap, Building2, ShieldCheck, Compass,
  BookOpen, Briefcase, Wallet, Award, Plane, FileText, Home, HeartHandshake, MapPin
} from "lucide-react";
import dreamDestinationsLogo from "@/assets/companylogo.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { countriesData } from "@/data/countryData";
import { getCountryUrl } from "@/lib/countryUrl";
import { STATES } from "@/data/locations";
import { cityUrl, stateUrl } from "@/lib/locationSeo";
import { CONTACT } from "@/config/site";

// ─── Services dropdown data ───
const SERVICES_DATA = [
  { label: "Test Preparations", href: "/test-preparations", icon: BookOpen, description: "IELTS, TOEFL, PTE, GRE, GMAT & more" },
  { label: "Career Counselling", href: "/career-counselling", icon: Compass, description: "Course, country & university guidance" },
  { label: "Admission Guidance", href: "/admission-guidance", icon: GraduationCap, description: "University application assistance" },
  { label: "Financial Assistance", href: "/financial-assistance", icon: Wallet, description: "Education loans & funding options" },
  { label: "Scholarships", href: "/scholarship-assistance", icon: Award, description: "Scholarship eligibility & applications" },
  { label: "Travel & Forex Assistance", href: "/travel-forex-assistance", icon: Plane, description: "Travel planning & forex support" },
  { label: "Visa Assistance", href: "/visa-assistance", icon: FileText, description: "Student visa documentation & prep" },
  { label: "Student Accommodation", href: "/student-accommodation", icon: Home, description: "Housing, booking & pre-departure" },
  { label: "Insurance Assistance", href: "/insurance-assistance", icon: HeartHandshake, description: "Health & travel insurance guidance" },
];

// ─── Smart navigation: scrolls to section on homepage, navigates to /#section from other pages ───
const useSmartNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const smartNavigate = useCallback(
    (hash: string, closeMenu?: () => void) => {
      if (closeMenu) closeMenu();

      // If already on the homepage, just scroll to the section
      if (location.pathname === "/") {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Navigate to the homepage with hash — React Router + browser will handle scroll
        navigate("/" + hash);
      }
    },
    [location.pathname, navigate]
  );

  return smartNavigate;
};

// URL logic lives in @/lib/countryUrl — shared with the footer, home page and countries index.

/** Metro and major cities, for the quick-pick row in the Locations menu. */
const MENU_CITIES = STATES.flatMap(st => st.cities).filter(c => c.tier <= 2).slice(0, 20);
/** States with a verified government scheme lead the list — they are the strongest pages. */
const MENU_STATES = [...STATES].sort((a, b) => Number(Boolean(b.scheme)) - Number(Boolean(a.scheme)));

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isMobileLocationsOpen, setIsMobileLocationsOpen] = useState(false);
  const [isMobileCountriesOpen, setIsMobileCountriesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const locationsDropdownRef = useRef<HTMLDivElement>(null);
  const locationsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const smartNavigate = useSmartNav();
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsCountriesOpen(false);
    setIsServicesOpen(false);
    setIsMobileCountriesOpen(false);
    setIsMobileServicesOpen(false);
    setIsLocationsOpen(false);
    setIsMobileLocationsOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountriesOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (locationsDropdownRef.current && !locationsDropdownRef.current.contains(event.target as Node)) {
        setIsLocationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsCountriesOpen(false);
    setIsServicesOpen(false);
    setIsLocationsOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsCountriesOpen(true);
    setIsServicesOpen(false);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCountriesOpen(false);
    }, 200);
  };

  const handleLocationsMouseEnter = () => {
    if (locationsTimeoutRef.current) clearTimeout(locationsTimeoutRef.current);
    setIsLocationsOpen(true);
    setIsCountriesOpen(false);
    setIsServicesOpen(false);
  };

  const handleLocationsMouseLeave = () => {
    locationsTimeoutRef.current = setTimeout(() => setIsLocationsOpen(false), 200);
  };

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setIsServicesOpen(true);
    setIsCountriesOpen(false);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-soft">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <img 
                src={dreamDestinationsLogo} 
                alt="DreamDestination Logo" width={48} height={48} 
                className="w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg filter drop-shadow-md"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-gradient-hero group-hover:scale-105 transition-transform duration-300">
                DreamDestination
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground font-medium tracking-wider">
                Study Abroad Experts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
            {/* Services Dropdown */}
            <div
              className="relative"
              ref={servicesDropdownRef}
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                onClick={() => { setIsServicesOpen(!isServicesOpen); setIsCountriesOpen(false); }}
                className={`flex items-center gap-1.5 text-sm font-medium transition-smooth py-2 bg-transparent border-none cursor-pointer ${
                  isServicesOpen ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                }`}
                aria-expanded={isServicesOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
              </button>

              {/* Services Mega Dropdown */}
              {isServicesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[420px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-card/95 backdrop-blur-xl border rounded-2xl shadow-elegant overflow-hidden p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-sm text-foreground">Our Services</span>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {SERVICES_DATA.length} Services
                      </span>
                    </div>

                    {/* Service Items */}
                    <div className="space-y-1">
                      {SERVICES_DATA.map((service) => {
                        const Icon = service.icon;
                        return (
                          <Link
                            key={service.href}
                            to={service.href}
                            onClick={() => setIsServicesOpen(false)}
                            className="group flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent transition-all duration-200 hover:border-primary/20 hover:bg-primary/5"
                          >
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                              <Icon className="w-4.5 h-4.5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                                {service.label}
                              </h4>
                              <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                                {service.description}
                              </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all shrink-0" />
                          </Link>
                        );
                      })}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-3 pt-3 border-t flex items-center justify-between bg-muted/40 rounded-xl px-4 py-2.5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Need personalised guidance?</span>
                      </div>
                      <a
                        href="tel:+919211818710"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Us</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* "How It Works" removed from the navbar. It scrolled to a homepage
                section, so from any other page it was a navigation that took you
                somewhere unexpected — and the slot is better spent on Blog and
                Reviews, which are real pages. The section itself still renders on
                the homepage; only the nav item is gone. */}

            {/* Dynamic Countries Dropdown */}
            <div 
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => {
                  setIsCountriesOpen(!isCountriesOpen);
                }}
                className={`flex items-center gap-1.5 text-sm font-medium transition-smooth py-2 bg-transparent border-none cursor-pointer ${
                  isCountriesOpen || location.pathname.includes("study-in") || location.pathname.includes("countries")
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
                aria-expanded={isCountriesOpen}
              >
                <span>Study Destinations</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCountriesOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
              </button>

              {/* Mega Dropdown Box */}
              {isCountriesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[680px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-card/95 backdrop-blur-xl border rounded-2xl shadow-elegant overflow-hidden p-5">
                    
                    {/* Header bar */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b">
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-sm text-foreground">Top Study Abroad Destinations</span>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {countriesData.length} Destinations
                      </span>
                    </div>

                    {/* Country Grid */}
                    <div className="grid grid-cols-3 gap-2.5">
                      {countriesData.map((country) => {
                        const url = getCountryUrl(country.slug);
                        const isFeatured = country.slug === "uk";
                        return (
                          <Link
                            key={country.slug}
                            to={url}
                            onClick={() => setIsCountriesOpen(false)}
                            className={`group flex items-start gap-3 p-2.5 rounded-xl border border-transparent transition-all duration-200 hover:border-primary/20 hover:bg-primary/5 ${
                              isFeatured ? "bg-amber-500/5 border-amber-500/20" : ""
                            }`}
                          >
                            <span className="text-2xl leading-none mt-0.5 group-hover:scale-115 transition-transform duration-200">
                              {country.flag}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                  {country.name}
                                </h4>
                                {isFeatured && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary text-primary-foreground">
                                    TOP
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                                {country.universities} Universities
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Bottom CTA Banner */}
                    <div className="mt-4 pt-3 border-t flex items-center justify-between bg-muted/40 rounded-xl px-4 py-2.5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Need guidance selecting the right country?</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Link
                          to="/locations"
                          onClick={() => setIsCountriesOpen(false)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
                        >
                          <span>Your City</span>
                        </Link>
                        <Link
                          to="/countries"
                          onClick={() => setIsCountriesOpen(false)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                        >
                          <span>View All Countries</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown — hidden from navbar, pages still accessible via direct URL and footer */}

            {/* Calculator removed from the navbar — it is now the floating
                button in FloatingCalculator.tsx, reachable from every page. */}

            {/* ── Order is deliberate ──
                Services and Destinations (the dropdowns above) are what a student
                arrives looking for. Blog and Reviews are what they read while
                deciding. About and Contact close the sequence — Contact last,
                nearest the Apply Now button, because that is the direction the
                eye travels on the way to converting. */}
            <Link
              to="/blogs"
              className="text-foreground hover:text-primary transition-smooth text-sm font-medium"
            >
              Blog
            </Link>

            <Link
              to="/reviews"
              className="text-foreground hover:text-primary transition-smooth text-sm font-medium"
            >
              Reviews
            </Link>

            <Link
              to="/about"
              className="text-foreground hover:text-primary transition-smooth text-sm font-medium"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-foreground hover:text-primary transition-smooth text-sm font-medium"
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            <LanguageSwitcher />
            <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary/5 hover-glow-primary font-medium" asChild>
              <a href={`tel:${CONTACT.phone}`}>
                <Phone className="w-4 h-4 mr-2 text-primary" />
                Call Now
              </a>
            </Button>
            <Button className="bg-gradient-gold text-secondary-foreground font-semibold shadow-gold hover-glow-gold" asChild>
              <Link to="/contact">
                <MessageCircle className="w-4 h-4 mr-2" />
                Apply Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-smooth"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t animate-fade-in max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col space-y-3 mt-4">
              {/* Mobile Expandable Services Section */}
              <div className="border-b pb-2 mb-1">
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="flex items-center justify-between w-full text-foreground hover:text-primary transition-smooth py-1.5 text-left bg-transparent border-none cursor-pointer text-base font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span>Services</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180 text-primary" : ""}`} />
                </button>

                {isMobileServicesOpen && (
                  <div className="flex flex-col gap-1 mt-3 pt-2 pl-2 animate-fade-in">
                    {SERVICES_DATA.map((service) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.href}
                          to={service.href}
                          onClick={closeMenu}
                          className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          <Icon className="w-4 h-4 text-primary shrink-0" />
                          <div className="min-w-0">
                            <span className="text-sm font-medium block">{service.label}</span>
                            <span className="text-[10px] text-muted-foreground block truncate">{service.description}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile Expandable Countries Section */}
              <div className="border-y py-2 my-1">
                <button
                  onClick={() => setIsMobileCountriesOpen(!isMobileCountriesOpen)}
                  className="flex items-center justify-between w-full text-foreground hover:text-primary transition-smooth py-1.5 text-left bg-transparent border-none cursor-pointer text-base font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-primary" />
                    <span>Study Destinations</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isMobileCountriesOpen ? "rotate-180 text-primary" : ""}`} />
                </button>

                {isMobileCountriesOpen && (
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-3 pt-2 pl-1 sm:pl-2 animate-fade-in">
                    {countriesData.map((country) => {
                      const url = getCountryUrl(country.slug);
                      return (
                        <Link
                          key={country.slug}
                          to={url}
                          onClick={closeMenu}
                          className="flex items-center gap-1.5 p-2 rounded-lg bg-muted/40 hover:bg-primary/10 hover:text-primary transition-colors text-xs font-medium min-w-0"
                        >
                          <span className="text-base shrink-0">{country.flag}</span>
                          <span className="truncate min-w-0">{country.name}</span>
                        </Link>
                      );
                    })}
                    <Link
                      to="/countries"
                      onClick={closeMenu}
                      className="col-span-2 flex items-center justify-center gap-1.5 p-2 mt-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold"
                    >
                      <span>Browse All Destinations</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Locations — hidden from navbar, pages still accessible via direct URL and footer */}

              {/* Calculator removed from the mobile menu — see FloatingCalculator.tsx. */}

              <Link
                to="/blogs"
                onClick={closeMenu}
                className="text-foreground hover:text-primary transition-smooth py-2 text-left text-base font-medium block"
              >
                Blog
              </Link>

              <Link
                to="/reviews"
                onClick={closeMenu}
                className="text-foreground hover:text-primary transition-smooth py-2 text-left text-base font-medium block"
              >
                Reviews
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className="text-foreground hover:text-primary transition-smooth py-2 text-left text-base font-medium block"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                className="text-foreground hover:text-primary transition-smooth py-2 text-left text-base font-medium block"
              >
                Contact
              </Link>

              <div className="flex flex-col space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Language</span>
                  <LanguageSwitcher />
                </div>
                <Button variant="outline" size="sm" className="border-primary/20 text-primary hover-glow-primary w-full justify-center" asChild>
                  <a href={`tel:${CONTACT.phone}`}>
                    <Phone className="w-4 h-4 mr-2 text-primary" />
                    Call Now
                  </a>
                </Button>
                <Button className="bg-gradient-gold text-secondary-foreground font-semibold shadow-gold hover-glow-gold w-full justify-center" asChild>
                  <Link to="/contact" onClick={closeMenu}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Apply Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;