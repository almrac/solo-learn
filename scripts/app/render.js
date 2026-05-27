// Render principal de la interfaz.
// Aquí se transforma el estado actual en HTML visible.
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
  renderWeeklyMissions();
  renderHistoryPanel();
  renderReviewBox();

  elements.tabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.track === state.activeTrack);
  });
  elements.filters.forEach((filter) => {
    filter.classList.toggle("is-active", filter.dataset.filter === state.filter);
  });
  elements.learningAreaFilter.value = state.learningAreaFilter;
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
  // Esta llamada alimenta el easter egg que explica cómo se relaciona
  // el frontend real con la ruta de aprendizaje de JavaScript.
  renderBlueprint();
}

function renderActiveTrack(track) {
  const effectiveArea = state.learningAreaFilter === "all"
    ? getTrackLearningArea(state.activeTrack)
    : state.learningAreaFilter;
  const learningAreaLabel = effectiveArea === "frontend" ? "Frontend" : "Backend";
  elements.activeTrack.innerHTML = `
    <p class="eyebrow">Ruta activa</p>
    <strong class="language-mark language-mark--${state.activeTrack}">${track.label}</strong>
    <span>${track.title}</span>
    <small>Aprendizaje: ${learningAreaLabel}</small>
  `;
}

function renderTrackProgress() {
  elements.trackProgress.innerHTML = Object.entries(tracks)
    .map(([trackId, track]) => {
      const snapshot = getTrackProgressSnapshot(trackId);
      const topics = getTrackTopicProgress(trackId);
      const sessions = getTrackSessionSnapshot(trackId);
      const lastSession = state.lastTrackActivity[trackId];
      const completed = snapshot.completed;
      const total = snapshot.total;
      const progress = Math.round((completed / total) * 100);

      return `
        <div class="track-progress-row">
          <div>
            <span>${track.label}</span>
            <strong>${completed}/${total}</strong>
          </div>
          <div class="mini-progress"><span style="width: ${progress}%"></span></div>
          <p class="track-progress-row__meta">
            Teoría ${snapshot.read} · Práctica ${snapshot.practice} · Tests ${snapshot.validated}
          </p>
          <div class="track-progress-topics">
            ${topics.length
              ? topics
                  .map(
                    (topic) => `
                      <span>
                        <strong>${escapeHtml(topic.family)}</strong>
                        ${topic.done}/${topic.total}
                      </span>
                    `,
                  )
                  .join("")
              : "<span>Sin temas tocados aún</span>"}
          </div>
          <p class="track-progress-row__meta">
            7d: ${sessions.weeklyCount} ${sessions.weeklyCount === 1 ? "sesión" : "sesiones"}
            ${sessions.recent.length
              ? `· Recientes: ${escapeHtml(sessions.recent.map((date) => formatStudyDate(date)).join(", "))}`
              : "· Sin histórico reciente"}
          </p>
          <p class="track-progress-row__meta">
            Última sesión: ${escapeHtml(formatStudyDate(lastSession))}
          </p>
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
  const pattern = getLearningDifficultyPattern();
  const lastSession = state.lastTrackActivity[state.activeTrack];
  if (!recommendation) {
    elements.nextSession.innerHTML = `
      <p class="eyebrow">Siguiente sesión</p>
      <h3>Ruta completada</h3>
      <p><strong>Última sesión ${tracks[state.activeTrack].label}:</strong> ${escapeHtml(formatStudyDate(lastSession))}.</p>
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
    <p><strong>Última sesión ${tracks[state.activeTrack].label}:</strong> ${escapeHtml(formatStudyDate(lastSession))}.</p>
    ${pattern ? `<p><strong>Foco actual:</strong> ${escapeHtml(pattern.label)}.</p>` : ""}
    <p><strong>${recommendation.kind}:</strong> ${escapeHtml(recommendation.reason)}</p>
    <button type="button" data-lesson-id="${nextLesson.id}" data-target="${recommendation.target}">${recommendation.target === "practice" ? "Abrir práctica" : "Abrir lección"}</button>
  `;
}

function renderReviewBox() {
  const pending = getPendingReviewEntries(state.activeTrack);
  if (!pending.length) {
    elements.reviewBox.innerHTML = `
      <p class="eyebrow">Repaso</p>
      <h3>Sin errores pendientes</h3>
      <p>No hay retos fallados, tests abiertos ni atascos fuertes en ${tracks[state.activeTrack].label}.</p>
    `;
    return;
  }

  const challengeCount = pending.filter((entry) => entry.reasons.includes("Reto")).length;
  const testCount = pending.filter((entry) => entry.reasons.includes("Tests")).length;
  const struggleCount = pending.filter((entry) => entry.reasons.includes("Atasco")).length;

  elements.reviewBox.innerHTML = `
    <p class="eyebrow">Repaso pendiente</p>
    <h3>${pending.length} ${pending.length === 1 ? "frente" : "frentes"} por revisar</h3>
    <p>Retos ${challengeCount} · Tests ${testCount} · Atascos ${struggleCount}</p>
    ${pending
      .slice(0, 3)
      .map((entry) => {
        const reasonLabel = entry.reasons.join(" · ");
        const route = getReviewEntryRoute(entry);
        return `
          <button type="button" data-lesson-id="${entry.lesson.id}" data-target="${route.target}">
            ${escapeHtml(entry.lesson.title)}
            <small>${escapeHtml(reasonLabel)} · ${escapeHtml(route.hint)}</small>
          </button>
        `;
      })
      .join("")}
  `;
}

function renderWeeklyMissions() {
  const missions = buildWeeklyMissions();

  elements.weeklyMissions.innerHTML = `
    <p class="eyebrow">Misiones semanales</p>
    <h3>${missions.filter((mission) => mission.tone === "done").length}/${missions.length} en buen estado</h3>
    ${missions
      .map(
        (mission) => `
          <article class="weekly-missions__item">
            <div class="weekly-missions__top">
              <strong>${escapeHtml(mission.title)}</strong>
              <span class="weekly-missions__badge weekly-missions__badge--${mission.tone}">${escapeHtml(mission.status)}</span>
            </div>
            <p>${escapeHtml(mission.metric)}</p>
            ${mission.detail ? `<p>${escapeHtml(mission.detail)}</p>` : ""}
            ${mission.cta
              ? `
                <button
                  type="button"
                  data-target="${mission.cta.target}"
                  ${mission.cta.lessonId ? `data-lesson-id="${mission.cta.lessonId}"` : ""}
                  ${mission.cta.trackId ? `data-track="${mission.cta.trackId}"` : ""}
                >
                  ${escapeHtml(mission.cta.label)}
                </button>
              `
              : ""}
          </article>
        `,
      )
      .join("")}
  `;
}

function renderHistoryPanel() {
  const history = getHistorySnapshot(7);

  elements.historyPanel.innerHTML = `
    <p class="eyebrow">Historial reciente</p>
    <h3>${history.studiedDays.length}/7 días con actividad</h3>
    <p>${history.closedDays.length} cierres de sesión · ~${history.approxMinutes} min.</p>
    <p>${history.solvedChallengesCount} retos · ${history.solvedExercisesCount} tests validados</p>
    <div class="history-panel__week">
      ${history.recentDays
        .map((day) => {
          const studied = history.studiedDays.includes(day);
          const closed = history.closedDays.includes(day);
          return `
            <span class="history-panel__day ${studied ? "is-studied" : ""} ${closed ? "is-closed" : ""}">
              ${escapeHtml(formatStudyDate(day))}
            </span>
          `;
        })
        .join("")}
    </div>
    <div class="history-panel__tracks">
      ${history.trackBreakdown
        .map((track) => `
          <div class="history-panel__track">
            <strong class="language-mark language-mark--${track.trackId}">${escapeHtml(track.label)}</strong>
            <span>${track.studiedCount}/7 días</span>
            <small>${track.recent.length ? track.recent.map((day) => formatStudyDate(day)).join(", ") : "Sin actividad reciente"}</small>
          </div>
        `)
        .join("")}
    </div>
    <p>${history.topTopics.length ? `Temas tocados: ${escapeHtml(history.topTopics.join(", "))}.` : "Aún no hay temas suficientes para resumir."}</p>
  `;
}

// La caja de repaso y el plan diario necesitan decidir a dónde enviar al usuario.
// Esta traducción mantiene coherencia entre señales internas
// (reto, tests, transferencia, atasco) y destino real en la interfaz.
function getReviewEntryRoute(entry) {
  if (entry.reasons.includes("Reto")) {
    return {
      target: "challenge",
      hint: "volver al reto",
    };
  }

  if (entry.reasons.includes("Tests")) {
    return {
      target: "practice",
      hint: "cerrar tests",
    };
  }

  const summary = getLessonStruggleSummary(entry.lesson.id);
  if (summary.topKey === "logic" && exercises[entry.lesson.id]) {
    return {
      target: "practice",
      hint: "rehacer práctica",
    };
  }

  if (summary.topKey === "error") {
    return {
      target: "challenge",
      hint: "revisar error típico",
    };
  }

  if (summary.topKey === "transfer") {
    return {
      target: "evolution",
      hint: "retomar escalada",
    };
  }

  return {
    target: "study",
    hint: "releer y cerrar",
  };
}

function renderDailyQueue() {
  const queue = buildDailyQueue();
  const todayKey = getTodayKey();
  const doneToday = state.dailyQueueLog[todayKey] ?? [];
  const sessionCompletedToday = state.completedDailySessions.includes(todayKey);
  const sessionProfile = getDailySessionProfile(queue);
  const pattern = getLearningDifficultyPattern();
  const saturation = getDailySaturationState(
    allLessons()
      .filter((lesson) => exercises[lesson.id] && !state.solvedExercises.includes(lesson.id))
      .filter((lesson) => state.readLessons.includes(lesson.id) || state.practiceDone.includes(lesson.id)),
    state.failedChallenges
      .filter((lessonId) => !state.solvedChallenges.includes(lessonId))
      .map((lessonId) => findLesson(lessonId))
      .filter(Boolean),
    getPendingReviewEntries(state.activeTrack),
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
    ${renderDifficultyPatternNotice(pattern)}
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
              <span class="daily-queue__focus">${item.focus}</span>
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
      const visibleLessonIds = phase.lessonIds.filter((lessonId) => matchesLearningAreaFilter(lessonId));
      if (!visibleLessonIds.length) {
        return "";
      }
      const completedInPhase = visibleLessonIds.filter((lessonId) => state.completed.includes(lessonId));
      const progress = Math.round((completedInPhase.length / visibleLessonIds.length) * 100);

      return `
        <article class="roadmap-card">
          <div class="roadmap-card__top">
            <span class="badge">${phase.dates}</span>
            <strong>${progress}%</strong>
          </div>
          <h3 class="roadmap-card__title">${phase.title}</h3>
          <p class="roadmap-card__text">${phase.goal}</p>
          <ul class="roadmap-card__list">
            ${visibleLessonIds
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
  const support = learningSupports[lesson.id];
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
  renderStudySupport(support);
  renderStudyStruggles(lesson, support);
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

function renderStudySupport(support) {
  if (!support) {
    elements.studySupport.innerHTML = "";
    elements.studySupport.hidden = true;
    return;
  }

  elements.studySupport.hidden = false;
  elements.studySupport.innerHTML = `
    <article class="study-support__card">
      <strong>Idea clave</strong>
      <p>${escapeHtml(support.concept)}</p>
    </article>
    <article class="study-support__card">
      <strong>Logica</strong>
      <p>${escapeHtml(support.logic)}</p>
    </article>
    <article class="study-support__card">
      <strong>Mnemotecnia</strong>
      <p>${escapeHtml(support.mnemonic)}</p>
    </article>
    <article class="study-support__card">
      <strong>Error tipico</strong>
      <p>${escapeHtml(support.mistake)}</p>
    </article>
  `;
}

function renderStudyStruggles(lesson, support) {
  const struggleSummary = getLessonStruggleSummary(lesson.id);
  const reinforcement = getLessonReinforcementPlan(lesson);
  const closeout = getLessonCloseoutRecommendation(lesson, struggleSummary);
  const closeoutActions = getLessonCloseoutActions(lesson, struggleSummary);
  const closeoutState = getLessonCloseoutState(lesson.id);
  const closeoutPreference = getLessonCloseoutPreference(lesson.id);
  const buttons = [
    { key: "concept", label: "Concepto" },
    { key: "logic", label: "Logica" },
    { key: "error", label: "Error tipico" },
    { key: "transfer", label: "Transferencia" },
  ];

  elements.studyStruggles.innerHTML = `
    <div class="study-struggles__header">
      <div>
        <strong>Si te atascas, márcalo aquí</strong>
        <p>${struggleSummary.total > 0
          ? `Historial de esta lección: ${escapeHtml(struggleSummary.label)}.`
          : "Esto ayuda a que la app recomiende mejor qué conviene reforzar."}</p>
        ${struggleSummary.topSourceLabel ? `<p>Origen dominante: ${escapeHtml(struggleSummary.topSourceLabel)}.</p>` : ""}
        ${struggleSummary.recentLabel ? `<p>${escapeHtml(struggleSummary.recentLabel)}.</p>` : ""}
        ${struggleSummary.reliefLabel ? `<p>${escapeHtml(struggleSummary.reliefLabel)}.</p>` : ""}
        ${struggleSummary.recurrenceLabel ? `<p>${escapeHtml(struggleSummary.recurrenceLabel)}.</p>` : ""}
        ${closeout ? `<p><strong>Cierre recomendado:</strong> ${escapeHtml(closeout)}</p>` : ""}
        ${closeoutPreference ? `<p><strong>Mejor cierre observado:</strong> ${escapeHtml(closeoutPreference)}</p>` : ""}
        ${closeoutState ? `<p><strong>Ultimo intento:</strong> ${escapeHtml(closeoutState)}</p>` : ""}
      </div>
      ${support ? `<span class="study-struggles__hint">${escapeHtml(getSupportHint(support, struggleSummary.topKey))}</span>` : ""}
    </div>
    <div class="study-struggles__actions">
      ${buttons
        .map(
          (button) => `
            <button class="study-struggles__button ${struggleSummary.topKey === button.key ? "is-active" : ""}" type="button" data-struggle-type="${button.key}">
              ${button.label}
            </button>
          `,
        )
        .join("")}
    </div>
    ${reinforcement
      ? `
        <div class="study-struggles__plan">
          <strong>${escapeHtml(reinforcement.title)}</strong>
          <p>${escapeHtml(reinforcement.summary)}</p>
          <ul>
            ${reinforcement.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}
          </ul>
        </div>
      `
      : ""}
    ${closeoutActions.length
      ? `
        <div class="study-struggles__quick-actions">
          ${closeoutActions
            .map(
              (action) => `
                <button type="button" class="study-struggles__quick-button" data-study-action="${action.id}">
                  ${escapeHtml(action.label)}${action.isPreferred ? " · mejor" : ""}
                </button>
              `,
            )
            .join("")}
        </div>
      `
      : ""}
    ${renderLessonStruggleBreakdown(struggleSummary)}
  `;
}

function renderLessonStruggleBreakdown(summary) {
  if (!summary.total) return "";

  return `
    <div class="study-struggles__breakdown">
      ${summary.entries
        .map(
          (entry) => `
            <span>
              <strong>${escapeHtml(entry.label)}</strong>
              ${entry.count}
            </span>
          `,
        )
        .join("")}
    </div>
    ${summary.sourceEntries.length
      ? `
        <div class="study-struggles__sources">
          ${summary.sourceEntries
            .map(
              (entry) => `
                <span>
                  <strong>${escapeHtml(entry.label)}</strong>
                  ${entry.count}
                </span>
              `,
            )
            .join("")}
        </div>
      `
      : ""}
  `;
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
  const hasProblem =
    problem &&
    typeof problem.prompt === "string" &&
    problem.prompt.trim() &&
    typeof problem.input === "string" &&
    problem.input.trim() &&
    typeof problem.output === "string" &&
    problem.output.trim() &&
    Array.isArray(problem.checklist) &&
    problem.checklist.length > 0;

  if (!hasProblem) {
    elements.studyGuidedProblem.hidden = true;
    elements.studyGuidedPrompt.textContent = "";
    elements.studyGuidedInput.textContent = "";
    elements.studyGuidedOutput.textContent = "";
    elements.studyGuidedChecklist.innerHTML = "";
    elements.studyGuidedStarterBlock.hidden = true;
    elements.studyGuidedStarter.textContent = "";
    elements.studyGuidedChecksBlock.hidden = true;
    elements.studyGuidedChecks.innerHTML = "";
    elements.studyGuidedVariationBlock.hidden = true;
    elements.studyGuidedVariation.textContent = "";
    elements.studyGuidedEdgeCasesBlock.hidden = true;
    elements.studyGuidedEdgeCases.innerHTML = "";
    elements.studyGuidedHintsBlock.hidden = true;
    elements.studyGuidedHints.innerHTML = "";
    elements.studyGuidedMistakesBlock.hidden = true;
    elements.studyGuidedMistakes.innerHTML = "";
    return;
  }

  elements.studyGuidedProblem.hidden = false;
  elements.studyGuidedPrompt.textContent = problem.prompt;
  elements.studyGuidedInput.textContent = problem.input;
  elements.studyGuidedOutput.textContent = problem.output;
  elements.studyGuidedChecklist.innerHTML = problem.checklist
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  if (typeof problem.starterCode === "string" && problem.starterCode.trim()) {
    elements.studyGuidedStarterBlock.hidden = false;
    elements.studyGuidedStarter.textContent = problem.starterCode;
  } else {
    elements.studyGuidedStarterBlock.hidden = true;
    elements.studyGuidedStarter.textContent = "";
  }

  if (Array.isArray(problem.manualChecks) && problem.manualChecks.length > 0) {
    elements.studyGuidedChecksBlock.hidden = false;
    elements.studyGuidedChecks.innerHTML = problem.manualChecks
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
  } else {
    elements.studyGuidedChecksBlock.hidden = true;
    elements.studyGuidedChecks.innerHTML = "";
  }

  if (typeof problem.nextVariation === "string" && problem.nextVariation.trim()) {
    elements.studyGuidedVariationBlock.hidden = false;
    elements.studyGuidedVariation.textContent = problem.nextVariation;
  } else {
    elements.studyGuidedVariationBlock.hidden = true;
    elements.studyGuidedVariation.textContent = "";
  }

  if (Array.isArray(problem.edgeCases) && problem.edgeCases.length > 0) {
    elements.studyGuidedEdgeCasesBlock.hidden = false;
    elements.studyGuidedEdgeCases.innerHTML = problem.edgeCases
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
  } else {
    elements.studyGuidedEdgeCasesBlock.hidden = true;
    elements.studyGuidedEdgeCases.innerHTML = "";
  }

  if (Array.isArray(problem.hints) && problem.hints.length > 0) {
    elements.studyGuidedHintsBlock.hidden = false;
    elements.studyGuidedHints.innerHTML = problem.hints
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
  } else {
    elements.studyGuidedHintsBlock.hidden = true;
    elements.studyGuidedHints.innerHTML = "";
  }

  if (Array.isArray(problem.commonMistakes) && problem.commonMistakes.length > 0) {
    elements.studyGuidedMistakesBlock.hidden = false;
    elements.studyGuidedMistakes.innerHTML = problem.commonMistakes
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
  } else {
    elements.studyGuidedMistakesBlock.hidden = true;
    elements.studyGuidedMistakes.innerHTML = "";
  }
}

function renderProjectBrief(projectBrief) {
  const hasProject =
    projectBrief &&
    typeof projectBrief.summary === "string" &&
    projectBrief.summary.trim() &&
    typeof projectBrief.outcome === "string" &&
    projectBrief.outcome.trim() &&
    Array.isArray(projectBrief.milestones) &&
    projectBrief.milestones.length > 0 &&
    Array.isArray(projectBrief.deliverables) &&
    projectBrief.deliverables.length > 0;

  if (!hasProject) {
    elements.studyProject.hidden = true;
    elements.studyProjectSummary.textContent = "";
    elements.studyProjectOutcome.textContent = "";
    elements.studyProjectMilestones.innerHTML = "";
    elements.studyProjectDeliverables.innerHTML = "";
    elements.studyProjectStarterBlock.hidden = true;
    elements.studyProjectStarter.textContent = "";
    elements.studyProjectValidationBlock.hidden = true;
    elements.studyProjectValidation.innerHTML = "";
    elements.studyProjectSignalsBlock.hidden = true;
    elements.studyProjectSignals.innerHTML = "";
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

  if (typeof projectBrief.starterCode === "string" && projectBrief.starterCode.trim()) {
    elements.studyProjectStarterBlock.hidden = false;
    elements.studyProjectStarter.textContent = projectBrief.starterCode;
  } else {
    elements.studyProjectStarterBlock.hidden = true;
    elements.studyProjectStarter.textContent = "";
  }

  if (Array.isArray(projectBrief.validationChecklist) && projectBrief.validationChecklist.length > 0) {
    elements.studyProjectValidationBlock.hidden = false;
    elements.studyProjectValidation.innerHTML = projectBrief.validationChecklist
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
  } else {
    elements.studyProjectValidationBlock.hidden = true;
    elements.studyProjectValidation.innerHTML = "";
  }

  if (Array.isArray(projectBrief.successSignals) && projectBrief.successSignals.length > 0) {
    elements.studyProjectSignalsBlock.hidden = false;
    elements.studyProjectSignals.innerHTML = projectBrief.successSignals
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
  } else {
    elements.studyProjectSignalsBlock.hidden = true;
    elements.studyProjectSignals.innerHTML = "";
  }
}

function renderEvolutionBrief(evolutionBrief) {
  const hasEvolution =
    evolutionBrief &&
    typeof evolutionBrief.fromTitle === "string" &&
    evolutionBrief.fromTitle.trim() &&
    typeof evolutionBrief.basicVersion === "string" &&
    evolutionBrief.basicVersion.trim() &&
    typeof evolutionBrief.advancedVersion === "string" &&
    evolutionBrief.advancedVersion.trim() &&
    Array.isArray(evolutionBrief.upgrades) &&
    evolutionBrief.upgrades.length > 0 &&
    typeof evolutionBrief.fromLessonId === "string" &&
    evolutionBrief.fromLessonId.trim();

  if (!hasEvolution) {
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
  const hasEvolutionCase =
    evolutionCase &&
    typeof evolutionCase.title === "string" &&
    evolutionCase.title.trim() &&
    typeof evolutionCase.phase === "string" &&
    evolutionCase.phase.trim() &&
    typeof evolutionCase.summary === "string" &&
    evolutionCase.summary.trim() &&
    typeof evolutionCase.baseVersion === "string" &&
    evolutionCase.baseVersion.trim() &&
    typeof evolutionCase.advancedVersion === "string" &&
    evolutionCase.advancedVersion.trim() &&
    Array.isArray(evolutionCase.checklist) &&
    evolutionCase.checklist.length > 0;

  if (!hasEvolutionCase) {
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
  renderPracticeBankTopics(allEntries);
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
          ${entry.topics.map((topic) => `<span class="badge practice-card__topic">${escapeHtml(topic)}</span>`).join("")}
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

function renderPracticeBankTopics(entries) {
  const topics = getPracticeTopicStats(entries);
  if (!topics.length) {
    elements.practiceBankTopics.innerHTML = "";
    return;
  }

  elements.practiceBankTopics.innerHTML = topics
    .map((item) => `
      <button class="practice-topic-pill ${state.practiceTopicFilter === item.topic ? "is-active" : ""} ${item.isPriority ? "is-priority" : ""}" type="button" data-practice-topic-pick="${escapeHtml(item.topic)}">
        <strong>${escapeHtml(item.topic)}</strong>
        <span>${item.done}/${item.total} hechas</span>
        ${item.isPriority ? "<small>Prioridad útil ahora</small>" : ""}
      </button>
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
  const priorityTopic = getPriorityPracticeTopic(entries);
  if (!recommended) {
    elements.practiceBankSpotlight.innerHTML = "";
    return;
  }

  const spotlightTopic = priorityTopic && recommended.topics.includes(priorityTopic.topic)
    ? priorityTopic.topic
    : recommended.topics[0] ?? "";

  elements.practiceBankSpotlight.innerHTML = `
    <article class="practice-spotlight">
      <div class="practice-spotlight__meta">
        <span class="eyebrow">Más útil ahora</span>
        <span class="badge">${escapeHtml(recommended.family)}</span>
        ${spotlightTopic ? `<span class="badge practice-card__topic">${escapeHtml(spotlightTopic)}</span>` : ""}
        <span class="badge">${escapeHtml(recommended.difficulty)}</span>
        ${recommended.hasEvolution ? '<span class="badge practice-card__badge">Escala después</span>' : ""}
        ${recommended.evolutionPhase ? `<span class="badge practice-card__phase">${escapeHtml(recommended.evolutionPhase)}</span>` : ""}
        ${recommended.hasEvolution ? `<span class="badge practice-card__evolution-state">${recommended.evolutionBaseCovered ? "Base cubierta" : "Base pendiente"}</span>` : ""}
        <span class="badge">${escapeHtml(recommended.progressState.label)}</span>
      </div>
      <h3>${escapeHtml(recommended.title)}</h3>
      <p>${escapeHtml(getPracticeSpotlightReason(recommended))}</p>
      ${spotlightTopic
        ? `<p><strong>Tema empujado ahora:</strong> ${escapeHtml(spotlightTopic)}.</p>`
        : ""}
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
  const topics = ["all", ...new Set(entries.flatMap((entry) => entry.topics))];
  const difficulties = ["all", ...new Set(entries.map((entry) => entry.difficulty))];
  const types = ["all", ...new Set(entries.map((entry) => entry.practiceType))];
  const phases = ["all", ...new Set(entries.map((entry) => entry.evolutionPhase).filter(Boolean))];

  elements.practiceFamilyFilter.innerHTML = families
    .map((family) => `<option value="${escapeHtml(family)}">${family === "all" ? "Todas" : escapeHtml(family)}</option>`)
    .join("");
  elements.practiceTopicFilter.innerHTML = topics
    .map((topic) => `<option value="${escapeHtml(topic)}">${topic === "all" ? "Todos" : escapeHtml(topic)}</option>`)
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
  elements.practiceTopicFilter.value = topics.includes(state.practiceTopicFilter)
    ? state.practiceTopicFilter
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
    const learningAreaMatch =
      state.learningAreaFilter === "all" || entry.learningArea === state.learningAreaFilter;
    const familyMatch = state.practiceFamilyFilter === "all" || entry.family === state.practiceFamilyFilter;
    const topicMatch = state.practiceTopicFilter === "all" || entry.topics.includes(state.practiceTopicFilter);
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

    return learningAreaMatch && familyMatch && topicMatch && difficultyMatch && typeMatch && statusMatch && evolutionMatch && phaseMatch;
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
