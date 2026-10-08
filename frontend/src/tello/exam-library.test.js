import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { QUESTIONS } from "./questions";
import EXAMS from "./exam-library.json";
import RESOURCES from "./study-resources.json";
import { filterQuestions } from "./question-filters";
import { createSimulation } from "./engine";
const expected = {
  "enem-2023-d1": 90,
  "enem-2023-d2": 89,
  "enem-2024-d1": 90,
  "enem-2024-d2": 89,
  "enem-2025-d1": 90,
  "enem-2025-d2": 87,
  "pmpe-2009-soldado": 48,
  "pmpe-2014-oficial": 92,
  "pmpe-2016-soldado": 57,
  "pmpe-2018-soldado": 56,
  "pmpe-2018-oficial": 66,
};
const asset = (path) => new URL(`../../public${path}`, import.meta.url);
describe("official exam integrity", () => {
  it("exceeds 550 unique playable questions per track without cancellations or duplicate colors", () => {
    for (const track of ["enem", "pmpe"]) {
      const bank = QUESTIONS.filter((q) => q.track === track);
      expect(bank.length).toBeGreaterThan(550);
      expect(new Set(bank.map((q) => q.id)).size).toBe(bank.length);
    }
    for (const exam of EXAMS) {
      const bank = QUESTIONS.filter((q) => q.examId === exam.id);
      expect(bank.length).toBe(expected[exam.id]);
      expect(bank.length + exam.excludedNumbers.length).toBe(exam.questionCount);
      expect(new Set(bank.map((q) => q.questionNumber)).size).toBe(bank.length);
      for (const q of bank) {
        expect(exam.excludedNumbers).not.toContain(q.questionNumber);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.location.page).toBeGreaterThan(1);
        expect(q.location.page).toBeLessThanOrEqual(exam.pageCount);
        expect(q.location.x).toBeGreaterThanOrEqual(0);
        expect(q.location.y).toBeGreaterThan(0);
        expect(q.location.y).toBeLessThan(1);
        expect(q.searchText.length).toBeGreaterThan(20);
        expect(q.difficulty).toBe(0);
      }
    }
  });
  it("uses the exact definitive booklet key and English option", () => {
    const letter = (id, n) =>
      "ABCDE"[QUESTIONS.find((q) => q.id === `${id}-q${String(n).padStart(3, "0")}`).answer];
    expect(letter("pmpe-2016-soldado", 1)).toBe("E");
    expect(letter("pmpe-2016-soldado", 60)).toBe("A");
    expect(letter("pmpe-2018-oficial", 1)).toBe("C");
    expect(letter("pmpe-2018-oficial", 70)).toBe("B");
    expect(letter("pmpe-2014-oficial", 17)).toBe("D");
    expect(letter("pmpe-2009-soldado", 50)).toBe("A");
    expect(letter("enem-2025-d1", 1)).toBe("D");
    expect(letter("enem-2025-d2", 180)).toBe("D");
    expect(EXAMS.find((e) => e.id === "enem-2025-d2").excludedNumbers).toEqual([123, 132, 174]);
  });
  it("ships originals and transcripts matching recorded fingerprints", () => {
    for (const exam of EXAMS) {
      for (const [kind, path] of [
        ["prova", exam.examPath],
        ["gabarito", exam.answerPath],
      ]) {
        const bytes = readFileSync(asset(path));
        expect(bytes.subarray(0, 4).toString()).toBe("%PDF");
        expect(createHash("sha256").update(bytes).digest("hex")).toBe(exam.files[kind].sha256);
      }
      expect(existsSync(asset(exam.studyPath))).toBe(true);
      expect(JSON.parse(readFileSync(asset(`/exams/${exam.id}-text.json`), "utf8"))).toHaveLength(
        exam.pageCount,
      );
    }
  });
});
describe("study library filters", () => {
  it("separates origin, subject, booklet and rank including simulations", () => {
    const selected = filterQuestions(QUESTIONS, {
      examId: "enem-2024-d2",
      subject: "matematica",
      origin: "official",
    });
    expect(selected).toHaveLength(45);
    expect(selected.every((q) => q.questionNumber >= 136)).toBe(true);
    expect(filterQuestions(selected, { origin: "authored" })).toEqual([]);
    const soldier = filterQuestions(
      QUESTIONS.filter((q) => q.track === "pmpe"),
      { role: "Soldado" },
    );
    expect(soldier.every((q) => q.role !== "Oficial")).toBe(true);
    expect(createSimulation(soldier, 30, () => 0.3).every((q) => q.role !== "Oficial")).toBe(true);
  });
  it("searches original text without accents and handles reviewed errors", () => {
    const q = QUESTIONS.find((q) => q.id === "pmpe-2016-soldado-q001");
    expect(filterQuestions([q], { query: "partido politico" })).toHaveLength(1);
    expect(
      filterQuestions([q], { status: "wrong", attempts: { [q.id]: { correct: false } } }),
    ).toHaveLength(1);
    expect(
      filterQuestions([q], { status: "wrong", attempts: { [q.id]: { correct: true } } }),
    ).toHaveLength(0);
  });
  it("ships distinct curated books and video lessons", () => {
    expect(RESOURCES.filter((r) => r.kind === "Apostila")).toHaveLength(20);
    expect(RESOURCES.filter((r) => r.kind === "Videoaula")).toHaveLength(16);
    expect(new Set(RESOURCES.map((r) => r.id)).size).toBe(RESOURCES.length);
    for (const r of RESOURCES) expect(r.url.startsWith("https://")).toBe(true);
  });
});
