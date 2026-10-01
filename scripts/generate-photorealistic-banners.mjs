import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.resolve(__dirname, '../src/assets');
const tempDir = path.resolve(__dirname, 'temp_banner_html');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const countryBanners = [
  {
    slug: 'singapore',
    filename: 'singapore-banner.jpg',
    landmarkImg: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1600&auto=format&fit=crop', // Marina Bay Sands
    flagSvg: `<svg viewBox="0 0 900 600" width="100%" height="100%"><rect width="900" height="300" fill="#ee2536"/><rect y="300" width="900" height="300" fill="#ffffff"/><g fill="#ffffff" transform="translate(160, 150)"><path d="M 70 -85 A 85 85 0 1 0 70 85 A 68 68 0 1 1 70 -85 Z"/><g transform="translate(50, 0)"><polygon points="0,-20 6,-6 20,-6 9,4 14,18 0,9 -14,18 -9,4 -20,-6 -6,-6" transform="translate(0, -40) scale(0.85)"/><polygon points="0,-20 6,-6 20,-6 9,4 14,18 0,9 -14,18 -9,4 -20,-6 -6,-6" transform="translate(30, -12) scale(0.85)"/><polygon points="0,-20 6,-6 20,-6 9,4 14,18 0,9 -14,18 -9,4 -20,-6 -6,-6" transform="translate(18, 30) scale(0.85)"/><polygon points="0,-20 6,-6 20,-6 9,4 14,18 0,9 -14,18 -9,4 -20,-6 -6,-6" transform="translate(-18, 30) scale(0.85)"/><polygon points="0,-20 6,-6 20,-6 9,4 14,18 0,9 -14,18 -9,4 -20,-6 -6,-6" transform="translate(-30, -12) scale(0.85)"/></g></g></svg>`,
    glowColor: 'rgba(6, 182, 212, 0.4)'
  },
  {
    slug: 'india',
    filename: 'india-banner.jpg',
    landmarkImg: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1600&auto=format&fit=crop', // Taj Mahal sunset
    flagSvg: `<svg viewBox="0 0 900 600" width="100%" height="100%">
      <rect width="900" height="200" fill="#FF9933"/>
      <rect y="200" width="900" height="200" fill="#FFFFFF"/>
      <rect y="400" width="900" height="200" fill="#128807"/>
      <g transform="translate(450, 300)">
        <circle r="85" fill="none" stroke="#000080" stroke-width="8"/>
        <circle r="16" fill="#000080"/>
        ${Array.from({length: 24}).map((_, i) => {
          const angle = i * 15 * Math.PI / 180;
          return `<line x1="0" y1="0" x2="${85 * Math.cos(angle)}" y2="${85 * Math.sin(angle)}" stroke="#000080" stroke-width="4.5"/>`;
        }).join('')}
      </g>
    </svg>`,
    glowColor: 'rgba(249, 115, 22, 0.5)'
  },
  {
    slug: 'switzerland',
    filename: 'switzerland-banner.jpg',
    landmarkImg: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1600&auto=format&fit=crop', // Matterhorn peak
    flagSvg: `<svg viewBox="0 0 600 600" width="100%" height="100%"><rect width="600" height="600" fill="#da291c"/><rect x="250" y="100" width="100" height="400" fill="#ffffff"/><rect x="100" y="250" width="400" height="100" fill="#ffffff"/></svg>`,
    glowColor: 'rgba(220, 38, 38, 0.4)'
  },
  {
    slug: 'spain',
    filename: 'spain-banner.jpg',
    landmarkImg: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1600&auto=format&fit=crop', // Barcelona Sagrada Familia
    flagSvg: `<svg viewBox="0 0 900 600" width="100%" height="100%"><rect width="900" height="150" fill="#aa151b"/><rect y="150" width="900" height="300" fill="#f1bf00"/><rect y="450" width="900" height="150" fill="#aa151b"/><g transform="translate(220, 300) scale(0.9)"><path d="M -50,-60 L 50,-60 L 50,20 Q 50,70 0,90 Q -50,70 -50,20 Z" fill="#aa151b" stroke="#000000" stroke-width="5"/><circle cx="0" cy="-80" r="28" fill="#f1bf00"/></g></svg>`,
    glowColor: 'rgba(234, 88, 12, 0.4)'
  },
  {
    slug: 'malaysia',
    filename: 'malaysia-banner.jpg',
    landmarkImg: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1600&auto=format&fit=crop', // Petronas Twin Towers
    flagSvg: `<svg viewBox="0 0 900 600" width="100%" height="100%">${Array.from({length: 14}).map((_, i) => `<rect y="${i * (600/14)}" width="900" height="${600/14}" fill="${i % 2 === 0 ? '#cc0000' : '#ffffff'}"/>`).join('')}<rect width="450" height="${8 * (600/14)}" fill="#000066"/><g fill="#ffcc00" transform="translate(200, 170)"><path d="M 30 -60 A 60 60 0 1 0 30 60 A 48 48 0 1 1 30 -60 Z"/><polygon points="60,0 72,12 88,6 82,22 98,28 85,38 94,52 78,50 78,66 66,55 54,66 54,50 38,52 47,38 34,28 50,22 44,6 60,12" transform="translate(30,-30) scale(0.9)"/></g></svg>`,
    glowColor: 'rgba(2, 132, 199, 0.4)'
  },
  {
    slug: 'mauritius',
    filename: 'mauritius-banner.jpg',
    landmarkImg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop', // Mauritius tropical coast
    flagSvg: `<svg viewBox="0 0 900 600" width="100%" height="100%"><rect width="900" height="150" fill="#ea2412"/><rect y="150" width="900" height="150" fill="#1a206d"/><rect y="300" width="900" height="150" fill="#ffd500"/><rect y="450" width="900" height="150" fill="#00a04d"/></svg>`,
    glowColor: 'rgba(6, 182, 212, 0.4)'
  },
  {
    slug: 'netherlands',
    filename: 'netherlands-banner.jpg',
    landmarkImg: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1600&auto=format&fit=crop', // Amsterdam windmills
    flagSvg: `<svg viewBox="0 0 900 600" width="100%" height="100%"><rect width="900" height="200" fill="#AE1C28"/><rect y="200" width="900" height="200" fill="#FFFFFF"/><rect y="400" width="900" height="200" fill="#21468B"/></svg>`,
    glowColor: 'rgba(249, 115, 22, 0.4)'
  },
  {
    slug: 'italy',
    filename: 'italy-banner.jpg',
    landmarkImg: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1600&auto=format&fit=crop', // Colosseum Rome
    flagSvg: `<svg viewBox="0 0 900 600" width="100%" height="100%"><rect width="300" height="600" fill="#009246"/><rect x="300" width="300" height="600" fill="#ffffff"/><rect x="600" width="300" height="600" fill="#ce2b37"/></svg>`,
    glowColor: 'rgba(22, 163, 74, 0.4)'
  },
  {
    slug: 'ukraine',
    filename: 'ukraine-banner.jpg',
    landmarkImg: 'https://images.unsplash.com/photo-1569429593410-b498b3fb3387?q=80&w=1600&auto=format&fit=crop', // Kyiv cathedral
    flagSvg: `<svg viewBox="0 0 900 600" width="100%" height="100%"><rect width="900" height="300" fill="#0057B7"/><rect y="300" width="900" height="300" fill="#FFDD00"/></svg>`,
    glowColor: 'rgba(37, 99, 235, 0.4)'
  },
  {
    slug: 'china',
    filename: 'china-banner.jpg',
    landmarkImg: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1600&auto=format&fit=crop', // Great wall of china
    flagSvg: `<svg viewBox="0 0 900 600" width="100%" height="100%"><rect width="900" height="600" fill="#ee1c25"/><g fill="#ffff00" transform="translate(150, 150)"><polygon points="0,-90 26,-26 90,-26 38,12 56,76 0,36 -56,76 -38,12 -90,-26 -26,-26"/><polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(120, -60) rotate(23)"/><polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(150, -10) rotate(45)"/><polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(150, 50) rotate(0)"/><polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(120, 100) rotate(-23)"/></g></svg>`,
    glowColor: 'rgba(220, 38, 38, 0.4)'
  },
  {
    slug: 'iran',
    filename: 'iran-banner.jpg',
    landmarkImg: 'https://images.unsplash.com/photo-1570700005880-4ecdb8595d4a?q=80&w=1600&auto=format&fit=crop', // Azadi Tower
    flagSvg: `<svg viewBox="0 0 900 600" width="100%" height="100%"><rect width="900" height="200" fill="#239f40"/><rect y="200" width="900" height="200" fill="#ffffff"/><rect y="400" width="900" height="200" fill="#da0000"/><g fill="#da0000" transform="translate(450, 300) scale(1.3)"><path d="M 0,-40 C -15,-20 -25,0 0,35 C 25,0 15,-20 0,-40 Z"/><path d="M -20,-30 C -40,-10 -35,10 -10,30 C -25,10 -25,-10 -20,-30 Z"/><path d="M 20,-30 C 40,-10 35,10 10,30 C 25,10 25,-10 20,-30 Z"/></g></svg>`,
    glowColor: 'rgba(22, 163, 74, 0.4)'
  }
];

