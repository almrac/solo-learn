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

## Fase 0 — Refactor estructural del núcleo JS

- `app.js` dejó de concentrar toda la lógica
- El runner se extrajo a `scripts/app/runner.js`
- La analítica de aprendizaje se extrajo a `scripts/app/learning.js`
- La planificación adaptativa se extrajo a `scripts/app/planning.js`
- `index.html` ahora carga varios scripts vanilla en orden, sin build step

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

- Se separó el contenido de la lógica en `scripts/data/`
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

## Fase 28 — Dificultad cognitiva y atascos explícitos

- Cada lección pasó a incluir apoyo mental:
  - idea clave
  - lógica
  - mnemotecnia
  - error típico
- El plan diario empezó a etiquetar el foco mental de cada tarea
- La app detecta un patrón de dificultad dominante para modular la recomendación
- Se añadió además registro explícito de atascos por lección:
  - concepto
  - lógica
  - error típico
  - transferencia
- Ese historial puede alimentarse de forma manual y también automática al
  fallar retos o tests
- El registro ya distingue también el origen del atasco:
  lección, reto, tests o tests DOM
- Si una lección concentra más atasco real que el resto, puede emerger como
  tarea de `Rescate` en la recomendación principal y en el plan diario
- Esa recomendación ya no es neutra: cambia según el origen del bloqueo y puede
  mandar a repaso, tests, preview DOM o rescate general
- El sistema ya pondera más los atascos recientes que los antiguos para evitar
  que el plan diario arrastre indefinidamente problemas ya superados
- La presión ya puede bajar también por resolución real cuando el usuario cierra
  teoría, práctica, retos o tests
- Si una lección mejora pero vuelve a caer varias veces, el sistema ya la marca
  como patrón frágil para no tratarla como tropiezo aislado
- Para esas lecciones frágiles, la app ya sugiere también cómo conviene cerrar:
  resumen, práctica corta, repetir reto o rehacer preview DOM
- Parte de ese cierre ya puede ejecutarse con acciones rápidas desde el propio
  bloque de atascos
- Esas acciones rápidas ya dejan rastro como intentos de cierre por lección
- La app ya usa esos alivios observados para priorizar el cierre que parece
  funcionar mejor en cada lección

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

## Fase 64 — Resumen por fase interactivo

- El resumen por fase evolutiva ya no es solo informativo
- Pulsar una fase aplica el filtro correspondiente en el banco

## Fase 65 — Prioridad útil por fase

- El resumen por fase evolutiva marca ahora cuál concentra más deuda útil
- La prioridad pondera más lo empezado que lo completamente nuevo

## Fase 66 — Apoyo mental por lección

- Se añadió una capa pedagógica breve a cada lección
- Cada lección puede mostrar:
  - idea clave
  - lógica
  - mnemotecnia
  - error típico

## Fase 67 — Foco mental en el plan diario

- Cada tarea del plan de hoy muestra ahora su foco principal
- Focos usados por ahora:
  - `Concepto`
  - `Logica`
  - `Error tipico`
  - `Transferencia`

## Fase 68 — Patron de dificultad predominante

- La app detecta ahora si domina:
  - deuda conceptual
  - deuda de logica
  - arrastre de error tipico
  - transferencia pendiente
- Esa señal ya ajusta `Siguiente sesión` y aparece también en el `Plan de hoy`

## Fase 69 — Historial de atascos por origen

- El atasco ya no se registra solo por tipo
- También se guarda el origen principal:
  - lección
  - reto
  - tests
  - tests DOM
- Esa señal ya ajusta mejor rescates y recomendaciones

## Fase 70 — Presion reciente y alivio real

- Los atascos recientes pesan más que los antiguos
- La presión también baja cuando cierras teoría, práctica, reto o tests con éxito
- La lección activa ya puede mostrar señales de mejora real

## Fase 71 — Recaida y cierres recomendados

- La app distingue entre atasco puntual y patrón frágil
- Si una lección mejora pero vuelve a caer, pasa a tratarse como recaída
- El sistema ya recomienda el mejor tipo de cierre según el patrón:
  - resumen
  - práctica
  - reto
  - preview DOM
  - salto avanzado

## Fase 72 — Acciones rápidas y eficacia observada

- Los cierres sugeridos ya son accionables desde la propia lección
- La app registra intentos de cierre por lección
- Si una acción baja la presión después, cuenta como alivio observado
- Las acciones rápidas ya se ordenan por eficacia conocida

