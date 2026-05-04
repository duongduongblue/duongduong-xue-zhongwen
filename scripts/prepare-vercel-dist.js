const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const siteDir = path.join(projectRoot, 'site');

const filesToCopy = [
  {
    from: path.join(siteDir, 'landing.html'),
    to: path.join(distDir, 'landing.html'),
  },
  {
    from: path.join(siteDir, 'preview.html'),
    to: path.join(distDir, 'preview.html'),
  },
];

if (!fs.existsSync(distDir)) {
  throw new Error('dist folder not found. Run Expo web export first.');
}

for (const file of filesToCopy) {
  fs.copyFileSync(file.from, file.to);
}

console.log('Prepared Vercel dist with landing + preview pages.');
