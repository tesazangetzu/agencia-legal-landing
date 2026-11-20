# PROJECT CONTEXT

## Nombre del proyecto

`agencia-legal-landing` — landing estática para un despacho de abogados.

**Marca de trabajo:** **Lex Aurea** *(placeholder profesional, no es el nombre definitivo del cliente)*.

> La marca es un placeholder deliberado. Todos los textos, metadatos, imágenes y datos de contacto derivan de un único punto de configuración: `src/data/site.ts`. Reemplazar la marca en producción es una edición de ese archivo (más los assets en `public/`), no una búsqueda global en el código.

---

# Visión

Lex Aurea es la presencia digital de un despacho de abogados que necesita transmitir **autoridad, criterio y cercanía** en menos de diez segundos de visita.

El producto no es un portal de gestión legal ni un SaaS. Es una **landing estática de una sola página** cuyo objetivo es que un potencial cliente entienda qué hace el despacho, confíe en él y decida iniciar contacto. La landing debe cargar rápido, leerse sin fricción desde el móvil y sostener una identidad visual sobria y premium.

El proyecto prioriza la claridad del mensaje y la calidad de ejecución frontend por encima de la cantidad de funcionalidades.

---

# Objetivos de negocio del despacho

La landing debe permitir al despacho:

- Explicar sus áreas de práctica en lenguaje comprensible para personas y empresas.
- Presentar al equipo y respaldar su credibilidad profesional.
- Describir cómo trabaja (proceso de consulta y acompañamiento).
- Reducir la incertidumbre del primer contacto mediante preguntas frecuentes.
- Captar solicitudes de consulta mediante un formulario visible y directo.
- Ofrecer canales de contacto alternativos (teléfono, correo, WhatsApp, oficina).
- Servir como destino confiable para campañas, tarjetas y perfiles profesionales.

Objetivos medibles del MVP:

| Objetivo | Métrica | Meta |
|----------|---------|------|
| Claridad del mensaje | Usuario identifica el servicio principal sin hacer scroll en exceso | Propuesta de valor en el hero |
| Captación | Envíos del formulario maqueta / clics en contacto | Instrumentación manual futura |
| Rendimiento | Lighthouse móvil (Performance) | ≥ 95 |
| Accesibilidad | Lighthouse (Accessibility) | ≥ 95 |
| SEO técnico | Lighthouse (SEO) | 100 |
| Estabilidad visual | CLS | < 0.05 |

---

# Filosofía de producto

El landing debe priorizar:

- **Mensaje antes que decoración.** Cada sección responde una pregunta del visitante.
- **Autoridad sin distancia.** Tono profesional, claro, humano; sin jerga innecesaria.
- **Rendimiento como parte del diseño.** Fuentes, imágenes y JS se presupuestan, no se improvisan.
- **Accesibilidad por defecto.** Contraste, foco visible, navegación por teclado y HTML semántico.
- **Móvil primero.** La mayoría del tráfico de una landing legal llega desde búsqueda y redes en móvil.
- **Simplicidad mantenible.** Una sola página, datos tipados y componentes pequeños.

Evitar: carruseles automáticos, animaciones que bloqueen la lectura, librerías de UI pesadas, texto genérico de relleno y efectos visuales que compitan con el contenido.

---

# Alcance del MVP

Una landing pública de una sola ruta principal (`/`), en español, con estas secciones en este orden:

1. **Hero** — propuesta de valor, subtítulo, CTA principal y secundario.
2. **Servicios / áreas de práctica** — tarjetas con nombre y descripción breve.
3. **Equipo** — perfiles con nombre, cargo y especialidad.
4. **Proceso** — pasos del acompañamiento legal.
5. **Testimonios** — prueba social (textos de ejemplo identificados como tales).
6. **FAQ** — preguntas frecuentes con respuestas desplegables.
7. **Formulario de contacto (maqueta)** — campos visibles, sin envío real.
8. **Contacto** — dirección, teléfono, correo, horario y WhatsApp.
9. **Footer** — navegación secundaria, aviso legal y privacidad.

Páginas legales mínimas:

- `/aviso-legal`
- `/privacidad`
- `/404`

El detalle funcional y los criterios de aceptación están en `requirements/mvp-scope.md`.

---

# Fuera de alcance (explícito)

El MVP **no incluye**:

- **Backend** de ningún tipo.
- **Base de datos** ni persistencia de datos.
- **Autenticación**, cuentas de usuario o área privada.
- **CMS** o panel de administración.
- **Envío real de formularios** ni integración con email/CRM.
- **Pagos** o reservas de consultas.
- **Blog** o publicación de artículos.
- **Internacionalización** (i18n). El producto es monolingüe en español.
- **Deploy ejecutado** en Vercel como parte de este scaffolding. La configuración se documenta; la ejecución corresponde al programador.
- Analítica, cookies de marketing o píxeles de terceros.
- Frameworks de islas (React, Vue, Svelte, Solid) salvo ADR que lo justifique.

