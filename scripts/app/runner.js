// Runner and exercise evaluation helpers for scripts/app/main.js.

function loadActivePractice() {
  const lesson = findLesson(state.activeLessonId);
  if (getTrackIdByLesson(lesson.id) !== "javascript") {
    elements.jsRunnerOutput.textContent =
      "La práctica ejecutable está pensada para JavaScript. Para Java, usa esta app como guía y ejecuta el código en tu IDE.";
    return;
  }

  elements.jsRunnerInput.value = createPracticeStarter(lesson);
  elements.jsRunnerOutput.textContent = "Práctica cargada. Modifica el código y pulsa Ejecutar JS.";
}

function loadActiveExercise() {
  const lesson = findLesson(state.activeLessonId);
  const exercise = exercises[lesson?.id];

  if (!exercise || getTrackIdByLesson(lesson.id) !== "javascript") {
    elements.jsRunnerOutput.textContent =
      "La lección activa no tiene ejercicio evaluable de JavaScript.";
    return;
  }

  elements.jsRunnerInput.value = createExerciseStarter(lesson);
  elements.jsRunnerHtml.value = exercise.starterHtml ?? "";
  elements.jsRunnerOutput.textContent = "Ejercicio cargado. Implementa la función y pulsa Evaluar ejercicio.";
  elements.exerciseResultsPanel.hidden = true;
}

function runJavaScriptPractice() {
  const lesson = findLesson(state.activeLessonId);
  const exercise = exercises[lesson?.id];
  if (exercise?.mode === "dom") {
    runDomPractice(lesson);
    return;
  }

  const code = elements.jsRunnerInput.value.trim();
  if (!code) {
    elements.jsRunnerOutput.textContent = "Escribe algo de JavaScript antes de ejecutar.";
    return;
  }

  const output = [];
  const sandboxConsole = {
    // Simulamos console.log para capturar la salida dentro de la app.
    log: (...values) => output.push(values.map(formatConsoleValue).join(" ")),
    warn: (...values) => output.push(`Aviso: ${values.map(formatConsoleValue).join(" ")}`),
    error: (...values) => output.push(`Error: ${values.map(formatConsoleValue).join(" ")}`),
  };

  try {
    const result = Function("console", `"use strict";\nreturn (async () => {\n${code}\n})();`)(
      sandboxConsole,
    );
    if (result && typeof result.then === "function") {
      result
        .then((resolved) => {
          if (resolved !== undefined) output.push(formatConsoleValue(resolved));
          elements.jsRunnerOutput.textContent = output.length
            ? output.join("\n")
            : "Código ejecutado sin salida.";
          recordStudyDay();
          if (getTrackIdByLesson(state.activeLessonId) === "javascript") {
            addProgressOnce("practiceDone", state.activeLessonId, 20);
          }
          persist();
          render();
        })
        .catch((error) => {
          elements.jsRunnerOutput.textContent = `${error.name}: ${error.message}`;
        });
      return;
    }
    if (result !== undefined) output.push(formatConsoleValue(result));
    elements.jsRunnerOutput.textContent = output.length ? output.join("\n") : "Código ejecutado sin salida.";
    recordStudyDay();
    if (getTrackIdByLesson(state.activeLessonId) === "javascript") {
      addProgressOnce("practiceDone", state.activeLessonId, 20);
    }
    persist();
    render();
  } catch (error) {
    elements.jsRunnerOutput.textContent = `${error.name}: ${error.message}`;
  }
}

