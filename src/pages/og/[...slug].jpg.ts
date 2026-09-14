import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg, type OgInput } from '../../lib/og';
import { pages } from '../../data/pages';
import { getArticles, getConditions, videos, categoryAccent } from '../../lib/content';

export const getStaticPaths = (async () => {
  const out: { params: { slug: string }; props: OgInput }[] = [];

  out.push({ params: { slug: 'default' }, props: { title: 'Consultant Dermatologist. Educator. Advocate for People, Animals & the Planet.' } });

  for (const [key, meta] of Object.entries(pages)) {
    out.push({ params: { slug: `page/${key}` }, props: meta.og });
  }

  for (const c of await getConditions()) {
    out.push({
      params: { slug: `dermatology/${c.id}` },
      props: { title: c.data.title, eyebrow: 'Medically reviewed patient guide', portrait: 'portraits/dr-kartini-farah-rahim-scrubs.jpg' },
    });
  }

  for (const a of await getArticles()) {
    const accent = categoryAccent[a.data.category];
    const portrait =
      a.data.category === 'animal-welfare'
        ? 'animal-welfare/dr-kartini-animal-rescuer-with-cat.jpg'
        : a.data.category === 'environment'
          ? 'portraits/dr-kartini-farah-rahim-portrait-dark.jpg'
          : 'portraits/dr-kartini-farah-rahim-consultant-dermatologist.jpg';
    out.push({
      params: { slug: `articles/${a.id}` },
      props: { title: a.data.title, eyebrow: a.data.lang === 'ms' ? 'Artikel oleh Dr Kartini Farah Rahim' : 'By Dr Kartini Farah Rahim, Consultant Dermatologist', portrait, accent },
    });
  }

  for (const v of videos) {
    out.push({
      params: { slug: `videos/${v.slug}` },
      props: {
        title: v.title,
        eyebrow: 'Video with Dr Kartini Farah Rahim',
        portrait: v.category === 'animal-welfare' ? 'animal-welfare/dr-kartini-with-rescued-dog.jpg' : 'media/dr-kartini-television-studio.jpg',
        accent: v.category === 'animal-welfare' ? 'animals' : 'media',
      },
    });
  }
  return out;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const jpg = await renderOg(props as OgInput);
  return new Response(new Uint8Array(jpg), { headers: { 'Content-Type': 'image/jpeg' } });
};
