import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    category: "Education Loans",
    faqs: [
      {
        question: "What is the maximum loan amount I can get?",
        answer: "You can get an education loan up to ₹1.5 Crores for studying abroad. The exact amount depends on your course, university, and financial profile. We offer comprehensive coverage for tuition fees, living expenses, travel costs, and other education-related expenses."
      },
      {
        question: "Do I need collateral for the education loan?",
        answer: "No, for loans up to ₹40 Lakhs, no collateral is required. For higher amounts, we may require collateral or a co-signer depending on your profile. Our team will guide you through the best options available for your situation."
      },
      {
        question: "What are the interest rates?",
        answer: "Our interest rates start from 9.5% per annum and vary based on the loan amount, course, university, and your credit profile. We offer competitive rates with transparent pricing - no hidden charges or processing fees."
      },
      {
        question: "How long does the approval process take?",
        answer: "Pre-approval can be obtained within 24 hours of submitting complete documents. Final approval typically takes 7-10 working days after verification. We have streamlined the process to ensure quick turnaround times."
      },
      {
        question: "When do I start repaying the loan?",
        answer: "Loan repayment typically starts 6 months after course completion or 12 months after the loan is fully disbursed, whichever is earlier. We offer flexible repayment options including moratorium periods during your studies."
      }
    ]
  },
  {
    category: "Study Abroad",
    faqs: [
      {
        question: "Which countries do you provide services for?",
        answer: "We provide comprehensive services for 15+ countries including USA, UK, Canada, Australia, Germany, Ireland, New Zealand, Singapore, Sweden, Netherlands, France, and more. Our counselors have expertise in specific regions and can guide you accordingly."
      },
      {
        question: "How do you help with university selection?",
        answer: "Our expert counselors assess your academic background, career goals, and preferences to recommend suitable universities and programs. We have partnerships with 200+ universities worldwide and provide detailed insights about admission requirements, campus life, and career prospects."
      },
      {
        question: "Do you help with scholarship applications?",
        answer: "Yes, we provide comprehensive scholarship guidance including identifying relevant scholarships, application support, and follow-up. Our team has helped students secure scholarships worth crores, significantly reducing their education costs."
      },
      {
        question: "What is included in visa assistance?",
        answer: "Our visa assistance includes document checklist, application form completion, interview preparation, mock interviews, and tracking until visa approval. We have a high success rate and provide personalized guidance based on the destination country's requirements."
      }
    ]
  },
  {
    category: "Process & Documentation",
    faqs: [
      {
        question: "What documents are required for loan application?",
        answer: "Basic documents include academic transcripts, admission letter/offer letter, income proof of parents/co-applicant, bank statements, identity proofs, and passport. Our team provides a detailed checklist and helps with document preparation."
      },
      {
        question: "Can I apply before getting university admission?",
        answer: "Yes, you can apply for pre-approval before getting university admission. This helps you understand your loan eligibility and plan your applications accordingly. Final approval will be completed once you receive the admission offer."
      },
      {
        question: "Is there any processing fee?",
        answer: "No, we don't charge any processing fees for loan applications. Our service is transparent with no hidden charges. You only pay the agreed interest rate and any applicable government charges or third-party fees."
      },
      {
        question: "How is the loan amount disbursed?",
        answer: "The loan is typically disbursed directly to the university for tuition fees and to your account for living expenses. Disbursement happens in stages - first installment before travel and subsequent installments as per academic terms."
      }
    ]
  }
];

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState("Education Loans");

  const currentFAQs = faqData.find(category => category.category === selectedCategory)?.faqs || [];

  return (
    <section className="py-20 bg-gradient-subtle">
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