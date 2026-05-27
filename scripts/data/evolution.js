var learningRoot = typeof window === "undefined" ? globalThis : window;

Object.assign(learningRoot.LEARNING_DATA, {
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
    "js-fetch-to-dom": evolutionBrief(
      "js-json-to-dom",
      "JSON a interfaz",
      "Recibir un objeto ya disponible, filtrar items y pintarlos en pantalla.",
      "Esperar datos asíncronos, validar la respuesta y renderizar una lista limpia cada vez que cambia la carga.",
      [
        "Separar la obtención de datos del renderizado final.",
        "Mantener el render idempotente para no acumular resultados viejos.",
        "Preparar el flujo para estados de carga, vacío y error.",
      ],
    ),
    "java-exceptions": evolutionBrief(
      "java-control",
      "Condicionales y bucles",
      "Validar un dato con `if` y actuar en el caso esperado.",
      "Mantener validaciones simples con `if`, pero encapsular también fallos de conversión o entrada inválida con excepciones concretas.",
      [
        "Distinguir entre validar reglas de negocio y tratar fallos técnicos de parseo.",
        "Capturar solo la excepción que sabes resolver.",
        "Devolver o mostrar una respuesta coherente cuando la entrada no sea válida.",
      ],
    ),
    "java-inheritance": evolutionBrief(
      "java-oop",
      "Clases y objetos",
      "Modelar una clase con estado y comportamiento propio.",
      "Pasar de un solo objeto útil a varios objetos que comparten un contrato y se usan de forma polimórfica.",
      [
        "Detectar qué responsabilidad común debe expresarse como interfaz.",
        "Evitar jerarquías rígidas cuando basta con una capacidad compartida.",
        "Consumir varias implementaciones desde el mismo tipo abstracto.",
      ],
    ),
    "java-testing": evolutionBrief(
      "java-exceptions",
      "Excepciones y validación",
      "Crear una función que valida o parsea una entrada con reglas claras.",
      "Extraer esa lógica a una clase pequeña y cubrir casos normales, borde y error con tests repetibles.",
      [
        "Separar la lógica útil de `main` para que sea testeable.",
        "Elegir pocos casos con intención: válido, borde, inválido.",
        "Usar los tests como red de seguridad antes de refactorizar nombres o ramas.",
      ],
    ),
    "js-json-fetch": evolutionBrief(
      "js-async",
      "Asincronía y fetch",
      "Esperar una respuesta asíncrona y leer un campo concreto para mostrarlo.",
      "Transformar una carga JSON completa en un resumen útil y en una capa de filtros reutilizable para alimentar interfaz, métricas y navegación.",
      [
        "Separar carga y transformación en funciones distintas.",
        "Pasar de leer un solo campo a resumir y filtrar un array real de items.",
        "Preparar una salida que ya sirva para UI, filtros o analítica básica.",
      ],
    ),
    "js-ui-states": evolutionBrief(
      "js-fetch-to-dom",
      "fetch a interfaz",
      "Cargar datos y pintarlos cuando todo sale bien.",
      "Añadir estados explícitos de carga, vacío y error para que la interfaz siga siendo clara cuando el flujo no cae en el caso feliz.",
      [
        "Limpiar contenido viejo antes de cada nueva carga.",
        "Reservar mensajes distintos para vacío y error.",
        "Mantener sincronizados estado visual y datos reales en cada recarga.",
      ],
    ),
    // Estas evoluciones ya no enseñan solo a resolver el caso base:
    // enseñan a reabrir el mismo problema cuando el alcance crece.
    "js-project": evolutionBrief(
      "js-components",
      "Componentes y plantillas",
      "Pintar una lista sencilla de tareas desde un array y un único render.",
      "Convertir esa lista en un dashboard con filtros, contadores y persistencia local sin mezclar estado, reglas y presentación.",
      [
        "Separar el estado de filtros de la colección principal.",
        "Crear helpers para contar pendientes, completadas y visibles.",
        "Re-renderizar toda la vista desde una única fuente de verdad.",
      ],
    ),
    "java-spring-intro": evolutionBrief(
      "java-collections",
      "Colecciones y mapas",
      "Guardar notas o tareas en memoria y recorrer una colección para resumirlas.",
      "Replantear ese mismo caso como un flujo con DTO, servicio y validación, listo para dar el salto a Spring sin perder claridad de dominio.",
      [
        "Separar entrada, validación y lógica de negocio en piezas distintas.",
        "Usar un DTO pequeño para transportar datos de alta o edición.",
        "Mantener la colección en memoria, pero con una API interna más limpia.",
      ],
    ),
  },

  evolutionCases: {
    "js-state": evolutionCase(
      "Base",
      "Salario por antigüedad",
      "Partes de un cálculo puntual con `if` y lo conviertes en una pequeña pieza de estado y renderizado.",
      "Pides antigüedad y salario, aplicas un 20% si supera 10 años y un 10% en caso contrario.",
      "Trabajas con varios empleados, calculas su salario ajustado con una función pura y renderizas el resultado en una lista.",
      [
        "Extrae una función `calculateAdjustedSalary(employee)`.",
        "Recorre un array de empleados en vez de trabajar con una sola variable.",
        "Devuelve una nueva estructura con salario ajustado y pinta el resultado.",
      ],
      `const employees = [
  { name: "Ana", years: 12, salary: 1800 },
  { name: "Luis", years: 4, salary: 1600 },
];

function calculateAdjustedSalary(employee) {
  const rate = employee.years > 10 ? 0.2 : 0.1;
  return Math.round(employee.salary * (1 + rate));
}

function buildSalarySummary(list) {
  return list.map((employee) => ({
    ...employee,
    adjustedSalary: calculateAdjustedSalary(employee),
  }));
}`,
      true,
    ),
    "js-components": evolutionCase(
      "Colección y resumen",
      "Salario por antigüedad",
      "El mismo problema ya no se queda en calcular un dato: ahora filtras empleados, generas tarjetas y sacas un resumen global.",
      "Calculas el salario ajustado de varios empleados y guardas el resultado en un array nuevo.",
      "Filtras solo ciertos empleados, renderizas una tarjeta por cada uno y calculas el coste total ajustado para mostrarlo en la interfaz.",
      [
        "Reutiliza una función pura para calcular el salario ajustado.",
        "Crea una función `renderEmployeeCard(employee)` que devuelva HTML.",
        "Calcula un resumen global, por ejemplo el coste total ajustado o cuántos empleados superan 10 años.",
      ],
      `const employees = [
  { name: "Ana", years: 12, salary: 1800, area: "Frontend" },
  { name: "Luis", years: 4, salary: 1600, area: "Backend" },
  { name: "Marta", years: 15, salary: 2100, area: "Frontend" },
];

function calculateAdjustedSalary(employee) {
  const rate = employee.years > 10 ? 0.2 : 0.1;
  return Math.round(employee.salary * (1 + rate));
}

function renderEmployeeCard(employee) {
  return \`<li>\${employee.name} | \${employee.area} | \${calculateAdjustedSalary(employee)} EUR</li>\`;
}

function buildFrontendPayroll(list) {
  const frontendEmployees = list.filter((employee) => employee.area === "Frontend");
  const totalAdjusted = frontendEmployees.reduce(
    (total, employee) => total + calculateAdjustedSalary(employee),
    0,
  );

  return {
    html: frontendEmployees.map(renderEmployeeCard).join(""),
    totalAdjusted,
  };
}`,
      true,
    ),
    "js-fetch-to-dom": evolutionCase(
      "Carga remota y render estable",
      "Catálogo de prácticas",
      "Pasas de renderizar datos ya presentes en memoria a esperar una carga asíncrona y repintar sin dejar restos de cargas anteriores.",
      "Recibes un objeto `data` ya construido, filtras solo los items de JavaScript y pintas su título y nivel.",
      "Llamas a `fetchItems()`, esperas la respuesta, filtras resultados de JavaScript y sustituyes completamente el HTML anterior en cada recarga.",
      [
        "Crea una función async `loadJavascriptItems(fetchItems)`.",
        "Usa `await` para esperar el objeto con `items` antes de filtrar.",
        "Devuelve o pinta una lista limpia aunque la segunda carga llegue vacía.",
      ],
      `async function loadJavascriptItems(fetchItems) {
  const list = document.querySelector("#practiceList");
  const data = await fetchItems();

  const html = data.items
    .filter((item) => item.language === "JavaScript")
    .map((item) => \`<li>\${item.title} | \${item.level}</li>\`)
    .join("");

  list.innerHTML = html;
}`,
      true,
    ),
    "js-json-fetch": evolutionCase(
      "Transformación y filtros",
      "Resumen de catálogo",
      "Pasas de usar `fetch` solo para leer datos a convertir una respuesta JSON en un resumen y en una capa de filtrado que ya sirve para decisión o interfaz.",
      "Lees una respuesta asíncrona y muestras un dato simple, por ejemplo el nombre del curso o un título.",
      "Cargas un JSON local, normalizas `items`, aplicas filtros por lenguaje o nivel y devuelves un resumen con total visible, destacados y métricas útiles para render o navegación.",
      [
        "Crea una función async `buildCatalogSummary(fetchItems)`.",
        "Espera la respuesta y trabaja con `data.items` solo después del `await`.",
        "Separa filtrado y resumen en helpers para no mezclar reglas en una sola función.",
        "Devuelve un objeto final listo para pintar o comprobar en tests.",
      ],
      `async function buildCatalogSummary(fetchItems) {
  const data = await fetchItems();
  const items = data.items ?? [];
  const visibleItems = items.filter(
    (item) => item.language === "JavaScript" && item.level !== "Avanzado",
  );

  return {
    total: visibleItems.length,
    javascript: visibleItems.filter((item) => item.language === "JavaScript").length,
    featured: visibleItems.filter((item) => item.featured).length,
    levels: [...new Set(visibleItems.map((item) => item.level))],
  };
}`,
      true,
    ),
    "js-ui-states": evolutionCase(
      "Estado visible",
      "Lista resiliente",
      "La misma carga asíncrona deja de ser solo datos y se convierte en una interfaz que explica claramente qué está ocurriendo en cada momento.",
      "Esperas datos, filtras items y pintas una lista cuando hay resultados válidos.",
      "Antes de cargar muestras estado de espera, si no hay resultados útiles limpias la lista y enseñas vacío, y si falla la carga limpias también la vista y explicas el error.",
      [
        "Muestra `Cargando...` antes del `await`.",
        "Resetea la lista cuando la respuesta llegue vacía o falle.",
        "Distingue texto de vacío y texto de error sin reciclar el mismo mensaje.",
      ],
      `async function loadCourses(fetchItems) {
  const status = document.querySelector("#status");
  const list = document.querySelector("#courseList");

  status.textContent = "Cargando...";
  list.innerHTML = "";

  try {
    const data = await fetchItems();
    const items = (data.items ?? []).filter((item) => item.language === "JavaScript");

    if (!items.length) {
      status.textContent = "Sin resultados";
      return;
    }

    list.innerHTML = items.map((item) => \`<li>\${item.title}</li>\`).join("");
    status.textContent = "Carga completada";
  } catch (error) {
    list.innerHTML = "";
    status.textContent = "No se pudo cargar";
  }
}`,
      true,
    ),
    "js-project": evolutionCase(
      "Dashboard y filtros",
      "Lista de tareas de estudio",
      "El problema deja de ser pintar una lista y pasa a exigir estado visible, filtros, contadores y persistencia razonable.",
      "Guardas un array de tareas, lo recorres y renderizas cada título en pantalla.",
      "Mantienes un `state` con tareas y filtro activo, calculas resumen de pendientes/completadas, persistes en `localStorage` y repintas un dashboard limpio en cada cambio.",
      [
        "Separa `tasks` y `activeFilter` dentro del estado.",
        "Extrae helpers como `getVisibleTasks(state)` y `buildTaskSummary(state)`.",
        "Haz que un único `render()` regenere lista, contador y texto de estado.",
      ],
      `const state = {
  tasks: [
    { id: 1, title: "Repasar arrays", done: false, track: "javascript" },
    { id: 2, title: "Practicar colecciones", done: true, track: "java" },
    { id: 3, title: "Montar preview DOM", done: false, track: "javascript" },
  ],
  activeFilter: "pending",
};

function getVisibleTasks(currentState) {
  if (currentState.activeFilter === "completed") {
    return currentState.tasks.filter((task) => task.done);
  }

  if (currentState.activeFilter === "javascript") {
    return currentState.tasks.filter((task) => task.track === "javascript");
  }

  return currentState.tasks.filter((task) => !task.done);
}

function buildTaskSummary(currentState) {
  const completed = currentState.tasks.filter((task) => task.done).length;

  return {
    total: currentState.tasks.length,
    completed,
    pending: currentState.tasks.length - completed,
  };
}`,
      true,
    ),
    "java-oop": evolutionCase(
      "Refactor",
      "Salario por antigüedad",
      "El mismo problema deja de ser una condición aislada y pasa a vivir dentro de un objeto con responsabilidad clara.",
      "Lees antigüedad y salario, aplicas una condición y escribes el resultado por consola.",
      "Creas una clase `Employee` con atributos privados y un método `calculateAdjustedSalary()` que encapsula la regla.",
      [
        "Define los atributos `name`, `years` y `salary`.",
        "Mueve la regla de subida a un método de instancia.",
        "Evita números mágicos usando constantes o nombres expresivos.",
      ],
      `public class Employee {
  private String name;
  private int years;
  private double salary;

  public double calculateAdjustedSalary() {
    double rate = years > 10 ? 0.20 : 0.10;
    return salary * (1 + rate);
  }
}`,
      false,
    ),
    "java-collections": evolutionCase(
      "Colección y resumen",
      "Salario por antigüedad",
      "La regla ya está encapsulada en `Employee`; ahora el problema real es trabajar con una colección y sacar conclusiones útiles.",
      "Cada empleado sabe calcular su salario ajustado con un método propio.",
      "Recorres una lista de empleados, filtras por antigüedad o área, calculas salarios ajustados y produces un resumen global.",
      [
        "Usa `ArrayList<Employee>` como estructura principal.",
        "Recorre la colección para acumular coste total ajustado.",
        "Separa en métodos distintos: filtrar, resumir y mostrar resultados.",
      ],
      `List<Employee> employees = new ArrayList<>();
employees.add(new Employee("Ana", 12, 1800));
employees.add(new Employee("Luis", 4, 1600));
employees.add(new Employee("Marta", 15, 2100));

double totalAdjusted = 0;

for (Employee employee : employees) {
  totalAdjusted += employee.calculateAdjustedSalary();
}

System.out.println("Coste total ajustado: " + totalAdjusted);`,
      false,
    ),
    "java-exceptions": evolutionCase(
      "Validación robusta",
      "Nota desde texto",
      "Dejas atrás una validación solo con `if` y cubres también el caso donde la entrada ni siquiera puede convertirse a número.",
      "Compruebas con una condición si una nota ya numérica está entre 0 y 10.",
      "Recibes un `String`, intentas convertirlo a entero, validas rango y devuelves `-1` cuando hay fallo de formato o valor inválido.",
      [
        "Separa conversión y validación en una función pequeña.",
        "Captura `NumberFormatException` y evita `catch (Exception)`.",
        "Mantén un contrato claro: devolver `-1` en cualquier entrada inválida.",
      ],
      `public static int parseGrade(String text) {
  try {
    int grade = Integer.parseInt(text);
    if (grade < 0 || grade > 10) {
      return -1;
    }
    return grade;
  } catch (NumberFormatException error) {
    return -1;
  }
}`,
      false,
    ),
    "java-inheritance": evolutionCase(
      "Polimorfismo",
      "Notificaciones por canal",
      "Dejas atrás una sola clase con comportamiento aislado y empiezas a coordinar varias implementaciones a través de un contrato común.",
      "Tienes una clase con un método que imprime un mensaje o realiza una acción concreta.",
      "Defines una interfaz `Notificable`, implementas varias clases y las recorres como colección común para enviar el mismo mensaje por distintos canales.",
      [
        "Crea una interfaz con una responsabilidad pequeña.",
        "Haz que `EmailNotifier` y `SmsNotifier` implementen el mismo método.",
        "Recorre una `List<Notificable>` en vez de acoplarte a clases concretas.",
      ],
      `interface Notificable {
  void enviar(String mensaje);
}

class EmailNotifier implements Notificable {
  public void enviar(String mensaje) {
    System.out.println("Email: " + mensaje);
  }
}

class SmsNotifier implements Notificable {
  public void enviar(String mensaje) {
    System.out.println("SMS: " + mensaje);
  }
}`,
      false,
    ),
    "java-testing": evolutionCase(
      "Refuerzo con tests",
      "Validador de títulos",
      "La lógica deja de vivir solo en ejecución manual y pasa a estar protegida por una batería mínima de casos con intención.",
      "Compruebas desde `main` si un título es válido y miras la salida por consola.",
      "Extraes `isValidTitle(String title)` a una clase utilitaria y defines tests para válido, vacío y demasiado corto antes de refactorizar.",
      [
        "Separa la función en una clase pequeña testeable.",
        "Cubre caso normal, borde y error con asserts simples.",
        "Refactoriza después de que los tests representen bien el contrato.",
      ],
      `class TaskValidator {
  boolean isValidTitle(String title) {
    if (title == null) return false;

    String normalized = title.trim();
    return normalized.length() >= 3;
  }
}

// assertTrue(new TaskValidator().isValidTitle("Repasar DOM"));
// assertFalse(new TaskValidator().isValidTitle(" "));
// assertFalse(new TaskValidator().isValidTitle("JS"));`,
      false,
    ),
    "java-spring-intro": evolutionCase(
      "Capas y validación",
      "Gestor de notas",
      "El mismo caso deja de estar resuelto solo con listas y bucles y pasa a organizarse como una pequeña aplicación con contrato de entrada y servicio propio.",
      "Lees notas, las guardas en memoria y calculas media o aprobados recorriendo una colección.",
      "Defines un `GradeRequest`, validas datos antes de crear la entidad y delegas el alta/resumen en un servicio con responsabilidades claras.",
      [
        "Usa un DTO de entrada con `studentName` y `grade`.",
        "Valida rango y nombre antes de persistir en memoria.",
        "Mueve el alta y el resumen a un servicio en vez de resolverlo todo en `main`.",
      ],
      `public record GradeRequest(String studentName, int grade) {}

public class GradeService {
  private final List<GradeRecord> records = new ArrayList<>();

  public boolean addGrade(GradeRequest request) {
    if (request.studentName() == null || request.studentName().isBlank()) {
      return false;
    }

    if (request.grade() < 0 || request.grade() > 10) {
      return false;
    }

    records.add(new GradeRecord(request.studentName().trim(), request.grade()));
    return true;
  }
}`,
      false,
    ),
  },

  // Easter egg pedagógico:
  // documenta partes reales del frontend y las conecta con la ruta de estudio.
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
      "Cuando `scripts/data/` y `scripts/app/` reparten responsabilidades distintas.",
      "js-modules",
      "Intermedio",
      "La idea aparece de verdad en `js-modules`, donde dejas de meter toda la lógica en un solo archivo mental.",
      ["módulos", "separación", "arquitectura"],
      ["js-values", "js-objects", "js-state"],
    ),
  ],
});
