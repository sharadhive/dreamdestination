/**
 * Location dataset behind every state and city page.
 *
 * HOW TO READ THIS FILE
 * - `scheme` is only populated where a state scheme could be verified against a
 *   public source. Where it is null the page says so and points the student at
 *   their state's Social Welfare / Higher Education department. We do not
 *   publish invented loan terms — students borrow against this information.
 * - `tier` drives the indexing quality gate in src/lib/locationSeo.ts. Thin
 *   pages are rendered for visitors but kept out of the index and sitemap
 *   until they carry real local content.
 *
 * Sources for scheme data:
 *   https://www.wemakescholars.com/education-loan/government
 *   https://gradsloan.com/blogs/government-education-loan-schemes-india
 * Verify against the relevant state department before relying on any figure.
 */

export interface StateScheme {
  name: string;
  benefit: string;
  eligibility: string;
  administrator: string;
}

export interface CityInfo {
  slug: string;
  name: string;
  /** 1 = metro, 2 = major city, 3 = smaller city. Drives the indexing gate. */
  tier: 1 | 2 | 3;
  stateSlug: string;
  stateName: string;
}

export interface StateInfo {
  slug: string;
  name: string;
  capital: string;
  scheme: StateScheme | null;
  cities: CityInfo[];
}

/* ─────────────────────────────────────────────────────────────────────────────
 * FORMER AND ALTERNATE PLACE NAMES
 *
 * WHY THIS EXISTS
 * Several Indian cities have been officially renamed and search volume did not
 * follow. Far more people search "study abroad consultants in Bangalore" than
 * "...in Bengaluru", and "education loan in Vizag" outruns "Visakhapatnam".
 * A page that only ever prints the new name is invisible to the query people
 * actually type.
 *
 * Keyed by SLUG, not by name, so this map never has to be kept in sync with
 * the 480 city entries below — and a city whose slug already preserves the old
 * name (aurangabad → "Chhatrapati Sambhajinagar") is handled exactly like one
 * whose slug follows the new name (bengaluru → "Bangalore").
 *
 * WHAT BELONGS HERE
 * Genuine former names, established short forms, and accepted alternate
 * transliterations (Nashik/Nasik). NOT typos — stuffing misspellings into a
 * page reads as spam to a human reviewer for very little gain.
 *
 * These feed the keyword clusters in src/lib/locationSeo.ts and produce an
 * "also searched as" line on the page, so the old name appears in real content
 * and not only in a meta tag.
 * ─────────────────────────────────────────────────────────────────────────── */
export const PLACE_ALIASES: Record<string, string[]> = {
  /* Karnataka */
  bengaluru: ["Bangalore"],
  mysuru: ["Mysore"],
  mangaluru: ["Mangalore"],
  belagavi: ["Belgaum"],
  ballari: ["Bellary"],
  kalaburagi: ["Gulbarga"],
  shivamogga: ["Shimoga"],
  tumakuru: ["Tumkur"],
  vijayapura: ["Bijapur"],
  chikkamagaluru: ["Chikmagalur"],
  davanagere: ["Davangere"],
  "hubli-dharwad": ["Hubli", "Dharwad"],

  /* Metros with long-standing former names */
  chennai: ["Madras"],
  mumbai: ["Bombay"],
  kolkata: ["Calcutta"],
  "navi-mumbai": ["New Bombay"],
  pune: ["Poona"],

  /* Kerala */
  thiruvananthapuram: ["Trivandrum"],
  kozhikode: ["Calicut"],
  thrissur: ["Trichur"],
  kochi: ["Cochin"],
  kannur: ["Cannanore"],
  alappuzha: ["Alleppey"],
  kollam: ["Quilon"],
  palakkad: ["Palghat"],

  /* Tamil Nadu */
  tiruchirappalli: ["Trichy", "Tiruchirapalli"],
  thoothukudi: ["Tuticorin"],
  tiruppur: ["Tirupur"],
  thanjavur: ["Tanjore"],
  tirunelveli: ["Nellai"],
  ooty: ["Udhagamandalam", "Ootacamund"],

  /* Andhra Pradesh & Telangana */
  visakhapatnam: ["Vizag", "Vishakhapatnam"],
  rajahmundry: ["Rajamahendravaram"],

  /* North & West */
  prayagraj: ["Allahabad"],
  varanasi: ["Banaras", "Benares"],
  gurugram: ["Gurgaon"],
  vadodara: ["Baroda"],
  aurangabad: ["Aurangabad"],
  hoshangabad: ["Hoshangabad"],
  thanesar: ["Thanesar"],
  ahmednagar: ["Ahilyanagar"],
  nashik: ["Nasik"],
  solapur: ["Sholapur"],
  shimla: ["Simla"],
  dharamshala: ["Dharamsala"],
  haridwar: ["Hardwar"],
  mohali: ["SAS Nagar"],
  bathinda: ["Bhatinda"],
  firozpur: ["Ferozepur"],
  muktsar: ["Sri Muktsar Sahib"],
  "sri-ganganagar": ["Ganganagar"],

  /* East & North-East */
  guwahati: ["Gauhati"],
  bardhaman: ["Burdwan"],
  berhampur: ["Brahmapur"],
  balasore: ["Baleshwar"],
  serampore: ["Srirampur"],
  "port-blair": ["Sri Vijaya Puram"],

  /* Goa */
  panaji: ["Panjim"],
  margao: ["Madgaon"],
  "vasco-da-gama": ["Vasco"],

  /* Municipal areas people search by their parts */
  "pimpri-chinchwad": ["Pimpri", "Chinchwad"],
  "kalyan-dombivli": ["Kalyan", "Dombivli"],
  "vasai-virar": ["Vasai", "Virar"],
  "mira-bhayandar": ["Mira Road", "Bhayandar"],

  /* States and UTs */
  odisha: ["Orissa"],
  uttarakhand: ["Uttaranchal"],
  puducherry: ["Pondicherry"],
  delhi: ["Delhi NCR", "New Delhi NCR"],
  "tamil-nadu": ["Tamilnadu"],
  "west-bengal": ["Bengal"],
  "himachal-pradesh": ["Himachal"],
  "andhra-pradesh": ["Andhra"],
  "jammu-and-kashmir": ["Jammu and Kashmir"],
  "andaman-and-nicobar-islands": ["Andaman", "Nicobar Islands"],
  "dadra-and-nagar-haveli-and-daman-and-diu": ["Dadra and Nagar Haveli", "Daman and Diu"],
};

