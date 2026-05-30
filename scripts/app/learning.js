// Learning analytics, closeouts, and struggle helpers for scripts/app/main.js.

function getLearningFocus(lesson, kind, focusKey = null) {
  const explicitLabels = {
    concept: "Concepto",
    logic: "Logica",
    error: "Error tipico",
    transfer: "Transferencia",
  };

  if (focusKey && explicitLabels[focusKey]) return explicitLabels[focusKey];
  if (kind === "Repaso") return "Error tipico";
  if (kind === "Rescate") {
    return getLessonStruggleSummary(lesson.id).entries[0]?.label ?? "Concepto";
  }
  if (kind === "Preview DOM") return "Logica";
  if (kind === "Escalada") return "Transferencia";
  if (kind === "Base previa") return "Concepto";
  if (kind === "Tests") return "Logica";

  if (!state.readLessons.includes(lesson.id)) return "Concepto";
  if (!state.practiceDone.includes(lesson.id)) return "Logica";
  return "Transferencia";
}

function getStruggleIntervention(entry) {
  const closeout = getLessonCloseoutRecommendation(entry.lesson, entry.summary);
  const source = entry.summary.topSourceKey;
  const sourceLabel = entry.summary.topSourceLabel ? `, sobre todo en ${entry.summary.topSourceLabel.toLowerCase()}` : "";
  const baseReason = `Es la lección donde más atasco real llevas ahora: ${entry.summary.label}${sourceLabel}.`;
  const shortBaseReason = `Aquí llevas más atasco real acumulado: ${entry.summary.label}${sourceLabel}.`;

  if (source === "challenge") {
    return {
      kind: "Repaso",
      target: "study",
      focusKey: "error",
      reason: `${baseReason} Conviene repetir el reto y revisar el error antes de seguir avanzando.${closeout ? ` ${closeout}.` : ""}`,
      shortReason: `${shortBaseReason} Conviene repetir el reto antes de seguir.`,
    };
  }

  if (source === "tests") {
    const failureSummary = getExerciseFailureSummary(entry.lesson.id, "tests");
    return {
      kind: "Tests",
      target: "practice",
      focusKey: "logic",
      reason: `${baseReason}${failureSummary?.topLabel ? ` El test que más se repite ahora es "${failureSummary.topLabel}".` : ""} Conviene abrir práctica y validar la solución en tests normales.${closeout ? ` ${closeout}.` : ""}`,
      shortReason: `${shortBaseReason}${failureSummary?.topLabel ? ` Falla sobre todo en "${failureSummary.topLabel}".` : ""} Conviene cerrar los tests abiertos.`,
    };
  }

  if (source === "dom-tests") {
    const failureSummary = getExerciseFailureSummary(entry.lesson.id, "dom-tests");
    return {
      kind: "Preview DOM",
      target: "practice",
      focusKey: "logic",
      reason: `${baseReason}${failureSummary?.topLabel ? ` La comprobación que más se repite ahora es "${failureSummary.topLabel}".` : ""} Conviene abrir el preview y corregir renderizado, eventos o estructura DOM.${closeout ? ` ${closeout}.` : ""}`,
      shortReason: `${shortBaseReason}${failureSummary?.topLabel ? ` El fallo más repetido está en "${failureSummary.topLabel}".` : ""} Conviene volver al preview DOM.`,
    };
  }

  if (source === "evolution") {
    return {
      kind: "Escalada",
      target: exercises[entry.lesson.id] ? "practice" : "study",
      focusKey: "transfer",
      reason: `${baseReason} El atasco viene del salto entre niveles, así que conviene rehacer la versión avanzada con calma.${closeout ? ` ${closeout}.` : ""}`,
      shortReason: `${shortBaseReason} Conviene retomar la version avanzada.`,
    };
  }

  return {
    kind: "Rescate",
    target: entry.summary.topKey === "logic" && exercises[entry.lesson.id] ? "practice" : "study",
    focusKey: entry.summary.topKey,
    reason: `${baseReason} Conviene desatascarla antes de abrir más frente.${closeout ? ` ${closeout}.` : ""}`,
    shortReason: `${shortBaseReason} Conviene desatascarla antes de abrir más frente.`,
  };
}

