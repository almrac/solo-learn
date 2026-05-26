const learningRoot = typeof window === "undefined" ? globalThis : window;

learningRoot.LEARNING_DATA = {
  // "tracks" define la ruta principal de aprendizaje.
  // Cada lenguaje tiene sus lecciones base y metadatos de navegación.
  tracks: {
    java: {
      label: "Java",
      title: "Fundamentos, OOP y backend",
      summary: "Sintaxis, orientación a objetos, colecciones, testing y bases para APIs con Spring.",
      lessons: [
        lesson("java-variables", "Cero", "Variables, tipos y consola", 40, [
          "Tipos primitivos",
          "String",
          "Entrada y salida básica",
        ], "¿Qué tipo usarías para guardar un número entero en Java?", ["int", "boolean", "String"], "int"),
        lesson("java-methods", "Cero", "Métodos y parámetros", 45, [
          "static",
          "Parámetros",
          "return",
        ], "¿Qué palabra devuelve un valor desde un método?", ["return", "break", "print"], "return"),
        lesson("java-control", "Base", "Condicionales y bucles", 55, [
          "if / else",
          "switch",
          "for, while y do while",
        ], "¿Qué bucle se ejecuta al menos una vez aunque la condición sea falsa?", ["for", "while", "do while"], "do while"),
        lesson("java-arrays", "Base", "Arrays y recorrido de datos", 60, [
          "Arrays",
          "Índices",
          "for-each",
        ], "¿Cuál es el primer índice de un array en Java?", ["0", "1", "-1"], "0"),
        lesson("java-oop", "Intermedio", "Clases y objetos", 75, [
          "Constructores",
          "Encapsulación",
          "Métodos de instancia",
        ], "¿Qué palabra clave oculta un atributo fuera de su clase?", ["private", "static", "extends"], "private"),
        lesson("java-inheritance", "Intermedio", "Herencia e interfaces", 85, [
          "extends",
          "implements",
          "Polimorfismo",
        ], "¿Qué palabra usa una clase para cumplir una interfaz?", ["implements", "extends", "private"], "implements"),
        lesson("java-collections", "Intermedio", "Colecciones y genéricos", 90, [
          "List y Map",
          "Iteración",
          "Tipos genéricos",
        ], "¿Qué colección guarda pares clave-valor?", ["ArrayList", "HashMap", "HashSet"], "HashMap"),
        lesson("java-exceptions", "Intermedio", "Excepciones y validación", 95, [
          "try / catch",
          "Validaciones",
          "Errores recuperables",
        ], "¿Qué bloque captura una excepción?", ["catch", "finally", "throw"], "catch"),
        lesson("java-testing", "Avanzado", "Testing y arquitectura", 120, [
          "JUnit",
          "Separación de capas",
          "Errores y excepciones",
        ], "¿Qué práctica comprueba una unidad de código de forma aislada?", ["JUnit", "CSS Grid", "localStorage"], "JUnit"),
        lesson("java-spring-intro", "Avanzado", "Primeras APIs con Spring", 140, [
          "Controladores",
          "DTO",
          "Servicios",
        ], "¿Qué capa suele exponer endpoints HTTP en Spring?", ["Controller", "Entity", "Repository"], "Controller"),
      ],
    },
    javascript: {
      label: "JavaScript",
      title: "Frontend moderno",
      summary: "DOM, asincronía, módulos, estado local, testing y bases para frameworks.",
      lessons: [
        lesson("js-values", "Cero", "Valores, variables y funciones", 40, [
          "let y const",
          "Funciones",
          "Arrays básicos",
        ], "¿Qué declaración evita reasignar una variable?", ["let", "const", "var"], "const"),
        lesson("js-objects", "Cero", "Objetos y arrays", 45, [
          "Propiedades",
          "Métodos de array",
          "Datos anidados",
        ], "¿Qué estructura guarda pares propiedad-valor?", ["Objeto", "String", "Boolean"], "Objeto"),
        lesson("js-array-methods", "Base", "map, filter y reduce", 55, [
          "Transformar arrays",
          "Filtrar elementos",
          "Acumular resultados",
        ], "¿Qué método usarías para quedarte solo con algunos elementos de un array?", ["map", "filter", "reduce"], "filter"),
        lesson("js-render-lists", "Base", "Pintar listas desde datos", 65, [
          "Convertir datos en HTML",
          "innerHTML",
          "Listas dinámicas",
        ], "¿Qué propiedad suele usarse para insertar una cadena HTML dentro de un elemento?", ["textContent", "innerHTML", "dataset"], "innerHTML"),
        lesson("js-dom", "Base", "DOM y eventos", 60, [
          "querySelector",
          "addEventListener",
          "Cambios de interfaz",
        ], "¿Qué método se usa para escuchar un clic?", ["addEventListener", "parseInt", "map"], "addEventListener"),
        lesson("js-forms", "Base", "Formularios y validación", 65, [
          "submit",
          "FormData",
          "Mensajes de error",
        ], "¿Qué evento se dispara al enviar un formulario?", ["submit", "keydown", "load"], "submit"),
        lesson("js-async", "Intermedio", "Asincronía y fetch", 85, [
          "Promise",
          "async / await",
          "Consumo de APIs",
        ], "¿Qué palabra permite esperar una Promise dentro de una función async?", ["await", "yield", "return"], "await"),
        lesson("js-json-to-dom", "Intermedio", "JSON local a interfaz", 100, [
          "Leer estructura de datos",
          "Filtrar items útiles",
          "Pintar resultados en DOM",
        ], "Si ya tienes un objeto JSON convertido a JavaScript, ¿qué parte sueles recorrer para pintar una lista?", ["response", "items", "status"], "items"),
        lesson("js-fetch-to-dom", "Intermedio", "fetch a interfaz", 110, [
          "await fetch",
          "Transformar datos cargados",
          "Pintar resultados",
        ], "Si una función necesita esperar datos antes de pintar el DOM, ¿qué palabra suele aparecer dentro de una función async?", ["await", "return", "break"], "await"),
        lesson("js-ui-states", "Intermedio", "Estados de carga, vacío y error", 115, [
          "Loading states",
          "Empty states",
          "Manejo de errores",
        ], "Si una carga remota falla, ¿qué conviene hacer además de registrar el error?", ["Ocultar toda la UI", "Mostrar un mensaje útil", "Recargar la página siempre"], "Mostrar un mensaje útil"),
        lesson("js-json-fetch", "Intermedio", "JSON local con fetch", 95, [
          "fetch a un archivo JSON",
          "Recorrer arrays de objetos",
          "Pintar items en el DOM",
        ], "¿Qué método convierte una respuesta fetch en datos JavaScript?", ["response.json()", "JSON.stringify()", "document.createElement()"], "response.json()"),
        lesson("js-modules", "Intermedio", "Módulos y organización", 90, [
          "export",
          "import",
          "Separación por responsabilidades",
        ], "¿Qué instrucción trae código de otro módulo?", ["include", "import", "attach"], "import"),
        lesson("js-state", "Intermedio", "Estado, persistencia y patrones", 100, [
          "Estado inmutable",
          "localStorage",
          "Renderizado",
        ], "¿Dónde guarda esta app tu progreso en el navegador?", ["localStorage", "session cookie", "Base de datos remota"], "localStorage"),
        lesson("js-data-to-dom", "Intermedio", "De datos a interfaz", 105, [
          "Filtrar datos",
          "Transformar arrays",
          "Pintar resultados",
        ], "Si quieres mostrar solo algunos items antes de pintarlos, ¿qué método suele ser el paso natural?", ["filter", "trim", "split"], "filter"),
        lesson("js-testing", "Avanzado", "Testing de funciones e interfaz", 115, [
          "Funciones puras",
          "Casos límite",
          "Pruebas de UI",
        ], "¿Qué tipo de función es más fácil de probar?", ["Pura", "Global", "Anónima"], "Pura"),
        lesson("js-components", "Avanzado", "Componentes y frameworks", 130, [
          "Componentes",
          "Props",
          "Estado local",
        ], "¿Qué pieza reutilizable agrupa estructura, lógica y estado?", ["Componente", "Cookie", "Selector"], "Componente"),
        lesson("js-project", "Avanzado", "Proyecto final frontend", 150, [
          "Arquitectura",
          "Datos reales",
          "Deploy",
        ], "¿Qué paso hace visible una app estática en GitHub Pages?", ["Deploy", "Lint", "Parse"], "Deploy"),
      ],
    },
  },

  // "lessonDetails" amplía cada lección con teoría, ejemplo y práctica.
  // Aquí separamos contenido de la lógica de la app.
  lessonDetails: {
    "java-variables": details(
      "Java es estricto con los tipos: antes de usar un dato tienes que decidir qué representa. Empieza practicando con int, double, boolean, char y String para entender cómo el compilador protege tu código.",
      ["Declara variables con tipos distintos.", "Imprime una frase combinando texto y valores.", "Cambia un valor y observa qué líneas dependen de ese cambio."],
      `public class VariablesDemo {
  public static void main(String[] args) {
    String nombre = "Ana";
    int edad = 21;
    boolean estudia = true;
    System.out.println(nombre + " tiene " + edad + " años");
    System.out.println("Estudia programación: " + estudia);
  }
}`,
      "Crea una ficha de estudiante con nombre, edad, nota media y si tiene el módulo aprobado. Imprime una línea legible con todos los datos.",
    ),
    "java-methods": details(
      "Un método encapsula una acción o cálculo. Si sabes dividir un problema en métodos pequeños, el código se vuelve más legible y mucho más fácil de probar.",
      ["Crea un método que no devuelva nada.", "Crea otro que reciba dos parámetros.", "Devuelve un resultado con return y úsalo desde main."],
      `static int sumarXp(int actual, int ganado) {
  return actual + ganado;
}

public static void main(String[] args) {
  int xp = sumarXp(120, 30);
  System.out.println(xp);
}`,
      "Crea un método calcularNivel que reciba XP y devuelva el nivel usando bloques de 150 XP.",
    ),
    "java-control": details(
      "Las estructuras de control permiten tomar decisiones y repetir trabajo. Dominar if, switch, for y while es imprescindible antes de entrar en orientación a objetos.",
      ["Escribe una condición con else.", "Recorre valores con for.", "Usa while para repetir hasta que se cumpla una condición."],
      `int nota = 7;

if (nota >= 5) {
  System.out.println("Aprobado");
} else {
  System.out.println("Pendiente");
}

for (int intento = 1; intento <= 3; intento++) {
  System.out.println("Intento " + intento);
}`,
      "Clasifica una nota como suspenso, aprobado, notable o sobresaliente, y muestra tres mensajes de repaso con un bucle.",
    ),
    "java-arrays": details(
      "Los arrays agrupan datos del mismo tipo. Son una buena base para entender índices, recorridos y errores comunes antes de pasar a colecciones.",
      ["Crea un array de enteros.", "Accede a un elemento por índice.", "Calcula la suma total con un bucle."],
      `int[] notas = {7, 5, 9};
int total = 0;

for (int nota : notas) {
  total += nota;
}

System.out.println("Media: " + total / notas.length);`,
      "Crea un array con cinco notas, calcula la media y muestra la nota más alta.",
    ),
    "java-oop": details(
      "La programación orientada a objetos organiza el código en clases que representan conceptos del dominio. Una clase bien diseñada combina datos privados y métodos públicos con intención clara.",
      ["Define atributos privados.", "Crea un constructor válido.", "Añade métodos que expresen acciones reales."],
      `class Tarea {
  private String titulo;
  private boolean completada;

  Tarea(String titulo) {
    this.titulo = titulo;
  }

  void completar() {
    completada = true;
  }
}`,
      "Modela una clase Libro con título, autor y páginas. Añade un método esLargo que devuelva true si supera 400 páginas.",
    ),
    "java-inheritance": details(
      "La herencia reutiliza comportamiento, pero las interfaces suelen ser mejores para expresar capacidades. Aprende ambas para reconocer cuándo no conviene forzar jerarquías.",
      ["Crea una clase base.", "Sobrescribe un método.", "Define una interfaz pequeña y úsala desde una clase."],
      `interface Evaluable {
  boolean estaAprobado();
}

class Examen implements Evaluable {
  private int nota;

  public boolean estaAprobado() {
    return nota >= 5;
  }
}`,
      "Crea una interfaz Notificable y dos clases que la implementen: Email y SMS.",
    ),
    "java-collections": details(
      "Las colecciones sustituyen a muchos arrays manuales. List sirve para secuencias ordenadas, Set para valores únicos y Map para buscar datos por clave.",
      ["Guarda elementos en una ArrayList.", "Recorre la colección con for-each.", "Usa un HashMap para asociar claves con valores."],
      `List<String> lenguajes = new ArrayList<>();
lenguajes.add("Java");
lenguajes.add("JavaScript");

Map<String, Integer> xp = new HashMap<>();
xp.put("java", 120);`,
      "Crea una lista de tareas pendientes y un mapa que guarde cuántos XP tienes en Java y JavaScript.",
    ),
    "java-exceptions": details(
      "Las excepciones separan el flujo normal de los errores. No son un sustituto de validar, pero sí una forma ordenada de tratar casos que pueden fallar.",
      ["Valida datos antes de operar.", "Captura una excepción concreta.", "Muestra un mensaje útil sin ocultar el problema."],
      `try {
  int edad = Integer.parseInt("21");
  System.out.println(edad);
} catch (NumberFormatException error) {
  System.out.println("La edad no es válida");
}`,
      "Crea un método parsearNota que convierta texto a número y devuelva -1 si el texto no es válido.",
    ),
    "java-testing": details(
      "Los tests te permiten cambiar código con confianza. En Java, JUnit es la base para comprobar unidades pequeñas y detectar regresiones antes de ejecutar la app completa.",
      ["Separa lógica de entrada y salida.", "Escribe un test para un caso normal.", "Añade un test para un caso límite."],
      `class Calculadora {
  int sumar(int a, int b) {
    return a + b;
  }
}

// assertEquals(5, new Calculadora().sumar(2, 3));`,
      "Diseña una función que calcule si una nota está aprobada y escribe tres casos de prueba: 4, 5 y 10.",
    ),
    "java-spring-intro": details(
      "Spring permite construir APIs con capas claras: controller para HTTP, service para reglas y repository para datos. Antes de correr, entiende esa separación.",
      ["Define un endpoint simple.", "Devuelve un DTO pequeño.", "Mueve la lógica fuera del controller."],
      `@RestController
class LessonController {
  @GetMapping("/api/lessons")
  List<String> lessons() {
    return List.of("Java", "JavaScript");
  }
}`,
      "Diseña en papel una API de tareas con endpoints para listar, crear, completar y borrar.",
    ),
    "js-values": details(
      "JavaScript es flexible, pero conviene usarlo con disciplina. Empieza por const para valores que no cambian, let para valores que sí cambian y funciones pequeñas.",
      ["Declara datos con const y let.", "Crea una función con parámetros.", "Usa arrays para agrupar elementos."],
      `const nombre = "Ana";
let xp = 0;

function sumarXp(actual, ganado) {
  return actual + ganado;
}

xp = sumarXp(xp, 25);`,
      "Crea una función crearResumen que reciba nombre, nivel y XP, y devuelva una frase con esos datos.",
    ),
    "js-objects": details(
      "Los objetos modelan datos con nombre y los arrays agrupan listas. La soltura llega cuando sabes transformar datos sin perder claridad.",
      ["Crea un objeto estudiante.", "Añade un array de notas.", "Calcula un resumen con map, filter o reduce."],
      `const estudiante = {
  nombre: "Ana",
  notas: [7, 8, 9],
};

const aprobadas = estudiante.notas.filter((nota) => nota >= 5);`,
      "Crea un array de tareas con título y completada. Filtra solo las pendientes.",
    ),
    "js-array-methods": details(
      "Los métodos de array son una base real de trabajo en JavaScript moderno. map transforma datos, filter descarta lo que no necesitas y reduce acumula un resultado final sin tener que montar bucles manuales en cada caso.",
      ["Usa map para transformar cada elemento.", "Usa filter para quedarte solo con los válidos.", "Usa reduce para contar, sumar o agrupar."],
      `const tareas = [
  { title: "Repasar arrays", done: false, xp: 20 },
  { title: "Practicar DOM", done: true, xp: 35 },
  { title: "Leer sobre fetch", done: false, xp: 25 },
];

const pendingTitles = tareas
  .filter((task) => !task.done)
  .map((task) => task.title);

const totalXp = tareas.reduce((sum, task) => sum + task.xp, 0);`,
      "Crea un resumen a partir de un array de tareas: cuántas están pendientes, qué títulos están completados y cuánto XP total suman.",
    ),
    "js-render-lists": details(
      "Una gran parte del frontend consiste en convertir datos en interfaz. El patrón típico es: recibir un array, transformarlo con map y luego insertar el resultado dentro de una lista o contenedor.",
      ["Selecciona el contenedor donde pintarás la lista.", "Transforma cada objeto en una cadena HTML.", "Une las cadenas e insértalas con innerHTML."],
      `const lessons = [
  { title: "map y filter", level: "Base" },
  { title: "DOM y eventos", level: "Base" },
];

const html = lessons
  .map((lesson) => \`<li>\${lesson.title} · \${lesson.level}</li>\`)
  .join("");

document.querySelector("#lessonList").innerHTML = html;`,
      "Recibe un array de items y pinta una lista HTML dentro de un `<ul>` usando title, language y level.",
    ),
    "js-dom": details(
      "El DOM es la representación de la página que JavaScript puede leer y modificar. La clave es seleccionar elementos, escuchar eventos y actualizar la interfaz.",
      ["Selecciona un elemento.", "Escucha un evento click.", "Actualiza texto o clases para reflejar el cambio."],
      `const boton = document.querySelector("#sumar");
const contador = document.querySelector("#contador");
let valor = 0;

boton.addEventListener("click", () => {
  valor += 1;
  contador.textContent = valor;
});`,
      "Crea un botón que incremente XP y otro que lo reinicie. Muestra el resultado en pantalla.",
    ),
    "js-forms": details(
      "Los formularios son la entrada principal de muchas apps. Aprende a leer datos, validar antes de guardar y dar mensajes de error concretos.",
      ["Escucha submit.", "Lee datos con FormData.", "Valida campos y muestra errores."],
      `form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const title = data.get("title").trim();
});`,
      "Crea un formulario de nueva tarea que impida guardar títulos vacíos.",
    ),
    "js-async": details(
      "La asincronía aparece cuando una operación tarda: cargar datos, leer archivos o consultar una API. async y await permiten escribir ese flujo de forma lineal.",
      ["Crea una función async.", "Usa await con fetch.", "Gestiona errores con try/catch."],
      `async function cargarUsuario() {
  try {
    const respuesta = await fetch("https://api.github.com/users/octocat");
    const usuario = await respuesta.json();
    console.log(usuario.login);
  } catch (error) {
    console.error("No se pudo cargar", error);
  }
}`,
      "Carga datos de una API pública y pinta en pantalla un campo concreto de la respuesta.",
    ),
    "js-json-to-dom": details(
      "Este paso junta lectura de JSON ya disponible, filtrado de datos y renderizado en pantalla. Es una versión muy cercana a trabajo frontend real, pero sin añadir todavía la complejidad extra de la red.",
      ["Recibe un objeto con un array items.", "Filtra los elementos que sí quieres mostrar.", "Transforma cada item en HTML y píntalo en una lista."],
      `const data = {
  items: [
    { title: "map y filter", language: "JavaScript", level: "Base", featured: true },
    { title: "Spring", language: "Java", level: "Avanzado", featured: false },
  ],
};

const html = data.items
  .filter((item) => item.featured)
  .map((item) => \`<li>\${item.title} | \${item.language} | \${item.level}</li>\`)
  .join("");

document.querySelector("#featuredList").innerHTML = html;`,
      "Recibe un objeto data con items, muestra solo los featured y pinta title, language y level en el DOM.",
    ),
    "js-fetch-to-dom": details(
      "Este es el flujo completo frontend más útil para empezar: esperar datos asíncronos, seleccionar solo lo que te interesa y pintar el resultado en pantalla. Aquí ya conviven async/await, arrays y DOM.",
      ["Crea una función async.", "Espera los datos antes de trabajar con ellos.", "Filtra, transforma y pinta dentro del contenedor final."],
      `async function cargarDestacados() {
  const response = await fetch("./data/study-items.json");
  const data = await response.json();

  const html = data.items
    .filter((item) => item.language === "JavaScript")
    .map((item) => \`<li>\${item.title} | \${item.level}</li>\`)
    .join("");

  document.querySelector("#fetchList").innerHTML = html;
}`,
      "Carga datos de una fuente asíncrona, filtra solo algunos items y píntalos en una lista del DOM.",
    ),
    "js-ui-states": details(
      "Una interfaz no solo debe funcionar cuando llegan datos. También tiene que explicar qué pasa mientras espera, cuando no hay resultados y cuando ocurre un error. Este patrón aparece en cualquier frontend serio.",
      ["Muestra un estado de carga antes de esperar datos.", "Si no llegan items útiles, enseña un mensaje vacío.", "Si falla la carga, captura el error y pinta un mensaje claro."],
      `async function cargarCursos(fetchItems) {
  const status = document.querySelector("#status");
  const list = document.querySelector("#courseList");

  status.textContent = "Cargando...";
  list.innerHTML = "";

  try {
    const data = await fetchItems();
    if (data.items.length === 0) {
      status.textContent = "No hay resultados.";
      return;
    }

    status.textContent = "Resultados listos.";
    list.innerHTML = data.items.map((item) => \`<li>\${item.title}</li>\`).join("");
  } catch (error) {
    status.textContent = "No se pudieron cargar los cursos.";
  }
}`,
      "Crea una carga asíncrona que muestre estado de carga, vacío o error y pinte una lista solo cuando haya datos.",
    ),
    "js-json-fetch": details(
      "Un archivo JSON local te permite practicar consumo de datos sin depender de una API externa. La clave es entender la forma de los datos: objetos con propiedades, arrays de objetos y propiedades anidadas.",
      ["Carga data/study-items.json con fetch.", "Convierte la respuesta con response.json().", "Recorre data.items con map o forEach y genera un item HTML por cada objeto."],
      `async function cargarItems() {
  const response = await fetch("./data/study-items.json");
  const data = await response.json();

  const items = data.items.map((item) => {
    return \`\${item.title} - \${item.level} - \${item.stats.xp} XP\`;
  });

  console.log(items);
}

cargarItems();`,
      "Carga ./data/study-items.json, recorre el array items y pinta una lista con title, language, level, tags y stats.xp.",
    ),
    "js-modules": details(
      "Los módulos evitan archivos enormes y dependencias implícitas. Exporta piezas pequeñas e importa solo lo que cada archivo necesita.",
      ["Mueve una función pura a otro archivo.", "Expórtala con export.", "Impórtala donde se use."],
      `// progreso.js
export function calcularNivel(xp) {
  return Math.floor(xp / 150) + 1;
}

// app.js
import { calcularNivel } from "./progreso.js";`,
      "Separa una función de cálculo de XP en un módulo y úsala desde el archivo principal.",
    ),
    "js-state": details(
      "El estado describe qué sabe la app en un momento concreto. Si lo actualizas de forma controlada y lo persistes, puedes reconstruir la interfaz.",
      ["Define un objeto state.", "Actualiza el estado desde eventos.", "Guarda y carga una copia con localStorage."],
      `const state = {
  xp: 0,
  completed: [],
};

localStorage.setItem("progreso", JSON.stringify(state));`,
      "Guarda una lista de lecciones completadas en localStorage y recupérala al recargar.",
    ),
    "js-data-to-dom": details(
      "Aquí se junta el flujo típico de muchas apps frontend: recibes datos, decides cuáles mostrar, los conviertes en HTML y actualizas la interfaz. Si este paso lo dominas, luego fetch, filtros y componentes encajan mucho mejor.",
      ["Filtra el array para decidir qué items entran.", "Transforma cada item en una cadena HTML.", "Inserta el resultado dentro del contenedor correcto."],
      `const items = [
  { title: "map y filter", language: "JavaScript", visible: true },
  { title: "Clases y objetos", language: "Java", visible: false },
];

const html = items
  .filter((item) => item.visible)
  .map((item) => \`<li>\${item.title} | \${item.language}</li>\`)
  .join("");

document.querySelector("#resultList").innerHTML = html;`,
      "Recibe un array de items, muestra solo los visibles y pinta una lista con title, language y level dentro del DOM.",
    ),
    "js-testing": details(
      "Probar JavaScript empieza por funciones puras y casos límite. Después puedes pasar a probar interacción de usuario con herramientas específicas.",
      ["Extrae lógica fuera del DOM.", "Comprueba entradas normales.", "Comprueba entradas vacías o inválidas."],
      `function calcularNivel(xp) {
  return Math.floor(xp / 180) + 1;
}

console.assert(calcularNivel(0) === 1);
console.assert(calcularNivel(180) === 2);`,
      "Crea tres console.assert para una función que valide si una tarea tiene título.",
    ),
    "js-components": details(
      "Los frameworks modernos se basan en componentes: piezas pequeñas que reciben datos, muestran interfaz y emiten acciones.",
      ["Identifica una parte repetida de la interfaz.", "Define qué datos necesita.", "Renderízala desde una función."],
      `function LessonCard(lesson) {
  return \`
    <article>
      <h3>\${lesson.title}</h3>
      <p>\${lesson.level}</p>
    </article>
  \`;
}`,
      "Convierte una tarjeta de tarea en una función que reciba datos y devuelva HTML.",
    ),
    "js-project": details(
      "El proyecto final debe obligarte a unir DOM, estado, persistencia, módulos, formularios y consumo de datos. Ahí aparece la soltura real.",
      ["Define alcance pequeño.", "Construye una versión usable.", "Refactoriza cuando funcione."],
      `const app = {
  tasks: [],
  filters: { status: "all" },
};

function render() {
  // pintar estado completo
}`,
      "Construye un gestor de estudio: tareas, filtros, persistencia, estadísticas y exportación.",
    ),
  },

  // El roadmap une varias lecciones en fases de estudio más grandes.
  studyPlan: [
    {
      dates: "Junio · Semanas 1-2",
      title: "Base sin agujeros",
      goal: "Sintaxis, funciones, arrays, métodos y control de flujo en ambos lenguajes.",
      lessonIds: ["java-variables", "java-methods", "java-control", "java-arrays", "js-values", "js-objects", "js-array-methods"],
    },
    {
      dates: "Junio · Semanas 3-4",
      title: "Interfaz y modelo mental",
      goal: "DOM, formularios y primeras clases para empezar a construir cosas pequeñas.",
      lessonIds: ["js-render-lists", "js-dom", "js-forms", "java-oop", "java-inheritance"],
    },
    {
      dates: "Julio",
      title: "Construcción real",
      goal: "Colecciones, estado, módulos, asincronía y pequeños proyectos semanales.",
      lessonIds: ["java-collections", "java-exceptions", "js-async", "js-json-to-dom", "js-fetch-to-dom", "js-ui-states", "js-json-fetch", "js-modules", "js-state", "js-data-to-dom"],
    },
    {
      dates: "Agosto",
      title: "Soltura y calidad",
      goal: "Testing, arquitectura, componentes y un proyecto final desplegado.",
      lessonIds: ["java-testing", "java-spring-intro", "js-testing", "js-components", "js-project"],
    },
  ],

  // Los ejercicios evaluables viven como datos.
  // Eso permite añadir nuevas prácticas sin tocar mucho app.js.
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
    ),
  },

  evolutionBriefs: {
    "java-oop": evolutionBrief(
      "java-variables",
      "Variables, tipos y consola",
      "Pedir antigüedad y salario, y aplicar un 20% si supera 10 años o un 10% en caso contrario.",
      "Convertir ese cálculo puntual en un modelo `Employee` con comportamiento propio y reglas expresadas en métodos claros.",
      [
        "Separar entrada, cálculo y salida.",
        "Mover la regla salarial a métodos como `getRaiseRate()` o `calculateAdjustedSalary()`.",
        "Sustituir números mágicos por constantes con nombre.",
      ],
    ),
    "java-collections": evolutionBrief(
      "java-oop",
      "Clases y objetos",
      "Calcular el salario ajustado de un solo empleado con una clase simple.",
      "Escalar el problema a una lista de empleados, recorrerla y generar resúmenes globales por antigüedad o coste total.",
      [
        "Trabajar con `ArrayList<Employee>` en vez de variables sueltas.",
        "Acumular totales y contadores sin duplicar lógica.",
        "Preparar el terreno para servicios o repositorios más adelante.",
      ],
    ),
    "js-state": evolutionBrief(
      "js-values",
      "Valores, variables y funciones",
      "Resolver el cálculo de subida salarial con un `prompt`, un `if` y un `console.log`.",
      "Pasar a una lista de empleados en memoria, recalcular todos sus salarios y repintar la interfaz cada vez que cambian los datos.",
      [
        "Extraer una función pura para calcular el salario final.",
        "Guardar empleados en un array dentro de `state`.",
        "Renderizar una tabla o lista en vez de imprimir un único resultado.",
      ],
    ),
    "js-components": evolutionBrief(
      "js-state",
      "Estado, persistencia y patrones",
      "Mantener el cálculo salarial y el renderizado en un solo bloque de código.",
      "Separar una pieza reutilizable de interfaz, por ejemplo una tarjeta o fila de empleado que se pinte desde datos.",
      [
        "Crear una función `renderEmployeeCard(employee)` o similar.",
        "Reutilizar esa pieza con `map` para varios empleados.",
        "Aislar mejor presentación, datos y reglas de cálculo.",
      ],
    ),
  },

  // Easter egg pedagógico:
  // documenta partes reales de app.js y las conecta con la ruta de estudio.
  appBlueprint: [
    blueprint(
      "Estado global",
      "Objeto `state`, cambios controlados y render posterior.",
      "Cuando la app recuerda progreso, filtro activo, lección abierta o racha.",
      "js-state",
      "Intermedio",
      "Primero aprenderías variables, objetos y arrays. Luego pasarías a `js-state`, donde ya trabajas con estado, persistencia y reconstrucción de interfaz.",
      ["state", "render", "localStorage"],
      ["js-values", "js-objects"],
    ),
    blueprint(
      "Eventos de interfaz",
      "`addEventListener`, clicks, submit y cambios de formulario.",
      "Cuando pulsas botones, cambias de track, marcas teoría o envías un reto.",
      "js-dom",
      "Base",
      "Empieza en `js-dom` con eventos simples y se refuerza en `js-forms` cuando el flujo depende de inputs y validación.",
      ["eventos", "DOM", "listeners"],
      ["js-values"],
    ),
    blueprint(
      "Renderizado dinámico",
      "Generación de HTML con `map`, plantillas y `innerHTML`.",
      "Cuando se pintan tarjetas, roadmap, logros, ejercicios y resultados.",
      "js-objects",
      "Cero -> Intermedio",
      "Nace al transformar arrays y objetos en `js-objects`, y se vuelve serio en `js-state` cuando cada cambio de datos obliga a repintar interfaz.",
      ["arrays", "map", "innerHTML"],
      ["js-values", "js-objects"],
    ),
    blueprint(
      "Funciones puras y helpers",
      "Funciones pequeñas para calcular, buscar, comparar o formatear.",
      "Cuando la app calcula progreso, escapa HTML o compara resultados de tests.",
      "js-values",
      "Cero -> Avanzado",
      "La base está en `js-values`. Luego aparecen helpers más potentes en `js-testing`, donde separas lógica para poder validarla con tests.",
      ["funciones", "helpers", "testing"],
      [],
    ),
    blueprint(
      "Persistencia local",
      "`localStorage`, serialización JSON y normalización de datos guardados.",
      "Cuando exportas, importas o recuperas el progreso al recargar la página.",
      "js-state",
      "Intermedio",
      "Se estudia en `js-state`, porque ahí ya entiendes que estado y persistencia son cosas distintas pero conectadas.",
      ["persistencia", "json", "localStorage"],
      ["js-values", "js-objects", "js-state"],
    ),
    blueprint(
      "Asincronía",
      "`async`, `await`, Promises y manejo de errores.",
      "Cuando el runner ejecuta código async o una práctica usa `fetch`.",
      "js-async",
      "Intermedio",
      "Se trabaja en `js-async` y se consolida en `js-json-fetch`, donde ya consumes datos y transformas la respuesta.",
      ["async", "await", "fetch"],
      ["js-values", "js-objects"],
    ),
    blueprint(
      "Estados de interfaz",
      "Mensajes de carga, vacío y error para que la UI explique qué está pasando.",
      "Cuando una práctica asíncrona necesita informar si está cargando, si no hay resultados o si la petición falla.",
      "js-ui-states",
      "Intermedio",
      "Se introduce en `js-ui-states` y se reutiliza después cada vez que cargas datos reales y los pintas en el DOM.",
      ["loading", "empty", "error"],
      ["js-async", "js-dom", "js-fetch-to-dom"],
    ),
    blueprint(
      "Manipulación de DOM real",
      "Selección de nodos, actualización de texto, listas y validación del resultado en pantalla.",
      "Cuando el preview DOM comprueba contadores, formularios y listas renderizadas.",
      "js-dom",
      "Base -> Intermedio",
      "Empieza en `js-dom`, se refuerza en `js-forms` y gana forma de app real en `js-state` al renderizar listas y contadores.",
      ["DOM", "querySelector", "render"],
      ["js-dom", "js-forms"],
    ),
    blueprint(
      "Arquitectura de frontend",
      "Separación entre datos, estado, render, evaluación y persistencia.",
      "Cuando `data.js` y `app.js` reparten responsabilidades distintas.",
      "js-modules",
      "Intermedio",
      "La idea aparece de verdad en `js-modules`, donde dejas de meter toda la lógica en un solo archivo mental.",
      ["módulos", "separación", "arquitectura"],
      ["js-values", "js-objects", "js-state"],
    ),
  ],
};

