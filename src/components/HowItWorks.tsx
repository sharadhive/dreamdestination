import { MousePointer, Users, FileCheck, HandHeart, CheckCircle, Plane } from "lucide-react";

const steps = [
  {
    icon: MousePointer,
    title: "Apply Online",
    description: "Fill out our quick application form with your basic details and study preferences",
    step: 1
  },
  {
    icon: Users,
    title: "Free Counseling",
    description: "Connect with our expert counselors for personalized guidance on courses and universities",
    step: 2
  },
  {
    icon: FileCheck,
    title: "Loan/University Match",
    description: "Get matched with the best loan options and university programs suited to your profile",
    step: 3
  },
  {
    icon: HandHeart,
    title: "Document Support",
    description: "Receive comprehensive assistance with loan documents, applications, and visa paperwork",
    step: 4
  },
  {
    icon: CheckCircle,
    title: "Approval",
    description: "Get your loan approved and university admission confirmed within record time",
    step: 5
  },
  {
    icon: Plane,
    title: "Fly Abroad",
    description: "Complete pre-departure formalities and embark on your international education journey",
    step: 6
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How It <span className="text-gradient-warm">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our streamlined 6-step process makes your study abroad journey smooth and hassle-free. 
            From application to departure, we're with you every step of the way.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-hero opacity-30"></div>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 1;
              
              return (
                <div 
                  key={index}
                  className={`relative animate-bounce-in ${isEven ? 'lg:mt-16' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Step Card */}
                  <div className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-2">
                    {/* Step Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-hero rounded-full text-white font-bold text-lg shadow-elegant">
                        {step.step}
                      </div>
                      <div className="p-3 bg-gradient-subtle rounded-xl">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connection Line for Mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-6 mb-2">
                      <div className="w-0.5 h-8 bg-gradient-hero opacity-50"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-card p-8 rounded-2xl shadow-elegant border border-border">
            <div className="flex items-center justify-center mb-4">
              <div className="flex space-x-2">
                {[1, 2, 3].map((dot) => (
                  <div key={dot} className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of students who have successfully pursued their international education dreams with our support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-gold text-secondary-foreground font-semibold rounded-xl shadow-gold hover-glow-gold transition-smooth">
                Start Your Application
              </button>
              <button className="px-8 py-3 border border-border text-foreground font-semibold rounded-xl hover-glow-primary transition-smooth">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;