## Fase 73 — Refactor de lógica y datos

- `app.js` dejó de ser el único contenedor de lógica
- La lógica se organizó en `scripts/app/`
- Los datos también dejaron el monolito original y pasaron a `scripts/data/`

## Fase 74 — Refactor de CSS por responsabilidad

- `styles.css` dejó de ser el único archivo de estilos
- El CSS ahora se reparte en `styles/`
- El objetivo fue cortar el coste de mantenimiento sin meter build step

## Fase 75 — Comprobación de humo de modularización

- Se añadió `scripts/smoke-check.py`
- La comprobación revisa:
  - archivos enlazados desde `index.html`
  - orden mínimo de scripts
  - selectores DOM usados por `scripts/app/core.js`
  - funciones críticas repartidas entre módulos
  - listeners principales de `scripts/app/main.js`
- El objetivo es detectar rápido roturas de arranque tras partir o mover módulos

## Fase 28 — Reglas semanales visibles

- El plan diario ahora muestra reglas concretas de ritmo semanal
- Ejemplos:
  - cuánta teoría nueva conviene abrir
  - cuánta práctica o repaso focalizar
  - si esta semana conviene evitar contenido avanzado
- Estas reglas también ajustan ligeramente la priorización de lecciones

## Fase 76 — Sidebar orientada por sala

- El lateral ya no depende solo del color para distinguir `Todo`, `Java` y `JavaScript`
- Se añadió un bloque `Mapa lateral` que cambia según la sala activa
- En `Todo` orienta sobre cuándo entrar en cada sala
- En `Java` resume un flujo de backend y diseño con acceso directo a la lección y al banco
- En `JavaScript` resume un flujo de frontend ejecutable con acceso directo al runner y al banco
- `README.md` documenta además las superficies principales de uso para que el flujo no quede implícito

## Fase 77 — Cobertura fina en ejercicios avanzados de JavaScript

- Se reforzaron los tests evaluables de `js-modules`
- Ahora comprueban mejor orden interno por grupo y rutas parecidas que no deben clasificarse por error
- Se reforzaron también los tests de `js-components`
- Ahora validan títulos largos y metadatos más variados sin cambiar la estructura HTML esperada
- Se amplió además `js-project` con más combinaciones de filtros por `status` y `track`
- El objetivo fue apretar la capa evaluable en tramos intermedios y avanzados sin tocar diseño

## Fase 78 — Casos borde y repaso con fallo específico

- Se ampliaron los tests evaluables de `js-json-fetch` con más combinaciones de `tags`, `stats` y `xp`
- Se amplió también `js-testing` con casos borde adicionales sobre `trim`, saltos de línea y longitud útil real
- La app registra ahora fallos de ejercicios por nombre de test, no solo por lección
- Ese rastro se usa ya en el repaso para indicar qué comprobación se repite más
- La prioridad de repaso entre lecciones con tests abiertos puede apoyarse ahora también en ese fallo específico recurrente

## Fase 79 — Prioridad diaria con fallo concreto

- `Siguiente sesión` puede usar ya el fallo específico más repetido cuando la deuda dominante es de lógica
- `Plan de hoy` incorpora también esa pista en tareas de tests y repaso
- Esto hace que la recomendación no diga solo "cierra tests", sino también qué comprobación conviene atacar primero

## Fase 80 — Señal semanal de calidad de cierre

- La lectura semanal ya distingue también si se está repitiendo un mismo fallo de tests
- Puede aparecer una `Semana de ajuste` aunque exista continuidad, si el atasco real sigue concentrado en la misma comprobación
- Las misiones semanales de práctica y repaso muestran ahora también ese fallo recurrente cuando existe

## Fase 81 — Foco recurrente dentro de la lección activa

- El bloque de ejercicio evaluable puede mostrar ya cuál es el test que más se repite en esa lección
- Esa pista aparece dentro de la lección activa antes de bajar al runner
- Desde ahí se puede cargar directamente el ejercicio para atacar primero ese caso concreto

## Fase 82 — Feedback del runner con memoria de fallo

- El resumen de resultados del runner puede señalar ya cuál es el atasco dominante cuando vuelven a caer varios tests
- Los tests fallidos muestran además una pista breve cuando ese mismo caso ya se ha repetido varias veces
- El objetivo es que el feedback no se limite a esperado/recibido, sino que también oriente por recurrencia real

## Fase 83 — Pistas de corrección según el tipo de fallo

