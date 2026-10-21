# Graph Report - Ecoturismo  (2026-10-21)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 79 nodes · 147 edges · 10 communities (7 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 31,820 input · 140 output

## Graph Freshness
- Built from commit: `c66a4c06`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Tours y traducciones
- Configuración del proyecto
- Dependencias de desarrollo
- Arranque de la app
- Rutas y páginas
- Dependencias de ejecución
- Scripts de NPM
- Configuración de Vercel

## God Nodes (most connected - your core abstractions)
1. `react` - 12 edges
2. `LanguageContext` - 10 edges
3. `react-router-dom` - 10 edges
4. `AppRouter()` - 9 edges
5. `App()` - 5 edges
6. `scripts` - 5 edges
7. `Actividades()` - 4 edges
8. `TourCard()` - 3 edges
9. `Footer()` - 3 edges
10. `Header()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Actividades()` --calls--> `TourCard()`  [EXTRACTED]
  src/pages/Actividades.jsx → src/components/TourCard.jsx
- `App()` --calls--> `AppRouter()`  [EXTRACTED]
  src/App.jsx → src/router/AppRouter.jsx
- `App()` --calls--> `Footer()`  [EXTRACTED]
  src/App.jsx → src/components/Footer.jsx
- `App()` --calls--> `Header()`  [EXTRACTED]
  src/App.jsx → src/components/Header.jsx
- `AppRouter()` --calls--> `Actividades()`  [EXTRACTED]
  src/router/AppRouter.jsx → src/pages/Actividades.jsx

## Import Cycles
- None detected.

## Communities (10 total, 3 thin omitted)

### Community 0 - "Tours y traducciones"
Cohesion: 0.33
Nodes (5): react, react-router-dom, TourCard(), LanguageContext, translations

### Community 1 - "Configuración del proyecto"
Cohesion: 0.17
Nodes (13): name, private, type, version, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+5 more)

### Community 2 - "Dependencias de desarrollo"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/react, @types/react-dom (+2 more)

### Community 3 - "Arranque de la app"
Cohesion: 0.27
Nodes (7): bootstrap, bootstrap-icons, react-dom, App(), Footer(), Header(), LanguageProvider()

### Community 4 - "Rutas y páginas"
Cohesion: 0.42
Nodes (7): Actividades(), Contacto(), Home(), Nosotros(), Terminos(), TourDetail(), AppRouter()

### Community 5 - "Dependencias de ejecución"
Cohesion: 0.33
Nodes (6): dependencies, bootstrap, bootstrap-icons, react, react-dom, react-router-dom

### Community 6 - "Scripts de NPM"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, preview

## Knowledge Gaps
- **25 isolated node(s):** `name`, `private`, `type`, `version`, `@types/react` (+20 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 31 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Tours y traducciones` to `Configuración del proyecto`, `Arranque de la app`, `Rutas y páginas`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `devDependencies` connect `Dependencias de desarrollo` to `Configuración del proyecto`?**
  _High betweenness centrality (0.201) - this node is a cross-community bridge._
- **Why does `react-router-dom` connect `Tours y traducciones` to `Configuración del proyecto`, `Arranque de la app`, `Rutas y páginas`?**
  _High betweenness centrality (0.175) - this node is a cross-community bridge._