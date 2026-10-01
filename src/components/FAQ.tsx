import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

/**
 * ── WHY THESE ANSWERS WERE REWRITTEN ──
 *
 * The previous version of this block made lender promises in the first person:
 * "Our interest rates start from 9.5% per annum", "no collateral is required for
 * loans up to ₹40 Lakhs", "pre-approval within 24 hours", "partnerships with
 * 200+ universities", "scholarships worth crores".
 *
 * Three problems with that, in order of seriousness:
 *
 * 1. DreamDestination is not a lender. It has no interest rate, no collateral
 *    threshold and no approval SLA to offer — those belong to the bank or NBFC.
 *    Stating them as ours is a misleading financial representation, and lending
 *    is the most heavily policed category there is.
 * 2. It contradicted the rest of the site. Every one of the 500+ location pages
 *    says, correctly, that "approval, amount, interest rate and collateral
 *    requirements are always the lender's decision — never ours." A visitor who
 *    read both pages would not know which to believe, and neither would Google.
 * 3. It is YMYL content. Search quality raters are told to hold pages about
 *    money and major life decisions to a higher standard of accuracy and
 *    accountability. Unverifiable figures on a finance page is precisely the
 *    pattern that suppresses a site rather than a single URL.
 *
 * The answers below describe how education lending actually works and attribute
 * every decision to the party that makes it. Nothing here is a number we cannot
 * stand behind. If a figure is ever added back, it needs a named public source
 * and a date — the same bar LOAN_FACTS in LocationPage.tsx is held to.
 *
 * Exported because Index.tsx renders it as FAQPage structured data. Do not let
 * the two drift: the schema must state exactly what the visible page states.
 */
