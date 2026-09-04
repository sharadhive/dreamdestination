import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dreamDestinationsLogo from "@/assets/companylogo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-card to-muted/20 pt-16 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1 animate-slide-in-left">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={dreamDestinationsLogo} 
                alt="DreamDestinations Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold text-gradient-hero">DreamDestinations</span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Empowering students worldwide with affordable education loans and comprehensive 
              study abroad consultancy services. Your dreams, our commitment.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-secondary" />
                <span className="text-sm">+91 9876-543-210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="text-sm">info@dreamdestinations.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-secondary mt-1" />
                <span className="text-sm">123, Education Hub, New Delhi - 110001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <div className="space-y-3">
              {[
                { label: "About Us", href: "#about" },
                { label: "Our Services", href: "#services" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Loan Calculator", href: "#calculator" },
                { label: "Countries", href: "#countries" },
                { label: "Success Stories", href: "#testimonials" },
                { label: "FAQs", href: "#faq" },
                { label: "Contact Us", href: "#contact" }
              ].map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-smooth text-sm py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <div className="space-y-3">
              {[
                "Education Loans",
                "Study Abroad Consultation",
                "Visa Assistance",
                "Scholarship Guidance",
                "Test Prep Support",
                "University Selection",
                "Document Support",
                "Travel Assistance"
              ].map((service, index) => (
                <div key={index} className="text-muted-foreground text-sm py-1">
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-bold mb-6">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to get the latest updates on education loans, study abroad opportunities, and scholarships.
            </p>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="text-sm"
                />
                <Button size="sm" className="bg-gradient-gold text-secondary-foreground shadow-gold hover-glow-gold">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {[
                  { Icon: Facebook, color: "hover:text-blue-600" },
                  { Icon: Twitter, color: "hover:text-blue-400" },
                  { Icon: Instagram, color: "hover:text-pink-600" },
                  { Icon: Linkedin, color: "hover:text-blue-700" },
                  { Icon: Youtube, color: "hover:text-red-600" }
                ].map(({ Icon, color }, index) => (
                  <a 
                    key={index}
                    href="#"
                    className={`p-2 bg-muted rounded-lg text-muted-foreground ${color} transition-smooth hover:-translate-y-1`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="border-t border-border pt-8 mb-8 animate-fade-in">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                <span className="text-secondary text-sm">✓</span>
              </div>
              <span className="text-sm text-muted-foreground">RBI Approved</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-sm">🛡️</span>
              </div>
              <span className="text-sm text-muted-foreground">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-accent text-sm">⭐</span>
              </div>
              <span className="text-sm text-muted-foreground">4.9★ Rated</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                <span className="text-secondary text-sm">🏆</span>
              </div>
              <span className="text-sm text-muted-foreground">50K+ Students</span>
            </div>
          </div>
        </div>

        {/* Important Links */}
        <div className="border-t border-border pt-8 mb-8 animate-fade-in">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3 text-sm">Popular Destinations</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Study in USA | Study in UK | Study in Canada</div>
                <div>Study in Australia | Study in Germany | Study in Ireland</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Popular Courses</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Engineering | MBA | Computer Science | Medicine</div>
                <div>Data Science | AI/ML | Biotechnology | Design</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Loan Types</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Education Loan | Abroad Study Loan | Student Loan</div>
                <div>No Collateral Loan | Secured Education Loan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-6 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © 2024 DreamDestinations. All rights reserved. | Empowering dreams through education.
            </div>
            
            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                Cookie Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                Disclaimer
              </a>
            </div>
          </div>
          
          {/* Additional Disclaimer */}
          <div className="mt-4 text-xs text-muted-foreground text-center">
            DreamDestinations is a registered trademark. All loan approvals are subject to bank policies and eligibility criteria. 
            Interest rates and terms may vary based on individual profiles and market conditions.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;