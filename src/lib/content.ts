import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import consult from '../assets/images/clinical/dermatology-consultation-dr-kartini.jpg';
import cat from '../assets/images/animal-welfare/dr-kartini-animal-rescuer-with-cat.jpg';
import gasing from '../assets/images/environment/save-bukit-gasing-community-advocacy.jpg';
import speaking from '../assets/images/media/dr-kartini-speaking-at-health-event.jpg';
import portrait from '../assets/images/portraits/dr-kartini-farah-rahim-black-blazer.jpg';
import { articleCategories, type ArticleCategory } from '../data/site';
import videosJson from '../data/videos.json';

export type Video = (typeof videosJson)[number];
export const videos: Video[] = videosJson;

export const categoryImage: Record<ArticleCategory, ImageMetadata> = {
  dermatology: consult,
  'animal-welfare': cat,
  environment: gasing,
  community: speaking,
  perspectives: portrait,
  'press-statements': portrait,
};

export const categoryImageAlt: Record<ArticleCategory, string> = {
  dermatology: 'Dr Kartini Farah Rahim listening to a patient during a dermatology consultation',
  'animal-welfare': 'Dr Kartini Farah Rahim holding a rescued cat',
  environment: 'Community members advocating for the protection of Bukit Gasing forest',
  community: 'Dr Kartini Farah Rahim speaking at a health education event',
  perspectives: 'Portrait of Dr Kartini Farah Rahim, Consultant Dermatologist',
  'press-statements': 'Portrait of Dr Kartini Farah Rahim, Consultant Dermatologist',
};

export const categoryAccent: Record<ArticleCategory, 'clinic' | 'animals' | 'planet' | 'media'> = {
  dermatology: 'clinic',
  'animal-welfare': 'animals',
  environment: 'planet',
  community: 'media',
  perspectives: 'clinic',
  'press-statements': 'media',
};

export const categoryLabel = (c: ArticleCategory) => articleCategories[c].label;

const showDrafts = import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_DRAFTS === 'true';

export async function getArticles() {
  const all = await getCollection('articles', ({ data }) => showDrafts || !data.draft);
  return all.sort((a, b) => b.data.datePublished.valueOf() - a.data.datePublished.valueOf());
}

export async function getConditions() {
  const all = await getCollection('conditions');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export function readingMinutes(body = '') {
  const words = body.replace(/[#>*_`|\-\[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / 220)) };
}

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export function videosFor(ids: string[]) {
  return ids.map((id) => videos.find((v) => v.id === id)).filter(Boolean) as Video[];
}

export type Article = CollectionEntry<'articles'>;
export type Condition = CollectionEntry<'conditions'>;