async function fetchAsBase64(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    return `data:${contentType};base64,${buffer.toString('base64')}`;
  } catch (err) {
    console.error(`Failed to fetch image ${url}:`, err.message);
    return '';
  }
}

function buildHtml(b, landmarkBase64) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1920px;
      height: 800px;
      background-color: #0b1329;
      overflow: hidden;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .banner-container {
      width: 1920px;
      height: 800px;
      position: relative;
      background: #0b1329;
    }

    /* Landmark Photo Container on Right Side */
    .landmark-container {
      position: absolute;
      right: 0;
      top: 0;
      width: 1150px;
      height: 800px;
      overflow: hidden;
    }
    .landmark-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      filter: contrast(1.08) brightness(1.02);
    }

    /* Soft Gradient Blend Masking photo smoothly into navy background */
    .photo-blend-mask {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, 
        #0b1329 0%, 
        #0b1329 25%, 
        rgba(11, 19, 41, 0.85) 45%, 
        rgba(11, 19, 41, 0.35) 65%, 
        transparent 85%);
    }

    /* Waving 3D Satin Flag draped naturally in top-right sky area */
    .flag-wave-container {
      position: absolute;
      right: -20px;
      top: -30px;
      width: 950px;
      height: 650px;
      pointer-events: none;
      perspective: 1000px;
    }
    .flag-wave-card {
      width: 100%;
      height: 100%;
      position: relative;
      transform: rotateY(-14deg) rotateX(8deg) rotateZ(-3deg);
      transform-origin: right top;
    }
    .flag-svg-wrapper {
      width: 100%;
      height: 100%;
      opacity: 0.88;
      filter: drop-shadow(-15px 25px 35px rgba(0,0,0,0.7));
    }
    .satin-folds {
      position: absolute;
      inset: 0;
      background: 
        linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%),
        repeating-linear-gradient(115deg, transparent 0px, transparent 50px, rgba(255,255,255,0.22) 80px, rgba(0,0,0,0.35) 110px, transparent 140px);
      mix-blend-mode: overlay;
    }

    /* Ambient Warm Glow behind landmark & flag */
    .glow-orb {
      position: absolute;
      right: 250px;
      top: 100px;
      width: 750px;
      height: 750px;
      background: radial-gradient(circle, ${b.glowColor} 0%, transparent 70%);
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }

    /* Signature Golden Sweeping Arcs & Particle Dust Overlay */
    .golden-arc-svg {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div class="banner-container">
    <!-- Landmark Photo Base (Real Sunset Landmark) -->
    <div class="landmark-container">
      ${landmarkBase64 ? `<img src="${landmarkBase64}" class="landmark-photo" alt="Landmark" />` : ''}
      <div class="photo-blend-mask"></div>
    </div>

    <!-- Ambient Lighting Glow -->
    <div class="glow-orb"></div>

    <!-- 3D Waving Satin Flag Draped Over Sky -->
    <div class="flag-wave-container">
      <div class="flag-wave-card">
        <div class="flag-svg-wrapper">
          ${b.flagSvg}
        </div>
        <div class="satin-folds"></div>
      </div>
    </div>

    <!-- Signature Golden & Cyan Sweeping Arc Curves matching UK & Australia banner -->
    <div class="golden-arc-svg">
      <svg viewBox="0 0 1920 800" width="1920" height="800">
        <!-- Glowing Sweeping Arcs -->
        <path d="M 920,-50 Q 1180,400 900,850" fill="none" stroke="#fbbf24" stroke-width="3.5" opacity="0.9" filter="drop-shadow(0 0 8px #fbbf24)" />
        <path d="M 940,-50 Q 1200,400 920,850" fill="none" stroke="#38bdf8" stroke-width="1.8" opacity="0.75" />
        <path d="M 900,-50 Q 1160,400 880,850" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.4" />

        <!-- Floating Golden Dust Particles -->
        <g fill="#fbbf24" opacity="0.9">
          <circle cx="980" cy="220" r="3"/>
          <circle cx="1040" cy="340" r="4"/>
          <circle cx="1010" cy="480" r="2.5"/>
          <circle cx="950" cy="610" r="3.5"/>
          <circle cx="1080" cy="150" r="2"/>
          <circle cx="1020" cy="560" r="4"/>
          <circle cx="910" cy="720" r="3"/>
        </g>
      </svg>
    </div>
  </div>
</body>
</html>`;
}

function buildGlobalCountriesHtml(worldLandmarkBase64) {
  const flagsData = [
    { name: "UK", code: "🇬🇧", svg: `<svg viewBox="0 0 600 400"><clipPath id="uk-c"><rect width="600" height="400"/></clipPath><g clip-path="url(#uk-c)"><rect width="600" height="400" fill="#012169"/><path d="M0,0 L600,400 M600,0 L0,400" stroke="#ffffff" stroke-width="80"/><path d="M0,0 L600,400 M600,0 L0,400" stroke="#C8102E" stroke-width="40"/><path d="M300,0 V400 M0,200 H600" stroke="#ffffff" stroke-width="120"/><path d="M300,0 V400 M0,200 H600" stroke="#C8102E" stroke-width="70"/></g></svg>` },
    { name: "USA", code: "🇺🇸", svg: `<svg viewBox="0 0 760 400"><rect width="760" height="400" fill="#B22234"/>${[30.7, 92.3, 153.8, 215.3, 276.9, 338.4].map(y => `<rect y="${y}" width="760" height="30.7" fill="#ffffff"/>`).join('')}<rect width="304" height="215.3" fill="#3C3B6E"/><g fill="#ffffff">${Array.from({length: 20}).map((_, i) => `<circle cx="${30 + (i%5)*60}" cy="${25 + Math.floor(i/5)*45}" r="8"/>`).join('')}</g></svg>` },
    { name: "Canada", code: "🇨🇦", svg: `<svg viewBox="0 0 600 400"><rect width="150" height="400" fill="#FF0000"/><rect x="150" width="300" height="400" fill="#FFFFFF"/><rect x="450" width="150" height="400" fill="#FF0000"/><g fill="#FF0000" transform="translate(300, 200) scale(1.4)"><polygon points="0,-70 12,-35 45,-45 28,-18 55,0 22,12 30,50 0,32 -30,50 -22,12 -55,0 -28,-18 -45,-45 -12,-35"/></g></svg>` },
    { name: "Australia", code: "🇦🇺", svg: `<svg viewBox="0 0 600 400"><rect width="600" height="400" fill="#000080"/><path d="M0,0 L300,200 M300,0 L0,200" stroke="#ffffff" stroke-width="40"/><path d="M150,0 V200 M0,100 H300" stroke="#ffffff" stroke-width="60"/><path d="M150,0 V200 M0,100 H300" stroke="#cc0000" stroke-width="35"/><g fill="#ffffff"><polygon points="150,250 156,268 175,268 160,279 165,297 150,286 135,297 140,279 125,268 144,268" transform="translate(0,40) scale(1.2)"/><polygon points="450,80 454,92 467,92 456,100 460,112 450,104 440,112 444,100 433,92 446,92" transform="scale(0.8)"/><polygon points="500,160 504,172 517,172 506,180 510,192 500,184 490,192 494,180 483,172 496,172" transform="scale(0.8)"/><polygon points="450,260 454,272 467,272 456,280 460,292 450,284 440,292 444,280 433,272 446,272" transform="scale(0.8)"/></g></svg>` },
    { name: "New Zealand", code: "🇳🇿", svg: `<svg viewBox="0 0 600 400"><rect width="600" height="400" fill="#00247D"/><path d="M0,0 L300,200 M300,0 L0,200" stroke="#ffffff" stroke-width="40"/><path d="M150,0 V200 M0,100 H300" stroke="#ffffff" stroke-width="60"/><path d="M150,0 V200 M0,100 H300" stroke="#CC0000" stroke-width="35"/><g fill="#CC0000" stroke="#ffffff" stroke-width="4"><polygon points="450,80 454,92 467,92 456,100 460,112 450,104 440,112 444,100 433,92 446,92" transform="scale(0.8)"/><polygon points="500,160 504,172 517,172 506,180 510,192 500,184 490,192 494,180 483,172 496,172" transform="scale(0.8)"/><polygon points="450,260 454,272 467,272 456,280 460,292 450,284 440,292 444,280 433,272 446,272" transform="scale(0.8)"/></g></svg>` },
    { name: "Singapore", code: "🇸🇬", svg: `<svg viewBox="0 0 600 400"><rect width="600" height="200" fill="#ee2536"/><rect y="200" width="600" height="200" fill="#ffffff"/><g fill="#ffffff" transform="translate(100, 100) scale(0.65)"><path d="M 70 -85 A 85 85 0 1 0 70 85 A 68 68 0 1 1 70 -85 Z"/><g transform="translate(50, 0)"><polygon points="0,-20 6,-6 20,-6 9,4 14,18 0,9 -14,18 -9,4 -20,-6 -6,-6" transform="translate(0, -40)"/><polygon points="0,-20 6,-6 20,-6 9,4 14,18 0,9 -14,18 -9,4 -20,-6 -6,-6" transform="translate(30, -12)"/><polygon points="0,-20 6,-6 20,-6 9,4 14,18 0,9 -14,18 -9,4 -20,-6 -6,-6" transform="translate(18, 30)"/><polygon points="0,-20 6,-6 20,-6 9,4 14,18 0,9 -14,18 -9,4 -20,-6 -6,-6" transform="translate(-18, 30)"/><polygon points="0,-20 6,-6 20,-6 9,4 14,18 0,9 -14,18 -9,4 -20,-6 -6,-6" transform="translate(-30, -12)"/></g></g></svg>` },
    { name: "Ireland", code: "🇮🇪", svg: `<svg viewBox="0 0 600 400"><rect width="200" height="400" fill="#169B62"/><rect x="200" width="200" height="400" fill="#FFFFFF"/><rect x="400" width="200" height="400" fill="#FF883E"/></svg>` },
    { name: "France", code: "🇫🇷", svg: `<svg viewBox="0 0 600 400"><rect width="200" height="400" fill="#002395"/><rect x="200" width="200" height="400" fill="#FFFFFF"/><rect x="400" width="200" height="400" fill="#ED2939"/></svg>` },
    { name: "Germany", code: "🇩🇪", svg: `<svg viewBox="0 0 600 400"><rect width="600" height="133.3" fill="#000000"/><rect y="133.3" width="600" height="133.3" fill="#FF0000"/><rect y="266.6" width="600" height="133.3" fill="#FFCC00"/></svg>` },
    { name: "UAE", code: "🇦🇪", svg: `<svg viewBox="0 0 600 400"><rect width="600" height="133.3" fill="#00732F"/><rect y="133.3" width="600" height="133.3" fill="#FFFFFF"/><rect y="266.6" width="600" height="133.3" fill="#000000"/><rect width="150" height="400" fill="#FF0000"/></svg>` },
    { name: "India", code: "🇮🇳", svg: `<svg viewBox="0 0 600 400"><rect width="600" height="133.3" fill="#FF9933"/><rect y="133.3" width="600" height="133.3" fill="#FFFFFF"/><rect y="266.6" width="600" height="133.3" fill="#128807"/><g transform="translate(300, 200)"><circle r="55" fill="none" stroke="#000080" stroke-width="6"/><circle r="10" fill="#000080"/>${Array.from({length: 24}).map((_, i) => { const a = i * 15 * Math.PI / 180; return `<line x1="0" y1="0" x2="${55 * Math.cos(a)}" y2="${55 * Math.sin(a)}" stroke="#000080" stroke-width="3"/>`; }).join('')}</g></svg>`, featured: true },
    { name: "Switzerland", code: "🇨🇭", svg: `<svg viewBox="0 0 400 400"><rect width="400" height="400" fill="#DA291C"/><rect x="165" y="65" width="70" height="270" fill="#FFFFFF"/><rect x="65" y="165" width="270" height="70" fill="#FFFFFF"/></svg>` },
    { name: "Spain", code: "🇪🇸", svg: `<svg viewBox="0 0 600 400"><rect width="600" height="100" fill="#AA151B"/><rect y="100" width="600" height="200" fill="#F1BF00"/><rect y="300" width="600" height="100" fill="#AA151B"/><g transform="translate(150, 200) scale(0.6)"><path d="M -50,-60 L 50,-60 L 50,20 Q 50,70 0,90 Q -50,70 -50,20 Z" fill="#AA151B" stroke="#000000" stroke-width="5"/><circle cx="0" cy="-80" r="28" fill="#F1BF00"/></g></svg>` },
    { name: "Malaysia", code: "🇲🇾", svg: `<svg viewBox="0 0 600 400">${Array.from({length: 14}).map((_, i) => `<rect y="${i * (400/14)}" width="600" height="${400/14}" fill="${i % 2 === 0 ? '#cc0000' : '#ffffff'}"/>`).join('')}<rect width="300" height="${8 * (400/14)}" fill="#000066"/><g fill="#ffcc00" transform="translate(130, 110) scale(0.65)"><path d="M 30 -60 A 60 60 0 1 0 30 60 A 48 48 0 1 1 30 -60 Z"/><polygon points="60,0 72,12 88,6 82,22 98,28 85,38 94,52 78,50 78,66 66,55 54,66 54,50 38,52 47,38 34,28 50,22 44,6 60,12" transform="translate(30,-30)"/></g></svg>` },
    { name: "Mauritius", code: "🇲🇺", svg: `<svg viewBox="0 0 600 400"><rect width="600" height="100" fill="#EA2412"/><rect y="100" width="600" height="100" fill="#1A206D"/><rect y="200" width="600" height="100" fill="#FFD500"/><rect y="300" width="600" height="100" fill="#00A04D"/></svg>` },
    { name: "Netherlands", code: "🇳🇱", svg: `<svg viewBox="0 0 600 400"><rect width="600" height="133.3" fill="#AE1C28"/><rect y="133.3" width="600" height="133.3" fill="#FFFFFF"/><rect y="266.6" width="600" height="133.3" fill="#21468B"/></svg>` },
    { name: "Italy", code: "🇮🇹", svg: `<svg viewBox="0 0 600 400"><rect width="200" height="400" fill="#009246"/><rect x="200" width="200" height="400" fill="#FFFFFF"/><rect x="400" width="200" height="400" fill="#CE2B37"/></svg>` },
    { name: "Russia", code: "🇷🇺", svg: `<svg viewBox="0 0 600 400"><rect width="600" height="133.3" fill="#FFFFFF"/><rect y="133.3" width="600" height="133.3" fill="#0039A6"/><rect y="266.6" width="600" height="133.3" fill="#D52B1E"/></svg>` },
    { name: "Ukraine", code: "🇺🇦", svg: `<svg viewBox="0 0 600 400"><rect width="600" height="200" fill="#0057B7"/><rect y="200" width="600" height="200" fill="#FFDD00"/></svg>` },
    { name: "China", code: "🇨🇳", svg: `<svg viewBox="0 0 600 400"><rect width="600" height="400" fill="#EE1C25"/><g fill="#FFFF00" transform="translate(100, 100) scale(0.65)"><polygon points="0,-90 26,-26 90,-26 38,12 56,76 0,36 -56,76 -38,12 -90,-26 -26,-26"/><polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(120, -60) rotate(23)"/><polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(150, -10) rotate(45)"/><polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(150, 50) rotate(0)"/><polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(120, 100) rotate(-23)"/></g></svg>` },
    { name: "Japan", code: "🇯🇵", svg: `<svg viewBox="0 0 600 400"><rect width="600" height="400" fill="#FFFFFF"/><circle cx="300" cy="200" r="120" fill="#BC002D"/></svg>` },
    { name: "Iran", code: "🇮🇷", svg: `<svg viewBox="0 0 600 400"><rect width="600" height="133.3" fill="#239F40"/><rect y="133.3" width="600" height="133.3" fill="#FFFFFF"/><rect y="266.6" width="600" height="133.3" fill="#DA0000"/><g fill="#DA0000" transform="translate(300, 200) scale(1.1)"><path d="M 0,-40 C -15,-20 -25,0 0,35 C 25,0 15,-20 0,-40 Z"/><path d="M -20,-30 C -40,-10 -35,10 -10,30 C -25,10 -25,-10 -20,-30 Z"/><path d="M 20,-30 C 40,-10 35,10 10,30 C 25,10 25,-10 20,-30 Z"/></g></svg>` }
  ];

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1920px;
      height: 800px;
      background-color: #0b1329;
      overflow: hidden;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .banner-container {
      width: 1920px;
      height: 800px;
      position: relative;
      background: #0b1329;
    }

    /* World Landmark Photo Container on Right Side */
    .landmark-container {
      position: absolute;
      right: 0;
      top: 0;
      width: 1250px;
      height: 800px;
      overflow: hidden;
    }
    .landmark-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      filter: contrast(1.1) brightness(0.9);
    }

    /* Soft Gradient Blend Masking photo smoothly into navy background */
    .photo-blend-mask {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, 
        #0b1329 0%, 
        #0b1329 25%, 
        rgba(11, 19, 41, 0.88) 45%, 
        rgba(11, 19, 41, 0.45) 70%, 
        transparent 95%);
    }

    /* Ambient Lighting Glow Orbs */
    .glow-orb-primary {
      position: absolute;
      right: 280px;
      top: 60px;
      width: 750px;
      height: 750px;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(56, 189, 248, 0.2) 50%, transparent 75%);
      border-radius: 50%;
      filter: blur(100px);
      pointer-events: none;
    }

    /* 3D Floating Grid/Sphere Container for ALL 22 Flags */
    .flags-matrix-container {
      position: absolute;
      right: 30px;
      top: 40px;
      width: 1050px;
      height: 720px;
      perspective: 1200px;
      pointer-events: none;
    }

    .flags-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 16px 14px;
      width: 100%;
      height: 100%;
      padding: 20px;
      transform: rotateY(-14deg) rotateX(7deg) rotateZ(-2deg);
      transform-origin: right center;
    }

    .flag-badge-card {
      position: relative;
      height: 140px;
      border-radius: 14px;
      overflow: hidden;
      background: rgba(15, 23, 42, 0.85);
      border: 1.5px solid rgba(255, 255, 255, 0.25);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.3);
      display: flex;
      flex-direction: column;
      backdrop-filter: blur(10px);
      transition: transform 0.3s ease;
    }

    .flag-badge-card.featured-india {
      grid-column: span 2;
      grid-row: span 2;
      height: 296px;
      border: 3px solid #fbbf24;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(249, 115, 22, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.6);
      z-index: 10;
    }

    .flag-svg-area {
      width: 100%;
      flex: 1;
      position: relative;
      overflow: hidden;
    }
    .flag-svg-area svg {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .satin-shine {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 45%, rgba(0,0,0,0.55) 100%);
      mix-blend-mode: overlay;
    }

    .flag-label-bar {
      height: 32px;
      background: rgba(11, 19, 41, 0.92);
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      display: flex;
      items-center;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 0 8px;
    }
    .flag-label-bar.featured-bar {
      height: 48px;
      background: linear-gradient(90deg, #78350f, #b45309, #78350f);
    }

    .country-code-emoji {
      font-size: 16px;
      line-height: 1;
    }
    .country-title {
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.3px;
      white-space: nowrap;
      text-shadow: 0 1px 3px rgba(0,0,0,0.8);
    }
    .featured-title {
      font-size: 18px;
      font-weight: 900;
      color: #fef08a;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* Signature Sweeping Golden Arcs & Floating Light Particles */
    .golden-arc-svg {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 15;
    }
  </style>
</head>
<body>
  <div class="banner-container">
    <!-- World Landmarks Background Photo -->
    <div class="landmark-container">
      ${worldLandmarkBase64 ? `<img src="${worldLandmarkBase64}" class="landmark-photo" alt="World Landmarks" />` : ''}
      <div class="photo-blend-mask"></div>
    </div>

    <!-- Ambient Glow Orbs -->
    <div class="glow-orb-primary"></div>

    <!-- 3D Matrix Display of ALL 22 Country Flags -->
    <div class="flags-matrix-container">
      <div class="flags-grid">
        ${flagsData.map(f => {
          if (f.featured) {
            return `
            <div class="flag-badge-card featured-india">
              <div class="flag-svg-area">
                ${f.svg}
                <div class="satin-shine"></div>
              </div>
              <div class="flag-label-bar featured-bar">
                <span class="country-code-emoji" style="font-size:24px;">${f.code}</span>
                <span class="country-title featured-title">Study in India 🇮🇳</span>
              </div>
            </div>`;
          }
          return `
          <div class="flag-badge-card">
            <div class="flag-svg-area">
              ${f.svg}
              <div class="satin-shine"></div>
            </div>
            <div class="flag-label-bar">
              <span class="country-code-emoji">${f.code}</span>
              <span class="country-title">${f.name}</span>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Signature Golden & Cyan Sweeping Arc Curves -->
    <div class="golden-arc-svg">
      <svg viewBox="0 0 1920 800" width="1920" height="800">
        <!-- Glowing Sweeping Arcs -->
        <path d="M 820,-50 Q 1120,380 790,850" fill="none" stroke="#fbbf24" stroke-width="4.5" opacity="0.95" filter="drop-shadow(0 0 12px #fbbf24)" />
        <path d="M 850,-50 Q 1150,380 820,850" fill="none" stroke="#38bdf8" stroke-width="2.5" opacity="0.85" />
        <path d="M 790,-50 Q 1090,380 760,850" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.5" />

        <!-- Floating Golden Particles -->
        <g fill="#fbbf24" opacity="0.95">
          <circle cx="880" cy="160" r="4"/>
          <circle cx="980" cy="260" r="5"/>
          <circle cx="940" cy="400" r="3.5"/>
          <circle cx="860" cy="560" r="4.5"/>
          <circle cx="1020" cy="100" r="3"/>
          <circle cx="960" cy="490" r="5"/>
          <circle cx="830" cy="670" r="3.5"/>
          <circle cx="1080" cy="200" r="4"/>
          <circle cx="910" cy="310" r="3"/>
        </g>
      </svg>
    </div>
  </div>
</body>
</html>`;
}

async function main() {
  console.log('Generating high quality photorealistic banners with Base64 images...');

  // 1. Render all country banners in countryBanners array
  for (const b of countryBanners) {
    console.log(`Fetching landmark image for ${b.slug}...`);
    const landmarkBase64 = await fetchAsBase64(b.landmarkImg);
    
    const html = buildHtml(b, landmarkBase64);
    const htmlPath = path.join(tempDir, `${b.slug}.html`);
    fs.writeFileSync(htmlPath, html, 'utf8');

    const jpgOutputPath = path.join(assetsDir, b.filename);
    const cmd = `"${edgePath}" --headless --disable-gpu --screenshot="${jpgOutputPath}" --window-size=1920,800 "file:///${htmlPath.replace(/\\/g, '/')}"`;

    try {
      execSync(cmd);
      console.log(`✓ Rendered ${b.filename} (${fs.statSync(jpgOutputPath).size} bytes)`);
    } catch (e) {
      console.error(`Failed to render ${b.filename}:`, e.message);
    }
  }

  // 2. Render Global Combined Countries Banner for /countries
  console.log('Fetching world landmarks image for global-countries-banner...');
  const worldLandmarksImg = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop';
  const worldLandmarkBase64 = await fetchAsBase64(worldLandmarksImg);
  const globalHtml = buildGlobalCountriesHtml(worldLandmarkBase64);
  const globalHtmlPath = path.join(tempDir, `global-countries.html`);
  fs.writeFileSync(globalHtmlPath, globalHtml, 'utf8');

  const globalJpgOutputPath = path.join(assetsDir, 'global-countries-banner.jpg');
  const globalCmd = `"${edgePath}" --headless --disable-gpu --screenshot="${globalJpgOutputPath}" --window-size=1920,800 "file:///${globalHtmlPath.replace(/\\/g, '/')}"`;

  try {
    execSync(globalCmd);
    console.log(`✓ Rendered global-countries-banner.jpg (${fs.statSync(globalJpgOutputPath).size} bytes)`);
  } catch (e) {
    console.error(`Failed to render global-countries-banner.jpg:`, e.message);
  }

  // Clean up SVG files if present so JPG assets take precedence
  const svgFiles = [
    'singapore-banner.svg', 'india-banner.svg', 'switzerland-banner.svg',
    'spain-banner.svg', 'malaysia-banner.svg', 'mauritius-banner.svg',
    'netherlands-banner.svg', 'italy-banner.svg', 'ukraine-banner.svg',
    'china-banner.svg', 'iran-banner.svg'
  ];
  for (const s of svgFiles) {
    const p = path.join(assetsDir, s);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log(`Cleaned up temporary SVG file: ${s}`);
    }
  }

  console.log('All photorealistic 1920x800 banner JPGs created successfully!');
}

main();