function getLessonCloseoutRecommendation(lesson, summary) {
  if (!summary?.topKey) return "";

  if (summary.topSourceKey === "dom-tests") {
    return "Cierra la leccion rehaciendo el preview, comprobando el DOM y volviendo a validar";
  }

  if (summary.topSourceKey === "challenge" || summary.topKey === "error") {
    return "Cierra la leccion repitiendo el reto hasta resolverlo sin dudar";
  }

  if (summary.topKey === "concept") {
    return "Cierra la leccion con una relectura corta y un resumen propio en notas";
  }

  if (summary.topKey === "logic") {
    return exercises[lesson.id]
      ? "Cierra la leccion con una practica corta y una validacion final en tests"
      : "Cierra la leccion con una practica corta resuelta de principio a fin";
  }

  if (summary.topKey === "transfer") {
    return "Cierra la leccion rehaciendo el salto a un caso mas avanzado o una variacion propia";
  }

  return "";
}

function getLessonCloseoutActions(lesson, summary) {
  if (!summary?.topKey) return [];

  const rankActions = (actions) => sortCloseoutActions(lesson.id, actions);

  if (summary.topSourceKey === "dom-tests") {
    return rankActions([
      { id: "load-exercise", label: "Cargar ejercicio" },
      { id: "render-preview", label: "Abrir preview DOM" },
    ]);
  }

  if (summary.topSourceKey === "challenge" || summary.topKey === "error") {
    return rankActions([{ id: "go-challenge", label: "Ir al reto" }]);
  }

  if (summary.topKey === "concept") {
    return rankActions([{ id: "focus-notes", label: "Escribir resumen" }]);
  }

  if (summary.topKey === "logic") {
    if (exercises[lesson.id]) {
      return rankActions([
        { id: "load-exercise", label: "Cargar ejercicio" },
        { id: "go-runner", label: "Ir a practica" },
      ]);
    }
    return rankActions([{ id: "go-practice", label: "Ir a practica" }]);
  }

  if (summary.topKey === "transfer") {
    return rankActions([{ id: "go-evolution", label: "Ver salto avanzado" }]);
  }

  return [];
}

function sortCloseoutActions(lessonId, actions) {
  const closeout = state.lessonCloseouts[lessonId] ?? { successes: {}, counts: {} };
  const ranked = [...actions].sort((left, right) => {
    const leftSuccess = sanitizeStruggleCount(closeout.successes?.[left.id]);
    const rightSuccess = sanitizeStruggleCount(closeout.successes?.[right.id]);
    if (leftSuccess !== rightSuccess) return rightSuccess - leftSuccess;

    const leftCount = sanitizeStruggleCount(closeout.counts?.[left.id]);
    const rightCount = sanitizeStruggleCount(closeout.counts?.[right.id]);
    return rightCount - leftCount;
  });

  return ranked.map((action, index) => ({
    ...action,
    isPreferred: index === 0 && sanitizeStruggleCount(closeout.successes?.[action.id]) > 0,
  }));
}

function runStudyCloseoutAction(actionId) {
  recordLessonCloseoutAction(state.activeLessonId, actionId);

  if (actionId === "focus-notes") {
    elements.studyNotes.focus();
    elements.studyNotes.scrollIntoView({ behavior: "smooth", block: "center" });
    persist();
    return;
  }

  if (actionId === "go-challenge") {
    document.querySelector(".challenge").scrollIntoView({ behavior: "smooth" });
    persist();
    return;
  }

  if (actionId === "go-practice") {
    document.querySelector(".code-lab").scrollIntoView({ behavior: "smooth", block: "start" });
    persist();
    return;
  }

  if (actionId === "load-exercise") {
    loadActiveExercise();
    document.querySelector(".runner").scrollIntoView({ behavior: "smooth", block: "start" });
    persist();
    return;
  }

  if (actionId === "go-runner") {
    document.querySelector(".runner").scrollIntoView({ behavior: "smooth", block: "start" });
    persist();
    return;
  }

  if (actionId === "render-preview") {
    if (!elements.runnerHtmlPanel.hidden) {
      renderDomPreviewForActiveLesson();
    }
    document.querySelector(".runner").scrollIntoView({ behavior: "smooth", block: "start" });
    persist();
    return;
  }

  if (actionId === "go-evolution") {
    const section = elements.studyEvolutionCase.hidden ? elements.studyEvolution : elements.studyEvolutionCase;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    persist();
  }
}


