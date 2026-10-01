import GenericServicePage, { type ServicePageData } from "../GenericServicePage";

const DATA: ServicePageData = {
  seo: {
    title: "IELTS, TOEFL, PTE & GRE Preparation for Study Abroad",
    description:
      "Test preparation guidance for Indian students — which English or entrance test your universities accept, what score to target, how to prepare and when to book.",
    canonicalUrl: "https://www.dreamdestinationstudyabroad.com/test-preparations",
    keywords: [
      "test preparation for study abroad", "IELTS preparation", "TOEFL preparation",
      "PTE preparation", "Duolingo English Test", "GRE preparation", "GMAT preparation",
      "SAT preparation", "which English test for study abroad",
      "IELTS score required for UK", "IELTS vs TOEFL vs PTE",
      "English test for student visa", "entrance exam for study abroad",
      "test prep consultant for Indian students", "how to prepare for IELTS",
    ],
  },

  hero: {
    icon: "📚",
    badge: "English & Entrance Test Guidance",
    title: "Test Preparation for Study Abroad",
    highlight: "Test Preparation",
    description:
      "Know exactly which test your shortlisted universities accept, what score you need, and how long to give yourself — before you book anything.",
    primaryCta: "Get Free Test Guidance",
    secondaryCta: "Talk to a Counsellor",
  },

  intro: {
    heading: "Book the Right Test, Not the Popular One",
    paragraphs: [
      "Most students book IELTS because everyone around them did. But acceptance differs by country, university and sometimes by individual department — and the test that suits your strengths may not be the one your friend took.",
      "We start from your actual shortlist. Which tests do those universities accept? What scores do they publish? Does the visa route for that country impose its own English requirement, separate from the university's? Only then does it make sense to choose a test and a date.",
      "Booking the wrong test, or sitting it too late, is one of the most common and most avoidable reasons students miss an intake.",
    ],
  },

  whatWeOffer: {
    heading: "What We Help With",
    items: [
      { title: "Test Selection", description: "Which English or entrance test your shortlisted universities and visa route actually accept." },
      { title: "Target Score Mapping", description: "The score each of your programmes publishes, including any per-section minimums." },
      { title: "Timeline Planning", description: "When to sit the test so results arrive before your application and visa deadlines." },
      { title: "Preparation Structure", description: "How to structure your study time around your current commitments." },
      { title: "Retake Planning", description: "What to do if your score falls short of a programme's requirement." },
      { title: "Score Reporting", description: "How to send official results to universities and where they are needed in your application." },
    ],
  },

  howItWorks: {
    heading: "How Test Planning Works",
    steps: [
      { step: 1, title: "Confirm Your Shortlist", description: "We check which tests your target universities and destination accept." },
      { step: 2, title: "Set the Target Score", description: "Including per-section minimums, which catch out more students than the overall score." },
      { step: 3, title: "Choose the Test", description: "Matched to your strengths, timeline, budget and test-centre availability." },
      { step: 4, title: "Plan the Timeline", description: "Working backwards from your application and visa deadlines." },
      { step: 5, title: "Prepare and Sit", description: "Structured preparation, then the test itself." },
      { step: 6, title: "Report Your Scores", description: "Send official results to each university that needs them." },
    ],
  },

  deepDive: {
    heading: "Which Test Should You Take?",
    intro: "The right answer depends on your destination, your universities and your own strengths — not on which test is best known.",
    blocks: [
      {
        num: "01",
        title: "English Language Tests",
        subtitle: "IELTS, TOEFL, PTE and the Duolingo English Test",
        body: "All four assess reading, writing, listening and speaking, but they differ in format, scoring, how quickly results arrive and — crucially — which institutions and visa routes accept them.",
        items: ["IELTS Academic", "TOEFL iBT", "PTE Academic", "Duolingo English Test"],
        note: "Some visa routes require a test from an approved list that is narrower than what the university accepts. Always check both.",
      },
      {
        num: "02",
        title: "Graduate Entrance Tests",
        subtitle: "GRE and GMAT",
        body: "Required by some postgraduate and business programmes, optional at others, and waived entirely by a growing number. Sitting one you don't need costs time and money; skipping one you do need costs you the application.",
        items: ["GRE General Test", "GMAT", "Programme-specific waivers", "Subject tests, where required"],
      },
      {
        num: "03",
        title: "Undergraduate Entrance Tests",
        subtitle: "SAT and ACT",
        body: "Mainly relevant for undergraduate applications to the USA and a handful of other destinations. Many universities have moved to test-optional policies, so check each one rather than assuming.",
        items: ["SAT", "ACT", "Test-optional policies", "Subject requirements"],
      },
      {
        num: "04",
        title: "Per-Section Minimums",
        subtitle: "The requirement students most often miss",
        body: "A university may ask for an overall band of 6.5 but also a minimum of 6.0 in each section. Students who clear the overall score but drop below in one section are frequently rejected — and only discover the rule afterwards.",
        note: "We check per-section minimums for every programme on your shortlist before you book.",
      },
    ],
  },

  comparison: {
    heading: "English Test Comparison",
    intro: "A general orientation only. Formats, fees and acceptance change — confirm current details with the test provider and each university.",
    columns: ["Test", "Typical Use", "What to Check"],
    rows: [
      ["IELTS Academic", "Widely accepted across the UK, Australia, Canada, New Zealand and Europe", "Whether the university needs Academic or the visa route needs a specific IELTS version"],
      ["TOEFL iBT", "Common for the USA and widely accepted elsewhere", "Whether your destination's visa route accepts it"],
      ["PTE Academic", "Accepted by many universities and several visa routes", "Acceptance at your specific universities"],
      ["Duolingo English Test", "Accepted by a growing number of universities", "Acceptance varies a lot — verify per university, and for the visa separately"],
    ],
    note: "Test acceptance is decided by each university and immigration authority, and changes between intakes.",
  },

  whoIsItFor: {
    heading: "Who This Is For",
    points: [
      "Students who don't yet know which test their universities accept",
      "Anyone unsure what score to target",
      "Students who scored below a programme's requirement and are considering a retake",
      "Working professionals fitting preparation around a job",
      "Students applying across several countries with different test requirements",
      "Anyone worried about fitting the test into their application timeline",
    ],
  },

  keyBenefits: {
    heading: "Why It Matters",
    benefits: [
      "You sit a test your universities actually accept",
      "You know your target score, including per-section minimums",
      "Your result arrives before your deadlines, not after",
      "You avoid paying for a test you never needed",
      "You know your options if the first attempt falls short",
      "Your test planning fits your admission and visa timeline",
    ],
  },

  mistakes: {
    heading: "Five Costly Test Mistakes",
    items: [
      { title: "Booking before shortlisting universities", description: "You cannot know which test to take until you know where you are applying." },
      { title: "Ignoring per-section minimums", description: "Clearing the overall band but dropping below in one section still means rejection at many universities." },
      { title: "Sitting the test too late", description: "Results take time to arrive and to reach universities. Work backwards from your deadlines." },
      { title: "Assuming the visa accepts the same test", description: "Some visa routes have their own approved list, narrower than the university's." },
      { title: "Retaking without changing anything", description: "Understand which section pulled the score down before booking again." },
    ],
  },

  whyDD: {
    heading: "Why DreamDestination",
    points: [
      "We start from your university shortlist, not from a generic recommendation",
      "We check per-section minimums for every programme you are applying to",
      "We check the visa route's English requirement separately from the university's",
      "Test planning is built into your overall admission timeline",
      "Honest advice when a test is not required at all",
      "Online guidance from anywhere in India",
    ],
  },

  faqs: [
    { question: "Which English test should I take for studying abroad?", answer: "It depends on which tests your shortlisted universities accept and what your destination's visa route requires. IELTS, TOEFL, PTE and the Duolingo English Test are the common options, but acceptance varies by university and by visa category." },
    { question: "What IELTS score do I need to study abroad?", answer: "There is no universal score. Each university and programme publishes its own requirement, and many also set a minimum for each individual section. Check the requirement for every programme on your shortlist before booking." },
    { question: "Is IELTS or TOEFL better?", answer: "Neither is universally better. What matters is which one your universities and visa route accept, and which format suits your strengths. We check both before recommending one." },
    { question: "Do all universities accept the Duolingo English Test?", answer: "No. Acceptance is growing but still uneven, and a university accepting it does not mean the visa route does. Verify both separately." },
    { question: "Do I need the GRE or GMAT?", answer: "It depends on the programme. Some postgraduate and business programmes require one, some treat it as optional, and many now waive it entirely. Check each programme rather than assuming." },
    { question: "When should I take my English test?", answer: "Early enough that your results reach universities before their application deadlines, with room for a retake if needed. We plan this backwards from your intake." },
    { question: "Can I retake the test if my score is too low?", answer: "Yes, tests can be retaken subject to the provider's rules on timing. It is worth understanding which section pulled your score down before booking again." },
    { question: "Can I study abroad without an English test?", answer: "Sometimes. Some universities waive the requirement based on your medium of instruction or other evidence. Whether the visa route also waives it is a separate question, and often the answer is no." },
    { question: "Do you provide coaching classes?", answer: "We provide test selection, target score and timeline guidance rather than classroom coaching. We can help you understand what level of preparation your target score realistically needs." },
    { question: "How long should I prepare for IELTS?", answer: "It depends on your current level and your target score. What matters more than a fixed number of weeks is being honest about the gap between where you are and where you need to be." },
  ],

  ctaSection: {
    heading: "Not Sure Which Test You Need?",
    description: "Tell us where you are applying and we will tell you which test to take, what score to target and when to sit it.",
  },
};

const TestPreparationsPage = () => <GenericServicePage data={DATA} />;
export default TestPreparationsPage;
