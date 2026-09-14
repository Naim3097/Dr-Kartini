/**
 * Post-build SEO audit. Run: npm run build && node scripts/seo-audit.mjs
 * Checks every HTML page in dist/ for the on-page SEO, social and structured-data
 * essentials, and verifies that every internal link and image resolves.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const SITE = 'https://www.drkartini.net';
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) files.push(p);
  }
})(DIST);

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const get = (html, re) => (html.match(re) || [])[1];
const issues = [];
const warn = (page, msg) => issues.push({ page, msg });
const titles = new Map();
const descs = new Map();
let schemaTypes = new Map();

const exists = (urlPath) => {
  const clean = urlPath.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return fs.existsSync(path.join(DIST, 'index.html'));
  const p = path.join(DIST, decodeURIComponent(clean));
  if (fs.existsSync(p) && fs.statSync(p).isFile()) return true;
  return fs.existsSync(path.join(p, 'index.html'));
};

for (const file of files) {
  const rel = '/' + path.relative(DIST, file).replace(/\\/g, '/').replace(/index\.html$/, '');
  const html = fs.readFileSync(file, 'utf8');
  const is404 = rel.startsWith('/404');

  const title = decode(get(html, /<title>([^<]*)<\/title>/) || '');
  const desc = decode(get(html, /<meta name="description" content="([^"]*)"/) || '');
  const canonical = get(html, /<link rel="canonical" href="([^"]*)"/);
  const robots = get(html, /<meta name="robots" content="([^"]*)"/) || '';
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const lang = get(html, /<html lang="([^"]*)"/);

  if (!title) warn(rel, 'missing <title>');
  else if (title.length > 65) warn(rel, `title too long (${title.length}): ${title}`);
  else if (title.length < 25) warn(rel, `title short (${title.length}): ${title}`);
  if (!desc) warn(rel, 'missing meta description');
  else if (desc.length > 165 || desc.length < 100) warn(rel, `description length ${desc.length}`);
  if (!is404) {
    if (!canonical) warn(rel, 'missing canonical');
    else if (canonical !== SITE + rel) warn(rel, `canonical mismatch: ${canonical}`);
    if (robots.includes('noindex')) warn(rel, 'noindex on indexable page');
  }
  if (h1s !== 1) warn(rel, `h1 count = ${h1s}`);
  if (!lang) warn(rel, 'missing html lang');
  for (const prop of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) {
    if (!html.includes(`property="${prop}"`)) warn(rel, `missing ${prop}`);
  }
  if (!html.includes('name="twitter:card"')) warn(rel, 'missing twitter:card');

  const og = get(html, /<meta property="og:image" content="([^"]*)"/);
  if (og && og.startsWith(SITE) && !exists(og.replace(SITE, ''))) warn(rel, `og:image not found: ${og}`);

  if (title && !is404) titles.set(title, [...(titles.get(title) || []), rel]);
  if (desc && !is404) descs.set(desc, [...(descs.get(desc) || []), rel]);

  // images
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\salt="/.test(tag)) warn(rel, `img missing alt: ${tag.slice(0, 90)}`);
    const src = get(tag, /\ssrc="([^"]*)"/);
    if (src && src.startsWith('/') && !exists(src)) warn(rel, `image not found: ${src}`);
    if (!/\swidth="/.test(tag) || !/\sheight="/.test(tag)) warn(rel, `img missing width/height: ${tag.slice(0, 90)}`);
  }

  // internal links
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)) {
    let href = decode(m[1]);
    if (href.startsWith(SITE)) href = href.replace(SITE, '');
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    if (!exists(href)) warn(rel, `broken internal link: ${href}`);
    else if (!href.split('#')[0].endsWith('/') && !/\.[a-z0-9]+$/i.test(href.split('#')[0]) && href.split('#')[0] !== '') warn(rel, `link without trailing slash: ${href}`);
  }

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!is404 && blocks.length !== 1) warn(rel, `JSON-LD blocks = ${blocks.length}`);
  for (const b of blocks) {
    try {
      const data = JSON.parse(b[1]);
      const nodes = data['@graph'] || [data];
      const idsSeen = new Set();
      for (const n of nodes) {
        const t = [].concat(n['@type']).join('+');
        schemaTypes.set(t, (schemaTypes.get(t) || 0) + 1);
        if (n['@id']) {
          if (idsSeen.has(n['@id'])) warn(rel, `duplicate @id in graph: ${n['@id']}`);
          idsSeen.add(n['@id']);
        }
      }
      // referenced ids must be defined in graph (for #fragment ids on this site)
      const text = b[1];
      for (const ref of text.matchAll(/"@id":"(https:\/\/www\.drkartini\.net[^"]*#[^"]+)"/g)) {
        if (!idsSeen.has(ref[1]) && !/#(condition|personimage|primaryimage)$/.test(ref[1])) {
          // allow cross-page condition refs
          if (!ref[1].includes('/dermatology/')) warn(rel, `unresolved @id reference: ${ref[1]}`);
        }
      }
      if (text.includes('undefined') || text.includes('NaN')) warn(rel, 'JSON-LD contains undefined/NaN');
    } catch (e) {
      warn(rel, `invalid JSON-LD: ${e.message}`);
    }
  }
}

for (const [t, pages] of titles) if (pages.length > 1) warn(pages.join(', '), `duplicate title: ${t}`);
for (const [d, pages] of descs) if (pages.length > 1) warn(pages.join(', '), `duplicate description: ${d.slice(0, 60)}…`);

// Sitemap coverage
const sm = fs.readFileSync(path.join(DIST, 'sitemap-0.xml'), 'utf8');
const smUrls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const htmlUrls = files.map((f) => SITE + '/' + path.relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, '')).filter((u) => !u.includes('/404'));
for (const u of htmlUrls) if (!smUrls.includes(u)) warn(u, 'not in sitemap');
for (const u of smUrls) if (!htmlUrls.includes(u)) warn(u, 'sitemap URL has no page');

console.log(`Pages audited: ${files.length}`);
console.log(`Sitemap URLs: ${smUrls.length} (video entries: ${(sm.match(/<video:video>/g) || []).length})`);
console.log('Schema node types:', Object.fromEntries([...schemaTypes].sort((a, b) => b[1] - a[1])));
console.log(`Issues: ${issues.length}`);
for (const i of issues) console.log(` - [${i.page}] ${i.msg}`);
process.exitCode = issues.length ? 1 : 0;
