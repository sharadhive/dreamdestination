import GenericServicePage, { type ServicePageData } from "../GenericServicePage";

const DATA: ServicePageData = {
  seo: {
    title: "Student Insurance Assistance for Study Abroad",
    description:
      "Student health and travel insurance guidance for Indian students going abroad — what your destination requires, what cover to compare and how it fits your visa.",
    canonicalUrl: "https://www.dreamdestinationstudyabroad.com/insurance-assistance",
    keywords: [
      "student insurance for study abroad", "international student health insurance",
      "student travel insurance India", "overseas student insurance",
      "health insurance for student visa", "insurance required for student visa",
      "medical insurance for international students", "OSHC Australia",
      "student health insurance UK IHS", "insurance for students going abroad",
      "what does student insurance cover", "cheapest student insurance abroad",
    ],
  },

  hero: {
    icon: "🛡️",
    badge: "Health & Travel Cover for Students",
    title: "Student Insurance Assistance",
    highlight: "Student Insurance",
    description:
      "Understand what cover your destination and university actually require, what each policy really includes, and how insurance connects to your visa.",
    primaryCta: "Get Insurance Guidance",
    secondaryCta: "Talk to a Counsellor",
  },

  intro: {
    heading: "The Requirement Most Students Discover Too Late",
    paragraphs: [
      "Insurance is rarely the first thing on a student's mind — until a university makes it a condition of enrolment, or a visa application asks for proof of cover. Several destinations treat health insurance as mandatory, and some collect it as part of the visa fee itself.",
      "The bigger risk is medical cost. Healthcare abroad can be extraordinarily expensive, and an uninsured hospital visit can wipe out a year of a family's savings. Students also underestimate how often cover is needed for something ordinary — a sports injury, a dental problem, a lost laptop.",
      "We help you understand what your specific destination and university require, what a policy genuinely covers, and where the exclusions sit — before you buy anything.",
    ],
  },

  whatWeOffer: {
    heading: "What We Help With",
    items: [
      { title: "Destination Requirements", description: "What health or travel cover your country and visa route actually mandate." },
      { title: "University Requirements", description: "Whether your university requires its own plan or accepts external cover." },
      { title: "Policy Comparison", description: "What to compare beyond price — limits, exclusions, waiting periods and claim process." },
      { title: "Visa Documentation", description: "Where proof of insurance fits into your visa application and what evidence is accepted." },
      { title: "Coverage Gaps", description: "Identifying what a policy excludes before you rely on it." },
      { title: "Claim Guidance", description: "Understanding how to actually use the policy once you are abroad." },
    ],
  },

  howItWorks: {
    heading: "How We Work Through It",
    steps: [
      { step: 1, title: "Check the Requirement", description: "What your destination, visa route and university each require." },
      { step: 2, title: "Establish the Minimum", description: "The cover levels and duration the requirement specifies." },
      { step: 3, title: "Compare Options", description: "University plans, home-country policies and international student insurers." },
      { step: 4, title: "Read the Exclusions", description: "Pre-existing conditions, dental, mental health, sports, waiting periods." },
      { step: 5, title: "Arrange Cover", description: "Buy through the appropriate channel with the correct start date." },
      { step: 6, title: "File the Documents", description: "Keep proof accessible for the visa, enrolment and your own records." },
    ],
  },

  deepDive: {
    heading: "Understanding Student Insurance",
    intro: "What the requirement means in practice, and what actually matters when comparing policies.",
    blocks: [
      {
        num: "01",
        title: "Where Insurance Is Mandatory",
        subtitle: "Several destinations require it as a condition of the visa or enrolment",
        body: "Requirements differ significantly. Some countries collect a health surcharge as part of the visa application. Some require you to hold an approved policy for the full duration of your stay before the visa is granted. Others leave it to the university, or do not mandate it at all — which does not make it wise to go without.",
        items: ["Visa-linked health surcharges", "Mandatory approved policies", "University-mandated plans", "Duration-of-stay requirements", "Minimum cover levels"],
        note: "Requirements change between intakes. Always confirm against the current official immigration and university guidance for your destination.",
      },
      {
        num: "02",
        title: "University Plans vs External Cover",
        subtitle: "Some universities will not let you opt out",
        body: "Many universities offer or require their own student health plan, often billed with tuition. Some allow you to waive it if you hold equivalent approved cover; others do not permit a waiver at all. Buying external cover before checking this is how students end up paying twice.",
        items: ["Whether a waiver is permitted", "What the waiver requires you to prove", "The waiver deadline", "What the university plan covers", "Whether it is billed with tuition"],
        note: "Check the waiver policy before buying any external plan.",
      },
      {
        num: "03",
        title: "What to Compare Beyond the Price",
        subtitle: "The cheapest policy is rarely the one you want when you need it",
        body: "Two policies at similar prices can behave very differently at the point of claim. What matters is the cover limit, what is excluded, how long you wait before certain cover begins, and how straightforward it is to actually claim.",
        items: ["Overall cover limit", "Hospitalisation and outpatient cover", "Pre-existing condition treatment", "Dental and optical", "Mental health support", "Sports and adventure activities", "Waiting periods", "Cashless network or reimbursement", "Repatriation cover", "Claim process and turnaround"],
      },
      {
        num: "04",
        title: "Exclusions Students Get Caught By",
        subtitle: "Read this section before the premium",
        body: "Most disputes at claim time come down to an exclusion the student never read. Pre-existing conditions are the most common, but sports injuries, dental treatment and mental health support are frequently limited or excluded on cheaper policies.",
        items: ["Pre-existing conditions", "Dental treatment", "Mental health support", "Adventure and contact sports", "Pregnancy and maternity", "Treatment during home visits", "Loss of personal belongings"],
        note: "If a condition matters to you, confirm in writing that it is covered before buying.",
      },
      {
        num: "05",
        title: "Insurance and Your Visa",
        subtitle: "Where proof fits into the application",
        body: "Depending on the destination, you may need to show proof of cover with your visa application, pay a health surcharge as part of it, or arrange cover only after arrival. Getting this sequence wrong can delay a visa decision.",
        items: ["Whether proof is needed at application", "Accepted forms of evidence", "Health surcharge payment", "Cover start date versus travel date", "Duration the visa requires"],
      },
    ],
  },

  whoIsItFor: {
    heading: "Who This Is For",
    points: [
      "Students whose destination requires health cover for the visa",
      "Anyone unsure whether to take the university plan or buy independently",
      "Students with a pre-existing condition who need to check cover carefully",
      "Families wanting to understand what a policy actually pays for",
      "Students comparing several policies and unsure what to look at",
      "Anyone who has been told their university plan cannot be waived",
    ],
  },

  keyBenefits: {
    heading: "Why It Matters",
    benefits: [
      "You meet your destination's requirement rather than guessing at it",
      "You avoid paying twice for university and external cover",
      "You know the exclusions before you need to claim",
      "Your cover starts on the right date for your visa and travel",
      "Proof of insurance is ready when the visa asks for it",
      "You understand how to use the policy once abroad",
    ],
  },

  mistakes: {
    heading: "Five Insurance Mistakes",
    items: [
      { title: "Buying before checking the university's waiver rules", description: "Many universities bill their own plan regardless, leaving you paying for two." },
      { title: "Choosing purely on premium", description: "A low premium usually means lower limits, longer waiting periods or wider exclusions." },
      { title: "Not declaring a pre-existing condition", description: "Non-disclosure is the most reliable way to have a claim rejected outright." },
      { title: "Getting the start date wrong", description: "Cover should begin from your travel date, not your course start date." },
      { title: "Never reading the claim process", description: "Knowing whether it is cashless or reimbursement matters enormously in an emergency." },
    ],
  },

  whyDD: {
    heading: "Why DreamDestination",
    points: [
      "We check the destination, visa and university requirements separately — they often differ",
      "We explain exclusions before premiums",
      "We flag where a university plan cannot be waived, so you don't pay twice",
      "Insurance planned alongside your visa timeline",
      "No pressure toward any particular insurer",
      "Online support from anywhere in India",
    ],
  },

  faqs: [
    { question: "Is insurance mandatory for a student visa?", answer: "It depends on the destination and visa category. Several countries require health cover as a condition of the visa, and some collect a health surcharge as part of the application. Others leave it to the university. Always check the current official requirement for your destination." },
    { question: "What does international student insurance cover?", answer: "Typically hospitalisation, outpatient treatment, emergency care and repatriation, with varying cover for dental, optical, mental health and sports injuries. What matters is the specific policy's limits and exclusions, not the general category." },
    { question: "Should I buy my university's plan or an external policy?", answer: "Check first whether your university permits a waiver. Some require their own plan regardless, and students who buy external cover first end up paying twice. Where a waiver is allowed, compare cover levels and exclusions, not just price." },
    { question: "Does student insurance cover pre-existing conditions?", answer: "Often not, or only after a waiting period and at additional cost. Declare any pre-existing condition honestly and confirm in writing whether it is covered. Non-disclosure is the most common reason claims are rejected." },
    { question: "When should my insurance start?", answer: "From your travel date rather than your course start date, so you are covered in transit and on arrival. Check the duration your visa requires the cover to run for." },
    { question: "How much does student insurance cost?", answer: "It varies widely by destination, duration, cover level and your age and health. Some destinations collect a fixed surcharge with the visa instead. Compare what the policy covers rather than the premium alone." },
    { question: "Does insurance cover dental and mental health?", answer: "Cover varies considerably. Cheaper policies often limit or exclude both. If either matters to you, confirm the specific cover before buying." },
    { question: "What if I need to claim while abroad?", answer: "It depends whether the policy is cashless within a network or reimbursement-based. Understand the process, keep the insurer's emergency number accessible, and retain all medical documentation." },
    { question: "Can my family buy the policy from India?", answer: "In many cases yes, though some destinations require an approved local provider. Check whether your destination and university accept a policy purchased in India before buying one." },
    { question: "Do you sell insurance policies?", answer: "No. We help you understand the requirements and compare options. The policy is a contract between you and the insurer, and the cover, exclusions and claim decisions are entirely theirs." },
  ],

  ctaSection: {
    heading: "Not Sure What Cover You Need?",
    description: "Tell us your destination and university and we will explain exactly what is required.",
  },
};

const InsuranceAssistancePage = () => <GenericServicePage data={DATA} />;
export default InsuranceAssistancePage;
