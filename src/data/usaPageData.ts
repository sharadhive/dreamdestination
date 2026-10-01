// ============================================================
// USA PAGE — COMPREHENSIVE DATA
// SEO/GEO/AEO Optimized Content for "Study in USA for Indian Students"
// ============================================================

export interface USAUniversity {
  name: string;
  location: string;
  state: string;
  qsRanking?: string;
  type: "Public" | "Private";
  popularPrograms: string[];
  logo: string;
  highlights: string[];
  avgTuition: string;
  stemOpt: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const USA_PAGE_DATA = {
  seo: {
    title: "Study in USA for Indian Students 2026",
    description:
      "Study in the USA for Indian students with guidance on universities, courses, fees, scholarships, education loans, admissions, I-20 and F-1 student visa.",
    canonicalUrl: "https://www.dreamdestinationstudyabroad.com/study-in-usa",
    keywords: [
      "study in USA for Indian students",
      "study in USA",
      "study in USA for Indians",
      "USA education consultant",
      "USA study abroad consultant",
      "USA university admission consultant",
      "USA student visa consultant",
      "F1 visa consultant",
      "USA student visa for Indian students",
      "universities in USA for Indian students",
      "courses in USA for international students",
      "MS in USA",
      "MBA in USA",
      "cost of studying in USA",
      "scholarships in USA for Indian students",
      "education loan for USA studies",
      "unsecured education loan for USA",
      "education loan for MS in USA",
      "USA university application process",
      "USA intake 2026",
      "USA intake 2027",
    ],
  },

  hero: {
    title: "Best Study in the USA for Indian Students 2026",
    subtitle:
      "Make the right choice at the university to build your global career",
    description:
      "With thousands of higher education programmes offered by universities, colleges and specialised institutions in the United States, Indian students have ample options when it comes to course choices, research opportunities and career-focused pathways. However, selecting the USA is just the initial step.",
    questions: [
      "What kind of college are you seeking?",
      "Which course is relevant for your career?",
      "What will be your education expenses?",
      "Do you have the ability to obtain a scholarship or education loan?",
      "What paperwork will you require?",
      "What are the steps to prepare for an F-1 visa?",
    ],
    valueProposition:
      "At DreamDestination, we assist Indian students in making these choices with the help of a personalised online counselling service — ranging from course shortlisting to university shortlisting, admissions, education finance and visa preparation.",
    primaryCta: "Check My USA Study Options",
    secondaryCta: "Talk to a USA Counsellor",
    badge: "🇺🇸 Updated for 2026 F-1 Visa & STEM OPT Guidelines",
  },

  atAGlance: {
    title: "USA Study Overview",
    stats: [
      { label: "Major Intake", value: "Fall (Aug–Sep)" },
      { label: "Study Levels", value: "Bachelor's, Master's, MBA, PhD" },
      { label: "Common Student Visa", value: "F-1 Student Visa" },
      { label: "Post-Study Work (OPT)", value: "Up to 12 Months" },
      { label: "STEM OPT Extension", value: "+24 Months (36 Total)" },
      { label: "I-20 Requirement", value: "Mandatory for F-1 Visa" },
    ],
  },

  whyUSA: {
    title: "Why Study in the USA?",
    subtitle:
      "Your academic achievements, career objectives and budget should be key considerations when selecting a study location, rather than university rankings.",
    reasons: [
      {
        title: "Globally Recognised Education",
        description:
          "Internationally recognised universities in the USA teach, research and innovate across every field of study.",
        icon: "GraduationCap",
      },
      {
        title: "Extensive Selection of Courses",
        description:
          "There are thousands of programmes at undergraduate, postgraduate and doctoral levels across every discipline.",
        icon: "BookOpen",
      },
      {
        title: "Strong Research Ecosystem",
        description:
          "US universities provide ample research experiences for students with an interest in technology, engineering, medicine, healthcare and research.",
        icon: "Sparkles",
      },
      {
        title: "Flexible Academic Choices",
        description:
          "US universities offer a degree of flexibility in their majors and specialisations, in the choice of electives, and in the selection of interdisciplinary courses.",
        icon: "Briefcase",
      },
      {
        title: "Practical Training (OPT/STEM OPT)",
        description:
          "F-1 students who are eligible may be able to receive Optional Practical Training (OPT), and qualifying STEM degrees may be eligible for an additional 24-month STEM OPT extension.",
        icon: "Award",
      },
      {
        title: "Diverse Student Community",
        description:
          "Campuses in the USA are popular among students from all over the world and offer exposure to other cultures, perspectives and professional networks.",
        icon: "Users",
      },
    ],
  },

  whoShouldConsider: {
    heading: "Is the USA Right for You?",
    intro: "The USA may be a good option if you:",
    points: [
      "Want a large selection of universities and programmes to choose from",
      "Are interested in STEM, technology, engineering or research",
      "Are interested in pursuing an MS, MBA or specialised postgraduate qualification",
      "Choose universities where academic programmes are not as rigid",
      "Tirelessly seek the international academic and professional arena",
      "Are seeking research opportunities and/or assistantships",
      "Know the career you want but are unsure which programme to select",
      "Are looking for help paying for college through loans or scholarships",
    ],
    disclaimer:
      "Academic record, test scores, work experience, course selection, budget and career goals can all impact which universities are attainable.",
    cta: { text: "Get My USA Profile Assessment", href: "#lead-form" },
  },

  universities: [
    {
      name: "Massachusetts Institute of Technology (MIT)",
      location: "Cambridge, MA",
      state: "Massachusetts",
      qsRanking: "QS #1 World",
      type: "Private",
      popularPrograms: ["Engineering", "Computer Science", "AI", "Science", "Technology"],
      logo: "https://logo.clearbit.com/mit.edu",
      highlights: ["#1 University Globally (QS)", "World-leading research labs", "Strong startup culture"],
      avgTuition: "USD 57,000 - 60,000/yr",
      stemOpt: true,
    },
    {
      name: "Stanford University",
      location: "Stanford, CA",
      state: "California",
      qsRanking: "QS #5 World",
      type: "Private",
      popularPrograms: ["Computer Science", "Engineering", "Business", "Entrepreneurship", "AI"],
      logo: "https://logo.clearbit.com/stanford.edu",
      highlights: ["Silicon Valley proximity", "Strong entrepreneurship ecosystem", "Top CS & Engineering"],
      avgTuition: "USD 56,000 - 60,000/yr",
      stemOpt: true,
    },
    {
      name: "Harvard University",
      location: "Cambridge, MA",
      state: "Massachusetts",
      qsRanking: "QS #4 World",
      type: "Private",
      popularPrograms: ["Business", "Law", "Medicine", "Social Studies", "Public Policy"],
      logo: "https://logo.clearbit.com/harvard.edu",
      highlights: ["Globally prestigious", "Harvard Business School", "Top law & medicine"],
      avgTuition: "USD 54,000 - 59,000/yr",
      stemOpt: true,
    },
    {
      name: "California Institute of Technology (Caltech)",
      location: "Pasadena, CA",
      state: "California",
      qsRanking: "QS #10 World",
      type: "Private",
      popularPrograms: ["Science", "Engineering", "Research", "Physics", "Computer Science"],
      logo: "https://logo.clearbit.com/caltech.edu",
      highlights: ["Science & engineering focus", "Small class sizes", "Exceptional research output"],
      avgTuition: "USD 58,000 - 62,000/yr",
      stemOpt: true,
    },
    {
      name: "University of California, Berkeley",
      location: "Berkeley, CA",
      state: "California",
      qsRanking: "QS #27 World",
      type: "Public",
      popularPrograms: ["Computer Science", "Engineering", "Business", "Data Science", "Economics"],
      logo: "https://logo.clearbit.com/berkeley.edu",
      highlights: ["Top public university", "Silicon Valley connections", "Strong research culture"],
      avgTuition: "USD 42,000 - 50,000/yr",
      stemOpt: true,
    },
    {
      name: "Carnegie Mellon University",
      location: "Pittsburgh, PA",
      state: "Pennsylvania",
      qsRanking: "QS #65 World",
      type: "Private",
      popularPrograms: ["Computer Science", "AI", "Robotics", "Technology", "Business"],
      logo: "https://logo.clearbit.com/cmu.edu",
      highlights: ["#1 CS program globally", "AI & robotics leader", "Strong industry placements"],
      avgTuition: "USD 58,000 - 63,000/yr",
      stemOpt: true,
    },
    {
      name: "University of Illinois Urbana-Champaign",
      location: "Urbana-Champaign, IL",
      state: "Illinois",
      qsRanking: "QS #83 World",
      type: "Public",
      popularPrograms: ["Engineering", "Computer Science", "Business", "Data Science", "Finance"],
      logo: "https://logo.clearbit.com/illinois.edu",
      highlights: ["Top engineering school", "High graduate employability", "Affordable for a top school"],
      avgTuition: "USD 32,000 - 42,000/yr",
      stemOpt: true,
    },
    {
      name: "University of Texas at Austin",
      location: "Austin, TX",
      state: "Texas",
      qsRanking: "QS #130 World",
      type: "Public",
      popularPrograms: ["Engineering", "Computer Science", "Business", "Data Science", "Law"],
      logo: "https://logo.clearbit.com/utexas.edu",
      highlights: ["Texas tech hub proximity", "Strong research output", "McCombs Business School"],
      avgTuition: "USD 38,000 - 48,000/yr",
      stemOpt: true,
    },
    {
      name: "Georgia Institute of Technology",
      location: "Atlanta, GA",
      state: "Georgia",
      qsRanking: "QS #97 World",
      type: "Public",
      popularPrograms: ["Engineering", "Computing", "Technology", "Data Science", "AI"],
      logo: "https://logo.clearbit.com/gatech.edu",
      highlights: ["Excellent engineering programs", "Atlanta tech ecosystem", "Competitive tuition"],
      avgTuition: "USD 30,000 - 40,000/yr",
      stemOpt: true,
    },
    {
      name: "University of Michigan–Ann Arbor",
      location: "Ann Arbor, MI",
      state: "Michigan",
      qsRanking: "QS #24 World",
      type: "Public",
      popularPrograms: ["Engineering", "Business", "Sciences", "Public Health", "Computer Science"],
      logo: "https://logo.clearbit.com/umich.edu",
      highlights: ["Top-ranked public research university", "Ross Business School", "Strong alumni network"],
      avgTuition: "USD 47,000 - 54,000/yr",
      stemOpt: true,
    },
    {
      name: "Columbia University",
      location: "New York, NY",
      state: "New York",
      qsRanking: "QS #33 World",
      type: "Private",
      popularPrograms: ["Business", "Finance", "Law", "Social Sciences", "Engineering"],
      logo: "https://logo.clearbit.com/columbia.edu",
      highlights: ["NYC location advantage", "Ivy League prestige", "Columbia Business School"],
      avgTuition: "USD 62,000 - 66,000/yr",
      stemOpt: true,
    },
    {
      name: "New York University (NYU)",
      location: "New York, NY",
      state: "New York",
      qsRanking: "QS #58 World",
      type: "Private",
      popularPrograms: ["Business", "Finance", "Arts", "Media", "Computer Science"],
      logo: "https://logo.clearbit.com/nyu.edu",
      highlights: ["Stern School of Business", "NYC finance hub", "Global campus network"],
      avgTuition: "USD 55,000 - 60,000/yr",
      stemOpt: true,
    },
    {
      name: "Purdue University",
      location: "West Lafayette, IN",
      state: "Indiana",
      qsRanking: "QS #99 World",
      type: "Public",
      popularPrograms: ["Engineering", "Computer Science", "Business", "Agriculture", "Pharmacy"],
      logo: "https://logo.clearbit.com/purdue.edu",
      highlights: ["Top 10 US engineering", "Strong STEM reputation", "Affordable tuition"],
      avgTuition: "USD 28,000 - 38,000/yr",
      stemOpt: true,
    },
    {
      name: "University of Southern California (USC)",
      location: "Los Angeles, CA",
      state: "California",
      qsRanking: "QS #121 World",
      type: "Private",
      popularPrograms: ["Business", "Engineering", "Film", "Communication", "Computer Science"],
      logo: "https://logo.clearbit.com/usc.edu",
      highlights: ["LA entertainment & tech hub", "Marshall Business School", "Diverse campus community"],
      avgTuition: "USD 60,000 - 65,000/yr",
      stemOpt: true,
    },
    {
      name: "Arizona State University",
      location: "Tempe, AZ",
      state: "Arizona",
      qsRanking: "QS #201 World",
      type: "Public",
      popularPrograms: ["Engineering", "Business", "Data Science", "Computer Science", "Healthcare"],
      logo: "https://logo.clearbit.com/asu.edu",
      highlights: ["Largest US public university", "Innovation-focused campus", "Competitive tuition"],
      avgTuition: "USD 28,000 - 36,000/yr",
      stemOpt: true,
    },
  ] as USAUniversity[],

  publicVsPrivate: {
    title: "Public University vs Private University in the USA",
    subtitle:
      "Indian students tend to make comparisons solely on the basis of rank. Fit and programme cost can also be significant.",
    publicUni: {
      title: "Public Universities",
      description:
        "Typically, public universities receive government support and can provide extensive programmes and huge campuses.",
      offers: [
        "Lower tuition (especially for in-state)",
        "Large research programs",
        "Wide range of courses",
        "Bigger campus & resources",
      ],
      bestFor: "Students seeking affordability + research opportunities + wide programme selection.",
    },
    privateUni: {
      title: "Private Universities",
      description:
        "Private universities are self-funded and can differ in tuition fees, scholarships, class size and programme.",
      offers: [
        "Often smaller class sizes",
        "Generous financial aid/scholarships",
        "Strong alumni networks",
        "Focused academic programs",
      ],
      bestFor: "Students targeting prestige, specific programs, or need-based financial aid.",
    },
    keyAdvice:
      "Both are not inherently superior. The right choice is dependent on: Academic Profile + Cost + Funding + Career Goals + Course + University.",
  },

  popularCourses: [
    {
      category: "Computer Science & Technology",
      icon: "Monitor",
      courses: [
        "Computer Science",
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Cyber Security",
        "Software Engineering",
        "Information Technology",
        "Information Systems",
      ],
    },
    {
      category: "Engineering",
      icon: "Cog",
      courses: [
        "Mechanical Engineering",
        "Electrical Engineering",
        "Civil Engineering",
        "Computer Engineering",
        "Aerospace Engineering",
        "Industrial Engineering",
        "Engineering Management",
      ],
    },
    {
      category: "Business & Management",
      icon: "TrendingUp",
      courses: [
        "MBA",
        "Business Analytics",
        "Finance",
        "Marketing",
        "International Business",
        "Management",
        "Entrepreneurship",
      ],
    },
    {
      category: "Data & Analytics",
      icon: "BarChart",
      courses: [
        "Data Science",
        "Business Analytics",
        "Data Analytics",
        "Applied Statistics",
        "Artificial Intelligence",
        "Quantitative Finance",
      ],
    },
    {
      category: "Healthcare & Life Sciences",
      icon: "Heart",
      courses: [
        "Public Health",
        "Biotechnology",
        "Biomedical Sciences",
        "Healthcare Management",
        "Life Sciences",
        "Nursing",
      ],
    },
    {
      category: "Other Fields",
      icon: "Palette",
      courses: [
        "Architecture",
        "Economics",
        "Psychology",
        "Mathematics",
        "Finance",
        "Media & Communication",
        "Law",
        "Environmental Science",
      ],
    },
  ],

  msInUSA: {
    heading: "MS in the USA for Indian Students",
    description:
      "The USA is one of the popular countries for Indian students interested in higher studies, especially in subjects like computer science, data science, engineering, business analytics, and other STEM subjects.",
    considerations: [
      "Academic background & GPA/percentage",
      "Relevant coursework",
      "GRE score (if applicable)",
      "English-language requirement (IELTS/TOEFL)",
      "Work experience",
      "Research experience & projects",
      "SOP & LORs",
      "University fit",
      "Cost of tuition and living expenses",
      "Funding options",
      "Career goals",
    ],
    note:
      "It's not only the university's reputation that makes an MS worthwhile; it makes sense when the program fits your academic background and career objectives.",
    cta: { text: "Assess My MS Profile", href: "#lead-form" },
  },

  intakes: [
    {
      season: "Fall Intake (August–September)",
      status: "Major Intake",
      description:
        "Typically the widest and biggest intake. Recommended for maximum course choices and scholarship availability.",
      timeline: "Apply 10–14 months prior (Sep – Jan)",
    },
    {
      season: "Spring Intake (January)",
      status: "Secondary Intake",
      description:
        "A good option for students that miss out on the Fall cycle or who are admitted to a programme that admits in Spring.",
      timeline: "Apply 6–8 months prior (Jun – Aug)",
    },
    {
      season: "Summer Intake (May–June)",
      status: "Limited Intake",
      description:
        "Not available at all universities and programmes. Available for selected programmes only.",
      timeline: "Apply 5–6 months prior (Nov – Jan)",
    },
  ],

  timeline: [
    {
      phase: "12–18 Months Before",
      title: "Research & Profile Planning",
      details: "Research courses, shortlist universities, check eligibility, understand test requirements, plan finances.",
    },
    {
      phase: "9–12 Months Before",
      title: "Test Prep & Document Ready",
      details: "Prepare SOP, arrange LORs, take required tests (GRE/GMAT/IELTS/TOEFL), prepare applications, research scholarships.",
    },
    {
      phase: "6–9 Months Before",
      title: "Submit Applications",
      details: "Follow deadlines in submitting applications, compare offers, plan funding.",
    },
    {
      phase: "After Admission",
      title: "Accept Offer & I-20",
      details: "Accept the offer, complete necessary university tasks, accept the I-20 if applicable, get ready to apply for a visa.",
    },
    {
      phase: "Final Stage",
      title: "Visa, Accommodation & Departure",
      details: "Visa preparation, accommodation, travel, and pre-departure preparation.",
    },
  ],

  costOfStudy: {
    title: "Cost of Studying in the USA for Indian Students",
    intro:
      "There is no single cost for studying in the USA. The total budget will be based on academic/course, city, duration, lifestyle, and funding.",
    budgetItems: [
      "Tuition fees",
      "Accommodation",
      "Food",
      "Transportation",
      "Health insurance",
      "University fees",
      "Books and supplies",
      "Visa-related expenses",
      "Travel",
      "Personal expenses",
    ],
    breakdown: [
      {
        level: "Undergraduate",
        cost: "USD 20,000–60,000+/year",
        note: "Varies by university type (public vs private) and state",
      },
      {
        level: "Master's (MS)",
        cost: "USD 20,000–60,000+/year",
        note: "STEM programs may qualify for assistantships",
      },
      {
        level: "MBA",
        cost: "USD 30,000–100,000+/year",
        note: "Top business schools command premium fees",
      },
      {
        level: "PhD",
        cost: "Highly variable",
        note: "Funding & assistantships may be available",
      },
    ],
    disclaimer:
      "Do NOT treat these as official fixed USA fees. Always verify university-specific fees before planning. EducationUSA strongly urges families to begin financial planning early.",
  },

  costOfLiving: {
    title: "Cost of Living in the USA for Indian Students",
    intro:
      "The cost of living varies significantly from one city to another. Key items to consider include accommodation, food, transport, insurance, and personal expenses.",
    cities: [
      {
        name: "New York",
        costLevel: "Very High",
        note: "Major finance, business, media, and tech hub",
      },
      {
        name: "Boston",
        costLevel: "High",
        note: "Favorable university ecosystem; education, healthcare, technology",
      },
      {
        name: "San Francisco / Bay Area",
        costLevel: "Very High",
        note: "Tech & startup epicenter; highest cost of living",
      },
      {
        name: "Los Angeles",
        costLevel: "High",
        note: "Entertainment, tech, and diverse industries",
      },
      {
        name: "Chicago",
        costLevel: "Moderate",
        note: "Business, finance, technology, and education hub",
      },
      {
        name: "Austin / Texas",
        costLevel: "Moderate",
        note: "Growing tech hub; relatively affordable compared to coasts",
      },
    ],
    note:
      "Studying in a smaller city or college town can require a different budget than studying in major metro areas.",
  },

  scholarships: {
    title: "Scholarships for Indian Students in the USA",
    intro:
      "There are various types of financial aid available in the USA. Eligibility for scholarships is determined by the university, program, academic profile, and funding.",
    categories: [
      {
        title: "University & Merit Scholarships",
        items: [
          "University-specific merit scholarships",
          "Need-based financial aid",
          "Graduate assistantships",
          "Teaching assistantships (TA)",
          "Research assistantships (RA)",
        ],
      },
      {
        title: "Government & External Fellowships",
        items: [
          "Fulbright-Nehru Fellowship",
          "External funding programs",
          "AAUW International Fellowships",
          "Government scholarship programs",
          "Foundation fellowships",
        ],
      },
    ],
    disclaimer:
      "EducationUSA points out that various types of financial support are available and suggests looking into funding opportunities in conjunction with the admission process.",
  },

  educationLoan: {
    title: "Education Loan for Studying in the USA",
    subtitle:
      "Comprehensive financing options for tuition, living costs, and visa-related expenses",
    intro:
      "Tuition and living costs are some of the major considerations of Indian students planning for an education in the United States. DreamDestination assists students with options for financing their education according to their university, course, academic profile, and financial situation. We are not a lender and take no commission from any of them: the amount, the rate, the collateral requirement and the approval are all the lender's decision. We help you size the real funding gap, compare routes against your profile, and time the sanction letter to your visa appointment.",
    maxAmount: "Set by the lender",
    interestRate: "Set by the lender",
    unsecuredMax: "Route available",
    repaymentTenure: "Up to 15 Years",
    services: [
      "Secured education loans",
      "Unsecured education loans",
      "Bank education loans",
      "NBFC education loans",
      "Tuition fee funding",
      "Living expense funding",
      "Required documents guidance",
      "Co-applicant requirements",
      "Loan processing support",
      "Re-application after rejection",
    ],
    highlights: [
      "100% funding for tuition, living expenses & flight tickets",
      "No collateral loans available for top US universities",
      "Tax benefits under Section 80E of Income Tax Act",
      "Competitive rates from leading banks & NBFCs",
      "Fast approval turnaround within 7–10 working days",
    ],
    unsecuredLoan: {
      question: "Can Indian students get an unsecured education loan for USA studies?",
      answer:
        "Yes, depending on the lender and their policies, a student may qualify for unsecured education financing. Factors include university, course, academic profile, co-applicant profile, income, credit history, loan amount, and overall financial assessment. Loan approval, amount, interest rate, tenure, and collateral requirements are determined by the lender.",
    },
    rejectedLoan: {
      question: "What if my USA education loan is rejected?",
      answer:
        "If you are rejected for a loan, you don't have to give up on your study abroad. First, find out why the application was not successful. Factors might be credit history, co-applicant eligibility, income, existing liabilities, university/course, loan amount, or documentation. You may consider other lenders or financing methods that you might be eligible for.",
    },
    phoneNumber: "+91 92118 18710",
  },

  admissionRequirements: {
    intro:
      "Admission requirements vary by university, programme, and study level. Applicants are generally required to have:",
    requirements: [
      "Academic transcripts (Class 10, 12 & bachelor's degree)",
      "Semester-wise transcripts",
      "SOP (Statement of Purpose) / Personal Essays",
      "Letters of Recommendation (LORs)",
      "CV / Resume",
      "English-language test score (IELTS/TOEFL)",
      "GRE/GMAT where required",
      "SAT/ACT for specific undergraduate courses",
      "Portfolio (for selected programmes)",
      "Work experience documents (where applicable)",
      "Passport",
      "Financial documents (where applicable)",
    ],
    aeoAnswer:
      "All US universities do not have a single criterion for eligibility. Requirements are dependent on the university, program, and level of study. Students are advised to consider the prerequisites for each program, including academic, English language, and standardized test requirements.",
    disclaimer:
      "Every university and course has its own requirements and criteria for admission to the USA.",
  },

  applicationProcess: [
    {
      step: 1,
      title: "Profile Assessment",
      description:
        "Discuss academics, work experience, course preference, budget, and career goals.",
    },
    {
      step: 2,
      title: "Course Selection",
      description:
        "Select a programme based on background and career aspirations.",
    },
    {
      step: 3,
      title: "University Shortlisting",
      description:
        "Make a well-rounded list based on your profile, budget, and career goals.",
    },
    {
      step: 4,
      title: "Test Preparation",
      description:
        "Take appropriate English language tests (IELTS/TOEFL) and standardised tests (GRE/GMAT) where required.",
    },
    {
      step: 5,
      title: "Application Preparation",
      description:
        "Prepare SOP, LORs, CV, transcripts, test scores, essays, and portfolio where required.",
    },
    {
      step: 6,
      title: "University Applications",
      description:
        "Apply for each university before their deadlines.",
    },
    {
      step: 7,
      title: "Compare Offers",
      description:
        "Evaluate tuition, scholarships, course structure, location, and career relevance.",
    },
    {
      step: 8,
      title: "Funding & Financial Planning",
      description:
        "Complete financial plan including savings, education loan options, assistantships, and scholarships.",
    },
    {
      step: 9,
      title: "I-20 Issuance",
      description:
        "Once eligible and requirements completed, the university issues Form I-20 for the F-1 visa process.",
    },
    {
      step: 10,
      title: "F-1 Visa Preparation",
      description:
        "Prepare the visa application (DS-160), SEVIS payment, required documents, and interview.",
    },
    {
      step: 11,
      title: "Pre-Departure",
      description:
        "Make arrangements for accommodation, transport, finances, health insurance, and travel.",
    },
  ],

  f1Visa: {
    heading: "F-1 Student Visa for Indian Students",
    intro:
      "The F-1 visa is the most popular visa type for academic study at a qualified American school for Indian students. Students must first be accepted by their school/programme before they can apply for a student visa.",
    journey:
      "University Admission → I-20 → SEVIS → DS-160 → Visa Appointment → Interview → Visa Decision",
    requirements: [
      "Valid passport",
      "Form I-20 (from eligible US institution)",
      "DS-160 confirmation",
      "SEVIS-related payment receipt",
      "Visa appointment information",
      "Admission letter",
      "Academic documents",
      "Financial documents",
      "Scholarship/assistantship documents (if applicable)",
    ],
    visaFee: "USD 185",
    sevisFee: "USD 350",
    processingNote: "Processing times vary by consulate. Apply well in advance of your programme start date.",
  },

  visaInterview: {
    heading: "F-1 Visa Interview Preparation",
    intro:
      "Students need to be able to articulate their study plan in a clear and consistent manner.",
    commonQuestions: [
      "Why this university?",
      "Why this course?",
      "Why the USA?",
      "Why not study the same course in India?",
      "Who pays for your education?",
      "What are your career goals?",
      "What are the key facts of your programme?",
    ],
    ourHelp: [
      "Document organisation",
      "Profile discussion",
      "Mock interview practice",
      "Understanding your course",
      "Understanding your university",
      "Financial document preparation",
    ],
    disclaimer:
      "DreamDestination does not guarantee visa approval. Visa decisions are made solely by the US Embassy/Consulate.",
  },

  workWhileStudying: {
    heading: "Working While Studying in the USA",
    intro:
      "F-1 students have special rules for employment and should not expect to be able to work anywhere off campus without proper authorisation.",
    details:
      "Employment must adhere to all relevant immigration laws and, if applicable, university/designated school official procedures and authorisation. On-campus employment may be available up to 20 hours per week during academic terms.",
    disclaimer:
      "Students must understand the applicable authorisation and restrictions before working. Always refer to official USCIS and your designated school official (DSO) for current rules.",
  },

  optAndStemOpt: {
    heading: "OPT & STEM OPT for Indian Students",
    intro:
      "F-1 students who are eligible can participate in Optional Practical Training (OPT) for their field of study.",
    opt: {
      title: "Optional Practical Training (OPT)",
      description:
        "OPT allows eligible F-1 students to obtain temporary practical training related to their field of study for up to 12 months.",
    },
    stemOpt: {
      title: "STEM OPT Extension",
      description:
        "Students who qualify for a STEM OPT extension in certain eligible STEM degree programs may be eligible for a 24-month extension, providing up to 36 months of practical training.",
    },
    aeoAnswer:
      "F-1 students who are eligible can be eligible for post-completion OPT, and students with eligible STEM degrees can be eligible for an additional 24-month STEM OPT extension. Eligibility criteria are dependent on the programme and immigration requirements of the student.",
    disclaimer:
      "Eligibility will be based on the student's programme, employer, immigration status, and relevant regulations.",
  },

  cities: [
    {
      name: "Boston",
      state: "Massachusetts",
      description:
        "Favourable university ecosystem and known for education, healthcare, and technology.",
      universities: "MIT, Harvard, Northeastern, BU",
    },
    {
      name: "New York City",
      state: "New York",
      description:
        "A large hub of finance, business, media, and technology. Home to Columbia, NYU and more.",
      universities: "Columbia, NYU, Fordham, CUNY",
    },
    {
      name: "California (Bay Area & LA)",
      state: "California",
      description:
        "Significant environment for technology, engineering, entrepreneurship, and research.",
      universities: "Stanford, Berkeley, Caltech, USC",
    },
    {
      name: "Texas",
      state: "Texas",
      description:
        "Provides universities and industries in technology, engineering, the health sector, and business.",
      universities: "UT Austin, Texas A&M, Rice",
    },
    {
      name: "Chicago",
      state: "Illinois",
      description:
        "A key city for the business, finance, technology, and education sectors.",
      universities: "UChicago, Northwestern, UIC, DePaul",
    },
    {
      name: "Seattle",
      state: "Washington",
      description:
        "Cultivated for technology and innovation ecosystems. Amazon & Microsoft HQ.",
      universities: "University of Washington, Seattle U",
    },
    {
      name: "Atlanta",
      state: "Georgia",
      description:
        "High presence in the technology, business, logistics, and engineering fields.",
      universities: "Georgia Tech, Emory, Georgia State",
    },
    {
      name: "Washington, D.C.",
      state: "D.C.",
      description:
        "Good policy, international affairs, business, and related environment.",
      universities: "Georgetown, GWU, American University",
    },
  ],

  documents: {
    intro: "Your programme and university might require:",
    list: [
      "Passport",
      "Academic transcripts",
      "Degree certificates",
      "SOP/essays",
      "Letters of Recommendation (LORs)",
      "CV/resume",
      "English-language test score (IELTS/TOEFL)",
      "GRE/GMAT/SAT/ACT where required",
      "Portfolio where applicable",
      "Work experience documents",
      "Financial documents",
      "Scholarship documents",
      "Form I-20",
      "Visa-related documents",
    ],
    disclaimer:
      "Each U.S. college or university has its own requirements for admissions. Always verify directly with your institution.",
  },

  whyDD: [
    {
      title: "Profile-Based University Guidance",
      description:
        "We assist you to compare universities based on your academic profile, course of interest, budget, and career aspirations.",
      icon: "UserCheck",
    },
    {
      title: "Course Selection",
      description:
        "Identify various options of the programmes before applying.",
      icon: "BookOpen",
    },
    {
      title: "Application Support",
      description:
        "Help with preparing documents and applying to the university.",
      icon: "FileText",
    },
    {
      title: "Education Loan Assistance",
      description:
        "Research appropriate secured and unsecured methods of financing education.",
      icon: "Wallet",
    },
    {
      title: "Visa Guidance",
      description:
        "Know about the F-1 visa process, documentation, and interview preparation.",
      icon: "Shield",
    },
    {
      title: "Scholarship Guidance",
      description:
        "Look for scholarships and funding opportunities that you may be eligible for.",
      icon: "Award",
    },
    {
      title: "Online Support Across India",
      description:
        "Students from all over India can seek counselling and application support from us online.",
      icon: "Globe",
    },
  ],

  faqs: [
    {
      question: "1. Is the USA good for Indian students?",
      answer:
        "The USA can be a strong option for Indian students because it offers a wide range of universities, academic programmes, research opportunities and career-focused study pathways.",
    },
    {
      question: "2. How much does it cost to study in the USA for Indian students?",
      answer:
        "The total cost depends on the university, course, city, programme duration and lifestyle. Students should budget for tuition, accommodation, food, insurance, transportation, visa-related expenses and other personal costs.",
    },
    {
      question: "3. What are the best courses to study in the USA?",
      answer:
        "Popular choices include Computer Science, Data Science, Artificial Intelligence, Engineering, Business Analytics, Finance, MBA and Healthcare-related programmes.",
    },
    {
      question: "4. What is the main intake in the USA?",
      answer:
        "Fall is generally the largest admission cycle, while Spring and selected Summer intakes are available depending on the university and programme.",
    },
    {
      question: "5. Can I do an MS in the USA without GRE?",
      answer:
        "Some US universities and programmes do not require the GRE, while others may still require or recommend it. Requirements vary by programme.",
    },
    {
      question: "6. How much does an MS in the USA cost?",
      answer:
        "The cost varies significantly by university, programme and location. Students should compare tuition, living expenses and available funding before selecting a university.",
    },
    {
      question: "7. Can Indian students get scholarships in the USA?",
      answer:
        "Yes. Eligible international students may find university scholarships, assistantships, fellowships and other funding opportunities. Availability and eligibility vary.",
    },
    {
      question: "8. Can I get an education loan for studying in the USA?",
      answer:
        "Eligible Indian students may be able to obtain education financing from banks or NBFCs depending on the lender's policies and the student's financial and academic profile.",
    },
    {
      question: "9. Can I get an unsecured education loan for USA studies?",
      answer:
        "Eligible students may qualify for unsecured education financing depending on the lender, university, course, co-applicant and financial assessment.",
    },
    {
      question: "10. What happens if my USA education loan is rejected?",
      answer:
        "You should first understand the reason for rejection. Depending on your circumstances, you may explore alternative lenders or financing options for which you are eligible.",
    },
    {
      question: "11. Which visa do Indian students need to study in the USA?",
      answer:
        "Students pursuing academic study generally use the F-1 student visa category when they meet the applicable requirements.",
    },
    {
      question: "12. What is an I-20?",
      answer:
        "The Form I-20 is issued by an eligible US educational institution to qualifying international students and is an important document in the F-1 student visa process.",
    },
    {
      question: "13. Can Indian students work while studying in the USA?",
      answer:
        "F-1 students may have limited employment opportunities under specific immigration rules. Students must understand the applicable authorisation and restrictions before working.",
    },
    {
      question: "14. What is OPT in the USA?",
      answer:
        "OPT, or Optional Practical Training, allows eligible F-1 students to obtain temporary practical training related to their field of study, subject to applicable requirements.",
    },
    {
      question: "15. What is STEM OPT?",
      answer:
        "Eligible F-1 students with qualifying STEM degrees may be able to apply for a 24-month STEM OPT extension after their initial period of OPT, subject to the applicable requirements.",
    },
    {
      question: "16. Can I stay in the USA after completing my degree?",
      answer:
        "Some graduates may qualify for OPT and other future immigration pathways depending on their circumstances. A study visa does not automatically guarantee long-term residence or employment.",
    },
    {
      question: "17. How do I choose a US university?",
      answer:
        "Compare programme fit, admission requirements, tuition, location, scholarships, research opportunities, career relevance and your own academic profile rather than relying only on rankings.",
    },
    {
      question: "18. How early should I apply to US universities?",
      answer:
        "Students should ideally begin researching universities and requirements well before the intended intake because deadlines vary significantly by university and programme.",
    },
    {
      question: "19. Can I study in the USA without IELTS?",
      answer:
        "English-language requirements vary by university and programme. Some institutions accept alternative tests or may provide exemptions under specific conditions.",
    },
    {
      question: "20. Is the USA better than the UK for Indian students?",
      answer:
        "Neither country is automatically better. The right choice depends on your course, academic profile, budget, preferred study duration, career goals, university options and immigration considerations.",
    },
  ],
};
