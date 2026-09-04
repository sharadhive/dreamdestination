import { Link } from "react-router-dom";
import { useState } from "react";
import {
  MapPin, Search, Building2, DollarSign, Award,
  ArrowRight, GraduationCap, ChevronRight, Filter,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { countriesData } from "@/data/countryData";

const SITE_DOMAIN = "https://dreamdestinations.co.in";

const CountriesIndex = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const regions: { label: string; filter: (slug: string) => boolean }[] = [
    { label: "All", filter: () => true },
    { label: "Europe", filter: (slug) => ["uk", "ireland", "france", "germany", "switzerland", "spain", "netherlands", "italy"].includes(slug) },
    { label: "North America", filter: (slug) => ["usa", "canada"].includes(slug) },
    { label: "Asia Pacific", filter: (slug) => ["australia", "new-zealand", "singapore", "malaysia", "india"].includes(slug) },
    { label: "Middle East & Africa", filter: (slug) => ["uae", "mauritius"].includes(slug) },
  ];

  const activeRegion = regions.find((r) => r.label.toLowerCase().replace(/\s+/g, "-") === selectedRegion) || regions[0];

  const filteredCountries = countriesData.filter((country) => {
    const matchesSearch =
      searchQuery === "" ||
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.programs.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRegion = activeRegion.filter(country.slug);
    return matchesSearch && matchesRegion;
  });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Study Abroad Countries | DreamDestinations",
      "description": "Explore 17+ study abroad destinations. Find top universities, education loans, visa assistance, and scholarship guidance for each country.",
      "url": `${SITE_DOMAIN}/countries`,
      "isPartOf": {
        "@type": "WebSite",
        "name": "DreamDestinations",
        "url": SITE_DOMAIN,
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_DOMAIN },
          { "@type": "ListItem", "position": 2, "name": "Countries", "item": `${SITE_DOMAIN}/countries` },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Study Abroad Destinations",
      "numberOfItems": countriesData.length,
      "itemListElement": countriesData.map((c, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": `Study in ${c.name}`,
        "url": `${SITE_DOMAIN}/countries/${c.slug}`,
      })),
    },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Study Abroad Countries | Top Destinations for Indian Students | DreamDestinations"
        description="Explore 17+ study abroad destinations including USA, UK, Canada, Australia, Germany & more. Find top universities, education loans, visa assistance, and scholarship guidance for each country."
        keywords={[
          "study abroad countries", "study abroad destinations", "best countries to study abroad",
          "study abroad from india", "countries for higher education", "overseas education destinations",
          "study in usa", "study in uk", "study in canada", "study in australia", "study in germany",
        ]}
        canonicalUrl={`${SITE_DOMAIN}/countries`}
        jsonLd={jsonLd}
      />
      <Header />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-gradient-subtle border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">Countries</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-hero text-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
            <div className="max-w-3xl animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-8 h-8 opacity-80" />
                <span className="text-sm font-medium uppercase tracking-wider opacity-80">
                  {countriesData.length} Destinations Available
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Choose Your Study <br />Abroad Destination
              </h1>
              <p className="text-lg opacity-90 max-w-2xl leading-relaxed">
                Explore top study destinations worldwide. Each country page includes university listings,
                education loan details, visa guidance, and FAQs tailored for Indian students.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="sticky top-[73px] z-30 bg-card/95 backdrop-blur-md border-b shadow-soft">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by country or program (e.g., 'Engineering', 'Canada')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth"
                />
              </div>

              {/* Region Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
                <Filter className="w-4 h-4 text-muted-foreground shrink-0 hidden md:block" />
                {regions.map((region) => {
                  const key = region.label.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedRegion(key)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-smooth ${
                        selectedRegion === key
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {region.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Countries Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            {filteredCountries.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">No countries found</h3>
                <p className="text-muted-foreground">
                  Try a different search term or clear the filters.
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedRegion("all"); }}
                  className="mt-4 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {filteredCountries.map((country, index) => (
                  <Link
                    key={country.slug}
                    to={`/countries/${country.slug}`}
                    className="group bg-card rounded-2xl border shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-2 overflow-hidden animate-fade-in"
                    style={{ animationDelay: `${index * 0.04}s` }}
                  >
                    {/* Card Top Accent */}
                    <div className={`h-1.5 ${country.gradient}`} />

                    <div className="p-6">
                      {/* Country Header */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{country.flag}</span>
                          <div>
                            <h2 className="text-xl font-bold group-hover:text-primary transition-smooth">
                              {country.name}
                            </h2>
                            <p className="text-xs text-muted-foreground">
                              {country.universities} Universities
                            </p>
                          </div>
                        </div>
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-smooth">
                          <MapPin className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                        {country.description}
                      </p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-3 mb-5">
                        <div className="text-center p-2.5 bg-gradient-subtle rounded-lg">
                          <DollarSign className="w-4 h-4 text-secondary mx-auto mb-1" />
                          <p className="text-[10px] text-muted-foreground">Tuition</p>
                          <p className="font-semibold text-xs">{country.avgCost}</p>
                        </div>
                        <div className="text-center p-2.5 bg-gradient-subtle rounded-lg">
                          <Building2 className="w-4 h-4 text-primary mx-auto mb-1" />
                          <p className="text-[10px] text-muted-foreground">Colleges</p>
                          <p className="font-semibold text-xs">{country.collegeCount}+</p>
                        </div>
                        <div className="text-center p-2.5 bg-gradient-subtle rounded-lg">
                          <Award className="w-4 h-4 text-accent mx-auto mb-1" />
                          <p className="text-[10px] text-muted-foreground">Visa Rate</p>
                          <p className="font-semibold text-xs">{country.visaSuccessRate}</p>
                        </div>
                      </div>

                      {/* Programs Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {country.programs.slice(0, 3).map((prog, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full"
                          >
                            {prog}
                          </span>
                        ))}
                        {country.programs.length > 3 && (
                          <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] rounded-full">
                            +{country.programs.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-xs text-muted-foreground">
                          {country.scholarships.split(",")[0]}
                        </span>
                        <span className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                          Explore <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Results count */}
            {filteredCountries.length > 0 && (
              <p className="text-center text-sm text-muted-foreground mt-8">
                Showing {filteredCountries.length} of {countriesData.length} destinations
              </p>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Not Sure Which Country to Choose?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                Our expert counselors will help you find the perfect destination based on
                your budget, career goals, and preferences.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-gold text-secondary-foreground font-bold rounded-xl shadow-gold hover-glow-gold transition-smooth"
              >
                Get Free Country Recommendation <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CountriesIndex;
