// ============================================================
// UK PAGE — COMPREHENSIVE DATA
// SEO/GEO/AEO Optimized Content for "Study in UK for Indian Students"
// ============================================================

export const UK_SEO = {
  title: "Study in UK for Indian Students 2026",
  metaDescription:
    "Study in the UK for Indian students with expert guidance on universities, courses, fees, scholarships, education loans, admissions and UK student visas.",
  canonicalUrl: "https://www.dreamdestinationstudyabroad.com/study-in-uk",
  primaryKeyword: "study in UK for Indian students",
  keywords: [
    "study in UK",
    "study in UK for Indians",
    "study in UK for Indian students",
    "UK education consultant",
    "UK study abroad consultant",
    "study abroad consultant for UK",
    "UK university admission consultant",
    "UK student visa consultant",
    "UK student visa for Indian students",
    "UK university fees for Indian students",
    "cost of studying in UK",
    "scholarships in UK for Indian students",
    "education loan for UK studies",
    "education loan for abroad studies",
    "unsecured education loan for UK",
    "best universities in UK for Indian students",
    "courses to study in UK",
    "UK university application process",
    "UK intake 2026",
    "UK intake 2027",
    "study in United Kingdom",
    "UK student route visa",
    "graduate route UK",
    "MBA in UK",
    "MS in UK",
    "engineering in UK",
    "data science in UK",
    "computer science in UK",
  ],
};

// ─── HERO SECTION DATA ───
export const UK_HERO = {
  heading: "Best Study in the UK for Indian Students",
  subheading:
    "Make your global dream a reality and create a plan for it.",
  description:
    "For Indian students, the UK boasts a plethora of globally recognized universities, career-focused courses, and diverse options to pursue studies. However, selecting the right university is just part of the process.",
  valueProposition:
    "At DreamDestination, we make a comprehensive assessment of your course, university, budget, scholarships, and education loan & visa needs based on your individual profile.",
  programNote:
    "From the bachelor to the master to the MBA and research programs, our experts can help you to know your options before you apply.",
  cta1: { text: "Check My UK Eligibility", href: "#lead-form" },
  cta2: { text: "Get Expert Counselling", href: "#contact" },
};

// ─── QUICK FACTS ───
export const UK_QUICK_FACTS = {
  studyLevels: "Bachelor's, Master's, MBA, PhD",
  majorIntakes: "September/October, January/February",
  popularFields:
    "Business, Engineering, IT, Data Science, Finance, Healthcare, Law",
  studentVisa: "UK Student Route",
  visaNote:
    "Eligible institutions offer full-time study programs.",
  graduateRoute:
    "2 years from application (on/before 31 Dec 2026); 18 months from 1 Jan 2027 (for eligible graduates). Doctoral graduates: 3 years.",
  graduateRouteDisclaimer:
    "The Graduate Route rules are subject to change. GOV.UK currently states that applications up to 31 December 2026 have a 2-year duration, and applications from 1 January 2027 have an 18-month duration, with doctoral graduates still having a 3-year duration.",
};

// ─── WHY STUDY IN THE UK ───
export interface WhyStudyItem {
  title: string;
  description: string;
  icon: string; // icon name from lucide
}

export const UK_WHY_STUDY: WhyStudyItem[] = [
  {
    title: "Globally Recognized Universities",
    description:
      "The UK has an outstanding reputation for universities with a tendency to rank highly globally. Imperial College London was ranked #2 in the world, Oxford was #4, Cambridge was #6, and UCL was #9 in the QS World University Rankings 2026.",
    icon: "Globe2",
  },
  {
    title: "Shorter Study Duration",
    description:
      "Master courses can be undertaken in the UK in one year, and bachelor courses are typically three years of study in England, Wales, and Northern Ireland. In Scotland, a four-year undergraduate programme is normal. This may mean the overall amount paid for tuition and living expenses may be less compared to longer programs.",
    icon: "Clock",
  },
  {
    title: "Wide Choice of Courses",
    description:
      "Students enjoy a wide choice of courses across Computer Science & IT, AI & Data Science, Business & Management, Finance & Accounting, Engineering, Healthcare & Public Health, Law, Architecture, Media & Communication, Hospitality & Tourism, and Social Sciences.",
    icon: "BookOpen",
  },
  {
    title: "Industry Exposure",
    description:
      "Students can discover possibilities like placements, internships, industry projects, and career-focused modules based on the opportunities available through their university and program.",
    icon: "Briefcase",
  },
  {
    title: "Multicultural Student Environment",
    description:
      "UK universities have students from various countries and provide Indian students with a chance to develop international connections and gain exposure to varying academic and cultural viewpoints.",
    icon: "Users",
  },
  {
    title: "Career-Focused Education",
    description:
      "The right UK course will enable students to develop specialist knowledge, skills, and experience that are relevant to their future career aspirations.",
    icon: "GraduationCap",
  },
];

// ─── WHO SHOULD CONSIDER ───
export const UK_WHO_SHOULD_CONSIDER = {
  heading: "Is the UK Right for You and Your Studies?",
  intro: "The UK may be worth considering if you:",
  points: [
    "Desire to study for a globally recognized degree",
    "Opt for specialization masters instead of traditional masters",
    "Looking to finish a master's degree sooner",
    "Search for excellent universities in a range of subjects",
    "Have a big desire to get foreign academic and cultural exposure",
    "Know what they want to do next, but struggle to decide on the best course to take",
    "Need assistance planning tuition and living costs",
    "Are interested in education loan or scholarship opportunities",
  ],
  disclaimer:
    "Admission and visa requirements are based on your academic background, program of interest, university, financial resources, and any other requirements that may apply.",
  cta: {
    text: "Check If Your Study Is Available in the UK",
    href: "#lead-form",
  },
};

// ─── COURSE CLUSTERS ───
export interface CourseCluster {
  category: string;
  icon: string;
  courses: string[];
  internalLink: string; // future internal link
}

