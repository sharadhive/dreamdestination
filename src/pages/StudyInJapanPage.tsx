import GenericStudyPage, { type GenericCountryData } from "./GenericStudyPage";

/**
 * Study in Japan.
 *
 * Japan's route is structurally different from most destinations and the page
 * is built around that difference rather than hiding it: the Certificate of
 * Eligibility comes before the visa, EJU and JLPT sit outside the usual
 * IELTS-shaped world, and language ability — not grades — is what decides
 * employment outcomes. Stipend and salary figures are deliberately described
 * in structural terms rather than exact rupee amounts, because those move.
 */
const DATA: GenericCountryData = {
  countryName: "Japan",
  countrySlug: "japan",
  countryFlag: "🇯🇵",

  seo: {
    title: "Study in Japan for Indian Students | MEXT Scholarship & Visa",
    description:
      "Study in Japan for Indian students — national and private universities, MEXT and JASSO scholarships, Certificate of Eligibility and student visa process, costs, part-time work rules and post-study careers.",
    canonicalUrl: "https://www.dreamdestinationstudyabroad.com/study-in-japan",
    keywords: [
      "study in japan for indian students", "study in japan", "study in japan from india",
      "mext scholarship", "mext scholarship for indian students", "jasso scholarship",
      "japan student visa", "certificate of eligibility japan", "coe japan student",
      "best universities in japan for indian students", "university of tokyo admission",
      "engineering in japan for indian students", "ms in japan", "phd in japan",
      "cost of studying in japan", "japan tuition fees for indian students",
      "education loan for japan", "japan education consultant",
      "jlpt for indian students", "eju exam japan", "japanese language school",
      "work in japan after study", "part time work rules japan students",
      "study abroad consultant for japan", "japan scholarship for indian students",
    ],
  },

  hero: {
    badge: "🇯🇵 Updated for 2026 — Low National Tuition & Strong Graduate Employment",
    description:
      "Japan pairs national university tuition that is remarkably low for a developed economy with an ageing workforce that actively wants skilled international graduates. The trade is language: Japan rewards students who take Japanese seriously more than almost any other destination.",
    questions: [
      "How much does a national university actually cost?",
      "What is a Certificate of Eligibility and why does it come first?",
      "Do I need JLPT, EJU, or neither?",
      "How competitive is the MEXT scholarship really?",
      "Can I study entirely in English?",
      "How many hours can I work while studying?",
      "What are the odds of staying on to work?",
    ],
    valueProposition:
      "DreamDestination helps you choose between the English-track and Japanese-track routes honestly, plan for EJU or JLPT where it is required, apply for MEXT and JASSO funding on their real timelines, and work through the Certificate of Eligibility and visa sequence in the right order.",
    primaryCta: "Get Free Japan Study Advice",
    secondaryCta: "Talk to a Japan Counsellor",
  },

  atAGlance: {
    title: "Japan at a Glance",
    stats: [
      { label: "Study Levels", value: "Bachelor's, Master's, PhD, Language School" },
      { label: "Language", value: "Japanese; growing English-taught tracks" },
      { label: "Currency", value: "Japanese Yen (¥)" },
      { label: "Popular Cities", value: "Tokyo, Osaka, Kyoto, Fukuoka, Sendai" },
      { label: "Student Visa", value: "Student visa issued on a Certificate of Eligibility" },
      { label: "Work Rights", value: "Up to 28 hrs/week with permission" },
    ],
  },

  whyCountry: {
    title: "Why Indian Students Choose Japan",
    subtitle:
      "Japan is one of the few high-income destinations where a strong public university does not require a large loan.",
    reasons: [
      {
        title: "Low National University Tuition",
        description:
          "National university tuition is set at a standard national rate and is a fraction of what an equivalent institution costs in the UK, US or Australia — and it applies to international students too.",
        icon: "Wallet",
      },
      {
        title: "Widespread Tuition Reductions",
        description:
          "A substantial share of international students receive a 50% or full tuition reduction on need and merit grounds, on top of already low fees.",
        icon: "Award",
      },
      {
        title: "Research and Engineering Depth",
        description:
          "Robotics, materials science, automotive engineering, electronics and applied physics are world-leading, with strong industry-university links.",
        icon: "Cog",
      },
      {
        title: "A Labour Market That Wants Graduates",
        description:
          "Japan's demographics mean employers actively recruit international graduates, and the government has widened post-study work routes rather than narrowing them.",
        icon: "Briefcase",
      },
      {
        title: "MEXT and JASSO Funding",
        description:
          "The MEXT scholarship covers tuition, travel and a monthly stipend; JASSO provides a monthly grant after enrolment. Both are real, competitive routes.",
        icon: "GraduationCap",
      },
      {
        title: "Safety and Infrastructure",
        description:
          "Consistently among the safest countries for students, with public transport and campus facilities that simply work.",
        icon: "Shield",
      },
    ],
  },

  whoShouldConsider: {
    heading: "Is Japan the Right Choice for You?",
    intro: "Japan may suit you if you:",
    points: [
      "Want a developed-economy degree without a large education loan",
      "Are genuinely willing to learn Japanese, not just tolerate it",
      "Are targeting engineering, robotics, materials, IT or automotive fields",
      "Want a realistic chance at a fully funded scholarship",
      "Intend to work in Japan after graduating, not just study there",
      "Prefer a structured, rule-following environment",
      "Can plan 10–14 months ahead, because the CoE step is slow",
      "Are considering a research master's or PhD with a named supervisor",
    ],
    disclaimer:
      "Be honest with yourself about the language. English-taught degree programmes exist and are growing, but daily life, part-time work and — above all — graduate recruitment still run in Japanese. Students who arrive expecting to manage on English alone tend to find the degree fine and everything around it hard.",
    cta: { text: "Check My Japan Eligibility", href: "#lead-form" },
  },

  universities: [
    {
      name: "The University of Tokyo",
      location: "Tokyo",
      state: "Tokyo",
      type: "National",
      qsRanking: "Japan's highest-ranked university",
      popularPrograms: ["Engineering", "Sciences", "Economics", "Medicine", "Information Science"],
      logo: "https://logo.clearbit.com/u-tokyo.ac.jp",
      avgTuition: "Standard national rate",
      postStudyWork: true,
    },
    {
      name: "Kyoto University",
      location: "Kyoto",
      state: "Kyoto",
      type: "National",
      qsRanking: "Global top tier",
      popularPrograms: ["Sciences", "Engineering", "Medicine", "Agriculture", "Economics"],
      logo: "https://logo.clearbit.com/kyoto-u.ac.jp",
      avgTuition: "Standard national rate",
      postStudyWork: true,
    },
    {
      name: "Tokyo Institute of Science (Institute of Science Tokyo)",
      location: "Tokyo",
      state: "Tokyo",
      type: "National",
      qsRanking: "Leading technical institution",
      popularPrograms: ["Engineering", "Computing", "Materials Science", "Robotics", "Life Science"],
      logo: "https://logo.clearbit.com/isct.ac.jp",
      avgTuition: "Standard national rate",
      postStudyWork: true,
    },
    {
      name: "Osaka University",
      location: "Osaka",
      state: "Osaka",
      type: "National",
      qsRanking: "Top-tier national university",
      popularPrograms: ["Engineering", "Medicine", "Sciences", "Economics", "Information Science"],
      logo: "https://logo.clearbit.com/osaka-u.ac.jp",
      avgTuition: "Standard national rate",
      postStudyWork: true,
    },
    {
      name: "Tohoku University",
      location: "Sendai",
      state: "Miyagi",
      type: "National",
      qsRanking: "Research-intensive national university",
      popularPrograms: ["Materials Science", "Engineering", "Medicine", "Sciences", "Agriculture"],
      logo: "https://logo.clearbit.com/tohoku.ac.jp",
      avgTuition: "Standard national rate",
      postStudyWork: true,
    },
    {
      name: "Kyushu University",
      location: "Fukuoka",
      state: "Fukuoka",
      type: "National",
      qsRanking: "Major national university",
      popularPrograms: ["Engineering", "Design", "Medicine", "Agriculture", "Economics"],
      logo: "https://logo.clearbit.com/kyushu-u.ac.jp",
      avgTuition: "Standard national rate",
      postStudyWork: true,
    },
    {
      name: "Waseda University",
      location: "Tokyo",
      state: "Tokyo",
      type: "Private",
      qsRanking: "Leading private university",
      popularPrograms: ["International Liberal Studies", "Political Science", "Business", "Engineering", "Social Sciences"],
      logo: "https://logo.clearbit.com/waseda.jp",
      avgTuition: "Private rate, higher than national",
      postStudyWork: true,
    },
    {
      name: "Keio University",
      location: "Tokyo",
      state: "Tokyo",
      type: "Private",
      qsRanking: "Leading private university",
      popularPrograms: ["Economics", "Business", "Media & Governance", "Engineering", "Law"],
      logo: "https://logo.clearbit.com/keio.ac.jp",
      avgTuition: "Private rate, higher than national",
      postStudyWork: true,
    },
  ],

  popularCourses: [
    {
      category: "Engineering & Robotics",
      icon: "Cog",
      courses: ["Mechanical Engineering", "Robotics & Mechatronics", "Automotive Engineering", "Electrical Engineering", "Materials Science", "Precision Engineering"],
    },
    {
      category: "Computing & Information Science",
      icon: "Monitor",
      courses: ["Computer Science", "Information Science", "Artificial Intelligence", "Data Science", "Game & Media Technology", "Electronics"],
    },
    {
      category: "Business & Social Sciences",
      icon: "TrendingUp",
      courses: ["International Business", "Economics", "Management", "Political Science", "International Relations", "Liberal Studies"],
    },
    {
      category: "Sciences, Design & Humanities",
      icon: "BookOpen",
      courses: ["Physics", "Chemistry", "Life Sciences", "Architecture", "Industrial Design", "Japanese Studies", "Animation & Media Arts"],
    },
  ],

  masters: {
    heading: "Master's and PhD in Japan for Indian Students",
    description:
      "Postgraduate study is where Japan is strongest for Indian students: English-taught graduate programmes are far more common than at undergraduate level, funding is easier to find, and research groups are well resourced.",
    considerations: [
      "Whether the programme is a taught master's or a research master's — Japan leans research",
      "Finding and contacting a prospective supervisor before applying",
      "Whether the entrance examination is held in Japan or can be taken remotely",
      "MEXT university-recommendation route versus the embassy-recommendation route",
      "Research student (kenkyusei) entry as a stepping stone to the degree",
      "Laboratory culture and expected hours — this varies enormously",
      "Japanese language requirement for graduation and for job hunting",
      "Whether the department's industry links match your career plan",
    ],
    popularSpecialisations: [
      "MSc Robotics & Mechatronics",
      "MSc Materials Science",
      "MSc Computer Science",
      "MSc Artificial Intelligence",
      "MSc Mechanical / Automotive Engineering",
      "MSc Electrical & Electronic Engineering",
      "MSc Environmental Engineering",
      "MA International Relations",
    ],
    note:
      "Approaching a supervisor early is the single highest-leverage thing you can do for a Japanese graduate application. A professor who has agreed to take you changes both your admission odds and your MEXT university-recommendation chances.",
    cta: { text: "Find My Japan Programme", href: "#lead-form" },
  },

  intakes: [
    {
      season: "April",
      status: "Main Intake",
      description: "The traditional start of the Japanese academic year and the largest intake at every level.",
      timeline: "Begin 12–14 months ahead; the CoE process alone takes 2–3 months",
    },
    {
      season: "September / October",
      status: "Growing Intake",
      description: "Used by most English-taught degree programmes and many graduate schools.",
      timeline: "Begin 10–12 months ahead",
    },
  ],

  timeline: [
    {
      phase: "12–14 Months Before",
      title: "Choose Your Route",
      details:
        "Decide between an English-taught programme, a Japanese-taught programme via EJU, or a language school followed by degree entry. Begin Japanese study now either way, and start contacting supervisors for research degrees.",
    },
    {
      phase: "8–11 Months Before",
      title: "Examinations and Scholarship Applications",
      details:
        "Sit EJU or JLPT where required, and submit MEXT applications — the embassy-recommendation round opens well ahead of admission deadlines.",
    },
    {
      phase: "5–7 Months Before",
      title: "Apply and Receive the Offer",
      details:
        "Submit university applications with transcripts, statement and referee letters; sit any entrance examination; accept the offer.",
    },
    {
      phase: "2–4 Months Before",
      title: "Certificate of Eligibility, Then Visa",
      details:
        "The university applies to immigration for your Certificate of Eligibility. Only once it is issued do you apply for the visa at the Japanese embassy. Budget 2–3 months for this sequence.",
    },
  ],

  costOfStudy: {
    title: "Cost of Studying in Japan",
    intro:
      "Japan's fee structure is unusual: national universities charge a standard national rate that applies to domestic and international students alike, so the sticker price is low and predictable.",
    breakdown: [
      { level: "National Universities", cost: "Standard national rate", note: "Same for international students; plus a one-off admission fee" },
      { level: "Public (Prefectural) Universities", cost: "Similar to national", note: "Admission fee may vary by residency" },
      { level: "Private Universities — Humanities & Business", cost: "Roughly 1.5–2× the national rate", note: "Waseda, Keio and similar" },
      { level: "Private Universities — Medicine & Specialist Engineering", cost: "Substantially higher", note: "The one genuinely expensive category" },
      { level: "Japanese Language School", cost: "Moderate", note: "One to two years before degree entry" },
    ],
    budgetItems: [
      "Tuition for each year",
      "One-off admission (entrance) fee",
      "Application and examination fees",
      "Accommodation — dormitory or private apartment",
      "Key money and deposit for private rentals",
      "National Health Insurance contribution",
      "Food and daily living",
      "Commuter pass",
      "Japanese language study",
      "Flights and initial setup",
    ],
    disclaimer:
      "The admission fee is a separate one-off charge on top of tuition and catches students out. Ask every university for tuition, admission fee and any facility charge as three separate numbers, and ask what proportion of international students receive a tuition reduction.",
  },

  costOfLiving: {
    title: "Cost of Living in Japan",
    intro: "Tokyo is the outlier. Almost everywhere else is markedly cheaper, and university dormitories cut the cost sharply wherever you are.",
    cities: [
      { name: "Tokyo", costLevel: "Highest", note: "Capital; rent is the dominant cost" },
      { name: "Osaka", costLevel: "High", note: "Second city, noticeably below Tokyo" },
      { name: "Kyoto", costLevel: "Moderate-High", note: "Large student population, moderate rents" },
      { name: "Nagoya", costLevel: "Moderate", note: "Automotive and manufacturing hub" },
      { name: "Sendai", costLevel: "Moderate", note: "Major university city in the north" },
      { name: "Fukuoka", costLevel: "Moderate-Low", note: "Among the best value of the large cities" },
    ],
  },

  scholarships: {
    title: "Scholarships in Japan for Indian Students",
    intro:
      "Japan funds international students through three distinct layers, and they have different application routes and timings.",
    categories: [
      {
        title: "Government and National Schemes",
        items: [
          "MEXT Scholarship — embassy-recommendation route, applied for in India",
          "MEXT Scholarship — university-recommendation route, applied for via the university",
          "MEXT covers tuition, a monthly stipend and return airfare where awarded",
          "JASSO Honors Scholarship — a monthly grant awarded after enrolment",
          "JICA and bilateral programme scholarships for specific fields",
        ],
      },
      {
        title: "University and Private Awards",
        items: [
          "Tuition reductions of 50% or 100% on need and merit grounds",
          "Admission fee waivers",
          "University entrance scholarships for strong applicants",
          "Research assistantships and teaching assistantships at graduate level",
          "Private foundation scholarships (Rotary, corporate foundations and others)",
        ],
      },
    ],
    disclaimer:
      "MEXT is competitive and its embassy round opens far earlier than university admission. JASSO is awarded after you arrive, so it cannot be counted on when you are proving funds for the visa. Tuition reductions are common but are not guaranteed — build your budget as if you will pay full tuition, and treat a reduction as relief rather than a plan.",
  },

  educationLoan: {
    title: "Education Loan for Studying in Japan",
    intro:
      "Because national university tuition is low, families financing a Japanese degree usually borrow far less than for the UK, US or Australia. Most of the loan goes on living costs in the first year rather than fees. We are not a lender and take no commission from any of them: the amount, the rate, the collateral requirement and the approval are all the lender's decision. We help you size the real funding gap, compare routes against your profile, and time the sanction letter to your visa appointment.",
    maxAmount: "Typically ₹15–35 Lakhs depending on university type",
    interestRate: "Varies by lender and security offered",
    unsecuredMax: "Collateral-free options available at lower amounts",
    services: [
      "Separating tuition, admission fee and living costs so the loan is sized correctly",
      "Adjusting the amount for an expected tuition reduction or scholarship",
      "Comparing secured and collateral-free routes",
      "Co-applicant documentation guidance",
      "Timing the sanction letter for the Certificate of Eligibility stage",
      "Evidence of funds in the format immigration expects",
    ],
    highlights: [
      "Lower borrowing than Western destinations",
      "National tuition is fixed and predictable",
      "Interest deduction available under Section 80E",
      "Part-time work rights help with running costs",
      "Moratorium through the course plus the grace period",
    ],
    unsecuredLoan: {
      question: "Can I get a collateral-free loan for Japan?",
      answer:
        "Often yes, particularly for a national university where the amount needed is modest and the institution is well regarded. Lenders assess the co-applicant's income, the university and the course. Compare total repayment rather than the headline rate.",
    },
    rejectedLoan: {
      question: "What if a lender declines?",
      answer:
        "Establish the actual reason first — usually co-applicant income, existing obligations or incomplete documentation rather than Japan itself. A different lender, a stronger co-applicant or partial collateral commonly resolves it. Note that the Certificate of Eligibility stage requires proof of funds, so leave time for this.",
    },
    phoneNumber: "+91 92118 18710",
  },

  admissionRequirements: {
    intro: "What Japanese universities typically ask Indian applicants for:",
    requirements: [
      "12 years of formal schooling — Class 12 marksheets and certificate",
      "Bachelor's transcripts and degree certificate for graduate entry",
      "EJU (Examination for Japanese University Admission) for many Japanese-taught undergraduate courses",
      "JLPT certification where the programme is taught in Japanese — usually N2 or above",
      "IELTS or TOEFL for English-taught programmes",
      "Statement of purpose or study plan",
      "Recommendation letters, particularly for graduate study",
      "Research proposal and a prospective supervisor for research degrees",
      "Valid passport",
      "Proof of financial support for the Certificate of Eligibility",
    ],
    importantNote:
      "Japan's Certificate of Eligibility comes before the visa, not after. The university applies to the Immigration Services Agency on your behalf, and the process commonly takes two to three months. Every other deadline in your plan has to be worked backwards from that.",
    aeoAnswer:
      "Indian students need 12 years of schooling for undergraduate entry and a bachelor's degree for graduate entry, plus either EJU/JLPT for Japanese-taught programmes or IELTS/TOEFL for English-taught ones, a statement of purpose, and proof of funds. A Certificate of Eligibility is obtained by the university before the student visa is issued.",
  },

  applicationProcess: [
    { step: 1, title: "Route Decision", description: "English-taught degree, Japanese-taught degree via EJU, or language school first." },
    { step: 2, title: "Language Planning", description: "Begin Japanese early and book JLPT or EJU well ahead of the deadline." },
    { step: 3, title: "Supervisor Contact", description: "For research degrees, approach professors months before applying." },
    { step: 4, title: "Scholarship Applications", description: "MEXT embassy round opens first; university-recommendation route runs separately." },
    { step: 5, title: "University Application", description: "Transcripts, statement, referees and any entrance examination." },
    { step: 6, title: "Offer and Finance", description: "Accept the offer and arrange the loan, sized after any tuition reduction." },
    { step: 7, title: "Certificate of Eligibility", description: "The university applies to immigration — allow two to three months." },
    { step: 8, title: "Visa and Departure", description: "Apply at the embassy with the CoE, then arrange residence card, insurance and accommodation." },
  ],

  studentVisa: {
    heading: "Japan Student Visa for Indian Students",
    intro:
      "Japan works in the opposite order to most destinations. Your university applies for a Certificate of Eligibility from the Immigration Services Agency first; the embassy issues the visa against it afterwards, usually quickly.",
    journey: "University Offer → University Applies for the CoE → CoE Issued → Visa at the Embassy → Entry → Residence Card & National Health Insurance",
    requirements: [
      "Valid passport",
      "Certificate of Eligibility issued by the Immigration Services Agency",
      "University admission letter",
      "Completed visa application form and photograph",
      "Evidence of financial support for tuition and living costs",
      "Academic transcripts and certificates",
      "Proof of relationship with the financial sponsor",
      "Visa fee payment",
    ],
    financialNote:
      "Proof of funds is assessed at the Certificate of Eligibility stage, not only at the embassy, and a clear, well-documented sponsor is what makes it straightforward. A sanctioned education loan letter is normally accepted alongside bank statements.",
    processingNote:
      "The CoE typically takes two to three months; the visa itself is then usually issued within about a week. On arrival you receive a residence card at the airport, and must enrol in National Health Insurance and register at your local municipal office within the required period.",
  },

  workWhileStudying: {
    heading: "Working While Studying in Japan",
    intro: "Students may work part-time, but only after obtaining specific permission to engage in activity outside their status of residence.",
    details:
      "With that permission, students may work up to 28 hours per week during term and longer during official university holidays. Common work includes convenience stores, restaurants, hotels, tutoring and translation. Japanese ability is the main determinant of both what you can get and what you are paid — English-only students find the options narrow. Certain categories of work are prohibited outright.",
    disclaimer:
      "Apply for the permission at the airport on arrival or at your local immigration office; working without it is a serious breach. Exceeding 28 hours is treated as a genuine violation and has cost students their status. Treat part-time income as help with living costs, never as the funding plan.",
  },

  postStudyWork: {
    heading: "Post-Study Work in Japan",
    intro: "Japan has widened, not narrowed, its routes for international graduates — and the demographics behind that are not going to reverse.",
    pathway: "Graduate → Designated Activities permission for job hunting, or the J-Find route → Work visa (e.g. Engineer / Specialist in Humanities / International Services) sponsored by an employer → Longer-term residence",
    disclaimer:
      "The main work visa requires a job offer whose duties match your field of study. Graduates may also switch to a job-hunting permission for a period after graduating, and a separate route exists for graduates of highly ranked universities. Japanese-language ability is the decisive factor in recruitment for most roles outside specialist IT and research — students who reach a working level of Japanese have meaningfully different outcomes from those who do not.",
  },

  cities: [
    { name: "Tokyo", description: "The capital and the densest concentration of universities, employers and international students.", universities: "University of Tokyo, Waseda, Keio, Institute of Science Tokyo", state: "Tokyo" },
    { name: "Osaka", description: "Commercial heart of western Japan, cheaper than Tokyo and famously informal.", universities: "Osaka University, Osaka Metropolitan University", state: "Osaka" },
    { name: "Kyoto", description: "Historic student city with a strong research culture.", universities: "Kyoto University, Ritsumeikan", state: "Kyoto" },
    { name: "Sendai", description: "Northern university city built around a major research institution.", universities: "Tohoku University", state: "Miyagi" },
    { name: "Fukuoka", description: "Compact, affordable southern city with a growing startup scene.", universities: "Kyushu University", state: "Fukuoka" },
  ],

  documents: {
    intro: "Documents to prepare for a Japanese application:",
    list: [
      "Passport",
      "Class 10 and 12 marksheets and certificates",
      "Bachelor's transcripts and degree certificate (graduate entry)",
      "EJU or JLPT score report where required",
      "IELTS or TOEFL score for English-taught programmes",
      "Statement of purpose or study plan",
      "Research proposal (research degrees)",
      "Recommendation letters",
      "Certificate of Eligibility (issued later, by the university)",
      "Bank statements and sponsor documents",
      "Education loan sanction letter",
      "Passport photographs to specification",
    ],
    disclaimer:
      "Japanese universities are precise about document formats, photograph dimensions and sealed envelopes. Read each institution's checklist literally — an application returned for a formatting issue can cost you an intake, because the next one is six months away.",
  },

  whyDD: [
    { title: "Honest Route Advice", description: "English-track, Japanese-track or language school first — we tell you which fits rather than which is easiest to sell.", icon: "UserCheck" },
    { title: "Language Planning From Day One", description: "JLPT and EJU are planned into the timeline, not bolted on at the end.", icon: "BookOpen" },
    { title: "Scholarship Strategy", description: "MEXT embassy and university routes, JASSO and tuition reductions treated as separate opportunities.", icon: "Award" },
    { title: "Supervisor Approach Support", description: "For research degrees we help you write an approach a professor will actually reply to.", icon: "FileText" },
    { title: "CoE Sequencing", description: "The whole plan is built backwards from the Certificate of Eligibility timeline.", icon: "Globe" },
    { title: "Loan Guidance", description: "Borrowing sized to Japan's low tuition and real living costs.", icon: "Wallet" },
    { title: "Career-Aware Counselling", description: "If you intend to work in Japan, we plan for it from the first year rather than the last.", icon: "Briefcase" },
    { title: "Support From Anywhere in India", description: "Online counselling wherever you are.", icon: "Monitor" },
  ],

  faqs: [
    {
      question: "Can I study in Japan entirely in English?",
      answer:
        "Yes — there is a growing set of English-taught degree programmes, especially at graduate level and at the leading national and private universities. But English gets you through the degree, not through the country. Part-time work, daily administration and graduate recruitment largely run in Japanese, so plan to learn it regardless of your programme's language.",
    },
    {
      question: "How expensive is studying in Japan?",
      answer:
        "Less than most people expect. National universities charge a standard national tuition rate that applies to international students too, and a large share of international students receive a 50% or full tuition reduction. Private universities cost more, with private medicine and specialist engineering the genuinely expensive categories. The bigger cost is living, and Tokyo is the outlier there.",
    },
    {
      question: "What is a Certificate of Eligibility?",
      answer:
        "It is a document your university obtains from Japan's Immigration Services Agency confirming you meet the conditions for student status. Japan issues it before the visa — the embassy then grants the visa against it, usually within about a week. The CoE itself typically takes two to three months, which is why Japanese applications need a longer runway than most.",
    },
    {
      question: "How competitive is the MEXT scholarship?",
      answer:
        "Genuinely competitive. It is a fully funded award covering tuition, a monthly stipend and return airfare, so it attracts strong applicants from across the world. There are two routes — embassy recommendation, applied for in India, and university recommendation, applied for through a Japanese university, usually with a supervisor's backing. Apply for it seriously, but do not build your only financial plan around it.",
    },
    {
      question: "Do I need JLPT or EJU?",
      answer:
        "It depends on the route. Japanese-taught undergraduate programmes commonly require the EJU, and often JLPT N2 or above. English-taught programmes require IELTS or TOEFL instead. Even where no Japanese is formally required, N3–N2 transforms your experience and your employability.",
    },
    {
      question: "How many hours can I work while studying in Japan?",
      answer:
        "Up to 28 hours per week during term, and longer during official university holidays — but only after you obtain permission to engage in activity outside your status of residence. Apply for it at the airport on arrival or at your local immigration office. Exceeding the limit or working without permission is treated seriously and can affect your status.",
    },
    {
      question: "Can I stay and work in Japan after graduating?",
      answer:
        "Yes, and Japan has been widening these routes rather than restricting them. Graduates can move to a work visa with an employer whose role matches their field of study, or take a job-hunting permission for a period after graduating; a separate route exists for graduates of highly ranked universities. Japanese-language ability is the single biggest factor in whether recruitment goes well.",
    },
    {
      question: "What are the intakes for Japanese universities?",
      answer:
        "April is the traditional and largest intake. September or October has grown considerably and is used by most English-taught programmes. Start 12–14 months before an April intake, because examinations, scholarship rounds and the Certificate of Eligibility all sit in that runway.",
    },
    {
      question: "Is a Japanese language school a good route?",
      answer:
        "It can be a sound one if you intend to take a Japanese-taught degree or to work in Japan afterwards. A year or two at a language school builds the JLPT level that degree entry and employment require. It is not a shortcut, though — it is an extra year of cost and time, so choose it deliberately.",
    },
    {
      question: "Can I get an education loan for Japan?",
      answer:
        "Yes. Because national university tuition is low, the amount needed is usually modest and most of it goes on living costs. Remember that proof of funds is assessed at the Certificate of Eligibility stage, so have the sanction letter ready earlier than you would for other destinations.",
    },
  ],
};

const StudyInJapanPage = () => <GenericStudyPage data={DATA} />;
export default StudyInJapanPage;