- El mismatch del runner añade ahora una pista breve según el tipo de test que falla
- Puede orientar hacia filtrado, orden, limpieza de render, estructura devuelta o formato HTML
- En fallos DOM también puede distinguir entre conteo de nodos y texto/render final

## Fase 84 — Mini proyecto guiado para módulos

- `js-modules` ya tiene mini proyecto guiado propio
- El foco está en separar estado, carga de datos, transformación, render y archivo de arranque
- La idea es convertir la lección en un puente real entre utilidades sueltas y arquitectura frontend mantenible

## Fase 85 — Mini proyecto guiado para estado local

- `js-state` ya tiene mini proyecto guiado propio
- El foco está en mantener una fuente de verdad local, re-renderizar desde estado y persistir con `localStorage`
- La idea es reforzar el puente entre ejercicios DOM sueltos y una mini app con ciclo completo de estado

## Fase 86 — Mini proyecto guiado para renderizado de listas

- `js-render-lists` ya tiene mini proyecto guiado propio
- El foco está en convertir arrays de objetos en una lista visible, con resumen y rerender limpio
- La idea es reforzar el paso entre transformación de datos y primeras interfaces renderizadas

## Fase 87 — Mini proyecto guiado para DOM y eventos

- `js-dom` ya tiene mini proyecto guiado propio
- El foco está en selección de nodos, listeners y actualización visible coherente
- La idea es reforzar el paso entre DOM básico y componentes interactivos más ricos

## Fase 88 — Mini proyecto guiado para formularios

- `js-forms` ya tiene mini proyecto guiado propio
- El foco está en `submit`, validación, feedback visible y limpieza controlada del formulario
- La idea es reforzar el paso entre interacción básica y captura fiable de datos desde UI

## Fase 89 — Mini proyecto guiado para JSON a interfaz

- `js-json-to-dom` ya tiene mini proyecto guiado propio
- El foco está en filtrar un objeto JSON ya cargado, resumirlo y pintarlo en DOM
- La idea es reforzar el puente entre datos en memoria y vistas antes de entrar en `fetch`

## Fase 90 — Mini proyecto guiado para datos a interfaz

- `js-data-to-dom` ya tiene mini proyecto guiado propio
- El foco está en separar filtro, transformación a tarjeta, resumen y render completo
- La idea es reforzar la tubería `datos -> decisión -> salida` antes de cerrar el tramo de interfaz

## Fase 91 — Mini proyecto guiado para métodos de array

- `js-array-methods` ya tiene mini proyecto guiado propio
- El foco está en usar `filter`, `map` y `reduce` sobre datos de progreso con una salida final consumible
- La idea es reforzar la base de transformación antes de subir a render, JSON y `fetch`

## Fase 92 — Mini proyecto guiado para objetos

- `js-objects` ya tiene mini proyecto guiado propio
- El foco está en leer propiedades, seleccionar pendientes y devolver una salida pequeña y reutilizable
- La idea es reforzar la base de estructuras de datos antes de seguir subiendo a filtros y render

## Fase 93 — Mini proyecto guiado para valores y funciones

- `js-values` ya tiene mini proyecto guiado propio
- El foco está en variables con intención, función simple y salida legible sin efectos secundarios
- La idea es cerrar la base mínima de JavaScript antes de subir a objetos y transformaciones

## Fase 94 — Mini proyecto guiado para métodos en Java

- `java-methods` ya tiene mini proyecto guiado propio
- El foco está en separar cálculo, formato y coordinación en métodos con parámetros y retorno claros
- La idea es reforzar el paso fuera de `main` antes de seguir subiendo a control, arrays y POO

## Fase 95 — Mini proyecto guiado para control de flujo en Java

- `java-control` ya tiene mini proyecto guiado propio
- El foco está en condicionales, bucles y contadores con un resumen final legible
- La idea es reforzar decisiones y repetición antes de subir a arrays, colecciones y modelado más rico

## Fase 96 — Mini proyecto guiado para arrays en Java

- `java-arrays` ya tiene mini proyecto guiado propio
- El foco está en recorrido por índice, acumulación, máximo y promedio sobre datos simples
- La idea es cerrar el bloque base de Java antes de seguir con colecciones y modelado orientado a objetos

## Fase 97 — Cobertura fina para asincronía evaluable

- Reforzada `js-async` en `scripts/data/practice.js`
- Añadidos casos para orden de pendientes, `items` vacío y respuestas sin `items`
- La idea es endurecer una lección intermedia que todavía admitía soluciones superficiales

