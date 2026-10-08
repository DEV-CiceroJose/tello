export const normalizeSearch = (value = "") =>
  value
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
export function filterQuestions(
  questions,
  {
    subject = "all",
    lessonId = "all",
    difficulty = "all",
    origin = "all",
    role = "all",
    examId = "all",
    status = "all",
    query = "",
    attempts = {},
  } = {},
) {
  const term = normalizeSearch(query.trim());
  return questions.filter(
    (q) =>
      (subject === "all" || q.subject === subject) &&
      (lessonId === "all" || q.lessonId === lessonId) &&
      (difficulty === "all" || q.difficulty === Number(difficulty)) &&
      (origin === "all" || (q.origin === "official" ? "official" : "authored") === origin) &&
      (role === "all" || (q.role || "Soldado") === role) &&
      (examId === "all" || q.examId === examId) &&
      (status === "all" ||
        (status === "new" && !attempts[q.id]) ||
        (status === "wrong" && attempts[q.id] && !attempts[q.id].correct)) &&
      normalizeSearch(`${q.stem} ${q.searchText || ""} ${q.source}`).includes(term),
  );
}
