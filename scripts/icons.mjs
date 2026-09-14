import sharp from 'sharp';
import fs from 'fs';
const svg = fs.readFileSync('public/favicon.svg');
const png = (s) => sharp(svg, { density: 512 }).resize(s, s).png().toBuffer();
fs.writeFileSync('public/apple-touch-icon.png', await sharp(svg, { density: 512 }).resize(180, 180).flatten({ background: '#1d4f5e' }).png().toBuffer());
fs.writeFileSync('public/icon-192.png', await png(192));
fs.writeFileSync('public/icon-512.png', await png(512));
// maskable: glyph inside safe zone on full-bleed background
const inner = await sharp(svg, { density: 512 }).resize(360, 360).png().toBuffer();
fs.writeFileSync('public/icon-512-maskable.png', await sharp({ create: { width: 512, height: 512, channels: 4, background: '#1d4f5e' } }).composite([{ input: inner, left: 76, top: 76 }]).png().toBuffer());
// favicon.ico with 16, 32, 48 PNG entries
const sizes = [16, 32, 48];
const imgs = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length; const dir = [];
sizes.forEach((s, i) => { const e = Buffer.alloc(16); e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(imgs[i].length, 8); e.writeUInt32LE(offset, 12); offset += imgs[i].length; dir.push(e); });
fs.writeFileSync('public/favicon.ico', Buffer.concat([header, ...dir, ...imgs]));
console.log('icons ok');