## Fase 98 — Cobertura fina para estados de interfaz

- Reforzada `js-ui-states` en `scripts/data/practice.js`
- Añadidos casos para respuestas sin `items`, recuperación tras vacío y limpieza de error antes de un vacío posterior
- La idea es endurecer la gestión visual de carga, vacío y error más allá del caso feliz

## Fase 99 — Cobertura fina para módulos y prefijos

- Reforzada `js-modules` en `scripts/data/practice.js`
- Añadidos casos para prefijos exactos, falsos positivos con carpetas previas y mezclas de rutas válidas e inválidas
- La idea es castigar soluciones frágiles basadas en `includes` o clasificaciones demasiado laxas

## Fase 100 — Cobertura fina para dashboard final

- Reforzada `js-project` en `scripts/data/practice.js`
- Añadidos casos para `filters` parcial o vacío y para combinaciones donde `status` desconocido deja la vista vacía sin tocar contadores globales
- La idea es endurecer el contrato del resumen final en escenarios de filtro menos felices

## Fase 101 — Cierre de examen con memoria de fallos

- En `scripts/app/core.js` el resumen del examen ya agrega también patrones recurrentes detectados en tests previos
- En `scripts/app/render.js` el resultado del examen muestra esos patrones y anota el fallo recurrente principal dentro de cada pregunta fallada cuando existe
- La idea es que el modo examen no cierre solo con nota, sino también con una pista concreta de qué conviene repasar después

## Fase 102 — Spotlight del banco guiado por fallo recurrente

- En `scripts/app/core.js` el spotlight del banco ya puede priorizar prácticas JavaScript con fallo repetido dominante
- En `scripts/app/render.js` ese spotlight muestra también el bloqueo principal cuando existe, en vez de recomendar solo por progreso genérico
- La idea es convertir la señal fina de tests en una recomendación visible y accionable dentro del banco

## Fase 103 — Orden del banco alineado con la señal de fallos

- En `scripts/app/core.js` el banco ya calcula una prioridad reutilizable por práctica con peso de fallo recurrente, impacto y estado
- En `scripts/app/render.js` el grid usa esa prioridad para ordenar mejor pendientes y también marca con badge las prácticas con fallo repetido
- La idea es que spotlight y listado principal empujen en la misma dirección, no con criterios distintos

## Fase 104 — Cola de examen priorizada por recaída real

- En `scripts/app/core.js` la selección inicial del modo examen ya ordena primero lecciones con fallo recurrente, luego práctica ya abierta y después impacto técnico
- En `scripts/app/render.js` la nota de configuración del examen explica que esa priorización ocurre dentro del filtro actual
- La idea es que el examen no solo respete alcance y nivel, sino también dónde conviene apretar más según la memoria real de fallos

## Fase 105 — Pista visible de arranque para el examen

- En `scripts/app/core.js` el examen ya puede resumir qué lección entraría primero y por qué
- En `scripts/app/render.js` esa pista aparece en la configuración antes de iniciar el examen
- La idea es que la priorización del examen deje de ser solo interna y pase a ser visible y auditable

## Fase 106 — Siguiente sesión con pista de entrada

- En `scripts/app/planning.js` la recomendación principal ya devuelve una pista corta de entrada para la lección sugerida
- En `scripts/app/render.js` la tarjeta `Siguiente sesión` muestra esa pista cuando existe
- La idea es alinear la explicación de la tarjeta principal con el nivel de detalle que ya tienen banco y examen

## Fase 107 — Plan de hoy con entrada útil por bloque

- En `scripts/app/planning.js` cada paso del `Plan de hoy` ya puede llevar una pista corta de entrada
- En `scripts/app/render.js` esa pista aparece dentro de cada bloque diario cuando existe
- La idea es que la cola diaria no solo diga qué hacer, sino también por dónde conviene empezar cada tarea

## Fase 108 — Repaso con pista de reentrada

- En `scripts/app/render.js` cada frente del bloque `Repaso` ya puede mostrar una pista corta de reentrada
- La prioridad sale primero del fallo dominante cuando existe y, si no, del tipo de frente o del trabajo ya abierto
- La idea es que el repaso no solo enumere deudas, sino también por dónde conviene volver a entrar en cada una

## Fase 109 — Misiones semanales con entrada útil

- En `scripts/app/planning.js` varias misiones semanales ya incluyen una pista corta de entrada cuando hay una pieza concreta que atacar primero
- En `scripts/app/render.js` esa pista aparece dentro de la misión como `Entrada útil`
- La idea es que el resumen semanal no sea solo cuantitativo, sino también accionable cuando una misión está floja

