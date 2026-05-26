const STORAGE_KEY = "solo-learn-progress-v2";
const LEGACY_STORAGE_KEY = "solo-learn-progress-v1";
const { tracks, lessonDetails, studyPlan, exercises, appBlueprint } = window.LEARNING_DATA;

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
  activeLessonId: "java-variables",
  completed: [],
  solvedChallenges: [],
  failedChallenges: [],
  readLessons: [],
  practiceDone: [],
  solvedExercises: [],
  notes: {},
  lastStudyDate: null,
  streak: 0,
  xp: 0,
};

let state = loadState();

// Centralize DOM lookups once; the app is fully rerendered from state.
const elements = {
  xpValue: document.querySelector("#xpValue"),
  levelValue: document.querySelector("#levelValue"),
  completedValue: document.querySelector("#completedValue"),
  streakValue: document.querySelector("#streakValue"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  trackProgress: document.querySelector("#trackProgress"),
  nextSession: document.querySelector("#nextSession"),
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
  closeBlueprintButton: document.querySelector("#closeBlueprintButton"),
  continueButton: document.querySelector("#continueButton"),
  resetButton: document.querySelector("#resetButton"),
  exportButton: document.querySelector("#exportButton"),
  importInput: document.querySelector("#importInput"),
  storageStatus: document.querySelector("#storageStatus"),
};

// Hidden trigger for the app.js learning blueprint panel.
let brandTapCount = 0;
let brandTapTimer = null;

render();

elements.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
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

elements.focusModeButton.addEventListener("click", () => {
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
  renderNextSession();
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
  // The blueprint explains how this app.js maps to the learning path.
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

function renderNextSession() {
  const recommendation = recommendNextLesson();
  const nextLesson = recommendation?.lesson;
  if (!nextLesson) {
    elements.nextSession.innerHTML = `
      <p class="eyebrow">Siguiente sesión</p>
      <h3>Ruta completada</h3>
      <p>Repite retos fallados o empieza un proyecto propio.</p>
    `;
    return;
  }

  const track = tracks[getTrackIdByLesson(nextLesson.id)];
  elements.nextSession.innerHTML = `
    <p class="eyebrow">Siguiente sesión</p>
    <h3>${nextLesson.title}</h3>
    <p>${track.label} · ${nextLesson.level} · ${nextLesson.xp} XP</p>
    <p>${escapeHtml(recommendation.reason)}</p>
    <button type="button" data-lesson-id="${nextLesson.id}">Abrir lección</button>
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

  elements.markReadButton.textContent = isRead ? "Teoría leída" : "Marcar teoría";
  elements.markReadButton.disabled = isRead;
  elements.markPracticeButton.textContent = isPracticed ? "Práctica hecha" : "Marcar práctica";
  elements.markPracticeButton.disabled = isPracticed;
  elements.finishLessonButton.textContent = isCompleted ? "Lección finalizada" : "Finalizar lección";
  elements.finishLessonButton.disabled = isCompleted;
}

function renderStudyProgress(lesson) {
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
      // Replay user-like actions inside the preview and assert against the live DOM.
      for (const action of test.actions ?? []) {
        runDomAction(context.win, context.doc, action);
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
  const evaluator = win.Function("console", `"use strict";\n${code}`);
  const result = evaluator(sandboxConsole);
  if (result && typeof result.then === "function") {
    await result;
  }

  return { output, win, doc };
}

function runDomAction(win, doc, action) {
  if (action.type === "call") {
    const candidate = win[action.name];
    if (typeof candidate !== "function") {
      throw new Error(`No existe la función ${action.name} en el preview.`);
    }
    candidate(...(action.args ?? []));
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

// Resolve whether the user already has the conceptual base to understand a block from app.js.
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

// Recommend the next lesson by project impact, not just by original track order.
function recommendNextLesson() {
  const pendingLessons = allLessons().filter((lesson) => !state.completed.includes(lesson.id));
  if (!pendingLessons.length) return null;

  const ranked = pendingLessons
    .map((lesson) => scoreLessonRecommendation(lesson))
    .sort((left, right) => right.score - left.score || left.lesson.xp - right.lesson.xp);

  return ranked[0];
}

// Score lessons by how many project concepts they unlock and how well they fit current progress.
function scoreLessonRecommendation(lesson) {
  const lessonBlueprints = appBlueprint.filter((item) => item.lessonId === lesson.id);
  const unlockedConcepts = lessonBlueprints.filter((item) => blueprintPrerequisites(item).pending.length === 0).length;
  const blockedConcepts = appBlueprint.filter((item) => (item.prerequisites ?? []).includes(lesson.id));
  const blockedPending = blockedConcepts.filter((item) => blueprintPrerequisites(item).pending.some((entry) => entry.id === lesson.id));
  const sameTrackBonus = getTrackIdByLesson(lesson.id) === state.activeTrack ? 1 : 0;
  const readBonus = state.readLessons.includes(lesson.id) ? 1 : 0;
  const practiceBonus = state.practiceDone.includes(lesson.id) ? 1 : 0;
  const score =
    unlockedConcepts * 5 +
    blockedPending.length * 4 +
    sameTrackBonus * 2 +
    readBonus +
    practiceBonus;

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

  return {
    activeTrack,
    filter,
    lessonSort,
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
