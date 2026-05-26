# Solo Learn — Bitácora

## Propósito

Registro manual de los cambios relevantes realizados en el proyecto. No
sustituye al historial de git; sirve como contexto rápido para cualquier agente
o sesión futura.

## Fase 1 — Base inicial

- Se creó una primera webapp estática para `GitHub Pages`
- Se definió una estructura inicial con HTML, CSS y JS vanilla
- Se añadió persistencia de progreso con `localStorage`
- Se incorporaron niveles, XP, logros y progreso básico

## Fase 2 — Lección activa y estudio real

- La app dejó de ser solo un panel de tarjetas
- Se añadió una vista de lección activa con:
  - teoría
  - pasos de estudio
  - ejemplo de código
  - práctica
  - acciones para marcar teoría, práctica y cierre
- Se refinó el modelo de progreso:
  - `readLessons`
  - `practiceDone`
  - `solvedChallenges`
  - `completed`

## Fase 3 — Ruta de verano y ampliación de contenido

- Se separó el contenido de la lógica en `data.js`
- `app.js` quedó centrado en render, estado y persistencia
- Se añadió la sección de roadmap de junio a agosto
- Se amplió el temario hasta 20 lecciones entre Java y JavaScript
- Se añadieron objetivos gamificados ligados al plan de verano

## Fase 4 — Rediseño y enfoque de producto

- La app se consolidó bajo el nombre `Solo Learn`
- Se aplicó un rediseño visual guiado por `DESIGN.md`
- Se mejoró el header y la jerarquía visual general
- Se añadió un laboratorio ejecutable para JavaScript
- Se añadió racha diaria
- Se mostró progreso por lenguaje
- Se añadió una recomendación de siguiente sesión

## Fase 5 — Ajustes de estudio activo

- La lección activa pasó a estar más diferenciada visualmente
- Se añadió progreso interno de la lección:
  - teoría
  - práctica
  - reto
  - cierre
- Se añadieron notas personales por lección
- Las notas quedaron persistidas en `localStorage`

## Fase 6 — Móvil, enfoque y accesibilidad

- Se redujo la altura del header en móvil
- Se añadió modo enfoque para estudiar sin distracciones
- Se revisaron varios contrastes de color con criterio AA
- Se mejoraron estados de foco y legibilidad de controles
- Se corrigieron textos con contraste insuficiente

## Fase 7 — Maquetación y sistema CSS

- Se refactorizaron clases hacia un estilo BEM
- Se redujo la especificidad general de CSS
- Se centralizaron tokens de espaciado
- Los espaciados se alinearon a una base de `4px`
- Se fijó el ancho máximo de container en `1440px`
- Se evitó seguir usando `position: absolute` para layout visible
- Se eliminó un pseudo-elemento en `.study` que se superponía al contenido

## Fase 8 — UX puntual y persistencia

- Se corrigió la alineación vertical de `Importar progreso`
- Se añadió feedback visible para importar y exportar progreso
- Las notas pasaron a guardarse también al perder foco o cambiar de lección
- Se corrigió el color del título en `.code-lab h3`

## Fase 9 — Diferenciación Java / JavaScript

- Se reforzó la identificación de la ruta activa
- Se añadieron badges y señales de lenguaje en varios puntos
- La lección activa y las tarjetas hacen visible si pertenecen a `Java` o
  `JavaScript`

## Fase 10 — JSON local y fetch

- Se añadió la lección `js-json-fetch`
- Se creó `data/study-items.json` como recurso local para práctica
- La práctica cubre:
  - `fetch` contra JSON local
  - `response.json()`
  - recorrido de arrays de objetos
  - acceso a objetos anidados
  - preparación de datos para pintarlos como items
- El runner JS se adaptó para soportar `await`

## Fase 11 — Ejercicios evaluables de JavaScript

- Se añadió una primera capa de ejercicios evaluables con tests automáticos
- La lección activa ahora puede mostrar un bloque de ejercicio evaluable
- El laboratorio incorpora:
  - carga de ejercicio
  - evaluación
  - resultados por test
  - persistencia de ejercicios superados
- Se añadió seguimiento específico en progreso para `solvedExercises`
- Se añadieron ejercicios iniciales para:
  - `js-values`
  - `js-objects`
  - `js-json-fetch`
  - `js-testing`

## Fase 12 — Preview DOM y validación de interfaz

- El laboratorio ahora soporta un editor HTML de prueba para ciertas lecciones
- Se añadió un preview DOM aislado con `iframe`
- Se incorporó validación de ejercicios que comprueban el estado real del DOM
- Se añadieron ejercicios con preview para:
  - `js-dom`
  - `js-forms`
- El flujo del runner ahora diferencia:
  - ejecución libre
  - carga de práctica
  - carga de ejercicio
  - render de preview
  - evaluación DOM

## Fase 13 — Renderizado de listas en el DOM

- El evaluador DOM ahora soporta llamadas con argumentos
- Un test puede validar varias aserciones del DOM a la vez
- Se añadió un ejercicio de `js-state` centrado en:
  - pintar items en una lista
  - contar pendientes
  - actualizar varios nodos de interfaz

## Fase 14 — Easter egg pedagógico sobre `app.js`

- Se añadió un panel oculto con una radiografía técnica del proyecto
- El panel explica:
  - qué concepto de JavaScript usa cada parte
  - dónde aparece en la app
  - en qué lección o fase de la ruta lo aprenderías
- Se puede abrir con `Alt + J` o tocando varias veces el logo `SL`

## Fase 15 — Radiografía interactiva y conectada con la ruta

- El panel técnico ahora muestra progreso sobre conceptos ya cubiertos
- Cada bloque puede:
  - abrir la lección relacionada
  - llevar directamente a la práctica asociada
- Se añadieron tags conceptuales para reforzar el mapa mental del usuario

## Fase 16 — Mapa de dependencias de aprendizaje

- La radiografía técnica ahora muestra si la base previa de cada bloque está cubierta
- Cada bloque indica:
  - prerequisitos ya completados
  - lecciones que conviene cerrar antes
- Se añadió una métrica global de bloques con base cubierta

## Fase 17 — Recomendación por impacto técnico

- La tarjeta de siguiente sesión ya no usa solo el siguiente elemento pendiente
- Ahora prioriza lecciones que:
  - desbloquean más bloques del proyecto
  - explican conceptos ya presentes en la app
  - mantienen continuidad con la ruta activa
  - aprovechan progreso parcial ya empezado

## Fase 18 — Ordenación de lecciones por impacto

- El panel de lecciones ahora permite alternar entre:
  - orden natural de ruta
  - orden por impacto técnico
- Las tarjetas pueden mostrar por qué una lección tiene prioridad cuando se usa ese modo

## Estado actual resumido

Hoy la app tiene:

- roadmap de estudio
- panel de lecciones
- lección activa
- notas
- retos
- XP y logros
- repaso de fallos
- runner JS
- práctica con JSON local y `fetch`
- import/export
- foco en accesibilidad y layout estable

## Pendiente principal

El siguiente salto importante sigue siendo añadir ejercicios evaluables con
feedback automático, sobre todo en `JavaScript`, y una estructura de práctica
más fuerte para `Java`.
