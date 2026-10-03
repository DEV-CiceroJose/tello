import { LESSONS, SUBJECTS } from "./catalog";
export const DAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
export const emptyProgress = () => ({
  version: 1,
  attempts: [],
  completedLessons: [],
  bookmarks: [],
  plan: null,
  essays: {},
  simulations: [],
  activeSimulation: null,
  focusMinutes: 0,
  goalDate: "",
  name: "",
});
export function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function getStats(progress) {
  const attempts = progress.attempts;
  const correct = attempts.filter((a) => a.correct).length;
  const days = [...new Set(attempts.map((a) => dateKey(new Date(a.at))))];
  let streak = 0;
  const cursor = new Date();
  if (!days.includes(dateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (days.includes(dateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return {
    answered: attempts.length,
    correct,
    accuracy: attempts.length ? Math.round((correct / attempts.length) * 100) : 0,
    streak,
    lessons: progress.completedLessons.length,
  };
}
export function latestAttempts(attempts) {
  return Object.fromEntries(attempts.map((a) => [a.questionId, a]));
}
export function generatePlan(
  track,
  { days, minutes, weeks = 4, startDate, priority },
  attempts = [],
) {
  if (!days?.length || days.some((d) => !Number.isInteger(d) || d < 0 || d > 6))
    throw new Error("Escolha pelo menos um dia da semana.");
  if (!Number.isInteger(minutes) || minutes < 20 || minutes > 240)
    throw new Error("Escolha entre 20 e 240 minutos por dia.");
  if (!Number.isInteger(weeks) || weeks < 1 || weeks > 12)
    throw new Error("Escolha de 1 a 12 semanas.");
  const start = new Date(`${startDate}T12:00:00`);
  if (Number.isNaN(start.getTime())) throw new Error("Escolha uma data válida.");
  const topics = LESSONS.filter((l) => l.track === track);
  const mistakes = Object.values(latestAttempts(attempts)).filter((a) => !a.correct);
  topics.sort(
    (a, b) =>
      (b.subject === priority ? 10 : 0) +
      mistakes.filter((m) => m.subject === b.subject).length -
      ((a.subject === priority ? 10 : 0) + mistakes.filter((m) => m.subject === a.subject).length),
  );
  const sessions = [];
  let topicIndex = 0;
  for (let offset = 0; offset < weeks * 7; offset++) {
    const date = new Date(start);
    date.setDate(date.getDate() + offset);
    if (!days.includes(date.getDay())) continue;
    const week = Math.floor(offset / 7);
    const lesson = topics[topicIndex % topics.length];
    const type =
      track === "enem" && topicIndex % 6 === 5
        ? "essay"
        : topicIndex % 4 === 3
          ? "review"
          : topicIndex % 2
            ? "questions"
            : "lesson";
    sessions.push({
      id: `${dateKey(date)}-${topicIndex}`,
      date: dateKey(date),
      week: week + 1,
      lessonId: lesson.id,
      subject: lesson.subject,
      title: type === "essay" ? "Oficina de redação" : lesson.title,
      type,
      minutes,
      completed: false,
    });
    topicIndex++;
  }
  return {
    id: `plan-${Date.now()}`,
    track,
    days,
    minutes,
    weeks,
    startDate,
    priority: priority || "",
    sessions,
  };
}
export function createSimulation(questions, count = 10, random = Math.random) {
  const groups = new Map();
  questions.forEach((q) => groups.set(q.subject, [...(groups.get(q.subject) || []), q]));
  for (const group of groups.values())
    for (let i = group.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [group[i], group[j]] = [group[j], group[i]];
    }
  const result = [];
  while (result.length < Math.min(count, questions.length))
    for (const group of groups.values()) {
      if (group.length && result.length < count) result.push(group.pop());
    }
  return result;
}
export function essayMetrics(text) {
  return {
    words: text.trim() ? text.trim().split(/\s+/u).length : 0,
    paragraphs: text.trim() ? text.trim().split(/\n\s*\n/u).length : 0,
    characters: text.length,
  };
}
export function subjectPerformance(track, attempts) {
  return SUBJECTS.filter((s) => s.track === track).map((s) => {
    const list = attempts.filter((a) => a.subject === s.id);
    return {
      ...s,
      total: list.length,
      accuracy: list.length
        ? Math.round((list.filter((a) => a.correct).length / list.length) * 100)
        : 0,
    };
  });
}
export function normalizeProgress(value) {
  if (!value || value.version !== 1) return emptyProgress();
  const initial = emptyProgress();
  for (const key of ["attempts", "completedLessons", "bookmarks", "simulations"])
    if (Array.isArray(value[key])) initial[key] = value[key];
  if (value.plan && Array.isArray(value.plan.sessions)) initial.plan = value.plan;
  if (
    value.activeSimulation &&
    Array.isArray(value.activeSimulation.questions) &&
    value.activeSimulation.questions.length &&
    Number.isFinite(value.activeSimulation.endsAt)
  )
    initial.activeSimulation = value.activeSimulation;
  if (value.essays && typeof value.essays === "object" && !Array.isArray(value.essays))
    initial.essays = value.essays;
  if (typeof value.name === "string") initial.name = value.name.slice(0, 80);
  if (typeof value.goalDate === "string") initial.goalDate = value.goalDate;
  if (Number.isFinite(value.focusMinutes)) initial.focusMinutes = Math.max(0, value.focusMinutes);
  return initial;
}
