import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.resolve(__dirname, '../src/assets');

const banners = [
  {
    slug: 'singapore',
    filename: 'singapore-banner.jpg',
    countryName: 'Singapore',
    primaryColor: '#ef4444',
    accentColor: '#06b6d4',
    goldColor: '#f59e0b',
    flagSvg: `
      <svg viewBox="0 0 900 600" width="100%" height="100%">
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
      </svg>
    `,
    landmarkSvg: `
      <!-- Marina Bay Sands & Supertree Grove Silhouette -->
      <g stroke="#06b6d4" stroke-width="2.5" fill="none" opacity="0.85">
        <!-- MBS Tower 1, 2, 3 -->
        <path d="M 1100,650 L 1120,280 L 1190,280 L 1210,650 Z" fill="#030712" fill-opacity="0.6"/>
        <path d="M 1230,650 L 1250,260 L 1320,260 L 1340,650 Z" fill="#030712" fill-opacity="0.6"/>
        <path d="M 1360,650 L 1380,280 L 1450,280 L 1470,650 Z" fill="#030712" fill-opacity="0.6"/>
        <!-- Skypark Roof -->
        <path d="M 1080,270 Q 1300,210 1520,260 Q 1530,280 1510,290 Q 1300,240 1090,290 Z" fill="#f59e0b" fill-opacity="0.3" stroke="#f59e0b" stroke-width="3"/>
        <!-- Supertrees -->
        <path d="M 1580,650 L 1600,420 Q 1550,320 1520,300 Q 1600,320 1600,420 Q 1600,320 1680,300 Q 1650,320 1600,420 L 1620,650 Z" stroke="#38bdf8"/>
        <path d="M 1720,650 L 1735,480 Q 1690,400 1670,380 Q 1735,400 1735,480 Q 1735,400 1800,380 Q 1780,400 1735,480 L 1750,650 Z" stroke="#ec4899"/>
        <!-- Merlion Outline -->
        <path d="M 920,650 Q 930,520 960,480 Q 980,450 960,420 Q 940,400 970,370 Q 1000,360 1010,390 Q 1020,430 990,480 Q 1010,540 1040,650 Z" fill="#ffffff" fill-opacity="0.15" stroke="#ffffff"/>
      </g>
    `
  },
  {
    slug: 'india',
    filename: 'india-banner.jpg',
    countryName: 'India',
    primaryColor: '#f97316',
    accentColor: '#10b981',
    goldColor: '#fbbf24',
    flagSvg: `
      <svg viewBox="0 0 900 600" width="100%" height="100%">
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
      </svg>
    `,
    landmarkSvg: `
      <!-- Taj Mahal & India Gate Silhouette -->
      <g stroke="#fbbf24" stroke-width="2.5" fill="none" opacity="0.85">
        <!-- Main Taj Dome -->
        <path d="M 1250,650 L 1250,450 Q 1200,430 1200,350 Q 1200,240 1300,210 Q 1400,240 1400,350 Q 1400,430 1350,450 L 1350,650 Z" fill="#030712" fill-opacity="0.6"/>
        <path d="M 1300,210 L 1300,160 M 1295,175 L 1305,175" stroke="#fbbf24" stroke-width="4"/>
        <!-- Side Domes -->
        <path d="M 1150,650 L 1150,420 Q 1120,400 1120,350 Q 1120,290 1170,270 Q 1220,290 1220,350 Q 1220,400 1190,420 L 1190,650 Z" fill="#030712" fill-opacity="0.5"/>
        <path d="M 1410,650 L 1410,420 Q 1380,400 1380,350 Q 1380,290 1430,270 Q 1480,290 1480,350 Q 1480,400 1450,420 L 1450,650 Z" fill="#030712" fill-opacity="0.5"/>
        <!-- Left Minaret -->
        <path d="M 1020,650 L 1030,220 L 1060,220 L 1070,650 Z" fill="#030712" fill-opacity="0.7"/>
        <path d="M 1015,220 L 1075,220 M 1025,190 Q 1045,170 1065,190 Z"/>
        <!-- Right Minaret -->
        <path d="M 1530,650 L 1540,220 L 1570,220 L 1580,650 Z" fill="#030712" fill-opacity="0.7"/>
        <path d="M 1525,220 L 1585,220 M 1535,190 Q 1555,170 1575,190 Z"/>
        <!-- Archway -->
        <path d="M 1260,650 L 1260,520 Q 1300,460 1340,520 L 1340,650 Z" stroke="#f97316" stroke-width="3" fill="#10b981" fill-opacity="0.1"/>
      </g>
    `
  },
  {
    slug: 'switzerland',
    filename: 'switzerland-banner.jpg',
    countryName: 'Switzerland',
    primaryColor: '#dc2626',
    accentColor: '#38bdf8',
    goldColor: '#f59e0b',
    flagSvg: `
      <svg viewBox="0 0 600 600" width="100%" height="100%">
        <rect width="600" height="600" fill="#da291c"/>
        <rect x="250" y="100" width="100" height="400" fill="#ffffff"/>
        <rect x="100" y="250" width="400" height="100" fill="#ffffff"/>
      </svg>
    `,
    landmarkSvg: `
      <!-- Matterhorn Mountain Peak Silhouette & Swiss Chapel Tower -->
      <g stroke="#38bdf8" stroke-width="2.5" fill="none" opacity="0.85">
        <!-- Matterhorn Peak -->
        <path d="M 950,650 L 1150,380 L 1250,180 L 1350,320 L 1450,260 L 1750,650 Z" fill="#030712" fill-opacity="0.7" stroke="#ffffff" stroke-width="3"/>
        <path d="M 1250,180 L 1230,350 L 1290,480 L 1350,650" stroke="#38bdf8" stroke-dasharray="6,6"/>
        <path d="M 1250,180 L 1320,280 L 1400,420 L 1550,650" stroke="#93c5fd"/>
        <!-- Snowcap Glow -->
        <path d="M 1250,180 L 1200,270 Q 1250,260 1280,240 Z" fill="#ffffff" fill-opacity="0.4"/>
        <!-- Lucerne Chapel Bridge Tower -->
        <path d="M 980,650 L 990,380 L 1050,380 L 1060,650 Z" fill="#030712" fill-opacity="0.8" stroke="#dc2626"/>
        <path d="M 970,380 L 1020,280 L 1070,380 Z" fill="#dc2626" fill-opacity="0.4" stroke="#f59e0b"/>
      </g>
    `
  },
  {
    slug: 'spain',
    filename: 'spain-banner.jpg',
    countryName: 'Spain',
    primaryColor: '#ea580c',
    accentColor: '#eab308',
    goldColor: '#f59e0b',
    flagSvg: `
      <svg viewBox="0 0 900 600" width="100%" height="100%">
        <rect width="900" height="150" fill="#aa151b"/>
        <rect y="150" width="900" height="300" fill="#f1bf00"/>
        <rect y="450" width="900" height="150" fill="#aa151b"/>
        <!-- Shield Silhouette -->
        <g transform="translate(200, 300) scale(0.8)">
          <path d="M -50,-60 L 50,-60 L 50,20 Q 50,70 0,90 Q -50,70 -50,20 Z" fill="#aa151b" stroke="#000000" stroke-width="4"/>
          <circle cx="0" cy="-80" r="25" fill="#f1bf00"/>
        </g>
      </svg>
    `,
    landmarkSvg: `
      <!-- Sagrada Familia Spires & Royal Palace Silhouette -->
      <g stroke="#f59e0b" stroke-width="2.5" fill="none" opacity="0.85">
        <!-- Central Spire -->
        <path d="M 1280,650 L 1290,160 L 1330,160 L 1340,650 Z" fill="#030712" fill-opacity="0.7"/>
        <path d="M 1310,160 L 1310,110 M 1300,125 L 1320,125" stroke="#f59e0b" stroke-width="4"/>
        <!-- Side Spires -->
        <path d="M 1200,650 L 1215,240 L 1245,240 L 1260,650 Z" fill="#030712" fill-opacity="0.6"/>
        <path d="M 1360,650 L 1375,240 L 1405,240 L 1420,650 Z" fill="#030712" fill-opacity="0.6"/>
        <path d="M 1130,650 L 1145,320 L 1175,320 L 1190,650 Z" fill="#030712" fill-opacity="0.5"/>
        <path d="M 1430,650 L 1445,320 L 1475,320 L 1490,650 Z" fill="#030712" fill-opacity="0.5"/>
        <!-- Spire Ornaments -->
        <circle cx="1230" cy="220" r="12" fill="#ea580c"/>
        <circle cx="1390" cy="220" r="12" fill="#ea580c"/>
        <circle cx="1310" cy="140" r="16" fill="#f59e0b"/>
        <!-- Royal Palace Arch Base -->
        <path d="M 980,650 L 980,480 L 1100,480 L 1100,650 Z" stroke="#ea580c"/>
        <path d="M 1010,650 L 1010,540 Q 1040,500 1070,540 L 1070,650 Z" stroke="#f59e0b"/>
      </g>
    `
  },
  {
    slug: 'malaysia',
    filename: 'malaysia-banner.jpg',
    countryName: 'Malaysia',
    primaryColor: '#0284c7',
    accentColor: '#eab308',
    goldColor: '#f59e0b',
    flagSvg: `
      <svg viewBox="0 0 900 600" width="100%" height="100%">
        ${Array.from({length: 14}).map((_, i) => `
          <rect y="${i * (600/14)}" width="900" height="${600/14}" fill="${i % 2 === 0 ? '#cc0000' : '#ffffff'}"/>
        `).join('')}
        <rect width="450" height="${8 * (600/14)}" fill="#000066"/>
        <g fill="#ffcc00" transform="translate(200, 170)">
          <path d="M 30 -60 A 60 60 0 1 0 30 60 A 48 48 0 1 1 30 -60 Z"/>
          <polygon points="60,0 72,12 88,6 82,22 98,28 85,38 94,52 78,50 78,66 66,55 54,66 54,50 38,52 47,38 34,28 50,22 44,6 60,12" transform="translate(30,-30) scale(0.9)"/>
        </g>
      </svg>
    `,
    landmarkSvg: `
      <!-- Petronas Twin Towers Silhouette -->
      <g stroke="#38bdf8" stroke-width="2.5" fill="none" opacity="0.85">
        <!-- Left Tower -->
        <path d="M 1180,650 L 1200,200 L 1240,200 L 1260,650 Z" fill="#030712" fill-opacity="0.7" stroke="#38bdf8" stroke-width="3"/>
        <path d="M 1220,200 L 1220,120 M 1210,140 L 1230,140" stroke="#f59e0b" stroke-width="3"/>
        <!-- Right Tower -->
        <path d="M 1320,650 L 1340,200 L 1380,200 L 1400,650 Z" fill="#030712" fill-opacity="0.7" stroke="#38bdf8" stroke-width="3"/>
        <path d="M 1360,200 L 1360,120 M 1350,140 L 1370,140" stroke="#f59e0b" stroke-width="3"/>
        <!-- Skybridge -->
        <path d="M 1240,420 L 1340,420 M 1240,435 L 1340,435" stroke="#f59e0b" stroke-width="4"/>
        <path d="M 1250,435 L 1290,470 L 1330,435" stroke="#38bdf8"/>
        <!-- KL Tower Silhouette -->
        <path d="M 1520,650 L 1530,300 L 1510,280 Q 1535,230 1560,280 L 1540,300 L 1550,650 Z" fill="#030712" fill-opacity="0.6" stroke="#eab308"/>
        <path d="M 1535,230 L 1535,160" stroke="#eab308" stroke-width="3"/>
      </g>
    `
  },
  {
    slug: 'mauritius',
    filename: 'mauritius-banner.jpg',
    countryName: 'Mauritius',
    primaryColor: '#06b6d4',
    accentColor: '#10b981',
    goldColor: '#f59e0b',
    flagSvg: `
      <svg viewBox="0 0 900 600" width="100%" height="100%">
        <rect width="900" height="150" fill="#ea2412"/>
        <rect y="150" width="900" height="150" fill="#1a206d"/>
        <rect y="300" width="900" height="150" fill="#ffd500"/>
        <rect y="450" width="900" height="150" fill="#00a04d"/>
      </svg>
    `,
    landmarkSvg: `
      <!-- Le Morne Brabant Mountain Peak & Tropical Ocean Lagoon -->
      <g stroke="#06b6d4" stroke-width="2.5" fill="none" opacity="0.85">
        <!-- Le Morne Mountain Peak -->
        <path d="M 1050,650 L 1150,320 Q 1280,240 1380,310 L 1480,420 L 1680,650 Z" fill="#030712" fill-opacity="0.7" stroke="#10b981" stroke-width="3"/>
        <path d="M 1150,320 Q 1250,360 1380,310" stroke="#f59e0b" stroke-width="3"/>
        <!-- Ocean Waves Lagoon -->
        <path d="M 900,580 Q 1050,540 1200,580 Q 1350,620 1500,580 Q 1650,540 1800,580" stroke="#06b6d4" stroke-width="3"/>
        <path d="M 950,620 Q 1100,580 1250,620 Q 1400,660 1550,620 Q 1700,580 1850,620" stroke="#38bdf8" stroke-width="2"/>
        <!-- Palm Tree Outline -->
        <path d="M 980,650 Q 1000,520 1050,450" stroke="#10b981" stroke-width="4"/>
        <path d="M 1050,450 Q 980,420 940,440 M 1050,450 Q 1000,390 970,380 M 1050,450 Q 1080,380 1120,390 M 1050,450 Q 1120,430 1150,460" stroke="#10b981" stroke-width="3"/>
      </g>
    `
  },
  {
    slug: 'netherlands',
    filename: 'netherlands-banner.jpg',
    countryName: 'Netherlands',
    primaryColor: '#f97316',
    accentColor: '#2563eb',
    goldColor: '#f59e0b',
    flagSvg: `
      <svg viewBox="0 0 900 600" width="100%" height="100%">
        <rect width="900" height="200" fill="#AE1C28"/>
        <rect y="200" width="900" height="200" fill="#FFFFFF"/>
        <rect y="400" width="900" height="200" fill="#21468B"/>
      </svg>
    `,
    landmarkSvg: `
      <!-- Dutch Windmill & Canal House Gables Silhouette -->
      <g stroke="#f97316" stroke-width="2.5" fill="none" opacity="0.85">
        <!-- Windmill Body -->
        <path d="M 1250,650 L 1280,350 L 1340,350 L 1370,650 Z" fill="#030712" fill-opacity="0.7" stroke="#f97316" stroke-width="3"/>
        <path d="M 1270,350 Q 1310,310 1350,350 Z" fill="#f97316" fill-opacity="0.3"/>
        <!-- Windmill Blades -->
        <g transform="translate(1310, 350)" stroke="#f59e0b" stroke-width="3.5">
          <line x1="-180" y1="-180" x2="180" y2="180"/>
          <line x1="-180" y1="180" x2="180" y2="-180"/>
          <!-- Blade Sails -->
          <polygon points="-180,-180 -120,-160 -140,-100 -180,-180" fill="#f59e0b" fill-opacity="0.4"/>
          <polygon points="180,180 120,160 140,100 180,180" fill="#f59e0b" fill-opacity="0.4"/>
          <polygon points="-180,180 -160,120 -100,140 -180,180" fill="#f59e0b" fill-opacity="0.4"/>
          <polygon points="180,-180 160,-120 100,-140 180,-180" fill="#f59e0b" fill-opacity="0.4"/>
        </g>
        <!-- Canal Houses -->
        <path d="M 1020,650 L 1020,460 L 1050,420 L 1080,460 L 1080,650 Z" stroke="#2563eb"/>
        <path d="M 1090,650 L 1090,440 L 1120,400 L 1150,440 L 1150,650 Z" stroke="#38bdf8"/>
        <path d="M 1450,650 L 1450,450 L 1490,410 L 1530,450 L 1530,650 Z" stroke="#2563eb"/>
      </g>
    `
  },
  {
    slug: 'italy',
    filename: 'italy-banner.jpg',
    countryName: 'Italy',
    primaryColor: '#16a34a',
    accentColor: '#dc2626',
    goldColor: '#f59e0b',
    flagSvg: `
      <svg viewBox="0 0 900 600" width="100%" height="100%">
        <rect width="300" height="600" fill="#009246"/>
        <rect x="300" width="300" height="600" fill="#ffffff"/>
        <rect x="600" width="300" height="600" fill="#ce2b37"/>
      </svg>
    `,
    landmarkSvg: `
      <!-- Colosseum Arches & Leaning Tower of Pisa Silhouette -->
      <g stroke="#f59e0b" stroke-width="2.5" fill="none" opacity="0.85">
        <!-- Colosseum Wall -->
        <path d="M 1200,650 L 1200,420 Q 1400,380 1600,450 L 1600,650 Z" fill="#030712" fill-opacity="0.6" stroke="#f59e0b" stroke-width="3"/>
        <!-- Colosseum Arches Row 1 -->
        <path d="M 1230,650 L 1230,550 Q 1250,520 1270,550 L 1270,650 M 1290,650 L 1290,550 Q 1310,520 1330,550 L 1330,650 M 1350,650 L 1350,550 Q 1370,520 1390,550 L 1390,650 M 1410,650 L 1410,550 Q 1430,520 1450,550 L 1450,650" stroke="#16a34a"/>
        <!-- Colosseum Arches Row 2 -->
        <path d="M 1230,530 L 1230,470 Q 1250,440 1270,470 L 1270,530 M 1290,530 L 1290,470 Q 1310,440 1330,470 L 1330,530 M 1350,530 L 1350,470 Q 1370,440 1390,470 L 1390,530" stroke="#dc2626"/>
        <!-- Leaning Tower of Pisa -->
        <g transform="translate(1050, 650) rotate(10) translate(-1050, -650)">
          <path d="M 1020,650 L 1040,260 L 1100,260 L 1120,650 Z" fill="#030712" fill-opacity="0.7" stroke="#ffffff" stroke-width="3"/>
          <line x1="1035" y1="340" x2="1105" y2="340" stroke="#f59e0b"/>
          <line x1="1030" y1="420" x2="1110" y2="420" stroke="#f59e0b"/>
          <line x1="1025" y1="500" x2="1115" y2="500" stroke="#f59e0b"/>
          <line x1="1020" y1="580" x2="1120" y2="580" stroke="#f59e0b"/>
        </g>
      </g>
    `
  },
  {
    slug: 'ukraine',
    filename: 'ukraine-banner.jpg',
    countryName: 'Ukraine',
    primaryColor: '#2563eb',
    accentColor: '#eab308',
    goldColor: '#fbbf24',
    flagSvg: `
      <svg viewBox="0 0 900 600" width="100%" height="100%">
        <rect width="900" height="300" fill="#0057B7"/>
        <rect y="300" width="900" height="300" fill="#FFDD00"/>
      </svg>
    `,
    landmarkSvg: `
      <!-- Saint Sophia Cathedral Golden Domes & Independence Monument -->
      <g stroke="#fbbf24" stroke-width="2.5" fill="none" opacity="0.85">
        <!-- Main Golden Dome -->
        <path d="M 1250,650 L 1250,420 Q 1210,390 1210,330 Q 1210,230 1300,190 Q 1390,230 1390,330 Q 1390,390 1350,420 L 1350,650 Z" fill="#030712" fill-opacity="0.7"/>
        <path d="M 1300,190 L 1300,130 M 1290,150 L 1310,150" stroke="#fbbf24" stroke-width="4"/>
        <!-- Side Domes -->
        <path d="M 1140,650 L 1140,450 Q 1110,430 1110,380 Q 1110,300 1160,270 Q 1210,300 1210,380 Q 1210,430 1180,450 L 1180,650 Z" stroke="#2563eb"/>
        <path d="M 1420,650 L 1420,450 Q 1390,430 1390,380 Q 1390,300 1440,270 Q 1490,300 1490,380 Q 1490,430 1460,450 L 1460,650 Z" stroke="#2563eb"/>
        <!-- Independence Column -->
        <path d="M 1020,650 L 1030,280 L 1050,280 L 1060,650 Z" stroke="#fbbf24" stroke-width="3"/>
        <path d="M 1040,280 Q 1040,230 1040,200" stroke="#fbbf24" stroke-width="4"/>
        <circle cx="1040" cy="200" r="18" fill="#eab308" stroke="#ffffff"/>
      </g>
    `
  },
  {
    slug: 'china',
    filename: 'china-banner.jpg',
    countryName: 'China',
    primaryColor: '#dc2626',
    accentColor: '#f59e0b',
    goldColor: '#fbbf24',
    flagSvg: `
      <svg viewBox="0 0 900 600" width="100%" height="100%">
        <rect width="900" height="600" fill="#ee1c25"/>
        <g fill="#ffff00" transform="translate(150, 150)">
          <!-- Big Star -->
          <polygon points="0,-90 26,-26 90,-26 38,12 56,76 0,36 -56,76 -38,12 -90,-26 -26,-26"/>
          <!-- 4 Small Stars -->
          <polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(120, -60) rotate(23)"/>
          <polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(150, -10) rotate(45)"/>
          <polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(150, 50) rotate(0)"/>
          <polygon points="0,-30 8,-8 30,-8 12,4 18,25 0,12 -18,25 -12,4 -30,-8 -8,-8" transform="translate(120, 100) rotate(-23)"/>
        </g>
      </svg>
    `,
    landmarkSvg: `
      <!-- Great Wall of China Watchtower & Temple of Heaven Silhouette -->
      <g stroke="#fbbf24" stroke-width="2.5" fill="none" opacity="0.85">
        <!-- Temple of Heaven Triple Roof -->
        <path d="M 1220,650 L 1220,440 Q 1300,380 1380,440 L 1380,650 Z" fill="#030712" fill-opacity="0.7"/>
        <!-- Tier 2 Roof -->
        <path d="M 1240,430 Q 1300,360 1360,430 Z" fill="#dc2626" fill-opacity="0.4" stroke="#fbbf24"/>
        <!-- Tier 1 Top Roof -->
        <path d="M 1260,350 Q 1300,270 1340,350 Z" fill="#fbbf24" fill-opacity="0.5" stroke="#fbbf24"/>
        <path d="M 1300,270 L 1300,220" stroke="#fbbf24" stroke-width="4"/>
        <!-- Great Wall Ramparts -->
        <path d="M 920,650 L 980,480 L 1040,480 L 1040,550 Q 1120,500 1200,550" stroke="#dc2626" stroke-width="3"/>
        <path d="M 980,480 L 980,440 M 1000,480 L 1000,440 M 1020,480 L 1020,440 M 1040,480 L 1040,440" stroke="#fbbf24"/>
        <!-- Shanghai Oriental Pearl Tower Silhouette -->
        <path d="M 1520,650 L 1535,160 L 1545,160 L 1560,650 Z" stroke="#38bdf8"/>
        <circle cx="1540" cy="380" r="35" stroke="#fbbf24" stroke-width="3" fill="#dc2626" fill-opacity="0.3"/>
        <circle cx="1540" cy="240" r="22" stroke="#fbbf24" stroke-width="3" fill="#dc2626" fill-opacity="0.3"/>
      </g>
    `
  },
  {
    slug: 'iran',
    filename: 'iran-banner.jpg',
    countryName: 'Iran',
    primaryColor: '#16a34a',
    accentColor: '#06b6d4',
    goldColor: '#f59e0b',
    flagSvg: `
      <svg viewBox="0 0 900 600" width="100%" height="100%">
        <rect width="900" height="200" fill="#239f40"/>
        <rect y="200" width="900" height="200" fill="#ffffff"/>
        <rect y="400" width="900" height="200" fill="#da0000"/>
        <!-- National Emblem Silhouette -->
        <g fill="#da0000" transform="translate(450, 300) scale(1.2)">
          <path d="M 0,-40 C -15,-20 -25,0 0,35 C 25,0 15,-20 0,-40 Z"/>
          <path d="M -20,-30 C -40,-10 -35,10 -10,30 C -25,10 -25,-10 -20,-30 Z"/>
          <path d="M 20,-30 C 40,-10 35,10 10,30 C 25,10 25,-10 20,-30 Z"/>
        </g>
      </svg>
    `,
    landmarkSvg: `
      <!-- Azadi Tower & Shah Mosque Tiled Dome Silhouette -->
      <g stroke="#06b6d4" stroke-width="2.5" fill="none" opacity="0.85">
        <!-- Azadi Tower Main Arch -->
        <path d="M 1200,650 L 1260,220 L 1340,220 L 1400,650 Z" fill="#030712" fill-opacity="0.7" stroke="#ffffff" stroke-width="3"/>
        <!-- Parabolic Cutout Arch -->
        <path d="M 1240,650 Q 1300,380 1360,650 Z" fill="#06b6d4" fill-opacity="0.2" stroke="#f59e0b" stroke-width="3"/>
        <path d="M 1260,220 L 1340,220 M 1265,240 L 1335,240 M 1270,260 L 1330,260" stroke="#f59e0b"/>
        <!-- Shah Mosque Turquoise Dome -->
        <path d="M 980,650 L 980,480 Q 940,440 940,380 Q 940,280 1030,240 Q 1120,280 1120,380 Q 1120,440 1080,480 L 1080,650 Z" stroke="#06b6d4" stroke-width="3" fill="#16a34a" fill-opacity="0.15"/>
        <path d="M 1030,240 L 1030,180" stroke="#f59e0b" stroke-width="4"/>
        <!-- Minaret -->
        <path d="M 910,650 L 920,250 L 940,250 L 950,650 Z" stroke="#16a34a"/>
        <path d="M 915,250 Q 930,210 945,250 Z" fill="#f59e0b"/>
      </g>
    `
  }
];

