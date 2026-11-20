# MVP Scope — Landing Lex Aurea v1.0

> **Referencias:** ADR-001, ADR-002, ADR-003, ADR-004, ADR-005
> **Última actualización:** 2026-11-19

## Filosofía del MVP

El MVP debe ser **una landing publicable, rápida y creíble**, no un portal legal. Incluye solo las secciones necesarias para que un visitante entienda el servicio, confíe en el despacho y decida contactar. Todo lo que implique backend, persistencia o captación real queda fuera.

La landing se entrega con contenido de ejemplo plausible. **No se inventan credenciales, casos ganados, años de experiencia ni reseñas verificadas.** Los textos que dependan de datos reales del cliente se marcan como pendientes de validación en la entrega.

---

## Requerimientos transversales

| ID | Requerimiento | Criterio verificable |
|----|---------------|----------------------|
| TR-01 | Una sola página principal en `/` | `dist/index.html` existe y contiene todas las secciones en orden |
| TR-02 | Páginas legales `/aviso-legal` y `/privacidad` | Ambas responden 200 y tienen contenido real, no placeholder vacío |
| TR-03 | Página `/404` personalizada | Ruta inexistente muestra la 404 del sitio |
| TR-04 | Responsive de 320 px a 1440 px | Sin scroll horizontal; capturas en 320, 768, 1024 y 1440 |
| TR-05 | HTML semántico | `header`, `nav`, `main`, `section`, `footer`; un solo `h1` |
| TR-06 | Accesibilidad WCAG 2.2 AA | Contraste, foco visible, navegación por teclado, labels |
| TR-07 | Sin JS de framework | `dist/_astro/*.js` < 20 KB gzip o inexistente |
| TR-08 | Sin peticiones a terceros | Network sin dominios externos en carga inicial |
| TR-09 | Marca centralizada | Cambiar `site.name` actualiza header, footer, metadatos y JSON-LD |
| TR-10 | TypeScript strict | `astro check` sin errores |
| TR-11 | Build reproducible | `npm ci && npm run build` termina sin errores |
| TR-12 | SEO base | `title`, `description`, canonical, OG y sitemap presentes |
| TR-13 | Sin datos personales | El formulario no envía ni almacena información |

---

## 1. Header y navegación

**Contenido requerido:**

- Wordmark "Lex Aurea" (placeholder) a la izquierda.
- Enlaces ancla: Servicios, Equipo, Proceso, FAQ, Contacto.
- CTA "Agendar consulta" que lleva a `#contacto`.
- En móvil: menú colapsable operable por teclado.

**Criterios de aceptación:**

- [ ] AC-NAV-01: El header es visible en todas las secciones y no tapa el título al navegar por anclas (`scroll-margin-top`).
- [ ] AC-NAV-02: Todos los enlaces tienen texto descriptivo y destino existente.
- [ ] AC-NAV-03: El menú móvil abre y cierra sin JS de framework (o con JS < 1 KB) y anuncia `aria-expanded`.
- [ ] AC-NAV-04: El foco es visible en cada enlace y en el botón del menú.
- [ ] AC-NAV-05: El CTA conduce a `#contacto` y el formulario es visible sin cubrirse por el header.

---

## 2. Hero

**Contenido requerido:**

- Etiqueta superior breve (ej. "Despacho de abogados · Lima").
- `h1` con propuesta de valor concreta (no "Bienvenidos a nuestro sitio").
- Párrafo de apoyo de 1–2 frases.
- CTA primario "Agendar consulta" → `#contacto`.
- CTA secundario "Conocer servicios" → `#servicios`.
- Imagen o composición visual sobria (despacho o retrato), con `alt` adecuado.

**Criterios de aceptación:**

- [ ] AC-HERO-01: El `h1` menciona la categoría ("abogados" o "asesoría legal") y el beneficio principal.
- [ ] AC-HERO-02: El texto del hero cabe sin scroll en un viewport móvil de 667 px de alto (sin contar header).
- [ ] AC-HERO-03: La imagen del hero tiene `width`, `height`, `fetchpriority="high"` y no genera CLS.
- [ ] AC-HERO-04: Ambos CTA tienen contraste ≥ 4.5:1 y área táctil ≥ 44 px.
- [ ] AC-HERO-05: El LCP del hero es < 1.8 s en Lighthouse móvil.

---

## 3. Servicios / áreas de práctica

**Contenido requerido:**

