var learningRoot = typeof window === "undefined" ? globalThis : window;

Object.assign(learningRoot.LEARNING_DATA, {
  // Aquí viven los artefactos de práctica reales:
  // - ejercicios evaluables JS
  // - problemas guiados Java
  // - mini proyectos
  // La idea es que cada pieza de contenido sea legible por sí misma
  // cuando alguien abre este archivo para estudiar cómo está montada la app.
  exercises: {
    "js-values": exercise({
      family: "Fundamentos",
      difficulty: "Cero",
      practiceType: "Función",
      prompt: "Implementa una función pura `crearResumen(nombre, nivel, xp)` que devuelva una frase legible.",
      checklist: [
        "Declara una función llamada crearResumen.",
        "Recibe tres parámetros: nombre, nivel y xp.",
        "Devuelve un string, no hagas console.log dentro de la función.",
      ],
      starter: `function crearResumen(nombre, nivel, xp) {
  return "";
}`,
      functionName: "crearResumen",
      tests: [
        {
          label: "Construye una frase completa",
          args: ["Ana", "Base", 120],
          expected: "Ana está en Base con 120 XP.",
        },
        {
          label: "Mantiene los datos recibidos",
          args: ["Luis", "Intermedio", 245],
          expected: "Luis está en Intermedio con 245 XP.",
        },
      ],
    }),
    "js-objects": exercise({
      family: "Datos",
      difficulty: "Cero",
      practiceType: "Función",
      prompt: "Implementa `obtenerPendientes(tareas)` para devolver solo los títulos de las tareas no completadas.",
      checklist: [
        "Recibe un array de objetos tarea.",
        "Filtra por completada === false.",
        "Devuelve un array de strings con los títulos.",
      ],
      starter: `function obtenerPendientes(tareas) {
  return [];
}`,
      functionName: "obtenerPendientes",
      tests: [
        {
          label: "Filtra tareas pendientes",
          args: [[
            { title: "Repasar arrays", completada: true },
            { title: "Practicar objetos", completada: false },
            { title: "Hacer fetch", completada: false },
          ]],
          expected: ["Practicar objetos", "Hacer fetch"],
        },
        {
          label: "Devuelve array vacío si todo está completado",
          args: [[
            { title: "Variables", completada: true },
            { title: "DOM", completada: true },
          ]],
          expected: [],
        },
      ],
    }),
    "js-array-methods": exercise({
      family: "Transformación de datos",
      difficulty: "Base",
      practiceType: "Función",
      prompt: "Implementa `crearResumenTareas(tareas)` usando `filter`, `map` y `reduce`.",
      checklist: [
        "Devuelve un objeto con pendingCount, completedTitles y totalXp.",
        "pendingCount debe contar tareas no completadas.",
        "completedTitles debe contener solo títulos completados.",
        "totalXp debe sumar el xp de todas las tareas.",
      ],
      starter: `function crearResumenTareas(tareas) {
  return {
    pendingCount: 0,
    completedTitles: [],
    totalXp: 0,
  };
}`,
      functionName: "crearResumenTareas",
      tests: [
        {
          label: "Resume pendientes, completadas y XP total",
          args: [[
            { title: "Repasar arrays", done: false, xp: 20 },
            { title: "Practicar DOM", done: true, xp: 35 },
            { title: "Leer fetch", done: false, xp: 25 },
            { title: "Cerrar reto", done: true, xp: 10 },
          ]],
          expected: {
            pendingCount: 2,
            completedTitles: ["Practicar DOM", "Cerrar reto"],
            totalXp: 90,
          },
        },
        {
          label: "Funciona con arrays vacíos",
          args: [[]],
          expected: {
            pendingCount: 0,
            completedTitles: [],
            totalXp: 0,
          },
        },
      ],
    }),
    "js-render-lists": exercise({
      mode: "dom",
      family: "DOM y renderizado",
      difficulty: "Base",
      practiceType: "DOM",
      prompt: "Implementa `renderizarLessons(items)` para pintar una lista en `#lessonList` a partir de un array de objetos.",
      checklist: [
        "Recibe un array de objetos con title, language y level.",
        "Genera un `<li>` por item.",
        "Inserta el HTML dentro de `#lessonList`.",
      ],
      starterHtml: `<section>
  <h1>Lecciones</h1>
  <ul id="lessonList"></ul>
</section>`,
      starter: `function renderizarLessons(items) {
  // Convierte los datos en <li> y píntalos en #lessonList.
}`,
      functionName: "renderizarLessons",
      tests: [
        {
          label: "Pinta tantos li como items recibe",
          actions: [
            {
              type: "call",
              name: "renderizarLessons",
              args: [[
                { title: "map y filter", language: "JavaScript", level: "Base" },
                { title: "Clases y objetos", language: "Java", level: "Intermedio" },
              ]],
            },
          ],
          assertions: [
            { type: "count", selector: "#lessonList li", expected: 2 },
            { type: "text", selector: "#lessonList li:first-child", expected: "map y filter | JavaScript | Base" },
          ],
        },
        {
          label: "Deja la lista vacía si no hay datos",
          actions: [
            {
              type: "call",
              name: "renderizarLessons",
              args: [[]],
            },
          ],
          assertions: [
            { type: "count", selector: "#lessonList li", expected: 0 },
          ],
        },
      ],
    }),
    "js-dom": exercise({
      mode: "dom",
      family: "DOM y eventos",
      difficulty: "Base",
      practiceType: "DOM",
      prompt: "Implementa `conectarContador()` para enlazar los botones con el contador del HTML de prueba.",
      checklist: [
        "Selecciona contador y botones desde el DOM.",
        "Incrementa el texto del contador al pulsar sumar.",
        "Reinicia a 0 al pulsar reset.",
      ],
      starterHtml: `<section>
  <h1>Contador de XP</h1>
  <p>XP actual: <strong id="contador">0</strong></p>
  <button id="sumar" type="button">Sumar</button>
  <button id="reset" type="button">Reset</button>
</section>`,
      starter: `function conectarContador() {
  // Selecciona los elementos y conecta los eventos.
}`,
      functionName: "conectarContador",
      tests: [
        {
          label: "Incrementa el contador",
          actions: [
            { type: "call", name: "conectarContador" },
            { type: "click", selector: "#sumar" },
          ],
          assertion: { type: "text", selector: "#contador" },
          expected: "1",
        },
        {
          label: "Reinicia el contador",
          actions: [
            { type: "call", name: "conectarContador" },
            { type: "click", selector: "#sumar" },
            { type: "click", selector: "#sumar" },
            { type: "click", selector: "#reset" },
          ],
          assertion: { type: "text", selector: "#contador" },
          expected: "0",
        },
      ],
    }),
    "js-forms": exercise({
      mode: "dom",
      family: "Formularios",
      difficulty: "Base",
      practiceType: "DOM",
      prompt: "Implementa `activarFormularioTarea()` para validar el título y pintar un mensaje en pantalla.",
      checklist: [
        "Escucha el evento submit del formulario.",
        "Impide el submit real con preventDefault().",
        "Muestra un mensaje de error o confirmación en #feedback.",
      ],
      starterHtml: `<section>
  <form id="taskForm">
    <label for="taskTitle">Título</label>
    <input id="taskTitle" name="title" type="text">
    <button type="submit">Guardar</button>
  </form>
  <p id="feedback"></p>
</section>`,
      starter: `function activarFormularioTarea() {
  // Conecta el formulario y pinta mensajes en #feedback.
}`,
      functionName: "activarFormularioTarea",
      tests: [
        {
          label: "Bloquea títulos vacíos",
          actions: [
            { type: "call", name: "activarFormularioTarea" },
            { type: "set-value", selector: "#taskTitle", value: "   " },
            { type: "submit", selector: "#taskForm" },
          ],
          assertion: { type: "text", selector: "#feedback" },
          expected: "El título es obligatorio.",
        },
        {
          label: "Acepta títulos válidos",
          actions: [
            { type: "call", name: "activarFormularioTarea" },
            { type: "set-value", selector: "#taskTitle", value: "Practicar fetch" },
            { type: "submit", selector: "#taskForm" },
          ],
          assertion: { type: "text", selector: "#feedback" },
          expected: "Tarea guardada: Practicar fetch",
        },
      ],
    }),
    "js-async": exercise({
      family: "Asincronía",
      difficulty: "Intermedio",
      practiceType: "Async",
      prompt: "Implementa `cargarResumen(fetchItems)` para esperar datos asíncronos y devolver un resumen útil.",
      checklist: [
        "La función debe ser async.",
        "Espera los datos llamando a fetchItems().",
        "Lee `items` desde el resultado.",
        "Devuelve un objeto con `total`, `pendingCount` y `pendingTitles`.",
      ],
      starter: `async function cargarResumen(fetchItems) {
  return {
    total: 0,
    pendingCount: 0,
    pendingTitles: [],
  };
}`,
      functionName: "cargarResumen",
      tests: [
        {
          label: "Espera datos y resume las tareas pendientes",
          args: [async () => ({
            items: [
              { title: "Repasar arrays", done: false },
              { title: "Practicar fetch", done: true },
              { title: "Montar preview DOM", done: false },
            ],
          })],
          expected: {
            total: 3,
            pendingCount: 2,
            pendingTitles: ["Repasar arrays", "Montar preview DOM"],
          },
        },
        {
          label: "Funciona si todo está completado",
          args: [async () => ({
            items: [
              { title: "Variables", done: true },
              { title: "DOM", done: true },
            ],
          })],
          expected: {
            total: 2,
            pendingCount: 0,
            pendingTitles: [],
          },
        },
        {
          label: "Conserva el orden original de las tareas pendientes",
          args: [async () => ({
            items: [
              { title: "Primera pendiente", done: false },
              { title: "Completada", done: true },
              { title: "Segunda pendiente", done: false },
              { title: "Tercera pendiente", done: false },
            ],
          })],
          expected: {
            total: 4,
            pendingCount: 3,
            pendingTitles: ["Primera pendiente", "Segunda pendiente", "Tercera pendiente"],
          },
        },
        {
          label: "Devuelve resumen vacío si items viene vacío",
          args: [async () => ({
            items: [],
          })],
          expected: {
            total: 0,
            pendingCount: 0,
            pendingTitles: [],
          },
        },
        {
          label: "Tolera respuestas sin items y devuelve un resumen vacío",
          args: [async () => ({
            meta: { source: "local" },
          })],
          expected: {
            total: 0,
            pendingCount: 0,
            pendingTitles: [],
          },
        },
      ],
    }),
    "js-state": exercise({
      mode: "dom",
      family: "Estado y UI",
      difficulty: "Intermedio",
      practiceType: "DOM",
      prompt: "Implementa `renderizarTareas(tareas)` para pintar items en pantalla y mostrar cuántas quedan pendientes.",
      checklist: [
        "Recibe un array de objetos tarea.",
        "Pinta un `<li>` por cada tarea dentro de `#taskList`.",
        "Actualiza `#taskCount` con el número de tareas pendientes.",
      ],
      starterHtml: `<section>
  <h1>Tablero de tareas</h1>
  <ul id="taskList"></ul>
  <p id="taskCount">Pendientes: 0</p>
</section>`,
      starter: `function renderizarTareas(tareas) {
  // Pinta la lista y actualiza el contador.
}`,
      functionName: "renderizarTareas",
      tests: [
        {
          label: "Pinta una tarea por item y cuenta pendientes",
          actions: [
            {
              type: "call",
              name: "renderizarTareas",
              args: [[
                { title: "Repasar arrays", completada: false },
                { title: "Practicar fetch", completada: true },
                { title: "Preparar proyecto", completada: false },
              ]],
            },
          ],
          assertions: [
            { type: "count", selector: "#taskList li", expected: 3 },
            { type: "text", selector: "#taskCount", expected: "Pendientes: 2" },
            { type: "text", selector: "#taskList li:first-child", expected: "Repasar arrays" },
          ],
        },
        {
          label: "Muestra cero pendientes si todo está hecho",
          actions: [
            {
              type: "call",
              name: "renderizarTareas",
              args: [[
                { title: "Variables", completada: true },
                { title: "DOM", completada: true },
              ]],
            },
          ],
          assertions: [
            { type: "count", selector: "#taskList li", expected: 2 },
            { type: "text", selector: "#taskCount", expected: "Pendientes: 0" },
          ],
        },
        {
          label: "Sustituye tareas anteriores al volver a renderizar",
          actions: [
            {
              type: "call",
              name: "renderizarTareas",
              args: [[
                { title: "Repasar arrays", completada: false },
                { title: "Practicar fetch", completada: true },
              ]],
            },
            {
              type: "call",
              name: "renderizarTareas",
              args: [[
                { title: "Estado local", completada: false },
              ]],
            },
          ],
          assertions: [
            { type: "count", selector: "#taskList li", expected: 1 },
            { type: "text", selector: "#taskList li:first-child", expected: "Estado local" },
            { type: "text", selector: "#taskCount", expected: "Pendientes: 1" },
          ],
        },
      ],
    }),
    "js-data-to-dom": exercise({
      mode: "dom",
      family: "Datos a interfaz",
      difficulty: "Intermedio",
      practiceType: "DOM",
      prompt: "Implementa `renderizarItemsVisibles(items)` para filtrar, transformar y pintar solo los items visibles dentro de `#resultList`.",
      checklist: [
        "Filtra solo items con visible === true.",
        "Genera un `<li>` por item usando title, language y level.",
        "Inserta el resultado en `#resultList` con innerHTML.",
      ],
      starterHtml: `<section>
  <h1>Items visibles</h1>
  <ul id="resultList"></ul>
</section>`,
      starter: `function renderizarItemsVisibles(items) {
  // Filtra, transforma y pinta en #resultList.
}`,
      functionName: "renderizarItemsVisibles",
      tests: [
        {
          label: "Pinta solo los visibles",
          actions: [
            {
              type: "call",
              name: "renderizarItemsVisibles",
              args: [[
                { title: "map y filter", language: "JavaScript", level: "Base", visible: true },
                { title: "Clases y objetos", language: "Java", level: "Intermedio", visible: false },
                { title: "JSON local", language: "JavaScript", level: "Intermedio", visible: true },
              ]],
            },
          ],
          assertions: [
            { type: "count", selector: "#resultList li", expected: 2 },
            { type: "text", selector: "#resultList li:first-child", expected: "map y filter | JavaScript | Base" },
            { type: "text", selector: "#resultList li:last-child", expected: "JSON local | JavaScript | Intermedio" },
          ],
        },
        {
          label: "Deja la lista vacía si nada es visible",
          actions: [
            {
              type: "call",
              name: "renderizarItemsVisibles",
              args: [[
                { title: "Spring", language: "Java", level: "Avanzado", visible: false },
              ]],
            },
          ],
          assertions: [
            { type: "count", selector: "#resultList li", expected: 0 },
          ],
        },
        {
          label: "Limpia resultados viejos al volver a renderizar con un solo visible",
          actions: [
            {
              type: "call",
              name: "renderizarItemsVisibles",
              args: [[
                { title: "map y filter", language: "JavaScript", level: "Base", visible: true },
                { title: "JSON local", language: "JavaScript", level: "Intermedio", visible: true },
              ]],
            },
            {
              type: "call",
              name: "renderizarItemsVisibles",
              args: [[
                { title: "Spring", language: "Java", level: "Avanzado", visible: false },
                { title: "Estado local", language: "JavaScript", level: "Intermedio", visible: true },
              ]],
            },
          ],
          assertions: [
            { type: "count", selector: "#resultList li", expected: 1 },
            { type: "text", selector: "#resultList li:first-child", expected: "Estado local | JavaScript | Intermedio" },
          ],
        },
        {
          label: "Mantiene el orden de visibles al renderizar una segunda tanda válida",
          actions: [
            {
              type: "call",
              name: "renderizarItemsVisibles",
              args: [[
                { title: "Spring", language: "Java", level: "Avanzado", visible: false },
              ]],
            },
            {
              type: "call",
              name: "renderizarItemsVisibles",
              args: [[
                { title: "Estado local", language: "JavaScript", level: "Intermedio", visible: true },
                { title: "DOM", language: "JavaScript", level: "Base", visible: true },
              ]],
            },
          ],
          assertions: [
            { type: "count", selector: "#resultList li", expected: 2 },
            { type: "text", selector: "#resultList li:first-child", expected: "Estado local | JavaScript | Intermedio" },
            { type: "text", selector: "#resultList li:last-child", expected: "DOM | JavaScript | Base" },
          ],
        },
        {
          label: "Puede vaciar la lista tras haber pintado varios visibles antes",
          actions: [
            {
              type: "call",
              name: "renderizarItemsVisibles",
              args: [[
                { title: "map y filter", language: "JavaScript", level: "Base", visible: true },
                { title: "JSON local", language: "JavaScript", level: "Intermedio", visible: true },
              ]],
            },
            {
              type: "call",
              name: "renderizarItemsVisibles",
              args: [[
                { title: "Colecciones", language: "Java", level: "Intermedio", visible: false },
                { title: "Spring", language: "Java", level: "Avanzado", visible: false },
              ]],
            },
          ],
          assertions: [
            { type: "count", selector: "#resultList li", expected: 0 },
          ],
        },
        {
          label: "Ignora invisibles intercalados y conserva el orden de los visibles",
          actions: [
            {
              type: "call",
              name: "renderizarItemsVisibles",
              args: [[
                { title: "Arrays", language: "JavaScript", level: "Base", visible: true },
                { title: "POO", language: "Java", level: "Intermedio", visible: false },
                { title: "Fetch", language: "JavaScript", level: "Intermedio", visible: true },
                { title: "Spring", language: "Java", level: "Avanzado", visible: false },
              ]],
            },
          ],
          assertions: [
            { type: "count", selector: "#resultList li", expected: 2 },
            { type: "text", selector: "#resultList li:first-child", expected: "Arrays | JavaScript | Base" },
            { type: "text", selector: "#resultList li:last-child", expected: "Fetch | JavaScript | Intermedio" },
          ],
        },
        {
          label: "Sustituye una tanda mixta por otra sin arrastrar visibles previos",
          actions: [
            {
              type: "call",
              name: "renderizarItemsVisibles",
              args: [[
                { title: "Arrays", language: "JavaScript", level: "Base", visible: true, tags: ["arrays"] },
                { title: "POO", language: "Java", level: "Intermedio", visible: false, tags: ["oop"] },
                { title: "Fetch", language: "JavaScript", level: "Intermedio", visible: true, tags: ["async"] },
              ]],
            },
            {
              type: "call",
              name: "renderizarItemsVisibles",
              args: [[
                { title: "Testing", language: "JavaScript", level: "Avanzado", visible: true, tags: ["tests"] },
                { title: "Spring", language: "Java", level: "Avanzado", visible: false, tags: ["api"] },
              ]],
            },
          ],
          assertions: [
            { type: "count", selector: "#resultList li", expected: 1 },
            { type: "text", selector: "#resultList li:first-child", expected: "Testing | JavaScript | Avanzado" },
          ],
        },
        {
          label: "Ignora metadatos extra y pinta solo la forma pedida",
          actions: [
            {
              type: "call",
              name: "renderizarItemsVisibles",
              args: [[
                {
                  title: "Eventos",
                  language: "JavaScript",
                  level: "Intermedio",
                  visible: true,
                  tags: ["dom", "events"],
                  stats: { xp: 90 },
                },
                {
                  title: "Colecciones",
                  language: "Java",
                  level: "Intermedio",
                  visible: false,
                  tags: ["collections"],
                  stats: { xp: 80 },
                },
              ]],
            },
          ],
          assertions: [
            { type: "count", selector: "#resultList li", expected: 1 },
            { type: "text", selector: "#resultList li:first-child", expected: "Eventos | JavaScript | Intermedio" },
          ],
        },
      ],
    }),
    "js-json-to-dom": exercise({
      mode: "dom",
      family: "JSON y DOM",
      difficulty: "Intermedio",
      practiceType: "DOM",
      prompt: "Implementa `renderizarDestacados(data)` para leer `data.items`, filtrar solo los featured y pintarlos en `#featuredList`.",
      checklist: [
        "Lee `data.items` desde el objeto recibido.",
        "Filtra solo los items con featured === true.",
        "Pinta title, language y level dentro de `<li>` en `#featuredList`.",
      ],
      starterHtml: `<section>
  <h1>Items destacados</h1>
  <ul id="featuredList"></ul>
</section>`,
      starter: `function renderizarDestacados(data) {
  // Lee data.items, filtra los destacados y píntalos en #featuredList.
}`,
      functionName: "renderizarDestacados",
      tests: [
        {
          label: "Pinta solo los featured",
          actions: [
            {
              type: "call",
              name: "renderizarDestacados",
              args: [{
                items: [
                  { title: "map y filter", language: "JavaScript", level: "Base", featured: true },
                  { title: "Clases y objetos", language: "Java", level: "Intermedio", featured: false },
                  { title: "JSON local", language: "JavaScript", level: "Intermedio", featured: true },
                ],
              }],
            },
          ],
          assertions: [
            { type: "count", selector: "#featuredList li", expected: 2 },
            { type: "text", selector: "#featuredList li:first-child", expected: "map y filter | JavaScript | Base" },
          ],
        },
        {
          label: "No pinta nada si ningún item es featured",
          actions: [
            {
              type: "call",
              name: "renderizarDestacados",
              args: [{
                items: [
                  { title: "Spring", language: "Java", level: "Avanzado", featured: false },
                ],
              }],
            },
          ],
          assertions: [
            { type: "count", selector: "#featuredList li", expected: 0 },
          ],
        },
        {
          label: "Reemplaza resultados anteriores si el siguiente lote no tiene featured",
          actions: [
            {
              type: "call",
              name: "renderizarDestacados",
              args: [{
                items: [
                  { title: "map y filter", language: "JavaScript", level: "Base", featured: true },
                ],
              }],
            },
            {
              type: "call",
              name: "renderizarDestacados",
              args: [{
                items: [
                  { title: "Spring", language: "Java", level: "Avanzado", featured: false },
                ],
              }],
            },
          ],
          assertions: [
            { type: "count", selector: "#featuredList li", expected: 0 },
          ],
        },
        {
          label: "Sustituye una lista anterior por nuevos destacados manteniendo el orden",
          actions: [
            {
              type: "call",
              name: "renderizarDestacados",
              args: [{
                items: [
                  { title: "map y filter", language: "JavaScript", level: "Base", featured: true },
                ],
              }],
            },
            {
              type: "call",
              name: "renderizarDestacados",
              args: [{
                items: [
                  { title: "Testing", language: "JavaScript", level: "Avanzado", featured: true },
                  { title: "Colecciones", language: "Java", level: "Intermedio", featured: true },
                ],
              }],
            },
          ],
          assertions: [
            { type: "count", selector: "#featuredList li", expected: 2 },
            { type: "text", selector: "#featuredList li:first-child", expected: "Testing | JavaScript | Avanzado" },
            { type: "text", selector: "#featuredList li:last-child", expected: "Colecciones | Java | Intermedio" },
          ],
        },
        {
          label: "Vuelve a vaciar la lista si después de varios destacados ya no queda ninguno",
          actions: [
            {
              type: "call",
              name: "renderizarDestacados",
              args: [{
                items: [
                  { title: "Testing", language: "JavaScript", level: "Avanzado", featured: true },
                  { title: "Colecciones", language: "Java", level: "Intermedio", featured: true },
                ],
              }],
            },
            {
              type: "call",
              name: "renderizarDestacados",
              args: [{
                items: [
                  { title: "Spring", language: "Java", level: "Avanzado", featured: false },
                ],
              }],
            },
          ],
          assertions: [
            { type: "count", selector: "#featuredList li", expected: 0 },
          ],
        },
        {
          label: "Filtra destacados entre items mixtos y conserva su orden original",
          actions: [
            {
              type: "call",
              name: "renderizarDestacados",
              args: [{
                items: [
                  { title: "Testing", language: "JavaScript", level: "Avanzado", featured: true },
                  { title: "POO", language: "Java", level: "Intermedio", featured: false },
                  { title: "DOM", language: "JavaScript", level: "Base", featured: true },
                  { title: "Colecciones", language: "Java", level: "Intermedio", featured: false },
                ],
              }],
            },
          ],
          assertions: [
            { type: "count", selector: "#featuredList li", expected: 2 },
            { type: "text", selector: "#featuredList li:first-child", expected: "Testing | JavaScript | Avanzado" },
            { type: "text", selector: "#featuredList li:last-child", expected: "DOM | JavaScript | Base" },
          ],
        },
        {
          label: "Sustituye un lote destacado anterior por otro distinto sin residuos",
          actions: [
            {
              type: "call",
              name: "renderizarDestacados",
              args: [{
                items: [
                  { title: "Testing", language: "JavaScript", level: "Avanzado", featured: true, stats: { xp: 100 } },
                  { title: "DOM", language: "JavaScript", level: "Base", featured: true, stats: { xp: 40 } },
                ],
              }],
            },
            {
              type: "call",
              name: "renderizarDestacados",
              args: [{
                items: [
                  { title: "Colecciones", language: "Java", level: "Intermedio", featured: true, stats: { xp: 85 } },
                ],
              }],
            },
          ],
          assertions: [
            { type: "count", selector: "#featuredList li", expected: 1 },
            { type: "text", selector: "#featuredList li:first-child", expected: "Colecciones | Java | Intermedio" },
          ],
        },
        {
          label: "Ignora metadatos adicionales y mantiene solo el render pedido",
          actions: [
            {
              type: "call",
              name: "renderizarDestacados",
              args: [{
                items: [
                  {
                    title: "APIs",
                    language: "JavaScript",
                    level: "Avanzado",
                    featured: true,
                    tags: ["http", "json"],
                    stats: { xp: 120 },
                  },
                  {
                    title: "Spring",
                    language: "Java",
                    level: "Avanzado",
                    featured: false,
                    tags: ["api"],
                    stats: { xp: 140 },
                  },
                ],
              }],
            },
          ],
          assertions: [
            { type: "count", selector: "#featuredList li", expected: 1 },
            { type: "text", selector: "#featuredList li:first-child", expected: "APIs | JavaScript | Avanzado" },
          ],
        },
      ],
    }),
    "js-fetch-to-dom": exercise({
      mode: "dom",
      family: "Asincronía y DOM",
      difficulty: "Intermedio",
      practiceType: "Async",
      prompt: "Implementa `cargarYRenderizar(fetchItems)` para esperar datos asíncronos, filtrar solo JavaScript y pintarlos en `#fetchList`.",
      checklist: [
        "La función debe ser async.",
        "Espera los datos llamando a fetchItems().",
        "Pinta en `#fetchList` solo items con language === \"JavaScript\".",
      ],
      starterHtml: `<section>
  <h1>Items cargados</h1>
  <ul id="fetchList"></ul>
</section>`,
      starter: `async function cargarYRenderizar(fetchItems) {
  // Espera los datos, filtra JavaScript y pinta en #fetchList.
}`,
      functionName: "cargarYRenderizar",
      tests: [
        {
          label: "Espera datos y pinta solo JavaScript",
          actions: [
            {
              type: "call",
              name: "cargarYRenderizar",
              args: [async () => ({
                items: [
                  { title: "map y filter", language: "JavaScript", level: "Base" },
                  { title: "Clases y objetos", language: "Java", level: "Intermedio" },
                  { title: "JSON local", language: "JavaScript", level: "Intermedio" },
                ],
              })],
            },
          ],
          assertions: [
            { type: "count", selector: "#fetchList li", expected: 2 },
            { type: "text", selector: "#fetchList li:first-child", expected: "map y filter | Base" },
            { type: "text", selector: "#fetchList li:last-child", expected: "JSON local | Intermedio" },
          ],
        },
        {
          label: "Deja la lista vacía si no hay items JavaScript",
          actions: [
            {
              type: "call",
              name: "cargarYRenderizar",
              args: [async () => ({
                items: [
                  { title: "Clases y objetos", language: "Java", level: "Intermedio" },
                  { title: "Colecciones", language: "Java", level: "Intermedio" },
                ],
              })],
            },
          ],
          assertions: [
            { type: "count", selector: "#fetchList li", expected: 0 },
          ],
        },
        {
          label: "Limpia resultados anteriores si la siguiente carga no trae JavaScript",
          actions: [
            {
              type: "call",
              name: "cargarYRenderizar",
              args: [async () => ({
                items: [
                  { title: "map y filter", language: "JavaScript", level: "Base" },
                ],
              })],
            },
            {
              type: "call",
              name: "cargarYRenderizar",
              args: [async () => ({
                items: [
                  { title: "Colecciones", language: "Java", level: "Intermedio" },
                ],
              })],
            },
          ],
          assertions: [
            { type: "count", selector: "#fetchList li", expected: 0 },
          ],
        },
        {
          label: "Sustituye la lista anterior cuando llega una segunda carga válida",
          actions: [
            {
              type: "call",
              name: "cargarYRenderizar",
              args: [async () => ({
                items: [
                  { title: "map y filter", language: "JavaScript", level: "Base" },
                  { title: "JSON local", language: "JavaScript", level: "Intermedio" },
                ],
              })],
            },
            {
              type: "call",
              name: "cargarYRenderizar",
              args: [async () => ({
                items: [
                  { title: "Estado local", language: "JavaScript", level: "Intermedio" },
                ],
              })],
            },
          ],
          assertions: [
            { type: "count", selector: "#fetchList li", expected: 1 },
            { type: "text", selector: "#fetchList li:first-child", expected: "Estado local | Intermedio" },
          ],
        },
        {
          label: "Mantiene el orden recibido al recargar con varios items JavaScript",
          actions: [
            {
              type: "call",
              name: "cargarYRenderizar",
              args: [async () => ({
                items: [
                  { title: "Colecciones", language: "Java", level: "Intermedio" },
                ],
              })],
            },
            {
              type: "call",
              name: "cargarYRenderizar",
              args: [async () => ({
                items: [
                  { title: "Async", language: "JavaScript", level: "Intermedio" },
                  { title: "DOM", language: "JavaScript", level: "Base" },
                ],
              })],
            },
          ],
          assertions: [
            { type: "count", selector: "#fetchList li", expected: 2 },
            { type: "text", selector: "#fetchList li:first-child", expected: "Async | Intermedio" },
            { type: "text", selector: "#fetchList li:last-child", expected: "DOM | Base" },
          ],
        },
        {
          label: "Recupera la lista tras una carga vacía y vuelve a pintar sin residuos",
          actions: [
            {
              type: "call",
              name: "cargarYRenderizar",
              args: [async () => ({
                items: [
                  { title: "Colecciones", language: "Java", level: "Intermedio" },
                ],
              })],
            },
            {
              type: "call",
              name: "cargarYRenderizar",
              args: [async () => ({
                items: [
                  { title: "Fetch local", language: "JavaScript", level: "Intermedio" },
                  { title: "Estado UI", language: "JavaScript", level: "Avanzado" },
                ],
              })],
            },
          ],
          assertions: [
            { type: "count", selector: "#fetchList li", expected: 2 },
            { type: "text", selector: "#fetchList li:first-child", expected: "Fetch local | Intermedio" },
            { type: "text", selector: "#fetchList li:last-child", expected: "Estado UI | Avanzado" },
          ],
        },
      ],
    }),
    "js-ui-states": exercise({
      mode: "dom",
      family: "Asincronía y DOM",
      difficulty: "Intermedio",
      practiceType: "Async",
      prompt: "Implementa `cargarCursos(fetchItems)` para gestionar carga, vacío y error en la interfaz.",
      checklist: [
        "Muestra `Cargando...` al empezar.",
        "Si no hay items, deja `#courseList` vacía y muestra `No hay resultados.`.",
        "Si todo va bien, pinta `<li>` con `title | level` y muestra `Resultados listos.`.",
        "Si falla la carga, muestra `No se pudieron cargar los cursos.`.",
      ],
      starterHtml: `<section>
  <p id="status">Sin cargar</p>
  <ul id="courseList"></ul>
</section>`,
      starter: `async function cargarCursos(fetchItems) {
  const status = document.querySelector("#status");
  const list = document.querySelector("#courseList");

  // Gestiona carga, exito, vacio y error.
}`,
      functionName: "cargarCursos",
      tests: [
        {
          label: "Pinta resultados al cargar datos",
          actions: [
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({
                items: [
                  { title: "map y filter", level: "Base" },
                  { title: "Estado local", level: "Intermedio" },
                ],
              })],
            },
          ],
          assertions: [
            { type: "text", selector: "#status", expected: "Resultados listos." },
            { type: "count", selector: "#courseList li", expected: 2 },
            { type: "text", selector: "#courseList li:first-child", expected: "map y filter | Base" },
          ],
        },
        {
          label: "Muestra estado vacio si no llegan items",
          actions: [
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({ items: [] })],
            },
          ],
          assertions: [
            { type: "text", selector: "#status", expected: "No hay resultados." },
            { type: "count", selector: "#courseList li", expected: 0 },
          ],
        },
        {
          label: "Muestra error si la carga falla",
          actions: [
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({
                items: [
                  { title: "map y filter", level: "Base" },
                ],
              })],
            },
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => { throw new Error("fallo de red"); }],
            },
          ],
          assertions: [
            { type: "text", selector: "#status", expected: "No se pudieron cargar los cursos." },
            { type: "count", selector: "#courseList li", expected: 0 },
          ],
        },
        {
          label: "Se recupera tras un error y vuelve a pintar resultados válidos",
          actions: [
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => { throw new Error("fallo de red"); }],
            },
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({
                items: [
                  { title: "Estado local", level: "Intermedio" },
                ],
              })],
            },
          ],
          assertions: [
            { type: "text", selector: "#status", expected: "Resultados listos." },
            { type: "count", selector: "#courseList li", expected: 1 },
            { type: "text", selector: "#courseList li:first-child", expected: "Estado local | Intermedio" },
          ],
        },
        {
          label: "Sustituye una lista anterior por estado vacio en la siguiente carga",
          actions: [
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({
                items: [
                  { title: "map y filter", level: "Base" },
                  { title: "Estado local", level: "Intermedio" },
                ],
              })],
            },
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({ items: [] })],
            },
          ],
          assertions: [
            { type: "text", selector: "#status", expected: "No hay resultados." },
            { type: "count", selector: "#courseList li", expected: 0 },
          ],
        },
        {
          label: "Sustituye resultados anteriores cuando llega una segunda carga válida",
          actions: [
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({
                items: [
                  { title: "map y filter", level: "Base" },
                  { title: "Estado local", level: "Intermedio" },
                ],
              })],
            },
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({
                items: [
                  { title: "Testing", level: "Avanzado" },
                ],
              })],
            },
          ],
          assertions: [
            { type: "text", selector: "#status", expected: "Resultados listos." },
            { type: "count", selector: "#courseList li", expected: 1 },
            { type: "text", selector: "#courseList li:first-child", expected: "Testing | Avanzado" },
          ],
        },
        {
          label: "Puede pasar de error a vacío sin dejar resultados antiguos",
          actions: [
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({
                items: [
                  { title: "map y filter", level: "Base" },
                ],
              })],
            },
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => { throw new Error("fallo de red"); }],
            },
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({ items: [] })],
            },
          ],
          assertions: [
            { type: "text", selector: "#status", expected: "No hay resultados." },
            { type: "count", selector: "#courseList li", expected: 0 },
          ],
        },
        {
          label: "Trata respuestas sin items como estado vacío",
          actions: [
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({
                meta: { source: "local" },
              })],
            },
          ],
          assertions: [
            { type: "text", selector: "#status", expected: "No hay resultados." },
            { type: "count", selector: "#courseList li", expected: 0 },
          ],
        },
        {
          label: "Se recupera tras vacío y vuelve a pintar en el orden recibido",
          actions: [
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({ items: [] })],
            },
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({
                items: [
                  { title: "Async", level: "Intermedio" },
                  { title: "Testing", level: "Avanzado" },
                ],
              })],
            },
          ],
          assertions: [
            { type: "text", selector: "#status", expected: "Resultados listos." },
            { type: "count", selector: "#courseList li", expected: 2 },
            { type: "text", selector: "#courseList li:first-child", expected: "Async | Intermedio" },
            { type: "text", selector: "#courseList li:last-child", expected: "Testing | Avanzado" },
          ],
        },
        {
          label: "Limpia un error anterior aunque la siguiente carga también venga sin items",
          actions: [
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({
                items: [
                  { title: "map y filter", level: "Base" },
                ],
              })],
            },
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => { throw new Error("fallo de red"); }],
            },
            {
              type: "call",
              name: "cargarCursos",
              args: [async () => ({
                meta: { retry: true },
              })],
            },
          ],
          assertions: [
            { type: "text", selector: "#status", expected: "No hay resultados." },
            { type: "count", selector: "#courseList li", expected: 0 },
          ],
        },
      ],
    }),
    "js-json-fetch": exercise({
      family: "JSON y utilidades",
      difficulty: "Intermedio",
      practiceType: "Función",
      prompt: "Implementa `crearItemsHtml(data)` para recorrer `data.items` y devolver una cadena con varios `<li>`.",
      checklist: [
        "Lee `data.items`.",
        "Usa title, language, level, tags y stats.xp.",
        "Devuelve un string HTML con un `<li>` por item.",
        "Mantén un formato estable aunque falten tags o XP.",
      ],
      starter: `function crearItemsHtml(data) {
  return "";
}`,
      functionName: "crearItemsHtml",
      tests: [
        {
          label: "Pinta todos los items del array",
          args: [{
            course: "Solo Learn",
            items: [
              {
                title: "Variables",
                language: "JavaScript",
                level: "Cero",
                tags: ["variables", "funciones"],
                stats: { xp: 40 },
              },
              {
                title: "Fetch local",
                language: "JavaScript",
                level: "Intermedio",
                tags: ["fetch", "json"],
                stats: { xp: 95 },
              },
            ],
          }],
          expected:
            "<li>Variables | JavaScript | Cero | variables, funciones | 40 XP</li><li>Fetch local | JavaScript | Intermedio | fetch, json | 95 XP</li>",
          compare: "html",
        },
        {
          label: "Devuelve cadena vacía si no hay items",
          args: [{
            course: "Solo Learn",
            items: [],
          }],
          expected: "",
          compare: "html",
        },
        {
          label: "Mantiene el orden original y soporta tags vacíos",
          args: [{
            course: "Solo Learn",
            items: [
              {
                title: "Estados UI",
                language: "JavaScript",
                level: "Intermedio",
                tags: [],
                stats: { xp: 70 },
              },
              {
                title: "Testing",
                language: "JavaScript",
                level: "Avanzado",
                tags: ["tests"],
                stats: { xp: 110 },
              },
            ],
          }],
          expected:
            "<li>Estados UI | JavaScript | Intermedio |  | 70 XP</li><li>Testing | JavaScript | Avanzado | tests | 110 XP</li>",
          compare: "html",
        },
        {
          label: "Conserva XP 0 y varias tags sin alterar el formato",
          args: [{
            course: "Solo Learn",
            items: [
              {
                title: "Primeros pasos",
                language: "JavaScript",
                level: "Cero",
                tags: ["inicio", "setup", "variables"],
                stats: { xp: 0 },
              },
            ],
          }],
          expected:
            "<li>Primeros pasos | JavaScript | Cero | inicio, setup, variables | 0 XP</li>",
          compare: "html",
        },
        {
          label: "Soporta tags ausentes y usa 0 XP si faltan stats",
          args: [{
            course: "Solo Learn",
            items: [
              {
                title: "Spring intro",
                language: "Java",
                level: "Avanzado",
              },
            ],
          }],
          expected:
            "<li>Spring intro | Java | Avanzado |  | 0 XP</li>",
          compare: "html",
        },
        {
          label: "Mantiene el orden aunque mezcle lenguajes y formatos distintos",
          args: [{
            course: "Solo Learn",
            items: [
              {
                title: "Objetos",
                language: "JavaScript",
                level: "Cero",
                tags: ["objetos"],
                stats: { xp: 45 },
              },
              {
                title: "Colecciones",
                language: "Java",
                level: "Intermedio",
                tags: [],
                stats: { xp: 90 },
              },
            ],
          }],
          expected:
            "<li>Objetos | JavaScript | Cero | objetos | 45 XP</li><li>Colecciones | Java | Intermedio |  | 90 XP</li>",
          compare: "html",
        },
        {
          label: "Tolera items sin objeto stats pero con tags vacías",
          args: [{
            course: "Solo Learn",
            items: [
              {
                title: "UI states",
                language: "JavaScript",
                level: "Intermedio",
                tags: [],
              },
            ],
          }],
          expected:
            "<li>UI states | JavaScript | Intermedio |  | 0 XP</li>",
          compare: "html",
        },
        {
          label: "Tolera items sin tags pero con stats parciales y mantiene el formato",
          args: [{
            course: "Solo Learn",
            items: [
              {
                title: "Arquitectura modular",
                language: "JavaScript",
                level: "Avanzado",
                stats: {},
              },
            ],
          }],
          expected:
            "<li>Arquitectura modular | JavaScript | Avanzado |  | 0 XP</li>",
          compare: "html",
        },
        {
          label: "Soporta mezclar xp 0, stats ausentes y tags largas sin reordenar items",
          args: [{
            course: "Solo Learn",
            items: [
              {
                title: "Primer render",
                language: "JavaScript",
                level: "Base",
                tags: ["dom", "listas"],
                stats: { xp: 0 },
              },
              {
                title: "DTOs",
                language: "Java",
                level: "Avanzado",
              },
              {
                title: "Panel semanal",
                language: "JavaScript",
                level: "Avanzado",
                tags: ["plan", "ritmo", "repaso"],
                stats: { xp: 130 },
              },
            ],
          }],
          expected:
            "<li>Primer render | JavaScript | Base | dom, listas | 0 XP</li><li>DTOs | Java | Avanzado |  | 0 XP</li><li>Panel semanal | JavaScript | Avanzado | plan, ritmo, repaso | 130 XP</li>",
          compare: "html",
        },
      ],
    }),
    "js-modules": exercise({
      family: "Arquitectura y modulos",
      difficulty: "Intermedio",
      practiceType: "Función",
      prompt: "Implementa `clasificarArchivosFrontend(files)` para agrupar rutas por responsabilidad.",
      checklist: [
        "Recibe un array de strings con rutas de archivo.",
        "Devuelve un objeto con `app`, `data`, `styles` y `misc`.",
        "Mete en `app` las rutas que empiezan por `scripts/app/`.",
        "Mete en `data` las rutas que empiezan por `scripts/data/` o `data/`.",
        "Mete en `styles` las rutas que empiezan por `styles/`.",
        "El resto va a `misc`.",
      ],
      starter: `function clasificarArchivosFrontend(files) {
  return {
    app: [],
    data: [],
    styles: [],
    misc: [],
  };
}`,
      functionName: "clasificarArchivosFrontend",
      tests: [
        {
          label: "Agrupa archivos por responsabilidad principal",
          args: [[
            "scripts/app/core.js",
            "scripts/app/render.js",
            "scripts/data/foundations.js",
            "styles/dashboard.css",
            "data/study-items.json",
            "README.md",
          ]],
          expected: {
            app: ["scripts/app/core.js", "scripts/app/render.js"],
            data: ["scripts/data/foundations.js", "data/study-items.json"],
            styles: ["styles/dashboard.css"],
            misc: ["README.md"],
          },
        },
        {
          label: "Deja vacíos los grupos que no aparezcan",
          args: [[
            "index.html",
            "styles/base.css",
          ]],
          expected: {
            app: [],
            data: [],
            styles: ["styles/base.css"],
            misc: ["index.html"],
          },
        },
        {
          label: "Mantiene el orden interno de cada grupo aunque el array llegue mezclado",
          args: [[
            "styles/responsive.css",
            "scripts/app/main.js",
            "README.md",
            "scripts/data/evolution.js",
            "styles/base.css",
            "scripts/app/core.js",
            "data/study-items.json",
          ]],
          expected: {
            app: ["scripts/app/main.js", "scripts/app/core.js"],
            data: ["scripts/data/evolution.js", "data/study-items.json"],
            styles: ["styles/responsive.css", "styles/base.css"],
            misc: ["README.md"],
          },
        },
        {
          label: "Manda a misc las rutas parecidas que no pertenecen a los prefijos soportados",
          args: [[
            "script/app/core.js",
            "stylesheets/base.css",
            "dataset/study-items.json",
            "scripts/data-notes.md",
          ]],
          expected: {
            app: [],
            data: [],
            styles: [],
            misc: [
              "script/app/core.js",
              "stylesheets/base.css",
              "dataset/study-items.json",
              "scripts/data-notes.md",
            ],
          },
        },
        {
          label: "Exige prefijos exactos y no clasifica rutas con carpetas anidadas antes del prefijo",
          args: [[
            "src/scripts/app/core.js",
            "./styles/base.css",
            "backup/data/study-items.json",
            "scripts/app/main.js",
          ]],
          expected: {
            app: ["scripts/app/main.js"],
            data: [],
            styles: [],
            misc: [
              "src/scripts/app/core.js",
              "./styles/base.css",
              "backup/data/study-items.json",
            ],
          },
        },
        {
          label: "Mezcla prefijos válidos e inválidos sin romper el orden interno de cada grupo",
          args: [[
            "notes/styles/guide.md",
            "styles/base.css",
            "scripts/data/practice.js",
            "scripts/app/main.js",
            "docs/data-model.md",
            "data/study-items.json",
            "scripts/application.js",
            "styles/responsive.css",
          ]],
          expected: {
            app: ["scripts/app/main.js"],
            data: ["scripts/data/practice.js", "data/study-items.json"],
            styles: ["styles/base.css", "styles/responsive.css"],
            misc: [
              "notes/styles/guide.md",
              "docs/data-model.md",
              "scripts/application.js",
            ],
          },
        },
      ],
    }),
    "js-components": exercise({
      family: "Componentes",
      difficulty: "Avanzado",
      practiceType: "Función",
      prompt: "Implementa `renderPracticeCard(item)` para devolver una tarjeta HTML reutilizable a partir de datos.",
      checklist: [
        "Recibe un objeto con `title`, `level` y `track`.",
        "Devuelve un string HTML con un `<article>`.",
        "Incluye un `<h3>` con el título.",
        "Incluye un `<p>` con `track | level`.",
      ],
      starter: `function renderPracticeCard(item) {
  return "";
}`,
      functionName: "renderPracticeCard",
      tests: [
        {
          label: "Devuelve una tarjeta con titulo y metadatos",
          args: [{
            title: "Renderizar listas",
            track: "JavaScript",
            level: "Base",
          }],
          expected:
            "<article><h3>Renderizar listas</h3><p>JavaScript | Base</p></article>",
          compare: "html",
        },
        {
          label: "Mantiene los datos de entrada en otra tarjeta",
          args: [{
            title: "Colecciones",
            track: "Java",
            level: "Intermedio",
          }],
          expected:
            "<article><h3>Colecciones</h3><p>Java | Intermedio</p></article>",
          compare: "html",
        },
        {
          label: "Soporta titulos largos y niveles avanzados sin alterar la estructura",
          args: [{
            title: "Estados de carga, vacio y error",
            track: "JavaScript",
            level: "Avanzado",
          }],
          expected:
            "<article><h3>Estados de carga, vacio y error</h3><p>JavaScript | Avanzado</p></article>",
          compare: "html",
        },
        {
          label: "Mantiene espacios y simbolos literales del titulo recibido",
          args: [{
            title: "DTO + service + validacion",
            track: "Java",
            level: "Avanzado",
          }],
          expected:
            "<article><h3>DTO + service + validacion</h3><p>Java | Avanzado</p></article>",
          compare: "html",
        },
        {
          label: "Respeta mayusculas, acentos y numeros en los datos recibidos",
          args: [{
            title: "API REST 101",
            track: "JavaScript",
            level: "Intermedio+",
          }],
          expected:
            "<article><h3>API REST 101</h3><p>JavaScript | Intermedio+</p></article>",
          compare: "html",
        },
        {
          label: "No altera espacios internos del titulo al renderizar la tarjeta",
          args: [{
            title: "Estado local   y render",
            track: "Java",
            level: "Base",
          }],
          expected:
            "<article><h3>Estado local   y render</h3><p>Java | Base</p></article>",
          compare: "html",
        },
        {
          label: "Mantiene el track literal aunque no sea uno de los dos habituales",
          args: [{
            title: "Diseño de pruebas",
            track: "Backend",
            level: "Avanzado",
          }],
          expected:
            "<article><h3>Diseño de pruebas</h3><p>Backend | Avanzado</p></article>",
          compare: "html",
        },
      ],
    }),
    "js-project": exercise({
      family: "Proyecto final",
      difficulty: "Avanzado",
      practiceType: "Función",
      prompt: "Implementa `crearResumenDashboard(tasks, filters)` para preparar datos de un pequeño dashboard de estudio.",
      checklist: [
        "Recibe un array `tasks` y un objeto `filters` con `status`.",
        "Acepta también `filters.track` para filtrar por lenguaje cuando exista.",
        "Calcula `total`, `pending` y `completed`.",
        "Genera `visibleTitles` según el filtro recibido.",
        "Si `filters.status` es `all`, muestra todos los títulos.",
      ],
      starter: `function crearResumenDashboard(tasks, filters) {
  return {
    total: 0,
    pending: 0,
    completed: 0,
    visibleTitles: [],
  };
}`,
      functionName: "crearResumenDashboard",
      tests: [
        {
          label: "Resume el tablero y filtra pendientes",
          args: [[
            { title: "Repasar arrays", done: false },
            { title: "Practicar fetch", done: true },
            { title: "Montar dashboard", done: false },
          ], { status: "pending" }],
          expected: {
            total: 3,
            pending: 2,
            completed: 1,
            visibleTitles: ["Repasar arrays", "Montar dashboard"],
          },
        },
        {
          label: "Devuelve todos los títulos con filtro all",
          args: [[
            { title: "DOM", done: true },
            { title: "UI states", done: false },
          ], { status: "all" }],
          expected: {
            total: 2,
            pending: 1,
            completed: 1,
            visibleTitles: ["DOM", "UI states"],
          },
        },
        {
          label: "Filtra completadas y conserva los contadores globales",
          args: [[
            { title: "DOM", done: true },
            { title: "UI states", done: false },
            { title: "Testing", done: true },
          ], { status: "completed" }],
          expected: {
            total: 3,
            pending: 1,
            completed: 2,
            visibleTitles: ["DOM", "Testing"],
          },
        },
        {
          label: "Trata un filtro desconocido como lista vacía visible",
          args: [[
            { title: "DOM", done: true },
            { title: "UI states", done: false },
          ], { status: "archived" }],
          expected: {
            total: 2,
            pending: 1,
            completed: 1,
            visibleTitles: [],
          },
        },
        {
          label: "Devuelve resumen vacío coherente cuando no hay tareas",
          args: [[], { status: "all" }],
          expected: {
            total: 0,
            pending: 0,
            completed: 0,
            visibleTitles: [],
          },
        },
        {
          label: "Mantiene el orden original de pendientes al filtrar",
          args: [[
            { title: "Arrays", done: false },
            { title: "Fetch", done: true },
            { title: "DOM", done: false },
            { title: "Testing", done: false },
          ], { status: "pending" }],
          expected: {
            total: 4,
            pending: 3,
            completed: 1,
            visibleTitles: ["Arrays", "DOM", "Testing"],
          },
        },
        {
          label: "Permite filtrar por track sin romper los contadores globales",
          args: [[
            { title: "Arrays", done: false, track: "javascript" },
            { title: "Colecciones", done: true, track: "java" },
            { title: "DOM", done: false, track: "javascript" },
          ], { status: "all", track: "javascript" }],
          expected: {
            total: 3,
            pending: 2,
            completed: 1,
            visibleTitles: ["Arrays", "DOM"],
          },
        },
        {
          label: "Combina filtro de estado y track manteniendo el orden visible",
          args: [[
            { title: "Arrays", done: false, track: "javascript" },
            { title: "Spring", done: false, track: "java" },
            { title: "Testing", done: true, track: "javascript" },
            { title: "DOM", done: false, track: "javascript" },
          ], { status: "pending", track: "javascript" }],
          expected: {
            total: 4,
            pending: 3,
            completed: 1,
            visibleTitles: ["Arrays", "DOM"],
          },
        },
        {
          label: "Filtra completadas dentro de un track concreto sin tocar los contadores globales",
          args: [[
            { title: "Arrays", done: false, track: "javascript" },
            { title: "Spring", done: true, track: "java" },
            { title: "Testing", done: true, track: "javascript" },
            { title: "DTOs", done: false, track: "java" },
          ], { status: "completed", track: "javascript" }],
          expected: {
            total: 4,
            pending: 2,
            completed: 2,
            visibleTitles: ["Testing"],
          },
        },
        {
          label: "Devuelve lista visible vacia si el track pedido no aparece",
          args: [[
            { title: "Arrays", done: false, track: "javascript" },
            { title: "Testing", done: true, track: "javascript" },
          ], { status: "all", track: "java" }],
          expected: {
            total: 2,
            pending: 1,
            completed: 1,
            visibleTitles: [],
          },
        },
        {
          label: "Tolera filters sin status y filtra solo por track si existe",
          args: [[
            { title: "Arrays", done: false, track: "javascript" },
            { title: "Spring", done: true, track: "java" },
            { title: "DOM", done: false, track: "javascript" },
          ], { track: "javascript" }],
          expected: {
            total: 3,
            pending: 2,
            completed: 1,
            visibleTitles: ["Arrays", "DOM"],
          },
        },
        {
          label: "Mantiene contadores globales aunque status desconocido y track dejen la vista vacía",
          args: [[
            { title: "Arrays", done: false, track: "javascript" },
            { title: "Spring", done: true, track: "java" },
            { title: "Testing", done: true, track: "javascript" },
          ], { status: "archived", track: "javascript" }],
          expected: {
            total: 3,
            pending: 1,
            completed: 2,
            visibleTitles: [],
          },
        },
        {
          label: "Tolera filters vacío y devuelve todos los títulos en orden",
          args: [[
            { title: "Arrays", done: false, track: "javascript" },
            { title: "Spring", done: true, track: "java" },
            { title: "DOM", done: false, track: "javascript" },
          ], {}],
          expected: {
            total: 3,
            pending: 2,
            completed: 1,
            visibleTitles: ["Arrays", "Spring", "DOM"],
          },
        },
        {
          label: "Mantiene contadores globales si el track es desconocido y deja la vista vacía",
          args: [[
            { title: "Arrays", done: false, track: "javascript" },
            { title: "Spring", done: true, track: "java" },
            { title: "DTOs", done: false, track: "java" },
          ], { status: "all", track: "python" }],
          expected: {
            total: 3,
            pending: 2,
            completed: 1,
            visibleTitles: [],
          },
        },
        {
          label: "Filtra pendientes sin track y conserva el orden global completo",
          args: [[
            { title: "Arrays", done: false, track: "javascript" },
            { title: "Spring", done: true, track: "java" },
            { title: "DTOs", done: false, track: "java" },
            { title: "DOM", done: false, track: "javascript" },
          ], { status: "pending" }],
          expected: {
            total: 4,
            pending: 3,
            completed: 1,
            visibleTitles: ["Arrays", "DTOs", "DOM"],
          },
        },
        {
          label: "Tolera filters nulo y devuelve todos los títulos sin romper contadores",
          args: [[
            { title: "Arrays", done: false, track: "javascript" },
            { title: "Spring", done: true, track: "java" },
          ], null],
          expected: {
            total: 2,
            pending: 1,
            completed: 1,
            visibleTitles: ["Arrays", "Spring"],
          },
        },
      ],
    }),
    "js-testing": exercise({
      family: "Testing",
      difficulty: "Avanzado",
      practiceType: "Testing",
      prompt: "Implementa `tieneTituloValido(titulo)` y devuelve `true` solo si, tras `trim()`, el texto tiene al menos 3 caracteres.",
      checklist: [
        "Comprueba que el valor sea string.",
        "Aplica trim antes de validar.",
        "Devuelve true o false.",
      ],
      starter: `function tieneTituloValido(titulo) {
  return false;
}`,
      functionName: "tieneTituloValido",
      tests: [
        {
          label: "Acepta un título válido",
          args: ["Repasar DOM"],
          expected: true,
        },
        {
          label: "Rechaza espacios vacíos",
          args: ["   "],
          expected: false,
        },
        {
          label: "Rechaza textos demasiado cortos",
          args: ["JS"],
          expected: false,
        },
        {
          label: "Acepta exactamente 3 caracteres útiles tras trim",
          args: ["  DOM "],
          expected: true,
        },
        {
          label: "Rechaza valores que no son string",
          args: [null],
          expected: false,
        },
        {
          label: "Rechaza undefined como entrada invalida",
          args: [undefined],
          expected: false,
        },
        {
          label: "Rechaza strings con solo dos caracteres útiles aunque tengan espacios",
          args: ["  ok  "],
          expected: false,
        },
        {
          label: "Acepta strings largos con saltos o espacios exteriores tras trim",
          args: ["\n  Practica fetch  \t"],
          expected: true,
        },
        {
          label: "Rechaza string vacio directo como caso borde",
          args: [""],
          expected: false,
        },
        {
          label: "Rechaza numeros aunque parezcan texto util",
          args: [1234],
          expected: false,
        },
        {
          label: "Rechaza arrays aunque contengan texto",
          args: [["DOM"]],
          expected: false,
        },
        {
          label: "Rechaza objetos aunque tengan una propiedad title",
          args: [{ title: "Practicar fetch" }],
          expected: false,
        },
        {
          label: "Acepta strings con exactamente tres caracteres utiles aunque incluyan salto de linea",
          args: ["\nabc\n"],
          expected: true,
        },
        {
          label: "Rechaza strings con menos de tres caracteres utiles aunque tengan tabs y saltos",
          args: [" \n\tab\t "],
          expected: false,
        },
        {
          label: "Acepta tres caracteres utiles aunque uno sea espacio interno",
          args: [" a b "],
          expected: true,
        },
      ],
    }),
  },

  javaPracticeGuides: {
    "java-variables": guide(
      "Crea un programa de consola que muestre la ficha de un estudiante.",
      "Nombre, edad, nota media y si tiene el módulo aprobado.",
      "Una línea con todos los datos formateados de forma legible.",
      [
        "Declara variables con tipos adecuados.",
        "Usa String para texto, int para edad, double para nota y boolean para aprobado.",
        "Compón la salida con System.out.println.",
      ],
      "Fundamentos",
      "Cero",
      "Consola",
      [
        "Usar `int` para una nota con decimales y perder información.",
        "Concatenar valores sin separadores y dejar una salida difícil de leer.",
        "Declarar variables sin inicializarlas y luego intentar imprimirlas.",
      ],
      `public class StudentCard {
  public static void main(String[] args) {
    String nombre = "Ana";
    int edad = 19;
    double notaMedia = 8.4;
    boolean aprobado = true;

    // TODO: imprime la ficha completa de forma legible.
  }
}`,
      [
        "Cambia nombre, edad y nota y comprueba que la salida sigue siendo legible.",
        "Verifica que el boolean no se pierda o se mezcle con el texto.",
        "Asegúrate de que cada dato aparece una sola vez en la ficha final.",
      ],
      "Haz una segunda version con varios estudiantes y extrae un metodo `imprimirFicha(...)` para no duplicar la salida.",
      [
        "Edad 0 o una nota media con decimales largos para comprobar el formateo.",
        "Texto vacio en el nombre para ver si la salida sigue siendo legible.",
      ],
      [
        "Empieza declarando cada dato con el tipo que mejor represente su valor.",
        "Construye primero una salida simple con todos los campos antes de pensar en el formato final.",
        "Si la linea queda confusa, introduce separadores claros entre cada dato.",
      ],
    ),
    "java-methods": guide(
      "Escribe un programa con un método `calcularNivel(int xp)` que devuelva el nivel del usuario.",
      "Un entero xp, por ejemplo 0, 150, 320 o 480.",
      "El nivel calculado en bloques de 150 XP, empezando en nivel 1.",
      [
        "Crea un método separado de main.",
        "Haz que el método reciba xp y devuelva un int.",
        "Prueba varios casos desde main e imprime el resultado.",
      ],
      "Métodos",
      "Cero",
      "Consola",
      [
        "Imprimir el nivel dentro del método en vez de devolverlo con `return`.",
        "Olvidar que 0 XP debe seguir dando nivel 1.",
        "Duplicar la lógica en `main` y en el método en lugar de centralizarla.",
      ],
      `public class LevelCalculator {
  public static void main(String[] args) {
    System.out.println(calcularNivel(0));
    System.out.println(calcularNivel(150));
    System.out.println(calcularNivel(320));
  }

  static int calcularNivel(int xp) {
    // TODO: devolver el nivel en bloques de 150 XP.
    return 0;
  }
}`,
      [
        "Prueba 0, 149, 150 y 320 para comprobar bien los saltos de nivel.",
        "Verifica que el nivel empieza en 1 y no en 0.",
        "Comprueba que mover la impresión fuera del método no cambia el cálculo.",
      ],
      "Anade un segundo metodo que reciba tambien el tamano del bloque de XP para hacer el calculo configurable.",
      [
        "XP exactamente en el borde de cambio de nivel, como 150 o 300.",
        "XP negativo para decidir si lo normalizas, lo rechazas o documentas que no se contempla.",
      ],
      [
        "Piensa cuantos bloques completos de 150 hay dentro del XP recibido.",
        "Recuerda que el primer nivel existe incluso cuando el XP es 0.",
        "Prueba el metodo con valores justo antes y justo despues del cambio de tramo.",
      ],
    ),
    "java-control": guide(
      "Lee una nota ya fijada en una variable y clasifícala con condicionales.",
      "Una variable nota entre 0 y 10.",
      "El texto suspenso, aprobado, notable o sobresaliente, seguido de tres mensajes de repaso.",
      [
        "Usa if / else if / else para clasificar.",
        "Añade un bucle para mostrar tres líneas de repaso.",
        "Evita duplicar condiciones que se pisan entre sí.",
      ],
      "Control de flujo",
      "Base",
      "Consola",
      [
        "Poner primero una condición amplia como `nota >= 5` y bloquear casos más específicos.",
        "Usar varios `if` sueltos cuando la clasificación debería ser mutuamente excluyente.",
        "Fijar a mano las tres repeticiones con `println` en vez de usar un bucle.",
      ],
      `public class GradeReview {
  public static void main(String[] args) {
    int nota = 7;

    // TODO: clasifica la nota.

    for (int intento = 1; intento <= 3; intento++) {
      // TODO: muestra tres mensajes de repaso.
    }
  }
}`,
      [
        "Prueba una nota de cada tramo: suspenso, aprobado, notable y sobresaliente.",
        "Comprueba que siempre salen exactamente tres mensajes de repaso.",
        "Verifica que no se imprimen dos clasificaciones para la misma nota.",
      ],
      "Sustituye la variable fija por una lista de notas y clasifica varias en el mismo programa sin repetir bloques `if` enteros.",
      [
        "Nota 5 y nota 9 para comprobar dos bordes de tramo.",
        "Nota fuera de rango, como -1 u 11, para decidir si la validas antes de clasificar.",
      ],
      [
        "Ordena las condiciones de la mas exigente a la mas amplia para no tapar casos.",
        "Haz primero que solo salga una clasificacion correcta.",
        "Despues anade el bucle de tres mensajes sin duplicar `println` manuales.",
      ],
    ),
    "java-arrays": guide(
      "Trabaja con un array de cinco notas y calcula un pequeño resumen.",
      "Un array int[] con cinco valores.",
      "Media entera y nota más alta.",
      [
        "Recorre el array para sumar notas.",
        "Guarda la nota máxima mientras iteras.",
        "Usa notas.length para no fijar el tamaño a mano.",
      ],
      "Arrays",
      "Base",
      "Consola",
      [
        "Recorrer con `i <= notas.length` y provocar un acceso fuera de rango.",
        "Inicializar la nota máxima con 0 sin pensar si el ejercicio pudiera cambiar de dominio.",
        "Dividir antes de terminar la suma y obtener una media incorrecta.",
      ],
      `public class GradeArraySummary {
  public static void main(String[] args) {
    int[] notas = {7, 5, 9, 6, 8};
    int total = 0;
    int maxima = notas[0];

    // TODO: recorre el array, suma y busca la maxima.

    int media = total / notas.length;
    System.out.println("Media: " + media);
    System.out.println("Maxima: " + maxima);
  }
}`,
      [
        "Prueba con la nota máxima en primera y última posición del array.",
        "Comprueba que la media usa todas las notas y no solo parte del recorrido.",
        "Verifica que cambiar el tamaño del array no obliga a tocar el bucle.",
      ],
      "Amplia el resumen para contar tambien cuantas notas estan aprobadas y cuantas suspendidas en el mismo recorrido.",
      [
        "Todas las notas iguales para comprobar que maxima y media siguen siendo coherentes.",
        "Un array con una sola nota para ver si la inicializacion y el bucle siguen teniendo sentido.",
      ],
      [
        "Usa la primera nota como referencia inicial para la maxima.",
        "En el mismo bucle, suma y compara, en vez de hacer dos recorridos separados.",
        "Calcula la media solo cuando ya hayas terminado de acumular el total.",
      ],
    ),
    "java-oop": guide(
      "Modela una clase Libro con un comportamiento útil.",
      "Título, autor y páginas en el constructor.",
      "Un método esLargo() que devuelva true si el libro supera 400 páginas.",
      [
        "Declara atributos privados.",
        "Crea un constructor que reciba los datos principales.",
        "Añade un método de instancia con return boolean.",
      ],
      "POO",
      "Intermedio",
      "POO",
      [
        "Dejar los atributos públicos y romper encapsulación desde fuera.",
        "Meter lógica de impresión dentro del constructor en vez de separar responsabilidades.",
        "Confundir método de instancia con método `static` cuando depende del estado del libro.",
      ],
      `public class Book {
  private String title;
  private String author;
  private int pages;

  public Book(String title, String author, int pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }

  public boolean esLargo() {
    // TODO: devolver true si supera 400 paginas.
    return false;
  }
}`,
      [
        "Crea un libro corto y otro largo y compara el resultado de `esLargo()`.",
        "Comprueba que el constructor deja el objeto listo sin pasos extra.",
        "Verifica que la lógica depende del estado del libro y no de datos externos.",
        "Prueba el borde exacto de 400 páginas para fijar la regla con precisión.",
      ],
      "Anade un metodo `resumen()` que devuelva una cadena legible con los datos del libro sin imprimir directamente en la clase.",
      [
        "Un libro de exactamente 400 paginas para fijar bien el borde de la regla.",
        "Titulos o autores con espacios para comprobar que el constructor conserva bien el texto.",
        "Un valor 0 o negativo en paginas para decidir si ese caso forma parte del contrato o queda fuera por ahora.",
      ],
      [
        "Decide primero que estado minimo debe guardar un libro para ser util.",
        "Haz que el constructor deje esos datos listos en los atributos privados.",
        "El metodo `esLargo()` solo necesita mirar `pages` y devolver un boolean.",
        "Si detectas un caso raro como paginas negativas, decide si lo modelas ya o si lo dejas explícitamente fuera del alcance.",
      ],
    ),
    "java-inheritance": guide(
      "Diseña una interfaz `Notificable` y dos clases que la implementen.",
      "Un método `enviar(String mensaje)` definido en la interfaz.",
      "Dos implementaciones distintas, por ejemplo Email y SMS, con salidas diferentes por consola.",
      [
        "Declara una interfaz pequeña con una sola responsabilidad.",
        "Haz que dos clases usen `implements`.",
        "Sobrescribe el mismo método con comportamientos distintos.",
      ],
      "Interfaces y herencia",
      "Intermedio",
      "POO",
      [
        "Usar `extends` con una interfaz cuando toca `implements`.",
        "Meter comportamiento común irrelevante en la interfaz y hacerla demasiado grande.",
        "Cambiar la firma del método al implementarlo y dejar de cumplir el contrato.",
      ],
      `interface Notificable {
  void enviar(String mensaje);
}

class EmailNotifier implements Notificable {
  public void enviar(String mensaje) {
    // TODO: implementar salida por consola.
  }
}

class SmsNotifier implements Notificable {
  public void enviar(String mensaje) {
    // TODO: implementar salida por consola.
  }
}`,
      [
        "Llama al mismo método desde ambas implementaciones y comprueba que la salida cambia.",
        "Verifica que el contrato de la interfaz obliga a mantener la misma firma.",
        "Añade un tercer notificador pequeño para comprobar que el diseño aguanta.",
      ],
      "Crea un metodo que reciba un `Notificable` por parametro y lo use sin saber si es Email, SMS o cualquier otra implementacion.",
      [
        "Mensaje vacio para decidir si lo permites, lo transformas o lo rechazas.",
        "Una tercera implementacion muy corta para comprobar que el consumo polimorfico no cambia.",
      ],
      [
        "Empieza por una interfaz con una sola firma y una sola responsabilidad.",
        "Haz una implementacion minima de Email y otra de SMS cambiando solo el comportamiento.",
        "Comprueba despues que una variable del tipo interfaz puede apuntar a cualquiera de las dos.",
      ],
    ),
    "java-collections": guide(
      "Construye un pequeño registro de progreso por lenguaje usando List y Map.",
      "Una lista de tareas y un mapa con XP por lenguaje.",
      "Muestra cuántas tareas hay pendientes y cuánto XP tiene cada lenguaje.",
      [
        "Usa ArrayList para guardar tareas.",
        "Usa HashMap para asociar lenguaje con XP.",
        "Recorre ambas estructuras y muestra un resumen legible.",
        "Decide una convención estable para las claves del mapa antes de insertar y leer.",
      ],
      "Colecciones",
      "Intermedio",
      "Colecciones",
      [
        "Elegir arrays fijos cuando la estructura debe crecer durante la práctica.",
        "Modificar una colección sin tener claro qué guarda cada estructura.",
        "Usar claves inconsistentes en el `Map` y luego no recuperar el XP esperado.",
      ],
      `import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ProgressRegistry {
  public static void main(String[] args) {
    List<String> tareas = new ArrayList<>();
    Map<String, Integer> xp = new HashMap<>();

    // TODO: rellenar tareas y XP.
    // TODO: mostrar resumen final.
  }
}`,
      [
        "Añade varias tareas y comprueba que el recuento final coincide con la lista.",
        "Verifica que cada clave del mapa devuelve el XP correcto.",
        "Cambia el orden de inserción y comprueba que el programa sigue teniendo sentido.",
        "Prueba a pedir XP de un lenguaje ausente y decide si devuelves 0, mensaje o valor por defecto.",
      ],
      "Calcula tambien cuantas tareas pertenecen a cada lenguaje para cruzar una `List` de tareas con el `Map` de XP.",
      [
        "Una lista vacia para comprobar que el resumen no rompe el programa.",
        "Una clave de lenguaje que no exista en el mapa para decidir el valor por defecto.",
        "Dos tareas del mismo lenguaje con nombres parecidos para decidir si el conteo se basa en estructura o en texto libre.",
      ],
      [
        "Decide primero que guarda la lista y que guarda el mapa para no mezclar responsabilidades.",
        "Rellena unas pocas tareas y un par de claves de XP antes de imprimir nada.",
        "Recorre cada estructura por separado y solo al final compone el resumen.",
        "Mantén la misma convención de claves (`java`, `javascript`) en escritura y lectura para no fabricar bugs invisibles.",
      ],
    ),
    "java-exceptions": guide(
      "Crea un método `parsearNota(String texto)` que convierta texto a número y maneje errores.",
      "Un String que puede contener una nota válida o un valor inválido.",
      "La nota convertida si es correcta, o `-1` si no se puede parsear.",
      [
        "Usa Integer.parseInt dentro de try.",
        "Captura NumberFormatException en catch.",
        "Devuelve -1 cuando la entrada no sea válida.",
      ],
      "Excepciones",
      "Intermedio",
      "Errores",
      [
        "Capturar `Exception` genérica cuando solo quieres tratar un parseo inválido.",
        "Usar la excepción para controlar el flujo normal en todos los casos.",
        "Ocultar el error y devolver un valor ambiguo distinto del acordado en el ejercicio.",
      ],
      `public class GradeParser {
  public static void main(String[] args) {
    System.out.println(parsearNota("8"));
    System.out.println(parsearNota("hola"));
  }

  static int parsearNota(String texto) {
    // TODO: convertir a numero o devolver -1.
    return -1;
  }
}`,
      [
        "Prueba un número válido, texto no numérico y un valor fuera del formato esperado.",
        "Comprueba que los casos inválidos no rompen el programa principal.",
        "Verifica que el contrato `-1` se mantiene igual en todos los fallos.",
        "Decide si `trim()` forma parte del contrato antes de parsear y comprueba ese caso de forma explícita.",
      ],
      "Extrae una segunda funcion que valide si la nota esta entre 0 y 10 para separar parseo y regla de negocio.",
      [
        "Texto con espacios alrededor, como ` 8 `, para decidir si haces trim antes del parseo.",
        "Valores numericos fuera de rango, como 12 o -3, si anades validacion de dominio.",
        "String vacio o null para decidir si lo tratas como parseo inválido o añades una protección previa.",
      ],
      [
        "Primero resuelve solo el parseo con `Integer.parseInt` dentro de `try/catch`.",
        "Haz que todos los fallos de parseo vuelvan al mismo valor acordado, `-1`.",
        "Si anades validacion de rango, separala en otra funcion para no mezclar responsabilidades.",
        "No escondas entradas descartadas: aunque devuelvas `-1`, deja claro en `main` qué pasó con cada caso si montas una demo.",
      ],
    ),
    "java-testing": guide(
      "Diseña una función `estaAprobado(int nota)` y plantea sus pruebas principales.",
      "Tres casos base: 4, 5 y 10.",
      "false para 4, true para 5 y true para 10.",
      [
        "Separa la lógica en una función pequeña.",
        "Piensa un caso que falla y dos que pasan.",
        "Escribe qué comprobarías en JUnit con `@Test`, `assertTrue` y `assertFalse` aunque no ejecutes el test aquí.",
      ],
      "Testing",
      "Avanzado",
      "Testing",
      [
        "Probar solo el caso feliz y dejar fuera el borde exacto de aprobado.",
        "Mezclar varias comprobaciones en un mismo test y perder claridad cuando falle.",
        "Escribir una función demasiado grande para algo que debería resolverse con una condición simple.",
      ],
      `public class GradeRules {
  static boolean estaAprobado(int nota) {
    // TODO: devolver true si la nota es 5 o mas.
    return false;
  }

  public static void main(String[] args) {
    System.out.println(estaAprobado(4));
    System.out.println(estaAprobado(5));
    System.out.println(estaAprobado(10));
  }
}

// Ejemplo de test JUnit:
// @Test
// void devuelveTrueCuandoLaNotaEsCinco() {
//   assertTrue(GradeRules.estaAprobado(5));
// }`,
      [
        "Verifica el borde exacto de aprobado con la nota 5.",
        "Comprueba un caso claramente inválido y otro claramente válido.",
        "Asegúrate de que el método devuelve boolean y no texto de consola.",
        "Anota cómo quedarían esos casos en tres métodos JUnit con nombres distintos.",
        "Decide si notas fuera de 0-10 forman parte del contrato o si las dejas fuera por ahora, pero hazlo explícito.",
      ],
      "Escribe el esqueleto de una clase de test JUnit con tres metodos separados para borde, suspenso y caso claramente aprobado.",
      [
        "La nota 0 para confirmar un suspenso claro.",
        "La nota 5 exacta para fijar el borde que mas suele romperse.",
        "La nota 10 para comprobar un caso claramente aprobado y sin ambigüedad.",
        "Una nota fuera de rango, como -1 u 11, para decidir si tu contrato la considera simplemente no aprobada.",
      ],
      [
        "Reduce la regla a una condicion simple que devuelva boolean.",
        "Prueba primero el caso 5, que es el borde mas importante.",
        "Separa los casos en comprobaciones independientes para que el fallo sea legible.",
        "Nombra cada test por comportamiento esperado, no por la implementación interna.",
        "Si añades casos fuera de rango, decide si esa validación vive en este método o en otra capa.",
      ],
    ),
    "java-spring-intro": guide(
      "Diseña la estructura base de una API de tareas con Spring.",
      "Operaciones mínimas: listar tareas, crear tarea y completar tarea.",
      "Una propuesta de capas con controller, service y DTOs sencillos.",
      [
        "Define al menos tres endpoints HTTP con intención clara.",
        "Separa qué devolvería el controller y qué resolvería el service.",
        "Piensa un DTO de entrada y otro de salida antes de tocar base de datos.",
        "Decide dónde vive la validación del título y cómo se traduce a respuesta HTTP.",
        "Añade un caso de `PATCH /complete` y decide qué devolver si la tarea no existe o ya estaba completada.",
        "Diseña un `GET` con query param `done` para no crear endpoints duplicados solo por filtrado.",
      ],
      "Spring",
      "Avanzado",
      "Arquitectura",
      [
        "Meter validación, reglas y respuesta HTTP mezcladas en el controller.",
        "Exponer entidades internas directamente cuando basta con DTOs simples.",
        "Diseñar endpoints por acciones técnicas en vez de por recursos y casos de uso.",
      ],
      `@RestController
@RequestMapping("/api/tasks")
class TaskController {
  private final TaskService taskService;

  TaskController(TaskService taskService) {
    this.taskService = taskService;
  }

  // TODO: GET listar tareas.
  // TODO: POST crear tarea con TaskCreateRequest.
  // TODO: PATCH completar tarea por id.
}

record TaskCreateRequest(String title) {}
record TaskResponse(long id, String title, boolean done) {}
record TaskListItemResponse(long id, String title, boolean done) {}
record ApiErrorResponse(String code, String message) {}

class TaskService {
  List<TaskListItemResponse> listTasks(Boolean done) {
    return List.of();
  }

  TaskResponse createTask(TaskCreateRequest request) {
    // TODO: validar titulo y crear tarea.
    return null;
  }

  TaskResponse completeTask(long id) {
    // TODO: completar tarea o lanzar un error de dominio.
    return null;
  }
}`,
      [
        "Enumera qué respondería cada endpoint antes de pensar en base de datos.",
        "Comprueba que listar, crear y completar no mezclan la misma responsabilidad.",
        "Verifica que los nombres de rutas y métodos HTTP se entienden sin comentarios extra.",
        "Decide qué código HTTP devolverías en alta válida, validación fallida y tarea inexistente.",
        "Decide si `PATCH /complete` devuelve la tarea actualizada, `204` sin cuerpo o un error de dominio si ya estaba completada.",
        "Decide si el listado usa el mismo DTO que el detalle o uno más pequeño para no exponer más de la cuenta.",
        "Prueba qué harías con un título en blanco o con espacios para fijar si normalizas antes de validar.",
      ],
      "Anade una cuarta operacion para filtrar tareas pendientes y decide si encaja mejor como query param en GET o como endpoint aparte.",
      [
        "Crear una tarea con titulo vacio para decidir donde iria la validacion.",
        "Completar una tarea inexistente para pensar la respuesta HTTP y el contrato del service.",
        "Enviar un titulo con espacios para decidir si normalizas antes de validar o rechazas tal cual.",
        "Completar una tarea ya hecha para decidir si repites `200`, devuelves `409` o simplemente no haces nada.",
        "Listar con `?done=true` o `?done=false` para decidir si el filtrado vive en controller o en service.",
        "Crear dos tareas con el mismo título para decidir si el dominio lo permite o si defines un conflicto explícito.",
      ],
      [
        "Piensa primero en los recursos y acciones que vera el cliente, no en las clases internas.",
        "Reparte la responsabilidad: el controller recibe y responde, el service resuelve la logica.",
        "Define un DTO minimo para crear y otro para devolver tareas antes de hablar de persistencia.",
        "Fija primero el contrato HTTP y luego adapta la implementación interna a ese contrato.",
        "Si introduces errores de dominio, dales nombre y forma estable antes de pensar en excepciones genéricas.",
        "Usa query params para filtros simples del listado antes de inventar rutas nuevas.",
        "Decide pronto si normalizas espacios en el request o si esa regla pertenece a una capa anterior.",
      ],
    ),
  },

  projectBriefs: {
    "java-variables": projectBrief(
      "Construye una ficha de estudiante usando variables bien tipadas y salida clara.",
      "Fijar la base más temprana de Java con una pieza pequeña pero útil: declarar datos con tipos adecuados, mantener nombres legibles y producir una salida de consola fácil de leer.",
      [
        "Declara variables para nombre, edad, nota media, horas de estudio y si el módulo está aprobado.",
        "Elige tipos coherentes para cada dato: `String`, `int`, `double` y `boolean`.",
        "Compón una salida final que reúna toda la información sin mezclar tipos al azar.",
        "Evita nombres genéricos como `x` o `dato` para que la intención se lea de un vistazo.",
        "Añade al menos un pequeño cálculo o derivado, por ejemplo si supera una meta mínima de estudio.",
        "Comprueba mentalmente un caso con nota baja o pocas horas para asegurar que la salida sigue siendo legible.",
      ],
      [
        "Variables tipadas",
        "Nombres con intención",
        "Salida formateada",
        "Dato derivado simple",
        "Caso borde básico",
      ],
      `public class StudentProfileApp {
  public static void main(String[] args) {
    String studentName = "Ana";
    int age = 21;
    double averageGrade = 7.8;
    int weeklyStudyHours = 9;
    boolean passedModule = true;

    // TODO: calcular un dato simple y mostrar una ficha legible.
  }
}`,
      [
        "Comprueba que cada variable representa una sola idea y no mezcla significados.",
        "Verifica que la salida final se entiende sin tener que mirar el código varias veces.",
        "Asegúrate de que el cálculo derivado no obliga a convertir tipos sin sentido.",
        "Revisa que `boolean` y `double` aparezcan con intención real y no solo por meter más tipos.",
        "Piensa un caso con pocas horas o nota suspensa para confirmar que el formato sigue siendo estable.",
      ],
      [
        "La base de tipos y variables deja de ser teoría aislada y pasa a una ficha de datos con sentido.",
        "Los nombres elegidos ayudan a leer intención y no solo sintaxis.",
        "La salida final ya prepara el paso a decisiones, métodos y modelado posterior.",
        "La pieza cierra mejor el arranque de Java antes de subir a control y arrays.",
      ],
    ),
    "java-methods": projectBrief(
      "Separa un resumen de estudio en métodos pequeños con parámetros claros.",
      "Pasar de resolver todo dentro de `main` a dividir una tarea simple en métodos reutilizables con entrada, proceso y retorno bien definidos.",
      [
        "Parte de datos simples como nombre de alumno, minutos estudiados y retos completados.",
        "Crea un método para calcular una métrica útil, por ejemplo puntos o nivel de sesión.",
        "Crea otro método para construir una salida final legible a partir de esos datos.",
        "Haz que `main` quede como coordinador y no como sitio donde vive toda la lógica.",
        "Evita duplicar fórmulas o concatenaciones en varios sitios.",
        "Prueba mentalmente qué ocurre con minutos a cero o con una sesión muy corta para comprobar el contrato.",
      ],
      [
        "Método de cálculo",
        "Método de formato o resumen",
        "main coordinador",
        "Parámetros claros",
        "Return coherente",
      ],
      `class SessionSummaryApp {
  static int calculateXp(int minutes, int completedChallenges) {
    // TODO
    return 0;
  }

  static String buildSummary(String name, int minutes, int completedChallenges, int xp) {
    // TODO
    return "";
  }

  public static void main(String[] args) {
    String name = "Ana";
    int minutes = 40;
    int completedChallenges = 2;

    // TODO: coordinar llamadas y mostrar el resumen final.
  }
}`,
      [
        "Comprueba que cada método tenga una sola responsabilidad visible.",
        "Verifica que `main` llama a métodos y no rehace por su cuenta la lógica que ya extrajiste.",
        "Asegúrate de que nombres de parámetros y métodos expliquen intención, no solo tipo.",
        "Revisa que el valor devuelto por un método se use realmente y no se pierda por el camino.",
        "Piensa un caso con cero minutos o cero retos para confirmar que el contrato sigue siendo razonable.",
      ],
      [
        "La estructura ya enseña a repartir trabajo fuera de `main`.",
        "Los métodos reciben datos claros y devuelven resultados reutilizables.",
        "La pieza prepara bien el paso a validación, control de flujo y colecciones.",
        "La lectura del código mejora porque cada bloque tiene una intención concreta.",
      ],
    ),
    "java-control": projectBrief(
      "Construye un evaluador simple de progreso con decisiones y repetición controlada.",
      "Practicar `if`, `else`, bucles y acumulación básica con una pieza que clasifique sesiones y recorra varios datos sin quedarse en ejemplos artificiales.",
      [
        "Parte de una colección pequeña de sesiones o notas de práctica.",
        "Usa condicionales para clasificar cada entrada, por ejemplo `completa`, `en progreso` o `pendiente`.",
        "Usa un bucle para recorrer todas las entradas y acumular contadores útiles.",
        "Calcula al final un pequeño resumen con número de pendientes, completadas o sesiones largas.",
        "Evita condiciones duplicadas o mal ordenadas que hagan imposible entender por qué cae en cada rama.",
        "Prueba mentalmente qué ocurre con una lista vacía o con entradas que caen justo en el límite de una condición.",
      ],
      [
        "Condicional principal",
        "Bucle de recorrido",
        "Contadores acumulados",
        "Resumen final",
        "Casos borde de control",
      ],
      `class StudyProgressControl {
  static String classifySession(int minutes, boolean completed) {
    // TODO
    return "";
  }

  public static void main(String[] args) {
    int[] sessionMinutes = { 15, 45, 0, 70 };
    boolean[] completedFlags = { false, true, false, true };

    // TODO: recorrer, clasificar y resumir.
  }
}`,
      [
        "Comprueba que el orden de las condiciones no tapa ramas que deberían poder ejecutarse.",
        "Verifica que el bucle recorre exactamente el rango válido y no se sale por índice.",
        "Asegúrate de que cada contador se actualiza en la rama correcta y no en varias a la vez.",
        "Piensa el caso de cero sesiones para confirmar que el resumen sigue siendo coherente.",
        "Revisa que la clasificación de una sesión corta o incompleta tenga una regla visible y defendible.",
      ],
      [
        "La lógica de control deja de ser sintaxis suelta y pasa a resolver un flujo reconocible.",
        "Las ramas y contadores se leen con intención clara.",
        "La pieza prepara bien el salto a arrays, recorridos y validación más rica.",
        "El código obliga a pensar en casos límite antes de crecer en complejidad.",
      ],
    ),
    "java-arrays": projectBrief(
      "Construye un analizador básico de sesiones usando arrays y recorrido por índice.",
      "Practicar acceso por posición, recorrido completo y acumulación sobre arrays simples antes de pasar a colecciones más ricas.",
      [
        "Parte de arrays paralelos o de un array con valores homogéneos como minutos, notas o XP por sesión.",
        "Recorre todas las posiciones válidas sin salirte del índice.",
        "Calcula un resumen útil, por ejemplo total, máximo, promedio o número de sesiones por encima de un umbral.",
        "Muestra o devuelve también qué posición o valor destaca más si eso ayuda a entender el recorrido.",
        "Evita lógica duplicada dentro del bucle si el mismo cálculo se puede centralizar.",
        "Piensa qué ocurre con arrays vacíos, con un solo elemento o con todos los valores iguales.",
      ],
      [
        "Array de entrada",
        "Recorrido por índice",
        "Acumulación de métricas",
        "Detección de máximo o promedio",
        "Casos borde básicos",
      ],
      `class StudyArrayStats {
  static int findLongestSession(int[] minutes) {
    // TODO
    return 0;
  }

  static double calculateAverage(int[] minutes) {
    // TODO
    return 0;
  }

  public static void main(String[] args) {
    int[] sessions = { 20, 45, 30, 60 };

    // TODO: recorrer o reutilizar metodos para mostrar un resumen.
  }
}`,
      [
        "Comprueba que el recorrido usa límites correctos y no intenta leer fuera del array.",
        "Verifica que el total y el promedio usan el mismo conjunto de datos y no ramas distintas.",
        "Asegúrate de que el valor máximo o la sesión más larga se inicializa de forma razonable.",
        "Piensa el caso de array vacío antes de decidir qué devolver o cómo proteger la operación.",
        "Revisa que el índice solo se usa cuando aporta algo y que la lógica principal sigue siendo legible.",
      ],
      [
        "El array deja de ser solo teoría y pasa a una herramienta para resumir datos reales.",
        "El recorrido por índice se entiende con intención clara.",
        "La pieza prepara bien el salto a `ArrayList` y colecciones más expresivas.",
        "Los casos borde básicos quedan visibles antes de crecer en estructura.",
      ],
    ),
    "java-oop": projectBrief(
      "Modela una biblioteca pequeña con objetos reales, catálogo y operaciones básicas de préstamo.",
      "Definir clases con atributos privados y comportamientos claros para dejar atrás soluciones planas con variables sueltas y empezar a pensar en reglas de dominio y coordinación entre objetos.",
      [
        "Crea una clase `Book` con título, autor y disponibilidad.",
        "Añade métodos como `borrow()` y `giveBack()` con mensajes o estados distintos según la situación.",
        "Crea una clase `Library` o un bloque coordinador mínimo para guardar varios libros.",
        "Añade una búsqueda simple por título o autor antes de prestar.",
        "Instancia varios libros y muestra una secuencia de préstamo y devolución desde `main`.",
        "Decide qué devuelve la biblioteca cuando no encuentra un libro y cómo comunicas ese caso sin romper el flujo.",
      ],
      [
        "Clase `Book`",
        "Comportamiento de préstamo y devolución",
        "Colección simple de libros",
        "Búsqueda o selección básica",
        "Pequeña demo en `main`",
      ],
      `import java.util.ArrayList;
import java.util.List;

public class Book {
  private String title;
  private String author;
  private boolean available = true;

  public Book(String title, String author) {
    this.title = title;
    this.author = author;
  }

  public void borrow() {
    // TODO
  }

  public void giveBack() {
    // TODO
  }
}

class Library {
  private final List<Book> books = new ArrayList<>();

  public void addBook(Book book) {
    books.add(book);
  }

  public Book findByTitle(String title) {
    // TODO
    return null;
  }

  public void printCatalog() {
    // TODO
  }
}`,
      [
        "Comprueba que pedir prestado dos veces no deje el mismo resultado que la primera.",
        "Verifica que `giveBack()` restaure la disponibilidad del libro.",
        "Busca un libro por título antes de prestar para no depender de variables sueltas en `main`.",
        "Verifica que el catálogo se siga entendiendo al añadir dos o tres libros.",
        "Desde `main`, imprime el estado antes y después de cada operación.",
        "Prueba una búsqueda de título inexistente para fijar el contrato de no encontrado.",
      ],
      [
        "El libro cambia de disponible a prestado y vuelve a disponible sin estados ambiguos.",
        "El comportamiento principal se entiende leyendo `borrow()` y `giveBack()` sin depender de `main`.",
        "La biblioteca coordina búsqueda y catálogo sin que `main` tenga que conocer cada detalle.",
        "La biblioteca puede listar varios libros sin duplicar lógica de impresión por cada uno.",
        "La demo final enseña una secuencia completa, no solo una impresión aislada.",
        "El caso de libro no encontrado ya forma parte del contrato del coordinador, no queda implícito.",
      ],
    ),
    "java-collections": projectBrief(
      "Construye una agenda de estudio por consola con mini CRUD en memoria.",
      "Pasar de variables sueltas a una agenda que permita crear, listar, completar y priorizar tareas de estudio sin rehacer el programa cada vez que crece.",
      [
        "Usa `ArrayList` para guardar tareas en memoria.",
        "Usa `HashMap` para asociar lenguaje con XP acumulado o con otro dato útil del dominio.",
        "Añade operaciones mínimas para crear tarea, completarla, priorizarla y listar estado actual.",
        "Separa pendientes y completadas en el resumen final.",
        "Muestra un resumen final recorriendo las estructuras.",
        "Decide qué valor por defecto devuelve el mapa cuando un lenguaje aún no tiene XP registrado.",
      ],
      [
        "Lista principal de tareas",
        "Mapa de XP",
        "Operaciones CRUD básicas",
        "Resumen por consola",
        "Vista de pendientes priorizadas",
      ],
      `import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class StudyTask {
  String title;
  boolean done;

  StudyTask(String title) {
    this.title = title;
    this.done = false;
  }
}

List<StudyTask> tasks = new ArrayList<>();
Map<String, Integer> xpByTrack = new HashMap<>();

tasks.add(new StudyTask("Repasar arrays"));
tasks.add(new StudyTask("Practicar DOM"));

xpByTrack.put("java", 120);
xpByTrack.put("javascript", 160);

// TODO: crear otra tarea, completar una, decidir prioridad y mostrar resumen final.`,
      [
        "Comprueba cuántas tareas siguen pendientes y cuántas aparecen como hechas.",
        "Verifica que el mapa devuelve el XP correcto para cada lenguaje.",
        "Comprueba que completar una tarea cambia su estado sin duplicarla ni perderla.",
        "Añade un tercer dato y confirma que el resumen sigue saliendo legible.",
        "Verifica que las tareas más urgentes aparecen antes en la vista principal si decides priorizarlas.",
        "Prueba una tarea de un lenguaje sin XP cargado todavía y decide cómo aparece en el resumen.",
      ],
      [
        "La salida final resume pendientes, completadas y XP sin depender de variables sueltas repetidas.",
        "Crear o completar tareas es un cambio local, no un parche repartido por todo `main`.",
        "Lista y mapa tienen responsabilidades distintas y eso se nota en el código.",
        "La agenda ya parece una herramienta de estudio y no solo una demo de colecciones.",
        "La ausencia de una clave en el mapa ya no rompe el flujo: también forma parte del contrato del programa.",
      ],
    ),
    "java-inheritance": projectBrief(
      "Diseña un sistema simple de notificaciones por interfaz.",
      "Practicar contratos pequeños y polimorfismo sin forzar una jerarquía artificial de clases base.",
      [
        "Define una interfaz `Notificable` con un método `enviar(String mensaje)`.",
        "Implementa al menos dos clases, por ejemplo `EmailNotifier` y `SmsNotifier`.",
        "Recorre una lista de notificadores y lanza el mismo mensaje a todos.",
      ],
      [
        "Interfaz pequeña",
        "Dos implementaciones",
        "Demo polimórfica desde `main`",
      ],
      `interface Notificable {
  void enviar(String mensaje);
}

class EmailNotifier implements Notificable {
  public void enviar(String mensaje) {
    // TODO
  }
}

List<Notificable> canales = new ArrayList<>();`,
      [
        "Recorre la colección y comprueba que cada implementación responde con su propio formato.",
        "Verifica que el código cliente usa `Notificable` y no depende de una clase concreta.",
        "Añade una tercera implementación pequeña para comprobar que el diseño escala.",
      ],
      [
        "El envío funciona para varios canales sin cambiar el código que los recorre.",
        "La interfaz expresa una capacidad concreta y no una jerarquía artificial.",
        "Agregar otro notificador es un cambio local, no una reescritura del flujo.",
      ],
    ),
    "java-exceptions": projectBrief(
      "Crea un mini gestor de notas resistente a entradas inválidas y con informe final claro.",
      "Unir parseo, validación de rango y tratamiento claro del error en una utilidad pequeña pero ya cercana a un flujo real de captura de datos y resumen final.",
      [
        "Escribe un método `parseGrade(String text)` que convierta texto a entero.",
        "Devuelve `-1` si el valor no es numérico o cae fuera del rango 0-10.",
        "Guarda varias entradas válidas en una colección simple y rechaza las inválidas.",
        "Muestra un resumen final con cuántas notas válidas aceptaste y su media.",
        "Prueba varios casos desde `main`, incluidos vacío, texto y nota válida.",
        "Cuenta también cuántas entradas inválidas descartaste para no perder visibilidad del error.",
        "Decide si los espacios exteriores se limpian antes de validar o si cuentan como entrada inválida y mantenlo estable en todo el flujo.",
      ],
      [
        "Método de parseo",
        "Validación de rango",
        "Colección de notas válidas",
        "Resumen final",
        "Conteo de descartes",
        "Casos de prueba manuales",
      ],
      `import java.util.ArrayList;
import java.util.List;

public static int parseGrade(String text) {
  // TODO: convertir y validar 0-10.
  return -1;
}

public static void main(String[] args) {
  List<Integer> grades = new ArrayList<>();
  String[] inputs = {"8", "hola", "12", "6"};

  // TODO: parsear, aceptar solo válidas, contar descartes y mostrar resumen.
}`,
      [
        "Prueba una nota válida, una fuera de rango y un texto no numérico.",
        "Comprueba que todos los casos inválidos devuelven `-1`.",
        "Verifica que no capturas una excepción genérica si no hace falta.",
        "Comprueba que la media final solo use las notas aceptadas.",
        "Cuenta cuántas entradas descartas para confirmar que no desaparecen en silencio.",
        "Prueba una entrada con espacios exteriores y otra vacía para fijar el contrato de normalización.",
      ],
      [
        "El contrato de error es estable: cualquier entrada inválida termina igual.",
        "La conversión y la validación de rango se leen como una sola pieza pequeña y clara.",
        "La colección final solo contiene datos válidos y el resumen se calcula sobre ella.",
        "El informe final deja claro qué aceptaste y qué descartaste, no solo la media.",
        "Los casos manuales enseñan que el método falla de forma controlada, no ruidosa.",
        "La decisión sobre `trim()` o entrada vacía no queda implícita: forma parte visible del diseño.",
      ],
    ),
    "java-testing": projectBrief(
      "Refactoriza una utilidad de validación y cúbrela con JUnit.",
      "Separar lógica de validación de entrada, escribir tests de caso normal, borde y error, y dejar una API pequeña y clara.",
      [
        "Diseña una clase `TaskValidator` con una responsabilidad concreta.",
        "Escribe al menos tres tests: válido, vacío y demasiado corto.",
        "Añade un test de valor nulo o no válido para fijar el contrato de error.",
        "Refactoriza nombres o duplicaciones después de que los tests pasen.",
        "Decide también si un título con exactamente 3 caracteres útiles es válido y deja ese borde cubierto.",
      ],
      [
        "Clase de validación",
        "Suite JUnit",
        "Notas breves sobre decisiones de diseño",
      ],
      `class TaskValidator {
  boolean isValidTitle(String title) {
    // TODO
    return false;
  }
}

// import static org.junit.jupiter.api.Assertions.*;
// import org.junit.jupiter.api.Test;
//
// class TaskValidatorTest {
//   @Test
//   void aceptaTituloValido() {
//     assertTrue(new TaskValidator().isValidTitle("Repasar DOM"));
//   }
//
//   @Test
//   void rechazaTituloVacio() {
//     assertFalse(new TaskValidator().isValidTitle("   "));
//   }
// }`,
      [
        "Cubre un caso válido, uno vacío y uno demasiado corto.",
        "Refactoriza después de tener una base mínima de comprobaciones.",
        "Comprueba que un cambio de nombre o trim no rompe los tests.",
        "Mantén cada test con una sola intención para que el fallo sea fácil de localizar.",
        "Añade un caso nulo o no string si decides endurecer más el contrato.",
        "Añade un caso con exactamente tres caracteres útiles para fijar el borde de longitud mínima.",
      ],
      [
        "La función principal cabe en pocas líneas y su intención sigue siendo obvia.",
        "Los casos de prueba cubren contrato normal, borde y error sin mezclar objetivos.",
        "Cambiar la implementación sin romper comportamiento sería ahora mucho más seguro.",
        "La suite JUnit se entiende leyendo solo los nombres de sus métodos.",
        "El borde exacto de longitud mínima ya no queda implícito: también está fijado por tests.",
      ],
    ),
    "java-spring-intro": projectBrief(
      "Diseña una API REST mínima para tareas de estudio.",
      "Levantar una estructura básica con `Controller`, `Service` y una lista en memoria para exponer tareas por HTTP.",
      [
        "Define una entidad simple `Task` con `id`, `title` y `done`.",
        "Crea un endpoint GET para listar tareas y un POST para crear una nueva.",
        "Separa la lógica de negocio en un `Service` para no dejar todo en el controlador.",
        "Añade validación básica y decide respuestas HTTP para alta inválida o id inexistente.",
        "Diseña también `PATCH /api/tasks/{id}/complete` y un DTO de error mínimo para respuestas fallidas.",
        "Permite filtrar el listado por `done` con query param y decide si la lista devuelve un DTO más corto que el detalle.",
        "Decide qué harías con títulos repetidos o con espacios exteriores y deja ese contrato por escrito en el diseño.",
      ],
      [
        "Modelo simple",
        "DTOs de entrada y salida",
        "DTO de lista",
        "DTO de error",
        "Controller con endpoints",
        "Service con lógica básica",
        "Contratos HTTP y validación",
      ],
      `@RestController
@RequestMapping("/api/tasks")
class TaskController {
  private final TaskService taskService;

  @GetMapping
  List<TaskListItemDto> list(@RequestParam(required = false) Boolean done) {
    return taskService.list(done);
  }

  @PostMapping
  ResponseEntity<TaskDto> create(@RequestBody TaskCreateRequest request) {
    // TODO: validar y devolver 201 o 400.
    return null;
  }

  @PatchMapping("/{id}/complete")
  ResponseEntity<?> complete(@PathVariable long id) {
    // TODO: devolver tarea actualizada, 404 o 409 segun el caso.
    return null;
  }
}`,
      [
        "Revisa que cada endpoint tenga una intención clara y un verbo HTTP coherente.",
        "Comprueba que controller y service no mezclen responsabilidades.",
        "Valida que el DTO expone solo lo necesario para la respuesta.",
        "Comprueba que crear con título vacío tiene un contrato explícito y no una respuesta ambigua.",
        "Decide qué devolvería `PATCH /api/tasks/{id}/complete` si la tarea no existe.",
        "Comprueba que los errores de validación o conflicto tengan un cuerpo estable si decides devolver JSON de error.",
        "Decide si el listado necesita un DTO corto distinto del detalle para no arrastrar datos innecesarios.",
        "Añade un caso de título duplicado o con espacios para fijar si la API normaliza, acepta o rechaza esa entrada.",
      ],
      [
        "La API se entiende por recursos y casos de uso, no por acciones técnicas sueltas.",
        "El controller queda fino y delega la lógica real fuera de HTTP.",
        "La estructura ya parece escalable aunque todavía no haya base de datos real.",
        "DTOs, validación y respuestas HTTP ya están alineados aunque la persistencia siga en memoria.",
        "El contrato de error ya no es improvisado: también tiene forma y intención claras.",
        "El filtrado simple entra por query params y no deforma el diseño de rutas.",
        "Las decisiones de normalización y conflicto ya forman parte del contrato, no quedan como ambigüedad futura.",
      ],
    ),
    "js-values": projectBrief(
      "Construye un resumen básico de sesión a partir de variables y una función pequeña.",
      "Fijar la base más temprana de JavaScript con una pieza útil: recibir datos simples, guardarlos con nombres claros y devolver una salida legible sin efectos secundarios.",
      [
        "Parte de valores simples como nombre, nivel, minutos y XP.",
        "Declara variables con intención clara y evita nombres genéricos.",
        "Crea una función que reciba esos datos y devuelva una frase o pequeño resumen legible.",
        "Haz que la salida sea estable aunque cambien nombre, nivel o minutos.",
        "Comprueba que la función devuelve un string y no depende de `console.log`.",
        "Prueba un caso con cero minutos o cero XP para dejar claro el contrato básico.",
      ],
      [
        "Valores de entrada",
        "Variables con intención",
        "Función simple",
        "Salida legible",
        "Caso borde básico",
      ],
      `const studentName = "Ana";
const currentLevel = "Base";
const sessionMinutes = 30;
const earnedXp = 20;

function buildSessionSummary(name, level, minutes, xp) {
  // TODO: devolver una frase clara con los datos recibidos.
}
`,
      [
        "Comprueba que cada variable representa una sola idea y que el nombre ayuda a leer la función.",
        "Verifica que la función devuelve siempre un string y no deja el trabajo a un `console.log` externo.",
        "Asegúrate de que cambiar un valor de entrada modifica la salida esperada sin romper el formato.",
        "Prueba un caso con valores cero para confirmar que el contrato sigue siendo legible.",
        "Revisa que la lógica siga siendo mínima: aquí el objetivo es claridad, no meter todavía estructuras complejas.",
      ],
      [
        "La base de variables y funciones deja de ser abstracta y pasa a una pieza pequeña con sentido.",
        "Los nombres elegidos ayudan a leer intención y no solo sintaxis.",
        "La función devuelve un contrato estable y fácil de probar.",
        "La ruta base queda más cerrada antes de subir a objetos y colecciones.",
      ],
    ),
    "js-state": projectBrief(
      "Construye un tablero simple de tareas con estado local y render completo.",
      "Pasar de pintar una lista aislada a mantener una pequeña fuente de verdad en memoria, actualizarla con acciones concretas y repintar toda la vista desde ese estado.",
      [
        "Define un objeto `state` con tareas y filtro activo.",
        "Crea funciones puras o casi puras para añadir tarea, alternar completada y calcular pendientes.",
        "Haz un `render()` que pinte lista, contador y filtro visible a partir del estado actual.",
        "Conecta acciones de interfaz para modificar `state` y volver a renderizar.",
        "Guarda y recupera el estado desde `localStorage` sin dispersar esa lógica por toda la app.",
        "Comprueba que una recarga mantiene tareas y filtro, y que cada cambio vuelve a pintar toda la vista sin residuos.",
      ],
      [
        "Objeto de estado",
        "Funciones de actualización",
        "Render completo de lista y contador",
        "Persistencia local",
        "Acciones de interfaz",
        "Pequeño flujo de recarga",
      ],
      `const state = {
  filter: "all",
  tasks: [
    { id: 1, title: "Repasar arrays", done: false },
    { id: 2, title: "Practicar fetch", done: true },
  ],
};

function getVisibleTasks() {
  // TODO: aplicar filtro sobre state.tasks.
}

function toggleTask(taskId) {
  // TODO: actualizar state.tasks sin perder el resto del estado.
}

function render() {
  // TODO: pintar lista, contador y filtro activo.
}

function persistState() {
  // TODO: guardar en localStorage.
}`,
      [
        "Comprueba que añadir o cambiar una tarea modifica la vista completa y no solo una parte suelta.",
        "Verifica que el contador de pendientes y la lista visible salen siempre del mismo estado.",
        "Asegúrate de que el filtro `all / pending / done` no duplica lógica en varios sitios.",
        "Recarga la app y confirma que `localStorage` devuelve la misma vista que dejaste.",
        "Comprueba que renderizar dos veces seguidas no deja nodos viejos ni contadores desfasados.",
      ],
      [
        "Toda la interfaz sale de una única fuente de verdad fácil de localizar.",
        "Actualizar una tarea obliga a tocar estado y render, no a parchear varios nodos manualmente.",
        "La persistencia queda acotada y no contamina la lógica de filtrado o pintado.",
        "La pieza ya se parece a una mini app y no solo a una práctica DOM aislada.",
      ],
    ),
    "js-objects": projectBrief(
      "Construye un selector de tareas pendientes a partir de objetos simples.",
      "Practicar lectura de propiedades, recorrido de colecciones de objetos y construcción de una salida útil sin mezclar todavía DOM ni asincronía.",
      [
        "Parte de un array de tareas con `title`, `completed`, `language` y, si quieres, una prioridad.",
        "Recorre la colección y quédate solo con las tareas pendientes.",
        "Extrae de cada tarea la información mínima que te interesa devolver.",
        "Devuelve una estructura clara, por ejemplo una lista de títulos o un objeto con títulos y contador.",
        "Mantén nombres de propiedades coherentes y no asumas que todos los objetos tienen exactamente el mismo valor en cada campo.",
        "Comprueba qué ocurre si el array llega vacío o si todas las tareas están ya completadas.",
      ],
      [
        "Colección de objetos",
        "Lectura de propiedades",
        "Selección de pendientes",
        "Salida final clara",
        "Casos borde básicos",
      ],
      `const tasks = [
  { title: "Repasar objetos", completed: false, language: "JavaScript" },
  { title: "Practicar clases", completed: true, language: "Java" },
  { title: "Preparar fetch", completed: false, language: "JavaScript" },
];

function buildPendingTasks(items) {
  // TODO: leer propiedades y devolver solo la informacion util de las tareas pendientes.
}
`,
      [
        "Comprueba que la salida usa solo las tareas pendientes y no mezcla completadas por error.",
        "Verifica que leer `item.title` o `item.completed` sea consistente en todos los pasos y no cambies nombres a mitad de función.",
        "Asegúrate de que la salida final sea fácil de consumir después desde otra función o desde una vista.",
        "Prueba el caso de array vacío para confirmar que el contrato sigue siendo estable.",
        "Revisa que no metas todavía render o efectos secundarios: aquí el foco es entender y transformar objetos.",
      ],
      [
        "La lectura de objetos deja de ser teoría y pasa a una pieza de trabajo con intención clara.",
        "La función final devuelve un contrato pequeño, legible y reutilizable.",
        "Los casos borde básicos quedan cubiertos antes de subir a filtros más ricos.",
        "La base queda mejor preparada para arrays, DOM y JSON.",
      ],
    ),
    "js-array-methods": projectBrief(
      "Construye un resumen de progreso a partir de colecciones y métodos de array.",
      "Consolidar `map`, `filter` y `reduce` sobre datos cercanos a una app real para que la transformación deje de sentirse como un ejercicio aislado de sintaxis.",
      [
        "Parte de un array de sesiones o tareas con campos como `title`, `language`, `minutes` y `done`.",
        "Usa `filter` para quedarte solo con el subconjunto que vas a analizar.",
        "Usa `map` si necesitas transformar títulos o preparar una salida más legible.",
        "Usa `reduce` para obtener un resumen útil como minutos totales, pendientes o sesiones por lenguaje.",
        "Devuelve un objeto final o una estructura clara que luego pueda consumirse desde una vista.",
        "Comprueba que los cálculos siguen siendo correctos con arrays vacíos, una sola entrada y datos mezclados.",
      ],
      [
        "Colección de entrada",
        "Filtro del subconjunto útil",
        "Transformación intermedia",
        "Resumen agregado",
        "Resultado final legible",
      ],
      `const sessions = [
  { title: "Repasar map", language: "JavaScript", minutes: 30, done: true },
  { title: "Practicar colecciones", language: "Java", minutes: 45, done: false },
  { title: "Filtrar JSON", language: "JavaScript", minutes: 25, done: false },
];

function buildStudySummary(items) {
  // TODO: filtrar, transformar y resumir con metodos de array.
}
`,
      [
        "Comprueba que el resumen no mezcla el total bruto con el subconjunto filtrado.",
        "Verifica que `reduce` tenga un acumulador estable incluso si el array llega vacío.",
        "Asegúrate de que la salida final tiene nombres y forma fáciles de consumir desde otra función.",
        "Revisa que no estés usando un `for` manual donde el objetivo era practicar `map`, `filter` o `reduce` con intención clara.",
        "Prueba un caso donde solo haya items de un lenguaje para confirmar que el resumen no asume datos mixtos.",
      ],
      [
        "La transformación de datos ya se parece a una necesidad real de producto y no a un kata suelto.",
        "Cada método de array tiene una responsabilidad visible y no está usado por inercia.",
        "La salida final queda lista para render o test sin rehacer cálculos fuera.",
        "La pieza refuerza bien la base antes de entrar en render, JSON y fetch.",
      ],
    ),
    "js-data-to-dom": projectBrief(
      "Construye un panel de estudio que transforme datos en tarjetas visibles con filtros claros.",
      "Practicar la tubería completa `datos -> decisión -> salida` sobre una colección en memoria, separando filtrado, transformación y render para que la interfaz siga siendo legible y re-renderizable.",
      [
        "Parte de un array de items con `title`, `language`, `level` y `completed`.",
        "Crea una función que filtre según un criterio activo como lenguaje o estado.",
        "Crea una segunda función que transforme cada item visible en una tarjeta HTML consistente.",
        "Renderiza el conjunto final dentro de un contenedor único y añade un resumen con total visible y pendientes.",
        "Haz que cambiar el criterio vuelva a pintar toda la vista sin dejar restos del render anterior.",
        "Evita mezclar el filtro dentro del template para que la lógica y la salida queden separadas.",
      ],
      [
        "Colección de datos",
        "Filtro activo",
        "Transformación a tarjeta HTML",
        "Resumen visible",
        "Render completo",
        "Cambio de criterio",
      ],
      `const state = {
  filter: "all",
  items: [
    { title: "Repasar reduce", language: "JavaScript", level: "Base", completed: false },
    { title: "Practicar colecciones", language: "Java", level: "Intermedio", completed: true },
  ],
};

function getVisibleItems(items, filter) {
  // TODO: devolver solo los items visibles segun el filtro activo.
}

function renderStudyCard(item) {
  // TODO: devolver HTML consistente para una tarjeta.
}

function renderStudyPanel() {
  const summary = document.querySelector("#studySummary");
  const grid = document.querySelector("#studyGrid");

  // TODO: filtrar, resumir y renderizar.
}
`,
      [
        "Comprueba que el resumen de pendientes coincide con el subconjunto visible y no con el total bruto.",
        "Verifica que cambiar de filtro sustituya por completo las tarjetas anteriores.",
        "Asegúrate de que el orden visible siga el orden del array filtrado y no se reordene sin motivo.",
        "Comprueba que `renderStudyCard` no tenga dentro decisiones de filtrado que deberían vivir fuera.",
        "Prueba un filtro sin resultados para confirmar que la vista queda limpia y el resumen sigue siendo coherente.",
      ],
      [
        "La lógica de decisión y la salida HTML quedan separadas con una frontera clara.",
        "La vista se puede re-renderizar varias veces sin residuos ni contadores desfasados.",
        "El usuario puede leer tarjetas y resumen como una sola vista coherente.",
        "La pieza consolida bien el salto desde arrays y filtros hacia interfaces más completas.",
      ],
    ),
    "js-render-lists": projectBrief(
      "Construye un listado de prácticas visible a partir de datos reales en memoria.",
      "Pasar de arrays de objetos a una interfaz legible que pinte varias filas, mantenga el orden y sustituya siempre el contenido anterior completo.",
      [
        "Define un array de items con `title`, `language`, `level` y, si quieres, una marca de prioridad.",
        "Crea una función `renderPracticeList(items)` que convierta cada objeto en un `<li>` legible.",
        "Pinta la lista completa dentro de un contenedor único como `#practiceList`.",
        "Añade un pequeño resumen superior con cuántos items se están mostrando.",
        "Prueba una segunda tanda de datos y comprueba que el render sustituye la vista anterior en vez de hacer append.",
        "Mantén el formato de cada fila estable para que el usuario pueda escanear rápido lenguaje, nivel y título.",
      ],
      [
        "Array de datos",
        "Función de render por item o por lista",
        "Contenedor de lista visible",
        "Resumen de items mostrados",
        "Segunda tanda de render",
      ],
      `const items = [
  { title: "map y filter", language: "JavaScript", level: "Base" },
  { title: "Clases y objetos", language: "Java", level: "Intermedio" },
  { title: "Estado local", language: "JavaScript", level: "Intermedio" },
];

function renderPracticeList(items) {
  const list = document.querySelector("#practiceList");
  const summary = document.querySelector("#practiceSummary");

  // TODO: pintar filas y actualizar resumen.
}
`,
      [
        "Comprueba que se pinta exactamente un `<li>` por cada item recibido.",
        "Verifica que el resumen y la lista salgan de la misma tanda de datos.",
        "Asegúrate de que una segunda llamada no deja elementos anteriores colgados.",
        "Comprueba que el orden visible coincide con el orden del array de entrada.",
        "Revisa que el formato de cada fila siga siendo legible aunque cambie el lenguaje o el nivel.",
      ],
      [
        "El render convierte datos en interfaz sin mezclar fetch, estado global ni listeners innecesarios.",
        "La lista se puede volver a pintar varias veces sin arrastrar residuos.",
        "El usuario puede escanear título, lenguaje y nivel de un vistazo.",
        "La pieza ya prepara bien el salto posterior hacia filtros y estado local.",
      ],
    ),
    "js-dom": projectBrief(
      "Construye un contador de estudio con acciones visibles y DOM controlado.",
      "Practicar selección de nodos, eventos y actualización coherente de interfaz con una pieza pequeña que cambie estado visible en pantalla.",
      [
        "Crea un bloque con contador, botón de sumar, botón de reset y una etiqueta de estado.",
        "Selecciona todos los nodos necesarios con `querySelector`.",
        "Conecta listeners para incrementar el contador y reiniciarlo.",
        "Actualiza también un mensaje visible como `Sin empezar`, `En progreso` o `Reiniciado` según la acción.",
        "Evita duplicar listeners si vuelves a inicializar la pieza o recargas la práctica.",
        "Comprueba que la interfaz cambia siempre desde una única función de actualización y no con parches dispersos.",
      ],
      [
        "Estructura HTML simple",
        "Selección de nodos",
        "Eventos click",
        "Actualización de contador",
        "Mensaje de estado",
        "Función de actualización visible",
      ],
      `const state = {
  xp: 0,
  status: "Sin empezar",
};

function updateView() {
  const counter = document.querySelector("#xpCounter");
  const status = document.querySelector("#xpStatus");

  // TODO: pintar state.xp y state.status.
}

function connectCounter() {
  const addButton = document.querySelector("#addXp");
  const resetButton = document.querySelector("#resetXp");

  // TODO: conectar listeners y llamar a updateView().
}
`,
      [
        "Comprueba que el contador cambia al pulsar y vuelve a cero al reiniciar.",
        "Verifica que el mensaje de estado también cambia junto al contador.",
        "Asegúrate de que la vista se puede repintar varias veces sin incoherencias.",
        "Comprueba que no se dispara el incremento dos veces por un listener duplicado.",
        "Revisa que todos los cambios visibles salgan de una misma función de actualización.",
      ],
      [
        "La interacción responde al clic con cambios visibles inmediatos y predecibles.",
        "Los nodos se seleccionan una vez con intención clara y no de forma caótica.",
        "Contador y mensaje se mantienen sincronizados en cada acción.",
        "La pieza ya sirve como base para formularios, toggles y paneles más ricos.",
      ],
    ),
    "js-forms": projectBrief(
      "Construye un formulario de tareas con validación y feedback visible.",
      "Practicar `submit`, lectura de inputs, validación básica y mensajes de error o confirmación sin recargar la página.",
      [
        "Crea un formulario con título, prioridad y botón de guardar.",
        "Escucha el evento `submit` y usa `preventDefault()`.",
        "Valida que el título no esté vacío y tenga una longitud mínima razonable.",
        "Muestra un mensaje visible de error o éxito en pantalla.",
        "Limpia el formulario solo cuando la validación sea correcta.",
        "Haz que varios envíos seguidos mantengan un comportamiento estable y no dupliquen listeners.",
      ],
      [
        "Estructura del formulario",
        "Lectura de campos",
        "Validación básica",
        "Feedback visible",
        "Limpieza del formulario",
        "Flujo de varios envíos",
      ],
      `function connectTaskForm() {
  const form = document.querySelector("#taskForm");
  const titleInput = document.querySelector("#taskTitle");
  const priorityInput = document.querySelector("#taskPriority");
  const feedback = document.querySelector("#taskFeedback");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // TODO: validar, mostrar feedback y limpiar si todo va bien.
  });
}
`,
      [
        "Comprueba que un título vacío no limpia el formulario y muestra error.",
        "Verifica que un título válido sí muestra confirmación y limpia los campos esperados.",
        "Asegúrate de que el mensaje cambia entre error y éxito sin quedarse congelado.",
        "Prueba varios submits seguidos para confirmar que no duplicas eventos.",
        "Revisa que la lógica de validación no dependa de texto hardcodeado repartido por varios sitios.",
      ],
      [
        "El formulario responde al submit sin recargar la página.",
        "Error y éxito tienen contratos visibles distintos y fáciles de reconocer.",
        "La limpieza de campos ocurre solo cuando toca.",
        "La pieza ya sirve como base para entradas más ricas y validaciones posteriores.",
      ],
    ),
    "js-components": projectBrief(
      "Extrae una tarjeta de práctica reutilizable a partir de datos.",
      "Tomar un bloque repetido de UI, convertirlo en una función que recibe datos y devuelve HTML consistente.",
      [
        "Detecta qué estructura HTML se repite.",
        "Crea una función `renderPracticeCard(item)` que devuelva una tarjeta completa.",
        "Úsala con `map` para pintar varias tarjetas desde un array.",
      ],
      [
        "Función de render",
        "Array de datos de ejemplo",
        "Renderizado de varias tarjetas",
      ],
      `function renderPracticeCard(item) {
  return \`<article><h3>\${item.title}</h3></article>\`;
}`,
    ),
    "js-async": projectBrief(
      "Carga un resumen de estudio con `async/await` y manejo de errores.",
      "Practicar el flujo completo de esperar datos, transformarlos y responder con un valor útil o un fallback claro.",
      [
        "Crea una función async que espere una fuente de datos.",
        "Extrae de la respuesta solo la información que quieres mostrar.",
        "Envuelve el flujo en `try/catch` y devuelve un mensaje de error coherente si falla.",
      ],
      [
        "Función async",
        "Transformación de respuesta",
        "Manejo explícito de error",
      ],
    ),
    "js-json-fetch": projectBrief(
      "Construye un visor de JSON local con resumen, filtros y recarga limpia.",
      "Dar el paso desde `fetch` y `response.json()` hasta una pequeña utilidad real que cargue datos, los resuma y permita ver solo una parte útil sin arrastrar estado viejo.",
      [
        "Carga un JSON local con `fetch`.",
        "Convierte la respuesta con `await response.json()`.",
        "Construye un resumen: total de items, cuántos son JavaScript y cuántos son destacados.",
        "Permite aplicar un filtro simple por lenguaje o nivel antes de renderizar la lista visible.",
        "Haz que la vista sustituya siempre el contenido anterior al cambiar de filtro.",
        "Añade una acción de recarga o cambio de dataset sin duplicar listeners ni recalcular fuera de estado.",
      ],
      [
        "Carga desde JSON local",
        "Conversión a objeto",
        "Resumen calculado",
        "Filtro activo",
        "Lista visible",
        "Recarga controlada",
      ],
      `const state = {
  language: "all",
  level: "all",
  items: [],
};

async function loadJsonViewer() {
  // TODO: cargar JSON local, guardar items y renderizar.
}

function getVisibleItems(items) {
  // TODO: aplicar filtros actuales.
  return items;
}

function renderJsonViewer() {
  // TODO: pintar resumen y lista visible sin arrastrar contenido anterior.
}`,
      [
        "Comprueba que el resumen cambie cuando el JSON tiene otro número de items destacados.",
        "Verifica que cambiar un filtro no deje elementos de la vista anterior.",
        "Asegúrate de que el estado `all` siga mostrando el conjunto completo.",
        "Prueba una recarga con otro lote para confirmar que resumen y lista se actualizan a la vez.",
      ],
      [
        "La vista carga el JSON una vez y re-renderiza desde estado local.",
        "Resumen y lista visible salen de la misma fuente de datos, no de cálculos duplicados.",
        "Cambiar filtros sustituye la vista anterior completa y no solo hace append.",
        "La recarga actualiza resumen y lista como una sola operación visible.",
      ],
    ),
    "js-json-to-dom": projectBrief(
      "Construye una vista de destacados a partir de un objeto JSON ya cargado.",
      "Practicar el paso intermedio entre datos ya disponibles en memoria y una interfaz que filtra, resume y pinta solo la parte útil.",
      [
        "Parte de un objeto `data` con una propiedad `items` ya disponible.",
        "Filtra solo los elementos destacados o los que cumplen una condición clara.",
        "Genera una lista visible en el DOM con título, lenguaje y nivel.",
        "Añade un resumen corto con cuántos items destacados se están mostrando.",
        "Haz que una segunda llamada con otro objeto sustituya completamente la lista anterior.",
        "Separa en una función el filtrado y en otra el render para no mezclar responsabilidades.",
      ],
      [
        "Objeto JSON ya parseado",
        "Filtro de items destacados",
        "Resumen visible",
        "Lista renderizada",
        "Segundo render sin residuos",
      ],
      `function getFeaturedItems(data) {
  // TODO: devolver solo los items destacados.
}

function renderFeaturedItems(data) {
  const summary = document.querySelector("#featuredSummary");
  const list = document.querySelector("#featuredList");

  // TODO: filtrar, resumir y pintar en DOM.
}
`,
      [
        "Comprueba que el número del resumen coincide con los `<li>` pintados.",
        "Verifica que una segunda carga con menos destacados vacía lo anterior que ya no aplica.",
        "Asegúrate de que el filtro sale del propio objeto `data` y no de variables sueltas externas.",
        "Comprueba que el orden visible respeta el orden original de `data.items`.",
        "Revisa que el render siga siendo legible aunque mezcle Java y JavaScript.",
      ],
      [
        "El filtro de destacados y el render están separados con intención clara.",
        "La vista se puede volver a pintar con otro objeto sin arrastrar restos.",
        "Resumen y lista salen del mismo subconjunto de datos.",
        "La pieza ya prepara bien el salto posterior hacia `fetch` y cargas asíncronas.",
      ],
    ),
    "js-modules": projectBrief(
      "Separa un visor de prácticas en módulos pequeños y con intención clara.",
      "Pasar de una sola pieza de código a una estructura mínima con responsabilidades separadas: estado, carga de datos, filtrado y render.",
      [
        "Define un módulo de estado con filtros activos y colección cargada.",
        "Extrae un módulo `catalog-service.js` o similar para cargar y normalizar datos.",
        "Extrae un módulo de render que reciba datos ya preparados y pinte resumen y lista.",
        "Crea un punto de entrada pequeño que conecte listeners, carga inicial y re-render.",
        "Evita que el módulo de render haga `fetch` o que el de datos toque directamente el DOM.",
        "Comprueba que una recarga o cambio de filtro siga actualizando toda la vista desde una sola fuente de verdad.",
      ],
      [
        "Módulo de estado",
        "Módulo de carga de datos",
        "Módulo de filtrado o transformación",
        "Módulo de render",
        "Archivo de arranque",
        "Notas sobre responsabilidades de cada pieza",
      ],
      `// state.js
export const state = {
  items: [],
  language: "all",
  level: "all",
};

// catalog-service.js
export async function loadCatalog(fetchItems) {
  // TODO: cargar y normalizar.
}

// catalog-render.js
export function renderCatalog(state) {
  // TODO: pintar resumen y lista visible.
}

// main.js
import { state } from "./state.js";
import { loadCatalog } from "./catalog-service.js";
import { renderCatalog } from "./catalog-render.js";

// TODO: conectar carga inicial, filtros y render.
`,
      [
        "Comprueba que cada módulo tenga una sola responsabilidad visible.",
        "Verifica que cambiar un filtro no obligue a duplicar lógica de transformación en varios archivos.",
        "Asegúrate de que `main.js` coordina, pero no concentra la lógica real.",
        "Revisa que el render salga siempre del estado actual y no de variables sueltas dispersas.",
        "Comprueba que podrías sustituir la fuente de datos sin rehacer el módulo de render.",
      ],
      [
        "Los nombres de archivos explican su responsabilidad sin leer toda la implementación.",
        "El flujo `cargar -> guardar en estado -> renderizar` se sigue de un vistazo.",
        "Cambiar el filtro o recargar datos no obliga a tocar varias ramas duplicadas.",
        "La separación ya prepara el terreno para crecer sin volver al monolito inicial.",
      ],
    ),
    "js-fetch-to-dom": projectBrief(
      "Construye una vista de consumo de API pública con filtrado, recarga y render limpio.",
      "Unir `async/await`, filtrado de datos, recarga y estados básicos para montar una vista útil de verdad a partir de una API pública o una fuente remota equivalente.",
      [
        "Crea una función async que espere datos de `fetchItems` o de una API pública.",
        "Transforma la respuesta a una lista homogénea para la interfaz.",
        "Filtra solo los items que interesan antes de pintar.",
        "Pinta una lista final con nombre y metadatos útiles en el DOM.",
        "Haz que una segunda carga sustituya siempre el contenido anterior completo.",
        "Añade una acción de recarga o cambio de filtro sin duplicar listeners ni nodos.",
      ],
      [
        "Función async",
        "Transformación de respuesta remota",
        "Lista renderizada",
        "Filtro aplicado",
        "Recarga controlada",
      ],
      `async function loadItems(fetchItems) {
  const data = await fetchItems();
  const items = data.items ?? [];

  // TODO: transformar, filtrar y pintar.
}`,
      [
        "Comprueba que una segunda carga válida sustituya la lista anterior en vez de hacer append.",
        "Verifica que si la API devuelve más campos de los necesarios, la vista siga pintando solo lo importante.",
        "Asegúrate de que el filtro deja fuera los elementos no relevantes sin romper el orden útil.",
        "Prueba una recarga después de un lote vacío o distinto para confirmar que no quedan restos visuales.",
      ],
      [
        "La vista puede adaptarse a una API pública porque primero transforma la respuesta y luego renderiza.",
        "El render final no depende del formato bruto remoto, sino de una lista ya normalizada.",
        "Recargar datos vuelve a pintar la vista completa sin residuos del lote anterior.",
        "La recarga y el filtro viven en un flujo claro y no en parches repartidos por el archivo.",
      ],
    ),
    "js-ui-states": projectBrief(
      "Diseña una vista resiliente con carga, vacío y error.",
      "Evitar que la interfaz solo funcione en el caso feliz y enseñar a comunicar estados reales al usuario.",
      [
        "Muestra un mensaje de carga antes de esperar datos.",
        "Pinta un mensaje vacío si no hay items.",
        "Captura errores y muestra un mensaje útil sin romper la vista.",
        "Asegúrate de que una carga válida después de un error o un vacío recupere la vista completa.",
      ],
      [
        "Estado de carga",
        "Estado vacío",
        "Estado de error",
        "Recuperación tras recarga",
      ],
      `async function loadCourses(fetchItems) {
  const status = document.querySelector("#status");
  const list = document.querySelector("#courseList");

  status.textContent = "Cargando...";
  list.innerHTML = "";
}`,
      [
        "Comprueba que una respuesta vacía no deje restos de la carga anterior.",
        "Verifica que un error limpie la lista y deje un mensaje distinto del estado vacío.",
        "Asegúrate de que una segunda carga válida recupere la vista después de un error.",
      ],
      [
        "Los textos de carga, vacío y error son distinguibles sin ambigüedad.",
        "La interfaz puede fallar y recuperarse sin recargar la página completa.",
        "Cada recarga sustituye el estado visual anterior y no arrastra nodos viejos.",
      ],
    ),
    "js-testing": projectBrief(
      "Extrae helpers puros de un dashboard y cúbrelos con tests.",
      "Separar reglas de filtrado y resumen del render DOM para poder refactorizar la interfaz con una red mínima de seguridad.",
      [
        "Crea una función `getVisibleTasks(tasks, filter)` que no toque el DOM.",
        "Crea una función `buildTaskSummary(tasks)` que devuelva totales claros.",
        "Escribe casos de prueba para filtro normal, lista vacía y filtro desconocido.",
        "Deja el render como una capa fina que consuma esos helpers ya probados.",
      ],
      [
        "Helper de filtrado",
        "Helper de resumen",
        "Casos de prueba",
        "Render fino apoyado en helpers",
      ],
      `function getVisibleTasks(tasks, filter) {
  // TODO
  return tasks;
}

function buildTaskSummary(tasks) {
  // TODO
  return {
    total: 0,
    pending: 0,
    completed: 0,
  };
}

// expect(getVisibleTasks(tasks, "pending")).toHaveLength(2);
// expect(buildTaskSummary(tasks)).toEqual({ total: 3, pending: 2, completed: 1 });`,
      [
        "Comprueba que el filtro `pending` conserve el orden original.",
        "Verifica que la lista vacía devuelva un resumen coherente y sin errores.",
        "Asegúrate de que un filtro desconocido no rompe la función y tiene un contrato claro.",
        "Confirma que el render solo consume helpers y no recalcula reglas por su cuenta.",
      ],
      [
        "La lógica de negocio ya no depende del DOM para probarse.",
        "Los tests cubren caso normal, borde y contrato de error.",
        "Cambiar el HTML del dashboard no obliga a rehacer la lógica central.",
      ],
    ),
    "js-project": projectBrief(
      "Construye un dashboard de estudio con filtros persistentes conectado a JSON local.",
      "Unir fetch, filtrado, renderizado, estado local y persistencia en una app pequeña pero completa, cercana a una herramienta real de estudio.",
      [
        "Carga datos desde un JSON local con `fetch`.",
        "Permite filtrar por lenguaje y dificultad sin recargar.",
        "Muestra contadores simples como total visible y total filtrado.",
        "Guarda una preferencia o progreso simple en `localStorage`.",
        "Haz que re-renderizar sustituya siempre la vista anterior completa.",
      ],
      [
        "Vista principal con lista",
        "Filtros activos por lenguaje y dificultad",
        "Contadores de resumen",
        "Persistencia local",
      ],
      `const state = {
  filter: "all",
  level: "all",
  items: [],
};

async function loadDashboard() {
  // TODO: cargar datos y renderizar.
}

function renderDashboard() {
  // TODO: pintar contadores y lista visible.
}

function applyFilters(items) {
  // TODO: devolver solo los items que pasan los filtros actuales.
  return items;
}`,
      [
        "Comprueba que cambiar filtro actualice lista y contadores sin duplicar nodos viejos.",
        "Verifica que recargar la página recupere al menos una preferencia guardada.",
        "Asegúrate de que el estado `all` no oculte elementos por error.",
      ],
      [
        "La lista visible cambia por filtros sin dejar restos del render anterior.",
        "El dashboard enseña al menos un contador útil además de la lista.",
        "El estado queda suficientemente pequeño y claro como para extenderlo después.",
      ],
    ),
  },

});
