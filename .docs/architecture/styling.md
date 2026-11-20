# Estrategia de estilos y sistema de diseño

> **Referencias:** ADR-003 (estrategia de estilos), ADR-005 (identidad visual)
> **Última actualización:** 2026-11-19

Este documento define cómo se escriben los estilos, qué tokens existen y qué reglas visuales son vinculantes. Cualquier desviación requiere un ADR nuevo.

## Base técnica

- **Tailwind CSS 4.3.x** integrado con **`@tailwindcss/vite` 4.3.x** desde `astro.config.mjs`.
- **CSS-first.** La configuración vive en `src/styles/global.css` con `@import "tailwindcss"` y `@theme`.
- **No existe `tailwind.config.js` ni `postcss.config.js`.** No se instala Autoprefixer: Tailwind 4 lo gestiona.
- El escaneo de clases es automático. Si se requiere excluir o incluir una ruta, se usa `@source` en el CSS, nunca un array `content`.
- `global.css` se importa una sola vez, en `src/layouts/BaseLayout.astro`.

### Configuración esperada en Astro

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://lexaurea.example",
  output: "static",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Archivo global

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* tokens — ver tabla siguiente */
}

@layer base {
  /* reset mínimo, tipografía base, foco visible */
}
```

## Paleta

La identidad es editorial y sobria: marfil, tinta azul-noche y latón. El dorado se usa como acento, **nunca** como color de texto de cuerpo.

| Token | Valor | Uso | Contraste sobre marfil |
|-------|-------|-----|------------------------|
| `--color-ink` | `#0F1B2D` | Texto principal, superficies oscuras | 15.8:1 |
| `--color-graphite` | `#2A3442` | Texto secundario, bordes fuertes | 11.4:1 |
| `--color-muted` | `#5C6674` | Texto auxiliar, metadatos | 5.6:1 |
| `--color-ivory` | `#F7F4EE` | Fondo principal | — |
| `--color-sand` | `#EFE9DE` | Superficies alternas, tarjetas | — |
| `--color-brass` | `#B08D57` | Acento, iconos, detalles, bordes | 3.2:1 (solo decorativo) |
| `--color-brass-deep` | `#8C6B3C` | Texto de acento accesible | 4.7:1 |
| `--color-line` | `#DED6C8` | Bordes y separadores | — |
| `--color-white` | `#FFFFFF` | Superficies sobre fondos oscuros | — |

Reglas:

- En fondos oscuros (`ink`), el texto es `ivory`; los enlaces y acentos usan `#D8B87C` (brass claro) para superar 4.5:1.
- El dorado `--color-brass` no se usa para párrafos ni etiquetas pequeñas sobre marfil.
- No se introducen colores fuera de esta paleta sin ADR. Los estados semánticos (`success`, `error`) se definen como tokens si el formulario los necesita.

## Tipografía

| Rol | Familia | Pesos | Uso |
|-----|---------|-------|-----|
| Display | **Cormorant Garamond** | 600, 700 | H1–H2, cifras destacadas |
| Cuerpo | **Inter** | 400, 500, 600 | Párrafos, navegación, botones, UI |

- Fuentes **self-hosted** en `public/fonts/` en formato `woff2`, subset latin. Sin Google Fonts en runtime para evitar conexiones de terceros y CLS.
- `font-display: swap` en todos los `@font-face`.
- Se cargan como máximo **3 archivos** de fuente. Inter puede usarse como fuente variable.
- Tamaños base (mobile → desktop):

| Token | Móvil | Desktop | Interlineado | Uso |
|-------|-------|---------|-------------|-----|
| `--text-display-xl` | 2.75rem | 4.5rem | 0.95 | H1 del hero |
| `--text-display-lg` | 2.25rem | 3.25rem | 1.0 | H2 de sección |
| `--text-display-md` | 1.75rem | 2.25rem | 1.1 | H3 destacado |
| `--text-body-lg` | 1.125rem | 1.25rem | 1.65 | Entradilla |
| `--text-body` | 1rem | 1.0625rem | 1.7 | Párrafo |
| `--text-sm` | 0.875rem | 0.875rem | 1.5 | Metadatos, etiquetas |
| `--text-xs` | 0.75rem | 0.75rem | 1.4 | Legal, notas |

- Los títulos usan `text-wrap: balance`; los párrafos, `text-wrap: pretty`.
- Longitud de línea objetivo: 60–72 caracteres (`max-width: 68ch` en prosa).
- No se usa tracking negativo agresivo; en display se permite `letter-spacing: -0.01em`.

## Tokens en `@theme`

```css
@theme {
  --color-ink: #0f1b2d;
  --color-graphite: #2a3442;
  --color-muted: #5c6674;
  --color-ivory: #f7f4ee;
  --color-sand: #efe9de;
  --color-brass: #b08d57;
  --color-brass-deep: #8c6b3c;
  --color-line: #ded6c8;

  --font-display: "Cormorant Garamond", ui-serif, Georgia, serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  --text-display-xl: clamp(2.75rem, 6vw, 4.5rem);
  --text-display-lg: clamp(2.25rem, 4vw, 3.25rem);
  --text-display-md: clamp(1.75rem, 3vw, 2.25rem);
  --text-body-lg: clamp(1.125rem, 1.5vw, 1.25rem);

  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;

  --shadow-card: 0 1px 2px rgb(15 27 45 / 0.06), 0 12px 32px -16px rgb(15 27 45 / 0.18);
  --shadow-lift: 0 2px 4px rgb(15 27 45 / 0.08), 0 24px 48px -24px rgb(15 27 45 / 0.28);

  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
}
```

