import { useState } from "react";
import { Link, useParams, Navigate, useLocation } from "react-router-dom";
import {
  ChevronRight, ArrowRight, Phone, MessageCircle, CheckCircle2, MapPin,
  Wallet, GraduationCap, FileText, Home, Award, BookOpen, Plane, HeartHandshake,
  Compass, AlertCircle, Building2,
  Landmark, ShieldCheck, Banknote, School, Globe2, ListChecks, Receipt,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import NotFound from "@/pages/NotFound";
import { STATES, getState, getCity, type CityInfo, type StateInfo } from "@/data/locations";
import {
  cityUrl, stateUrl, cityMeta, stateMeta, isCityIndexable, isStateIndexable,
  parseLocationSlug, isCanonicalSegment, ALIAS_PREFIXES, LOCATION_HUB,
  resolveAliasSlug,
} from "@/lib/locationSeo";
import locationHero from "@/assets/students-studying.jpg";
import { SITE, CONTACT, SERVICE_ROUTES } from "@/config/site";
import { sendLeadToWhatsApp } from "@/lib/leadToWhatsApp";
import { COUNTRY_LINKS, isPrimaryDestination, type CountryLinkEntry } from "@/data/countryLinkingData";

const SERVICE_ICONS: Record<string, typeof Wallet> = {
  "/career-counselling": Compass,
  "/admission-guidance": GraduationCap,
  "/financial-assistance": Wallet,
  "/scholarship-assistance": Award,
  "/visa-assistance": FileText,
  "/student-accommodation": Home,
  "/test-preparations": BookOpen,
  "/travel-forex-assistance": Plane,
  "/insurance-assistance": HeartHandshake,
};

const DESTINATIONS = [
  { name: "UK", to: "/study-in-uk" }, { name: "USA", to: "/study-in-usa" },
  { name: "Canada", to: "/study-in-canada" }, { name: "Australia", to: "/study-in-australia" },
  { name: "Germany", to: "/study-in-germany" }, { name: "Ireland", to: "/study-in-ireland" },
  { name: "New Zealand", to: "/study-in-new-zealand" }, { name: "France", to: "/study-in-france" },
  { name: "Dubai / UAE", to: "/study-in-dubai" }, { name: "Singapore", to: "/study-in-singapore" },
  { name: "Switzerland", to: "/study-in-switzerland" }, { name: "Italy", to: "/study-in-italy" },
  { name: "Netherlands", to: "/study-in-netherlands" }, { name: "Malaysia", to: "/study-in-malaysia" },
  { name: "Spain", to: "/study-in-spain" }, { name: "Mauritius", to: "/study-in-mauritius" },
  { name: "Japan", to: "/study-in-japan" }, { name: "China", to: "/study-in-china" },
  { name: "Russia", to: "/study-in-russia" }, { name: "India", to: "/study-in-india" },
];

/* ─────────────────────────────────────────────────────────────────────────────
 * COPY VARIATION
 *
 * There are 480+ location pages. If every one carries byte-identical prose with
 * only the city name swapped, that is the textbook shape of a doorway page, and
 * Google's scaled-content-abuse policy is aimed squarely at it. The usual
 * outcome is not a penalty notice — it is "Crawled – currently not indexed"
 * across the whole set, which wastes the entire exercise.
 *
 * So the opening lines of each major section are picked from a set of genuine
 * alternatives, keyed off a hash of the place slug. Deterministic, so the page
 * is stable between builds and the prerendered HTML matches what the browser
 * renders (a mismatch would cause a React hydration warning). It is not a fix
 * for thin content on its own, but it stops 480 pages looking machine-stamped.
 * ─────────────────────────────────────────────────────────────────────────── */
const hashOf = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};
const pick = <T,>(seed: string, options: T[]): T => options[hashOf(seed) % options.length];

/* ─────────────────────────────────────────────────────────────────────────────
 * VERIFIED EDUCATION LOAN FACTS
 *
 * Every figure below was checked against a primary source and the source is
 * named in `source`, which is rendered on the page. Nothing here is an estimate
 * and nothing here is ours to promise — we are not a lender.
 *
 * If any of this changes, it changes HERE, once, and all 480 pages follow. Do
 * not restate these numbers anywhere else in the codebase.
 *
 * PM-Vidyalaxmi figures: Press Information Bureau, Government of India,
 * "PM Vidyalaxmi Scheme — Promoting Educational Inclusion in India", July 2026.
 * Section 80E: Income Tax Act, 1961.
 * ─────────────────────────────────────────────────────────────────────────── */
const LOAN_FACTS = {
  pmVidyalaxmi: {
    institutions: "1,425 quality higher education institutions (QHEIs) in India, public and private",
    guarantee: "75% credit guarantee from the Government of India on loans up to ₹7.5 lakh",
    subvention: "3% interest subvention on loans up to ₹10 lakh during the moratorium period",
    incomeCeiling: "annual family income up to ₹8 lakh",
    scopeWarning:
      "PM-Vidyalaxmi covers degree and diploma programmes in India only. Foreign institutions, foreign campuses of Indian institutions and Indian campuses of foreign institutions are all outside the scheme — an overseas course has to be funded through a regular education loan instead.",
    portal: "the PM-Vidyalaxmi portal",
    source: "Press Information Bureau, Government of India (July 2026)",
  },
  section80E: {
    what: "Interest paid on an education loan is deductible under Section 80E of the Income Tax Act.",
    limit: "There is no cap on the deductible interest amount, but only interest qualifies — never the principal.",
    duration: "It can be claimed for up to 8 assessment years starting from the year repayment begins, or until the interest is fully repaid, whichever comes first.",
    abroad: "Loans for studying abroad qualify, provided the borrower is an Indian resident and the lender is an Indian bank, financial institution or notified charitable institution.",
    regime: "It is available under the OLD tax regime only. The new regime under Section 115BAC does not allow Section 80E, which is worth modelling before you choose a regime — for a large loan the deduction can outweigh the new regime's lower rates.",
    claimant: "The deduction goes to whoever is legally repaying the loan, so a parent co-applicant repaying it claims it, not the student.",
  },
} as const;

/** What an education loan typically covers. Generic to lenders, not a promise from us. */
const LOAN_COVERS = [
  "Tuition and course fees paid directly to the institution",
  "Hostel, accommodation and reasonable living expenses",
  "Examination, library and laboratory fees",
  "Books, equipment, instruments and a laptop where the course needs one",
  "Caution deposit and refundable institutional deposits, within lender limits",
  "One-way airfare and travel costs (overseas courses)",
  "Student health and travel insurance premiums (overseas courses)",
];

/** The document set lenders ask for. Useful, and it targets a real long-tail query. */
const LOAN_DOCUMENTS = [
  "Admission or offer letter with the full fee structure",
  "Academic records — 10th, 12th, degree marksheets and certificates",
  "English test scorecard where the course requires one",
  "KYC for student and co-applicant — ID, address proof, photographs",
  "Co-applicant income proof — salary slips, Form 16 or ITRs, bank statements",
  "Collateral documents where a secured loan is being taken",
  "A written breakdown of total cost, and what you are funding from your own savings",
];

