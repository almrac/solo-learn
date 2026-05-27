# Solo Learn

Webapp estática para aprender Java y JavaScript por niveles, con lecciones,
ejemplos, prácticas, retos rápidos, XP, logros y progreso guardado en
`localStorage`.

## Qué incluye

- Ruta separada para Java y JavaScript.
- Plan junio-agosto para llegar con soltura al final del verano.
- Filtros por nivel: cero, base, intermedio y avanzado.
- Vista de lección con teoría, pasos de estudio, ejemplo de código y práctica.
- Laboratorio JavaScript con ejecución en el navegador y salida de `console.log`.
- Ejercicios evaluables de JavaScript con tests automáticos en varias lecciones.
- Preview DOM con HTML de prueba para practicar `DOM` y `formularios`.
- Validación de renderizado de listas y contadores dentro del preview DOM.
- Lección específica y ejercicio evaluable para `map`, `filter` y `reduce`.
- Lección puente para pintar listas desde datos con ejercicio DOM evaluable.
- Lección integradora para pasar de datos filtrados a interfaz renderizada.
- Lección específica para pasar de JSON local ya parseado a interfaz renderizada.
- Lección integradora de flujo async para pasar de `fetch` a renderizado en DOM.
- Lección y ejercicio evaluable para gestionar estados de carga, vacío y error en interfaces con datos asíncronos.
- Problemas guiados de Java con entrada, salida esperada y checklist de resolución.
- Cobertura ampliada de problemas guiados Java para métodos, colecciones, excepciones y testing.
- Cobertura guiada ampliada también para interfaces/herencia y primera arquitectura con Spring.
- Mini proyectos guiados en lecciones avanzadas de Java y JavaScript para empujar hacia entregables reales.
- Mini proyectos guiados ampliados también a varias lecciones intermedias para dar continuidad entre ejercicios y entregables.
- Bloque de replanteamiento avanzado para retomar ejercicios básicos y rehacerlos con mejor diseño en niveles superiores.
- El banco de práctica marca ya qué ejercicios escalan después a una versión más avanzada.
- El banco permite filtrar también por si una práctica escala después o es autocontenida.
- En las prácticas que escalan, el banco indica además si la base previa ya está cubierta o sigue pendiente.
- Desde el banco y desde el bloque de replanteamiento avanzado se puede abrir directamente la lección base previa.
- El plan diario ya puede recomendar cubrir una base previa antes de atacar una práctica evolutiva.
- Cuando la base ya está cubierta, el plan diario puede priorizar la práctica avanzada correspondiente como tarea de `Escalada`.
- La sidebar incluye una guía rápida inicial para entender cómo usar la app al entrar por primera vez.
- Esa guía inicial ya se adapta al estado real: primera vez, progreso inicial o trabajo por progresión/evolución.
- `Siguiente sesión` ya entiende también `Base previa` y `Escalada`, no solo desbloqueos generales.
- La lección activa puede incluir ya casos evolutivos guiados con versión base, versión avanzada y starter de código.
- El primer caso evolutivo ya tiene también una tercera fase: pasar de un empleado individual a colecciones, filtros y resúmenes.
- El banco de práctica muestra ya la fase evolutiva de esos casos: `Base`, `Refactor` o `Colección y resumen`.
- El banco puede filtrarse también por fase evolutiva para entrenar solo una capa de progresión.
- El banco resume también cuántas prácticas tienes por fase evolutiva en la ruta activa.
- Ese resumen por fase es interactivo: al pulsar una fase se aplica el filtro correspondiente.
- El resumen por fase marca también cuál concentra más deuda útil en la ruta activa.
- Cada lección incluye también una capa de apoyo mental: idea clave, lógica, mnemotecnia y error típico.
- La lección activa permite marcar explícitamente si el atasco es de concepto, lógica, error típico o transferencia.
- La app registra también atascos automáticos al fallar retos o tests para tener historial real de bloqueo.
- Ese historial ya distingue también el origen principal del atasco: lección, reto, tests o tests DOM.
- `Siguiente sesión` y `Plan de hoy` ya cambian la intervención según ese origen:
  repaso, tests, preview DOM o rescate de teoría/práctica.
