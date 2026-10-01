import { readFileSync, existsSync } from 'fs';

function audit(route, file) {
  if (!existsSync(file)) { console.log(`\n❌ ${route} — FILE NOT FOUND: ${file}`); return; }
  const h = readFileSync(file, 'utf8');
  
  console.log(`\n${'='.repeat(70)}`);
  console.log(`PAGE: ${route}`);
  console.log('='.repeat(70));
  
  const titleMatch = h.match(/<title>([^<]+)<\/title>/);
  console.log(`📌 TITLE: ${titleMatch?.[1] || 'MISSING ❌'}`);
  
  const descMatch = h.match(/<meta\s+name="description"\s+content="([^"]+)"/);
  console.log(`📝 DESC: ${descMatch?.[1]?.substring(0, 140) || 'MISSING ❌'}`);
  
  const kwMatch = h.match(/<meta\s+name="keywords"\s+content="([^"]+)"/);
  console.log(`🔑 KEYWORDS: ${kwMatch ? kwMatch[1].substring(0, 200) : 'MISSING ❌'}`);
  
  const canMatch = h.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
  console.log(`🔗 CANONICAL: ${canMatch?.[1] || 'MISSING ❌'}`);
  
  const robotsMatch = h.match(/<meta\s+name="robots"\s+content="([^"]+)"/);
  console.log(`🤖 ROBOTS: ${robotsMatch?.[1] || 'MISSING ❌'}`);

  const ogImgMatch = h.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
  console.log(`🖼️  OG IMAGE: ${ogImgMatch?.[1] || 'MISSING ❌'}`);
  
  // Extract all JSON-LD schemas and show their types
  const jsonLdBlocks = [...h.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  console.log(`📊 JSON-LD SCHEMAS: ${jsonLdBlocks.length}`);
  jsonLdBlocks.forEach((m, i) => {
    try {
      const obj = JSON.parse(m[1]);
      const type = obj['@type'] || 'Unknown';
      const name = obj.name || obj.mainEntity?.length ? `(${obj.mainEntity?.length || 0} items)` : '';
      console.log(`   ${i+1}. ${type}${name ? ' — ' + (typeof name === 'string' ? name.substring(0,60) : name) : ''}`);
      
      // Show key properties
      if (obj.founder) console.log(`      👤 founder: ${obj.founder.name}`);
      if (obj.logo) console.log(`      🖼️  logo: ${typeof obj.logo === 'string' ? obj.logo : obj.logo.url}`);
      if (obj.image) console.log(`      🖼️  image: ${typeof obj.image === 'string' ? obj.image.substring(0,80) : 'present'}`);
      if (obj.breadcrumb) {
        const crumbs = obj.breadcrumb.itemListElement?.map(c => c.name).join(' → ');
        console.log(`      🍞 breadcrumb: ${crumbs}`);
      }
      if (obj.itemListElement && obj['@type'] === 'BreadcrumbList') {
        const crumbs = obj.itemListElement.map(c => c.name).join(' → ');
        console.log(`      🍞 breadcrumb: ${crumbs}`);
      }
      if (obj.hasOfferCatalog) {
        const services = obj.hasOfferCatalog.itemListElement?.map(s => s.itemOffered?.name).join(', ');
        console.log(`      🛎️  services: ${services?.substring(0,120)}`);
      }
      if (obj.mainEntity && Array.isArray(obj.mainEntity)) {
        console.log(`      ❓ FAQs: ${obj.mainEntity.length} questions`);
      }
      if (obj.speakable) console.log(`      🗣️  speakable: yes (voice/AI assistant support)`);
      if (obj.knowsAbout) console.log(`      🧠 knowsAbout: ${obj.knowsAbout.length} topics`);
      if (obj.areaServed) console.log(`      🌍 areaServed: ${typeof obj.areaServed === 'string' ? obj.areaServed : obj.areaServed.name}`);
    } catch { console.log(`   ${i+1}. (parse error)`); }
  });

  // H1
  const h1Match = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (h1Match) {
    const h1Text = h1Match[1].replace(/<[^>]+>/g, '').trim();
    console.log(`📣 H1: "${h1Text.substring(0, 100)}"`);
  }
  
  // Visible content size
  const rootMatch = h.match(/<div id="root">([\s\S]*?)<\/div>\s*<script/);
  if (rootMatch) {
    const text = rootMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`📄 CONTENT: ${text.length} chars of visible text`);
  }
}

// Contact, About, Countries
audit('/contact', 'dist/contact/index.html');
audit('/about', 'dist/about/index.html');
audit('/countries', 'dist/countries/index.html');

// Service pages
audit('/career-counselling', 'dist/career-counselling/index.html');
audit('/admission-guidance', 'dist/admission-guidance/index.html');
audit('/financial-assistance', 'dist/financial-assistance/index.html');
audit('/scholarship-assistance', 'dist/scholarship-assistance/index.html');
audit('/visa-assistance', 'dist/visa-assistance/index.html');
audit('/student-accommodation', 'dist/student-accommodation/index.html');
audit('/test-preparations', 'dist/test-preparations/index.html');
audit('/insurance-assistance', 'dist/insurance-assistance/index.html');
audit('/travel-forex-assistance', 'dist/travel-forex-assistance/index.html');

// Countries (Ukraine, Iran via /countries/)
audit('/countries/ukraine', 'dist/countries/ukraine/index.html');
audit('/countries/iran', 'dist/countries/iran/index.html');
