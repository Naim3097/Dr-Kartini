// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://www.drkartini.net';
const BUILD_DATE = new Date();

/**
 * Per-URL <lastmod> for the sitemap, read straight from content frontmatter.
 * Google uses lastmod (not priority/changefreq) when it is consistently accurate.
 */
function collectLastmod() {
  const map = new Map();
  /** @param {string} dir @param {string} prefix */
  const read = (dir, prefix) => {
    const abs = path.resolve(dir);
    if (!fs.existsSync(abs)) return;
    for (const file of fs.readdirSync(abs)) {
      if (!file.endsWith('.md')) continue;
      const src = fs.readFileSync(path.join(abs, file), 'utf8');
      const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      if (/^draft:\s*true/m.test(fm)) continue;
      /** @param {string} key */
      const pick = (key) => fm.match(new RegExp(`^${key}:\\s*['"]?([0-9]{4}-[0-9]{2}-[0-9]{2})`, 'm'))?.[1];
      const date = pick('dateModified') ?? pick('lastReviewed') ?? pick('datePublished');
      if (date) map.set(`${SITE}${prefix}${file.replace(/\.md$/, '')}/`, new Date(date));
    }
  };
  read('./src/content/conditions', '/dermatology/');
  read('./src/content/articles', '/articles/');
  return map;
}

/** Video entries for the video sitemap namespace (Google video indexing). */
function collectVideos() {
  const map = new Map();
  const file = path.resolve('./src/data/videos.json');
  if (!fs.existsSync(file)) return map;
  const videos = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const v of videos) {
    map.set(`${SITE}/videos/${v.slug}/`, {
      thumbnail_loc: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
      title: v.title,
      description: v.description,
      player_loc: `https://www.youtube-nocookie.com/embed/${v.id}`,
      duration: v.seconds,
      publication_date: v.uploadDate,
      family_friendly: 'yes',
      requires_subscription: 'no',
      live: 'no',
    });
  }
  return map;
}

const lastmod = collectLastmod();
const videos = collectVideos();

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
  // One typeface across the whole site: Source Sans 3 (headings and body).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Source Sans 3',
      cssVariable: '--font-sans',
      weights: ['400 700'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
    },
  ],
  integrations: [
    sitemap({
      filter: (page) => !/\/(404|thank-you)\/?$/.test(page),
      namespaces: { news: false, xhtml: true, image: true, video: true },
      serialize(item) {
        const url = item.url;
        const out = { ...item, lastmod: (lastmod.get(url) ?? BUILD_DATE).toISOString() };
        const video = videos.get(url);
        // @ts-ignore - the underlying `sitemap` library accepts video entries
        if (video) out.video = [video];
        return out;
      },
    }),
  ],
});
