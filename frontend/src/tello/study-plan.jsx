import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SUBJECTS, LESSONS, TRACKS } from "./catalog";
import { generatePlan, DAY_NAMES, dateKey } from "./engine";
import { Button, Icon, SectionHead, Empty, Picker, Meter, downloadFile } from "./ui";
const activities = {
  lesson: { label: "Estudar conteúdo", icon: "BookOpen" },
  questions: { label: "Praticar questões", icon: "ListChecks" },
  review: { label: "Revisar conteúdo", icon: "RotateCcw" },
  essay: { label: "Escrever redação", icon: "PenLine" },
};
export function StudyPlan({ track, progress, update, openLesson, go }) {
  const plan = progress.plan;
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState(plan?.days || [1, 2, 3, 4, 5]);
  const [minutes, setMinutes] = useState(String(plan?.minutes || 40));
  const [weeks, setWeeks] = useState(String(plan?.weeks || 4));
  const [startDate, setStartDate] = useState(plan?.startDate || dateKey());
  const [priority, setPriority] = useState(plan?.priority || "balanced");
  const [week, setWeek] = useState("all");
  const [error, setError] = useState("");
  const sessions = plan?.sessions || [];
  const completed = sessions.filter((s) => s.completed).length;
  const create = (e) => {
    e.preventDefault();
    try {
      const next = generatePlan(
        track,
        {
          days,
          minutes: Number(minutes),
          weeks: Number(weeks),
          startDate,
          priority: priority === "balanced" ? "" : priority,
        },
        progress.attempts,
      );
      update((p) => ({ ...p, plan: next }));
      setOpen(false);
      setWeek("all");
      toast.success("Seu plano está pronto. Um passo por dia!");
    } catch (e) {
      setError(e.message);
    }
  };
  const act = (s) => {
    if (s.type === "essay") go("essay");
    else if (s.type === "questions") go("questions", s.subject);
    else openLesson(LESSONS.find((l) => l.id === s.lessonId));
  };
  return (
    <>
      <SectionHead
        eyebrow={`ORGANIZAÇÃO · ${TRACKS[track].name}`}
        title="Seu objetivo tem espaço na rotina."
        description="Um plano realista, com conteúdo, prática e revisão. Você decide o ritmo."
      >
        <Button icon="SlidersHorizontal" onClick={() => setOpen(true)}>
          {plan ? "Ajustar meu plano" : "Criar meu plano"}
        </Button>
      </SectionHead>
      {plan ? (
        <>
          <div className="plan-summary">
            <div>
              <span className="eyebrow">MEU PLANO ATUAL</span>
              <h2>{plan.weeks} semanas de novos passos.</h2>
              <p>
                {plan.days.length} dias por semana · {plan.minutes} minutos por dia
              </p>
              <div className="plan-progress">
                <Meter value={(completed / sessions.length) * 100} label="Conclusão do plano" />
                <strong>
                  {completed} de {sessions.length}
                </strong>
              </div>
            </div>
            <Button
              variant="secondary"
              icon="Download"
              onClick={() =>
                downloadFile(
                  `tello-plano-${track}.csv`,
                  "\ufeffData;Atividade;Conteúdo;Minutos;Concluído\n" +
                    sessions
                      .map((s) =>
                        [
                          s.date,
                          activities[s.type].label,
                          s.title,
                          s.minutes,
                          s.completed ? "Sim" : "Não",
                        ]
                          .map((v) => '"' + String(v).replaceAll('"', '""') + '"')
                          .join(";"),
                      )
                      .join("\n"),
                  "text/csv;charset=utf-8",
                )
              }
            >
              Exportar plano
            </Button>
          </div>
          <div className="row-heading">
            <h2>Um dia de cada vez</h2>
            <Picker
              label="Visualizar"
              value={week}
              onChange={setWeek}
              options={[
                { value: "all", label: "Todas as semanas" },
                ...Array.from({ length: plan.weeks }, (_, i) => ({
                  value: String(i + 1),
                  label: `Semana ${i + 1}`,
                })),
              ]}
            />
          </div>
          <div className="session-list">
            {sessions
              .filter((s) => week === "all" || s.week === Number(week))
              .map((s) => {
                const action = activities[s.type];
                const date = new Date(`${s.date}T12:00:00`);
                return (
                  <div key={s.id} className={`session-row ${s.completed ? "completed" : ""}`}>
                    <label className="session-check">
                      <input
                        aria-label={`Concluir ${s.title} em ${s.date}`}
                        type="checkbox"
                        checked={s.completed}
                        onChange={() =>
                          update((p) => ({
                            ...p,
                            plan: {
                              ...p.plan,
                              sessions: p.plan.sessions.map((row) =>
                                row.id === s.id ? { ...row, completed: !row.completed } : row,
                              ),
                            },
                          }))
                        }
                      />
                    </label>
                    <div className="session-date">
                      <strong>{date.getDate().toString().padStart(2, "0")}</strong>
                      <span>
                        {date.toLocaleDateString("pt-BR", { month: "short" })} ·{" "}
                        {DAY_NAMES[date.getDay()].slice(0, 3)}
                      </span>
                    </div>
                    <span className="subject-icon blue">
                      <Icon name={action.icon} />
                    </span>
                    <div className="session-detail">
                      <span>
                        {action.label} · Semana {s.week}
                      </span>
                      <h3>{s.title}</h3>
                      <small>
                        {SUBJECTS.find((subject) => subject.id === s.subject)?.name}
                        {s.date < dateKey() && !s.completed ? " · Pendente" : ""}
                      </small>
                    </div>
                    <span className="session-duration">
                      <Icon name="Clock3" size={15} />
                      {s.minutes} min
                    </span>
                    <Button variant="ghost" endIcon="ArrowRight" onClick={() => act(s)}>
                      {s.completed ? "Revisitar" : "Começar"}
                    </Button>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div className="plan-empty">
          <div className="plan-empty-art">
            <Icon name="CalendarRange" size={70} />
            <span>SEG</span>
            <span>QUA</span>
            <span>SEX</span>
          </div>
          <Empty
            icon="Sparkles"
            title="Não precisa dar conta de tudo hoje."
            action={
              <Button endIcon="ArrowRight" onClick={() => setOpen(true)}>
                Montar meu primeiro plano
              </Button>
            }
          >
            Escolha os dias em que você pode estudar. O Tello distribui conteúdos, questões e
            revisões, priorizando suas dificuldades registradas.
          </Empty>
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="tello-modal">
          <DialogHeader>
            <DialogTitle>Vamos encontrar o seu ritmo?</DialogTitle>
            <DialogDescription>
              {plan
                ? "Gerar um novo plano substitui a agenda atual. Aulas concluídas e respostas são preservadas."
                : "Combine o estudo com a vida que você já tem."}
            </DialogDescription>
          </DialogHeader>
          <form className="plan-form" onSubmit={create}>
            <fieldset>
              <legend className="field-label">Em quais dias você pode estudar?</legend>
              <div className="day-picker">
                {[1, 2, 3, 4, 5, 6, 0].map((day) => (
                  <label key={day} className={days.includes(day) ? "active" : ""}>
                    <input
                      type="checkbox"
                      checked={days.includes(day)}
                      onChange={() =>
                        setDays(days.includes(day) ? days.filter((d) => d !== day) : [...days, day])
                      }
                    />
                    {DAY_NAMES[day].slice(0, 3)}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="form-grid">
              <Picker
                label="Tempo por dia"
                value={minutes}
                onChange={setMinutes}
                options={[20, 40, 60, 90, 120, 180, 240].map((n) => ({
                  value: String(n),
                  label: `${n} minutos`,
                }))}
              />
              <Picker
                label="Duração do plano"
                value={weeks}
                onChange={setWeeks}
                options={[1, 2, 4, 8, 12].map((n) => ({
                  value: String(n),
                  label: `${n} ${n === 1 ? "semana" : "semanas"}`,
                }))}
              />
            </div>
            <label className="field-label">
              Começar em
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <Picker
              label="Área prioritária"
              value={priority}
              onChange={setPriority}
              options={[
                { value: "balanced", label: "Equilibrar e priorizar minhas dificuldades" },
                ...SUBJECTS.filter((s) => s.track === track).map((s) => ({
                  value: s.id,
                  label: s.name,
                })),
              ]}
            />
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <Button type="submit" icon="Sparkles">
              {plan ? "Gerar novo plano" : "Criar meu plano de estudos"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
