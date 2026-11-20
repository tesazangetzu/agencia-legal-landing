# ADR-002: Landing estática sin backend y formulario de contacto como maqueta

**Estado:** ACEPTADO
**Fecha:** 2026-11-19

**Contexto:**
El despacho necesita una presencia digital creíble y rápida de publicar. El alcance confirmado por el programador excluye backend, base de datos, autenticación, CMS, pagos, blog e i18n. El formulario de contacto debe existir visualmente para completar la propuesta de la landing y validar el diseño con el cliente, pero **no debe enviar ni almacenar datos** en esta fase.

La decisión afecta a la arquitectura completa: si el formulario enviara datos, habría que resolver validación en servidor, antispam, almacenamiento, notificaciones y protección de datos personales. Nada de eso está en el MVP.

## Decisión

Construir una **landing 100 % estática** y tratar el formulario como **maqueta de interfaz no funcional**.

Reglas vinculantes:

1. El formulario muestra los campos definitivos: nombre, correo, teléfono (opcional), área de interés (select) y mensaje.
2. No tiene `action` hacia un servicio externo ni realiza `fetch`/`XMLHttpRequest`.
3. El botón se implementa como `type="button"` o, si se usa `type="submit"`, el `submit` se cancela y se muestra un mensaje local.
4. Un aviso visible junto al formulario indica: *"Formulario de demostración. En esta versión no se envían datos."*
5. No se recogen datos en `localStorage`, cookies ni analítica.
6. Los enlaces de contacto alternativos (teléfono, correo, WhatsApp) sí son reales y utilizables.
7. El sitio completo se genera en build time; no existe `src/pages/api/`, middleware ni funciones de Vercel.
8. No se crean `.docs/api/` ni `.docs/database/` porque no hay contratos ni persistencia que documentar.

El formulario debe mantener la semántica y accesibilidad de un formulario real (labels, `autocomplete`, estados de foco, mensajes de error visuales si se implementan) para que sustituirlo por uno funcional en el futuro no requiera rehacer la UI.

## Consecuencias

### Positivas

- Superficie de ataque y obligaciones de privacidad mínimas: no se procesan datos personales.
- Sin costos de backend, base de datos ni servicios de correo.
- Publicación inmediata en cualquier CDN estática.
- El diseño y la experiencia del formulario se validan antes de invertir en integración.
- El equipo evita mantener validación, antispam y notificaciones que el negocio aún no ha definido.

### Negativas

- **La landing no capta leads reales.** Es un escaparate, no un canal de conversión automatizado.
- El cliente podría asumir que el formulario funciona si el aviso no es suficientemente claro; el aviso debe ser visible, no un texto oculto.
- Añadir captación real exigirá un ADR nuevo, elegir un proveedor (endpoint serverless, Formspree, CRM), definir tratamiento de datos y actualizar la política de privacidad.
- Los enlaces `mailto:` y `tel:` dependen de la configuración del dispositivo del visitante.

## Alternativas consideradas

| Alternativa | Razón para descartar |
|-------------|---------------------|
| **Formspree / Getform / similar** | Introduce un tercero, una cuenta y una política de datos que el cliente aún no aprobó. |
| **Función serverless en Vercel + email** | Requiere secretos, antispam, validación y monitoreo; excede el MVP y contradice "sin backend". |
| **Backend NestJS/Express** | Complejidad desproporcionada para una landing y coste operativo innecesario. |
| **CMS headless para contenido** | El contenido cambia poco y se versiona en Git; un CMS añade dependencia y latencia. |
| **Formulario eliminado por completo** | El cliente quiere validar la sección de contacto y el flujo visual; eliminar el formulario reduce el valor del entregable. |

## Impacto en .docs

- `PROJECT.md`: alcance y sección "Fuera de alcance".
- `requirements/mvp-scope.md`: criterios de aceptación del formulario maqueta.
- `architecture/deployment.md`: ausencia de variables y funciones.
- `architecture/seo-and-performance.md`: no hay terceros ni peticiones de red del formulario.
