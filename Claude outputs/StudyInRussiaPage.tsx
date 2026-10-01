import GenericStudyPage, { type GenericCountryData } from "./GenericStudyPage";

/**
 * Study in Russia.
 *
 * Written to the same depth as the Canada and UK pages. Two deliberate
 * editorial choices sit behind the copy:
 *
 * 1. Medical claims follow the NMC's Foreign Medical Graduate Licentiate
 *    (FMGL) Regulations, 2021 — not the "NMC/WHO approved" shorthand the
 *    industry uses. WHO does not approve or recognise medical colleges; the
 *    WDOMS directory is a listing, not an endorsement. Saying otherwise is
 *    both inaccurate and, under the Consumer Protection Act, a misleading
 *    advertising claim.
 * 2. Payment, travel and banking constraints are stated plainly rather than
 *    left out. A family that finds out about them after paying a deposit has
 *    a legitimate grievance.
 */
const DATA: GenericCountryData = {
  countryName: "Russia",
  countrySlug: "russia",
  countryFlag: "🇷🇺",

  seo: {
    title: "Study in Russia for Indian Students 2026 | MBBS & Engineering | DreamDestination",
    description:
      "Study in Russia for Indian students — MBBS, engineering and technical degrees, university shortlisting, NMC rules explained, education loans, student visa and invitation letter guidance.",
    canonicalUrl: "https://www.dreamdestinationstudyabroad.com/study-in-russia",
    keywords: [
      "study in russia for indian students", "study in russia", "study in russia from india",
      "mbbs in russia", "mbbs in russia for indian students", "mbbs in russia fees",
      "russia education consultant", "russia student visa", "russia study visa from india",
      "best universities in russia for indian students", "engineering in russia",
      "russia scholarship for indian students", "russian government scholarship",
      "cost of studying in russia", "russia tuition fees for indian students",
      "education loan for russia", "study medicine in russia",
      "nmc rules for mbbs in russia", "fmge after mbbs in russia",
      "ms in russia", "phd in russia", "study abroad consultant for russia",
      "russia invitation letter for students", "moscow universities for indian students",
      "is mbbs in russia valid in india",
    ],
  },

  hero: {
    badge: "🇷🇺 Updated for 2026 — Low-Cost Medicine & Engineering",
    description:
      "Russia is among the least expensive places an Indian student can take a full medical or engineering degree, with large, long-established state universities and sizeable Indian student communities. It also carries practical complications that deserve a straight answer before you commit.",
    questions: [
      "Is a Russian medical degree usable in India?",
      "What exactly does the NMC require?",
      "Which universities teach in English?",
      "What will six years actually cost?",
      "How do payments and remittances work right now?",
      "What is an invitation letter and why does it matter?",
      "Can you work during and after the course?",
    ],
    valueProposition:
      "DreamDestination checks the NMC conditions against the specific university and programme you are considering, explains the parts of the Russia route that agencies usually leave out, and supports admission, invitation letter, education loan and visa documentation.",
    primaryCta: "Get Free Russia Study Advice",
    secondaryCta: "Talk to a Russia Counsellor",
  },

  atAGlance: {
    title: "Russia at a Glance",
    stats: [
      { label: "Study Levels", value: "MBBS, Bachelor's, Master's, PhD" },
      { label: "Language", value: "Russian; English-medium available" },
      { label: "Currency", value: "Russian Rouble (₽)" },
      { label: "Popular Cities", value: "Moscow, St Petersburg, Kazan, Tomsk" },
      { label: "Student Visa", value: "Study visa on an official invitation" },
      { label: "Main Intake", value: "September, with limited February entry" },
    ],
  },

  whyCountry: {
    title: "Why Indian Students Consider Russia",
    subtitle:
      "The case for Russia is mostly financial and structural. It is a strong one — provided you go in understanding the conditions attached.",
    reasons: [
      {
        title: "Substantially Lower Total Cost",
        description:
          "A full medical degree in Russia typically costs a fraction of a private Indian seat and a small fraction of Western tuition. For most families this is the decisive factor.",
        icon: "Wallet",
      },
      {
        title: "No Additional Entrance Exam",
        description:
          "Admission is based on your qualifying marks. For medicine you still need a valid NEET result, because the NMC requires it — but there is no separate university entrance test.",
        icon: "FileText",
      },
      {
        title: "Long-Established State Universities",
        description:
          "Moscow State, St Petersburg State, Kazan Federal, Bauman and MEPhI are large public institutions with decades of international intake.",
        icon: "Building",
      },
      {
        title: "English-Medium Programmes",
        description:
          "Many universities run English-medium tracks for international students, particularly in medicine and engineering.",
        icon: "BookOpen",
      },
      {
        title: "Strength in Technical Fields",
        description:
          "Russia has deep teaching traditions in physics, mathematics, aerospace, nuclear engineering and materials science.",
        icon: "Cog",
      },
      {
        title: "Established Indian Student Presence",
        description:
          "Large Indian cohorts at the main universities, which matters for food, accommodation and simply finding your feet.",
        icon: "Users",
      },
    ],
  },

  whoShouldConsider: {
    heading: "Is Russia the Right Choice for You?",
    intro: "Russia may suit you if you:",
    points: [
      "Want a medical or technical degree at the lowest realistic total cost",
      "Have a valid NEET result and are aiming at medicine",
      "Are prepared to clear FMGE / NExT to practise in India",
      "Are comfortable learning functional Russian for clinical or daily life",
      "Want a large public university rather than a small private college",
      "Can handle severe winters and a very different culture",
      "Have thought through payments, flights and communication with home",
      "Are looking at engineering, physics or aerospace specifically",
    ],
    disclaimer:
      "Be realistic about the complications. International payments to Russian institutions, flight routing from India, and access to some global services have all become harder since 2022 and can change with little notice. Check your bank's current position on remittances to Russia before you commit money, and read your government's latest travel advice. We would rather you hear this from us than discover it after a deposit.",
    cta: { text: "Check My Russia Eligibility", href: "#lead-form" },
  },

  universities: [
    {
      name: "Lomonosov Moscow State University",
      location: "Moscow",
      state: "Moscow",
      type: "Public",
      qsRanking: "Highest-ranked Russian university",
      popularPrograms: ["Physics", "Mathematics", "Medicine", "Chemistry", "Economics"],
      logo: "https://logo.clearbit.com/msu.ru",
      avgTuition: "Moderate by Russian standards",
      postStudyWork: true,
    },
    {
      name: "Saint Petersburg State University",
      location: "Saint Petersburg",
      state: "Leningrad Oblast",
      type: "Public",
      qsRanking: "Top-tier Russian university",
      popularPrograms: ["Medicine", "International Relations", "Law", "Sciences", "Economics"],
      logo: "https://logo.clearbit.com/spbu.ru",
      avgTuition: "Moderate by Russian standards",
      postStudyWork: true,
    },
    {
      name: "Sechenov First Moscow State Medical University",
      location: "Moscow",
      state: "Moscow",
      type: "Public",
      qsRanking: "Leading Russian medical university",
      popularPrograms: ["General Medicine (MBBS)", "Dentistry", "Pharmacy", "Nursing", "Public Health"],
      logo: "https://logo.clearbit.com/sechenov.ru",
      avgTuition: "Higher end for medicine",
      postStudyWork: true,
    },
    {
      name: "RUDN University (Peoples' Friendship University)",
      location: "Moscow",
      state: "Moscow",
      type: "Public",
      qsRanking: "Large international intake",
      popularPrograms: ["Medicine", "Engineering", "Agriculture", "Economics", "Law"],
      logo: "https://logo.clearbit.com/rudn.ru",
      avgTuition: "Mid-range",
      postStudyWork: true,
    },
    {
      name: "Kazan Federal University",
      location: "Kazan",
      state: "Tatarstan",
      type: "Public",
      qsRanking: "Major federal university",
      popularPrograms: ["Medicine", "IT", "Engineering", "Petroleum", "Linguistics"],
      logo: "https://logo.clearbit.com/kpfu.ru",
      avgTuition: "Lower end",
      postStudyWork: true,
    },
    {
      name: "Bauman Moscow State Technical University",
      location: "Moscow",
      state: "Moscow",
      type: "Public",
      qsRanking: "Russia's leading technical university",
      popularPrograms: ["Mechanical Engineering", "Aerospace", "Robotics", "Informatics", "Energy"],
      logo: "https://logo.clearbit.com/bmstu.ru",
      avgTuition: "Mid-range",
      postStudyWork: true,
    },
    {
      name: "ITMO University",
      location: "Saint Petersburg",
      state: "Leningrad Oblast",
      type: "Public",
      qsRanking: "Known for computing & photonics",
      popularPrograms: ["Computer Science", "Data Science", "Photonics", "Biotechnology", "Robotics"],
      logo: "https://logo.clearbit.com/itmo.ru",
      avgTuition: "Mid-range",
      postStudyWork: true,
    },
    {
      name: "MEPhI (National Research Nuclear University)",
      location: "Moscow",
      state: "Moscow",
      type: "Public",
      qsRanking: "Specialist nuclear & physics institute",
      popularPrograms: ["Nuclear Engineering", "Applied Physics", "Cybersecurity", "Mathematics", "IT"],
      logo: "https://logo.clearbit.com/mephi.ru",
      avgTuition: "Mid-range",
      postStudyWork: true,
    },
  ],

  popularCourses: [
    {
      category: "Medicine & Health Sciences",
      icon: "Heart",
      courses: ["General Medicine (MBBS)", "Dentistry", "Pharmacy", "Nursing", "Paediatrics", "Public Health"],
    },
    {
      category: "Engineering & Technology",
      icon: "Cog",
      courses: ["Mechanical Engineering", "Aerospace", "Nuclear Engineering", "Robotics", "Petroleum", "Civil Engineering"],
    },
    {
      category: "Computing & Sciences",
      icon: "Monitor",
      courses: ["Computer Science", "Data Science", "Cybersecurity", "Applied Physics", "Mathematics", "Chemistry"],
    },
    {
      category: "Business & Humanities",
      icon: "TrendingUp",
      courses: ["Economics", "International Relations", "Management", "Linguistics", "Law"],
    },
  ],

  masters: {
    heading: "Master's and PhD in Russia for Indian Students",
    description:
      "Beyond medicine, Russia's postgraduate strength sits in engineering, physics and computing, usually at low tuition and with funded research places at the stronger institutes.",
    considerations: [
      "Language of instruction for your specific programme",
      "Whether the department genuinely teaches in English or only advertises it",
      "Research funding and supervisor availability",
      "Recognition of the qualification in the country you intend to work in",
      "Total cost including the preparatory year if one is required",
      "Publication and collaboration access from a Russian institution",
      "Visa duration and renewal within Russia",
      "Career outcomes in your target market, not just in Russia",
    ],
    popularSpecialisations: [
      "MSc Computer Science",
      "MSc Data Science",
      "MSc Aerospace Engineering",
      "MSc Nuclear Engineering",
      "MSc Petroleum Engineering",
      "MSc Applied Physics",
      "MSc Robotics",
      "MA International Relations",
    ],
    note:
      "If you intend to work outside Russia after the degree, check with the professional body or employer in that country how a Russian qualification is treated before you apply. This is far easier to establish now than after graduation.",
    cta: { text: "Find My Russian Programme", href: "#lead-form" },
  },

  intakes: [
    {
      season: "September",
      status: "Main Intake",
      description: "The principal entry point for almost every programme, including medicine.",
      timeline: "Begin 6–9 months ahead — the invitation letter alone takes time",
    },
    {
      season: "February",
      status: "Limited Intake",
      description: "Offered by some universities for selected non-medical programmes.",
      timeline: "Begin 5–7 months ahead",
    },
  ],

  timeline: [
    {
      phase: "8–10 Months Before",
      title: "Verify Before You Shortlist",
      details:
        "Confirm NEET validity if you are applying for medicine, check the NMC conditions, and shortlist only universities whose programme structure can satisfy them.",
    },
    {
      phase: "6–7 Months Before",
      title: "Apply and Obtain the Invitation",
      details:
        "Submit documents to the university and wait for the official invitation letter issued through the Russian migration authority. This is the step students most often underestimate.",
    },
    {
      phase: "3–5 Months Before",
      title: "Finance and Documentation",
      details:
        "Arrange the education loan, settle how tuition will actually be remitted, complete medical and HIV certification, and get documents translated and attested.",
    },
    {
      phase: "1–2 Months Before",
      title: "Visa and Departure",
      details:
        "Apply for the study visa on the invitation, confirm hostel allocation, book routing that is currently operating, and complete pre-departure briefing.",
    },
  ],

  costOfStudy: {
    title: "Cost of Studying in Russia",
    intro:
      "Tuition varies mainly by university standing and by subject. Medicine sits at the top of the range; regional technical universities at the bottom.",
    breakdown: [
      { level: "Medicine (MBBS)", cost: "Highest Russian tier", note: "Six years including the internship year" },
      { level: "Engineering & Technology", cost: "Mid-range", note: "Four years for a bachelor's" },
      { level: "Regional Universities", cost: "Lowest tier", note: "Outside Moscow and St Petersburg" },
      { level: "Preparatory Year", cost: "Additional", note: "Required where the programme is taught in Russian" },
    ],
    budgetItems: [
      "Tuition, year by year",
      "Hostel or private accommodation",
      "Food and daily living",
      "Medical insurance",
      "Winter clothing — a genuine first-year cost",
      "Visa, registration and renewal fees",
      "Document translation and attestation",
      "Flights, including the current indirect routing",
      "Remittance charges and exchange spread",
    ],
    disclaimer:
      "Ask every university for its fee in writing, for all years of the course, and ask specifically whether a preparatory year, hostel charge or insurance premium sits outside the advertised figure. Compare the six-year total, never the first-year number.",
  },

  costOfLiving: {
    title: "Cost of Living in Russia",
    intro: "Living costs are low by international standards, with a clear gap between the two big cities and everywhere else.",
    cities: [
      { name: "Moscow", costLevel: "Highest", note: "Capital; most expensive rent and daily costs" },
      { name: "Saint Petersburg", costLevel: "High", note: "Second city; slightly below Moscow" },
      { name: "Kazan", costLevel: "Moderate", note: "Large student city, noticeably cheaper" },
      { name: "Novosibirsk", costLevel: "Moderate", note: "Major Siberian research centre" },
      { name: "Tomsk", costLevel: "Low", note: "Classic university town" },
      { name: "Volgograd", costLevel: "Low", note: "Among the most affordable options" },
    ],
  },

  scholarships: {
    title: "Scholarships in Russia for Indian Students",
    intro:
      "The main route is the Russian Government Scholarship, administered through the Russian House / Rossotrudnichestvo in India. University awards exist but are smaller.",
    categories: [
      {
        title: "Government Scholarships",
        items: [
          "Russian Government Scholarship quota for Indian nationals",
          "Applications through the Russian House in India",
          "Tuition-free place plus a monthly stipend where awarded",
          "Separate competitive selection, with its own deadline",
          "Preparatory year usually included",
        ],
      },
      {
        title: "University Awards",
        items: [
          "Merit reductions for strong academic records",
          "Departmental research assistantships at postgraduate level",
          "Partial tuition discounts at some regional universities",
          "Olympiad-based entry routes for selected subjects",
        ],
      },
    ],
    disclaimer:
      "Government scholarship deadlines fall well before university admission deadlines and the number of seats is limited. Treat a scholarship as a possibility to apply for, never as the financial plan. Confirm every detail with the official Russian House channel rather than an agent.",
  },

  educationLoan: {
    title: "Education Loan for Studying in Russia",
    intro:
      "Because Russian tuition is low, most families need a considerably smaller loan than for a Western destination — which in turn makes approval easier and the EMI manageable.",
    maxAmount: "Typically ₹20–30 Lakhs is sufficient",
    interestRate: "Varies by lender and security offered",
    unsecuredMax: "Collateral-free options available at lower amounts",
    services: [
      "Working out the real six-year funding gap, not just year one",
      "Comparing secured and collateral-free routes",
      "Co-applicant income and documentation guidance",
      "Sanction letter timed to the visa application",
      "Disbursement planning against the university's fee schedule",
      "Guidance on how funds will actually reach the university",
    ],
    highlights: [
      "Smaller loan than Western destinations",
      "Lower EMI after the moratorium",
      "Interest deduction available under Section 80E",
      "Tuition, hostel and living costs can be covered",
      "Moratorium through the course plus the grace period",
    ],
    unsecuredLoan: {
      question: "Can I get a collateral-free loan for Russia?",
      answer:
        "Often yes, because the amounts involved are modest. Lenders assess the co-applicant's income, the university and the course. Medicine is generally viewed favourably given the earning trajectory. Terms differ between banks and NBFCs — compare the total repayment rather than the headline rate.",
    },
    rejectedLoan: {
      question: "What if a lender declines?",
      answer:
        "Find out the actual reason first — it is usually co-applicant income, an existing obligation, or incomplete documentation rather than the destination. A different lender, a stronger co-applicant, or partial collateral often resolves it. We help you read the rejection properly instead of reapplying blindly.",
    },
    phoneNumber: "806-767-0964",
  },

  admissionRequirements: {
    intro: "What Russian universities ask Indian applicants for:",
    requirements: [
      "Class 10 and 12 marksheets and certificates",
      "A valid NEET result — mandatory for medicine",
      "NMC Eligibility Certificate before joining a medical programme",
      "Valid passport with adequate remaining validity",
      "Medical fitness certificate",
      "HIV test report",
      "Birth certificate, translated and attested",
      "Passport photographs to the university's specification",
      "English proficiency evidence where the programme requires it",
      "Legalised or apostilled academic documents",
    ],
    importantNote:
      "For medicine, the NMC's FMGL Regulations, 2021 require the whole course to be in the same institution, taught in English, of at least 54 months plus a 12-month internship, and the qualification must permit practice in Russia on the same terms as a Russian citizen. Confirm the specific university's structure against every one of those conditions before you accept an offer.",
    aeoAnswer:
      "Indian students need Class 12 with the required science subjects, a valid NEET score for medicine, an NMC Eligibility Certificate, a passport and medical certification. There is no separate university entrance examination for most Russian programmes.",
  },

  applicationProcess: [
    { step: 1, title: "Profile and Eligibility Check", description: "Marks, NEET status, budget and long-term intention." },
    { step: 2, title: "NMC Conditions Review", description: "For medicine, test each shortlisted university against the FMGL 2021 conditions." },
    { step: 3, title: "University Shortlisting", description: "Compare on total six-year cost, teaching language and student outcomes." },
    { step: 4, title: "Application and Offer", description: "Submit documents and receive the university's admission letter." },
    { step: 5, title: "Invitation Letter", description: "The university applies to the migration authority; this can take several weeks." },
    { step: 6, title: "Finance Arranged", description: "Loan sanctioned and the remittance route confirmed with your bank." },
    { step: 7, title: "Study Visa", description: "Apply at the Russian consulate with the invitation and medical documents." },
    { step: 8, title: "Pre-Departure", description: "Hostel, routing, winter kit, registration rules and local contacts." },
  ],

  studentVisa: {
    heading: "Russia Student Visa for Indian Students",
    intro:
      "The Russian study visa is issued against an official invitation letter that the university obtains on your behalf. Nothing moves until that invitation exists.",
    journey: "Admission Letter → Official Invitation → Medical & HIV Certification → Consulate Application → Visa → Registration in Russia",
    requirements: [
      "Valid passport",
      "University admission letter",
      "Official invitation letter from the migration authority",
      "Completed visa application form",
      "Medical fitness certificate",
      "HIV / AIDS test certificate",
      "Passport photographs",
      "Proof of funds for the stay",
      "Visa fee payment",
    ],
    financialNote:
      "You will be asked to evidence that the course and your living costs are funded. A sanctioned education loan letter is normally accepted.",
    processingNote:
      "Allow several weeks for the invitation letter and a further two to four weeks at the consulate. Once in Russia you must complete local migration registration within the stated period — a step students routinely forget and are fined for.",
  },

  workWhileStudying: {
    heading: "Working While Studying in Russia",
    intro: "International students may work during their studies, subject to the applicable permissions.",
    details:
      "Part-time work is legally possible and common in tutoring, hospitality and translation, but pay levels are low and Russian language ability largely determines what is available. For medical students the timetable leaves very little room in any case.",
    disclaimer:
      "Do not build your budget around part-time earnings. Treat any income as incidental, and confirm the current work permission rules for students with the university's international office, since they have changed more than once.",
  },

  postStudyWork: {
    heading: "After Graduation",
    intro: "Two very different paths, and it is worth deciding which one you are on before you enrol.",
    pathway: "Graduate → Either return to India for FMGE/NExT and internship, or pursue employment in Russia with employer sponsorship",
    disclaimer:
      "Most Indian medical graduates return to India, where the degree alone does not permit practice: you must clear the NMC's screening examination and complete a supervised 12-month internship in India. Plan and budget for that period. For engineering and technical graduates, staying on in Russia depends on employer sponsorship, Russian language ability and the job market.",
  },

  cities: [
    { name: "Moscow", description: "The capital, with the largest concentration of leading universities and the highest costs.", universities: "MSU, Sechenov, RUDN, Bauman, MEPhI", state: "Moscow" },
    { name: "Saint Petersburg", description: "Russia's cultural capital and a major student city.", universities: "SPbSU, ITMO, Pavlov Medical", state: "Leningrad Oblast" },
    { name: "Kazan", description: "A large, comparatively affordable university city with a sizeable Indian community.", universities: "Kazan Federal University", state: "Tatarstan" },
    { name: "Novosibirsk", description: "Siberia's research hub, strong in the sciences.", universities: "Novosibirsk State University", state: "Novosibirsk Oblast" },
    { name: "Tomsk", description: "A small city dominated by its universities, with low living costs.", universities: "Tomsk State, Tomsk Polytechnic", state: "Tomsk Oblast" },
  ],

  documents: {
    intro: "Documents to prepare, most of which need translation and attestation:",
    list: [
      "Passport",
      "Class 10 and 12 marksheets and certificates",
      "NEET scorecard (medicine)",
      "NMC Eligibility Certificate (medicine)",
      "Birth certificate",
      "Medical fitness certificate",
      "HIV test report",
      "Passport photographs",
      "University admission letter",
      "Official invitation letter",
      "Education loan sanction letter",
      "Notarised translations of academic documents",
    ],
    disclaimer:
      "Translation and legalisation take longer than students expect and are a common cause of missed intakes. Start them as soon as the offer arrives, not once the visa appointment is booked.",
  },

  whyDD: [
    { title: "We Test the NMC Conditions", description: "For medicine we check each shortlisted university against the FMGL 2021 requirements rather than repeating an agent's claim.", icon: "Shield" },
    { title: "Six-Year Cost, Not Year One", description: "We build the full course cost, including the preparatory year and the return to India.", icon: "Wallet" },
    { title: "Honest About the Complications", description: "Payments, routing and advisories are discussed before you pay anything, not after.", icon: "BadgeCheck" },
    { title: "Invitation Letter Support", description: "We track the invitation process, which is where most Russia applications stall.", icon: "FileText" },
    { title: "Loan Guidance", description: "Right-sized borrowing against a low-tuition destination.", icon: "Wallet" },
    { title: "Visa Documentation", description: "Medical certification, translations and consulate requirements handled in order.", icon: "Globe" },
    { title: "FMGE / NExT Planning", description: "We make sure you have planned for the exam and the Indian internship from the start.", icon: "GraduationCap" },
    { title: "Support From Anywhere in India", description: "Online counselling wherever you are.", icon: "Monitor" },
  ],

  faqs: [
    {
      question: "Is an MBBS from Russia valid in India?",
      answer:
        "A Russian medical degree can lead to registration in India, but only if it meets the NMC's Foreign Medical Graduate Licentiate Regulations, 2021: at least 54 months of study plus a 12-month internship at the same institution, taught in English, with a curriculum comparable to the Indian MBBS, and a qualification that lets you practise in Russia on the same terms as a Russian citizen. You must then clear the NMC's screening examination (FMGE, moving to NExT) and complete a supervised 12-month internship in India. Verify the specific university against every one of those conditions before accepting a seat.",
    },
    {
      question: "Do I need NEET to study MBBS in Russia?",
      answer:
        "Yes. A valid NEET qualification is required for Indian students taking a primary medical qualification abroad, and you also need an NMC Eligibility Certificate. Any consultant who tells you NEET is optional is either out of date or not being straight with you.",
    },
    {
      question: "Is a Russian medical college 'WHO approved'?",
      answer:
        "No — and the phrase is misleading wherever you see it. The WHO does not approve, recognise or rank medical colleges. What exists is the World Directory of Medical Schools, a listing. What actually determines your ability to practise in India is the NMC's regulations, not a directory entry.",
    },
    {
      question: "What does it really cost to study in Russia?",
      answer:
        "Tuition is low by international standards and varies mainly by university standing and subject, with medicine at the top and regional technical universities at the bottom. Build your budget on the full course — tuition for every year, hostel, food, insurance, winter clothing, visa and registration fees, flights, and remittance charges — and ask for the fee schedule in writing for all years before you commit.",
    },
    {
      question: "Are there problems sending money to Russia from India?",
      answer:
        "International banking to Russia has been restricted since 2022 and individual Indian banks take different positions on remittances. This is a practical question with a real answer, so ask your bank directly before paying anything, and confirm with the university exactly how it accepts international fees. Do not assume a route that worked last year still works.",
    },
    {
      question: "Do I have to learn Russian?",
      answer:
        "For English-medium programmes you can study without it, but you will need functional Russian for daily life and, in medicine, for clinical placements where patients speak Russian. Most universities include language teaching, and students who take it seriously have a considerably better time.",
    },
    {
      question: "Which intake should I target?",
      answer:
        "September is the main intake for essentially every programme. A limited February entry exists at some universities for non-medical courses. Start eight to ten months ahead, because the invitation letter and document legalisation both take longer than students expect.",
    },
    {
      question: "Can I get an education loan for Russia?",
      answer:
        "Yes, and because the tuition is low the amount needed is usually modest, which tends to make approval easier. Lenders look at the co-applicant's income, the university and the course. We can help you size the loan against the full six-year cost rather than the first year.",
    },
    {
      question: "How safe is Russia for Indian students?",
      answer:
        "The major university cities have long-standing international student populations and universities provide secured hostel accommodation. That said, read your government's current travel advice for Russia before you decide, keep your registration documents in order, and stay in contact with your university's international office. Conditions can change.",
    },
    {
      question: "Can I stay and work in Russia after graduating?",
      answer:
        "It is possible with employer sponsorship, and Russian language ability makes a substantial difference. In practice most Indian medical graduates return to India for the licensing examination and internship. Decide which path you are on early, because it changes how you should spend your final year.",
    },
  ],
};

const StudyInRussiaPage = () => <GenericStudyPage data={DATA} />;
export default StudyInRussiaPage;
