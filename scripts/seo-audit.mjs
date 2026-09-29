/**
 * Post-build SEO, social-preview and performance audit.
 * Run: npm run build && node scripts/seo-audit.mjs   (or: npm run build:audit)
 *
 * Errors fail the run (exit code 1). Warnings are printed but do not fail.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIST = path.resolve('dist');
const SITE = 'https://www.expertdermatologist.com';
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) files.push(p);
  }
})(DIST);

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
const get = (html, re) => (html.match(re) || [])[1];
const errors = [];
const warnings = [];
const error = (page, msg) => errors.push({ page, msg });
const warn = (page, msg) => warnings.push({ page, msg });
const titles = new Map();
const descs = new Map();
const schemaTypes = new Map();
const weights = [];
const ogChecked = new Map();

const distPath = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  if (!clean || clean === '/') return path.join(DIST, 'index.html');
  const p = path.join(DIST, clean);
  if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  const idx = path.join(p, 'index.html');
  return fs.existsSync(idx) ? idx : null;
};
const exists = (urlPath) => !!distPath(urlPath);
const size = (urlPath) => {
  const p = distPath(urlPath);
  return p ? fs.statSync(p).size : 0;
};

// ---------- Site-wide files ----------
for (const f of ['/favicon.ico', '/favicon.svg', '/apple-touch-icon.png', '/manifest.webmanifest', '/robots.txt', '/sitemap-index.xml', '/rss.xml', '/llms.txt', '/llms-full.txt', '/404.html']) {
  if (!exists(f)) error('site', `missing ${f}`);
}
if (exists('/manifest.webmanifest')) {
  const manifest = JSON.parse(fs.readFileSync(distPath('/manifest.webmanifest'), 'utf8'));
  for (const icon of manifest.icons || []) {
    if (!exists(icon.src)) error('manifest', `icon not found: ${icon.src}`);
    else {
      const meta = await sharp(distPath(icon.src)).metadata();
      if (`${meta.width}x${meta.height}` !== icon.sizes) error('manifest', `icon ${icon.src} is ${meta.width}x${meta.height}, declared ${icon.sizes}`);
    }
  }
}
if (exists('/apple-touch-icon.png')) {
  const meta = await sharp(distPath('/apple-touch-icon.png')).metadata();
  if (meta.width !== 180 || meta.height !== 180) warn('site', `apple-touch-icon is ${meta.width}x${meta.height}, expected 180x180`);
}
const robotsTxt = exists('/robots.txt') ? fs.readFileSync(distPath('/robots.txt'), 'utf8') : '';
if (!robotsTxt.includes(`Sitemap: ${SITE}/sitemap-index.xml`)) error('robots.txt', 'sitemap line missing or wrong');
if (/^Disallow:\s*\/\s*$/m.test(robotsTxt.split(/User-agent:\s*\*/)[1]?.split('User-agent')[0] || '')) error('robots.txt', 'site-wide Disallow for *');
if (exists('/rss.xml')) {
  const rss = fs.readFileSync(distPath('/rss.xml'), 'utf8');
  if (!/<rss[\s>]/.test(rss) || (rss.match(/<item>/g) || []).length === 0) error('rss.xml', 'feed has no items');
}

// ---------- Redirect targets in vercel.json ----------
const vercel = JSON.parse(fs.readFileSync(path.resolve('vercel.json'), 'utf8'));
for (const r of vercel.redirects || []) {
  if (r.destination.includes(':')) continue;
  if (!exists(r.destination)) error('vercel.json', `redirect target does not exist: ${r.source} -> ${r.destination}`);
  if (exists(r.source) && r.source !== '/sitemap.xml') warn('vercel.json', `redirect source is also a real page: ${r.source}`);
}

