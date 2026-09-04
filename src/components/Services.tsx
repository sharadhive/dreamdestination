import { GraduationCap, DollarSign, FileText, Award, BookOpen, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: GraduationCap,
    title: "Study Abroad Consultation",
    description: "Expert guidance on course selection, university applications, and admission procedures",
    features: ["University Selection", "Application Support", "Profile Building", "Interview Prep"],
    gradient: "bg-gradient-hero"
  },
  {
    icon: DollarSign,
    title: "Education Loans",
    description: "Flexible loan solutions up to ₹1.5 Cr with competitive interest rates and easy repayment",
    features: ["Up to ₹1.5 Cr", "No Collateral", "Quick Approval", "Flexible Repayment"],
    gradient: "bg-gradient-success"
  },
  {
    icon: FileText,
    title: "Visa Assistance",
    description: "Complete visa application support including documentation and interview preparation",
    features: ["Document Review", "Application Filing", "Interview Training", "Status Tracking"],
    gradient: "bg-gradient-warm"
  },
  {
    icon: Award,
    title: "Scholarship Guidance",
    description: "Identify and apply for scholarships to reduce your education costs significantly",
    features: ["Scholarship Search", "Application Support", "Merit Assessment", "Follow-up Support"],
    gradient: "bg-gradient-hero"
  },
  {
    icon: BookOpen,
    title: "Test Prep Support",
    description: "Comprehensive preparation for IELTS, TOEFL, GRE, GMAT, and other standardized tests",
    features: ["IELTS/TOEFL Prep", "GRE/GMAT Coaching", "Mock Tests", "Score Improvement"],
    gradient: "bg-gradient-success"
  },
  {
    icon: Plane,
    title: "Travel & Accommodation",
    description: "Complete assistance with travel bookings, accommodation, and pre-departure guidance",
    features: ["Flight Booking", "Accommodation", "Airport Pickup", "Pre-departure Brief"],
    gradient: "bg-gradient-warm"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-gradient-success">Comprehensive</span> Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From initial consultation to landing in your dream country, we provide 
            end-to-end support for your international education journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-2 animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon Header */}
                <div className={`w-16 h-16 ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-soft`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button variant="outline" className="w-full hover-glow-primary">
                  Learn More
                </Button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-fade-in">
          <div className="bg-gradient-hero p-8 rounded-2xl shadow-elegant text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Get personalized guidance from our expert counselors and take the first step 
              towards your international education goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-gold text-secondary-foreground font-semibold shadow-gold hover-glow-gold">
                Book Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;