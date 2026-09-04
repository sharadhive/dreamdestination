import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, DollarSign, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-subtle overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl floating"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl floating" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-accent fill-current" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-secondary" />
                <span>50K+ Students</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>ISO Certified</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient-hero">Affordable</span> & 
                <br />
                <span className="text-foreground">Hassle-Free</span>
                <br />
                <span className="text-gradient-success">Study Abroad</span>
                <br />
                <span className="text-foreground">Solutions</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Get transparent, student-focused loans up to ₹1.5 Cr with expert consultancy. 
                Turn your global education dreams into reality.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-card rounded-lg shadow-soft">
                <DollarSign className="w-6 h-6 text-secondary" />
                <div>
                  <p className="font-semibold">Up to ₹1.5 Cr</p>
                  <p className="text-sm text-muted-foreground">Loan Amount</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-card rounded-lg shadow-soft">
                <CheckCircle className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-semibold">No Collateral</p>
                  <p className="text-sm text-muted-foreground">Required</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-gold text-secondary-foreground font-semibold shadow-gold hover-glow-gold text-lg px-8 py-6">
                Apply for Loan Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 hover-glow-primary text-lg px-8 py-6">
                Get Free Consultation
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center space-x-8 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">200+</p>
                <p className="text-sm text-muted-foreground">Universities</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">15+</p>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">99%</p>
                <p className="text-sm text-muted-foreground">Approval Rate</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={heroImage}
                alt="Students celebrating graduation with books and university buildings"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-card p-4 rounded-xl shadow-elegant floating">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-sm font-medium">Instant Approval</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-elegant floating" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-sm font-medium">Lowest Rates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;