import { Award, Users, Globe, Shield, Target, Heart } from "lucide-react";
import globalEducationImage from "@/assets/global-education.jpg";
import studentsStudyingImage from "@/assets/students-studying.jpg";

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description: "Complete clarity in all processes with no hidden fees or charges",
    color: "text-primary"
  },
  {
    icon: Heart,
    title: "Student-First",
    description: "Every decision is made keeping student welfare and success at the center",
    color: "text-secondary"
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Committed to delivering the highest quality of service and support",
    color: "text-accent"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Partnerships with top universities across 15+ countries worldwide",
    color: "text-primary"
  }
];

const achievements = [
  { number: "10+", label: "Years Experience" },
  { number: "50K+", label: "Students Placed" },
  { number: "200+", label: "University Partners" },
  { number: "₹5000Cr+", label: "Loans Disbursed" }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-gradient-hero">DreamDestinations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Empowering students to achieve their international education dreams through 
            transparent, affordable, and comprehensive educational financing solutions.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Mission & Story */}
          <div className="space-y-8 animate-slide-in-left">
            <div>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To democratize international education by making it accessible and affordable for every 
                deserving student, regardless of their financial background. We believe education should 
                never be limited by financial constraints.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in 2014, DreamDestinations has grown from a small consultancy to India's leading 
                education financing platform, helping over 50,000 students pursue their dreams abroad.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">Why Students Trust Us</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Transparent Process:</strong> No hidden fees, 
                    clear documentation, and honest guidance at every step.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Expert Team:</strong> Certified counselors 
                    with deep knowledge of international education systems.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">End-to-End Support:</strong> From course 
                    selection to post-arrival support, we're with you throughout.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={globalEducationImage}
                alt="Global education network with university connections worldwide"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-bold text-lg">Global Network</h4>
                <p className="text-sm opacity-90">200+ University Partners</p>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={studentsStudyingImage}
                alt="Diverse international students working together in modern library"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-success opacity-20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-bold text-lg">Student Success</h4>
                <p className="text-sm opacity-90">50,000+ Dreams Achieved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16 animate-fade-in">
          <h3 className="text-3xl font-bold text-center mb-12">
            Our Core <span className="text-gradient-success">Values</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-6 bg-card rounded-xl shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-2 animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-subtle rounded-full flex items-center justify-center ${value.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16 animate-fade-in">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="text-center p-8 bg-gradient-subtle rounded-2xl animate-bounce-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                {achievement.number}
              </div>
              <p className="text-muted-foreground font-medium">
                {achievement.label}
              </p>
            </div>
          ))}
        </div>

        {/* Leadership Team Placeholder */}
        <div className="animate-fade-in">
          <h3 className="text-3xl font-bold text-center mb-12">
            Meet Our <span className="text-gradient-warm">Leadership</span>
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Dr. Rajesh Kumar", role: "Founder & CEO", experience: "15+ years in Education" },
              { name: "Ms. Priya Sharma", role: "Head of Counseling", experience: "12+ years in Study Abroad" },
              { name: "Mr. Arjun Singh", role: "Head of Finance", experience: "10+ years in Banking" }
            ].map((leader, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-card rounded-xl shadow-soft animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-hero rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">{leader.name}</h4>
                <p className="text-primary font-semibold mb-1">{leader.role}</p>
                <p className="text-sm text-muted-foreground">{leader.experience}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-gradient-hero p-8 rounded-2xl shadow-elegant text-white">
            <h3 className="text-3xl font-bold mb-4">Join Our Success Story</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Be part of a community that believes in making international education 
              accessible, affordable, and achievable for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-gold text-secondary-foreground font-semibold rounded-xl shadow-gold hover-glow-gold transition-smooth">
                Start Your Journey
              </button>
              <button className="px-8 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary transition-smooth">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;