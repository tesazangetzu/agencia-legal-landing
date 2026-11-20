# SEO y rendimiento

> **Referencias:** ADR-001 (stack estático), ADR-004 (Vercel)
> **Última actualización:** 2026-11-19

Una landing legal compite por confianza y por posiciones locales. La estrategia es SEO técnico impecable, contenido claro y un rendimiento que no dependa de JavaScript.

## Principios

1. **Todo el contenido es HTML en el build.** Sin renderizado en cliente.
2. **Metadatos centralizados.** `BaseLayout.astro` recibe `title`, `description`, `canonical` y `ogImage`; los valores base salen de `src/data/site.ts` y `src/lib/seo.ts`.
3. **Sin terceros en el camino crítico.** Sin Google Fonts, sin analítica, sin píxeles, sin embeds.
4. **Imágenes con dimensiones explícitas.** Cero CLS por imágenes.

## Metadatos por página

| Página | `<title>` | `description` |
|--------|-----------|---------------|
| `/` | `Lex Aurea | Abogados en [ciudad] — Asesoría legal` | `Asesoría legal en derecho corporativo, civil y laboral. Conoce al equipo y agenda una consulta con Lex Aurea.` |
| `/aviso-legal` | `Aviso legal | Lex Aurea` | `Información legal sobre el titular del sitio, condiciones de uso y responsabilidad.` |
| `/privacidad` | `Política de privacidad | Lex Aurea` | `Cómo trata Lex Aurea los datos de contacto recibidos a través de este sitio.` |
| `/404` | `Página no encontrada | Lex Aurea` | `La página solicitada no existe o fue movida.` |

Reglas:

- Títulos de 50–60 caracteres; descripciones de 140–160.
- No duplicar `title` ni `description` entre rutas.
- La marca y la ciudad se interpolan desde `site.ts`; no se hardcodean en cada página.
- El `title` del home debe contener la marca y la categoría (`Abogados`), no solo el eslogan.

## `<head>` obligatorio

```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />
<meta name="robots" content="index, follow" />

<meta property="og:type" content="website" />
<meta property="og:locale" content="es_PE" />
<meta property="og:site_name" content={site.name} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:image" content={absoluteOgImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="…" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={absoluteOgImage} />
```

- `canonical` siempre absoluta, construida con `Astro.site`.
- `og:image` en `public/og-image.png` (1200×630, < 300 KB). Debe existir antes del deploy; si falta, el build no falla pero el SEO social queda incompleto.
- `theme-color` = `#0F1B2D`.
- No se incluye `meta keywords`.

## Datos estructurados (JSON-LD)

En el home se emite un bloque `LegalService`:

```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Lex Aurea",
  "url": "https://lexaurea.example",
  "description": "…",
  "telephone": "+51 999 999 999",
  "email": "contacto@lexaurea.example",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "…",
    "addressLocality": "…",
    "addressCountry": "PE"
  },
  "areaServed": "PE",
  "priceRange": "$$",
  "openingHours": "Mo-Fr 09:00-18:00"
}
```

- Se genera desde `site.ts` para no desincronizarse.
- No se declaran reseñas ni `aggregateRating` si los testimonios son de ejemplo. Hacerlo sería marcado engañoso.
- Las páginas legales no necesitan JSON-LD propio.

## Sitemap y robots

- `@astrojs/sitemap` genera `sitemap-index.xml` y `sitemap-0.xml` en el build.
- `site` en `astro.config.mjs` es obligatorio para que el sitemap tenga URLs absolutas.
- `public/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /404

Sitemap: https://lexaurea.example/sitemap-index.xml
```

- Las páginas legales se indexan. `/404` no.
- No se usa `noindex` en producción. Los Preview Deployments deben protegerse de la indexación con `X-Robots-Tag: noindex` o con la protección de deployments de Vercel; verificarlo antes de compartir un preview.

## Rendimiento: presupuesto

| Recurso | Presupuesto (gzip) | Medición |
|---------|--------------------|----------|
| JS propio de página | < 20 KB | `dist/_astro/*.js` |
| CSS total | < 40 KB | `dist/_astro/*.css` |
| HTML del home | < 60 KB | `dist/index.html` |
| Fuentes | ≤ 3 archivos, < 180 KB total | `public/fonts/` |
| Imagen del hero | < 180 KB | WebP/AVIF |
| Peso total de carga inicial | < 800 KB | DevTools Network |
| Requests iniciales | < 20 | DevTools |

| Métrica | Meta (móvil, lab) |
|---------|-------------------|
| LCP | < 1.8 s |
| INP | < 200 ms |
| CLS | < 0.05 |
| TTFB (Vercel estático) | < 200 ms |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | 100 |

El presupuesto se verifica en el build local antes de cada entrega. Si una funcionalidad lo excede, se elimina o se justifica con ADR.

## Reglas de imágenes

- Formato preferido: **AVIF**, fallback **WebP**. Nada de PNG/JPG para fotos.
- El hero usa `<Image>` de Astro con `priority`, `widths` y `sizes`; `loading="eager"` y `fetchpriority="high"`.
- Imágenes bajo el fold: `loading="lazy"` y `decoding="async"`.
- Siempre `width` y `height` (o `aspect-ratio`) para reservar espacio.
- Fotos de equipo: 4:5, máximo 640 px de ancho servido.
- Logos e iconos: SVG inline cuando sean simples; sin fuentes de iconos.
- Texto alternativo descriptivo en imágenes con contenido; vacío (`alt=""`) en decorativas.

## Reglas de fuentes

- `@font-face` con `font-display: swap`.
- `preload` únicamente de la fuente del H1 (Cormorant 600) y de la variable de Inter si se confirma su uso above-the-fold.
- Subset latin; sin pesos no usados.
- Prohibido cargar desde `fonts.googleapis.com` o `fonts.gstatic.com`.

## Reglas de JavaScript

- Cero islas por defecto.
- El menú móvil se resuelve con `<details>` o un checkbox + CSS; si se usa JS, debe ser inline y < 1 KB.
- La FAQ usa `<details>/<summary>` nativos.
- El formulario no envía datos; no requiere JS para mostrarse. Si se añade feedback visual, debe funcionar sin JS y mejorar con él.
- No se instala ninguna librería de animación, carrusel o UI.

## Accesibilidad como SEO

- Un solo `<h1>` por página (el del hero).
- Jerarquía de encabezados sin saltos (`h2` por sección, `h3` por tarjeta).
- Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`.
- Enlaces con texto descriptivo; prohibido "clic aquí".
- `lang="es"` en `<html>`.
- Skip link al inicio del `<body>`.

## Verificación antes de entregar

```bash
npm run build
npx astro check
```

Checklist:

- [ ] `dist/index.html` contiene un solo `h1`, `title` y `description` únicos.
- [ ] `sitemap-index.xml` existe y contiene `/`, `/aviso-legal`, `/privacidad`.
- [ ] `robots.txt` apunta al sitemap absoluto.
- [ ] No hay requests a dominios de terceros.
- [ ] Las imágenes tienen dimensiones y formato moderno.
- [ ] Lighthouse móvil cumple los umbrales.
- [ ] El formulario muestra el aviso de maqueta y no realiza peticiones de red.