export const UK_COURSE_CLUSTERS: CourseCluster[] = [
  {
    category: "Computer Science & Technology",
    icon: "Monitor",
    courses: [
      "Computer Science",
      "Artificial Intelligence",
      "Data Science",
      "Cyber Security",
      "Software Engineering",
      "Information Technology",
      "Machine Learning",
    ],
    internalLink: "/courses/uk/computer-science",
  },
  {
    category: "Business & Management",
    icon: "TrendingUp",
    courses: [
      "Business Management",
      "International Business",
      "MBA",
      "Marketing",
      "Entrepreneurship",
      "Business Analytics",
    ],
    internalLink: "/courses/uk/business-management",
  },
  {
    category: "Engineering",
    icon: "Cog",
    courses: [
      "Mechanical Engineering",
      "Civil Engineering",
      "Electrical Engineering",
      "Electronics Engineering",
      "Aerospace Engineering",
      "Engineering Management",
    ],
    internalLink: "/courses/uk/engineering",
  },
  {
    category: "Finance & Economics",
    icon: "PoundSterling",
    courses: [
      "Finance",
      "Accounting",
      "Economics",
      "Financial Management",
      "Investment Management",
    ],
    internalLink: "/courses/uk/finance-economics",
  },
  {
    category: "Healthcare & Life Sciences",
    icon: "Heart",
    courses: [
      "Public Health",
      "Biomedical Sciences",
      "Healthcare Management",
      "Biotechnology",
      "Nursing",
      "Life Sciences",
    ],
    internalLink: "/courses/uk/healthcare",
  },
  {
    category: "Other Popular Fields",
    icon: "Palette",
    courses: [
      "Law",
      "Architecture",
      "Psychology",
      "Media & Communication",
      "Hospitality",
      "Education",
      "Design",
    ],
    internalLink: "/courses/uk/other-fields",
  },
];

// ─── INTAKES ───
export const UK_INTAKES = {
  intakes: [
    {
      name: "September/October Intake",
      description:
        "One of the most popular intakes in the UK, offering a wide variety of undergraduate and postgraduate options across most universities.",
      isPrimary: true,
    },
    {
      name: "January/February Intake",
      description:
        "A helpful option if students are unable to attend the main intake or the programme they have chosen is offered in the winter intake.",
      isPrimary: false,
    },
    {
      name: "Other Intakes",
      description:
        "Some universities and programmes may provide other start dates. Availability varies depending on the university and programme.",
      isPrimary: false,
    },
  ],
  aeoAnswer:
    "September/October is in general the main intake, and January/February is available for certain programmes and universities.",
  disclaimer:
    "Not all universities offer all intakes. This is subject to change depending on the university and programme.",
};

// ─── COST OF STUDY ───
export const UK_COST = {
  heading: "Cost of Studying in the UK for Indian Students",
  intro:
    "The tuition fees for studying in the UK vary according to the university, course, level and city.",
  budgetItems: [
    "Tuition fees",
    "Accommodation",
    "Food",
    "Transportation",
    "Visa expenses",
    "Immigration Health Surcharge",
    "Study materials",
    "Personal expenses",
    "Travel",
    "Emergency funds",
  ],
  formula:
    "Total UK study costs = Tuition costs + Living costs + Visa/IHS costs + Travel costs + Other expenses",
  financialRequirement:
    "The official UK student visa financial requirement is presently £1,529 per month for up to 9 months (London) or £1,171 per month for up to 9 months (outside London). This is subject to the rules and exemptions that apply.",
  londonCost: "£1,529/month",
  outsideLondonCost: "£1,171/month",
  cta: {
    text: "Get a Custom Study-Budget Estimate",
    href: "#lead-form",
  },
};

// ─── EDUCATION LOAN ───
export const UK_EDUCATION_LOAN = {
  heading: "Education Loan for Studying in the UK",
  intro:
    "Going to university in the UK is more than just a choice. For a lot of Indian families, securing the needed money is an equally vital component in the choice.",
  valueProposition:
    "Students will learn about appropriate education financing solutions through DreamDestination according to their academic goals and financial situation.",
  services: [
    "Secured education loans",
    "Unsecured education loans",
    "Bank and NBFC Options",
    "Required documentation",
    "Loan eligibility",
    "Tuition fee funding",
    "Living expense funding",
    "Loan processing",
    "Other loan applications if they were previously declined",
  ],
  unsecuredLoan: {
    question: "Are there any unsecured education loans for UK studies?",
    answer:
      "Education loans can be obtained by a student without any security from the lender based on the eligibility of the student, the university, the course, the academic profile, the co-applicant and the financial assessment. The lender will decide whether to give the loan, the amount, interest rate, term for the loan and what will be accepted as security.",
  },
  rejectedLoan: {
    question: "What if my education loan has been denied?",
    answer:
      "Getting a loan application denied doesn't necessarily mean that your study abroad programme has to be suspended. It is important to first understand why the applicants are being rejected. If a student is eligible, he or she can consider other lenders or another financing option.",
  },
  phoneNumber: "+91 92118 18710",
};

// ─── SCHOLARSHIPS ───
export const UK_SCHOLARSHIPS = {
  heading: "Scholarships to Study in the UK for Indian Students",
  intro:
    "While studying abroad might still be expensive, scholarships can help ease the budget crunch. However, there's no guarantee that you'll qualify for a scholarship, even if you're accepted into a university.",
  categories: [
    {
      title: "University Scholarships",
      description:
        "Numerous UK universities provide scholarships and/or fee reductions for overseas students.",
    },
    {
      title: "Government & External Scholarships",
      items: [
        "Chevening Scholarships",
        "Commonwealth Scholarships",
        "GREAT Scholarships",
        "University-specific awards",
      ],
    },
  ],
  aeoAnswer:
    "Indian students can research university, government and external scholarships based on their academic profile, course, university and eligibility. Scholarships are available; details on availability, value and deadlines will vary, and students should check the conditions for the particular scholarship before they apply.",
};

