import React, { useState } from "react";
import { MessageCircle, Phone, X, Send, Sparkles, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";

const FloatingContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleQuickCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput) return;
    // Was: show a tick and throw the number away.
    sendLeadToWhatsApp("Quick Callback Request", { phone: phoneInput });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setPhoneInput("");
      setIsOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Quick Contact Panel */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] max-w-[340px] bg-card/95 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl p-4 sm:p-5 animate-bounce-in text-foreground">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center text-white text-xs font-bold shadow-md">
                <Headset className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Student Support Helpline</h4>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Counselors Online Now
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-muted-foreground hover:text-foreground rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Direct Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 my-4">
            <a
              href="https://wa.me/919211818710?text=Hi%20DreamDestination,%20I%20want%20to%20know%20about%20study%20abroad%20loans%20and%20universities."
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 border border-emerald-500/20 rounded-xl transition-all font-bold text-xs gap-1"
            >
              <MessageCircle className="w-5 h-5 text-emerald-500" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href="tel:+919211818710"
              className="flex flex-col items-center justify-center p-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl transition-all font-bold text-xs gap-1"
            >
              <Phone className="w-5 h-5 text-primary" />
              <span>Call Helpline</span>
            </a>
          </div>

          {/* Quick Callback Form */}
          <form onSubmit={handleQuickCallback} className="pt-3 border-t border-border/50 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-secondary" /> Request Instant Callback
            </p>
            {submitted ? (
              <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl text-xs font-bold text-center">
                ✓ Call Request Received! We will call you within 15 mins.
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="tel"
                  required
                  placeholder="+91 Mobile Number"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-muted/60 border border-border/60 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button size="sm" type="submit" className="bg-gradient-gold text-secondary-foreground font-bold text-xs px-3 shadow-gold">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </form>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-4 py-3 bg-gradient-hero text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white/40"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
        </span>
        <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="font-bold text-xs md:text-sm tracking-wide">Contact Counselors</span>
      </button>
    </div>
  );
};

export default FloatingContactWidget;
