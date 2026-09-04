import { DollarSign, Shield, Zap, Users, Award, Globe } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Loan up to ₹1.5 Cr",
    description: "Comprehensive financial support for your international education journey",
    color: "text-secondary"
  },
  {
    icon: Shield,
    title: "No Collateral Required",
    description: "Secure your education loan without pledging any assets or property",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Lowest Interest Rates",
    description: "Competitive rates starting from 9.5% to make education affordable",
    color: "text-accent"
  },
  {
    icon: Users,
    title: "Quick Approval",
    description: "Get pre-approved within 24 hours with our streamlined process",
    color: "text-secondary"
  },
  {
    icon: Award,
    title: "Transparent Process",
    description: "No hidden fees or charges - complete clarity at every step",
    color: "text-primary"
  },
  {
    icon: Globe,
    title: "200+ University Partners",
    description: "Direct partnerships with top universities across 15+ countries",
    color: "text-accent"
  }
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="text-gradient-hero">DreamDestinations</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We've revolutionized student financing with transparent processes, competitive rates, 
            and personalized support to make your study abroad dreams achievable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-2 animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-subtle ${feature.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-secondary" />
              <span>RBI Approved</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-accent" />
              <span>ISO 27001 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>50,000+ Happy Students</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-secondary" />
              <span>15+ Countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;