// ─── ADMISSION REQUIREMENTS ───
export const UK_ADMISSION_REQUIREMENTS = {
  heading:
    "UK University Admission Requirements for Indian Students",
  intro:
    "The requirements vary from university to university and programme to programme, but students are usually required to have:",
  requirements: [
    "Academic transcripts",
    "Class 10 and 12 (if applicable)",
    "Bachelor's degree/transcripts for postgraduate study",
    "English-language test score (if required)",
    "Statement of purpose/personal statement",
    "CV/resume",
    "Letters of recommendation (if applicable)",
    "Portfolio (for selected programmes)",
    "Passport",
    "Work experience documents (where appropriate)",
  ],
  disclaimer:
    "Every university and course has their own requirements and criteria for admission to the UK.",
};

// ─── APPLICATION PROCESS ───
export interface ApplicationStep {
  step: number;
  title: string;
  description: string;
}

export const UK_APPLICATION_PROCESS: ApplicationStep[] = [
  {
    step: 1,
    title: "Profile Assessment",
    description:
      "We understand you, your course preferences, future plans, and budget.",
  },
  {
    step: 2,
    title: "Course Selection",
    description:
      "We match programmes with your academic history and career goals.",
  },
  {
    step: 3,
    title: "University Shortlisting",
    description:
      "Based on course curriculum, entry requirements, tuition fees, location, university reputation, career relevance, and scholarship availability.",
  },
  {
    step: 4,
    title: "Application Preparation",
    description:
      "Prepare your academic papers, SOP/Personal Statement, CV and other necessary paperwork.",
  },
  {
    step: 5,
    title: "University Application",
    description:
      "Apply through the university application process and timelines.",
  },
  {
    step: 6,
    title: "University Offer",
    description: "Receive and accept your university offer letter.",
  },
  {
    step: 7,
    title: "Financial Planning",
    description:
      "Estimate college costs including tuition, living costs, and education loan & scholarship needs.",
  },
  {
    step: 8,
    title: "CAS & Visa Preparation",
    description:
      "Once all university conditions are fulfilled, obtain your CAS and prepare a student visa application.",
  },
  {
    step: 9,
    title: "Pre-Departure",
    description:
      "Make accommodation, travel, fund, and other arrangements prior to travel.",
  },
];

// ─── STUDENT VISA ───
export const UK_STUDENT_VISA = {
  heading: "UK Student Visa for Indian Students",
  intro:
    "For students who have been offered a place of study by a licensed student sponsor in the UK and have fulfilled the immigration requirements for the student visa.",
  fee: "£558",
  feeNote:
    "The fee for an application from outside the UK is the current student visa fee of £558.",
  processingTime:
    "Applications are usually processed within 3 weeks but may be different in some cases.",
  requirements: [
    "Valid passport",
    "Confirmation of Acceptance for Studies (CAS)",
    "Documentation of finances as needed",
    "English language certificate (if applicable)",
    "Tuberculosis test (if applicable)",
    "Academic documents",
    "Visa application",
    "Biometrics",
  ],
  ihs: {
    amount: "£776 per year",
    note: "The Immigration Health Surcharge rate varies based on the visa length.",
  },
  process:
    "University offer → CAS → Financial preparation → Online visa application → Biometrics → Decision → eVisa → Travel",
};

// ─── WORK WHILE STUDYING ───
export const UK_WORK_WHILE_STUDYING = {
  heading: "Working While Studying in the UK",
  intro:
    "Students with student visas may be permitted to work during the course, depending on the course and sponsor, to a limit of a certain number of hours per week.",
  details:
    "The current rules permit up to 20 hours a week during term time and full-time work during vacations for a full-time course of study at a higher education provider (HEP) that has the correct compliance status. Other courses may have other restrictions.",
  disclaimer:
    "Students must always refer to the work conditions included in their immigration permission and not take for granted that all international students are allowed to work.",
};

// ─── POST-STUDY WORK ───
export const UK_POST_STUDY_WORK = {
  heading: "After Studying in the UK",
  intro:
    "Successful completion of an eligible course could allow eligible graduates to apply for the UK Graduate Route.",
  rules: [
    {
      label: "Applications on or before 31 December 2026",
      duration: "2 years",
    },
    {
      label: "Applications from 1 January 2027 onwards",
      duration: "18 months",
    },
    {
      label: "Eligible PhD/doctoral graduates",
      duration: "3 years",
    },
  ],
  note: "There is no extension to the Graduate Route itself; however, if a graduate is eligible to apply for another immigration route, this can be done later on.",
  aeoAnswer:
    "Those students who successfully complete an eligible UK course are eligible to apply for the Graduate Route. Their length of stay will depend on their level of qualification and the date of their application.",
};

// ─── POPULAR CITIES ───
export interface UKCity {
  name: string;
  description: string;
  internalLink: string;
}

export const UK_CITIES: UKCity[] = [
  {
    name: "London",
    description:
      "Good choice of universities, convenient for large industries, but generally a high cost of living.",
    internalLink: "/cities/uk/london",
  },
  {
    name: "Manchester",
    description:
      "Popular for students seeking a major city with a good student population and a wide variety of industries.",
    internalLink: "/cities/uk/manchester",
  },
  {
    name: "Birmingham",
    description:
      "A big student city where there are universities in various fields.",
    internalLink: "/cities/uk/birmingham",
  },
  {
    name: "Edinburgh",
    description:
      "A good choice for students who want to attend a university that is known worldwide and offers a Scottish education.",
    internalLink: "/cities/uk/edinburgh",
  },
  {
    name: "Glasgow",
    description:
      "Famous for its students and moderate cost of study.",
    internalLink: "/cities/uk/glasgow",
  },
  {
    name: "Bristol",
    description:
      "Popular for engineering, technology, business, and other disciplines.",
    internalLink: "/cities/uk/bristol",
  },
  {
    name: "Leeds",
    description:
      "A city where students have a wide range of career opportunities in various fields such as business, healthcare, technology, etc.",
    internalLink: "/cities/uk/leeds",
  },
];