function compareExerciseResult(received, expected, compareMode) {
  if (compareMode === "html") {
    return normalizeHtml(received) === normalizeHtml(expected);
  }

  return JSON.stringify(received) === JSON.stringify(expected);
}

function getExerciseFailureSummary(lessonId, source = null) {
  const entry = state.exerciseFailureLog?.[lessonId];
  if (!entry) return null;

  const weightedByLabel = new Map();
  const totalsByLabel = new Map();

  for (const event of entry.events ?? []) {
    if (source && event.source !== source) continue;
    const weight = getStruggleEventWeight(event.at);
    weightedByLabel.set(event.label, (weightedByLabel.get(event.label) ?? 0) + weight);
    totalsByLabel.set(event.label, (totalsByLabel.get(event.label) ?? 0) + 1);
  }

  const labels = Array.from(weightedByLabel.entries())
    .map(([label, weightedCount]) => ({
      label,
      weightedCount,
      count: totalsByLabel.get(label) ?? 0,
    }))
    .sort((left, right) => right.weightedCount - left.weightedCount || right.count - left.count || left.label.localeCompare(right.label));

  if (!labels.length) return null;

  return {
    total: labels.reduce((sum, entry) => sum + entry.count, 0),
    topLabel: labels[0].label,
    topWeightedCount: labels[0].weightedCount,
    topCount: labels[0].count,
    labels,
  };
}