// Factoría pequeña para no repetir la misma estructura en cada lección.
function lesson(id, level, title, xp, goals, prompt, options, answer) {
  return {
    id,
    level,
    title,
    xp,
    goals,
    challenge: {
      prompt,
      options,
      answer,
    },
  };
}

// Otra factoría: separa el "qué enseña" una lección de la lógica de render.
function details(theory, steps, example, practice) {
  return {
    theory,
    steps,
    example,
    practice,
  };
}

function exercise(config) {
  return config;
}

// Igual que lesson() y details(), esto hace más legible la definición del blueprint.
function blueprint(title, concept, where, lessonId, phase, howToLearn, tags, prerequisites) {
  return {
    title,
    concept,
    where,
    lessonId,
    phase,
    howToLearn,
    tags,
    prerequisites,
  };
}

function guide(prompt, input, output, checklist, family, difficulty, practiceType) {
  return {
    prompt,
    input,
    output,
    checklist,
    family,
    difficulty,
    practiceType,
  };
}

function projectBrief(summary, outcome, milestones, deliverables) {
  return {
    summary,
    outcome,
    milestones,
    deliverables,
  };
}

function evolutionBrief(fromLessonId, fromTitle, basicVersion, advancedVersion, upgrades) {
  return {
    fromLessonId,
    fromTitle,
    basicVersion,
    advancedVersion,
    upgrades,
  };
}
