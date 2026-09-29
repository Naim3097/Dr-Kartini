/**
 * Open Graph image renderer (1200x630), used by /og/[...slug].jpg at build time.
 * Same typeface (Source Sans 3) and single brand colour as the website.
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const font = (p: string) => fs.readFileSync(path.join(root, 'node_modules', p));

const BRAND = '#1d4f5e';
const TEXT = '#1c2329';
const TEXT_2 = '#48535c';
const BORDER = '#dfe4e7';

let fonts: { name: string; data: Buffer; weight: 400 | 600 | 700; style: 'normal' }[] | null = null;
function loadFonts() {
  if (!fonts) {
    fonts = [
      { name: 'Source Sans 3', data: font('@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff'), weight: 400, style: 'normal' },
      { name: 'Source Sans 3', data: font('@fontsource/source-sans-3/files/source-sans-3-latin-600-normal.woff'), weight: 600, style: 'normal' },
      { name: 'Source Sans 3', data: font('@fontsource/source-sans-3/files/source-sans-3-latin-700-normal.woff'), weight: 700, style: 'normal' },
    ];
  }
  return fonts;
}

const portraitCache = new Map<string, string>();
async function portraitDataUri(file: string) {
  if (!portraitCache.has(file)) {
    const buf = await sharp(path.join(root, 'src/assets/images', file))
      .resize(440, 630, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 82 })
      .toBuffer();
    portraitCache.set(file, `data:image/jpeg;base64,${buf.toString('base64')}`);
  }
  return portraitCache.get(file)!;
}

export type OgInput = {
  title: string;
  eyebrow?: string;
  portrait?: string; // path relative to src/assets/images
  /** Kept for compatibility with existing callers; the card always uses the brand colour. */
  accent?: string;
};

export async function renderOg({
  title,
  eyebrow = 'Consultant Dermatologist, Shah Alam, Malaysia',
  portrait = 'portraits/dr-kartini-farah-rahim-consultant-dermatologist.jpg',
}: OgInput) {
  const img = await portraitDataUri(portrait);
  const size = title.length > 90 ? 46 : title.length > 60 ? 54 : 64;

  const tree = {
    type: 'div',
    props: {
      style: { width: 1200, height: 630, display: 'flex', background: '#ffffff', fontFamily: 'Source Sans 3' },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: 760,
              padding: '60px 64px 52px 68px',
              borderTop: `10px solid ${BRAND}`,
            },
            children: [
              { type: 'div', props: { style: { fontSize: 28, fontWeight: 700, color: BRAND }, children: 'Dr Kartini Farah Rahim' } },
              { type: 'div', props: { style: { fontSize: size, fontWeight: 700, lineHeight: 1.1, color: TEXT, letterSpacing: -0.5 }, children: title } },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 22, borderTop: `1px solid ${BORDER}`, fontSize: 24, color: TEXT_2 },
                  children: [
                    { type: 'div', props: { style: { display: 'flex', maxWidth: 500 }, children: eyebrow } },
                    { type: 'div', props: { style: { fontWeight: 600, color: TEXT }, children: 'expertdermatologist.com' } },
                  ],
                },
              },
            ],
          },
        },
        { type: 'img', props: { src: img, width: 440, height: 630, style: { objectFit: 'cover' } } },
      ],
    },
  };

  // @ts-ignore satori accepts plain element objects
  const svg = await satori(tree, { width: 1200, height: 630, fonts: loadFonts() });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return sharp(png).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
}