- Los atascos recientes pesan más que los antiguos, así que la recomendación no arrastra para siempre problemas ya superados.
- Cuando cierras teoría, práctica, retos o tests, la presión de ese atasco baja también por resolución real.
- Si una lección mejora pero vuelve a atascarse varias veces, la app la trata como patrón frágil y puede priorizar estabilizarla.
- En esas lecciones frágiles, la app ya sugiere también un cierre concreto: resumen, práctica corta, repetir reto o rehacer preview DOM.
- Ese cierre ya puede lanzarse con acciones rápidas desde la propia lección: notas, reto, ejercicio o preview DOM.
- La app registra también qué acción de cierre intentaste usar por lección.
- Cuando detecta alivios tras esas acciones, empieza a priorizar el cierre que mejor funciona en cada lección.
- El plan diario ya sugiere también el tipo de foco mental de cada tarea: concepto, lógica, error típico o transferencia.
- La app detecta además el patrón de dificultad predominante del momento y lo usa para ajustar `Siguiente sesión` y `Plan de hoy`.
- Si una lección concentra más atasco real que las demás, la app puede subirla como tarea de `Rescate`.
- Banco de práctica por familias y dificultad, adaptado a la ruta activa.
- El banco de práctica puede filtrarse por familia, dificultad y estado.
- El banco de práctica también puede filtrarse por tipo: función, DOM, async, consola, testing o arquitectura.
- El banco de práctica también puede ordenarse por pendientes, impacto, dificultad o familia.
- Cada tarjeta del banco muestra si la práctica está hecha, empezada o sin tocar.
- El banco destaca una práctica “más útil ahora” según estado e impacto.
- El banco muestra estadísticas por familia: total, hechas, empezadas y sin tocar.
- Las estadísticas por familia son clicables y destacan la prioridad útil actual.
- Las familias muestran porcentaje de avance y el banco permite restablecer filtros rápido.
- Easter egg técnico con una radiografía del frontend y su relación con la ruta de aprendizaje.
- La radiografía técnica puede abrir directamente la lección o la práctica relacionada.
- La radiografía detecta base cubierta o pendiente para cada bloque técnico.
- La recomendación de siguiente sesión prioriza lecciones que desbloquean más partes del proyecto.
- El panel de lecciones puede ordenarse por impacto técnico.
- La sidebar incluye un plan de hoy con desbloqueos, tests pendientes y repaso.
- El plan de hoy permite marcar pasos como hechos y cerrar la sesión diaria.
- Cerrar la sesión diaria otorga XP extra y deja rastro en un historial corto.
- El plan de hoy clasifica la sesión: desbloqueo, consolidación, repaso o práctica intensiva.
- El tipo de sesión ya modifica la prioridad real de la cola diaria.
- La cola reduce teoría nueva cuando arrastras demasiada práctica o repaso pendiente.
- Cuando ocurre esa protección, la UI lo explica dentro del propio Plan de hoy.
- El pie del plan diario añade una lectura semanal ligera: reenganche, estable, fuerte o limpieza.
- Esa lectura semanal incluye también una recomendación concreta de ritmo.
- También expone reglas visibles de ritmo semanal y suaviza la prioridad de lecciones avanzadas si toca contener carga.
- Métricas de progreso total, progreso por lenguaje y racha diaria.
- Siguiente sesión recomendada para mantener avance diario.
- Lección activa claramente destacada con pasos de teoría, práctica, reto y cierre.
- Notas personales por lección, guardadas junto al progreso.
- Header compacto en móvil y modo enfoque para estudiar sin distracciones.
- Registro de retos fallados y bloque de repaso pendiente.
- Lección específica de `fetch` consumiendo un JSON local y recorriendo arrays
  de objetos para pintar items.