/* ─── Shared page shell for both state and city pages ─── */
interface LocationView {
  kind: "city" | "state";
  name: string;
  stateName: string;
  state: StateInfo;
  city?: CityInfo;
  title: string;
  description: string;
  h1: string;
  canonical: string;
  indexable: boolean;
  keywords: string[];
  /** Former or alternate names — "Bangalore" for Bengaluru. Often the higher-volume query. */
  aliases: string[];
  siblings: CityInfo[];
}

/**
 * The keyword-intent sections. Each H2 names a real query variant, so one page
 * can rank for "education loan in Mumbai", "student visa consultants in Mumbai"
 * and "study abroad consultants in Mumbai" without needing three pages.
 */
const intentSections = (place: string) => [
  {
    id: "education-loan",
    h2: `Education Loan in ${place} for Studying Abroad`,
    h3: `Overseas education loan — secured, unsecured and collateral-free routes`,
    body: pick(`loan-abroad-${place}`, [
      `Students from ${place} can apply for secured or unsecured education loans through public sector banks, private banks and NBFCs. We help you work out how much you actually need, which lenders suit your profile and co-applicant, what documents each one asks for, and how the sanction letter fits your visa financial proof. Approval, amount, interest rate and collateral requirements are always the lender's decision — never ours.`,
      `Funding is usually the point where a plan made in ${place} either moves forward or stalls. Our job is to make the numbers concrete before you apply anywhere: total cost of the course and living, what your family can fund, what is left to borrow, and which lenders realistically say yes to a profile like yours. Whether the loan needs collateral depends on the amount, the country, the university and your co-applicant — we go through all four with you.`,
      `An education loan application from ${place} is judged on the course and institution, the co-applicant's income and credit history, and whether collateral is on the table. We prepare all three before anything is submitted, because a rushed application that gets declined leaves a record and makes the next lender harder. We are an education loan consultancy, not a lender: we do not sanction, guarantee or price the loan.`,
    ]),
    points: [
      "Work out your real funding gap before applying anywhere",
      "Compare secured, unsecured and collateral-free routes",
      "Co-applicant income and credit documentation",
      "Loan sanction letter timed for your visa file",
      "Disbursement schedule matched to fee deadlines",
      "Forex and fee-transfer guidance at disbursement",
    ],
    to: "/financial-assistance",
    cta: "Education loan guidance",
  },
  {
    id: "education-loan-india",
    h2: `Education Loan for Studying in India from ${place}`,
    h3: `Domestic education loan in ${place} — PM-Vidyalaxmi, collateral-free loans and interest subvention`,
    body: pick(`loan-india-${place}`, [
      `Not every student from ${place} is going abroad, and a domestic education loan is a different product with different rules. If your college is one of the ${LOAN_FACTS.pmVidyalaxmi.institutions}, PM-Vidyalaxmi gives you a route with no collateral and no guarantor — ${LOAN_FACTS.pmVidyalaxmi.guarantee}, and ${LOAN_FACTS.pmVidyalaxmi.subvention} if your ${LOAN_FACTS.pmVidyalaxmi.incomeCeiling}. We check whether your institution is on the list before you apply, because that single fact decides which scheme you are even eligible for.`,
      `We handle education loans for courses inside India as well as overseas ones. For a student from ${place} joining an Indian college, the first question is whether that institution is among the ${LOAN_FACTS.pmVidyalaxmi.institutions} — if it is, PM-Vidyalaxmi means no collateral and no guarantor, with ${LOAN_FACTS.pmVidyalaxmi.guarantee} and ${LOAN_FACTS.pmVidyalaxmi.subvention} where ${LOAN_FACTS.pmVidyalaxmi.incomeCeiling}. If it is not, a regular bank education loan is still available and we help you compare lenders on it.`,
      `A domestic education loan is often the cheaper and simpler route, and students from ${place} frequently do not know it exists as a distinct scheme. PM-Vidyalaxmi carries ${LOAN_FACTS.pmVidyalaxmi.guarantee}, needs no guarantor, and adds ${LOAN_FACTS.pmVidyalaxmi.subvention} for families with ${LOAN_FACTS.pmVidyalaxmi.incomeCeiling} — but only for the ${LOAN_FACTS.pmVidyalaxmi.institutions}. We tell you plainly whether your college qualifies rather than letting you find out after applying.`,
    ]),
    points: [
      "Check whether your Indian institution is a covered QHEI",
      `Education loan without guarantor in ${place} — the collateral-free route`,
      "Interest subvention eligibility against family income",
      "Regular bank education loan if the scheme does not apply",
      "Help using the national application portal",
      "Section 80E tax position explained before you borrow",
    ],
    to: "/financial-assistance",
    cta: "Domestic education loan guidance",
  },
  {
    id: "student-visa",
    h2: `Student Visa Assistance in ${place}`,
    h3: `Student visa assistance in ${place} — UK, Canada, USA, Australia and Schengen files`,
    body: pick(`visa-${place}`, [
      `Visa rules differ by destination and change often. For students in ${place} we run the whole preparation online — document checklist for your specific country and visa category, financial evidence, application review, and interview practice where the destination requires it. Your loan sanction letter and bank statements are usually the part that gets a file refused, so we check the financial evidence against the current rule for your destination rather than a general checklist.`,
      `Most refusals are not dramatic. A file from ${place} gets turned down because the funds were not held long enough, because the sponsor relationship was not documented, or because the sanction letter says something slightly different to the offer letter. We go through the financial evidence line by line against the rule in force for your destination on the day you apply, then review the completed application before it is submitted.`,
      `A student visa file is a financial argument as much as an academic one, and the rules behind it move — maintenance amounts, holding periods and accepted evidence all change without much notice. For students in ${place} we prepare the whole thing remotely: the checklist for your exact country and visa category, the money trail, a full review before submission, and interview practice where the destination still requires one.`,
    ]),
    points: [
      "Country-specific document checklists",
      "Financial proof preparation",
      "Application review before submission",
      "Mock interviews where required",
    ],
    to: "/visa-assistance",
    cta: "Student visa assistance",
  },
  {
    id: "university-admission",
    h2: `University Admission Guidance in ${place}`,
    h3: `Abroad admission consultants in ${place} for MS, MBA, MBBS, nursing and PhD applications`,
    body: pick(`admission-${place}`, [
      `From shortlisting universities that genuinely match your profile to SOP and LOR guidance, application submission and comparing the offers you receive. We build a balanced shortlist rather than encouraging you to apply everywhere. Course-wise, the students we work with from ${place} most often apply for MS and MEng programmes, MBA and management courses, MBBS and nursing abroad, and research degrees.`,
      `A shortlist is where most of the outcome is decided, and applying to twelve universities is not a strategy — it is an admission fee bill. For students from ${place} we build a spread with genuine ambitious, target and fallback options, then work on the parts that actually move a decision: a statement of purpose that argues for you specifically, references that say something, and an eligibility check against each university's own rules rather than a generic one.`,
      `Admissions work from ${place} runs on the same sequence every time: check what you are actually eligible for, build a shortlist that is not all reach or all safety, write an SOP that answers the question the university is asking, and then compare the offers on total cost and post-study outcomes rather than on ranking alone. MS and MEng, MBA and management, MBBS and nursing, and research degrees are the routes we see most.`,
    ]),
    points: [
      "Ambitious, target and alternative shortlist",
      `MS abroad consultants in ${place} — engineering, computing and science routes`,
      `MBA abroad consultants in ${place} — one-year and two-year programmes`,
      "SOP and LOR guidance",
      "Eligibility and entry requirement checks",
      "MBBS abroad eligibility including NMC rules",
      "Nursing and allied health course routes",
      "Offer letter comparison",
    ],
    to: "/admission-guidance",
    cta: "Admission guidance",
  },
  {
    id: "scholarships",
    h2: `Scholarship Guidance in ${place}`,
    h3: `Study abroad scholarships for ${place} students — merit, need-based and university awards`,
    body: pick(`scholarship-${place}`, [
      `University, government and external scholarships all carry different eligibility rules and deadlines — several of which close before university application deadlines. We help you find awards you genuinely qualify for and prepare stronger applications for them. A scholarship reduces what you have to borrow, so it is worth sorting before the loan, not after.`,
      `Every rupee of scholarship is a rupee you do not borrow and do not repay with interest, which is why we look at awards before the loan rather than after it. The catch for students from ${place} is timing: a good number of the larger scholarships close their applications weeks before the university's own deadline, so a student who waits for an offer letter has already missed them.`,
      `Scholarship applications reward specificity, and most are lost to a generic essay rather than to weak grades. We screen which university, government and external awards you genuinely qualify for — there is no point spending a week on one that rules you out on residency or on course type — then work on the statement itself. Applying from ${place} makes no difference to eligibility for the overwhelming majority of them.`,
    ]),
    points: [
      `Scholarship consultants in ${place} for university and government awards`,
      "Eligibility screening before you apply",
      "Essay and statement guidance",
      "Deadline tracking against application deadlines",
    ],
    to: "/scholarship-assistance",
    cta: "Scholarship assistance",
  },
  {
    id: "tests-and-stay",
    h2: `IELTS Guidance in ${place} and Test Preparation for Study Abroad`,
    h3: `IELTS PTE TOEFL help in ${place}, plus finding a place to live`,
    body: pick(`tests-${place}`, [
      `Most destinations need an English test score, and several courses need GRE or GMAT as well. We tell you which test your specific course and visa route actually requires — students routinely sit the wrong one — and help you plan the date so the score lands before the application deadline. Accommodation guidance covers university halls, private student housing and shared rentals, including what a deposit and a guarantor mean in each country.`,
      `Two avoidable mistakes cost students from ${place} an entire intake: sitting a test the visa route does not accept, and booking it so late that the score arrives after the deadline. The university's requirement and the immigration authority's requirement are not always the same test, so we confirm both before you pay for anything. On accommodation, we cover halls, purpose-built student housing and shared rentals, and what a deposit and a guarantor actually commit you to in each country.`,
      `Which English test you need depends on the course and on the visa route, and those two can disagree — a score a university accepts is not automatically one the immigration authority accepts. We check both, work out whether you are exempt (many students are and sit the test anyway), and plan the date backwards from the application deadline. Once an offer is in hand, accommodation is the next thing with a queue: halls, private student housing and shared rentals each have different deposit and guarantor terms.`,
    ]),
    points: [
      "Which English test your course and visa require",
      `GRE GMAT guidance in ${place}, including whether you are exempt`,
      `Student accommodation help in ${place} once you have an offer`,
      "Test date planned around application deadlines",
      "University halls versus private accommodation",
      "Deposit, guarantor and contract terms explained",
    ],
    to: "/test-preparations",
    cta: "Test preparation guidance",
  },
];

