/**
 * Compact country data for internal linking on location pages.
 *
 * WHY THIS EXISTS INSTEAD OF IMPORTING countryData.ts
 * countryData.ts is 217 KB. Location pages do not need full FAQs, services,
 * documents lists and ten-college arrays — they need a name, a route, a cost
 * range, three colleges, a loan note and a visa route. This file carries
 * exactly that, so the location page bundle stays small and the data is easy
 * to scan and maintain.
 *
 * WHAT GOES INTO THE PARAGRAPHS
 * LocationPage.tsx uses these fields to build one keyword-rich paragraph per
 * country, varied per city with the existing pick() hash system. Each paragraph
 * naturally contains:
 *   – the city name + "study in [country]"  (geo + destination intent)
 *   – education loan mention                (loan intent)
 *   – 2-3 college names                     (university intent)
 *   – cost range                            (fees intent)
 *   – visa route                            (visa intent)
 *   – an internal Link to /study-in-{slug}  (internal linking)
 *
 * DO NOT add fields here that only the country page needs. This file is read
 * by 480+ location pages — every byte is multiplied.
 */

export interface CountryLinkEntry {
  slug: string;
  name: string;
  /** Display name that may differ from `name`, e.g. "Dubai / UAE" */
  displayName: string;
  flag: string;
  route: string;
  /** 2-3 headline colleges — just names, no objects */
  topColleges: string[];
  /** Tuition range string, e.g. "₹20-50L/year" */
  avgCost: string;
  /** One-line education loan note */
  loanNote: string;
  /** Visa route name */
  visa: string;
  /** 2-3 popular programs */
  keyPrograms: string[];
  /** Post-study work info, one line */
  postStudyWork: string;
  /** Scholarship highlight, one line */
  scholarshipHighlight: string;
}

