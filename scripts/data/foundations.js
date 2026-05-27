var learningRoot = typeof window === "undefined" ? globalThis : window;

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

// scripts/app/main.js
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

  learningSupports: {
    "java-variables": support("Tipo = significado del dato.", "Primero decide que representa; luego elige el tipo.", "texto String, entero int, decimal double, si/no boolean.", "Elegir tipos por costumbre y no por significado."),
    "java-methods": support("Un metodo es una tarea con nombre.", "Divide el problema en pasos pequenos reutilizables.", "entrada -> proceso -> return.", "Meter toda la logica en main."),
    "java-control": support("Controlar es decidir y repetir.", "if decide, switch elige, for y while repiten.", "si / caso / repetir.", "Condiciones duplicadas o mal ordenadas."),
    "java-arrays": support("Un array guarda muchos datos del mismo tipo.", "Indice para acceder, bucle para recorrer.", "caja de casillas numeradas.", "Salirte del indice valido."),
    "java-oop": support("Una clase modela una cosa del dominio.", "Datos privados, comportamiento publico.", "sustantivo + acciones.", "Crear clases que solo guardan datos y no expresan comportamiento."),
    "java-inheritance": support("Herencia reutiliza; interfaz expresa capacidad.", "Pregunta primero que sabe hacer, no de quien hereda.", "es-un vs puede-hacer.", "Usar herencia donde bastaba una interfaz."),
    "java-collections": support("Colecciones = datos que crecen.", "List ordena, Set evita repetidos, Map busca por clave.", "lista / unicos / clave-valor.", "Seguir usando arrays cuando el problema ya pide dinamismo."),
    "java-exceptions": support("Excepcion = flujo de error separado.", "Valida antes; captura solo lo que sepas tratar.", "try lo intenta, catch lo explica.", "Capturar Exception para todo y ocultar el problema."),
    "java-testing": support("Test = confianza para cambiar.", "Caso normal, borde y error minimo.", "preparar / ejecutar / comprobar.", "Probar demasiado a la vez."),
    "java-spring-intro": support("Spring separa HTTP, reglas y datos.", "Controller recibe, Service decide, Repository persiste.", "entra / decide / guarda.", "Meter toda la logica dentro del controller."),
    "js-values": support("Una variable guarda estado temporal.", "Const para fijo, let para cambio, funcion para reuse.", "const quieto, let cambia.", "Usar variables globales por comodidad."),
    "js-objects": support("Objeto = una cosa con propiedades.", "Array agrupa; objeto nombra.", "lista de cosas, cosa con nombre.", "Confundir cuando usar array y cuando objeto."),
    "js-array-methods": support("Transformar datos es trabajo real de JS.", "map transforma, filter descarta, reduce resume.", "map/filter/reduce = transformar/filtrar/resumir.", "Usar map cuando querias filter o viceversa."),
    "js-render-lists": support("Frontend = datos a HTML.", "Recibe array, conviertelo en etiquetas, inserta.", "array -> map -> join -> DOM.", "Pintar dentro del bucle en vez de construir una salida clara."),
    "js-dom": support("El DOM es la pagina como objetos.", "Selecciona, escucha, cambia.", "buscar / escuchar / actualizar.", "No guardar referencia al nodo que usas varias veces."),
    "js-forms": support("Formulario = entrada con validacion.", "Lee datos, limpia texto, valida, muestra feedback.", "leer / validar / responder.", "Confiar en que el usuario siempre escribira bien."),
    "js-async": support("Async espera trabajo lento.", "Primero espera, luego transforma, despues muestra.", "await = para aqui hasta tener dato.", "Olvidar try/catch y dejar fallos mudos."),
    "js-json-to-dom": support("JSON ya parseado tambien necesita seleccion.", "No pintes todo: filtra antes de renderizar.", "leer / filtrar / pintar.", "Recorrer la estructura sin entender su forma."),
    "js-fetch-to-dom": support("Fetch a DOM = flujo frontend completo.", "Carga, filtra, transforma y renderiza.", "traer / elegir / mostrar.", "Pintar antes de tener realmente los datos."),
    "js-ui-states": support("Una UI buena explica que pasa.", "Carga, vacio y error son parte del flujo, no excepciones raras.", "cargando / vacio / error / datos.", "Pensar solo en el caso feliz."),
    "js-json-fetch": support("Fetch + JSON = datos reales de trabajo.", "Respuesta -> json() -> array -> transformacion.", "fetch / json / items.", "Querer usar la respuesta sin convertirla."),
    "js-modules": support("Modulo = responsabilidad separada.", "Cada archivo deberia tener una razon clara para existir.", "exporta poco, importa justo.", "Crear modulos arbitrarios sin frontera real."),
    "js-state": support("Estado = lo que la app sabe ahora.", "Cambias datos, luego repintas interfaz.", "state -> render.", "Modificar cosas por varios sitios sin control."),
    "js-data-to-dom": support("Datos a DOM es una tuberia.", "Filtra, transforma, inserta.", "entrada -> decision -> salida.", "Mezclar demasiadas decisiones dentro del template."),
    "js-testing": support("Testear es aislar comportamiento.", "Primero prueba funciones puras; luego UI.", "caso normal / borde / error.", "Querer probar interfaz compleja sin separar logica."),
    "js-components": support("Componente = pieza reutilizable con datos claros.", "Recibe datos, devuelve interfaz coherente.", "pieza pequena repetible.", "Crear componentes que saben demasiado."),
    "js-project": support("Proyecto = integrar todo con criterio.", "Arquitectura simple, datos reales, errores tratados, deploy.", "funciona / se entiende / se mantiene.", "Perseguir features antes de cerrar un flujo completo."),
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
  // Eso permite añadir nuevas prácticas sin tocar mucho scripts/app/main.js.
};

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

function guide(
  prompt,
  input,
  output,
  checklist,
  family,
  difficulty,
  practiceType,
  commonMistakes = [],
  starterCode = "",
  manualChecks = [],
  nextVariation = "",
  edgeCases = [],
  hints = [],
) {
  return {
    prompt,
    input,
    output,
    checklist,
    family,
    difficulty,
    practiceType,
    commonMistakes,
    starterCode,
    manualChecks,
    nextVariation,
    edgeCases,
    hints,
  };
}

function projectBrief(summary, outcome, milestones, deliverables, starterCode = "", validationChecklist = [], successSignals = []) {
  return {
    summary,
    outcome,
    milestones,
    deliverables,
    starterCode,
    validationChecklist,
    successSignals,
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

function evolutionCase(phase, title, summary, baseVersion, advancedVersion, checklist, starter, canLoadRunner) {
  return {
    phase,
    title,
    summary,
    baseVersion,
    advancedVersion,
    checklist,
    starter,
    canLoadRunner,
  };
}

function support(concept, logic, mnemonic, mistake) {
  return {
    concept,
    logic,
    mnemonic,
    mistake,
  };
}
