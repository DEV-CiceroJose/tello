import { describe, expect, it, vi, afterEach } from "vitest";
import { LESSONS, SUBJECTS } from "./catalog";
import { QUESTIONS } from "./questions";
import {
  generatePlan,
  emptyProgress,
  getStats,
  createSimulation,
  latestAttempts,
  normalizeProgress,
  essayMetrics,
} from "./engine";
describe("Tello content integrity", () => {
  it("provides distinct, commented questions for every lesson", () => {
    expect(QUESTIONS).toHaveLength(48);
    expect(LESSONS).toHaveLength(24);
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
    for (const lesson of LESSONS) {
      const questions = QUESTIONS.filter((q) => q.lessonId === lesson.id);
      expect(questions).toHaveLength(2);
      expect(lesson.paragraphs.length).toBeGreaterThanOrEqual(3);
      for (const q of questions) {
        expect(q.track).toBe(lesson.track);
        expect(q.options).toHaveLength(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.explanation.length).toBeGreaterThan(50);
      }
    }
  });
  it("covers all ten configured areas", () => {
    expect(new Set(QUESTIONS.map((q) => q.subject)).size).toBe(SUBJECTS.length);
  });
});
describe("Tello plans", () => {
  const config = { days: [1, 3, 5], minutes: 40, weeks: 4, startDate: "2026-10-05" };
  it("schedules exactly on available days with stable daily budget", () => {
    const plan = generatePlan("enem", config);
    expect(plan.sessions).toHaveLength(12);
    expect(new Set(plan.sessions.map((s) => s.id)).size).toBe(12);
    for (const session of plan.sessions) {
      expect(config.days).toContain(new Date(`${session.date}T12:00:00`).getDay());
      expect(session.minutes).toBe(40);
    }
    expect(plan.sessions.some((s) => s.type === "essay")).toBe(true);
  });
  it("never mixes PM-PE and ENEM lessons or assigns ENEM essays to PM-PE", () => {
    const plan = generatePlan("pmpe", config);
    expect(plan.sessions.some((s) => s.type === "essay")).toBe(false);
    expect(
      plan.sessions.every((s) => LESSONS.find((l) => l.id === s.lessonId).track === "pmpe"),
    ).toBe(true);
  });
  it("prioritizes selected subjects and recent wrong answers", () => {
    const p = generatePlan("enem", { ...config, priority: "natureza" }, [
      { questionId: "a", subject: "matematica", correct: false },
    ]);
    expect(p.sessions[0].subject).toBe("natureza");
    const q = generatePlan("enem", config, [
      { questionId: "a", subject: "humanas", correct: false },
    ]);
    expect(q.sessions[0].subject).toBe("humanas");
  });
  it("rejects invalid availability and budgets", () => {
    expect(() => generatePlan("enem", { ...config, days: [] })).toThrow();
    expect(() => generatePlan("enem", { ...config, minutes: 0 })).toThrow();
    expect(() => generatePlan("enem", { ...config, weeks: 0 })).toThrow();
  });
});
describe("Tello practice and progress", () => {
  afterEach(() => vi.useRealTimers());
  it("starts without invented results", () => {
    expect(getStats(emptyProgress())).toEqual({
      answered: 0,
      correct: 0,
      accuracy: 0,
      streak: 0,
      lessons: 0,
    });
  });
  it("uses latest answers in error review and deterministic accuracy", () => {
    const p = emptyProgress();
    p.attempts = [
      { questionId: "q", correct: false, at: "2026-10-02T15:00:00Z" },
      { questionId: "q", correct: true, at: "2026-10-03T15:00:00Z" },
    ];
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-03T18:00:00Z"));
    expect(latestAttempts(p.attempts).q.correct).toBe(true);
    expect(getStats(p)).toMatchObject({ answered: 2, correct: 1, accuracy: 50, streak: 2 });
  });
  it("samples without repetition and balances disciplines", () => {
    const q = QUESTIONS.filter((q) => q.track === "pmpe");
    const sample = createSimulation(q, 10, () => 0.5);
    expect(sample).toHaveLength(10);
    expect(new Set(sample.map((q) => q.id)).size).toBe(10);
    expect(new Set(sample.map((q) => q.subject)).size).toBe(6);
    expect(createSimulation(q, 100)).toHaveLength(24);
  });
  it("counts text without pretending to grade an essay", () => {
    const text = "Uma ideia.\n\nOutro argumento.";
    expect(essayMetrics(text)).toEqual({ words: 4, paragraphs: 2, characters: text.length });
  });
  it("handles missing or malformed top-level cached fields", () => {
    expect(normalizeProgress(null)).toEqual(emptyProgress());
    expect(normalizeProgress({ version: 1, attempts: null, name: 7, focusMinutes: -2 })).toEqual(
      emptyProgress(),
    );
  });
});