// ---------- Per page ----------
for (const file of files) {
  const rel = '/' + path.relative(DIST, file).replace(/\\/g, '/').replace(/index\.html$/, '');
  const html = fs.readFileSync(file, 'utf8');
  const is404 = rel.startsWith('/404');
  const head = html.split('</head>')[0];
  const body = html.split('<body')[1] || '';

  const title = decode(get(head, /<title>([^<]*)<\/title>/) || '');
  const desc = decode(get(head, /<meta name="description" content="([^"]*)"/) || '');
  const canonical = get(head, /<link rel="canonical" href="([^"]*)"/);
  const robots = get(head, /<meta name="robots" content="([^"]*)"/) || '';
  const lang = get(html, /<html lang="([^"]*)"/);

  // Head essentials
  if (!/<meta charset="utf-8"/i.test(head)) error(rel, 'missing charset');
  if (!/<meta name="viewport" content="[^"]*width=device-width/.test(head)) error(rel, 'missing responsive viewport meta');
  if (!lang) error(rel, 'missing html lang');
  if (!/rel="icon"/.test(head) || !/rel="apple-touch-icon"/.test(head) || !/rel="manifest"/.test(head)) error(rel, 'missing favicon, apple-touch-icon or manifest link');
  if (!/name="theme-color"/.test(head)) warn(rel, 'missing theme-color');

  // Title and description
  if (!title) error(rel, 'missing <title>');
  else if (title.length > 65) error(rel, `title too long (${title.length}): ${title}`);
  else if (title.length > 60) warn(rel, `title may truncate in Google (${title.length}): ${title}`);
  else if (title.length < 25) warn(rel, `title short (${title.length}): ${title}`);
  if (!desc) error(rel, 'missing meta description');
  else if (desc.length > 165 || desc.length < 70) error(rel, `description length ${desc.length}`);
  else if (desc.length > 160) warn(rel, `description may truncate (${desc.length})`);

  // Indexing
  if (!is404) {
    if (!canonical) error(rel, 'missing canonical');
    else if (canonical !== SITE + rel) error(rel, `canonical mismatch: ${canonical}`);
    if (robots.includes('noindex')) error(rel, 'noindex on indexable page');
    if (!robots.includes('max-image-preview:large')) warn(rel, 'robots meta lacks max-image-preview:large');
    const hreflangs = [...head.matchAll(/<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"/g)];
    if (!hreflangs.some((h) => h[1] === 'x-default')) warn(rel, 'missing hreflang x-default');
    for (const h of hreflangs) if (h[2] !== canonical) warn(rel, `hreflang ${h[1]} points away from canonical`);
  } else if (!robots.includes('noindex')) {
    error(rel, '404 page should be noindex');
  }

  // Headings
  const headings = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  const h1s = headings.filter((h) => h === 1).length;
  if (h1s !== 1) error(rel, `h1 count = ${h1s}`);
  for (let i = 1; i < headings.length; i++) {
    if (headings[i] > headings[i - 1] + 1) {
      warn(rel, `heading level skips from h${headings[i - 1]} to h${headings[i]}`);
      break;
    }
  }

  // Open Graph and Twitter
  const ogTitle = decode(get(head, /<meta property="og:title" content="([^"]*)"/) || '');
  const ogDesc = decode(get(head, /<meta property="og:description" content="([^"]*)"/) || '');
  const ogImage = get(head, /<meta property="og:image" content="([^"]*)"/);
  const ogAlt = get(head, /<meta property="og:image:alt" content="([^"]*)"/);
  for (const prop of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'og:site_name', 'og:locale', 'og:image:width', 'og:image:height']) {
    if (!head.includes(`property="${prop}"`)) error(rel, `missing ${prop}`);
  }
  for (const name of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
    if (!head.includes(`name="${name}"`)) error(rel, `missing ${name}`);
  }
  if (!ogAlt) warn(rel, 'missing og:image:alt');
  if (ogTitle && ogTitle.length > 90) warn(rel, `og:title long (${ogTitle.length})`);
  if (ogDesc && ogDesc.length > 200) warn(rel, `og:description long (${ogDesc.length})`);
  const ogUrl = get(head, /<meta property="og:url" content="([^"]*)"/);
  if (!is404 && ogUrl !== canonical) error(rel, 'og:url differs from canonical');
  if (ogImage) {
    if (!ogImage.startsWith('https://')) error(rel, `og:image must be an absolute https URL: ${ogImage}`);
    if (ogImage.startsWith(SITE)) {
      const p = ogImage.replace(SITE, '');
      if (!exists(p)) error(rel, `og:image not found: ${ogImage}`);
      else if (!ogChecked.has(p)) {
        const meta = await sharp(distPath(p)).metadata();
        const bytes = size(p);
        ogChecked.set(p, true);
        if (meta.width !== 1200 || meta.height !== 630) error(rel, `og:image is ${meta.width}x${meta.height}, expected 1200x630`);
        if (bytes > 300 * 1024) error(rel, `og:image ${Math.round(bytes / 1024)} KB exceeds WhatsApp's 300 KB preview limit`);
      }
    }
  }

  if (title && !is404) titles.set(title, [...(titles.get(title) || []), rel]);
  if (desc && !is404) descs.set(desc, [...(descs.get(desc) || []), rel]);

  // Images
  let eagerImageBytes = 0;
  let eagerCount = 0;
  let highPriority = 0;
  for (const m of body.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\salt="/.test(tag)) error(rel, `img missing alt: ${tag.slice(0, 90)}`);
    const src = decode(get(tag, /\ssrc="([^"]*)"/) || '');
    if (src.startsWith('/') && !exists(src)) error(rel, `image not found: ${src}`);
    if (!/\swidth="/.test(tag) || !/\sheight="/.test(tag)) error(rel, `img missing width/height: ${tag.slice(0, 90)}`);
    if (/fetchpriority="high"/.test(tag)) highPriority++;
    if (!/loading="lazy"/.test(tag)) {
      eagerCount++;
      if (src.startsWith('/')) eagerImageBytes += size(src);
    }
    if (src.startsWith('/_astro/') && !/\.(avif|webp|svg)$/i.test(src)) warn(rel, `image not served as AVIF/WebP: ${src}`);
    if (src.startsWith('/') && size(src) > 250 * 1024) warn(rel, `large image ${Math.round(size(src) / 1024)} KB: ${src}`);
  }
  if (highPriority > 1) warn(rel, `${highPriority} images marked fetchpriority=high`);
  if (eagerCount > 4) warn(rel, `${eagerCount} images load eagerly`);

  // Links
  for (const m of body.matchAll(/<a\b[^>]*>/g)) {
    const tag = m[0];
    let href = decode(get(tag, /\shref="([^"]*)"/) || '');
    if (!href) {
      error(rel, `link without href: ${tag.slice(0, 80)}`);
      continue;
    }
    if (/target="_blank"/.test(tag) && !/rel="[^"]*noopener/.test(tag)) warn(rel, `target=_blank without noopener: ${href}`);
    if (href.startsWith(SITE)) href = href.replace(SITE, '');
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    if (!exists(href)) error(rel, `broken internal link: ${href}`);
    else if (!href.split('#')[0].endsWith('/') && !/\.[a-z0-9]+$/i.test(href.split('#')[0]) && href.split('#')[0] !== '') warn(rel, `link without trailing slash (redirect hop): ${href}`);
  }

  // Page weight (what a first visit downloads before lazy content)
  const cssHrefs = [...head.matchAll(/<link rel="stylesheet" href="([^"]*)"/g)].map((m) => m[1]);
  const cssBytes = cssHrefs.reduce((s, h) => s + size(h), 0) + [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].reduce((s, m) => s + m[1].length, 0);
  const jsSrcs = [...html.matchAll(/<script[^>]*\ssrc="(\/[^"]*)"/g)].map((m) => m[1]);
  const jsBytes = jsSrcs.reduce((s, h) => s + size(h), 0) + [...html.matchAll(/<script(?![^>]*application\/ld\+json)(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)].reduce((s, m) => s + m[1].length, 0);
  const fontBytes = [...head.matchAll(/<link rel="preload" href="([^"]*)" as="font"/g)].reduce((s, m) => s + size(m[1]), 0);
  weights.push({ rel, html: html.length, css: cssBytes, js: jsBytes, fonts: fontBytes, eagerImages: eagerImageBytes });
  if (html.length + cssBytes + jsBytes + fontBytes + eagerImageBytes > 900 * 1024) warn(rel, 'initial page weight over 900 KB');

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!is404 && blocks.length !== 1) error(rel, `JSON-LD blocks = ${blocks.length}`);
  for (const b of blocks) {
    let data;
    try {
      data = JSON.parse(b[1]);
    } catch (e) {
      error(rel, `invalid JSON-LD: ${e.message}`);
      continue;
    }
    const nodes = data['@graph'] || [data];
    const idsSeen = new Set();
    const typesOnPage = new Map();
    for (const n of nodes) {
      const types = [].concat(n['@type']);
      const t = types.join('+');
      schemaTypes.set(t, (schemaTypes.get(t) || 0) + 1);
      for (const x of types) typesOnPage.set(x, (typesOnPage.get(x) || 0) + 1);
      if (n['@id']) {
        if (idsSeen.has(n['@id'])) error(rel, `duplicate @id in graph: ${n['@id']}`);
        idsSeen.add(n['@id']);
      }
      // Google rich result required properties
      if (types.includes('BlogPosting') || types.includes('Article')) {
        for (const k of ['headline', 'image', 'datePublished', 'author']) if (!n[k]) error(rel, `${t} missing ${k}`);
        if (n.headline && n.headline.length > 110) error(rel, 'Article headline over 110 characters');
      }
      if (types.includes('VideoObject')) {
        for (const k of ['name', 'description', 'thumbnailUrl', 'uploadDate']) if (!n[k]) error(rel, `VideoObject missing ${k}`);
      }
      if (types.includes('FAQPage') && n.mainEntity) {
        for (const q of [].concat(n.mainEntity)) if (!q.name || !q.acceptedAnswer?.text) error(rel, 'FAQPage question missing name or answer');
      }
      if (types.includes('BreadcrumbList')) {
        for (const item of n.itemListElement || []) if (!item.name || !item.item) error(rel, 'Breadcrumb item missing name or item');
      }
    }
    if ((typesOnPage.get('FAQPage') || 0) > 1) error(rel, 'more than one FAQPage node');
    const text = b[1];
    for (const ref of text.matchAll(new RegExp(`"@id":"(${SITE.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}[^"]*#[^"]+)"`, 'g'))) {
      if (!idsSeen.has(ref[1]) && !/#(condition|personimage|primaryimage)$/.test(ref[1]) && !ref[1].includes('/dermatology/')) {
        error(rel, `unresolved @id reference: ${ref[1]}`);
      }
    }
    if (text.includes('undefined') || text.includes('NaN')) error(rel, 'JSON-LD contains undefined or NaN');
  }
}

