# ADR-001: Stack Astro + Tailwind CSS para una landing estática

**Estado:** ACEPTADO
**Fecha:** 2026-11-19

**Contexto:**
El proyecto es una landing de una sola página para un despacho de abogados. El contenido es mayoritariamente estático, el tráfico esperado es de móvil y el objetivo principal es captar contactos. No hay requisitos de backend, autenticación, datos dinámicos ni personalización por usuario. Se necesita un stack que produzca HTML rápido, permita componentes reutilizables y mantenga el costo de mantenimiento bajo para un equipo pequeño.

Se evaluaron frameworks con islas y generadores puramente estáticos. El criterio de decisión fue: mínimo JavaScript enviado, buena ergonomía de componentes, SEO técnico sencillo y despliegue estático sin adaptadores.

## Decisión

Usar **Astro 7.4.x** con salida estática (`output: 'static'`) y **Tailwind CSS 4.3.x** integrado mediante **`@tailwindcss/vite` 4.3.x**, con **TypeScript 5.x en modo `strict`**.

Versiones objetivo al momento del scaffolding (2026-11-19):

| Paquete | Versión | Notas |
|---------|---------|-------|
| `astro` | `~7.4.12` | Última estable verificada |
| `tailwindcss` | `~4.3.5` | Configuración CSS-first |
| `@tailwindcss/vite` | `~4.3.5` | Plugin Vite oficial |
| `typescript` | `^5.x` | `strict: true` |
| `@astrojs/sitemap` | última compatible con Astro 7 | Sitemap automático |

Reglas derivadas:

- No se instala ningún framework de islas (React, Vue, Svelte, Solid) en el MVP.
- No se instala un adaptador de servidor. El build genera `dist/` estático.
- No se usa `@astrojs/tailwind` ni la integración antigua: Tailwind 4 se integra por Vite.
- El contenido repetible vive en `src/data/*.ts` tipado, no en Markdown ni en un CMS.

## Consecuencias

### Positivas

- Cero JavaScript de framework en el cliente; el presupuesto de JS se reserva para mejoras puntuales.
- Componentes `.astro` con HTML semántico y estilos Tailwind sin hidratación.
- SEO técnico directo: cada página es HTML completo en el build.
- Build rápido y despliegue estático sin funciones ni cold starts.
- Curva de mantenimiento baja: no hay estado global ni ciclo de vida de UI.
- Tailwind 4 elimina la configuración JS y reduce dependencias (sin Autoprefixer).

### Negativas

- Si en el futuro se requiere una interfaz muy interactiva (cotizador, portal de clientes), Astro no es la opción natural y habría que añadir islas o replantear el frontend.
- El equipo debe conocer la sintaxis de plantillas `.astro` y las convenciones de `src/pages`.
- Tailwind 4 es más reciente; algunos ejemplos y plugins del ecosistema todavía asumen v3 y `tailwind.config.js`.
- Dependencia del lockfile para builds reproducibles; actualizar Astro mayor requiere revisar breaking changes.

## Alternativas consideradas

| Alternativa | Razón para descartar |
|-------------|---------------------|
| **Next.js 16 + React** | Envía más JS del necesario para una landing; App Router y RSC añaden complejidad sin beneficio para una página estática. |
| **HTML + CSS + JS a mano** | Válido, pero sin componentes ni tipado de datos; el mantenimiento de secciones repetidas se degrada rápido. |
| **Eleventy / Hugo** | Excelentes generadores, pero la ergonomía de componentes y el ecosistema de imágenes de Astro son mejores para este caso. |
| **Astro + React islands** | Se descarta por ahora: no hay interacción que lo justifique. Se permite añadir islas solo con un ADR nuevo. |
| **Vite + React SPA** | Peor SEO inicial y más JS; incompatible con el objetivo de landing estática. |

## Impacto en .docs

- `PROJECT.md`: tabla de stack y reglas de versión.
- `architecture/structure.md`: árbol y convenciones de `src/`.
- `architecture/styling.md`: integración de Tailwind.
- `architecture/seo-and-performance.md`: presupuesto derivado del stack.
- `architecture/deployment.md`: build estático en Vercel.
