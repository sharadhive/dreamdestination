import { DollarSign, Shield, Zap, Users, Award, Globe, Building2, CheckCircle2, Clock, Percent } from "lucide-react";

/**
 * ── WHY THESE CARDS NO LONGER QUOTE LENDER TERMS ──
 *
 * They used to read "Loans Up to ₹1.5 Crore", "Zero Collateral Required",
 * "Lowest Interest Rates — from 8.5% p.a.", "48-Hour Pre-Approval" and
 * "200+ Global Universities — direct tie-ups".
 *
 * None of those are ours to promise. DreamDestination is a consultancy, not a
 * bank: it sets no ceiling, no rate and no approval time, and a student who
 * arrived expecting 8.5% and was quoted 11% by their bank would be right to feel
 * misled. The site also contradicted itself — the FAQ said rates started at
 * 9.5%, these cards said 8.5% — which is the kind of internal inconsistency a
 * search quality rater is explicitly asked to look for on money-related pages.
 *
 * What replaced them is what the business genuinely controls and can be held to:
 * the work, the independence, the sequence. That is also stronger copy, because
 * every competitor claims the low rate and none of them claim "we take no
 * commission, so the shortlist is not a partner list".
 *
 * RULE FOR ANYONE EDITING THIS FILE: if a claim here belongs to a bank, a
 * university or an immigration authority, it does not belong on this card.
 */
const features = [
  {
    icon: DollarSign,
    title: "Funding Worked Out First",
    description: "Total course and living cost, what your family can fund, and the real gap left to borrow — before you apply to a single lender.",
    badge: "Before You Borrow",
    gradient: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-500"
  },
  {
    icon: Shield,
    title: "Secured & Unsecured Routes",
    description: "Whether you need collateral depends on the amount, country, institution and co-applicant. We go through all four before anything is submitted.",
    badge: "Both Routes",
    gradient: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-500"
  },
  {
    icon: Percent,
    title: "No Commission From Lenders",
    description: "We take nothing from any bank or NBFC, so the shortlist follows your profile rather than a partner list. Rates and approval are theirs to decide.",
    badge: "Independent",
    gradient: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-500"
  },
  {
    icon: Clock,
    title: "Sanction Timed To Your Visa",
    description: "The loan sanction letter is what your visa financial evidence rests on. We sequence the loan file so it lands before the appointment, not after.",
    badge: "Right Sequence",
    gradient: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-500"
  },
  {
    icon: Award,
    title: "No Fee For Loan Guidance",
    description: "The first consultation is free and loan help is part of the counselling. Any processing charge is the lender's own, disclosed in their sanction letter.",
    badge: "Free First Consult",
    gradient: "from-cyan-500/20 to-cyan-500/5",
    iconColor: "text-cyan-500"
  },
  {
    icon: Globe,
    title: "Abroad And Inside India",
    description: "Overseas admissions across 22 destinations, and domestic education loans under PM-Vidyalaxmi for students staying in India.",
    badge: "Both Directions",
    gradient: "from-rose-500/20 to-rose-500/5",
    iconColor: "text-rose-500"
  }
];

/**
 * Lenders students commonly borrow from — NOT a claim of official partnership.
 *
 * The previous version labelled these "Our Official Banking & Financing
 * Partners" and attached a benefit to each ("Special Rate", "Instant Sanction").
 * Asserting an official relationship with a named bank you do not have a signed
 * agreement with is a different order of risk to ordinary marketing puff: these
 * are trademarks belonging to regulated institutions.
 *
 * Listing them as the market we help students compare across is accurate
 * whatever the commercial position, and still communicates coverage. If a
 * genuine written partnership exists with any of these, that one can be labelled
 * as such — individually, and only then.
 */
const partnerBanks = [
  { name: "SBI Education Loans", type: "Public Bank", discount: "Secured & unsecured" },
  { name: "HDFC Credila", type: "NBFC", discount: "Overseas specialist" },
  { name: "Axis Bank", type: "Private Bank", discount: "Secured & unsecured" },
  { name: "ICICI Bank", type: "Private Bank", discount: "Secured & unsecured" },
  { name: "Avanse Financial", type: "NBFC", discount: "Overseas specialist" },
  { name: "InCred Finance", type: "NBFC", discount: "Overseas specialist" },
  { name: "Prodigy Finance", type: "International", discount: "USD / GBP lending" },
  { name: "MPower Financing", type: "International", discount: "No co-signer route" },
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-20 bg-gradient-subtle relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4">
            <CheckCircle2 className="w-4 h-4" />
            <span>Independent Guidance — We Take No Lender Commission</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Designed for <span className="text-gradient-hero">Indian Students</span> & Families
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Course choice, admission, funding and the visa are one connected problem. The same counsellor handles all four, because the university's fee structure sets the loan amount and the sanction letter is what the visa file rests on.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-card p-6 md:p-8 rounded-2xl border border-border/80 shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3.5 rounded-xl bg-gradient-to-br ${feature.gradient} ${feature.iconColor} border border-border/40 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 bg-muted text-muted-foreground text-[11px] font-bold rounded-full border border-border/40">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/40 flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Part of the free consultation</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partner Banks Network Banner */}
        <div className="bg-card rounded-2xl border border-border/80 p-8 shadow-elegant">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              Lenders We Help You <span className="text-gradient-gold">Compare</span>
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Public banks, private banks, Indian NBFCs and international lenders all lend to Indian students, on very different terms. We shortlist against your profile and explain the trade-offs — we are not an agent for any of them and take no commission.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
            {partnerBanks.map((bank, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-gradient-subtle border border-border/60 text-center hover:border-primary/40 transition-colors"
              >
                <div className="p-2 bg-primary/10 rounded-lg w-fit mx-auto mb-2 text-primary">
                  <Building2 className="w-5 h-5" />
                </div>
                <p className="font-bold text-sm text-foreground mb-0.5">{bank.name}</p>
                <p className="text-[11px] text-muted-foreground">{bank.type}</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 text-[10px] font-bold rounded-full">
                  {bank.discount}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;