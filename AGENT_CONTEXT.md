# Solo Learn — Contexto para Agentes

## Propósito del proyecto

Solo Learn es una webapp estática y privada para estudiar `Java` y
`JavaScript` desde nivel cero hasta avanzado. El objetivo no es publicar una
plataforma comercial, sino tener una herramienta personal de estudio que
combine:

- ruta por niveles
- lecciones cortas
- práctica guiada
- pequeños retos
- gamificación ligera
- persistencia de progreso en navegador

El usuario necesita llegar con soltura a final de verano, así que la prioridad
es que la app sirva para practicar de verdad, no solo para mostrar contenido.

## Stack y restricciones

- Sitio estático para `GitHub Pages`
- Sin build step
- Sin dependencias
- HTML + CSS + JavaScript vanilla
- Persistencia actual: `localStorage`
- Datos de ejemplo: JSON local en `data/study-items.json`

Notas del entorno observadas:

- `node` no está disponible por defecto
- `rg` no está instalado en este entorno
- La app debe seguir funcionando abriendo `index.html` directamente o desde un
  hosting estático simple

## Estructura actual

- `index.html`: estructura y secciones principales
- `styles.css`: estilos globales y componentes
- `data.js`: tracks, lecciones, detalles y roadmap
- `app.js`: estado, renderizado, eventos, persistencia y runner JS
- `data/study-items.json`: ejemplo local para prácticas con `fetch`
- `DESIGN.md`: guía visual de referencia usada para el rediseño
- `README.md`: documentación general
- `AGENT_CONTEXT.md`: este archivo
- `BACKLOG.md`: backlog priorizado
- `BITACORA.md`: registro de cambios realizados

## Estado funcional actual

La app ya incluye:

- rutas separadas para `Java` y `JavaScript`
- filtros por nivel
- roadmap de verano
- panel de lecciones
- lección activa destacada
- teoría, pasos, ejemplo y práctica por lección
- notas personales por lección
- retos rápidos con feedback
- logros y XP
- racha diaria
- progreso por lenguaje
- repaso de retos fallados
- modo enfoque
- exportación e importación de progreso
- laboratorio ejecutable para `JavaScript`
- práctica de `fetch` contra JSON local
- primera versión de ejercicios evaluables con tests automáticos en lecciones
  de `JavaScript`
- el temario ya incluye una lección específica de transformación de datos con
  `map`, `filter` y `reduce`
- el temario ya incluye un paso puente de renderizado de listas desde datos
- el temario ya incluye una lección integradora de datos -> transformación -> DOM
- el temario ya incluye un paso explícito de JSON local ya parseado -> DOM
- el temario ya incluye un paso async de `fetch` -> filtrado -> DOM
- Java ya dispone de problemas guiados estructurados para varias lecciones base
- la capa de práctica Java ya cubre también métodos, colecciones, excepciones y testing
- la capa de práctica Java cubre ya casi toda la ruta, incluyendo interfaces y Spring básico
- existe un banco de práctica por track, familia y dificultad para no depender solo de la lección activa
- el banco de práctica ya soporta filtros por familia, dificultad y completado
- el banco de práctica ya soporta también filtrado por patrón técnico o tipo de práctica
- el banco de práctica ya soporta ordenación por pendientes, impacto, dificultad y familia
- las tarjetas del banco muestran un estado de progreso visible: hecho, empezado o sin tocar
- el banco destaca una práctica recomendada dentro del subconjunto filtrado actual
- el banco muestra agregados por familia para detectar huecos y zonas fuertes
- las tarjetas de familia del banco son clicables y resaltan la familia con más deuda útil
- las estadísticas por familia incluyen porcentaje y barra de avance; el banco tiene reset rápido de filtros
- preview DOM con `iframe` aislado para ejercicios de interfaz
- validación de listas renderizadas y contadores en ejercicios DOM
- panel oculto tipo easter egg que documenta conceptos reales de `app.js`
- el panel técnico permite saltar a la lección o práctica relacionada
- el panel técnico muestra prerequisitos ya cubiertos o aún pendientes
- la recomendación de siguiente sesión ya usa dependencias técnicas, no solo orden lineal
- el listado de lecciones soporta ordenación por impacto técnico
- la sidebar incluye una cola diaria corta basada en impacto, tests y repaso
- la cola diaria guarda marcados por fecha para cerrar una sesión de estudio
- cerrar la sesión diaria concede XP y se guarda en un historial breve
- el plan diario deriva un tipo de sesión según la mezcla real de tareas
- el tipo de sesión diaria ya afecta al orden y composición de la cola
- hay protección contra saturación: si la deuda práctica es alta, baja la teoría nueva
- la UI del plan diario muestra un aviso explícito cuando se bloquea teoría nueva
- el pie del plan diario incluye una lectura semanal derivada de sesiones cerradas y deuda actual
- la lectura semanal incluye una recomendación práctica de ritmo para esa semana
- la lectura semanal expone reglas visibles y puede penalizar ligeramente lecciones avanzadas