function evaluateActiveExercise() {
  const lesson = findLesson(state.activeLessonId);
  const exercise = exercises[lesson?.id];
  const code = elements.jsRunnerInput.value.trim();

  if (!exercise || getTrackIdByLesson(lesson.id) !== "javascript") {
    elements.jsRunnerOutput.textContent = "La lección activa no tiene un ejercicio evaluable.";
    return;
  }

  if (!code) {
    elements.jsRunnerOutput.textContent = "Carga el ejercicio o escribe tu solución antes de evaluar.";
    return;
  }

  if (exercise.mode === "dom") {
    evaluateDomExercise(lesson, exercise, code);
    return;
  }

  const output = [];
  const sandboxConsole = {
    log: (...values) => output.push(values.map(formatConsoleValue).join(" ")),
    warn: (...values) => output.push(`Aviso: ${values.map(formatConsoleValue).join(" ")}`),
    error: (...values) => output.push(`Error: ${values.map(formatConsoleValue).join(" ")}`),
  };

  try {
    Function(
      "console",
      "exerciseName",
      `"use strict";\nreturn (async () => {\n${code}\nreturn typeof globalThis[exerciseName] === "function" ? globalThis[exerciseName] : (typeof ${exercise.functionName} === "function" ? ${exercise.functionName} : undefined);\n})();`,
    )(sandboxConsole, exercise.functionName)
      .then(async (candidate) => {
        if (typeof candidate !== "function") {
          elements.jsRunnerOutput.textContent = `No se encontró una función llamada ${exercise.functionName}.`;
          renderExerciseResults([], false);
          return;
        }

        const results = [];
        for (const test of exercise.tests) {
          try {
            const value = await candidate(...test.args);
            const passed = compareExerciseResult(value, test.expected, test.compare);
            results.push({
              label: test.label,
              passed,
              expected: test.expected,
              received: value,
            });
          } catch (error) {
            results.push({
              label: test.label,
              passed: false,
              expected: test.expected,
              received: `${error.name}: ${error.message}`,
            });
          }
        }

        const solved = results.length > 0 && results.every((result) => result.passed);
        if (!solved) {
          recordLessonStruggle(lesson.id, "logic", "tests");
        }
        renderExerciseResults(results, solved);
        elements.jsRunnerOutput.textContent = output.length
          ? output.join("\n")
          : solved
            ? "Solución validada correctamente."
            : "La solución se ejecutó, pero no superó todos los tests.";

        recordStudyDay();
        if (solved) {
          addProgressOnce("practiceDone", lesson.id, 20);
          addProgressOnce("solvedExercises", lesson.id, 35);
        }
        persist();
        render();
      })
      .catch((error) => {
        recordLessonStruggle(lesson.id, "logic", "tests");
        elements.jsRunnerOutput.textContent = `${error.name}: ${error.message}`;
        renderExerciseResults([], false);
      });
  } catch (error) {
    recordLessonStruggle(lesson.id, "logic", "tests");
    elements.jsRunnerOutput.textContent = `${error.name}: ${error.message}`;
    renderExerciseResults([], false);
  }
}

function createPracticeStarter(lesson) {
  const detail = lessonDetails[lesson.id];
  if (lesson.id === "js-json-fetch") {
    return `// JSON local con fetch
// Carga ./data/study-items.json y recorre data.items.

const response = await fetch("./data/study-items.json");
const data = await response.json();

const htmlItems = data.items.map((item) => {
  const tags = item.tags.join(", ");
  return \`\${item.title} | \${item.language} | \${item.level} | \${tags} | \${item.stats.xp} XP\`;
});

console.log(data.course);
console.log(htmlItems);`;
  }

  return `// ${lesson.title}
// Objetivo: ${detail.practice}

function resolver() {
  // Escribe tu solución aquí.
  return "pendiente";
}

console.log(resolver());`;
}

function createExerciseStarter(lesson) {
  const exercise = exercises[lesson.id];
  if (!exercise) return "";

  return `// ${lesson.title}
// Ejercicio evaluable
// ${exercise.prompt}

${exercise.starter}`;
}

function renderDomPreviewForActiveLesson() {
  const lesson = findLesson(state.activeLessonId);
  const exercise = exercises[lesson?.id];
  if (exercise?.mode !== "dom") {
    elements.jsRunnerOutput.textContent = "La lección activa no necesita preview DOM.";
    return;
  }

  renderDomPreview(elements.jsRunnerHtml.value)
    .then(() => {
      elements.jsRunnerOutput.textContent = "Preview renderizado.";
    })
    .catch((error) => {
      elements.jsRunnerOutput.textContent = `${error.name}: ${error.message}`;
    });
}

function runDomPractice(lesson) {
  const code = elements.jsRunnerInput.value.trim();
  if (!code) {
    elements.jsRunnerOutput.textContent = "Escribe algo de JavaScript antes de ejecutar.";
    return;
  }

  executeDomCode(code, elements.jsRunnerHtml.value)
    .then(({ output }) => {
      elements.jsRunnerOutput.textContent = output.length
        ? output.join("\n")
        : "Código ejecutado en el preview DOM.";
      recordStudyDay();
      addProgressOnce("practiceDone", lesson.id, 20);
      persist();
      render();
    })
    .catch((error) => {
      elements.jsRunnerOutput.textContent = `${error.name}: ${error.message}`;
    });
}