for (const [t, pages] of titles) if (pages.length > 1) error(pages.join(', '), `duplicate title: ${t}`);
for (const [d, pages] of descs) if (pages.length > 1) error(pages.join(', '), `duplicate description: ${d.slice(0, 60)}…`);

// ---------- Sitemap ----------
const smIndex = fs.readFileSync(path.join(DIST, 'sitemap-index.xml'), 'utf8');
const smFiles = [...smIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, ''));
let smUrls = [];
let videoEntries = 0;
for (const f of smFiles) {
  if (!exists(f)) {
    error('sitemap', `child sitemap missing: ${f}`);
    continue;
  }
  const xml = fs.readFileSync(distPath(f), 'utf8');
  smUrls = smUrls.concat([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  videoEntries += (xml.match(/<video:video>/g) || []).length;
  for (const lm of xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) if (Number.isNaN(Date.parse(lm[1]))) error('sitemap', `invalid lastmod ${lm[1]}`);
}
const htmlUrls = files.map((f) => SITE + '/' + path.relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, '')).filter((u) => !u.includes('/404'));
for (const u of htmlUrls) if (!smUrls.includes(u)) error(u, 'not in sitemap');
for (const u of smUrls) if (!htmlUrls.includes(u)) error(u, 'sitemap URL has no page');

// ---------- Report ----------
const kb = (n) => `${Math.round(n / 1024)} KB`;
const avg = (k) => weights.reduce((s, w) => s + w[k], 0) / weights.length;
const heaviest = [...weights].sort((a, b) => b.html + b.css + b.js + b.eagerImages - (a.html + a.css + a.js + a.eagerImages))[0];
console.log(`Pages audited: ${files.length}`);
console.log(`Sitemap URLs: ${smUrls.length} (video entries: ${videoEntries})`);
console.log(`Social images checked: ${ogChecked.size}`);
console.log(`Average initial weight: HTML ${kb(avg('html'))}, CSS ${kb(avg('css'))}, JS ${kb(avg('js'))}, preloaded fonts ${kb(avg('fonts'))}, eager images ${kb(avg('eagerImages'))}`);
console.log(`Heaviest page: ${heaviest.rel} (HTML ${kb(heaviest.html)}, eager images ${kb(heaviest.eagerImages)})`);
console.log('Schema node types:', Object.fromEntries([...schemaTypes].sort((a, b) => b[1] - a[1])));
console.log(`Errors: ${errors.length}`);
for (const i of errors) console.log(` - [${i.page}] ${i.msg}`);
console.log(`Warnings: ${warnings.length}`);
for (const i of warnings) console.log(` - [${i.page}] ${i.msg}`);
process.exitCode = errors.length ? 1 : 0;
