import type { APIRoute } from 'astro';
import { SITE_URL } from '../data/site';

/**
 * Open to search engines AND AI answer engines. Being citable by ChatGPT,
 * Perplexity, Gemini, Claude and Google AI Overviews is a campaign goal.
 */
const aiAndSearchBots = [
  'Googlebot',
  'Googlebot-Image',
  'Google-Extended',
  'Bingbot',
  'Applebot',
  'Applebot-Extended',
  'DuckDuckBot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Meta-ExternalAgent',
  'Amazonbot',
  'CCBot',
  'cohere-ai',
  'MistralAI-User',
];

export const GET: APIRoute = () => {
  const body = [
    '# robots.txt for drkartini.net',
    '# Search engines and AI assistants are welcome to crawl and cite this site.',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /404/',
    '',
    ...aiAndSearchBots.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    '# Aggressive SEO crawlers: slow down',
    'User-agent: AhrefsBot',
    'Crawl-delay: 10',
    '',
    'User-agent: SemrushBot',
    'Crawl-delay: 10',
    '',
    'User-agent: MJ12bot',
    'Crawl-delay: 10',
    '',
    `Sitemap: ${SITE_URL}/sitemap-index.xml`,
    '',
    '# LLM-readable summaries: /llms.txt and /llms-full.txt',
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
