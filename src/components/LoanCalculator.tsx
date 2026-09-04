import { useState } from "react";
import { Calculator, DollarSign, Calendar, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [duration, setDuration] = useState(84);
  const [interestRate, setInterestRate] = useState(10.5);
  const [showResults, setShowResults] = useState(false);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = duration;
    
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

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gradient-warm">Loan Calculator</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Calculate your monthly EMI and plan your education loan repayment with our 
            interactive calculator. Get instant results with transparent calculations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <div className="bg-card p-8 rounded-2xl shadow-elegant animate-slide-in-left">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-warm rounded-xl">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Education Loan Calculator</h3>
            </div>

            <div className="space-y-6">
              {/* Loan Amount */}
              <div>
                <Label className="text-base font-medium mb-3 block">Loan Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="pl-10 py-6 text-lg"
                    placeholder="Enter loan amount"
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>Min: ₹1,00,000</span>
                  <span>Max: ₹1,50,00,000</span>
                </div>
                <input 
                  type="range"
                  min="100000"
                  max="15000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full mt-3 accent-primary"
                />
                <p className="text-center mt-2 font-semibold text-lg">
                  ₹{loanAmount.toLocaleString('en-IN')}
                </p>
              </div>

              {/* Loan Duration */}
              <div>
                <Label className="text-base font-medium mb-3 block">Loan Duration (Months)</Label>
                <Select value={duration.toString()} onValueChange={(value) => setDuration(Number(value))}>
                  <SelectTrigger className="py-6 text-lg">
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
                <Label className="text-base font-medium mb-3 block">Interest Rate (% per annum)</Label>
                <div className="relative">
                  <TrendingDown className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="pl-10 py-6 text-lg"
                    placeholder="Interest rate"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Our rates start from 9.5% per annum
                </p>
              </div>

              {/* Calculate Button */}
              <Button 
                onClick={handleCalculate}
                className="w-full py-6 text-lg bg-gradient-gold text-secondary-foreground font-semibold shadow-gold hover-glow-gold"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate EMI
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-card p-8 rounded-2xl shadow-elegant animate-slide-in-right">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-success rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Calculation Results</h3>
            </div>

            {showResults ? (
              <div className="space-y-6 animate-bounce-in">
                {/* EMI Amount */}
                <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-primary">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
                      <p className="text-3xl font-bold text-primary">
                        ₹{results.emi.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Total Amount */}
                <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-secondary">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Amount Payable</p>
                      <p className="text-2xl font-bold text-secondary">
                        ₹{results.totalAmount.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-secondary" />
                  </div>
                </div>

                {/* Total Interest */}
                <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-accent">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                      <p className="text-2xl font-bold text-accent">
                        ₹{results.totalInterest.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <TrendingDown className="w-8 h-8 text-accent" />
                  </div>
                </div>

                {/* Breakdown Chart */}
                <div className="p-6 bg-gradient-subtle rounded-xl">
                  <h4 className="font-semibold mb-4">Payment Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Principal Amount</span>
                      <span className="font-semibold">
                        {((loanAmount / results.totalAmount) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Interest Amount</span>
                      <span className="font-semibold">
                        {((results.totalInterest / results.totalAmount) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-success rounded-full"
                      style={{ width: `${(loanAmount / results.totalAmount) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t">
                  <Button className="w-full py-4 bg-gradient-hero hover-glow-primary">
                    Apply for This Loan
                  </Button>
                  <Button variant="outline" className="w-full mt-3 py-4 hover-glow-secondary">
                    Get Expert Consultation
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
                <div className="p-6 bg-gradient-subtle rounded-full mb-6">
                  <Calculator className="w-12 h-12 text-muted-foreground" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Calculate Your EMI</h4>
                <p className="text-muted-foreground max-w-xs">
                  Enter your loan details and click calculate to see your monthly EMI and total payment breakdown.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 animate-fade-in">
          <div className="text-center">
            <div className="p-4 bg-gradient-hero rounded-xl inline-block mb-4">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-lg mb-2">Competitive Rates</h4>
            <p className="text-muted-foreground">Interest rates starting from 9.5% per annum</p>
          </div>
          <div className="text-center">
            <div className="p-4 bg-gradient-success rounded-xl inline-block mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-lg mb-2">Flexible Tenure</h4>
            <p className="text-muted-foreground">Choose repayment period from 5 to 15 years</p>
          </div>
          <div className="text-center">
            <div className="p-4 bg-gradient-warm rounded-xl inline-block mb-4">
              <TrendingDown className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-lg mb-2">No Hidden Charges</h4>
            <p className="text-muted-foreground">Transparent pricing with no processing fees</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanCalculator;