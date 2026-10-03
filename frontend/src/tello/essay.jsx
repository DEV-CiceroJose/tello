import { useState } from "react";
import { toast } from "sonner";
import { ESSAY_THEMES, ESSAY_COMPETENCIES, SOURCES } from "./catalog";
import { essayMetrics } from "./engine";
import { Button, Icon, SectionHead, Picker, downloadFile } from "./ui";
export function EssayStudio({ progress, update }) {
  const [themeId, setThemeId] = useState(ESSAY_THEMES[0].id);
  const [review, setReview] = useState(false);
  const theme = ESSAY_THEMES.find((t) => t.id === themeId);
  const draft = progress.essays[themeId] || { text: "", checks: [], finished: false };
  const metrics = essayMetrics(draft.text);
  const save = (patch) =>
    update((p) => ({
      ...p,
      essays: {
        ...p.essays,
        [themeId]: {
          ...{ text: "", checks: [], finished: false },
          ...p.essays[themeId],
          ...patch,
          updatedAt: new Date().toISOString(),
        },
      },
    }));
  return (
    <>
      <SectionHead
        eyebrow="MÓDULO EXTRA · ENEM"
        title="Suas ideias, com voz e direção."
        description="Um espaço para escrever, revisar e desenvolver seus argumentos."
      >
        <a className="t-button secondary" href={SOURCES.essay.url} target="_blank" rel="noreferrer">
          <Icon name="ExternalLink" size={17} />
          Cartilha do INEP
        </a>
      </SectionHead>
      <div className="essay-layout">
        <aside className="essay-brief">
          <span className="eyebrow">PROPOSTA DE ESCRITA</span>
          <Picker
            label="Escolha seu tema"
            value={themeId}
            onChange={(value) => {
              setThemeId(value);
              setReview(false);
            }}
            options={ESSAY_THEMES.map((t) => ({ value: t.id, label: t.axis }))}
          />
          <h2>{theme.title}</h2>
          <span className="pill">Tema autoral · treino livre</span>
          <h3>Para começar a pensar</h3>
          {theme.prompts.map((p, i) => (
            <div className="motivating-text" key={p}>
              <span>IDEIA {i + 1}</span>
              <p>{p}</p>
            </div>
          ))}
          <p className="small-muted">
            Textos motivadores autorais. Não são citações ou dados estatísticos.
          </p>
          <h3>Perguntas que abrem caminhos</h3>
          <ul>
            {theme.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <div className="example-box">
            <Icon name="Lightbulb" />
            <p>
              Defenda uma tese, desenvolva argumentos e proponha uma intervenção. Prefira repertório
              pertinente a frases prontas.
            </p>
          </div>
        </aside>
        <section className="writing-panel">
          <header>
            <div>
              <Icon name="PenLine" />
              <strong>Meu rascunho</strong>
            </div>
            <span className={draft.finished ? "finished-label" : ""}>
              {draft.finished ? "Marcado como concluído" : "Em construção"}
            </span>
          </header>
          <label className="sr-only" htmlFor="essay-text">
            Seu texto sobre {theme.title}
          </label>
          <textarea
            id="essay-text"
            maxLength={24000}
            value={draft.text}
            onChange={(e) => save({ text: e.target.value, finished: false })}
            placeholder="Toda boa redação começa com uma primeira ideia. Escreva a sua aqui…"
          />
          <div className="writing-stats">
            <span>{metrics.words} palavras</span>
            <span>{metrics.paragraphs} parágrafos</span>
            <span>{metrics.characters}/24.000 caracteres</span>
          </div>
          <p className="small-muted writing-note">
            Separe parágrafos com uma linha em branco. A contagem digital não representa as 30
            linhas da folha oficial.
          </p>
          <div className="writing-actions">
            <Button
              variant="secondary"
              icon="Download"
              disabled={!draft.text.trim()}
              onClick={() =>
                downloadFile(`tello-redacao-${theme.id}.txt`, `${theme.title}\n\n${draft.text}`)
              }
            >
              Exportar texto
            </Button>
            <Button
              icon="ListChecks"
              disabled={!draft.text.trim()}
              onClick={() => setReview(!review)}
            >
              {review ? "Fechar revisão" : "Revisar meu texto"}
            </Button>
          </div>
          {review && (
            <section className="essay-checklist">
              <span className="eyebrow">AUTOAVALIAÇÃO GUIADA</span>
              <h3>Releia com um olhar para cada competência.</h3>
              <p>
                Este checklist ajuda na revisão. Não avalia automaticamente o texto nem atribui nota
                ENEM.
              </p>
              {ESSAY_COMPETENCIES.map(([title, description], i) => (
                <label key={title}>
                  <input
                    type="checkbox"
                    checked={draft.checks.includes(i)}
                    onChange={() =>
                      save({
                        checks: draft.checks.includes(i)
                          ? draft.checks.filter((c) => c !== i)
                          : [...draft.checks, i],
                      })
                    }
                  />
                  <span>
                    <strong>
                      <b>C{i + 1}</b> {title}
                    </strong>
                    <small>{description}</small>
                  </span>
                </label>
              ))}
              <Button
                icon="Check"
                disabled={draft.checks.length !== 5 || !draft.text.trim()}
                onClick={() => {
                  save({ finished: true });
                  toast.success("Redação concluída após sua revisão.");
                }}
              >
                Marcar redação como concluída
              </Button>
            </section>
          )}
        </section>
      </div>
    </>
  );
}