- Entre 4 y 6 áreas: al menos Derecho Corporativo, Derecho Civil, Derecho Laboral y Litigios.
- Cada tarjeta: nombre, descripción de 1–2 frases, icono lineal opcional.
- Sin precios ni promesas de resultado.

**Criterios de aceptación:**

- [ ] AC-SERV-01: Existen 4–6 tarjetas, cada una con `h3` y descripción no vacía.
- [ ] AC-SERV-02: La grilla es 1 columna en móvil, 2 en tablet y 3 en desktop.
- [ ] AC-SERV-03: Los textos son comprensibles para un no abogado; no hay jerga sin explicar.
- [ ] AC-SERV-04: Las tarjetas no dependen del hover para ser legibles.

---

## 4. Equipo

**Contenido requerido:**

- 3–4 perfiles con nombre, cargo, especialidad y retrato.
- Nota visible o interna de que los perfiles son de ejemplo si el cliente no los ha validado.

**Criterios de aceptación:**

- [ ] AC-TEAM-01: Cada perfil muestra nombre, cargo y especialidad.
- [ ] AC-TEAM-02: Los retratos tienen dimensiones explícitas, formato moderno y `alt` con el nombre.
- [ ] AC-TEAM-03: No se atribuyen títulos, colegiaturas ni experiencia inventada sin autorización.
- [ ] AC-TEAM-04: La sección se adapta a 1/2/4 columnas sin imágenes deformadas.

---

## 5. Proceso

**Contenido requerido:**

- 3–4 pasos del acompañamiento: consulta inicial, diagnóstico, estrategia, seguimiento.
- Numeración visible y descripción breve por paso.

**Criterios de aceptación:**

- [ ] AC-PROC-01: La secuencia es lineal y legible en móvil (vertical) y desktop (horizontal).
- [ ] AC-PROC-02: Cada paso tiene título y descripción; no hay pasos vacíos.
- [ ] AC-PROC-03: La numeración es semántica (lista ordenada) o está decorada con `aria-hidden`.

---

## 6. Testimonios

**Contenido requerido:**

- 3 testimonios de ejemplo con cita, nombre y contexto (ej. "Directora de operaciones").
- Aviso de que son ilustrativos hasta que el cliente autorice su publicación.

**Criterios de aceptación:**

- [ ] AC-TEST-01: Cada testimonio incluye cita y atribución.
- [ ] AC-TEST-02: Se identifica en la entrega que son textos de ejemplo; no se presentan como reseñas verificadas.
- [ ] AC-TEST-03: No se usa `aggregateRating` en JSON-LD.
- [ ] AC-TEST-04: El layout no usa carrusel automático; todos los testimonios son legibles sin interacción.

---

## 7. FAQ

**Contenido requerido:**

- 5–6 preguntas frecuentes: primera consulta, honorarios, confidencialidad, tiempos, modalidad (presencial/virtual), conflicto de interés.
- Respuestas de 2–4 frases.

**Criterios de aceptación:**

- [ ] AC-FAQ-01: Cada pregunta usa `<details><summary>` nativo y funciona sin JS.
- [ ] AC-FAQ-02: El primer ítem puede estar abierto por defecto; el resto cerrados.
- [ ] AC-FAQ-03: Las respuestas no prometen resultados ni plazos exactos.
- [ ] AC-FAQ-04: La sección es navegable por teclado y el foco es visible.

---

## 8. Formulario de contacto (maqueta)

**Contenido requerido:**

- Campos: nombre, correo, teléfono (opcional), área de interés (select), mensaje.
- Labels visibles; `autocomplete` en nombre, correo y teléfono.
- Botón "Enviar solicitud" y aviso visible de maqueta.

**Criterios de aceptación:**

- [ ] AC-FORM-01: El formulario no tiene `action` externo y no ejecuta `fetch`.
- [ ] AC-FORM-02: Al intentar enviar, no se produce ninguna petición de red y se muestra el aviso de maqueta.
- [ ] AC-FORM-03: El aviso dice explícitamente que no se envían datos y es visible sin interactuar.
- [ ] AC-FORM-04: Todos los campos tienen `label` asociado; el select tiene opción por defecto no seleccionable.
- [ ] AC-FORM-05: Los campos obligatorios se indican de forma textual, no solo con color.
- [ ] AC-FORM-06: El formulario es usable con teclado y en móvil sin zoom.
- [ ] AC-FORM-07: No se escribe en `localStorage`, cookies ni analítica.

---

## 9. Contacto

**Contenido requerido:**

