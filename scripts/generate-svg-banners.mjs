import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.resolve(__dirname, '../src/assets');

const banners = [
  {
    slug: 'singapore',
    filename: 'singapore-banner.svg',
    primaryColor: '#ef4444',
    accentColor: '#06b6d4',
    goldColor: '#f59e0b',
    flagContent: `
      <rect width="900" height="300" fill="#ee2536"/>
      <rect y="300" width="900" height="300" fill="#ffffff"/>
      <g fill="#ffffff" transform="translate(140, 150)">
        <path d="M 60 -75 A 75 75 0 1 0 60 75 A 60 60 0 1 1 60 -75 Z"/>
        <g transform="translate(45, 0)">
          <polygon points="0,-18 5,-5 18,-5 8,3 12,16 0,8 -12,16 -8,3 -18,-5 -5,-5" transform="translate(0, -35) scale(0.7)"/>
          <polygon points="0,-18 5,-5 18,-5 8,3 12,16 0,8 -12,16 -8,3 -18,-5 -5,-5" transform="translate(25, -10) scale(0.7)"/>
          <polygon points="0,-18 5,-5 18,-5 8,3 12,16 0,8 -12,16 -8,3 -18,-5 -5,-5" transform="translate(15, 25) scale(0.7)"/>
          <polygon points="0,-18 5,-5 18,-5 8,3 12,16 0,8 -12,16 -8,3 -18,-5 -5,-5" transform="translate(-15, 25) scale(0.7)"/>
          <polygon points="0,-18 5,-5 18,-5 8,3 12,16 0,8 -12,16 -8,3 -18,-5 -5,-5" transform="translate(-25, -10) scale(0.7)"/>
        </g>
      </g>
    `,
    landmarks: `
      <g stroke="#06b6d4" stroke-width="3" fill="none" opacity="0.9">
        <!-- Marina Bay Sands Towers -->
        <path d="M 1100,650 L 1120,280 L 1190,280 L 1210,650 Z" fill="#030712" fill-opacity="0.7"/>
        <path d="M 1230,650 L 1250,260 L 1320,260 L 1340,650 Z" fill="#030712" fill-opacity="0.7"/>
        <path d="M 1360,650 L 1380,280 L 1450,280 L 1470,650 Z" fill="#030712" fill-opacity="0.7"/>
        <path d="M 1070,270 Q 1300,200 1530,260 Q 1540,280 1520,290 Q 1300,230 1080,290 Z" fill="#f59e0b" fill-opacity="0.4" stroke="#f59e0b" stroke-width="4"/>
        <!-- Supertree Grove -->
        <path d="M 1580,650 L 1600,420 Q 1550,320 1520,300 Q 1600,320 1600,420 Q 1600,320 1680,300 Q 1650,320 1600,420 L 1620,650 Z" stroke="#38bdf8" stroke-width="3.5"/>
        <path d="M 1720,650 L 1735,480 Q 1690,400 1670,380 Q 1735,400 1735,480 Q 1735,400 1800,380 Q 1780,400 1735,480 L 1750,650 Z" stroke="#f43f5e" stroke-width="3"/>
        <!-- Merlion Outline -->
        <path d="M 940,650 Q 950,520 980,480 Q 1000,450 980,420 Q 960,400 990,370 Q 1020,360 1030,390 Q 1040,430 1010,480 Q 1030,540 1060,650 Z" stroke="#ffffff" stroke-width="3" fill="#ffffff" fill-opacity="0.1"/>
      </g>
    `
  },
  {
    slug: 'india',
    filename: 'india-banner.svg',
    primaryColor: '#f97316',
    accentColor: '#10b981',
    goldColor: '#fbbf24',
    flagContent: `
      <rect width="900" height="200" fill="#FF9933"/>
      <rect y="200" width="900" height="200" fill="#FFFFFF"/>
      <rect y="400" width="900" height="200" fill="#128807"/>
      <g transform="translate(450, 300)">
        <circle r="85" fill="none" stroke="#000080" stroke-width="8"/>
        <circle r="15" fill="#000080"/>
        ${Array.from({length: 24}).map((_, i) => `
          <line x1="0" y1="0" x2="${85 * Math.cos(i * 15 * Math.PI / 180)}" y2="${85 * Math.sin(i * 15 * Math.PI / 180)}" stroke="#000080" stroke-width="4"/>
        `).join('')}
      </g>
    `,
    landmarks: `
      <g stroke="#fbbf24" stroke-width="3" fill="none" opacity="0.9">
        <!-- Taj Mahal Central Dome -->
        <path d="M 1250,650 L 1250,450 Q 1200,430 1200,350 Q 1200,240 1300,210 Q 1400,240 1400,350 Q 1400,430 1350,450 L 1350,650 Z" fill="#030712" fill-opacity="0.75"/>
        <path d="M 1300,210 L 1300,160 M 1290,175 L 1310,175" stroke="#fbbf24" stroke-width="5"/>
        <!-- Side Domes -->
        <path d="M 1150,650 L 1150,420 Q 1120,400 1120,350 Q 1120,290 1170,270 Q 1220,290 1220,350 Q 1220,400 1190,420 L 1190,650 Z" fill="#030712" fill-opacity="0.6"/>
        <path d="M 1410,650 L 1410,420 Q 1380,400 1380,350 Q 1380,290 1430,270 Q 1480,290 1480,350 Q 1480,400 1450,420 L 1450,650 Z" fill="#030712" fill-opacity="0.6"/>
        <!-- Four Minarets -->
        <path d="M 1020,650 L 1030,220 L 1060,220 L 1070,650 Z" stroke="#f97316" stroke-width="3" fill="#030712" fill-opacity="0.8"/>
        <path d="M 1015,220 L 1075,220 M 1025,190 Q 1045,170 1065,190 Z" stroke="#fbbf24"/>
        <path d="M 1530,650 L 1540,220 L 1570,220 L 1580,650 Z" stroke="#10b981" stroke-width="3" fill="#030712" fill-opacity="0.8"/>
        <path d="M 1525,220 L 1585,220 M 1535,190 Q 1555,170 1575,190 Z" stroke="#fbbf24"/>
        <!-- India Gate Arch -->
        <path d="M 920,650 L 920,460 L 1000,460 L 1000,650 Z" stroke="#f97316"/>
        <path d="M 940,650 L 940,520 Q 960,480 980,520 L 980,650 Z" stroke="#fbbf24"/>
      </g>
    `
  },
  {
    slug: 'switzerland',
    filename: 'switzerland-banner.svg',
    primaryColor: '#dc2626',
    accentColor: '#38bdf8',
    goldColor: '#f59e0b',
    flagContent: `
      <rect width="600" height="600" fill="#da291c"/>
      <rect x="250" y="100" width="100" height="400" fill="#ffffff"/>
      <rect x="100" y="250" width="400" height="100" fill="#ffffff"/>
    `,
    landmarks: `
      <g stroke="#38bdf8" stroke-width="3" fill="none" opacity="0.9">
        <!-- Matterhorn Peak -->
        <path d="M 950,650 L 1150,380 L 1250,180 L 1350,320 L 1450,260 L 1750,650 Z" fill="#030712" fill-opacity="0.75" stroke="#ffffff" stroke-width="4"/>
        <path d="M 1250,180 L 1230,350 L 1290,480 L 1350,650" stroke="#38bdf8" stroke-dasharray="6,6" stroke-width="3"/>
        <path d="M 1250,180 L 1320,280 L 1400,420 L 1550,650" stroke="#93c5fd" stroke-width="3"/>
        <!-- Snowcap Glow -->
        <path d="M 1250,180 L 1200,270 Q 1250,260 1280,240 Z" fill="#ffffff" fill-opacity="0.5"/>
        <!-- Lucerne Chapel Bridge Tower -->
        <path d="M 980,650 L 990,380 L 1050,380 L 1060,650 Z" fill="#030712" fill-opacity="0.8" stroke="#dc2626" stroke-width="3.5"/>
        <path d="M 970,380 L 1020,280 L 1070,380 Z" fill="#dc2626" fill-opacity="0.5" stroke="#f59e0b" stroke-width="3"/>
      </g>
    `
  },
  {
    slug: 'spain',
    filename: 'spain-banner.svg',
    primaryColor: '#ea580c',
    accentColor: '#eab308',
    goldColor: '#f59e0b',
    flagContent: `
      <rect width="900" height="150" fill="#aa151b"/>
      <rect y="150" width="900" height="300" fill="#f1bf00"/>
      <rect y="450" width="900" height="150" fill="#aa151b"/>
      <g transform="translate(200, 300) scale(0.85)">
        <path d="M -50,-60 L 50,-60 L 50,20 Q 50,70 0,90 Q -50,70 -50,20 Z" fill="#aa151b" stroke="#000000" stroke-width="5"/>
        <circle cx="0" cy="-80" r="28" fill="#f1bf00"/>
      </g>
    `,
    landmarks: `
      <g stroke="#f59e0b" stroke-width="3" fill="none" opacity="0.9">
        <!-- Sagrada Familia Spires -->
        <path d="M 1280,650 L 1290,160 L 1330,160 L 1340,650 Z" fill="#030712" fill-opacity="0.7" stroke="#f59e0b" stroke-width="4"/>
        <path d="M 1310,160 L 1310,110 M 1295,125 L 1325,125" stroke="#f59e0b" stroke-width="5"/>
        <path d="M 1200,650 L 1215,240 L 1245,240 L 1260,650 Z" stroke="#ea580c" fill="#030712" fill-opacity="0.6"/>
        <path d="M 1360,650 L 1375,240 L 1405,240 L 1420,650 Z" stroke="#ea580c" fill="#030712" fill-opacity="0.6"/>
        <path d="M 1130,650 L 1145,320 L 1175,320 L 1190,650 Z" stroke="#eab308" fill="#030712" fill-opacity="0.5"/>
        <path d="M 1430,650 L 1445,320 L 1475,320 L 1490,650 Z" stroke="#eab308" fill="#030712" fill-opacity="0.5"/>
        <circle cx="1230" cy="220" r="14" fill="#ea580c"/>
        <circle cx="1390" cy="220" r="14" fill="#ea580c"/>
        <circle cx="1310" cy="140" r="18" fill="#f59e0b"/>
      </g>
    `
  },
  {
    slug: 'malaysia',
    filename: 'malaysia-banner.svg',
    primaryColor: '#0284c7',
    accentColor: '#eab308',
    goldColor: '#f59e0b',
    flagContent: `
      ${Array.from({length: 14}).map((_, i) => `
        <rect y="${i * (600/14)}" width="900" height="${600/14}" fill="${i % 2 === 0 ? '#cc0000' : '#ffffff'}"/>
      `).join('')}
      <rect width="450" height="${8 * (600/14)}" fill="#000066"/>
      <g fill="#ffcc00" transform="translate(200, 170)">
        <path d="M 30 -60 A 60 60 0 1 0 30 60 A 48 48 0 1 1 30 -60 Z"/>
        <polygon points="60,0 72,12 88,6 82,22 98,28 85,38 94,52 78,50 78,66 66,55 54,66 54,50 38,52 47,38 34,28 50,22 44,6 60,12" transform="translate(30,-30) scale(0.9)"/>
      </g>
    `,
    landmarks: `
      <g stroke="#38bdf8" stroke-width="3" fill="none" opacity="0.9">
        <!-- Petronas Twin Towers -->
        <path d="M 1180,650 L 1200,200 L 1240,200 L 1260,650 Z" fill="#030712" fill-opacity="0.75" stroke="#38bdf8" stroke-width="3.5"/>
        <path d="M 1220,200 L 1220,120 M 1210,140 L 1230,140" stroke="#f59e0b" stroke-width="4"/>
        <path d="M 1320,650 L 1340,200 L 1380,200 L 1400,650 Z" fill="#030712" fill-opacity="0.75" stroke="#38bdf8" stroke-width="3.5"/>
        <path d="M 1360,200 L 1360,120 M 1350,140 L 1370,140" stroke="#f59e0b" stroke-width="4"/>
        <!-- Skybridge -->
        <path d="M 1240,420 L 1340,420 M 1240,435 L 1340,435" stroke="#f59e0b" stroke-width="4"/>
        <path d="M 1250,435 L 1290,470 L 1330,435" stroke="#38bdf8" stroke-width="3"/>
      </g>
    `
  },
  {
    slug: 'mauritius',
    filename: 'mauritius-banner.svg',
    primaryColor: '#06b6d4',
    accentColor: '#10b981',
    goldColor: '#f59e0b',
    flagContent: `
      <rect width="900" height="150" fill="#ea2412"/>
      <rect y="150" width="900" height="150" fill="#1a206d"/>
      <rect y="300" width="900" height="150" fill="#ffd500"/>
      <rect y="450" width="900" height="150" fill="#00a04d"/>
    `,
    landmarks: `
      <g stroke="#06b6d4" stroke-width="3" fill="none" opacity="0.9">
        <!-- Le Morne Mountain Peak -->
        <path d="M 1050,650 L 1150,320 Q 1280,240 1380,310 L 1480,420 L 1680,650 Z" fill="#030712" fill-opacity="0.75" stroke="#10b981" stroke-width="4"/>
        <path d="M 1150,320 Q 1250,360 1380,310" stroke="#f59e0b" stroke-width="4"/>
        <!-- Lagoon Waves -->
        <path d="M 900,580 Q 1050,540 1200,580 Q 1350,620 1500,580 Q 1650,540 1800,580" stroke="#06b6d4" stroke-width="4"/>
        <path d="M 950,620 Q 1100,580 1250,620 Q 1400,660 1550,620 Q 1700,580 1850,620" stroke="#38bdf8" stroke-width="3"/>
      </g>
    `
  },
  {
    slug: 'netherlands',
    filename: 'netherlands-banner.svg',
    primaryColor: '#f97316',
    accentColor: '#2563eb',
    goldColor: '#f59e0b',
    flagContent: `
      <rect width="900" height="200" fill="#AE1C28"/>
      <rect y="200" width="900" height="200" fill="#FFFFFF"/>
      <rect y="400" width="900" height="200" fill="#21468B"/>
    `,
    landmarks: `
      <g stroke="#f97316" stroke-width="3" fill="none" opacity="0.9">
        <!-- Dutch Windmill Tower -->
        <path d="M 1250,650 L 1280,350 L 1340,350 L 1370,650 Z" fill="#030712" fill-opacity="0.75" stroke="#f97316" stroke-width="4"/>
        <path d="M 1270,350 Q 1310,310 1350,350 Z" fill="#f97316" fill-opacity="0.4"/>
        <!-- Windmill Blades -->
        <g transform="translate(1310, 350)" stroke="#f59e0b" stroke-width="4">
          <line x1="-180" y1="-180" x2="180" y2="180"/>
          <line x1="-180" y1="180" x2="180" y2="-180"/>
          <polygon points="-180,-180 -120,-160 -140,-100 -180,-180" fill="#f59e0b" fill-opacity="0.5"/>
          <polygon points="180,180 120,160 140,100 180,180" fill="#f59e0b" fill-opacity="0.5"/>
          <polygon points="-180,180 -160,120 -100,140 -180,180" fill="#f59e0b" fill-opacity="0.5"/>
          <polygon points="180,-180 160,-120 100,-140 180,-180" fill="#f59e0b" fill-opacity="0.5"/>
        </g>
      </g>
    `
  },
  {
    slug: 'italy',
    filename: 'italy-banner.svg',
    primaryColor: '#16a34a',
    accentColor: '#dc2626',
    goldColor: '#f59e0b',
    flagContent: `
      <rect width="300" height="600" fill="#009246"/>
      <rect x="300" width="300" height="600" fill="#ffffff"/>
      <rect x="600" width="300" height="600" fill="#ce2b37"/>
    `,
    landmarks: `
      <g stroke="#f59e0b" stroke-width="3" fill="none" opacity="0.9">
        <!-- Colosseum Outer Wall -->
        <path d="M 1200,650 L 1200,420 Q 1400,380 1600,450 L 1600,650 Z" fill="#030712" fill-opacity="0.7" stroke="#f59e0b" stroke-width="4"/>
        <path d="M 1230,650 L 1230,550 Q 1250,520 1270,550 L 1270,650 M 1290,650 L 1290,550 Q 1310,520 1330,550 L 1330,650 M 1350,650 L 1350,550 Q 1370,520 1390,550 L 1390,650" stroke="#16a34a" stroke-width="3"/>
        <path d="M 1230,530 L 1230,470 Q 1250,440 1270,470 L 1270,530 M 1290,530 L 1290,470 Q 1310,440 1330,470 L 1330,530 M 1350,530 L 1350,470 Q 1370,440 1390,470 L 1390,530" stroke="#dc2626" stroke-width="3"/>
        <!-- Leaning Tower of Pisa -->
        <g transform="translate(1050, 650) rotate(10) translate(-1050, -650)">
          <path d="M 1020,650 L 1040,260 L 1100,260 L 1120,650 Z" fill="#030712" fill-opacity="0.8" stroke="#ffffff" stroke-width="3.5"/>
          <line x1="1035" y1="340" x2="1105" y2="340" stroke="#f59e0b" stroke-width="3"/>
          <line x1="1030" y1="420" x2="1110" y2="420" stroke="#f59e0b" stroke-width="3"/>
          <line x1="1025" y1="500" x2="1115" y2="500" stroke="#f59e0b" stroke-width="3"/>
        </g>
      </g>
    `
  },
  {
    slug: 'ukraine',
    filename: 'ukraine-banner.svg',
    primaryColor: '#2563eb',
    accentColor: '#eab308',
    goldColor: '#fbbf24',
    flagContent: `
      <rect width="900" height="300" fill="#0057B7"/>
      <rect y="300" width="900" height="300" fill="#FFDD00"/>
    `,
    landmarks: `
      <g stroke="#fbbf24" stroke-width="3" fill="none" opacity="0.9">
        <!-- Golden Dome of Saint Sophia Cathedral -->
        <path d="M 1250,650 L 1250,420 Q 1210,390 1210,330 Q 1210,230 1300,190 Q 1390,230 1390,330 Q 1390,390 1350,420 L 1350,650 Z" fill="#030712" fill-opacity="0.75" stroke="#fbbf24" stroke-width="4"/>
        <path d="M 1300,190 L 1300,130 M 1285,150 L 1315,150" stroke="#fbbf24" stroke-width="5"/>
        <path d="M 1140,650 L 1140,450 Q 1110,430 1110,380 Q 1110,300 1160,270 Q 1210,300 1210,380 Q 1210,430 1180,450 L 1180,650 Z" stroke="#2563eb" stroke-width="3"/>
        <path d="M 1420,650 L 1420,450 Q 1390,430 1390,380 Q 1390,300 1440,270 Q 1490,300 1490,380 Q 1490,430 1460,450 L 1460,650 Z" stroke="#2563eb" stroke-width="3"/>
      </g>
    `
  },
  {
    slug: 'china',
    filename: 'china-banner.svg',
    primaryColor: '#dc2626',
    accentColor: '#f59e0b',
    goldColor: '#fbbf24',
    flagContent: `
      <rect width="900" height="600" fill="#ee1c25"/>
      <g fill="#ffff00" transform="translate(150, 150)">
        <polygon points="0,-90 26,-26 90,-26 38,12 56,76 0,36 -56,76 -38,12 -90,-26 -26,-26"/>
        <polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(120, -60) rotate(23)"/>
        <polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(150, -10) rotate(45)"/>
        <polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(150, 50) rotate(0)"/>
        <polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(120, 100) rotate(-23)"/>
      </g>
    `,
    landmarks: `
      <g stroke="#fbbf24" stroke-width="3" fill="none" opacity="0.9">
        <!-- Temple of Heaven -->
        <path d="M 1220,650 L 1220,440 Q 1300,380 1380,440 L 1380,650 Z" fill="#030712" fill-opacity="0.75" stroke="#fbbf24" stroke-width="4"/>
        <path d="M 1240,430 Q 1300,360 1360,430 Z" fill="#dc2626" fill-opacity="0.4" stroke="#fbbf24"/>
        <path d="M 1260,350 Q 1300,270 1340,350 Z" fill="#fbbf24" fill-opacity="0.5" stroke="#fbbf24"/>
        <path d="M 1300,270 L 1300,220" stroke="#fbbf24" stroke-width="5"/>
        <!-- Great Wall Watchtower Ramparts -->
        <path d="M 920,650 L 980,480 L 1040,480 L 1040,550 Q 1120,500 1200,550" stroke="#dc2626" stroke-width="4"/>
      </g>
    `
  },
  {
    slug: 'iran',
    filename: 'iran-banner.svg',
    primaryColor: '#16a34a',
    accentColor: '#06b6d4',
    goldColor: '#f59e0b',
    flagContent: `
      <rect width="900" height="200" fill="#239f40"/>
      <rect y="200" width="900" height="200" fill="#ffffff"/>
      <rect y="400" width="900" height="200" fill="#da0000"/>
      <g fill="#da0000" transform="translate(450, 300) scale(1.3)">
        <path d="M 0,-40 C -15,-20 -25,0 0,35 C 25,0 15,-20 0,-40 Z"/>
        <path d="M -20,-30 C -40,-10 -35,10 -10,30 C -25,10 -25,-10 -20,-30 Z"/>
        <path d="M 20,-30 C 40,-10 35,10 10,30 C 25,10 25,-10 20,-30 Z"/>
      </g>
    `,
    landmarks: `
      <g stroke="#06b6d4" stroke-width="3" fill="none" opacity="0.9">
        <!-- Azadi Tower Arch -->
        <path d="M 1200,650 L 1260,220 L 1340,220 L 1400,650 Z" fill="#030712" fill-opacity="0.75" stroke="#ffffff" stroke-width="4"/>
        <path d="M 1240,650 Q 1300,380 1360,650 Z" fill="#06b6d4" fill-opacity="0.3" stroke="#f59e0b" stroke-width="4"/>
        <!-- Shah Mosque Turquoise Dome -->
        <path d="M 980,650 L 980,480 Q 940,440 940,380 Q 940,280 1030,240 Q 1120,280 1120,380 Q 1120,440 1080,480 L 1080,650 Z" stroke="#06b6d4" stroke-width="3.5" fill="#16a34a" fill-opacity="0.2"/>
        <path d="M 1030,240 L 1030,180" stroke="#f59e0b" stroke-width="5"/>
      </g>
    `
  }
];

