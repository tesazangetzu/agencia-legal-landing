# Estructura del proyecto

> **Referencias:** ADR-001 (stack), ADR-002 (landing estática), ADR-003 (estilos)
> **Última actualización:** 2026-11-19

Este documento define el árbol de carpetas **objetivo** del proyecto y la responsabilidad de cada directorio. En la fase de scaffolding documental solo existen `.docs/`, `.opencode/`, `AGENTS.md` y `.gitignore`; `src/` y la configuración de Astro los crea el Executor siguiendo este documento.

## Árbol objetivo

```
agencia-legal-landing/
├── .docs/                          # Documentación vinculante (propiedad del Architect)
│   ├── PROJECT.md
│   ├── architecture/
│   │   ├── structure.md
│   │   ├── styling.md
│   │   ├── seo-and-performance.md
│   │   └── deployment.md
│   ├── decisions/
│   │   ├── ADR-001-stack-astro-y-tailwind.md
│   │   ├── ADR-002-landing-estatico-y-formulario-maqueta.md
│   │   ├── ADR-003-estrategia-de-estilos-y-tokens.md
│   │   ├── ADR-004-despliegue-en-vercel.md
│   │   └── ADR-005-identidad-visual.md
│   ├── requirements/
│   │   └── mvp-scope.md
│   └── changelog/
│       └── 2026.md
├── .opencode/                      # Agentes, plugin de graphify y config de opencode
│   ├── agents/
│   │   ├── Architect-agent.md
│   │   ├── Auditor-agent.md
│   │   ├── Executor-agent.md
│   │   ├── Orchestrator-agent.md
│   │   └── Planner-agent.md
│   ├── plugins/
│   │   └── graphify.js
│   ├── opencode.json
│   └── .gitignore
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── og-image.png                # 1200×630, generada/exportada del diseño
│   ├── robots.txt                  # Allow / + referencia al sitemap
│   ├── fonts/                      # Fuentes self-hosted (woff2)
│   │   ├── cormorant-garamond-latin-600.woff2
│   │   ├── cormorant-garamond-latin-700.woff2
│   │   └── inter-latin-variable.woff2
│   └── images/
│       ├── hero-despacho.webp
│       └── equipo-01.webp … equipo-04.webp
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── SkipLink.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── Services.astro
│   │   │   ├── Team.astro
│   │   │   ├── Process.astro
│   │   │   ├── Testimonials.astro
│   │   │   ├── Faq.astro
│   │   │   ├── ContactForm.astro
│   │   │   └── Contact.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── SectionHeading.astro
│   │       ├── Container.astro
│   │       ├── Card.astro
│   │       ├── Badge.astro
│   │       └── Icon.astro
│   ├── data/
│   │   ├── site.ts                 # Marca, contacto, navegación, SEO base
│   │   ├── services.ts
│   │   ├── team.ts
│   │   ├── process.ts
│   │   ├── testimonials.ts
│   │   └── faq.ts
│   ├── layouts/
│   │   └── BaseLayout.astro        # html/head/body, metadatos, header/footer
│   ├── lib/
│   │   ├── seo.ts                  # Construcción de metadatos y JSON-LD
│   │   └── cn.ts                   # Utilidad de clases (opcional, sin dependencias)
│   ├── pages/
│   │   ├── index.astro
│   │   ├── aviso-legal.astro
│   │   ├── privacidad.astro
│   │   └── 404.astro
│   ├── styles/
│   │   └── global.css              # @import "tailwindcss" + @theme + base
│   └── env.d.ts
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── package-lock.json
├── .env.example                    # Solo variables públicas de build (URL del sitio)
├── AGENTS.md
└── .gitignore
```

## Responsabilidad de cada directorio

