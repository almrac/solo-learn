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
  studyMode: "all",
  workMode: "study",
  learningAreaFilter: "all",
  filter: "all",
  lessonSort: "default",
  practiceFamilyFilter: "all",
  practiceTopicFilter: "all",
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
  trackSessionLog: {
    java: [],
    javascript: [],
  },
  challengeSuccessLog: [],
  exerciseSuccessLog: [],
  exerciseFailureLog: {},
  streak: 0,
  xp: 0,
  examMode: {
    active: false,
    lessonIds: [],
    currentIndex: 0,
    startedAt: null,
    durationSeconds: 0,
    answers: [],
    finishedAt: null,
    reason: "",
  },
  examSetup: {
    trackScope: "active",
    learningAreaScope: "current",
    levelScope: "current",
  },
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
  historyPanel: document.querySelector("#historyPanel"),
  reviewBox: document.querySelector("#reviewBox"),
  activeTrack: document.querySelector("#activeTrack"),
  roomGuide: document.querySelector("#roomGuide"),
  studyModeSummary: document.querySelector("#studyModeSummary"),
  workModeSummary: document.querySelector("#workModeSummary"),
  workModeActions: document.querySelector("#workModeActions"),
  focusModeButton: document.querySelector("#focusModeButton"),
  studyModeTabs: document.querySelectorAll("[data-study-mode]"),
  workModeTabs: document.querySelectorAll("[data-work-mode]"),
  filters: document.querySelectorAll(".level-filters__button"),
  learningAreaFilter: document.querySelector("#learningAreaFilter"),
  learningAreaFilterLabel: document.querySelector("#learningAreaFilterLabel"),
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
  studyExerciseFocus: document.querySelector("#studyExerciseFocus"),
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
  challengeMeta: document.querySelector("#challengeMeta"),
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
  practiceBankTopics: document.querySelector("#practiceBankTopics"),
  practiceFamilyFilter: document.querySelector("#practiceFamilyFilter"),
  practiceTopicFilter: document.querySelector("#practiceTopicFilter"),
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
  return allLessons().filter(
    (lesson) =>
      matchesStudyMode(lesson.id) &&
      (state.filter === "all" || lesson.level === state.filter) &&
      matchesLearningAreaFilter(lesson.id),
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

function buildExamLessonIds() {
  const examTrackScope = state.examSetup?.trackScope ?? "active";
  const examAreaScope = state.examSetup?.learningAreaScope ?? "current";
  const examLevelScope = state.examSetup?.levelScope ?? "current";
  const selectedTrack = examTrackScope === "active" ? state.activeTrack : examTrackScope;
  const selectedArea = examAreaScope === "current" ? state.learningAreaFilter : examAreaScope;
  const selectedLevel = examLevelScope === "current" ? state.filter : examLevelScope;

  return allLessons()
    .filter((lesson) => {
      const trackMatch = selectedTrack === "all" || getTrackIdByLesson(lesson.id) === selectedTrack;
      const areaMatch = matchesLearningAreaFilter(lesson.id, selectedArea);
      const levelMatch = selectedLevel === "all" || lesson.level === selectedLevel;
      return trackMatch && areaMatch && levelMatch;
    })
    .sort((left, right) => {
      const leftSignal = getLessonPrioritySignal(left);
      const rightSignal = getLessonPrioritySignal(right);
      return rightSignal.failureWeight - leftSignal.failureWeight ||
        rightSignal.isStarted - leftSignal.isStarted ||
        rightSignal.impactScore - leftSignal.impactScore ||
        left.xp - right.xp;
    })
    .map((lesson) => lesson.id);
}

function isLessonStarted(lessonId) {
  return state.readLessons.includes(lessonId) ||
    state.practiceDone.includes(lessonId) ||
    state.solvedExercises.includes(lessonId);
}

function getLessonPrioritySignal(lessonId, options = {}) {
  const lesson = typeof lessonId === "string" ? findLesson(lessonId) : lessonId;
  if (!lesson?.id) {
    return {
      lesson: null,
      failureWeight: 0,
      isStarted: 0,
      impactScore: 0,
      leadHint: "",
      primaryReason: "",
    };
  }

  const failureSummary = getExerciseFailureSummary(lesson.id);
  const recommendation = scoreLessonRecommendation(lesson);
  const failureWeight = failureSummary?.topWeightedCount ?? 0;
  const started = Number(isLessonStarted(lesson.id));

  return {
    lesson,
    failureWeight,
    isStarted: started,
    impactScore: recommendation?.score ?? 0,
    leadHint: getLessonLeadHint(lesson, options.hintOptions ?? {}),
    primaryReason: failureSummary?.topLabel
      ? `recaida:${failureSummary.topLabel}`
      : started
        ? "started"
        : "impact",
  };
}

function getLessonLeadHint(lessonId, options = {}) {
  const lesson = typeof lessonId === "string" ? findLesson(lessonId) : lessonId;
  if (!lesson?.id) return "";

  const failureSummary = getExerciseFailureSummary(lesson.id);
  if (failureSummary?.topLabel) {
    return options.failurePrefix
      ? `${options.failurePrefix} "${failureSummary.topLabel}".`
      : `Entra por "${failureSummary.topLabel}".`;
  }

  if (typeof options.fallbackWhenNoFailure === "function") {
    const fallback = options.fallbackWhenNoFailure(lesson);
    if (fallback) return fallback;
  }

  if (isLessonStarted(lesson.id)) {
    return options.startedText ?? "Ya tiene trabajo abierto.";
  }

  return options.defaultText ?? "Empuja una pieza con impacto técnico real.";
}

function getExamLeadHint() {
  const firstLessonId = buildExamLessonIds()[0];
  if (!firstLessonId) return "";

  const lesson = findLesson(firstLessonId);
  if (!lesson) return "";

  return getLessonLeadHint(lesson, {
    failurePrefix: `Entraría primero ${lesson.title} por recaída en`,
    startedText: `Entraría primero ${lesson.title} porque ya tiene trabajo abierto dentro del alcance actual.`,
    defaultText: `Entraría primero ${lesson.title} por impacto técnico dentro del filtro actual.`,
  });
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

function getTrackLearningArea(trackId) {
  return trackId === "javascript" ? "frontend" : "backend";
}

function getStudyModeTrackIds(studyMode = state.studyMode) {
  if (studyMode === "all") {
    return Object.keys(tracks);
  }

  return tracks[studyMode] ? [studyMode] : [defaultState.activeTrack];
}

function matchesStudyMode(lessonId, studyMode = state.studyMode) {
  return studyMode === "all" || getTrackIdByLesson(lessonId) === studyMode;
}

function getLessonLearningArea(lessonId) {
  const trackId = getTrackIdByLesson(lessonId);
  return trackId ? getTrackLearningArea(trackId) : "backend";
}

function matchesLearningAreaFilter(lessonId, learningArea = state.learningAreaFilter) {
  return learningArea === "all" || getLessonLearningArea(lessonId) === learningArea;
}

function syncTrackWithLearningArea() {
  // Hoy frontend/backend sigue muy alineado con JavaScript/Java.
  // Sincronizamos ambos para no dejar vistas vacías mientras el catálogo crece.
  if (state.learningAreaFilter === "frontend" && state.activeTrack !== "javascript") {
    state.activeTrack = "javascript";
    state.studyMode = "javascript";
  }

  if (state.learningAreaFilter === "backend" && state.activeTrack !== "java") {
    state.activeTrack = "java";
    state.studyMode = "java";
  }

  if (state.learningAreaFilter === "all" && state.studyMode !== "all") {
    state.studyMode = "all";
  }
}

// El rediseño usa una "sala" global de estudio: Todo, Java o JavaScript.
// Este helper centraliza cómo se sincroniza esa sala con track activo y filtros.
function applyStudyMode(studyMode) {
  const nextMode = ["all", "java", "javascript"].includes(studyMode)
    ? studyMode
    : defaultState.studyMode;

  state.studyMode = nextMode;

  if (nextMode === "all") {
    state.learningAreaFilter = "all";
  } else {
    state.activeTrack = nextMode;
    state.learningAreaFilter = getTrackLearningArea(nextMode);
  }

  state.activeLessonId = firstVisibleLesson()?.id ?? tracks[state.activeTrack].lessons[0].id;
}

function applyWorkMode(workMode) {
  state.workMode = ["study", "practice", "exam"].includes(workMode)
    ? workMode
    : defaultState.workMode;
}

function getWorkModeTarget(workMode = state.workMode) {
  if (workMode === "practice") {
    return {
      selector: ".practice-bank",
      label: "Ir al banco",
      secondarySelector: ".runner",
      secondaryLabel: "Abrir runner",
    };
  }

  if (workMode === "exam") {
    return {
      selector: ".challenge",
      label: "Abrir examen",
      secondarySelector: ".review-box",
      secondaryLabel: "Ver repaso",
    };
  }

  return {
    selector: ".study",
    label: "Seguir lección",
    secondarySelector: ".dashboard",
    secondaryLabel: "Ver catálogo",
  };
}

function getExamCurrentLesson() {
  if (!state.examMode.lessonIds.length) return null;
  const lessonId = state.examMode.lessonIds[Math.min(state.examMode.currentIndex, state.examMode.lessonIds.length - 1)];
  return findLesson(lessonId);
}

function getExamRemainingSeconds() {
  if (!state.examMode.active || !Number.isFinite(state.examMode.startedAt)) return 0;
  const elapsedSeconds = Math.floor((Date.now() - state.examMode.startedAt) / 1000);
  return Math.max(0, state.examMode.durationSeconds - elapsedSeconds);
}

function getExamScore() {
  return (state.examMode.answers ?? []).filter((entry) => entry.isCorrect).length;
}

function getExamReviewSummary() {
  const wrongLessonIds = state.examMode.lessonIds.filter((lessonId) => {
    const entry = state.examMode.answers.find((item) => item.lessonId === lessonId);
    return !entry?.isCorrect;
  });

  const byTrack = new Map();
  const byLevel = new Map();
  const byRecurringFailure = new Map();

  wrongLessonIds.forEach((lessonId) => {
    const lesson = findLesson(lessonId);
    const trackId = getTrackIdByLesson(lessonId);
    if (!lesson || !trackId) return;

    byTrack.set(trackId, (byTrack.get(trackId) ?? 0) + 1);
    byLevel.set(lesson.level, (byLevel.get(lesson.level) ?? 0) + 1);

    const failureSummary = getExerciseFailureSummary(lessonId);
    if (failureSummary?.topLabel) {
      byRecurringFailure.set(
        failureSummary.topLabel,
        (byRecurringFailure.get(failureSummary.topLabel) ?? 0) + Math.max(1, failureSummary.topWeightedCount ?? 1),
      );
    }
  });

  return {
    wrongLessonIds,
    byTrack: [...byTrack.entries()].map(([trackId, count]) => ({
      label: tracks[trackId].label,
      count,
    })),
    byLevel: [...byLevel.entries()].map(([level, count]) => ({
      label: level,
      count,
    })),
    recurringFailures: [...byRecurringFailure.entries()]
      .map(([label, count]) => ({
        label,
        count,
      }))
      .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label))
      .slice(0, 3),
  };
}

