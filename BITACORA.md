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

## Fase 19 — Cola diaria inteligente

- La sidebar ahora incluye un bloque "Plan de hoy"
- La cola combina tres señales:
  - desbloqueo técnico del proyecto
  - ejercicios evaluables empezados pero no cerrados
  - retos fallados pendientes de repaso
- Cada elemento abre directamente la lección o la práctica correspondiente

## Fase 20 — Cierre de sesión diaria

- Los pasos del "Plan de hoy" pueden marcarse como hechos
- El estado se guarda por fecha dentro del progreso
- La cola muestra cuándo la sesión del día ha quedado cerrada

## Fase 21 — Recompensa e historial de sesiones

- Cerrar el plan diario concede 30 XP una sola vez por día
- Se guarda un historial breve de sesiones diarias cerradas
- La cola muestra tanto la recompensa como los últimos días completados

## Fase 22 — Tipos de sesión diaria

- El bloque "Plan de hoy" ahora clasifica la sesión actual
- Tipos añadidos:
  - desbloqueo
  - consolidación
  - repaso
  - práctica intensiva
  - mixta
- La clasificación se calcula a partir de la composición real de la cola

## Fase 23 — Cola adaptada al tipo de sesión

- El tipo de sesión ya no es solo descriptivo
- Ahora modifica la cola diaria:
  - `repaso` sube errores recientes
  - `consolidación` prioriza ejercicios abiertos
  - `desbloqueo` deja arriba piezas con más impacto técnico
  - `mixta` combina avance, práctica y repaso

## Fase 24 — Protección contra saturación

- La cola detecta deuda de práctica y repaso abierta
- Si la deuda es alta, reduce o bloquea teoría nueva en la sesión del día
- El objetivo es evitar abrir más frentes de los que luego se pueden cerrar

## Fase 25 — Aviso visible de saturación

- El bloque "Plan de hoy" ahora explica cuándo se está bloqueando teoría nueva
- El aviso indica si la causa es deuda de práctica, repaso o ambas

## Fase 26 — Lectura semanal ligera

- El pie del plan diario ahora resume la tendencia de la semana
- Estados añadidos:
  - reenganche
  - estable
  - fuerte
  - contención
  - limpieza
- La lectura mezcla sesiones cerradas recientes y deuda práctica actual

## Fase 27 — Recomendación semanal de ritmo

- Cada estado semanal ahora añade una instrucción accionable
- Ejemplos:
  - evitar teoría avanzada nueva
  - priorizar una práctica y un repaso
  - permitir una sesión de desbloqueo si la semana viene fuerte

## Fase 29 — Profundización en transformación de datos

- Se añadió la lección `js-array-methods`
- La ruta ahora cubre de forma explícita:
  - `map`
  - `filter`
  - `reduce`
- Se añadió un ejercicio evaluable para resumir tareas a partir de arrays de objetos

## Fase 30 — Puente entre datos y DOM

- Se añadió la lección `js-render-lists`
- Esta lección cubre el paso intermedio entre transformar datos y pintarlos en interfaz
- Se añadió un ejercicio DOM evaluable para renderizar `<li>` a partir de arrays de objetos

## Fase 31 — Lección integradora de datos a interfaz

- Se añadió la lección `js-data-to-dom`
- Esta pieza une:
  - filtrado
  - transformación
  - renderizado en el DOM
- Se añadió un ejercicio DOM evaluable para pintar solo items visibles

## Fase 32 — JSON local a interfaz

- Se añadió la lección `js-json-to-dom`
- Esta pieza cubre el paso entre JSON ya convertido a objeto y renderizado en pantalla
- Se añadió un ejercicio DOM evaluable para filtrar items destacados y pintarlos en una lista

## Fase 33 — Flujo async de fetch a DOM

- Se añadió la lección `js-fetch-to-dom`
- Esta pieza une:
  - espera asíncrona
  - filtrado de datos cargados
  - renderizado en interfaz
- El evaluador DOM ahora soporta acciones async al llamar funciones de ejercicio

## Fase 34 — Problemas guiados para Java

