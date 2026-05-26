const STORAGE_KEY = "solo-learn-progress-v2";
const LEGACY_STORAGE_KEY = "solo-learn-progress-v1";
const { tracks, lessonDetails, studyPlan, exercises, javaPracticeGuides, projectBriefs, evolutionBriefs, evolutionCases, appBlueprint } = window.LEARNING_DATA;

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
  notes: {},
  quickstartDismissed: false,
  dailyQueueLog: {},
  completedDailySessions: [],
  lastStudyDate: null,
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
  reviewBox: document.querySelector("#reviewBox"),
  activeTrack: document.querySelector("#activeTrack"),
  focusModeButton: document.querySelector("#focusModeButton"),
  tabs: document.querySelectorAll(".language-tabs__button"),
  filters: document.querySelectorAll(".level-filters__button"),
  trackLabel: document.querySelector("#trackLabel"),
  trackTitle: document.querySelector("#trackTitle"),
  trackSummary: document.querySelector(".section-heading__text"),
  lessonSort: document.querySelector("#lessonSort"),
  lessonGrid: document.querySelector("#lessonGrid"),
  planGrid: document.querySelector("#planGrid"),
  studyLevel: document.querySelector("#studyLevel"),
  studyTitle: document.querySelector("#studyTitle"),
  studyTheory: document.querySelector("#studyTheory"),
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
  studyProject: document.querySelector("#studyProject"),
  studyProjectSummary: document.querySelector("#studyProjectSummary"),
  studyProjectOutcome: document.querySelector("#studyProjectOutcome"),
  studyProjectMilestones: document.querySelector("#studyProjectMilestones"),
  studyProjectDeliverables: document.querySelector("#studyProjectDeliverables"),
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
let brandTapCount = 0;
let brandTapTimer = null;

render();

elements.quickstart.addEventListener("click", (event) => {
  const button = event.target.closest("[data-dismiss-quickstart]");
  if (!button) return;
  state.quickstartDismissed = true;
  persist();
  render();
});

elements.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Al cambiar de track actualizamos state y después repintamos la interfaz.
    state.activeTrack = tab.dataset.track;
    state.activeLessonId = firstVisibleLesson()?.id ?? tracks[state.activeTrack].lessons[0].id;
    persist();
    render();
  });
});

elements.filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    state.filter = filter.dataset.filter;
    state.activeLessonId = firstVisibleLesson()?.id ?? tracks[state.activeTrack].lessons[0].id;
    persist();
    render();
  });
});

elements.lessonSort.addEventListener("change", () => {
  state.lessonSort = ["default", "impact"].includes(elements.lessonSort.value)
    ? elements.lessonSort.value
    : "default";
  persist();
  render();
});

elements.practiceFamilyFilter.addEventListener("change", () => {
  state.practiceFamilyFilter = elements.practiceFamilyFilter.value || "all";
  persist();
  render();
});

elements.practiceDifficultyFilter.addEventListener("change", () => {
  state.practiceDifficultyFilter = elements.practiceDifficultyFilter.value || "all";
  persist();
  render();
});

elements.practiceTypeFilter.addEventListener("change", () => {
  state.practiceTypeFilter = elements.practiceTypeFilter.value || "all";
  persist();
  render();
});

elements.practiceStatusFilter.addEventListener("change", () => {
  state.practiceStatusFilter = ["all", "pending", "done"].includes(elements.practiceStatusFilter.value)
    ? elements.practiceStatusFilter.value
    : "all";
  persist();
  render();
});

elements.practiceEvolutionFilter.addEventListener("change", () => {
  state.practiceEvolutionFilter = ["all", "evolves", "standalone"].includes(elements.practiceEvolutionFilter.value)
    ? elements.practiceEvolutionFilter.value
    : "all";
  persist();
  render();
});

elements.practicePhaseFilter.addEventListener("change", () => {
  state.practicePhaseFilter = elements.practicePhaseFilter.value || "all";
  persist();
  render();
});

elements.practiceSort.addEventListener("change", () => {
  state.practiceSort = ["pending", "impact", "difficulty", "family"].includes(elements.practiceSort.value)
    ? elements.practiceSort.value
    : "pending";
  persist();
  render();
});

elements.practiceResetFilters.addEventListener("click", () => {
  state.practiceFamilyFilter = "all";
  state.practiceDifficultyFilter = "all";
  state.practiceTypeFilter = "all";
  state.practiceStatusFilter = "all";
  state.practiceEvolutionFilter = "all";
  state.practicePhaseFilter = "all";
  state.practiceSort = "pending";
  persist();
  render();
});

elements.studyEvolutionJump.addEventListener("click", () => {
  const lessonId = elements.studyEvolutionJump.dataset.lessonBase;
  if (!lessonId) return;
  saveCurrentNotes();
  openLesson(lessonId);
  persist();
  render();
  document.querySelector(".study").scrollIntoView({ behavior: "smooth" });
});

elements.studyEvolutionCaseLoad.addEventListener("click", () => {
  const lessonId = elements.studyEvolutionCaseLoad.dataset.caseLesson;
  const evolutionCase = evolutionCases[lessonId];
  if (!lessonId || !evolutionCase?.canLoadRunner) return;
  elements.jsRunnerInput.value = evolutionCase.starter;
  elements.jsRunnerOutput.textContent = "Caso evolutivo cargado. Completa la transformación y ejecuta o adapta el código.";
  document.querySelector(".runner").scrollIntoView({ behavior: "smooth" });
});

elements.focusModeButton.addEventListener("click", () => {
  // classList.toggle es una forma muy común de encender/apagar modos visuales.
  document.body.classList.toggle("focus-mode");
  const isFocusMode = document.body.classList.contains("focus-mode");
  elements.focusModeButton.textContent = isFocusMode ? "Salir" : "Enfoque";
  elements.focusModeButton.setAttribute("aria-pressed", String(isFocusMode));
});

elements.lessonGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  saveCurrentNotes();
  openLesson(button.dataset.lessonId);

  if (button.dataset.action === "complete") {
    completeLesson(findLesson(button.dataset.lessonId));
    recordStudyDay();
  }

  persist();
  render();
});

elements.planGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  saveCurrentNotes();
  openLesson(button.dataset.lessonId);
  persist();
  render();
  document.querySelector(".study").scrollIntoView({ behavior: "smooth" });
});

elements.nextSession.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  saveCurrentNotes();
  openLesson(button.dataset.lessonId);
  persist();
  render();
  if (button.dataset.target === "practice") {
    loadActiveExercise();
    document.querySelector(".runner").scrollIntoView({ behavior: "smooth" });
    return;
  }
  document.querySelector(".study").scrollIntoView({ behavior: "smooth" });
});

elements.dailyQueue.addEventListener("click", (event) => {
  const doneButton = event.target.closest("[data-daily-done]");
  if (doneButton) {
    markDailyQueueItemDone(doneButton.dataset.dailyDone);
    persist();
    render();
    return;
  }

  const button = event.target.closest("button");
  if (!button) return;

  saveCurrentNotes();
  openLesson(button.dataset.lessonId);
  persist();
  render();

  if (button.dataset.target === "practice") {
    loadActiveExercise();
    document.querySelector(".runner").scrollIntoView({ behavior: "smooth" });
    return;
  }

  document.querySelector(".study").scrollIntoView({ behavior: "smooth" });
});

elements.reviewBox.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  saveCurrentNotes();
  openLesson(button.dataset.lessonId);
  persist();
  render();
  document.querySelector(".challenge").scrollIntoView({ behavior: "smooth" });
});

elements.markReadButton.addEventListener("click", () => {
  addProgressOnce("readLessons", state.activeLessonId, 10);
  recordStudyDay();
  persist();
  render();
});

elements.markPracticeButton.addEventListener("click", () => {
  addProgressOnce("practiceDone", state.activeLessonId, 20);
  recordStudyDay();
  persist();
  render();
});

elements.finishLessonButton.addEventListener("click", () => {
  completeLesson(findLesson(state.activeLessonId));
  recordStudyDay();
  persist();
  render();
});

elements.saveNotesButton.addEventListener("click", () => {
  saveCurrentNotes();
  recordStudyDay();
  persist();
  elements.saveNotesButton.textContent = "Notas guardadas";
  window.setTimeout(() => {
    elements.saveNotesButton.textContent = "Guardar notas";
  }, 1200);
});

elements.studyNotes.addEventListener("blur", () => {
  saveCurrentNotes();
  persist();
});

elements.challengeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const lesson = findLesson(state.activeLessonId);
  const selected = new FormData(elements.challengeForm).get("answer");

  if (!selected) {
    setFeedback("Elige una respuesta.", "wrong");
    return;
  }

  if (selected === lesson.challenge.answer) {
    if (!state.solvedChallenges.includes(lesson.id)) {
      state.solvedChallenges.push(lesson.id);
      state.xp += 25;
      recordStudyDay();
    }
    state.failedChallenges = state.failedChallenges.filter((lessonId) => lessonId !== lesson.id);
    setFeedback("Correcto. Has desbloqueado XP extra.", "correct");
  } else {
    if (!state.failedChallenges.includes(lesson.id)) {
      state.failedChallenges.push(lesson.id);
    }
    setFeedback("No es esa. Revisa el objetivo de la lección y vuelve a probar.", "wrong");
  }

  persist();
  render();
});

elements.continueButton.addEventListener("click", () => {
  const nextLesson = allLessons().find((lesson) => !state.completed.includes(lesson.id));
  if (!nextLesson) return;

  openLesson(nextLesson.id);
  state.filter = "all";
  persist();
  render();
  document.querySelector(".dashboard").scrollIntoView({ behavior: "smooth" });
});

