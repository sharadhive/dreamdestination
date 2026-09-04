import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Priya Sharma",
    course: "MS in Computer Science",
    university: "Stanford University, USA",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b9e6e593?w=150&h=150&fit=crop&crop=face",
    testimonial: "DreamDestinations made my dream of studying at Stanford a reality. The loan process was incredibly smooth, and their counselors guided me through every step. I got approved within 24 hours!",
    loanAmount: "₹75 Lakhs",
    year: "2023"
  },
  {
    name: "Rahul Patel",
    course: "MBA",
    university: "London Business School, UK",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    testimonial: "The transparency and support from DreamDestinations is unmatched. No hidden fees, competitive interest rates, and excellent customer service. They helped me secure admission and funding for my MBA.",
    loanAmount: "₹60 Lakhs",
    year: "2023"
  },
  {
    name: "Ananya Reddy",
    course: "MS in Data Science",
    university: "University of Toronto, Canada",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    testimonial: "From visa assistance to loan approval, DreamDestinations handled everything professionally. Their scholarship guidance helped me reduce my education cost significantly. Highly recommended!",
    loanAmount: "₹45 Lakhs",
    year: "2024"
  },
  {
    name: "Vikram Singh",
    course: "MS in Engineering",
    university: "Technical University of Munich, Germany",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    testimonial: "Thanks to DreamDestinations, I'm now pursuing my master's in Germany. Their expertise in European universities and scholarship programs saved me thousands of euros. The loan process was hassle-free.",
    loanAmount: "₹25 Lakhs",
    year: "2024"
  },
  {
    name: "Sneha Gupta",
    course: "MS in Biotechnology",
    university: "University of Melbourne, Australia",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
    testimonial: "The personalized guidance and 24/7 support made all the difference. DreamDestinations not only helped with the loan but also with accommodation and travel arrangements. Truly comprehensive service!",
    loanAmount: "₹50 Lakhs",
    year: "2023"
  },
  {
    name: "Arjun Krishnan",
    course: "MS in Artificial Intelligence",
    university: "Trinity College Dublin, Ireland",
    rating: 5,
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
    testimonial: "DreamDestinations's expertise in Irish universities is exceptional. They helped me find the perfect program match and secured funding without any collateral. The entire process was transparent and efficient.",
    loanAmount: "₹40 Lakhs",
    year: "2024"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Student <span className="text-gradient-success">Success Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hear from thousands of students who achieved their international education dreams 
            with our support and guidance.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto mb-12 animate-slide-in-left">
          <div className="bg-card p-8 lg:p-12 rounded-2xl shadow-elegant relative overflow-hidden">
            {/* Background Quote */}
            <div className="absolute top-4 right-4 opacity-10">
              <Quote className="w-24 h-24 text-primary" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-center relative z-10">
              {/* Student Image and Info */}
              <div className="text-center lg:text-left">
                <div className="w-32 h-32 mx-auto lg:mx-0 mb-6 rounded-full overflow-hidden shadow-elegant">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{testimonials[currentIndex].name}</h3>
                <p className="text-primary font-semibold mb-1">{testimonials[currentIndex].course}</p>
                <p className="text-muted-foreground text-sm mb-4">{testimonials[currentIndex].university}</p>
                
                {/* Rating */}
                <div className="flex justify-center lg:justify-start items-center space-x-1 mb-4">
                  {Array.from({ length: testimonials[currentIndex].rating }, (_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>

                {/* Loan Details */}
                <div className="flex justify-center lg:justify-start items-center space-x-4 text-sm text-muted-foreground">
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                    {testimonials[currentIndex].loanAmount}
                  </span>
                  <span>{testimonials[currentIndex].year}</span>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <blockquote className="text-lg lg:text-xl leading-relaxed text-foreground mb-6 font-medium">
                    "{testimonials[currentIndex].testimonial}"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={prevTestimonial}
            className="hover-glow-primary"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-smooth ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={nextTestimonial}
            className="hover-glow-primary"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 animate-fade-in">
          <div className="text-center p-6 bg-card rounded-xl shadow-soft">
            <div className="text-4xl font-bold text-primary mb-2">50K+</div>
            <p className="text-muted-foreground">Happy Students</p>
          </div>
          <div className="text-center p-6 bg-card rounded-xl shadow-soft">
            <div className="text-4xl font-bold text-secondary mb-2">98%</div>
            <p className="text-muted-foreground">Success Rate</p>
          </div>
          <div className="text-center p-6 bg-card rounded-xl shadow-soft">
            <div className="text-4xl font-bold text-accent mb-2">₹5000Cr+</div>
            <p className="text-muted-foreground">Loans Disbursed</p>
          </div>
          <div className="text-center p-6 bg-card rounded-xl shadow-soft">
            <div className="text-4xl font-bold text-primary mb-2">4.9★</div>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-gradient-hero p-8 rounded-2xl shadow-elegant text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join thousands of successful students who trusted us with their international education dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-gold text-secondary-foreground font-semibold shadow-gold hover-glow-gold">
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Read More Stories
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;