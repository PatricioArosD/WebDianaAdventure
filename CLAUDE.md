# Diana Adventure Chile — sitio web (Ecoturismo)

Sitio de una agencia de ecoturismo (birdwatching y trekking en Valdivia, viajes grupales internacionales).
Dominio: `https://www.dianaadventurechile.com`. Deploy en Vercel.

> **Este proyecto NO es la tesis.** El `CLAUDE.md` de `Proyectos/` describe un stack Node + SQLite con backend:
> aquí no aplica. Es un sitio **estático, solo frontend**, sin backend ni base de datos. No propongas crearlos.
> Sí siguen vigentes del padre: respuestas en español, ES Modules, camelCase/PascalCase, Bootstrap primero, cero dependencias innecesarias.

## Stack
- React 19 + Vite 8 (JSX, sin TypeScript), React Router 7.
- Bootstrap 5 + Bootstrap Icons (importados en `src/main.jsx`). CSS propio solo en `src/index.css`.
- Formulario de contacto: `fetch` a FormSubmit (`formsubmit.co/ajax/hola@dianaadventure.cl`) en `src/pages/Contacto.jsx`. No hay API propia.

## Comandos
- `npm run dev` — servidor local.
- `npm run build` — `vite build` y luego `postbuild` → `scripts/prerender.js`.
- `npm run lint` — ESLint. Es el único check del proyecto (no hay tests); córrelo antes de commitear.

## Estructura
- `src/router/AppRouter.jsx` — rutas: `/`, `/nuestras-actividades`, `/tour/:categoria/:id`, `/nosotros`, `/contacto`, `/terminos`. El resto redirige a `/`.
- `src/pages/` — una página por ruta. `src/components/` — `Header`, `Footer`, `TourCard`.
- `src/context/LanguageContext.jsx` — idioma `ES`/`EN` (persistido en `localStorage`), expone `{ language, toggleLanguage, t }`.
- `src/data/translations.js` — todos los textos de UI, por idioma (`translations.ES`, `translations.EN`).
- `src/data/tours_es.json` / `tours_en.json` — catálogo de tours, agrupado por categoría (`grupales`, `valdivia`).
- `public/images/` — imágenes propias; se referencian como `/images/...`.

## Reglas al editar
- **Bilingüe siempre:** todo texto visible va en `translations.js` (ES y EN) o en ambos JSON de tours. Nunca hardcodees texto en un componente.
- **Tours:** `tours_es.json` y `tours_en.json` deben tener las mismas categorías y los mismos `id`. El `id` forma la URL (`/tour/<categoria>/<id>`), así que cambiarlo rompe enlaces compartidos y el sitemap.
- **Categoría `grupales`:** está marcada como "Próximamente" (`TourCard`) y deshabilitada en el formulario de contacto. No la reactives sin que lo pidan.
- **SEO / prerender:** `scripts/prerender.js` genera por ruta un `index.html` con `<head>` propio (title, OG, canonical, JSON-LD), además de `sitemap.xml`. Lee `tours_es.json` y `translations.ES`.
  Si agregas una ruta en `AppRouter.jsx`, agrégala también al arreglo `pages` de ese script.
- **Vercel:** `vercel.json` tiene `cleanUrls` y un rewrite SPA a `/`. `public/_redirects` existe por compatibilidad con Netlify.
- `dist/` y `graphify-out/` están en `.gitignore`; no los edites a mano.

## graphify
Hay un grafo de conocimiento en `graphify-out/` (no versionado).
- Para preguntas sobre el código, primero `graphify query "<pregunta>"`; `graphify path "<A>" "<B>"` para relaciones, `graphify explain "<concepto>"` para conceptos.
- `graphify-out/GRAPH_REPORT.md` solo para revisiones de arquitectura amplias.
- Después de modificar código, ejecuta `graphify update .` (solo AST, sin costo de API).
