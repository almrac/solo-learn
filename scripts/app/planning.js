// Planning, recommendation, and study-session helpers for scripts/app/main.js.
// Este módulo intenta responder una pregunta concreta:
// "dado el estado real del alumno, ¿qué conviene hacer ahora?".

function recommendNextLesson() {
  const pendingLessons = allLessons().filter((lesson) => !state.completed.includes(lesson.id));
  if (!pendingLessons.length) return null;

  const ranked = pendingLessons
    .map((lesson) => scoreLessonRecommendation(lesson))
    .sort((left, right) => right.score - left.score || left.lesson.xp - right.lesson.xp);

  return ranked[0];
}

function recommendNextSession() {
  const pattern = getLearningDifficultyPattern();
  const struggleLeader = getTrackStruggleLeaders(state.activeTrack)[0];
  const failedLessons = state.failedChallenges
    .filter((lessonId) => !state.solvedChallenges.includes(lessonId))
    .map((lessonId) => findLesson(lessonId))
    .filter(Boolean)
    .sort((left, right) => scoreLessonRecommendation(right).score - scoreLessonRecommendation(left).score);
  const pendingExercises = allLessons()
    .filter((lesson) => exercises[lesson.id] && !state.solvedExercises.includes(lesson.id))
    .filter((lesson) => state.readLessons.includes(lesson.id) || state.practiceDone.includes(lesson.id))
    .sort((left, right) => scoreLessonRecommendation(right).score - scoreLessonRecommendation(left).score);

  if (struggleLeader && struggleLeader.summary.weightedTotal >= 3 && !state.completed.includes(struggleLeader.lesson.id)) {
    const intervention = getStruggleIntervention(struggleLeader);
    return {
      lesson: struggleLeader.lesson,
      kind: intervention.kind,
      target: intervention.target,
      reason: `${intervention.reason}${struggleLeader.summary.recurrenceScore >= 2 ? " Ademas, no parece un tropiezo aislado: esta leccion ya ha recaido varias veces." : ""}`,
    };
  }

  if (pattern?.key === "error" && failedLessons.length) {
    return {
      lesson: failedLessons[0],
      kind: "Repaso",
      target: "study",
      reason: "Ahora mismo el atasco dominante es de error típico. Corregir ese arrastre te dará más retorno que abrir una pieza nueva.",
    };
  }

  if (pattern?.key === "logic" && pendingExercises.length) {
    return {
      lesson: pendingExercises[0],
      kind: "Tests",
      target: "practice",
      reason: "Ahora mismo predomina deuda de lógica. Conviene cerrar una práctica ya empezada y validar comportamiento.",
    };
  }

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

function getLearningDifficultyPattern() {
  const struggleCounts = getTrackStruggleCounts(state.activeTrack);
  const conceptDebt = allLessons()
    .filter((lesson) => getTrackIdByLesson(lesson.id) === state.activeTrack)
    .filter((lesson) => !state.readLessons.includes(lesson.id) && !state.completed.includes(lesson.id))
    .length;
  const logicDebt = allLessons()
    .filter((lesson) => getTrackIdByLesson(lesson.id) === state.activeTrack)
    .filter((lesson) => state.readLessons.includes(lesson.id) && !state.practiceDone.includes(lesson.id) && !state.solvedExercises.includes(lesson.id))
    .length;
  const errorDebt = state.failedChallenges
    .filter((lessonId) => !state.solvedChallenges.includes(lessonId))
    .map((lessonId) => findLesson(lessonId))
    .filter((lesson) => lesson && getTrackIdByLesson(lesson.id) === state.activeTrack)
    .length;
  const transferDebt = Object.entries(evolutionBriefs)
    .filter(([lessonId]) => getTrackIdByLesson(lessonId) === state.activeTrack)
    .filter(([lessonId, evolution]) => isLessonCovered(evolution.fromLessonId) && !isLessonCovered(lessonId))
    .length;

  const candidates = [
    { key: "concept", label: "deuda conceptual", count: conceptDebt + struggleCounts.concept * 3 },
    { key: "logic", label: "deuda de logica", count: logicDebt * 2 + struggleCounts.logic * 4 },
    { key: "error", label: "arrastre de error tipico", count: errorDebt * 3 + struggleCounts.error * 4 },
    { key: "transfer", label: "transferencia pendiente", count: transferDebt * 2 + struggleCounts.transfer * 3 },
  ].sort((left, right) => right.count - left.count);

  return candidates[0]?.count ? candidates[0] : null;
}

function renderDifficultyPatternNotice(pattern) {
  if (!pattern) return "";
  const leader = getTrackStruggleLeaders(state.activeTrack).find((entry) => entry.summary.topKey === pattern.key);

  return `
    <div class="daily-queue__notice daily-queue__notice--focus">
      <strong>Foco mental dominante: ${escapeHtml(pattern.label)}.</strong>
      <p>La recomendación intenta reducir primero ese tipo de atasco.${leader ? ` Ahora mismo se concentra sobre todo en ${escapeHtml(leader.lesson.title)}${leader.summary.topSourceLabel ? `, especialmente en ${escapeHtml(leader.summary.topSourceLabel.toLowerCase())}` : ""}.` : ""}</p>
    </div>
  `;
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
  const struggleLeader = getTrackStruggleLeaders(state.activeTrack)[0];
  const reviewEntries = getPendingReviewEntries(state.activeTrack);

  const addItem = (lesson, kind, reason, target = "study", priority = 0, focusKey = null) => {
    if (!lesson || seen.has(lesson.id)) return;
    seen.add(lesson.id);
    items.push({
      lesson,
      kind,
      reason,
      target,
      priority,
      focus: getLearningFocus(lesson, kind, focusKey),
    });
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

  const saturation = getDailySaturationState(pendingExercises, failedLessons, reviewEntries);
  const sessionMode = determineDailySessionMode({
    recommendation,
    evolutionBaseLessons,
    readyEvolutionTargets,
    pendingExercises,
    failedLessons,
    saturation,
  });

  if (struggleLeader && struggleLeader.summary.weightedTotal >= 3 && !state.completed.includes(struggleLeader.lesson.id)) {
    const intervention = getStruggleIntervention(struggleLeader);
    addItem(
      struggleLeader.lesson,
      intervention.kind,
      `${intervention.shortReason}${struggleLeader.summary.recurrenceScore >= 2 ? " Conviene estabilizarla, no solo salir del paso." : ""}`,
      intervention.target,
      struggleLeader.summary.recurrenceScore >= 2 ? 36 : 32,
      intervention.focusKey,
    );
  }

  if (sessionMode === "review") {
    reviewEntries.slice(0, 2).forEach((entry) => {
      const route = getReviewEntryRoute(entry);
      addItem(
        entry.lesson,
        route.target === "practice" ? "Tests" : route.target === "evolution" ? "Escalada" : "Repaso",
        `Deuda prioritaria de repaso: ${entry.reasons.join(", ").toLowerCase()}. Conviene cerrarla antes de abrir teoría nueva.`,
        route.target,
        route.target === "practice" ? 31 : 30,
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
    reviewEntries.slice(0, 1).forEach((entry) => {
      const route = getReviewEntryRoute(entry);
      addItem(
        entry.lesson,
        route.target === "practice" ? "Tests" : route.target === "evolution" ? "Escalada" : "Repaso",
        `Revisar ${entry.reasons.join(", ").toLowerCase()} evita arrastrar ese bloqueo a la siguiente fase.`,
        route.target,
        route.target === "practice" ? 12 : 10,
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
  reviewEntries.slice(0, 2).forEach((entry) => {
    const route = getReviewEntryRoute(entry);
    addItem(
      entry.lesson,
      route.target === "practice" ? "Tests" : route.target === "evolution" ? "Escalada" : "Repaso",
      `Un repaso corto de ${entry.reasons.join(", ").toLowerCase()} evita que el bloqueo se convierta en hábito.`,
      route.target,
      route.target === "practice" ? 12 : 10,
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

function getDailySaturationState(pendingExercises, failedLessons, reviewEntries = []) {
  const openPracticeDebt = pendingExercises.length;
  const reviewDebt = Math.max(failedLessons.length, reviewEntries.length);
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
  const reviewEntries = getPendingReviewEntries(state.activeTrack);
  const saturation = getDailySaturationState(pendingExercises, failedLessons, reviewEntries);
  const solvedChallengesCount = getWeeklySolvedChallengesCount();

  return {
    closedCount,
    lastSevenDays,
    pendingExercises,
    failedLessons,
    reviewEntries,
    saturation,
    solvedChallengesCount,
  };
}

// Las misiones semanales no son un sistema paralelo de progreso:
// reutilizan señales que ya existen en la app para convertirlas
// en metas visibles y accionables dentro del sidebar.
function hasTrackActivityInWindow(trackId, dateKeys) {
  const lastActivity = state.lastTrackActivity[trackId];
  return typeof lastActivity === "string" && dateKeys.includes(lastActivity);
}

function findNextTrackLesson(trackId) {
  const candidate = tracks[trackId].lessons
    .filter((lesson) => !state.completed.includes(lesson.id))
    .sort((left, right) => left.xp - right.xp)[0];

  return candidate ?? tracks[trackId].lessons[0] ?? null;
}

function getClosestOpenPhase() {
  return studyPlan
    .map((phase) => {
      const completedCount = phase.lessonIds.filter((lessonId) => state.completed.includes(lessonId)).length;
      const pendingLessonIds = phase.lessonIds.filter((lessonId) => !state.completed.includes(lessonId));

      return {
        ...phase,
        completedCount,
        pendingCount: pendingLessonIds.length,
        pendingLessonId: pendingLessonIds[0] ?? "",
      };
    })
    .filter((phase) => phase.pendingCount > 0)
    .sort((left, right) => left.pendingCount - right.pendingCount || left.lessonIds.length - right.lessonIds.length)[0] ?? null;
}

function buildWeeklyMissions() {
  const context = getWeeklyContext();
  const activeTrack = state.activeTrack;
  const closedTarget = context.closedCount >= 3 ? 3 : 3;
  const solvedChallengesTarget = 2;
  const firstPendingExercise = context.pendingExercises[0] ?? null;
  const firstReviewEntry = context.reviewEntries[0] ?? null;
  const firstReviewRoute = firstReviewEntry ? getReviewEntryRoute(firstReviewEntry) : null;
  const bothTracksTouched =
    hasTrackActivityInWindow("java", context.lastSevenDays) &&
    hasTrackActivityInWindow("javascript", context.lastSevenDays);
  const missingTrackId = !hasTrackActivityInWindow("java", context.lastSevenDays)
    ? "java"
    : !hasTrackActivityInWindow("javascript", context.lastSevenDays)
      ? "javascript"
      : "";
  const crossTrackLesson = missingTrackId ? findNextTrackLesson(missingTrackId) : null;
  const closestPhase = getClosestOpenPhase();
  const closestPhaseLesson = closestPhase?.pendingLessonId ? findLesson(closestPhase.pendingLessonId) : null;

  return [
    {
      title: "Cerrar 3 sesiones",
      status: context.closedCount >= closedTarget ? "Hecha" : "En curso",
      metric: `${context.closedCount}/${closedTarget} sesiones esta semana`,
      tone: context.closedCount >= closedTarget ? "done" : "progress",
      cta: context.closedCount >= closedTarget
        ? null
        : {
            label: "Abrir plan",
            target: "daily-queue",
          },
    },
    {
      title: "Resolver 2 retos",
      status: context.solvedChallengesCount >= solvedChallengesTarget ? "Hecha" : "En curso",
      metric: `${context.solvedChallengesCount}/${solvedChallengesTarget} retos resueltos esta semana`,
      tone: context.solvedChallengesCount >= solvedChallengesTarget ? "done" : "progress",
      cta: context.solvedChallengesCount >= solvedChallengesTarget
        ? null
        : {
            label: "Abrir reto",
            lessonId: state.activeLessonId,
            target: "challenge",
          },
    },
    {
      title: `Bajar práctica abierta en ${tracks[activeTrack].label}`,
      status: context.pendingExercises.length <= 2 ? "Controlada" : "Pendiente",
      metric: `${context.pendingExercises.length} prácticas abiertas`,
      tone: context.pendingExercises.length <= 2 ? "done" : "warning",
      cta: firstPendingExercise
        ? {
            label: "Cerrar tests",
            lessonId: firstPendingExercise.id,
            target: "practice",
          }
        : null,
    },
    {
      title: `Limpiar repaso en ${tracks[activeTrack].label}`,
      status: context.reviewEntries.length <= 1 ? "Controlado" : "Pendiente",
      metric: `${context.reviewEntries.length} frentes de repaso`,
      tone: context.reviewEntries.length <= 1 ? "done" : "warning",
      cta: firstReviewEntry && firstReviewRoute
        ? {
            label: firstReviewRoute.target === "practice"
              ? "Abrir práctica"
              : firstReviewRoute.target === "challenge"
                ? "Abrir reto"
                : firstReviewRoute.target === "evolution"
                  ? "Ver escalada"
                  : "Abrir lección",
            lessonId: firstReviewEntry.lesson.id,
            target: firstReviewRoute.target,
          }
        : null,
    },
    {
      title: "Tocar ambos lenguajes",
      status: bothTracksTouched ? "Hecha" : "En curso",
      metric: `${Number(hasTrackActivityInWindow("java", context.lastSevenDays)) + Number(hasTrackActivityInWindow("javascript", context.lastSevenDays))}/2 lenguajes esta semana`,
      tone: bothTracksTouched ? "done" : "progress",
      cta: !bothTracksTouched && crossTrackLesson
        ? {
            label: `Abrir ${tracks[missingTrackId].label}`,
            lessonId: crossTrackLesson.id,
            target: "study",
            trackId: missingTrackId,
          }
        : null,
    },
    {
      title: "Cerrar una fase del roadmap",
      status: !closestPhase ? "Hecha" : closestPhase.pendingCount <= 2 ? "Cerca" : "En curso",
      metric: !closestPhase
        ? "Todas las fases ya están cerradas"
        : `${closestPhase.title}: ${closestPhase.completedCount}/${closestPhase.lessonIds.length} lecciones · ${closestPhase.pendingCount} pendientes`,
      tone: !closestPhase ? "done" : closestPhase.pendingCount <= 2 ? "progress" : "warning",
      cta: closestPhaseLesson
        ? {
            label: `Abrir ${closestPhase.title}`,
            lessonId: closestPhaseLesson.id,
            target: "study",
            trackId: getTrackIdByLesson(closestPhaseLesson.id),
          }
        : null,
    },
  ];
}