elements.resetButton.addEventListener("click", () => {
  const shouldReset = window.confirm("¿Quieres borrar todo el progreso guardado?");
  if (!shouldReset) return;

  state = createDefaultState();
  persist();
  render();
});

elements.exportButton.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "solo-learn-progress.json";
  link.click();
  URL.revokeObjectURL(url);
  setStorageStatus("Progreso exportado.");
});

elements.importInput.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;

  try {
    const imported = JSON.parse(await file.text());
    state = normalizeState(imported);
    persist();
    render();
    setStorageStatus("Progreso importado.");
  } catch {
    setStorageStatus("El archivo no contiene un progreso válido.");
  } finally {
    elements.importInput.value = "";
  }
});

elements.runJsButton.addEventListener("click", () => {
  runJavaScriptPractice();
});

elements.loadPracticeButton.addEventListener("click", () => {
  loadActivePractice();
});

elements.loadExerciseButton.addEventListener("click", () => {
  loadActiveExercise();
});

elements.renderPreviewButton.addEventListener("click", () => {
  renderDomPreviewForActiveLesson();
});

elements.evaluateExerciseButton.addEventListener("click", () => {
  evaluateActiveExercise();
});

elements.clearRunnerButton.addEventListener("click", () => {
  elements.jsRunnerOutput.textContent = "Salida limpia.";
  elements.exerciseResultsPanel.hidden = true;
});

elements.brandTrigger.addEventListener("click", (event) => {
  brandTapCount += 1;
  if (brandTapTimer) {
    window.clearTimeout(brandTapTimer);
  }

  brandTapTimer = window.setTimeout(() => {
    brandTapCount = 0;
  }, 1200);

  if (brandTapCount >= 5) {
    event.preventDefault();
    brandTapCount = 0;
    toggleBlueprintPanel(true);
  }
});

elements.closeBlueprintButton.addEventListener("click", () => {
  toggleBlueprintPanel(false);
});

document.addEventListener("keydown", (event) => {
  if (event.altKey && event.key.toLowerCase() === "j") {
    event.preventDefault();
    toggleBlueprintPanel();
  }

  if (event.key === "Escape" && !elements.blueprintPanel.hidden) {
    toggleBlueprintPanel(false);
  }
});

function render() {
  const track = tracks[state.activeTrack];
  const completedCount = state.completed.length;
  const totalLessons = allLessons().length;
  const progress = Math.round((completedCount / totalLessons) * 100);

  elements.xpValue.textContent = state.xp;
  elements.levelValue.textContent = Math.floor(state.xp / 180) + 1;
  elements.completedValue.textContent = completedCount;
  elements.streakValue.textContent = state.streak;
  elements.progressText.textContent = `${progress}%`;
  elements.progressBar.style.width = `${progress}%`;
  renderTrackProgress();
  renderQuickstart();
  renderNextSession();
  renderDailyQueue();
  renderReviewBox();

  elements.tabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.track === state.activeTrack);
  });
  elements.filters.forEach((filter) => {
    filter.classList.toggle("is-active", filter.dataset.filter === state.filter);
  });
  elements.lessonSort.value = state.lessonSort;

  elements.trackLabel.textContent = track.label;
  elements.trackLabel.className = `eyebrow language-mark language-mark--${state.activeTrack}`;
  elements.trackTitle.textContent = track.title;
  elements.trackSummary.textContent = track.summary;
  renderActiveTrack(track);

  renderPlan();
  renderLessons();
  renderStudyPanel();
  renderChallenge();
  renderAchievements();
  renderPracticeBank();
  // Esta llamada alimenta el easter egg que explica cómo se relaciona app.js
  // con la ruta de aprendizaje de JavaScript.
  renderBlueprint();
}

function renderActiveTrack(track) {
  elements.activeTrack.innerHTML = `
    <p class="eyebrow">Ruta activa</p>
    <strong class="language-mark language-mark--${state.activeTrack}">${track.label}</strong>
    <span>${track.title}</span>
  `;
}

function renderTrackProgress() {
  elements.trackProgress.innerHTML = Object.entries(tracks)
    .map(([trackId, track]) => {
      const completed = countCompletedByTrack(state, trackId);
      const total = track.lessons.length;
      const progress = Math.round((completed / total) * 100);

      return `
        <div class="track-progress-row">
          <div>
            <span>${track.label}</span>
            <strong>${completed}/${total}</strong>
          </div>
          <div class="mini-progress"><span style="width: ${progress}%"></span></div>
        </div>
      `;
    })
    .join("");
}

function renderQuickstart() {
  if (state.quickstartDismissed) {
    elements.quickstart.innerHTML = "";
    return;
  }

  const guide = getQuickstartGuide();
  elements.quickstart.innerHTML = `
    <p class="eyebrow">${escapeHtml(guide.eyebrow)}</p>
    <h3>${escapeHtml(guide.title)}</h3>
    <p>${escapeHtml(guide.summary)}</p>
    <ol class="quickstart__list">
      ${guide.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
    </ol>
    <button type="button" data-dismiss-quickstart="true">Entendido</button>
  `;
}

function getQuickstartGuide() {
  const hasCompleted = state.completed.length > 0;
  const hasPractice = state.practiceDone.length > 0 || state.solvedExercises.length > 0;
  const hasEvolutionWork = Object.keys(evolutionBriefs).some((lessonId) => {
    const evolution = evolutionBriefs[lessonId];
    return isLessonCovered(evolution.fromLessonId) || isLessonCovered(lessonId);
  });

  if (!hasCompleted && !hasPractice) {
    return {
      eyebrow: "Como usar Solo Learn",
      title: "Empieza simple",
      summary: "La idea es avanzar por una lección pequeña cada vez, no intentar abarcar toda la app de golpe.",
      steps: [
        "Elige Java o JavaScript y filtra por nivel si lo necesitas.",
        "Abre una lección y recorre teoría, práctica, reto y, si existe, tests.",
        "Usa Siguiente sesión y Plan de hoy para no perder tiempo decidiendo por dónde empezar.",
        "En JavaScript, carga ejercicios en el laboratorio; en Java, usa problemas guiados y mini proyectos.",
      ],
    };
  }

  if (hasEvolutionWork) {
    return {
      eyebrow: "Como seguir",
      title: "Ya puedes trabajar por progresión",
      summary: "La app ya no solo te sirve para abrir teoría: ahora puede encadenar base previa, escalada y práctica avanzada.",
      steps: [
        "Mira si Siguiente sesión o Plan de hoy te mandan a Base previa o Escalada.",
        "Si una práctica dice Escala después, puedes abrir su base desde el banco o desde la lección activa.",
        "Prioriza cerrar la base antes de intentar la versión avanzada del mismo problema.",
        "Usa el banco de práctica para filtrar solo ejercicios evolutivos si quieres trabajar esa capa.",
      ],
    };
  }

  return {
    eyebrow: "Como seguir",
    title: "Convierte avance en soltura",
    summary: "Ya has empezado a usar la app. Ahora conviene combinar teoría nueva con práctica cerrada y algo de repaso.",
    steps: [
      "Usa el Plan de hoy para decidir si toca desbloqueo, tests o repaso.",
      "Cuando una lección tenga ejercicio evaluable, intenta validarlo antes de darla por cerrada.",
      "En Java, apóyate en problemas guiados y mini proyectos para pasar de sintaxis a diseño.",
      "Usa notas personales para registrar dudas o errores que no quieres repetir.",
    ],
  };
}

function renderNextSession() {
  const recommendation = recommendNextSession();
  if (!recommendation) {
    elements.nextSession.innerHTML = `
      <p class="eyebrow">Siguiente sesión</p>
      <h3>Ruta completada</h3>
      <p>Repite retos fallados o empieza un proyecto propio.</p>
    `;
    return;
  }

  const nextLesson = recommendation.lesson;
  const track = tracks[getTrackIdByLesson(nextLesson.id)];
  elements.nextSession.innerHTML = `
    <p class="eyebrow">Siguiente sesión</p>
    <h3>${nextLesson.title}</h3>
    <p>${track.label} · ${nextLesson.level} · ${nextLesson.xp} XP</p>
    <p><strong>${recommendation.kind}:</strong> ${escapeHtml(recommendation.reason)}</p>
    <button type="button" data-lesson-id="${nextLesson.id}" data-target="${recommendation.target}">${recommendation.target === "practice" ? "Abrir práctica" : "Abrir lección"}</button>
  `;
}

function renderReviewBox() {
  const pending = state.failedChallenges.filter((lessonId) => !state.solvedChallenges.includes(lessonId));
  if (!pending.length) {
    elements.reviewBox.innerHTML = `
      <p class="eyebrow">Repaso</p>
      <h3>Sin errores pendientes</h3>
      <p>Cuando falles un reto aparecerá aquí.</p>
    `;
    return;
  }

  elements.reviewBox.innerHTML = `
    <p class="eyebrow">Repaso pendiente</p>
    <h3>${pending.length} ${pending.length === 1 ? "reto" : "retos"} por revisar</h3>
    ${pending
      .slice(0, 3)
      .map((lessonId) => {
        const lesson = findLesson(lessonId);
        return `<button type="button" data-lesson-id="${lesson.id}">${lesson.title}</button>`;
      })
      .join("")}
  `;
}