> **¿Por qué no existen `.docs/api/` ni `.docs/database/`?**
> Porque el producto no tiene servidor propio, ni endpoints, ni esquema de datos. El formulario es una maqueta de interfaz: no transmite ni almacena información. Crear documentación de API o base de datos para un sitio estático introduce fuentes de verdad ficticias y contradice el alcance. Si en el futuro se añade captación real, se documentará primero un ADR y después se crearán las carpetas correspondientes.

---

# Stack tecnológico

## Objetivo

| Tecnología | Versión objetivo | Propósito |
|-----------|------------------|-----------|
| Astro | 7.4.x (`7.4.12` al scaffolding) | Framework de sitio estático |
| Tailwind CSS | 4.3.x (`4.3.5` al scaffolding) | Utilidades de estilo |
| `@tailwindcss/vite` | 4.3.x | Integración Tailwind ↔ Vite/Astro |
| TypeScript | 5.x, `strict: true` | Tipado de datos y componentes |
| Node.js | 22 LTS | Runtime de build local/CI |
| Vercel | — | Hosting estático futuro |
| `@astrojs/sitemap` | última compatible | Generación de `sitemap-index.xml` |

## Reglas de versión

- Las versiones se fijan en `package.json` con rangos `~` o `^` según el ADR-001; el lockfile es la referencia reproducible.
- Astro se configura con `output: 'static'` (comportamiento por defecto). No se añaden adaptadores de servidor.
- Tailwind se integra exclusivamente mediante el plugin Vite oficial. No se usa `postcss.config.*` ni `tailwind.config.js` como fuente de tokens.
- No se añaden dependencias sin justificar su peso y su función en un ADR o en el plan del Planner.

## Identidad visual (resumen)

La identidad por defecto es **editorial jurídica premium**: fondo marfil, tinta azul-noche, acento latón/dorado, tipografía serif de display y sans de lectura. Los tokens y reglas están en `architecture/styling.md` y la decisión en `decisions/ADR-005-identidad-visual.md`.

| Token | Valor base | Uso |
|-------|-----------|-----|
| `--color-ink` | `#0F1B2D` | Texto principal, fondos oscuros |
| `--color-ivory` | `#F7F4EE` | Fondo principal |
| `--color-brass` | `#B08D57` | Acento, detalles, CTA secundario |
| `--color-graphite` | `#2A3442` | Texto secundario |
| `--font-display` | Cormorant Garamond | Títulos |
| `--font-sans` | Inter | Cuerpo y UI |

---

# Principios de arquitectura frontend

- **Una página, secciones componentes.** `src/pages/index.astro` compone secciones; cada sección es un `.astro` independiente.
- **Contenido separado de presentación.** Los textos repetibles viven en `src/data/*.ts` tipados; los componentes no hardcodean listas largas.
- **Componentes de UI sin estado global.** Sin stores, sin contexto compartido, sin hidratación.
- **Cero islas por defecto.** La interactividad se resuelve con HTML nativo (`<details>`, anclas, formularios) y, si hace falta, menos de 2 KB de JS inline.
- **CSS-first.** Los tokens se declaran con `@theme` en `src/styles/global.css`; no hay configuración JS de Tailwind.
- **Assets locales.** Imágenes en `public/images/`, fuentes self-hosted en `public/fonts/` cuando sea posible.

La estructura objetivo completa está en `architecture/structure.md`.

---

# Rendimiento, SEO y despliegue

- Presupuesto de rendimiento, metadatos, Open Graph y sitemap: `architecture/seo-and-performance.md`.
- Procedimiento y configuración de Vercel: `architecture/deployment.md`.
- Decisión de hosting: `decisions/ADR-004-despliegue-en-vercel.md`.

Resumen de metas:

| Métrica | Presupuesto |
|---------|-------------|
| JS de página (gzip) | < 20 KB |
| CSS crítico (gzip) | < 40 KB |
| LCP (móvil, lab) | < 1.8 s |
| CLS | < 0.05 |
| Peso total inicial | < 800 KB |
| Lighthouse Performance / Accessibility / SEO | ≥ 95 / ≥ 95 / 100 |

---

# Criterios de calidad

| Criterio | Objetivo |
|----------|----------|
| HTML válido y semántico | Sin errores en validador |
| Accesibilidad | WCAG 2.2 AA en contraste, foco y formularios |
| Responsive | Correcto de 320 px a 1440 px |
| TypeScript | `astro check` sin errores |
| Build | `npm run build` reproducible y sin warnings bloqueantes |
| Contenido | Sin lorem ipsum en secciones visibles; placeholders identificados |
| Marca | Reemplazable desde `src/data/site.ts` |

---

# Visión a largo plazo

El proyecto debe poder evolucionar sin reescribirse a:

- Captación real de leads (endpoint serverless o servicio externo) mediante un ADR nuevo.
- Blog o recursos legales con Content Collections de Astro.
- Multi-página (áreas de práctica con detalle propio).
- i18n español/inglés.
- Analítica respetuosa con la privacidad.

Cada evolución deberá justificarse con un ADR y actualizar este documento antes de implementarse. El MVP se mantiene deliberadamente pequeño: una landing rápida, clara y creíble.
