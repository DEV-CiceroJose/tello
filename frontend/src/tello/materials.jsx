import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { SUBJECTS, LESSONS, TRACKS } from "./catalog";
import { Icon, Button, SectionHead, Empty, downloadFile } from "./ui";
export function Materials({ track, progress, initialSubject, query, setQuery, openLesson }) {
  const [subject, setSubject] = useState(initialSubject);
  const [savedOnly, setSavedOnly] = useState(false);
  useEffect(() => setSubject(initialSubject), [initialSubject]);
  const all = LESSONS.filter((l) => l.track === track);
  const filtered = all.filter(
    (l) =>
      (subject === "all" || l.subject === subject) &&
      (!savedOnly || progress.bookmarks.includes(l.id)) &&
      `${l.title} ${l.subtitle}`
        .toLocaleLowerCase("pt-BR")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          query
            .toLocaleLowerCase("pt-BR")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
        ),
  );
  return (
    <>
      <SectionHead
        eyebrow={`BIBLIOTECA · ${TRACKS[track].name}`}
        title="Conhecimento que fica."
        description={`${all.length} aulas autorais para construir sua base, com exemplos e questões relacionadas.`}
      />
      <div className="filter-toolbar">
        <div className="search-field">
          <Icon name="Search" size={18} />
          <input
            aria-label="Buscar materiais"
            placeholder="O que você quer aprender hoje?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button
          icon="Bookmark"
          variant={savedOnly ? "" : "secondary"}
          aria-pressed={savedOnly}
          onClick={() => setSavedOnly(!savedOnly)}
        >
          Meus salvos
        </Button>
      </div>
      <div className="filter-chips" aria-label="Filtrar por disciplina">
        <button className={subject === "all" ? "active" : ""} onClick={() => setSubject("all")}>
          Todas as áreas
        </button>
        {SUBJECTS.filter((s) => s.track === track).map((s) => (
          <button
            key={s.id}
            className={subject === s.id ? "active" : ""}
            onClick={() => setSubject(s.id)}
          >
            {s.name} · {all.filter((lesson) => lesson.subject === s.id).length}
          </button>
        ))}
      </div>
      <div className="results-label">
        {filtered.length} {filtered.length === 1 ? "material encontrado" : "materiais encontrados"}
      </div>
      {filtered.length ? (
        <div className="lesson-grid">
          {filtered.map((l, i) => {
            const s = SUBJECTS.find((s) => s.id === l.subject);
            const done = progress.completedLessons.includes(l.id);
            return (
              <button key={l.id} className="lesson-card" onClick={() => openLesson(l)}>
                <div className={`lesson-cover ${s.color}`}>
                  <Icon name={s.icon} size={44} />
                  <span className="cover-number">{String(i + 1).padStart(2, "0")}</span>
                  <span className="lesson-type">GUIA DE ESTUDO</span>
                </div>
                <div className="lesson-card-body">
                  <span className={`subject-label ${s.color}`}>{s.name}</span>
                  <h2>{l.title}</h2>
                  <p>{l.subtitle}</p>
                  <div className="lesson-meta">
                    <span>
                      <Icon name="Clock3" size={14} />
                      {l.minutes} min de estudo
                    </span>
                    <span>
                      {done ? (
                        <>
                          <Icon name="CircleCheck" size={15} />
                          Concluído
                        </>
                      ) : (
                        <Icon name="ArrowUpRight" size={19} />
                      )}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <Empty icon="SearchX" title="Ainda não encontramos esse material.">
          Tente outro termo ou remova os filtros.
        </Empty>
      )}
      <div className="source-note">
        <Icon name="Info" size={18} />
        <p>
          Aulas e questões autorais em expansão. Para legislação e editais, confira sempre a fonte
          oficial atualizada.
          <br />
          <a href={TRACKS[track].reference.url} target="_blank" rel="noreferrer">
            {TRACKS[track].reference.label} ↗
          </a>
        </p>
      </div>
    </>
  );
}
export function LessonReader({ lesson, onClose, progress, update, go }) {
  if (!lesson) return null;
  const subject = SUBJECTS.find((s) => s.id === lesson.subject);
  const done = progress.completedLessons.includes(lesson.id);
  const saved = progress.bookmarks.includes(lesson.id);
  return (
    <Dialog open={!!lesson} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="tello-modal reader-modal">
        <DialogHeader>
          <span className={`subject-label ${subject.color}`}>
            {subject.name} · {lesson.minutes} min
          </span>
          <DialogTitle>{lesson.title}</DialogTitle>
          <DialogDescription>{lesson.subtitle}</DialogDescription>
        </DialogHeader>
        <div className="reader-actions">
          <Button
            variant="secondary"
            icon={saved ? "BookmarkCheck" : "Bookmark"}
            onClick={() =>
              update((p) => ({
                ...p,
                bookmarks: saved
                  ? p.bookmarks.filter((id) => id !== lesson.id)
                  : [...p.bookmarks, lesson.id],
              }))
            }
          >
            {saved ? "Salvo" : "Salvar material"}
          </Button>
          <Button
            variant="ghost"
            icon="Download"
            onClick={() =>
              downloadFile(
                `tello-${lesson.id}.txt`,
                `${lesson.title}\n${lesson.subtitle}\n\n${lesson.paragraphs.join("\n\n")}\n\nEXEMPLO\n${lesson.example}\n\nPARA LEMBRAR\n${lesson.takeaway}\n\nReferência: ${lesson.source.url}\nMaterial autoral Tello.`,
              )
            }
          >
            Baixar texto
          </Button>
        </div>
        <article className="lesson-article">
          <h3>Entenda o conceito</h3>
          {lesson.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="example-box">
            <span className="eyebrow">
              <Icon name="Lightbulb" size={17} /> NA PRÁTICA
            </span>
            <p>{lesson.example}</p>
          </div>
          <h3>Leve com você</h3>
          <p>{lesson.takeaway}</p>
          <a className="text-link" href={lesson.source.url} target="_blank" rel="noreferrer">
            {lesson.source.label}
            <Icon name="ExternalLink" size={15} />
          </a>
        </article>
        <div className="reader-footer">
          <Button
            variant={done ? "secondary" : ""}
            icon={done ? "CircleCheck" : "Check"}
            onClick={() => {
              update((p) => ({
                ...p,
                completedLessons: done
                  ? p.completedLessons.filter((id) => id !== lesson.id)
                  : [...p.completedLessons, lesson.id],
              }));
              toast.success(done ? "Aula marcada para revisar." : "Mais um passo concluído!");
            }}
          >
            {done ? "Concluído · desfazer" : "Marcar como concluído"}
          </Button>
          <Button
            variant="secondary"
            endIcon="ArrowRight"
            onClick={() => {
              onClose();
              go("questions", lesson.subject, lesson.id);
            }}
          >
            Praticar questões
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
