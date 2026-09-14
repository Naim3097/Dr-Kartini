import type { APIRoute } from 'astro';
import { SITE_URL, person, postNominals } from '../data/site';
import { getArticles, getConditions, isoDate } from '../lib/content';

/** /llms-full.txt: complete markdown text of every condition guide and article. */
export const GET: APIRoute = async () => {
  const conditions = await getConditions();
  const articles = await getArticles();
  const out: string[] = [
    `# ${person.name}: full content`,
    '',
    `> ${person.oneLineBio} (${postNominals})`,
    '',
    `Source: ${SITE_URL}. All medical content is written or reviewed by ${person.name}, Consultant Dermatologist.`,
    '',
  ];

  for (const c of conditions) {
    const d = c.data;
    out.push(
      '---',
      '',
      `# ${d.title}`,
      '',
      `URL: ${SITE_URL}/dermatology/${c.id}/`,
      `Reviewed by: ${person.name}, Consultant Dermatologist. Last reviewed: ${isoDate(d.lastReviewed)}.`,
      '',
      `Summary: ${d.summary}`,
      '',
      ...(d.keyFacts.length ? ['## Key facts', '', ...d.keyFacts.map((f) => `- ${f.label}: ${f.value}`), ''] : []),
      ...(d.whenToSee.length ? ['## When to see a dermatologist', '', ...d.whenToSee.map((w) => `- ${w}`), ''] : []),
      (c.body ?? '').trim(),
      '',
      ...(d.faqs.length ? ['## Frequently asked questions', '', ...d.faqs.flatMap((f) => [`### ${f.q}`, '', f.a, ''])] : []),
      ...(d.sources.length ? ['## Sources', '', ...d.sources.map((s) => `- ${s.title} (${s.publisher}): ${s.url}`), ''] : []),
    );
  }

  for (const a of articles) {
    const d = a.data;
    out.push(
      '---',
      '',
      `# ${d.title}`,
      '',
      `URL: ${SITE_URL}/articles/${a.id}/`,
      `Author: ${person.name}. Published: ${isoDate(d.datePublished)}. Language: ${d.lang === 'ms' ? 'Bahasa Malaysia' : 'English'}.`,
      '',
      `Summary: ${d.summary}`,
      '',
      ...(d.keyTakeaways.length ? ['## Key takeaways', '', ...d.keyTakeaways.map((k) => `- ${k}`), ''] : []),
      (a.body ?? '').replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/<iframe[^>]*><\/iframe>/g, '').trim(),
      '',
      ...(d.faqs.length ? ['## Frequently asked questions', '', ...d.faqs.flatMap((f) => [`### ${f.q}`, '', f.a, ''])] : []),
      ...(d.sources.length ? ['## Sources', '', ...d.sources.map((s) => `- ${s.title} (${s.publisher}): ${s.url}`), ''] : []),
    );
  }

  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
