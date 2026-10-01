export interface University {
  name: string;
  location: string;
  province: string;
  qsRanking?: string;
  nationalRanking?: string;
  type: "University" | "College";
  popularPrograms: string[];
  logo: string;
  highlights: string[];
  avgTuition: string;
  coOpAvailable: boolean;
  pgwpEligible: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const CANADA_PAGE_DATA = {
  seo: {
    title: "Study in Canada for Indian Students 2026",
    description: "Study in Canada for Indian students with guidance on universities, courses, fees, scholarships, education loans, admissions, study permits and PGWP.",
    canonicalUrl: "https://www.dreamdestinationstudyabroad.com/study-in-canada",
    keywords: [
      "study in Canada for Indian students",
      "study in Canada",
      "study in Canada for Indians",
      "Canada education consultant",
      "Canada study abroad consultant",
      "Canada university admission consultant",
      "Canada student visa consultant",
      "Canada study permit consultant",
      "Canada student visa for Indian students",
      "universities in Canada for Indian students",
      "colleges in Canada for international students",
      "courses in Canada for Indian students",
      "cost of studying in Canada",
      "scholarships in Canada for Indian students",
      "education loan for Canada studies",
      "unsecured education loan for Canada",
      "education loan for Canada",
      "PGWP Canada",
      "Canada PGWP eligibility",
      "Canada study permit requirements",
      "Canada intakes",
      "study in Canada after graduation"
    ]
  },

  hero: {
    title: "Best Study in Canada for Indian Students 2026",
    subtitle: "How to pick the best course, university, study permit & post-graduation work plan",
    description: "Indian students continue to choose Canada for world-class education, practical co-op programs, and exceptional post-graduation career opportunities. At DreamDestination, we evaluate your profile to match the right DLI institution, PGWP-eligible program, and education loan solution.",
    primaryCta: "Check My Canada Study Options",
    secondaryCta: "Talk to a Canada Counsellor",
    badge: "🇨🇦 Updated for 2026 IRCC Rules (DLI, PAL/TAL & 24hr Work Rule)"
  },

  atAGlance: {
    title: "Canada Study Overview",
    stats: [
      { label: "Major Intakes", value: "Sept, Jan & May" },
      { label: "Study Levels", value: "Bachelor's, Master's, PG Diploma, PhD" },
      { label: "Work While Studying", value: "Up to 24 hrs/week off-campus" },
      { label: "Post-Study Work (PGWP)", value: "Up to 3 Years" },
      { label: "DLI Requirement", value: "Mandatory for Study Permit" },
      { label: "Living Expense Requirement", value: "CAD $23,448/year (Outside QC)" }
    ]
  },

  whyCanada: {
    title: "Why India's Students Select Canada",
    subtitle: "A global leader in academic excellence, research innovation, and career outcomes",
    reasons: [
      {
        title: "Globally Recognised Education",
        description: "Canadian universities and colleges deliver world-class degrees in CS, AI, Business, Engineering, Healthcare, and Data Science.",
        icon: "GraduationCap"
      },
      {
        title: "Practical Learning & Co-op",
        description: "Paid co-op placements and internships allow you to gain hands-on Canadian work experience while earning during your studies.",
        icon: "Briefcase"
      },
      {
        title: "Multicultural Environment",
        description: "Safe, welcoming provinces with thriving South Asian communities, cultural diversity, and high quality of living.",
        icon: "Users"
      },
      {
        title: "Flexible Work Rules (24 Hrs/Wk)",
        description: "Eligible international students can work off-campus up to 24 hours per week during term and full-time during breaks.",
        icon: "Clock"
      },
      {
        title: "Post-Graduation Work Permit (PGWP)",
        description: "Graduates from eligible DLI programs can obtain up to a 3-year open post-graduation work permit.",
        icon: "Award"
      },
      {
        title: "Research & Innovation",
        description: "State-of-the-art research centers in AI, clean technology, biomedical sciences, and advanced manufacturing.",
        icon: "Sparkles"
      }
    ]
  },

  universities: [
    {
      name: "University of Toronto",
      location: "Toronto",
      province: "Ontario",
      qsRanking: "QS #21",
      type: "University",
      popularPrograms: ["Computer Science", "Engineering", "Rotman MBA", "Data Science", "Life Sciences"],
      logo: "https://logo.clearbit.com/utoronto.ca",
      highlights: ["#1 University in Canada", "Canada's financial hub location", "Top 10 Global CS Program"],
      avgTuition: "CAD 45,000 - 60,000/yr",
      coOpAvailable: true,
      pgwpEligible: true
    },
    {
      name: "McGill University",
      location: "Montreal",
      province: "Quebec",
      qsRanking: "QS #30",
      type: "University",
      popularPrograms: ["Medicine", "Software Engineering", "Management", "Biomedical Sciences"],
      logo: "https://logo.clearbit.com/mcgill.ca",
      highlights: ["Historic academic reputation", "Dynamic bilingual city vibe", "Generous research funding"],
      avgTuition: "CAD 32,000 - 52,000/yr",
      coOpAvailable: true,
      pgwpEligible: true
    },
    {
      name: "University of British Columbia",
      location: "Vancouver",
      province: "British Columbia",
      qsRanking: "QS #34",
      type: "University",
      popularPrograms: ["Computer Science", "Business & Commerce", "Forestry & Environment", "Engineering"],
      logo: "https://logo.clearbit.com/ubc.ca",
      highlights: ["Beautiful coastal campus", "Silicon Vineyard tech cluster connections", "High graduate employability"],
      avgTuition: "CAD 40,000 - 55,000/yr",
      coOpAvailable: true,
      pgwpEligible: true
    },
    {
      name: "University of Alberta",
      location: "Edmonton",
      province: "Alberta",
      qsRanking: "QS #96",
      type: "University",
      popularPrograms: ["AI & Machine Learning", "Petroleum & Chemical Engineering", "Business", "Health Sciences"],
      logo: "https://logo.clearbit.com/ualberta.ca",
      highlights: ["Amii Artificial Intelligence hub", "Lower provincial cost of living", "Top-tier research facilities"],
      avgTuition: "CAD 28,000 - 42,000/yr",
      coOpAvailable: true,
      pgwpEligible: true
    },
    {
      name: "University of Waterloo",
      location: "Waterloo",
      province: "Ontario",
      qsRanking: "QS #112",
      type: "University",
      popularPrograms: ["Software Engineering", "Mathematics & CS", "Co-op Tech Programs", "Quantum Computing"],
      logo: "https://logo.clearbit.com/uwaterloo.ca",
      highlights: ["World's largest co-op program", "#1 for Tech Founders & Startups", "Strong ties to Google & Apple"],
      avgTuition: "CAD 38,000 - 54,000/yr",
      coOpAvailable: true,
      pgwpEligible: true
    },
    {
      name: "Western University",
      location: "London",
      province: "Ontario",
      qsRanking: "QS #114",
      type: "University",
      popularPrograms: ["Ivey MBA", "Engineering", "Health Sciences", "Social Sciences"],
      logo: "https://logo.clearbit.com/uwo.ca",
      highlights: ["Ivey Business School prestige", "Vibrant student campus life", "Strong alumni network"],
      avgTuition: "CAD 34,000 - 48,000/yr",
      coOpAvailable: true,
      pgwpEligible: true
    },
    {
      name: "McMaster University",
      location: "Hamilton",
      province: "Ontario",
      qsRanking: "QS #189",
      type: "University",
      popularPrograms: ["Health Sciences", "Mechatronics Engineering", "DeGroote MBA", "Computer Science"],
      logo: "https://logo.clearbit.com/mcmaster.ca",
      highlights: ["Problem-based learning leader", "Proximity to Greater Toronto Area", "High research intensity"],
      avgTuition: "CAD 32,000 - 46,000/yr",
      coOpAvailable: true,
      pgwpEligible: true
    },
    {
      name: "Université de Montréal",
      location: "Montreal",
      province: "Quebec",
      qsRanking: "QS #141",
      type: "University",
      popularPrograms: ["MILA AI Institute", "Computer Science", "Public Health", "Law"],
      logo: "https://logo.clearbit.com/umontreal.ca",
      highlights: ["Global AI research epicenter (MILA)", "Competitive tuition rates", "Rich cultural immersion"],
      avgTuition: "CAD 24,000 - 36,000/yr",
      coOpAvailable: false,
      pgwpEligible: true
    },
    {
      name: "Queen's University",
      location: "Kingston",
      province: "Ontario",
      qsRanking: "QS #209",
      type: "University",
      popularPrograms: ["Smith School of Business", "Engineering", "Computing", "Health Sciences"],
      logo: "https://logo.clearbit.com/queensu.ca",
      highlights: ["Top-ranked business programs", "High graduation success rate", "Tight-knit academic community"],
      avgTuition: "CAD 36,000 - 48,000/yr",
      coOpAvailable: true,
      pgwpEligible: true
    },
    {
      name: "Simon Fraser University",
      location: "Burnaby / Vancouver",
      province: "British Columbia",
      qsRanking: "QS #318",
      type: "University",
      popularPrograms: ["Computing Science", "Interactive Arts & Tech", "Beedie Business", "Mechatronics"],
      logo: "https://logo.clearbit.com/sfu.ca",
      highlights: ["Trimester system for fast graduation", "Comprehensive co-op network", "Stunning mountain campus"],
      avgTuition: "CAD 30,000 - 42,000/yr",
      coOpAvailable: true,
      pgwpEligible: true
    },
    {
      name: "Seneca Polytechnic",
      location: "Toronto",
      province: "Ontario",
      qsRanking: "Top College",
      type: "College",
      popularPrograms: ["Applied Computer Science", "Business Analytics", "Biotechnology", "Supply Chain"],
      logo: "https://logo.clearbit.com/senecapolytechnic.ca",
      highlights: ["Career-focused diplomas & degrees", "Practical lab training", "Strong GTA employer ties"],
      avgTuition: "CAD 16,000 - 22,000/yr",
      coOpAvailable: true,
      pgwpEligible: true
    },
    {
      name: "Humber Polytechnic",
      location: "Toronto",
      province: "Ontario",
      qsRanking: "Top College",
      type: "College",
      popularPrograms: ["Wireless Telecom", "Project Management", "Healthcare Admin", "Global Business"],
      logo: "https://logo.clearbit.com/humber.ca",
      highlights: ["Paid industry placements", "Modern tech labs", "High graduate employment rate"],
      avgTuition: "CAD 17,000 - 24,000/yr",
      coOpAvailable: true,
      pgwpEligible: true
    },
    {
      name: "Conestoga College",
      location: "Kitchener-Waterloo",
      province: "Ontario",
      qsRanking: "Top College",
      type: "College",
      popularPrograms: ["Applied Tech", "IT Innovation", "Engineering Systems", "Health Sciences"],
      logo: "https://logo.clearbit.com/conestogac.on.ca",
      highlights: ["Waterloo Tech Corridor location", "Hands-on technical focus", "Project-based curriculum"],
      avgTuition: "CAD 16,000 - 21,000/yr",
      coOpAvailable: true,
      pgwpEligible: true
    },
    {
      name: "George Brown College",
      location: "Downtown Toronto",
      province: "Ontario",
      qsRanking: "Top College",
      type: "College",
      popularPrograms: ["Cybersecurity", "Culinary & Hospitality", "Construction Mgmt", "Design"],
      logo: "https://logo.clearbit.com/georgebrown.ca",
      highlights: ["Downtown Toronto campus", "Industry partner sponsorships", "Applied degree options"],
      avgTuition: "CAD 17,000 - 23,000/yr",
      coOpAvailable: true,
      pgwpEligible: true
    },
    {
      name: "Langara College",
      location: "Vancouver",
      province: "British Columbia",
      qsRanking: "Top College",
      type: "College",
      popularPrograms: ["University Transfer Programs", "Web & Data Development", "Business", "Nursing"],
      logo: "https://logo.clearbit.com/langara.ca",
      highlights: ["Pathway to UBC and SFU", "Affordable tuition in Vancouver", "Small class sizes"],
      avgTuition: "CAD 18,000 - 24,000/yr",
      coOpAvailable: true,
      pgwpEligible: true
    }
  ],

  universityVsCollege: {
    title: "University vs College in Canada: Which Is Right For You?",
    subtitle: "Understanding academic degrees vs applied career-oriented diplomas",
    universities: {
      title: "Canadian Universities",
      offers: ["Bachelor's Degrees", "Master's Degrees", "PhDs & Doctoral Degrees", "Professional & Research Degrees"],
      focus: "Theory, research, critical thinking, academic specialization, and global post-grad pathways.",
      bestFor: "Students seeking Master's/PhD degrees, research careers, or corporate leadership."
    },
    colleges: {
      title: "Canadian Colleges / Polytechnics",
      offers: ["2-3 Year Diplomas", "1-Year Graduate Certificates", "Applied Degrees", "Co-op & Apprenticeships"],
      focus: "Hands-on practical skills, industry certifications, co-op work placements, and fast-track employment.",
      bestFor: "Students seeking affordable tuition, rapid job entry, and practical skill mastery."
    },
    keyAdvice: "Both pathways can lead to successful careers! However, always verify that your specific program at a Designated Learning Institution (DLI) is PGWP-eligible before enrolling."
  },

  popularCourses: [
    {
      category: "Computer Science & IT",
      courses: ["Computer Science", "Information Technology", "Software Engineering", "Artificial Intelligence", "Data Science", "Cyber Security", "Information Systems"]
    },
    {
      category: "Business & Management",
      courses: ["MBA", "Business Management", "Business Analytics", "Finance", "Marketing", "International Business", "Supply Chain Management"]
    },
    {
      category: "Engineering & Applied Tech",
      courses: ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Computer Engineering", "Industrial Engineering", "Engineering Management"]
    },
    {
      category: "Data & Analytics",
      courses: ["Data Science", "Business Analytics", "Data Analytics", "Applied Artificial Intelligence", "Applied Statistics"]
    },
    {
      category: "Healthcare & Life Sciences",
      courses: ["Public Health", "Biotechnology", "Biomedical Sciences", "Healthcare Management", "Nursing", "Life Sciences"]
    },
    {
      category: "Specialized Fields",
      courses: ["Hospitality & Tourism", "Architecture", "Psychology", "Economics", "Environmental Studies", "Media & Communication", "Design"]
    }
  ],

  intakes: [
    {
      season: "Fall Intake (September)",
      status: "Major Intake",
      description: "Primary admission cycle with 100% of programs open. Recommended for maximum course choices and scholarship availability.",
      timeline: "Apply 8-12 months prior (Oct - Mar)"
    },
    {
      season: "Winter Intake (January)",
      status: "Secondary Intake",
      description: "Popular secondary intake offered by major universities and colleges for selected Master's, Diploma, and Degree programs.",
      timeline: "Apply 6-8 months prior (Jun - Sep)"
    },
    {
      season: "Spring/Summer Intake (May/June)",
      status: "Limited Intake",
      description: "Available at select colleges and universities for specialized short courses, language programs, and rolling diploma intakes.",
      timeline: "Apply 5-7 months prior (Oct - Dec)"
    }
  ],

  timelineSteps: [
    { phase: "12–18 Months Before", title: "Profile Evaluation & Course Selection", details: "Research DLIs, compare tuition fees, verify PGWP eligibility, and assess your budget." },
    { phase: "9–12 Months Before", title: "Test Prep & Document Ready", details: "Take IELTS (6.5+) or PTE (60+). Prepare SOP, Letter of Intent, academic transcripts, and LORs." },
    { phase: "6–9 Months Before", title: "Submit Applications", details: "Apply to shortlisted DLIs. Secure offer letters and evaluate financial funding & loan options." },
    { phase: "After Admission", title: "PAL/TAL & Permit Application", details: "Obtain Provincial Attestation Letter (if required) and submit Study Permit application to IRCC." },
    { phase: "Pre-Departure", title: "Visa Approval & Travel Prep", details: "Book accommodation, arrange GIC/financial proof, purchase health insurance, and attend pre-departure briefing." }
  ],

  costOfStudy: {
    title: "Cost of Studying in Canada for Indian Students",
    breakdown: [
      { type: "University Undergraduate Degree", cost: "CAD 30,000 - 55,000 / year", approxInr: "₹18 Lakhs - ₹33 Lakhs" },
      { type: "University Master's Degree", cost: "CAD 22,000 - 45,000 / year", approxInr: "₹13 Lakhs - ₹27 Lakhs" },
      { type: "College Diploma / Graduate Cert", cost: "CAD 16,000 - 25,000 / year", approxInr: "₹10 Lakhs - ₹15 Lakhs" },
      { type: "Living Expenses (IRCC Requirement)", cost: "CAD 23,448 / year (Outside QC)", approxInr: "₹14.2 Lakhs" },
      { type: "Health Insurance & Misc", cost: "CAD 800 - 1,500 / year", approxInr: "₹50,000 - ₹90,000" }
    ],
    proofOfFundsNote: "Starting September 2026, IRCC requires applicants outside Quebec to show CAD $23,448 for living expenses in addition to 1st year tuition fees and return travel costs."
  },

  educationLoan: {
    title: "Education Loan for Studying in Canada",
    subtitle: "Comprehensive financing options for tuition, living costs, and GIC deposits",
    maxAmount: "Set by the lender",
    interestRate: "Set by the lender",
    unsecuredMax: "Route available",
    repaymentTenure: "Up to 15 Years",
    highlights: [
      "100% funding for tuition, GIC deposit, living expenses & flight tickets",
      "No collateral loans available for top Canadian DLIs",
      "Pre-visa disbursement for GIC payment & Study Permit financial proof",
      "Tax benefits under Section 80E of Income Tax Act",
      "Fast approval turnaround within 7 to 10 working days"
    ]
  },

  dliAndPalInfo: {
    dliTitle: "What is a Designated Learning Institution (DLI)?",
    dliDesc: "A DLI is an educational institution approved by a provincial or territorial government to host international students. All study permit applicants must have an acceptance letter from a DLI. IMPORTANT: Not all DLI programs are PGWP-eligible. We help you verify both!",
    palTitle: "2026 Provincial Attestation Letter (PAL/TAL) Rules",
    palDesc: "Most study permit applicants require a Provincial Attestation Letter (PAL) or Territorial Attestation Letter (TAL). EXEMPTION: Starting January 1, 2026, students entering eligible Master's or Doctoral degree programs at public DLIs generally do NOT require a PAL/TAL (except in Quebec)."
  },

  pgwpInfo: {
    title: "Post-Graduation Work Permit (PGWP) in Canada",
    subtitle: "Gain valuable Canadian work experience after graduation",
    keyPoints: [
      "Master's Graduates: Eligible for a 3-Year PGWP even if the Master's program is under 2 years (minimum 8 months duration required).",
      "Degree & Diploma Graduates: PGWP length corresponds to study duration (up to 3 years max).",
      "2026 Field of Study Rules: For non-degree programs, PGWP eligibility may depend on IRCC's frozen CIP field-of-study list.",
      "Open Work Permit: Allows you to work for any employer in Canada across any province."
    ]
  },

  cities: [
    { name: "Toronto", province: "Ontario", description: "Canada's financial & tech powerhouse with major bank headquarters and top tech startups.", Universities: "U of T, York, TMU, Seneca, Humber" },
    { name: "Vancouver", province: "British Columbia", description: "Breathtaking coastal city with a massive tech ecosystem and mild winter climate.", Universities: "UBC, SFU, Langara" },
    { name: "Montreal", province: "Quebec", description: "Global AI research hub with affordable student living and a rich European cultural vibe.", Universities: "McGill, U de Montréal, Concordia" },
    { name: "Calgary", province: "Alberta", description: "Booming energy & tech hub with lower income tax and proximity to the Rocky Mountains.", Universities: "U of Calgary, Mount Royal" },
    { name: "Edmonton", province: "Alberta", description: "Major AI & health sciences center with affordable student housing options.", Universities: "University of Alberta" },
    { name: "Waterloo", province: "Ontario", description: "The 'Silicon Valley of Canada', famous for quantum computing and engineering co-ops.", Universities: "Waterloo, Conestoga" }
  ],

  faqs: [
    {
      question: "1. Is Canada good for Indian students?",
      answer: "Canada is an outstanding choice for Indian students, offering globally recognized degrees, practical co-op training, 24 hr/wk work permissions during study, and clear post-graduation work opportunities (PGWP)."
    },
    {
      question: "2. How much does it cost to study in Canada?",
      answer: "Undergraduate university tuition averages CAD 30,000–55,000/yr (₹18-33L), Master's degrees average CAD 22,000–45,000/yr (₹13-27L), and college diplomas cost CAD 16,000–25,000/yr (₹10-15L). Living expense proof required by IRCC outside Quebec is CAD $23,448/yr."
    },
    {
      question: "3. What are the most popular courses in Canada?",
      answer: "Popular fields include Computer Science, Software Engineering, Data Science, AI, MBA, Business Analytics, Healthcare Management, Civil/Mechanical Engineering, and Supply Chain Management."
    },
    {
      question: "4. What are the main intakes in Canada?",
      answer: "The major intakes are Fall (September - largest selection) and Winter (January). A limited number of programs also offer Spring/Summer (May) intakes."
    },
    {
      question: "5. Can I study in Canada without IELTS?",
      answer: "Most Canadian DLIs require IELTS Academic (6.5 overall with no band < 6.0) or PTE Academic (60+). Some institutions may accept TOEFL iBT or Duolingo, or offer ELP waivers for English-medium graduates."
    },
    {
      question: "6. Can Indian students get scholarships in Canada?",
      answer: "Yes! Institutional entrance scholarships, provincial merit awards, research assistantships (GRA/GTA), and Government of Canada scholarships (EduCanada) are available for high-achieving applicants."
    },
    {
      question: "7. Can I get an education loan for Canada?",
      answer: "We help with both secured and unsecured routes, but we are not a lender and take no commission from one. The amount, the rate, whether collateral is needed and the approval itself are decided by the bank or NBFC, against your course and DLI, your co-applicant's income and credit history, and what collateral is on the table. We size the real funding gap first, prepare the file, and time the sanction so it lands before your visa appointment."
    },
    {
      question: "8. Can I get an unsecured education loan for Canada?",
      answer: "Yes, eligible students with strong academic records and qualified co-applicants can secure collateral-free loans up to ₹50 Lakhs from leading NBFCs and international lenders."
    },
    {
      question: "9. What happens if my Canada education loan is rejected?",
      answer: "Don't panic. Rejections usually happen due to documentation issues or co-applicant income limits. DreamDestination re-evaluates your profile with alternative NBFCs and international funding partners."
    },
    {
      question: "10. What is a DLI in Canada?",
      answer: "A Designated Learning Institution (DLI) is a school approved by a Canadian provincial government to host international students. A valid DLI offer letter is required for a study permit."
    },
    {
      question: "11. Does every DLI offer PGWP-eligible programmes?",
      answer: "No! Having a DLI designation does not automatically mean all of its programs qualify for a PGWP. We verify your course's PGWP status before you apply."
    },
    {
      question: "12. What is a PGWP?",
      answer: "A Post-Graduation Work Permit (PGWP) is an open work permit that allows eligible international graduates to gain Canadian work experience for up to 3 years after finishing their studies."
    },
    {
      question: "13. Can a master's student get a 3-year PGWP?",
      answer: "Yes! Graduates of eligible Master's degree programs of at least 8 months duration can qualify for a 3-year PGWP under current IRCC rules."
    },
    {
      question: "14. Can college students get PGWP?",
      answer: "Many college diploma and graduate certificate graduates qualify for a PGWP, provided the institution and program field meet IRCC eligibility criteria."
    },
    {
      question: "15. Can international students work while studying in Canada?",
      answer: "Yes. Eligible international students with a valid study permit can work off-campus up to 24 hours per week during regular academic terms and full-time during scheduled breaks."
    },
    {
      question: "16. What is PAL/TAL?",
      answer: "A Provincial Attestation Letter (PAL) or Territorial Attestation Letter (TAL) is an official attestation from a Canadian province required for undergraduate study permit applications."
    },
    {
      question: "17. Do master's students need PAL/TAL in Canada?",
      answer: "Starting January 1, 2026, eligible Master's and PhD degree applicants at public DLIs are exempt from requiring a PAL/TAL (except for Quebec)."
    },
    {
      question: "18. How much money do I need for a Canada study permit?",
      answer: "Applicants outside Quebec must demonstrate CAD $23,448 per year for living expenses, in addition to 1st year tuition fees and travel costs."
    },
    {
      question: "19. Can I stay in Canada after graduation?",
      answer: "Yes, eligible graduates can apply for a PGWP to gain Canadian work experience, which helps build points toward permanent residence (PR) pathways like Express Entry."
    },
    {
      question: "20. Is Canada better than the USA or UK?",
      answer: "Canada offers high quality of life, 24 hr/wk work rights, and flexible PGWP options. The best choice depends on your specific budget, academic profile, and long-term career goals."
    }
  ]
};
