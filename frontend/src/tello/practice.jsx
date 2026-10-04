import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { LESSONS, SUBJECTS, TRACKS } from "./catalog";
import { latestAttempts, createSimulation } from "./engine";
import { Button, Icon, SectionHead, Empty, Picker, Meter } from "./ui";
const difficultyLabels = { 1: "Básico", 2: "Intermediário", 3: "Avançado" };
function attemptFor(q, selected, mode = "practice") {
  return {
    id: crypto.randomUUID(),
    questionId: q.id,
    subject: q.subject,
    selected,
    correct: selected === q.answer,
    at: new Date().toISOString(),
    mode,
  };
}
export function QuestionBank({
  track,
  progress,
  update,
  questions,
  initialSubject,
  initialLesson,
  catalogError,
}) {
  const [subject, setSubject] = useState(initialSubject);
  const [lessonId, setLessonId] = useState(initialLesson);
  const [difficulty, setDifficulty] = useState("all");
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const last = latestAttempts(progress.attempts);
  // Keep the current filter cohort stable after an answer, so feedback never disappears mid-read.
  const [cohort, setCohort] = useState(() => latestAttempts(progress.attempts));
  useEffect(() => {
    setSubject(initialSubject);
    setLessonId(initialLesson);
    setIndex(0);
  }, [initialSubject, initialLesson]);
  const filtered = questions.filter(
    (q) =>
      (subject === "all" || q.subject === subject) &&
      (lessonId === "all" || q.lessonId === lessonId) &&
      (difficulty === "all" || q.difficulty === Number(difficulty)) &&
      (status === "all" ||
        (status === "new" && !cohort[q.id]) ||
        (status === "wrong" && cohort[q.id] && !cohort[q.id].correct)) &&
      q.stem.toLowerCase().includes(query.toLowerCase()),
  );
  const safeIndex = Math.min(index, Math.max(0, filtered.length - 1));
  const question = filtered[safeIndex];
  const change = (setter) => (value) => {
    setter(value);
    setIndex(0);
    setCohort(latestAttempts(progress.attempts));
  };
  return (
    <>
      <SectionHead
        eyebrow={`PRÁTICA · ${TRACKS[track].name}`}
        title="É praticando que se aprende."
        description={`${questions.length} questões autorais comentadas. Entenda o raciocínio por trás de cada resposta.`}
      />
      {catalogError && (
        <div className="notice warning">
          Não foi possível atualizar o catálogo da nuvem. O acervo incluído no Tello continua
          disponível.
        </div>
      )}
      <div className="question-filters">
        <Picker
          label="Disciplina"
          value={subject}
          onChange={(value) => {
            change(setSubject)(value);
            setLessonId("all");
          }}
          options={[
            { value: "all", label: "Todas as disciplinas" },
            ...SUBJECTS.filter((s) => s.track === track).map((s) => ({
              value: s.id,
              label: `${s.name} · ${questions.filter((q) => q.subject === s.id).length}`,
            })),
          ]}
        />
        <Picker
          label="Aula"
          value={lessonId}
          onChange={change(setLessonId)}
          options={[
            { value: "all", label: "Todas as aulas" },
            ...LESSONS.filter(
              (lesson) =>
                lesson.track === track && (subject === "all" || lesson.subject === subject),
            ).map((lesson) => ({
              value: lesson.id,
              label: lesson.title,
            })),
          ]}
        />
        <Picker
          label="Dificuldade"
          value={difficulty}
          onChange={change(setDifficulty)}
          options={[
            { value: "all", label: "Todos os níveis" },
            ...Object.entries(difficultyLabels).map(([value, label]) => ({ value, label })),
          ]}
        />
        <Picker
          label="Situação"
          value={status}
          onChange={change(setStatus)}
          options={[
            { value: "all", label: "Todas as questões" },
            { value: "new", label: "Não respondidas" },
            { value: "wrong", label: "Caderno de erros" },
          ]}
        />
        <div className="search-field">
          <Icon name="Search" size={17} />
          <input
            aria-label="Buscar questões"
            value={query}
            onChange={(e) => change(setQuery)(e.target.value)}
            placeholder="Buscar no enunciado"
          />
        </div>
      </div>
      <div className="results-label">
        {filtered.length} questões neste filtro <span>·</span> {Object.keys(last).length} questões
        já praticadas
      </div>
      {question ? (
        <>
          <QuestionCard
            key={question.id}
            question={question}
            previous={last[question.id]}
            onAnswer={(selected) =>
              update((p) => ({
                ...p,
                attempts: [...p.attempts, attemptFor(question, selected)].slice(-3000),
              }))
            }
          />
          <div className="question-pagination">
            <Button
              variant="secondary"
              icon="ArrowLeft"
              disabled={!safeIndex}
              onClick={() => setIndex(safeIndex - 1)}
            >
              Anterior
            </Button>
            <span>
              {safeIndex + 1} de {filtered.length}
            </span>
            <Button
              variant="secondary"
              endIcon="ArrowRight"
              disabled={safeIndex >= filtered.length - 1}
              onClick={() => {
                setIndex(safeIndex + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Próxima questão
            </Button>
          </div>
        </>
      ) : (
        <Empty
          icon="ListFilter"
          title={status === "wrong" ? "Nenhum erro neste filtro." : "Nenhuma questão encontrada."}
        >
          {status === "wrong"
            ? "Suas últimas respostas incorretas aparecerão aqui para revisão."
            : "Altere a disciplina, dificuldade ou busca para continuar."}
        </Empty>
      )}
    </>
  );
}
function QuestionCard({
  question: q,
  onAnswer,
  previous,
  exam = false,
  value,
  onChange,
  review = false,
}) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const current = exam ? value : selected;
  const subject = SUBJECTS.find((s) => s.id === q.subject);
  const showAnswer = review || answered;
  return (
    <article className="question-card">
      <div className="question-card-head">
        <span className={`subject-label ${subject?.color || "blue"}`}>
          {subject?.name || q.subject}
        </span>
        <span className="question-badge">{difficultyLabels[q.difficulty]}</span>
        <span className="question-source">
          {q.source} · {q.id}
        </span>
      </div>
      <h2>{q.stem}</h2>
      <fieldset className="answer-options" disabled={showAnswer}>
        <legend className="sr-only">Selecione uma alternativa</legend>
        {q.options.map((option, i) => (
          <label
            key={i}
            className={`answer-option ${current === i ? "selected" : ""} ${showAnswer && i === q.answer ? "correct" : ""} ${showAnswer && current === i && i !== q.answer ? "incorrect" : ""}`}
          >
            <input
              type="radio"
              name={`answer-${q.id}`}
              checked={current === i}
              onChange={() => (exam ? onChange(i) : setSelected(i))}
            />
            <span className="option-letter">{String.fromCharCode(65 + i)}</span>
            <span>{option}</span>
            {showAnswer && i === q.answer && <Icon name="CircleCheck" size={19} />}
          </label>
        ))}
      </fieldset>
      {!exam && !showAnswer && (
        <div className="question-actions">
          <Button
            disabled={current === null}
            onClick={() => {
              setAnswered(true);
              onAnswer(current);
            }}
            endIcon="ArrowRight"
          >
            Conferir resposta
          </Button>
          {previous && (
            <span className="small-muted">
              Última tentativa: {previous.correct ? "correta" : "revisar"}
            </span>
          )}
        </div>
      )}
      {showAnswer && (
        <div
          className={`answer-feedback ${current === q.answer ? "success" : "review"}`}
          role="status"
        >
          <strong>
            <Icon name={current === q.answer ? "CircleCheck" : "Lightbulb"} size={20} />
            {current === q.answer
              ? "Muito bem! Raciocínio em dia."
              : current == null
                ? "Questão não respondida. Veja a resolução."
                : "Mais uma oportunidade de aprender."}
          </strong>
          <p>
            <b>Alternativa {String.fromCharCode(65 + q.answer)}.</b> {q.explanation}
          </p>
        </div>
      )}
    </article>
  );
}
export function Simulations({ track, questions, progress, update }) {
  const [count, setCount] = useState("10");
  const [session, setSession] = useState(progress.activeSimulation);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(progress.activeSimulation?.answers || {});
  const [remaining, setRemaining] = useState(
    progress.activeSimulation
      ? Math.max(0, Math.ceil((progress.activeSimulation.endsAt - Date.now()) / 1000))
      : 0,
  );
  const [result, setResult] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const finished = useRef(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const finish = () => {
    if (!session || finished.current) return;
    finished.current = true;
    const responses = session.questions.map((q) =>
      attemptFor(q, answersRef.current[q.id] ?? null, "simulation"),
    );
    const score = responses.filter((a) => a.correct).length;
    const record = {
      id: session.id,
      at: new Date().toISOString(),
      score,
      total: responses.length,
      seconds: Math.min(session.seconds, Math.round((Date.now() - session.startedAt) / 1000)),
      questionIds: session.questions.map((q) => q.id),
      answers: answersRef.current,
    };
    update((p) => ({
      ...p,
      attempts: [...p.attempts, ...responses].slice(-3000),
      simulations: [...p.simulations, record].slice(-100),
      activeSimulation: null,
    }));
    setResult({ ...record, questions: session.questions, answers: answersRef.current });
    setSession(null);
    setConfirm(false);
    toast.success("Simulado finalizado. Confira sua revisão.");
  };
  const finishRef = useRef(finish);
  finishRef.current = finish;
  useEffect(() => {
    if (!session) return;
    const timer = setInterval(() => {
      const left = Math.max(0, Math.ceil((session.endsAt - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) finishRef.current();
    }, 250);
    return () => {
      clearInterval(timer);
    };
  }, [session]);
  const start = () => {
    const selected = createSimulation(questions, Number(count));
    const seconds = selected.length * 180;
    const now = Date.now();
    finished.current = false;
    setResult(null);
    setAnswers({});
    setIndex(0);
    setRemaining(seconds);
    const nextSession = {
      id: crypto.randomUUID(),
      questions: selected,
      startedAt: now,
      endsAt: now + seconds * 1000,
      seconds,
      answers: {},
    };
    setSession(nextSession);
    update((p) => ({ ...p, activeSimulation: nextSession }));
  };
  if (session) {
    const q = session.questions[index];
    return (
      <>
        <SectionHead
          eyebrow="SIMULADO EM ANDAMENTO"
          title="Um desafio de cada vez."
          description="As respostas comentadas aparecem quando você finalizar."
        />
        <div className="exam-toolbar">
          <strong>
            Questão {index + 1} de {session.questions.length}
          </strong>
          <span className={remaining < 60 ? "urgent" : ""}>
            <Icon name="Timer" />
            {String(Math.floor(remaining / 60)).padStart(2, "0")}:
            {String(remaining % 60).padStart(2, "0")}
          </span>
        </div>
        <Meter
          label="Respostas registradas no simulado"
          value={(Object.keys(answers).length / session.questions.length) * 100}
        />
        <div className="question-dots">
          {session.questions.map((q, i) => (
            <button
              key={q.id}
              aria-label={`Ir para questão ${i + 1}`}
              aria-current={index === i ? "step" : undefined}
              className={`${answers[q.id] != null ? "done" : ""} ${index === i ? "current" : ""}`}
              onClick={() => setIndex(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <QuestionCard
          key={q.id}
          question={q}
          exam
          value={answers[q.id] ?? null}
          onChange={(choice) => {
            setAnswers((p) => ({ ...p, [q.id]: choice }));
            update((p) => ({
              ...p,
              activeSimulation: {
                ...p.activeSimulation,
                answers: { ...p.activeSimulation.answers, [q.id]: choice },
              },
            }));
          }}
        />
        <div className="question-pagination">
          <Button variant="secondary" disabled={!index} onClick={() => setIndex((i) => i - 1)}>
            Anterior
          </Button>
          {index < session.questions.length - 1 ? (
            <Button onClick={() => setIndex((i) => i + 1)}>Próxima</Button>
          ) : (
            <Button onClick={() => setConfirm(true)}>Finalizar simulado</Button>
          )}
        </div>
        {confirm && (
          <div className="panel confirm-panel" role="alert">
            <h3>Finalizar este simulado?</h3>
            <p>
              {session.questions.length - Object.keys(answers).length} questões ainda sem resposta.
              Questões em branco contam como erro.
            </p>
            <div className="button-row">
              <Button onClick={finish}>Confirmar finalização</Button>
              <Button variant="secondary" onClick={() => setConfirm(false)}>
                Continuar respondendo
              </Button>
            </div>
          </div>
        )}
        <p className="small-muted">
          Suas respostas ficam salvas. O tempo continua correndo se você sair; retome por esta tela.
        </p>
      </>
    );
  }
  if (result)
    return (
      <>
        <SectionHead
          eyebrow="SIMULADO CONCLUÍDO"
          title="Cada resultado mostra um caminho."
          description="Revise as respostas e transforme as dúvidas em próximos passos."
        >
          <Button variant="secondary" onClick={() => setResult(null)}>
            Voltar aos simulados
          </Button>
        </SectionHead>
        <div className="result-banner">
          <div>
            <strong>
              {result.score}
              <span>/{result.total}</span>
            </strong>
            <p>respostas corretas</p>
          </div>
          <div>
            <strong>{Math.round((result.score / result.total) * 100)}%</strong>
            <p>aproveitamento neste treino</p>
          </div>
          <div>
            <strong>{Math.floor(result.seconds / 60)} min</strong>
            <p>tempo de resolução</p>
          </div>
        </div>
        <p className="small-muted">
          Percentual de acertos. Não representa nota TRI do ENEM ou classificação no concurso.
        </p>
        <div className="exam-review">
          {result.questions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              review
              exam
              value={result.answers[q.id] ?? null}
            />
          ))}
        </div>
      </>
    );
  return (
    <>
      <SectionHead
        eyebrow={`TREINO COM TEMPO · ${TRACKS[track].name}`}
        title="Prepare também a sua confiança."
        description="Simulados reduzidos com disciplinas variadas, cronômetro e revisão comentada."
      />
      <section className="simulation-start">
        <div className="simulation-illustration">
          <Icon name="Timer" size={90} />
          <span>SEU PRÓXIMO DESAFIO</span>
        </div>
        <div>
          <span className="eyebrow">PRÁTICA AUTORAL</span>
          <h2>
            Uma pausa nas distrações.
            <br />
            Um encontro com o que você sabe.
          </h2>
          <p>
            Três minutos por questão. Navegue entre as perguntas e veja o resultado completo ao
            finalizar.
          </p>
          <Picker
            label="Tamanho do simulado"
            value={count}
            onChange={setCount}
            options={[
              { value: "5", label: "5 questões · 15 minutos" },
              { value: "10", label: "10 questões · 30 minutos" },
              { value: "20", label: "20 questões · 60 minutos" },
            ]}
          />
          <Button icon="Play" onClick={start}>
            Iniciar simulado
          </Button>
          <small>Treino reduzido; não reproduz a distribuição de uma prova oficial.</small>
        </div>
      </section>
      <div className="row-heading">
        <h2>Seu histórico</h2>
        <span>{progress.simulations.length} simulados</span>
      </div>
      {progress.simulations.length ? (
        <div className="history-list">
          {[...progress.simulations].reverse().map((s) => (
            <div key={s.id}>
              <span className="subject-icon blue">
                <Icon name="ClipboardCheck" />
              </span>
              <div>
                <strong>Simulado {TRACKS[track].name}</strong>
                <small>{new Date(s.at).toLocaleString("pt-BR")}</small>
              </div>
              <strong>
                {s.score}/{s.total} acertos
              </strong>
              <span className="pill">{Math.round((s.score / s.total) * 100)}%</span>
            </div>
          ))}
        </div>
      ) : (
        <Empty icon="Flag" title="Sua primeira marca vem agora.">
          Complete um simulado para começar seu histórico.
        </Empty>
      )}
    </>
  );
}
