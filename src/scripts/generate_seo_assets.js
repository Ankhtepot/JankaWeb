const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const envArg = args.find(arg => arg.startsWith('--env='));
const env = envArg ? envArg.split('=')[1] : 'prod';
const envFile = env === 'dev' ? 'environment.ts' : 'environment.prod.ts';

const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, 'environments', envFile);
const robotsPath = path.join(rootDir, 'robots.txt');
const sitemapPath = path.join(rootDir, 'sitemap.xml');

if (!fs.existsSync(envPath)) {
  console.error(`SEO generator: environment file not found: ${envPath}`);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/baseUrl\s*:\s*['"]([^'"]+)['"]/);
if (!match) {
  console.error('SEO generator: baseUrl not found in environment file.');
  process.exit(1);
}

const baseUrl = match[1].replace(/\/+$/, '');

const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `  <url>\n` +
  `    <loc>${baseUrl}/</loc>\n` +
  `    <changefreq>weekly</changefreq>\n` +
  `    <priority>1.0</priority>\n` +
  `  </url>\n` +
  `  <url>\n` +
  `    <loc>${baseUrl}/about-me</loc>\n` +
  `    <changefreq>monthly</changefreq>\n` +
  `    <priority>0.8</priority>\n` +
  `  </url>\n` +
  `  <url>\n` +
  `    <loc>${baseUrl}/services</loc>\n` +
  `    <changefreq>monthly</changefreq>\n` +
  `    <priority>0.8</priority>\n` +
  `  </url>\n` +
  `  <url>\n` +
  `    <loc>${baseUrl}/contact</loc>\n` +
  `    <changefreq>yearly</changefreq>\n` +
  `    <priority>0.6</priority>\n` +
  `  </url>\n` +
  `</urlset>\n`;

fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');

console.log(`SEO generator: wrote ${robotsPath}`);
console.log(`SEO generator: wrote ${sitemapPath}`);