function renderDailyQueue() {
  const queue = buildDailyQueue();
  const todayKey = getTodayKey();
  const doneToday = state.dailyQueueLog[todayKey] ?? [];
  const sessionCompletedToday = state.completedDailySessions.includes(todayKey);
  const sessionProfile = getDailySessionProfile(queue);
  const saturation = getDailySaturationState(
    allLessons()
      .filter((lesson) => exercises[lesson.id] && !state.solvedExercises.includes(lesson.id))
      .filter((lesson) => state.readLessons.includes(lesson.id) || state.practiceDone.includes(lesson.id)),
    state.failedChallenges
      .filter((lessonId) => !state.solvedChallenges.includes(lessonId))
      .map((lessonId) => findLesson(lessonId))
      .filter(Boolean),
  );
  if (!queue.length) {
    elements.dailyQueue.innerHTML = `
      <p class="eyebrow">Plan de hoy</p>
      <h3>Sesión libre</h3>
      <p>Hoy no hay bloqueos críticos. Puedes avanzar por la ruta o repetir práctica.</p>
    `;
    return;
  }

  elements.dailyQueue.innerHTML = `
    <p class="eyebrow">Plan de hoy</p>
    <h3>${queue.length} ${queue.length === 1 ? "paso recomendado" : "pasos recomendados"}</h3>
    <p><strong>${sessionProfile.label}:</strong> ${sessionProfile.description}</p>
    ${renderSaturationNotice(saturation)}
    <p>${doneToday.length}/${queue.length} pasos marcados hoy</p>
    ${doneToday.length >= queue.length ? `<p>${sessionCompletedToday ? "Sesion de hoy cerrada." : "Sesion lista para cerrar."}</p>` : ""}
    ${queue
      .map((item) => {
        const itemKey = dailyQueueItemKey(item);
        const isDone = doneToday.includes(itemKey);
        return `
          <div class="daily-queue__item">
            <button type="button" data-lesson-id="${item.lesson.id}" data-target="${item.target}">
              <span class="daily-queue__kind">${item.kind}</span>
              ${item.lesson.title}
              <small>${item.reason}</small>
            </button>
            <div class="daily-queue__actions">
              <span class="daily-queue__state">${isDone ? "Hecho hoy" : "Pendiente hoy"}</span>
              <button class="daily-queue__done" type="button" data-daily-done="${itemKey}">${isDone ? "Marcado" : "Marcar"}</button>
            </div>
          </div>
        `;
      })
      .join("")}
    ${renderDailySessionFooter(queue.length, doneToday.length, sessionCompletedToday)}
  `;
}

function renderPlan() {
  elements.planGrid.innerHTML = studyPlan
    .map((phase) => {
      const completedInPhase = phase.lessonIds.filter((lessonId) => state.completed.includes(lessonId));
      const progress = Math.round((completedInPhase.length / phase.lessonIds.length) * 100);

      return `
        <article class="roadmap-card">
          <div class="roadmap-card__top">
            <span class="badge">${phase.dates}</span>
            <strong>${progress}%</strong>
          </div>
          <h3 class="roadmap-card__title">${phase.title}</h3>
          <p class="roadmap-card__text">${phase.goal}</p>
          <ul class="roadmap-card__list">
            ${phase.lessonIds
              .map((lessonId) => {
                const lesson = findLesson(lessonId);
                const completed = state.completed.includes(lessonId);
                return `
                  <li>
                    <button class="roadmap-card__button" type="button" data-lesson-id="${lessonId}">
                      <span class="roadmap-card__status">${completed ? "Hecha" : "Abrir"}</span>
                      ${lesson.title}
                    </button>
                  </li>
                `;
              })
              .join("")}
          </ul>
        </article>
      `;
    })
    .join("");
}

