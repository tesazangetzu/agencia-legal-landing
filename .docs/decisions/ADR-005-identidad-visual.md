# ADR-005: Identidad visual editorial jurídica premium

**Estado:** ACEPTADO
**Fecha:** 2026-11-19

**Contexto:**
El despacho no ha entregado un manual de marca definitivo. La landing necesita una dirección visual concreta para no caer en una plantilla genérica, y debe poder reemplazarse por la identidad real del cliente sin reescribir componentes.

La categoría (servicios legales) tiene códigos visuales reconocibles: sobriedad, autoridad, confianza, tradición. El riesgo es caer en un estilo judicial anticuado (mazos, balanzas, mármol, azul marino plano) o en un estilo SaaS frío que no transmita cercanía.

## Decisión

Adoptar una identidad **editorial jurídica premium**:

- **Nombre de trabajo:** Lex Aurea. Placeholder profesional; el nombre real se define en `src/data/site.ts`.
- **Concepto:** despacho contemporáneo, preciso y humano. La autoridad se comunica con tipografía serif, espacio en blanco y detalle en latón, no con iconografía legal literal.
- **Paleta:** marfil cálido como base, tinta azul-noche para texto y superficies oscuras, latón/dorado como acento.
- **Tipografía:** Cormorant Garamond (display) + Inter (cuerpo).
- **Fotografía:** retratos sobrios, luz natural, fondos neutros; arquitectura de oficina sin clichés.
- **Iconografía:** trazos finos, geométricos, monocromos; sin balanzas, mazos ni columnas.
- **Tono de copy:** primera persona plural, frases cortas, verbos concretos; sin latín innecesario ni promesas de resultado.

### Paleta aprobada

| Rol | Hex | Token |
|-----|-----|-------|
| Tinta principal | `#0F1B2D` | `--color-ink` |
| Grafito | `#2A3442` | `--color-graphite` |
| Texto auxiliar | `#5C6674` | `--color-muted` |
| Marfil | `#F7F4EE` | `--color-ivory` |
| Arena | `#EFE9DE` | `--color-sand` |
| Latón | `#B08D57` | `--color-brass` |
| Latón profundo | `#8C6B3C` | `--color-brass-deep` |
| Línea | `#DED6C8` | `--color-line` |

### Tipografía aprobada

| Rol | Familia | Pesos | Licencia |
|-----|---------|-------|----------|
| Display | Cormorant Garamond | 600, 700 | SIL Open Font License |
| Cuerpo | Inter | 400, 500, 600 | SIL Open Font License |

Ambas se self-hostean en `public/fonts/` (woff2). No se usan fuentes de sistema como identidad principal ni Google Fonts en runtime.

### Logo

- Wordmark tipográfico "LEX AUREA" en Cormorant 600, tracking amplio (`0.08em`).
- Monograma "LA" opcional para favicon y avatar social.
- El logo se implementa como SVG inline o archivo en `public/`; no como imagen raster.
- No se inventa un símbolo heráldico. Si el cliente aporta logo, se reemplaza el wordmark sin tocar el layout.

## Consecuencias

### Positivas

- Identidad diferenciada de plantillas legales genéricas y de landings SaaS.
- Paleta pequeña y accesible; fácil de mantener y de adaptar a la marca real.
- La tipografía serif transmite autoridad sin recurrir a clichés visuales.
- El acento latón permite jerarquía y detalle sin introducir un tercer color dominante.
- Los tokens permiten cambiar la marca en un solo archivo.

### Negativas

- Cormorant Garamond tiene menor legibilidad en cuerpos pequeños; se limita a display y títulos.
- El dorado sobre marfil no cumple contraste para texto; requiere `--color-brass-deep` y disciplina de uso.
- La estética editorial exige buen copy y buenas fotos; sin ellas, el diseño se percibe vacío.
- El nombre "Lex Aurea" es un placeholder y no debe presentarse al cliente como marca final.
- Si el cliente impone una identidad corporativa existente, habrá que rehacer tokens y posiblemente la tipografía.

## Alternativas consideradas

| Alternativa | Razón para descartar |
|-------------|---------------------|
| **Azul marino + dorado clásico** | Correcto para la categoría, pero muy previsible y cercano a plantillas de despachos. |
| **Monocromo negro/blanco** | Elegante, pero frío y poco hospitalario para una landing de captación. |
| **Verde botella + crema** | Sugiere más finanzas que derecho; no encaja con la marca. |
| **Estilo SaaS con sans geométrica** | Transmite tecnología, no confianza legal; se aleja del posicionamiento del despacho. |
| **Ilustraciones legales literales** | Balanzas, mazos y columnas refuerzan estereotipos y restan credibilidad contemporánea. |

## Impacto en .docs

- `architecture/styling.md`: tokens, tipografía y reglas de componentes.
- `architecture/structure.md`: ubicación de fuentes, logo e imágenes.
- `architecture/seo-and-performance.md`: pesos de fuentes e imágenes.
- `requirements/mvp-scope.md`: criterios visuales por sección.
