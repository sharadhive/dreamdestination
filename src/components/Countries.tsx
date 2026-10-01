import { useState } from "react";
import { MapPin, DollarSign, Award, Building2, ArrowRight, Globe2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { countriesData } from "@/data/countryData";
import { getCountryUrl } from "@/lib/countryUrl";
import { Button } from "@/components/ui/button";

// URL logic lives in @/lib/countryUrl — shared with the header, footer and countries index.

const regionFilters = [
  { label: "Top Featured", region: "featured" },
  { label: "Europe & UK", region: "europe" },
  { label: "Americas", region: "americas" },
  { label: "Asia & Pacific", region: "asia" },
];

const Countries = () => {
  const [activeRegion, setActiveRegion] = useState("featured");

  // Filter top featured countries for home page
  const featuredSlugs = ["uk", "usa", "canada", "australia", "germany", "japan", "singapore", "ireland", "france"];
  
  const europeSlugs = ["uk", "germany", "france", "ireland", "switzerland", "spain", "netherlands", "italy"];
  const americasSlugs = ["usa", "canada"];
  const asiaSlugs = ["australia", "new-zealand", "singapore", "india", "malaysia", "china", "japan"];

  const getFilteredCountries = () => {
    switch (activeRegion) {
      case "europe":
        return countriesData.filter((c) => europeSlugs.includes(c.slug));
      case "americas":
        return countriesData.filter((c) => americasSlugs.includes(c.slug));
      case "asia":
        return countriesData.filter((c) => asiaSlugs.includes(c.slug));
      default:
        return countriesData.filter((c) => featuredSlugs.includes(c.slug));
    }
  };

  const displayedCountries = getFilteredCountries();

  return (
    <section id="countries" className="py-12 sm:py-16 lg:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-fade-in">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
              <Globe2 className="w-4 h-4" />
              <span>Global Study Destinations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Study in Your <span className="text-gradient-hero">Dream Country</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-2xl">
              Explore 22+ top destinations for higher education with comprehensive country guides, top university listings, and visa requirements.
            </p>
          </div>

          {/* Region Tabs Filter */}
          <div className="flex max-w-full overflow-x-auto no-scrollbar items-center bg-card border border-border/80 rounded-xl p-1.5 shadow-soft shrink-0">
            {regionFilters.map((tab) => (
              <button
                key={tab.region}
                onClick={() => setActiveRegion(tab.region)}
                className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs md:text-sm font-bold shrink-0 transition-all ${
                  activeRegion === tab.region
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {displayedCountries.map((country, index) => (
            <Link 
              key={country.slug}
              to={getCountryUrl(country.slug)}
              className="bg-card p-5 sm:p-6 md:p-8 rounded-2xl border border-border/80 shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1.5 group block"
            >
              {/* Country Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-3 min-w-0">
                  <span className="text-4xl md:text-5xl shrink-0">{country.flag}</span>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors text-foreground truncate">{country.name}</h3>
                    <p className="text-xs text-muted-foreground font-medium truncate">{country.universities} Top Universities</p>
                  </div>
                </div>
                <div className="p-2 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-5">
                <div className="text-center p-2 sm:p-2.5 bg-gradient-subtle rounded-xl border border-border/40">
                  <DollarSign className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground">Avg Cost</p>
                  <p className="font-bold text-[11px] sm:text-xs truncate text-foreground">{country.avgCost}</p>
                </div>
                <div className="text-center p-2 sm:p-2.5 bg-gradient-subtle rounded-xl border border-border/40">
                  <Building2 className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground">Colleges</p>
                  <p className="font-bold text-[11px] sm:text-xs text-foreground">{country.collegeCount}+</p>
                </div>
                <div className="text-center p-2 sm:p-2.5 bg-gradient-subtle rounded-xl border border-border/40">
                  <Award className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground">Visa Success</p>
                  <p className="font-bold text-[11px] sm:text-xs text-foreground">{country.visaSuccessRate}</p>
                </div>
              </div>

              {/* Programs */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-1.5">
                  {country.programs.slice(0, 3).map((program, progIndex) => (
                    <span 
                      key={progIndex}
                      className="px-2.5 py-1 bg-primary/10 text-primary text-[11px] font-semibold rounded-md"
                    >
                      {program}
                    </span>
                  ))}
                  {country.programs.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-[10px] rounded-md font-medium">
                      +{country.programs.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Link */}
              <div className="w-full py-2.5 bg-primary/5 border border-primary/20 rounded-xl font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center gap-2 text-xs md:text-sm">
                <span>Explore {country.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Countries CTA Banner */}
        <div className="bg-card border border-border/80 p-5 sm:p-8 rounded-2xl shadow-elegant text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">Want to Explore All 22+ Study Destinations?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Including Russia, Ukraine, Iran, China, Japan, Switzerland, Spain, Mauritius, Netherlands, and more.
            </p>
            <Link to="/countries">
              <Button size="lg" className="bg-gradient-hero text-white font-bold shadow-elegant hover-glow-primary px-8 py-6 rounded-xl text-sm md:text-base">
                <Sparkles className="w-4 h-4 mr-2" />
                View All 22+ Country Guides
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Countries;