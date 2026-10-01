// ============================================================
// AUSTRALIA PAGE — COMPREHENSIVE DATA
// SEO/GEO/AEO Optimized Content for "Study in Australia for Indian Students"
// ============================================================

export interface AustraliaUniversity {
  name: string;
  location: string;
  state: string;
  qsRanking?: string;
  type: "Public" | "Private";
  popularPrograms: string[];
  logo: string;
  highlights: string[];
  avgTuition: string;
  postStudyWork: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const AUSTRALIA_PAGE_DATA = {
  seo: {
    title: "Study in Australia for Indian Students 2026",
    description:
      "Study in Australia for Indian students with guidance on universities, courses, fees, scholarships, education loans, admissions, student visas and post-study work.",
    canonicalUrl: "https://www.dreamdestinationstudyabroad.com/study-in-australia",
    keywords: [
      "study in Australia for Indian students",
      "study in Australia",
      "study in Australia for Indians",
      "Australia education consultant",
      "Australia study abroad consultant",
      "Australia university admission consultant",
      "Australia student visa consultant",
      "Australia student visa for Indian students",
      "Australia study visa consultant",
      "universities in Australia for Indian students",
      "courses in Australia for international students",
      "cost of studying in Australia",
      "scholarships in Australia for Indian students",
      "education loan for Australia studies",
      "unsecured education loan for Australia",
      "Australia student visa requirements",
      "Australia student visa subclass 500",
      "Genuine Student requirement Australia",
      "Australia intakes",
      "post study work Australia",
      "temporary graduate visa Australia",
      "study in Australia after graduation",
    ],
  },

  hero: {
    title: "Best Study in Australia for Indian Students 2026",
    subtitle:
      "Pick the correct course, university & career path",
    description:
      "Australia has world-renowned universities, a wide range of study choices, and a multicultural atmosphere that is welcoming to international students. However, selection of Australia is just the first step.",
    questions: [
      "Which course would be suitable for your academic experiences?",
      "So what university would you like to attend?",
      "How much do you expect to spend studying?",
      "Can you get an education loan?",
      "What are the requirements for a student visa?",
      "In what way is the Genuine Student requirement achieved?",
      "What could be possible post-study choices?",
    ],
    valueProposition:
      "At DreamDestination we assist Indian students in making these choices with personalised online counselling — choice of course, choice of university, admissions to universities, financial planning for education, student visa preparation, and more.",
    primaryCta: "Check My Australia Study Options",
    secondaryCta: "Speak with an Australian Counsellor",
    badge: "🇦🇺 Updated for 2026 Genuine Student & Visa Rules",
  },

  atAGlance: {
    title: "Australia Study Overview",
    stats: [
      { label: "Major Intakes", value: "February & July" },
      { label: "Study Levels", value: "Bachelor's, Master's, MBA, PhD" },
      { label: "Student Visa", value: "Subclass 500" },
      { label: "Visa Assessment", value: "Genuine Student (GS)" },
      { label: "Post-Study Work", value: "Temporary Graduate Visa" },
      { label: "Visa Fee (2026)", value: "AUD $2,500" },
    ],
  },

  whyAustralia: {
    title: "Why Study in Australia?",
    subtitle:
      "Australia provides a blend of internationally recognised education, a range of education programs, and a multicultural student environment.",
    reasons: [
      {
        title: "Globally Recognised Universities",
        description:
          "Several Australian universities are among the best in the world. Study Australia features nine Australian universities in its top 100 worldwide based on QS rankings.",
        icon: "GraduationCap",
      },
      {
        title: "Broad Selection of Courses",
        description:
          "Students have the option of studying programmes in Computer Science, AI, Data Science, Engineering, Business, Finance, Healthcare, Biotechnology, Architecture, Hospitality, and Education.",
        icon: "BookOpen",
      },
      {
        title: "Practical & Industry-Focused Learning",
        description:
          "Depending on the programme, students will have opportunities for industry projects, internships, practical training, work-integrated learning, and research.",
        icon: "Briefcase",
      },
      {
        title: "Multicultural Environment",
        description:
          "Australia has many international students, providing exposure to other cultures, learning environments, and professional networks.",
        icon: "Users",
      },
      {
        title: "Strong Student Support",
        description:
          "Institutions in Australia offer services for international students including academic, accommodation, wellbeing, and career advice.",
        icon: "Shield",
      },
      {
        title: "Career & Post-Study Options",
        description:
          "Depending on their qualification and circumstances, eligible graduates may be able to apply for a temporary graduate visa. Pathways vary according to Australian immigration policy.",
        icon: "Award",
      },
    ],
  },

  whoShouldConsider: {
    heading: "Is Australia the Right Study Destination for You?",
    intro: "Australia could be a possibility if you:",
    points: [
      "Want international recognition of qualifications",
      "Prefer an English-speaking destination",
      "Have an interest in technology, engineering, business, or healthcare",
      "Desire hands-on, career-focused learning",
      "Are thinking about a bachelor's or master's degree",
      "Are interested in a multicultural setting",
      "Should consider scholarships and funding opportunities",
      "Need education loan assistance",
      "Want to know more about potential post-study employment opportunities",
      "Prefer comparing several institutions rather than choosing right away",
    ],
    disclaimer:
      "Your academic profile, course selection, finances, English language skills, and future plans all play a role in determining the right fit.",
    cta: { text: "Get My Australia Profile Assessment", href: "#lead-form" },
  },

  universitySelection: {
    heading: "How to Choose the Right University in Australia",
    intro: "Avoid choosing a university merely due to its rankings. Consider:",
    factors: [
      { title: "Course Fit", description: "Is the curriculum relevant to your career goal?" },
      { title: "Entry Requirements", description: "Are you academically and English-language eligible?" },
      { title: "Total Cost", description: "Take into account living costs and tuition." },
      { title: "Location", description: "Choose between different places to live, transport, lifestyle, and employment." },
      { title: "Industry Exposure", description: "Look at internships, placements, projects, and employer relations." },
      { title: "Scholarships", description: "Review the university funding available." },
      { title: "Visa & Course Considerations", description: "Do your homework to ensure that you meet the requirements before making a commitment." },
      { title: "Post-Study Eligibility", description: "If applicable, assess the qualification against current Temporary Graduate visa requirements." },
    ],
  },

  universities: [
    {
      name: "University of Melbourne",
      location: "Melbourne",
      state: "Victoria",
      qsRanking: "QS #14 World",
      type: "Public",
      popularPrograms: ["Business", "Engineering", "Computer Science", "Medicine", "Sciences"],
      logo: "https://logo.clearbit.com/unimelb.edu.au",
      highlights: ["#1 University in Australia", "Strong research output", "Melbourne's innovation hub"],
      avgTuition: "AUD 40,000 - 55,000/yr",
      postStudyWork: true,
    },
    {
      name: "University of Sydney",
      location: "Sydney",
      state: "New South Wales",
      qsRanking: "QS #18 World",
      type: "Public",
      popularPrograms: ["Business", "Engineering/IT", "Health", "Architecture", "Law"],
      logo: "https://logo.clearbit.com/sydney.edu.au",
      highlights: ["Historic prestige", "Sydney business hub", "Diverse student community"],
      avgTuition: "AUD 42,000 - 56,000/yr",
      postStudyWork: true,
    },
    {
      name: "Australian National University (ANU)",
      location: "Canberra",
      state: "ACT",
      qsRanking: "QS #30 World",
      type: "Public",
      popularPrograms: ["Sciences", "Engineering", "Economics", "Policy", "Computer Science"],
      logo: "https://logo.clearbit.com/anu.edu.au",
      highlights: ["Top research university", "Capital city advantages", "Strong policy & economics"],
      avgTuition: "AUD 38,000 - 50,000/yr",
      postStudyWork: true,
    },
    {
      name: "University of Queensland (UQ)",
      location: "Brisbane",
      state: "Queensland",
      qsRanking: "QS #40 World",
      type: "Public",
      popularPrograms: ["Engineering", "Business", "Life Sciences", "Health", "Environmental Sciences"],
      logo: "https://logo.clearbit.com/uq.edu.au",
      highlights: ["Beautiful campus", "Strong STEM programs", "Queensland research leader"],
      avgTuition: "AUD 35,000 - 48,000/yr",
      postStudyWork: true,
    },
    {
      name: "Monash University",
      location: "Melbourne",
      state: "Victoria",
      qsRanking: "QS #37 World",
      type: "Public",
      popularPrograms: ["Engineering", "IT", "Business", "Pharmacy", "Health"],
      logo: "https://logo.clearbit.com/monash.edu",
      highlights: ["Australia's largest university", "Global campus network", "Strong industry links"],
      avgTuition: "AUD 37,000 - 52,000/yr",
      postStudyWork: true,
    },
    {
      name: "UNSW Sydney",
      location: "Sydney",
      state: "New South Wales",
      qsRanking: "QS #19 World",
      type: "Public",
      popularPrograms: ["Engineering", "Computer Science", "Business", "Architecture", "Sciences"],
      logo: "https://logo.clearbit.com/unsw.edu.au",
      highlights: ["Top 20 globally", "Strong engineering & CS", "Sydney tech connections"],
      avgTuition: "AUD 40,000 - 54,000/yr",
      postStudyWork: true,
    },
    {
      name: "University of Technology Sydney (UTS)",
      location: "Sydney",
      state: "New South Wales",
      qsRanking: "QS #88 World",
      type: "Public",
      popularPrograms: ["Technology", "Business", "Design", "Engineering", "Applied Sciences"],
      logo: "https://logo.clearbit.com/uts.edu.au",
      highlights: ["Practice-oriented learning", "Central Sydney location", "Industry partnerships"],
      avgTuition: "AUD 32,000 - 45,000/yr",
      postStudyWork: true,
    },
    {
      name: "University of Adelaide",
      location: "Adelaide",
      state: "South Australia",
      qsRanking: "QS #89 World",
      type: "Public",
      popularPrograms: ["Engineering", "Computer Science", "Business", "Health", "Sciences"],
      logo: "https://logo.clearbit.com/adelaide.edu.au",
      highlights: ["Group of Eight member", "Affordable city", "Strong research focus"],
      avgTuition: "AUD 34,000 - 46,000/yr",
      postStudyWork: true,
    },
    {
      name: "University of Western Australia (UWA)",
      location: "Perth",
      state: "Western Australia",
      qsRanking: "QS #77 World",
      type: "Public",
      popularPrograms: ["Engineering", "Business", "Sciences", "Health", "Marine Biology"],
      logo: "https://logo.clearbit.com/uwa.edu.au",
      highlights: ["Group of Eight member", "Beautiful Perth campus", "Strong mining & resources links"],
      avgTuition: "AUD 33,000 - 46,000/yr",
      postStudyWork: true,
    },
    {
      name: "RMIT University",
      location: "Melbourne",
      state: "Victoria",
      qsRanking: "QS #123 World",
      type: "Public",
      popularPrograms: ["Technology", "Design", "Engineering", "Business", "Applied Programs"],
      logo: "https://logo.clearbit.com/rmit.edu.au",
      highlights: ["Industry-connected learning", "Design & tech excellence", "Central Melbourne campus"],
      avgTuition: "AUD 30,000 - 42,000/yr",
      postStudyWork: true,
    },
  ] as AustraliaUniversity[],

  popularCourses: [
    {
      category: "Computer Science & IT",
      icon: "Monitor",
      courses: ["Computer Science", "Information Technology", "Software Engineering", "Artificial Intelligence", "Data Science", "Cyber Security", "Information Systems"],
    },
    {
      category: "Engineering",
      icon: "Cog",
      courses: ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Electronics Engineering", "Aerospace Engineering", "Engineering Management"],
    },
    {
      category: "Business & Management",
      icon: "TrendingUp",
      courses: ["MBA", "Business Management", "International Business", "Marketing", "Finance", "Business Analytics", "Supply Chain Management"],
    },
    {
      category: "Data & Analytics",
      icon: "BarChart",
      courses: ["Data Science", "Business Analytics", "Data Analytics", "Artificial Intelligence", "Machine Learning"],
    },
    {
      category: "Healthcare & Life Sciences",
      icon: "Heart",
      courses: ["Public Health", "Biotechnology", "Biomedical Science", "Healthcare Management", "Nursing", "Life Sciences"],
    },
    {
      category: "Other Popular Areas",
      icon: "Palette",
      courses: ["Architecture", "Construction Management", "Hospitality", "Tourism", "Education", "Psychology", "Environmental Science", "Design"],
    },
  ],

  mastersInAustralia: {
    heading: "Master's in Australia for Indian Students",
    description:
      "Master's programs are available in Australia for technology and engineering, business, healthcare, science, and various other fields.",
    considerations: [
      "Academic background & previous degree",
      "GPA / percentage",
      "English-language requirements (IELTS/PTE/TOEFL)",
      "Relevant experience",
      "Program duration",
      "Curriculum & specialisation",
      "Tuition fees",
      "Scholarships available",
      "Living costs",
      "Career goals",
      "Post-study applicability of the qualification",
    ],
    note:
      "Students should choose a master's because of their academic background and career goals, rather than just because it is a popular option for students from abroad.",
    cta: { text: "See My Master's Options", href: "#lead-form" },
  },

  intakes: [
    {
      season: "February Intake",
      status: "Major Intake",
      description:
        "One of the big times of admission and frequently has a wide selection of courses. Recommended for maximum programme choices.",
      timeline: "Apply 8–12 months prior (Mar – Jun)",
    },
    {
      season: "July Intake",
      status: "Major Intake",
      description:
        "Another big intake for various institutes and courses. Good alternative to February.",
      timeline: "Apply 6–8 months prior (Nov – Feb)",
    },
    {
      season: "Other Intakes",
      status: "Programme-Specific",
      description:
        "A number of programmes and providers may have other start dates. Not all courses are offered in all intakes.",
      timeline: "Check individual university deadlines",
    },
  ],

  timeline: [
    {
      phase: "12–18 Months Before",
      title: "Research & Planning",
      details: "Choose study level, research courses, compare universities, check eligibility, estimate your budget.",
    },
    {
      phase: "9–12 Months Before",
      title: "Test Prep & Documentation",
      details: "Prepare English-language test, shortlist universities, prepare SOP/GS information, arrange LORs, research scholarships, explore education loans.",
    },
    {
      phase: "6–9 Months Before",
      title: "Submit Applications",
      details: "Submit applications, track offers, compare universities, plan finances.",
    },
    {
      phase: "After Admission",
      title: "Accept Offer & CoE",
      details: "Accept your offer, meet conditions, arrange documents, obtain Confirmation of Enrolment (CoE), complete student visa application.",
    },
    {
      phase: "Pre-Departure",
      title: "Visa, Accommodation & Travel",
      details: "Finalise visa, arrange accommodation, travel, finances, and pre-departure preparation.",
    },
  ],

  costOfStudy: {
    title: "Cost of Studying in Australia for Indian Students",
    intro:
      "There is no single cost for studying in Australia. The total cost is based on University + Course + Study Level + City + Lifestyle.",
    budgetItems: [
      "Tuition fees",
      "Accommodation",
      "Food",
      "Transportation",
      "Overseas Student Health Cover (OSHC)",
      "Study materials",
      "Visa fees",
      "Travel",
      "Personal expenses",
    ],
    breakdown: [
      { level: "Bachelor's", cost: "AUD 20,000–50,000+/year", note: "Varies by university and programme" },
      { level: "Master's", cost: "AUD 22,000–55,000+/year", note: "STEM & business programmes may vary" },
      { level: "MBA", cost: "AUD 25,000–65,000+/year", note: "Top business schools command premium fees" },
      { level: "PhD", cost: "Very variable", note: "Funding & scholarships may be available" },
    ],
    disclaimer:
      "All tuition fees are subject to change according to the institution and programme. Students should make sure to check the individual course fee rather than relying on a single national average. Study Australia confirms that tuition will differ based on the education provider, study level, and location.",
  },

  costOfLiving: {
    title: "Cost of Living in Australia for Indian Students",
    intro:
      "The cost of living varies greatly between cities. Study Australia states that the minimum amount required for visa purposes is only the minimum living cost.",
    cities: [
      { name: "Sydney", costLevel: "Very High", note: "Key business, finance, technology & education centre" },
      { name: "Melbourne", costLevel: "High", note: "Universities, culture, technology, business & healthcare" },
      { name: "Brisbane", costLevel: "Moderate", note: "Education, business, technology & different lifestyle" },
      { name: "Perth", costLevel: "Moderate", note: "Universities, resources, engineering & industry" },
      { name: "Adelaide", costLevel: "Affordable", note: "Universities, engineering, healthcare & technology" },
      { name: "Canberra", costLevel: "Moderate", note: "Capital city, universities, government & research" },
    ],
    budgetItems: [
      "Rent/accommodation",
      "Food",
      "Public transport",
      "Utilities",
      "Phone/internet",
      "Study materials",
      "Personal expenses",
      "Health-related costs",
      "Travel",
    ],
  },

  scholarships: {
    title: "Scholarships for Indian Students in Australia",
    intro:
      "Scholarships, grants and bursaries may be available through Australian universities, government programmes and other organisations. Eligibility varies.",
    categories: [
      {
        title: "University & Institution Scholarships",
        items: [
          "Merit scholarships",
          "Tuition-fee scholarships",
          "Research scholarships",
          "University-specific awards",
          "Faculty-specific grants",
        ],
      },
      {
        title: "Government & External Fellowships",
        items: [
          "Australian Government programs",
          "Australia Awards Scholarships",
          "Endeavour Leadership Program",
          "Research institution funding",
          "External organisation fellowships",
        ],
      },
    ],
    disclaimer:
      "Some scholarships are available and others have eligibility requirements. Study Australia verifies that scholarships, grants, and bursaries are offered by Australian government institutions, education providers, and public and private institutions. Do not guarantee a place in any scholarship programme.",
  },

  educationLoan: {
    title: "Education Loan for Studying in Australia",
    subtitle:
      "Comprehensive financing options for tuition, living costs, OSHC and visa-related expenses",
    intro:
      "The cost of studying in Australia includes tuition fees, living costs, visa costs, and other expenses. DreamDestination supports students in considering options for their education finance based on university, course, academic profile, funding requirement, co-applicant profile, and financial circumstances. We are not a lender and take no commission from any of them: the amount, the rate, the collateral requirement and the approval are all the lender's decision. We help you size the real funding gap, compare routes against your profile, and time the sanction letter to your visa appointment.",
    maxAmount: "Set by the lender",
    interestRate: "Set by the lender",
    unsecuredMax: "Route available",
    repaymentTenure: "Up to 15 Years",
    services: [
      "Secured education loans",
      "Unsecured education loans",
      "Bank education loans",
      "NBFC education loans",
      "Tuition funding",
      "Living expense funding",
      "Required documents guidance",
      "Co-applicant requirements",
      "Loan processing support",
      "Alternative financing options",
    ],
    highlights: [
      "100% funding for tuition, living expenses, OSHC & flight tickets",
      "No collateral loans available for top Australian universities",
      "Tax benefits under Section 80E of Income Tax Act",
      "Competitive rates from leading banks & NBFCs",
      "Fast approval turnaround within 7–10 working days",
    ],
    unsecuredLoan: {
      question: "Can Indian students get an unsecured education loan for Australia?",
      answer:
        "Based on the policy of the lender and the academic and financial background, eligible Indian students may qualify for unsecured education financing. Factors include university, course, academic background, co-applicant, income, credit history, loan amount, and lender policy. Loan terms are determined by the lender. DreamDestination does not guarantee loan approval.",
    },
    rejectedLoan: {
      question: "What if your Australia education loan is rejected?",
      answer:
        "You don't have to give up on your education if your loan is refused. First understand the reason for rejection — credit history, co-applicant profile, income, existing liabilities, documentation, loan amount, university/course, or lender-specific policy. You can then look into other lenders or financing options.",
    },
    phoneNumber: "+91 92118 18710",
  },

  admissionRequirements: {
    intro:
      "Requirements vary according to the university, course, and level of study. You may require:",
    requirements: [
      "Passport",
      "Academic transcripts (Class 10, 12 & bachelor's degree)",
      "Semester-wise transcripts",
      "English-language test score (IELTS/PTE/TOEFL)",
      "SOP / Personal Statement (as appropriate)",
      "CV / Resume",
      "Letters of Recommendation (LORs) where required",
      "Portfolio for selected programmes",
      "Work experience documents",
      "Additional course-specific documents",
    ],
    aeoAnswer:
      "Not all Australian universities and courses have the same eligibility. Requirements depend on the programme, institution, and level of study. Students are advised to ensure that they have met the academic, English language, and programme-specific requirements prior to submitting their applications.",
    disclaimer:
      "Each Australian university and course has its own requirements for admission.",
  },

  applicationProcess: [
    { step: 1, title: "Profile Assessment", description: "Discuss academics, career objectives, course preference, and budget." },
    { step: 2, title: "Course Selection", description: "Select a programme that suits your academic background and career aspirations." },
    { step: 3, title: "University Shortlisting", description: "Compare universities based on course, tuition, location, entry requirements, career relevance, scholarships, and industry exposure." },
    { step: 4, title: "Document Preparation", description: "Prepare academic records, English-language scores, SOP/Personal Statement, and other required documents." },
    { step: 5, title: "Application Submission", description: "Apply as per university procedure and deadline." },
    { step: 6, title: "Offer & Acceptance", description: "Receive and consider an offer from university." },
    { step: 7, title: "Financial Planning", description: "Complete arrangements for tuition, scholarships, and education loans." },
    { step: 8, title: "CoE (Confirmation of Enrolment)", description: "Obtain CoE from university after meeting all conditions." },
    { step: 9, title: "Student Visa Application", description: "Prepare Subclass 500 visa application, financial proof, health/character requirements, and GS information." },
    { step: 10, title: "Pre-Departure", description: "Finalise accommodation, travel, finances, OSHC, and pre-departure preparation." },
  ],

  studentVisa: {
    heading: "Student Visa (Subclass 500) for Indian Students",
    intro:
      "The Student visa subclass 500 is the visa for international students to study in Australia. A student visa will be needed for students on a full-time course of study for more than three months.",
    journey:
      "Course Selection → Admission → CoE → Financial Preparation → Student Visa Application → Health/Character Requirements → Decision → Travel",
    requirements: [
      "Valid passport",
      "Confirmation of Enrolment (CoE)",
      "Genuine Student information",
      "Evidence of financial capacity (where required)",
      "English language evidence (where applicable)",
      "Overseas Student Health Cover (OSHC)",
      "Health examinations (as necessary)",
      "Character requirements",
      "Academic documents",
      "Other documents requested by Department of Home Affairs",
    ],
    visaFee: "AUD $2,500",
    visaFeeNote: "From 1 July 2026, subject to change by the government",
    processingNote: "Visa requirements may vary. Always refer to current requirements of the Department of Home Affairs before applying.",
  },

  genuineStudent: {
    heading: "What is the Genuine Student (GS) Requirement?",
    intro:
      "The Genuine Student requirement applies to student visa applications from 23 March 2024 onwards. Applicants need to establish that they are genuine applicants and that study in Australia is their main purpose.",
    assessmentFactors: [
      "Current circumstances",
      "Previous study",
      "Previous study in Australia",
      "Current employment",
      "Family/community ties",
      "Economic circumstances",
      "Reasons for choosing Australia",
      "Understanding of the proposed course",
      "Understanding about the education provider(s)",
      "Future value of the course",
      "Immigration history",
    ],
    whatToArticulate: [
      "Why this course?",
      "Why this institution?",
      "Why Australia?",
      "How is the course related to your prior learning or work?",
      "What impact will the qualification have on your future?",
    ],
    cta: { text: "Get Australia Profile & GS Guidance", href: "#lead-form" },
  },

  workWhileStudying: {
    heading: "Working While Studying in Australia",
    intro:
      "International students who are eligible can usually work while studying, as per the terms and conditions of their student visa.",
    details:
      "Visa conditions will apply to work rights. Students are required to adhere to the conditions of their visa.",
    disclaimer:
      "Avoid generalisations about specific hours. Students should check their current Department of Home Affairs work-condition information and ensure they adhere to the conditions of their visa.",
  },

  postStudyWork: {
    heading: "Post-Study Work Options in Australia",
    intro:
      "Depending on their qualification and circumstances, eligible graduates may be able to apply for a temporary graduate visa.",
    factors: [
      "Qualification",
      "Study level",
      "Course",
      "Australian study requirements",
      "Age",
      "English-language requirements",
      "Visa history",
      "Current immigration rules",
    ],
    temporaryGraduateVisa: {
      title: "Temporary Graduate Visa",
      description:
        "The Temporary Graduate visa is for international graduates who have finished eligible studies in Australia who are eligible to apply to work in Australia after graduation. Eligibility and rules may vary.",
      fee: "AUD $5,750 (as of July 2026)",
      disclaimer:
        "The visa stream, length of visa, and eligibility will vary based on the applicant's eligibility and situation. A student visa does not automatically provide permanent residency. Studying in Australia does not automatically guarantee PR.",
    },
  },

  careerOpportunities: {
    heading: "Career Opportunities After Studying in Australia",
    intro:
      "Choosing a career outcome depends on qualification, specialisation, skills, experience, institution, location, industry, employer, and work rights.",
    sectors: [
      { title: "Technology", roles: "Data Analyst, Developer, Data Scientist, Cyber Security Analyst" },
      { title: "Business", roles: "Business Analyst, Marketing Specialist, Financial Analyst, Operations Analyst" },
      { title: "Engineering", roles: "Mechanical, Civil, Electrical Engineering, Engineering Consulting" },
      { title: "Healthcare", roles: "Healthcare Administration, Public Health, Life Sciences" },
      { title: "Finance", roles: "Financial Analysis, Risk Analysis, Accounting, Finance" },
    ],
    disclaimer:
      "Career outcomes are contingent on qualifications, skills, experience, labour-market conditions and work authorisation. Employment is not guaranteed after graduation.",
  },

  cities: [
    { name: "Melbourne", state: "Victoria", description: "Famous for universities, student life, culture, technology, business, and healthcare.", universities: "U of Melbourne, Monash, RMIT, Deakin" },
    { name: "Sydney", state: "New South Wales", description: "Key business, finance, technology, education, and international community centre.", universities: "U of Sydney, UNSW, UTS, Macquarie" },
    { name: "Brisbane", state: "Queensland", description: "Popular for education, business, and technology with a comparatively different lifestyle.", universities: "UQ, QUT, Griffith" },
    { name: "Perth", state: "Western Australia", description: "Famous for universities, resources, engineering, and industry opportunities.", universities: "UWA, Curtin, Murdoch" },
    { name: "Adelaide", state: "South Australia", description: "Opportunities in engineering, healthcare, technology, and business at lower cost.", universities: "U of Adelaide, UniSA, Flinders" },
    { name: "Canberra", state: "ACT", description: "Capital city with universities, government, policy and research-related opportunities.", universities: "ANU, U of Canberra" },
    { name: "Gold Coast", state: "Queensland", description: "Famous for education, tourism, hospitality, and lifestyle.", universities: "Griffith (GC), Bond University" },
  ],

  documents: {
    intro: "Depending on the institution and visa application, you may need:",
    list: [
      "Passport",
      "Academic transcripts",
      "Degree certificates",
      "English-language test results (IELTS/PTE/TOEFL)",
      "SOP / Personal statement",
      "GS-related information",
      "CV / Resume",
      "LORs where required",
      "Offer letter",
      "Confirmation of Enrolment (CoE)",
      "Financial documents",
      "OSHC details",
      "Health documents (as needed)",
      "Character documents (as needed)",
      "Other documents requested by institution / Department of Home Affairs",
    ],
    disclaimer: "Each Australian institution and the Department of Home Affairs may have specific requirements.",
  },

  whyDD: [
    { title: "Profile-Based Counselling", description: "Based on your studies, course preference, budget, and career goals, we make personalised suggestions.", icon: "UserCheck" },
    { title: "Course & University Guidance", description: "Look at Australian programmes on your profile first before filtering by ranking.", icon: "BookOpen" },
    { title: "Admission Assistance", description: "Get assistance in programme selection, documentation, and application preparation.", icon: "FileText" },
    { title: "Education Loan Assistance", description: "Find secured and unsecured education-finance alternatives based on your situation.", icon: "Wallet" },
    { title: "Scholarship Guidance", description: "Know of scholarship and funding opportunities available for your profile.", icon: "Award" },
    { title: "Student Visa Guidance", description: "Comprehend the Subclass 500 visa application procedures and paperwork.", icon: "Shield" },
    { title: "Genuine Student Guidance", description: "Be ready to make an informed case about your course, institution, study plan, and future plans.", icon: "BadgeCheck" },
    { title: "Post-Study Guidance", description: "Know current regulations regarding graduate options before selecting your course.", icon: "TrendingUp" },
    { title: "Online Support Across India", description: "DreamDestination offers online counselling and application assistance to students all over India.", icon: "Globe" },
  ],

  faqs: [
    { question: "1. Is Australia good for Indian students?", answer: "Australia can be a strong option for Indian students looking for internationally recognised education, diverse programmes and a multicultural study environment. Students should evaluate the course, institution, cost and current visa rules before applying." },
    { question: "2. How much does it cost to study in Australia for Indian students?", answer: "The cost varies according to the university, course, study level, city and lifestyle. Tuition and living costs should both be included when preparing your budget." },
    { question: "3. What are the most popular courses to study in Australia?", answer: "Popular areas include Computer Science, IT, Data Science, Artificial Intelligence, Engineering, Business, Finance, Healthcare and Management." },
    { question: "4. What are the main intakes in Australia?", answer: "February and July are major intakes for many Australian institutions, although intake availability varies by programme and education provider." },
    { question: "5. Can I study for a master's in Australia?", answer: "Yes. Australian universities offer master's programmes across technology, engineering, business, healthcare, sciences and other disciplines." },
    { question: "6. How much does a master's in Australia cost?", answer: "Tuition varies by university and programme. Students should check the official fee for their selected course rather than relying on a single national average." },
    { question: "7. Can Indian students get scholarships in Australia?", answer: "Yes. Scholarships, grants and bursaries may be available through Australian universities, government programmes and other organisations. Eligibility varies." },
    { question: "8. Can I get an education loan for Australia?", answer: "Eligible Indian students may be able to obtain education financing from banks or NBFCs depending on the lender's policies and their financial and academic profile." },
    { question: "9. Can I get an unsecured education loan for Australia?", answer: "Some eligible students may qualify for unsecured education financing. The lender determines eligibility, loan amount, interest rate, tenure and collateral requirements." },
    { question: "10. What happens if my Australian education loan is rejected?", answer: "The reason for rejection should first be understood. Depending on your circumstances, alternative lenders or financing options may be worth exploring." },
    { question: "11. What is the Australia Student visa?", answer: "The Student visa, subclass 500, is the main visa used by eligible international students to study in Australia." },
    { question: "12. What is the Genuine Student requirement?", answer: "The Genuine Student requirement assesses whether an applicant genuinely intends to study in Australia and whether study is their primary reason for applying for the Student visa." },
    { question: "13. What does the Genuine Student assessment consider?", answer: "It can consider your circumstances, previous study, employment, home-country ties, economic circumstances, knowledge of your proposed course and provider, future value of the course and immigration history." },
    { question: "14. How much is the Australia Student visa fee?", answer: "The Student visa application charge increased to AUD $2,500 from 1 July 2026 for the standard primary applicant, subject to applicable concessions." },
    { question: "15. Can international students work while studying in Australia?", answer: "Eligible students may work subject to the conditions attached to their Student visa. Students should check their current visa conditions before starting employment." },
    { question: "16. Can I stay in Australia after graduation?", answer: "Eligible graduates may be able to apply for a Temporary Graduate visa or another suitable pathway, depending on their qualification and circumstances. A student visa does not automatically provide permanent residency." },
    { question: "17. Can I get PR after studying in Australia?", answer: "Studying in Australia does not automatically guarantee permanent residency. PR pathways depend on current immigration rules, occupation, qualifications, experience and individual eligibility." },
    { question: "18. What is a CoE in Australia?", answer: "A Confirmation of Enrolment (CoE) is an official document issued by an Australian education provider after enrolment requirements are completed. It is used in the Student visa application process." },
    { question: "19. How early should I apply for Australia?", answer: "Students should begin well before their preferred intake because university deadlines, English tests, documentation, financial preparation and visa processing all require time." },
    { question: "20. Is Australia better than Canada, UK or USA?", answer: "There is no universally better destination. The right choice depends on your course, university, budget, academic profile, career goals and current immigration rules." },
  ],
};