- Dirección física, ciudad y país.
- Teléfono, correo y WhatsApp como enlaces (`tel:`, `mailto:`, `https://wa.me/`).
- Horario de atención.
- Mapa estático o enlace a mapas; **no** iframe de Google Maps en la carga inicial.

**Criterios de aceptación:**

- [ ] AC-CONT-01: Los enlaces `tel:` y `mailto:` usan los datos de `site.ts`.
- [ ] AC-CONT-02: La dirección es texto seleccionable, no una imagen.
- [ ] AC-CONT-03: No se carga un iframe de mapas ni scripts de terceros.
- [ ] AC-CONT-04: El horario indica zona horaria o ciudad.

---

## 10. Footer

**Contenido requerido:**

- Wordmark y frase breve.
- Enlaces a secciones y páginas legales.
- Datos de contacto resumidos.
- Año dinámico (`new Date().getFullYear()`).
- Crédito discreto opcional.

**Criterios de aceptación:**

- [ ] AC-FOOT-01: Incluye enlaces a `/aviso-legal` y `/privacidad`.
- [ ] AC-FOOT-02: El año se calcula en build, no está hardcodeado.
- [ ] AC-FOOT-03: Los enlaces tienen foco visible y contraste AA.
- [ ] AC-FOOT-04: No hay enlaces rotos ni `href="#"` sin destino.

---

## 11. Páginas legales

**Contenido requerido:**

- `/aviso-legal`: titular, domicilio, contacto, condiciones de uso, propiedad intelectual, limitación de responsabilidad.
- `/privacidad`: responsable, datos tratados (solo contacto directo), finalidad, base legal, conservación, derechos, contacto.
- Fecha de última actualización visible.

**Criterios de aceptación:**

- [ ] AC-LEGAL-01: Ambas páginas usan el layout base y son legibles sin JS.
- [ ] AC-LEGAL-02: La política de privacidad es coherente con un formulario que no envía datos: no afirma que se reciben datos del formulario.
- [ ] AC-LEGAL-03: Se indica que el texto es una plantilla y requiere revisión legal antes de publicar.
- [ ] AC-LEGAL-04: Las páginas están enlazadas desde el footer.

---

## 12. Metadatos y rendimiento

- [ ] AC-SEO-01: `title` y `description` únicos por página.
- [ ] AC-SEO-02: Canonical absoluto en todas las páginas.
- [ ] AC-SEO-03: OG image 1200×630 existe y se referencia con URL absoluta.
- [ ] AC-SEO-04: `sitemap-index.xml` incluye `/`, `/aviso-legal`, `/privacidad`.
- [ ] AC-SEO-05: JSON-LD `LegalService` sin reseñas ni datos inventados.
- [ ] AC-PERF-01: JS de página < 20 KB gzip.
- [ ] AC-PERF-02: CSS < 40 KB gzip.
- [ ] AC-PERF-03: LCP < 1.8 s, CLS < 0.05, INP < 200 ms en móvil lab.
- [ ] AC-PERF-04: Lighthouse Performance/Accessibility/Best Practices ≥ 95 y SEO 100.

---

## Fuera del MVP (explícito)

| Elemento | Estado | Nota |
|----------|--------|------|
| Backend / API | Excluido | ADR-002 |
| Base de datos | Excluido | No hay persistencia |
| Autenticación / área privada | Excluido | — |
| CMS / panel admin | Excluido | Contenido en Git |
| Envío real del formulario | Excluido | Maqueta; requiere ADR nuevo |
| Email transaccional / CRM | Excluido | — |
| Pagos / reservas | Excluido | — |
| Blog / recursos | Excluido | — |
| i18n | Excluido | Solo español |
| Analítica / cookies de marketing | Excluido | — |
| Deploy ejecutado | Excluido de esta fase | Lo ejecuta el programador |
| Framework de islas | Excluido | Requiere ADR |
| Mapa embebido | Excluido | Enlace externo |

---

## Definition of Done

Una entrega se considera completa cuando:

1. `npm ci && npm run build` termina sin errores.
2. `npx astro check` no reporta errores de TypeScript.
3. Todas las secciones del MVP existen y cumplen sus AC.
4. El formulario no ejecuta peticiones de red.
5. Lighthouse móvil cumple los umbrales de rendimiento y accesibilidad.
6. No hay contenido de relleno tipo lorem ipsum en secciones visibles.
7. La marca se puede reemplazar desde `src/data/site.ts` sin tocar componentes.
8. `.docs/changelog/2026.md` registra los cambios documentales de la entrega.
