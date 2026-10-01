import { useState } from "react";
import { CONTACT } from "@/config/site";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import { sendLeadToWhatsApp, LEAD_CONFIRMATION } from "@/lib/leadToWhatsApp";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    course: "",
    loanPartner: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    /*
     * This form used to be a two-second setTimeout that showed
     * "Message Sent Successfully!" and then cleared everything the student had
     * typed. Nothing was ever sent anywhere — the enquiry was discarded and the
     * visitor was told it had arrived. It now hands the lead to WhatsApp like
     * every other form on the site.
     *
     * The confirmation wording comes from LEAD_CONFIRMATION so it stays honest:
     * it says WhatsApp is opening, not that the message has been received,
     * because it has not been until the student presses send.
     */
    sendLeadToWhatsApp("Homepage Contact Form", formData);

    setIsSubmitting(false);
    toast({
      title: LEAD_CONFIRMATION.title,
      description: LEAD_CONFIRMATION.body,
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      country: "",
      course: "",
      loanPartner: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Get in <span className="text-gradient-hero">Touch</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to start your international education journey? Contact our expert counselors 
            for personalized guidance and support.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card p-5 sm:p-8 rounded-2xl shadow-elegant animate-slide-in-left">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-hero rounded-xl">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Send us a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-base font-medium mb-2 block">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="py-6 text-lg"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-base font-medium mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="py-6 text-lg"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-base font-medium mb-2 block">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="py-6 text-lg"
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>

              {/* Country & Course */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-base font-medium mb-2 block">
                    Preferred Country
                  </Label>
                  <Select value={formData.country} onValueChange={(value) => handleSelectChange('country', value)}>
                    <SelectTrigger className="py-6 text-lg">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="ireland">Ireland</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-base font-medium mb-2 block">
                    Course/Program
                  </Label>
                  <Select value={formData.course} onValueChange={(value) => handleSelectChange('course', value)}>
                    <SelectTrigger className="py-6 text-lg">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="business">Business/MBA</SelectItem>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="arts">Arts & Humanities</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Preferred Loan Partner */}
              <div>
                <Label className="text-base font-medium mb-2 block">
                  Preferred Loan Partner
                </Label>
                <Select value={formData.loanPartner} onValueChange={(value) => handleSelectChange('loanPartner', value)}>
                  <SelectTrigger className="py-6 text-lg">
                    <SelectValue placeholder="Select loan partner" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="hdfc-credila">HDFC Credila (10.00% p.a)</SelectItem>
                    <SelectItem value="auxilo">Auxilo Education Loan (10.50% p.a)</SelectItem>
                    <SelectItem value="incred">Incred Education Loan (11.25% p.a)</SelectItem>
                    <SelectItem value="poonawala">Poonawala Fincorp (12.00% p.a)</SelectItem>
                    <SelectItem value="avanse">Avanse Financial Services (10.90% p.a)</SelectItem>
                    <SelectItem value="sbi">SBI Bank (9.85% p.a)</SelectItem>
                    <SelectItem value="propelled">Propelled (11.50% p.a)</SelectItem>
                    <SelectItem value="axis">Axis Bank (10.75% p.a)</SelectItem>
                    <SelectItem value="union">Union Bank (9.50% p.a)</SelectItem>
                    <SelectItem value="idfc">IDFC Bank (10.40% p.a)</SelectItem>
                    <SelectItem value="icici">ICICI Bank (10.25% p.a)</SelectItem>
                    <SelectItem value="compare-all">Compare All Options</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-base font-medium mb-2 block">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="text-lg resize-none"
                  placeholder="Tell us about your education goals, questions, or how we can help you..."
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-6 text-lg bg-gradient-gold text-secondary-foreground font-semibold shadow-gold hover-glow-gold"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in-right">
            {/* Quick Contact Options */}
            <div className="grid gap-6">
              <div className="bg-card p-6 rounded-xl shadow-soft hover:shadow-elegant transition-smooth">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-success rounded-xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Call Us</h4>
                    <p className="text-muted-foreground">Speak with our experts</p>
                    <a href={`tel:${CONTACT.phone}`} className="font-semibold text-secondary hover:underline">{CONTACT.phoneDisplay}</a>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-soft hover:shadow-elegant transition-smooth">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-warm rounded-xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{CONTACT.emailVerified && CONTACT.email ? "Email Us" : "WhatsApp Us"}</h4>
                    <p className="text-muted-foreground">Get detailed information</p>
                    {CONTACT.emailVerified && CONTACT.email ? (
                      <a href={`mailto:${CONTACT.email}`} className="font-semibold text-accent hover:underline break-all">{CONTACT.email}</a>
                    ) : (
                      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">Message us on WhatsApp</a>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-soft hover:shadow-elegant transition-smooth">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-hero rounded-xl">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Live Chat</h4>
                    <p className="text-muted-foreground">Instant support available</p>
                    <p className="font-semibold text-primary">24/7 Online Support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Information */}
            <div className="bg-gradient-subtle p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Visit Our Office</h3>
              
              <div className="space-y-4 mb-6">
                {CONTACT.addressVerified && CONTACT.address && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Office</p>
                      <p className="text-muted-foreground">{CONTACT.address}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="font-semibold">Office Hours</p>
                    <p className="text-muted-foreground">{CONTACT.officeHours}</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive Map</p>
                  <p className="text-sm text-muted-foreground">Click to view in Google Maps</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-hero p-6 rounded-xl text-white">
              <h4 className="font-bold text-lg mb-2">Already Studying Abroad?</h4>
              <p className="opacity-90 mb-4">
                Students we have placed can reach us on the same number for help with
                accommodation, visa compliance or anything urgent.
              </p>
              <Button className="bg-gradient-gold text-secondary-foreground font-semibold shadow-gold hover-glow-gold" asChild>
                <a href={`tel:${CONTACT.phone}`}>Call {CONTACT.phoneDisplay}</a>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;