- Los nombres generan utilidades (`bg-ink`, `text-brass-deep`, `font-display`).
- Los valores deben existir **solo** aquí. No se duplican hex en componentes.
- Si un valor no encaja en la escala, se usa un arbitrary value puntual (`max-w-[68ch]`) y se documenta en el PR; no se crea un token nuevo sin necesidad repetida.

## Espaciado, layout y ritmo

- Contenedor: `max-width: 72rem` (1152 px), padding lateral `1.25rem` móvil / `2rem` tablet / `2.5rem` desktop.
- Secciones: `padding-block` de `4rem` móvil y `6.5rem` desktop. El hero puede usar `min-height: 88svh` sin forzar scroll.
- Escala de espaciado basada en Tailwind (`4`, `6`, `8`, `12`, `16`, `24`). No se usan valores sueltos fuera de la escala salvo layout.
- Grid de servicios: 1 columna móvil, 2 tablet, 3 desktop. Grid de equipo: 1 / 2 / 4.
- Separadores: línea de `1px` `--color-line`; nunca sombras duras para dividir secciones.
- Fondos alternos: `ivory` → `sand` → `ivory` para crear ritmo sin bordes.

## Componentes visuales

### Botones

| Variante | Fondo | Texto | Borde | Uso |
|----------|-------|-------|-------|-----|
| Primario | `ink` | `ivory` | `ink` | CTA principal |
| Secundario | transparente | `ink` | `line` | CTA alternativo |
| Acento | `brass` | `ink` | `brass` | Solo sobre fondo oscuro |
| Enlace | — | `brass-deep` | — | Navegación textual |

- Altura mínima 44 px; padding horizontal `1.25rem`–`1.5rem`.
- Radio `--radius-sm` (2 px): la identidad es editorial, no redondeada.
- Transición de `background-color`, `color` y `border-color` de 150 ms.
- Foco: `outline: 2px solid var(--color-brass-deep); outline-offset: 2px;` siempre visible.

### Tarjetas

- Fondo `white` o `sand`, borde `1px --color-line`, radio `--radius-lg`.
- Sin sombra por defecto; `--shadow-card` solo al hover en tarjetas interactivas.
- Padding `1.5rem` móvil / `2rem` desktop.

### Formulario

- Labels visibles y asociados con `for`/`id`. Prohibido placeholder como única etiqueta.
- Inputs con altura mínima 44 px, borde `line`, fondo `white`, radio `--radius-sm`.
- Estado de foco con borde `brass-deep` y `outline` visible.
- Mensaje de maqueta visible junto al botón: el formulario no envía datos.
- El botón de envío es `type="button"` si no hay acción; si se usa `type="submit"`, el formulario debe impedir el envío y mostrar el aviso de maqueta.

### Aviso de maqueta

Componente visual sobrio, no un banner amarillo de advertencia:

```
Borde izquierdo brass · fondo sand · texto sm
"Formulario de demostración. En esta versión no se envían datos."
```

## Movimiento

- Animaciones discretas: fade/translate de 8–16 px, duración 200–400 ms, `--ease-out-soft`.
- Respetar `prefers-reduced-motion: reduce` desactivando transforms y animaciones no esenciales.
- Prohibido: parallax, autoplay de carruseles, animaciones infinitas y scroll-jacking.
- El contenido debe ser visible sin JS y sin animaciones.

## Reglas de escritura CSS

1. Priorizar utilidades en el markup. `@apply` solo para patrones repetidos 3+ veces o estados complejos.
2. Estilos de componente dentro de `<style>` del `.astro` cuando sean específicos; nunca estilos globales nuevos sin justificación.
3. Prohibido `!important`.
4. Prohibidos selectores por ID y anidamiento profundo (> 2 niveles).
5. Variables CSS para valores que cambian por contexto (ej. landing oscura), no para cada medida.
6. Cero CSS muerto: si una clase no se usa en el mes, se elimina.

## Accesibilidad visual

- Contraste mínimo 4.5:1 para texto normal y 3:1 para texto grande (≥ 24 px o ≥ 18.66 px bold).
- Nunca comunicar información solo por color.
- Foco visible en todos los elementos interactivos, incluidos enlaces del footer.
- Áreas táctiles ≥ 44×44 px.
- El menú móvil debe ser operable por teclado y anunciar su estado (`aria-expanded`).

## Checklist de estilo para el Executor

- [ ] `@import "tailwindcss"` y `@theme` en `src/styles/global.css`.
- [ ] Sin `tailwind.config.*` ni `postcss.config.*`.
- [ ] Fuentes self-hosted con `font-display: swap`.
- [ ] Ningún hex fuera de `global.css`.
- [ ] Foco visible en todos los interactivos.
- [ ] `prefers-reduced-motion` respetado.
- [ ] Sin scroll horizontal a 320 px.