const buildFaqs = (v: LocationView) => {
  const place = v.name;
  const scheme = v.state.scheme;
  return [
    {
      q: `Do you provide study abroad counselling in ${place}?`,
      a: `Yes. We work with students across ${v.kind === "city" ? `${place} and the rest of ${v.stateName}` : place} entirely online — video counselling, document review and application support — so you do not need to travel to an office.`,
    },
    {
      q: `Can students from ${place} get an education loan for studying abroad?`,
      a: `Eligible students can apply for education loans through banks and NBFCs, secured or unsecured, subject to the lender's criteria. Approval, amount, interest rate and collateral requirements are decided by the lender, not by us.${scheme ? ` Students domiciled in ${v.stateName} may also be able to explore the ${scheme.name}.` : ""}`,
    },
    {
      q: `Is there a ${v.stateName} government scheme for education loans?`,
      a: scheme
        ? `${v.stateName} runs the ${scheme.name}, administered by ${scheme.administrator}. ${scheme.benefit} Eligibility: ${scheme.eligibility} Confirm current terms with the administering department before applying.`
        : `We could not verify a current ${v.stateName}-specific education loan or interest subsidy scheme from a reliable public source. Central schemes such as the Credit Guarantee Fund Scheme for Education Loans and the Dr. Ambedkar Interest Subsidy Scheme may still apply. Check your state's Social Welfare or Higher Education department for anything state-specific — we will not quote figures we cannot verify.`,
    },
    {
      q: `Who are the best study abroad consultants in ${place}?`,
      a: pick(`faq-best-${place}`, [
        `There is no single "best" consultant — it depends on your course, destination and budget. What matters is whether the advice is tied to your profile rather than to a partner list, whether costs and requirements are explained honestly, and whether the same team supports you through admission, funding and the visa. Start with a free consultation and judge the advice before you commit to anyone.`,
        `Nobody can answer that honestly, including us. A consultant who is excellent for a Canadian diploma may be the wrong choice for a German public university or an MBBS route. Judge on three things instead: does the shortlist follow your profile or their commission, are the costs and refusal risks stated plainly, and does one team carry you through admission, funding and the visa rather than handing you on. A free first consultation is enough to test all three.`,
        `Treat any firm that calls itself the best in ${place} with some suspicion — there is no ranking body and no way to verify it. The questions worth asking are whether they will show you universities they earn nothing from, whether they will tell you the risks of your plan and not only the upside, and whether the person handling your loan file is the same person who handled your admission. Ask those in a free consultation before you pay anyone.`,
      ]),
    },
    {
      q: `How much education loan can a student from ${place} get for studying abroad?`,
      a: pick(`faq-amount-${place}`, [
        `The amount depends on the lender, your course and university, your co-applicant's income and credit profile, and whether you can offer collateral. Secured loans generally allow higher amounts than unsecured ones. We help you estimate a realistic figure before you approach lenders, but only the lender can sanction it.`,
        `Four things set the ceiling: which lender you go to, which course and university you have an offer from, what your co-applicant earns and how their credit record looks, and whether there is collateral on the table. A secured loan will generally stretch further than an unsecured one. We will give you a realistic working figure before you approach anyone from ${place}, but the sanctioned amount is the lender's decision alone.`,
        `There is no fixed figure, and any consultant quoting one before seeing your file is guessing. Lenders size an overseas education loan against the total cost of your specific course, your co-applicant's income and credit history, and whether collateral is offered — an unsecured loan is normally capped lower than a secured one. We work out what you actually need and what you can realistically expect to be sanctioned, then you apply. The sanction itself is never ours to give.`,
      ]),
    },
    {
      q: `Do you help with education loans for studying in India, or only for abroad?`,
      a: `Both. Plenty of students from ${place} are joining an Indian college rather than going overseas, and that is a different loan with different rules. If your institution is among the ${LOAN_FACTS.pmVidyalaxmi.institutions}, PM-Vidyalaxmi applies — no collateral, no guarantor, ${LOAN_FACTS.pmVidyalaxmi.guarantee}, and ${LOAN_FACTS.pmVidyalaxmi.subvention} where ${LOAN_FACTS.pmVidyalaxmi.incomeCeiling}. If it is not on that list, a regular bank education loan is still available. Note that PM-Vidyalaxmi does not cover foreign institutions at all, so an overseas course has to go the regular route.`,
    },
    {
      q: `Can I get an education loan in ${place} without collateral or a guarantor?`,
      a: `For a course in India at a covered institution, yes — PM-Vidyalaxmi is specifically a collateral-free and guarantor-free scheme, with ${LOAN_FACTS.pmVidyalaxmi.guarantee}. For a course abroad, unsecured education loans do exist and are common, but the decision rests almost entirely on your co-applicant's income and credit history, and the amount is usually lower than on a secured loan. A co-applicant is still required. Whether any particular lender will approve you without collateral is their call, not ours.`,
    },
    {
      q: `Which banks or NBFCs give education loans to students from ${place}?`,
      a: `Public sector banks, private banks and specialist education-loan NBFCs all lend nationally, so a student in ${place} has the same set of options as one in a metro. We will not publish a "preferred lender" list, because we do not take commission from lenders and the right one genuinely depends on your amount, your destination, whether you have collateral and how fast you need the sanction. We shortlist against your profile and tell you the trade-offs.`,
    },
    {
      q: `Do you charge a fee for education loan help in ${place}?`,
      a: `No. Education loan guidance is part of the counselling we already provide, and the first consultation is free. We are not a lending agent and we take no percentage of your loan. If anyone asks you for a fee to "get your loan approved", treat that as a warning sign.`,
    },
    {
      q: `Is the interest on an education loan tax-deductible?`,
      a: `${LOAN_FACTS.section80E.what} ${LOAN_FACTS.section80E.limit} ${LOAN_FACTS.section80E.duration} ${LOAN_FACTS.section80E.abroad} ${LOAN_FACTS.section80E.claimant} ${LOAN_FACTS.section80E.regime} This is general information, not tax advice — confirm your own position with a qualified professional.`,
    },
    {
      q: `How long does an education loan take to get sanctioned?`,
      a: `It varies by lender and by route, and the biggest variable is you rather than the bank: a complete file with the offer letter, academics, KYC, co-applicant income proof and collateral papers ready moves far faster than one assembled in pieces. Secured loans take longer than unsecured ones because the property or deposit has to be valued and verified. Start the loan process as soon as you have an offer letter, not after you book a visa appointment.`,
    },
    {
      q: `Is there an education loan agency in ${place} that also handles admission and the visa?`,
      a: `That is exactly how we work. The same counsellor handles course and university selection, the admission application, the loan file and the visa documentation for students from ${place}, because those pieces depend on each other — the university's fee structure sets the loan amount, and the loan sanction letter is what your visa financial evidence rests on. Splitting them across separate agencies is where deadlines usually slip.`,
    },
    {
      q: `Which countries do you help students from ${place} apply to?`,
      a: `The UK, USA, Canada, Australia, New Zealand, Germany, Ireland, France, Italy, the Netherlands, Switzerland, Singapore, Malaysia, Dubai/UAE and Mauritius.`,
    },
    {
      q: `Do you charge for the first consultation?`,
      a: `No. The initial career and study abroad consultation is free, whether you are in ${place} or anywhere else in India.`,
    },
    {
      q: `Do you guarantee admission or a visa for students from ${place}?`,
      a: `No. Admission decisions rest with universities and visa decisions with the relevant immigration authority, each under their own criteria. We prepare and support your application; we cannot guarantee its outcome.`,
    },
  ];
};