- Se añadió una capa de problemas estructurados para Java en la lección activa
- Cada problema incluye:
  - enunciado
  - entrada
  - salida esperada
  - checklist
- Se cubrieron varias lecciones base e intermedias de Java

## Fase 35 — Ampliación de práctica Java

- Se añadieron problemas guiados también para:
  - `java-methods`
  - `java-collections`
  - `java-exceptions`
  - `java-testing`
- La capa Java cubre ya fundamentos, estructuras, POO, errores y validación básica

## Fase 36 — Cierre casi completo de la ruta Java

- Se añadieron problemas guiados también para:
  - `java-inheritance`
  - `java-spring-intro`
- La práctica Java ya cubre casi toda la progresión de la ruta

## Fase 37 — Banco de práctica por familias

- Se añadió un banco de práctica conectado al track activo
- JavaScript y Java se agrupan ahora por:
  - familia
  - dificultad
- El banco permite abrir directamente la práctica o el problema relacionado

## Fase 38 — Filtros del banco de práctica

- El banco ahora permite filtrar por:
  - familia
  - dificultad
  - estado
- Esto permite usar la práctica como superficie propia y no solo como extensión de la lección activa

## Fase 39 — Filtro por tipo de práctica

- El banco ahora permite filtrar también por patrón técnico
- Ejemplos de tipo:
  - función
  - DOM
  - async
  - consola
  - testing
  - arquitectura

## Fase 40 — Ordenación del banco de práctica

- El banco ahora permite ordenar por:
  - pendientes primero
  - impacto
  - dificultad
  - familia
- Esto lo acerca más a un tablero de entrenamiento y no solo a un listado filtrable

## Fase 41 — Estados visibles en el banco

- Cada tarjeta del banco muestra ahora un estado de progreso
- Estados añadidos:
  - `Hecho`
  - `Empezado`
  - `Sin tocar`

## Fase 42 — Recomendación dentro del banco

- El banco ahora destaca una práctica “más útil ahora”
- La recomendación prioriza:
  - prácticas empezadas
  - o, si no las hay, entradas con mejor impacto según la ruta activa

## Fase 43 — Estadísticas por familia

- El banco ahora muestra agregados por familia
- Cada familia enseña:
  - total de prácticas
  - cuántas están hechas
  - cuántas están empezadas
  - cuántas siguen sin tocar

## Fase 44 — Familias accionables

- Las estadísticas por familia ahora funcionan como acceso directo al filtro
- Se resalta la familia con mayor deuda útil para orientar la siguiente práctica

## Fase 45 — Lectura visual del banco

- Las familias muestran ya porcentaje de avance y barra visual
- El banco añade una acción rápida para restablecer filtros y orden

## Fase 46 — Estados de interfaz en JavaScript

- Se añadió la lección `js-ui-states`
- La ruta JS cubre ahora de forma explícita:
  - loading state
  - empty state
  - error state
- Se añadió un ejercicio DOM evaluable para pintar esos estados con una carga async
- La radiografía técnica también enlaza ya este concepto como parte de la app real

## Fase 47 — Mini proyectos guiados

- Se añadió un bloque de mini proyecto dentro de la lección activa
- Las lecciones avanzadas pueden enseñar ahora:
  - un objetivo de entrega
  - hitos
  - entregables esperados
- Primeras lecciones cubiertas:
  - `java-testing`
  - `java-spring-intro`
  - `js-components`
  - `js-project`

## Fase 48 — Backlog pedagógico de evolución por niveles

- Se añadió al backlog la línea de ejercicios evolutivos
- La idea es retomar problemas simples en niveles superiores para:
  - separar funciones
  - modelar mejor datos
  - introducir clases, colecciones o capas
  - reforzar mantenibilidad y escalabilidad

## Fase 49 — Mini proyectos intermedios

- La capa de mini proyectos ya no queda solo en el tramo final
- Se añadieron briefs también para:
  - `java-oop`
  - `java-collections`
  - `js-fetch-to-dom`
  - `js-ui-states`
- Esto mejora el puente entre práctica puntual y entregables más reales