| Ruta | Responsabilidad | Reglas |
|------|-----------------|--------|
| `.docs/` | Fuente de verdad técnica. | Solo el Architect escribe. Todo cambio se registra en `changelog/`. |
| `.opencode/` | Infraestructura de agentes. | Copia verbatim desde trimflow; no se edita salvo decisión explícita. |
| `public/` | Assets servidos tal cual, sin procesamiento. | Nombres en kebab-case; imágenes en WebP/AVIF; nada de JS. |
| `public/fonts/` | Fuentes woff2 para `@font-face`. | Solo pesos usados; `font-display: swap`; subset latin. |
| `src/components/layout/` | Piezas persistentes de la página: header, footer, skip link. | Sin lógica de negocio; reciben datos por props. |
| `src/components/sections/` | Una sección de la landing por archivo. | Composición de UI + datos importados de `src/data/`. |
| `src/components/ui/` | Primitivas visuales reutilizables. | Sin contenido de negocio; props tipadas y variantes acotadas. |
| `src/data/` | Contenido tipado y configuración editable. | Única fuente de textos de sección y datos de marca. Sin JSX/HTML. |
| `src/layouts/` | Shell HTML y `<head>`. | Importa `global.css` una sola vez; inyecta SEO. |
| `src/lib/` | Utilidades puras (SEO, clases). | Sin efectos secundarios al importar. |
| `src/pages/` | Rutas del sitio. | Enrutamiento por archivos de Astro. `index.astro` compone secciones. |
| `src/styles/` | Tokens y estilos globales. | CSS-first; prohibido `tailwind.config.js`. |

## Lo que NO debe existir en el MVP

- `src/pages/api/` ni endpoints serverless propios.
- `src/content/` (Content Collections) mientras no haya blog o recursos.
- `src/stores/`, `src/context/` o estado global.
- `src/middleware.ts`.
- `vercel.json` con funciones o rewrites de servidor.
- Adaptadores de Astro (`@astrojs/vercel`, Node, etc.). La salida es estática.
- Frameworks de islas y sus integraciones.
- `postcss.config.*` ni `tailwind.config.*`.

Si una necesidad futura requiere cualquiera de estos elementos, primero se crea un ADR y se actualiza este documento.

## Convenciones de nombrado

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Componentes Astro | PascalCase | `SectionHeading.astro` |
| Archivos de datos y utilidades | camelCase | `site.ts`, `seo.ts` |
| Rutas | kebab-case | `/aviso-legal` |
| Tokens CSS | kebab-case con prefijo semántico | `--color-ink`, `--text-display-lg` |
| Clases utilitarias personalizadas | Solo si no existe utilidad Tailwind | `.prose-legal` (excepcional) |
| Imágenes | kebab-case descriptivo | `hero-despacho.webp` |

## Alias de importación

`tsconfig.json` define `@/*` → `src/*`. Todas las importaciones internas usan el alias:

```ts
import { site } from "@/data/site";
import BaseLayout from "@/layouts/BaseLayout.astro";
```

No se usan rutas relativas con `../../` fuera del propio directorio del componente.

## Modelo de composición

```
index.astro
└── BaseLayout.astro
    ├── Header.astro
    ├── <main>
    │   ├── Hero.astro
    │   ├── Services.astro
    │   ├── Team.astro
    │   ├── Process.astro
    │   ├── Testimonials.astro
    │   ├── Faq.astro
    │   ├── ContactForm.astro
    │   └── Contact.astro
    └── Footer.astro
```

- `index.astro` solo importa secciones y las ordena. No contiene markup de sección.
- `BaseLayout.astro` recibe `title`, `description`, `ogImage` y `canonical` por props con valores por defecto desde `site.ts`.
- Cada sección importa sus datos directamente de `src/data/`. No se pasa contenido por props entre secciones.
- Los componentes de `ui/` no importan `src/data/`.

## Datos tipados

`src/data/site.ts` es el **único punto de reemplazo de marca**:

```ts
export const site = {
  name: "Lex Aurea",
  legalName: "Lex Aurea Abogados",
  tagline: "Asesoría legal con criterio y cercanía",
  description: "…",
  url: "https://lexaurea.example",
  email: "contacto@lexaurea.example",
  phone: "+51 999 999 999",
  whatsapp: "+51 999 999 999",
  address: { street: "…", city: "…", country: "Perú" },
  social: { linkedin: "…", instagram: "…" },
} as const;
```

El resto de archivos de `src/data/` exporta arrays tipados (`Service[]`, `TeamMember[]`, `ProcessStep[]`, `Testimonial[]`, `FaqItem[]`). Los tipos viven junto al array que los usa; si se comparten, en `src/data/types.ts`.

## Reglas de renderizado

- Todo el sitio se genera en build time. No hay fetching en cliente.
- Las secciones son server-rendered por Astro; no requieren directivas `client:*`.
- La interactividad permitida es HTML nativo: enlaces ancla, `<details>/<summary>` para FAQ y `<dialog>` si se justifica. Cualquier JS adicional debe caber en el presupuesto de `seo-and-performance.md`.
- Las imágenes usan `<Image>` de Astro cuando se importen desde `src/assets/`; si viven en `public/`, se sirven con `width`/`height` explícitos y `loading="lazy"` salvo el hero.
