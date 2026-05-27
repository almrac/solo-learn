var learningRoot = typeof window === "undefined" ? globalThis : window;

Object.assign(learningRoot.LEARNING_DATA, {
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
      ],
    }),
    "js-project": exercise({
      family: "Proyecto final",
      difficulty: "Avanzado",
      practiceType: "Función",
      prompt: "Implementa `crearResumenDashboard(tasks, filters)` para preparar datos de un pequeño dashboard de estudio.",
      checklist: [
        "Recibe un array `tasks` y un objeto `filters` con `status`.",
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
    ),
    "java-collections": guide(
      "Construye un pequeño registro de progreso por lenguaje usando List y Map.",
      "Una lista de tareas y un mapa con XP por lenguaje.",
      "Muestra cuántas tareas hay pendientes y cuánto XP tiene cada lenguaje.",
      [
        "Usa ArrayList para guardar tareas.",
        "Usa HashMap para asociar lenguaje con XP.",
        "Recorre ambas estructuras y muestra un resumen legible.",
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
    ),
    "java-testing": guide(
      "Diseña una función `estaAprobado(int nota)` y plantea sus pruebas principales.",
      "Tres casos base: 4, 5 y 10.",
      "false para 4, true para 5 y true para 10.",
      [
        "Separa la lógica en una función pequeña.",
        "Piensa un caso que falla y dos que pasan.",
        "Escribe qué comprobarías en JUnit aunque no ejecutes el test aquí.",
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
}`,
    ),
    "java-spring-intro": guide(
      "Diseña la estructura base de una API de tareas con Spring.",
      "Operaciones mínimas: listar tareas, crear tarea y completar tarea.",
      "Una propuesta de capas con controller, service y DTOs sencillos.",
      [
        "Define al menos tres endpoints HTTP con intención clara.",
        "Separa qué devolvería el controller y qué resolvería el service.",
        "Piensa un DTO de entrada y otro de salida antes de tocar base de datos.",
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
  // TODO: POST crear tarea.
  // TODO: PATCH completar tarea.
}`,
    ),
  },

  projectBriefs: {
    "java-oop": projectBrief(
      "Modela una biblioteca pequeña con objetos reales.",
      "Definir clases con atributos privados y comportamientos claros para dejar atrás soluciones planas con variables sueltas.",
      [
        "Crea una clase `Book` con título, autor y disponibilidad.",
        "Añade métodos como `borrow()` y `giveBack()`.",
        "Instancia varios libros y muestra su estado desde `main`.",
      ],
      [
        "Clase `Book`",
        "Métodos de comportamiento",
        "Pequeña demo en `main`",
      ],
      `public class Book {
  private String title;
  private boolean available = true;

  public Book(String title) {
    this.title = title;
  }

  public void borrow() {
    // TODO
  }

  public void giveBack() {
    // TODO
  }
}`,
    ),
    "java-collections": projectBrief(
      "Construye un registro de progreso por lenguaje usando colecciones.",
      "Pasar de variables sueltas a estructuras que permitan crecer: listas de tareas y mapas de XP por categoría.",
      [
        "Usa `ArrayList` para tareas pendientes o completadas.",
        "Usa `HashMap` para asociar lenguaje con XP acumulado.",
        "Muestra un resumen final recorriendo ambas estructuras.",
      ],
      [
        "Lista de tareas",
        "Mapa de XP",
        "Resumen por consola",
      ],
      `List<String> pendingTasks = new ArrayList<>();
Map<String, Integer> xpByTrack = new HashMap<>();

pendingTasks.add("Repasar arrays");
pendingTasks.add("Practicar DOM");

xpByTrack.put("java", 120);
xpByTrack.put("javascript", 160);

// TODO: mostrar resumen final.`,
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
    ),
    "java-exceptions": projectBrief(
      "Crea un validador de notas resistente a entradas inválidas.",
      "Unir parseo, validación de rango y tratamiento claro del error en una utilidad simple pero realista.",
      [
        "Escribe un método `parseGrade(String text)` que convierta texto a entero.",
        "Devuelve `-1` si el valor no es numérico o cae fuera del rango 0-10.",
        "Prueba varios casos desde `main`, incluidos vacío, texto y nota válida.",
      ],
      [
        "Método de parseo",
        "Validación de rango",
        "Casos de prueba manuales",
      ],
      `public static int parseGrade(String text) {
  // TODO: convertir y validar 0-10.
  return -1;
}`,
    ),
    "java-testing": projectBrief(
      "Refactoriza una utilidad de validación y cúbrela con JUnit.",
      "Separar lógica de validación de entrada, escribir tests de caso normal, borde y error, y dejar una API pequeña y clara.",
      [
        "Diseña una clase `TaskValidator` con una responsabilidad concreta.",
        "Escribe al menos tres tests: válido, vacío y demasiado corto.",
        "Refactoriza nombres o duplicaciones después de que los tests pasen.",
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

// assertTrue(new TaskValidator().isValidTitle("Repasar DOM"));`,
    ),
    "java-spring-intro": projectBrief(
      "Diseña una API REST mínima para tareas de estudio.",
      "Levantar una estructura básica con `Controller`, `Service` y una lista en memoria para exponer tareas por HTTP.",
      [
        "Define una entidad simple `Task` con `id`, `title` y `done`.",
        "Crea un endpoint GET para listar tareas y un POST para crear una nueva.",
        "Separa la lógica de negocio en un `Service` para no dejar todo en el controlador.",
      ],
      [
        "Modelo simple",
        "Controller con endpoints",
        "Service con lógica básica",
      ],
      `@RestController
@RequestMapping("/api/tasks")
class TaskController {
  @GetMapping
  List<TaskDto> list() {
    return List.of();
  }
}`,
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
      "Lee un JSON local y conviértelo en un resumen útil.",
      "Dar el paso desde `fetch` y `response.json()` hasta una transformación real de datos sin tocar todavía una API externa.",
      [
        "Carga un JSON local con `fetch`.",
        "Convierte la respuesta con `await response.json()`.",
        "Construye un resumen: total de items, cuántos son JavaScript y cuántos son destacados.",
      ],
      [
        "Carga desde JSON local",
        "Conversión a objeto",
        "Resumen calculado",
      ],
    ),
    "js-fetch-to-dom": projectBrief(
      "Carga y pinta una lista filtrada desde datos asíncronos.",
      "Unir `async/await`, filtrado de datos y renderizado básico para montar una vista útil de verdad.",
      [
        "Crea una función async que espere datos de `fetchItems`.",
        "Filtra solo los items que interesan.",
        "Pinta una lista final con `title` y `level` en el DOM.",
      ],
      [
        "Función async",
        "Lista renderizada",
        "Filtro aplicado",
      ],
      `async function loadItems(fetchItems) {
  const data = await fetchItems();
  const items = data.items ?? [];

  // TODO: filtrar y pintar.
}`,
    ),
    "js-ui-states": projectBrief(
      "Diseña una vista resiliente con carga, vacío y error.",
      "Evitar que la interfaz solo funcione en el caso feliz y enseñar a comunicar estados reales al usuario.",
      [
        "Muestra un mensaje de carga antes de esperar datos.",
        "Pinta un mensaje vacío si no hay items.",
        "Captura errores y muestra un mensaje útil sin romper la vista.",
      ],
      [
        "Estado de carga",
        "Estado vacío",
        "Estado de error",
      ],
      `async function loadCourses(fetchItems) {
  const status = document.querySelector("#status");
  const list = document.querySelector("#courseList");

  status.textContent = "Cargando...";
  list.innerHTML = "";
}`,
    ),
    "js-project": projectBrief(
      "Construye un dashboard de estudio conectado a JSON local.",
      "Unir fetch, filtrado, renderizado, estado local y persistencia en una app pequeña pero completa desplegable en GitHub Pages.",
      [
        "Carga datos desde un JSON local con `fetch`.",
        "Permite filtrar por lenguaje o dificultad sin recargar.",
        "Guarda una preferencia o progreso simple en `localStorage`.",
      ],
      [
        "Vista principal con lista",
        "Filtros activos",
        "Persistencia local",
      ],
      `const state = {
  filter: "all",
  items: [],
};

async function loadDashboard() {
  // TODO: cargar datos y renderizar.
}`,
    ),
  },

});
