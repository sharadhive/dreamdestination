import { MapPin, DollarSign, Award, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { countriesData } from "@/data/countryData";

const programs = [
  { name: "Engineering", count: "2500+ Programs", icon: "⚙️" },
  { name: "Business & Management", count: "1800+ Programs", icon: "💼" },
  { name: "Medicine & Healthcare", count: "1200+ Programs", icon: "🏥" },
  { name: "Computer Science", count: "2000+ Programs", icon: "💻" },
  { name: "Arts & Humanities", count: "1500+ Programs", icon: "🎨" },
  { name: "Law", count: "800+ Programs", icon: "⚖️" }
];

const Countries = () => {
  return (
    <section id="countries" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Study in Your <span className="text-gradient-hero">Dream Country</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore {countriesData.length}+ top destinations for international education with our comprehensive 
            country guides and university partnerships.
          </p>
        </div>

        {/* Countries Grid — All countries */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {countriesData.map((country, index) => (
            <Link 
              key={country.slug}
              to={`/countries/${country.slug}`}
              className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-2 animate-slide-in-right group block"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Country Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl">{country.flag}</span>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-smooth">{country.name}</h3>
                    <p className="text-sm text-muted-foreground">{country.universities} Universities</p>
                  </div>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-smooth">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 bg-gradient-subtle rounded-lg">
                  <DollarSign className="w-5 h-5 text-secondary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Avg Cost</p>
                  <p className="font-semibold text-xs">{country.avgCost}</p>
                </div>
                <div className="text-center p-3 bg-gradient-subtle rounded-lg">
                  <Building2 className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Colleges</p>
                  <p className="font-semibold text-xs">{country.collegeCount}+</p>
                </div>
                <div className="text-center p-3 bg-gradient-subtle rounded-lg">
                  <Award className="w-5 h-5 text-accent mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Scholarships</p>
                  <p className="font-semibold text-xs">{country.scholarships.split(",")[0]}</p>
                </div>
              </div>

              {/* Programs */}
              <div className="mb-6">
                <p className="text-sm font-medium text-muted-foreground mb-3">Popular Programs:</p>
                <div className="flex flex-wrap gap-2">
                  {country.programs.slice(0, 4).map((program, progIndex) => (
                    <span 
                      key={progIndex}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {program}
                    </span>
                  ))}
                  {country.programs.length > 4 && (
                    <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{country.programs.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="w-full py-3 bg-gradient-subtle border border-border rounded-lg font-medium hover:shadow-soft transition-smooth flex items-center justify-center gap-2 text-sm group-hover:border-primary/30">
                Explore {country.name}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Programs Section */}
        <div className="animate-fade-in">
          <h3 className="text-3xl font-bold text-center mb-12">
            Popular <span className="text-gradient-success">Study Programs</span>
          </h3>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {programs.map((program, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-1 animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{program.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg">{program.name}</h4>
                    <p className="text-sm text-muted-foreground">{program.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-gradient-hero p-8 rounded-2xl shadow-elegant text-white">
            <h3 className="text-3xl font-bold mb-4">Not Sure Which Country to Choose?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our expert counselors will help you find the perfect destination based on 
              your budget, career goals, and preferences.
            </p>
            <Link
              to="/countries"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-gold text-secondary-foreground font-semibold rounded-xl shadow-gold hover-glow-gold transition-smooth"
            >
              View All Countries <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countries;