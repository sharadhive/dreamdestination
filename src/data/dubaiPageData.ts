// ============================================================
// DUBAI (UAE) PAGE — COMPREHENSIVE DATA
// ============================================================

export interface DubaiUniversity {
  name: string;
  location: string;
  type: "Public" | "Private" | "International Branch" | "Federal";
  qsRanking?: string;
  popularPrograms: string[];
  logo: string;
  avgTuition: string;
  postStudyWork: boolean;
  state: string;
}

export const DUBAI_PAGE_DATA = {
  seo: {
    title: "Study in Dubai for Indian Students 2026",
    description: "Study in Dubai for Indian students with guidance on universities, courses, fees, scholarships, education loans, student visa and career opportunities in the UAE.",
    canonicalUrl: "https://www.dreamdestinationstudyabroad.com/study-in-dubai",
    keywords: [
      "study in Dubai for Indian students", "study in Dubai", "study in UAE",
      "Dubai education consultant", "Dubai study abroad consultant", "Dubai university admission",
      "Dubai student visa for Indian students", "universities in Dubai for Indian students",
      "courses in Dubai for international students", "cost of studying in Dubai",
      "scholarships in Dubai for Indian students", "education loan for Dubai studies",
      "MBA in Dubai", "engineering in Dubai", "Dubai intakes", "work while studying Dubai",
      "post-study work Dubai", "Dubai free zones", "KHDA approved universities",
    ],
  },
  hero: {
    badge: "🇦🇪 Updated for 2026 — UAE Golden Visa & Work Opportunities",
    description: "Dubai has emerged as a premier international higher-education destination, with various universities offering programmes in fields like business, technology, engineering, finance, design, media, and more.",
    questions: [
      "Which university is the best fit?",
      "Which programme aligns with your future career aspirations?",
      "What are the anticipated tuition and living expenses?",
      "Are there education loan facilities available?",
      "What type of student visa will you require?",
      "Is it permissible to work while you study?",
      "What career prospects await you upon graduation?",
    ],
    valueProposition: "DreamDestination provides personalised online counselling to Indian students, guiding them through these critical decisions – from selecting the right course and university to managing admissions, education financing, and student visa preparation.",
    primaryCta: "Explore Dubai Study Options",
    secondaryCta: "Talk to a Dubai Counsellor",
  },
  atAGlance: {
    title: "Dubai Study Overview",
    stats: [
      { label: "Study Levels", value: "Bachelor's, Master's, MBA, PhD" },
      { label: "Popular Fields", value: "Business, IT, Engineering, Finance" },
      { label: "Language", value: "English" },
      { label: "Main Intakes", value: "September, January, May" },
      { label: "Student Visa", value: "UAE Student Visa" },
      { label: "Work Rights", value: "Part-time allowed" },
    ],
  },
  whyDubai: {
    title: "Why Study in Dubai?",
    subtitle: "Dubai offers a unique blend of world-class education, career opportunities, cultural diversity, and a strategic location connecting East and West.",
    reasons: [
      { title: "Global Business Hub", description: "Dubai is a major international business and finance centre, offering unparalleled networking and career opportunities for graduates.", icon: "Briefcase" },
      { title: "English-Medium Education", description: "Most programmes are taught entirely in English, making Dubai highly accessible for Indian students.", icon: "BookOpen" },
      { title: "Tax-Free Income", description: "The UAE has no personal income tax, making it financially attractive for working students and graduates.", icon: "Wallet" },
      { title: "International Branch Campuses", description: "Dubai hosts branch campuses of globally recognised universities from the UK, Australia, USA, and more.", icon: "Globe" },
      { title: "Cultural Familiarity", description: "A large Indian community, familiar food, and cultural connections make the transition easier for Indian students.", icon: "Heart" },
      { title: "Strategic Location", description: "Dubai's central location provides easy access to Europe, Asia, and Africa — ideal for international careers.", icon: "TrendingUp" },
    ],
  },
  whoShouldConsider: {
    heading: "Is Dubai the Right Study Destination for You?",
    intro: "Dubai may be worth considering if you:",
    points: [
      "Want English-medium education in a global city",
      "Are interested in business, finance, or technology",
      "Want exposure to an international work environment",
      "Prefer a destination with a large Indian community",
      "Are looking for post-study career opportunities in the Middle East",
      "Want access to international branch campuses",
      "Are considering an MBA or professional degree",
      "Value a tax-free earning environment",
    ],
    suitableFor: ["Business & Management", "Finance", "IT & Computer Science", "Engineering", "Hospitality & Tourism", "Media & Communication", "Design", "Healthcare"],
    disclaimer: "Your academic profile, career goals, budget, and personal preferences should guide your decision.",
    cta: { text: "Get My Dubai Profile Assessment", href: "#lead-form" },
  },
  institutionTypes: {
    title: "Types of Higher-Education Institutions in Dubai",
    subtitle: "Dubai has a diverse higher-education landscape with multiple types of institutions.",
    types: [
      { title: "Federal/Public Universities", description: "Government-funded institutions primarily for UAE nationals, with some international student intake.", bestFor: "Research, engineering, and technology.", icon: "GraduationCap" },
      { title: "Private Universities", description: "Licensed and regulated private institutions offering a wide range of programmes.", bestFor: "Business, IT, engineering, and design.", icon: "Building" },
      { title: "International Branch Campuses", description: "Overseas campuses of globally ranked universities operating in Dubai's free zones.", bestFor: "Getting an international degree while studying in Dubai.", icon: "Globe" },
      { title: "Free Zone Universities", description: "Institutions operating within Dubai's academic free zones like DIAC and DKAP.", bestFor: "Flexible programmes and international recognition.", icon: "Sparkles" },
    ],
    keyAdvice: "Verify that your chosen institution and programme are recognised by the UAE Ministry of Education (MoE) or relevant authority like KHDA.",
  },
  universities: [
    { name: "University of Birmingham Dubai", location: "Dubai International Academic City", state: "Dubai", type: "International Branch" as const, qsRanking: "QS #80 World (UK)", popularPrograms: ["Business", "Engineering", "Computer Science", "Psychology", "Economics"], logo: "https://logo.clearbit.com/birmingham.ac.uk", avgTuition: "AED 70,000–95,000/yr", postStudyWork: true },
    { name: "Heriot-Watt University Dubai", location: "Dubai International Academic City", state: "Dubai", type: "International Branch" as const, qsRanking: "QS #235 World (UK)", popularPrograms: ["Engineering", "Business", "Computer Science", "Data Science", "Construction"], logo: "https://logo.clearbit.com/hw.ac.uk", avgTuition: "AED 50,000–80,000/yr", postStudyWork: true },
    { name: "Middlesex University Dubai", location: "Dubai Knowledge Park", state: "Dubai", type: "International Branch" as const, qsRanking: "UK University", popularPrograms: ["Business", "IT", "Law", "Media", "Psychology"], logo: "https://logo.clearbit.com/mdx.ac.uk", avgTuition: "AED 40,000–65,000/yr", postStudyWork: true },
    { name: "University of Wollongong in Dubai", location: "Dubai Knowledge Park", state: "Dubai", type: "International Branch" as const, qsRanking: "QS #162 World (AU)", popularPrograms: ["Business", "Engineering", "IT", "Finance", "Media"], logo: "https://logo.clearbit.com/uow.edu.au", avgTuition: "AED 45,000–75,000/yr", postStudyWork: true },
    { name: "Amity University Dubai", location: "Dubai International Academic City", state: "Dubai", type: "Private" as const, qsRanking: "Indian University", popularPrograms: ["Engineering", "Business", "IT", "Biotechnology", "Design"], logo: "https://logo.clearbit.com/amity.edu", avgTuition: "AED 30,000–55,000/yr", postStudyWork: true },
    { name: "SP Jain School of Global Management", location: "Dubai", state: "Dubai", type: "Private" as const, qsRanking: "Top Global MBA", popularPrograms: ["MBA", "BBA", "MGB", "Finance", "Data Science"], logo: "https://logo.clearbit.com/spjain.org", avgTuition: "AED 55,000–120,000/yr", postStudyWork: true },
    { name: "Canadian University Dubai", location: "City Walk, Dubai", state: "Dubai", type: "Private" as const, qsRanking: "UAE Top Private", popularPrograms: ["Architecture", "Engineering", "Business", "IT", "Interior Design"], logo: "https://logo.clearbit.com/cud.ac.ae", avgTuition: "AED 35,000–60,000/yr", postStudyWork: true },
    { name: "Murdoch University Dubai", location: "Dubai International Academic City", state: "Dubai", type: "International Branch" as const, qsRanking: "QS #431 World (AU)", popularPrograms: ["Business", "IT", "Media", "Psychology", "Criminology"], logo: "https://logo.clearbit.com/murdoch.edu.au", avgTuition: "AED 40,000–65,000/yr", postStudyWork: true },
    { name: "BITS Pilani Dubai Campus", location: "Dubai International Academic City", state: "Dubai", type: "International Branch" as const, qsRanking: "Top Indian Institute", popularPrograms: ["Engineering", "Computer Science", "Biotechnology", "Finance", "Chemical Engineering"], logo: "https://logo.clearbit.com/bits-pilani.ac.in", avgTuition: "AED 40,000–65,000/yr", postStudyWork: true },
    { name: "Manipal Academy of Higher Education, Dubai", location: "Dubai International Academic City", state: "Dubai", type: "International Branch" as const, qsRanking: "Indian University", popularPrograms: ["Engineering", "Business", "IT", "Media", "Biotechnology"], logo: "https://logo.clearbit.com/manipal.edu", avgTuition: "AED 30,000–50,000/yr", postStudyWork: true },
  ] as DubaiUniversity[],
  popularCourses: [
    { category: "Business & Management", icon: "Briefcase", courses: ["Business Administration", "International Business", "Marketing", "Human Resource Management", "Supply Chain Management", "Entrepreneurship"] },
    { category: "Finance & Accounting", icon: "TrendingUp", courses: ["Finance", "Accounting", "Banking", "Financial Planning", "Investment Management", "Islamic Finance"] },
    { category: "IT & Computer Science", icon: "Monitor", courses: ["Computer Science", "Information Technology", "Software Engineering", "Cybersecurity", "Data Science", "AI & Machine Learning"] },
    { category: "Engineering", icon: "Cog", courses: ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Computer Engineering", "Chemical Engineering"] },
    { category: "Other Popular Areas", icon: "Sparkles", courses: ["Hospitality & Tourism", "Media & Communication", "Design", "Architecture", "Law", "Psychology", "Healthcare Management"] },
  ],
  mastersInDubai: {
    heading: "Master's in Dubai for Indian Students",
    description: "Dubai offers a variety of master's programmes, particularly attractive for working professionals and those seeking career advancement in the Gulf region.",
    considerations: ["University & programme reputation", "KHDA/MoE accreditation", "Curriculum & specialisation", "Tuition fees & financial aid", "Industry connections", "Internship opportunities", "Part-time/full-time options", "Career relevance in GCC"],
    popularSpecialisations: ["MBA", "MSc Data Science", "MSc Finance", "MSc Computer Science", "MSc Engineering Management", "MA International Business", "MSc Cybersecurity", "MSc Project Management", "MA Media & Communications", "MSc AI"],
    note: "Many Dubai master's programmes are designed for working professionals and may offer flexible scheduling.",
    cta: { text: "Find My Master's Options in Dubai", href: "#lead-form" },
  },
  mbaInDubai: {
    heading: "MBA in Dubai for Indian Students",
    areas: ["General Management", "Finance", "Marketing", "International Business", "Entrepreneurship", "Healthcare Management", "Technology Management"],
    checkBefore: ["AACSB/EQUIS/AMBA accreditation", "Work experience requirements", "Tuition & ROI analysis", "Duration & format", "GMAT/GRE requirements", "Industry connections", "Networking opportunities", "Post-MBA career support"],
  },
  intakes: [
    { season: "September/October", status: "Main Intake", description: "The primary intake for most undergraduate and postgraduate programmes.", timeline: "Apply 4–8 months prior" },
    { season: "January/February", status: "Second Intake", description: "Many universities offer a January start, particularly for postgraduate programmes.", timeline: "Apply 3–6 months prior" },
    { season: "May/June", status: "Additional Intake", description: "Some institutions offer a third intake, though programme availability may be limited.", timeline: "Apply 2–4 months prior" },
  ],
  timeline: [
    { phase: "8–12 Months Before", title: "Research & Planning", details: "Research universities, compare programmes, check accreditation, estimate tuition and living costs." },
    { phase: "6–8 Months Before", title: "Applications & Documents", details: "Prepare academic documents, write SOP, arrange references, and submit applications." },
    { phase: "3–6 Months Before", title: "Admission & Finance", details: "Receive offers, arrange education loan, explore scholarships, plan finances." },
    { phase: "After Admission", title: "Visa & Pre-Departure", details: "Apply for student visa, arrange accommodation, book travel, pre-departure briefing." },
  ],
  costOfStudy: {
    title: "Cost of Studying in Dubai for Indian Students",
    intro: "Tuition fees in Dubai vary significantly depending on the institution type, programme, and level of study.",
    breakdown: [
      { level: "Undergraduate (UG)", cost: "AED 30,000 – 95,000/year", note: "Varies by institution & programme" },
      { level: "Postgraduate (PG)", cost: "AED 40,000 – 120,000/year", note: "Higher for MBA & specialised programmes" },
      { level: "MBA Programmes", cost: "AED 60,000 – 150,000+/year", note: "Premium for accredited business schools" },
    ],
    budgetItems: ["Tuition fees", "Accommodation", "Food & groceries", "Transport", "Health insurance", "Visa fees", "Study materials", "Personal expenses", "Utilities", "Mobile & internet"],
    disclaimer: "Costs vary significantly by institution and programme. Always verify current fees directly with the university.",
  },
  costOfLiving: {
    title: "Cost of Living in Dubai",
    intro: "Living costs in the UAE vary depending on the emirate and lifestyle choices.",
    cities: [
      { name: "Dubai Marina", costLevel: "Very High", note: "Premium waterfront area" },
      { name: "Dubai DIAC", costLevel: "Moderate", note: "Academic City — student-friendly area" },
      { name: "Sharjah", costLevel: "Moderate", note: "More affordable alternative near Dubai" },
      { name: "Abu Dhabi", costLevel: "High", note: "Capital city with good facilities" },
      { name: "Ajman", costLevel: "Low-Moderate", note: "Most affordable option near Dubai" },
      { name: "Al Barsha", costLevel: "Moderate-High", note: "Central location, good transport links" },
    ],
  },
  scholarships: {
    title: "Scholarships in Dubai for Indian Students",
    intro: "Various scholarships and financial aid options are available for international students in Dubai.",
    categories: [
      { title: "University Scholarships", items: ["Merit-based tuition discounts", "Early bird application discounts", "Academic excellence awards", "Sports scholarships", "Alumni referral discounts"] },
      { title: "External & Government Awards", items: ["UAE government scholarships", "Embassy-sponsored programmes", "Corporate sponsorships", "Need-based financial aid", "Research assistantships"] },
    ],
    disclaimer: "Scholarship availability, eligibility, and amounts vary by institution. Always verify current offerings directly with the university admissions office.",
  },
  educationLoan: {
    title: "Education Loan for Studying in Dubai",
    intro: "Indian students can explore education loan options to finance their studies in Dubai, covering tuition, living expenses, and other costs. We are not a lender and take no commission from any of them: the amount, the rate, the collateral requirement and the approval are all the lender's decision. We help you size the real funding gap, compare routes against your profile, and time the sanction letter to your visa appointment.",
    maxAmount: "Set by the lender",
    interestRate: "Set by the lender",
    unsecuredMax: "Route available",
    services: ["Secured & unsecured education loans", "Bank & NBFC financing", "Tuition & living expense funding", "Co-applicant eligibility check", "Documentation & loan processing", "Alternative financing options", "EMI planning assistance"],
    highlights: ["100% tuition + living expenses coverage", "Competitive interest rates", "Tax benefits under Section 80E", "Fast approval turnaround", "No collateral for select institutions", "Moratorium period during studies"],
    unsecuredLoan: { question: "Can I get an unsecured education loan for Dubai?", answer: "Eligibility depends on the university, course, academic profile, co-applicant income, credit profile, and lender policies. International branch campuses of globally ranked universities typically have better unsecured loan eligibility." },
    rejectedLoan: { question: "What if my Dubai education loan is rejected?", answer: "Understand the rejection reasons first — credit history, co-applicant income, documentation, university recognition, or loan amount. Consider alternative lenders, revised documentation, or different financing structures." },
    phoneNumber: "+91 92118 18710",
  },
  admissionRequirements: {
    intro: "Admission requirements vary by institution and programme level. Common requirements include:",
    requirements: ["Academic transcripts & certificates", "Valid passport", "English proficiency (IELTS/TOEFL/PTE)", "Statement of Purpose (SOP)", "Letters of Recommendation (LORs)", "CV/Resume", "Portfolio (for design/architecture)", "GMAT/GRE (for MBA/specific PG)", "Work experience (for MBA/executive programmes)", "Passport-sized photographs", "Application fee payment"],
    importantNote: "Always verify specific requirements on the university's official website, as each institution may have unique criteria.",
    aeoAnswer: "Requirements differ by university and programme. Contact the admissions office directly or consult with DreamDestination for guidance.",
  },
  applicationProcess: [
    { step: 1, title: "Profile Evaluation", description: "Analyse your academics, career goals, budget, and preferences to identify suitable programmes." },
    { step: 2, title: "University Shortlisting", description: "Compare institutions based on accreditation, curriculum, fees, location, and career relevance." },
    { step: 3, title: "Document Preparation", description: "Prepare academic transcripts, SOP, LORs, CV, and other required documents." },
    { step: 4, title: "Application Submission", description: "Submit applications through university portals or authorised representatives." },
    { step: 5, title: "Admission Confirmation", description: "Receive and accept your admission letter; pay the deposit if required." },
    { step: 6, title: "Financial Planning", description: "Arrange education loan, scholarships, or other financing." },
    { step: 7, title: "Visa Application", description: "Apply for UAE student visa with university sponsorship." },
    { step: 8, title: "Pre-Departure", description: "Arrange accommodation, travel, health insurance, and pre-departure preparation." },
  ],
  studentVisa: {
    heading: "UAE Student Visa for Indian Students",
    intro: "International students require a student visa (student residence permit) to study in the UAE. The university typically sponsors the visa application.",
    journey: "Admission → Visa Application → Medical Test → Emirates ID → Student Residence Permit → UAE",
    requirements: ["Valid passport (minimum 6 months validity)", "University admission/acceptance letter", "Passport photographs", "Academic documents (attested)", "Medical fitness certificate", "Health insurance", "Proof of financial support", "Visa application form", "Security deposit (if required)", "No-objection certificate (if applicable)"],
    financialNote: "You'll need to demonstrate sufficient funds to cover tuition and living expenses for the duration of your studies.",
    processingNote: "Visa requirements and processes are subject to change. Always confirm with the university and UAE immigration authorities.",
  },
  workWhileStudying: {
    heading: "Working While Studying in Dubai",
    intro: "The UAE allows international students to work part-time under certain conditions.",
    details: "Students can typically work up to 20 hours per week during term time with a part-time work permit. During holidays, full-time work may be permitted. Free zone universities may have different regulations.",
    disclaimer: "Work permit rules depend on the type of institution and visa status. Earnings should supplement, not replace, your primary financial planning.",
  },
  postStudyWork: {
    heading: "Post-Study Work & Career Opportunities in Dubai",
    intro: "Dubai offers various pathways for graduates to stay and work after completing their studies.",
    pathway: "Degree → Internship → Job Search → Employment Visa → Career → Potential Golden Visa",
    disclaimer: "Post-study work opportunities depend on job market conditions, your qualifications, employer sponsorship, and immigration rules. Graduation does not guarantee employment.",
  },
  goldenVisa: {
    heading: "UAE Golden Visa for Graduates",
    description: "Outstanding graduates and professionals may be eligible for the UAE Golden Visa, a long-term residence visa (5 or 10 years) that provides greater stability for career building.",
    eligibility: ["Outstanding academic performance", "Graduates from accredited UAE universities", "Professionals with specialised skills", "Investors and entrepreneurs"],
  },
  cities: [
    { name: "Dubai", description: "Main study destination with the largest number of international campuses and career opportunities.", universities: "DIAC, DKAP, multiple universities", state: "Dubai" },
    { name: "Abu Dhabi", description: "Capital city with prestigious institutions like NYU Abu Dhabi and Sorbonne University.", universities: "NYU Abu Dhabi, Sorbonne Abu Dhabi", state: "Abu Dhabi" },
    { name: "Sharjah", description: "More affordable alternative with the University of Sharjah and American University.", universities: "UoS, AUS", state: "Sharjah" },
    { name: "Ras Al Khaimah", description: "Growing education hub with its own academic zone.", universities: "RAK Medical & Health Sciences", state: "RAK" },
  ],
  documents: {
    intro: "Documents typically required when applying to study in Dubai:",
    list: ["Passport (valid for 6+ months)", "Academic certificates & transcripts", "English proficiency test scores", "Statement of Purpose (SOP)", "Letters of Recommendation", "CV/Resume", "Passport photographs", "Application form & fee", "Medical fitness certificate", "Financial proof/bank statements", "No-objection certificate (if applicable)", "Attested documents (as required)"],
    disclaimer: "Each institution may have specific additional requirements. Verify with your chosen university.",
  },
  whyDD: [
    { title: "Profile-Based Guidance", description: "Evaluation based on your academics, career goals, and financial background before recommending options.", icon: "UserCheck" },
    { title: "University & Course Comparison", description: "Compare Dubai universities and programmes based on accreditation, fees, and career outcomes.", icon: "BookOpen" },
    { title: "Accreditation Check", description: "Verify that your chosen programme is recognised by KHDA, MoE, or relevant authorities.", icon: "Shield" },
    { title: "Admissions Support", description: "End-to-end support for the application and documentation process.", icon: "FileText" },
    { title: "Education Loan Assistance", description: "Explore secured and unsecured education loan options for Dubai.", icon: "Wallet" },
    { title: "Scholarship Guidance", description: "Identify available scholarships and financial aid opportunities.", icon: "Award" },
    { title: "Student Visa Guidance", description: "Clear understanding of UAE student visa requirements and processing.", icon: "Globe" },
    { title: "Career-Focused Planning", description: "Long-term career planning aligned with GCC and global job markets.", icon: "TrendingUp" },
    { title: "Online Support Across India", description: "Online counselling accessible to students across India.", icon: "Monitor" },
  ],
  faqs: [
    { question: "1. Is Dubai good for Indian students?", answer: "Dubai offers English-medium education, cultural familiarity, a large Indian community, and strong career opportunities — making it an attractive option for Indian students." },
    { question: "2. How much does it cost to study in Dubai?", answer: "Tuition ranges from AED 30,000 to AED 150,000+ per year depending on the institution and programme. Living costs vary by location and lifestyle." },
    { question: "3. Can I work while studying in Dubai?", answer: "Yes, students can typically work up to 20 hours per week with appropriate permits. Rules vary by institution type." },
    { question: "4. What is KHDA?", answer: "KHDA (Knowledge and Human Development Authority) is the educational quality assurance authority in Dubai that regulates and accredits educational institutions." },
    { question: "5. Are Dubai degrees recognised internationally?", answer: "Degrees from accredited UAE institutions are generally recognised internationally. Branch campuses of globally ranked universities issue degrees from their home institution." },
    { question: "6. Is IELTS required for Dubai?", answer: "Most universities require English proficiency proof. IELTS is widely accepted, though some institutions accept alternatives like TOEFL, PTE, or Duolingo." },
    { question: "7. What are the popular courses in Dubai?", answer: "Business, Finance, IT, Engineering, Hospitality, Media, Design, and Healthcare Management are among the most popular choices." },
    { question: "8. Can I get a scholarship in Dubai?", answer: "Yes, many universities offer merit-based scholarships, early bird discounts, and financial aid. Availability varies by institution." },
    { question: "9. Is Dubai expensive for students?", answer: "Dubai can be moderate to expensive depending on lifestyle choices. Areas like DIAC and Sharjah offer more affordable options." },
    { question: "10. What is the Golden Visa?", answer: "The UAE Golden Visa is a long-term residence visa (5-10 years) available to outstanding graduates, professionals, investors, and entrepreneurs." },
    { question: "11. Can I stay after graduation?", answer: "Yes, graduates can transition to work visas with employer sponsorship. Outstanding graduates may be eligible for the Golden Visa." },
    { question: "12. Are there Indian universities in Dubai?", answer: "Yes, institutions like BITS Pilani, Amity University, Manipal Academy, and SP Jain have campuses in Dubai." },
    { question: "13. Is Dubai safe for students?", answer: "The UAE is generally considered one of the safest countries globally, with low crime rates and a welcoming environment for international students." },
    { question: "14. What are the main intakes?", answer: "September (main), January (second), and May (limited) are the typical intakes." },
    { question: "15. Can I get an education loan for Dubai?", answer: "Yes, Indian students can obtain education loans for Dubai studies. Eligibility depends on the university, course, and financial profile." },
  ],
};
