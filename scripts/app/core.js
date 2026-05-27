// Núcleo compartido: datos, estado, referencias DOM y utilidades base.
// La app carga este archivo antes del resto para que runner, planning y render
// trabajen sobre el mismo estado global.
const STORAGE_KEY = "solo-learn-progress-v2";
const LEGACY_STORAGE_KEY = "solo-learn-progress-v1";
const { tracks, lessonDetails, learningSupports, studyPlan, exercises, javaPracticeGuides, projectBriefs, evolutionBriefs, evolutionCases, appBlueprint } = window.LEARNING_DATA;

const achievements = [
  {
    id: "first-step",
    icon: "01",
    title: "Primer paso",
    description: "Completa cualquier lección.",
    isUnlocked: (state) => state.completed.length >= 1,
  },
  {
    id: "java-init",
    icon: "J",
    title: "Java iniciado",
    description: "Completa cuatro lecciones de Java.",
    isUnlocked: (state) => countCompletedByTrack(state, "java") >= 4,
  },
  {
    id: "js-init",
    icon: "JS",
    title: "JavaScript iniciado",
    description: "Completa cuatro lecciones de JavaScript.",
    isUnlocked: (state) => countCompletedByTrack(state, "javascript") >= 4,
  },
  {
    id: "quiz-runner",
    icon: "XP",
    title: "Retador constante",
    description: "Resuelve seis retos correctamente.",
    isUnlocked: (state) => state.solvedChallenges.length >= 6,
  },
  {
    id: "reader",
    icon: "T",
    title: "Teoría al día",
    description: "Marca ocho teorías como leídas.",
    isUnlocked: (state) => state.readLessons.length >= 8,
  },
  {
    id: "builder",
    icon: "P",
    title: "Práctica real",
    description: "Completa ocho prácticas.",
    isUnlocked: (state) => state.practiceDone.length >= 8,
  },
  {
    id: "tested",
    icon: "OK",
    title: "Soluciones validadas",
    description: "Supera tres ejercicios evaluables.",
    isUnlocked: (state) => state.solvedExercises.length >= 3,
  },
  {
    id: "advanced",
    icon: "A",
    title: "Modo avanzado",
    description: "Completa una lección avanzada.",
    isUnlocked: (state) =>
      allLessons().some((lesson) => lesson.level === "Avanzado" && state.completed.includes(lesson.id)),
  },
  {
    id: "summer-plan",
    icon: "V",
    title: "Plan de verano",
    description: "Completa al menos una lección de cada fase del plan.",
    isUnlocked: (state) =>
      studyPlan.every((phase) =>
        phase.lessonIds.some((lessonId) => state.completed.includes(lessonId)),
      ),
  },
];

const defaultState = {
  activeTrack: "java",
  filter: "all",
  lessonSort: "default",
  practiceFamilyFilter: "all",
  practiceDifficultyFilter: "all",
  practiceTypeFilter: "all",
  practiceStatusFilter: "all",
  practiceEvolutionFilter: "all",
  practicePhaseFilter: "all",
  practiceSort: "pending",
  activeLessonId: "java-variables",
  completed: [],
  solvedChallenges: [],
  failedChallenges: [],
  readLessons: [],
  practiceDone: [],
  solvedExercises: [],
  lessonStruggles: {},
  lessonCloseouts: {},
  notes: {},
  quickstartDismissed: false,
  dailyQueueLog: {},
  completedDailySessions: [],
  lastStudyDate: null,
  lastTrackActivity: {
    java: null,
    javascript: null,
  },
  streak: 0,
  xp: 0,
};

// "state" es el objeto central de la app:
// guarda qué sabe la interfaz en este momento.
// Este patrón se estudia sobre todo en la lección js-state.
let state = loadState();