export const faqData = [
  {
    category: "Education Loans",
    faqs: [
      {
        question: "How much education loan can I get for studying abroad?",
        answer: "There is no single figure. Lenders size an education loan against the total cost of your specific course and university, your co-applicant's income and credit history, and whether collateral is offered. A secured loan generally stretches further than an unsecured one. We help you work out what you actually need and what you can realistically expect, before you approach anyone — but the sanctioned amount is always the lender's decision, not ours."
      },
      {
        question: "Do I need collateral for an education loan?",
        answer: "It depends on the amount, the destination, the institution and your co-applicant. Unsecured education loans do exist and are common, but they are normally capped lower than secured ones and rest almost entirely on the co-applicant's income and credit record. For a course inside India at a covered institution, PM-Vidyalaxmi is specifically collateral-free and guarantor-free. We go through which route fits your file before you apply."
      },
      {
        question: "What interest rate will I pay?",
        answer: "We are not a lender and we have no rate to quote you. Rates are set by each bank or NBFC and vary by loan amount, whether it is secured, the destination, the institution and your co-applicant's profile — and they move. We help you compare live offers side by side on the total cost of borrowing rather than the headline rate alone, and we take no commission from any lender."
      },
      {
        question: "How long does an education loan take to be sanctioned?",
        answer: "It varies by lender and by route, and the biggest variable is usually the file rather than the bank. A complete application — offer letter, academics, KYC, co-applicant income proof and collateral papers ready together — moves far faster than one assembled in pieces. Secured loans take longer than unsecured ones because the property or deposit has to be valued and verified. Start as soon as you have an offer letter, not after you book a visa appointment."
      },
      {
        question: "When does repayment start?",
        answer: "Most education loans include a moratorium covering the course plus a period after it, so repayment usually begins after the course ends rather than during it. The exact length, and whether interest accrues or is serviced during the moratorium, is set in your loan agreement — read that clause specifically, because it changes the total you repay considerably. We will go through it with you before you sign."
      }
    ]
  },
  {
    category: "Study Abroad",
    faqs: [
      {
        question: "Which countries do you help students apply to?",
        answer: "Twenty-two destinations in all, including the UK, USA, Canada, Australia, New Zealand, Germany, Ireland, France, Italy, the Netherlands, Switzerland, Spain, Singapore, Malaysia, Dubai/UAE and Mauritius — and we also advise students staying in India. Each has its own entry requirements, visa route and funding picture, and we will tell you plainly when the one you have in mind is a poor fit for your profile."
      },
      {
        question: "How do you help with university selection?",
        answer: "We start from your academic record, budget and what you want to do afterwards, then build a shortlist with genuine ambitious, target and fallback options rather than encouraging you to apply everywhere. We will show you universities we earn nothing from, and we compare offers on total cost and post-study work rights, not on ranking alone."
      },
      {
        question: "Do you help with scholarship applications?",
        answer: "Yes — screening which university, government and external awards you genuinely qualify for, then working on the application itself. Timing matters more than most students expect: several of the larger scholarships close before the university's own deadline, so waiting for an offer letter means missing them. A scholarship reduces what you have to borrow, which is why we look at awards before the loan."
      },
      {
        question: "What is included in visa assistance?",
        answer: "A document checklist for your exact destination and visa category, preparation of the financial evidence, a full review of the application before submission, and interview practice where the destination requires one. Financial evidence is where most files come unstuck — funds not held long enough, an undocumented sponsor, or a sanction letter that does not match the offer letter — so we check it against the rule in force for your destination. Visa decisions rest with the immigration authority; we cannot guarantee an outcome."
      }
    ]
  },
  {
    category: "Process & Documentation",
    faqs: [
      {
        question: "What documents are required for a loan application?",
        answer: "Typically: the admission or offer letter with the full fee structure, academic records, an English test scorecard where the course needs one, KYC for the student and co-applicant, co-applicant income proof such as salary slips, Form 16 or ITRs and bank statements, collateral papers for a secured loan, and a written breakdown of the total cost against what you are funding yourself. Individual lenders add their own requirements, so we confirm the list against the specific lender before you start."
      },
      {
        question: "Can I apply before I have an admission offer?",
        answer: "Some lenders will assess eligibility in principle before an offer letter, which is useful for planning how much to borrow and which universities are realistically affordable. It is an indication, not a sanction — the actual loan is processed once the admission offer and fee structure are in hand, and the final terms can differ."
      },
      {
        question: "Do you charge a fee for education loan help?",
        answer: "No. Education loan guidance is part of the counselling we already provide, and the first consultation is free. We are not a lending agent and we take no percentage of your loan. Lenders may levy their own processing charges — those are theirs, disclosed in their sanction letter. If anyone asks you for a fee to 'get your loan approved', treat that as a warning sign."
      },
      {
        question: "How is the loan amount disbursed?",
        answer: "Usually in stages rather than as a lump sum: tuition normally goes directly to the institution against its fee demand, with living-expense components released to you or in instalments across academic terms. The schedule is set by the lender and written into the sanction letter, so it is worth matching it against your fee deadlines early — a disbursement that lands after a fee due date is a common and avoidable problem."
      }
    ]
  }
];

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState("Education Loans");

  const currentFAQs = faqData.find(category => category.category === selectedCategory)?.faqs || [];

  return (
    <section id="faq" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-gradient-warm">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get answers to the most common questions about education loans, study abroad processes, 
            and our services. Can't find what you're looking for? Contact our experts.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card p-6 rounded-2xl shadow-soft sticky top-24 animate-slide-in-left">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-primary" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {faqData.map((category) => (
                    <button
                      key={category.category}
                      onClick={() => setSelectedCategory(category.category)}
                      className={`w-full text-left p-3 rounded-lg transition-smooth ${
                        selectedCategory === category.category
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {category.category}
                      <span className="text-xs block mt-1 opacity-70">
                        {category.faqs.length} questions
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3 animate-slide-in-right">
              <div className="bg-card p-8 rounded-2xl shadow-soft">
                <h3 className="text-2xl font-bold mb-8 text-center">
                  {selectedCategory}
                </h3>

                <Accordion type="single" collapsible className="space-y-4">
                  {currentFAQs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="border border-border rounded-xl px-6 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <AccordionTrigger className="text-left py-6 hover:no-underline">
                        <span className="text-lg font-semibold pr-4">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 pt-2">
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Still Have Questions Section */}
              <div className="mt-8 bg-gradient-hero p-8 rounded-2xl shadow-elegant text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
                <p className="text-lg opacity-90 mb-6">
                  Our expert counselors are here to help you with personalized answers 
                  and guidance for your specific situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-gold text-secondary-foreground font-semibold shadow-gold hover-glow-gold">
                    Chat with Expert
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    Schedule Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 animate-fade-in">
          <div className="text-center p-6 bg-card rounded-xl shadow-soft">
            <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-lg mb-2">Live Chat</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Get instant answers to your questions
            </p>
            <Button variant="outline" size="sm" className="hover-glow-primary">
              Start Chat
            </Button>
          </div>

          <div className="text-center p-6 bg-card rounded-xl shadow-soft">
            <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📞</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Phone Support</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Speak directly with our experts
            </p>
            <Button variant="outline" size="sm" className="hover-glow-success">
              Call Now
            </Button>
          </div>

          <div className="text-center p-6 bg-card rounded-xl shadow-soft">
            <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📧</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Email Support</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Send us your detailed queries
            </p>
            <Button variant="outline" size="sm" className="hover-glow-warm">
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;