- Seguimiento de teoría leída, práctica completada, retos resueltos y lecciones
  finalizadas.
- Exportación e importación del progreso en JSON.
- Diseño inspirado en `DESIGN.md`: canvas claro, verde bosque, tarjetas mint y
  espaciado amplio.
- CSS refactorizado con nomenclatura BEM, estados `is-*`, tokens de espaciado
  en base 4px y container máximo de `90rem` / 1440px.
- Hojas de estilo separadas por responsabilidad para no mantener otro monolito
  además de la lógica y los datos.
- Import/export con estado visible y notas guardadas automáticamente al cambiar
  de lección o salir del campo.

## Estructura

- `index.html`: estructura de la app.
- `styles/`: hojas CSS separadas por responsabilidad.
- `styles/base.css`: tokens, reset y estilos base.
- `styles/dashboard.css`: header, hero, dashboard, roadmap y paneles generales.
- `styles/study.css`: lección activa, apoyos y bloques pedagógicos.
- `styles/practice-bank.css`: banco de práctica, spotlight y blueprint técnico.
- `styles/runner.css`: laboratorio JS, preview DOM y reto.
- `styles/responsive.css`: ajustes responsive.
- `scripts/data/`: datos JavaScript de la app.
- `scripts/data/foundations.js`: tracks, lecciones base, supports y roadmap.
- `scripts/data/practice.js`: ejercicios, guias Java y mini proyectos.
- `scripts/data/evolution.js`: evolucion, casos guiados y blueprint.
- `scripts/app/`: lógica JavaScript de la app.
- `scripts/app/core.js`: estado, referencias DOM, persistencia y utilidades base.
- `scripts/app/render.js`: render principal de la interfaz.
- `scripts/app/runner.js`: laboratorio JavaScript, preview DOM y evaluación.
- `scripts/app/learning.js`: atascos, cierres, recurrencia y analítica de aprendizaje.
- `scripts/app/planning.js`: recomendaciones, plan diario y perfil semanal.
- `scripts/app/main.js`: arranque y wiring de eventos.
- `scripts/smoke-check.py`: comprobación estática de arranque tras tocar módulos.
- `AGENT_CONTEXT.md`: contexto operativo del proyecto para agentes.
- `BACKLOG.md`: backlog futuro de mejoras priorizadas.
- `BITACORA.md`: registro manual de cambios relevantes.

## Abrir en local

Abre `index.html` directamente en el navegador. No necesita instalación,
compilación ni servidor local.

## Comprobación de humo

Después de partir o mover archivos de `scripts/app/`, `scripts/data/`, CSS o
`index.html`, ejecuta:

```bash
python3 scripts/smoke-check.py
```

La comprobación revisa archivos enlazados, orden de scripts, selectores del DOM,
funciones críticas y wiring de eventos principales. No sustituye a probar la app
en navegador, pero detecta rápido roturas de arranque como funciones globales
olvidadas durante una separación de archivos.

## Desplegar en GitHub Pages

1. Sube estos archivos a un repositorio de GitHub:
   - `index.html`
   - `styles/`
   - `scripts/`
   - `data/`
   - `README.md`
2. En GitHub, entra en `Settings > Pages`.
3. En `Build and deployment`, selecciona `Deploy from a branch`.
4. Elige la rama `main` y la carpeta `/root`.
5. Guarda los cambios y espera a que GitHub genere la URL.

## Privacidad

El progreso se guarda solo en el navegador donde uses la app. Para moverlo a
otro navegador o equipo, usa `Exportar progreso` y después `Importar progreso`.

GitHub Pages puede publicar el sitio en una URL accesible si el repositorio o la
configuración de Pages son públicos. Si quieres que sea realmente privado,
mantén el repositorio privado y revisa las opciones disponibles en tu cuenta de
GitHub.
