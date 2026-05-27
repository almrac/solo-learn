// Arranque y wiring de eventos.
// Este archivo queda deliberadamente fino: escucha interacciones y delega en
// el núcleo, el render y los módulos de apoyo.
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

elements.practiceTopicFilter.addEventListener("change", () => {
  state.practiceTopicFilter = elements.practiceTopicFilter.value || "all";
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
  state.practiceTopicFilter = "all";
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

elements.studyStruggles.addEventListener("click", (event) => {
  const button = event.target.closest("[data-struggle-type]");
  if (button) {
    recordLessonStruggle(state.activeLessonId, button.dataset.struggleType, "manual");
    persist();
    render();
    return;
  }

  const actionButton = event.target.closest("[data-study-action]");
  if (!actionButton) return;

  runStudyCloseoutAction(actionButton.dataset.studyAction);
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

  if (button.dataset.target === "evolution") {
    const section = elements.studyEvolutionCase.hidden ? elements.studyEvolution : elements.studyEvolutionCase;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (button.dataset.target === "challenge") {
    document.querySelector(".challenge").scrollIntoView({ behavior: "smooth" });
    return;
  }

  document.querySelector(".study").scrollIntoView({ behavior: "smooth" });
});

elements.weeklyMissions.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.target === "daily-queue") {
    elements.dailyQueue.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  saveCurrentNotes();

  if (button.dataset.track && tracks[button.dataset.track]) {
    state.activeTrack = button.dataset.track;
  }

  if (button.dataset.lessonId) {
    openLesson(button.dataset.lessonId);
  }

  persist();
  render();

  if (button.dataset.target === "practice") {
    loadActiveExercise();
    document.querySelector(".runner").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (button.dataset.target === "evolution") {
    const section = elements.studyEvolutionCase.hidden ? elements.studyEvolution : elements.studyEvolutionCase;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (button.dataset.target === "challenge") {
    document.querySelector(".challenge").scrollIntoView({ behavior: "smooth" });
    return;
  }

  document.querySelector(".study").scrollIntoView({ behavior: "smooth", block: "start" });
});

elements.reviewBox.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  saveCurrentNotes();
  openLesson(button.dataset.lessonId);
  persist();
  render();

  if (button.dataset.target === "practice") {
    loadActiveExercise();
    document.querySelector(".runner").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (button.dataset.target === "evolution") {
    const section = elements.studyEvolutionCase.hidden ? elements.studyEvolution : elements.studyEvolutionCase;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (button.dataset.target === "challenge") {
    document.querySelector(".challenge").scrollIntoView({ behavior: "smooth" });
    return;
  }

  document.querySelector(".study").scrollIntoView({ behavior: "smooth", block: "start" });
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
      recordChallengeSuccess(lesson.id);
      recordStudyDay();
    }
    state.failedChallenges = state.failedChallenges.filter((lessonId) => lessonId !== lesson.id);
    relieveLessonStruggle(lesson.id, { type: "error", source: "challenge", amount: 2 });
    setFeedback("Correcto. Has desbloqueado XP extra.", "correct");
  } else {
    if (!state.failedChallenges.includes(lesson.id)) {
      state.failedChallenges.push(lesson.id);
    }
    recordLessonStruggle(lesson.id, "error", "challenge");
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

elements.practiceBankTopics.addEventListener("click", (event) => {
  const button = event.target.closest("[data-practice-topic-pick]");
  if (!button) return;

  state.practiceTopicFilter = button.dataset.practiceTopicPick;
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