function generateHtml(b) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1920px;
      height: 800px;
      background-color: #030712;
      font-family: system-ui, -apple-system, sans-serif;
      overflow: hidden;
      position: relative;
    }
    .hero-container {
      width: 1920px;
      height: 800px;
      position: relative;
      background: radial-gradient(circle at 75% 40%, rgba(15, 23, 42, 1) 0%, rgba(3, 7, 18, 1) 100%);
    }

    /* Ambient Lighting Glows */
    .glow-1 {
      position: absolute;
      top: -100px;
      right: 100px;
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, ${b.primaryColor}35 0%, transparent 70%);
      border-radius: 50%;
      filter: blur(80px);
    }
    .glow-2 {
      position: absolute;
      bottom: -150px;
      right: 400px;
      width: 700px;
      height: 700px;
      background: radial-gradient(circle, ${b.accentColor}30 0%, transparent 70%);
      border-radius: 50%;
      filter: blur(90px);
    }

    /* Floating Gold / Cyan Particles */
    .particles {
      position: absolute;
      inset: 0;
      background-image: 
        radial-gradient(circle at 65% 25%, ${b.goldColor}99 0, ${b.goldColor}99 3px, transparent 4px),
        radial-gradient(circle at 85% 65%, ${b.accentColor}aa 0, ${b.accentColor}aa 4px, transparent 5px),
        radial-gradient(circle at 70% 80%, ${b.goldColor}88 0, ${b.goldColor}88 2px, transparent 3px),
        radial-gradient(circle at 90% 30%, ${b.primaryColor}88 0, ${b.primaryColor}88 3px, transparent 4px);
    }

    /* Waving 3D Flag Container */
    .flag-wrapper {
      position: absolute;
      right: 80px;
      top: 100px;
      width: 860px;
      height: 520px;
      perspective: 1200px;
      z-index: 2;
    }
    .flag-card {
      width: 100%;
      height: 100%;
      border-radius: 28px;
      overflow: hidden;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px ${b.primaryColor}40;
      transform: rotateY(-14deg) rotateX(6deg) rotateZ(-2deg);
      border: 1px solid rgba(255, 255, 255, 0.2);
      position: relative;
    }
    .flag-art {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    /* Glossy 3D Lighting & Fabric Wave Shadow */
    .flag-overlay {
      position: absolute;
      inset: 0;
      background: 
        linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 40%, rgba(0,0,0,0.6) 100%),
        repeating-linear-gradient(90deg, transparent 0, transparent 40px, rgba(0,0,0,0.15) 60px, transparent 80px);
    }

    /* Iconic Landmarks SVG Overlay */
    .landmarks {
      position: absolute;
      inset: 0;
      z-index: 3;
      pointer-events: none;
    }

    /* Left Navy Gradient Mask for text readability */
    .readability-mask {
      position: absolute;
      inset: 0;
      z-index: 4;
      background: linear-gradient(90deg, #030712 0%, #030712 42%, rgba(3, 7, 18, 0.85) 60%, rgba(3, 7, 18, 0.1) 85%, transparent 100%);
    }

    /* Left Decorative Tech Grid Lines */
    .grid-lines {
      position: absolute;
      top: 0;
      left: 0;
      width: 800px;
      height: 800px;
      z-index: 5;
      opacity: 0.15;
      background-image: linear-gradient(${b.goldColor} 1px, transparent 1px), linear-gradient(90deg, ${b.goldColor} 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(circle at 20% 40%, black 0%, transparent 70%);
    }
  </style>
</head>
<body>
  <div class="hero-container">
    <div class="glow-1"></div>
    <div class="glow-2"></div>
    <div class="particles"></div>
    <div class="grid-lines"></div>

    <!-- Right Side 3D Flag -->
    <div class="flag-wrapper">
      <div class="flag-card">
        ${b.flagSvg}
        <div class="flag-overlay"></div>
      </div>
    </div>

    <!-- Landmarks Overlay -->
    <div class="landmarks">
      <svg viewBox="0 0 1920 800" width="100%" height="100%">
        ${b.landmarkSvg}
      </svg>
    </div>

    <!-- Readability Gradient Mask -->
    <div class="readability-mask"></div>
  </div>
</body>
</html>`;
}

async function main() {
  console.log('Launching browser to render banners...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 800, deviceScaleFactor: 1 });

  for (const b of banners) {
    const html = generateHtml(b);
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const outputPath = path.join(assetsDir, b.filename);
    await page.screenshot({
      path: outputPath,
      type: 'jpeg',
      quality: 90
    });
    console.log(`Generated banner: ${b.filename} (${fs.statSync(outputPath).size} bytes)`);
  }

  await browser.close();
  console.log('All banners generated successfully!');
}

main().catch(err => {
  console.error('Error generating banners:', err);
  process.exit(1);
});
