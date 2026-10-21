// scripts/prerender.js
// Se ejecuta tras `vite build` (postbuild). Genera un index.html por ruta con <head> propio,
// porque los crawlers de redes sociales (WhatsApp, Facebook, X) no ejecutan JavaScript.
// ponytail: solo el <head> se pre-renderiza (el <body> lo pinta React) y en español; si algún día
// se necesita contenido indexable sin JS o URLs por idioma, ahí vale la pena un SSG real.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { translations } from '../src/data/translations.js';

// Con www: el dominio sin www redirige (308) aquí, y un canonical que redirige es ignorado por Google
const SITE_URL = (process.env.SITE_URL || 'https://www.dianaadventurechile.com').replace(/\/$/, '');
const DIST = new URL('../dist/', import.meta.url);
const HERO_IMG = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&q=80&w=2070';
const DEFAULT_IMG = '/images/portada-birdwaching.jpg';

const tours = JSON.parse(readFileSync(new URL('../src/data/tours_es.json', import.meta.url), 'utf8'));
const t = translations.ES;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cut = (s, max) => (s.length > max ? s.slice(0, max - 1).trimEnd() + '…' : s);
const absolute = (src) => (src.startsWith('http') ? src : SITE_URL + encodeURI(src));

const pages = [
  { path: '/', title: 'Diana Adventure Chile | Ecoturismo y viajes grupales', description: 'Birdwatching en Valdivia, trekking en el Alerce Costero y viajes grupales a Torres del Paine, Asia y Escocia con guías locales.', head: `<link rel="preload" as="image" href="${HERO_IMG}" fetchpriority="high" />` },
  { path: '/nuestras-actividades', title: `${t.nav.activities} | Diana Adventure`, description: 'Expediciones internacionales y experiencias de naturaleza en Valdivia: birdwatching, hiking y viajes grupales.' },
  { path: '/nosotros', title: `${t.nav.about} | Diana Adventure`, description: t.about.subtitle },
  { path: '/contacto', title: `${t.nav.contact} | Diana Adventure`, description: t.contact.subtitle },
  { path: '/terminos', title: 'Términos y Condiciones | Diana Adventure', description: 'Condiciones de reserva, pago, anulación y seguridad de las excursiones y viajes grupales de Diana Adventure.' },
  ...Object.entries(tours).flatMap(([categoria, list]) => list.map((tour) => ({
    path: `/tour/${categoria}/${tour.id}`,
    title: `${tour.title} | Diana Adventure`,
    description: tour.shortDescription,
    image: tour.thumbnail,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: tour.title,
      description: tour.shortDescription,
      image: absolute(tour.thumbnail),
      url: SITE_URL + `/tour/${categoria}/${tour.id}`,
      provider: { '@type': 'TravelAgency', name: 'Diana Adventure', email: 'hola@dianaadventure.cl' },
    },
  }))),
];

const renderHead = (page) => {
  const title = esc(cut(page.title, 60));
  const description = esc(cut(page.description, 155));
  const url = SITE_URL + page.path;
  const image = esc(absolute(page.image || DEFAULT_IMG));
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Diana Adventure" />`,
    `<meta property="og:locale" content="es_CL" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    page.head,
    // "<" escapado para que un texto con "</script>" no pueda cerrar el bloque
    page.jsonLd && `<script type="application/ld+json">${JSON.stringify(page.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].filter(Boolean).join('\n    ');
};

const template = readFileSync(new URL('index.html', DIST), 'utf8');
if (!/<title>.*<\/title>/.test(template)) throw new Error('[prerender] index.html no tiene <title> que reemplazar');

// "/nosotros" -> nosotros.html (no nosotros/index.html): Vercel (cleanUrls) y vite preview
// lo sirven sin barra final; la variante con carpeta caía en el fallback del SPA.
for (const page of pages) {
  const file = new URL(page.path === '/' ? 'index.html' : '.' + page.path + '.html', DIST);
  mkdirSync(new URL('.', file), { recursive: true });
  writeFileSync(file, template.replace(/<title>.*<\/title>/, renderHead(page)));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE_URL}${p.path}</loc></url>`).join('\n')}
</urlset>
`;
writeFileSync(new URL('sitemap.xml', DIST), sitemap);
writeFileSync(new URL('robots.txt', DIST), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`[prerender] ${pages.length} rutas, sitemap.xml y robots.txt generados para ${SITE_URL}`);
