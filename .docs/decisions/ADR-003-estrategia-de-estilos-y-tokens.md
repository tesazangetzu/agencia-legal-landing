# ADR-003: Estrategia de estilos y tokens con Tailwind CSS 4 CSS-first

**Estado:** ACEPTADO
**Fecha:** 2026-11-19

**Contexto:**
La landing necesita una identidad visual coherente, fácil de ajustar cuando el cliente defina su marca definitiva, y sin sobrecarga de CSS. El equipo viene de proyectos con Tailwind, pero Tailwind 4 cambió el modelo de configuración: los tokens se declaran en CSS con `@theme`, el escaneo de clases es automático y la integración recomendada con Astro es el plugin de Vite.

Se debe decidir dónde viven los tokens, cómo se evita la duplicación de valores y qué grado de CSS personalizado se permite.

## Decisión

Adoptar **Tailwind CSS 4.3.x en modo CSS-first** con `@tailwindcss/vite`, y centralizar el sistema de diseño en `src/styles/global.css`:

1. `@import "tailwindcss";` como única entrada.
2. Todos los tokens de color, tipografía, radios, sombras y easing se declaran en `@theme`.
3. **No se crea `tailwind.config.js` ni `postcss.config.js`.**
4. Los componentes usan utilidades en el markup; `@apply` se reserva para patrones repetidos 3+ veces o estados complejos.
5. Los valores hexadecimales solo existen en `global.css`. Los componentes consumen tokens (`bg-ink`, `text-brass-deep`, `font-display`).
6. Las fuentes se self-hostean en `public/fonts/` con `@font-face` y `font-display: swap`.
7. Se permite CSS específico dentro de `<style>` de un componente `.astro` cuando sea local; no se añaden hojas globales nuevas.
8. Prohibidos `!important`, selectores por ID y anidamiento CSS profundo.

Los tokens aprobados están en `architecture/styling.md` e incluyen la paleta marfil/tinta/latón y la pareja tipográfica Cormorant Garamond + Inter.

## Consecuencias

### Positivas

- Una sola fuente de verdad visual: cambiar la marca es editar `@theme` y `site.ts`.
- Menos archivos de configuración y menos dependencias (sin Autoprefixer, sin `content` array).
- El CSS generado contiene solo las utilidades usadas; el presupuesto de 40 KB es alcanzable.
- Los tokens se publican como variables CSS, lo que permite ajustes puntuales sin duplicar valores.
- El diseño se mantiene consistente entre secciones y evita decisiones ad hoc.

### Negativas

- Tailwind 4 es más nuevo; parte de la documentación y ejemplos de la comunidad siguen asumiendo v3 y confunden al equipo.
- El equipo debe aprender `@theme`, `@utility` y `@source` en lugar de `theme.extend`.
- La disciplina de tokens depende de revisión: es fácil introducir un hex suelto o un arbitrary value injustificado.
- Sin `tailwind.config.js`, las integraciones de terceros que esperan configuración JS requieren adaptación (no aplica en el MVP).

## Alternativas consideradas

| Alternativa | Razón para descartar |
|-------------|---------------------|
| **Tailwind 3 con `tailwind.config.js`** | Pierde las mejoras de v4 y mantiene configuración JS y `content` que ya no son necesarios. |
| **CSS Modules por componente** | Más control, pero sin escala de utilidades compartida; el ritmo visual se vuelve inconsistente. |
| **CSS puro con variables y BEM** | Válido, pero aumenta el CSS artesanal y el tiempo de implementación; el equipo ya domina Tailwind. |
| **Librería de componentes (shadcn, DaisyUI, etc.)** | Añade componentes y estilos que no se necesitan; la identidad editorial requiere control fino. |
| **Tailwind + `@apply` extensivo** | Oculta las utilidades y reproduce el problema del CSS tradicional; se limita a casos repetidos. |

## Impacto en .docs

- `architecture/styling.md`: tokens, tipografía, componentes y reglas de escritura.
- `architecture/structure.md`: ubicación de `global.css` y de las fuentes.
- `architecture/seo-and-performance.md`: presupuesto de CSS y fuentes.
- `decisions/ADR-005-identidad-visual.md`: valores concretos de la identidad.
