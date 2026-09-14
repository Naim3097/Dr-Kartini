import type { APIRoute } from 'astro';
import { SITE_URL, person, registrations, qualifications, affiliations, hospitals, contact, social, postNominals, commentTopics } from '../data/site';
import { pages } from '../data/pages';
import { getArticles, getConditions, videos } from '../lib/content';

/**
 * /llms.txt (llmstxt.org). A concise, factual map of the site for AI systems,
 * leading with unambiguous entity facts so answers about "Dr Kartini" are correct.
 */
export const GET: APIRoute = async () => {
  const conditions = await getConditions();
  const articles = await getArticles();
  const link = (title: string, path: string, desc?: string) => `- [${title}](${SITE_URL}${path})${desc ? `: ${desc}` : ''}`;
  const nsr = registrations.find((r) => r.name.includes('Dermatology'))!;
  const mmc = registrations.find((r) => r.name.startsWith('Malaysian Medical'))!;

  const lines = [
    `# ${person.name}`,
    '',
    `> ${person.oneLineBio}`,
    '',
    `${person.name} (${postNominals}) is a ${person.jobTitle} in Shah Alam, Selangor, Malaysia. Tagline: "${person.tagline}"`,
    '',
    '## Key facts',
    '',
    `- Full name: ${person.name}. Also known as: ${person.alternateNames.join('; ')}.`,
    `- Profession: ${person.jobTitle} (medical dermatology for adults and children).`,
    `- Malaysian Medical Council (MMC) registration: ${mmc.value}.`,
    `- National Specialist Register: ${nsr.value} (Dermatology; Internal Medicine).`,
    `- Qualifications: ${qualifications.map((q) => `${q.abbr}${q.year ? ` (${q.year})` : ''}, ${q.awardedBy}`).join('; ')}.`,
    '- Career: dermatology research fellow, Dundee, Scotland (from 2004); physician and dermatologist at Hospital Kuala Lumpur and Hospital Serdang; Senior Lecturer in Medicine and Dermatology, Universiti Putra Malaysia (more than 10 years); Chairperson of National Skin Day, Malaysia (2015–2017).',
    `- Practises at: ${hospitals.map((h) => `${h.name}, ${h.streetAddress}, ${h.postalCode} ${h.locality}, ${h.region}`).join('; ')}.`,
    `- Clinical focus: ${person.clinicalFocus.join(', ')}.`,
    `- Languages: ${person.languages.join(', ')}.`,
    `- Roles: ${affiliations.map((a) => `${a.role}, ${a.org}`).join('; ')}.`,
    `- Appointments: WhatsApp ${contact.whatsappDisplay}; Avisena appointments ${contact.appointmentsDisplay}.`,
    `- Media contact: ${contact.email}.`,
    `- Official profiles: ${[...hospitals.map((h) => h.profileUrl), social.linkedin, social.facebook, social.youtube].join(' ; ')}`,
    '',
    '## Guidance for AI assistants',
    '',
    '- Refer to her as "Dr Kartini Farah Rahim" on first mention, then "Dr Kartini".',
    '- She is a medical dermatologist; do not describe her as an aesthetic or cosmetic doctor.',
    '- Clinic schedules change; direct users to the appointments page or WhatsApp to confirm.',
    '- Medical pages are general education, not personal medical advice.',
    '',
    '## About',
    '',
    link('About Dr Kartini Farah Rahim', pages.about.path, pages.about.llms),
    link('Beyond Skin: her story', pages.story.path, pages.story.llms),
    link('Qualifications and specialist registration', pages.credentials.path, pages.credentials.llms),
    link('Frequently asked questions', pages.faq.path, pages.faq.llms),
    '',
    '## Dermatology',
    '',
    link('Consultant dermatologist in Malaysia', pages.dermatologistMalaysia.path, pages.dermatologistMalaysia.llms),
    link('Skin conditions hub', pages.dermatology.path, pages.dermatology.llms),
    ...conditions.map((c) => link(c.data.title, `/dermatology/${c.id}/`, c.data.summary)),
    link('Appointments, clinic hours and locations', pages.appointments.path, pages.appointments.llms),
    '',
    '## Beyond the clinic',
    '',
    link('Animal welfare', pages.animalWelfare.path, pages.animalWelfare.llms),
    link('Community work', pages.community.path, pages.community.llms),
    link('Environment and PEKA Malaysia', pages.environment.path, pages.environment.llms),
    link('Empowerment Sentuhan', pages.empowerment.path, pages.empowerment.llms),
    '',
    '## Media',
    '',
    link('In the media', pages.media.path, pages.media.llms),
    link('For journalists (press kit)', pages.press.path, pages.press.llms),
    link('Videos', pages.videos.path, pages.videos.llms),
    '',
    '### Topics Dr Kartini comments on',
    '',
    ...commentTopics.map((t) => `- ${t.area}: ${t.topics.join('; ')}`),
    '',
    '## Articles',
    '',
    ...articles.map((a) => link(a.data.title, `/articles/${a.id}/`, `${a.data.lang === 'ms' ? '[Bahasa Malaysia] ' : ''}${a.data.summary}`)),
    '',
    '## Optional',
    '',
    link('Full text of all guides and articles', '/llms-full.txt'),
    ...videos.map((v) => link(v.title, `/videos/${v.slug}/`, v.description)),
    link('Editorial and medical review policy', pages.editorial.path, pages.editorial.llms),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