## Fase 110 — Historial con punto de reentrada

- En `scripts/app/render.js` el historial reciente ya muestra una `Reentrada útil ahora` usando la recomendación principal vigente
- La idea es que, después de leer la semana, el panel también sugiera por dónde conviene volver a entrar sin tener que mirar otro bloque

## Fase 111 — Consolidación interna de la lógica de entrada útil

- En `scripts/app/core.js` la app ya centraliza la detección de trabajo abierto y la pista base de reentrada por lección
- `planning.js` y `render.js` reutilizan ahora ese helper común en vez de repetir la lógica en varios sitios
- La idea es reducir duplicación antes de seguir creciendo con más superficies de recomendación

## Fase 112 — Señal común de prioridad para sesión, banco y examen

- En `scripts/app/core.js` la app ya expone una señal común por lección con peso de recaída, estado empezado e impacto técnico
- `planning.js` la usa ahora para ordenar mejor `Siguiente sesión`, pendientes de tests y lecciones falladas
- Banco y examen también consumen ya esa misma prioridad, para que las tres superficies empujen con el mismo criterio base

## Fase 113 — Consolidación de textos de priorización diaria

- En `scripts/app/planning.js` varias razones repetidas de tests, base previa, escalada y repaso pasan ahora por helpers comunes
- La idea es que el “por qué” de la sesión y del plan diario no diverja por tener frases duplicadas repartidas por el módulo

## Fase 114 — Consolidación de textos semanales

- En `scripts/app/planning.js` varias descripciones de misiones semanales pasan ahora por helpers comunes
- Se han normalizado especialmente retos, práctica abierta y roadmap para que la lectura semanal no mezcle estilos distintos sin necesidad

## Fase 115 — Cobertura fina para componentes evaluables

- Reforzada `js-components` en `scripts/data/practice.js`
- Añadidos casos para respetar mayúsculas, acentos, números, espacios internos y tracks literales no habituales
- La idea es castigar soluciones que solo aciertan la estructura HTML feliz pero deforman el contrato textual de entrada

## Fase 116 — Cobertura fina para testing evaluable

- Reforzada `js-testing` en `scripts/data/practice.js`
- Añadidos casos para arrays, objetos y títulos válidos con espacio interno útil
- La idea es endurecer el contrato de validación y evitar soluciones que solo cubren strings felices o tipos triviales

## Fase 117 — Mini proyecto guiado para variables en Java

- `java-variables` ya tiene mini proyecto guiado propio
- El foco está en tipos básicos, nombres con intención, salida legible y un dato derivado simple
- La idea es cerrar mejor la base de Java antes de seguir subiendo a métodos, control y arrays

## Fase 119 — Más densidad para colecciones en Java

- Reforzada la práctica guiada de `java-collections` en `scripts/data/practice.js`
- Añadidos casos recomendados sobre claves ausentes, convención estable de `Map` y ausencia de XP para un lenguaje
- La idea es que colecciones no se quede en demo de `List` y `Map`, sino que empiece a tocar también contrato y consistencia de datos

## Fase 120 — Más densidad para excepciones en Java

- Reforzada la guía y el mini proyecto de `java-exceptions` en `scripts/data/practice.js`
- Añadidos casos recomendados sobre `trim()`, string vacío, `null` y contrato de descarte visible
- La idea es que excepciones no se quede en `try/catch` mecánico y empiece a tocar decisiones de contrato y normalización

## Fase 121 — Más densidad para testing en Java

- Reforzada la guía y el mini proyecto de `java-testing` en `scripts/data/practice.js`
- Añadido más foco en borde exacto, valores fuera de rango y longitud mínima útil en validadores
- La idea es que testing no se quede en ejemplo mínimo de JUnit y empiece a fijar mejor contratos y casos borde

## Fase 122 — Más densidad para Spring en Java

- Reforzada la guía y el mini proyecto de `java-spring-intro` en `scripts/data/practice.js`
- Añadido más foco en normalización de títulos, duplicados, conflicto y contrato de query params
- La idea es que Spring no se quede en estructura de capas y empiece a tocar decisiones de contrato HTTP y reglas de dominio

## Fase 123 — Más densidad para POO en Java

