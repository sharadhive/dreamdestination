const fs = require('fs');

// Read sitemap
const xml = fs.readFileSync('public/sitemap.xml', 'utf8');
const allUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const paths = allUrls.map(u => u.replace('https://www.dreamdestinationstudyabroad.com', '') || '/');

// Location pages use ROOT-LEVEL URLs: /study-abroad-consultants-in-{slug}
const PREFIX = '/study-abroad-consultants-in-';
const locationPaths = paths.filter(p => p.startsWith(PREFIX));
const sitemapSlugs = locationPaths.map(p => p.replace(PREFIX, ''));

// Read locations data
const dataFile = fs.readFileSync('src/data/locations.ts', 'utf8');

const states = [];
const allCities = [];

// Find states
const stateRegex = /slug:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)",\s*\n\s*capital:\s*"([^"]+)"/g;
let match;
while ((match = stateRegex.exec(dataFile)) !== null) {
  states.push({ slug: match[1], name: match[2], capital: match[3] });
}

// Find cities (have stateSlug)
const cityRegex = /slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*tier:\s*(\d),\s*stateSlug:\s*"([^"]+)",\s*stateName:\s*"([^"]+)"/g;
while ((match = cityRegex.exec(dataFile)) !== null) {
  allCities.push({ slug: match[1], name: match[2], tier: parseInt(match[3]), stateSlug: match[4], stateName: match[5] });
}

// Read INDEX_TIER_THRESHOLD
const seoFile = fs.readFileSync('src/lib/locationSeo.ts', 'utf8');
const thresholdMatch = seoFile.match(/INDEX_TIER_THRESHOLD\s*:\s*1\s*\|\s*2\s*\|\s*3\s*=\s*([123])/);
const threshold = thresholdMatch ? parseInt(thresholdMatch[1]) : 2;

console.log('');
console.log('══════════════════════════════════════════════');
console.log('  DreamDestination — COMPLETE PAGE AUDIT');
console.log('══════════════════════════════════════════════');
console.log('');

// Total page count
const homepage = paths.filter(p => p === '/');
const countriesIdx = paths.filter(p => p === '/countries');
const countries = paths.filter(p => p.startsWith('/study-in-') || (p.startsWith('/countries/') && p !== '/countries'));
const services = ['/career-counselling','/admission-guidance','/financial-assistance','/scholarship-assistance','/visa-assistance','/student-accommodation','/test-preparations','/travel-forex-assistance','/insurance-assistance'];
const legals = ['/privacy-policy','/terms-of-service','/disclaimer','/cookie-policy'];
const locHub = paths.filter(p => p === '/locations');

console.log('TOTAL PAGES IN SITEMAP: ' + paths.length);
console.log('');
console.log('  Homepage:                  1');
console.log('  Countries index:           1');
console.log('  Country pages:            ' + countries.length);
console.log('  Service pages:             ' + services.length);
console.log('  Legal pages:               ' + legals.length);
console.log('  Locations hub:             1');
console.log('  State pages:              ' + states.length + ' (in data)');
console.log('  City pages (T1+T2):       ' + allCities.filter(c => c.tier <= threshold).length + ' (in data)');
console.log('  City pages (T3-excluded):  ' + allCities.filter(c => c.tier > threshold).length + ' (noindex)');
console.log('  Location pages in sitemap: ' + locationPaths.length);
console.log('');
console.log('  INDEX_TIER_THRESHOLD: ' + threshold + ' (tier 1+2 indexed, tier 3 = noindex)');
console.log('');

// STATE CHECK
console.log('══════════════════════════════════════════════');
console.log('  STATES/UTs COVERAGE (' + states.length + ' total)');
console.log('══════════════════════════════════════════════');
let statesOk = 0, statesMissing = [];
for (const s of states) {
  if (sitemapSlugs.includes(s.slug)) statesOk++;
  else statesMissing.push(s);
}
if (statesMissing.length === 0) {
  console.log('✅ ALL ' + states.length + ' states/UTs are in the sitemap!');
} else {
  console.log(statesOk + '/' + states.length + ' states in sitemap');
  statesMissing.forEach(s => console.log('  ❌', s.name));
}
console.log('');

// CITY CHECK (Tier 1+2)
console.log('══════════════════════════════════════════════');
console.log('  TIER 1+2 CITIES (indexed)');
console.log('══════════════════════════════════════════════');
const t12 = allCities.filter(c => c.tier <= threshold);
let citiesOk = 0, citiesMissing = [];
const stateSet = new Set(states.map(s => s.slug));
for (const c of t12) {
  if (stateSet.has(c.slug)) continue; // state+city same slug, already listed
  if (sitemapSlugs.includes(c.slug)) citiesOk++;
  else citiesMissing.push(c);
}
if (citiesMissing.length === 0) {
  console.log('✅ ALL ' + t12.length + ' tier 1+2 cities are in the sitemap!');
} else {
  console.log(citiesOk + '/' + t12.length + ' tier 1+2 cities in sitemap');
  console.log('MISSING:');
  citiesMissing.forEach(c => console.log('  ❌', c.name, '(' + c.slug + ')', '-', c.stateName, '- Tier', c.tier));
}
console.log('');

// TIER 3 CHECK
const t3 = allCities.filter(c => c.tier > threshold);
const t3InMap = t3.filter(c => sitemapSlugs.includes(c.slug));
console.log('══════════════════════════════════════════════');
console.log('  TIER 3 CITIES (' + t3.length + ' total — correctly excluded)');
console.log('══════════════════════════════════════════════');
if (t3InMap.length === 0) {
  console.log('✅ All ' + t3.length + ' tier 3 cities correctly excluded from sitemap');
} else {
  console.log('⚠️ ' + t3InMap.length + ' tier 3 cities in sitemap (should not be)');
}
console.log('');

// FULL STATE LIST
console.log('══════════════════════════════════════════════');
console.log('  FULL STATE LIST WITH CITY BREAKDOWN');
console.log('══════════════════════════════════════════════');
for (let i = 0; i < states.length; i++) {
  const s = states[i];
  const inMap = sitemapSlugs.includes(s.slug) ? '✅' : '❌';
  const cities = allCities.filter(c => c.stateSlug === s.slug);
  const t1 = cities.filter(c => c.tier === 1);
  const t2c = cities.filter(c => c.tier === 2);
  const t3c = cities.filter(c => c.tier === 3);
  const indexed = cities.filter(c => c.tier <= threshold && !stateSet.has(c.slug) && sitemapSlugs.includes(c.slug));
  const total12 = cities.filter(c => c.tier <= threshold && !stateSet.has(c.slug));
  
  let cityStatus = total12.length === 0 ? '' : (indexed.length === total12.length ? ' ✅' : ' ⚠️ ' + indexed.length + '/' + total12.length);
  
  console.log(
    String(i+1).padStart(2) + '. ' + inMap + ' ' + 
    s.name.padEnd(35) + 
    'Cities: ' + String(cities.length).padStart(3) + 
    ' (T1:' + t1.length + ' T2:' + t2c.length + ' T3:' + t3c.length + ')' +
    cityStatus
  );
}

console.log('');
console.log('══════════════════════════════════════════════');
console.log('  GRAND TOTAL ACCESSIBLE PAGES');
console.log('══════════════════════════════════════════════');
const grandTotal = 1 + 1 + countries.length + services.length + legals.length + 1 + locationPaths.length;
const t3Total = allCities.filter(c => c.tier > threshold).length;
console.log('Indexed pages (in sitemap):    ' + paths.length);
console.log('Tier 3 pages (rendered but noindex): ' + t3Total);
console.log('Total renderable pages:        ' + (paths.length + t3Total));
