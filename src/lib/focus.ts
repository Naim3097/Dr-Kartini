import type { ImageMetadata } from 'astro';

/**
 * Where to keep the subject when a card or banner crops a photo, as a CSS object-position.
 *
 * Most crops on the site are wide (16:10 cards, 16:9 article banners), so a centre crop of a
 * tall portrait cuts through Dr Kartini's face. Photos listed here are cropped around the point
 * given instead. Add a photo when a crop of it cuts off a face.
 */
const points: Record<string, string> = {
  'dr-kartini-farah-rahim-black-blazer': '50% 14%',
  'dr-kartini-farah-rahim-white-blazer': '50% 12%',
  'dr-kartini-farah-rahim-scrubs': '50% 12%',
  'dr-kartini-farah-rahim-dermatologist-shah-alam': '50% 0%',
  'dr-kartini-farah-rahim-baju-kurung-seated': '50% 0%',
  'dr-kartini-animal-rescuer-with-cat': '50% 22%',
  'childrens-skin-care-dr-kartini': '50% 0%',
  'mochi-rescued-kitten-shah-alam': '50% 4%',
  'reusable-food-containers': '50% 50%',
};

/** An img style that crops the photo around its focus point, or undefined to keep the default. */
export function focusStyle(img: ImageMetadata): string | undefined {
  const file = img.src.split('?')[0].split('/').pop() ?? '';
  const point = points[file.split('.')[0]];
  return point ? `object-position: ${point}` : undefined;
}
