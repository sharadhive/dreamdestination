import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import dreamDestinationsLogo from "@/assets/companylogo.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group cursor-pointer">
            <div className="relative">
              <img 
                src={dreamDestinationsLogo} 
                alt="DreamDestinations Logo" 
                className="w-12 h-12 object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg filter drop-shadow-md"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gradient-hero group-hover:scale-105 transition-transform duration-300">
                DreamDestinations
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wider">
                Study Abroad Experts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#services" className="text-foreground hover:text-primary transition-smooth">Services</a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-smooth">How It Works</a>
            <a href="#countries" className="text-foreground hover:text-primary transition-smooth">Countries</a>
            <a href="#calculator" className="text-foreground hover:text-primary transition-smooth">Calculator</a>
            <a href="#about" className="text-foreground hover:text-primary transition-smooth">About</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-smooth">Contact</a>
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <LanguageSwitcher />
            <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary/5 hover-glow-primary font-medium">
              <Phone className="w-4 h-4 mr-2 text-primary" />
              Call Now
            </Button>
            <Button className="bg-gradient-gold text-secondary-foreground font-semibold shadow-gold hover-glow-gold">
              <MessageCircle className="w-4 h-4 mr-2" />
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-smooth"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t animate-fade-in">
            <div className="flex flex-col space-y-4 mt-4">
              <a href="#services" className="text-foreground hover:text-primary transition-smooth py-2">Services</a>
              <a href="#how-it-works" className="text-foreground hover:text-primary transition-smooth py-2">How It Works</a>
              <a href="#countries" className="text-foreground hover:text-primary transition-smooth py-2">Countries</a>
              <a href="#calculator" className="text-foreground hover:text-primary transition-smooth py-2">Calculator</a>
              <a href="#about" className="text-foreground hover:text-primary transition-smooth py-2">About</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-smooth py-2">Contact</a>
              <div className="flex flex-col space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Language</span>
                  <LanguageSwitcher />
                </div>
                <Button variant="outline" size="sm" className="border-primary/20 text-primary hover-glow-primary">
                  <Phone className="w-4 h-4 mr-2 text-primary" />
                  Call Now
                </Button>
                <Button className="bg-gradient-gold text-secondary-foreground font-semibold shadow-gold hover-glow-gold">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Apply Now
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