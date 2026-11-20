# AGENTS.md — agencia-legal-landing

## Fuente de verdad

La documentación técnica de este proyecto vive en `.docs/`. Es la **fuente de verdad vinculante** para todos los agentes:

- `.docs/PROJECT.md` — contexto, alcance, stack y marca.
- `.docs/architecture/` — estructura, estilos, SEO/rendimiento y despliegue.
- `.docs/decisions/` — ADRs aceptados. Ningún agente puede contradecir un ADR vigente.
- `.docs/requirements/mvp-scope.md` — secciones y criterios de aceptación del MVP.
- `.docs/changelog/` — historial cronológico de cambios documentales.

Si `.docs/` contradice la memoria del agente, la experiencia previa o las preferencias del modelo, **gana `.docs/`**.

Reglas de propiedad:

- El **Architect** es el único agente autorizado a modificar `.docs/`.
- El **Planner** planifica sin escribir código; el **Executor** implementa `src/` y configuración; el **Auditor** verifica sin corregir; el **Orchestrator** coordina.
- Ningún cambio en `src/` que contradiga `.docs/` puede aprobarse sin un ADR nuevo o una actualización documental del Architect.

## Stack del proyecto

| Capa | Tecnología | Versión objetivo |
|------|-----------|------------------|
| Framework | Astro (salida estática) | 7.4.x (última estable al scaffolding: 7.4.12) |
| Estilos | Tailwind CSS vía `@tailwindcss/vite` | 4.3.x (última estable al scaffolding: 4.3.5) |
| Lenguaje | TypeScript strict | 5.x |
| Runtime de build | Node.js LTS | 22.x |
| Deploy | Vercel (estático) | — |

Sin framework de islas (React/Vue/Svelte) salvo necesidad justificada con ADR. Prioridad a HTML semántico, CSS y JS mínimo.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
