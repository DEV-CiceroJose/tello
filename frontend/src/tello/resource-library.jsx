import { useState } from "react";
import { SUBJECTS } from "./catalog";
import EXAMS from "./exam-library.json";
import RESOURCES from "./study-resources.json";
import { STUDY_ROADMAP } from "./study-roadmap";
import { normalizeSearch } from "./question-filters";
import { Button, Empty, Icon, Picker } from "./ui";

export function ResourceLibrary({ track, subject, query, questions, go, view, selectResources }) {
  const [kind, setKind] = useState("all");
  const [role, setRole] = useState("all");
  const areas = SUBJECTS.filter((s) => s.track === track);
  if (track === "enem")
    areas.push({ id: "redacao", name: "Redação", icon: "PenLine", color: "purple" });
  const term = normalizeSearch(query.trim());
  if (view === "roadmap")
    return (
      <>
        <div className="study-method">
          <span className="eyebrow">DO CONCEITO À PRÁTICA</span>
          <h2>Entenda. Resolva. Revise.</h2>
          <p>
            Comece pela base da área, estude uma aula e resolva questões sem consultar a resposta.
            Registre o motivo de cada erro e volte ao tema em outra sessão. O roteiro orienta a
            sequência; a matriz do ENEM e o edital do seu cargo delimitam o conteúdo cobrado.
          </p>
        </div>
        <div className="resource-grid">
          {areas
            .filter(
              (s) =>
                (subject === "all" || s.id === subject) &&
                normalizeSearch(`${s.name} ${(STUDY_ROADMAP[s.id] || []).join(" ")}`).includes(
                  term,
                ),
            )
            .map((s) => (
              <article className="resource-card" key={s.id}>
                <span className={`subject-label ${s.color}`}>
                  <Icon name={s.icon} size={18} />
                  {s.name}
                </span>
                <h2>{s.id === "redacao" ? "Da tese à revisão" : "Seu caminho nesta área"}</h2>
                <ol className="roadmap-steps">
                  {STUDY_ROADMAP[s.id]?.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p className="small-muted">
                  {s.id === "redacao"
                    ? "Oficina de escrita e materiais de apoio"
                    : `${questions.filter((q) => q.subject === s.id).length} questões disponíveis`}
                </p>
                <div className="resource-links">
                  <Button variant="secondary" onClick={() => selectResources(s.id)}>
                    Ver materiais
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => go(s.id === "redacao" ? "essay" : "questions", s.id)}
                  >
                    Praticar →
                  </Button>
                </div>
              </article>
            ))}
        </div>
      </>
    );
  if (view === "exams") {
    const exams = EXAMS.filter(
      (e) =>
        e.track === track &&
        (role === "all" || e.role === role) &&
        (subject === "all" || questions.some((q) => q.examId === e.id && q.subject === subject)) &&
        normalizeSearch(`${e.title} ${e.board}`).includes(term),
    ).sort((a, b) => b.year - a.year);
    return (
      <>
        <p className="notice">
          Cadernos completos com figuras e gabaritos, disponíveis para download. Apenas questões
          válidas entram no banco.{" "}
          {track === "enem"
            ? "Uma cor por dia, sem contar versões repetidas. No banco, as questões de idioma usam inglês; o PDF também contém espanhol."
            : "Soldado e Oficial são acervos distintos. Provas antigas não garantem correspondência com o edital nem com a legislação vigente."}
        </p>
        {track === "pmpe" && (
          <Picker
            label="Cargo da prova"
            value={role}
            onChange={setRole}
            options={[
              { value: "all", label: "Todos" },
              { value: "Soldado", label: "Soldado" },
              { value: "Oficial", label: "Oficial · complementar" },
            ]}
          />
        )}
        <div className="resource-grid">
          {exams.map((e) => (
            <article className="resource-card" key={e.id}>
              <span className="eyebrow">
                {e.board} · {e.role}
              </span>
              <h2>{e.title}</h2>
              <p>
                {e.validCount} questões no banco · {e.questionCount} no caderno
              </p>
              <p className="small-muted">
                {e.excludedNumbers.length
                  ? `Anuladas, fora da pontuação: ${e.excludedNumbers.join(", ")}.`
                  : "Sem anulações no gabarito consultado."}
              </p>
              {e.language && <p className="small-muted">Opção de idioma no banco: {e.language}.</p>}
              <div className="resource-links">
                <Button onClick={() => go("questions", subject, "all", e.id)}>
                  Resolver esta prova
                </Button>
                <a href={e.studyPath} download>
                  Baixar prova
                </a>
                <a href={e.answerPath} download>
                  Baixar gabarito
                </a>
                <a href={e.sourcePage} target="_blank" rel="noreferrer">
                  Fonte oficial ↗
                </a>
              </div>
              {e.studyNote && (
                <details>
                  <summary>Sobre a cópia de estudo</summary>
                  <p>{e.studyNote}</p>
                  <a href={e.examPath} download>
                    Baixar original com destaques
                  </a>
                </details>
              )}
            </article>
          ))}
        </div>
        {!exams.length && (
          <Empty icon="SearchX" title="Nenhuma prova neste filtro.">
            Altere a área ou a busca.
          </Empty>
        )}
      </>
    );
  }
  const resources = RESOURCES.filter(
    (r) =>
      r.tracks.includes(track) &&
      (subject === "all" || r.subjects.includes(subject) || r.subjects.includes("all")) &&
      (kind === "all" || r.kind === kind) &&
      normalizeSearch(`${r.title} ${r.description} ${r.provider}`).includes(term),
  );
  return (
    <>
      <div className="library-intro">
        <div>
          <h2>Aprofunde com boas fontes.</h2>
          <p>
            Livros gratuitos, videoaulas e documentos selecionados. Os materiais abrem na
            instituição responsável; a data indica a consulta da fonte, não uma revisão completa de
            todas as páginas.
          </p>
        </div>
        <Picker
          label="Tipo de material"
          value={kind}
          onChange={setKind}
          options={[
            { value: "all", label: "Todos os tipos" },
            ...[
              ...new Set(RESOURCES.filter((r) => r.tracks.includes(track)).map((r) => r.kind)),
            ].map((value) => ({ value, label: value })),
          ]}
        />
      </div>
      <div className="results-label">{resources.length} recursos encontrados</div>
      <div className="resource-grid">
        {resources.map((r) => (
          <article className="resource-card" key={r.id}>
            <span className="eyebrow">
              {r.kind} · {r.provider}
            </span>
            <h2>{r.title}</h2>
            <p>{r.description}</p>
            <div className="resource-links">
              <a href={r.url} target="_blank" rel="noreferrer">
                {r.kind === "Videoaula" ? "Assistir à aula" : "Acessar material"} ↗
              </a>
              {r.sourcePage && (
                <a href={r.sourcePage} target="_blank" rel="noreferrer">
                  Página da instituição ↗
                </a>
              )}
            </div>
            <span className="small-muted">
              Consulta em {r.verifiedAt.split("-").reverse().join("/")}
            </span>
            {r.verificationNote && <p className="small-muted">{r.verificationNote}</p>}
          </article>
        ))}
      </div>
      {!resources.length && (
        <Empty icon="SearchX" title="Nenhum recurso neste filtro.">
          Tente outra área, tipo ou palavra.
        </Empty>
      )}
    </>
  );
}
