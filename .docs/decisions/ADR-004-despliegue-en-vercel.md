# ADR-004: Despliegue estático en Vercel

**Estado:** ACEPTADO
**Fecha:** 2026-11-19

**Contexto:**
La landing es un sitio estático generado por Astro y no tiene backend ni variables secretas. Se necesita un hosting con CDN global, HTTPS automático, previews por pull request y rollback sencillo. El programador ya utiliza Vercel en otros proyectos, lo que reduce el costo de operación y la curva de aprendizaje.

La decisión de despliegue no se ejecuta en esta fase: solo se documenta para que el Executor prepare la configuración y el programador publique cuando el cliente lo apruebe.

## Decisión

Desplegar el proyecto como **sitio estático en Vercel**, conectado al repositorio de GitHub:

| Ajuste | Valor |
|--------|-------|
| Framework Preset | Astro |
| Root Directory | `./` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js | 22.x |
| Production Branch | `main` |
| Variables de entorno | Ninguna obligatoria |

Reglas:

1. El build es puramente estático; no se añaden funciones serverless ni adaptadores de Astro.
2. Cada PR genera un Preview Deployment con `noindex`.
3. `main` se publica en producción.
4. El dominio se configura en Vercel y se actualiza `site` en `astro.config.mjs` antes del primer deploy de producción.
5. El lockfile se commitea y el build usa `npm ci`.
6. Se permite un `vercel.json` mínimo para `cleanUrls`, caché de `/_astro/*` y cabeceras de seguridad; no para funciones, rewrites de API ni builds personalizados.

## Consecuencias

### Positivas

- CDN global con TLS automático y latencia baja para el mercado objetivo.
- Previews por PR que permiten revisar contenido y diseño antes de publicar.
- Rollback inmediato a cualquier deployment anterior.
- Cero coste de servidores y cero mantenimiento de infraestructura.
- Sin variables de entorno, el riesgo de filtrar secretos es nulo en el MVP.
- Flujo de publicación simple: push a `main`.

### Negativas

- Dependencia de un proveedor propietario para el hosting y los previews.
- El plan gratuito tiene límites de ancho de banda y builds; un pico de tráfico podría requerir plan pago.
- Vercel sirve previews con `noindex`, pero un dominio de preview compartido no debe usarse como sitio público.
- Sin funciones, no hay forma de captar leads en Vercel; hacerlo requeriría cambiar esta decisión o añadir un servicio externo.
- La configuración de dominio y DNS queda fuera del repositorio y no es reproducible por código.

## Alternativas consideradas

| Alternativa | Razón para descartar |
|-------------|---------------------|
| **Netlify** | Capacidad equivalente; se descarta por familiaridad del equipo con Vercel y por continuidad con otros proyectos. |
| **Cloudflare Pages** | Excelente CDN, pero el flujo de previews y la configuración de dominio son menos conocidos para el programador. |
| **GitHub Pages** | Requiere más configuración manual (workflow, dominio, HTTPS) y no ofrece previews por PR tan directos. |
| **Servidor propio / VPS** | Coste operativo, parches y TLS manual; desproporcionado para una landing estática. |
| **Render Static Site** | Válido, pero se prefiere Vercel para mantener un solo proveedor de frontend en los proyectos del programador. |

## Impacto en .docs

- `architecture/deployment.md`: configuración, flujo, dominio, cabeceras y troubleshooting.
- `architecture/seo-and-performance.md`: caché, sitemap y canonical en producción.
- `PROJECT.md`: alcance de despliegue y stack.