/** Former/alternate names for a place slug. Empty array when there are none. */
export const placeAliases = (slug: string): string[] => PLACE_ALIASES[slug] ?? [];

/**
 * Reverse lookup, e.g. "bangalore" → "bengaluru".
 *
 * Lets /study-abroad-consultants-in-bangalore resolve to the Bengaluru page
 * instead of 404ing, without creating a second URL that competes for the same
 * query — the alias redirects, it does not render.
 *
 * A slug that is itself a real place is never remapped: "aurangabad" and
 * "hoshangabad" are their own canonical slugs and appear in PLACE_ALIASES only
 * so the old NAME reaches the page copy.
 */
export const ALIAS_SLUG_TO_CANONICAL: Record<string, string> = Object.entries(PLACE_ALIASES)
  .reduce((acc, [canonical, aliases]) => {
    for (const alias of aliases) {
      const aliasSlug = alias
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      if (aliasSlug && aliasSlug !== canonical && !(aliasSlug in PLACE_ALIASES)) {
        acc[aliasSlug] = canonical;
      }
    }
    return acc;
  }, {} as Record<string, string>);

export const STATES: StateInfo[] = [
  {
    slug: "maharashtra",
    name: "Maharashtra",
    capital: "Mumbai",
    scheme: null,
    cities: [
      { slug: "mumbai", name: "Mumbai", tier: 1, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "pune", name: "Pune", tier: 1, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "nagpur", name: "Nagpur", tier: 2, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "thane", name: "Thane", tier: 2, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "nashik", name: "Nashik", tier: 2, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "navi-mumbai", name: "Navi Mumbai", tier: 2, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "pimpri-chinchwad", name: "Pimpri-Chinchwad", tier: 2, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "kalyan-dombivli", name: "Kalyan-Dombivli", tier: 2, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "vasai-virar", name: "Vasai-Virar", tier: 2, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "aurangabad", name: "Chhatrapati Sambhajinagar", tier: 2, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "solapur", name: "Solapur", tier: 2, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "kolhapur", name: "Kolhapur", tier: 2, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "amravati", name: "Amravati", tier: 2, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "mira-bhayandar", name: "Mira-Bhayandar", tier: 2, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "bhiwandi", name: "Bhiwandi", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "nanded", name: "Nanded", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "sangli", name: "Sangli", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "jalgaon", name: "Jalgaon", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "akola", name: "Akola", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "latur", name: "Latur", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "dhule", name: "Dhule", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "ahmednagar", name: "Ahmednagar", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "chandrapur", name: "Chandrapur", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "parbhani", name: "Parbhani", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "ichalkaranji", name: "Ichalkaranji", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "jalna", name: "Jalna", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "ambernath", name: "Ambernath", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "badlapur", name: "Badlapur", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "panvel", name: "Panvel", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "satara", name: "Satara", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "beed", name: "Beed", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "yavatmal", name: "Yavatmal", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "wardha", name: "Wardha", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "ratnagiri", name: "Ratnagiri", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "ulhasnagar", name: "Ulhasnagar", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "andheri", name: "Andheri", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "ghatkopar", name: "Ghatkopar", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "borivali", name: "Borivali", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "dadar", name: "Dadar", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
      { slug: "powai", name: "Powai", tier: 3, stateSlug: "maharashtra", stateName: "Maharashtra" },
    ],
  },
  {
    slug: "karnataka",
    name: "Karnataka",
    capital: "Bengaluru",
    scheme: {
      name: "Arivu Education Loan Scheme",
      benefit: "Loans reported up to ₹20 lakh at government-subsidised interest rates.",
      eligibility: "Karnataka domicile; category and income criteria apply.",
      administrator: "Karnataka Minorities Development Corporation",
    },
    cities: [
      { slug: "bengaluru", name: "Bengaluru", tier: 1, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "mysuru", name: "Mysuru", tier: 2, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "hubli-dharwad", name: "Hubballi-Dharwad", tier: 2, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "mangaluru", name: "Mangaluru", tier: 2, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "belagavi", name: "Belagavi", tier: 2, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "kalaburagi", name: "Kalaburagi", tier: 2, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "davanagere", name: "Davanagere", tier: 2, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "ballari", name: "Ballari", tier: 2, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "vijayapura", name: "Vijayapura", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "shivamogga", name: "Shivamogga", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "tumakuru", name: "Tumakuru", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "raichur", name: "Raichur", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "bidar", name: "Bidar", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "hassan", name: "Hassan", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "udupi", name: "Udupi", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "gadag", name: "Gadag", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "chitradurga", name: "Chitradurga", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "kolar", name: "Kolar", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "mandya", name: "Mandya", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "bagalkot", name: "Bagalkot", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "karwar", name: "Karwar", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "chikkamagaluru", name: "Chikkamagaluru", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "whitefield", name: "Whitefield", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "electronic-city", name: "Electronic City", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
      { slug: "jayanagar", name: "Jayanagar", tier: 3, stateSlug: "karnataka", stateName: "Karnataka" },
    ],
  },
  {
    slug: "tamil-nadu",
    name: "Tamil Nadu",
    capital: "Chennai",
    scheme: {
      name: "TAMCO Subsidised Loan Scheme",
      benefit: "Subsidised loans for students from minority communities.",
      eligibility: "Tamil Nadu domicile; family income reported between ₹1.03 lakh and ₹6 lakh.",
      administrator: "Tamil Nadu Minorities Economic Development Corporation (TAMCO)",
    },
    cities: [
      { slug: "chennai", name: "Chennai", tier: 1, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "coimbatore", name: "Coimbatore", tier: 2, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "madurai", name: "Madurai", tier: 2, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "tiruchirappalli", name: "Tiruchirappalli", tier: 2, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "salem", name: "Salem", tier: 2, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "tirunelveli", name: "Tirunelveli", tier: 2, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "tiruppur", name: "Tiruppur", tier: 2, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "erode", name: "Erode", tier: 2, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "vellore", name: "Vellore", tier: 2, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "thoothukudi", name: "Thoothukudi", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "thanjavur", name: "Thanjavur", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "dindigul", name: "Dindigul", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "cuddalore", name: "Cuddalore", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "kanchipuram", name: "Kanchipuram", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "karur", name: "Karur", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "namakkal", name: "Namakkal", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "hosur", name: "Hosur", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "nagercoil", name: "Nagercoil", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "kumbakonam", name: "Kumbakonam", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "rajapalayam", name: "Rajapalayam", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "sivakasi", name: "Sivakasi", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "pudukkottai", name: "Pudukkottai", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "ambur", name: "Ambur", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "villupuram", name: "Villupuram", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "tambaram", name: "Tambaram", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "avadi", name: "Avadi", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
      { slug: "ooty", name: "Ooty", tier: 3, stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
    ],
  },
  {
    slug: "telangana",
    name: "Telangana",
    capital: "Hyderabad",
    scheme: {
      name: "Chief Minister's Overseas Scholarship Scheme",
      benefit: "A grant rather than a loan — reported up to ₹20 lakh for master's programmes and up to ₹36 lakh for PhD.",
      eligibility: "Telangana resident; minimum 60% marks; family income up to ₹6 lakh.",
      administrator: "Government of Telangana",
    },
    cities: [
      { slug: "hyderabad", name: "Hyderabad", tier: 1, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "warangal", name: "Warangal", tier: 2, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "nizamabad", name: "Nizamabad", tier: 2, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "karimnagar", name: "Karimnagar", tier: 2, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "khammam", name: "Khammam", tier: 2, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "ramagundam", name: "Ramagundam", tier: 3, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "mahbubnagar", name: "Mahbubnagar", tier: 3, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "nalgonda", name: "Nalgonda", tier: 3, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "adilabad", name: "Adilabad", tier: 3, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "suryapet", name: "Suryapet", tier: 3, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "siddipet", name: "Siddipet", tier: 3, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "miryalaguda", name: "Miryalaguda", tier: 3, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "secunderabad", name: "Secunderabad", tier: 2, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "gachibowli", name: "Gachibowli", tier: 3, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "kukatpally", name: "Kukatpally", tier: 3, stateSlug: "telangana", stateName: "Telangana" },
      { slug: "madhapur", name: "Madhapur", tier: 3, stateSlug: "telangana", stateName: "Telangana" },
    ],
  },
  {
    slug: "delhi",
    name: "Delhi",
    capital: "New Delhi",
    scheme: null,
    cities: [
      { slug: "new-delhi", name: "New Delhi", tier: 1, stateSlug: "delhi", stateName: "Delhi" },
      { slug: "dwarka", name: "Dwarka", tier: 3, stateSlug: "delhi", stateName: "Delhi" },
      { slug: "rohini", name: "Rohini", tier: 3, stateSlug: "delhi", stateName: "Delhi" },
      { slug: "saket", name: "Saket", tier: 3, stateSlug: "delhi", stateName: "Delhi" },
      { slug: "laxmi-nagar", name: "Laxmi Nagar", tier: 3, stateSlug: "delhi", stateName: "Delhi" },
      { slug: "pitampura", name: "Pitampura", tier: 3, stateSlug: "delhi", stateName: "Delhi" },
      { slug: "janakpuri", name: "Janakpuri", tier: 3, stateSlug: "delhi", stateName: "Delhi" },
      { slug: "karol-bagh", name: "Karol Bagh", tier: 3, stateSlug: "delhi", stateName: "Delhi" },
      { slug: "connaught-place", name: "Connaught Place", tier: 3, stateSlug: "delhi", stateName: "Delhi" },
      { slug: "vasant-kunj", name: "Vasant Kunj", tier: 3, stateSlug: "delhi", stateName: "Delhi" },
      { slug: "mayur-vihar", name: "Mayur Vihar", tier: 3, stateSlug: "delhi", stateName: "Delhi" },
      { slug: "rajouri-garden", name: "Rajouri Garden", tier: 3, stateSlug: "delhi", stateName: "Delhi" },
    ],
  },
  {
    slug: "gujarat",
    name: "Gujarat",
    capital: "Gandhinagar",
    scheme: {
      name: "Gujarat Educational Loan Scheme (GELS)",
      benefit: "Loans reported up to ₹15 lakh at around 4% p.a., repayable over 10 years after course completion. Some sources describe an interest subsidy for economically weaker Gujarat-domiciled students going abroad.",
      eligibility: "Gujarat domicile; economically weaker section criteria apply.",
      administrator: "Knowledge Consortium of Gujarat / State Education Department",
    },
    cities: [
      { slug: "ahmedabad", name: "Ahmedabad", tier: 1, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "surat", name: "Surat", tier: 1, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "vadodara", name: "Vadodara", tier: 2, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "rajkot", name: "Rajkot", tier: 2, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "bhavnagar", name: "Bhavnagar", tier: 2, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "jamnagar", name: "Jamnagar", tier: 2, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "gandhinagar", name: "Gandhinagar", tier: 2, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "junagadh", name: "Junagadh", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "anand", name: "Anand", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "nadiad", name: "Nadiad", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "bharuch", name: "Bharuch", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "mehsana", name: "Mehsana", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "navsari", name: "Navsari", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "morbi", name: "Morbi", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "surendranagar", name: "Surendranagar", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "gandhidham", name: "Gandhidham", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "vapi", name: "Vapi", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "valsad", name: "Valsad", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "porbandar", name: "Porbandar", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "veraval", name: "Veraval", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "patan", name: "Patan", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "bhuj", name: "Bhuj", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "palanpur", name: "Palanpur", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "godhra", name: "Godhra", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
      { slug: "ankleshwar", name: "Ankleshwar", tier: 3, stateSlug: "gujarat", stateName: "Gujarat" },
    ],
  },
  {
    slug: "kerala",
    name: "Kerala",
    capital: "Thiruvananthapuram",
    scheme: {
      name: "Education Loan Repayment Support Scheme",
      benefit: "The state repays a reported 20% of the loan, capped around ₹1 lakh, over five years from the start of repayment, with a small one-time grant toward the first EMI. A separate interest subsidy runs for backward-community students.",
      eligibility: "Kerala domicile; scheme-specific income and community criteria apply.",
      administrator: "Government of Kerala / Kerala State Backward Classes Development Corporation",
    },
    cities: [
      { slug: "thiruvananthapuram", name: "Thiruvananthapuram", tier: 2, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "kochi", name: "Kochi", tier: 2, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "kozhikode", name: "Kozhikode", tier: 2, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "thrissur", name: "Thrissur", tier: 2, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "kollam", name: "Kollam", tier: 2, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "kannur", name: "Kannur", tier: 2, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "alappuzha", name: "Alappuzha", tier: 3, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "palakkad", name: "Palakkad", tier: 3, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "malappuram", name: "Malappuram", tier: 3, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "kottayam", name: "Kottayam", tier: 3, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "pathanamthitta", name: "Pathanamthitta", tier: 3, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "idukki", name: "Idukki", tier: 3, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "kasaragod", name: "Kasaragod", tier: 3, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "wayanad", name: "Wayanad", tier: 3, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "ernakulam", name: "Ernakulam", tier: 3, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "manjeri", name: "Manjeri", tier: 3, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "ponnani", name: "Ponnani", tier: 3, stateSlug: "kerala", stateName: "Kerala" },
      { slug: "thalassery", name: "Thalassery", tier: 3, stateSlug: "kerala", stateName: "Kerala" },
    ],
  },
  {
    slug: "west-bengal",
    name: "West Bengal",
    capital: "Kolkata",
    scheme: null,
    cities: [
      { slug: "kolkata", name: "Kolkata", tier: 1, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "howrah", name: "Howrah", tier: 2, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "durgapur", name: "Durgapur", tier: 2, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "asansol", name: "Asansol", tier: 2, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "siliguri", name: "Siliguri", tier: 2, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "bardhaman", name: "Bardhaman", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "malda", name: "Malda", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "kharagpur", name: "Kharagpur", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "haldia", name: "Haldia", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "darjeeling", name: "Darjeeling", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "krishnanagar", name: "Krishnanagar", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "barasat", name: "Barasat", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "berhampore", name: "Berhampore", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "bankura", name: "Bankura", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "jalpaiguri", name: "Jalpaiguri", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "cooch-behar", name: "Cooch Behar", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "raiganj", name: "Raiganj", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "salt-lake", name: "Salt Lake", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "barrackpore", name: "Barrackpore", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
      { slug: "serampore", name: "Serampore", tier: 3, stateSlug: "west-bengal", stateName: "West Bengal" },
    ],
  },
  {
    slug: "uttar-pradesh",
    name: "Uttar Pradesh",
    capital: "Lucknow",
    scheme: null,
    cities: [
      { slug: "lucknow", name: "Lucknow", tier: 2, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "kanpur", name: "Kanpur", tier: 2, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "ghaziabad", name: "Ghaziabad", tier: 2, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "agra", name: "Agra", tier: 2, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "varanasi", name: "Varanasi", tier: 2, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "meerut", name: "Meerut", tier: 2, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "prayagraj", name: "Prayagraj", tier: 2, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "noida", name: "Noida", tier: 2, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "bareilly", name: "Bareilly", tier: 2, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "aligarh", name: "Aligarh", tier: 2, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "moradabad", name: "Moradabad", tier: 2, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "gorakhpur", name: "Gorakhpur", tier: 2, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "saharanpur", name: "Saharanpur", tier: 2, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "jhansi", name: "Jhansi", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "firozabad", name: "Firozabad", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "muzaffarnagar", name: "Muzaffarnagar", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "mathura", name: "Mathura", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "shahjahanpur", name: "Shahjahanpur", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "rampur", name: "Rampur", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "mau", name: "Mau", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "farrukhabad", name: "Farrukhabad", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "hapur", name: "Hapur", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "etawah", name: "Etawah", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "mirzapur", name: "Mirzapur", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "bulandshahr", name: "Bulandshahr", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "sambhal", name: "Sambhal", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "amroha", name: "Amroha", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "hardoi", name: "Hardoi", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "fatehpur", name: "Fatehpur", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "raebareli", name: "Raebareli", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "sitapur", name: "Sitapur", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "bahraich", name: "Bahraich", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "unnao", name: "Unnao", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "jaunpur", name: "Jaunpur", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "lakhimpur", name: "Lakhimpur", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "ayodhya", name: "Ayodhya", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "greater-noida", name: "Greater Noida", tier: 2, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "banda", name: "Banda", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "basti", name: "Basti", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
      { slug: "deoria", name: "Deoria", tier: 3, stateSlug: "uttar-pradesh", stateName: "Uttar Pradesh" },
    ],
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    capital: "Jaipur",
    scheme: null,
    cities: [
      { slug: "jaipur", name: "Jaipur", tier: 2, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "jodhpur", name: "Jodhpur", tier: 2, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "kota", name: "Kota", tier: 2, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "bikaner", name: "Bikaner", tier: 2, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "ajmer", name: "Ajmer", tier: 2, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "udaipur", name: "Udaipur", tier: 2, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "bhilwara", name: "Bhilwara", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "alwar", name: "Alwar", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "sikar", name: "Sikar", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "pali", name: "Pali", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "sri-ganganagar", name: "Sri Ganganagar", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "bharatpur", name: "Bharatpur", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "hanumangarh", name: "Hanumangarh", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "chittorgarh", name: "Chittorgarh", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "jhunjhunu", name: "Jhunjhunu", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "banswara", name: "Banswara", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "barmer", name: "Barmer", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "jaisalmer", name: "Jaisalmer", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "nagaur", name: "Nagaur", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "tonk", name: "Tonk", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "dausa", name: "Dausa", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
      { slug: "baran", name: "Baran", tier: 3, stateSlug: "rajasthan", stateName: "Rajasthan" },
    ],
  },
  {
    slug: "madhya-pradesh",
    name: "Madhya Pradesh",
    capital: "Bhopal",
    scheme: null,
    cities: [
      { slug: "indore", name: "Indore", tier: 2, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "bhopal", name: "Bhopal", tier: 2, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "jabalpur", name: "Jabalpur", tier: 2, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "gwalior", name: "Gwalior", tier: 2, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "ujjain", name: "Ujjain", tier: 2, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "sagar", name: "Sagar", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "dewas", name: "Dewas", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "satna", name: "Satna", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "ratlam", name: "Ratlam", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "rewa", name: "Rewa", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "katni", name: "Katni", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "singrauli", name: "Singrauli", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "burhanpur", name: "Burhanpur", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "khandwa", name: "Khandwa", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "morena", name: "Morena", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "bhind", name: "Bhind", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "chhindwara", name: "Chhindwara", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "guna", name: "Guna", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "shivpuri", name: "Shivpuri", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "vidisha", name: "Vidisha", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "chhatarpur", name: "Chhatarpur", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "damoh", name: "Damoh", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "mandsaur", name: "Mandsaur", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "neemuch", name: "Neemuch", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
      { slug: "hoshangabad", name: "Narmadapuram", tier: 3, stateSlug: "madhya-pradesh", stateName: "Madhya Pradesh" },
    ],
  },
  {
    slug: "punjab",
    name: "Punjab",
    capital: "Chandigarh",
    scheme: null,
    cities: [
      { slug: "ludhiana", name: "Ludhiana", tier: 2, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "amritsar", name: "Amritsar", tier: 2, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "jalandhar", name: "Jalandhar", tier: 2, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "patiala", name: "Patiala", tier: 2, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "bathinda", name: "Bathinda", tier: 2, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "mohali", name: "Mohali", tier: 2, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "hoshiarpur", name: "Hoshiarpur", tier: 3, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "pathankot", name: "Pathankot", tier: 3, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "moga", name: "Moga", tier: 3, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "batala", name: "Batala", tier: 3, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "firozpur", name: "Firozpur", tier: 3, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "kapurthala", name: "Kapurthala", tier: 3, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "phagwara", name: "Phagwara", tier: 3, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "barnala", name: "Barnala", tier: 3, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "sangrur", name: "Sangrur", tier: 3, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "khanna", name: "Khanna", tier: 3, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "muktsar", name: "Muktsar", tier: 3, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "faridkot", name: "Faridkot", tier: 3, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "rajpura", name: "Rajpura", tier: 3, stateSlug: "punjab", stateName: "Punjab" },
      { slug: "gurdaspur", name: "Gurdaspur", tier: 3, stateSlug: "punjab", stateName: "Punjab" },
    ],
  },
  {
    slug: "haryana",
    name: "Haryana",
    capital: "Chandigarh",
    scheme: null,
    cities: [
      { slug: "gurugram", name: "Gurugram", tier: 2, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "faridabad", name: "Faridabad", tier: 2, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "panipat", name: "Panipat", tier: 2, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "ambala", name: "Ambala", tier: 2, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "yamunanagar", name: "Yamunanagar", tier: 2, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "rohtak", name: "Rohtak", tier: 2, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "hisar", name: "Hisar", tier: 2, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "karnal", name: "Karnal", tier: 2, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "sonipat", name: "Sonipat", tier: 3, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "panchkula", name: "Panchkula", tier: 3, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "bhiwani", name: "Bhiwani", tier: 3, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "sirsa", name: "Sirsa", tier: 3, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "bahadurgarh", name: "Bahadurgarh", tier: 3, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "jind", name: "Jind", tier: 3, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "thanesar", name: "Kurukshetra", tier: 3, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "kaithal", name: "Kaithal", tier: 3, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "rewari", name: "Rewari", tier: 3, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "palwal", name: "Palwal", tier: 3, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "fatehabad", name: "Fatehabad", tier: 3, stateSlug: "haryana", stateName: "Haryana" },
      { slug: "narnaul", name: "Narnaul", tier: 3, stateSlug: "haryana", stateName: "Haryana" },
    ],
  },
  {
    slug: "andhra-pradesh",
    name: "Andhra Pradesh",
    capital: "Amaravati",
    scheme: null,
    cities: [
      { slug: "visakhapatnam", name: "Visakhapatnam", tier: 2, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "vijayawada", name: "Vijayawada", tier: 2, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "guntur", name: "Guntur", tier: 2, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "nellore", name: "Nellore", tier: 2, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "kurnool", name: "Kurnool", tier: 2, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "rajahmundry", name: "Rajahmundry", tier: 2, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "tirupati", name: "Tirupati", tier: 2, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "kakinada", name: "Kakinada", tier: 2, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "anantapur", name: "Anantapur", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "kadapa", name: "Kadapa", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "vizianagaram", name: "Vizianagaram", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "eluru", name: "Eluru", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "ongole", name: "Ongole", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "nandyal", name: "Nandyal", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "machilipatnam", name: "Machilipatnam", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "adoni", name: "Adoni", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "tenali", name: "Tenali", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "proddatur", name: "Proddatur", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "chittoor", name: "Chittoor", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "hindupur", name: "Hindupur", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "bhimavaram", name: "Bhimavaram", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "srikakulam", name: "Srikakulam", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
      { slug: "amaravati", name: "Amaravati", tier: 3, stateSlug: "andhra-pradesh", stateName: "Andhra Pradesh" },
    ],
  },
  {
    slug: "bihar",
    name: "Bihar",
    capital: "Patna",
    scheme: null,
    cities: [
      { slug: "patna", name: "Patna", tier: 2, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "gaya", name: "Gaya", tier: 2, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "bhagalpur", name: "Bhagalpur", tier: 2, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "muzaffarpur", name: "Muzaffarpur", tier: 2, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "darbhanga", name: "Darbhanga", tier: 2, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "purnia", name: "Purnia", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "arrah", name: "Arrah", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "begusarai", name: "Begusarai", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "katihar", name: "Katihar", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "munger", name: "Munger", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "chhapra", name: "Chhapra", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "danapur", name: "Danapur", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "saharsa", name: "Saharsa", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "sasaram", name: "Sasaram", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "hajipur", name: "Hajipur", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "dehri", name: "Dehri", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "siwan", name: "Siwan", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "motihari", name: "Motihari", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "nawada", name: "Nawada", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "bettiah", name: "Bettiah", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
      { slug: "bihar-sharif", name: "Bihar Sharif", tier: 3, stateSlug: "bihar", stateName: "Bihar" },
    ],
  },
  {
    slug: "odisha",
    name: "Odisha",
    capital: "Bhubaneswar",
    scheme: null,
    cities: [
      { slug: "bhubaneswar", name: "Bhubaneswar", tier: 2, stateSlug: "odisha", stateName: "Odisha" },
      { slug: "cuttack", name: "Cuttack", tier: 2, stateSlug: "odisha", stateName: "Odisha" },
      { slug: "rourkela", name: "Rourkela", tier: 2, stateSlug: "odisha", stateName: "Odisha" },
      { slug: "berhampur", name: "Berhampur", tier: 2, stateSlug: "odisha", stateName: "Odisha" },
      { slug: "sambalpur", name: "Sambalpur", tier: 3, stateSlug: "odisha", stateName: "Odisha" },
      { slug: "puri", name: "Puri", tier: 3, stateSlug: "odisha", stateName: "Odisha" },
      { slug: "balasore", name: "Balasore", tier: 3, stateSlug: "odisha", stateName: "Odisha" },
      { slug: "bhadrak", name: "Bhadrak", tier: 3, stateSlug: "odisha", stateName: "Odisha" },
      { slug: "baripada", name: "Baripada", tier: 3, stateSlug: "odisha", stateName: "Odisha" },
      { slug: "jharsuguda", name: "Jharsuguda", tier: 3, stateSlug: "odisha", stateName: "Odisha" },
      { slug: "jeypore", name: "Jeypore", tier: 3, stateSlug: "odisha", stateName: "Odisha" },
      { slug: "angul", name: "Angul", tier: 3, stateSlug: "odisha", stateName: "Odisha" },
      { slug: "dhenkanal", name: "Dhenkanal", tier: 3, stateSlug: "odisha", stateName: "Odisha" },
      { slug: "rayagada", name: "Rayagada", tier: 3, stateSlug: "odisha", stateName: "Odisha" },
    ],
  },
  {
    slug: "jharkhand",
    name: "Jharkhand",
    capital: "Ranchi",
    scheme: null,
    cities: [
      { slug: "ranchi", name: "Ranchi", tier: 2, stateSlug: "jharkhand", stateName: "Jharkhand" },
      { slug: "jamshedpur", name: "Jamshedpur", tier: 2, stateSlug: "jharkhand", stateName: "Jharkhand" },
      { slug: "dhanbad", name: "Dhanbad", tier: 2, stateSlug: "jharkhand", stateName: "Jharkhand" },
      { slug: "bokaro", name: "Bokaro", tier: 2, stateSlug: "jharkhand", stateName: "Jharkhand" },
      { slug: "deoghar", name: "Deoghar", tier: 3, stateSlug: "jharkhand", stateName: "Jharkhand" },
      { slug: "hazaribagh", name: "Hazaribagh", tier: 3, stateSlug: "jharkhand", stateName: "Jharkhand" },
      { slug: "giridih", name: "Giridih", tier: 3, stateSlug: "jharkhand", stateName: "Jharkhand" },
      { slug: "ramgarh", name: "Ramgarh", tier: 3, stateSlug: "jharkhand", stateName: "Jharkhand" },
      { slug: "phusro", name: "Phusro", tier: 3, stateSlug: "jharkhand", stateName: "Jharkhand" },
      { slug: "medininagar", name: "Medininagar", tier: 3, stateSlug: "jharkhand", stateName: "Jharkhand" },
      { slug: "chaibasa", name: "Chaibasa", tier: 3, stateSlug: "jharkhand", stateName: "Jharkhand" },
      { slug: "dumka", name: "Dumka", tier: 3, stateSlug: "jharkhand", stateName: "Jharkhand" },
    ],
  },
  {
    slug: "chhattisgarh",
    name: "Chhattisgarh",
    capital: "Raipur",
    scheme: null,
    cities: [
      { slug: "raipur", name: "Raipur", tier: 2, stateSlug: "chhattisgarh", stateName: "Chhattisgarh" },
      { slug: "bhilai", name: "Bhilai", tier: 2, stateSlug: "chhattisgarh", stateName: "Chhattisgarh" },
      { slug: "bilaspur", name: "Bilaspur", tier: 2, stateSlug: "chhattisgarh", stateName: "Chhattisgarh" },
      { slug: "korba", name: "Korba", tier: 2, stateSlug: "chhattisgarh", stateName: "Chhattisgarh" },
      { slug: "durg", name: "Durg", tier: 3, stateSlug: "chhattisgarh", stateName: "Chhattisgarh" },
      { slug: "rajnandgaon", name: "Rajnandgaon", tier: 3, stateSlug: "chhattisgarh", stateName: "Chhattisgarh" },
      { slug: "jagdalpur", name: "Jagdalpur", tier: 3, stateSlug: "chhattisgarh", stateName: "Chhattisgarh" },
      { slug: "raigarh", name: "Raigarh", tier: 3, stateSlug: "chhattisgarh", stateName: "Chhattisgarh" },
      { slug: "ambikapur", name: "Ambikapur", tier: 3, stateSlug: "chhattisgarh", stateName: "Chhattisgarh" },
      { slug: "dhamtari", name: "Dhamtari", tier: 3, stateSlug: "chhattisgarh", stateName: "Chhattisgarh" },
      { slug: "mahasamund", name: "Mahasamund", tier: 3, stateSlug: "chhattisgarh", stateName: "Chhattisgarh" },
    ],
  },
  {
    slug: "assam",
    name: "Assam",
    capital: "Dispur",
    scheme: null,
    cities: [
      { slug: "guwahati", name: "Guwahati", tier: 2, stateSlug: "assam", stateName: "Assam" },
      { slug: "silchar", name: "Silchar", tier: 2, stateSlug: "assam", stateName: "Assam" },
      { slug: "dibrugarh", name: "Dibrugarh", tier: 3, stateSlug: "assam", stateName: "Assam" },
      { slug: "jorhat", name: "Jorhat", tier: 3, stateSlug: "assam", stateName: "Assam" },
      { slug: "nagaon", name: "Nagaon", tier: 3, stateSlug: "assam", stateName: "Assam" },
      { slug: "tinsukia", name: "Tinsukia", tier: 3, stateSlug: "assam", stateName: "Assam" },
      { slug: "tezpur", name: "Tezpur", tier: 3, stateSlug: "assam", stateName: "Assam" },
      { slug: "bongaigaon", name: "Bongaigaon", tier: 3, stateSlug: "assam", stateName: "Assam" },
      { slug: "dhubri", name: "Dhubri", tier: 3, stateSlug: "assam", stateName: "Assam" },
      { slug: "sivasagar", name: "Sivasagar", tier: 3, stateSlug: "assam", stateName: "Assam" },
      { slug: "goalpara", name: "Goalpara", tier: 3, stateSlug: "assam", stateName: "Assam" },
      { slug: "diphu", name: "Diphu", tier: 3, stateSlug: "assam", stateName: "Assam" },
      { slug: "dispur", name: "Dispur", tier: 3, stateSlug: "assam", stateName: "Assam" },
    ],
  },
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    capital: "Dehradun",
    scheme: null,
    cities: [
      { slug: "dehradun", name: "Dehradun", tier: 2, stateSlug: "uttarakhand", stateName: "Uttarakhand" },
      { slug: "haridwar", name: "Haridwar", tier: 2, stateSlug: "uttarakhand", stateName: "Uttarakhand" },
      { slug: "haldwani", name: "Haldwani", tier: 3, stateSlug: "uttarakhand", stateName: "Uttarakhand" },
      { slug: "roorkee", name: "Roorkee", tier: 3, stateSlug: "uttarakhand", stateName: "Uttarakhand" },
      { slug: "rudrapur", name: "Rudrapur", tier: 3, stateSlug: "uttarakhand", stateName: "Uttarakhand" },
      { slug: "kashipur", name: "Kashipur", tier: 3, stateSlug: "uttarakhand", stateName: "Uttarakhand" },
      { slug: "rishikesh", name: "Rishikesh", tier: 3, stateSlug: "uttarakhand", stateName: "Uttarakhand" },
      { slug: "nainital", name: "Nainital", tier: 3, stateSlug: "uttarakhand", stateName: "Uttarakhand" },
      { slug: "pithoragarh", name: "Pithoragarh", tier: 3, stateSlug: "uttarakhand", stateName: "Uttarakhand" },
      { slug: "almora", name: "Almora", tier: 3, stateSlug: "uttarakhand", stateName: "Uttarakhand" },
      { slug: "mussoorie", name: "Mussoorie", tier: 3, stateSlug: "uttarakhand", stateName: "Uttarakhand" },
    ],
  },
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    capital: "Shimla",
    scheme: null,
    cities: [
      { slug: "shimla", name: "Shimla", tier: 2, stateSlug: "himachal-pradesh", stateName: "Himachal Pradesh" },
      { slug: "solan", name: "Solan", tier: 3, stateSlug: "himachal-pradesh", stateName: "Himachal Pradesh" },
      { slug: "dharamshala", name: "Dharamshala", tier: 3, stateSlug: "himachal-pradesh", stateName: "Himachal Pradesh" },
      { slug: "mandi", name: "Mandi", tier: 3, stateSlug: "himachal-pradesh", stateName: "Himachal Pradesh" },
      { slug: "kullu", name: "Kullu", tier: 3, stateSlug: "himachal-pradesh", stateName: "Himachal Pradesh" },
      { slug: "una", name: "Una", tier: 3, stateSlug: "himachal-pradesh", stateName: "Himachal Pradesh" },
      { slug: "hamirpur", name: "Hamirpur", tier: 3, stateSlug: "himachal-pradesh", stateName: "Himachal Pradesh" },
      { slug: "bilaspur-hp", name: "Bilaspur", tier: 3, stateSlug: "himachal-pradesh", stateName: "Himachal Pradesh" },
      { slug: "chamba", name: "Chamba", tier: 3, stateSlug: "himachal-pradesh", stateName: "Himachal Pradesh" },
      { slug: "nahan", name: "Nahan", tier: 3, stateSlug: "himachal-pradesh", stateName: "Himachal Pradesh" },
      { slug: "baddi", name: "Baddi", tier: 3, stateSlug: "himachal-pradesh", stateName: "Himachal Pradesh" },
      { slug: "palampur", name: "Palampur", tier: 3, stateSlug: "himachal-pradesh", stateName: "Himachal Pradesh" },
    ],
  },
  {
    slug: "goa",
    name: "Goa",
    capital: "Panaji",
    scheme: {
      name: "Interest-Free Education Loan Scheme",
      benefit: "Interest-free loans reported up to ₹16 lakh, disbursed over two years for study abroad.",
      eligibility: "Goa domicile; minimum 60% marks for overseas study.",
      administrator: "Government of Goa",
    },
    cities: [
      { slug: "panaji", name: "Panaji", tier: 2, stateSlug: "goa", stateName: "Goa" },
      { slug: "margao", name: "Margao", tier: 3, stateSlug: "goa", stateName: "Goa" },
      { slug: "vasco-da-gama", name: "Vasco da Gama", tier: 3, stateSlug: "goa", stateName: "Goa" },
      { slug: "mapusa", name: "Mapusa", tier: 3, stateSlug: "goa", stateName: "Goa" },
      { slug: "ponda", name: "Ponda", tier: 3, stateSlug: "goa", stateName: "Goa" },
      { slug: "porvorim", name: "Porvorim", tier: 3, stateSlug: "goa", stateName: "Goa" },
    ],
  },
  {
    slug: "jammu-and-kashmir",
    name: "Jammu & Kashmir",
    capital: "Srinagar",
    scheme: null,
    cities: [
      { slug: "srinagar", name: "Srinagar", tier: 2, stateSlug: "jammu-and-kashmir", stateName: "Jammu & Kashmir" },
      { slug: "jammu", name: "Jammu", tier: 2, stateSlug: "jammu-and-kashmir", stateName: "Jammu & Kashmir" },
      { slug: "anantnag", name: "Anantnag", tier: 3, stateSlug: "jammu-and-kashmir", stateName: "Jammu & Kashmir" },
      { slug: "baramulla", name: "Baramulla", tier: 3, stateSlug: "jammu-and-kashmir", stateName: "Jammu & Kashmir" },
      { slug: "udhampur", name: "Udhampur", tier: 3, stateSlug: "jammu-and-kashmir", stateName: "Jammu & Kashmir" },
      { slug: "kathua", name: "Kathua", tier: 3, stateSlug: "jammu-and-kashmir", stateName: "Jammu & Kashmir" },
      { slug: "sopore", name: "Sopore", tier: 3, stateSlug: "jammu-and-kashmir", stateName: "Jammu & Kashmir" },
      { slug: "kupwara", name: "Kupwara", tier: 3, stateSlug: "jammu-and-kashmir", stateName: "Jammu & Kashmir" },
    ],
  },
  {
    slug: "chandigarh",
    name: "Chandigarh",
    capital: "Chandigarh",
    scheme: null,
    cities: [
      { slug: "chandigarh", name: "Chandigarh", tier: 2, stateSlug: "chandigarh", stateName: "Chandigarh" },
    ],
  },
  {
    slug: "puducherry",
    name: "Puducherry",
    capital: "Puducherry",
    scheme: null,
    cities: [
      { slug: "puducherry", name: "Puducherry", tier: 2, stateSlug: "puducherry", stateName: "Puducherry" },
      { slug: "karaikal", name: "Karaikal", tier: 3, stateSlug: "puducherry", stateName: "Puducherry" },
      { slug: "yanam", name: "Yanam", tier: 3, stateSlug: "puducherry", stateName: "Puducherry" },
      { slug: "mahe", name: "Mahe", tier: 3, stateSlug: "puducherry", stateName: "Puducherry" },
    ],
  },
  {
    slug: "tripura",
    name: "Tripura",
    capital: "Agartala",
    scheme: null,
    cities: [
      { slug: "agartala", name: "Agartala", tier: 2, stateSlug: "tripura", stateName: "Tripura" },
      { slug: "udaipur-tripura", name: "Udaipur", tier: 3, stateSlug: "tripura", stateName: "Tripura" },
      { slug: "dharmanagar", name: "Dharmanagar", tier: 3, stateSlug: "tripura", stateName: "Tripura" },
      { slug: "kailashahar", name: "Kailashahar", tier: 3, stateSlug: "tripura", stateName: "Tripura" },
    ],
  },
  {
    slug: "manipur",
    name: "Manipur",
    capital: "Imphal",
    scheme: null,
    cities: [
      { slug: "imphal", name: "Imphal", tier: 2, stateSlug: "manipur", stateName: "Manipur" },
      { slug: "thoubal", name: "Thoubal", tier: 3, stateSlug: "manipur", stateName: "Manipur" },
      { slug: "churachandpur", name: "Churachandpur", tier: 3, stateSlug: "manipur", stateName: "Manipur" },
      { slug: "bishnupur", name: "Bishnupur", tier: 3, stateSlug: "manipur", stateName: "Manipur" },
    ],
  },
  {
    slug: "meghalaya",
    name: "Meghalaya",
    capital: "Shillong",
    scheme: null,
    cities: [
      { slug: "shillong", name: "Shillong", tier: 2, stateSlug: "meghalaya", stateName: "Meghalaya" },
      { slug: "tura", name: "Tura", tier: 3, stateSlug: "meghalaya", stateName: "Meghalaya" },
      { slug: "jowai", name: "Jowai", tier: 3, stateSlug: "meghalaya", stateName: "Meghalaya" },
      { slug: "nongstoin", name: "Nongstoin", tier: 3, stateSlug: "meghalaya", stateName: "Meghalaya" },
    ],
  },
  {
    slug: "nagaland",
    name: "Nagaland",
    capital: "Kohima",
    scheme: null,
    cities: [
      { slug: "kohima", name: "Kohima", tier: 2, stateSlug: "nagaland", stateName: "Nagaland" },
      { slug: "dimapur", name: "Dimapur", tier: 2, stateSlug: "nagaland", stateName: "Nagaland" },
      { slug: "mokokchung", name: "Mokokchung", tier: 3, stateSlug: "nagaland", stateName: "Nagaland" },
      { slug: "tuensang", name: "Tuensang", tier: 3, stateSlug: "nagaland", stateName: "Nagaland" },
    ],
  },
  {
    slug: "mizoram",
    name: "Mizoram",
    capital: "Aizawl",
    scheme: null,
    cities: [
      { slug: "aizawl", name: "Aizawl", tier: 2, stateSlug: "mizoram", stateName: "Mizoram" },
      { slug: "lunglei", name: "Lunglei", tier: 3, stateSlug: "mizoram", stateName: "Mizoram" },
      { slug: "champhai", name: "Champhai", tier: 3, stateSlug: "mizoram", stateName: "Mizoram" },
    ],
  },
  {
    slug: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    capital: "Itanagar",
    scheme: null,
    cities: [
      { slug: "itanagar", name: "Itanagar", tier: 2, stateSlug: "arunachal-pradesh", stateName: "Arunachal Pradesh" },
      { slug: "naharlagun", name: "Naharlagun", tier: 3, stateSlug: "arunachal-pradesh", stateName: "Arunachal Pradesh" },
      { slug: "pasighat", name: "Pasighat", tier: 3, stateSlug: "arunachal-pradesh", stateName: "Arunachal Pradesh" },
      { slug: "tezu", name: "Tezu", tier: 3, stateSlug: "arunachal-pradesh", stateName: "Arunachal Pradesh" },
    ],
  },
  {
    slug: "sikkim",
    name: "Sikkim",
    capital: "Gangtok",
    scheme: null,
    cities: [
      { slug: "gangtok", name: "Gangtok", tier: 2, stateSlug: "sikkim", stateName: "Sikkim" },
      { slug: "namchi", name: "Namchi", tier: 3, stateSlug: "sikkim", stateName: "Sikkim" },
      { slug: "gyalshing", name: "Gyalshing", tier: 3, stateSlug: "sikkim", stateName: "Sikkim" },
      { slug: "mangan", name: "Mangan", tier: 3, stateSlug: "sikkim", stateName: "Sikkim" },
    ],
  },
  {
    slug: "andaman-and-nicobar-islands",
    name: "Andaman & Nicobar Islands",
    capital: "Port Blair",
    scheme: null,
    cities: [
      { slug: "port-blair", name: "Port Blair", tier: 3, stateSlug: "andaman-and-nicobar-islands", stateName: "Andaman & Nicobar Islands" },
      { slug: "car-nicobar", name: "Car Nicobar", tier: 3, stateSlug: "andaman-and-nicobar-islands", stateName: "Andaman & Nicobar Islands" },
    ],
  },
  {
    slug: "ladakh",
    name: "Ladakh",
    capital: "Leh",
    scheme: null,
    cities: [
      { slug: "leh", name: "Leh", tier: 3, stateSlug: "ladakh", stateName: "Ladakh" },
      { slug: "kargil", name: "Kargil", tier: 3, stateSlug: "ladakh", stateName: "Ladakh" },
    ],
  },
  {
    slug: "dadra-and-nagar-haveli-and-daman-and-diu",
    name: "Dadra & Nagar Haveli and Daman & Diu",
    capital: "Daman",
    scheme: null,
    cities: [
      { slug: "silvassa", name: "Silvassa", tier: 3, stateSlug: "dadra-and-nagar-haveli-and-daman-and-diu", stateName: "Dadra & Nagar Haveli and Daman & Diu" },
      { slug: "daman", name: "Daman", tier: 3, stateSlug: "dadra-and-nagar-haveli-and-daman-and-diu", stateName: "Dadra & Nagar Haveli and Daman & Diu" },
      { slug: "diu", name: "Diu", tier: 3, stateSlug: "dadra-and-nagar-haveli-and-daman-and-diu", stateName: "Dadra & Nagar Haveli and Daman & Diu" },
    ],
  },
];

/* ─── Lookup helpers used by LocationPage.tsx ─── */

/** Find a state by its slug. Returns undefined if not found. */
export const getState = (slug: string): StateInfo | undefined =>
  STATES.find((s) => s.slug === slug);

/** Find a city by its slug (searches all states). Returns undefined if not found. */
export const getCity = (slug: string): CityInfo | undefined => {
  for (const state of STATES) {
    const city = state.cities.find((c) => c.slug === slug);
    if (city) return city;
  }
  return undefined;
};
