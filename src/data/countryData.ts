export interface College {
  name: string;
  location: string;
  ranking: string;
  programs: string[];
  website: string;
  logo?: string;
  shortName?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CountryService {
  title: string;
  description: string;
  features: string[];
}

export interface EducationLoan {
  maxAmount: string;
  interestRate: string;
  collateral: string;
  repaymentPeriod: string;
  processingTime: string;
  highlights: string[];
}

export interface CountryData {
  slug: string;
  name: string;
  flag: string;
  heroTagline: string;
  description: string;
  longDescription: string;
  universities: string;
  avgCost: string;
  livingCost: string;
  workPermit: string;
  scholarships: string;
  visaSuccessRate: string;
  intakeMonths: string;
  currency: string;
  language: string;
  gradient: string;
  colleges: College[];
  collegeCount: number;
  programs: string[];
  keywords: string[];
  services: CountryService[];
  educationLoan: EducationLoan;
  eligibility: string[];
  englishTests: string[];
  documentsRequired: string[];
  faqs: FAQ[];
  metaTitle: string;
  metaDescription: string;
}

const SITE_DOMAIN = "https://www.dreamdestinationstudyabroad.com";
const ORG_NAME = "DreamDestination";

/**
 * NOTE ON `visaSuccessRate`
 *
 * This field used to hold a percentage — 95% for the UK, 92% for New Zealand and
 * so on, for all 22 countries. Every one of those numbers was invented.
 *
 * They are not merely unsourced, they are contradictable. Immigration New Zealand
 * publishes offshore student visa decisions BY NATIONALITY: the approval rate for
 * Indian applicants was 48% in 2024 and 59% in 2025 — not 92%. The UK, Germany,
 * Ireland, France and the UAE publish no student approval rate for Indian
 * applicants at all, so no figure for them can be sourced in either direction.
 *
 * Displaying a fabricated approval rate next to a loan decision is the worst
 * possible place to put one. The field now carries the OFFICIAL NAME OF THE VISA
 * CATEGORY instead — true, checkable, useful, and a better keyword ('subclass
 * 500', 'F-1 visa', 'VLS-TS' are all real searches). The UI label was changed
 * from 'Visa Success' to 'Visa Route' to match.
 *
 * DO NOT put a percentage back here without a named government source and a date.
 */
export const countriesData: CountryData[] = [
  // ============================================================
  // 1. UK
  // ============================================================
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    heroTagline: "World-Class Education in the Heart of Europe",
    description: "Study in the UK and access centuries-old institutions known for academic excellence, cutting-edge research, and global recognition.",
    longDescription: "The United Kingdom is home to some of the world's most prestigious universities, including Oxford, Cambridge, and Imperial College London. With a rich academic heritage spanning centuries, UK universities consistently rank among the global top 100. Indian students benefit from a 2-year post-study work visa, diverse course options, and a multicultural environment. DreamDestination provides end-to-end support for your UK education journey — from university selection and SOP writing to education loans and visa assistance.",
    universities: "200+",
    avgCost: "₹20-50L/year",
    livingCost: "₹80,000-1,50,000/month",
    workPermit: "2-Year Post-Study Work Visa (Graduate Route)",
    scholarships: "Chevening, Commonwealth, GREAT Scholarships",
    visaSuccessRate: "Student visa (PBS)",
    intakeMonths: "September, January, May",
    currency: "GBP (£)",
    language: "English",
    gradient: "bg-gradient-hero",
    colleges: [
      { name: "University of Oxford", location: "Oxford, England", ranking: "QS #3", programs: ["Law", "Medicine", "Engineering", "Business", "Sciences"], website: "https://www.ox.ac.uk" },
      { name: "University of Cambridge", location: "Cambridge, England", ranking: "QS #2", programs: ["Mathematics", "Engineering", "Natural Sciences", "Economics"], website: "https://www.cam.ac.uk" },
      { name: "Imperial College London", location: "London, England", ranking: "QS #6", programs: ["Engineering", "Medicine", "Business", "Computing", "Science"], website: "https://www.imperial.ac.uk" },
      { name: "University College London (UCL)", location: "London, England", ranking: "QS #9", programs: ["Architecture", "Law", "Medicine", "Engineering", "Arts"], website: "https://www.ucl.ac.uk" },
      { name: "University of Edinburgh", location: "Edinburgh, Scotland", ranking: "QS #27", programs: ["Informatics", "Medicine", "Law", "Business", "Engineering"], website: "https://www.ed.ac.uk" },
      { name: "University of Manchester", location: "Manchester, England", ranking: "QS #32", programs: ["Engineering", "Business", "Computer Science", "Biosciences"], website: "https://www.manchester.ac.uk" },
      { name: "King's College London", location: "London, England", ranking: "QS #40", programs: ["Law", "Medicine", "Dentistry", "Social Sciences", "Nursing"], website: "https://www.kcl.ac.uk" },
      { name: "London School of Economics (LSE)", location: "London, England", ranking: "QS #45", programs: ["Economics", "Finance", "Political Science", "Law", "Management"], website: "https://www.lse.ac.uk" },
      { name: "University of Bristol", location: "Bristol, England", ranking: "QS #55", programs: ["Engineering", "Law", "Medicine", "Arts", "Social Sciences"], website: "https://www.bristol.ac.uk" },
      { name: "University of Warwick", location: "Coventry, England", ranking: "QS #67", programs: ["Business", "Economics", "Engineering", "Mathematics", "Computer Science"], website: "https://www.warwick.ac.uk" }
    ],
    collegeCount: 200,
    programs: ["Engineering", "Business & Management", "Medicine", "Law", "Computer Science", "Arts & Design"],
    keywords: [
      "study in uk", "study in united kingdom", "uk education consultancy",
      "education loan for uk", "uk student visa", "uk study visa from india",
      "best universities in uk", "top colleges in uk", "uk university admission",
      "mba in uk", "ms in uk", "engineering in uk", "study medicine in uk",
      "uk scholarship for indian students", "chevening scholarship",
      "cost of studying in uk", "uk tuition fees for indian students",
      "post study work visa uk", "graduate route visa uk",
      "university of oxford admission", "imperial college london fees",
      "ucl admission for indian students", "study abroad consultant uk",
      "ielts score for uk universities", "uk education loan without collateral"
    ],
    services: [
      { title: "UK University Admission Support", description: "Complete guidance for applying to top UK universities including Russell Group institutions.", features: ["UCAS Application", "Personal Statement Writing", "University Shortlisting", "Interview Preparation"] },
      { title: "UK Education Loan", description: "Independent guidance on secured, unsecured and collateral-free routes for UK studies. We take no commission from any lender.", features: ["Secured and unsecured routes", "No Collateral Options", "Quick Disbursement", "Flexible EMI"] },
      { title: "UK Student Visa Assistance", description: "Document preparation, financial evidence review and application support for the UK student visa.", features: ["CAS Letter Guidance", "Financial Documentation", "Visa Interview Prep", "Application Filing"] },
      { title: "UK Accommodation & Travel", description: "Pre-departure support including accommodation booking and travel arrangements.", features: ["University Halls", "Private Accommodation", "Airport Pickup", "Pre-departure Briefing"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 15 years",
      processingTime: "Depends on your file",
      highlights: ["Covers tuition + living expenses", "Moratorium period during studies", "Tax benefits under Section 80E", "Co-applicant required", "Pre-visa disbursement available"]
    },
    eligibility: ["Confirmed offer from a recognized UK university", "Minimum 60% in graduation/12th", "Valid passport", "IELTS 6.0+ / TOEFL 80+", "Financial proof for visa"],
    englishTests: ["IELTS Academic (6.0-7.0)", "TOEFL iBT (80-100)", "PTE Academic (55-65)", "Cambridge English (C1 Advanced)"],
    documentsRequired: ["Valid Passport", "University Offer Letter (CAS)", "Academic Transcripts", "IELTS/TOEFL Score Report", "Financial Proof (28 days)", "TB Test Certificate", "SOP & LORs", "CV/Resume"],
    faqs: [
      { question: "What is the cost of studying in the UK for Indian students?", answer: "The average tuition fee for Indian students in the UK ranges from ₹20 Lakhs to ₹50 Lakhs per year depending on the university and course. Living expenses typically range from ₹80,000 to ₹1,50,000 per month. DreamDestination helps you find affordable options and secure education loans." },
      { question: "Can I work while studying in the UK?", answer: "Yes! International students on a Tier 4 visa can work up to 20 hours per week during term time and full-time during holidays. After graduation, the Graduate Route visa allows you to work for 2 years (3 years for PhD graduates)." },
      { question: "What is the UK Graduate Route visa?", answer: "The Graduate Route visa allows international students to stay and work in the UK for 2 years after completing their degree (3 years for PhD). No sponsorship is required, and you can work in any field at any skill level." },
      { question: "How do I get an education loan for UK studies?", answer: "Start as soon as you have an offer letter, not after you book a visa appointment. We work out the total cost of the course and living in UK studies, what your family can fund, and the real gap left to borrow — then compare secured, unsecured and collateral-free routes against your profile and help you assemble the file. We are not a lender and take no commission from any of them: the amount, the interest rate, the collateral requirement and the approval are all the lender's decision. The loan is normally released in multiple disbursements, timed to your fee deadlines." },
      { question: "What IELTS score is needed for UK universities?", answer: "Most UK universities require IELTS Academic scores between 6.0 and 7.0 overall, with no band less than 5.5-6.0. Top universities like Oxford and Cambridge may require 7.0-7.5. Some universities also accept PTE and TOEFL scores." },
      { question: "What are the best universities in the UK for Indian students?", answer: "Top UK universities popular among Indian students include University of Oxford, University of Cambridge, Imperial College London, UCL, University of Edinburgh, University of Manchester, King's College London, and London School of Economics. Each offers world-class programs and excellent career prospects." },
      { question: "When should I apply to UK universities?", answer: "UK universities have three main intakes: September (main), January, and May. For September intake, applications typically open 12 months before. UCAS deadline for undergraduate courses is usually January 15th. We recommend starting your application process at least 8-10 months before your intended start date." },
      { question: "Does DreamDestination provide visa assistance for the UK?", answer: "Yes, DreamDestination provides comprehensive UK student visa assistance including documentation review, financial proof preparation, CAS letter guidance, visa application filing, and interview preparation. The visa decision is made by UKVI, not by us — we prepare your file so the evidence is complete and consistent before it is submitted." },
      { question: "Are scholarships available for Indian students in the UK?", answer: "Yes, several scholarships are available including Chevening Scholarships (fully funded), Commonwealth Scholarships, GREAT Scholarships, and university-specific merit scholarships. DreamDestination helps identify and apply for scholarships matching your profile." },
      { question: "What is the process to study in the UK from India?", answer: "The process includes: 1) Choose course & university, 2) Take IELTS/TOEFL, 3) Apply via UCAS/university portal, 4) Receive offer letter & CAS, 5) Arrange finances & education loan, 6) Apply for Tier 4 visa, 7) Pre-departure preparation. DreamDestination guides you through each step." }
    ],
    metaTitle: "Study in UK | Top Universities, Education Loan & Visa",
    metaDescription: "Study in the United Kingdom with DreamDestination. Get admission to top UK universities like Oxford, Cambridge, Imperial College. education loan guidance, visa assistance, and scholarship guidance for Indian students."
  },

  // ============================================================
  // 2. USA
  // ============================================================
  {
    slug: "usa",
    name: "United States",
    flag: "🇺🇸",
    heroTagline: "Unlock Infinite Possibilities in the Land of Opportunity",
    description: "The USA hosts the largest number of international students worldwide, with world-renowned universities and unmatched research opportunities.",
    longDescription: "The United States of America is the top destination for international students, home to 8 of the world's top 10 universities. With over 4,000 accredited institutions, the USA offers unparalleled diversity in courses, research opportunities, and career prospects. Indian students benefit from OPT (Optional Practical Training) allowing up to 3 years of post-study work for STEM graduates. DreamDestination provides comprehensive support from GRE/GMAT preparation to university selection, education loans, and F-1 visa assistance.",
    universities: "500+",
    avgCost: "₹25-80L/year",
    livingCost: "₹80,000-2,00,000/month",
    workPermit: "OPT: 1-3 Years (STEM Extension Available)",
    scholarships: "Fulbright, University Merit Scholarships, TA/RA Positions",
    visaSuccessRate: "F-1 Student Visa",
    intakeMonths: "Fall (August), Spring (January), Summer (May)",
    currency: "USD ($)",
    language: "English",
    gradient: "bg-gradient-hero",
    colleges: [
      { name: "Massachusetts Institute of Technology (MIT)", location: "Cambridge, Massachusetts", ranking: "QS #1", programs: ["Engineering", "Computer Science", "Business", "Physics", "AI/ML"], website: "https://www.mit.edu" },
      { name: "Stanford University", location: "Stanford, California", ranking: "QS #5", programs: ["Computer Science", "Engineering", "Business", "Medicine", "Law"], website: "https://www.stanford.edu" },
      { name: "Harvard University", location: "Cambridge, Massachusetts", ranking: "QS #4", programs: ["Business", "Law", "Medicine", "Public Policy", "Arts & Sciences"], website: "https://www.harvard.edu" },
      { name: "California Institute of Technology (Caltech)", location: "Pasadena, California", ranking: "QS #10", programs: ["Physics", "Engineering", "Computer Science", "Chemistry", "Biology"], website: "https://www.caltech.edu" },
      { name: "University of Chicago", location: "Chicago, Illinois", ranking: "QS #11", programs: ["Economics", "Business", "Law", "Public Policy", "Mathematics"], website: "https://www.uchicago.edu" },
      { name: "Columbia University", location: "New York City, New York", ranking: "QS #13", programs: ["Business", "Journalism", "Law", "Engineering", "International Affairs"], website: "https://www.columbia.edu" },
      { name: "University of Pennsylvania", location: "Philadelphia, Pennsylvania", ranking: "QS #12", programs: ["Business (Wharton)", "Medicine", "Law", "Engineering", "Nursing"], website: "https://www.upenn.edu" },
      { name: "Carnegie Mellon University", location: "Pittsburgh, Pennsylvania", ranking: "QS #24", programs: ["Computer Science", "AI/ML", "Robotics", "Business", "Engineering"], website: "https://www.cmu.edu" },
      { name: "University of California, Berkeley", location: "Berkeley, California", ranking: "QS #10", programs: ["Engineering", "Computer Science", "Business", "Law", "Public Health"], website: "https://www.berkeley.edu" },
      { name: "New York University (NYU)", location: "New York City, New York", ranking: "QS #38", programs: ["Business", "Film", "Law", "Arts", "Engineering"], website: "https://www.nyu.edu" },
      { name: "University of Michigan", location: "Ann Arbor, Michigan", ranking: "QS #33", programs: ["Engineering", "Business", "Medicine", "Law", "Computer Science"], website: "https://umich.edu" },
      { name: "Georgia Institute of Technology", location: "Atlanta, Georgia", ranking: "QS #44", programs: ["Engineering", "Computer Science", "Business", "Design", "Sciences"], website: "https://www.gatech.edu" }
    ],
    collegeCount: 500,
    programs: ["Computer Science & IT", "Engineering", "Business & MBA", "Medicine", "Data Science & AI", "Arts & Humanities"],
    keywords: [
      "study in usa", "study in america", "usa education consultancy",
      "education loan for usa", "usa student visa", "f1 visa from india",
      "best universities in usa", "top colleges in usa", "usa university admission",
      "mba in usa", "ms in usa", "ms in computer science usa", "engineering in usa",
      "usa scholarship for indian students", "fulbright scholarship india",
      "cost of studying in usa", "usa tuition fees for indian students",
      "opt visa usa", "stem opt extension", "work after study in usa",
      "mit admission from india", "stanford university fees",
      "harvard university admission for indian students",
      "gre score for usa universities", "study abroad consultant usa",
      "usa education loan without collateral"
    ],
    services: [
      { title: "USA University Admission Support", description: "Expert guidance for applying to Ivy League and top US universities with proven admission strategies.", features: ["University Shortlisting", "SOP & Essay Writing", "LOR Guidance", "Interview Coaching"] },
      { title: "USA Education Loan", description: "Independent guidance on education loans for US studies — we compare lenders against your profile and take no commission from any of them.", features: ["Secured and unsecured routes", "STEM-specific Loans", "Pre-visa Disbursement", "Competitive Rates"] },
      { title: "F-1 Visa Assistance", description: "End-to-end F-1 student visa support — from I-20 and DS-160 through to interview preparation.", features: ["I-20 Guidance", "DS-160 Filing", "SEVIS Fee Payment", "Visa Interview Prep"] },
      { title: "GRE/GMAT Test Prep", description: "Structured preparation programs for GRE and GMAT with proven score improvement.", features: ["Expert Coaching", "Mock Tests", "Score Strategy", "Personalized Study Plan"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 15 years",
      processingTime: "Depends on your file",
      highlights: ["Covers tuition + living + travel", "Moratorium period available", "Tax benefits under Section 80E", "Both secured & unsecured options", "I-20 based quick processing"]
    },
    eligibility: ["Confirmed admission (I-20) from a SEVP-certified US institution", "Minimum 60% in previous qualification", "Valid passport", "GRE/GMAT scores (program specific)", "TOEFL/IELTS scores", "Financial proof for F-1 visa"],
    englishTests: ["TOEFL iBT (80-110)", "IELTS Academic (6.5-7.5)", "Duolingo English Test (105-130)", "PTE Academic (58-68)"],
    documentsRequired: ["Valid Passport", "I-20 Form", "SEVIS Fee Receipt", "DS-160 Confirmation", "Academic Transcripts", "GRE/GMAT Scores", "TOEFL/IELTS Scores", "Financial Documents", "SOP & LORs", "Resume/CV"],
    faqs: [
      { question: "What is the cost of studying in the USA for Indian students?", answer: "Tuition fees in the USA range from ₹25 Lakhs to ₹80 Lakhs per year depending on the university (public vs private) and program. Living expenses are approximately ₹80,000 to ₹2,00,000 per month. Total cost for a 2-year MS program can range from ₹40 Lakhs to ₹1.2 Crore." },
      { question: "What is OPT and STEM OPT extension?", answer: "OPT (Optional Practical Training) allows F-1 students to work for 12 months after graduation. STEM graduates can extend this by 24 additional months through STEM OPT, giving a total of 3 years of work authorization. This is a major advantage for engineering and tech students." },
      { question: "How do I get an F-1 student visa for the USA?", answer: "To get an F-1 visa: 1) Get admitted to a SEVP-certified school, 2) Receive I-20 form, 3) Pay SEVIS fee, 4) Fill DS-160 application, 5) Schedule visa interview, 6) Attend interview at US embassy. DreamDestination prepares your documentation and financial evidence at each step and runs mock interviews before your consular appointment." },
      { question: "What GRE score is needed for top US universities?", answer: "Top US universities typically expect GRE scores of 320+ (Verbal + Quant) for competitive programs. For MS in Computer Science at top schools, 325+ is recommended. Some universities have waived GRE requirements — we help identify such options." },
      { question: "Can I get a scholarship to study in the USA?", answer: "Yes! Options include Fulbright-Nehru Scholarships, university merit scholarships, TA/RA positions (which cover tuition + provide stipend), and private foundation scholarships. DreamDestination helps identify and apply for scholarships matching your profile and academic record." },
      { question: "What are the best universities in the USA for MS in Computer Science?", answer: "Top US universities for MS in CS include MIT, Stanford, Carnegie Mellon, UC Berkeley, Georgia Tech, University of Illinois, University of Michigan, and Caltech. These offer cutting-edge research in AI, ML, cybersecurity, and software engineering." },
      { question: "How much education loan can I get for USA studies?", answer: "There is no fixed figure. Lenders size a US education loan against the total cost of your specific programme, your co-applicant's income and credit history, and whether collateral is offered — a secured loan generally stretches further than an unsecured one. An education loan typically covers tuition, living costs, travel and health insurance, and is released in multiple disbursements rather than a lump sum. We are not a lender: the sanction is theirs." },
      { question: "What is the best time to apply to US universities?", answer: "Fall intake (August-September) is the main intake with maximum seats. Application deadlines are typically December-February for fall. Spring intake (January) has fewer options. We recommend starting GRE/TOEFL preparation 12-18 months before your intended start date." },
      { question: "Does DreamDestination help with USA university applications?", answer: "Yes, we provide end-to-end USA admission support including university shortlisting, SOP/essay writing, LOR guidance, application review, interview preparation, and scholarship applications. Our counselors have helped thousands of Indian students get into top US universities." },
      { question: "Can I work while studying in the USA?", answer: "F-1 students can work on-campus for up to 20 hours/week during the semester and full-time during breaks. Off-campus work requires CPT (Curricular Practical Training) authorization. After graduation, OPT allows full-time work for 12-36 months." }
    ],
    metaTitle: "Study in USA | Top Universities, F-1 Visa & Education Loan",
    metaDescription: "Study in the United States with DreamDestination. Get admission to MIT, Stanford, Harvard & top US universities. education loan guidance, F-1 visa assistance, GRE prep & scholarship guidance for Indian students."
  },

  // ============================================================
  // 3. Canada
  // ============================================================
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    heroTagline: "Affordable Excellence with Immigration Pathways",
    description: "Canada offers world-class education, post-graduation work permits, and a clear pathway to permanent residency for international students.",
    longDescription: "Canada is one of the most sought-after study destinations for Indian students, offering affordable tuition fees, a high quality of life, and excellent immigration pathways through PGWP and Express Entry. With top-ranked universities like University of Toronto, UBC, and McGill, Canada provides outstanding academic programs across all disciplines. The 3-year Post-Graduation Work Permit (PGWP) and pathways to Permanent Residency make Canada the top choice for students seeking long-term career growth abroad.",
    universities: "150+",
    avgCost: "₹15-40L/year",
    livingCost: "₹60,000-1,20,000/month",
    workPermit: "3-Year Post-Graduation Work Permit (PGWP)",
    scholarships: "Vanier, Lester B. Pearson, University Merit Awards",
    visaSuccessRate: "Study Permit",
    intakeMonths: "September, January, May",
    currency: "CAD ($)",
    language: "English & French",
    gradient: "bg-gradient-warm",
    colleges: [
      { name: "University of Toronto", location: "Toronto, Ontario", ranking: "QS #21", programs: ["Engineering", "Business", "Medicine", "Computer Science", "Law"], website: "https://www.utoronto.ca" },
      { name: "University of British Columbia (UBC)", location: "Vancouver, British Columbia", ranking: "QS #34", programs: ["Engineering", "Business", "Sciences", "Forestry", "Medicine"], website: "https://www.ubc.ca" },
      { name: "McGill University", location: "Montreal, Quebec", ranking: "QS #29", programs: ["Medicine", "Law", "Engineering", "Business", "Arts"], website: "https://www.mcgill.ca" },
      { name: "University of Alberta", location: "Edmonton, Alberta", ranking: "QS #96", programs: ["Engineering", "Sciences", "Business", "Medicine", "AI/ML"], website: "https://www.ualberta.ca" },
      { name: "University of Waterloo", location: "Waterloo, Ontario", ranking: "QS #112", programs: ["Computer Science", "Engineering", "Mathematics", "Co-op Programs", "Quantum Computing"], website: "https://uwaterloo.ca" },
      { name: "University of Montreal", location: "Montreal, Quebec", ranking: "QS #111", programs: ["AI/ML", "Medicine", "Law", "Sciences", "Public Health"], website: "https://www.umontreal.ca" },
      { name: "McMaster University", location: "Hamilton, Ontario", ranking: "QS #152", programs: ["Health Sciences", "Engineering", "Business", "Sciences", "Humanities"], website: "https://www.mcmaster.ca" },
      { name: "University of Ottawa", location: "Ottawa, Ontario", ranking: "QS #203", programs: ["Law", "Engineering", "Business", "Health Sciences", "Social Sciences"], website: "https://www.uottawa.ca" },
      { name: "Western University", location: "London, Ontario", ranking: "QS #172", programs: ["Business (Ivey)", "Medicine", "Engineering", "Law", "Education"], website: "https://www.uwo.ca" },
      { name: "Simon Fraser University", location: "Burnaby, British Columbia", ranking: "QS #318", programs: ["Computing Science", "Business", "Communication", "Engineering", "Health Sciences"], website: "https://www.sfu.ca" }
    ],
    collegeCount: 150,
    programs: ["Computer Science", "Engineering", "Business & MBA", "Healthcare", "Data Science", "Hospitality"],
    keywords: [
      "study in canada", "study in canada from india", "canada education consultancy",
      "education loan for canada", "canada student visa", "canada study permit",
      "best universities in canada", "top colleges in canada", "canada university admission",
      "mba in canada", "ms in canada", "engineering in canada", "diploma in canada",
      "canada scholarship for indian students", "vanier scholarship",
      "cost of studying in canada", "canada tuition fees for indian students",
      "pgwp canada", "canada pr after study", "work permit after study in canada",
      "university of toronto admission", "ubc fees for international students",
      "canada student visa requirements", "ielts for canada study visa",
      "study abroad consultant canada", "canada education loan without collateral"
    ],
    services: [
      { title: "Canada University Admission", description: "Expert guidance for applying to Canadian universities and colleges including DLI institutions.", features: ["University Shortlisting", "SOP & Essay Writing", "Application Management", "Scholarship Applications"] },
      { title: "Canada Education Loan", description: "Education loans tailored for Canadian institutions with competitive rates and easy processing.", features: ["Secured and unsecured routes", "Quick Approval", "No Collateral Options", "Pre-visa Disbursement"] },
      { title: "Canada Study Permit Assistance", description: "Study permit support on the regular stream — the Student Direct Stream was closed by IRCC in November 2024, so every applicant now uses the same route.", features: ["Regular stream application", "GIC account setup", "Proof of funds preparation", "Biometrics guidance"] },
      { title: "PR Pathway Counseling", description: "Strategic guidance on leveraging your Canadian education for permanent residency through Express Entry and PNP.", features: ["Express Entry Guidance", "PNP Options", "CRS Score Strategy", "Post-PGWP Planning"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 15 years",
      processingTime: "Depends on your file",
      highlights: ["GIC-compatible disbursement", "Covers tuition, living and travel", "Moratorium during the study period", "Section 80E position explained", "Multiple disbursement, staged to fee deadlines"]
    },
    eligibility: ["Admission to a DLI (Designated Learning Institution)", "Minimum 60% in previous qualification", "Valid passport", "IELTS 6.0+ overall", "GIC of CAD 20,635", "Proof of funds"],
    englishTests: ["IELTS Academic (6.0-6.5)", "TOEFL iBT (80-90)", "PTE Academic (55-60)", "Duolingo English Test (105-120)"],
    documentsRequired: ["Valid Passport", "Letter of Acceptance from DLI", "GIC Certificate", "Academic Transcripts", "IELTS/TOEFL Scores", "Financial Proof", "SOP", "Medical Exam Results", "Police Clearance Certificate"],
    faqs: [
      { question: "What is the cost of studying in Canada for Indian students?", answer: "Tuition fees in Canada range from ₹15 Lakhs to ₹40 Lakhs per year. Diploma programs at colleges are more affordable (₹10-20 Lakhs/year). Living costs are approximately ₹60,000-1,20,000 per month depending on the city. Total cost for a 2-year program ranges from ₹30 Lakhs to ₹80 Lakhs." },
      { question: "How can I get PR in Canada after studying?", answer: "After completing your studies, you can apply for PGWP (up to 3 years). During PGWP, gain Canadian work experience and apply through Express Entry (CEC category) or Provincial Nominee Programs. Canadian education and work experience significantly boost your CRS score for PR." },
      { question: "What is the Post-Graduation Work Permit (PGWP)?", answer: "PGWP allows graduates from eligible Canadian institutions to work in Canada. Duration depends on program length: 8-month to 2-year programs get PGWP equal to program length; 2+ year programs get a 3-year PGWP. It's an open work permit — you can work for any employer." },
      { question: "Does the Student Direct Stream (SDS) still exist for Canada?", answer: "No. IRCC closed the Student Direct Stream on 8 November 2024, along with Nigeria Student Express. Every study permit application from India now goes through the regular stream, and there is no faster alternative — so treat any agent still advertising SDS processing as out of date. A GIC is still widely used as proof of funds on the regular stream, and preparing the funds evidence properly is what actually moves a file along." },
      { question: "Can I work while studying in Canada?", answer: "Yes! Study permit holders can work up to 20 hours per week during academic sessions and full-time during scheduled breaks. Co-op programs also allow full-time work as part of the curriculum. Spouses of study permit holders may also be eligible to work." },
      { question: "What are the best colleges in Canada for Indian students?", answer: "Top choices include University of Toronto, UBC, McGill, University of Waterloo (renowned for co-op programs), University of Alberta, and McMaster University. For colleges, Conestoga, Seneca, Humber, and George Brown are popular for diploma programs." },
      { question: "How much education loan can I get for Canada?", answer: "That is the lender's decision, not ours — we are not a lender. The amount depends on your course and institution, your co-applicant's income and credit history, and whether collateral is offered. An education loan can generally cover tuition, living costs, travel and the GIC deposit, and is released in multiple disbursements rather than as a lump sum. We help you work out what you actually need and prepare the file before you approach anyone." },
      { question: "What IELTS score is required for Canada?", answer: "With SDS closed since November 2024, the old 6.0-in-all-bands SDS threshold no longer applies as a separate rule. What matters now is the institution's own requirement: typically overall 6.0-6.5, with some programmes asking 7.0 or higher. Universities generally set a higher bar than colleges. Check the requirement for your specific programme rather than a general figure." },
      { question: "Is Canada better than USA for Indian students?", answer: "Canada offers advantages like lower tuition fees, 3-year PGWP, clear PR pathways, and a welcoming immigration policy. USA offers more university options, STEM OPT, and higher starting salaries. The best choice depends on your career goals, budget, and immigration plans." },
      { question: "What documents do I need for a Canada study permit?", answer: "Key documents include a valid passport, Letter of Acceptance from a DLI, GIC certificate, IELTS/TOEFL scores, academic transcripts, financial proof, SOP, medical exam results, and police clearance certificate. DreamDestination provides a detailed checklist and documentation support." }
    ],
    metaTitle: "Study in Canada | Top Universities, PGWP & Education Loan",
    metaDescription: "Study in Canada from India — University of Toronto, UBC, McGill and other Canadian universities. Education loan guidance, study permit support on the current regular stream, and PGWP pathway counselling."
  },

  // ============================================================
  // 4. Australia
  // ============================================================
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    heroTagline: "Top-Ranked Universities in a Vibrant Multicultural Nation",
    description: "Australia offers exceptional education quality, post-study work rights, and a lifestyle that makes studying here an experience of a lifetime.",
    longDescription: "Australia is home to 7 of the world's top 100 universities and is the third most popular study destination globally. With its Group of Eight (Go8) elite universities, Australia provides world-class education across engineering, medicine, business, and sciences. Indian students benefit from generous post-study work visas (2-6 years), the ability to work 48 hours per fortnight during studies, and a high quality of life. DreamDestination provides complete support from university selection and education loans to visa processing and accommodation.",
    universities: "120+",
    avgCost: "₹20-55L/year",
    livingCost: "₹70,000-1,40,000/month",
    workPermit: "2-6 Year Post-Study Work Visa (Subclass 485)",
    scholarships: "Australia Awards, Destination Australia, University Scholarships",
    visaSuccessRate: "Subclass 500",
    intakeMonths: "February, July",
    currency: "AUD ($)",
    language: "English",
    gradient: "bg-gradient-hero",
    colleges: [
      { name: "University of Melbourne", location: "Melbourne, Victoria", ranking: "QS #14", programs: ["Engineering", "Medicine", "Business", "Law", "Arts"], website: "https://www.unimelb.edu.au" },
      { name: "University of Sydney", location: "Sydney, NSW", ranking: "QS #18", programs: ["Business", "Engineering", "Medicine", "Law", "Architecture"], website: "https://www.sydney.edu.au" },
      { name: "University of New South Wales (UNSW)", location: "Sydney, NSW", ranking: "QS #19", programs: ["Engineering", "Business", "Computer Science", "Law", "Medicine"], website: "https://www.unsw.edu.au" },
      { name: "Australian National University (ANU)", location: "Canberra, ACT", ranking: "QS #30", programs: ["Political Science", "Engineering", "Law", "Sciences", "Arts"], website: "https://www.anu.edu.au" },
      { name: "Monash University", location: "Melbourne, Victoria", ranking: "QS #37", programs: ["Pharmacy", "Engineering", "Business", "Medicine", "IT"], website: "https://www.monash.edu" },
      { name: "University of Queensland (UQ)", location: "Brisbane, Queensland", ranking: "QS #40", programs: ["Engineering", "Business", "Sciences", "Medicine", "Veterinary Science"], website: "https://www.uq.edu.au" },
      { name: "University of Western Australia (UWA)", location: "Perth, Western Australia", ranking: "QS #72", programs: ["Engineering", "Business", "Medicine", "Sciences", "Law"], website: "https://www.uwa.edu.au" },
      { name: "University of Adelaide", location: "Adelaide, South Australia", ranking: "QS #82", programs: ["Engineering", "Medicine", "Wine & Food", "Sciences", "Business"], website: "https://www.adelaide.edu.au" },
      { name: "University of Technology Sydney (UTS)", location: "Sydney, NSW", ranking: "QS #88", programs: ["IT", "Engineering", "Business", "Design", "Communication"], website: "https://www.uts.edu.au" },
      { name: "Deakin University", location: "Melbourne, Victoria", ranking: "QS #233", programs: ["Business", "Engineering", "Health", "IT", "Education"], website: "https://www.deakin.edu.au" }
    ],
    collegeCount: 120,
    programs: ["Engineering", "Business & MBA", "Medicine & Health", "IT & Computer Science", "Sciences", "Arts & Design"],
    keywords: [
      "study in australia", "study in australia from india", "australia education consultancy",
      "education loan for australia", "australia student visa", "australia study visa subclass 500",
      "best universities in australia", "top colleges in australia", "group of eight australia",
      "mba in australia", "ms in australia", "engineering in australia", "nursing in australia",
      "australia scholarship for indian students", "australia awards scholarship",
      "cost of studying in australia", "australia tuition fees",
      "post study work visa australia", "subclass 485 visa", "work after study in australia",
      "university of melbourne admission", "unsw fees for indian students",
      "monash university courses", "ielts score for australia",
      "study abroad consultant australia", "australia education loan without collateral"
    ],
    services: [
      { title: "Australia University Admission", description: "Expert guidance for applying to Go8 and other top Australian universities.", features: ["University Shortlisting", "Application Management", "SOP & Essay Writing", "Scholarship Applications"] },
      { title: "Australia Education Loan", description: "Flexible education loans for Australian universities with quick processing.", features: ["Secured and unsecured routes", "No Collateral Options", "Pre-visa Disbursement", "Competitive Rates"] },
      { title: "Australia Student Visa (Subclass 500)", description: "Complete visa assistance with GTE statement preparation and financial documentation.", features: ["GTE Statement Writing", "Financial Documentation", "Health Insurance (OSHC)", "Visa Application Filing"] },
      { title: "Accommodation & Settlement", description: "Pre-departure and post-arrival support for a smooth transition to Australia.", features: ["Accommodation Booking", "Airport Pickup", "Bank Account Setup", "City Orientation"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 15 years",
      processingTime: "Depends on your file",
      highlights: ["Covers tuition + OSHC + living expenses", "Moratorium during studies", "Tax benefits under 80E", "Both secured & unsecured options", "Quick processing for Go8 universities"]
    },
    eligibility: ["Confirmed CoE from a CRICOS-registered institution", "Minimum 60% in previous qualification", "Valid passport", "IELTS 6.0-6.5+", "Genuine Temporary Entrant (GTE) requirement", "OSHC health insurance"],
    englishTests: ["IELTS Academic (6.0-6.5)", "TOEFL iBT (79-93)", "PTE Academic (50-58)", "Cambridge English (169-176)"],
    documentsRequired: ["Valid Passport", "CoE (Confirmation of Enrolment)", "GTE Statement", "Academic Transcripts", "IELTS/PTE Scores", "Financial Proof", "OSHC Policy", "SOP", "Work Experience (if applicable)", "CV/Resume"],
    faqs: [
      { question: "What is the cost of studying in Australia for Indian students?", answer: "Tuition fees in Australia range from ₹20 Lakhs to ₹55 Lakhs per year. Group of Eight universities are at the higher end. Living costs are approximately ₹70,000-1,40,000 per month. Total cost for a 2-year Master's program ranges from ₹50 Lakhs to ₹1.2 Crore." },
      { question: "What is the post-study work visa in Australia?", answer: "The Temporary Graduate Visa (Subclass 485) allows graduates to work in Australia. Bachelor's graduates get 2-4 years, Master's graduates get 2-5 years, and PhD graduates get 4-6 years. Studying in regional areas may provide additional years." },
      { question: "Can I work while studying in Australia?", answer: "Yes! Student visa holders can work up to 48 hours per fortnight during the semester and unlimited hours during scheduled breaks. This helps offset living costs significantly. Average student wages are AUD 20-30 per hour." },
      { question: "What is the GTE requirement for Australia student visa?", answer: "GTE (Genuine Temporary Entrant) is a statement explaining why you want to study in Australia, your genuine intent to return, and how the course fits your career plans. DreamDestination helps craft compelling GTE statements that strengthen your visa application." },
      { question: "What are the Group of Eight (Go8) universities in Australia?", answer: "The Go8 are Australia's most prestigious research universities: University of Melbourne, University of Sydney, UNSW, ANU, Monash University, University of Queensland, University of Western Australia, and University of Adelaide. They rank among the world's top 100." },
      { question: "How do I get an education loan for studying in Australia?", answer: "Start as soon as you have an offer letter, not after you book a visa appointment. We work out the total cost of the course and living in studying in Australia, what your family can fund, and the real gap left to borrow — then compare secured, unsecured and collateral-free routes against your profile and help you assemble the file. We are not a lender and take no commission from any of them: the amount, the interest rate, the collateral requirement and the approval are all the lender's decision. The loan is normally released in multiple disbursements, timed to your fee deadlines." },
      { question: "Which IELTS score is required for Australian universities?", answer: "Most Australian universities require IELTS 6.0-6.5 overall with no band below 6.0. Some programs like Medicine and Law may require 7.0+. PTE Academic is also widely accepted (50-58). Some universities offer their own English tests." },
      { question: "What are the best courses to study in Australia?", answer: "Popular courses include Engineering, IT & Computer Science, Business & MBA, Nursing & Healthcare, Data Science, Accounting, and Environmental Science. Australia is particularly renowned for Marine Biology, Veterinary Science, and Mining Engineering." },
      { question: "Is Australia expensive for Indian students?", answer: "While tuition fees are moderate to high, the ability to work 48 hours/fortnight helps offset costs. Regional universities offer lower fees and additional work visa benefits. Scholarships like Destination Australia provide AUD 15,000/year for regional students." },
      { question: "What is the visa process for studying in Australia?", answer: "Steps: 1) Get CoE from a CRICOS institution, 2) Arrange OSHC health cover, 3) Prepare GTE statement, 4) Gather financial documents, 5) Apply online for Subclass 500 visa, 6) Complete health examination, 7) Receive visa. DreamDestination manages the entire process." }
    ],
    metaTitle: "Study in Australia | Go8 Universities, Education Loan & Visa",
    metaDescription: "Study in Australia from India with DreamDestination. Get admission to University of Melbourne, UNSW, Monash & top Australian universities. education loan guidance, Subclass 500 visa assistance & scholarship guidance."
  },

  // ============================================================
  // 5. New Zealand
  // ============================================================
  {
    slug: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    heroTagline: "Quality Education in the World's Most Beautiful Country",
    description: "New Zealand offers a safe, welcoming environment with high-quality education and excellent post-study work opportunities.",
    longDescription: "New Zealand is known for its exceptional quality of life, safe environment, and world-class universities. All 8 New Zealand universities rank in the global top 500, with the University of Auckland in the top 70. Indian students benefit from a 3-year post-study work visa, affordable tuition compared to Australia and UK, and a pathway to residence. New Zealand's practical, research-led education system ensures graduates are industry-ready.",
    universities: "40+",
    avgCost: "₹15-35L/year",
    livingCost: "₹55,000-1,00,000/month",
    workPermit: "3-Year Post-Study Work Visa",
    scholarships: "New Zealand Excellence Awards, University Scholarships",
    visaSuccessRate: "Fee Paying Student Visa",
    intakeMonths: "February, July",
    currency: "NZD ($)",
    language: "English",
    gradient: "bg-gradient-success",
    colleges: [
      { name: "University of Auckland", location: "Auckland", ranking: "QS #65", programs: ["Engineering", "Business", "Medicine", "Law", "Arts"], website: "https://www.auckland.ac.nz" },
      { name: "University of Otago", location: "Dunedin", ranking: "QS #206", programs: ["Medicine", "Health Sciences", "Business", "Sciences", "Humanities"], website: "https://www.otago.ac.nz" },
      { name: "Victoria University of Wellington", location: "Wellington", ranking: "QS #241", programs: ["Law", "Architecture", "Design", "Business", "Humanities"], website: "https://www.wgtn.ac.nz" },
      { name: "University of Canterbury", location: "Christchurch", ranking: "QS #256", programs: ["Engineering", "Sciences", "Business", "Arts", "Education"], website: "https://www.canterbury.ac.nz" },
      { name: "Massey University", location: "Palmerston North", ranking: "QS #239", programs: ["Agriculture", "Veterinary Science", "Business", "Engineering", "Aviation"], website: "https://www.massey.ac.nz" },
      { name: "University of Waikato", location: "Hamilton", ranking: "QS #250", programs: ["Computer Science", "Business", "Engineering", "Law", "Education"], website: "https://www.waikato.ac.nz" },
      { name: "Lincoln University", location: "Christchurch", ranking: "QS #362", programs: ["Agriculture", "Environment", "Business", "Food Science", "Tourism"], website: "https://www.lincoln.ac.nz" },
      { name: "Auckland University of Technology (AUT)", location: "Auckland", ranking: "QS #407", programs: ["Engineering", "Business", "Health Sciences", "Design", "Sports"], website: "https://www.aut.ac.nz" }
    ],
    collegeCount: 40,
    programs: ["Engineering", "Business", "Healthcare", "IT & Computer Science", "Agriculture", "Hospitality & Tourism"],
    keywords: [
      "study in new zealand", "study in new zealand from india", "new zealand education consultancy",
      "education loan for new zealand", "new zealand student visa", "nz study visa",
      "best universities in new zealand", "top colleges in new zealand",
      "mba in new zealand", "ms in new zealand", "engineering in new zealand",
      "new zealand scholarship for indian students", "cost of studying in new zealand",
      "new zealand tuition fees", "work permit after study in new zealand",
      "post study work visa new zealand", "university of auckland admission",
      "new zealand pr after study", "ielts for new zealand study visa",
      "study abroad consultant new zealand", "new zealand education loan without collateral",
      "new zealand vs australia for studies", "diploma in new zealand"
    ],
    services: [
      { title: "NZ University Admission", description: "Expert guidance for applying to New Zealand's 8 universities and polytechnics.", features: ["University Shortlisting", "Application Support", "SOP Writing", "Scholarship Guidance"] },
      { title: "NZ Education Loan", description: "Affordable education loans for New Zealand studies with competitive rates.", features: ["Secured and unsecured routes", "No Collateral Options", "Quick Processing", "Flexible EMI"] },
      { title: "NZ Student Visa Assistance", description: "Student visa documentation, financial proof preparation and application support for New Zealand.", features: ["Documentation Prep", "Financial Proof", "Health & Character Checks", "Visa Filing"] },
      { title: "Settlement Support", description: "Pre-departure and post-arrival assistance for a smooth transition.", features: ["Accommodation", "Airport Pickup", "City Orientation", "Bank Account Setup"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 12 years",
      processingTime: "Depends on your file",
      highlights: ["Covers tuition + living expenses", "Moratorium during studies", "Tax benefits under 80E", "Affordable compared to other destinations", "Quick disbursement"]
    },
    eligibility: ["Confirmed offer from a NZQA-approved institution", "Minimum 55% in previous qualification", "Valid passport", "IELTS 5.5-6.5", "Financial proof (NZD 20,000/year)", "Health & character clearance"],
    englishTests: ["IELTS Academic (5.5-6.5)", "TOEFL iBT (60-80)", "PTE Academic (42-58)", "Cambridge English (162-176)"],
    documentsRequired: ["Valid Passport", "University Offer Letter", "Academic Transcripts", "IELTS/PTE Scores", "Financial Proof", "SOP", "Medical Certificate", "Police Clearance", "CV/Resume"],
    faqs: [
      { question: "What is the cost of studying in New Zealand?", answer: "Tuition fees range from ₹15 Lakhs to ₹35 Lakhs per year. Living costs are approximately ₹55,000-1,00,000 per month. Total cost for a 2-year program ranges from ₹35 Lakhs to ₹70 Lakhs — more affordable than Australia and UK." },
      { question: "Can I get PR in New Zealand after studying?", answer: "Yes! New Zealand offers clear pathways to residence. After your post-study work visa, you can apply for residence through Skilled Migrant Category or other residence visas. New Zealand qualifications and work experience are highly valued in the points system." },
      { question: "What is the post-study work visa in New Zealand?", answer: "Graduates from NZ qualifications at Level 7+ can get a 3-year open post-study work visa. This allows you to work for any employer in any role. It's one of the most generous post-study work rights globally." },
      { question: "Can I work while studying in New Zealand?", answer: "Yes, student visa holders can work up to 20 hours per week during the academic term and full-time during holidays. Master's and PhD students can work full-time throughout their studies." },
      { question: "What are the best universities in New Zealand?", answer: "All 8 NZ universities are world-ranked: University of Auckland (QS #65), University of Otago, Victoria University of Wellington, University of Canterbury, Massey University, University of Waikato, Lincoln University, and AUT." },
      { question: "Is New Zealand safe for Indian students?", answer: "Yes, New Zealand consistently ranks as one of the safest countries in the world. It has a very low crime rate, a welcoming multicultural society, and strong support systems for international students. It's an ideal environment for focused study." },
      { question: "How do I get an education loan for New Zealand?", answer: "Start as soon as you have an offer letter, not after you book a visa appointment. We work out the total cost of the course and living in New Zealand, what your family can fund, and the real gap left to borrow — then compare secured, unsecured and collateral-free routes against your profile and help you assemble the file. We are not a lender and take no commission from any of them: the amount, the interest rate, the collateral requirement and the approval are all the lender's decision. The loan is normally released in multiple disbursements, timed to your fee deadlines." },
      { question: "What is the IELTS requirement for New Zealand?", answer: "Most NZ universities require IELTS 6.0-6.5 overall. Some diploma programs accept 5.5. Foundation programs may have lower requirements. PTE and TOEFL are also accepted." },
      { question: "Is New Zealand good for IT and engineering students?", answer: "Yes! NZ universities offer strong programs in Computer Science, Software Engineering, and IT. The tech industry is growing rapidly, and IT professionals are on the skilled shortage list, making it easier to get work visas and residence." },
      { question: "What documents are needed for a New Zealand student visa?", answer: "Key documents: valid passport, offer letter, academic transcripts, IELTS scores, financial proof (NZD 20,000/year), medical certificate, police clearance, and SOP. DreamDestination provides a complete checklist and guidance." }
    ],
    metaTitle: "Study in New Zealand | Universities & Post-Study Work",
    metaDescription: "Study in New Zealand from India with DreamDestination. Get admission to University of Auckland & top NZ universities. Education loans, 3-year work visa, PR pathways & scholarship guidance for Indian students."
  },

  // ============================================================
  // 6. Singapore
  // ============================================================
  {
    slug: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    heroTagline: "Asia's Education Hub with Global Career Prospects",
    description: "Singapore offers world-class education with two universities in the global top 15, excellent infrastructure, and proximity to India.",
    longDescription: "Singapore is a leading education destination in Asia, home to the National University of Singapore (NUS) and Nanyang Technological University (NTU) — both consistently ranked in the world's top 15. With its strategic location, English-speaking environment, safety, and strong industry connections, Singapore offers Indian students exceptional academic and career opportunities. The city-state's compact size, efficient public transport, and multicultural society make it an ideal place to study.",
    universities: "35+",
    avgCost: "₹15-40L/year",
    livingCost: "₹60,000-1,20,000/month",
    workPermit: "1-Year Post-Study Work (LTVP) or Employment Pass",
    scholarships: "Singapore Government Scholarships, ASEAN Scholarships, University Scholarships",
    visaSuccessRate: "Student's Pass",
    intakeMonths: "August, January",
    currency: "SGD ($)",
    language: "English",
    gradient: "bg-gradient-success",
    colleges: [
      { name: "National University of Singapore (NUS)", location: "Singapore", ranking: "QS #8", programs: ["Engineering", "Business", "Computer Science", "Medicine", "Law"], website: "https://www.nus.edu.sg" },
      { name: "Nanyang Technological University (NTU)", location: "Singapore", ranking: "QS #15", programs: ["Engineering", "Business", "AI/ML", "Communication", "Education"], website: "https://www.ntu.edu.sg" },
      { name: "Singapore Management University (SMU)", location: "Singapore", ranking: "QS #545", programs: ["Business", "Accounting", "Law", "Information Systems", "Economics"], website: "https://www.smu.edu.sg" },
      { name: "Singapore University of Technology and Design (SUTD)", location: "Singapore", ranking: "Top Asian", programs: ["Architecture", "Engineering", "Information Systems", "Design"], website: "https://www.sutd.edu.sg" },
      { name: "Singapore Institute of Technology (SIT)", location: "Singapore", ranking: "Applied University", programs: ["Engineering", "Health Sciences", "IT", "Business", "Food Technology"], website: "https://www.singaporetech.edu.sg" },
      { name: "INSEAD Singapore", location: "Singapore", ranking: "Top 5 Global MBA", programs: ["MBA", "Executive MBA", "Finance", "Management"], website: "https://www.insead.edu" },
      { name: "James Cook University Singapore", location: "Singapore", ranking: "QS #415", programs: ["Business", "IT", "Psychology", "Tourism", "Environmental Science"], website: "https://www.jcu.edu.sg" },
      { name: "Curtin University Singapore", location: "Singapore", ranking: "QS #174", programs: ["Business", "Engineering", "IT", "Communication", "Health Sciences"], website: "https://www.curtin.edu.sg" }
    ],
    collegeCount: 35,
    programs: ["Engineering", "Business & Finance", "Computer Science & AI", "Medicine", "Design", "Hospitality"],
    keywords: [
      "study in singapore", "study in singapore from india", "singapore education consultancy",
      "education loan for singapore", "singapore student visa", "singapore student pass",
      "best universities in singapore", "nus admission from india", "ntu singapore fees",
      "mba in singapore", "ms in singapore", "engineering in singapore",
      "singapore scholarship for indian students", "cost of studying in singapore",
      "singapore tuition fees", "work in singapore after study",
      "insead singapore mba", "singapore management university",
      "ielts for singapore universities", "study abroad consultant singapore",
      "singapore education loan", "singapore vs uk for studies"
    ],
    services: [
      { title: "Singapore University Admission", description: "Expert guidance for NUS, NTU, SMU and other Singapore institutions.", features: ["University Selection", "Application Support", "Essay Writing", "Interview Prep"] },
      { title: "Singapore Education Loan", description: "Education loans tailored for Singapore's tuition structure.", features: ["Secured and unsecured routes", "Quick Processing", "Competitive Rates", "No Collateral Options"] },
      { title: "Student Pass Assistance", description: "Complete Student Pass application support for studying in Singapore.", features: ["SOLAR Application", "Documentation", "IPA Letter Guidance", "Pass Collection"] },
      { title: "Pre-departure Support", description: "Comprehensive support for transitioning to life in Singapore.", features: ["Accommodation", "SIM Card & Banking", "Transport Guidance", "Cultural Orientation"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 12 years",
      processingTime: "Depends on your file",
      highlights: ["Affordable loan amounts due to lower fees", "Quick processing", "Tax benefits under 80E", "Tuition grant compatible", "Short flight from India — lower travel costs"]
    },
    eligibility: ["Confirmed admission from a Singapore institution", "Minimum 60% in previous qualification", "Valid passport", "IELTS/TOEFL (if required)", "Financial proof", "Student Pass approval"],
    englishTests: ["IELTS Academic (6.0-6.5)", "TOEFL iBT (85-100)", "SAT (for undergraduate)"],
    documentsRequired: ["Valid Passport", "University Offer Letter", "Academic Transcripts", "IELTS/TOEFL Scores", "Financial Documents", "SOP", "LORs", "CV/Resume", "Passport Photos"],
    faqs: [
      { question: "What is the cost of studying in Singapore?", answer: "Tuition fees range from ₹15 Lakhs to ₹40 Lakhs per year. NUS and NTU offer tuition grants that can reduce fees by up to 50% (with a 3-year work bond). Living costs are ₹60,000-1,20,000 per month." },
      { question: "Is Singapore a good study destination for Indian students?", answer: "Absolutely! Singapore offers world-class universities (NUS ranked #8 globally), English medium instruction, safety, proximity to India (5-hour flight), strong industry connections, and a large Indian diaspora. It's ideal for students seeking quality education close to home." },
      { question: "Can I work while studying in Singapore?", answer: "Students at approved institutions can work up to 16 hours/week during term time and full-time during holidays. NUS, NTU, and SMU students don't need a separate work permit for part-time work." },
      { question: "What is the Singapore Tuition Grant?", answer: "The Singapore Government offers tuition grants to international students at public universities, reducing fees by up to 50%. In return, students must work in a Singapore-registered company for 3 years after graduation." },
      { question: "How is NUS ranked globally?", answer: "NUS is consistently ranked in the QS top 10 worldwide, making it the top university in Asia. It excels in Computer Science, Engineering, Business, and Medicine. NTU is also in the top 15 globally." },
      { question: "Can I get PR in Singapore after studying?", answer: "While there's no automatic PR pathway, working in Singapore after graduation gives you eligibility to apply for Permanent Residence. The Singapore government favors skilled professionals, and having a Singapore degree improves your chances significantly." },
      { question: "What education loan options are available for Singapore?", answer: "DreamDestination offers education loan guidance for Singapore. Since tuition is relatively affordable (especially with tuition grants), loan amounts are manageable with comfortable EMIs." },
      { question: "What IELTS score is needed for Singapore universities?", answer: "NUS typically requires IELTS 6.5+, NTU requires 6.0-6.5, and SMU requires 6.5-7.0. Some programs may have higher requirements. TOEFL and SAT are also accepted." }
    ],
    metaTitle: "Study in Singapore | NUS, NTU, Education Loan & Visa",
    metaDescription: "Study in Singapore from India with DreamDestination. Get admission to NUS, NTU, SMU & top Singapore universities. Education loans, student pass assistance, tuition grant guidance for Indian students."
  },

  // ============================================================
  // 7. Ireland
  // ============================================================
  {
    slug: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    heroTagline: "Europe's Tech Capital with Stay-Back Options",
    description: "Ireland combines top-quality education with a booming tech industry and generous post-study work visas for international graduates.",
    longDescription: "Ireland has emerged as a premier study destination, especially for technology and business students. Home to the European headquarters of Google, Apple, Facebook, Microsoft, and Amazon, Ireland offers unparalleled career opportunities. Irish universities like Trinity College Dublin and UCD are globally recognized. The 2-year Stay Back visa (Third Level Graduate Programme) allows graduates to seek employment, and Ireland's friendly, English-speaking environment makes it perfect for Indian students.",
    universities: "80+",
    avgCost: "₹15-35L/year",
    livingCost: "₹60,000-1,20,000/month",
    workPermit: "2-Year Stay Back Visa (Third Level Graduate Programme)",
    scholarships: "Government of Ireland Scholarships, University Scholarships",
    visaSuccessRate: "Long Stay 'D' + Stamp 2",
    intakeMonths: "September, January",
    currency: "EUR (€)",
    language: "English",
    gradient: "bg-gradient-warm",
    colleges: [
      { name: "Trinity College Dublin (TCD)", location: "Dublin", ranking: "QS #81", programs: ["Computer Science", "Business", "Law", "Medicine", "Engineering"], website: "https://www.tcd.ie" },
      { name: "University College Dublin (UCD)", location: "Dublin", ranking: "QS #126", programs: ["Business", "Engineering", "Computer Science", "Agriculture", "Law"], website: "https://www.ucd.ie" },
      { name: "National University of Ireland, Galway (NUIG)", location: "Galway", ranking: "QS #244", programs: ["Engineering", "Medicine", "Business", "Sciences", "Arts"], website: "https://www.universityofgalway.ie" },
      { name: "University College Cork (UCC)", location: "Cork", ranking: "QS #292", programs: ["Medicine", "Pharmacy", "Business", "Engineering", "Food Science"], website: "https://www.ucc.ie" },
      { name: "Dublin City University (DCU)", location: "Dublin", ranking: "QS #436", programs: ["Engineering", "Business", "Communication", "Computing", "Education"], website: "https://www.dcu.ie" },
      { name: "University of Limerick (UL)", location: "Limerick", ranking: "QS #426", programs: ["Engineering", "Business", "Health Sciences", "Education", "Arts"], website: "https://www.ul.ie" },
      { name: "Maynooth University", location: "Maynooth", ranking: "QS #801-850", programs: ["Computer Science", "Social Sciences", "Education", "Business", "Law"], website: "https://www.maynoothuniversity.ie" },
      { name: "Technological University Dublin (TU Dublin)", location: "Dublin", ranking: "QS #801-1000", programs: ["Engineering", "Computing", "Business", "Media", "Hospitality"], website: "https://www.tudublin.ie" }
    ],
    collegeCount: 80,
    programs: ["Computer Science & IT", "Business & Finance", "Engineering", "Pharmaceutical Sciences", "Data Analytics", "Digital Marketing"],
    keywords: [
      "study in ireland", "study in ireland from india", "ireland education consultancy",
      "education loan for ireland", "ireland student visa", "ireland study visa stamp 2",
      "best universities in ireland", "trinity college dublin admission",
      "mba in ireland", "ms in ireland", "data analytics in ireland",
      "ireland scholarship for indian students", "cost of studying in ireland",
      "ireland tuition fees", "work permit after study in ireland",
      "ireland stay back visa", "ucd admission for indian students",
      "ielts for ireland universities", "study abroad consultant ireland",
      "ireland education loan", "ireland tech jobs", "ireland vs uk for studies"
    ],
    services: [
      { title: "Ireland University Admission", description: "Expert guidance for applying to Irish universities and institutes of technology.", features: ["University Shortlisting", "Application Support", "SOP Writing", "Scholarship Applications"] },
      { title: "Ireland Education Loan", description: "Affordable education loans for Irish universities.", features: ["Secured and unsecured routes", "Quick Processing", "No Collateral Options", "Competitive Rates"] },
      { title: "Ireland Student Visa (Stamp 2)", description: "Complete visa assistance for Irish student visa.", features: ["Documentation Prep", "Financial Proof", "Application Filing", "GNIB Registration Guidance"] },
      { title: "Career Support in Ireland", description: "Help with internship and job placement in Ireland's booming tech sector.", features: ["CV/Resume Building", "Interview Prep", "Industry Connections", "Stay Back Visa Guidance"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 12 years",
      processingTime: "Depends on your file",
      highlights: ["Affordable tuition fees", "Covers tuition + living", "Tax benefits under 80E", "Moratorium period", "Quick disbursement"]
    },
    eligibility: ["Confirmed offer from a recognized Irish institution", "Minimum 60% in previous qualification", "Valid passport", "IELTS 6.0-6.5", "Financial proof (€10,000+)", "Health insurance"],
    englishTests: ["IELTS Academic (6.0-6.5)", "TOEFL iBT (79-90)", "PTE Academic (55-63)", "Duolingo English Test (105-120)"],
    documentsRequired: ["Valid Passport", "University Offer Letter", "Academic Transcripts", "IELTS/PTE Scores", "Financial Proof", "SOP", "CV/Resume", "Health Insurance", "Passport Photos"],
    faqs: [
      { question: "Why is Ireland a good study destination?", answer: "Ireland is the European HQ for Google, Apple, Facebook, Microsoft, and many tech giants. It's English-speaking, offers a 2-year stay-back visa, has top-ranked universities, and provides excellent career opportunities especially in tech, pharma, and finance." },
      { question: "What is the Stay Back visa in Ireland?", answer: "The Third Level Graduate Programme allows graduates to stay in Ireland for 1 year (Level 8 degree) or 2 years (Level 9 Masters/PhD) to seek employment. This is one of the most generous post-study work rights in Europe." },
      { question: "What is the cost of studying in Ireland?", answer: "Tuition fees range from ₹15 Lakhs to ₹35 Lakhs per year. Living costs are ₹60,000-1,20,000 per month. Ireland is more affordable than the UK while offering similar quality education and career prospects." },
      { question: "Can I work while studying in Ireland?", answer: "Yes! Students can work up to 20 hours/week during term time and 40 hours/week during holidays (June-September, December 15-January 15). Minimum wage is €12.70/hour." },
      { question: "What are the best universities in Ireland?", answer: "Top universities include Trinity College Dublin (QS #81), University College Dublin, NUI Galway, University College Cork, Dublin City University, and University of Limerick. TCD is the most prestigious." },
      { question: "Is Ireland good for IT/tech students?", answer: "Absolutely! Ireland is Europe's tech hub, hosting major tech companies. Courses in Computer Science, Data Analytics, AI, and Cybersecurity are in high demand. Graduates have excellent job prospects with competitive salaries." },
      { question: "How do I get an education loan for Ireland?", answer: "Start as soon as you have an offer letter, not after you book a visa appointment. We work out the total cost of the course and living in Ireland, what your family can fund, and the real gap left to borrow — then compare secured, unsecured and collateral-free routes against your profile and help you assemble the file. We are not a lender and take no commission from any of them: the amount, the interest rate, the collateral requirement and the approval are all the lender's decision. The loan is normally released in multiple disbursements, timed to your fee deadlines." },
      { question: "What IELTS score is needed for Irish universities?", answer: "Most Irish universities require IELTS 6.0-6.5 overall. TCD may require 6.5 for some programs. PTE and TOEFL are also accepted. Some universities offer pre-sessional English courses." }
    ],
    metaTitle: "Study in Ireland | Universities & Stamp 1G Stay Back",
    metaDescription: "Study in Ireland from India with DreamDestination. Get admission to Trinity College Dublin, UCD & top Irish universities. Education loans, 2-year stay back visa, and career support in Europe's tech capital."
  },

  // ============================================================
  // 8. France
  // ============================================================
  {
    slug: "france",
    name: "France",
    flag: "🇫🇷",
    heroTagline: "World-Class Education with Affordable Tuition in Europe",
    description: "France offers prestigious universities, affordable public university fees, and a 2-year post-study residence permit for graduates.",
    longDescription: "France is the 4th most popular study destination worldwide, offering a unique blend of academic excellence and cultural richness. French public universities charge very low tuition fees (starting from €2,770/year for Masters), making quality education accessible. With top business schools (HEC Paris, INSEAD), prestigious Grandes Écoles, and a 2-year post-study work permit, France offers exceptional value. DreamDestination helps Indian students navigate the Campus France process and secure their spot in French institutions.",
    universities: "250+",
    avgCost: "₹3-25L/year",
    livingCost: "₹50,000-1,00,000/month",
    workPermit: "2-Year Post-Study Residence Permit (APS)",
    scholarships: "Eiffel Scholarship, Campus France Scholarships, Charpak Scholarship",
    visaSuccessRate: "VLS-TS Étudiant",
    intakeMonths: "September, January",
    currency: "EUR (€)",
    language: "French & English",
    gradient: "bg-gradient-hero",
    colleges: [
      { name: "Université PSL (Paris Sciences et Lettres)", location: "Paris", ranking: "QS #24", programs: ["Sciences", "Engineering", "Arts", "Humanities", "Economics"], website: "https://www.psl.eu" },
      { name: "HEC Paris", location: "Paris", ranking: "Top 3 Global MBA", programs: ["MBA", "Masters in Management", "Finance", "Strategy", "Entrepreneurship"], website: "https://www.hec.edu" },
      { name: "Institut Polytechnique de Paris", location: "Paris", ranking: "QS #38", programs: ["Engineering", "Computer Science", "Mathematics", "Physics", "Economics"], website: "https://www.ip-paris.fr" },
      { name: "Sorbonne University", location: "Paris", ranking: "QS #59", programs: ["Sciences", "Medicine", "Humanities", "Law", "Literature"], website: "https://www.sorbonne-universite.fr" },
      { name: "Université Paris-Saclay", location: "Paris Region", ranking: "QS #62", programs: ["Sciences", "Engineering", "Medicine", "Economics", "Law"], website: "https://www.universite-paris-saclay.fr" },
      { name: "ESSEC Business School", location: "Paris", ranking: "Top 10 European", programs: ["MBA", "Management", "Finance", "Marketing", "Data Science"], website: "https://www.essec.edu" },
      { name: "Sciences Po", location: "Paris", ranking: "QS Top 50 Social Sciences", programs: ["Political Science", "International Relations", "Law", "Economics", "Public Policy"], website: "https://www.sciencespo.fr" },
      { name: "Grenoble Ecole de Management", location: "Grenoble", ranking: "Top 30 European", programs: ["Business", "Management", "Innovation", "Technology", "Finance"], website: "https://www.grenoble-em.com" }
    ],
    collegeCount: 250,
    programs: ["Business & MBA", "Engineering", "Fashion & Design", "Culinary Arts", "Sciences", "Political Science"],
    keywords: [
      "study in france", "study in france from india", "france education consultancy",
      "education loan for france", "france student visa", "campus france india",
      "best universities in france", "top colleges in france",
      "mba in france", "ms in france", "engineering in france", "study in france in english",
      "france scholarship for indian students", "eiffel scholarship",
      "cost of studying in france", "france tuition fees for indian students",
      "work permit after study in france", "france post study work visa",
      "hec paris admission", "sorbonne university admission",
      "ielts for france", "study abroad consultant france",
      "france education loan", "france vs germany for studies"
    ],
    services: [
      { title: "France University Admission", description: "Expert guidance for Campus France procedure and French university applications.", features: ["Campus France Process", "University Shortlisting", "SOP & Motivation Letter", "Interview Preparation"] },
      { title: "France Education Loan", description: "Education loans for studying in France with competitive rates.", features: ["Secured and unsecured routes", "Quick Processing", "No Collateral Options", "Low EMIs"] },
      { title: "France Student Visa", description: "Comprehensive VFS visa application support for long-stay student visa.", features: ["Documentation Prep", "Campus France Interview", "Visa Application", "Accommodation Proof"] },
      { title: "French Language Support", description: "Guidance on French language requirements and preparation.", features: ["TCF/DELF Prep", "Language Course Guidance", "English-taught Programs", "Cultural Orientation"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 10 years",
      processingTime: "Depends on your file",
      highlights: ["Very low tuition at public universities", "Covers living + tuition + travel", "Tax benefits under 80E", "Low loan amounts = easy repayment", "Moratorium available"]
    },
    eligibility: ["Confirmed admission from a French institution", "Campus France validation", "Minimum 60% in previous qualification", "Valid passport", "French/English proficiency", "Financial proof (€7,380/year)"],
    englishTests: ["IELTS Academic (6.0-6.5)", "TOEFL iBT (80-90)", "TCF/DELF B2 (for French-taught programs)", "GMAT/GRE (for business schools)"],
    documentsRequired: ["Valid Passport", "University Acceptance Letter", "Campus France Validation", "Academic Transcripts", "Language Test Scores", "Financial Proof", "SOP/Motivation Letter", "CV/Resume", "Birth Certificate", "Accommodation Proof"],
    faqs: [
      { question: "Is it affordable to study in France?", answer: "Yes! French public universities charge only €2,770/year for Masters and €170/year for PhD. Even including living costs, France is one of the most affordable European destinations. Private business schools cost more (€15,000-40,000/year)." },
      { question: "Can I study in France in English?", answer: "Yes, over 1,600 programs are taught entirely in English across French universities and business schools. MBA, engineering, and science programs commonly offer English instruction. Knowledge of French helps with daily life but isn't mandatory." },
      { question: "What is the Campus France procedure?", answer: "Campus France is the French government agency that facilitates international student admission. Steps: 1) Create account on Études en France, 2) Submit applications, 3) Attend interview, 4) Get validation, 5) Apply for visa. DreamDestination guides you through each step." },
      { question: "What is the post-study work visa in France?", answer: "The APS (Autorisation Provisoire de Séjour) gives graduates a 2-year residence permit to seek employment in France. During this period, you can work full-time. After finding a job matching your qualification, you can switch to a work permit." },
      { question: "Can I work while studying in France?", answer: "Yes! Students can work up to 964 hours per year (approximately 20 hours/week). Minimum wage is €11.65/hour. Many students work part-time to cover living expenses." },
      { question: "What are the best universities in France?", answer: "Top institutions include PSL Research University (QS #24), HEC Paris (top 3 MBA globally), Sorbonne University, Institut Polytechnique de Paris, Sciences Po, and ESSEC Business School." },
      { question: "How do I get an education loan for France?", answer: "Start as soon as you have an offer letter, not after you book a visa appointment. We work out the total cost of the course and living in France, what your family can fund, and the real gap left to borrow — then compare secured, unsecured and collateral-free routes against your profile and help you assemble the file. We are not a lender and take no commission from any of them: the amount, the interest rate, the collateral requirement and the approval are all the lender's decision. The loan is normally released in multiple disbursements, timed to your fee deadlines." },
      { question: "What is the Eiffel Scholarship?", answer: "The Eiffel Excellence Scholarship Program is funded by the French government for international students. It covers €1,181/month for Masters and €1,700/month for PhD, plus travel and health insurance. DreamDestination helps identify and apply for this scholarship." }
    ],
    metaTitle: "Study in France | Affordable Universities & Eiffel Grant",
    metaDescription: "Study in France from India with DreamDestination. Affordable tuition from €2,770/year at public universities. HEC Paris, Sorbonne admission, education loans, Campus France guidance & 2-year work visa."
  },

  // ============================================================
  // 9. Germany
  // ============================================================
  {
    slug: "germany",
    name: "Germany",
    flag: "🇩🇪",
    heroTagline: "Tuition-Free Education in Europe's Economic Powerhouse",
    description: "Germany offers tuition-free education at public universities, world-class engineering programs, and an 18-month post-study work visa.",
    longDescription: "Germany is the top choice for students seeking affordable, high-quality education. Most public universities charge NO tuition fees — only a small semester contribution (€150-350). Known globally for engineering, automotive technology, and research, German universities like TU Munich, LMU Munich, and Heidelberg offer programs that are among the world's best. The 18-month post-study job seeker visa and Europe's strongest economy make Germany ideal for career-oriented students.",
    universities: "100+",
    avgCost: "₹1-15L/year",
    livingCost: "₹50,000-90,000/month",
    workPermit: "18-Month Job Seeker Visa",
    scholarships: "DAAD, Deutschlandstipendium, Heinrich Böll Foundation",
    visaSuccessRate: "Residence Permit §16b",
    intakeMonths: "October (Winter), April (Summer)",
    currency: "EUR (€)",
    language: "German & English",
    gradient: "bg-gradient-success",
    colleges: [
      { name: "Technical University of Munich (TUM)", location: "Munich, Bavaria", ranking: "QS #37", programs: ["Engineering", "Computer Science", "Business", "Physics", "Medicine"], website: "https://www.tum.de" },
      { name: "Ludwig Maximilian University (LMU Munich)", location: "Munich, Bavaria", ranking: "QS #54", programs: ["Medicine", "Law", "Business", "Sciences", "Humanities"], website: "https://www.lmu.de" },
      { name: "Heidelberg University", location: "Heidelberg, Baden-Württemberg", ranking: "QS #47", programs: ["Medicine", "Sciences", "Law", "Humanities", "Social Sciences"], website: "https://www.uni-heidelberg.de" },
      { name: "RWTH Aachen University", location: "Aachen, North Rhine-Westphalia", ranking: "QS #106", programs: ["Mechanical Engineering", "Electrical Engineering", "Computer Science", "Architecture"], website: "https://www.rwth-aachen.de" },
      { name: "Humboldt University of Berlin", location: "Berlin", ranking: "QS #120", programs: ["Sciences", "Humanities", "Social Sciences", "Law", "Medicine"], website: "https://www.hu-berlin.de" },
      { name: "Free University of Berlin", location: "Berlin", ranking: "QS #98", programs: ["Political Science", "History", "Biology", "Chemistry", "Computer Science"], website: "https://www.fu-berlin.de" },
      { name: "University of Stuttgart", location: "Stuttgart, Baden-Württemberg", ranking: "QS #285", programs: ["Automotive Engineering", "Aerospace", "Architecture", "Computer Science", "Manufacturing"], website: "https://www.uni-stuttgart.de" },
      { name: "TU Berlin", location: "Berlin", ranking: "QS #154", programs: ["Engineering", "Computer Science", "Mathematics", "Physics", "Architecture"], website: "https://www.tu.berlin" },
      { name: "University of Mannheim", location: "Mannheim, Baden-Württemberg", ranking: "Top European Business", programs: ["Business", "Economics", "Social Sciences", "Law", "Humanities"], website: "https://www.uni-mannheim.de" },
      { name: "KIT (Karlsruhe Institute of Technology)", location: "Karlsruhe, Baden-Württemberg", ranking: "QS #119", programs: ["Engineering", "Computer Science", "Physics", "Economics", "Architecture"], website: "https://www.kit.edu" }
    ],
    collegeCount: 100,
    programs: ["Engineering", "Automotive Technology", "Computer Science", "Business & Economics", "Medicine", "Research"],
    keywords: [
      "study in germany", "study in germany for free", "germany education consultancy",
      "education loan for germany", "germany student visa", "germany study visa from india",
      "best universities in germany", "top colleges in germany", "tu munich admission",
      "ms in germany", "mba in germany", "engineering in germany", "study in germany in english",
      "daad scholarship", "germany scholarship for indian students",
      "cost of studying in germany", "germany tuition free universities",
      "job seeker visa germany", "work after study in germany",
      "rwth aachen admission", "lmu munich fees",
      "ielts for germany", "study abroad consultant germany",
      "germany education loan", "blocked account germany"
    ],
    services: [
      { title: "Germany University Admission", description: "Expert guidance for applying to German public universities and private institutions via Uni-Assist.", features: ["Uni-Assist Application", "University Shortlisting", "Motivation Letter Writing", "APS Verification"] },
      { title: "Germany Education Loan", description: "Minimal education loans since tuition is free — primarily for living expenses and blocked account.", features: ["Secured and unsecured routes", "Covers Blocked Account", "Living Expenses", "Quick Processing"] },
      { title: "Germany Student Visa", description: "Complete visa assistance including blocked account setup and APS certification.", features: ["Blocked Account Setup", "APS Certificate", "Visa Application", "Health Insurance"] },
      { title: "German Language Support", description: "Guidance on German language requirements and TestDaF/DSH preparation.", features: ["TestDaF Prep", "DSH Preparation", "English-taught Program Search", "Language Course Guidance"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 10 years",
      processingTime: "Depends on your file",
      highlights: ["Tuition-free at public universities", "Loan mainly for living expenses", "Blocked account of €11,208/year", "Very low total cost of education", "Tax benefits under 80E"]
    },
    eligibility: ["Confirmed admission from a recognized German university", "APS certificate (for Indian students)", "Minimum 60-70% in previous qualification", "Valid passport", "German/English proficiency", "Blocked account (€11,208/year)"],
    englishTests: ["IELTS Academic (6.0-6.5)", "TOEFL iBT (80-90)", "TestDaF (Level 4 for German programs)", "DSH-2 (for German-taught programs)"],
    documentsRequired: ["Valid Passport", "University Admission Letter", "APS Certificate", "Academic Transcripts", "Language Proficiency Proof", "Blocked Account Confirmation", "Health Insurance", "Motivation Letter", "CV/Resume", "Passport Photos"],
    faqs: [
      { question: "Is education really free in Germany?", answer: "Yes! Most public universities in Germany charge NO tuition fees for Bachelor's and Master's programs (including international students). You only pay a small semester contribution of €150-350 for student services, public transport, etc. Private universities do charge tuition." },
      { question: "What is a blocked account for Germany?", answer: "A blocked account (Sperrkonto) is a special bank account you must open to prove you have sufficient funds for living in Germany. Currently, you need €11,208 for one year (€934/month). DreamDestination helps you set this up easily." },
      { question: "What is the APS certificate?", answer: "APS (Akademische Prüfstelle) verification is mandatory for Indian students applying to German universities. It verifies your academic qualifications. The process includes document verification and an interview. DreamDestination prepares you for both." },
      { question: "Can I study in Germany in English?", answer: "Yes! Over 1,800 programs are taught in English, especially at the Master's level. Engineering, Computer Science, and Business programs commonly offer English instruction. For German-taught programs, TestDaF Level 4 or DSH-2 is required." },
      { question: "What is the job seeker visa in Germany?", answer: "After graduating, you get an 18-month job seeker visa to find employment in Germany. During this time, you can work in any job. Once you find a qualified position, you can switch to a work permit. Germany's strong economy means excellent job prospects." },
      { question: "Can I work while studying in Germany?", answer: "Yes! Students can work 120 full days or 240 half days per year. Working as a student assistant (HiWi) at university is also common and doesn't count toward this limit. Minimum wage is €12.41/hour." },
      { question: "What are the best universities in Germany for engineering?", answer: "Top engineering universities include TU Munich (QS #37), RWTH Aachen, KIT Karlsruhe, TU Berlin, University of Stuttgart, and TU Darmstadt. Germany is world-renowned for engineering, especially automotive and mechanical." },
      { question: "How much does it cost to live in Germany?", answer: "Living costs are approximately €934/month (€11,208/year) as per blocked account requirements. Munich is the most expensive city (€1,000-1,200/month), while cities like Leipzig, Dresden, and Chemnitz are more affordable (€700-800/month)." },
      { question: "How do I get an education loan for Germany?", answer: "Start as soon as you have an offer letter, not after you book a visa appointment. We work out the total cost of the course and living in Germany, what your family can fund, and the real gap left to borrow — then compare secured, unsecured and collateral-free routes against your profile and help you assemble the file. We are not a lender and take no commission from any of them: the amount, the interest rate, the collateral requirement and the approval are all the lender's decision. The loan is normally released in multiple disbursements, timed to your fee deadlines." },
      { question: "Is German language necessary for studying in Germany?", answer: "Not if you choose an English-taught program. However, learning basic German (A1-A2 level) greatly helps with daily life, part-time jobs, and integration. Some technical universities and all undergraduate programs typically require German proficiency." }
    ],
    metaTitle: "Study in Germany Free | Tuition-Free Unis & DAAD Scholarship",
    metaDescription: "Study in Germany with zero tuition fees at public universities. DreamDestination offers admission guidance to TU Munich, RWTH Aachen & top German universities, education loans, APS certification & visa support for Indian students."
  },

  // ============================================================
  // 10. UAE
  // ============================================================
  {
    slug: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    heroTagline: "World-Class Education in the Middle East's Business Hub",
    description: "The UAE offers a dynamic education environment with international branch campuses, tax-free earnings, and proximity to India.",
    longDescription: "The UAE has rapidly emerged as a global education hub, hosting branch campuses of world-renowned universities like NYU Abu Dhabi, Sorbonne Abu Dhabi, and University of Birmingham Dubai. With its tax-free economy, strategic location, multicultural environment, and proximity to India (3-4 hour flight), the UAE is increasingly popular among Indian students. Dubai Knowledge Park and Abu Dhabi's universities offer programs recognized globally, with excellent internship and job opportunities in a thriving economy.",
    universities: "70+",
    avgCost: "₹10-35L/year",
    livingCost: "₹50,000-1,20,000/month",
    workPermit: "Employment Visa Post-Graduation",
    scholarships: "University Merit Scholarships, Government Scholarships",
    visaSuccessRate: "Student Residence Visa",
    intakeMonths: "September, January, May",
    currency: "AED (د.إ)",
    language: "English & Arabic",
    gradient: "bg-gradient-warm",
    colleges: [
      { name: "NYU Abu Dhabi", location: "Abu Dhabi", ranking: "QS #Top 30 equivalent", programs: ["Engineering", "Business", "Arts", "Sciences", "Social Sciences"], website: "https://nyuad.nyu.edu" },
      { name: "Khalifa University", location: "Abu Dhabi", ranking: "QS #230", programs: ["Engineering", "Sciences", "Medicine", "Nuclear Energy", "AI/ML"], website: "https://www.ku.ac.ae" },
      { name: "American University of Sharjah (AUS)", location: "Sharjah", ranking: "QS #364", programs: ["Engineering", "Business", "Architecture", "Arts & Sciences"], website: "https://www.aus.edu" },
      { name: "University of Sharjah", location: "Sharjah", ranking: "QS #465", programs: ["Engineering", "Medicine", "Business", "Law", "Sciences"], website: "https://www.sharjah.ac.ae" },
      { name: "Sorbonne Abu Dhabi", location: "Abu Dhabi", ranking: "Top French Branch", programs: ["Languages", "Sciences", "Law", "Management", "Arts"], website: "https://www.sorbonne.ae" },
      { name: "Heriot-Watt University Dubai", location: "Dubai", ranking: "QS #281", programs: ["Engineering", "Business", "Computer Science", "Energy", "Psychology"], website: "https://www.hw.ac.uk/dubai" },
      { name: "University of Birmingham Dubai", location: "Dubai", ranking: "QS #80 (UK campus)", programs: ["Business", "Engineering", "Computer Science", "Economics", "Psychology"], website: "https://www.birmingham.ac.ae" },
      { name: "SP Jain School of Global Management", location: "Dubai", ranking: "Top Asian Business School", programs: ["BBA", "MBA", "MGB", "Data Science"], website: "https://www.spjain.org" }
    ],
    collegeCount: 70,
    programs: ["Business & Management", "Engineering", "Computer Science", "Architecture", "Healthcare", "Aviation"],
    keywords: [
      "study in uae", "study in dubai", "study in abu dhabi", "uae education consultancy",
      "education loan for uae", "uae student visa", "dubai study visa",
      "best universities in uae", "top colleges in dubai", "nyu abu dhabi admission",
      "mba in uae", "ms in uae", "engineering in dubai",
      "uae scholarship for indian students", "cost of studying in uae",
      "dubai tuition fees", "work in uae after study",
      "sorbonne abu dhabi", "american university of sharjah",
      "ielts for uae universities", "study abroad consultant uae",
      "uae education loan", "dubai vs singapore for studies"
    ],
    services: [
      { title: "UAE University Admission", description: "Expert guidance for applying to UAE universities and international branch campuses.", features: ["University Selection", "Application Support", "SOP Writing", "Scholarship Applications"] },
      { title: "UAE Education Loan", description: "Education loans for UAE studies with competitive rates.", features: ["Secured and unsecured routes", "Quick Processing", "No Collateral Options", "Flexible EMI"] },
      { title: "UAE Student Visa", description: "Streamlined student visa process with university sponsorship.", features: ["Visa Application", "Medical Test", "Emirates ID", "Documentation Support"] },
      { title: "UAE Career Support", description: "Job placement assistance in the UAE's tax-free economy.", features: ["CV Building", "Interview Prep", "Industry Connections", "Work Visa Guidance"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 10 years",
      processingTime: "Depends on your file",
      highlights: ["Proximity to India = low travel costs", "Tax-free earnings during studies", "Covers tuition + living expenses", "Moratorium available", "Quick processing"]
    },
    eligibility: ["Confirmed admission from a UAE institution", "Minimum 55-60% in previous qualification", "Valid passport", "IELTS/TOEFL (if required)", "Medical fitness test", "Financial proof"],
    englishTests: ["IELTS Academic (5.5-6.5)", "TOEFL iBT (61-90)", "EmSAT (for local institutions)", "PTE Academic (50-60)"],
    documentsRequired: ["Valid Passport", "University Offer Letter", "Academic Transcripts", "IELTS/TOEFL Scores", "Medical Fitness Certificate", "Passport Photos", "Financial Proof", "SOP", "Emirates ID Application"],
    faqs: [
      { question: "Why study in the UAE?", answer: "The UAE offers proximity to India (3-4 hour flight), international branch campuses of top global universities, tax-free part-time earnings, a booming job market, and a multicultural environment. Many programs are taught in English." },
      { question: "What is the cost of studying in the UAE?", answer: "Tuition fees range from ₹10 Lakhs to ₹35 Lakhs per year. Living costs are ₹50,000-1,20,000 per month. Sharjah is more affordable than Dubai and Abu Dhabi. Total cost for a 2-year program ranges from ₹25 Lakhs to ₹70 Lakhs." },
      { question: "Can I work while studying in the UAE?", answer: "Yes, students can work part-time with a part-time work permit. Many universities help students find internships and part-time positions. Earnings are tax-free, which is a major advantage." },
      { question: "Is a UAE degree recognized internationally?", answer: "Yes, degrees from accredited UAE universities are recognized globally. International branch campuses (NYU Abu Dhabi, Sorbonne Abu Dhabi, University of Birmingham Dubai) offer the same degree as their parent institution." },
      { question: "What are the best universities in the UAE?", answer: "Top choices include NYU Abu Dhabi, Khalifa University, American University of Sharjah, University of Sharjah, Sorbonne Abu Dhabi, and several international branch campuses in Dubai Knowledge Park." },
      { question: "How close is the UAE to India?", answer: "The UAE is just 3-4 hours by flight from most Indian cities. This proximity makes it easy for students to visit home frequently, and for families to visit. Direct flights are available from all major Indian cities." },
      { question: "How do I get an education loan for UAE?", answer: "Start as soon as you have an offer letter, not after you book a visa appointment. We work out the total cost of the course and living in UAE, what your family can fund, and the real gap left to borrow — then compare secured, unsecured and collateral-free routes against your profile and help you assemble the file. We are not a lender and take no commission from any of them: the amount, the interest rate, the collateral requirement and the approval are all the lender's decision. The loan is normally released in multiple disbursements, timed to your fee deadlines." },
      { question: "What career opportunities exist in the UAE after graduation?", answer: "The UAE's diverse economy offers opportunities in finance, technology, hospitality, healthcare, engineering, and real estate. Dubai and Abu Dhabi are global business hubs. Tax-free salaries make the UAE very attractive for fresh graduates." }
    ],
    metaTitle: "Study in UAE | Dubai & Abu Dhabi Universities, Visas",
    metaDescription: "Study in the UAE from India with DreamDestination. Get admission to NYU Abu Dhabi, American University of Sharjah & top UAE universities. Education loans, student visa assistance & career support in the Middle East."
  },

  // ============================================================
  // 11. India
  // ============================================================
  {
    slug: "india",
    name: "India",
    flag: "🇮🇳",
    heroTagline: "Premier Institutions with World-Class Research & Innovation",
    description: "India offers prestigious institutions like IITs, IIMs, and AIIMS with globally recognized programs at competitive costs.",
    longDescription: "India's higher education system is one of the largest in the world, with premier institutions like IITs, IIMs, AIIMS, and NITs offering world-class education. For NRI students, international students, and those seeking top-quality education at competitive costs, India provides excellent programs in engineering, medicine, management, and research. DreamDestination assists with admission guidance, education loans, and placement support for India's top institutions.",
    universities: "1000+",
    avgCost: "₹2-25L/year",
    livingCost: "₹15,000-50,000/month",
    workPermit: "Work opportunities through campus placements",
    scholarships: "Government Scholarships, Merit-based, ICCR Scholarships",
    visaSuccessRate: "Student Visa (S)",
    intakeMonths: "July/August, January",
    currency: "INR (₹)",
    language: "English & Hindi",
    gradient: "bg-gradient-warm",
    colleges: [
      { name: "Indian Institute of Technology Bombay (IIT-B)", location: "Mumbai, Maharashtra", ranking: "QS #118", programs: ["Engineering", "Computer Science", "Management", "Sciences", "Design"], website: "https://www.iitb.ac.in" },
      { name: "Indian Institute of Technology Delhi (IIT-D)", location: "New Delhi", ranking: "QS #150", programs: ["Engineering", "Computer Science", "Management", "Sciences", "Humanities"], website: "https://home.iitd.ac.in" },
      { name: "Indian Institute of Science (IISc)", location: "Bangalore, Karnataka", ranking: "QS #211", programs: ["Sciences", "Engineering", "Management", "Research", "Interdisciplinary"], website: "https://www.iisc.ac.in" },
      { name: "IIM Ahmedabad", location: "Ahmedabad, Gujarat", ranking: "Top 50 Global MBA", programs: ["MBA (PGP)", "PGPX", "FABM", "Executive Programs"], website: "https://www.iima.ac.in" },
      { name: "IIM Bangalore", location: "Bangalore, Karnataka", ranking: "Top 50 Global MBA", programs: ["PGP", "PGPEM", "EPGP", "Doctoral Program"], website: "https://www.iimb.ac.in" },
      { name: "AIIMS Delhi", location: "New Delhi", ranking: "#1 Medical in India", programs: ["MBBS", "MD/MS", "Nursing", "Biotechnology", "Allied Health"], website: "https://www.aiims.edu" },
      { name: "IIT Madras", location: "Chennai, Tamil Nadu", ranking: "QS #227", programs: ["Engineering", "Data Science", "Management", "Sciences", "Humanities"], website: "https://www.iitm.ac.in" },
      { name: "Delhi University", location: "New Delhi", ranking: "QS #328", programs: ["Arts", "Sciences", "Commerce", "Law", "Medicine"], website: "https://www.du.ac.in" },
      { name: "Jawaharlal Nehru University (JNU)", location: "New Delhi", ranking: "Top 10 India", programs: ["Social Sciences", "Languages", "International Studies", "Sciences", "Environmental Sciences"], website: "https://www.jnu.ac.in" },
      { name: "BITS Pilani", location: "Pilani, Rajasthan", ranking: "Top Private Engineering", programs: ["Engineering", "Sciences", "Pharmacy", "Management", "Humanities"], website: "https://www.bits-pilani.ac.in" }
    ],
    collegeCount: 1000,
    programs: ["Engineering & Technology", "Medicine & Healthcare", "Business & MBA", "Sciences & Research", "Law", "Arts & Design"],
    keywords: [
      "study in india", "best colleges in india", "top universities in india",
      "education loan for india", "education loan in india",
      "iit admission", "iim admission", "aiims admission", "nit admission",
      "engineering colleges in india", "medical colleges in india", "mba in india",
      "india scholarship for students", "cost of studying in india",
      "gate exam", "cat exam", "neet exam", "jee exam",
      "study in india for international students", "iccr scholarship",
      "education loan without collateral india", "best education loan in india",
      "campus placement india", "study abroad consultant india"
    ],
    services: [
      { title: "India College Admission", description: "Expert guidance for IIT, IIM, AIIMS, and top Indian university admissions.", features: ["Entrance Exam Prep", "College Selection", "Application Support", "Interview Preparation"] },
      { title: "India Education Loan", description: "Education loans for IITs, IIMs, and other premier Indian institutions.", features: ["Secured and unsecured routes", "No Collateral Options", "Quick Approval", "Low Interest Rates"] },
      { title: "Career Counseling", description: "Professional guidance for choosing the right course and career path.", features: ["Aptitude Assessment", "Career Mapping", "Course Selection", "Industry Insights"] },
      { title: "Scholarship Guidance", description: "Help identify and apply for government and private scholarships.", features: ["Government Schemes", "Merit Scholarships", "Need-based Aid", "Application Support"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 15 years",
      processingTime: "Depends on your file",
      highlights: ["Government subsidized rates for EWS", "Vidyalakshmi Portal access", "Central Sector Interest Subsidy", "Tax benefits under 80E", "Quick processing for top institutions"]
    },
    eligibility: ["Confirmed admission through entrance exam / merit", "Valid qualifying examination scores", "Indian nationality / OCI / PIO", "Entrance exam scores (JEE/NEET/CAT/GATE etc.)", "Academic transcripts"],
    englishTests: ["Not required for domestic students", "TOEFL/IELTS for international students"],
    documentsRequired: ["Admission Letter", "Academic Transcripts", "Entrance Exam Scorecard", "ID Proof (Aadhar/Passport)", "Income Certificate", "Domicile Certificate", "Caste Certificate (if applicable)", "Passport Photos"],
    faqs: [
      { question: "What are the top colleges in India?", answer: "India's top institutions include IIT Bombay, IIT Delhi, IIT Madras, IISc Bangalore, IIM Ahmedabad, IIM Bangalore, AIIMS Delhi, Delhi University, JNU, and BITS Pilani. These are globally recognized for academic excellence." },
      { question: "How to get an education loan in India?", answer: "Start as soon as you have an offer letter, not after you book a visa appointment. We work out the total cost of the course and living in India, what your family can fund, and the real gap left to borrow — then compare secured, unsecured and collateral-free routes against your profile and help you assemble the file. We are not a lender and take no commission from any of them: the amount, the interest rate, the collateral requirement and the approval are all the lender's decision. The loan is normally released in multiple disbursements, timed to your fee deadlines." },
      { question: "What entrance exams are required for Indian colleges?", answer: "Key exams include JEE Main/Advanced (engineering), NEET (medical), CAT (MBA), GATE (postgraduate engineering), CLAT (law), and NID/NIFT (design). DreamDestination provides preparation guidance for all major exams." },
      { question: "Is studying in India affordable?", answer: "Yes! Government institutions like IITs and AIIMS offer world-class education at subsidized fees (₹2-8 Lakhs/year). Private universities cost more (₹5-25 Lakhs/year) but offer excellent placements. India is one of the most affordable places for quality education." },
      { question: "What scholarships are available for Indian students?", answer: "Options include National Scholarship Portal schemes, Central Sector Scheme, Post-Matric Scholarships, INSPIRE fellowship, and institution-specific merit scholarships. DreamDestination helps identify and apply for relevant scholarships." },
      { question: "How are campus placements in India?", answer: "Top institutions like IITs, IIMs, and BITS offer excellent placement records. IIT students get packages of ₹15-50+ Lakhs/year. IIM graduates get ₹20-80+ Lakhs/year. Even mid-tier colleges have improving placement records." },
      { question: "Can international students study in India?", answer: "Yes! India welcomes international students through ICCR scholarships, Study in India program, and direct admission. Many universities have international student quotas. The affordable cost of education and living makes India attractive." },
      { question: "What is the Vidyalakshmi education loan portal?", answer: "Vidyalakshmi is a government portal that allows students to apply for education loans from multiple banks simultaneously. It covers loans under the Interest Subsidy Scheme for economically weaker students. DreamDestination helps navigate this portal." }
    ],
    metaTitle: "Study in India | IIT, IIM, AIIMS Admission & Education Loan",
    metaDescription: "Study in India's top institutions — IIT, IIM, AIIMS, NIT. DreamDestination offers admission guidance, education loan guidance, scholarship assistance & career counseling for India's premier colleges."
  },

  // ============================================================
  // 12. Switzerland
  // ============================================================
  {
    slug: "switzerland",
    name: "Switzerland",
    flag: "🇨🇭",
    heroTagline: "Home to the World's Best Hospitality & Research Universities",
    description: "Switzerland offers ETH Zurich (ranked #7 globally), world-renowned hospitality schools, and a multilingual European experience.",
    longDescription: "Switzerland is home to some of the world's most prestigious universities, including ETH Zurich (QS #7) and EPFL. Known globally for hospitality management, precision engineering, and banking & finance, Switzerland offers unmatched academic quality. Despite its high cost of living, low tuition at public universities and excellent post-study opportunities make it an attractive destination. The Swiss multicultural environment (4 official languages) provides a unique cultural experience.",
    universities: "30+",
    avgCost: "₹5-30L/year",
    livingCost: "₹1,00,000-2,00,000/month",
    workPermit: "6-Month Job Search Permit",
    scholarships: "Swiss Government Excellence Scholarships, ETH Scholarships",
    visaSuccessRate: "National Visa Type D",
    intakeMonths: "September, February",
    currency: "CHF (Fr.)",
    language: "German, French, Italian & English",
    gradient: "bg-gradient-hero",
    colleges: [
      { name: "ETH Zurich", location: "Zurich", ranking: "QS #7", programs: ["Engineering", "Computer Science", "Physics", "Architecture", "Environmental Science"], website: "https://ethz.ch" },
      { name: "EPFL (École Polytechnique Fédérale de Lausanne)", location: "Lausanne", ranking: "QS #36", programs: ["Engineering", "Computer Science", "Life Sciences", "Architecture", "Mathematics"], website: "https://www.epfl.ch" },
      { name: "University of Zurich", location: "Zurich", ranking: "QS #83", programs: ["Medicine", "Law", "Economics", "Sciences", "Humanities"], website: "https://www.uzh.ch" },
      { name: "University of Geneva", location: "Geneva", ranking: "QS #105", programs: ["International Relations", "Sciences", "Medicine", "Law", "Economics"], website: "https://www.unige.ch" },
      { name: "University of Bern", location: "Bern", ranking: "QS #120", programs: ["Medicine", "Sciences", "Social Sciences", "Humanities", "Law"], website: "https://www.unibe.ch" },
      { name: "EHL (École Hôtelière de Lausanne)", location: "Lausanne", ranking: "#1 Hospitality Globally", programs: ["Hospitality Management", "Tourism", "Luxury Brand Management", "Innovation"], website: "https://www.ehl.edu" },
      { name: "Les Roches", location: "Crans-Montana", ranking: "Top 3 Hospitality", programs: ["Hospitality Management", "Hotel Operations", "Events", "Entrepreneurship"], website: "https://www.lesroches.edu" },
      { name: "University of St. Gallen", location: "St. Gallen", ranking: "Top 10 European Business", programs: ["Business", "Economics", "Finance", "Law", "Management"], website: "https://www.unisg.ch" }
    ],
    collegeCount: 30,
    programs: ["Engineering & Technology", "Hospitality Management", "Banking & Finance", "Sciences", "Medicine", "International Relations"],
    keywords: [
      "study in switzerland", "study in switzerland from india", "switzerland education consultancy",
      "education loan for switzerland", "switzerland student visa", "switzerland study visa",
      "best universities in switzerland", "eth zurich admission from india",
      "hospitality management in switzerland", "mba in switzerland", "ms in switzerland",
      "ehl lausanne admission", "epfl admission",
      "swiss government scholarship", "cost of studying in switzerland",
      "switzerland tuition fees", "work after study in switzerland",
      "les roches admission", "hotel management in switzerland",
      "study abroad consultant switzerland", "switzerland education loan",
      "switzerland vs germany for studies"
    ],
    services: [
      { title: "Switzerland University Admission", description: "Expert guidance for ETH, EPFL, and Swiss hospitality school admissions.", features: ["University Shortlisting", "Application Support", "Motivation Letter Writing", "Interview Preparation"] },
      { title: "Switzerland Education Loan", description: "Education loans for Swiss universities including hospitality schools.", features: ["Secured and unsecured routes", "Quick Processing", "Competitive Rates", "No Collateral Options"] },
      { title: "Switzerland Student Visa", description: "Comprehensive visa support for Swiss student permits.", features: ["Documentation Prep", "Financial Proof", "Visa Application", "Cantonal Permit"] },
      { title: "Hospitality Career Support", description: "Specialized support for hospitality and hotel management students.", features: ["Internship Placement", "Industry Connections", "CV Building", "Interview Prep"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 12 years",
      processingTime: "Depends on your file",
      highlights: ["Public universities have low tuition", "Covers living expenses in high-cost country", "Tax benefits under 80E", "Moratorium available", "Premium education value"]
    },
    eligibility: ["Confirmed admission from Swiss institution", "Minimum 60-70% in previous qualification", "Valid passport", "Language proficiency (varies by program)", "Financial proof", "Health insurance"],
    englishTests: ["IELTS Academic (6.0-7.0)", "TOEFL iBT (80-100)", "TestDaF/DELF (for local language programs)", "GMAT/GRE (for business schools)"],
    documentsRequired: ["Valid Passport", "University Admission Letter", "Academic Transcripts", "Language Scores", "Financial Proof", "Motivation Letter", "CV/Resume", "Health Insurance", "Passport Photos", "Criminal Background Check"],
    faqs: [
      { question: "Is Switzerland expensive for students?", answer: "While living costs are high (₹1-2 Lakhs/month), public university tuition is surprisingly affordable (CHF 500-1,500/semester). Private hospitality schools cost more. Students can work part-time to offset costs. Overall, the high quality of education justifies the investment." },
      { question: "How good is ETH Zurich?", answer: "ETH Zurich is ranked #7 globally (QS), making it one of the world's best universities. It has produced 21 Nobel laureates including Albert Einstein. It's particularly renowned for engineering, computer science, and natural sciences." },
      { question: "What is Switzerland known for in education?", answer: "Switzerland is globally renowned for: 1) Engineering & Technology (ETH, EPFL), 2) Hospitality Management (EHL - #1 globally, Les Roches), 3) Banking & Finance, 4) Watchmaking & precision engineering, and 5) International Relations (University of Geneva)." },
      { question: "Can I work while studying in Switzerland?", answer: "Yes, students can work up to 15 hours/week during term time and full-time during holidays. Non-EU students need a work permit. Wages are high — CHF 20-30+/hour for student jobs." },
      { question: "What are the best hospitality schools in Switzerland?", answer: "Switzerland is the birthplace of hospitality education. EHL (École Hôtelière de Lausanne) is ranked #1 globally. Les Roches, Glion, and SHMS are also among the world's top hospitality schools. Graduates are highly sought after worldwide." },
      { question: "Does Switzerland offer post-study work visas?", answer: "Graduates get a 6-month job search permit. Once employed, you can apply for a work permit. STEM graduates from ETH and EPFL are highly sought after. Switzerland's strong economy and high salaries make it attractive for job seekers." },
      { question: "How do I get an education loan for Switzerland?", answer: "Start as soon as you have an offer letter, not after you book a visa appointment. We work out the total cost of the course and living in Switzerland, what your family can fund, and the real gap left to borrow — then compare secured, unsecured and collateral-free routes against your profile and help you assemble the file. We are not a lender and take no commission from any of them: the amount, the interest rate, the collateral requirement and the approval are all the lender's decision. The loan is normally released in multiple disbursements, timed to your fee deadlines." },
      { question: "What languages do I need for studying in Switzerland?", answer: "Many Master's programs and hospitality courses are in English. Undergraduate programs at public universities may be in German (Zurich, Bern), French (Geneva, Lausanne), or Italian (Lugano). Language requirements vary by university and program." }
    ],
    metaTitle: "Study in Switzerland | ETH Zurich & Hospitality Schools",
    metaDescription: "Study in Switzerland from India. Get admission to ETH Zurich, EPFL, EHL & top Swiss universities. DreamDestination offers education loans, visa assistance & scholarship guidance for engineering, hospitality & business programs."
  },

  // ============================================================
  // 13. Spain
  // ============================================================
  {
    slug: "spain",
    name: "Spain",
    flag: "🇪🇸",
    heroTagline: "Affordable European Education with Rich Cultural Heritage",
    description: "Spain offers affordable tuition, world-class business schools, and a vibrant cultural experience in one of Europe's most beautiful countries.",
    longDescription: "Spain is an increasingly popular destination for Indian students, offering affordable tuition fees, excellent business schools (IE Business School, ESADE), and a rich cultural experience. Spanish public universities charge low tuition, and the cost of living is among the lowest in Western Europe. With a 1-year post-study job search visa and the opportunity to learn Spanish (the world's 2nd most spoken language), Spain offers unique advantages for global career growth.",
    universities: "80+",
    avgCost: "₹3-20L/year",
    livingCost: "₹40,000-80,000/month",
    workPermit: "1-Year Post-Study Job Search Permit",
    scholarships: "Spanish Government Scholarships, University Merit Awards",
    visaSuccessRate: "Estancia por Estudios",
    intakeMonths: "September, February",
    currency: "EUR (€)",
    language: "Spanish & English",
    gradient: "bg-gradient-warm",
    colleges: [
      { name: "University of Barcelona", location: "Barcelona", ranking: "QS #149", programs: ["Medicine", "Sciences", "Law", "Economics", "Humanities"], website: "https://www.ub.edu" },
      { name: "IE Business School", location: "Madrid", ranking: "Top 10 Global MBA", programs: ["MBA", "Masters in Management", "Finance", "Data Analytics", "Entrepreneurship"], website: "https://www.ie.edu" },
      { name: "Autonomous University of Madrid", location: "Madrid", ranking: "QS #171", programs: ["Sciences", "Law", "Medicine", "Economics", "Education"], website: "https://www.uam.es" },
      { name: "Autonomous University of Barcelona", location: "Barcelona", ranking: "QS #164", programs: ["Sciences", "Engineering", "Medicine", "Business", "Communication"], website: "https://www.uab.cat" },
      { name: "ESADE Business School", location: "Barcelona", ranking: "Top 15 European MBA", programs: ["MBA", "Law", "Executive Education", "Entrepreneurship"], website: "https://www.esade.edu" },
      { name: "Pompeu Fabra University", location: "Barcelona", ranking: "QS #213", programs: ["Economics", "Business", "Communication", "Political Science", "Health Sciences"], website: "https://www.upf.edu" },
      { name: "University of Navarra", location: "Pamplona", ranking: "QS #252", programs: ["Medicine", "Business (IESE)", "Engineering", "Law", "Sciences"], website: "https://www.unav.edu" },
      { name: "Complutense University of Madrid", location: "Madrid", ranking: "QS #215", programs: ["Medicine", "Law", "Arts", "Sciences", "Pharmacy"], website: "https://www.ucm.es" }
    ],
    collegeCount: 80,
    programs: ["Business & MBA", "Medicine", "Engineering", "Arts & Design", "Hospitality", "Language Studies"],
    keywords: [
      "study in spain", "study in spain from india", "spain education consultancy",
      "education loan for spain", "spain student visa", "spain study visa",
      "best universities in spain", "top colleges in spain",
      "mba in spain", "ms in spain", "study in spain in english",
      "ie business school admission", "esade mba", "spain scholarship for indian students",
      "cost of studying in spain", "spain tuition fees",
      "work permit after study in spain", "spain post study work visa",
      "university of barcelona admission", "ielts for spain universities",
      "study abroad consultant spain", "spain education loan",
      "spain vs italy for studies"
    ],
    services: [
      { title: "Spain University Admission", description: "Expert guidance for Spanish university and business school applications.", features: ["University Selection", "Application Support", "SOP Writing", "Credential Recognition"] },
      { title: "Spain Education Loan", description: "Affordable education loans for Spanish universities.", features: ["Secured and unsecured routes", "Low EMIs", "No Collateral Options", "Quick Processing"] },
      { title: "Spain Student Visa", description: "Comprehensive visa support for Spanish student visa.", features: ["Documentation Prep", "Financial Proof", "Application Filing", "NIE Guidance"] },
      { title: "Spanish Language Support", description: "Language preparation and guidance for studying in Spain.", features: ["DELE Prep", "Spanish Courses", "English-taught Programs", "Cultural Orientation"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 10 years",
      processingTime: "Depends on your file",
      highlights: ["Very affordable tuition fees", "Low cost of living", "Small loan amounts", "Easy repayment", "Tax benefits under 80E"]
    },
    eligibility: ["Confirmed admission from a Spanish institution", "Minimum 55-60% in previous qualification", "Valid passport", "Spanish/English proficiency", "Financial proof (€600+/month)", "Health insurance"],
    englishTests: ["IELTS Academic (5.5-6.5)", "TOEFL iBT (70-90)", "DELE (for Spanish-taught programs)", "GMAT/GRE (for business schools)"],
    documentsRequired: ["Valid Passport", "University Acceptance", "Academic Transcripts", "Language Scores", "Financial Proof", "SOP", "Health Insurance", "Criminal Record Certificate", "Passport Photos"],
    faqs: [
      { question: "Is Spain affordable for Indian students?", answer: "Yes! Spain is one of the most affordable Western European destinations. Public university tuition ranges from €680 to €3,500/year for Masters. Living costs are ₹40,000-80,000/month. Total cost is significantly lower than UK or Australia." },
      { question: "Can I study in Spain in English?", answer: "Yes, many Spanish universities and business schools offer programs in English, especially at the Master's level. IE Business School and ESADE offer world-class MBA programs in English. Some public universities also have English-taught Master's programs." },
      { question: "What is the post-study work visa in Spain?", answer: "Spain offers a 1-year post-study job search permit for graduates. During this period, you can work while looking for a job matching your qualification. Once employed, you can apply for a work permit." },
      { question: "What are the best business schools in Spain?", answer: "Spain has world-renowned business schools: IE Business School (top 10 global MBA), ESADE (top 15 European), and IESE Business School (University of Navarra). These offer excellent ROI and global career opportunities." },
      { question: "Can I work while studying in Spain?", answer: "Yes, students can work up to 20 hours/week with a part-time work permit. Many students find work in tourism, hospitality, and language teaching. Full-time work is allowed during holidays." },
      { question: "Why learn Spanish while studying?", answer: "Spanish is the world's 2nd most spoken native language (after Mandarin) with 500+ million speakers globally. Learning Spanish opens career doors in Spain, Latin America, and international organizations. Many employers value bilingual professionals." },
      { question: "How do I get an education loan for Spain?", answer: "Start as soon as you have an offer letter, not after you book a visa appointment. We work out the total cost of the course and living in Spain, what your family can fund, and the real gap left to borrow — then compare secured, unsecured and collateral-free routes against your profile and help you assemble the file. We are not a lender and take no commission from any of them: the amount, the interest rate, the collateral requirement and the approval are all the lender's decision. The loan is normally released in multiple disbursements, timed to your fee deadlines." },
      { question: "What is the cost of living in Spain?", answer: "Living costs range from ₹40,000 to ₹80,000/month. Madrid and Barcelona are more expensive. Cities like Valencia, Seville, and Granada are very affordable. Students typically spend €600-1,000/month on rent, food, and transport." }
    ],
    metaTitle: "Study in Spain | Affordable Universities & IE Business",
    metaDescription: "Study in Spain from India with DreamDestination. Affordable tuition from €680/year. Get admission to IE Business School, University of Barcelona & top Spanish universities. Education loans, visa assistance & scholarship guidance."
  },

  // ============================================================
  // 14. Malaysia
  // ============================================================
  {
    slug: "malaysia",
    name: "Malaysia",
    flag: "🇲🇾",
    heroTagline: "Affordable Quality Education in Southeast Asia",
    description: "Malaysia offers internationally recognized degrees at a fraction of the cost, with a multicultural environment and proximity to India.",
    longDescription: "Malaysia has become a popular study destination for Indian students, offering internationally recognized degrees from both local and international branch campus universities at very affordable costs. Home to branch campuses of Monash, Nottingham, and Heriot-Watt universities, Malaysia provides quality education with tuition fees and living costs significantly lower than Western countries. The multicultural society, English-medium instruction, and delicious food make it a comfortable home away from home.",
    universities: "50+",
    avgCost: "₹5-15L/year",
    livingCost: "₹25,000-50,000/month",
    workPermit: "Employment Pass Post-Graduation",
    scholarships: "Malaysian Government Scholarships, University Scholarships",
    visaSuccessRate: "Student Pass (EMGS)",
    intakeMonths: "March, July, September",
    currency: "MYR (RM)",
    language: "English & Malay",
    gradient: "bg-gradient-success",
    colleges: [
      { name: "University of Malaya", location: "Kuala Lumpur", ranking: "QS #60", programs: ["Engineering", "Medicine", "Business", "Law", "Sciences"], website: "https://www.um.edu.my" },
      { name: "Universiti Putra Malaysia (UPM)", location: "Serdang, Selangor", ranking: "QS #123", programs: ["Agriculture", "Engineering", "Medicine", "Business", "Veterinary"], website: "https://www.upm.edu.my" },
      { name: "Monash University Malaysia", location: "Subang Jaya, Selangor", ranking: "QS #37 (parent)", programs: ["Engineering", "Business", "IT", "Medicine", "Pharmacy"], website: "https://www.monash.edu.my" },
      { name: "University of Nottingham Malaysia", location: "Semenyih, Selangor", ranking: "QS #100 (parent)", programs: ["Engineering", "Business", "Computer Science", "Pharmacy", "Arts"], website: "https://www.nottingham.edu.my" },
      { name: "Universiti Kebangsaan Malaysia (UKM)", location: "Bangi, Selangor", ranking: "QS #138", programs: ["Engineering", "Medicine", "Business", "Sciences", "Social Sciences"], website: "https://www.ukm.my" },
      { name: "Universiti Sains Malaysia (USM)", location: "Penang", ranking: "QS #137", programs: ["Sciences", "Engineering", "Medicine", "Pharmacy", "Arts"], website: "https://www.usm.my" },
      { name: "Taylor's University", location: "Subang Jaya, Selangor", ranking: "QS #284", programs: ["Hospitality", "Business", "Engineering", "IT", "Design"], website: "https://www.taylors.edu.my" },
      { name: "UCSI University", location: "Kuala Lumpur", ranking: "QS #300", programs: ["Music", "Engineering", "Business", "Medicine", "Architecture"], website: "https://www.ucsi.edu.my" }
    ],
    collegeCount: 50,
    programs: ["Engineering", "Business", "Medicine", "IT & Computing", "Hospitality", "Design"],
    keywords: [
      "study in malaysia", "study in malaysia from india", "malaysia education consultancy",
      "education loan for malaysia", "malaysia student visa", "malaysia study visa",
      "best universities in malaysia", "top colleges in malaysia",
      "mba in malaysia", "ms in malaysia", "engineering in malaysia", "mbbs in malaysia",
      "malaysia scholarship for indian students", "cost of studying in malaysia",
      "malaysia tuition fees", "work in malaysia after study",
      "university of malaya admission", "monash malaysia fees",
      "ielts for malaysia", "study abroad consultant malaysia",
      "malaysia education loan", "malaysia vs singapore for studies"
    ],
    services: [
      { title: "Malaysia University Admission", description: "Expert guidance for Malaysian public and private university applications.", features: ["University Selection", "Application Support", "SOP Writing", "Scholarship Applications"] },
      { title: "Malaysia Education Loan", description: "Affordable education loans for Malaysian universities.", features: ["Secured and unsecured routes", "Low EMIs", "Quick Processing", "No Collateral Options"] },
      { title: "Malaysia Student Visa", description: "Comprehensive student visa/pass assistance.", features: ["EMGS Application", "Documentation", "Medical Checkup", "Visa Processing"] },
      { title: "Malaysia Settlement Support", description: "Pre-departure and post-arrival support.", features: ["Accommodation", "Airport Pickup", "SIM & Banking", "City Orientation"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 10 years",
      processingTime: "Depends on your file",
      highlights: ["Very affordable total cost", "Small loan amounts", "Easy repayment", "Quick disbursement", "Covers tuition + living"]
    },
    eligibility: ["Confirmed admission from a Malaysian institution", "Minimum 55% in previous qualification", "Valid passport", "IELTS/TOEFL (if required)", "Medical fitness", "Financial proof"],
    englishTests: ["IELTS Academic (5.5-6.0)", "TOEFL iBT (60-80)", "MUET (Malaysian English Test)", "PTE Academic (42-50)"],
    documentsRequired: ["Valid Passport", "University Offer Letter", "Academic Transcripts", "IELTS/TOEFL Scores", "Medical Report", "Financial Proof", "Passport Photos", "SOP"],
    faqs: [
      { question: "Why study in Malaysia?", answer: "Malaysia offers internationally recognized degrees at 50-70% lower cost than Western countries. It has branch campuses of world-class universities (Monash, Nottingham), English-medium instruction, a multicultural society, and proximity to India. It's one of the best value-for-money destinations." },
      { question: "Is Malaysia affordable for Indian students?", answer: "Very affordable! Tuition ranges from ₹5-15 Lakhs/year. Living costs are ₹25,000-50,000/month — one of the lowest among popular study destinations. Total cost for a 2-year program ranges from ₹12 Lakhs to ₹35 Lakhs." },
      { question: "Are Malaysian degrees recognized globally?", answer: "Yes! Malaysian public universities like University of Malaya are globally ranked. Branch campuses (Monash Malaysia, Nottingham Malaysia) offer the same degree as the parent university. MQA accreditation ensures quality standards." },
      { question: "Can I work while studying in Malaysia?", answer: "Yes, students can work up to 20 hours/week during semester breaks with approval from the immigration department. Part-time work in sectors like hospitality, retail, and tutoring is common." },
      { question: "What are the best universities in Malaysia?", answer: "Top universities include University of Malaya (QS #60), UPM, UKM, USM, and Monash University Malaysia. Taylor's University and UCSI University are top private options. Branch campuses of Monash and Nottingham offer parent-campus degrees." },
      { question: "How close is Malaysia to India?", answer: "Malaysia is just 4-5 hours by flight from major Indian cities. Direct flights from Delhi, Mumbai, Chennai, Bangalore, and Hyderabad to Kuala Lumpur are readily available and affordable. This proximity makes it easy to visit home." },
      { question: "How do I get an education loan for Malaysia?", answer: "Start as soon as you have an offer letter, not after you book a visa appointment. We work out the total cost of the course and living in Malaysia, what your family can fund, and the real gap left to borrow — then compare secured, unsecured and collateral-free routes against your profile and help you assemble the file. We are not a lender and take no commission from any of them: the amount, the interest rate, the collateral requirement and the approval are all the lender's decision. The loan is normally released in multiple disbursements, timed to your fee deadlines." },
      { question: "Is English widely spoken in Malaysia?", answer: "Yes! English is widely spoken and is the medium of instruction at most universities. Malaysia's multicultural society (Malay, Chinese, Indian) uses English as a common language. Indian students find it very easy to communicate." }
    ],
    metaTitle: "Study in Malaysia | Affordable Universities & Monash",
    metaDescription: "Study in Malaysia from India with DreamDestination. Affordable tuition from ₹5L/year. Get admission to University of Malaya, Monash Malaysia & top universities. Education loans, visa assistance & accommodation support."
  },

  // ============================================================
  // 15. Mauritius
  // ============================================================
  {
    slug: "mauritius",
    name: "Mauritius",
    flag: "🇲🇺",
    heroTagline: "Emerging Education Hub in the Indian Ocean",
    description: "Mauritius offers affordable education in a beautiful island setting with growing international university programs.",
    longDescription: "Mauritius is an emerging education destination, offering affordable programs in a safe, English-speaking island nation. The Mauritian government is actively developing its education hub with international branch campuses and quality-focused institutions. With its proximity to Africa and Asia, multicultural society (with a significant Indian diaspora), and beautiful tropical setting, Mauritius offers a unique study experience. Programs are affordable, and the welcoming environment makes it ideal for students seeking quality education in a comfortable setting.",
    universities: "15+",
    avgCost: "₹3-10L/year",
    livingCost: "₹20,000-40,000/month",
    workPermit: "Work Permit Available Post-Graduation",
    scholarships: "Mauritian Government Scholarships, University Awards",
    visaSuccessRate: "Student Visa",
    intakeMonths: "August, January",
    currency: "MUR (₨)",
    language: "English & French",
    gradient: "bg-gradient-warm",
    colleges: [
      { name: "University of Mauritius", location: "Réduit, Moka", ranking: "Top in Mauritius", programs: ["Engineering", "Sciences", "Business", "Agriculture", "Law"], website: "https://www.uom.ac.mu" },
      { name: "Curtin Mauritius", location: "Moka", ranking: "QS #174 (parent)", programs: ["Business", "Engineering", "IT", "Sciences"], website: "https://www.curtinmauritius.ac.mu" },
      { name: "Middlesex University Mauritius", location: "Moka", ranking: "UK University Branch", programs: ["Business", "IT", "Law", "Media", "Psychology"], website: "https://www.middlesex.mu" },
      { name: "University of Technology, Mauritius", location: "La Tour Koenig", ranking: "Public University", programs: ["Engineering", "IT", "Business", "Health Sciences", "Sustainable Development"], website: "https://www.utm.ac.mu" },
      { name: "Aberystwyth University Mauritius", location: "Moka", ranking: "UK University Branch", programs: ["Computer Science", "Business", "Accounting", "Law"], website: "https://www.aber.ac.mu" },
      { name: "ENSA (Ecole de Design)", location: "Moka", ranking: "Design School", programs: ["Architecture", "Interior Design", "Fashion", "Visual Arts"], website: "https://www.ensa.ac.mu" }
    ],
    collegeCount: 15,
    programs: ["Business", "IT & Computing", "Engineering", "Hospitality", "Agriculture", "Design"],
    keywords: [
      "study in mauritius", "study in mauritius from india", "mauritius education consultancy",
      "education loan for mauritius", "mauritius student visa", "mauritius study visa",
      "universities in mauritius", "top colleges in mauritius",
      "mba in mauritius", "engineering in mauritius", "study abroad in mauritius",
      "mauritius scholarship for indian students", "cost of studying in mauritius",
      "mauritius tuition fees", "work in mauritius after study",
      "university of mauritius admission", "curtin mauritius fees",
      "study abroad consultant mauritius", "mauritius education loan",
      "mauritius vs malaysia for studies", "affordable study abroad",
      "middlesex university mauritius"
    ],
    services: [
      { title: "Mauritius University Admission", description: "Guidance for applying to Mauritius universities and branch campuses.", features: ["University Selection", "Application Support", "SOP Writing", "Scholarship Search"] },
      { title: "Mauritius Education Loan", description: "Small, manageable education loans for Mauritius studies.", features: ["Secured and unsecured routes", "Low EMIs", "Quick Processing", "No Collateral"] },
      { title: "Mauritius Student Visa", description: "Hassle-free student visa processing for Mauritius.", features: ["Documentation Prep", "Application Filing", "Medical Tests", "Quick Processing"] },
      { title: "Settlement Support", description: "Arrival and settlement assistance in Mauritius.", features: ["Accommodation", "Airport Pickup", "Orientation", "Local SIM & Banking"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 7 years",
      processingTime: "Depends on your file",
      highlights: ["Very low total cost", "Minimal loan required", "Easy repayment", "Quick processing", "Covers complete expenses"]
    },
    eligibility: ["Confirmed admission from a Mauritian institution", "Minimum 50-55% in previous qualification", "Valid passport", "English proficiency", "Medical fitness", "Financial proof"],
    englishTests: ["IELTS Academic (5.5-6.0)", "TOEFL iBT (60-70)", "PTE Academic (42-50)"],
    documentsRequired: ["Valid Passport", "University Offer Letter", "Academic Transcripts", "English Proficiency Proof", "Medical Certificate", "Financial Proof", "Passport Photos", "Police Clearance"],
    faqs: [
      { question: "Why study in Mauritius?", answer: "Mauritius offers very affordable education, a safe English-speaking environment, beautiful tropical setting, branch campuses of international universities, and a significant Indian diaspora. It's an excellent budget-friendly study destination." },
      { question: "Is Mauritius affordable for Indian students?", answer: "Very affordable! Tuition ranges from ₹3-10 Lakhs/year. Living costs are just ₹20,000-40,000/month. Total cost for a 3-year bachelor's program can be as low as ₹12-35 Lakhs including everything." },
      { question: "Are Mauritius degrees recognized?", answer: "Yes! Degrees from the University of Mauritius and branch campuses (Curtin, Middlesex, Aberystwyth) are internationally recognized. Branch campus degrees are identical to the parent university's degree." },
      { question: "Is Mauritius safe for students?", answer: "Yes, Mauritius is one of the safest countries in Africa and ranks highly on global peace indices. It has a stable democracy, low crime rate, and a welcoming multicultural society with a large Indian-origin population." },
      { question: "Can I work while studying in Mauritius?", answer: "Students can work part-time up to 20 hours/week with proper authorization. Opportunities exist in tourism, hospitality, and retail sectors." },
      { question: "What is the Indian community like in Mauritius?", answer: "Mauritius has a large Indian-origin population (about 68%). Hindu temples, Indian food, and cultural festivals are common. Hindi and Bhojpuri are widely understood. Indian students feel right at home." },
      { question: "How do I get an education loan for Mauritius?", answer: "Start as soon as you have an offer letter, not after you book a visa appointment. We work out the total cost of the course and living in Mauritius, what your family can fund, and the real gap left to borrow — then compare secured, unsecured and collateral-free routes against your profile and help you assemble the file. We are not a lender and take no commission from any of them: the amount, the interest rate, the collateral requirement and the approval are all the lender's decision. The loan is normally released in multiple disbursements, timed to your fee deadlines." },
      { question: "How far is Mauritius from India?", answer: "Mauritius is about 6-7 hours by flight from major Indian cities. Direct flights are available from Delhi and Mumbai. The island is in the Indian Ocean, east of Madagascar." }
    ],
    metaTitle: "Study in Mauritius | Affordable Universities & Costs",
    metaDescription: "Study in Mauritius from India with DreamDestination. Affordable tuition from ₹3L/year. Get admission to University of Mauritius, Curtin Mauritius & international branch campuses. Education loans & visa assistance."
  },

  // ============================================================
  // 16. Netherlands
  // ============================================================
  {
    slug: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    heroTagline: "Innovation-Driven Education in Europe's Most International Country",
    description: "The Netherlands offers the highest number of English-taught programs in non-English Europe, with world-class research universities.",
    longDescription: "The Netherlands (Holland) is one of Europe's most popular study destinations, offering over 2,100 English-taught programs — the highest in non-English speaking Europe. Dutch universities like TU Delft, University of Amsterdam, and Erasmus University Rotterdam are globally renowned. The Netherlands' innovation-driven economy, progressive society, and central European location make it ideal for career-minded students. The Orientation Year visa (zoekjaar) gives graduates 1 year to find employment.",
    universities: "60+",
    avgCost: "₹8-25L/year",
    livingCost: "₹60,000-1,10,000/month",
    workPermit: "1-Year Orientation Year Visa (Zoekjaar)",
    scholarships: "NL Scholarship, Orange Tulip Scholarship, University Scholarships",
    visaSuccessRate: "MVV + Study Permit",
    intakeMonths: "September, February",
    currency: "EUR (€)",
    language: "Dutch & English (95% English proficiency)",
    gradient: "bg-gradient-hero",
    colleges: [
      { name: "Delft University of Technology (TU Delft)", location: "Delft", ranking: "QS #47", programs: ["Engineering", "Architecture", "Computer Science", "Aerospace", "Civil Engineering"], website: "https://www.tudelft.nl" },
      { name: "University of Amsterdam", location: "Amsterdam", ranking: "QS #53", programs: ["Business", "Social Sciences", "AI", "Law", "Humanities"], website: "https://www.uva.nl" },
      { name: "Eindhoven University of Technology", location: "Eindhoven", ranking: "QS #115", programs: ["Engineering", "Computer Science", "Applied Physics", "Design", "Innovation"], website: "https://www.tue.nl" },
      { name: "Erasmus University Rotterdam", location: "Rotterdam", ranking: "QS #176", programs: ["Business (RSM)", "Economics", "Medicine", "Social Sciences", "Law"], website: "https://www.eur.nl" },
      { name: "University of Groningen", location: "Groningen", ranking: "QS #120", programs: ["Sciences", "Engineering", "Business", "Law", "Arts"], website: "https://www.rug.nl" },
      { name: "Leiden University", location: "Leiden", ranking: "QS #122", programs: ["Law", "Sciences", "Medicine", "Humanities", "Social Sciences"], website: "https://www.universiteitleiden.nl" },
      { name: "Utrecht University", location: "Utrecht", ranking: "QS #107", programs: ["Sciences", "Medicine", "Law", "Humanities", "Veterinary"], website: "https://www.uu.nl" },
      { name: "Wageningen University", location: "Wageningen", ranking: "QS #151", programs: ["Agriculture", "Food Science", "Environmental Science", "Biology", "Nutrition"], website: "https://www.wur.nl" }
    ],
    collegeCount: 60,
    programs: ["Engineering", "Business & Economics", "Computer Science & AI", "Agriculture & Food Science", "Social Sciences", "Law"],
    keywords: [
      "study in netherlands", "study in holland", "netherlands education consultancy",
      "education loan for netherlands", "netherlands student visa", "dutch study visa",
      "best universities in netherlands", "top colleges in holland",
      "mba in netherlands", "ms in netherlands", "engineering in netherlands",
      "holland scholarship", "orange tulip scholarship", "netherlands scholarship for indian students",
      "cost of studying in netherlands", "netherlands tuition fees",
      "zoekjaar visa", "work after study in netherlands",
      "tu delft admission", "university of amsterdam fees",
      "ielts for netherlands", "study abroad consultant netherlands",
      "netherlands education loan", "netherlands vs germany for studies"
    ],
    services: [
      { title: "Netherlands University Admission", description: "Expert guidance for Dutch research and applied science university applications.", features: ["Studielink Application", "University Selection", "Motivation Letter", "Credential Evaluation (Nuffic)"] },
      { title: "Netherlands Education Loan", description: "Education loans for studying in the Netherlands.", features: ["Secured and unsecured routes", "Competitive Rates", "No Collateral Options", "Quick Processing"] },
      { title: "Netherlands Student Visa (MVV)", description: "Complete MVV/residence permit assistance for Dutch student visa.", features: ["MVV Application", "Documentation Prep", "Financial Proof", "Health Insurance"] },
      { title: "Orientation Year Guidance", description: "Support for the zoekjaar (orientation year) visa application after graduation.", features: ["Application Support", "Job Search Strategy", "CV & LinkedIn", "Networking Guidance"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 12 years",
      processingTime: "Depends on your file",
      highlights: ["Moderate tuition fees", "Covers tuition + living", "Tax benefits under 80E", "Moratorium available", "Zoekjaar visa enhances ROI"]
    },
    eligibility: ["Confirmed admission from a Dutch institution", "Minimum 60% in previous qualification", "Valid passport", "IELTS 6.0-6.5", "Financial proof (€11,000+/year)", "Health insurance"],
    englishTests: ["IELTS Academic (6.0-6.5)", "TOEFL iBT (80-100)", "PTE Academic (54-65)", "Cambridge English (169-185)"],
    documentsRequired: ["Valid Passport", "University Admission Letter", "Academic Transcripts", "IELTS/TOEFL Scores", "Financial Proof", "Motivation Letter", "CV/Resume", "Health Insurance", "Passport Photos", "Nuffic Credential Evaluation"],
    faqs: [
      { question: "Why study in the Netherlands?", answer: "The Netherlands offers 2,100+ English-taught programs, world-class universities (TU Delft, UvA), an innovation-driven economy, a central European location, and the zoekjaar orientation year visa. 95% of Dutch people speak English, making daily life easy." },
      { question: "Are Dutch degrees taught in English?", answer: "Yes! The Netherlands has the highest number of English-taught programs in non-English speaking Europe. Over 2,100 programs at Bachelor's and Master's levels are fully in English. Knowledge of Dutch is not required for most academic programs." },
      { question: "What is the Orientation Year (Zoekjaar) visa?", answer: "The zoekjaar gives graduates 1 year to find employment in the Netherlands. During this period, you don't need a work permit. Once you find a job, you can transition to a regular work permit. This makes the Netherlands very attractive for career-seeking graduates." },
      { question: "What is the cost of studying in the Netherlands?", answer: "Tuition fees for non-EU students range from €8,000 to €25,000/year (₹8-25 Lakhs). Living costs are approximately ₹60,000-1,10,000/month. Total cost for a 1-2 year Master's ranges from ₹20 Lakhs to ₹50 Lakhs." },
      { question: "Can I work while studying in the Netherlands?", answer: "Yes! Students can work up to 16 hours/week with a work permit (TWV), or full-time during June, July, and August. Students doing a mandatory internship don't need a work permit." },
      { question: "What are the best universities in the Netherlands?", answer: "Top universities include TU Delft (#47), University of Amsterdam (#53), Utrecht University, Eindhoven University of Technology, Erasmus University Rotterdam (top business school - RSM), University of Groningen, and Leiden University." },
      { question: "What is the NL Scholarship?", answer: "The NL Scholarship offers €5,000 for the first year to non-EU students. The Orange Tulip Scholarship is specifically for Indian students. Many universities also offer their own merit-based scholarships. DreamDestination helps identify and apply for all available options." },
      { question: "How do I get an education loan for the Netherlands?", answer: "Start as soon as you have an offer letter, not after you book a visa appointment. We work out the total cost of the course and living in the Netherlands, what your family can fund, and the real gap left to borrow — then compare secured, unsecured and collateral-free routes against your profile and help you assemble the file. We are not a lender and take no commission from any of them: the amount, the interest rate, the collateral requirement and the approval are all the lender's decision. The loan is normally released in multiple disbursements, timed to your fee deadlines." }
    ],
    metaTitle: "Study in Netherlands | TU Delft & NL Scholarship",
    metaDescription: "Study in the Netherlands from India with DreamDestination. 2100+ English-taught programs. Get admission to TU Delft, University of Amsterdam & top Dutch universities. Education loans, zoekjaar visa & scholarship guidance."
  },

  // ============================================================
  // 17. Italy
  // ============================================================
  {
    slug: "italy",
    name: "Italy",
    flag: "🇮🇹",
    heroTagline: "Historic Excellence in Arts, Design, Engineering & Medicine",
    description: "Italy offers world-class education in design, fashion, engineering, and architecture with very affordable public university fees.",
    longDescription: "Italy is the birthplace of the university system, with institutions dating back to 1088 (University of Bologna). Known globally for fashion, design, architecture, engineering, and arts, Italian universities offer exceptional programs at very affordable tuition (many public universities charge €200-4,000/year). The Politecnico di Milano is one of the world's best engineering schools, while Istituto Marangoni and Polimoda lead in fashion education. Italy offers a unique blend of academic excellence and cultural richness.",
    universities: "90+",
    avgCost: "₹2-15L/year",
    livingCost: "₹40,000-80,000/month",
    workPermit: "1-Year Post-Study Residence Permit",
    scholarships: "Italian Government Scholarships, DSU Regional Scholarships, University Fee Waivers",
    visaSuccessRate: "National Visa (D) Study",
    intakeMonths: "September, February",
    currency: "EUR (€)",
    language: "Italian & English",
    gradient: "bg-gradient-success",
    colleges: [
      { name: "Politecnico di Milano", location: "Milan", ranking: "QS #111", programs: ["Engineering", "Architecture", "Design", "Urban Planning", "Management"], website: "https://www.polimi.it" },
      { name: "University of Bologna", location: "Bologna", ranking: "QS #133", programs: ["Law", "Sciences", "Medicine", "Engineering", "Arts"], website: "https://www.unibo.it" },
      { name: "Sapienza University of Rome", location: "Rome", ranking: "QS #132", programs: ["Medicine", "Engineering", "Sciences", "Architecture", "Law"], website: "https://www.uniroma1.it" },
      { name: "Politecnico di Torino", location: "Turin", ranking: "QS #241", programs: ["Engineering", "Architecture", "Design", "Automotive", "Aerospace"], website: "https://www.polito.it" },
      { name: "University of Milan", location: "Milan", ranking: "QS #276", programs: ["Medicine", "Sciences", "Law", "Humanities", "Agriculture"], website: "https://www.unimi.it" },
      { name: "University of Padua", location: "Padua", ranking: "QS #219", programs: ["Medicine", "Engineering", "Sciences", "Psychology", "Agriculture"], website: "https://www.unipd.it" },
      { name: "Bocconi University", location: "Milan", ranking: "Top 10 European Business", programs: ["Economics", "Business", "Finance", "Management", "Law"], website: "https://www.unibocconi.eu" },
      { name: "Istituto Marangoni", location: "Milan", ranking: "#1 Fashion School", programs: ["Fashion Design", "Fashion Business", "Luxury Brand Management", "Interior Design"], website: "https://www.istitutomarangoni.com" },
      { name: "University of Pisa", location: "Pisa", ranking: "QS #382", programs: ["Engineering", "Sciences", "Medicine", "Computer Science", "Humanities"], website: "https://www.unipi.it" },
      { name: "University of Florence", location: "Florence", ranking: "QS #296", programs: ["Architecture", "Arts", "Sciences", "Medicine", "Engineering"], website: "https://www.unifi.it" }
    ],
    collegeCount: 90,
    programs: ["Fashion & Design", "Engineering", "Architecture", "Medicine", "Business & Finance", "Arts & Humanities"],
    keywords: [
      "study in italy", "study in italy from india", "italy education consultancy",
      "education loan for italy", "italy student visa", "italy study visa",
      "best universities in italy", "top colleges in italy",
      "mba in italy", "ms in italy", "engineering in italy", "fashion design in italy",
      "italy scholarship for indian students", "cost of studying in italy",
      "italy tuition fees", "work permit after study in italy",
      "politecnico di milano admission", "bocconi university fees",
      "study fashion in italy", "architecture in italy",
      "study in italy in english", "study abroad consultant italy",
      "italy education loan", "istituto marangoni admission"
    ],
    services: [
      { title: "Italy University Admission", description: "Expert guidance for Italian university applications including Universitaly portal.", features: ["Universitaly Registration", "University Selection", "Application Support", "Credential Evaluation"] },
      { title: "Italy Education Loan", description: "Affordable education loans for Italian universities.", features: ["Secured and unsecured routes", "Low EMIs", "No Collateral Options", "Quick Processing"] },
      { title: "Italy Student Visa", description: "Comprehensive visa support for Italian student visa.", features: ["Documentation Prep", "Financial Proof", "Application Filing", "Accommodation Proof"] },
      { title: "Italian Language Support", description: "Language preparation and guidance for studying in Italy.", features: ["Italian A2/B1 Prep", "English-taught Programs", "Language Certificates", "Cultural Orientation"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 10 years",
      processingTime: "Depends on your file",
      highlights: ["Extremely affordable tuition", "Low total cost", "Minimal loan required", "Easy repayment", "Tax benefits under 80E"]
    },
    eligibility: ["Confirmed admission from an Italian institution", "Minimum 55-60% in previous qualification", "Valid passport", "Italian/English proficiency", "Financial proof (€6,000+/year)", "Health insurance", "Accommodation proof"],
    englishTests: ["IELTS Academic (5.5-6.5)", "TOEFL iBT (70-90)", "CILS/CELI (for Italian-taught programs)", "GMAT/GRE (for business schools)"],
    documentsRequired: ["Valid Passport", "University Pre-enrollment", "Academic Transcripts", "Language Scores", "Declaration of Value", "Financial Proof", "Accommodation Proof", "Health Insurance", "SOP", "Passport Photos"],
    faqs: [
      { question: "Is Italy affordable for studying?", answer: "Very affordable! Many public universities charge only €200-4,000/year for tuition. Regional scholarships (DSU) can cover tuition, accommodation, and meals for eligible students. Living costs are ₹40,000-80,000/month, among the lowest in Western Europe." },
      { question: "Can I study in Italy in English?", answer: "Yes! Many Italian universities offer English-taught programs, especially at the Master's level. Politecnico di Milano, Bocconi University, and University of Bologna have extensive English programs. Engineering, business, and design courses commonly offer English instruction." },
      { question: "What is Italy known for in education?", answer: "Italy excels in: 1) Fashion & Design (Marangoni, Polimoda), 2) Engineering (Politecnico di Milano, Politecnico di Torino), 3) Architecture, 4) Arts & Humanities, 5) Business (Bocconi, Luiss), and 6) Medicine. It's the birthplace of the modern university system." },
      { question: "What is the post-study work visa in Italy?", answer: "Graduates can apply for a 1-year residence permit (permesso di soggiorno) to seek employment. During this period, you can work while searching for a job matching your qualification. Once employed, you can switch to a work permit." },
      { question: "Can I work while studying in Italy?", answer: "Yes, students can work up to 20 hours/week during the academic year and full-time during holidays. Work permits are relatively easy to obtain for students. Part-time jobs in tourism, hospitality, and teaching English are common." },
      { question: "What are the best universities in Italy?", answer: "Top institutions include Politecnico di Milano (#111 QS), University of Bologna (#133), Sapienza Rome (#132), Bocconi University (top business), Politecnico di Torino, and Istituto Marangoni (#1 fashion). Italy has a strong public university system." },
      { question: "How do I get an education loan for Italy?", answer: "Start as soon as you have an offer letter, not after you book a visa appointment. We work out the total cost of the course and living in Italy, what your family can fund, and the real gap left to borrow — then compare secured, unsecured and collateral-free routes against your profile and help you assemble the file. We are not a lender and take no commission from any of them: the amount, the interest rate, the collateral requirement and the approval are all the lender's decision. The loan is normally released in multiple disbursements, timed to your fee deadlines." },
      { question: "What is the DSU scholarship in Italy?", answer: "DSU (Diritto allo Studio Universitario) is a regional scholarship for students with financial need. It can cover tuition fee waiver, free accommodation, free meals, and a monthly stipend. DreamDestination helps identify eligibility and apply." }
    ],
    metaTitle: "Study in Italy | Politecnico di Milano & Fashion Schools",
    metaDescription: "Study in Italy from India with DreamDestination. Affordable tuition from €200/year. Get admission to Politecnico di Milano, Bocconi, Marangoni & top Italian universities. Education loans, visa assistance & scholarship guidance."
  },

  // ============================================================
  // 18. Russia
  // ============================================================
  {
    slug: "russia",
    name: "Russia",
    flag: "🇷🇺",
    heroTagline: "Affordable World-Class Education in Engineering & Medicine",
    description: "Russia offers some of the most affordable quality education globally, with top programs in engineering, medicine, and sciences recognized worldwide.",
    longDescription: "Russia is one of the most affordable study destinations for Indian students, with tuition fees as low as ₹2-6 Lakhs per year. Home to world-renowned universities like Lomonosov Moscow State University, Saint Petersburg State University, and ITMO University, Russia offers excellent programs in engineering, medicine (MBBS recognized by NMC/WHO), computer science, and aerospace. Over 300,000 international students choose Russia annually. DreamDestination provides complete support from university admission and education loans to visa processing and pre-departure guidance for studying in Russia.",
    universities: "250+",
    avgCost: "₹2-8L/year",
    livingCost: "₹20,000-50,000/month",
    workPermit: "Work permit available during & after studies",
    scholarships: "Russian Government Scholarship, University Scholarships",
    visaSuccessRate: "Student Visa (MVD invite)",
    intakeMonths: "September, February",
    currency: "RUB (₽)",
    language: "Russian (English programs available)",
    gradient: "bg-gradient-hero",
    colleges: [
      { name: "Lomonosov Moscow State University (MSU)", location: "Moscow", ranking: "QS #87", programs: ["Physics", "Mathematics", "Medicine", "Law", "Engineering"], website: "https://www.msu.ru/en/" },
      { name: "Saint Petersburg State University (SPbSU)", location: "Saint Petersburg", ranking: "QS #264", programs: ["International Relations", "Law", "Medicine", "Sciences", "Economics"], website: "https://english.spbu.ru/" },
      { name: "ITMO University", location: "Saint Petersburg", ranking: "QS #365", programs: ["Computer Science", "IT", "Photonics", "Engineering", "Biotechnology"], website: "https://en.itmo.ru/" },
      { name: "Novosibirsk State University (NSU)", location: "Novosibirsk", ranking: "QS #352", programs: ["Physics", "Mathematics", "Natural Sciences", "IT", "Economics"], website: "https://english.nsu.ru/" },
      { name: "Peoples' Friendship University of Russia (RUDN)", location: "Moscow", ranking: "QS #295", programs: ["Medicine", "Engineering", "Law", "Economics", "Agriculture"], website: "https://eng.rudn.ru/" },
      { name: "Kazan Federal University", location: "Kazan", ranking: "QS #374", programs: ["Medicine", "Engineering", "IT", "Oil & Gas", "Law"], website: "https://eng.kpfu.ru/" },
      { name: "National Research Nuclear University MEPhI", location: "Moscow", ranking: "QS #319", programs: ["Nuclear Physics", "Engineering", "Cybersecurity", "IT", "Applied Mathematics"], website: "https://eng.mephi.ru/" },
      { name: "Tomsk State University", location: "Tomsk", ranking: "QS #392", programs: ["Physics", "Engineering", "IT", "Law", "Economics"], website: "https://en.tsu.ru/" },
      { name: "Sechenov First Moscow State Medical University", location: "Moscow", ranking: "Top Medical", programs: ["MBBS", "Dentistry", "Pharmacy", "Public Health", "Nursing"], website: "https://www.sechenov.ru/eng/" },
      { name: "Bauman Moscow State Technical University", location: "Moscow", ranking: "QS #401-450", programs: ["Mechanical Engineering", "Aerospace", "Robotics", "IT", "Nuclear Engineering"], website: "https://bmstu.ru/en/" }
    ],
    collegeCount: 250,
    programs: ["Medicine (MBBS)", "Engineering", "Computer Science", "Aerospace", "Nuclear Physics", "Business"],
    keywords: [
      "study in russia", "study in russia from india", "russia education consultancy",
      "education loan for russia", "russia student visa", "russia study visa from india",
      "best universities in russia", "top colleges in russia", "russia university admission",
      "mbbs in russia", "mbbs in russia for indian students", "engineering in russia",
      "russia scholarship for indian students", "russian government scholarship",
      "cost of studying in russia", "russia tuition fees for indian students",
      "work permit after study in russia", "moscow state university admission",
      "study medicine in russia", "nmc approved medical colleges in russia",
      "study abroad consultant russia", "russia education loan without collateral",
      "affordable education in russia", "ms in russia", "phd in russia"
    ],
    services: [
      { title: "Russia University Admission", description: "Complete guidance for applying to top Russian universities including medical schools recognized by NMC/WHO.", features: ["University Shortlisting", "Application Management", "Invitation Letter", "Admission Confirmation"] },
      { title: "Russia Education Loan", description: "Affordable education loans for Russian universities — low amounts needed due to very affordable tuition.", features: ["Secured and unsecured routes", "No Collateral Options", "Quick Approval", "Low EMI"] },
      { title: "Russia Student Visa Assistance", description: "Expert guidance for Russian student visa with invitation letter and documentation support.", features: ["Invitation Letter Help", "Document Preparation", "Visa Application", "Embassy Coordination"] },
      { title: "Pre-departure & Settlement", description: "Complete pre-departure briefing and settlement support for life in Russia.", features: ["Airport Pickup", "Hostel Arrangement", "City Orientation", "Russian Language Basics"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 10 years",
      processingTime: "Depends on your file",
      highlights: ["Very low tuition = small loan", "Minimal monthly EMI", "Covers tuition + hostel + living", "Tax benefits under 80E", "Quick processing"]
    },
    eligibility: ["Confirmed admission from a Russian university", "Minimum 50-60% in 12th/graduation", "Valid passport", "Medical fitness certificate", "HIV test certificate", "NEET qualification (for MBBS)"],
    englishTests: ["IELTS (5.5-6.0 for English programs)", "TOEFL (60-80)", "No English test needed for Russian-medium programs", "Preparatory year available for language training"],
    documentsRequired: ["Valid Passport", "Invitation Letter from University", "Academic Transcripts", "Medical Certificate", "HIV Test Report", "Passport Photos", "Travel Insurance", "Financial Proof", "Birth Certificate (translated)"],
    faqs: [
      { question: "Is Russia affordable for Indian students?", answer: "Russia is one of the most affordable study destinations. Tuition fees range from ₹2-8 Lakhs per year — a fraction of what Western countries charge. Living costs are ₹20,000-50,000/month. Total cost for a 6-year MBBS program can be as low as ₹20-30 Lakhs." },
      { question: "Is MBBS from Russia recognized in India?", answer: "Yes, many Russian medical universities are recognized by NMC (National Medical Commission) and WHO. Graduates must pass the FMGE/NEXT exam to practice in India. Universities like Sechenov, RUDN, Kazan Federal, and Moscow State are popular for MBBS." },
      { question: "Do I need to learn Russian?", answer: "Many universities offer English-medium programs, especially for MBBS and engineering. However, a preparatory year with Russian language training is recommended for better integration. For Russian-medium programs, a 1-year preparatory course is mandatory." },
      { question: "Is Russia safe for Indian students?", answer: "Major Russian cities like Moscow and Saint Petersburg are generally safe. Universities provide hostel accommodation with security. Indian student communities are well-established. DreamDestination provides pre-departure briefing on safety and cultural adaptation." },
      { question: "What is the weather like in Russia?", answer: "Russia has harsh winters (-20°C to -30°C) but cities are well-equipped with heated buildings and metro systems. Summers are pleasant (20-30°C). Students from India adapt well with proper winter clothing. Universities provide guidance on winter preparation." },
      { question: "Can I work while studying in Russia?", answer: "International students can work part-time (up to 20 hours/week) during academic sessions. Work permits for students are relatively easy to obtain. Many students work as translators, tutors, or in part-time roles during their studies." },
      { question: "How do I get a student visa for Russia?", answer: "Steps: 1) Get admission and invitation letter, 2) Gather documents including medical/HIV certificates, 3) Apply at Russian Embassy/Consulate, 4) Pay visa fees, 5) Receive visa. Processing takes 2-4 weeks. DreamDestination handles the entire process." },
      { question: "What are the entry requirements for Russian universities?", answer: "Requirements include: minimum 50-60% in 12th for undergraduate, graduation for Masters, NEET qualification for MBBS, valid passport, and medical certificates. English proficiency required for English-medium programs. No entrance exam for most programs." }
    ],
    metaTitle: "Study in Russia | MBBS, Engineering & Affordable Education",
    metaDescription: "Study in Russia from India with DreamDestination. Affordable tuition from ₹2L/year. MBBS in NMC-approved universities, engineering at top institutions. Education loans, visa assistance & complete guidance."
  },

  // ============================================================
  // 19. Ukraine
  // ============================================================
  {
    slug: "ukraine",
    name: "Ukraine",
    flag: "🇺🇦",
    heroTagline: "Affordable Medical & Engineering Education in Eastern Europe",
    description: "Ukraine is a top choice for affordable MBBS and engineering education, with NMC/WHO-recognized medical universities and a welcoming environment for international students.",
    longDescription: "Ukraine has been one of the most popular and affordable destinations for Indian students pursuing MBBS, engineering, and other professional courses. With over 20 NMC/WHO-recognized medical universities, Ukraine offers quality medical education at a fraction of Western costs. Universities like Bogomolets National Medical University, Kharkiv National Medical University, and Taras Shevchenko National University are well-known globally. Programs are available in English, and no entrance exams are required for most courses (NEET qualification needed for MBBS). DreamDestination provides comprehensive support for Ukrainian university admission.",
    universities: "100+",
    avgCost: "₹2-6L/year",
    livingCost: "₹15,000-35,000/month",
    workPermit: "Work opportunities available post-graduation",
    scholarships: "University Merit Scholarships, Government Programs",
    visaSuccessRate: "Type D Student Visa",
    intakeMonths: "September, February",
    currency: "UAH (₴)",
    language: "Ukrainian/Russian (English programs available)",
    gradient: "bg-gradient-warm",
    colleges: [
      { name: "Taras Shevchenko National University of Kyiv", location: "Kyiv", ranking: "QS #601-650", programs: ["Sciences", "Law", "Economics", "Engineering", "Medicine"], website: "https://www.univ.kiev.ua/en/" },
      { name: "Bogomolets National Medical University", location: "Kyiv", ranking: "Top Medical", programs: ["MBBS", "Dentistry", "Pharmacy", "Nursing", "Public Health"], website: "https://nmu.ua/en/" },
      { name: "Kharkiv National Medical University", location: "Kharkiv", ranking: "Top Medical", programs: ["MBBS", "Dentistry", "Pharmacy", "Pediatrics", "Public Health"], website: "https://knmu.edu.ua/en/" },
      { name: "V.N. Karazin Kharkiv National University", location: "Kharkiv", ranking: "QS #501-550", programs: ["Physics", "Mathematics", "Computer Science", "Economics", "Medicine"], website: "https://karazin.ua/en/" },
      { name: "Lviv National Medical University", location: "Lviv", ranking: "Top Medical", programs: ["MBBS", "Dentistry", "Pharmacy", "Medical Psychology", "Nursing"], website: "https://new.meduniv.lviv.ua/en/" },
      { name: "Odessa National Medical University", location: "Odessa", ranking: "Top Medical", programs: ["MBBS", "Dentistry", "Pharmacy", "Pediatrics", "Medical Sciences"], website: "https://onmedu.edu.ua/en/" },
      { name: "Igor Sikorsky Kyiv Polytechnic Institute", location: "Kyiv", ranking: "QS #701-750", programs: ["Engineering", "Computer Science", "Aerospace", "Electronics", "Chemical Engineering"], website: "https://kpi.ua/en" },
      { name: "Ternopil National Medical University", location: "Ternopil", ranking: "Top Medical", programs: ["MBBS", "Dentistry", "Pharmacy", "Nursing", "Biomedical Sciences"], website: "https://tdmu.edu.ua/en/" }
    ],
    collegeCount: 100,
    programs: ["Medicine (MBBS)", "Dentistry", "Engineering", "Computer Science", "Pharmacy", "Business"],
    keywords: [
      "study in ukraine", "study in ukraine from india", "ukraine education consultancy",
      "education loan for ukraine", "ukraine student visa", "ukraine study visa from india",
      "best universities in ukraine", "top medical colleges in ukraine",
      "mbbs in ukraine", "mbbs in ukraine for indian students", "engineering in ukraine",
      "ukraine scholarship for indian students", "cost of studying in ukraine",
      "ukraine tuition fees for indian students", "nmc approved colleges in ukraine",
      "bogomolets medical university", "kharkiv medical university admission",
      "study abroad consultant ukraine", "ukraine education loan without collateral",
      "affordable mbbs in ukraine", "dentistry in ukraine", "pharmacy in ukraine"
    ],
    services: [
      { title: "Ukraine University Admission", description: "Expert guidance for admission to NMC/WHO-recognized medical and engineering universities in Ukraine.", features: ["University Selection", "Application Filing", "Invitation Letter", "Admission Confirmation"] },
      { title: "Ukraine Education Loan", description: "Affordable education loans for Ukrainian universities with minimal amounts needed.", features: ["Secured and unsecured routes", "No Collateral Options", "Quick Processing", "Low EMI"] },
      { title: "Ukraine Student Visa", description: "Complete visa support with invitation letter and document preparation.", features: ["Invitation Letter", "Document Preparation", "Visa Application", "Embassy Guidance"] },
      { title: "MBBS Admission Support", description: "Specialized support for MBBS admission in NMC-approved Ukrainian medical universities.", features: ["NMC-Approved Colleges", "NEET Guidance", "FMGE Preparation Tips", "Clinical Training Info"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 10 years",
      processingTime: "Depends on your file",
      highlights: ["Very affordable tuition", "Small loan amount needed", "Covers tuition + hostel + living", "Easy repayment schedule", "Tax benefits under 80E"]
    },
    eligibility: ["Confirmed admission from a Ukrainian university", "Minimum 50% in 12th (PCB for MBBS)", "Valid passport", "NEET qualification (for MBBS)", "Medical fitness certificate", "No entrance exam for most programs"],
    englishTests: ["IELTS (5.5-6.0 for English programs)", "TOEFL (60-80)", "No English test for many universities", "English proficiency assessed during admission"],
    documentsRequired: ["Valid Passport", "Invitation Letter", "Academic Transcripts (Apostilled)", "Medical Certificate", "Birth Certificate (Translated)", "Passport Photos", "Travel Insurance", "Financial Proof", "NEET Scorecard (for MBBS)"],
    faqs: [
      { question: "Is MBBS from Ukraine recognized in India?", answer: "Yes, several Ukrainian medical universities are recognized by NMC (National Medical Commission) and WHO. Graduates must pass FMGE/NEXT exam to practice in India. Popular NMC-approved universities include Bogomolets, Kharkiv National Medical, Lviv National Medical, and Ternopil National Medical University." },
      { question: "What is the total cost of MBBS in Ukraine?", answer: "The total cost for a 6-year MBBS program in Ukraine ranges from ₹18-35 Lakhs including tuition, hostel, and living expenses. Tuition fees are ₹2-5 Lakhs per year. Hostel fees are ₹15,000-25,000/month. This makes Ukraine one of the most affordable MBBS destinations." },
      { question: "Do I need NEET to study MBBS in Ukraine?", answer: "Yes, Indian students must qualify NEET to pursue MBBS abroad including in Ukraine (as per NMC regulations). However, there is no specific cutoff — you only need to be NEET qualified. No university entrance exam is required in addition to NEET." },
      { question: "Is it safe to study in Ukraine currently?", answer: "Safety conditions vary by region. Western Ukrainian cities like Lviv and Ternopil are generally safer. DreamDestination provides updated safety guidance and helps students choose universities in stable regions. We recommend thorough research and staying updated on the current situation." },
      { question: "What language are courses taught in?", answer: "Most programs for international students are taught in English. Medical courses (MBBS, Dentistry) are commonly available in English medium. Some universities also offer a preparatory year for language training. Ukrainian/Russian language basics are helpful for daily life." },
      { question: "Can I work while studying in Ukraine?", answer: "Students can work part-time during their studies. Work opportunities include tutoring, translation, and hospitality. However, medical students typically have intensive schedules with limited free time for work. Post-graduation employment is available through work permits." },
      { question: "How do I get a student visa for Ukraine?", answer: "Steps: 1) Get admission and invitation letter from the university, 2) Gather required documents, 3) Apply at the Ukrainian Embassy, 4) Pay visa fees, 5) Attend interview if required. Processing takes 2-4 weeks. DreamDestination handles the entire process." },
      { question: "What is the quality of medical education in Ukraine?", answer: "Ukrainian medical education follows European standards with strong clinical training. Many universities have modern facilities, simulation labs, and teaching hospitals. The MBBS degree is recognized by NMC, WHO, and other international bodies. Graduates successfully practice worldwide." }
    ],
    metaTitle: "Study in Ukraine | MBBS & Medical Universities",
    metaDescription: "Study in Ukraine from India with DreamDestination. Affordable MBBS from ₹2L/year at NMC-approved medical universities. Get admission to Bogomolets, Kharkiv National Medical & top Ukrainian universities. Education loans & visa assistance."
  },

  // ============================================================
  // 20. China
  // ============================================================
  {
    slug: "china",
    name: "China",
    flag: "🇨🇳",
    heroTagline: "Rising Global Education Powerhouse with Generous Scholarships",
    description: "China offers world-class education with generous government scholarships, top-ranked universities, and affordable living — making it an increasingly popular destination for international students.",
    longDescription: "China has rapidly emerged as a global education powerhouse, with over 500,000 international students and multiple universities in the global top 50. Institutions like Tsinghua University, Peking University, and Fudan University rival the best in the world. China offers generous CSC (Chinese Scholarship Council) scholarships covering full tuition, accommodation, and monthly stipends. For Indian students, MBBS programs in English are especially popular and NMC-recognized. With affordable living costs, a booming economy, and Mandarin being the world's most spoken language, studying in China opens unique career opportunities. DreamDestination provides end-to-end support.",
    universities: "300+",
    avgCost: "₹3-15L/year",
    livingCost: "₹20,000-50,000/month",
    workPermit: "Work permit available for graduates",
    scholarships: "CSC Scholarship (Full Ride), Provincial & University Scholarships",
    visaSuccessRate: "X1 / X2 Student Visa",
    intakeMonths: "September, February",
    currency: "CNY (¥)",
    language: "Mandarin (English programs available)",
    gradient: "bg-gradient-warm",
    colleges: [
      { name: "Tsinghua University", location: "Beijing", ranking: "QS #20", programs: ["Engineering", "Computer Science", "Business", "Architecture", "Sciences"], website: "https://www.tsinghua.edu.cn/en/" },
      { name: "Peking University", location: "Beijing", ranking: "QS #17", programs: ["Law", "Medicine", "Sciences", "Economics", "Humanities"], website: "https://english.pku.edu.cn/" },
      { name: "Fudan University", location: "Shanghai", ranking: "QS #39", programs: ["Medicine", "Business", "Economics", "Sciences", "International Relations"], website: "https://www.fudan.edu.cn/en/" },
      { name: "Zhejiang University", location: "Hangzhou", ranking: "QS #44", programs: ["Engineering", "Computer Science", "Agriculture", "Medicine", "Business"], website: "https://www.zju.edu.cn/english/" },
      { name: "Shanghai Jiao Tong University", location: "Shanghai", ranking: "QS #45", programs: ["Engineering", "Medicine", "Business", "Naval Architecture", "Sciences"], website: "https://en.sjtu.edu.cn/" },
      { name: "University of Science and Technology of China (USTC)", location: "Hefei", ranking: "QS #93", programs: ["Physics", "Chemistry", "Computer Science", "Engineering", "Mathematics"], website: "https://en.ustc.edu.cn/" },
      { name: "Wuhan University", location: "Wuhan", ranking: "QS #194", programs: ["Medicine", "Engineering", "Law", "Remote Sensing", "Sciences"], website: "https://en.whu.edu.cn/" },
      { name: "Nanjing Medical University", location: "Nanjing", ranking: "Top Medical", programs: ["MBBS", "Dentistry", "Pharmacy", "Public Health", "Nursing"], website: "https://english.njmu.edu.cn/" },
      { name: "Harbin Institute of Technology", location: "Harbin", ranking: "QS #256", programs: ["Aerospace", "Engineering", "Computer Science", "Robotics", "Materials Science"], website: "http://en.hit.edu.cn/" },
      { name: "Beijing Institute of Technology", location: "Beijing", ranking: "QS #328", programs: ["Engineering", "Aerospace", "IT", "Optoelectronics", "Vehicle Engineering"], website: "https://english.bit.edu.cn/" }
    ],
    collegeCount: 300,
    programs: ["Medicine (MBBS)", "Engineering", "Computer Science & AI", "Business", "Sciences", "Mandarin Language"],
    keywords: [
      "study in china", "study in china from india", "china education consultancy",
      "education loan for china", "china student visa", "china study visa from india",
      "best universities in china", "top colleges in china", "china university admission",
      "mbbs in china", "mbbs in china for indian students", "engineering in china",
      "csc scholarship", "china scholarship for indian students", "chinese government scholarship",
      "cost of studying in china", "china tuition fees for indian students",
      "tsinghua university admission", "peking university fees",
      "study abroad consultant china", "china education loan without collateral",
      "affordable education in china", "ms in china", "mba in china",
      "nmc approved medical colleges in china"
    ],
    services: [
      { title: "China University Admission", description: "Expert guidance for applying to top Chinese universities including CSC scholarship applications.", features: ["University Shortlisting", "CSC Scholarship Application", "Document Preparation", "Interview Coaching"] },
      { title: "China Education Loan", description: "Education loans for Chinese universities — affordable amounts due to low tuition and scholarship options.", features: ["Secured and unsecured routes", "No Collateral Options", "Quick Approval", "Flexible Repayment"] },
      { title: "China Student Visa (X1/X2)", description: "Complete X1/X2 student visa support with JW201/JW202 form guidance.", features: ["JW Form Guidance", "Document Preparation", "Visa Application", "Physical Exam Support"] },
      { title: "Mandarin Language Prep", description: "Pre-departure Mandarin basics and cultural orientation for smooth transition.", features: ["Basic Mandarin Course", "Cultural Orientation", "HSK Test Guidance", "Settlement Support"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 12 years",
      processingTime: "Depends on your file",
      highlights: ["Low tuition fees", "CSC scholarship can cover full cost", "Covers tuition + hostel + living", "Moratorium during studies", "Tax benefits under 80E"]
    },
    eligibility: ["Confirmed admission from a Chinese university", "Minimum 50-60% in previous qualification", "Valid passport (6+ months validity)", "JW201/JW202 form", "Physical examination (Foreigner Health Form)", "NEET qualification (for MBBS)", "HSK level (for Chinese-medium programs)"],
    englishTests: ["IELTS Academic (5.5-6.5)", "TOEFL iBT (60-90)", "No English test for many MBBS programs", "HSK Level 4-5 (for Chinese-medium programs)"],
    documentsRequired: ["Valid Passport", "University Admission Notice", "JW201/JW202 Form", "Foreigner Physical Examination Form", "Academic Transcripts (Notarized)", "Passport Photos", "No Criminal Record Certificate", "Financial Proof", "NEET Scorecard (for MBBS)", "Study Plan/SOP"],
    faqs: [
      { question: "Is China affordable for Indian students?", answer: "Very affordable! Tuition ranges from ₹3-15 Lakhs/year depending on the university and program. MBBS programs cost ₹3-8 Lakhs/year. Living costs are ₹20,000-50,000/month. CSC scholarships can cover everything including monthly stipend of ¥2,500-3,500. Total cost can be as low as FREE with full scholarship." },
      { question: "What is the CSC Scholarship?", answer: "The Chinese Scholarship Council (CSC) offers full scholarships covering tuition, accommodation, monthly stipend (¥2,500-3,500), and comprehensive medical insurance. Applications open December-April. DreamDestination helps identify eligible programs and prepare competitive applications for Indian students." },
      { question: "Is MBBS from China recognized in India?", answer: "Yes, many Chinese medical universities are NMC and WHO recognized. Graduates must pass FMGE/NEXT to practice in India. Popular choices include Nanjing Medical University, Wuhan University, Fudan University, and Zhejiang University. Programs are typically 5+1 year (including internship)." },
      { question: "Do I need to learn Mandarin?", answer: "For English-medium programs, Mandarin is not mandatory but helpful for daily life. For Chinese-medium programs, HSK Level 4-5 is required. Many universities offer a 1-year Mandarin preparatory program. Learning basic Mandarin enhances your experience and career prospects significantly." },
      { question: "How is the quality of education in China?", answer: "Exceptional! Tsinghua and Peking University rank in the global top 20. China invests heavily in research and innovation. Engineering, AI, and technology programs are particularly strong. Medical education follows international standards with modern facilities and teaching hospitals." },
      { question: "Can I work while studying in China?", answer: "Students can work part-time with permission from the university and local authorities. Internship opportunities are available, especially in tech companies in cities like Beijing, Shanghai, and Shenzhen. Post-graduation work permits are available for employment in China." },
      { question: "Is China safe for Indian students?", answer: "China is generally very safe with low crime rates. Major cities have excellent public infrastructure, healthcare, and transportation. Indian student communities exist in all major university cities. DreamDestination provides pre-departure briefing on safety, culture, and daily life." },
      { question: "What is the visa process for studying in China?", answer: "Steps: 1) Get admission notice and JW form, 2) Complete physical examination, 3) Gather documents, 4) Apply for X1 (long-term) or X2 (short-term) visa at Chinese Embassy, 5) Convert to residence permit within 30 days of arrival. Processing takes 1-2 weeks." }
    ],
    metaTitle: "Study in China | CSC Scholarship, Top Universities & MBBS",
    metaDescription: "Study in China from India with DreamDestination. CSC full scholarships available. Get admission to Tsinghua, Peking, Fudan & top Chinese universities. MBBS, engineering, education loans & visa assistance for Indian students."
  },

  // ============================================================
  // 21. Japan
  // ============================================================
  {
    slug: "japan",
    name: "Japan",
    flag: "🇯🇵",
    heroTagline: "Innovation, Technology & World-Class Research in Asia's Powerhouse",
    description: "Japan offers cutting-edge education in technology, robotics, and engineering with generous MEXT scholarships and a unique cultural experience.",
    longDescription: "Japan is a global leader in technology, innovation, and research, home to prestigious universities like the University of Tokyo, Kyoto University, and Osaka University. With the MEXT (Ministry of Education) scholarship program covering full tuition, living expenses, and airfare, Japan is extremely accessible for international students. Japanese universities excel in engineering, robotics, AI, automotive technology, and sciences. Japan's unique blend of traditional culture and futuristic innovation offers an unparalleled study experience. Over 300,000 international students study in Japan, and the government actively supports international enrollment through the 'Study in Japan' initiative. DreamDestination provides comprehensive support.",
    universities: "200+",
    avgCost: "₹4-12L/year",
    livingCost: "₹50,000-1,00,000/month",
    workPermit: "Post-graduation work visa available (up to 1 year job-seeking)",
    scholarships: "MEXT Scholarship (Full Ride), JASSO, University Scholarships",
    visaSuccessRate: "Student Status + CoE",
    intakeMonths: "April, October",
    currency: "JPY (¥)",
    language: "Japanese (English programs available)",
    gradient: "bg-gradient-success",
    colleges: [
      { name: "University of Tokyo (Todai)", location: "Tokyo", ranking: "QS #28", programs: ["Engineering", "Sciences", "Law", "Medicine", "Economics"], website: "https://www.u-tokyo.ac.jp/en/" },
      { name: "Kyoto University", location: "Kyoto", ranking: "QS #49", programs: ["Engineering", "Sciences", "Medicine", "Agriculture", "Informatics"], website: "https://www.kyoto-u.ac.jp/en" },
      { name: "Osaka University", location: "Osaka", ranking: "QS #68", programs: ["Engineering", "Medicine", "Sciences", "Dentistry", "Robotics"], website: "https://www.osaka-u.ac.jp/en" },
      { name: "Tokyo Institute of Technology (Tokyo Tech)", location: "Tokyo", ranking: "QS #84", programs: ["Engineering", "Computer Science", "Materials Science", "Chemistry", "Architecture"], website: "https://www.titech.ac.jp/english" },
      { name: "Tohoku University", location: "Sendai", ranking: "QS #113", programs: ["Materials Science", "Engineering", "Sciences", "Medicine", "Agriculture"], website: "https://www.tohoku.ac.jp/en/" },
      { name: "Nagoya University", location: "Nagoya", ranking: "QS #152", programs: ["Engineering", "Sciences", "Medicine", "Law", "Informatics"], website: "https://en.nagoya-u.ac.jp/" },
      { name: "Kyushu University", location: "Fukuoka", ranking: "QS #163", programs: ["Engineering", "Sciences", "Design", "Agriculture", "Medicine"], website: "https://www.kyushu-u.ac.jp/en/" },
      { name: "Hokkaido University", location: "Sapporo", ranking: "QS #196", programs: ["Agriculture", "Engineering", "Veterinary", "Environmental Science", "Medicine"], website: "https://www.hokudai.ac.jp/en/" },
      { name: "Waseda University", location: "Tokyo", ranking: "QS #181", programs: ["Political Science", "Engineering", "Business", "International Liberal Studies", "Sciences"], website: "https://www.waseda.jp/top/en/" },
      { name: "Keio University", location: "Tokyo", ranking: "QS #188", programs: ["Business", "Medicine", "Law", "Economics", "Sciences"], website: "https://www.keio.ac.jp/en/" }
    ],
    collegeCount: 200,
    programs: ["Engineering & Robotics", "Computer Science & AI", "Automotive Engineering", "Medicine", "Sciences", "Business"],
    keywords: [
      "study in japan", "study in japan from india", "japan education consultancy",
      "education loan for japan", "japan student visa", "japan study visa from india",
      "best universities in japan", "top colleges in japan", "japan university admission",
      "mext scholarship", "japanese government scholarship", "mext scholarship for indian students",
      "cost of studying in japan", "japan tuition fees for indian students",
      "engineering in japan", "ms in japan", "mba in japan", "robotics in japan",
      "university of tokyo admission", "kyoto university fees",
      "work after study in japan", "japan post study work visa",
      "study abroad consultant japan", "japan education loan without collateral",
      "jlpt for japan study", "english programs in japan"
    ],
    services: [
      { title: "Japan University Admission", description: "Expert guidance for applying to Japanese universities including MEXT scholarship applications.", features: ["University Shortlisting", "MEXT Application", "Research Proposal Writing", "Professor Contact (for research students)"] },
      { title: "Japan Education Loan", description: "Education loans for Japanese institutions — reduced amounts when combined with scholarships.", features: ["Secured and unsecured routes", "No Collateral Options", "Quick Processing", "MEXT-compatible"] },
      { title: "Japan Student Visa", description: "Complete Certificate of Eligibility (CoE) and visa support for Japan.", features: ["CoE Application", "Document Preparation", "Visa Application", "Embassy Coordination"] },
      { title: "Japanese Language & Culture Prep", description: "Pre-departure Japanese language basics and cultural orientation.", features: ["Basic Japanese Course", "JLPT Guidance", "Cultural Orientation", "Settlement Support"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 12 years",
      processingTime: "Depends on your file",
      highlights: ["National universities very affordable", "MEXT covers full cost", "Covers tuition + living + travel", "Moratorium during studies", "Tax benefits under 80E"]
    },
    eligibility: ["Confirmed admission from a Japanese university", "Minimum 60% in previous qualification", "Valid passport", "Certificate of Eligibility (CoE)", "JLPT N2+ (for Japanese-medium programs)", "English proficiency (for English programs)", "Research proposal (for research students)"],
    englishTests: ["IELTS Academic (6.0-6.5)", "TOEFL iBT (80-95)", "EJU (Examination for Japanese University)", "JLPT N1/N2 (for Japanese-medium programs)"],
    documentsRequired: ["Valid Passport", "Certificate of Eligibility (CoE)", "University Admission Letter", "Academic Transcripts", "IELTS/TOEFL or JLPT Scores", "Research Proposal (if applicable)", "Financial Proof", "Passport Photos", "Medical Certificate", "SOP/Study Plan"],
    faqs: [
      { question: "What is the MEXT scholarship?", answer: "MEXT (Ministry of Education, Culture, Sports, Science and Technology) offers fully-funded scholarships covering: tuition fees, monthly stipend (¥143,000-145,000 ≈ ₹80,000/month), round-trip airfare, and enrollment fees. Categories include Research Students, Undergraduate, Professional Training, and Japanese Studies. Applications go through Indian Embassy." },
      { question: "Is Japan affordable for Indian students?", answer: "National university tuition is ₹4-5 Lakhs/year — very affordable. Private universities cost ₹8-15 Lakhs/year. Living costs in Tokyo are ₹60,000-1,00,000/month, less in other cities. MEXT scholarship makes it completely free. JASSO scholarships provide ¥48,000/month. Part-time work (28 hrs/week) can cover living costs." },
      { question: "Do I need to learn Japanese?", answer: "For English-medium programs (many available at top universities), Japanese is not required. For Japanese-medium programs, JLPT N2 or higher is needed. Learning basic Japanese (N5/N4) is highly recommended for daily life. Many universities offer free Japanese language courses for international students." },
      { question: "Can I work while studying in Japan?", answer: "Yes! Students can work up to 28 hours per week during term and 40 hours during holidays with a 'Permission to Engage in Activity Other Than That Permitted by the Status of Residence.' Average hourly wage is ¥1,000-1,200 (₹550-660). Part-time work can cover a significant portion of living expenses." },
      { question: "What are the best universities in Japan for engineering?", answer: "Top engineering universities include University of Tokyo (#28 QS), Tokyo Tech (#84), Kyoto University (#49), Osaka University (#68), and Tohoku University (#113). Japan excels in robotics, automotive engineering, materials science, AI, and electrical engineering. These universities have strong industry partnerships." },
      { question: "What is the post-study work visa in Japan?", answer: "Graduates can switch to a 'Designated Activities' visa for up to 1 year of job-seeking. Once employed, they can get a work visa (Engineer/Specialist in Humanities/International Services). Japan actively welcomes skilled foreign workers, especially in tech and engineering. The job market is favorable for graduates from top universities." },
      { question: "How do I apply for MEXT scholarship from India?", answer: "Steps: 1) Apply through Indian Embassy (Embassy Recommendation) or directly to universities (University Recommendation), 2) Take written exams at Embassy (math, English, Japanese), 3) Interview, 4) University placement, 5) Receive scholarship. Application period is April-June. DreamDestination guides through the entire process." },
      { question: "Is Japan safe for Indian students?", answer: "Japan is one of the safest countries in the world with extremely low crime rates. Cities are clean, efficient, and well-organized. Indian communities exist in major cities. Vegetarian food options are expanding. DreamDestination provides comprehensive pre-departure briefing on life in Japan." }
    ],
    metaTitle: "Study in Japan | MEXT Scholarship & Top Universities",
    metaDescription: "Study in Japan from India with DreamDestination. MEXT full scholarships available. Get admission to University of Tokyo, Kyoto University & top Japanese universities. Engineering, robotics, education loans & visa assistance."
  },

  // ============================================================
  // 22. Iran
  // ============================================================
  {
    slug: "iran",
    name: "Iran",
    flag: "🇮🇷",
    heroTagline: "Rich Academic Heritage with Affordable Medical & Engineering Education",
    description: "Iran offers affordable quality education in medicine, engineering, and sciences with a rich academic tradition and warm hospitality for international students.",
    longDescription: "Iran has a rich educational heritage with some of the oldest universities in the world. Modern Iranian universities like the University of Tehran, Sharif University of Technology, and Iran University of Medical Sciences offer high-quality programs in medicine, engineering, and sciences at very affordable costs. Iran is particularly popular for MBBS and dental programs among international students. With tuition as low as ₹1-5 Lakhs per year and very affordable living costs, Iran provides excellent value. The country's warm hospitality, rich culture, and historical significance make it a unique study destination. DreamDestination provides comprehensive support for Indian students looking to study in Iran.",
    universities: "100+",
    avgCost: "₹1-5L/year",
    livingCost: "₹10,000-25,000/month",
    workPermit: "Limited work opportunities during studies",
    scholarships: "Iranian Government Scholarships, University Fee Waivers",
    visaSuccessRate: "Education Visa",
    intakeMonths: "September, February",
    currency: "IRR (﷼)",
    language: "Persian/Farsi (English programs available)",
    gradient: "bg-gradient-accent",
    colleges: [
      { name: "University of Tehran", location: "Tehran", ranking: "QS #501-550", programs: ["Engineering", "Medicine", "Law", "Sciences", "Agriculture"], website: "https://ut.ac.ir/en" },
      { name: "Sharif University of Technology", location: "Tehran", ranking: "QS #351-400", programs: ["Engineering", "Computer Science", "Mathematics", "Physics", "Chemistry"], website: "https://en.sharif.edu/" },
      { name: "Iran University of Medical Sciences (IUMS)", location: "Tehran", ranking: "Top Medical", programs: ["MBBS", "Dentistry", "Pharmacy", "Nursing", "Public Health"], website: "https://en.iums.ac.ir/" },
      { name: "Isfahan University of Technology", location: "Isfahan", ranking: "QS #501-550", programs: ["Engineering", "Sciences", "Agriculture", "Architecture", "Mathematics"], website: "https://english.iut.ac.ir/" },
      { name: "Tehran University of Medical Sciences (TUMS)", location: "Tehran", ranking: "Top Medical", programs: ["MBBS", "Dentistry", "Pharmacy", "Paramedical", "Public Health"], website: "https://en.tums.ac.ir/" },
      { name: "Amirkabir University of Technology", location: "Tehran", ranking: "QS #451-500", programs: ["Engineering", "Computer Science", "Textiles", "Maritime", "Biomedical"], website: "https://aut.ac.ir/en" },
      { name: "Shiraz University", location: "Shiraz", ranking: "QS #601-650", programs: ["Engineering", "Medicine", "Agriculture", "Sciences", "Arts"], website: "https://shirazu.ac.ir/en" },
      { name: "Tabriz University of Medical Sciences", location: "Tabriz", ranking: "Top Medical", programs: ["MBBS", "Dentistry", "Pharmacy", "Nursing", "Physiotherapy"], website: "https://tbzmed.ac.ir/en" }
    ],
    collegeCount: 100,
    programs: ["Medicine (MBBS)", "Dentistry", "Engineering", "Computer Science", "Sciences", "Pharmacy"],
    keywords: [
      "study in iran", "study in iran from india", "iran education consultancy",
      "education loan for iran", "iran student visa", "iran study visa from india",
      "best universities in iran", "top medical colleges in iran",
      "mbbs in iran", "mbbs in iran for indian students", "engineering in iran",
      "cost of studying in iran", "iran tuition fees for indian students",
      "university of tehran admission", "sharif university admission",
      "affordable education in iran", "dentistry in iran",
      "iran scholarship for indian students", "iran education loan",
      "study abroad consultant iran", "medical education in iran"
    ],
    services: [
      { title: "Iran University Admission", description: "Expert guidance for applying to Iranian universities including medical and engineering programs.", features: ["University Selection", "Application Management", "Document Translation", "Admission Coordination"] },
      { title: "Iran Education Loan", description: "Minimal education loans for Iranian universities — very small amounts needed due to extremely low costs.", features: ["Secured and unsecured routes", "No Collateral Options", "Quick Approval", "Minimal EMI"] },
      { title: "Iran Student Visa", description: "Complete visa support with invitation letter and embassy coordination.", features: ["Invitation Letter", "Document Preparation", "Visa Application", "Embassy Guidance"] },
      { title: "Cultural & Language Prep", description: "Pre-departure Persian language basics and cultural orientation.", features: ["Basic Persian Course", "Cultural Orientation", "Settlement Support", "Local SIM & Banking Help"] }
    ],
    educationLoan: {
      maxAmount: "Set by the lender",
      interestRate: "Set by the lender",
      collateral: "Secured and unsecured routes",
      repaymentPeriod: "Up to 8 years",
      processingTime: "Depends on your file",
      highlights: ["Extremely affordable tuition", "Minimal loan amount needed", "Very low living costs", "Easy repayment", "Tax benefits under 80E"]
    },
    eligibility: ["Confirmed admission from an Iranian university", "Minimum 50-60% in previous qualification", "Valid passport", "Medical fitness certificate", "NEET qualification (for MBBS)", "No specific entrance exam for most programs"],
    englishTests: ["IELTS (5.5-6.0 for English programs)", "TOEFL (60-75)", "No English test for many programs", "Persian/Farsi proficiency for local programs"],
    documentsRequired: ["Valid Passport", "University Invitation Letter", "Academic Transcripts (Apostilled)", "Medical Certificate", "Passport Photos", "Financial Proof", "NEET Scorecard (for MBBS)", "Birth Certificate", "Police Clearance"],
    faqs: [
      { question: "Is Iran affordable for studying?", answer: "Extremely affordable! Iran has some of the lowest tuition fees globally — ₹1-5 Lakhs per year. Living costs are just ₹10,000-25,000/month. Total cost for a full MBBS program (6-7 years) can be as low as ₹12-25 Lakhs. It's one of the most budget-friendly study destinations worldwide." },
      { question: "Is MBBS from Iran recognized in India?", answer: "Some Iranian medical universities are recognized by NMC and WHO. Graduates must pass FMGE/NEXT exam to practice in India. It's important to verify NMC recognition of the specific university before enrollment. DreamDestination helps identify recognized institutions." },
      { question: "What language are courses taught in?", answer: "Most medical programs for international students are available in English. Engineering and science programs may be in English or Persian. Many universities offer a Persian language preparatory course. Learning basic Persian is recommended for daily life and patient interaction in medical studies." },
      { question: "Is Iran safe for Indian students?", answer: "Iran is generally safe with warm hospitality towards Indian students. Iranian people are known for their friendliness and welcoming nature. Major cities like Tehran, Isfahan, and Shiraz have well-developed infrastructure. DreamDestination provides updated safety guidance and cultural orientation." },
      { question: "What are the best universities in Iran?", answer: "Top institutions include University of Tehran (oldest and most prestigious), Sharif University of Technology (the 'MIT of Iran'), Iran University of Medical Sciences, Tehran University of Medical Sciences, Isfahan University of Technology, and Amirkabir University. Each excels in specific fields." },
      { question: "Can I work while studying in Iran?", answer: "Work opportunities during studies are limited for international students. Some part-time opportunities exist in tutoring and translation. The focus is primarily on academics. DreamDestination recommends budgeting for the full duration without relying on part-time income." },
      { question: "How do I get a student visa for Iran?", answer: "Steps: 1) Get admission and invitation letter, 2) Gather required documents, 3) Apply at Iranian Embassy/Consulate, 4) Pay visa fees, 5) Receive visa. Processing takes 2-4 weeks. DreamDestination handles documentation and embassy coordination." },
      { question: "What is the cultural environment like in Iran?", answer: "Iran has a rich cultural heritage with world-famous historical sites, delicious cuisine, and warm people. Islamic customs are observed — dress code regulations apply. Indian food ingredients are available. The academic environment is serious and research-focused. Many Iranian universities have international student services." }
    ],
    metaTitle: "Study in Iran | MBBS, Engineering & Costs",
    metaDescription: "Study in Iran from India with DreamDestination. Extremely affordable education from ₹1L/year. MBBS, engineering at top Iranian universities. Education loans, visa assistance & complete guidance for Indian students."
  }
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export const getCountryBySlug = (slug: string): CountryData | undefined => {
  return countriesData.find((c) => c.slug === slug);
};

export const getAllCountrySlugs = (): string[] => {
  return countriesData.map((c) => c.slug);
};

export const generateJsonLd = (country: CountryData): object[] => {
  return [
    // WebPage Schema with Breadcrumbs
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": country.metaTitle,
      "description": country.metaDescription,
      "url": `${SITE_DOMAIN}/countries/${country.slug}`,
      "inLanguage": "en",
      "isPartOf": {
        "@type": "WebSite",
        "name": ORG_NAME,
        "url": SITE_DOMAIN
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": SITE_DOMAIN
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Countries",
            "item": `${SITE_DOMAIN}/countries`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `Study in ${country.name}`,
            "item": `${SITE_DOMAIN}/countries/${country.slug}`
          }
        ]
      },
      "about": {
        "@type": "Country",
        "name": country.name
      },
      "keywords": country.keywords.join(", ")
    },

    // FAQPage Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": country.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    },

    // EducationalOrganization Schema
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": ORG_NAME,
      "description": `${ORG_NAME} is a leading study abroad consultancy providing comprehensive education services including university admission, education loans, visa assistance, and scholarship guidance for students looking to study in ${country.name}.`,
      "url": SITE_DOMAIN,
      "areaServed": {
        "@type": "Country",
        "name": country.name
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Study in ${country.name} Services`,
        "itemListElement": country.services.map((service) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.title,
            "description": service.description
          }
        }))
      }
    },

    // Service Schema for Education Loan
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Education Loan for ${country.name}`,
      "description": `Get education loans up to ${country.educationLoan.maxAmount} for studying in ${country.name}. Interest rates from ${country.educationLoan.interestRate}. ${country.educationLoan.collateral}. Quick processing in ${country.educationLoan.processingTime}.`,
      "provider": {
        "@type": "Organization",
        "name": ORG_NAME,
        "url": SITE_DOMAIN
      },
      "areaServed": {
        "@type": "Country",
        "name": "India"
      },
      "serviceType": "Education Loan",
      "offers": {
        "@type": "Offer",
        "description": `Education loan up to ${country.educationLoan.maxAmount} at ${country.educationLoan.interestRate}`
      }
    },

    // ItemList Schema for Colleges
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `Top Colleges and Universities in ${country.name}`,
      "description": `List of top ${country.colleges.length} colleges and universities in ${country.name} for Indian students`,
      "numberOfItems": country.colleges.length,
      "itemListElement": country.colleges.map((college, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CollegeOrUniversity",
          "name": college.name,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": college.location
          },
          "url": college.website
        }
      }))
    }
  ];
};
