import GenericStudyPage, { type GenericCountryData } from "./GenericStudyPage";

/**
 * Study in Spain.
 *
 * Spain's public universities price per credit rather than per year, which is
 * why the cost section talks about structure instead of quoting a single
 * annual figure that would be wrong for most students. Work rights reflect the
 * post-2022 reform, where the student residence permit itself carries the
 * right to work rather than requiring a separate employer application.
 */
const DATA: GenericCountryData = {
  countryName: "Spain",
  countrySlug: "spain",
  countryFlag: "🇪🇸",

  seo: {
    title: "Study in Spain for Indian Students | Universities & Costs",
    description:
      "Study in Spain for Indian students — public and private universities, English-taught master's, business schools, student visa and NIE/TIE process, costs, scholarships and education loans.",
    canonicalUrl: "https://www.dreamdestinationstudyabroad.com/study-in-spain",
    keywords: [
      "study in spain for indian students", "study in spain", "study in spain from india",
      "spain student visa", "spain student visa for indian students", "spain type d visa",
      "masters in spain for indian students", "mba in spain", "ie business school esade",
      "best universities in spain for indian students", "public universities in spain",
      "cost of studying in spain", "spain tuition fees for indian students",
      "education loan for spain", "scholarships in spain for indian students",
      "spain education consultant", "study abroad consultant for spain",
      "nie tie spain student", "work while studying in spain",
      "post study work visa spain", "job seeker visa spain",
      "english taught courses in spain", "spain intakes for indian students",
      "barcelona madrid universities for indian students", "study in europe from india",
    ],
  },

  hero: {
    badge: "🇪🇸 Updated for 2026 — Affordable EU Degrees & 30-Hour Work Rights",
    description:
      "Spain offers European Union degrees at public-university prices, a growing set of English-taught master's programmes, business schools with genuine international standing, and some of the most generous student work rights in Europe.",
    questions: [
      "How much does a Spanish public university actually charge?",
      "Can I study in English, or do I need Spanish?",
      "What is the difference between public and private here?",
      "How does the Type D visa and NIE/TIE process work?",
      "How many hours can I work while studying?",
      "Can I stay on to look for a job afterwards?",
      "Are Spanish business schools worth the fees?",
    ],
    valueProposition:
      "DreamDestination helps you weigh public against private honestly, checks whether your programme is genuinely taught in English, plans the homologación and visa paperwork in the right order, and supports scholarships, education loans and pre-departure.",
    primaryCta: "Get Free Spain Study Advice",
    secondaryCta: "Talk to a Spain Counsellor",
  },

  atAGlance: {
    title: "Spain at a Glance",
    stats: [
      { label: "Study Levels", value: "Bachelor's, Master's, MBA, PhD" },
      { label: "Language", value: "Spanish; English-taught master's available" },
      { label: "Currency", value: "Euro (€)" },
      { label: "Popular Cities", value: "Madrid, Barcelona, Valencia, Granada" },
      { label: "Student Visa", value: "Type D long-stay student visa" },
      { label: "Work Rights", value: "Up to 30 hrs/week during term" },
    ],
  },

  whyCountry: {
    title: "Why Indian Students Choose Spain",
    subtitle:
      "Spain sits in an unusual spot: EU-level qualifications and living standards, at costs closer to Eastern Europe than to the UK.",
    reasons: [
      {
        title: "Low Public University Fees",
        description:
          "Public universities charge by credit at publicly set rates, which keeps a full bachelor's or master's far below UK, US or Australian tuition.",
        icon: "Wallet",
      },
      {
        title: "Strong Student Work Rights",
        description:
          "Since the 2022 immigration reform the student residence permit itself carries the right to work up to 30 hours a week — no separate employer application required.",
        icon: "Briefcase",
      },
      {
        title: "Globally Ranked Business Schools",
        description:
          "IE, ESADE and IESE consistently appear in international MBA and master's rankings, with large international cohorts.",
        icon: "TrendingUp",
      },
      {
        title: "Growing English-Taught Offer",
        description:
          "English-taught master's programmes have expanded considerably, particularly in business, data, tourism and international relations.",
        icon: "BookOpen",
      },
      {
        title: "EU Degree and Schengen Mobility",
        description:
          "A Bologna-compliant degree recognised across the EU, with Schengen travel while you study.",
        icon: "Globe",
      },
      {
        title: "Living Costs That Work",
        description:
          "Outside Madrid and Barcelona, Spain is one of the more affordable Western European countries to live in as a student.",
        icon: "Heart",
      },
    ],
  },

  whoShouldConsider: {
    heading: "Is Spain the Right Choice for You?",
    intro: "Spain may suit you if you:",
    points: [
      "Want an EU degree without UK, US or Australian tuition",
      "Are targeting a one-year master's in business, data or management",
      "Are willing to learn Spanish — it changes your job prospects entirely",
      "Want substantial legal work rights while studying",
      "Are considering a top-ranked international business school",
      "Prefer a warmer climate and a slower pace than northern Europe",
      "Plan to work in Europe afterwards rather than return immediately",
      "Can handle a paperwork-heavy visa and residency process",
    ],
    disclaimer:
      "Two things to be realistic about. First, English-taught does not mean English-speaking — outside the international business schools, most workplaces run in Spanish, and graduate hiring reflects that. Second, Spain's administrative process is genuinely slow: NIE, TIE and the homologación of Indian qualifications all take time and must be started early.",
    cta: { text: "Check My Spain Eligibility", href: "#lead-form" },
  },

  universities: [
    {
      name: "Universidad Complutense de Madrid",
      location: "Madrid",
      state: "Community of Madrid",
      type: "Public",
      qsRanking: "One of Spain's largest universities",
      popularPrograms: ["Medicine", "Law", "Economics", "Sciences", "Humanities"],
      logo: "https://logo.clearbit.com/ucm.es",
      avgTuition: "Public per-credit rate",
      postStudyWork: true,
    },
    {
      name: "Universitat de Barcelona",
      location: "Barcelona",
      state: "Catalonia",
      type: "Public",
      qsRanking: "Highest-ranked Spanish university",
      popularPrograms: ["Medicine", "Biosciences", "Economics", "Psychology", "Law"],
      logo: "https://logo.clearbit.com/ub.edu",
      avgTuition: "Public per-credit rate",
      postStudyWork: true,
    },
    {
      name: "Universitat Autònoma de Barcelona",
      location: "Barcelona",
      state: "Catalonia",
      type: "Public",
      qsRanking: "Top-tier Spanish university",
      popularPrograms: ["Engineering", "Communication", "Biosciences", "Economics", "Translation"],
      logo: "https://logo.clearbit.com/uab.cat",
      avgTuition: "Public per-credit rate",
      postStudyWork: true,
    },
    {
      name: "Universidad Autónoma de Madrid",
      location: "Madrid",
      state: "Community of Madrid",
      type: "Public",
      qsRanking: "Research-intensive public university",
      popularPrograms: ["Sciences", "Law", "Economics", "Medicine", "Computer Science"],
      logo: "https://logo.clearbit.com/uam.es",
      avgTuition: "Public per-credit rate",
      postStudyWork: true,
    },
    {
      name: "Universitat Politècnica de Catalunya",
      location: "Barcelona",
      state: "Catalonia",
      type: "Public",
      qsRanking: "Leading technical university",
      popularPrograms: ["Engineering", "Architecture", "Computer Science", "Aerospace", "Telecommunications"],
      logo: "https://logo.clearbit.com/upc.edu",
      avgTuition: "Public per-credit rate",
      postStudyWork: true,
    },
    {
      name: "IE University / IE Business School",
      location: "Madrid & Segovia",
      state: "Community of Madrid",
      type: "Private",
      qsRanking: "Globally ranked business school",
      popularPrograms: ["MBA", "Master in Management", "Finance", "Data & Business Analytics", "Law"],
      logo: "https://logo.clearbit.com/ie.edu",
      avgTuition: "Private business school rate",
      postStudyWork: true,
    },
    {
      name: "ESADE Business School",
      location: "Barcelona",
      state: "Catalonia",
      type: "Private",
      qsRanking: "Globally ranked business school",
      popularPrograms: ["MBA", "Master in Management", "Finance", "Marketing", "International Business"],
      logo: "https://logo.clearbit.com/esade.edu",
      avgTuition: "Private business school rate",
      postStudyWork: true,
    },
    {
      name: "IESE Business School",
      location: "Barcelona & Madrid",
      state: "Catalonia",
      type: "Private",
      qsRanking: "Top global MBA programme",
      popularPrograms: ["MBA", "Executive MBA", "Global Executive MBA", "Management", "Finance"],
      logo: "https://logo.clearbit.com/iese.edu",
      avgTuition: "Private business school rate",
      postStudyWork: true,
    },
  ],

  popularCourses: [
    {
      category: "Business & Management",
      icon: "TrendingUp",
      courses: ["MBA", "Master in Management", "Finance", "Business Analytics", "Marketing", "International Business"],
    },
    {
      category: "Engineering & Technology",
      icon: "Cog",
      courses: ["Civil Engineering", "Aerospace Engineering", "Renewable Energy", "Telecommunications", "Industrial Engineering", "Architecture"],
    },
    {
      category: "Computing & Data",
      icon: "Monitor",
      courses: ["Computer Science", "Data Science", "Artificial Intelligence", "Cybersecurity", "Software Engineering"],
    },
    {
      category: "Sciences, Tourism & Humanities",
      icon: "BookOpen",
      courses: ["Biotechnology", "Environmental Science", "Tourism & Hospitality Management", "International Relations", "Spanish & Translation", "Psychology"],
    },
  ],

  masters: {
    heading: "Master's in Spain for Indian Students",
    description:
      "The master's is where Spain makes most sense for Indian students: typically one year, widely available in English, and at a public university considerably cheaper than an equivalent programme elsewhere in Western Europe.",
    considerations: [
      "Whether it is an official (oficial) master's or a university-specific título propio — this affects PhD progression and recognition",
      "Whether the programme is genuinely delivered in English throughout",
      "Public per-credit fee versus a private school's flat fee",
      "Whether the master's carries an internship (prácticas) component",
      "Regional fee differences — Catalonia and Madrid price differently",
      "Homologación requirements for your Indian degree",
      "Spanish language support offered alongside the course",
      "Career services and their record with non-EU graduates",
    ],
    popularSpecialisations: [
      "Master in Management",
      "MSc Business Analytics",
      "MSc Finance",
      "MSc Data Science",
      "MSc Renewable Energy",
      "MSc International Business",
      "MSc Tourism & Hospitality Management",
      "MSc Computer Engineering",
    ],
    note:
      "The distinction between an official master's and a título propio matters and is easy to miss. Official master's degrees are state-recognised and allow progression to a PhD; a título propio is awarded by the university itself. Ask which one you are being offered before you accept.",
    cta: { text: "Find My Spanish Master's", href: "#lead-form" },
  },

  mba: {
    heading: "MBA in Spain for Indian Students",
    areas: [
      "General Management",
      "Finance",
      "Entrepreneurship & Innovation",
      "Marketing & Digital Business",
      "International Business",
      "Technology Management",
      "Sustainability",
    ],
    checkBefore: [
      "AACSB, EQUIS and AMBA accreditation — the leading Spanish schools hold all three",
      "Work experience expected, typically three to five years",
      "GMAT or GRE requirement and the school's average score",
      "Class profile: how international is the cohort really",
      "Employment report — specifically outcomes for non-EU students",
      "Total cost against realistic post-MBA salary in Europe",
      "Whether Spanish is needed for the internship or placement",
      "Post-study work permission and how alumni have used it",
    ],
  },

  intakes: [
    {
      season: "September / October",
      status: "Main Intake",
      description: "The principal intake for essentially every programme and the one to plan around.",
      timeline: "Begin 9–12 months ahead; visa appointments are the bottleneck",
    },
    {
      season: "January / February",
      status: "Secondary Intake",
      description: "Available for some master's programmes and at the private business schools.",
      timeline: "Begin 6–9 months ahead",
    },
  ],

  timeline: [
    {
      phase: "10–12 Months Before",
      title: "Shortlist and Start the Paperwork",
      details:
        "Compare public and private options, check whether the programme is official or título propio, and begin apostille and homologación of your Indian qualifications — this is the slowest step.",
    },
    {
      phase: "7–9 Months Before",
      title: "Apply and Secure Funding",
      details:
        "Submit applications with transcripts, statement and references; apply for scholarships; start the education loan conversation.",
    },
    {
      phase: "4–6 Months Before",
      title: "Offer, Fees and Visa Documents",
      details:
        "Accept the offer, pay the reservation fee, arrange health insurance, obtain the criminal record certificate and medical certificate, and book the consulate appointment early.",
    },
    {
      phase: "1–3 Months Before",
      title: "Visa, Then Arrival Paperwork",
      details:
        "Collect the Type D visa, fly out, and apply for your TIE residence card within 30 days of arriving. Register with the local padrón and set up a Spanish bank account.",
    },
  ],

  costOfStudy: {
    title: "Cost of Studying in Spain",
    intro:
      "Spain prices public university study per credit, at rates set regionally rather than by the university — so the cost depends on your programme's credit load and the region, not on a single advertised annual fee.",
    breakdown: [
      { level: "Public Bachelor's", cost: "Per-credit public rate", note: "Typically 240 credits over four years" },
      { level: "Public Official Master's", cost: "Per-credit public rate, higher than bachelor's", note: "Usually 60–120 credits over one to two years" },
      { level: "Private Universities", cost: "Flat annual fee, substantially higher", note: "Smaller classes, more English-taught options" },
      { level: "Top Business Schools", cost: "The highest tier by a wide margin", note: "IE, ESADE, IESE — priced like international MBAs" },
    ],
    budgetItems: [
      "Tuition, calculated on your actual credit load",
      "Application and enrolment fees",
      "Private health insurance — required for the visa",
      "Accommodation: shared flat, residencia or homestay",
      "Deposit and agency fee for a rental",
      "Food and daily living",
      "Transport pass",
      "Visa fee, apostille and homologación charges",
      "TIE card fee and photographs",
      "Flights",
    ],
    disclaimer:
      "Non-EU students sometimes pay a higher per-credit rate than EU students at public universities, and rates differ by autonomous region. Ask the university for the exact non-EU rate for your specific programme in writing, and confirm how many credits you will actually take each year.",
  },

  costOfLiving: {
    title: "Cost of Living in Spain",
    intro: "Madrid and Barcelona are the expensive outliers. Spain's other university cities are markedly cheaper and often more pleasant to study in.",
    cities: [
      { name: "Barcelona", costLevel: "Highest", note: "Rent is the dominant cost; strong international community" },
      { name: "Madrid", costLevel: "High", note: "Capital; the widest range of universities and internships" },
      { name: "Valencia", costLevel: "Moderate", note: "Coastal, popular with students, notably better value" },
      { name: "Seville", costLevel: "Moderate", note: "Andalusian capital, lower rents" },
      { name: "Granada", costLevel: "Low", note: "Classic student city, among the cheapest options" },
      { name: "Salamanca", costLevel: "Low", note: "Historic university town, very affordable" },
    ],
  },

  scholarships: {
    title: "Scholarships in Spain for Indian Students",
    intro:
      "Spain's funding landscape is less centralised than Germany's or France's. Most awards come from individual universities, regional governments or the business schools themselves.",
    categories: [
      {
        title: "Government and Regional",
        items: [
          "Spanish government and MAEC-AECID scholarships for selected programmes",
          "Regional (autonomous community) scholarships and fee reductions",
          "Erasmus+ funding where the programme is part of a joint European degree",
          "Bilateral cultural exchange scholarships",
          "Research grants at doctoral level",
        ],
      },
      {
        title: "University and Business School Awards",
        items: [
          "Merit scholarships at public universities",
          "Substantial partial scholarships at IE, ESADE and IESE",
          "Diversity and country-specific awards for Indian applicants",
          "Early-application fee reductions",
          "Assistantships and tutoring roles at postgraduate level",
        ],
      },
    ],
    disclaimer:
      "Business school scholarships are usually awarded on a rolling basis, so applying early materially improves your odds. Government scholarship rounds have their own deadlines, months ahead of admission. Apply to several — a partial award at a private school can still leave a large gap.",
  },

  educationLoan: {
    title: "Education Loan for Studying in Spain",
    intro:
      "The amount you need varies enormously between a public university master's and an MBA at a top business school — which is exactly why the loan should be sized against the specific programme, not the destination. We are not a lender and take no commission from any of them: the amount, the rate, the collateral requirement and the approval are all the lender's decision. We help you size the real funding gap, compare routes against your profile, and time the sanction letter to your visa appointment.",
    maxAmount: "From modest for public study to substantial for business schools",
    interestRate: "Varies by lender and security offered",
    unsecuredMax: "Collateral-free options available; top business schools often qualify for higher limits",
    services: [
      "Sizing the loan against the real per-credit fee, not a headline figure",
      "Comparing secured and collateral-free routes",
      "Guidance for business school applicants, where lenders assess differently",
      "Co-applicant income and documentation support",
      "Sanction letter timed for the visa's proof-of-funds requirement",
      "Disbursement aligned with reservation and enrolment deadlines",
    ],
    highlights: [
      "Public university study needs modest borrowing",
      "Business school loans often qualify for higher collateral-free limits",
      "Interest deduction available under Section 80E",
      "30-hour work rights help with living costs",
      "Moratorium through the course plus the grace period",
    ],
    unsecuredLoan: {
      question: "Can I get a collateral-free loan for Spain?",
      answer:
        "Often, yes. For public universities the amounts are modest enough that approval is usually straightforward. For the top business schools, several lenders have specific policies that allow higher collateral-free limits because of the programmes' employment outcomes — it is worth asking about these by name.",
    },
    rejectedLoan: {
      question: "What if a lender declines?",
      answer:
        "Find out the specific reason before reapplying. It is usually co-applicant income, existing obligations or documentation rather than Spain itself. A different lender, a stronger co-applicant or partial collateral often changes the answer. Leave time, because the Type D visa requires proof of funds.",
    },
    phoneNumber: "+91 92118 18710",
  },

  admissionRequirements: {
    intro: "What Spanish universities typically ask Indian applicants for:",
    requirements: [
      "Class 10 and 12 marksheets and certificates",
      "Bachelor's transcripts and degree certificate for master's entry",
      "Apostilled and, where required, officially translated academic documents",
      "Homologación or equivalence recognition of the Indian qualification",
      "IELTS or TOEFL for English-taught programmes",
      "DELE or SIELE for Spanish-taught programmes",
      "Statement of purpose or motivation letter",
      "Two academic or professional references",
      "CV, and work experience evidence for MBA applications",
      "GMAT or GRE for most MBA programmes",
      "Valid passport",
    ],
    importantNote:
      "Homologación — the official recognition of a foreign qualification — is the step that most often delays a Spanish application. It is separate from the university's own admission decision, takes months, and must be started as soon as you decide on Spain rather than after you receive an offer.",
    aeoAnswer:
      "Indian students need Class 12 for undergraduate entry or a bachelor's degree for master's entry, apostilled and translated documents, recognition of the Indian qualification, and either IELTS/TOEFL for English-taught programmes or DELE/SIELE for Spanish-taught ones. MBA programmes additionally expect work experience and usually GMAT or GRE.",
  },

  applicationProcess: [
    { step: 1, title: "Profile and Route Decision", description: "Public university, private university or business school — they suit different goals and budgets." },
    { step: 2, title: "Programme Verification", description: "Confirm the language of delivery and whether the master's is official or título propio." },
    { step: 3, title: "Start Document Recognition", description: "Apostille and begin homologación early — it is the long pole." },
    { step: 4, title: "Applications and Scholarships", description: "Submit to a shortlist, and apply for scholarships on their separate deadlines." },
    { step: 5, title: "Offer and Reservation", description: "Accept and pay the reservation fee to secure the place." },
    { step: 6, title: "Finance Arranged", description: "Loan sanctioned against the actual programme cost." },
    { step: 7, title: "Type D Visa", description: "Health insurance, criminal record certificate, medical certificate and proof of funds; book the appointment early." },
    { step: 8, title: "Arrival and TIE", description: "Apply for the TIE residence card within 30 days, register on the padrón and open a bank account." },
  ],

  studentVisa: {
    heading: "Spain Student Visa (Type D) for Indian Students",
    intro:
      "Courses longer than 90 days require a Type D long-stay student visa, applied for at the Spanish consulate covering your place of residence. The paperwork is extensive but predictable.",
    journey: "University Admission → Health Insurance & Financial Proof → Criminal Record + Medical Certificates → Type D Visa → Entry → TIE Card Within 30 Days",
    requirements: [
      "Valid passport with adequate remaining validity",
      "University admission letter for a full-time programme",
      "Private health insurance valid in Spain with no co-payments",
      "Proof of sufficient financial means, benchmarked to Spain's IPREM",
      "Criminal record certificate (for stays over 180 days), apostilled",
      "Medical certificate confirming fitness to travel",
      "Proof of accommodation",
      "Completed national visa application form and photographs",
      "Visa fee payment",
    ],
    financialNote:
      "Financial capacity is assessed against Spain's IPREM index, which is revised periodically — so check the current figure for your visa category rather than relying on last year's number. An education loan sanction letter alongside bank statements is normally accepted.",
    processingNote:
      "Allow four to eight weeks at the consulate, and book the appointment as early as possible — appointment availability, not processing, is usually what delays students. After arriving you must apply for the TIE foreigner identity card within 30 days.",
  },

  workWhileStudying: {
    heading: "Working While Studying in Spain",
    intro: "Spain's student work rights are among the more generous in Europe, and the 2022 reform simplified them considerably.",
    details:
      "Student residence cards issued after the 2022 reform carry the right to work up to 30 hours per week during term, and full-time during official academic breaks, without the employer needing to apply for a separate work authorisation. Your employer simply registers the contract and your Social Security enrolment. Study must remain your main activity. Spanish ability largely determines what work is available outside tourism and international companies.",
    disclaimer:
      "You will need a NIE number and Social Security registration before you can be employed legally. Confirm the current rules with your university's international office, since immigration regulations here have changed recently and may change again.",
  },

  postStudyWork: {
    heading: "Post-Study Work in Spain",
    intro: "Spain allows graduates to stay on and look for work, and to convert to a work or entrepreneur permit from within the country.",
    pathway: "Graduate → Job-search / post-study residence permission → Employment or self-employment permit → Longer-term residence",
    disclaimer:
      "A post-study job-search permission of up to twelve months is available to graduates of Spanish institutions, with conversion to a work permit once you have an offer. Whether you find that offer depends heavily on your Spanish: outside the international business schools and the tech sector, most graduate hiring in Spain happens in Spanish. Treat language study as part of your employability plan, not an optional extra.",
  },

  cities: [
    { name: "Madrid", description: "The capital, with the largest concentration of universities, business schools and internships.", universities: "Complutense, Autónoma de Madrid, IE University", state: "Community of Madrid" },
    { name: "Barcelona", description: "Spain's most international city and a magnet for students and startups alike.", universities: "Universitat de Barcelona, UAB, UPC, ESADE, IESE", state: "Catalonia" },
    { name: "Valencia", description: "Coastal city with strong universities and markedly better value than Madrid or Barcelona.", universities: "Universitat de València, UPV", state: "Valencian Community" },
    { name: "Seville", description: "Andalusian capital with a large student population and low living costs.", universities: "Universidad de Sevilla", state: "Andalusia" },
    { name: "Granada", description: "One of Europe's classic student cities, and among the most affordable.", universities: "Universidad de Granada", state: "Andalusia" },
  ],

  documents: {
    intro: "Documents to prepare for a Spanish application and visa:",
    list: [
      "Passport",
      "Class 10 and 12 marksheets and certificates",
      "Bachelor's transcripts and degree certificate",
      "Apostilled and officially translated academic documents",
      "Homologación or equivalence application",
      "IELTS / TOEFL or DELE / SIELE certificate",
      "Motivation letter and CV",
      "Academic or professional references",
      "GMAT / GRE score (MBA)",
      "University admission letter",
      "Private health insurance policy",
      "Criminal record certificate, apostilled",
      "Medical certificate",
      "Bank statements and education loan sanction letter",
    ],
    disclaimer:
      "Spain requires apostille and sworn translation for most Indian documents, and the criminal record certificate has a validity window. Sequence these carefully: obtained too early they expire, obtained too late they delay the visa.",
  },

  whyDD: [
    { title: "Public vs Private, Honestly", description: "We explain what a business school fee actually buys and when a public university is the better decision.", icon: "UserCheck" },
    { title: "Official vs Título Propio", description: "We check which type of master's you are being offered before you accept it.", icon: "BadgeCheck" },
    { title: "Homologación Planning", description: "The slowest step in a Spanish application, started at the right time rather than the last minute.", icon: "FileText" },
    { title: "Scholarship Strategy", description: "Rolling business school awards and fixed government rounds handled as separate tracks.", icon: "Award" },
    { title: "Loan Guidance", description: "Borrowing sized to the actual programme, from modest public fees to business school tuition.", icon: "Wallet" },
    { title: "Type D Visa Support", description: "Insurance, certificates and IPREM-based proof of funds sequenced so nothing expires.", icon: "Globe" },
    { title: "Language Planning", description: "We are straight about how much Spanish you need for work, not just for the degree.", icon: "BookOpen" },
    { title: "Support From Anywhere in India", description: "Online counselling wherever you are.", icon: "Monitor" },
  ],

  faqs: [
    {
      question: "Can I study in Spain in English?",
      answer:
        "Yes — English-taught master's programmes have expanded substantially, particularly in business, data, engineering and international relations, and the leading business schools teach almost entirely in English. Undergraduate degrees are far more often in Spanish. Bear in mind that studying in English and living or working in Spanish are different things: outside international companies, most graduate hiring runs in Spanish.",
    },
    {
      question: "How much does it cost to study in Spain?",
      answer:
        "Public universities charge per credit at publicly set regional rates, so the cost depends on your credit load and region rather than a single advertised fee — and it stays well below UK, US or Australian tuition. Private universities charge a flat annual fee that is considerably higher, and the top business schools are in a different bracket again. Non-EU students sometimes pay a higher per-credit rate, so ask for your exact rate in writing.",
    },
    {
      question: "How many hours can I work as a student in Spain?",
      answer:
        "Up to 30 hours per week during term and full-time during official academic breaks. Since the 2022 immigration reform, the student residence permit carries this right automatically — your employer no longer has to apply for a separate work authorisation, they simply register the contract and your Social Security enrolment. Study must remain your main activity, and you will need an NIE number first.",
    },
    {
      question: "What is homologación and do I need it?",
      answer:
        "It is the official recognition of a foreign qualification in Spain, and it is separate from the university's admission decision. Whether you need full homologación or a simpler equivalence depends on your programme and your plans. It takes months, so start it as soon as you decide on Spain — it is the single most common cause of delayed Spanish applications.",
    },
    {
      question: "What is the difference between an official master's and a título propio?",
      answer:
        "An official (oficial) master's is state-recognised, follows the Bologna framework and allows progression to a PhD. A título propio is a qualification awarded by the university itself — it can be excellent and industry-focused, but it does not carry the same state recognition. Ask which one you are being offered before accepting, particularly if you may want to do a doctorate later.",
    },
    {
      question: "How does the Spain student visa work?",
      answer:
        "Courses over 90 days need a Type D long-stay student visa from the Spanish consulate for your region. You will need the admission letter, private health insurance with no co-payments, proof of funds benchmarked to Spain's IPREM index, an apostilled criminal record certificate for stays over 180 days, and a medical certificate. After arriving you apply for the TIE residence card within 30 days. Book the consulate appointment as early as you can — availability is usually the bottleneck.",
    },
    {
      question: "Can I stay in Spain after I graduate?",
      answer:
        "Yes. Graduates of Spanish institutions can apply for a post-study job-search permission of up to twelve months and convert to a work or self-employment permit once they have an offer. Whether you get that offer depends substantially on your Spanish — plan language study alongside your degree if you intend to stay.",
    },
    {
      question: "Are Spanish business schools worth the fees?",
      answer:
        "IE, ESADE and IESE hold triple accreditation and appear consistently in international rankings, with genuinely international cohorts and strong European recruiting. They are expensive, so the question is whether the employment report supports the fee for someone in your position — ask specifically about outcomes for non-EU students, not the class average. Several Indian lenders have dedicated policies for these schools, which is worth knowing before you assume the loan is out of reach.",
    },
    {
      question: "Do I need to know Spanish before I arrive?",
      answer:
        "Not to begin an English-taught programme, but you will want it quickly. Daily administration, part-time work and graduate recruitment all run in Spanish. Students who reach a working level have a visibly different experience — and a visibly different set of job options — from those who do not.",
    },
    {
      question: "When should I start my Spain application?",
      answer:
        "Nine to twelve months before a September or October start. Homologación, apostille, sworn translation and consulate appointment availability all take longer than students expect, and business school scholarships are awarded on a rolling basis — applying early genuinely improves both your admission and your funding odds.",
    },
  ],
};

const StudyInSpainPage = () => <GenericStudyPage data={DATA} />;
export default StudyInSpainPage;