function renderLessons() {
  const lessons = sortVisibleLessons(visibleLessons());
  const track = tracks[state.activeTrack];

  elements.lessonGrid.innerHTML = lessons
    .map((lesson) => {
      // Cada tarjeta se genera a partir de datos.
      // Aquí se ve muy claro el patrón "array -> map -> HTML".
      const isCompleted = state.completed.includes(lesson.id);
      const isActive = state.activeLessonId === lesson.id;
      const hasRead = state.readLessons.includes(lesson.id);
      const hasPracticed = state.practiceDone.includes(lesson.id);
      const recommendation = scoreLessonRecommendation(lesson);
      const impactLabel = recommendation.score >= 8 ? "Impacto alto" : recommendation.score >= 4 ? "Impacto medio" : "Impacto puntual";
      return `
        <article class="lesson-card ${isCompleted ? "is-completed" : ""} ${isActive ? "is-active" : ""}">
          <div class="lesson-card__meta">
            <span class="language-mark language-mark--${state.activeTrack}">${track.label}</span>
            <span class="badge">${lesson.level}</span>
            <span class="badge">${lesson.xp} XP</span>
            ${state.lessonSort === "impact" ? `<span class="badge">${impactLabel}</span>` : ""}
          </div>
          <h3 class="lesson-card__title">${lesson.title}</h3>
          <p class="lesson-card__status">${lessonStatusText(isCompleted, hasRead, hasPracticed, isActive)}</p>
          ${
            state.lessonSort === "impact" && !isCompleted
              ? `<p class="lesson-card__impact">${escapeHtml(recommendation.reason)}</p>`
              : ""
          }
          <ul class="lesson-card__goals">
            ${lesson.goals.map((goal) => `<li>${escapeHtml(goal)}</li>`).join("")}
          </ul>
          <div class="lesson-card__actions">
            <button class="lesson-card__button" type="button" data-action="select" data-lesson-id="${lesson.id}">Abrir</button>
            <button class="lesson-card__button" type="button" data-action="complete" data-lesson-id="${lesson.id}" ${
              isCompleted ? "disabled" : ""
            }>${isCompleted ? "Hecha" : "Completar"}</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderStudyPanel() {
  const lesson = findLesson(state.activeLessonId) ?? visibleLessons()[0];
  if (!lesson) return;

  const details = lessonDetails[lesson.id];
  const exercise = exercises[lesson.id];
  const guidedProblem = javaPracticeGuides[lesson.id];
  const projectBrief = projectBriefs[lesson.id];
  const evolutionBrief = evolutionBriefs[lesson.id];
  const evolutionCase = evolutionCases[lesson.id];
  const isRead = state.readLessons.includes(lesson.id);
  const isPracticed = state.practiceDone.includes(lesson.id);
  const isCompleted = state.completed.includes(lesson.id);
  const isExerciseSolved = state.solvedExercises.includes(lesson.id);
  const hasDomExercise = exercise?.mode === "dom";

  elements.studyLevel.textContent = `${tracks[getTrackIdByLesson(lesson.id)].label} · ${lesson.level}`;
  elements.studyLevel.className = `eyebrow language-mark language-mark--${getTrackIdByLesson(lesson.id)}`;
  elements.studyTitle.textContent = lesson.title;
  elements.studyTheory.textContent = details.theory;
  elements.studySteps.innerHTML = details.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("");
  elements.studyLanguage.textContent = tracks[getTrackIdByLesson(lesson.id)].label;
  elements.studyExample.textContent = details.example;
  elements.studyPractice.textContent = details.practice;
  elements.studyNotes.value = state.notes[lesson.id] ?? "";
  elements.loadPracticeButton.disabled = getTrackIdByLesson(lesson.id) !== "javascript";
  elements.loadExerciseButton.disabled = getTrackIdByLesson(lesson.id) !== "javascript" || !exercise;
  elements.evaluateExerciseButton.disabled = getTrackIdByLesson(lesson.id) !== "javascript" || !exercise;
  elements.renderPreviewButton.disabled = !hasDomExercise;
  elements.runnerHtmlPanel.hidden = !hasDomExercise;
  elements.runnerPreviewPanel.hidden = !hasDomExercise;
  if (hasDomExercise && !elements.jsRunnerHtml.value.trim()) {
    elements.jsRunnerHtml.value = exercise.starterHtml ?? "";
  }
  renderStudyProgress(lesson);
  renderStudyExercise(lesson, exercise, isExerciseSolved);
  renderGuidedProblem(guidedProblem);
  renderProjectBrief(projectBrief);
  renderEvolutionBrief(evolutionBrief);
  renderEvolutionCase(evolutionCase, lesson.id);

  elements.markReadButton.textContent = isRead ? "Teoría leída" : "Marcar teoría";
  elements.markReadButton.disabled = isRead;
  elements.markPracticeButton.textContent = isPracticed ? "Práctica hecha" : "Marcar práctica";
  elements.markPracticeButton.disabled = isPracticed;
  elements.finishLessonButton.textContent = isCompleted ? "Lección finalizada" : "Finalizar lección";
  elements.finishLessonButton.disabled = isCompleted;
}

function renderStudyProgress(lesson) {
  // Construimos los pasos como datos primero y luego los pintamos.
  // Esto hace más fácil añadir o quitar pasos sin tocar demasiado HTML.
  const steps = [
    {
      label: "Teoría",
      title: "Lee la explicación",
      done: state.readLessons.includes(lesson.id),
    },
    {
      label: "Práctica",
      title: "Haz el ejercicio",
      done: state.practiceDone.includes(lesson.id),
    },
    {
      label: "Reto",
      title: "Resuelve el quiz",
      done: state.solvedChallenges.includes(lesson.id),
    },
    ...(exercises[lesson.id]
      ? [
          {
            label: "Tests",
            title: "Valida tu solución",
            done: state.solvedExercises.includes(lesson.id),
          },
        ]
      : []),
    {
      label: "Cierre",
      title: "Finaliza lección",
      done: state.completed.includes(lesson.id),
    },
  ];
  const currentIndex = steps.findIndex((step) => !step.done);

  elements.studyProgress.innerHTML = steps
    .map((step, index) => {
      const statusClass = step.done ? "is-done" : index === currentIndex ? "is-current" : "";
      return `
        <div class="study__progress-step ${statusClass}">
          <span>${step.label}</span>
          <strong>${step.done ? "Completado" : step.title}</strong>
        </div>
      `;
    })
    .join("");
}

function renderStudyExercise(lesson, exercise, isSolved) {
  if (!exercise) {
    elements.studyExercise.hidden = true;
    elements.studyExercisePrompt.textContent = "";
    elements.studyExerciseChecklist.innerHTML = "";
    elements.studyExerciseStatus.textContent = "";
    return;
  }

  elements.studyExercise.hidden = false;
  elements.studyExercisePrompt.textContent = exercise.prompt;
  elements.studyExerciseChecklist.innerHTML = exercise.checklist
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  elements.studyExerciseStatus.textContent = isSolved ? "Superado" : "Pendiente";
}

function renderGuidedProblem(problem) {
  if (!problem) {
    elements.studyGuidedProblem.hidden = true;
    elements.studyGuidedPrompt.textContent = "";
    elements.studyGuidedInput.textContent = "";
    elements.studyGuidedOutput.textContent = "";
    elements.studyGuidedChecklist.innerHTML = "";
    return;
  }

  elements.studyGuidedProblem.hidden = false;
  elements.studyGuidedPrompt.textContent = problem.prompt;
  elements.studyGuidedInput.textContent = problem.input;
  elements.studyGuidedOutput.textContent = problem.output;
  elements.studyGuidedChecklist.innerHTML = problem.checklist
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
}

function renderProjectBrief(projectBrief) {
  if (!projectBrief) {
    elements.studyProject.hidden = true;
    elements.studyProjectSummary.textContent = "";
    elements.studyProjectOutcome.textContent = "";
    elements.studyProjectMilestones.innerHTML = "";
    elements.studyProjectDeliverables.innerHTML = "";
    return;
  }

  elements.studyProject.hidden = false;
  elements.studyProjectSummary.textContent = projectBrief.summary;
  elements.studyProjectOutcome.textContent = projectBrief.outcome;
  elements.studyProjectMilestones.innerHTML = projectBrief.milestones
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  elements.studyProjectDeliverables.innerHTML = projectBrief.deliverables
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
}

function renderEvolutionBrief(evolutionBrief) {
  if (!evolutionBrief) {
    elements.studyEvolution.hidden = true;
    elements.studyEvolutionFrom.textContent = "";
    elements.studyEvolutionBasic.textContent = "";
    elements.studyEvolutionAdvanced.textContent = "";
    elements.studyEvolutionUpgrades.innerHTML = "";
    elements.studyEvolutionJump.dataset.lessonBase = "";
    return;
  }

  elements.studyEvolution.hidden = false;
  elements.studyEvolutionFrom.textContent = `Retoma ${evolutionBrief.fromTitle}`;
  elements.studyEvolutionBasic.textContent = evolutionBrief.basicVersion;
  elements.studyEvolutionAdvanced.textContent = evolutionBrief.advancedVersion;
  elements.studyEvolutionUpgrades.innerHTML = evolutionBrief.upgrades
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  elements.studyEvolutionJump.dataset.lessonBase = evolutionBrief.fromLessonId;
}

function renderEvolutionCase(evolutionCase, lessonId) {
  if (!evolutionCase) {
    elements.studyEvolutionCase.hidden = true;
    elements.studyEvolutionCaseTag.textContent = "";
    elements.studyEvolutionCaseSummary.textContent = "";
    elements.studyEvolutionCaseBase.textContent = "";
    elements.studyEvolutionCaseAdvanced.textContent = "";
    elements.studyEvolutionCaseStarter.textContent = "";
    elements.studyEvolutionCaseChecklist.innerHTML = "";
    elements.studyEvolutionCaseLoad.dataset.caseLesson = "";
    return;
  }

  elements.studyEvolutionCase.hidden = false;
  elements.studyEvolutionCaseTag.textContent = `${evolutionCase.title} · ${evolutionCase.phase}`;
  elements.studyEvolutionCaseSummary.textContent = evolutionCase.summary;
  elements.studyEvolutionCaseBase.textContent = evolutionCase.baseVersion;
  elements.studyEvolutionCaseAdvanced.textContent = evolutionCase.advancedVersion;
  elements.studyEvolutionCaseStarter.textContent = evolutionCase.starter;
  elements.studyEvolutionCaseChecklist.innerHTML = evolutionCase.checklist
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  elements.studyEvolutionCaseLoad.dataset.caseLesson = lessonId;
  elements.studyEvolutionCaseLoad.disabled = !evolutionCase.canLoadRunner;
  elements.studyEvolutionCaseLoad.textContent = evolutionCase.canLoadRunner
    ? "Cargar caso en laboratorio"
    : "Caso de diseño";
}

function renderChallenge() {
  const lesson = findLesson(state.activeLessonId) ?? visibleLessons()[0];
  if (!lesson) return;

  state.activeLessonId = lesson.id;
  elements.challengeTitle.textContent = lesson.title;
  elements.challengePrompt.textContent = lesson.challenge.prompt;
  elements.challengeOptions.innerHTML = lesson.challenge.options
    .map(
      (option) => `
        <label class="challenge__option">
          <input type="radio" name="answer" value="${escapeHtml(option)}">
          <span>${escapeHtml(option)}</span>
        </label>
      `,
    )
    .join("");
}

function renderAchievements() {
  elements.achievementGrid.innerHTML = achievements
    .map((achievement) => {
      const unlocked = achievement.isUnlocked(state);
      return `
        <article class="achievement ${unlocked ? "" : "is-locked"}">
          <span class="achievement__icon">${achievement.icon}</span>
          <h3 class="achievement__title">${achievement.title}</h3>
          <p class="achievement__text">${achievement.description}</p>
          <strong>${unlocked ? "Desbloqueado" : "Bloqueado"}</strong>
        </article>
      `;
    })
    .join("");
}

function renderPracticeBank() {
  const allEntries = getPracticeBankEntries(state.activeTrack);
  renderPracticeBankFilters(allEntries);
  const entries = sortPracticeBankEntries(filterPracticeBankEntries(allEntries));
  renderPracticeBankSpotlight(entries);
  renderPracticeBankPhases(entries);
  renderPracticeBankStats(entries);

  if (!entries.length) {
    elements.practiceBankGrid.innerHTML = `
      <article class="practice-card">
        <h3>Sin práctica disponible</h3>
        <p>La ruta activa todavía no tiene un banco de práctica definido.</p>
      </article>
    `;
    return;
  }

  elements.practiceBankGrid.innerHTML = entries
    .map((entry) => `
      <article class="practice-card">
        <div class="practice-card__meta">
          <span class="language-mark language-mark--${entry.trackId}">${entry.trackLabel}</span>
          <span class="badge">${escapeHtml(entry.family)}</span>
          <span class="badge">${escapeHtml(entry.difficulty)}</span>
          ${entry.hasEvolution ? '<span class="badge practice-card__badge">Escala después</span>' : ""}
          ${entry.evolutionPhase ? `<span class="badge practice-card__phase">${escapeHtml(entry.evolutionPhase)}</span>` : ""}
          ${entry.hasEvolution ? `<span class="badge practice-card__evolution-state">${entry.evolutionBaseCovered ? "Base cubierta" : "Base pendiente"}</span>` : ""}
          <span class="badge practice-card__status practice-card__status--${entry.progressState.key}">${escapeHtml(entry.progressState.label)}</span>
        </div>
        <h3>${escapeHtml(entry.title)}</h3>
        <p>${escapeHtml(entry.summary)}</p>
        <div class="practice-card__actions">
          <button type="button" data-practice-lesson="${entry.lessonId}" data-practice-target="${entry.target}">
            ${entry.target === "practice" ? "Abrir práctica" : "Abrir problema"}
          </button>
          ${entry.hasEvolution ? `<button type="button" class="practice-card__secondary" data-base-lesson="${entry.evolutionBaseLessonId}">Ver base</button>` : ""}
        </div>
      </article>
    `)
    .join("");
}

function renderPracticeBankStats(entries) {
  if (!entries.length) {
    elements.practiceBankStats.innerHTML = "";
    return;
  }

  const stats = getPracticeFamilyStats(entries);
  elements.practiceBankStats.innerHTML = stats
    .map((item) => `
      <button class="practice-stat-card ${item.isPriority ? "is-priority" : ""}" type="button" data-practice-family-pick="${escapeHtml(item.family)}">
        <div class="practice-stat-card__top">
          <strong>${escapeHtml(item.family)}</strong>
          <span>${item.percent}%</span>
        </div>
        <div class="practice-stat-card__bar"><span style="width: ${item.percent}%"></span></div>
        <p>${item.started} empezadas · ${item.newCount} sin tocar</p>
        ${item.isPriority ? "<small>Prioridad útil ahora</small>" : ""}
      </button>
    `)
    .join("");
}

function renderPracticeBankPhases(entries) {
  const phaseEntries = entries.filter((entry) => entry.evolutionPhase);
  if (!phaseEntries.length) {
    elements.practiceBankPhases.innerHTML = "";
    return;
  }

  const grouped = new Map();
  phaseEntries.forEach((entry) => {
    if (!grouped.has(entry.evolutionPhase)) {
      grouped.set(entry.evolutionPhase, {
        phase: entry.evolutionPhase,
        total: 0,
        done: 0,
        started: 0,
        newCount: 0,
      });
    }

    const current = grouped.get(entry.evolutionPhase);
    current.total += 1;
    if (entry.progressState.key === "done") {
      current.done += 1;
    } else if (entry.progressState.key === "started") {
      current.started += 1;
    } else {
      current.newCount += 1;
    }
  });

  const phaseStats = [...grouped.values()]
    .map((item) => ({
      ...item,
      debtScore: item.started * 2 + item.newCount,
    }))
    .sort((left, right) => right.debtScore - left.debtScore || left.phase.localeCompare(right.phase));
  const priorityPhase = phaseStats.find((item) => item.debtScore > 0)?.phase ?? "";

  elements.practiceBankPhases.innerHTML = phaseStats
    .map((item) => {
      const pending = item.total - item.done;
      return `
        <button class="practice-phase-pill ${state.practicePhaseFilter === item.phase ? "is-active" : ""} ${priorityPhase === item.phase ? "is-priority" : ""}" type="button" data-practice-phase-pick="${escapeHtml(item.phase)}">
          <strong>${escapeHtml(item.phase)}</strong>
          <span>${item.done}/${item.total} hechas · ${pending} pendientes</span>
          ${priorityPhase === item.phase ? "<small>Prioridad útil ahora</small>" : ""}
        </button>
      `;
    })
    .join("");
}

function renderPracticeBankSpotlight(entries) {
  const recommended = entries.find((entry) => !entry.isDone) ?? entries[0];
  if (!recommended) {
    elements.practiceBankSpotlight.innerHTML = "";
    return;
  }

  elements.practiceBankSpotlight.innerHTML = `
    <article class="practice-spotlight">
      <div class="practice-spotlight__meta">
        <span class="eyebrow">Más útil ahora</span>
        <span class="badge">${escapeHtml(recommended.family)}</span>
        <span class="badge">${escapeHtml(recommended.difficulty)}</span>
        ${recommended.hasEvolution ? '<span class="badge practice-card__badge">Escala después</span>' : ""}
        ${recommended.evolutionPhase ? `<span class="badge practice-card__phase">${escapeHtml(recommended.evolutionPhase)}</span>` : ""}
        ${recommended.hasEvolution ? `<span class="badge practice-card__evolution-state">${recommended.evolutionBaseCovered ? "Base cubierta" : "Base pendiente"}</span>` : ""}
        <span class="badge">${escapeHtml(recommended.progressState.label)}</span>
      </div>
      <h3>${escapeHtml(recommended.title)}</h3>
      <p>${escapeHtml(getPracticeSpotlightReason(recommended))}</p>
      <div class="practice-spotlight__actions">
        <button type="button" data-practice-lesson="${recommended.lessonId}" data-practice-target="${recommended.target}">
          ${recommended.target === "practice" ? "Abrir práctica" : "Abrir problema"}
        </button>
        ${recommended.hasEvolution ? `<button type="button" class="practice-card__secondary" data-base-lesson="${recommended.evolutionBaseLessonId}">Ver base</button>` : ""}
      </div>
    </article>
  `;
}

function renderPracticeBankFilters(entries) {
  const families = ["all", ...new Set(entries.map((entry) => entry.family))];
  const difficulties = ["all", ...new Set(entries.map((entry) => entry.difficulty))];
  const types = ["all", ...new Set(entries.map((entry) => entry.practiceType))];
  const phases = ["all", ...new Set(entries.map((entry) => entry.evolutionPhase).filter(Boolean))];

  elements.practiceFamilyFilter.innerHTML = families
    .map((family) => `<option value="${escapeHtml(family)}">${family === "all" ? "Todas" : escapeHtml(family)}</option>`)
    .join("");
  elements.practiceDifficultyFilter.innerHTML = difficulties
    .map((difficulty) => `<option value="${escapeHtml(difficulty)}">${difficulty === "all" ? "Todas" : escapeHtml(difficulty)}</option>`)
    .join("");
  elements.practiceTypeFilter.innerHTML = types
    .map((type) => `<option value="${escapeHtml(type)}">${type === "all" ? "Todos" : escapeHtml(type)}</option>`)
    .join("");
  elements.practicePhaseFilter.innerHTML = phases
    .map((phase) => `<option value="${escapeHtml(phase)}">${phase === "all" ? "Todas" : escapeHtml(phase)}</option>`)
    .join("");

  elements.practiceFamilyFilter.value = families.includes(state.practiceFamilyFilter)
    ? state.practiceFamilyFilter
    : "all";
  elements.practiceDifficultyFilter.value = difficulties.includes(state.practiceDifficultyFilter)
    ? state.practiceDifficultyFilter
    : "all";
  elements.practiceTypeFilter.value = types.includes(state.practiceTypeFilter)
    ? state.practiceTypeFilter
    : "all";
  elements.practiceStatusFilter.value = state.practiceStatusFilter;
  elements.practiceEvolutionFilter.value = state.practiceEvolutionFilter;
  elements.practicePhaseFilter.value = phases.includes(state.practicePhaseFilter)
    ? state.practicePhaseFilter
    : "all";
  elements.practiceSort.value = state.practiceSort;
}

function filterPracticeBankEntries(entries) {
  return entries.filter((entry) => {
    const familyMatch = state.practiceFamilyFilter === "all" || entry.family === state.practiceFamilyFilter;
    const difficultyMatch =
      state.practiceDifficultyFilter === "all" || entry.difficulty === state.practiceDifficultyFilter;
    const typeMatch = state.practiceTypeFilter === "all" || entry.practiceType === state.practiceTypeFilter;
    const statusMatch =
      state.practiceStatusFilter === "all" ||
      (state.practiceStatusFilter === "done" && entry.isDone) ||
      (state.practiceStatusFilter === "pending" && !entry.isDone);
    const evolutionMatch =
      state.practiceEvolutionFilter === "all" ||
      (state.practiceEvolutionFilter === "evolves" && entry.hasEvolution) ||
      (state.practiceEvolutionFilter === "standalone" && !entry.hasEvolution);
    const phaseMatch =
      state.practicePhaseFilter === "all" ||
      entry.evolutionPhase === state.practicePhaseFilter;

    return familyMatch && difficultyMatch && typeMatch && statusMatch && evolutionMatch && phaseMatch;
  });
}

function sortPracticeBankEntries(entries) {
  const difficultyOrder = {
    Cero: 0,
    Base: 1,
    Intermedio: 2,
    Avanzado: 3,
  };

  return [...entries].sort((left, right) => {
    if (state.practiceEvolutionFilter === "evolves" && left.evolutionBaseCovered !== right.evolutionBaseCovered) {
      return Number(right.evolutionBaseCovered) - Number(left.evolutionBaseCovered);
    }

    if (state.practiceSort === "family") {
      return left.family.localeCompare(right.family) || left.title.localeCompare(right.title);
    }

    if (state.practiceSort === "difficulty") {
      return (difficultyOrder[left.difficulty] ?? 99) - (difficultyOrder[right.difficulty] ?? 99)
        || left.title.localeCompare(right.title);
    }

    if (state.practiceSort === "impact") {
      const leftImpact = scoreLessonRecommendation(findLesson(left.lessonId)).score;
      const rightImpact = scoreLessonRecommendation(findLesson(right.lessonId)).score;
      return rightImpact - leftImpact || left.title.localeCompare(right.title);
    }

    if (left.isDone !== right.isDone) {
      return Number(left.isDone) - Number(right.isDone);
    }

    const leftImpact = scoreLessonRecommendation(findLesson(left.lessonId)).score;
    const rightImpact = scoreLessonRecommendation(findLesson(right.lessonId)).score;
    return rightImpact - leftImpact || left.title.localeCompare(right.title);
  });
}

function renderBlueprint() {
  const completedBlueprints = appBlueprint.filter((item) => state.completed.includes(item.lessonId)).length;
  const readyBlueprints = appBlueprint.filter((item) => blueprintPrerequisites(item).pending.length === 0).length;
  elements.blueprintLegend.innerHTML = `
    <div class="blueprint-stat">
      <strong>${completedBlueprints}/${appBlueprint.length}</strong>
      <span>conceptos con lección ya completada</span>
    </div>
    <div class="blueprint-stat">
      <strong>${countCompletedByTrack(state, "javascript")}/${tracks.javascript.lessons.length}</strong>
      <span>lecciones de JavaScript cerradas</span>
    </div>
    <div class="blueprint-stat">
      <strong>${readyBlueprints}/${appBlueprint.length}</strong>
      <span>bloques con base previa ya cubierta</span>
    </div>
  `;

  elements.blueprintGrid.innerHTML = appBlueprint
    .map((item) => {
      const lesson = findLesson(item.lessonId);
      const trackId = lesson ? getTrackIdByLesson(lesson.id) : "javascript";
      const lessonLabel = lesson ? lesson.title : item.lessonId;
      const isDone = lesson ? state.completed.includes(lesson.id) : false;
      const isSolved = lesson ? state.solvedExercises.includes(lesson.id) : false;
      const prerequisites = blueprintPrerequisites(item);
      return `
        <article class="blueprint-card ${isDone ? "is-completed" : ""}">
          <div class="blueprint-card__meta">
            <span class="language-mark language-mark--${trackId}">JavaScript</span>
            <span class="badge">${escapeHtml(item.phase)}</span>
            <span class="badge">${isDone ? "Lección hecha" : "Pendiente"}</span>
            ${isSolved ? '<span class="badge">Ejercicio superado</span>' : ""}
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p class="blueprint-card__concept">${escapeHtml(item.concept)}</p>
          <p><strong>En la app:</strong> ${escapeHtml(item.where)}</p>
          <p><strong>Lo estudiarías en:</strong> ${escapeHtml(lessonLabel)}</p>
          <p><strong>Cómo llegas a eso:</strong> ${escapeHtml(item.howToLearn)}</p>
          <div class="blueprint-card__dependency ${prerequisites.pending.length ? "is-blocked" : "is-ready"}">
            <strong>${prerequisites.pending.length ? "Base pendiente" : "Base cubierta"}</strong>
            <p>${prerequisites.message}</p>
          </div>
          <div class="blueprint-card__tags">
            ${item.tags.map((tag) => `<span class="badge">${escapeHtml(tag)}</span>`).join("")}
          </div>
          <div class="blueprint-card__actions">
            <button class="blueprint-card__button" type="button" data-blueprint-lesson="${escapeHtml(item.lessonId)}">Abrir lección</button>
            <button class="blueprint-card__button" type="button" data-blueprint-practice="${escapeHtml(item.lessonId)}">Ir a práctica</button>
          </div>
        </article>
      `;
    })
    .join("");
}

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

function completeLesson(lesson) {
  if (!lesson || state.completed.includes(lesson.id)) return;
  state.completed.push(lesson.id);
  state.xp += lesson.xp;
}

function addProgressOnce(key, lessonId, xp) {
  if (!state[key].includes(lessonId)) {
    state[key].push(lessonId);
    state.xp += xp;
  }
}

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
        elements.jsRunnerOutput.textContent = `${error.name}: ${error.message}`;
        renderExerciseResults([], false);
      });
  } catch (error) {
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

function recordStudyDay() {
  const today = new Date().toISOString().slice(0, 10);
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
// un bloque técnico concreto del propio app.js.
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
function recommendNextLesson() {
  const pendingLessons = allLessons().filter((lesson) => !state.completed.includes(lesson.id));
  if (!pendingLessons.length) return null;

  const ranked = pendingLessons
    .map((lesson) => scoreLessonRecommendation(lesson))
    .sort((left, right) => right.score - left.score || left.lesson.xp - right.lesson.xp);

  return ranked[0];
}

function recommendNextSession() {
  const readyEvolutionTargets = Object.entries(evolutionBriefs)
    .filter(([lessonId]) => getTrackIdByLesson(lessonId) === state.activeTrack)
    .map(([lessonId, evolution]) => ({
      lesson: findLesson(lessonId),
      baseLesson: findLesson(evolution.fromLessonId),
      target: exercises[lessonId] ? "practice" : "study",
      baseTitle: evolution.fromTitle,
    }))
    .filter((entry) =>
      entry.lesson &&
      entry.baseLesson &&
      isLessonCovered(entry.baseLesson.id) &&
      !isLessonCovered(entry.lesson.id),
    )
    .sort((left, right) => scoreLessonRecommendation(right.lesson).score - scoreLessonRecommendation(left.lesson).score);

  if (readyEvolutionTargets.length) {
    const entry = readyEvolutionTargets[0];
    return {
      lesson: entry.lesson,
      kind: "Escalada",
      target: entry.target,
      reason: `La base ${entry.baseTitle} ya está cubierta. Ahora conviene subir al siguiente replanteamiento.`,
    };
  }

  const evolutionBaseLessons = Object.entries(evolutionBriefs)
    .filter(([lessonId]) => getTrackIdByLesson(lessonId) === state.activeTrack)
    .map(([lessonId, evolution]) => ({
      lesson: findLesson(evolution.fromLessonId),
      sourceLesson: findLesson(lessonId),
    }))
    .filter((entry) => entry.lesson && entry.sourceLesson && !isLessonCovered(entry.lesson.id))
    .sort((left, right) => scoreLessonRecommendation(right.lesson).score - scoreLessonRecommendation(left.lesson).score);

  if (evolutionBaseLessons.length) {
    const entry = evolutionBaseLessons[0];
    return {
      lesson: entry.lesson,
      kind: "Base previa",
      target: "study",
      reason: `Te conviene cubrir esta base antes de escalar hacia ${entry.sourceLesson.title}.`,
    };
  }

  const lessonRecommendation = recommendNextLesson();
  if (!lessonRecommendation) return null;

  return {
    lesson: lessonRecommendation.lesson,
    kind: "Desbloqueo",
    target: "study",
    reason: lessonRecommendation.reason,
  };
}

// Esta puntuación mezcla varias señales:
// conceptos que desbloquea, continuidad con la ruta activa
// y progreso parcial ya hecho.
function scoreLessonRecommendation(lesson) {
  const lessonBlueprints = appBlueprint.filter((item) => item.lessonId === lesson.id);
  const unlockedConcepts = lessonBlueprints.filter((item) => blueprintPrerequisites(item).pending.length === 0).length;
  const blockedConcepts = appBlueprint.filter((item) => (item.prerequisites ?? []).includes(lesson.id));
  const blockedPending = blockedConcepts.filter((item) => blueprintPrerequisites(item).pending.some((entry) => entry.id === lesson.id));
  const weeklyRules = getWeeklyPacingRules();
  const sameTrackBonus = getTrackIdByLesson(lesson.id) === state.activeTrack ? 1 : 0;
  const readBonus = state.readLessons.includes(lesson.id) ? 1 : 0;
  const practiceBonus = state.practiceDone.includes(lesson.id) ? 1 : 0;
  const advancedPenalty = !weeklyRules.allowAdvanced && lesson.level === "Avanzado" ? 4 : 0;
  const score =
    unlockedConcepts * 5 +
    blockedPending.length * 4 +
    sameTrackBonus * 2 +
    readBonus +
    practiceBonus -
    advancedPenalty;

  let reason = "Siguiente paso natural dentro de la ruta.";
  if (blockedPending.length) {
    reason = `Desbloquea ${blockedPending.length} ${blockedPending.length === 1 ? "bloque técnico" : "bloques técnicos"} del proyecto.`;
  } else if (unlockedConcepts) {
    reason = `Te ayuda a entender ${unlockedConcepts} ${unlockedConcepts === 1 ? "concepto clave" : "conceptos clave"} que ya aparecen en la app.`;
  } else if (sameTrackBonus) {
    reason = "Mantiene continuidad con la ruta que estás trabajando ahora.";
  }

  return {
    lesson,
    score,
    reason,
  };
}

function buildDailyQueue() {
  const items = [];
  const seen = new Set();

  const addItem = (lesson, kind, reason, target = "study", priority = 0) => {
    if (!lesson || seen.has(lesson.id)) return;
    seen.add(lesson.id);
    items.push({ lesson, kind, reason, target, priority });
  };

  const recommendation = recommendNextLesson();
  const evolutionBaseLessons = Object.entries(evolutionBriefs)
    .filter(([lessonId]) => {
      const currentLesson = findLesson(lessonId);
      return currentLesson && getTrackIdByLesson(lessonId) === state.activeTrack;
    })
    .map(([lessonId, evolution]) => ({
      lesson: findLesson(evolution.fromLessonId),
      sourceLesson: findLesson(lessonId),
      sourceTitle: evolution.fromTitle,
    }))
    .filter((entry) => entry.lesson && entry.sourceLesson && !isLessonCovered(entry.lesson.id))
    .sort((left, right) => scoreLessonRecommendation(right.lesson).score - scoreLessonRecommendation(left.lesson).score);
  const readyEvolutionTargets = Object.entries(evolutionBriefs)
    .filter(([lessonId]) => {
      const sourceLesson = findLesson(lessonId);
      return sourceLesson && getTrackIdByLesson(lessonId) === state.activeTrack;
    })
    .map(([lessonId, evolution]) => ({
      lesson: findLesson(lessonId),
      baseLesson: findLesson(evolution.fromLessonId),
      target: exercises[lessonId] ? "practice" : "study",
      baseTitle: evolution.fromTitle,
    }))
    .filter((entry) =>
      entry.lesson &&
      entry.baseLesson &&
      isLessonCovered(entry.baseLesson.id) &&
      !isLessonCovered(entry.lesson.id),
    )
    .sort((left, right) => scoreLessonRecommendation(right.lesson).score - scoreLessonRecommendation(left.lesson).score);
  const pendingExercises = allLessons()
    .filter((lesson) => exercises[lesson.id] && !state.solvedExercises.includes(lesson.id))
    .filter((lesson) => state.readLessons.includes(lesson.id) || state.practiceDone.includes(lesson.id))
    .sort((left, right) => scoreLessonRecommendation(right).score - scoreLessonRecommendation(left).score);

  const failedLessons = state.failedChallenges
    .filter((lessonId) => !state.solvedChallenges.includes(lessonId))
    .map((lessonId) => findLesson(lessonId))
    .filter(Boolean)
    .sort((left, right) => scoreLessonRecommendation(right).score - scoreLessonRecommendation(left).score);

  const saturation = getDailySaturationState(pendingExercises, failedLessons);
  const sessionMode = determineDailySessionMode({
    recommendation,
    evolutionBaseLessons,
    readyEvolutionTargets,
    pendingExercises,
    failedLessons,
    saturation,
  });

  if (sessionMode === "review") {
    failedLessons.slice(0, 2).forEach((lesson) => {
      addItem(
        lesson,
        "Repaso",
        "Tienes un reto fallado pendiente. Repetirlo ahora reduce olvido y arrastre.",
        "study",
        30,
      );
    });
    pendingExercises.slice(0, 1).forEach((lesson) => {
      addItem(
        lesson,
        "Tests",
        "Después del repaso, conviene cerrar una práctica que ya está arrancada.",
        "practice",
        20,
      );
    });
  } else if (sessionMode === "evolution") {
    evolutionBaseLessons.slice(0, 2).forEach((entry) => {
      addItem(
        entry.lesson,
        "Base previa",
        `Te conviene cubrir esta base antes de escalar hacia ${entry.sourceLesson.title}.`,
        "study",
        35,
      );
    });
    pendingExercises.slice(0, 1).forEach((lesson) => {
      addItem(
        lesson,
        "Tests",
        "Después de cubrir la base, cierra una práctica empezada para fijar la progresión.",
        "practice",
        18,
      );
    });
  } else if (sessionMode === "consolidation") {
    pendingExercises.slice(0, 3).forEach((lesson) => {
      addItem(
        lesson,
        "Tests",
        "Ya empezaste esta lección. Cerrar el ejercicio consolida mejor el concepto.",
        "practice",
        30,
      );
    });
  } else if (sessionMode === "evolution-ready") {
    readyEvolutionTargets.slice(0, 2).forEach((entry) => {
      addItem(
        entry.lesson,
        "Escalada",
        `La base ${entry.baseTitle} ya está cubierta. Ahora conviene subir al siguiente replanteamiento.`,
        entry.target,
        34,
      );
    });
    pendingExercises.slice(0, 1).forEach((lesson) => {
      addItem(
        lesson,
        "Tests",
        "Después de la subida, cerrar una práctica abierta ayuda a consolidar la progresión.",
        "practice",
        16,
      );
    });
  } else if (sessionMode === "unlock" && !saturation.blockNewTheory) {
    if (recommendation) {
      addItem(recommendation.lesson, "Desbloqueo", recommendation.reason, "study", 30);
    }
    pendingExercises.slice(0, 1).forEach((lesson) => {
      addItem(
        lesson,
        "Tests",
        "Añadir una validación práctica evita que el desbloqueo se quede solo en teoría.",
        "practice",
        15,
      );
    });
  } else {
    readyEvolutionTargets.slice(0, 1).forEach((entry) => {
      addItem(
        entry.lesson,
        "Escalada",
        `Ya puedes pasar del fundamento a ${entry.lesson.title}.`,
        entry.target,
        26,
      );
    });
    evolutionBaseLessons.slice(0, 1).forEach((entry) => {
      addItem(
        entry.lesson,
        "Base previa",
        `Antes de subir hacia ${entry.sourceLesson.title}, conviene cubrir esta pieza base.`,
        "study",
        24,
      );
    });
    if (recommendation && !saturation.blockNewTheory) {
      addItem(recommendation.lesson, "Desbloqueo", recommendation.reason, "study", 30);
    }
    pendingExercises.slice(0, 1).forEach((lesson) => {
      addItem(
        lesson,
        "Tests",
        "Ya empezaste esta lección. Cerrar el ejercicio consolida mejor el concepto.",
        "practice",
        20,
      );
    });
    failedLessons.slice(0, 1).forEach((lesson) => {
      addItem(
        lesson,
        "Repaso",
        "Revisar un fallo reciente te ayuda a no arrastrarlo a la siguiente fase.",
        "study",
        10,
      );
    });
  }

  // Si faltan huecos, rellenamos con la mejor mezcla posible sin duplicar lecciones.
  if (recommendation && !saturation.blockNewTheory) {
    addItem(recommendation.lesson, "Desbloqueo", recommendation.reason, "study", 12);
  }
  readyEvolutionTargets.slice(0, 1).forEach((entry) => {
    addItem(
      entry.lesson,
      "Escalada",
      `Ya puedes aprovechar la base cubierta y subir hacia ${entry.lesson.title}.`,
      entry.target,
      13,
    );
  });
  pendingExercises.slice(0, 2).forEach((lesson) => {
    addItem(
      lesson,
      "Tests",
      "Cerrar una práctica abierta mantiene la sesión productiva.",
      "practice",
      11,
    );
  });
  failedLessons.slice(0, 2).forEach((lesson) => {
    addItem(
      lesson,
      "Repaso",
      "Un repaso corto evita que el error se convierta en hábito.",
      "study",
      10,
    );
  });

  return items
    .sort((left, right) => right.priority - left.priority)
    .slice(0, 3);
}

function determineDailySessionMode({ recommendation, evolutionBaseLessons, readyEvolutionTargets, pendingExercises, failedLessons, saturation }) {
  if (saturation.blockNewTheory && failedLessons.length >= 1) return "review";
  if (saturation.blockNewTheory) return "consolidation";
  if (readyEvolutionTargets.length >= 1 && pendingExercises.length <= 1 && failedLessons.length === 0) return "evolution-ready";
  if (evolutionBaseLessons.length >= 1 && pendingExercises.length === 0 && failedLessons.length === 0) return "evolution";
  if (failedLessons.length >= 2) return "review";
  if (pendingExercises.length >= 2) return "consolidation";
  if (recommendation) return "unlock";
  return "mixed";
}

function getDailySessionProfile(queue) {
  const kinds = queue.map((item) => item.kind);
  const counts = {
    base: kinds.filter((kind) => kind === "Base previa").length,
    escalada: kinds.filter((kind) => kind === "Escalada").length,
    desbloqueo: kinds.filter((kind) => kind === "Desbloqueo").length,
    tests: kinds.filter((kind) => kind === "Tests").length,
    repaso: kinds.filter((kind) => kind === "Repaso").length,
  };

  if (counts.escalada >= 1 && counts.tests === 0 && counts.repaso === 0) {
    return {
      label: "Sesion de escalado",
      description: "La base ya está cubierta. Hoy toca aprovechar ese fundamento y subir un nivel en el mismo problema.",
    };
  }

  if (counts.base >= 1 && counts.tests === 0 && counts.repaso === 0) {
    return {
      label: "Sesion de preparacion",
      description: "Hoy conviene cubrir una base previa para que una práctica más avanzada tenga sentido y retorno real.",
    };
  }

  if (counts.escalada >= 1 && counts.tests >= 1) {
    return {
      label: "Sesion de transferencia",
      description: "Pasas de una base ya cubierta a una versión más exigente y luego la refuerzas con validación práctica.",
    };
  }

  if (counts.base >= 1 && counts.tests >= 1) {
    return {
      label: "Sesion de progresion",
      description: "Primero cubres una base previa y después cierras una práctica para que la subida de nivel no quede en falso.",
    };
  }

  if (counts.repaso >= 2) {
    return {
      label: "Sesion de repaso",
      description: "Hoy conviene reparar errores recientes antes de seguir ampliando temas nuevos.",
    };
  }

  if (counts.tests >= 2) {
    return {
      label: "Sesion de consolidacion",
      description: "La prioridad es cerrar prácticas empezadas y convertir comprensión parcial en soltura.",
    };
  }

  if (counts.desbloqueo >= 1 && counts.tests >= 1) {
    return {
      label: "Sesion mixta",
      description: "Combina avance conceptual con validación práctica para no dejar huecos al crecer.",
    };
  }

  if (counts.desbloqueo >= 1) {
    return {
      label: "Sesion de desbloqueo",
      description: "Hoy toca estudiar piezas que abren más comprensión del proyecto completo.",
    };
  }

  if (counts.tests >= 1) {
    return {
      label: "Practica intensiva",
      description: "El foco está en resolver y validar código, no en abrir teoría nueva.",
    };
  }

  return {
    label: "Sesion ligera",
    description: "Mantén continuidad sin forzar volumen: una pequeña mejora sigue contando.",
  };
}

function getDailySaturationState(pendingExercises, failedLessons) {
  const openPracticeDebt = pendingExercises.length;
  const reviewDebt = failedLessons.length;
  const blockNewTheory = openPracticeDebt >= 3 || reviewDebt >= 2;

  return {
    openPracticeDebt,
    reviewDebt,
    blockNewTheory,
  };
}

function renderSaturationNotice(saturation) {
  if (!saturation.blockNewTheory) return "";

  const reasons = [];
  if (saturation.openPracticeDebt >= 3) {
    reasons.push(`${saturation.openPracticeDebt} practicas abiertas`);
  }
  if (saturation.reviewDebt >= 2) {
    reasons.push(`${saturation.reviewDebt} repasos pendientes`);
  }

  return `
    <div class="daily-queue__notice">
      <strong>Hoy no conviene abrir teoria nueva.</strong>
      <p>La cola prioriza cierre y repaso por deuda acumulada: ${escapeHtml(reasons.join(" y "))}.</p>
    </div>
  `;
}

function markDailyQueueItemDone(itemKey) {
  const todayKey = getTodayKey();
  const current = new Set(state.dailyQueueLog[todayKey] ?? []);

  if (current.has(itemKey)) {
    current.delete(itemKey);
  } else {
    current.add(itemKey);
  }

  state.dailyQueueLog[todayKey] = [...current];
  pruneDailyQueueLog();
  maybeCompleteDailySession();
}

function dailyQueueItemKey(item) {
  return `${item.kind}:${item.lesson.id}:${item.target}`;
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function pruneDailyQueueLog() {
  const entries = Object.entries(state.dailyQueueLog)
    .sort(([left], [right]) => right.localeCompare(left))
    .slice(0, 14);
  state.dailyQueueLog = Object.fromEntries(entries);
}

function maybeCompleteDailySession() {
  const todayKey = getTodayKey();
  const queue = buildDailyQueue();
  if (!queue.length) return;

  const doneToday = state.dailyQueueLog[todayKey] ?? [];
  const allDone = queue.every((item) => doneToday.includes(dailyQueueItemKey(item)));
  if (!allDone || state.completedDailySessions.includes(todayKey)) return;

  state.completedDailySessions.unshift(todayKey);
  state.completedDailySessions = state.completedDailySessions.slice(0, 14);
  state.xp += 30;
  recordStudyDay();
}

elements.blueprintGrid.addEventListener("click", (event) => {
  const lessonButton = event.target.closest("[data-blueprint-lesson]");
  if (lessonButton) {
    const lessonId = lessonButton.dataset.blueprintLesson;
    saveCurrentNotes();
    openLesson(lessonId);
    persist();
    render();
    document.querySelector(".study").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const practiceButton = event.target.closest("[data-blueprint-practice]");
  if (practiceButton) {
    const lessonId = practiceButton.dataset.blueprintPractice;
    saveCurrentNotes();
    openLesson(lessonId);
    persist();
    render();
    loadActiveExercise();
    document.querySelector(".runner").scrollIntoView({ behavior: "smooth" });
  }
});

elements.practiceBankGrid.addEventListener("click", (event) => {
  const baseButton = event.target.closest("[data-base-lesson]");
  if (baseButton) {
    const lessonId = baseButton.dataset.baseLesson;
    saveCurrentNotes();
    openLesson(lessonId);
    persist();
    render();
    document.querySelector(".study").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const button = event.target.closest("[data-practice-lesson]");
  if (!button) return;

  const lessonId = button.dataset.practiceLesson;
  const target = button.dataset.practiceTarget;
  saveCurrentNotes();
  openLesson(lessonId);
  persist();
  render();

  if (target === "practice") {
    loadActiveExercise();
    document.querySelector(".runner").scrollIntoView({ behavior: "smooth" });
    return;
  }

  document.querySelector(".study").scrollIntoView({ behavior: "smooth" });
});

elements.practiceBankSpotlight.addEventListener("click", (event) => {
  const baseButton = event.target.closest("[data-base-lesson]");
  if (baseButton) {
    const lessonId = baseButton.dataset.baseLesson;
    saveCurrentNotes();
    openLesson(lessonId);
    persist();
    render();
    document.querySelector(".study").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const button = event.target.closest("[data-practice-lesson]");
  if (!button) return;

  const lessonId = button.dataset.practiceLesson;
  const target = button.dataset.practiceTarget;
  saveCurrentNotes();
  openLesson(lessonId);
  persist();
  render();

  if (target === "practice") {
    loadActiveExercise();
    document.querySelector(".runner").scrollIntoView({ behavior: "smooth" });
    return;
  }

  document.querySelector(".study").scrollIntoView({ behavior: "smooth" });
});

elements.practiceBankStats.addEventListener("click", (event) => {
  const button = event.target.closest("[data-practice-family-pick]");
  if (!button) return;

  state.practiceFamilyFilter = button.dataset.practiceFamilyPick;
  persist();
  render();
  document.querySelector(".practice-bank").scrollIntoView({ behavior: "smooth" });
});

elements.practiceBankPhases.addEventListener("click", (event) => {
  const button = event.target.closest("[data-practice-phase-pick]");
  if (!button) return;

  state.practicePhaseFilter = button.dataset.practicePhasePick;
  persist();
  render();
  document.querySelector(".practice-bank").scrollIntoView({ behavior: "smooth" });
});

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
    notes: cleanNotes(value?.notes, lessonIds),
    dailyQueueLog: cleanDailyQueueLog(value?.dailyQueueLog, lessonIds),
    completedDailySessions: cleanDateArray(value?.completedDailySessions),
    lastStudyDate: typeof value?.lastStudyDate === "string" ? value.lastStudyDate : null,
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

function createDefaultState() {
  return {
    ...defaultState,
    completed: [],
    solvedChallenges: [],
    failedChallenges: [],
    readLessons: [],
    practiceDone: [],
    solvedExercises: [],
    notes: {},
    quickstartDismissed: false,
    dailyQueueLog: {},
    completedDailySessions: [],
    lastStudyDate: null,
    streak: 0,
  };
}

function compareExerciseResult(received, expected, compareMode) {
  if (compareMode === "html") {
    return normalizeHtml(received) === normalizeHtml(expected);
  }

  return JSON.stringify(received) === JSON.stringify(expected);
}

function normalizeHtml(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

function formatExerciseMismatch(expected, received) {
  if (Array.isArray(expected) && Array.isArray(received)) {
    return expected
      .map((item, index) => {
        const current = received[index];
        return `<p>${escapeHtml(item.selector)} · esperado: ${escapeHtml(formatConsoleValue(item.value))} · recibido: ${escapeHtml(formatConsoleValue(current?.value))}</p>`;
      })
      .join("");
  }

  return `<p>Esperado: ${escapeHtml(formatConsoleValue(expected))}</p><p>Recibido: ${escapeHtml(formatConsoleValue(received))}</p>`;
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

function renderDailySessionFooter(totalSteps, doneSteps, sessionCompletedToday) {
  const history = state.completedDailySessions.slice(0, 5);
  const weeklyProfile = getWeeklyStudyProfile();
  const weeklyRules = getWeeklyPacingRules();

  return `
    <div class="daily-queue__footer">
      <p>${sessionCompletedToday ? "Has ganado 30 XP por cerrar la sesión de hoy." : totalSteps && doneSteps >= totalSteps ? "Al marcar todo, ganas 30 XP extra hoy." : "Cierra la sesión diaria para ganar 30 XP extra."}</p>
      <div class="daily-queue__weekly">
        <strong>${weeklyProfile.label}</strong>
        <p>${weeklyProfile.description}</p>
        <p class="daily-queue__weekly-tip">${weeklyProfile.tip}</p>
        <div class="daily-queue__weekly-rules">
          <span>${weeklyRules.maxNewTheory} teoria nueva</span>
          <span>${weeklyRules.maxPractice} practica foco</span>
          <span>${weeklyRules.maxReview} repaso foco</span>
          <span>${weeklyRules.allowAdvanced ? "Avanzado permitido" : "Avanzado mejor no"}</span>
        </div>
      </div>
      ${
        history.length
          ? `<div class="daily-queue__history">
              <strong>Ultimas sesiones</strong>
              <div class="daily-queue__history-list">
                ${history.map((day) => `<span>${escapeHtml(day)}</span>`).join("")}
              </div>
            </div>`
          : ""
      }
    </div>
  `;
}

function getWeeklyStudyProfile() {
  const { closedCount, saturation } = getWeeklyContext();

  if (saturation.blockNewTheory && closedCount <= 2) {
    return {
      label: "Semana de contencion",
      description: "Conviene reducir frentes abiertos, cerrar práctica pendiente y recuperar ritmo antes de ampliar temario.",
      tip: "No abras lecciones nuevas avanzadas. Prioriza una práctica y un repaso por sesión.",
    };
  }

  if (saturation.blockNewTheory) {
    return {
      label: "Semana de limpieza",
      description: "Vas estudiando, pero ahora mismo la prioridad semanal es vaciar deuda práctica y repasos abiertos.",
      tip: "Mantén teoría nueva al mínimo hasta bajar la deuda de tests y repasos.",
    };
  }

  if (closedCount >= 5) {
    return {
      label: "Semana fuerte",
      description: "La constancia está alta. Puedes sostener avance nuevo sin perder demasiada calidad de práctica.",
      tip: "Puedes permitirte una sesión de desbloqueo, pero cierra práctica el mismo día.",
    };
  }

  if (closedCount >= 3) {
    return {
      label: "Semana estable",
      description: "Hay buena continuidad. Mantén sesiones cortas pero cerradas para seguir sumando sin saturarte.",
      tip: "Apunta a una lección principal y una validación práctica por sesión.",
    };
  }

  return {
    label: "Semana de reenganche",
    description: "La prioridad no es volumen, sino recuperar ritmo con pasos pequeños y sesiones completas.",
    tip: "Evita abrir varios frentes. Cierra una sola tarea útil cada día.",
  };
}

function getRecentDateKeys(days) {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return date.toISOString().slice(0, 10);
  });
}

function getWeeklyPacingRules() {
  const profile = getWeeklyStudyProfile();

  if (profile.label === "Semana de contencion") {
    return {
      maxNewTheory: 0,
      maxPractice: 1,
      maxReview: 2,
      allowAdvanced: false,
    };
  }

  if (profile.label === "Semana de limpieza") {
    return {
      maxNewTheory: 0,
      maxPractice: 2,
      maxReview: 1,
      allowAdvanced: false,
    };
  }

  if (profile.label === "Semana fuerte") {
    return {
      maxNewTheory: 1,
      maxPractice: 1,
      maxReview: 1,
      allowAdvanced: true,
    };
  }

  if (profile.label === "Semana estable") {
    return {
      maxNewTheory: 1,
      maxPractice: 1,
      maxReview: 1,
      allowAdvanced: true,
    };
  }

  return {
    maxNewTheory: 1,
    maxPractice: 1,
    maxReview: 1,
    allowAdvanced: false,
  };
}

function getWeeklyContext() {
  const lastSevenDays = getRecentDateKeys(7);
  const closedCount = lastSevenDays.filter((day) => state.completedDailySessions.includes(day)).length;
  const pendingExercises = allLessons()
    .filter((lesson) => exercises[lesson.id] && !state.solvedExercises.includes(lesson.id))
    .filter((lesson) => state.readLessons.includes(lesson.id) || state.practiceDone.includes(lesson.id));
  const failedLessons = state.failedChallenges.filter((lessonId) => !state.solvedChallenges.includes(lessonId));
  const saturation = getDailySaturationState(pendingExercises, failedLessons);

  return {
    closedCount,
    pendingExercises,
    failedLessons,
    saturation,
  };
}