function buildSvg(b) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 800" width="1920" height="800">
  <defs>
    <radialGradient id="bg-grad" cx="75%" cy="40%" r="80%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#030712"/>
    </radialGradient>
    <radialGradient id="glow-1" cx="75%" cy="25%" r="45%">
      <stop offset="0%" stop-color="${b.primaryColor}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${b.primaryColor}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-2" cx="60%" cy="75%" r="45%">
      <stop offset="0%" stop-color="${b.accentColor}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${b.accentColor}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mask-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#030712" stop-opacity="1"/>
      <stop offset="42%" stop-color="#030712" stop-opacity="1"/>
      <stop offset="62%" stop-color="#030712" stop-opacity="0.85"/>
      <stop offset="85%" stop-color="#030712" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#030712" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="flag-gloss" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.6"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="25" stdDeviation="25" flood-color="#000000" flood-opacity="0.8"/>
      <feDropShadow dx="0" dy="0" stdDeviation="20" flood-color="${b.primaryColor}" flood-opacity="0.4"/>
    </filter>
    <pattern id="flag-pattern-${b.slug}" width="900" height="600" patternUnits="userSpaceOnUse">
      ${b.flagContent}
    </pattern>
  </defs>

  <!-- Background Base -->
  <rect width="1920" height="800" fill="url(#bg-grad)"/>

  <!-- Ambient Light Orbs -->
  <rect width="1920" height="800" fill="url(#glow-1)"/>
  <rect width="1920" height="800" fill="url(#glow-2)"/>

  <!-- Sparkling Particles -->
  <g fill="${b.goldColor}" opacity="0.6">
    <circle cx="1200" cy="200" r="3"/>
    <circle cx="1600" cy="500" r="4"/>
    <circle cx="1400" cy="650" r="2.5"/>
    <circle cx="1750" cy="250" r="3.5"/>
    <circle cx="1050" cy="300" r="2"/>
  </g>
  <g fill="${b.accentColor}" opacity="0.6">
    <circle cx="1500" cy="180" r="3"/>
    <circle cx="1300" cy="550" r="4"/>
    <circle cx="1650" cy="350" r="2"/>
  </g>

  <!-- 3D Flag Card -->
  <g transform="translate(920, 100) rotate(-4) scale(0.92)" filter="url(#shadow)">
    <rect width="900" height="580" rx="32" ry="32" fill="url(#flag-pattern-${b.slug})"/>
    <rect width="900" height="580" rx="32" ry="32" fill="url(#flag-gloss)"/>
    <rect width="900" height="580" rx="32" ry="32" fill="none" stroke="#ffffff" stroke-opacity="0.25" stroke-width="3"/>
  </g>

  <!-- Iconic Landmarks Overlay -->
  ${b.landmarks}

  <!-- Left Dark Readability Overlay -->
  <rect width="1920" height="800" fill="url(#mask-grad)"/>
</svg>`;
}

for (const b of banners) {
  const svgCode = buildSvg(b);
  const filePath = path.join(assetsDir, b.filename);
  fs.writeFileSync(filePath, svgCode, 'utf8');
  console.log(`Generated SVG banner: ${b.filename} (${fs.statSync(filePath).size} bytes)`);
}

console.log('All 11 country SVG banners generated successfully!');