function normalizeHtml(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

function formatExerciseMismatch(expected, received, label = "", source = "tests") {
  const hint = inferExerciseFixHint(expected, received, label, source);

  if (Array.isArray(expected) && Array.isArray(received)) {
    const lines = expected
      .map((item, index) => {
        const current = received[index];
        return `<p>${escapeHtml(item.selector)} · esperado: ${escapeHtml(formatConsoleValue(item.value))} · recibido: ${escapeHtml(formatConsoleValue(current?.value))}</p>`;
      })
      .join("");

    return `${lines}${hint ? `<p><strong>Pista:</strong> ${escapeHtml(hint)}</p>` : ""}`;
  }

  return `<p>Esperado: ${escapeHtml(formatConsoleValue(expected))}</p><p>Recibido: ${escapeHtml(formatConsoleValue(received))}</p>${hint ? `<p><strong>Pista:</strong> ${escapeHtml(hint)}</p>` : ""}`;
}

function inferExerciseFixHint(expected, received, label = "", source = "tests") {
  const normalizedLabel = String(label).toLowerCase();
  const receivedText = typeof received === "string" ? received : formatConsoleValue(received);
  const expectedText = typeof expected === "string" ? expected : formatConsoleValue(expected);

  if (typeof receivedText === "string" && receivedText.includes("Error:")) {
    return "La solución está lanzando un error. Revisa primero el nombre de la función, accesos a propiedades y datos que recorres.";
  }

  if (source === "dom-tests" && Array.isArray(expected) && expected.some((item) => typeof item?.value === "number")) {
    return "Revisa cuántos nodos estás pintando y si limpias el contenedor antes de volver a renderizar.";
  }

  if (source === "dom-tests" && Array.isArray(expected)) {
    return "Revisa el texto final del DOM, el orden de los elementos visibles y si sustituyes por completo el render anterior.";
  }

  if (normalizedLabel.includes("orden") || normalizedLabel.includes("mantiene") || normalizedLabel.includes("conserva")) {
    return "Revisa el orden del filtrado o del map final. El dato puede ser correcto, pero salir en una secuencia distinta.";
  }

  if (normalizedLabel.includes("vacia") || normalizedLabel.includes("vacía") || normalizedLabel.includes("limpia") || normalizedLabel.includes("sustituye")) {
    return "Revisa si reinicias el resultado anterior antes de pintar la nueva tanda.";
  }

  if (normalizedLabel.includes("filtra") || normalizedLabel.includes("solo") || normalizedLabel.includes("featured") || normalizedLabel.includes("pendientes")) {
    return "Revisa la condición de filtrado antes de transformar o pintar los datos.";
  }

  if (typeof expected === "string" && expected.includes("<li>")) {
    return "Revisa el formato exacto del HTML devuelto: etiquetas, separadores, espacios útiles y orden de campos.";
  }

  if (expected && typeof expected === "object") {
    return "Revisa la estructura final que devuelves: nombres de propiedades, contadores y arrays calculados.";
  }

  if (typeof expectedText === "string" && typeof receivedText === "string") {
    return "Revisa el valor final que devuelves y compáralo con el esperado carácter por carácter si hace falta.";
  }

  return "";
}

function recordLessonStruggle(lessonId, type, source = "study") {
  if (!lessonId || !["concept", "logic", "error", "transfer"].includes(type)) return;

  const current = state.lessonStruggles[lessonId] ?? createEmptyStruggleRecord();
  const event = {
    type,
    source,
    at: new Date().toISOString(),
  };

  state.lessonStruggles[lessonId] = {
    ...current,
    [type]: current[type] + 1,
    sources: {
      ...(current.sources ?? {}),
      [source]: sanitizeStruggleCount(current.sources?.[source]) + 1,
    },
    events: [...(current.events ?? []), event].slice(-24),
  };
  recordStudyDay();
}

function relieveLessonStruggle(lessonId, { type = null, source = null, amount = 1, recentOnly = true } = {}) {
  const current = state.lessonStruggles[lessonId];
  if (!current) return;

  maybeRecordCloseoutSuccess(lessonId);

  const next = {
    concept: current.concept ?? 0,
    logic: current.logic ?? 0,
    error: current.error ?? 0,
    transfer: current.transfer ?? 0,
    sources: { ...(current.sources ?? {}) },
    events: [...(current.events ?? [])],
    recoveries: { ...(current.recoveries ?? {}) },
  };

  const matchesEvent = (event) => {
    if (type && event.type !== type) return false;
    if (source && event.source !== source) return false;
    if (recentOnly && getStruggleEventWeight(event.at) < 2) return false;
    return true;
  };

  const indexesToRemove = [];
  for (let index = next.events.length - 1; index >= 0 && indexesToRemove.length < amount; index -= 1) {
    if (matchesEvent(next.events[index])) {
      indexesToRemove.push(index);
    }
  }

  if (!indexesToRemove.length && recentOnly) {
    relieveLessonStruggle(lessonId, { type, source, amount, recentOnly: false });
    return;
  }

  if (!indexesToRemove.length && !recentOnly && !type && !source) {
    const trimmedTypes = ["concept", "logic", "error", "transfer"];
    trimmedTypes.forEach((key) => {
      next[key] = Math.max(0, next[key] - amount);
      next.recoveries[key] = sanitizeStruggleCount(next.recoveries[key]) + 1;
    });
    state.lessonStruggles[lessonId] = normalizeStruggleRecord(next);
    return;
  }

  for (const index of indexesToRemove) {
    const [removed] = next.events.splice(index, 1);
    if (!removed) continue;
    next[removed.type] = Math.max(0, (next[removed.type] ?? 0) - 1);
    next.recoveries[removed.type] = sanitizeStruggleCount(next.recoveries[removed.type]) + 1;
    if (next.sources[removed.source]) {
      next.sources[removed.source] = Math.max(0, next.sources[removed.source] - 1);
      if (next.sources[removed.source] === 0) {
        delete next.sources[removed.source];
      }
    }
  }

  state.lessonStruggles[lessonId] = normalizeStruggleRecord(next);
}

function recordLessonCloseoutAction(lessonId, actionId) {
  if (!lessonId || !actionId) return;

  const current = state.lessonCloseouts[lessonId] ?? {
    counts: {},
    successes: {},
    lastAction: "",
    lastAt: "",
  };

  state.lessonCloseouts[lessonId] = {
    counts: {
      ...(current.counts ?? {}),
      [actionId]: sanitizeStruggleCount(current.counts?.[actionId]) + 1,
    },
    successes: {
      ...(current.successes ?? {}),
    },
    lastAction: actionId,
    lastAt: new Date().toISOString(),
  };
  recordStudyDay();
}

function getLessonCloseoutState(lessonId) {
  const entry = state.lessonCloseouts[lessonId];
  if (!entry?.lastAction) return "";

  const labels = {
    "focus-notes": "Escribir resumen",
    "go-challenge": "Ir al reto",
    "go-practice": "Ir a practica",
    "load-exercise": "Cargar ejercicio",
    "go-runner": "Ir a practica",
    "render-preview": "Abrir preview DOM",
    "go-evolution": "Ver salto avanzado",
  };

  const successCount = sanitizeStruggleCount(entry.successes?.[entry.lastAction]);
  return successCount > 0
    ? `${labels[entry.lastAction] ?? entry.lastAction} · ${successCount} alivios`
    : labels[entry.lastAction] ?? entry.lastAction;
}

function getLessonCloseoutPreference(lessonId) {
  const closeout = state.lessonCloseouts[lessonId];
  if (!closeout?.successes) return "";

  const labels = {
    "focus-notes": "Escribir resumen",
    "go-challenge": "Ir al reto",
    "go-practice": "Ir a practica",
    "load-exercise": "Cargar ejercicio",
    "go-runner": "Ir a practica",
    "render-preview": "Abrir preview DOM",
    "go-evolution": "Ver salto avanzado",
  };

  const best = Object.entries(closeout.successes)
    .map(([actionId, count]) => ({
      actionId,
      count: sanitizeStruggleCount(count),
    }))
    .filter((entry) => entry.count > 0)
    .sort((left, right) => right.count - left.count)[0];

  if (!best) return "";
  return `${labels[best.actionId] ?? best.actionId} (${best.count})`;
}

function maybeRecordCloseoutSuccess(lessonId) {
  const closeout = state.lessonCloseouts[lessonId];
  if (!closeout?.lastAction || !closeout.lastAt) return;

  const ageMs = Date.now() - Date.parse(closeout.lastAt);
  if (!Number.isFinite(ageMs) || ageMs > 12 * 60 * 60 * 1000) return;

  state.lessonCloseouts[lessonId] = {
    ...closeout,
    successes: {
      ...(closeout.successes ?? {}),
      [closeout.lastAction]: sanitizeStruggleCount(closeout.successes?.[closeout.lastAction]) + 1,
    },
    lastAt: "",
  };
}

function getLessonStruggleSummary(lessonId) {
  const counts = state.lessonStruggles[lessonId] ?? createEmptyStruggleRecord();
  const labels = {
    concept: "Concepto",
    logic: "Logica",
    error: "Error tipico",
    transfer: "Transferencia",
  };
  const sourceLabels = {
    study: "Leccion activa",
    challenge: "Reto",
    tests: "Tests",
    "dom-tests": "Tests DOM",
    manual: "Marca manual",
    evolution: "Caso evolutivo",
  };
  const weightedTypeCounts = {
    concept: 0,
    logic: 0,
    error: 0,
    transfer: 0,
  };
  const weightedSourceCounts = {};
  const recoveries = cleanStruggleRecoveries(counts.recoveries);

  for (const event of counts.events ?? []) {
    const weight = getStruggleEventWeight(event.at);
    weightedTypeCounts[event.type] = (weightedTypeCounts[event.type] ?? 0) + weight;
    weightedSourceCounts[event.source] = (weightedSourceCounts[event.source] ?? 0) + weight;
  }

  const entries = Object.entries(counts)
    .map(([key, count]) => ({
      key,
      label: labels[key],
      count,
    }))
    .filter((entry) => labels[entry.key] && entry.count > 0)
    .sort((left, right) => right.count - left.count);
  const sourceEntries = Object.entries(counts.sources ?? {})
    .map(([key, count]) => ({
      key,
      label: sourceLabels[key] ?? key,
      count,
    }))
    .filter((entry) => entry.count > 0)
    .sort((left, right) => right.count - left.count);
  const weightedEntries = Object.entries(weightedTypeCounts)
    .map(([key, count]) => ({
      key,
      label: labels[key],
      count,
    }))
    .filter((entry) => entry.count > 0)
    .sort((left, right) => right.count - left.count);
  const weightedSourceEntries = Object.entries(weightedSourceCounts)
    .map(([key, count]) => ({
      key,
      label: sourceLabels[key] ?? key,
      count,
    }))
    .filter((entry) => entry.count > 0)
    .sort((left, right) => right.count - left.count);

  return {
    total: entries.reduce((sum, entry) => sum + entry.count, 0),
    weightedTotal: weightedEntries.reduce((sum, entry) => sum + entry.count, 0),
    topKey: weightedEntries[0]?.key ?? entries[0]?.key ?? null,
    label: entries[0] ? `${entries[0].label} (${entries[0].count})` : "",
    entries,
    sourceEntries,
    weightedEntries,
    weightedSourceEntries,
    topSourceKey: weightedSourceEntries[0]?.key ?? sourceEntries[0]?.key ?? null,
    topSourceLabel: weightedSourceEntries[0]?.label ?? sourceEntries[0]?.label ?? "",
    recentLabel: formatStruggleRecency(weightedEntries[0]?.count ?? 0),
    reliefLabel: formatStruggleRelief((entries[0]?.count ?? 0) - (weightedEntries[0]?.count ?? 0)),
    recoveries,
    recurrenceScore: computeStruggleRecurrence(weightedEntries, recoveries),
    recurrenceLabel: formatStruggleRecurrence(computeStruggleRecurrence(weightedEntries, recoveries)),
  };
}

function createEmptyStruggleRecord() {
  return {
    concept: 0,
    logic: 0,
    error: 0,
    transfer: 0,
    sources: {},
    events: [],
    recoveries: {},
  };
}

function normalizeStruggleRecord(record) {
  return {
    concept: sanitizeStruggleCount(record.concept),
    logic: sanitizeStruggleCount(record.logic),
    error: sanitizeStruggleCount(record.error),
    transfer: sanitizeStruggleCount(record.transfer),
    sources: cleanStruggleSources(record.sources),
    events: cleanStruggleEvents(record.events),
    recoveries: cleanStruggleRecoveries(record.recoveries),
  };
}

function getSupportHint(support, topKey) {
  if (topKey === "logic") return `Pista util ahora: ${support.logic}`;
  if (topKey === "error") return `Error a vigilar: ${support.mistake}`;
  if (topKey === "transfer") return `Salto importante: ${support.mnemonic}`;
  return `Idea clave: ${support.concept}`;
}

function getLessonReinforcementPlan(lesson) {
  const summary = getLessonStruggleSummary(lesson.id);
  if (!summary.total) return null;

  const actions = [];
  const topKey = summary.topKey;
  const topSource = summary.topSourceKey;

  let title = "Refuerzo recomendado";
  let summaryText = "Conviene cerrar este atasco con una intervención corta antes de abrir más frente.";

  if (topKey === "concept") {
    summaryText = "El bloqueo dominante sigue siendo conceptual. Conviene fijar la idea antes de insistir en más práctica.";
    actions.push("Relee teoría y deja una nota propia con una regla o ejemplo.");
    actions.push("Vuelve a resolver una versión mínima del problema sin mirar el ejemplo completo.");
  } else if (topKey === "logic") {
    summaryText = "La deuda principal está en la ejecución del ejercicio, no en la teoría.";
    actions.push(exercises[lesson.id]
      ? "Carga la práctica o los tests y cierra un caso completo de principio a fin."
      : "Repite la práctica completa y comprueba cada paso antes de pasar al siguiente.");
    actions.push("Evita abrir otra lección hasta que la salida o el comportamiento sean estables.");
  } else if (topKey === "error") {
    summaryText = "Aquí no falta tanto teoría como corrección repetida del mismo fallo.";
    actions.push("Vuelve al reto o al caso fallado e identifica exactamente qué condición o decisión se repite mal.");
    actions.push("Escribe una regla corta en notas con el error típico que no quieres repetir.");
  } else if (topKey === "transfer") {
    summaryText = "El atasco aparece sobre todo al subir de nivel o cambiar de forma el mismo problema.";
    actions.push("Retoma la base previa y compara qué cambia realmente en el salto avanzado.");
    actions.push("Rehaz la versión evolucionada con una sola mejora clara: estructura, datos o separación de responsabilidades.");
  }

  if (topSource === "dom-tests") {
    title = "Refuerzo DOM";
    actions.unshift("Abre el preview DOM y limpia primero el contenido anterior antes de validar otra vez.");
  } else if (topSource === "tests") {
    title = "Refuerzo por tests";
    actions.unshift("Cierra primero el test más simple y usa ese caso como ancla antes de tocar el resto.");
  } else if (topSource === "challenge") {
    title = "Refuerzo por reto";
    actions.unshift("Repite el reto sin prisa y justifica por qué descartas cada opción que no eliges.");
  } else if (topSource === "evolution") {
    title = "Refuerzo de escalada";
    actions.unshift("No rehagas todo: identifica qué pieza nueva introduce la versión avanzada y aísla ese cambio.");
  }

  if (summary.recurrenceScore >= 2) {
    actions.push("Como ya hay patrón de recaída, cierra la sesión dejando una nota de verificación para la próxima vez.");
  }

  return {
    title,
    summary: summaryText,
    actions: actions.slice(0, 3),
  };
}

function getTrackStruggleCounts(trackId) {
  return tracks[trackId].lessons.reduce(
    (totals, lesson) => {
      const summary = getLessonStruggleSummary(lesson.id);
      for (const entry of summary.weightedEntries) {
        totals[entry.key] += entry.count;
      }
      return totals;
    },
    { concept: 0, logic: 0, error: 0, transfer: 0 },
  );
}

function getTrackStruggleLeaders(trackId) {
  return tracks[trackId].lessons
    .map((lesson) => ({
      lesson,
      summary: getLessonStruggleSummary(lesson.id),
    }))
    .filter((entry) => entry.summary.weightedTotal > 0 || entry.summary.total > 0)
    .sort((left, right) => right.summary.recurrenceScore - left.summary.recurrenceScore || right.summary.weightedTotal - left.summary.weightedTotal || right.summary.total - left.summary.total || scoreLessonRecommendation(right.lesson).score - scoreLessonRecommendation(left.lesson).score);
}

function getStruggleEventWeight(isoDate) {
  const eventTime = Date.parse(isoDate);
  if (!Number.isFinite(eventTime)) return 1;

  const daysAgo = Math.max(0, (Date.now() - eventTime) / 86400000);
  if (daysAgo <= 2) return 3;
  if (daysAgo <= 7) return 2;
  return 1;
}

function formatStruggleRecency(weight) {
  if (weight >= 6) return "Presion reciente alta";
  if (weight >= 3) return "Presion reciente media";
  if (weight > 0) return "Presion reciente baja";
  return "";
}

function formatStruggleRelief(delta) {
  if (delta >= 3) return "Parte del atasco ya esta aflojando";
  if (delta >= 1) return "Hay senales de mejora";
  return "";
}

function computeStruggleRecurrence(weightedEntries, recoveries) {
  const topWeight = weightedEntries[0]?.count ?? 0;
  const recoveredCount = Object.values(recoveries).reduce((sum, value) => sum + value, 0);
  if (recoveredCount >= 4 && topWeight >= 2) return 3;
  if (recoveredCount >= 2 && topWeight >= 1) return 2;
  if (recoveredCount >= 1 && topWeight >= 1) return 1;
  return 0;
}

function formatStruggleRecurrence(score) {
  if (score >= 3) return "Patron fragil alto";
  if (score >= 2) return "Patron fragil";
  if (score >= 1) return "Riesgo de recaida";
  return "";
}