## Fase 50 — Replanteamiento avanzado de ejercicios

- Se añadió una nueva capa pedagógica en la lección activa
- Algunas lecciones intermedias y avanzadas muestran ahora:
  - de qué ejercicio simple parten
  - cómo se resolvía de forma básica
  - cómo cambia el enfoque al subir de nivel
- Primeras rutas cubiertas:
  - `java-oop`
  - `java-collections`
  - `js-state`
  - `js-components`

## Fase 51 — Señal de evolución en el banco de práctica

- El banco de práctica marca ahora qué entradas escalan después
- Se usa la etiqueta `Escala después`
- La recomendación destacada del banco también tiene en cuenta este valor

## Fase 52 — Filtro de evolución en el banco

- El banco de práctica añade un filtro específico de evolución
- Permite ver:
  - todas las prácticas
  - solo las que escalan después
  - solo las autocontenidas

## Fase 53 — Base cubierta o pendiente en prácticas evolutivas

- Las prácticas con evolución muestran ya si la base previa está cubierta
- Al filtrar por evolución, el banco prioriza primero las que ya tienen base cubierta

## Fase 54 — Navegación a la base previa

- El banco de práctica permite abrir la lección base de una práctica evolutiva
- El bloque `Replanteamiento avanzado` también puede saltar a esa base previa

## Fase 55 — Base previa dentro del plan diario

- El plan de hoy puede recomendar ya tareas de tipo `Base previa`
- Esto aparece cuando una práctica evolutiva tiene sentido, pero su fundamento aún no está cubierto

## Fase 56 — Escalada tras cubrir la base

- Cuando la base ya está cubierta, la cola diaria puede priorizar la práctica avanzada correspondiente
- Se añadieron nuevas etiquetas de sesión:
  - `Sesion de escalado`
  - `Sesion de transferencia`

## Fase 57 — Onboarding y siguiente sesión enriquecida

- Se añadió una guía rápida inicial para nuevos usuarios
- La tarjeta `Siguiente sesión` ya contempla:
  - `Base previa`
  - `Escalada`
  - `Desbloqueo`

## Fase 58 — Onboarding adaptativo

- La guía rápida inicial ya no es fija
- Cambia según tres estados:
  - primera toma de contacto
  - progreso inicial
  - trabajo por progresión y ejercicios evolutivos

## Fase 59 — Primer caso evolutivo real

- Se añadió un caso evolutivo guiado sobre salario por antigüedad
- Primeras lecciones cubiertas:
  - `js-state`
  - `java-oop`
- En JavaScript el caso puede cargarse en el laboratorio
- En Java queda como caso de diseño orientado a modelado y responsabilidad

## Fase 60 — Tercera fase del caso evolutivo

- El caso de salario por antigüedad se amplió a una fase de colección y resumen
- Nuevas lecciones cubiertas:
  - `js-components`
  - `java-collections`
- El foco pasa de un solo empleado a:
  - filtrar varios empleados
  - renderizar o resumir resultados
  - calcular agregados globales

## Fase 61 — Fase evolutiva visible en el banco

- El banco de práctica muestra ya la fase del caso evolutivo
- Fases visibles por ahora:
  - `Base`
  - `Refactor`
  - `Colección y resumen`

## Fase 62 — Filtro por fase evolutiva y ajuste de encabezados

- El banco añade un filtro específico para entrenar por fase evolutiva
- Se ajustó la maquetación de `.section-heading` para separar mejor bloques de texto y controles

## Fase 63 — Resumen por fase evolutiva

- El banco muestra ahora cuántas prácticas hay por fase evolutiva
- Se indica, por fase:
  - cuántas están hechas
  - cuántas siguen pendientes

## Fase 28 — Reglas semanales visibles

- El plan diario ahora muestra reglas concretas de ritmo semanal
- Ejemplos:
  - cuánta teoría nueva conviene abrir
  - cuánta práctica o repaso focalizar
  - si esta semana conviene evitar contenido avanzado
- Estas reglas también ajustan ligeramente la priorización de lecciones

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
