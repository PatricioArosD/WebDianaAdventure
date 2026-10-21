# Graph Report - Ecoturismo  (2026-10-21)

## Corpus Check
- 21 files · ~1,944,044 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 79 nodes · 146 edges · 12 communities (9 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c66a4c06`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- Configuración del proyecto
- Dependencias de desarrollo
- LanguageContext.jsx
- AppRouter.jsx
- Dependencias de ejecución
- Scripts de NPM
- react-router-dom
- Home.jsx
- Configuración de Vercel
- React + Vite
- LanguageContext

## God Nodes (most connected - your core abstractions)
1. `react` - 12 edges
2. `react-router-dom` - 10 edges
3. `LanguageContext` - 9 edges
4. `AppRouter()` - 9 edges
5. `scripts` - 5 edges
6. `App()` - 5 edges
7. `Actividades()` - 4 edges
8. `Footer()` - 3 edges
9. `Header()` - 3 edges
10. `TourCard()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `AppRouter()`  [EXTRACTED]
  src/App.jsx → src/router/AppRouter.jsx
- `AppRouter()` --calls--> `Actividades()`  [EXTRACTED]
  src/router/AppRouter.jsx → src/pages/Actividades.jsx
- `AppRouter()` --calls--> `Contacto()`  [EXTRACTED]
  src/router/AppRouter.jsx → src/pages/Contacto.jsx
- `AppRouter()` --calls--> `Home()`  [EXTRACTED]
  src/router/AppRouter.jsx → src/pages/Home.jsx
- `App()` --calls--> `Footer()`  [EXTRACTED]
  src/App.jsx → src/components/Footer.jsx

## Import Cycles
- None detected.

## Communities (12 total, 3 thin omitted)

### Community 0 - "react"
Cohesion: 0.70
Nodes (3): react, TourCard(), Actividades()

### Community 1 - "Configuración del proyecto"
Cohesion: 0.17
Nodes (13): name, private, type, version, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+5 more)

### Community 2 - "Dependencias de desarrollo"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/react, @types/react-dom (+2 more)

### Community 3 - "LanguageContext.jsx"
Cohesion: 0.28
Nodes (5): bootstrap, bootstrap-icons, react-dom, LanguageProvider(), translations

### Community 4 - "AppRouter.jsx"
Cohesion: 0.52
Nodes (4): Nosotros(), Terminos(), TourDetail(), AppRouter()

### Community 5 - "Dependencias de ejecución"
Cohesion: 0.33
Nodes (6): dependencies, bootstrap, bootstrap-icons, react, react-dom, react-router-dom

### Community 6 - "Scripts de NPM"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, preview

### Community 7 - "react-router-dom"
Cohesion: 0.57
Nodes (4): react-router-dom, App(), Footer(), Header()

### Community 10 - "React + Vite"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + Vite

## Knowledge Gaps
- **27 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+22 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 30 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `Configuración del proyecto`, `LanguageContext.jsx`, `AppRouter.jsx`, `react-router-dom`, `Home.jsx`, `LanguageContext`?**
  _High betweenness centrality (0.209) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _27 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `devDependencies` connect `Dependencias de desarrollo` to `Configuración del proyecto`?**
  _High betweenness centrality (0.201) - this node is a cross-community bridge._
- **Why does `react-router-dom` connect `react-router-dom` to `react`, `Configuración del proyecto`, `AppRouter.jsx`, `Home.jsx`, `LanguageContext`?**
  _High betweenness centrality (0.175) - this node is a cross-community bridge._