- Reforzada la guía y el mini proyecto de `java-oop` en `scripts/data/practice.js`
- Añadido más foco en borde exacto de reglas, páginas inválidas y contrato de libro no encontrado en la biblioteca
- La idea es que POO no se quede en ejemplo de clase mínima y empiece a fijar mejor invariantes y coordinación entre objetos

## Fase 124 — Más densidad para interfaces en Java

- Reforzada la guía y el mini proyecto de `java-inheritance` en `scripts/data/practice.js`
- Añadido más foco en mensajes vacíos, espacios exteriores, `null` y consistencia del contrato entre implementaciones
- La idea es que interfaces no se quede en polimorfismo de escaparate y empiece a fijar también decisiones estables de validación y consumo

## Fase 125 — Más densidad para métodos en Java

- Reforzada la guía y el mini proyecto de `java-methods` en `scripts/data/practice.js`
- Añadido más foco en bordes de nivel, XP negativo, parámetros inválidos y separación clara entre cálculo y formato
- La idea es que métodos no se quede en extraer lógica por estética y empiece a fijar también contratos y casos borde desde una fase temprana

## Fase 126 — Más densidad para control de flujo en Java

- Reforzada la guía y el mini proyecto de `java-control` en `scripts/data/practice.js`
- Añadido más foco en bordes de clasificación, notas fuera de rango, umbrales exactos y coherencia entre arrays paralelos
- La idea es que control de flujo no se quede en `if/else` y bucles de escaparate, sino que empiece a fijar decisiones visibles de contrato y resumen

## Fase 127 — Más densidad para arrays en Java

- Reforzada la guía y el mini proyecto de `java-arrays` en `scripts/data/practice.js`
- Añadido más foco en arrays vacíos, máximos inicializados con criterio, promedios defendibles y coherencia del recorrido por índice
- La idea es que arrays no se quede en sumar y recorrer, sino que empiece a fijar también contratos básicos y casos borde antes del salto a colecciones

## Fase 128 — Cobertura extra para fetch y DOM

- Reforzado `js-fetch-to-dom` en `scripts/data/practice.js`
- Añadidos casos para respuesta sin `items`, sustitución limpia tras lote vacío y conservación del orden útil al descartar elementos no relevantes
- La idea es cerrar mejor el contrato de recarga y evitar soluciones que solo funcionan con respuestas felices de la API

## Fase 129 — Cobertura extra para datos a DOM

- Reforzado `js-data-to-dom` en `scripts/data/practice.js`
- Añadidos casos para array vacío con limpieza de render previo y tandas mixtas con campos extra o faltantes en los elementos descartados
- La idea es cerrar mejor el contrato de filtrado y evitar soluciones que solo funcionan con lotes homogéneos y completamente felices

## Fase 130 — Cobertura extra para estados de UI

- Reforzado `js-ui-states` en `scripts/data/practice.js`
- Añadido un caso de recuperación desde respuesta incompleta hacia render válido sin arrastrar restos
- La idea es seguir cerrando transiciones frágiles entre vacío, respuesta parcial y recuperación posterior

## Fase 131 — Cobertura extra para JSON local

- Reforzado `js-json-fetch` en `scripts/data/practice.js`
- Añadidos casos para `data` sin `items` y para `stats.xp` ausente o indefinido sin romper el formato
- La idea es cerrar mejor el contrato de salida HTML ante estructuras parciales y evitar soluciones demasiado optimistas

## Fase 132 — Ruta sugerida en el banco de práctica

- El banco de práctica ahora construye una ruta sugerida de varios pasos a partir de la misma prioridad compartida que ya usaban spotlight, orden y recaídas
- El spotlight puede proponer práctica principal, consolidación y cierre o repaso, cada una con motivo y acción directa
- La idea es que el banco deje de ser solo un listado inteligente y pase a proponer una secuencia corta de trabajo real

## Fase 133 — Separación funcional de estudiar, practicar y examinarse

- La app guarda ahora un `modo de trabajo` persistido con tres frentes: `study`, `practice` y `exam`
- Se añadió un panel lateral para cambiar de frente y saltar directamente a la superficie principal de cada uno
- `Continuar ruta` ya no empuja siempre al mismo sitio: ahora respeta el frente activo para preparar mejor el rediseño posterior sin tocar aún la estructura visual grande

## Fase 118 — Cobertura extra para dashboard final

- Reforzada otra vez `js-project` en `scripts/data/practice.js`
- Añadidos casos para track desconocido, `status` pendiente sin track y `filters` nulo
- La idea es cerrar mejor el contrato del dashboard ante filtros incompletos o inesperados

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
