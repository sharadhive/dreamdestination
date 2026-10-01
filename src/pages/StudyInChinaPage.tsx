import GenericStudyPage, { type GenericCountryData } from "./GenericStudyPage";

/**
 * Study in China.
 *
 * The MBBS content follows two hard constraints and says so on the page:
 *   • Only universities on China's Ministry of Education list are authorised
 *     to teach English-medium MBBS to international students.
 *   • The NMC's FMGL Regulations, 2021 govern whether that degree can lead to
 *     registration in India.
 * Both lists change. The copy therefore tells students to verify current
 * status rather than presenting a number as permanent fact.
 */
const DATA: GenericCountryData = {
  countryName: "China",
  countrySlug: "china",
  countryFlag: "🇨🇳",

  seo: {
    title: "Study in China for Indian Students | MBBS & CSC Scholarship",
    description:
      "Study in China for Indian students — MOE-listed MBBS universities, engineering and business degrees, CSC scholarships, X1 student visa, education loans and NMC rules explained.",
    canonicalUrl: "https://www.dreamdestinationstudyabroad.com/study-in-china",
    keywords: [
      "study in china for indian students", "study in china", "study in china from india",
      "mbbs in china", "mbbs in china for indian students", "mbbs in china fees",
      "moe approved medical universities in china", "china student visa", "x1 visa china",
      "csc scholarship", "chinese government scholarship for indian students",
      "best universities in china for indian students", "engineering in china",
      "cost of studying in china", "china tuition fees for indian students",
      "education loan for china", "ms in china", "phd in china",
      "china education consultant", "study abroad consultant for china",
      "is mbbs in china valid in india", "hsk exam for indian students",
      "jw202 form china", "study medicine in china", "tsinghua peking university admission",
    ],
  },

  hero: {
    badge: "🇨🇳 Updated for 2026 — MOE-Listed Medicine & Top-100 Engineering",
    description:
      "China combines genuinely world-ranked universities in engineering, computing and business with one of the largest funded scholarship programmes anywhere, and a long-established English-medium MBBS route governed by a published government list.",
    questions: [
      "Which universities may legally teach MBBS in English?",
      "Will the degree let me register in India?",
      "How does the CSC scholarship actually work?",
      "What are Tsinghua and Peking realistically asking for?",
      "How much Mandarin will I need?",
      "What is the X1 visa and the JW202 form?",
      "Can I work during or after the course?",
    ],
    valueProposition:
      "DreamDestination checks your shortlist against the current Ministry of Education list and the NMC's conditions, prepares CSC and university scholarship applications on the real timeline, and supports admission, education loan and X1 visa documentation.",
    primaryCta: "Get Free China Study Advice",
    secondaryCta: "Talk to a China Counsellor",
  },

  atAGlance: {
    title: "China at a Glance",
    stats: [
      { label: "Study Levels", value: "MBBS, Bachelor's, Master's, PhD" },
      { label: "Language", value: "Mandarin; English-medium tracks available" },
      { label: "Currency", value: "Chinese Yuan (¥ / RMB)" },
      { label: "Popular Cities", value: "Beijing, Shanghai, Wuhan, Nanjing" },
      { label: "Student Visa", value: "X1 (over 180 days) / X2 (short)" },
      { label: "Main Intake", value: "September, with a smaller March entry" },
    ],
  },

  whyCountry: {
    title: "Why Indian Students Choose China",
    subtitle:
      "China is one of the few destinations that is simultaneously low-cost and highly ranked — which is a rarer combination than it sounds.",
    reasons: [
      {
        title: "Genuinely Ranked Universities",
        description:
          "Tsinghua, Peking, Fudan, Shanghai Jiao Tong and Zhejiang sit in the global top tier, particularly in engineering, computing and materials.",
        icon: "GraduationCap",
      },
      {
        title: "A Regulated MBBS Route",
        description:
          "Unlike some destinations, China publishes an official Ministry of Education list of universities authorised to teach MBBS in English to international students. That list is a checkable fact.",
        icon: "Shield",
      },
      {
        title: "Large-Scale Scholarship Funding",
        description:
          "The Chinese Government Scholarship (CSC), provincial schemes and university awards fund a substantial number of international students each year.",
        icon: "Award",
      },
      {
        title: "Low Total Cost",
        description:
          "Tuition and living costs are far below Western destinations, and hostel accommodation on campus keeps the monthly budget predictable.",
        icon: "Wallet",
      },
      {
        title: "Strength in Engineering & Technology",
        description:
          "Deep research funding in AI, robotics, electronics, civil engineering, renewable energy and materials science.",
        icon: "Cog",
      },
      {
        title: "Asian Base and Language Advantage",
        description:
          "Shorter flights than the West, and Mandarin plus a Chinese degree is a distinctive combination in the Indian job market.",
        icon: "Globe",
      },
    ],
  },

  whoShouldConsider: {
    heading: "Is China the Right Choice for You?",
    intro: "China may suit you if you:",
    points: [
      "Want a top-ranked engineering or computing degree at low cost",
      "Are targeting MBBS and will only consider an MOE-listed university",
      "Have a valid NEET result and understand the NMC screening exam",
      "Are willing to learn Mandarin — for MBBS clinical years it is not optional",
      "Want a realistic shot at a fully funded CSC scholarship",
      "Prefer a destination in Asia with shorter, cheaper travel home",
      "Are interested in AI, robotics, manufacturing or renewable energy",
      "Can plan and document an application eight to ten months ahead",
    ],
    disclaimer:
      "Two things are worth checking yourself rather than taking on trust: whether your shortlisted medical university is currently on the Ministry of Education's English-medium list, and whether its course structure meets the NMC's conditions. Both can change between intakes, and an agent's brochure is not evidence.",
    cta: { text: "Check My China Eligibility", href: "#lead-form" },
  },

  universities: [
    {
      name: "Tsinghua University",
      location: "Beijing",
      state: "Beijing",
      type: "Public",
      qsRanking: "Global top tier",
      popularPrograms: ["Engineering", "Computer Science", "Architecture", "Business", "Materials"],
      logo: "https://logo.clearbit.com/tsinghua.edu.cn",
      avgTuition: "Moderate; heavily scholarship-supported",
      postStudyWork: true,
    },
    {
      name: "Peking University",
      location: "Beijing",
      state: "Beijing",
      type: "Public",
      qsRanking: "Global top tier",
      popularPrograms: ["Medicine", "Economics", "Sciences", "International Relations", "Law"],
      logo: "https://logo.clearbit.com/pku.edu.cn",
      avgTuition: "Moderate; heavily scholarship-supported",
      postStudyWork: true,
    },
    {
      name: "Fudan University",
      location: "Shanghai",
      state: "Shanghai",
      type: "Public",
      qsRanking: "Global top 50 band",
      popularPrograms: ["Medicine", "Business", "Journalism", "Economics", "Life Sciences"],
      logo: "https://logo.clearbit.com/fudan.edu.cn",
      avgTuition: "Mid to upper range",
      postStudyWork: true,
    },
    {
      name: "Shanghai Jiao Tong University",
      location: "Shanghai",
      state: "Shanghai",
      type: "Public",
      qsRanking: "Global top 50 band",
      popularPrograms: ["Engineering", "Medicine", "Naval Architecture", "Computer Science", "Business"],
      logo: "https://logo.clearbit.com/sjtu.edu.cn",
      avgTuition: "Mid to upper range",
      postStudyWork: true,
    },
    {
      name: "Zhejiang University",
      location: "Hangzhou",
      state: "Zhejiang",
      type: "Public",
      qsRanking: "Global top 50 band",
      popularPrograms: ["Engineering", "Computer Science", "Agriculture", "Medicine", "Management"],
      logo: "https://logo.clearbit.com/zju.edu.cn",
      avgTuition: "Mid-range",
      postStudyWork: true,
    },
    {
      name: "Wuhan University",
      location: "Wuhan",
      state: "Hubei",
      type: "Public",
      qsRanking: "Major national university",
      popularPrograms: ["Medicine (MBBS)", "Remote Sensing", "Civil Engineering", "Law", "Economics"],
      logo: "https://logo.clearbit.com/whu.edu.cn",
      avgTuition: "Mid-range",
      postStudyWork: true,
    },
    {
      name: "Nanjing Medical University",
      location: "Nanjing",
      state: "Jiangsu",
      type: "Public",
      qsRanking: "Specialist medical university",
      popularPrograms: ["Clinical Medicine (MBBS)", "Nursing", "Public Health", "Pharmacy", "Dentistry"],
      logo: "https://logo.clearbit.com/njmu.edu.cn",
      avgTuition: "Mid-range for medicine",
      postStudyWork: true,
    },
    {
      name: "Harbin Institute of Technology",
      location: "Harbin",
      state: "Heilongjiang",
      type: "Public",
      qsRanking: "Leading technical university",
      popularPrograms: ["Aerospace", "Mechanical Engineering", "Robotics", "Civil Engineering", "Computing"],
      logo: "https://logo.clearbit.com/hit.edu.cn",
      avgTuition: "Mid-range",
      postStudyWork: true,
    },
  ],

  popularCourses: [
    {
      category: "Medicine & Health Sciences",
      icon: "Heart",
      courses: ["Clinical Medicine (MBBS)", "Dentistry", "Pharmacy", "Nursing", "Traditional Chinese Medicine", "Public Health"],
    },
    {
      category: "Engineering & Technology",
      icon: "Cog",
      courses: ["Mechanical Engineering", "Civil Engineering", "Aerospace", "Robotics", "Electrical Engineering", "Renewable Energy"],
    },
    {
      category: "Computing & AI",
      icon: "Monitor",
      courses: ["Computer Science", "Artificial Intelligence", "Data Science", "Software Engineering", "Electronics", "Cybersecurity"],
    },
    {
      category: "Business & Humanities",
      icon: "TrendingUp",
      courses: ["International Business", "Economics", "Finance", "MBA", "Chinese Language & Literature", "International Relations"],
    },
  ],

  masters: {
    heading: "Master's and PhD in China for Indian Students",
    description:
      "China's postgraduate offer is where the scholarship money concentrates. Funded master's and PhD places are common at the leading universities, particularly in engineering and the sciences.",
    considerations: [
      "Whether the programme is taught in English or Mandarin",
      "CSC scholarship type and whether you apply via the university or the embassy",
      "Supervisor fit — for PhD applications this matters more than the ranking",
      "Research funding and lab access in your specific field",
      "Publication expectations before graduation",
      "Chinese language requirement for graduation at some universities",
      "Recognition of the degree in the market you intend to work in",
      "Total cost after any scholarship, including living stipend",
    ],
    popularSpecialisations: [
      "MSc Artificial Intelligence",
      "MSc Computer Science",
      "MSc Mechanical Engineering",
      "MSc Civil Engineering",
      "MSc Renewable Energy",
      "MSc Materials Science",
      "MBA / International Business",
      "MSc Public Health",
    ],
    note:
      "PhD applications in China are supervisor-led. A well-written approach to the right professor, months ahead of the deadline, changes the outcome far more than polishing the application form does.",
    cta: { text: "Find My China Programme", href: "#lead-form" },
  },

  mba: {
    heading: "MBA and Business Master's in China",
    areas: [
      "International Business",
      "Finance",
      "Supply Chain & Manufacturing",
      "Technology Management",
      "Marketing",
      "Entrepreneurship",
      "China Business & Trade",
    ],
    checkBefore: [
      "AACSB / EQUIS accreditation",
      "Whether the cohort is genuinely international",
      "Work experience expected",
      "Language of instruction across all modules",
      "Placement record for non-Chinese graduates",
      "Total cost against realistic post-MBA salary",
      "Internship access for international students",
      "Post-study work permit conditions",
    ],
  },

  intakes: [
    {
      season: "September",
      status: "Main Intake",
      description: "The principal intake for every level, and the one CSC scholarship rounds are built around.",
      timeline: "Begin 8–10 months ahead; CSC deadlines fall as early as December–March",
    },
    {
      season: "March",
      status: "Secondary Intake",
      description: "Offered by some universities for selected programmes, usually without scholarship funding.",
      timeline: "Begin 6–8 months ahead",
    },
  ],

  timeline: [
    {
      phase: "10–12 Months Before",
      title: "Verify and Shortlist",
      details:
        "Check the current Ministry of Education list if you are applying for MBBS, identify CSC-eligible universities, and — for research degrees — start contacting supervisors.",
    },
    {
      phase: "6–9 Months Before",
      title: "Scholarship and Applications",
      details:
        "CSC applications open early and close early. Submit university applications, study plan, referee letters and language evidence in parallel.",
    },
    {
      phase: "3–5 Months Before",
      title: "Admission and Finance",
      details:
        "Accept the offer, receive the JW202 form and admission notice, and arrange the education loan against the full course cost.",
    },
    {
      phase: "1–3 Months Before",
      title: "Visa and Departure",
      details:
        "Apply for the X1 visa with the JW202 and admission notice, complete the physical examination record, and plan arrival and residence-permit conversion.",
    },
  ],

  costOfStudy: {
    title: "Cost of Studying in China",
    intro:
      "Tuition varies by university tier and subject. Medicine and the top-ranked universities sit at the upper end; provincial universities are considerably cheaper.",
    breakdown: [
      { level: "MBBS at MOE-Listed Universities", cost: "Upper Chinese range", note: "Six years: 54 months plus a 12-month internship" },
      { level: "Engineering & Sciences", cost: "Mid-range", note: "Four years for a bachelor's" },
      { level: "Top-Ranked Universities", cost: "Higher, but heavily scholarship-supported", note: "Tsinghua, Peking, Fudan, SJTU" },
      { level: "Provincial Universities", cost: "Lowest tier", note: "Outside Beijing and Shanghai" },
    ],
    budgetItems: [
      "Tuition for every year of the course",
      "Campus hostel or off-campus rent",
      "Compulsory medical insurance",
      "Food and daily living",
      "Visa, residence permit and renewal fees",
      "Mandarin / HSK preparation",
      "Physical examination and document attestation",
      "Flights and local travel",
      "Registration and administrative charges",
    ],
    disclaimer:
      "Ask for the fee schedule for all years in writing, and separately confirm whether accommodation, insurance and the application fee are included. A scholarship that covers tuition may not cover accommodation or the stipend — read which type you have been offered.",
  },

  costOfLiving: {
    title: "Cost of Living in China",
    intro: "There is a wide gap between the first-tier cities and everywhere else, and campus accommodation narrows it considerably.",
    cities: [
      { name: "Beijing", costLevel: "High", note: "Capital; highest rent, strongest university concentration" },
      { name: "Shanghai", costLevel: "High", note: "Financial centre; comparable to Beijing" },
      { name: "Hangzhou", costLevel: "Moderate", note: "Technology hub, cheaper than Shanghai" },
      { name: "Nanjing", costLevel: "Moderate", note: "Large student city with good value" },
      { name: "Wuhan", costLevel: "Moderate-Low", note: "Major education centre in central China" },
      { name: "Harbin", costLevel: "Low", note: "Northern city; very affordable, very cold" },
    ],
  },

  scholarships: {
    title: "Scholarships in China for Indian Students",
    intro:
      "China funds international students at a scale few countries match. The important thing is knowing which route you are applying through, because the deadlines differ.",
    categories: [
      {
        title: "Government Scholarships",
        items: [
          "Chinese Government Scholarship (CSC) — Type A via the embassy, Type B via the university",
          "Full tuition, campus accommodation, monthly stipend and medical insurance where fully funded",
          "Provincial government scholarships (Beijing, Shanghai, Jiangsu and others)",
          "Confucius Institute scholarships for Chinese language and teaching",
          "Belt and Road / bilateral programme scholarships",
        ],
      },
      {
        title: "University Awards",
        items: [
          "University President's scholarships at the leading institutions",
          "Full or partial tuition waivers on academic merit",
          "Research assistantships at master's and PhD level",
          "First-year entrance scholarships",
          "Faculty-specific awards in engineering and the sciences",
        ],
      },
    ],
    disclaimer:
      "CSC deadlines fall months before ordinary admission deadlines and vary by university and by province. A partial award covering tuition only still leaves accommodation and living costs to fund. Read the award letter carefully and confirm what it actually includes.",
  },

  educationLoan: {
    title: "Education Loan for Studying in China",
    intro:
      "Loan requirements for China are usually modest, and a scholarship reduces them further. The right approach is to size the borrowing after you know the scholarship outcome, not before. We are not a lender and take no commission from any of them: the amount, the rate, the collateral requirement and the approval are all the lender's decision. We help you size the real funding gap, compare routes against your profile, and time the sanction letter to your visa appointment.",
    maxAmount: "Typically ₹15–30 Lakhs covers the course",
    interestRate: "Varies by lender and security offered",
    unsecuredMax: "Collateral-free options available at lower amounts",
    services: [
      "Calculating the true course cost net of any scholarship",
      "Comparing secured and collateral-free routes",
      "Co-applicant documentation guidance",
      "Timing the sanction letter for the visa application",
      "Disbursement aligned to the university's fee schedule",
      "Guidance on remitting fees to a Chinese university",
    ],
    highlights: [
      "Smaller borrowing than Western destinations",
      "Scholarships can reduce the loan substantially",
      "Interest deduction available under Section 80E",
      "Tuition, hostel and living costs can be covered",
      "Moratorium through the course plus the grace period",
    ],
    unsecuredLoan: {
      question: "Can I get a collateral-free loan for China?",
      answer:
        "Frequently yes, given the amounts involved. Lenders weigh the university's standing, the course and the co-applicant's income. A top-ranked university strengthens the case. Compare total repayment across lenders rather than the advertised rate alone.",
    },
    rejectedLoan: {
      question: "What if a lender declines?",
      answer:
        "Establish the reason before doing anything else — it is usually co-applicant income, existing obligations or incomplete paperwork, not the destination itself. A different lender, a stronger co-applicant or partial collateral commonly resolves it.",
    },
    phoneNumber: "+91 92118 18710",
  },

  admissionRequirements: {
    intro: "What Chinese universities typically ask Indian applicants for:",
    requirements: [
      "Class 10 and 12 marksheets and certificates",
      "Bachelor's transcripts and degree certificate for postgraduate entry",
      "Valid NEET result and NMC Eligibility Certificate for MBBS",
      "Passport with adequate remaining validity",
      "Study plan or personal statement",
      "Two academic recommendation letters for postgraduate study",
      "English proficiency evidence for English-medium programmes",
      "HSK score where the programme is taught in Mandarin",
      "Foreigner Physical Examination Form",
      "Non-criminal record certificate",
    ],
    importantNote:
      "For MBBS, only universities on China's Ministry of Education list may teach the programme in English to international students, and the NMC's FMGL Regulations, 2021 determine whether the degree can lead to registration in India. Most universities also require HSK Mandarin proficiency before the clinical years, because patients speak Mandarin. Confirm both the MOE listing and the language requirement in writing before you accept a seat.",
    aeoAnswer:
      "Indian students need Class 12 with science subjects, a valid NEET score and NMC Eligibility Certificate for MBBS, a passport, a study plan, a physical examination record and — for English-medium courses — English proficiency evidence. HSK Mandarin proficiency is required for Mandarin-taught programmes and for clinical years in medicine.",
  },

  applicationProcess: [
    { step: 1, title: "Profile and Eligibility Check", description: "Marks, NEET status, budget, and whether you are scholarship-competitive." },
    { step: 2, title: "Verify the MOE Listing", description: "For MBBS, confirm each shortlisted university is currently authorised to teach in English." },
    { step: 3, title: "University Shortlisting", description: "Balance ranking, total cost, language of instruction and scholarship odds." },
    { step: 4, title: "Scholarship Applications", description: "CSC and university awards, submitted on their own earlier deadlines." },
    { step: 5, title: "Admission Notice & JW202", description: "The university issues the admission notice and the JW202 visa form." },
    { step: 6, title: "Finance Arranged", description: "Loan sized against the cost that remains after any award." },
    { step: 7, title: "X1 Student Visa", description: "Apply with the JW202, admission notice and physical examination record." },
    { step: 8, title: "Arrival and Residence Permit", description: "Convert the X1 into a residence permit within 30 days of entry." },
  ],

  studentVisa: {
    heading: "China Student Visa (X1) for Indian Students",
    intro:
      "Courses longer than 180 days use the X1 visa. It is issued against the university's admission notice and the JW202 form, and is converted to a residence permit after you arrive.",
    journey: "Admission Notice + JW202 → Physical Examination → X1 Visa at the Consulate → Entry → Residence Permit Within 30 Days",
    requirements: [
      "Valid passport",
      "University admission notice",
      "JW202 (or JW201) form issued by the university",
      "Completed visa application form with photograph",
      "Foreigner Physical Examination Form",
      "Proof of funds or education loan sanction letter",
      "Accommodation details",
      "Visa fee payment",
    ],
    financialNote:
      "You must be able to evidence that tuition and living costs are funded. A scholarship award letter or a sanctioned education loan letter is normally accepted.",
    processingNote:
      "Allow four to six weeks from admission notice to visa. The step students most often miss is the residence permit: you must apply for it at the local exit-entry bureau within 30 days of arriving, and penalties for overstaying that window are real.",
  },

  workWhileStudying: {
    heading: "Working While Studying in China",
    intro: "Part-time work and internships are permitted, but only with prior permission.",
    details:
      "International students must obtain approval from both the university and the local exit-entry authority before taking any part-time work or off-campus internship, and it must be recorded on the residence permit. On-campus work and paid research assistantships are the most straightforward routes. Mandarin ability substantially widens what is available.",
    disclaimer:
      "Working without the required endorsement is treated seriously and can affect your permit. Do not budget around part-time earnings, and always go through the university's international office first.",
  },

  postStudyWork: {
    heading: "After Graduation in China",
    intro: "Staying on is possible but employer-led, and the medical path is entirely different.",
    pathway: "Graduate → Job offer and work permit sponsorship, or a short post-graduation stay permit → Employment residence permit",
    disclaimer:
      "Work permits in China are employer-sponsored and subject to a points-based assessment that weighs your degree, salary and experience. Mandarin ability matters a great deal in practice. Medical graduates intending to practise in India must clear the NMC's screening examination (FMGE, moving to NExT) and complete a supervised 12-month internship in India — plan and budget for that period from the start.",
  },

  cities: [
    { name: "Beijing", description: "The capital and the densest concentration of leading universities.", universities: "Tsinghua, Peking, Beihang", state: "Beijing" },
    { name: "Shanghai", description: "China's financial and commercial centre, strong for business and medicine.", universities: "Fudan, Shanghai Jiao Tong, Tongji", state: "Shanghai" },
    { name: "Hangzhou", description: "Technology and e-commerce hub with a lower cost base than Shanghai.", universities: "Zhejiang University", state: "Zhejiang" },
    { name: "Nanjing", description: "A historic university city popular with international students.", universities: "Nanjing University, Nanjing Medical University", state: "Jiangsu" },
    { name: "Wuhan", description: "Central China's education centre, with a large medical intake.", universities: "Wuhan University, HUST", state: "Hubei" },
  ],

  documents: {
    intro: "Documents to prepare, most of which need notarisation:",
    list: [
      "Passport",
      "Class 10 and 12 marksheets and certificates",
      "Bachelor's transcripts and degree certificate (postgraduate)",
      "NEET scorecard and NMC Eligibility Certificate (MBBS)",
      "Study plan or statement of purpose",
      "Two recommendation letters (postgraduate)",
      "English proficiency or HSK certificate",
      "Foreigner Physical Examination Form",
      "Non-criminal record certificate",
      "Passport photographs to specification",
      "Admission notice and JW202 form",
      "Scholarship award letter or loan sanction letter",
    ],
    disclaimer:
      "Notarisation and, for some universities, authentication take several weeks. Start them when the offer arrives. The physical examination form has a validity period — do not complete it too early.",
  },

  whyDD: [
    { title: "We Check the MOE List", description: "For medicine we verify current authorisation rather than repeating a brochure claim.", icon: "Shield" },
    { title: "NMC Conditions Tested", description: "We check the course structure against the FMGL 2021 requirements before you accept a seat.", icon: "BadgeCheck" },
    { title: "Scholarship Strategy", description: "CSC Type A and Type B work differently and close at different times — we plan around the real calendar.", icon: "Award" },
    { title: "University Comparison", description: "Ranking, total cost, teaching language and scholarship odds weighed together.", icon: "BookOpen" },
    { title: "Application Support", description: "Study plan, recommendations and documentation prepared properly.", icon: "FileText" },
    { title: "Loan Guidance", description: "Borrowing sized after the scholarship outcome, not before.", icon: "Wallet" },
    { title: "X1 Visa Documentation", description: "JW202, physical examination and residence-permit conversion handled in order.", icon: "Globe" },
    { title: "Support From Anywhere in India", description: "Online counselling wherever you are.", icon: "Monitor" },
  ],

  faqs: [
    {
      question: "Is an MBBS from China valid in India?",
      answer:
        "It can be, subject to two separate conditions. First, only universities on China's Ministry of Education list are authorised to teach MBBS in English to international students — a degree from outside that list is a serious problem. Second, the NMC's Foreign Medical Graduate Licentiate Regulations, 2021 require at least 54 months of study plus a 12-month internship at the same institution, taught in English, with a comparable curriculum, and a qualification that permits practice in China on the same terms as a Chinese citizen. You must then clear the NMC screening examination and complete a supervised 12-month internship in India.",
    },
    {
      question: "Do I need NEET to study MBBS in China?",
      answer:
        "Yes. A valid NEET qualification and an NMC Eligibility Certificate are required before you enrol. Obtain the eligibility certificate before joining, not afterwards.",
    },
    {
      question: "Do I have to learn Mandarin for MBBS in China?",
      answer:
        "For the clinical years, effectively yes. Even where the taught curriculum is in English, hospital patients speak Mandarin, and most universities require HSK proficiency before clinical rotations. Students who treat the language as optional in years one and two usually regret it in year three.",
    },
    {
      question: "How does the CSC scholarship work?",
      answer:
        "The Chinese Government Scholarship runs through two main channels: Type A, applied for via the Chinese embassy under the bilateral programme, and Type B, applied for directly to a participating university. A full award typically covers tuition, campus accommodation, a monthly stipend and medical insurance; partial awards cover less. Deadlines fall months before ordinary admission deadlines, often between December and March for a September start.",
    },
    {
      question: "How much does it cost to study in China?",
      answer:
        "Considerably less than Western destinations. Tuition varies by university tier and subject, with medicine and the top-ranked universities at the upper end and provincial universities at the lower end. Budget for tuition across all years, campus accommodation, compulsory insurance, living costs, visa and residence-permit fees and flights — and ask the university for the fee schedule in writing for every year.",
    },
    {
      question: "What is the JW202 form?",
      answer:
        "It is the visa application form for study in China, issued by the admitting university alongside the admission notice. You cannot apply for the X1 student visa without it. Universities issue it after you accept the offer, which is why late acceptance delays the visa.",
    },
    {
      question: "Can I work part-time while studying in China?",
      answer:
        "Yes, but only with prior approval from both the university and the local exit-entry authority, recorded on your residence permit. On-campus work and research assistantships are the simplest route. Working without that endorsement can affect your permit, so go through the international office first.",
    },
    {
      question: "Are Chinese degrees recognised internationally?",
      answer:
        "Degrees from the leading Chinese universities are widely recognised, and several sit in the global top 50 for engineering and computing. Recognition for regulated professions — medicine above all — is a separate question decided by the regulator in the country where you intend to practise, so check that specifically rather than relying on a ranking.",
    },
    {
      question: "Can I get an education loan for China?",
      answer:
        "Yes. Because tuition is low and scholarships are common, the amount required is usually modest, which helps approval. Wait for the scholarship outcome before finalising the loan amount so you do not borrow more than you need.",
    },
    {
      question: "When should I start my China application?",
      answer:
        "Eight to ten months before a September start, and earlier if you are applying for a CSC scholarship or a PhD. Scholarship rounds close early, supervisors need lead time, and notarisation of documents is slower than students expect.",
    },
  ],
};

const StudyInChinaPage = () => <GenericStudyPage data={DATA} />;
export default StudyInChinaPage;