function startExamMode() {
  const lessonIds = buildExamLessonIds();
  if (!lessonIds.length) return false;

  state.examMode = {
    active: true,
    lessonIds,
    currentIndex: 0,
    startedAt: Date.now(),
    durationSeconds: Math.max(lessonIds.length * 45, 180),
    answers: [],
    finishedAt: null,
    reason: "",
  };
  openLesson(lessonIds[0]);
  return true;
}

function finishExamMode(reason = "completed") {
  state.examMode = {
    ...state.examMode,
    active: false,
    finishedAt: Date.now(),
    reason,
  };
}

function resetExamMode() {
  state.examMode = {
    active: false,
    lessonIds: [],
    currentIndex: 0,
    startedAt: null,
    durationSeconds: 0,
    answers: [],
    finishedAt: null,
    reason: "",
  };
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

function getTrackTopicProgress(trackId, limit = 3) {
  return getPracticeFamilyStats(getPracticeBankEntries(trackId))
    .map((item) => ({
      family: item.family,
      total: item.total,
      done: item.done,
      started: item.started,
      touched: item.done + item.started,
      percent: item.total ? Math.round(((item.done + item.started) / item.total) * 100) : 0,
    }))
    .sort((left, right) =>
      right.touched - left.touched ||
      right.done - left.done ||
      left.family.localeCompare(right.family),
    )
    .slice(0, limit);
}

function getPracticeTopics(entry) {
  const topics = new Set();
  const lessonId = entry.lessonId;

  if (["js-array-methods"].includes(lessonId)) topics.add("arrays");
  if (["js-objects", "js-state", "js-project"].includes(lessonId)) topics.add("objetos");
  if (["js-array-methods", "js-json-fetch"].includes(lessonId)) topics.add("map/filter/reduce");
  if (["js-dom", "js-forms", "js-components"].includes(lessonId)) topics.add("DOM");
  if (["js-async", "js-json-fetch", "js-fetch-to-dom"].includes(lessonId)) topics.add("fetch");
  if ([
    "js-render-lists",
    "js-state",
    "js-data-to-dom",
    "js-json-to-dom",
    "js-fetch-to-dom",
    "js-ui-states",
    "js-project",
  ].includes(lessonId)) topics.add("renderizado UI");
  if (["java-oop", "java-inheritance"].includes(lessonId)) topics.add("POO en Java");
  if (["java-collections"].includes(lessonId)) topics.add("colecciones en Java");

  return [...topics];
}

function getTrackSessionSnapshot(trackId) {
  const dates = state.trackSessionLog[trackId] ?? [];
  const recent = dates.slice(0, 3);
  const today = new Date();
  const lastSevenDays = Array.from({ length: 7 }, (_, offset) => {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    return date.toISOString().slice(0, 10);
  });
  const weeklyCount = lastSevenDays.filter((day) => dates.includes(day)).length;

  return {
    weeklyCount,
    recent,
  };
}

function getCurrentWeekDateKeys(days = 7) {
  const today = new Date();
  return Array.from({ length: days }, (_, offset) => {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    return date.toISOString().slice(0, 10);
  });
}

function getLessonTopicsForHistory(lessonId) {
  const topics = getPracticeTopics({ lessonId });
  if (topics.length) return topics;

  const trackId = getTrackIdByLesson(lessonId);
  return trackId ? [tracks[trackId].label] : [];
}

function getHistorySnapshot(days = 7) {
  const recentDays = getCurrentWeekDateKeys(days);
  const studiedDays = recentDays.filter((day) =>
    (state.trackSessionLog.java ?? []).includes(day) || (state.trackSessionLog.javascript ?? []).includes(day),
  );
  const closedDays = recentDays.filter((day) => state.completedDailySessions.includes(day));
  const approxMinutes = recentDays.reduce((total, day) => {
    const items = state.dailyQueueLog[day] ?? [];
    return total + Math.min(items.length * 15, 60);
  }, 0);

  const topicCounts = new Map();
  recentDays.forEach((day) => {
    const items = state.dailyQueueLog[day] ?? [];
    items.forEach((item) => {
      const [, lessonId] = String(item).split(":");
      getLessonTopicsForHistory(lessonId).forEach((topic) => {
        topicCounts.set(topic, (topicCounts.get(topic) ?? 0) + 1);
      });
    });
  });

  const topTopics = [...topicCounts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, 3)
    .map(([topic]) => topic);

  const trackBreakdown = Object.keys(tracks).map((trackId) => {
    const dates = state.trackSessionLog[trackId] ?? [];
    const studiedCount = recentDays.filter((day) => dates.includes(day)).length;

    return {
      trackId,
      label: tracks[trackId].label,
      studiedCount,
      recent: dates.slice(0, 2),
    };
  });

  const daySummaries = recentDays.map((day) => {
    const queueItems = state.dailyQueueLog[day] ?? [];
    const touchedTracks = [
      (state.trackSessionLog.java ?? []).includes(day) ? "Java" : null,
      (state.trackSessionLog.javascript ?? []).includes(day) ? "JavaScript" : null,
    ].filter(Boolean);

    const challengeCount = (state.challengeSuccessLog ?? [])
      .filter((entry) => typeof entry === "string")
      .filter((entry) => entry.split(":")[0] === day)
      .length;

    const exerciseCount = (state.exerciseSuccessLog ?? [])
      .filter((entry) => typeof entry === "string")
      .filter((entry) => entry.split(":")[0] === day)
      .length;

    return {
      day,
      queueCount: queueItems.length,
      completedSession: state.completedDailySessions.includes(day),
      challengeCount,
      exerciseCount,
      touchedTracks,
    };
  });

  return {
    recentDays,
    studiedDays,
    closedDays,
    approxMinutes,
    topTopics,
    trackBreakdown,
    daySummaries,
    solvedChallengesCount: getWeeklySolvedChallengesCount(),
    solvedExercisesCount: getWeeklySolvedExercisesCount(),
  };
}

function recordChallengeSuccess(lessonId) {
  const today = new Date().toISOString().slice(0, 10);
  const item = `${today}:${lessonId}`;
  state.challengeSuccessLog = [item, ...(state.challengeSuccessLog ?? []).filter((entry) => entry !== item)].slice(0, 30);
}

function recordExerciseSuccess(lessonId) {
  const today = new Date().toISOString().slice(0, 10);
  const item = `${today}:${lessonId}`;
  state.exerciseSuccessLog = [item, ...(state.exerciseSuccessLog ?? []).filter((entry) => entry !== item)].slice(0, 30);
}

function getWeeklySolvedChallengesCount() {
  const currentWeek = new Set(getCurrentWeekDateKeys());
  return (state.challengeSuccessLog ?? [])
    .filter((entry) => typeof entry === "string")
    .filter((entry) => currentWeek.has(entry.split(":")[0]))
    .length;
}

function getWeeklySolvedExercisesCount() {
  const currentWeek = new Set(getCurrentWeekDateKeys());
  return (state.exerciseSuccessLog ?? [])
    .filter((entry) => typeof entry === "string")
    .filter((entry) => currentWeek.has(entry.split(":")[0]))
    .length;
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

  const register = (lessonId, reason, priority, detail = "", detailWeight = 0) => {
    const lesson = findLesson(lessonId);
    if (!lesson || getTrackIdByLesson(lessonId) !== trackId) return;

    const current = grouped.get(lessonId) ?? {
      lesson,
      reasons: [],
      priority: 0,
      detail: "",
      detailWeight: 0,
    };

    current.reasons.push(reason);
    current.priority = Math.max(current.priority, priority);
    if (detail && detailWeight >= current.detailWeight) {
      current.detail = detail;
      current.detailWeight = detailWeight;
    }
    grouped.set(lessonId, current);
  };

  state.failedChallenges
    .filter((lessonId) => !state.solvedChallenges.includes(lessonId))
    .forEach((lessonId) => register(lessonId, "Reto", 3));

  tracks[trackId].lessons
    .filter((lesson) => exercises[lesson.id] && !state.solvedExercises.includes(lesson.id))
    .filter((lesson) => state.readLessons.includes(lesson.id) || state.practiceDone.includes(lesson.id))
    .forEach((lesson) => {
      const failureSummary = getExerciseFailureSummary(lesson.id);
      const detail = failureSummary?.topLabel
        ? `Fallo repetido: ${failureSummary.topLabel}`
        : "";
      register(lesson.id, "Tests", 2, detail, failureSummary?.topWeightedCount ?? 0);
    });

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
      right.detailWeight - left.detailWeight ||
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
  const currentTrackHistory = new Set(state.trackSessionLog[trackId] ?? []);
  currentTrackHistory.add(today);
  state.trackSessionLog[trackId] = [...currentTrackHistory]
    .sort((left, right) => right.localeCompare(left))
    .slice(0, 14);

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

function renderExerciseResults(results, solved, lessonId = "", source = "tests") {
  elements.exerciseResultsPanel.hidden = false;
  const failureSummary = lessonId && !solved
    ? getExerciseFailureSummary(lessonId, source)
    : null;

  elements.exerciseSummary.textContent = solved
    ? "Todos los tests superados"
    : failureSummary?.topLabel
      ? `${results.filter((result) => result.passed).length}/${results.length} tests correctos · atasco dominante: ${failureSummary.topLabel}`
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
              ${result.passed ? "" : `${formatExerciseMismatch(result.expected, result.received, result.label, source)}${formatExerciseFailureHint(lessonId, source, result.label)}`}
            </li>
          `,
        )
        .join("")
    : `<li class="runner__exercise-item is-failed"><strong>Sin resultado</strong><span>No se pudo validar.</span></li>`;
}

function formatExerciseFailureHint(lessonId, source, label) {
  if (!lessonId || !label) return "";

  const failureSummary = getExerciseFailureSummary(lessonId, source);
  const failureEntry = state.exerciseFailureLog?.[lessonId]?.tests?.[label];
  const count = sanitizeStruggleCount(failureEntry?.count);
  const isDominant = failureSummary?.topLabel === label;

  if (!count) return "";

  if (isDominant && count >= 2) {
    return `<p>Este es el fallo que más se repite ahora mismo en esta lección.</p>`;
  }

  if (count >= 2) {
    return `<p>Este caso ya ha fallado varias veces; conviene cerrarlo antes de pasar al siguiente.</p>`;
  }

  return "";
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
  const studyMode = ["all", "java", "javascript"].includes(value?.studyMode)
    ? value.studyMode
    : defaultState.studyMode;
  const workMode = ["study", "practice", "exam"].includes(value?.workMode)
    ? value.workMode
    : defaultState.workMode;
  const lessonIds = allLessons().map((lesson) => lesson.id);
  const learningAreaFilter = ["all", "frontend", "backend"].includes(value?.learningAreaFilter)
    ? value.learningAreaFilter
    : defaultState.learningAreaFilter;
  const requestedTrack = tracks[value?.activeTrack] ? value.activeTrack : defaultState.activeTrack;
  const areaTrack = learningAreaFilter === "frontend"
    ? "javascript"
    : learningAreaFilter === "backend"
      ? "java"
      : requestedTrack;
  const activeTrack = studyMode === "java" || studyMode === "javascript"
    ? studyMode
    : areaTrack;
  const normalizedLearningArea = studyMode === "all"
    ? learningAreaFilter
    : getTrackLearningArea(activeTrack);
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
  const practiceTopicFilter = typeof value?.practiceTopicFilter === "string"
    ? value.practiceTopicFilter
    : defaultState.practiceTopicFilter;
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
  const rawExamMode = value?.examMode;
  const examLessonIds = Array.isArray(rawExamMode?.lessonIds)
    ? rawExamMode.lessonIds.filter((lessonId) => lessonIds.includes(lessonId))
    : [];
  const examAnswers = Array.isArray(rawExamMode?.answers)
    ? rawExamMode.answers
        .filter((entry) => entry && lessonIds.includes(entry.lessonId))
        .map((entry) => ({
          lessonId: entry.lessonId,
          selected: typeof entry.selected === "string" ? entry.selected : "",
          correctAnswer: typeof entry.correctAnswer === "string" ? entry.correctAnswer : "",
          isCorrect: Boolean(entry.isCorrect),
        }))
    : [];
  const rawExamSetup = value?.examSetup;

  return {
    activeTrack,
    studyMode,
    workMode,
    learningAreaFilter: normalizedLearningArea,
    filter,
    lessonSort,
    quickstartDismissed,
    practiceFamilyFilter: typeof value?.practiceFamilyFilter === "string" ? value.practiceFamilyFilter : "all",
    practiceTopicFilter,
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
    trackSessionLog: cleanTrackSessionLog(value?.trackSessionLog),
    challengeSuccessLog: cleanChallengeSuccessLog(value?.challengeSuccessLog, lessonIds),
    exerciseSuccessLog: cleanChallengeSuccessLog(value?.exerciseSuccessLog, lessonIds),
    exerciseFailureLog: cleanExerciseFailureLog(value?.exerciseFailureLog, lessonIds),
    streak: Number.isFinite(value?.streak) ? Math.max(0, value.streak) : 0,
    xp: Number.isFinite(value?.xp) ? Math.max(0, value.xp) : 0,
    examMode: {
      active: Boolean(rawExamMode?.active) && examLessonIds.length > 0,
      lessonIds: examLessonIds,
      currentIndex: Number.isFinite(rawExamMode?.currentIndex)
        ? Math.max(0, Math.min(rawExamMode.currentIndex, Math.max(0, examLessonIds.length - 1)))
        : 0,
      startedAt: Number.isFinite(rawExamMode?.startedAt) ? rawExamMode.startedAt : null,
      durationSeconds: Number.isFinite(rawExamMode?.durationSeconds) ? Math.max(0, rawExamMode.durationSeconds) : 0,
      answers: examAnswers,
      finishedAt: Number.isFinite(rawExamMode?.finishedAt) ? rawExamMode.finishedAt : null,
      reason: typeof rawExamMode?.reason === "string" ? rawExamMode.reason : "",
    },
    examSetup: {
      trackScope: ["active", "all", "java", "javascript"].includes(rawExamSetup?.trackScope)
        ? rawExamSetup.trackScope
        : defaultState.examSetup.trackScope,
      learningAreaScope: ["current", "all", "frontend", "backend"].includes(rawExamSetup?.learningAreaScope)
        ? rawExamSetup.learningAreaScope
        : defaultState.examSetup.learningAreaScope,
      levelScope: ["current", "all", "Cero", "Base", "Intermedio", "Avanzado"].includes(rawExamSetup?.levelScope)
        ? rawExamSetup.levelScope
        : defaultState.examSetup.levelScope,
    },
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

function cleanTrackSessionLog(value) {
  return {
    java: cleanDateArray(value?.java),
    javascript: cleanDateArray(value?.javascript),
  };
}

function cleanChallengeSuccessLog(value, validIds) {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => typeof item === "string")
    .filter((item) => {
      const [, lessonId] = item.split(":");
      return validIds.includes(lessonId);
    })
    .slice(0, 30);
}

function cleanExerciseFailureLog(value, validIds) {
  if (!value || typeof value !== "object") return {};

  return Object.fromEntries(
    Object.entries(value)
      .filter(([lessonId, entry]) => validIds.includes(lessonId) && entry && typeof entry === "object")
      .map(([lessonId, entry]) => {
        const tests = Object.fromEntries(
          Object.entries(entry.tests ?? {})
            .filter(([label, item]) => typeof label === "string" && item && typeof item === "object")
            .map(([label, item]) => [
              label,
              {
                count: sanitizeStruggleCount(item.count),
                source: typeof item.source === "string" ? item.source : "tests",
                lastAt: typeof item.lastAt === "string" ? item.lastAt : "",
              },
            ])
            .filter(([, item]) => item.count > 0),
        );

        const events = Array.isArray(entry.events)
          ? entry.events
              .filter((event) =>
                event &&
                typeof event === "object" &&
                typeof event.label === "string" &&
                typeof event.source === "string" &&
                typeof event.at === "string" &&
                Number.isFinite(Date.parse(event.at)),
              )
              .map((event) => ({
                label: event.label,
                source: event.source,
                at: event.at,
              }))
              .slice(-40)
          : [];

        return [lessonId, { tests, events }];
      })
      .filter(([, entry]) => Object.keys(entry.tests).length || entry.events.length),
  );
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
    trackSessionLog: {
      java: [],
      javascript: [],
    },
    challengeSuccessLog: [],
    exerciseSuccessLog: [],
    exerciseFailureLog: {},
    streak: 0,
    xp: 0,
  };
}

function recordExerciseFailures(lessonId, failedResults, source = "tests") {
  if (!lessonId || !Array.isArray(failedResults) || !failedResults.length) return;

  const current = state.exerciseFailureLog[lessonId] ?? {
    tests: {},
    events: [],
  };
  const now = new Date().toISOString();
  const nextTests = { ...(current.tests ?? {}) };
  const nextEvents = [...(current.events ?? [])];

  failedResults.forEach((result) => {
    if (!result?.label) return;

    const currentEntry = nextTests[result.label] ?? {
      count: 0,
      source,
      lastAt: "",
    };

    nextTests[result.label] = {
      count: sanitizeStruggleCount(currentEntry.count) + 1,
      source,
      lastAt: now,
    };
    nextEvents.push({
      label: result.label,
      source,
      at: now,
    });
  });

  state.exerciseFailureLog[lessonId] = {
    tests: nextTests,
    events: nextEvents.slice(-40),
  };
}

function clearExerciseFailureLog(lessonId) {
  if (!lessonId || !state.exerciseFailureLog[lessonId]) return;
  delete state.exerciseFailureLog[lessonId];
}

function getPracticeBankEntries(trackId) {
  if (!trackId || trackId === "all") {
    return [...getPracticeBankEntries("java"), ...getPracticeBankEntries("javascript")]
      .sort((left, right) =>
        left.trackLabel.localeCompare(right.trackLabel) ||
        left.family.localeCompare(right.family) ||
        left.title.localeCompare(right.title),
      );
  }

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
          learningArea: getLessonLearningArea(lessonId),
          family: exercise.family ?? "Práctica",
          difficulty: exercise.difficulty ?? lesson.level,
          progressState: getPracticeProgressState(lessonId, "javascript"),
          practiceType: exercise.practiceType ?? "Práctica",
          title: lesson.title,
          summary: exercise.prompt,
          topics: [],
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
      .map((entry) => ({
        ...entry,
        topics: getPracticeTopics(entry),
      }))
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
        learningArea: getLessonLearningArea(lessonId),
        family: guideEntry.family ?? "Problema",
        difficulty: guideEntry.difficulty ?? lesson.level,
        progressState: getPracticeProgressState(lessonId, "java"),
        practiceType: guideEntry.practiceType ?? "Consola",
        title: lesson.title,
        summary: guideEntry.prompt,
        topics: [],
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
    .map((entry) => ({
      ...entry,
      topics: getPracticeTopics(entry),
    }))
    .sort((left, right) => left.family.localeCompare(right.family) || left.title.localeCompare(right.title));
}

function getPracticeTopicStats(entries) {
  const grouped = new Map();

  entries.forEach((entry) => {
    entry.topics.forEach((topic) => {
      if (!grouped.has(topic)) {
        grouped.set(topic, {
          topic,
          total: 0,
          done: 0,
          started: 0,
        });
      }

      const current = grouped.get(topic);
      current.total += 1;
      if (entry.progressState.key === "done") {
        current.done += 1;
      } else if (entry.progressState.key === "started") {
        current.started += 1;
      } else {
        current.newCount = (current.newCount ?? 0) + 1;
      }
    });
  });

  const sorted = [...grouped.values()]
    .map((item) => ({
      ...item,
      pending: item.total - item.done,
      percent: item.total ? Math.round((item.done / item.total) * 100) : 0,
      debtScore: (item.newCount ?? 0) * 2 + item.started,
    }))
    .sort((left, right) => right.debtScore - left.debtScore || right.total - left.total || left.topic.localeCompare(right.topic));

  const priorityTopic = sorted.find((item) => item.debtScore > 0)?.topic ?? "";

  return sorted.map((item) => ({
    ...item,
    isPriority: item.topic === priorityTopic,
  }));
}

function getPriorityPracticeTopic(entries) {
  return getPracticeTopicStats(entries).find((item) => item.isPriority) ?? null;
}

function getPracticeFailureSignal(entry) {
  if (!entry || entry.trackId !== "javascript" || entry.isDone) return null;

  const failureSummary = getExerciseFailureSummary(entry.lessonId);
  if (!failureSummary?.topLabel) return null;

  return {
    label: failureSummary.topLabel,
    weight: failureSummary.topWeightedCount ?? 0,
  };
}

function getPracticeSpotlightEntry(entries) {
  const actionableEntries = entries.filter((entry) => !entry.isDone);
  if (!actionableEntries.length) return entries[0] ?? null;

  return sortPracticeEntriesByPriority(actionableEntries)[0] ?? null;
}

function getPracticeEntryPriority(entry) {
  const signal = getLessonPrioritySignal(entry?.lessonId);
  return {
    failureWeight: signal.failureWeight,
    impactScore: signal.impactScore,
    isStarted: signal.isStarted,
    isDone: Number(Boolean(entry?.isDone)),
  };
}

function sortPracticeEntriesByPriority(entries) {
  return [...entries].sort((left, right) => {
    const leftPriority = getPracticeEntryPriority(left);
    const rightPriority = getPracticeEntryPriority(right);
    return rightPriority.failureWeight - leftPriority.failureWeight ||
      rightPriority.isStarted - leftPriority.isStarted ||
      rightPriority.impactScore - leftPriority.impactScore ||
      left.title.localeCompare(right.title);
  });
}

function getPracticeRouteReason(stepKey, entry, primaryEntry) {
  if (!entry) return "";

  if (stepKey === "main") {
    return getPracticeSpotlightReason(entry);
  }

  if (stepKey === "consolidation") {
    if (primaryEntry?.hasEvolution && !primaryEntry.evolutionBaseCovered && entry.lessonId === primaryEntry.evolutionBaseLessonId) {
      return `Te conviene cubrir antes la base: ${entry.title}. Así la práctica principal deja de apoyarse en una pieza todavía floja.`;
    }

    if (primaryEntry && entry.topics.some((topic) => primaryEntry.topics.includes(topic))) {
      return "Consolida el mismo frente técnico para no cortar el hilo justo después de la práctica principal.";
    }

    if (primaryEntry && entry.family === primaryEntry.family) {
      return "Mantiene la misma familia de trabajo y ayuda a fijar patrón antes de cambiar de contexto.";
    }

    if (entry.progressState.key === "started") {
      return "Ya la tienes empezada. Sirve para consolidar cerrando una pieza abierta antes de saltar a otra.";
    }

    return "Es la mejor pieza de continuidad después del primer paso dentro del filtro activo.";
  }

  if (entry.progressState.key === "started") {
    return "Buen cierre para la sesión: rematas una pieza abierta y reduces deuda real de práctica.";
  }

  if (entry.isDone) {
    return "Sirve como repaso corto al final para comprobar si el patrón ya queda más estable.";
  }

  const failureSignal = getPracticeFailureSignal(entry);
  if (failureSignal) {
    return `Buen cierre si quieres volver sobre el bloqueo "${failureSignal.label}" con una pieza todavía pendiente.`;
  }

  return "Cierra la ruta con una práctica breve de contraste para no quedarte solo en el primer caso.";
}

function getPracticeSuggestedPath(entries) {
  if (!entries.length) return [];

  const ranked = sortPracticeEntriesByPriority(entries);
  const actionable = ranked.filter((entry) => !entry.isDone);
  const doneEntries = ranked.filter((entry) => entry.isDone);
  const primary = actionable[0] ?? ranked[0] ?? null;
  if (!primary) return [];

  const used = new Set([primary.lessonId]);
  const steps = [
    {
      key: "main",
      label: "Práctica principal",
      entry: primary,
      reason: getPracticeRouteReason("main", primary, primary),
    },
  ];

  const consolidationCandidates = ranked
    .filter((entry) => !used.has(entry.lessonId))
    .map((entry) => {
      let score = 0;
      if (primary.hasEvolution && !primary.evolutionBaseCovered && entry.lessonId === primary.evolutionBaseLessonId) {
        score += 8;
      }
      if (entry.topics.some((topic) => primary.topics.includes(topic))) score += 5;
      if (entry.family === primary.family) score += 4;
      if (entry.progressState.key === "started") score += 3;
      if (!entry.isDone) score += 2;
      if (entry.trackId === primary.trackId) score += 1;
      return { entry, score };
    })
    .sort((left, right) => right.score - left.score || left.entry.title.localeCompare(right.entry.title));

  const consolidation = consolidationCandidates[0]?.entry ?? null;
  if (consolidation) {
    used.add(consolidation.lessonId);
    steps.push({
      key: "consolidation",
      label: "Consolidación",
      entry: consolidation,
      reason: getPracticeRouteReason("consolidation", consolidation, primary),
    });
  }

  const closureCandidates = ranked
    .filter((entry) => !used.has(entry.lessonId))
    .map((entry) => {
      const failureSignal = getPracticeFailureSignal(entry);
      let score = 0;
      if (entry.progressState.key === "started") score += 6;
      if (failureSignal) score += 4 + failureSignal.weight;
      if (entry.isDone) score += 3;
      if (entry.topics.some((topic) => primary.topics.includes(topic))) score += 2;
      if (entry.family === primary.family) score += 1;
      return { entry, score };
    })
    .sort((left, right) => right.score - left.score || left.entry.title.localeCompare(right.entry.title));

  const closure = closureCandidates[0]?.entry ?? null;
  if (closure) {
    steps.push({
      key: "closure",
      label: closure.isDone ? "Repaso de cierre" : "Cierre útil",
      entry: closure,
      reason: getPracticeRouteReason("closure", closure, primary),
    });
  }

  return steps;
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
  const failureSignal = getPracticeFailureSignal(entry);
  if (failureSignal) {
    return `Ahora mismo esta práctica concentra un fallo repetido: "${failureSignal.label}". Cerrarla tiene más retorno que abrir una pieza nueva.`;
  }

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
