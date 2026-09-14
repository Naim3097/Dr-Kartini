import type { APIRoute } from 'astro';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: 'Dr Kartini Farah Rahim, Consultant Dermatologist',
        short_name: 'Dr Kartini',
        description: 'Consultant Dermatologist in Shah Alam, Malaysia. Educator. Advocate for people, animals and the planet.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1d4f5e',
        lang: 'en-MY',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