const LocationView = ({ view }: { view: LocationView }) => {
  const [form, setForm] = useState({ fullName: "", mobile: "", email: "", course: "", country: "", intake: "" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const faqs = buildFaqs(view);
  const scheme = view.state.scheme;
  const abs = `${SITE.domain}${view.canonical}`;
  const inputCls = "w-full text-sm p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors";

  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "WebPage",
      name: view.title, description: view.description, url: abs, inLanguage: "en-IN",
      isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.domain },
      about: {
        "@type": "Place",
        name: view.name,
        // alternateName is how a search engine or an assistant learns that this
        // page IS the Bangalore page, so the old name consolidates onto this
        // entity instead of looking like a different place.
        ...(view.aliases.length ? { alternateName: view.aliases } : {}),
        address: { "@type": "PostalAddress", addressRegion: view.stateName, addressCountry: "IN" },
      },
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE.domain}/locations` },
        ...(view.kind === "city"
          ? [{ "@type": "ListItem", position: 3, name: view.stateName, item: `${SITE.domain}${stateUrl(view.state.slug)}` },
             { "@type": "ListItem", position: 4, name: view.name, item: abs }]
          : [{ "@type": "ListItem", position: 3, name: view.name, item: abs }]),
      ],
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      /**
       * One Service node with an offer catalogue, rather than one node per
       * service. An AI assistant asked "who helps with education loans in
       * <place>" reads the catalogue and gets a direct answer; nine separate
       * Service nodes on one page just look like keyword spam to a validator.
       *
       * serviceType names the advisory service, not a financial product. We do
       * not lend, so nothing here is typed as a FinancialProduct or Loan — that
       * would misrepresent what is on offer.
       */
      "@context": "https://schema.org", "@type": "Service",
      name: `Study abroad and education loan consultancy in ${view.name}`,
      serviceType: "Education consultancy and education loan advisory",
      description: view.description,
      provider: {
        "@type": "EducationalOrganization",
        name: SITE.name,
        url: SITE.domain,
        telephone: CONTACT.phone,
        ...(CONTACT.emailVerified && CONTACT.email ? { email: CONTACT.email } : {}),
      },
      areaServed: {
        "@type": "Place",
        name: `${view.name}, ${view.kind === "city" ? view.stateName + ", " : ""}India`,
        address: {
          "@type": "PostalAddress",
          addressLocality: view.kind === "city" ? view.name : undefined,
          addressRegion: view.stateName,
          addressCountry: "IN",
        },
      },
      audience: { "@type": "EducationalAudience", educationalRole: "student" },
      isRelatedTo: [
        { "@type": "Service", name: `Education loan guidance for studying abroad from ${view.name}` },
        { "@type": "Service", name: `Education loan guidance for studying in India from ${view.name}` },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Services for students in ${view.name}`,
        itemListElement: [
          `Education loan guidance for studying abroad from ${view.name}`,
          `Education loan guidance for studying in India from ${view.name}`,
          `Collateral-free and unsecured education loan guidance in ${view.name}`,
          `Scholarship assistance for ${view.name} students`,
          `University admission guidance in ${view.name}`,
          `Student visa assistance in ${view.name}`,
          `IELTS, PTE, TOEFL, GRE and GMAT test preparation guidance in ${view.name}`,
          `Student accommodation guidance in ${view.name}`,
          `Travel, forex and student insurance guidance in ${view.name}`,
          `Free career counselling in ${view.name}`,
        ].map(name => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
          // The first consultation genuinely is free. Stated as a price so an
          // assistant summarising the page can repeat it accurately.
          priceSpecification: {
            "@type": "PriceSpecification",
            price: 0,
            priceCurrency: "INR",
            description: "Initial consultation and guidance at no charge",
          },
        })),
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead
        title={view.title}
        description={view.description}
        canonicalUrl={view.canonical}
        keywords={view.keywords}
        noIndex={!view.indexable}
        jsonLd={jsonLd}
      />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gradient-subtle border-b pt-20">
          <div className="container mx-auto px-4 py-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/locations" className="hover:text-primary transition-smooth">Locations</Link>
              {view.kind === "city" && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <Link to={stateUrl(view.state.slug)} className="hover:text-primary transition-smooth">{view.stateName}</Link>
                </>
              )}
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">{view.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{view.kind === "city" ? `${view.name}, ${view.stateName}` : view.name}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3">{view.h1}</h1>
              {/* The old name in real body copy, not just a meta tag — this is
                  what lets the page answer "…in Bangalore" as well as
                  "…in Bengaluru" without a second competing URL. */}
              {view.aliases.length > 0 && (
                <p className="text-sm text-muted-foreground mb-4">
                  Also searched as{" "}
                  {view.aliases.map((a, i) => (
                    <span key={a}>
                      {i > 0 && " or "}
                      <strong className="font-semibold text-foreground">{a}</strong>
                    </span>
                  ))}
                  {" "}— if you are looking for study abroad consultants in {view.aliases[0].toLowerCase()}{" "}
                  or an education loan in {view.aliases[0].toLowerCase()}, this is the same page.
                </p>
              )}
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                {pick(`hero-${view.name}`, [
                  <>
                    We guide students {view.kind === "city" ? <>in {view.name} and across {view.stateName}</> : <>across {view.name}</>} through
                    every stage — choosing a course and country, shortlisting universities,
                    arranging an <strong className="font-semibold text-foreground">education loan for studying abroad or in India</strong>,
                    applying for scholarships, preparing the student visa and sorting accommodation.
                  </>,
                  <>
                    Course choice, admission, funding and the visa are one connected problem, and we
                    handle all of it for students {view.kind === "city" ? <>in {view.name} and the rest of {view.stateName}</> : <>across {view.name}</>} —
                    including <strong className="font-semibold text-foreground">education loans for overseas courses and for colleges inside India</strong>,
                    scholarships, and accommodation once you have an offer.
                  </>,
                  <>
                    From the first "where should I even apply" conversation to the day you fly, we
                    work with students {view.kind === "city" ? <>in {view.name} and across {view.stateName}</> : <>across {view.name}</>} on
                    university shortlisting, admissions, scholarships, the student visa file, and
                    <strong className="font-semibold text-foreground"> education loan guidance for both abroad and domestic courses</strong>.
                  </>,
                ])}
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                As overseas education consultants in {view.name}, we work online, so you get the same support
                whether you are in {view.kind === "city" ? view.name : view.state.capital} or a smaller town nearby.
                The first meeting is free study abroad counselling in {view.name} with no obligation — and we
                are not a lender, so we take no commission on your loan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-semibold px-8 py-6 rounded-xl w-full sm:w-auto" asChild>
                  <a href="#enquiry">Get Free Counselling<ArrowRight className="w-5 h-5 ml-2" /></a>
                </Button>
                <Button size="lg" variant="outline" className="font-semibold px-8 py-6 rounded-xl w-full sm:w-auto" asChild>
                  <a href={`tel:${CONTACT.phone}`}><Phone className="w-5 h-5 mr-2" />{CONTACT.phoneDisplay}</a>
                </Button>
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src={locationHero}
                alt={`Students from ${view.name} planning to study abroad with DreamDestination`}
                width={640}
                height={427}
                loading="eager"
                className="rounded-2xl shadow-elegant w-full h-auto object-cover"
              />
            </div>
            </div>
          </div>
        </section>

        {/* State scheme — the genuinely local part */}
        <section className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
                Education Loan in {view.stateName} — State Schemes and Central Support
              </h2>

              {scheme ? (
                <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft">
                  <div className="flex items-start gap-3 mb-4">
                    <Building2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-extrabold text-base">{scheme.name}</h3>
                      <p className="text-xs text-muted-foreground">Administered by {scheme.administrator}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{scheme.benefit}</p>
                  <div className="bg-muted/60 rounded-xl p-4 mb-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-primary mb-1">Eligibility</p>
                    <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    Figures are indicative and change. Confirm current terms with {scheme.administrator} before applying —
                    we do not administer this scheme and cannot approve or guarantee it.
                  </p>
                </div>
              ) : (
                <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <h3 className="font-extrabold text-base">No verified {view.stateName} scheme on record</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    We could not verify a current {view.stateName}-specific education loan or interest subsidy scheme
                    from a reliable public source, so we are not going to quote one. Several states do run schemes that
                    are poorly documented online — check your state's Social Welfare or Higher Education department
                    directly, and tell us what you find so we can help you use it.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Central schemes may still apply regardless of state — including the Credit Guarantee Fund Scheme
                    for Education Loans (CGFSEL) and the Dr. Ambedkar Interest Subsidy Scheme for OBC and EBC students.
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/financial-assistance" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  Education loan guidance <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/scholarship-assistance" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  Scholarship assistance <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Keyword-intent sections: education loan / visa / admission / scholarships, named for this place */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {intentSections(view.name).map(sec => (
                <article key={sec.id} id={sec.id} className="bg-card border rounded-2xl p-6 md:p-8 shadow-soft">
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2">{sec.h2}</h2>
                  {/* The H3 carries a second query variant, so one section can answer
                      "education loan in <place>" and "collateral free education loan
                      in <place>" without a second page competing for the first. */}
                  <h3 className="text-sm font-semibold text-primary mb-3">{sec.h3}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{sec.body}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                    {sec.points.map(pt => (
                      <div key={pt} className="flex items-start gap-2 p-2.5 bg-muted/60 rounded-lg text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={sec.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                    {sec.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/*
          EDUCATION LOAN DETAIL BLOCK

          This is the part that earns the "education loan in <place>" query. The
          two intent sections above establish that we help with loans; this
          answers the questions somebody with that query actually has — what it
          covers, what documents they need, which scheme applies to a course in
          India versus abroad, and what the tax position is.

          Every figure comes from LOAN_FACTS, which names its source. Nothing
          here is a rate, an approval, or a promise: we are not a lender, and a
          page that implies otherwise would be both dishonest and, for a
          financial product, a regulatory problem.
        */}
        <section id="education-loan-detail" className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                Education Loan Guidance in {view.name} — For India and Abroad
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-3xl">
                {pick(`loan-detail-${view.name}`, [
                  `Two different products get called "education loan", and mixing them up costs students from ${view.name} months. A course inside India may qualify for a central scheme with no collateral and no guarantor. A course abroad does not qualify for that scheme at all and needs a regular education loan, usually larger and often secured. Here is how each one actually works.`,
                  `Whether you are joining a college in India or a university overseas changes which loan you should even be applying for. Students from ${view.name} regularly approach the wrong product first, get declined, and then find the right one harder to get. The distinction below is the single most useful thing on this page.`,
                  `Before you approach any bank from ${view.name}, be clear which of the two routes you are on: a domestic course under the central scheme, or an overseas course on a regular education loan. The eligibility rules, the collateral question and the paperwork are different for each.`,
                ])}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {/* Domestic — PM-Vidyalaxmi */}
                <div className="bg-card border rounded-2xl p-6 md:p-7 shadow-soft">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <School className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base leading-snug">
                        Education loan for studying in India
                      </h3>
                      <p className="text-xs text-muted-foreground">PM-Vidyalaxmi — central government scheme</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 mb-4">
                    {[
                      `Covers ${LOAN_FACTS.pmVidyalaxmi.institutions}`,
                      `No collateral and no third-party guarantor required`,
                      LOAN_FACTS.pmVidyalaxmi.guarantee,
                      LOAN_FACTS.pmVidyalaxmi.subvention,
                      `Subvention needs ${LOAN_FACTS.pmVidyalaxmi.incomeCeiling}`,
                      `Applications go through ${LOAN_FACTS.pmVidyalaxmi.portal}`,
                    ].map(pt => (
                      <li key={pt} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 mb-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {LOAN_FACTS.pmVidyalaxmi.scopeWarning}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground italic">
                    Source: {LOAN_FACTS.pmVidyalaxmi.source}. Terms change — confirm current
                    eligibility on the official portal before applying.
                  </p>
                </div>

                {/* Overseas */}
                <div className="bg-card border rounded-2xl p-6 md:p-7 shadow-soft">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Globe2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base leading-snug">
                        Education loan for studying abroad
                      </h3>
                      <p className="text-xs text-muted-foreground">Banks, NBFCs and international lenders</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 mb-4">
                    {[
                      "Secured route — backed by property or fixed deposits, usually the lowest rate and highest amount",
                      `Unsecured education loan in ${view.name} — no collateral, decided mainly on the co-applicant's income and credit history`,
                      `Collateral free education loan in ${view.name} where the lender's criteria allow it`,
                      "A co-applicant is required either way: parent, guardian or spouse",
                      "Repayment holiday through the course plus a lender-set period, typically six to twelve months",
                      "Sanction letter doubles as visa financial evidence, so timing matters",
                      "Disbursement is normally staged against fee deadlines, not paid in one go",
                    ].map(pt => (
                      <li key={pt} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-muted/60 rounded-xl p-3.5">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Interest rate, sanctioned amount, collateral requirement and processing
                      time are set by each lender and vary with your profile. We will not quote
                      you a rate — anyone who quotes one before seeing your documents is guessing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Covers + documents */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-card border rounded-2xl p-6 shadow-soft">
                  <div className="flex items-center gap-2.5 mb-4">
                    <Banknote className="w-5 h-5 text-primary" />
                    <h3 className="font-extrabold text-base">What an education loan covers</h3>
                  </div>
                  <ul className="space-y-2">
                    {LOAN_COVERS.map(pt => (
                      <li key={pt} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-1" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground italic mt-4">
                    What is actually included differs by lender and by scheme. Get the inclusion
                    list in writing before you sign anything.
                  </p>
                </div>

                <div className="bg-card border rounded-2xl p-6 shadow-soft">
                  <div className="flex items-center gap-2.5 mb-4">
                    <ListChecks className="w-5 h-5 text-primary" />
                    <h3 className="font-extrabold text-base">
                      Documents required for an education loan
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {LOAN_DOCUMENTS.map(pt => (
                      <li key={pt} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <FileText className="w-3.5 h-3.5 text-primary shrink-0 mt-1" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground italic mt-4">
                    We put this file together with you before anything is submitted, because an
                    incomplete application is the most common reason a sanction is delayed.
                  </p>
                </div>
              </div>

              {/* Tax */}
              <div className="bg-card border rounded-2xl p-6 md:p-7 shadow-soft mb-8">
                <div className="flex items-center gap-2.5 mb-4">
                  <Receipt className="w-5 h-5 text-primary" />
                  <h3 className="font-extrabold text-base">
                    Tax relief on education loan interest — Section 80E
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    LOAN_FACTS.section80E.what,
                    LOAN_FACTS.section80E.limit,
                    LOAN_FACTS.section80E.duration,
                    LOAN_FACTS.section80E.abroad,
                    LOAN_FACTS.section80E.claimant,
                    LOAN_FACTS.section80E.regime,
                  ].map(pt => (
                    <p key={pt} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </p>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground italic mt-4">
                  General information under the Income Tax Act, 1961 — not tax advice. We are not
                  tax advisers; check your own position with a qualified professional before
                  choosing a tax regime.
                </p>
              </div>

              {/* Honest disclosure + links */}
              <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 md:p-7">
                <div className="flex items-start gap-3 mb-4">
                  <Landmark className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-extrabold text-base mb-1">
                      What we do, and what we do not do
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      DreamDestination is an education consultancy, not a bank, an NBFC or a
                      lending agent. We help students from {view.name} decide how much to borrow,
                      pick the right scheme, prepare a complete application and keep the sanction
                      on schedule for fee and visa deadlines. We do not sanction loans, set
                      interest rates, take a cut of your loan, or guarantee approval — every one
                      of those sits with the lender.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 pt-4 border-t">
                  <Link to="/financial-assistance" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                    Education loan in {view.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/scholarship-assistance" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                    Scholarships for {view.name} students <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/admission-guidance" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                    Admission guidance in {view.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="#enquiry" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                    Talk to a counsellor <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">
              What We Help {view.name} Students With
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-sm">
              Every service below is delivered online, end to end.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {SERVICE_ROUTES.map(s => {
                const Icon = SERVICE_ICONS[s.to] ?? Compass;
                return (
                  <Link key={s.to} to={s.to} className="bg-card border rounded-2xl p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{s.label}</h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
          STUDY ABROAD DESTINATIONS — RICH INTERNAL LINKING

          This replaces the old button grid with descriptive country blocks.
          Each block carries:
            – the city name + "study in [country]"  (geo + destination intent)
            – education loan mention                (loan intent)
            – 2-3 college names                     (university intent)
            – cost range                            (fees intent)
            – visa route                            (visa intent)
            – an internal Link to /study-in-{slug}  (internal linking)

          The paragraphs are varied per location via pick() to avoid the
          doorway-page pattern across 480+ pages.
        ────────────────────────────────────────────────────────────────── */}
        <section id="study-abroad-destinations" className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                Study Abroad from {view.name} — Countries, Education Loans &amp; Top Colleges
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-3xl">
                {pick(`dest-intro-${view.name}`, [
                  `Students from ${view.name} planning to study abroad can access education loan guidance, university admission support and student visa assistance for courses across the UK, USA, Canada, Australia, Germany, France, Ireland, New Zealand, Dubai, Italy, Singapore, Malaysia, the Netherlands, Switzerland, Spain, Mauritius, Japan, China, Russia and India. Here is what each destination offers and how DreamDestination helps.`,
                  `Whether you are considering a masters in the UK, an MBA in Canada, engineering in Germany or MBBS in Russia, students from ${view.name} have access to education loan guidance and admission support for all major study-abroad destinations. Browse each country below to see top colleges, tuition ranges and visa routes.`,
                  `From ${view.name}, students travel to over twenty countries for higher education. Each destination below includes the colleges we guide admissions for, the education loan routes available, tuition cost ranges and the visa process — along with a direct link to our detailed country page.`,
                ])}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {COUNTRY_LINKS.filter(c => c.slug !== "india").map((country) => (
                  <article
                    key={country.slug}
                    className="bg-card border rounded-2xl p-5 md:p-6 shadow-soft hover:shadow-elegant hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl shrink-0" aria-hidden="true">{country.flag}</span>
                      <div className="min-w-0">
                        <Link
                          to={country.route}
                          className="font-extrabold text-base hover:text-primary transition-colors"
                        >
                          Study in {country.displayName} from {view.name}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Tuition: {country.avgCost} · {country.visa}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {pick(`${country.slug}-${view.name}`, [
                        `For students from ${view.name} looking at ${country.displayName}, top universities include ${country.topColleges.slice(0, 3).join(", ")}. ${country.loanNote} Tuition typically runs ${country.avgCost}. Popular programmes include ${country.keyPrograms.join(", ")}. ${country.scholarshipHighlight} may be available.`,
                        `${country.displayName} is a popular choice among ${view.name} students, with institutions like ${country.topColleges.slice(0, 2).join(" and ")} offering world-class programmes in ${country.keyPrograms.join(", ")}. ${country.loanNote} After graduating, students can benefit from ${country.postStudyWork.toLowerCase()}.`,
                        `Students from ${view.name} considering ${country.displayName} can explore programmes at ${country.topColleges[0]} and ${country.topColleges.length > 1 ? country.topColleges[1] : country.topColleges[0]}, among others. ${country.loanNote} The ${country.visa.toLowerCase()} process and ${country.scholarshipHighlight.toLowerCase()} are covered in our detailed guide.`,
                      ])}
                    </p>

                    <Link
                      to={country.route}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      Explore studying in {country.displayName} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </article>
                ))}
              </div>

              {/* India — domestic education loan guidance */}
              <div className="mt-6 bg-card border-2 border-primary/20 rounded-2xl p-5 md:p-6 shadow-soft">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl shrink-0" aria-hidden="true">🇮🇳</span>
                  <div>
                    <Link
                      to="/study-in-india"
                      className="font-extrabold text-base hover:text-primary transition-colors"
                    >
                      Education Loan for Studying in India from {view.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Tuition: ₹2-25L/year · PM-Vidyalaxmi Scheme
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {pick(`india-${view.name}`, [
                    `Students from ${view.name} pursuing courses at IITs, IIMs, AIIMS and other premier Indian institutions can access education loan guidance for domestic programmes. The PM-Vidyalaxmi scheme covers loans without collateral or guarantor for eligible institutions. We help you compare secured, unsecured and government-backed routes.`,
                    `For ${view.name} students choosing to study within India, education loans are available for IIT, IIM, AIIMS and other top colleges. The PM-Vidyalaxmi scheme and Vidya Lakshmi portal simplify applications. DreamDestination guides you through scheme eligibility, documentation and the right lender for your programme.`,
                    `Planning to study at a premier Indian institution from ${view.name}? Education loan options include the PM-Vidyalaxmi scheme (no collateral, no guarantor for covered colleges), bank loans through the Vidya Lakshmi portal, and private lender routes. We help you pick the right one and prepare a complete application.`,
                  ])}
                </p>
                <Link
                  to="/study-in-india"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Explore studying in India <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick-access destination pills — all countries */}
              <div className="mt-8">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">All Destinations</p>
                <div className="flex flex-wrap gap-2">
                  {DESTINATIONS.map(d => (
                    <Link key={d.to} to={d.to} className="px-3.5 py-2 rounded-xl bg-card border text-xs font-semibold shadow-soft hover:border-primary/40 hover:text-primary transition-all">
                      Study in {d.name}
                    </Link>
                  ))}
                  <Link to="/countries" className="px-3.5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                    All destinations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby / cities in state */}
        {view.siblings.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                  {view.kind === "city" ? `Other Cities We Cover in ${view.stateName}` : `Cities We Cover in ${view.name}`}
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  {view.kind === "city"
                    ? `Students from across ${view.stateName} work with us online.`
                    : `${view.name}'s capital is ${view.state.capital}. We support students in these cities and the towns around them.`}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {view.siblings.map(c => (
                    <Link key={c.slug} to={cityUrl(c.slug)} className="px-3.5 py-2 rounded-xl bg-card border text-xs font-semibold shadow-soft hover:border-primary/40 hover:text-primary transition-all">
                      {c.name}
                    </Link>
                  ))}
                </div>
                {view.kind === "city" && (
                  <Link to={stateUrl(view.state.slug)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline mt-6">
                    All of {view.stateName} <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Enquiry */}
        <section id="enquiry" className="py-16 bg-muted/40 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto bg-card border-2 border-primary/25 rounded-3xl p-6 md:p-9 shadow-elegant">
              <h2 className="text-xl md:text-2xl font-extrabold text-center mb-2">
                Free Counselling for {view.name} Students
              </h2>
              <p className="text-xs text-muted-foreground text-center mb-7">
                Tell us where you are in your plan and a counsellor will call you back.
              </p>
              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-7 text-center space-y-3">
                  <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                  <h3 className="text-xl font-bold">Request Received</h3>
                  <p className="text-sm text-muted-foreground">Thank you, {form.fullName || "Student"}. We will be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); sendLeadToWhatsApp(`${view.h1}`, form); setSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="lp-name">Full Name *</label><input id="lp-name" required value={form.fullName} onChange={set("fullName")} className={inputCls} placeholder="Your name" /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="lp-mobile">Mobile *</label><input id="lp-mobile" type="tel" required value={form.mobile} onChange={set("mobile")} className={inputCls} placeholder="+91 98765 43210" /></div>
                  </div>
                  <div><label className="text-xs font-semibold block mb-1" htmlFor="lp-email">Email *</label><input id="lp-email" type="email" required value={form.email} onChange={set("email")} className={inputCls} placeholder="email@example.com" /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="lp-course">Preferred Course</label><input id="lp-course" value={form.course} onChange={set("course")} className={inputCls} placeholder="e.g. MSc Data Science" /></div>
                    <div><label className="text-xs font-semibold block mb-1" htmlFor="lp-country">Preferred Country</label><select id="lp-country" value={form.country} onChange={set("country")} className={inputCls}><option value="">Select</option>{DESTINATIONS.map(d => <option key={d.name}>{d.name}</option>)}<option>Not sure</option></select></div>
                  </div>
                  <div><label className="text-xs font-semibold block mb-1" htmlFor="lp-intake">Intended Intake</label><select id="lp-intake" value={form.intake} onChange={set("intake")} className={inputCls}><option value="">Select</option><option>Jan 2027</option><option>Sep 2027</option><option>Jan 2028</option><option>Not sure</option></select></div>
                  <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl text-base shadow-elegant hover:opacity-90 transition-all">
                    Request a Call Back
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10">
                {view.name} — Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`f-${i}`} className="bg-card border rounded-xl px-6 shadow-soft">
                    <AccordionTrigger className="text-left font-semibold text-sm md:text-base py-5">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Planning to study abroad from {view.name}?</h2>
            <p className="opacity-90 mb-7">Start with a free consultation — no cost, no obligation.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${CONTACT.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-primary font-bold rounded-xl shadow-lg"><Phone className="w-5 h-5" />Call Now</a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 border border-white/25 font-semibold rounded-xl hover:bg-white/20 transition-smooth"><MessageCircle className="w-5 h-5" />WhatsApp Us</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

/* ─── Route entry points ─── */

/**
 * State and city pages share one URL shape, so one route resolves both.
 * A few slugs are both (Delhi, Chandigarh) — the state page wins, since it
 * lists the cities and carries the scheme data. That keeps one URL per place
 * rather than two competing for the same query.
 */
export const LocationRouter = () => {
  // Mounted at "/:locationSlug" — the site root. React Router ranks static
  // segments above dynamic ones, so /study-in-canada, /financial-assistance and
  // every other declared route still win; only paths nothing else claims arrive
  // here. Anything that is not a real place falls through to NotFound below.
  const { locationSlug: segment } = useParams();
  const parsed = segment ? parseLocationSlug(segment) : null;
  if (!segment || !parsed) return <NotFound />;

  // A former-name slug ("bangalore") resolves to its canonical place
  // ("bengaluru") and REDIRECTS — never renders. Rendering it would put the
  // same page on two indexable URLs.
  const slug = resolveAliasSlug(parsed);
  const isOldName = slug !== parsed;

  // /mumbai, /education-loan-in-mumbai, /study-abroad-consultants-in-bangalore,
  // or any other alias prefix or old name → the one canonical URL.
  if (!isCanonicalSegment(segment) || isOldName) {
    if (getState(slug)) return <Navigate to={stateUrl(slug)} replace />;
    if (getCity(slug)) return <Navigate to={cityUrl(slug)} replace />;
    return <NotFound />;
  }

  const state = getState(slug);
  if (state) {
    const meta = stateMeta(state);
    return (
      <LocationView
        view={{
          kind: "state", name: state.name, stateName: state.name, state,
          title: meta.title, description: meta.description, h1: meta.h1,
          canonical: stateUrl(state.slug), indexable: isStateIndexable(state), keywords: meta.keywords,
          aliases: meta.aliases,
          siblings: state.cities,
        }}
      />
    );
  }

  const city = getCity(slug);
  const cityState = city ? getState(city.stateSlug) : undefined;
  if (city && cityState) {
    const meta = cityMeta(city);
    return (
      <LocationView
        view={{
          kind: "city", name: city.name, stateName: cityState.name, state: cityState, city,
          title: meta.title, description: meta.description, h1: meta.h1,
          canonical: cityUrl(city.slug), indexable: isCityIndexable(city), keywords: meta.keywords,
          aliases: meta.aliases,
          siblings: cityState.cities.filter(c => c.slug !== city.slug).slice(0, 12),
        }}
      />
    );
  }

  return <NotFound />;
};

/**
 * The previous URL structure put every location under /locations/. Those URLs
 * are in the live sitemap and may already be indexed, so they must keep
 * working rather than 404.
 *
 * The hosting configs carry a real 301 for crawlers (public/_redirects,
 * public/.htaccess, public/web.config, vercel.json). This component is the
 * client-side fallback for anyone already inside the app when they click an
 * old link.
 */
export const LegacyLocationRedirect = () => {
  const { slug: segment } = useParams();
  const parsed = segment ? parseLocationSlug(segment) : null;
  if (!parsed) return <Navigate to={LOCATION_HUB} replace />;
  // An old /locations/ URL may also carry an old city name.
  const slug = resolveAliasSlug(parsed);
  if (getState(slug)) return <Navigate to={stateUrl(slug)} replace />;
  if (getCity(slug)) return <Navigate to={cityUrl(slug)} replace />;
  return <NotFound />;
};

/**
 * Alias routes (/education-loan-in-mumbai and the other keyword spellings)
 * send visitors and crawlers to the one canonical URL. `replace` keeps them out
 * of the back-button history.
 */
export const LocationAliasRedirect = () => {
  const { pathname } = useLocation();
  const segment = pathname.replace(/^\/+/, "").replace(/\/+$/, "");

  // Only single-segment paths that start with a known keyword prefix.
  if (!segment.includes("/") && ALIAS_PREFIXES.some(p => segment.startsWith(`${p}-`))) {
    const parsed = parseLocationSlug(segment);
    if (parsed) {
      // Resolves both the keyword prefix and an old city name in one step, so
      // /education-loan-in-bangalore lands on the Bengaluru page.
      const slug = resolveAliasSlug(parsed);
      if (getState(slug)) return <Navigate to={stateUrl(slug)} replace />;
      if (getCity(slug)) return <Navigate to={cityUrl(slug)} replace />;
    }
  }

  return <NotFound />;
};

/** /locations — the hub that makes every location page reachable by a crawler. */
export const LocationsIndexPage = () => (
  <div className="min-h-screen bg-background text-foreground flex flex-col">
    <SEOHead
      title={`Study Abroad Consultants Across India | ${SITE.name}`}
      description="Find study abroad guidance, education loan support and student visa assistance for your state and city across India."
      canonicalUrl="/locations"
      jsonLd={[{
        "@context": "https://schema.org", "@type": "CollectionPage",
        name: "Locations we serve across India",
        url: `${SITE.domain}/locations`,
        isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.domain },
      }]}
    />
    <Header />
    <main className="flex-1">
      <div className="bg-gradient-subtle border-b pt-20">
        <div className="container mx-auto px-4 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Locations</span>
          </nav>
        </div>
      </div>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-14">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-5">Study Abroad Guidance Across India</h1>
            <p className="text-lg text-muted-foreground">
              We work with students in every state online. Pick your state to see local education loan schemes,
              or jump straight to your city.
            </p>
          </div>

          <div className="space-y-10 max-w-6xl">
            {STATES.map(state => (
              <div key={state.slug}>
                <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                  <Link to={stateUrl(state.slug)} className="text-lg font-extrabold hover:text-primary transition-smooth">
                    {state.name}
                  </Link>
                  {state.scheme && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      State scheme available
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {state.cities.map(c => (
                    <Link key={c.slug} to={cityUrl(c.slug)} className="px-3 py-1.5 rounded-lg bg-card border text-xs font-medium shadow-soft hover:border-primary/40 hover:text-primary transition-all">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default LocationsIndexPage;