function evaluateDomExercise(lesson, exercise, code) {
  if (!elements.jsRunnerHtml.value.trim()) {
    elements.jsRunnerOutput.textContent = "Carga o escribe el HTML de prueba antes de evaluar.";
    return;
  }

  Promise.all(
    exercise.tests.map(async (test) => {
      const context = await executeDomCode(code, elements.jsRunnerHtml.value);
      // Simulamos acciones de usuario dentro del preview: click, submit, escribir.
      // Esto es útil para entender cómo se prueban interfaces.
      for (const action of test.actions ?? []) {
        await runDomAction(context.win, context.doc, action);
      }
      const received = test.assertions
        ? test.assertions.map((assertion) => ({
            selector: assertion.selector,
            value: readDomAssertion(context.doc, assertion),
          }))
        : readDomAssertion(context.doc, test.assertion);
      const expected = test.assertions
        ? test.assertions.map((assertion) => ({
            selector: assertion.selector,
            value: assertion.expected,
          }))
        : test.expected;
      return {
        label: test.label,
        passed: compareExerciseResult(received, expected, test.compare),
        expected,
        received,
      };
    }),
  )
    .then((results) => {
      const solved = results.length > 0 && results.every((result) => result.passed);
      if (!solved) {
        recordLessonStruggle(lesson.id, "logic", "dom-tests");
      }
      renderExerciseResults(results, solved);
      elements.jsRunnerOutput.textContent = solved
        ? "Preview y validación DOM correctos."
        : "El ejercicio se ejecutó, pero el DOM no cumple todos los tests.";

      recordStudyDay();
      if (solved) {
        addProgressOnce("practiceDone", lesson.id, 20);
        addProgressOnce("solvedExercises", lesson.id, 35);
      }
      persist();
      render();
    })
    .catch((error) => {
      recordLessonStruggle(lesson.id, "logic", "dom-tests");
      elements.jsRunnerOutput.textContent = `${error.name}: ${error.message}`;
      renderExerciseResults([], false);
    });
}

function renderDomPreview(html) {
  return new Promise((resolve) => {
    elements.runnerPreview.onload = () => resolve();
    elements.runnerPreview.srcdoc = createPreviewDocument(html);
  });
}

async function executeDomCode(code, html) {
  const output = [];
  const sandboxConsole = {
    log: (...values) => output.push(values.map(formatConsoleValue).join(" ")),
    warn: (...values) => output.push(`Aviso: ${values.map(formatConsoleValue).join(" ")}`),
    error: (...values) => output.push(`Error: ${values.map(formatConsoleValue).join(" ")}`),
  };

  await renderDomPreview(html);

  const win = elements.runnerPreview.contentWindow;
  const doc = elements.runnerPreview.contentDocument;
  // Ejecutamos el código dentro del contexto del iframe para que trabaje
  // con su propio document y no con el document principal de la app.
  const evaluator = win.Function("console", `"use strict";\n${code}`);
  const result = evaluator(sandboxConsole);
  if (result && typeof result.then === "function") {
    await result;
  }

  return { output, win, doc };
}

async function runDomAction(win, doc, action) {
  if (action.type === "call") {
    const candidate = win[action.name];
    if (typeof candidate !== "function") {
      throw new Error(`No existe la función ${action.name} en el preview.`);
    }
    const result = candidate(...(action.args ?? []));
    if (result && typeof result.then === "function") {
      await result;
    }
    return;
  }

  const element = doc.querySelector(action.selector);
  if (!element) {
    throw new Error(`No se encontró ${action.selector} en el preview.`);
  }

  if (action.type === "click") {
    element.click();
    return;
  }

  if (action.type === "set-value") {
    element.value = action.value;
    element.dispatchEvent(new win.Event("input", { bubbles: true }));
    element.dispatchEvent(new win.Event("change", { bubbles: true }));
    return;
  }

  if (action.type === "submit") {
    element.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true }));
  }
}

function readDomAssertion(doc, assertion) {
  if (assertion.type === "count") {
    return doc.querySelectorAll(assertion.selector).length;
  }

  const element = doc.querySelector(assertion.selector);
  if (!element) {
    throw new Error(`No se encontró ${assertion.selector} para validar.`);
  }

  if (assertion.type === "value") {
    return element.value;
  }

  return element.textContent.trim();
}

function createPreviewDocument(html) {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      :root {
        color-scheme: light;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 1rem;
        color: #182033;
        background: #ffffff;
        font: 400 1rem/1.5 Inter, ui-sans-serif, system-ui, sans-serif;
      }

      section,
      form {
        display: grid;
        gap: 0.75rem;
      }

      input,
      button {
        font: inherit;
      }

      button {
        width: fit-content;
        padding: 0.5rem 0.75rem;
      }

      p {
        margin: 0;
      }
    </style>
  </head>
  <body>${html}</body>
</html>`;
}

function formatConsoleValue(value) {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}