// ─── DOCUMENTS REQUIRED ───
export const UK_DOCUMENTS = {
  heading: "Documents Required to Study in the UK",
  intro:
    "Depending on your course and university, you might require:",
  documents: [
    "Passport",
    "Academic transcripts",
    "Degree/provisional certificate",
    "English-language test result",
    "SOP/personal statement",
    "CV",
    "Letters of recommendation",
    "Portfolio (where applicable)",
    "Work experience documents",
    "Financial documents",
    "Scholarship documents (where applicable)",
    "Visa-related documents",
  ],
  disclaimer:
    "Specific requirements differ from university to program.",
};

// ─── WHY DreamDestination ───
export interface WhyDDItem {
  title: string;
  description: string;
  icon: string;
}

export const UK_WHY_DD: WhyDDItem[] = [
  {
    title: "Profile-Based Counselling",
    description:
      "We don't recommend a university simply because it is popular. Your academics, career objectives, budget, and preferred course are taken into consideration.",
    icon: "UserCheck",
  },
  {
    title: "University & Course Guidance",
    description:
      "Know what you have to choose from before you apply.",
    icon: "GraduationCap",
  },
  {
    title: "Admission Assistance",
    description:
      "Get information on university selection, documentation, and applying.",
    icon: "FileText",
  },
  {
    title: "Visa Guidance",
    description:
      "Understand the student visa process, required documents, and financial requirements.",
    icon: "Shield",
  },
  {
    title: "Education Loan Assistance",
    description:
      "Look into appropriate secured and unsecured education loan choices as per your profile.",
    icon: "Wallet",
  },
  {
    title: "Loan Rejection Support",
    description:
      "If you have applied for a loan previously and that application was denied, we can assist you in seeing options that may be available, depending on lender eligibility.",
    icon: "RefreshCw",
  },
  {
    title: "Online Support Across India",
    description:
      "Students in India can seek counselling and application support from us online.",
    icon: "Globe",
  },
];

// ─── LEAD FORM FIELDS ───
export const UK_LEAD_FORM = {
  heading: "Choose the Best Study Options in the UK",
  fields: [
    { name: "fullName", label: "Full Name", type: "text", required: true },
    {
      name: "mobile",
      label: "Mobile Number",
      type: "tel",
      required: true,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
    },
    {
      name: "highestQualification",
      label: "Highest Qualification",
      type: "select",
      options: [
        "10th Pass",
        "12th Pass",
        "Bachelor's Degree",
        "Master's Degree",
        "Other",
      ],
      required: true,
    },
    {
      name: "graduationYear",
      label: "Graduation Year",
      type: "select",
      options: ["2023", "2024", "2025", "2026", "2027", "Other"],
      required: true,
    },
    {
      name: "preferredCourse",
      label: "Preferred Course",
      type: "text",
      required: true,
    },
    {
      name: "preferredIntake",
      label: "Preferred Intake",
      type: "select",
      options: [
        "September/October 2026",
        "January/February 2027",
        "September/October 2027",
        "Not Sure",
      ],
      required: true,
    },
    {
      name: "approximateBudget",
      label: "Approximate Budget",
      type: "select",
      options: [
        "Below ₹15 Lakhs",
        "₹15-25 Lakhs",
        "₹25-40 Lakhs",
        "₹40-60 Lakhs",
        "Above ₹60 Lakhs",
        "Not Sure",
      ],
      required: true,
    },
    {
      name: "educationLoan",
      label: "Need Education Loan Support?",
      type: "select",
      options: ["Yes", "No", "Not Sure"],
      required: true,
    },
  ],
  ctaText: "Check My UK Options",
};

// ─── AEO FAQ ───
export interface AEOFAQ {
  question: string;
  answer: string;
}

export const UK_AEO_FAQS: AEOFAQ[] = [
  {
    question: "Is the UK good for Indian students?",
    answer:
      "The UK can be a strong study destination for Indian students because of its globally recognised universities, wide range of courses and opportunities for international academic and career exposure.",
  },
  {
    question:
      "How much does it cost to study in the UK for Indian students?",
    answer:
      "The total cost depends on tuition fees, university, course, city, accommodation and lifestyle. Students should also budget for visa-related expenses, healthcare surcharge, travel and other living costs.",
  },
  {
    question:
      "What are the popular courses to study in the UK?",
    answer:
      "Popular options include Computer Science, Data Science, Artificial Intelligence, Engineering, Business Management, Finance, Healthcare, Law, Architecture and Social Sciences.",
  },
  {
    question:
      "Which intake is best for studying in the UK?",
    answer:
      "September/October is generally the major intake, while January/February is available for selected courses and universities.",
  },
  {
    question:
      "Can I study a master's in the UK in one year?",
    answer:
      "Yes. Many UK universities offer one-year master's programmes, although duration depends on the specific course and university.",
  },
  {
    question:
      "Can Indian students get an education loan for UK studies?",
    answer:
      "Eligible Indian students may be able to obtain secured or unsecured education financing depending on the lender's policies, student profile, course, university and co-applicant/financial profile.",
  },
  {
    question:
      "Can I get an unsecured education loan for studying in the UK?",
    answer:
      "An unsecured education loan may be available to eligible students. Approval and loan amount depend on the lender's assessment and cannot be guaranteed.",
  },
  {
    question:
      "What happens if my education loan is rejected?",
    answer:
      "The reason for rejection should first be identified. Depending on your circumstances, you may explore alternative lenders or financing options for which you are eligible.",
  },
  {
    question:
      "Can Indian students work while studying in the UK?",
    answer:
      "Eligible students may be allowed to work subject to the conditions attached to their Student visa. For eligible degree-level students, the current limit can be up to 20 hours per week during term time.",
  },
  {
    question:
      "How much money do I need to show for a UK Student visa?",
    answer:
      "The financial requirement currently includes the course fee plus living costs of £1,529 per month in London or £1,171 per month outside London, generally for up to nine months, subject to applicable rules and exemptions.",
  },
  {
    question: "How much is the UK Student visa fee?",
    answer:
      "The current Student visa application fee from outside the UK is £558.",
  },
  {
    question:
      "Can I stay in the UK after completing my studies?",
    answer:
      "Eligible graduates can apply for the Graduate Route. The current duration is 2 years for applications made on or before 31 December 2026 and 18 months for applications made from 1 January 2027; eligible doctoral graduates can receive 3 years.",
  },
  {
    question: "Do I need IELTS to study in the UK?",
    answer:
      "English-language requirements depend on the university, course and your circumstances. Some institutions may accept alternatives or waive certain requirements where their rules allow.",
  },
  {
    question:
      "How can I apply to a UK university from India?",
    answer:
      "Start by selecting a suitable course and university, checking eligibility, preparing documents, submitting the application, receiving the offer, meeting conditions, obtaining CAS where required and then preparing the Student visa application.",
  },
  {
    question:
      "How do I choose the right UK university?",
    answer:
      "Consider course curriculum, entry requirements, tuition fees, location, university reputation, career outcomes, accommodation costs, scholarships and your own academic profile — not ranking alone.",
  },
];