## Convenciones de implementación

### HTML / CSS

- Nomenclatura de clases en estilo BEM
- Estados con prefijo `is-`
- Índice de especificidad bajo
- Evitar selectores por `id` en CSS cuando no sean necesarios
- Espaciado basado en múltiplos de `4px`, expresado con unidades relativas
- `max-width` del container en `1440px` (`90rem`)
- Evitar `position: absolute` para layout visible salvo casos puntuales y
  justificados
- Evitar overlays decorativos que puedan pisar contenido

### Accesibilidad

- Mantener contraste AA como mínimo
- Revisar especialmente texto secundario, labels, badges y fondos tintados
- Mantener `focus-visible`
- No depender solo del color para distinguir Java y JavaScript

### UX ya decidida con el usuario

- El header móvil debe ser compacto
- La zona de estudio activa debe diferenciarse claramente
- El estilo general gusta, pero no conviene caer en una paleta demasiado
  verdosa
- El lenguaje activo debe reconocerse de un vistazo
- El layout debe evitar soluciones que generen solapes visuales
- El proyecto puede incluir ayudas ocultas si tienen valor pedagógico real

## Modelo de datos actual

El estado vive en `app.js` bajo `state` y contiene, al menos:

- `activeTrack`
- `filter`
- `activeLessonId`
- `completed`
- `solvedChallenges`
- `failedChallenges`
- `readLessons`
- `practiceDone`
- `solvedExercises`
- `notes`
- `lastStudyDate`
- `streak`
- `xp`

## Decisiones de producto vigentes

- `JavaScript` sí tiene ejecución en navegador
- `Java` se trabaja de momento como teoría, práctica guiada, pseudocódigo y
  diseño de ejercicios, no como ejecución real en la app
- Las lecciones avanzadas pueden incluir mini proyectos guiados con hitos y
  entregables
- También conviene usar mini proyectos en lecciones intermedias cuando ayuden a
  conectar sintaxis con entregables reales
- `fetch` y manejo de JSON forman parte explícita del temario
- Los estados de interfaz (`loading`, `empty`, `error`) forman parte explícita
  de la ruta `JavaScript`
- Hay interés explícito en reutilizar problemas simples en niveles superiores
  para reescribirlos con mejor diseño, escalabilidad y arquitectura
- Esa idea ya tiene primera implementación visible dentro de la lección activa
  con bloques de `replanteamiento avanzado`
- El banco de práctica ya puede señalar qué entradas reaparecen más adelante con
  un replanteamiento avanzado
- También puede filtrarlas explícitamente por evolución
- En esas prácticas, la UI ya distingue si la base previa del replanteamiento
  está cubierta o pendiente
- Ya existe navegación directa hacia la lección base desde el banco y desde el
  propio bloque de replanteamiento
- La cola diaria ya puede introducir tareas de `Base previa` cuando una práctica
  evolutiva necesita cerrar antes su fundamento
- Si esa base ya está cubierta, la cola puede empujar la práctica avanzada con
  tareas de `Escalada`
- La app ya incluye un onboarding corto para nuevos usuarios dentro de la
  sidebar
- Ese onboarding ya es adaptativo según el estado real del progreso
- La tarjeta `Siguiente sesión` comparte ya la misma lógica de base previa /
  escalada
- Algunas lecciones ya incluyen un `caso evolutivo guiado` como material de
  práctica real, no solo planificación
- El caso de salario por antigüedad ya se extiende a una tercera fase con
  colecciones, filtros y agregados
- Esa progresión ya se expone también en el banco mediante etiquetas de fase
- El banco ya soporta también filtrado directo por fase evolutiva
- La app es privada y pensada para una sola persona

## Deuda y siguiente foco razonable

Lo más importante que sigue faltando es ampliar la capa de “entrenamiento
evaluable”. En términos prácticos:

1. extender los ejercicios de `JavaScript` a más temas de interfaz y datos
2. enriquecer la ruta `Java` con más práctica estructurada y proyectos
3. mejor analítica de errores para repaso
4. modularizar `app.js` cuando el coste de mantenimiento ya lo pida

## Reglas para futuros agentes

- Lee antes `README.md`, `AGENT_CONTEXT.md`, `BACKLOG.md` y `BITACORA.md`
- No metas toolchains ni dependencias sin necesidad real
- Mantén la app desplegable en `GitHub Pages`
- Respeta BEM, tokens y baja especificidad
- Si tocas colores o tipografía, revisa contraste
- Si tocas layout móvil, revisa altura del header y legibilidad
- No conviertas la app en una landing; sigue siendo una herramienta de estudio
