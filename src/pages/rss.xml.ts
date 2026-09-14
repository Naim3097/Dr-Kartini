import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE_URL, person } from '../data/site';
import { getArticles, categoryLabel } from '../lib/content';

export const GET: APIRoute = async () => {
  const articles = await getArticles();
  return rss({
    title: `${person.name}: Articles`,
    description: `Skin health guidance, animal welfare and environmental writing by ${person.name}, Consultant Dermatologist in Shah Alam, Malaysia.`,
    site: SITE_URL,
    trailingSlash: true,
    customData: `<language>en-my</language><managingEditor>${person.name}</managingEditor>`,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.summary,
      pubDate: a.data.datePublished,
      link: `/articles/${a.id}/`,
      categories: [categoryLabel(a.data.category), ...a.data.tags],
      author: person.name,
    })),
  });
};