// ─── TOP UK UNIVERSITIES ───
export interface UKUniversity {
  name: string;
  location: string;
  ranking: string; // CUG 2026 based ranking descriptor
  popularSubjects: string[];
  website: string;
  tier: "top" | "more";
}

export const UK_UNIVERSITIES: UKUniversity[] = [
  // ─── TOP UK UNIVERSITIES (25) ───
  {
    name: "University of Cambridge",
    location: "Cambridge, England",
    ranking: "CUG #1",
    popularSubjects: ["Engineering", "Sciences", "Technology", "Business", "Humanities"],
    website: "https://www.cam.ac.uk",
    tier: "top",
  },
  {
    name: "University of Oxford",
    location: "Oxford, England",
    ranking: "CUG #2",
    popularSubjects: ["Humanities", "Social Sciences", "Business", "Medicine"],
    website: "https://www.ox.ac.uk",
    tier: "top",
  },
  {
    name: "London School of Economics and Political Science (LSE)",
    location: "London, England",
    ranking: "CUG #3",
    popularSubjects: ["Economics", "Finance", "Political Science", "Law", "Management"],
    website: "https://www.lse.ac.uk",
    tier: "top",
  },
  {
    name: "University of St Andrews",
    location: "St Andrews, Scotland",
    ranking: "CUG #4",
    popularSubjects: ["Arts", "Sciences", "International Relations", "Philosophy"],
    website: "https://www.st-andrews.ac.uk",
    tier: "top",
  },
  {
    name: "Durham University",
    location: "Durham, England",
    ranking: "CUG #5",
    popularSubjects: ["Law", "Business", "Engineering", "Sciences", "Humanities"],
    website: "https://www.durham.ac.uk",
    tier: "top",
  },
  {
    name: "Imperial College London",
    location: "London, England",
    ranking: "CUG #6",
    popularSubjects: ["Engineering", "Computing", "Business", "Medicine", "Science"],
    website: "https://www.imperial.ac.uk",
    tier: "top",
  },
  {
    name: "Loughborough University",
    location: "Loughborough, England",
    ranking: "CUG #7",
    popularSubjects: ["Engineering", "Sports Science", "Business", "Design", "Sciences"],
    website: "https://www.lboro.ac.uk",
    tier: "top",
  },
  {
    name: "University of Bath",
    location: "Bath, England",
    ranking: "CUG #8",
    popularSubjects: ["Engineering", "Business", "Sciences", "Architecture", "Social Sciences"],
    website: "https://www.bath.ac.uk",
    tier: "top",
  },
  {
    name: "Lancaster University",
    location: "Lancaster, England",
    ranking: "CUG #9",
    popularSubjects: ["Business", "Engineering", "Linguistics", "Environmental Science"],
    website: "https://www.lancaster.ac.uk",
    tier: "top",
  },
  {
    name: "University of Warwick",
    location: "Coventry, England",
    ranking: "CUG #10",
    popularSubjects: ["Business", "Economics", "Engineering", "Computer Science", "Mathematics"],
    website: "https://www.warwick.ac.uk",
    tier: "top",
  },
  {
    name: "University of Exeter",
    location: "Exeter, England",
    ranking: "CUG #11",
    popularSubjects: ["Business", "Engineering", "Sciences", "Arts", "Law"],
    website: "https://www.exeter.ac.uk",
    tier: "top",
  },
  {
    name: "University of Bristol",
    location: "Bristol, England",
    ranking: "CUG #12",
    popularSubjects: ["Engineering", "Computer Science", "Business", "Sciences"],
    website: "https://www.bristol.ac.uk",
    tier: "top",
  },
  {
    name: "University of Surrey",
    location: "Guildford, England",
    ranking: "CUG #13",
    popularSubjects: ["Engineering", "Business", "Hospitality", "Sciences", "Health"],
    website: "https://www.surrey.ac.uk",
    tier: "top",
  },
  {
    name: "University of Birmingham",
    location: "Birmingham, England",
    ranking: "CUG #14",
    popularSubjects: ["Engineering", "Business", "Computer Science", "Healthcare", "Sciences"],
    website: "https://www.birmingham.ac.uk",
    tier: "top",
  },
  {
    name: "University of Edinburgh",
    location: "Edinburgh, Scotland",
    ranking: "CUG #15",
    popularSubjects: ["Computer Science", "Engineering", "Business", "Medicine", "Humanities"],
    website: "https://www.ed.ac.uk",
    tier: "top",
  },
  {
    name: "University of Leeds",
    location: "Leeds, England",
    ranking: "CUG #16",
    popularSubjects: ["Engineering", "Business", "Medicine", "Arts", "Social Sciences"],
    website: "https://www.leeds.ac.uk",
    tier: "top",
  },
  {
    name: "University of Southampton",
    location: "Southampton, England",
    ranking: "CUG #17",
    popularSubjects: ["Engineering", "Computer Science", "Electronics", "Marine Science", "Business"],
    website: "https://www.southampton.ac.uk",
    tier: "top",
  },
  {
    name: "University of Nottingham",
    location: "Nottingham, England",
    ranking: "CUG #18",
    popularSubjects: ["Engineering", "Pharmacy", "Business", "Sciences", "Law"],
    website: "https://www.nottingham.ac.uk",
    tier: "top",
  },
  {
    name: "University of Manchester",
    location: "Manchester, England",
    ranking: "CUG #19",
    popularSubjects: ["Engineering", "Computer Science", "Business", "Life Sciences", "Social Sciences"],
    website: "https://www.manchester.ac.uk",
    tier: "top",
  },
  {
    name: "University of Sheffield",
    location: "Sheffield, England",
    ranking: "CUG #20",
    popularSubjects: ["Engineering", "Architecture", "Business", "Sciences", "Social Sciences"],
    website: "https://www.sheffield.ac.uk",
    tier: "top",
  },
  {
    name: "University of York",
    location: "York, England",
    ranking: "CUG #21",
    popularSubjects: ["Computer Science", "Psychology", "Business", "Sciences", "Humanities"],
    website: "https://www.york.ac.uk",
    tier: "top",
  },
  {
    name: "University of Glasgow",
    location: "Glasgow, Scotland",
    ranking: "CUG #22",
    popularSubjects: ["Engineering", "Medicine", "Business", "Law", "Arts"],
    website: "https://www.gla.ac.uk",
    tier: "top",
  },
  {
    name: "University of Liverpool",
    location: "Liverpool, England",
    ranking: "CUG #23",
    popularSubjects: ["Engineering", "Medicine", "Business", "Architecture", "Sciences"],
    website: "https://www.liverpool.ac.uk",
    tier: "top",
  },
  {
    name: "Newcastle University",
    location: "Newcastle upon Tyne, England",
    ranking: "CUG #24",
    popularSubjects: ["Engineering", "Medicine", "Business", "Architecture", "Sciences"],
    website: "https://www.ncl.ac.uk",
    tier: "top",
  },
  {
    name: "University of Reading",
    location: "Reading, England",
    ranking: "CUG #25",
    popularSubjects: ["Agriculture", "Business", "Law", "Sciences", "Real Estate"],
    website: "https://www.reading.ac.uk",
    tier: "top",
  },

  // ─── MORE UK UNIVERSITIES (50+) ───
  {
    name: "Queen Mary University of London",
    location: "London, England",
    ranking: "Top 40 UK",
    popularSubjects: ["Law", "Medicine", "Engineering", "Business", "Sciences"],
    website: "https://www.qmul.ac.uk",
    tier: "more",
  },
  {
    name: "Cardiff University",
    location: "Cardiff, Wales",
    ranking: "Top 30 UK",
    popularSubjects: ["Engineering", "Business", "Medicine", "Psychology", "Sciences"],
    website: "https://www.cardiff.ac.uk",
    tier: "more",
  },
  {
    name: "Queen's University Belfast",
    location: "Belfast, Northern Ireland",
    ranking: "Top 35 UK",
    popularSubjects: ["Engineering", "Medicine", "Law", "Business", "Sciences"],
    website: "https://www.qub.ac.uk",
    tier: "more",
  },
  {
    name: "University of Aberdeen",
    location: "Aberdeen, Scotland",
    ranking: "Top 40 UK",
    popularSubjects: ["Energy Engineering", "Medicine", "Law", "Sciences", "Business"],
    website: "https://www.abdn.ac.uk",
    tier: "more",
  },
  {
    name: "University of Strathclyde",
    location: "Glasgow, Scotland",
    ranking: "Top 35 UK",
    popularSubjects: ["Engineering", "Business", "Sciences", "Law", "Pharmacy"],
    website: "https://www.strath.ac.uk",
    tier: "more",
  },
  {
    name: "Heriot-Watt University",
    location: "Edinburgh, Scotland",
    ranking: "Top 40 UK",
    popularSubjects: ["Engineering", "Business", "Sciences", "Built Environment", "Computing"],
    website: "https://www.hw.ac.uk",
    tier: "more",
  },
  {
    name: "University of East Anglia",
    location: "Norwich, England",
    ranking: "Top 35 UK",
    popularSubjects: ["Environmental Sciences", "Medicine", "Business", "Arts", "Sciences"],
    website: "https://www.uea.ac.uk",
    tier: "more",
  },
  {
    name: "University of Leicester",
    location: "Leicester, England",
    ranking: "Top 40 UK",
    popularSubjects: ["Medicine", "Law", "Business", "Sciences", "Computing"],
    website: "https://www.le.ac.uk",
    tier: "more",
  },
  {
    name: "University of Sussex",
    location: "Brighton, England",
    ranking: "Top 40 UK",
    popularSubjects: ["Development Studies", "Business", "Sciences", "Arts", "Engineering"],
    website: "https://www.sussex.ac.uk",
    tier: "more",
  },
  {
    name: "University of Kent",
    location: "Canterbury, England",
    ranking: "Top 50 UK",
    popularSubjects: ["Law", "Business", "Social Sciences", "Arts", "Computing"],
    website: "https://www.kent.ac.uk",
    tier: "more",
  },
  {
    name: "University of Essex",
    location: "Colchester, England",
    ranking: "Top 50 UK",
    popularSubjects: ["Social Sciences", "Business", "Computing", "Law", "Arts"],
    website: "https://www.essex.ac.uk",
    tier: "more",
  },
  {
    name: "University of Stirling",
    location: "Stirling, Scotland",
    ranking: "Top 50 UK",
    popularSubjects: ["Sports Studies", "Business", "Sciences", "Media", "Education"],
    website: "https://www.stir.ac.uk",
    tier: "more",
  },
  {
    name: "University of Dundee",
    location: "Dundee, Scotland",
    ranking: "Top 45 UK",
    popularSubjects: ["Medicine", "Life Sciences", "Art & Design", "Engineering", "Business"],
    website: "https://www.dundee.ac.uk",
    tier: "more",
  },
  {
    name: "University of Plymouth",
    location: "Plymouth, England",
    ranking: "Top 60 UK",
    popularSubjects: ["Marine Science", "Engineering", "Health", "Business", "Arts"],
    website: "https://www.plymouth.ac.uk",
    tier: "more",
  },
  {
    name: "Swansea University",
    location: "Swansea, Wales",
    ranking: "Top 45 UK",
    popularSubjects: ["Engineering", "Business", "Sciences", "Medicine", "Law"],
    website: "https://www.swansea.ac.uk",
    tier: "more",
  },
  {
    name: "Aston University",
    location: "Birmingham, England",
    ranking: "Top 45 UK",
    popularSubjects: ["Business", "Engineering", "Pharmacy", "Sciences", "Languages"],
    website: "https://www.aston.ac.uk",
    tier: "more",
  },
  {
    name: "University of Hull",
    location: "Hull, England",
    ranking: "Top 60 UK",
    popularSubjects: ["Engineering", "Business", "Sciences", "Health", "Social Sciences"],
    website: "https://www.hull.ac.uk",
    tier: "more",
  },
  {
    name: "University of Portsmouth",
    location: "Portsmouth, England",
    ranking: "Top 50 UK",
    popularSubjects: ["Engineering", "Business", "Computing", "Creative Industries", "Sciences"],
    website: "https://www.port.ac.uk",
    tier: "more",
  },
  {
    name: "Oxford Brookes University",
    location: "Oxford, England",
    ranking: "Top 50 UK",
    popularSubjects: ["Architecture", "Business", "Computing", "Health", "Hospitality"],
    website: "https://www.brookes.ac.uk",
    tier: "more",
  },
  {
    name: "Nottingham Trent University",
    location: "Nottingham, England",
    ranking: "Top 50 UK",
    popularSubjects: ["Business", "Art & Design", "Computing", "Law", "Sciences"],
    website: "https://www.ntu.ac.uk",
    tier: "more",
  },
  {
    name: "Coventry University",
    location: "Coventry, England",
    ranking: "Top 55 UK",
    popularSubjects: ["Engineering", "Business", "Computing", "Design", "Health"],
    website: "https://www.coventry.ac.uk",
    tier: "more",
  },
  {
    name: "University of Greenwich",
    location: "London, England",
    ranking: "Top 80 UK",
    popularSubjects: ["Business", "Engineering", "Computing", "Architecture", "Education"],
    website: "https://www.gre.ac.uk",
    tier: "more",
  },
  {
    name: "University of Westminster",
    location: "London, England",
    ranking: "Top 80 UK",
    popularSubjects: ["Media", "Business", "Architecture", "Law", "Sciences"],
    website: "https://www.westminster.ac.uk",
    tier: "more",
  },
  {
    name: "Kingston University",
    location: "London, England",
    ranking: "Top 80 UK",
    popularSubjects: ["Art & Design", "Business", "Engineering", "Computing", "Health"],
    website: "https://www.kingston.ac.uk",
    tier: "more",
  },
  {
    name: "Brunel University London",
    location: "London, England",
    ranking: "Top 55 UK",
    popularSubjects: ["Engineering", "Business", "Design", "Health", "Social Sciences"],
    website: "https://www.brunel.ac.uk",
    tier: "more",
  },
  {
    name: "City, University of London",
    location: "London, England",
    ranking: "Top 50 UK",
    popularSubjects: ["Business (Bayes)", "Law", "Health", "Engineering", "Journalism"],
    website: "https://www.city.ac.uk",
    tier: "more",
  },
  {
    name: "Middlesex University",
    location: "London, England",
    ranking: "Top 90 UK",
    popularSubjects: ["Business", "Art & Design", "Computing", "Health", "Education"],
    website: "https://www.mdx.ac.uk",
    tier: "more",
  },
  {
    name: "University of Roehampton",
    location: "London, England",
    ranking: "Top 90 UK",
    popularSubjects: ["Education", "Business", "Life Sciences", "Media", "Psychology"],
    website: "https://www.roehampton.ac.uk",
    tier: "more",
  },
  {
    name: "University of East London",
    location: "London, England",
    ranking: "Top 100 UK",
    popularSubjects: ["Business", "Computing", "Architecture", "Health", "Psychology"],
    website: "https://www.uel.ac.uk",
    tier: "more",
  },
  {
    name: "London Metropolitan University",
    location: "London, England",
    ranking: "Top 120 UK",
    popularSubjects: ["Business", "Computing", "Art & Design", "Law", "Social Sciences"],
    website: "https://www.londonmet.ac.uk",
    tier: "more",
  },
  {
    name: "University of Hertfordshire",
    location: "Hatfield, England",
    ranking: "Top 70 UK",
    popularSubjects: ["Engineering", "Business", "Computer Science", "Health", "Creative Arts"],
    website: "https://www.herts.ac.uk",
    tier: "more",
  },
  {
    name: "University of Bedfordshire",
    location: "Luton, England",
    ranking: "Top 120 UK",
    popularSubjects: ["Business", "Computing", "Media", "Health", "Education"],
    website: "https://www.beds.ac.uk",
    tier: "more",
  },
  {
    name: "University of Northampton",
    location: "Northampton, England",
    ranking: "Top 100 UK",
    popularSubjects: ["Business", "Health", "Education", "Computing", "Engineering"],
    website: "https://www.northampton.ac.uk",
    tier: "more",
  },
  {
    name: "University of Central Lancashire",
    location: "Preston, England",
    ranking: "Top 80 UK",
    popularSubjects: ["Business", "Engineering", "Health", "Media", "Computing"],
    website: "https://www.uclan.ac.uk",
    tier: "more",
  },
  {
    name: "Sheffield Hallam University",
    location: "Sheffield, England",
    ranking: "Top 60 UK",
    popularSubjects: ["Business", "Engineering", "Art & Design", "Computing", "Health"],
    website: "https://www.shu.ac.uk",
    tier: "more",
  },
  {
    name: "Leeds Beckett University",
    location: "Leeds, England",
    ranking: "Top 80 UK",
    popularSubjects: ["Business", "Sport", "Health", "Computing", "Built Environment"],
    website: "https://www.leedsbeckett.ac.uk",
    tier: "more",
  },
  {
    name: "Manchester Metropolitan University",
    location: "Manchester, England",
    ranking: "Top 60 UK",
    popularSubjects: ["Business", "Art & Design", "Engineering", "Health", "Education"],
    website: "https://www.mmu.ac.uk",
    tier: "more",
  },
  {
    name: "Birmingham City University",
    location: "Birmingham, England",
    ranking: "Top 70 UK",
    popularSubjects: ["Business", "Engineering", "Art & Design", "Health", "Computing"],
    website: "https://www.bcu.ac.uk",
    tier: "more",
  },
  {
    name: "De Montfort University",
    location: "Leicester, England",
    ranking: "Top 65 UK",
    popularSubjects: ["Business", "Engineering", "Art & Design", "Computing", "Health"],
    website: "https://www.dmu.ac.uk",
    tier: "more",
  },
  {
    name: "University of Derby",
    location: "Derby, England",
    ranking: "Top 60 UK",
    popularSubjects: ["Business", "Engineering", "Computing", "Health", "Education"],
    website: "https://www.derby.ac.uk",
    tier: "more",
  },
  {
    name: "Staffordshire University",
    location: "Stoke-on-Trent, England",
    ranking: "Top 80 UK",
    popularSubjects: ["Computing", "Business", "Engineering", "Games Design", "Health"],
    website: "https://www.staffs.ac.uk",
    tier: "more",
  },
  {
    name: "University of Wolverhampton",
    location: "Wolverhampton, England",
    ranking: "Top 100 UK",
    popularSubjects: ["Business", "Engineering", "Computing", "Health", "Education"],
    website: "https://www.wlv.ac.uk",
    tier: "more",
  },
  {
    name: "University of Salford",
    location: "Salford, England",
    ranking: "Top 70 UK",
    popularSubjects: ["Business", "Engineering", "Media", "Health", "Computing"],
    website: "https://www.salford.ac.uk",
    tier: "more",
  },
  {
    name: "Liverpool John Moores University",
    location: "Liverpool, England",
    ranking: "Top 60 UK",
    popularSubjects: ["Business", "Engineering", "Computing", "Health", "Sports"],
    website: "https://www.ljmu.ac.uk",
    tier: "more",
  },
  {
    name: "University of Huddersfield",
    location: "Huddersfield, England",
    ranking: "Top 70 UK",
    popularSubjects: ["Engineering", "Business", "Health", "Computing", "Music"],
    website: "https://www.hud.ac.uk",
    tier: "more",
  },
  {
    name: "University of Bradford",
    location: "Bradford, England",
    ranking: "Top 75 UK",
    popularSubjects: ["Engineering", "Business", "Health", "Computing", "Pharmacy"],
    website: "https://www.bradford.ac.uk",
    tier: "more",
  },
  {
    name: "Teesside University",
    location: "Middlesbrough, England",
    ranking: "Top 80 UK",
    popularSubjects: ["Computing", "Engineering", "Business", "Digital Media", "Health"],
    website: "https://www.tees.ac.uk",
    tier: "more",
  },
  {
    name: "University of Sunderland",
    location: "Sunderland, England",
    ranking: "Top 90 UK",
    popularSubjects: ["Business", "Computing", "Engineering", "Health", "Media"],
    website: "https://www.sunderland.ac.uk",
    tier: "more",
  },
  {
    name: "Northumbria University",
    location: "Newcastle upon Tyne, England",
    ranking: "Top 50 UK",
    popularSubjects: ["Business", "Engineering", "Art & Design", "Computing", "Health"],
    website: "https://www.northumbria.ac.uk",
    tier: "more",
  },
  {
    name: "University of Cumbria",
    location: "Carlisle, England",
    ranking: "Top 120 UK",
    popularSubjects: ["Education", "Business", "Health", "Outdoor Studies", "Arts"],
    website: "https://www.cumbria.ac.uk",
    tier: "more",
  },
  {
    name: "University of Bolton",
    location: "Bolton, England",
    ranking: "Top 120 UK",
    popularSubjects: ["Engineering", "Business", "Computing", "Education", "Health"],
    website: "https://www.bolton.ac.uk",
    tier: "more",
  },
  {
    name: "University College London (UCL)",
    location: "London, England",
    ranking: "QS #9 World",
    popularSubjects: ["Engineering", "Computer Science", "Architecture", "Medicine", "Social Sciences"],
    website: "https://www.ucl.ac.uk",
    tier: "top",
  },
  {
    name: "King's College London",
    location: "London, England",
    ranking: "QS #36 World",
    popularSubjects: ["Healthcare", "Law", "Business", "Social Sciences", "Humanities"],
    website: "https://www.kcl.ac.uk",
    tier: "top",
  },
];

// ─── URL MAPPING UTILITY ───
export const getCountryStudyUrl = (slug: string): string => {
  return `/study-in-${slug}`;
};
