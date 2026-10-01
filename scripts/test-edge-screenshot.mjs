import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testHtmlPath = path.resolve(__dirname, 'test-banner.html');
const testJpgPath = path.resolve(__dirname, '../src/assets/test-banner.jpg');

const testHtmlContent = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: 1920px; height: 800px; background: #0b132a; overflow: hidden; }
    .banner { width: 1920px; height: 800px; position: relative; background: linear-gradient(to right, #080d1e 50%, #1e293b 100%); }
    .title { position: absolute; left: 100px; top: 300px; color: gold; font-size: 60px; font-family: sans-serif; }
  </style>
</head>
<body>
  <div class="banner">
    <div class="title">Test Banner 1920x800</div>
  </div>
</body>
</html>`;

fs.writeFileSync(testHtmlPath, testHtmlContent, 'utf8');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const cmd = `"${edgePath}" --headless --disable-gpu --screenshot="${testJpgPath}" --window-size=1920,800 "file:///${testHtmlPath.replace(/\\/g, '/')}"`;

console.log('Running Edge command...');
execSync(cmd);
console.log('Screenshot output created:', fs.existsSync(testJpgPath), fs.statSync(testJpgPath).size, 'bytes');
