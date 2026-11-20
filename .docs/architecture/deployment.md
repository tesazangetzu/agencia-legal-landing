# Despliegue en Vercel

> **Referencia:** ADR-004 (decisión de despliegue)
> **Última actualización:** 2026-11-19

Esta guía documenta cómo se publica la landing en Vercel. **El despliegue no se ejecuta en la fase de scaffolding**; la configuración descrita la implementa el Executor y la ejecuta el programador.

## Modelo

```
GitHub (rama main)  →  Vercel Build (Astro, output estático)  →  CDN de Vercel
                                                              →  Dominio del despacho
```

- Un único proyecto de Vercel conectado a este repositorio.
- No hay backend, funciones serverless, base de datos ni variables secretas.
- El artefacto es `dist/`, servido desde la CDN.
- Cada pull request genera un **Preview Deployment**; `main` genera **Production**.

## Configuración del proyecto en Vercel

| Ajuste | Valor |
|--------|-------|
| Framework Preset | Astro (auto-detectado) |
| Root Directory | `./` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js Version | `22.x` |
| Production Branch | `main` |

- El lockfile (`package-lock.json`) debe estar commiteado. Sin él, `npm ci` falla y el build es irreproducible.
- No se define `vercel.json` con `builds` ni `functions`. La detección de Astro es suficiente.
- Si Vercel detecta una versión de Node distinta, se fija con `engines.node` en `package.json` (`>=22 <23`) o con la configuración del proyecto.

## Variables de entorno

**Ninguna es obligatoria para el MVP.**

| Variable | Entorno | Uso |
|----------|---------|-----|
| — | — | — |

- La URL canónica se define en `astro.config.mjs` (`site`) y en `src/data/site.ts`; no dependen de variables de Vercel.
- No se usa `PUBLIC_*` en el MVP. Si en el futuro se añade captación real, las claves sensibles irán en Vercel como *Environment Variables* y **nunca** en el repositorio.
- Cambiar una variable de entorno requiere **rebuild**, no solo redeploy.

## Flujo de publicación

1. El programador hace push a una rama.
2. Vercel construye un Preview con URL única (`*.vercel.app`).
3. Se valida el preview: contenido, enlaces, formulario maqueta, Lighthouse.
4. Merge a `main`.
5. Vercel construye y publica en producción.
6. Se verifica la URL de producción y el dominio.

### Rollback

- Vercel conserva todos los deployments. Para revertir: **Deployments → seleccionar deployment estable → Promote to Production**.
- No se reescribe la historia de `main` para revertir un deploy.

## Dominio

1. Añadir el dominio en **Project → Settings → Domains**.
2. Configurar en el registrador:
   - `A` para el apex → IP indicada por Vercel, o `ALIAS`/`ANAME` si el registrador lo soporta.
   - `CNAME` para `www` → `cname.vercel-dns.com`.
3. Vercel emite y renueva el certificado TLS automáticamente.
4. Redirigir `www` al apex (o viceversa) con una regla de dominio en Vercel.
5. Actualizar `site` en `astro.config.mjs` y `url` en `site.ts` al dominio definitivo **antes** del primer deploy de producción, para que canonical, sitemap y Open Graph sean correctos.

## Cabeceras y caché

Vercel aplica caché de CDN por defecto a los assets con hash. Se recomienda un `vercel.json` mínimo, sin funciones:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/_astro/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

- `cleanUrls` elimina la extensión `.html` de las rutas legales.
- No se añade CSP estricta en el MVP porque requiere inventariar estilos inline de Astro; si se añade, debe probarse en preview.
- Las páginas HTML no se cachean agresivamente: Vercel revalida en cada deploy.

## Verificación post-deploy

| Comprobación | Resultado esperado |
|--------------|--------------------|
| `/` responde 200 | HTML con hero y formulario maqueta |
| `/aviso-legal`, `/privacidad` | 200 |
| Ruta inexistente | 404 personalizada |
| `/sitemap-index.xml` | Incluye las tres rutas públicas |
| `/robots.txt` | Apunta al sitemap absoluto |
| Canonical y OG | Dominio de producción, no `localhost` |
| Formulario | No genera peticiones de red |
| Lighthouse móvil | Cumple presupuesto de `seo-and-performance.md` |
| Preview | `X-Robots-Tag: noindex` presente |

## Troubleshooting

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| Build falla `npm ci` | Lockfile ausente o desincronizado | Commitear `package-lock.json`; no usar `npm install` en CI |
| Build falla por Node | Versión distinta a la local | Fijar `engines.node` y Node 22.x en Vercel |
| CSS sin estilos | Falta `@tailwindcss/vite` o el `@import` | Revisar `astro.config.mjs` y `global.css` |
| Sitemap con `localhost` | `site` sin configurar | Definir `site` en `astro.config.mjs` |
| OG image rota | Ruta relativa o archivo ausente | Usar URL absoluta; verificar `public/og-image.png` |
| Preview indexado | Indexación accidental | Mantener `noindex` de Vercel en previews |
| 404 en rutas legales | `cleanUrls`/archivos mal nombrados | Verificar `src/pages/*.astro` y la configuración |

## Lo que este despliegue no hace

- No ejecuta migraciones ni seeds.
- No aprovisiona base de datos, Redis ni servicios externos.
- No configura envío de correos.
- No incluye monitoreo de aplicaciones (APM) ni Sentry.

Cualquiera de esas piezas requiere un ADR nuevo y una actualización de `PROJECT.md`.
