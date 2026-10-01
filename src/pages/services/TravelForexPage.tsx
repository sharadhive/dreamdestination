import GenericServicePage, { type ServicePageData } from "../GenericServicePage";

const DATA: ServicePageData = {
  seo: {
    title: "Travel & Forex Assistance for Study Abroad",
    description:
      "Travel and forex guidance for Indian students going abroad — flight planning, foreign exchange, international money transfer, forex cards and pre-departure preparation.",
    canonicalUrl: "https://www.dreamdestinationstudyabroad.com/travel-forex-assistance",
    keywords: [
      "travel and forex assistance for students", "forex for study abroad",
      "foreign exchange for students", "forex card for students",
      "international money transfer for students", "student flight booking abroad",
      "pre departure guidance study abroad", "how to send tuition fees abroad",
      "LRS limit for students", "student travel insurance",
      "what to carry when studying abroad", "forex rates for students",
    ],
  },

  hero: {
    icon: "✈️",
    badge: "Travel, Forex & Pre-Departure",
    title: "Travel & Forex Assistance",
    highlight: "Travel & Forex",
    description:
      "Get your money and your journey organised properly — foreign exchange, fee transfers, forex cards, flights and everything you need ready before you leave.",
    primaryCta: "Get Pre-Departure Help",
    secondaryCta: "Talk to a Counsellor",
  },

  intro: {
    heading: "The Stage Students Leave Until Last",
    paragraphs: [
      "Once the offer and visa are in hand, most students turn to travel and money in the final two weeks — and that is exactly when mistakes get expensive. Poor exchange rates, transfers that miss a university deadline, or arriving without access to funds are all avoidable with a few weeks' notice.",
      "We help you plan the money side properly: how to pay tuition, how much foreign currency to carry, which combination of forex card, international account and transfer service suits you, and what the regulations allow.",
      "And the practical side: when to book flights, baggage planning, what to carry in hand luggage, and what to arrange in your first week after landing.",
    ],
  },

  whatWeOffer: {
    heading: "What We Help With",
    items: [
      { title: "Tuition Fee Transfers", description: "How to send fees to your university, what documentation is involved, and how long transfers realistically take." },
      { title: "Foreign Exchange Planning", description: "How much currency to carry, and how to split funds between cash, forex card and an international account." },
      { title: "Forex Cards", description: "How student forex cards work, what to compare between providers, and how reloading works once you are abroad." },
      { title: "Flight Planning", description: "When to book, baggage allowances, routing and arrival timing relative to your university's reporting date." },
      { title: "Travel Insurance", description: "What cover your destination or university requires, and what it typically includes." },
      { title: "Pre-Departure Checklist", description: "Documents, SIM, banking, accommodation confirmation and your first-week priorities." },
    ],
  },

  howItWorks: {
    heading: "How We Prepare You",
    steps: [
      { step: 1, title: "Map Your Costs", description: "Tuition, deposit, first months of living costs and one-off setup expenses." },
      { step: 2, title: "Plan the Transfers", description: "What gets paid before departure, what gets carried, and what gets sent later." },
      { step: 3, title: "Arrange Forex", description: "Choose the mix of cash, forex card and international account that suits your destination." },
      { step: 4, title: "Book Travel", description: "Flights timed around your reporting date, accommodation check-in and visa validity." },
      { step: 5, title: "Insurance & Documents", description: "Confirm cover and assemble everything you will need to show on arrival." },
      { step: 6, title: "Pre-Departure Briefing", description: "Walk through arrival, first-week tasks and local essentials." },
    ],
  },

  deepDive: {
    heading: "Money, Travel and Arrival",
    intro: "The three things that decide whether your first month abroad is smooth or stressful.",
    blocks: [
      {
        num: "01",
        title: "Paying Your University",
        subtitle: "Get the reference right and the timing earlier than you think",
        body: "University payments usually need a specific reference or student ID so the money is credited to your account rather than sitting unmatched. International transfers also take longer than domestic ones, and a payment that arrives after a deadline can put your place at risk.",
        items: ["Bank transfer", "University payment portal", "Authorised transfer services", "Correct payment reference", "Transfer timelines", "Proof of payment for your records"],
        note: "Always pay through the channel your university officially specifies. Never through a third party offering to handle it for you.",
      },
      {
        num: "02",
        title: "Foreign Exchange Regulations",
        subtitle: "Remittances for education fall under RBI's Liberalised Remittance Scheme",
        body: "Money sent abroad from India for education is governed by the Liberalised Remittance Scheme, with limits and documentation set by the Reserve Bank of India and applied by your bank. Tax may also apply to remittances above certain thresholds, with different treatment where the funds come from an education loan.",
        items: ["LRS annual limit", "Purpose codes for education", "Documentation your bank requires", "Applicable tax on remittances", "Treatment of education loan funds"],
        note: "Limits, thresholds and tax rates change. Confirm current rules with your bank or a qualified tax adviser — we are not tax advisers.",
      },
      {
        num: "03",
        title: "Carrying and Accessing Money",
        subtitle: "Don't put it all in one place",
        body: "Most students use a combination: a small amount of local cash for the first day, a forex card for the first weeks, and a local bank account opened after arrival. Relying on a single method is what leaves students stranded when a card is blocked for an unrecognised foreign transaction.",
        items: ["Cash for immediate arrival costs", "Forex card for early weeks", "International debit or credit card as backup", "Local account opened on arrival", "Informing your Indian bank of travel"],
      },
      {
        num: "04",
        title: "Booking Your Flight",
        subtitle: "Around your reporting date, not around the cheapest fare",
        body: "Arrive with enough time to reach your accommodation, register with the university and settle in — but not so early that your accommodation is not yet available or your visa validity does not yet permit entry.",
        items: ["University reporting date", "Accommodation check-in date", "Visa entry validity", "Baggage allowance", "Layover duration and transit visas", "Arrival time of day"],
      },
      {
        num: "05",
        title: "Your First Week",
        subtitle: "What to sort out immediately after landing",
        body: "The first week abroad has a predictable set of tasks. Knowing them in advance turns a stressful scramble into a checklist.",
        items: ["University registration", "Local SIM and connectivity", "Local bank account", "Immigration registration, where required", "Transport card", "Grocery and essentials", "Emergency contacts saved"],
      },
    ],
  },

  checklist: {
    heading: "Pre-Departure Checklist",
    intro: "What to have ready before you fly. Keep originals in your hand luggage, never in checked bags.",
    groups: [
      { title: "Documents", items: ["Passport with visa", "Offer / admission letter", "Fee payment receipts", "Academic certificates", "Passport photographs", "Insurance policy"] },
      { title: "Money", items: ["Forex card, activated", "Some local currency cash", "International card as backup", "Bank informed of travel", "Proof of funds if asked on arrival"] },
      { title: "Travel", items: ["Flight tickets", "Accommodation confirmation", "Airport transfer planned", "Baggage within allowance", "Transit visa if required"] },
      { title: "Practical", items: ["Power adapters", "Prescription and essential medication", "Emergency contacts", "Digital copies of all documents", "University contact details"] },
    ],
  },

  whoIsItFor: {
    heading: "Who This Is For",
    points: [
      "Students who have received their visa and are preparing to travel",
      "Families arranging the first tuition transfer",
      "Anyone unsure how much foreign currency to carry",
      "Students confused about forex cards versus international accounts",
      "First-time international travellers",
      "Anyone who wants a proper pre-departure walkthrough",
    ],
  },

  keyBenefits: {
    heading: "Why It Matters",
    benefits: [
      "Fee transfers reach your university on time and correctly referenced",
      "You understand the applicable remittance rules before sending money",
      "You arrive with reliable access to funds, not one single card",
      "Your flight fits your reporting date and accommodation",
      "Your insurance meets your destination's requirement",
      "You know what to do in your first week rather than improvising",
    ],
  },

  mistakes: {
    heading: "Six Pre-Departure Mistakes",
    items: [
      { title: "Leaving the fee transfer to the last week", description: "International transfers take time, and a missed deadline can put your admission at risk." },
      { title: "Carrying everything on one card", description: "Cards get blocked abroad. Always have a second way to access money." },
      { title: "Not telling your bank you're travelling", description: "Unrecognised foreign transactions are the most common reason a card stops working on day one." },
      { title: "Booking flights before confirming accommodation", description: "Arriving before your check-in date means paying for a hotel you didn't budget for." },
      { title: "Packing original documents in checked baggage", description: "If the bag is delayed, so is your registration. Originals travel in hand luggage." },
      { title: "Ignoring the transit visa", description: "Some layovers require one, and airlines will deny boarding without it." },
    ],
  },

  whyDD: {
    heading: "Why DreamDestination",
    points: [
      "Pre-departure planned alongside your admission and visa, not bolted on at the end",
      "Clear explanation of what remittance rules allow",
      "Guidance on comparing forex options rather than being pushed to one provider",
      "Flight timing planned around your reporting and check-in dates",
      "A first-week checklist for your specific destination",
      "Online support from anywhere in India",
    ],
  },

  faqs: [
    { question: "How do I pay my university tuition fees from India?", answer: "Usually by bank transfer or through the university's own payment portal, using the exact reference or student ID they specify. International transfers take longer than domestic ones, so start well before the deadline and keep the proof of payment." },
    { question: "How much foreign currency should I carry?", answer: "Enough for your first few days — airport transfer, food, immediate essentials — with the rest on a forex card or accessible through an international card. Carrying large amounts of cash is neither safe nor necessary." },
    { question: "What is a forex card and do I need one?", answer: "A forex card is a prepaid card loaded with foreign currency, typically used for the first weeks abroad before a local bank account is opened. Compare loading and reload fees, ATM charges and exchange rates between providers before choosing." },
    { question: "What is the LRS limit for sending money abroad?", answer: "Remittances from India for education fall under the Reserve Bank of India's Liberalised Remittance Scheme, which sets an annual limit per individual. The limit and any applicable tax thresholds change, so confirm current figures with your bank." },
    { question: "Is there tax on money sent abroad for education?", answer: "Tax may apply to remittances above certain thresholds, and the treatment can differ where funds come from an education loan. Rates and thresholds change — confirm with your bank or a qualified tax adviser. We are not tax advisers." },
    { question: "When should I book my flight?", answer: "Once your visa is granted and your accommodation is confirmed. Time your arrival around your university's reporting date and your accommodation check-in, and check that your visa permits entry on that date." },
    { question: "Do I need travel insurance to study abroad?", answer: "Many destinations or universities require health or travel cover as a condition of enrolment or the visa. Check what your specific destination and university require, and what the policy actually covers." },
    { question: "What should I carry in my hand luggage?", answer: "Passport with visa, offer letter, fee receipts, academic certificates, insurance documents, essential medication and some local currency. Originals should never go in checked baggage." },
    { question: "Can I open a bank account before I arrive?", answer: "Some international banks allow students to begin the process before travelling, but most students open a local account after arrival using their university enrolment and address proof." },
    { question: "What should I do in my first week abroad?", answer: "Register with your university, get a local SIM, open a bank account, complete any required immigration registration, sort a transport card, and save emergency contacts." },
  ],

  ctaSection: {
    heading: "Flying Soon?",
    description: "Get your transfers, forex and travel organised properly before you go.",
  },
};

const TravelForexPage = () => <GenericServicePage data={DATA} />;
export default TravelForexPage;