export const COUNTRY_LINKS: CountryLinkEntry[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    displayName: "UK",
    flag: "🇬🇧",
    route: "/study-in-uk",
    topColleges: ["University of Oxford", "University of Cambridge", "Imperial College London"],
    avgCost: "₹20-50L/year",
    loanNote: "Education loans for UK studies are available through secured and unsecured routes with moratorium during the course.",
    visa: "Student visa (PBS)",
    keyPrograms: ["Engineering", "Business & Management", "Medicine"],
    postStudyWork: "2-year Graduate Route post-study work visa",
    scholarshipHighlight: "Chevening, Commonwealth and GREAT Scholarships",
  },
  {
    slug: "usa",
    name: "United States",
    displayName: "USA",
    flag: "🇺🇸",
    route: "/study-in-usa",
    topColleges: ["MIT", "Stanford University", "Harvard University"],
    avgCost: "₹25-80L/year",
    loanNote: "Education loans for USA studies cover tuition, living, travel and health insurance through secured and unsecured routes.",
    visa: "F-1 Student Visa",
    keyPrograms: ["Computer Science & IT", "Engineering", "Business & MBA"],
    postStudyWork: "OPT: 1-3 years (STEM extension available)",
    scholarshipHighlight: "Fulbright, university merit scholarships, TA/RA positions",
  },
  {
    slug: "canada",
    name: "Canada",
    displayName: "Canada",
    flag: "🇨🇦",
    route: "/study-in-canada",
    topColleges: ["University of Toronto", "UBC", "McGill University"],
    avgCost: "₹15-40L/year",
    loanNote: "Education loans for Canada studies support GIC-compatible disbursement and cover tuition, living and travel costs.",
    visa: "Study Permit",
    keyPrograms: ["Computer Science", "Engineering", "Business & MBA"],
    postStudyWork: "3-year Post-Graduation Work Permit (PGWP) with PR pathway",
    scholarshipHighlight: "Vanier, Lester B. Pearson and university merit awards",
  },
  {
    slug: "australia",
    name: "Australia",
    displayName: "Australia",
    flag: "🇦🇺",
    route: "/study-in-australia",
    topColleges: ["University of Melbourne", "University of Sydney", "UNSW"],
    avgCost: "₹20-55L/year",
    loanNote: "Education loans for Australia studies cover tuition, OSHC health insurance and living expenses.",
    visa: "Subclass 500 Student Visa",
    keyPrograms: ["Engineering", "IT & Computer Science", "Nursing & Healthcare"],
    postStudyWork: "2-6 year post-study work visa (Subclass 485)",
    scholarshipHighlight: "Australia Awards and Destination Australia scholarships",
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    displayName: "New Zealand",
    flag: "🇳🇿",
    route: "/study-in-new-zealand",
    topColleges: ["University of Auckland", "University of Otago", "Victoria University of Wellington"],
    avgCost: "₹15-35L/year",
    loanNote: "Education loans for New Zealand studies are available at competitive rates through Indian banks and NBFCs.",
    visa: "Fee Paying Student Visa",
    keyPrograms: ["Engineering", "IT", "Agriculture & Environmental Science"],
    postStudyWork: "3-year post-study work visa",
    scholarshipHighlight: "New Zealand Excellence Awards and university scholarships",
  },
  {
    slug: "germany",
    name: "Germany",
    displayName: "Germany",
    flag: "🇩🇪",
    route: "/study-in-germany",
    topColleges: ["TU Munich", "LMU Munich", "RWTH Aachen"],
    avgCost: "₹0-20L/year (public unis often tuition-free)",
    loanNote: "Germany's public universities charge no tuition — education loans typically cover living costs, blocked account and travel.",
    visa: "National Visa for Study Purposes",
    keyPrograms: ["Engineering", "Computer Science", "Data Science"],
    postStudyWork: "18-month post-study job-seeking visa",
    scholarshipHighlight: "DAAD scholarships and Deutschlandstipendium",
  },
  {
    slug: "ireland",
    name: "Ireland",
    displayName: "Ireland",
    flag: "🇮🇪",
    route: "/study-in-ireland",
    topColleges: ["Trinity College Dublin", "University College Dublin", "NUI Galway"],
    avgCost: "₹15-30L/year",
    loanNote: "Education loans for Ireland studies are available through secured and unsecured routes with flexible repayment.",
    visa: "Stamp 2 Student Visa",
    keyPrograms: ["IT & Computer Science", "Business", "Pharmacy"],
    postStudyWork: "1-2 year Stay Back visa (Third Level Graduate Programme)",
    scholarshipHighlight: "Government of Ireland International Education Scholarships",
  },
  {
    slug: "france",
    name: "France",
    displayName: "France",
    flag: "🇫🇷",
    route: "/study-in-france",
    topColleges: ["Sorbonne University", "École Polytechnique", "HEC Paris"],
    avgCost: "₹2-20L/year",
    loanNote: "France's public universities charge very low tuition — education loans mainly cover living expenses and Campus France fees.",
    visa: "VLS-TS Student Visa",
    keyPrograms: ["Business & Management", "Engineering", "Fashion & Design"],
    postStudyWork: "Post-study APS (temporary residence permit) for job search",
    scholarshipHighlight: "Eiffel Excellence Scholarship and Campus France scholarships",
  },
  {
    slug: "dubai",
    name: "United Arab Emirates",
    displayName: "Dubai / UAE",
    flag: "🇦🇪",
    route: "/study-in-dubai",
    topColleges: ["NYU Abu Dhabi", "American University of Sharjah", "University of Birmingham Dubai"],
    avgCost: "₹10-35L/year",
    loanNote: "Education loans for UAE studies cover tuition and living, with proximity to India keeping travel costs low.",
    visa: "Student Residence Visa",
    keyPrograms: ["Business & Management", "Engineering", "Architecture"],
    postStudyWork: "Employment visa post-graduation in a tax-free economy",
    scholarshipHighlight: "University merit scholarships and government scholarships",
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    displayName: "Switzerland",
    flag: "🇨🇭",
    route: "/study-in-switzerland",
    topColleges: ["ETH Zurich", "EPFL", "University of Zurich"],
    avgCost: "₹5-30L/year",
    loanNote: "Education loans for Switzerland studies are available — public university tuition is relatively low despite high living costs.",
    visa: "National Visa Type D",
    keyPrograms: ["Hospitality Management", "Engineering", "Banking & Finance"],
    postStudyWork: "6-month job search permit after graduation",
    scholarshipHighlight: "Swiss Government Excellence Scholarships and ETH scholarships",
  },
  {
    slug: "singapore",
    name: "Singapore",
    displayName: "Singapore",
    flag: "🇸🇬",
    route: "/study-in-singapore",
    topColleges: ["NUS", "NTU", "Singapore Management University"],
    avgCost: "₹15-40L/year",
    loanNote: "Education loans for Singapore studies cover tuition and living in one of Asia's safest cities.",
    visa: "Student Pass",
    keyPrograms: ["Business & Finance", "Engineering", "Computer Science"],
    postStudyWork: "Work opportunities through the Employment Pass system",
    scholarshipHighlight: "Singapore Government Tuition Grant and university scholarships",
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    displayName: "Malaysia",
    flag: "🇲🇾",
    route: "/study-in-malaysia",
    topColleges: ["University of Malaya", "Universiti Putra Malaysia", "Monash University Malaysia"],
    avgCost: "₹3-15L/year",
    loanNote: "Education loans for Malaysia studies are smaller than for Western destinations, making repayment manageable.",
    visa: "Student Pass (EMGS)",
    keyPrograms: ["Engineering", "Business", "IT & Computer Science"],
    postStudyWork: "Work opportunities through the Malaysia My Second Home programme",
    scholarshipHighlight: "Malaysian government and university merit scholarships",
  },
  {
    slug: "italy",
    name: "Italy",
    displayName: "Italy",
    flag: "🇮🇹",
    route: "/study-in-italy",
    topColleges: ["Politecnico di Milano", "University of Bologna", "Sapienza University of Rome"],
    avgCost: "₹2-20L/year",
    loanNote: "Italy's public universities charge low tuition — education loans mainly cover living expenses and travel.",
    visa: "Type D Student Visa",
    keyPrograms: ["Architecture & Design", "Engineering", "Fashion"],
    postStudyWork: "12-month post-study residence permit for job search",
    scholarshipHighlight: "Invest Your Talent in Italy and DSU regional scholarships",
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    displayName: "Netherlands",
    flag: "🇳🇱",
    route: "/study-in-netherlands",
    topColleges: ["Delft University of Technology", "University of Amsterdam", "Leiden University"],
    avgCost: "₹8-20L/year",
    loanNote: "Education loans for Netherlands studies cover tuition and living in a country with many English-taught programmes.",
    visa: "MVV + Residence Permit",
    keyPrograms: ["Engineering", "Business", "Social Sciences"],
    postStudyWork: "1-year Orientation Year (zoekjaar) visa for graduates",
    scholarshipHighlight: "Holland Scholarship and Orange Tulip Scholarship",
  },
  {
    slug: "spain",
    name: "Spain",
    displayName: "Spain",
    flag: "🇪🇸",
    route: "/study-in-spain",
    topColleges: ["University of Barcelona", "IE Business School", "Universidad Autónoma de Madrid"],
    avgCost: "₹2-15L/year",
    loanNote: "Education loans for Spain studies are typically smaller, with public university tuition among the lowest in Europe.",
    visa: "Student Visa (Visado de Estudiante)",
    keyPrograms: ["Business", "Tourism & Hospitality", "Arts & Design"],
    postStudyWork: "12-month post-study job search permit",
    scholarshipHighlight: "Spanish Government scholarships and university fee waivers",
  },
  {
    slug: "mauritius",
    name: "Mauritius",
    displayName: "Mauritius",
    flag: "🇲🇺",
    route: "/study-in-mauritius",
    topColleges: ["University of Mauritius", "Middlesex University Mauritius", "Curtin Mauritius"],
    avgCost: "₹3-10L/year",
    loanNote: "Education loans for Mauritius studies are affordable — tuition and living costs are among the lowest internationally.",
    visa: "Student Residence Permit",
    keyPrograms: ["Business", "IT", "Tourism & Hospitality"],
    postStudyWork: "Work opportunities through occupation permit",
    scholarshipHighlight: "University merit scholarships and government grants",
  },
  {
    slug: "russia",
    name: "Russia",
    displayName: "Russia",
    flag: "🇷🇺",
    route: "/study-in-russia",
    topColleges: ["Moscow State University", "Saint Petersburg State University", "ITMO University"],
    avgCost: "₹3-10L/year",
    loanNote: "Education loans for Russia studies cover affordable tuition — MBBS programmes are especially popular and cost-effective.",
    visa: "Student Visa (учебная виза)",
    keyPrograms: ["Medicine (MBBS)", "Engineering", "Sciences"],
    postStudyWork: "Work permit available post-graduation",
    scholarshipHighlight: "Russian Government Scholarship and university tuition waivers",
  },
  {
    slug: "china",
    name: "China",
    displayName: "China",
    flag: "🇨🇳",
    route: "/study-in-china",
    topColleges: ["Tsinghua University", "Peking University", "Fudan University"],
    avgCost: "₹3-15L/year",
    loanNote: "Education loans for China studies are modest — CSC scholarships can cover the full cost including stipend.",
    visa: "X1 / X2 Student Visa",
    keyPrograms: ["Medicine (MBBS)", "Engineering", "Computer Science & AI"],
    postStudyWork: "Work permit available for graduates",
    scholarshipHighlight: "CSC Scholarship (full ride) covering tuition, accommodation and stipend",
  },
  {
    slug: "japan",
    name: "Japan",
    displayName: "Japan",
    flag: "🇯🇵",
    route: "/study-in-japan",
    topColleges: ["University of Tokyo", "Kyoto University", "Osaka University"],
    avgCost: "₹4-12L/year",
    loanNote: "Education loans for Japan studies are reduced when combined with MEXT — national university tuition is very affordable.",
    visa: "Student Status + Certificate of Eligibility",
    keyPrograms: ["Engineering & Robotics", "Computer Science & AI", "Automotive Engineering"],
    postStudyWork: "Post-graduation job-seeking visa (up to 1 year)",
    scholarshipHighlight: "MEXT Scholarship (full ride) covering tuition, living and airfare",
  },
  {
    slug: "india",
    name: "India",
    displayName: "India",
    flag: "🇮🇳",
    route: "/study-in-india",
    topColleges: ["IIT Bombay", "IIM Ahmedabad", "AIIMS Delhi"],
    avgCost: "₹2-25L/year",
    loanNote: "Education loans for Indian colleges may qualify for PM-Vidyalaxmi — no collateral, no guarantor for covered institutions.",
    visa: "Not applicable for domestic students",
    keyPrograms: ["Engineering & Technology", "Medicine & Healthcare", "Business & MBA"],
    postStudyWork: "Campus placements at premier institutions",
    scholarshipHighlight: "Government schemes, merit-based and ICCR scholarships",
  },
];

/** Quick lookup by slug */
export const getCountryLink = (slug: string): CountryLinkEntry | undefined =>
  COUNTRY_LINKS.find(c => c.slug === slug);

/** All countries except India (for "study abroad" context on location pages) */
export const ABROAD_COUNTRY_LINKS = COUNTRY_LINKS.filter(c => c.slug !== "india");

/** The subset most commonly chosen by Indian students — shown first in the grid */
export const PRIMARY_DESTINATIONS = ["uk", "usa", "canada", "australia", "germany", "ireland", "new-zealand", "france"];

export const isPrimaryDestination = (slug: string): boolean => PRIMARY_DESTINATIONS.includes(slug);
