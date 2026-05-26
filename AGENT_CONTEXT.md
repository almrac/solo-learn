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
- preview DOM con `iframe` aislado para ejercicios de interfaz
- validación de listas renderizadas y contadores en ejercicios DOM
- panel oculto tipo easter egg que documenta conceptos reales de `app.js`
- el panel técnico permite saltar a la lección o práctica relacionada
- el panel técnico muestra prerequisitos ya cubiertos o aún pendientes
- la recomendación de siguiente sesión ya usa dependencias técnicas, no solo orden lineal
- el listado de lecciones soporta ordenación por impacto técnico

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
- `fetch` y manejo de JSON forman parte explícita del temario
- La app es privada y pensada para una sola persona

## Deuda y siguiente foco razonable

Lo más importante que sigue faltando es ampliar la capa de “entrenamiento
evaluable”. En términos prácticos:

1. extender los ejercicios de `JavaScript` a más temas
2. práctica de DOM con preview real
3. ejercicios Java más estructurados con entradas, salidas y checklist
4. mejor analítica de errores para repaso

## Reglas para futuros agentes

- Lee antes `README.md`, `AGENT_CONTEXT.md`, `BACKLOG.md` y `BITACORA.md`
- No metas toolchains ni dependencias sin necesidad real
- Mantén la app desplegable en `GitHub Pages`
- Respeta BEM, tokens y baja especificidad
- Si tocas colores o tipografía, revisa contraste
- Si tocas layout móvil, revisa altura del header y legibilidad
- No conviertas la app en una landing; sigue siendo una herramienta de estudio