// Aquí agrupamos referencias al DOM para no repetir querySelector todo el rato.
// Esto conecta con js-dom: seleccionar elementos y trabajar con ellos.
const elements = {
  xpValue: document.querySelector("#xpValue"),
  levelValue: document.querySelector("#levelValue"),
  completedValue: document.querySelector("#completedValue"),
  streakValue: document.querySelector("#streakValue"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  trackProgress: document.querySelector("#trackProgress"),
  quickstart: document.querySelector("#quickstart"),
  nextSession: document.querySelector("#nextSession"),
  dailyQueue: document.querySelector("#dailyQueue"),
  weeklyMissions: document.querySelector("#weeklyMissions"),
  reviewBox: document.querySelector("#reviewBox"),
  activeTrack: document.querySelector("#activeTrack"),
  focusModeButton: document.querySelector("#focusModeButton"),
  tabs: document.querySelectorAll(".language-tabs__button"),
  filters: document.querySelectorAll(".level-filters__button"),
  trackLabel: document.querySelector("#trackLabel"),
  trackTitle: document.querySelector("#trackTitle"),
  trackSummary: document.querySelector("#trackSummary"),
  lessonSort: document.querySelector("#lessonSort"),
  lessonGrid: document.querySelector("#lessonGrid"),
  planGrid: document.querySelector("#planGrid"),
  studyLevel: document.querySelector("#studyLevel"),
  studyTitle: document.querySelector("#studyTitle"),
  studyTheory: document.querySelector("#studyTheory"),
  studySupport: document.querySelector("#studySupport"),
  studyStruggles: document.querySelector("#studyStruggles"),
  studySteps: document.querySelector("#studySteps"),
  studyProgress: document.querySelector("#studyProgress"),
  studyNotes: document.querySelector("#studyNotes"),
  saveNotesButton: document.querySelector("#saveNotesButton"),
  studyLanguage: document.querySelector("#studyLanguage"),
  studyExample: document.querySelector("#studyExample"),
  studyPractice: document.querySelector("#studyPractice"),
  studyExercise: document.querySelector("#studyExercise"),
  studyExercisePrompt: document.querySelector("#studyExercisePrompt"),
  studyExerciseChecklist: document.querySelector("#studyExerciseChecklist"),
  studyExerciseStatus: document.querySelector("#studyExerciseStatus"),
  studyGuidedProblem: document.querySelector("#studyGuidedProblem"),
  studyGuidedPrompt: document.querySelector("#studyGuidedPrompt"),
  studyGuidedInput: document.querySelector("#studyGuidedInput"),
  studyGuidedOutput: document.querySelector("#studyGuidedOutput"),
  studyGuidedChecklist: document.querySelector("#studyGuidedChecklist"),
  studyGuidedStarterBlock: document.querySelector("#studyGuidedStarterBlock"),
  studyGuidedStarter: document.querySelector("#studyGuidedStarter"),
  studyGuidedChecksBlock: document.querySelector("#studyGuidedChecksBlock"),
  studyGuidedChecks: document.querySelector("#studyGuidedChecks"),
  studyGuidedVariationBlock: document.querySelector("#studyGuidedVariationBlock"),
  studyGuidedVariation: document.querySelector("#studyGuidedVariation"),
  studyGuidedEdgeCasesBlock: document.querySelector("#studyGuidedEdgeCasesBlock"),
  studyGuidedEdgeCases: document.querySelector("#studyGuidedEdgeCases"),
  studyGuidedHintsBlock: document.querySelector("#studyGuidedHintsBlock"),
  studyGuidedHints: document.querySelector("#studyGuidedHints"),
  studyGuidedMistakesBlock: document.querySelector("#studyGuidedMistakesBlock"),
  studyGuidedMistakes: document.querySelector("#studyGuidedMistakes"),
  studyProject: document.querySelector("#studyProject"),
  studyProjectSummary: document.querySelector("#studyProjectSummary"),
  studyProjectOutcome: document.querySelector("#studyProjectOutcome"),
  studyProjectMilestones: document.querySelector("#studyProjectMilestones"),
  studyProjectDeliverables: document.querySelector("#studyProjectDeliverables"),
  studyProjectStarterBlock: document.querySelector("#studyProjectStarterBlock"),
  studyProjectStarter: document.querySelector("#studyProjectStarter"),
  studyProjectValidationBlock: document.querySelector("#studyProjectValidationBlock"),
  studyProjectValidation: document.querySelector("#studyProjectValidation"),
  studyProjectSignalsBlock: document.querySelector("#studyProjectSignalsBlock"),
  studyProjectSignals: document.querySelector("#studyProjectSignals"),
  studyEvolution: document.querySelector("#studyEvolution"),
  studyEvolutionFrom: document.querySelector("#studyEvolutionFrom"),
  studyEvolutionBasic: document.querySelector("#studyEvolutionBasic"),
  studyEvolutionAdvanced: document.querySelector("#studyEvolutionAdvanced"),
  studyEvolutionUpgrades: document.querySelector("#studyEvolutionUpgrades"),
  studyEvolutionJump: document.querySelector("#studyEvolutionJump"),
  studyEvolutionCase: document.querySelector("#studyEvolutionCase"),
  studyEvolutionCaseTag: document.querySelector("#studyEvolutionCaseTag"),
  studyEvolutionCaseSummary: document.querySelector("#studyEvolutionCaseSummary"),
  studyEvolutionCaseBase: document.querySelector("#studyEvolutionCaseBase"),
  studyEvolutionCaseAdvanced: document.querySelector("#studyEvolutionCaseAdvanced"),
  studyEvolutionCaseStarter: document.querySelector("#studyEvolutionCaseStarter"),
  studyEvolutionCaseChecklist: document.querySelector("#studyEvolutionCaseChecklist"),
  studyEvolutionCaseLoad: document.querySelector("#studyEvolutionCaseLoad"),
  markReadButton: document.querySelector("#markReadButton"),
  markPracticeButton: document.querySelector("#markPracticeButton"),
  finishLessonButton: document.querySelector("#finishLessonButton"),
  challengeTitle: document.querySelector("#challengeTitle"),
  challengePrompt: document.querySelector(".challenge__prompt"),
  challengeOptions: document.querySelector("#challengeOptions"),
  challengeForm: document.querySelector("#challengeForm"),
  challengeFeedback: document.querySelector("#challengeFeedback"),
  jsRunnerInput: document.querySelector("#jsRunnerInput"),
  jsRunnerHtml: document.querySelector("#jsRunnerHtml"),
  jsRunnerOutput: document.querySelector("#jsRunnerOutput"),
  runJsButton: document.querySelector("#runJsButton"),
  loadPracticeButton: document.querySelector("#loadPracticeButton"),
  loadExerciseButton: document.querySelector("#loadExerciseButton"),
  renderPreviewButton: document.querySelector("#renderPreviewButton"),
  evaluateExerciseButton: document.querySelector("#evaluateExerciseButton"),
  clearRunnerButton: document.querySelector("#clearRunnerButton"),
  runnerHtmlPanel: document.querySelector("#runnerHtmlPanel"),
  runnerPreviewPanel: document.querySelector("#runnerPreviewPanel"),
  runnerPreview: document.querySelector("#runnerPreview"),
  exerciseResultsPanel: document.querySelector("#exerciseResultsPanel"),
  exerciseSummary: document.querySelector("#exerciseSummary"),
  exerciseResults: document.querySelector("#exerciseResults"),
  achievementGrid: document.querySelector("#achievementGrid"),
  brandTrigger: document.querySelector("#brandTrigger"),
  blueprintPanel: document.querySelector("#blueprintPanel"),
  blueprintLegend: document.querySelector("#blueprintLegend"),
  blueprintGrid: document.querySelector("#blueprintGrid"),
  practiceBankGrid: document.querySelector("#practiceBankGrid"),
  practiceBankSpotlight: document.querySelector("#practiceBankSpotlight"),
  practiceBankPhases: document.querySelector("#practiceBankPhases"),
  practiceBankStats: document.querySelector("#practiceBankStats"),
  practiceFamilyFilter: document.querySelector("#practiceFamilyFilter"),
  practiceDifficultyFilter: document.querySelector("#practiceDifficultyFilter"),
  practiceTypeFilter: document.querySelector("#practiceTypeFilter"),
  practiceStatusFilter: document.querySelector("#practiceStatusFilter"),
  practiceEvolutionFilter: document.querySelector("#practiceEvolutionFilter"),
  practicePhaseFilter: document.querySelector("#practicePhaseFilter"),
  practiceSort: document.querySelector("#practiceSort"),
  practiceResetFilters: document.querySelector("#practiceResetFilters"),
  closeBlueprintButton: document.querySelector("#closeBlueprintButton"),
  continueButton: document.querySelector("#continueButton"),
  resetButton: document.querySelector("#resetButton"),
  exportButton: document.querySelector("#exportButton"),
  importInput: document.querySelector("#importInput"),
  storageStatus: document.querySelector("#storageStatus"),
};

// Easter egg: contador de toques sobre el logo para abrir la radiografía técnica.
// Sirve también como ejemplo de eventos, estado simple y temporizadores.
function openLesson(lessonId) {
  const lesson = findLesson(lessonId);
  if (!lesson) return;

  state.activeTrack = getTrackIdByLesson(lessonId);
  state.activeLessonId = lessonId;
  elements.challengeFeedback.textContent = "";
  elements.exerciseResultsPanel.hidden = true;
}

function setFeedback(message, type) {
  elements.challengeFeedback.textContent = message;
  elements.challengeFeedback.className = `feedback ${type}`;
}

function visibleLessons() {
  return tracks[state.activeTrack].lessons.filter(
    (lesson) => state.filter === "all" || lesson.level === state.filter,
  );
}

function sortVisibleLessons(lessons) {
  if (state.lessonSort !== "impact") {
    return lessons;
  }

  return [...lessons].sort((left, right) => {
    const leftCompleted = state.completed.includes(left.id);
    const rightCompleted = state.completed.includes(right.id);
    if (leftCompleted !== rightCompleted) {
      return Number(leftCompleted) - Number(rightCompleted);
    }

    const leftScore = scoreLessonRecommendation(left).score;
    const rightScore = scoreLessonRecommendation(right).score;
    return rightScore - leftScore || left.xp - right.xp;
  });
}

function firstVisibleLesson() {
  return visibleLessons()[0];
}

function allLessons() {
  return Object.values(tracks).flatMap((track) => track.lessons);
}

function findLesson(id) {
  return allLessons().find((lesson) => lesson.id === id);
}

function getTrackIdByLesson(lessonId) {
  return Object.entries(tracks).find(([, track]) =>
    track.lessons.some((lesson) => lesson.id === lessonId),
  )?.[0];
}

function countCompletedByTrack(currentState, trackId) {
  return tracks[trackId].lessons.filter((lesson) => currentState.completed.includes(lesson.id)).length;
}

function countProgressByTrack(currentState, trackId, key) {
  return tracks[trackId].lessons.filter((lesson) => currentState[key].includes(lesson.id)).length;
}

function getTrackProgressSnapshot(trackId) {
  const total = tracks[trackId].lessons.length;
  const read = countProgressByTrack(state, trackId, "readLessons");
  const practice = countProgressByTrack(state, trackId, "practiceDone");
  const validated = countProgressByTrack(state, trackId, "solvedExercises");
  const completed = countCompletedByTrack(state, trackId);

  return { total, read, practice, validated, completed };
}

function formatStudyDate(dateKey) {
  if (typeof dateKey !== "string" || !dateKey) return "Sin sesión aún";

  const date = new Date(`${dateKey}T12:00:00`);
  if (Number.isNaN(date.getTime())) return dateKey;

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

function getLessonStruggleWeight(lessonId) {
  const entry = state.lessonStruggles[lessonId];
  if (!entry) return 0;

  return sanitizeStruggleCount(entry.concept) +
    sanitizeStruggleCount(entry.logic) +
    sanitizeStruggleCount(entry.error) +
    sanitizeStruggleCount(entry.transfer);
}

function getPendingReviewEntries(trackId) {
  const grouped = new Map();

  const register = (lessonId, reason, priority) => {
    const lesson = findLesson(lessonId);
    if (!lesson || getTrackIdByLesson(lessonId) !== trackId) return;

    const current = grouped.get(lessonId) ?? {
      lesson,
      reasons: [],
      priority: 0,
    };

    current.reasons.push(reason);
    current.priority = Math.max(current.priority, priority);
    grouped.set(lessonId, current);
  };

  state.failedChallenges
    .filter((lessonId) => !state.solvedChallenges.includes(lessonId))
    .forEach((lessonId) => register(lessonId, "Reto", 3));

  tracks[trackId].lessons
    .filter((lesson) => exercises[lesson.id] && !state.solvedExercises.includes(lesson.id))
    .filter((lesson) => state.readLessons.includes(lesson.id) || state.practiceDone.includes(lesson.id))
    .forEach((lesson) => register(lesson.id, "Tests", 2));

  tracks[trackId].lessons
    .filter((lesson) => !state.completed.includes(lesson.id))
    .filter((lesson) => getLessonStruggleWeight(lesson.id) >= 2)
    .forEach((lesson) => register(lesson.id, "Atasco", 1));

  return Array.from(grouped.values())
    .map((entry) => ({
      ...entry,
      reasons: [...new Set(entry.reasons)],
    }))
    .sort((left, right) =>
      right.priority - left.priority ||
      getLessonStruggleWeight(right.lesson.id) - getLessonStruggleWeight(left.lesson.id) ||
      scoreLessonRecommendation(right.lesson).score - scoreLessonRecommendation(left.lesson).score,
    );
}

function completeLesson(lesson) {
  if (!lesson || state.completed.includes(lesson.id)) return;
  state.completed.push(lesson.id);
  state.xp += lesson.xp;
  relieveLessonStruggle(lesson.id, { amount: 1, recentOnly: false });
}

function addProgressOnce(key, lessonId, xp) {
  if (state[key].includes(lessonId)) return;

  state[key].push(lessonId);
  state.xp += xp;

  if (key === "readLessons") {
    relieveLessonStruggle(lessonId, { type: "concept", source: "study", amount: 1 });
  }

  if (key === "practiceDone") {
    relieveLessonStruggle(lessonId, { type: "logic", source: "study", amount: 1 });
  }

  if (key === "solvedExercises") {
    relieveLessonStruggle(lessonId, { type: "logic", source: "tests", amount: 2 });
    relieveLessonStruggle(lessonId, { type: "logic", source: "dom-tests", amount: 2 });
  }
}

function recordStudyDay() {
  const today = new Date().toISOString().slice(0, 10);
  const trackId = getTrackIdByLesson(state.activeLessonId) ?? state.activeTrack;
  state.lastTrackActivity[trackId] = today;

  if (state.lastStudyDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  state.streak = state.lastStudyDate === yesterdayKey ? state.streak + 1 : 1;
  state.lastStudyDate = today;
}

function lessonStatusText(isCompleted, hasRead, hasPracticed, isActive) {
  if (isCompleted) return "Completada";
  if (hasRead && hasPracticed) return "Lista para finalizar";
  if (hasRead) return "Teoría leída";
  if (hasPracticed) return "Práctica hecha";
  if (isActive) return "Lección abierta";
  return "Pendiente";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderExerciseResults(results, solved) {
  elements.exerciseResultsPanel.hidden = false;
  elements.exerciseSummary.textContent = solved
    ? "Todos los tests superados"
    : results.length
      ? `${results.filter((result) => result.passed).length}/${results.length} tests correctos`
      : "Sin evaluar";
  elements.exerciseResults.innerHTML = results.length
    ? results
        .map(
          (result) => `
            <li class="runner__exercise-item ${result.passed ? "is-passed" : "is-failed"}">
              <strong>${escapeHtml(result.label)}</strong>
              <span>${result.passed ? "Correcto" : "Revisar"}</span>
              ${result.passed ? "" : formatExerciseMismatch(result.expected, result.received)}
            </li>
          `,
        )
        .join("")
    : `<li class="runner__exercise-item is-failed"><strong>Sin resultado</strong><span>No se pudo validar.</span></li>`;
}

function setStorageStatus(message) {
  elements.storageStatus.textContent = message;
  window.setTimeout(() => {
    if (elements.storageStatus.textContent === message) {
      elements.storageStatus.textContent = "";
    }
  }, 2400);
}

function toggleBlueprintPanel(forceOpen) {
  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : elements.blueprintPanel.hidden;
  elements.blueprintPanel.hidden = !shouldOpen;

  if (shouldOpen) {
    elements.blueprintPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Este helper revisa si ya completaste la base previa para entender
// un bloque técnico concreto del frontend actual.
function blueprintPrerequisites(item) {
  const entries = (item.prerequisites ?? []).map((lessonId) => findLesson(lessonId)).filter(Boolean);
  const completed = entries.filter((lesson) => state.completed.includes(lesson.id));
  const pending = entries.filter((lesson) => !state.completed.includes(lesson.id));

  if (!entries.length) {
    return {
      completed,
      pending,
      message: "Este bloque se apoya en fundamentos muy tempranos. Puedes empezar a explorarlo desde ya.",
    };
  }

  if (!pending.length) {
    return {
      completed,
      pending,
      message: `Ya cubriste la base necesaria: ${completed.map((lesson) => lesson.title).join(", ")}.`,
    };
  }

  return {
    completed,
    pending,
    message: `Antes conviene cerrar: ${pending.map((lesson) => lesson.title).join(", ")}.`,
  };
}

// En vez de recomendar "la siguiente en la lista", calculamos
// qué lección desbloquea más comprensión útil del proyecto.
function saveCurrentNotes() {
  const note = elements.studyNotes.value.trim();
  if (note) {
    state.notes[state.activeLessonId] = note;
  } else {
    delete state.notes[state.activeLessonId];
  }
}

function loadState() {
  try {
    const rawProgress = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
    const saved = JSON.parse(rawProgress);
    return normalizeState(saved);
  } catch {
    return createDefaultState();
  }
}

function normalizeState(value) {
  const lessonIds = allLessons().map((lesson) => lesson.id);
  const activeTrack = tracks[value?.activeTrack] ? value.activeTrack : defaultState.activeTrack;
  const trackLessonIds = tracks[activeTrack].lessons.map((lesson) => lesson.id);
  const filter = ["all", "Cero", "Base", "Intermedio", "Avanzado"].includes(value?.filter)
    ? value.filter
    : defaultState.filter;
  const lessonSort = ["default", "impact"].includes(value?.lessonSort)
    ? value.lessonSort
    : defaultState.lessonSort;
  const quickstartDismissed = typeof value?.quickstartDismissed === "boolean"
    ? value.quickstartDismissed
    : defaultState.quickstartDismissed;
  const practiceTypeFilter = typeof value?.practiceTypeFilter === "string"
    ? value.practiceTypeFilter
    : defaultState.practiceTypeFilter;
  const practiceStatusFilter = ["all", "pending", "done"].includes(value?.practiceStatusFilter)
    ? value.practiceStatusFilter
    : defaultState.practiceStatusFilter;
  const practiceEvolutionFilter = ["all", "evolves", "standalone"].includes(value?.practiceEvolutionFilter)
    ? value.practiceEvolutionFilter
    : defaultState.practiceEvolutionFilter;
  const practicePhaseFilter = typeof value?.practicePhaseFilter === "string"
    ? value.practicePhaseFilter
    : defaultState.practicePhaseFilter;
  const practiceSort = ["pending", "impact", "difficulty", "family"].includes(value?.practiceSort)
    ? value.practiceSort
    : defaultState.practiceSort;

  return {
    activeTrack,
    filter,
    lessonSort,
    quickstartDismissed,
    practiceFamilyFilter: typeof value?.practiceFamilyFilter === "string" ? value.practiceFamilyFilter : "all",
    practiceDifficultyFilter: typeof value?.practiceDifficultyFilter === "string" ? value.practiceDifficultyFilter : "all",
    practiceTypeFilter,
    practiceStatusFilter,
    practiceEvolutionFilter,
    practicePhaseFilter,
    practiceSort,
    activeLessonId: trackLessonIds.includes(value?.activeLessonId)
      ? value.activeLessonId
      : tracks[activeTrack].lessons[0].id,
    completed: cleanIds(value?.completed, lessonIds),
    solvedChallenges: cleanIds(value?.solvedChallenges, lessonIds),
    failedChallenges: cleanIds(value?.failedChallenges, lessonIds),
    readLessons: cleanIds(value?.readLessons, lessonIds),
    practiceDone: cleanIds(value?.practiceDone, lessonIds),
    solvedExercises: cleanIds(value?.solvedExercises, lessonIds),
    lessonStruggles: cleanLessonStruggles(value?.lessonStruggles, lessonIds),
    lessonCloseouts: cleanLessonCloseouts(value?.lessonCloseouts, lessonIds),
    notes: cleanNotes(value?.notes, lessonIds),
    dailyQueueLog: cleanDailyQueueLog(value?.dailyQueueLog, lessonIds),
    completedDailySessions: cleanDateArray(value?.completedDailySessions),
    lastStudyDate: typeof value?.lastStudyDate === "string" ? value.lastStudyDate : null,
    lastTrackActivity: cleanTrackActivity(value?.lastTrackActivity),
    streak: Number.isFinite(value?.streak) ? Math.max(0, value.streak) : 0,
    xp: Number.isFinite(value?.xp) ? Math.max(0, value.xp) : 0,
  };
}

function cleanIds(value, validIds) {
  return Array.isArray(value) ? value.filter((id) => validIds.includes(id)) : [];
}

function cleanNotes(value, validIds) {
  if (!value || typeof value !== "object") return {};

  return Object.fromEntries(
    Object.entries(value)
      .filter(([lessonId, note]) => validIds.includes(lessonId) && typeof note === "string")
      .map(([lessonId, note]) => [lessonId, note.slice(0, 5000)]),
  );
}

function cleanDailyQueueLog(value, validIds) {
  if (!value || typeof value !== "object") return {};

  return Object.fromEntries(
    Object.entries(value)
      .filter(([dateKey, items]) => typeof dateKey === "string" && Array.isArray(items))
      .map(([dateKey, items]) => [
        dateKey,
        items.filter((item) => {
          if (typeof item !== "string") return false;
          const [, lessonId] = item.split(":");
          return validIds.includes(lessonId);
        }).slice(0, 10),
      ])
      .slice(0, 14),
  );
}

function cleanDateArray(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => typeof item === "string").slice(0, 14);
}

function cleanTrackActivity(value) {
  return {
    java: typeof value?.java === "string" ? value.java : null,
    javascript: typeof value?.javascript === "string" ? value.javascript : null,
  };
}

function sanitizeStruggleCount(value) {
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
}

function cleanStruggleSources(value) {
  if (!value || typeof value !== "object") return {};

  return Object.fromEntries(
    Object.entries(value)
      .filter(([source]) => typeof source === "string")
      .map(([source, count]) => [source, sanitizeStruggleCount(count)])
      .filter(([, count]) => count > 0),
  );
}

function cleanStruggleEvents(value) {
  if (!Array.isArray(value)) return [];

  return value
    .filter((event) =>
      event &&
      typeof event === "object" &&
      ["concept", "logic", "error", "transfer"].includes(event.type) &&
      typeof event.source === "string" &&
      typeof event.at === "string" &&
      Number.isFinite(Date.parse(event.at)),
    )
    .map((event) => ({
      type: event.type,
      source: event.source,
      at: event.at,
    }))
    .slice(-24);
}

function cleanStruggleRecoveries(value) {
  if (!value || typeof value !== "object") return {};

  return {
    concept: sanitizeStruggleCount(value.concept),
    logic: sanitizeStruggleCount(value.logic),
    error: sanitizeStruggleCount(value.error),
    transfer: sanitizeStruggleCount(value.transfer),
  };
}

function cleanLessonCloseouts(value, validIds) {
  if (!value || typeof value !== "object") return {};

  return Object.fromEntries(
    Object.entries(value)
      .filter(([lessonId, entry]) => validIds.includes(lessonId) && entry && typeof entry === "object")
      .map(([lessonId, entry]) => [
        lessonId,
        {
          counts: Object.fromEntries(
            Object.entries(entry.counts ?? {})
              .filter(([actionId]) => typeof actionId === "string")
              .map(([actionId, count]) => [actionId, sanitizeStruggleCount(count)])
              .filter(([, count]) => count > 0),
          ),
          successes: Object.fromEntries(
            Object.entries(entry.successes ?? {})
              .filter(([actionId]) => typeof actionId === "string")
              .map(([actionId, count]) => [actionId, sanitizeStruggleCount(count)])
              .filter(([, count]) => count > 0),
          ),
          lastAction: typeof entry.lastAction === "string" ? entry.lastAction : "",
          lastAt: typeof entry.lastAt === "string" ? entry.lastAt : "",
        },
      ]),
  );
}

function cleanLessonStruggles(value, validIds) {
  if (!value || typeof value !== "object") return {};

  return Object.fromEntries(
    Object.entries(value)
      .filter(([lessonId, counts]) => validIds.includes(lessonId) && counts && typeof counts === "object")
      .map(([lessonId, counts]) => [
        lessonId,
        {
          concept: sanitizeStruggleCount(counts.concept),
          logic: sanitizeStruggleCount(counts.logic),
          error: sanitizeStruggleCount(counts.error),
          transfer: sanitizeStruggleCount(counts.transfer),
          sources: cleanStruggleSources(counts.sources),
          events: cleanStruggleEvents(counts.events),
          recoveries: cleanStruggleRecoveries(counts.recoveries),
        },
      ]),
  );
}

function createDefaultState() {
  return {
    ...defaultState,
    completed: [],
    solvedChallenges: [],
    failedChallenges: [],
    readLessons: [],
    practiceDone: [],
    solvedExercises: [],
    lessonStruggles: {},
    lessonCloseouts: {},
    notes: {},
    quickstartDismissed: false,
    dailyQueueLog: {},
    completedDailySessions: [],
    lastStudyDate: null,
    lastTrackActivity: {
      java: null,
      javascript: null,
    },
    streak: 0,
  };
}

function getPracticeBankEntries(trackId) {
  if (trackId === "javascript") {
    return Object.entries(exercises)
      .map(([lessonId, exercise]) => {
        const lesson = findLesson(lessonId);
        if (!lesson) return null;
        const evolution = evolutionBriefs[lessonId];

        return {
          lessonId,
          trackId,
          trackLabel: tracks[trackId].label,
          family: exercise.family ?? "Práctica",
          difficulty: exercise.difficulty ?? lesson.level,
          progressState: getPracticeProgressState(lessonId, "javascript"),
          practiceType: exercise.practiceType ?? "Práctica",
          title: lesson.title,
          summary: exercise.prompt,
          target: "practice",
          isDone: state.solvedExercises.includes(lessonId),
          hasEvolution: Boolean(evolution),
          evolutionPhase: evolutionCases[lessonId]?.phase ?? "",
          evolutionBaseLessonId: evolution?.fromLessonId ?? "",
          evolutionSourceTitle: evolution?.fromTitle ?? "",
          evolutionBaseCovered: evolution ? isLessonCovered(evolution.fromLessonId) : false,
        };
      })
      .filter(Boolean)
      .sort((left, right) => left.family.localeCompare(right.family) || left.title.localeCompare(right.title));
  }

  return Object.entries(javaPracticeGuides)
    .map(([lessonId, guideEntry]) => {
      const lesson = findLesson(lessonId);
      if (!lesson) return null;
      const evolution = evolutionBriefs[lessonId];

      return {
        lessonId,
        trackId,
        trackLabel: tracks[trackId].label,
        family: guideEntry.family ?? "Problema",
        difficulty: guideEntry.difficulty ?? lesson.level,
        progressState: getPracticeProgressState(lessonId, "java"),
        practiceType: guideEntry.practiceType ?? "Consola",
        title: lesson.title,
        summary: guideEntry.prompt,
        target: "study",
        isDone: state.practiceDone.includes(lessonId) || state.completed.includes(lessonId),
        hasEvolution: Boolean(evolution),
        evolutionPhase: evolutionCases[lessonId]?.phase ?? "",
        evolutionBaseLessonId: evolution?.fromLessonId ?? "",
        evolutionSourceTitle: evolution?.fromTitle ?? "",
        evolutionBaseCovered: evolution ? isLessonCovered(evolution.fromLessonId) : false,
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.family.localeCompare(right.family) || left.title.localeCompare(right.title));
}

function getPracticeProgressState(lessonId, trackId) {
  if (trackId === "javascript") {
    if (state.solvedExercises.includes(lessonId)) {
      return { key: "done", label: "Hecho" };
    }

    if (state.readLessons.includes(lessonId) || state.practiceDone.includes(lessonId)) {
      return { key: "started", label: "Empezado" };
    }

    return { key: "new", label: "Sin tocar" };
  }

  if (state.practiceDone.includes(lessonId) || state.completed.includes(lessonId)) {
    return { key: "done", label: "Hecho" };
  }

  if (state.readLessons.includes(lessonId)) {
    return { key: "started", label: "Empezado" };
  }

  return { key: "new", label: "Sin tocar" };
}

function isLessonCovered(lessonId) {
  return state.completed.includes(lessonId) ||
    state.readLessons.includes(lessonId) ||
    state.practiceDone.includes(lessonId) ||
    state.solvedExercises.includes(lessonId);
}

function getPracticeSpotlightReason(entry) {
  if (entry.hasEvolution && !entry.evolutionBaseCovered) {
    return `Escala un ejercicio anterior, pero todavía te conviene cubrir antes la base: ${entry.evolutionSourceTitle}.`;
  }

  if (entry.hasEvolution && entry.progressState.key !== "done") {
    return "Te sirve ahora y además reaparece después con una versión más exigente del mismo problema.";
  }

  if (entry.progressState.key === "started") {
    return "Ya empezaste esta práctica. Cerrarla ahora suele dar más retorno que abrir otra distinta.";
  }

  if (entry.progressState.key === "new") {
    const lesson = findLesson(entry.lessonId);
    const recommendation = lesson ? scoreLessonRecommendation(lesson) : null;
    return recommendation?.reason ?? "Es una buena siguiente pieza dentro de la ruta activa.";
  }

  return "Ya la tienes hecha. Puede servirte como repaso o contraste con otras prácticas de la misma familia.";
}

function getPracticeFamilyStats(entries) {
  const grouped = new Map();

  entries.forEach((entry) => {
    if (!grouped.has(entry.family)) {
      grouped.set(entry.family, {
        family: entry.family,
        total: 0,
        done: 0,
        started: 0,
        newCount: 0,
      });
    }

    const current = grouped.get(entry.family);
    current.total += 1;

    if (entry.progressState.key === "done") {
      current.done += 1;
    } else if (entry.progressState.key === "started") {
      current.started += 1;
    } else {
      current.newCount += 1;
    }
  });

  const sorted = [...grouped.values()]
    .map((item) => ({
      ...item,
      percent: item.total ? Math.round((item.done / item.total) * 100) : 0,
      debtScore: item.newCount * 2 + item.started,
    }))
    .sort((left, right) => right.debtScore - left.debtScore || left.family.localeCompare(right.family));

  const priorityFamily = sorted.find((item) => item.debtScore > 0)?.family;

  return sorted.map((item) => ({
    ...item,
    isPriority: item.family === priorityFamily,
  }));
}
