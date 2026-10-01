import { useState } from "react";
import { Calculator, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * The EMI estimator itself, with no section chrome around it.
 *
 * This used to be a full-width homepage section. It now lives inside the
 * floating calculator dialog (see FloatingCalculator.tsx), reachable from every
 * page rather than only from the homepage, so the panel must size itself to a
 * dialog instead of to a page.
 */
export const LoanCalculatorPanel = () => {
  const [loanAmount, setLoanAmount] = useState(2500000); // Default ₹25 Lakhs
  const [duration, setDuration] = useState(84); // Default 7 Years
  const [interestRate, setInterestRate] = useState(9.5); // Default 9.5%

  // Real-time calculation on state change
  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = duration;
    
    if (monthlyRate === 0) {
      return { emi: Math.round(principal / months), totalAmount: principal, totalInterest: 0 };
    }

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;
    
    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest)
    };
  };

  const results = calculateEMI();
  const principalPercentage = Math.round((loanAmount / results.totalAmount) * 100);
  const interestPercentage = 100 - principalPercentage;

  return (
    <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Calculator Inputs (7 cols) */}
          <div className="lg:col-span-7 bg-card p-5 sm:p-6 rounded-2xl border border-border/80">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-hero rounded-xl text-white">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Calculate EMI</h3>
                <p className="text-xs text-muted-foreground">Adjust sliders to see live monthly EMI</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Loan Amount */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-bold text-foreground">Loan Amount Required</Label>
                  <span className="text-lg font-extrabold text-primary">
                    ₹{loanAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <input 
                  type="range"
                  min="100000"
                  max="15000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground font-medium">
                  <span>Min: ₹1 Lakh</span>
                  <span>₹50 Lakhs</span>
                  <span>Max: ₹1.5 Cr</span>
                </div>
              </div>

              {/* Loan Duration */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-bold text-foreground">Repayment Tenure</Label>
                  <span className="text-sm font-bold text-foreground">
                    {duration / 12} Years ({duration} Months)
                  </span>
                </div>
                <Select value={duration.toString()} onValueChange={(value) => setDuration(Number(value))}>
                  <SelectTrigger className="py-5 text-sm font-medium">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">5 Years (60 Months)</SelectItem>
                    <SelectItem value="72">6 Years (72 Months)</SelectItem>
                    <SelectItem value="84">7 Years (84 Months)</SelectItem>
                    <SelectItem value="96">8 Years (96 Months)</SelectItem>
                    <SelectItem value="120">10 Years (120 Months)</SelectItem>
                    <SelectItem value="180">15 Years (180 Months)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-bold text-foreground">Estimated Interest Rate (% p.a.)</Label>
                  <span className="text-sm font-bold text-emerald-600">
                    {interestRate}% p.a.
                  </span>
                </div>
                <input 
                  type="range"
                  min="8.5"
                  max="15.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Partner bank interest rates range between 8.5% - 11.5% depending on co-applicant & university.
                </p>
              </div>

              {/* Quick Feature Badges */}
              <div className="pt-4 border-t border-border/40 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Moratorium Period Included</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>No Prepayment Penalty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Results Display (5 cols) */}
          <div className="lg:col-span-5 bg-card p-5 sm:p-6 rounded-2xl border border-border/80 flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 text-xs font-bold rounded-full">
                  Live Calculation
                </span>
                <span className="text-xs text-muted-foreground">Instant Estimate</span>
              </div>

              {/* Monthly EMI Card */}
              <div className="p-5 sm:p-6 bg-gradient-hero rounded-2xl text-white shadow-elegant mb-6">
                <p className="text-xs uppercase tracking-wider opacity-85 mb-1 font-semibold">
                  Estimated Monthly EMI
                </p>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold truncate">
                    ₹{results.emi.toLocaleString('en-IN')}
                  </h3>
                  <span className="text-xs opacity-90 font-medium shrink-0">/ month</span>
                </div>
              </div>

              {/* Summary Metrics */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-1 p-3 sm:p-3.5 bg-gradient-subtle rounded-xl border border-border/40 text-xs sm:text-sm">
                  <span className="text-muted-foreground">Principal Loan Amount</span>
                  <span className="font-bold text-foreground">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-1 p-3 sm:p-3.5 bg-gradient-subtle rounded-xl border border-border/40 text-xs sm:text-sm">
                  <span className="text-muted-foreground">Total Interest Payable</span>
                  <span className="font-bold text-amber-600">₹{results.totalInterest.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-1 p-3 sm:p-3.5 bg-gradient-subtle rounded-xl border border-border/40 text-xs sm:text-sm">
                  <span className="text-muted-foreground">Total Payment</span>
                  <span className="font-bold text-primary">₹{results.totalAmount.toLocaleString('en-IN')}</span>
                </div>

                {/* Progress Bar Breakdown */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5 font-medium">
                    <span>Principal: {principalPercentage}%</span>
                    <span>Interest: {interestPercentage}%</span>
                  </div>
                  <div className="h-3 w-full bg-amber-500/20 rounded-full overflow-hidden flex">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${principalPercentage}%` }}
                    />
                    <div 
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{ width: `${interestPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/*
              Action CTA.

              This used to be <a href="#contact">, which only worked on the
              homepage — the calculator is now reachable from every page, so on
              a country or location page that anchor pointed at nothing.

              It now sends the figures the student just worked out straight to
              WhatsApp, the same route every other form on the site uses, so the
              counsellor opens the chat already knowing the amount, tenure and
              rate being discussed.
            */}
            <div className="pt-4 border-t border-border/40">
              <Button
                size="lg"
                onClick={() =>
                  sendLeadToWhatsApp("Education Loan EMI Calculator", {
                    loanAmount: `₹${loanAmount.toLocaleString("en-IN")}`,
                    tenure: `${duration / 12} years (${duration} months)`,
                    interestRate: `${interestRate}% p.a. (assumed)`,
                    estimatedEmi: `₹${results.emi.toLocaleString("en-IN")} per month`,
                    totalPayable: `₹${results.totalAmount.toLocaleString("en-IN")}`,
                    message: "I used the EMI calculator on your website. Please help me with an education loan.",
                  })
                }
                className="w-full bg-gradient-gold text-secondary-foreground font-bold shadow-gold hover-glow-gold py-6 rounded-xl text-sm md:text-base"
              >
                Send These Figures to a Counsellor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-[11px] text-center text-muted-foreground mt-2">
                Opens WhatsApp with your numbers filled in. An estimate only — the
                lender sets the actual rate and amount.
              </p>
            </div>

          </div>

    </div>
  );
};

export default LoanCalculatorPanel;