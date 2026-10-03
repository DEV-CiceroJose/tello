import { SUBJECTS, LESSONS, TRACKS } from "./catalog";
import { getStats, subjectPerformance, dateKey, latestAttempts } from "./engine";
import { Button, Icon, Meter, SectionHead, Empty } from "./ui";
export function Progress({ track, progress, go }) {
  const stats = getStats(progress);
  const subjects = subjectPerformance(track, progress.attempts);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 6 + i);
    return {
      date: d,
      key: dateKey(d),
      count: progress.attempts.filter((a) => dateKey(new Date(a.at)) === dateKey(d)).length,
    };
  });
  const max = Math.max(1, ...days.map((d) => d.count));
  const weak = subjects
    .filter((s) => s.total && s.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy);
  return (
    <>
      <SectionHead
        eyebrow={`SEU DESEMPENHO · ${TRACKS[track].name}`}
        title="Veja o caminho que você está construindo."
        description="Dados do que você realmente fez. Sem atalhos, sem progresso inventado."
      />
      <div className="progress-top">
        <section className="panel">
          <span className="eyebrow">QUESTÕES · ÚLTIMOS 7 DIAS</span>
          <h2>Um hábito toma forma.</h2>
          <div className="activity-chart" aria-label="Questões resolvidas por dia">
            {days.map((d) => (
              <div key={d.key}>
                <span>{d.count}</span>
                <div className="chart-track">
                  <span
                    style={{ height: d.count ? `${Math.max(5, (d.count / max) * 100)}%` : "3px" }}
                  />
                </div>
                <small>{d.date.toLocaleDateString("pt-BR", { weekday: "short" })}</small>
              </div>
            ))}
          </div>
          <p className="small-muted">
            Inclui tentativas de prática e questões dos simulados finalizados.
          </p>
        </section>
        <section className="progress-total">
          <Icon name="TrendingUp" size={32} />
          <span>APROVEITAMENTO GERAL</span>
          <strong>{stats.answered ? `${stats.accuracy}%` : "—"}</strong>
          <p>
            {stats.answered
              ? `${stats.correct} acertos em ${stats.answered} tentativas.`
              : "Resolva a primeira questão para começar."}
          </p>
          <Button variant="secondary" endIcon="ArrowRight" onClick={() => go("questions")}>
            Continuar praticando
          </Button>
        </section>
      </div>
      <div className="row-heading">
        <h2>Cada área, uma possibilidade de avançar</h2>
      </div>
      <section className="performance-table">
        <div className="performance-row table-head">
          <span>Área de conhecimento</span>
          <span>Aulas</span>
          <span>Questões</span>
          <span>Aproveitamento</span>
        </div>
        {subjects.map((s) => {
          const lessons = LESSONS.filter((l) => l.subject === s.id);
          const completed = lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
          return (
            <div className="performance-row" key={s.id}>
              <span>
                <span className={`subject-icon ${s.color}`}>
                  <Icon name={s.icon} />
                </span>
                <strong>{s.name}</strong>
              </span>
              <span>
                {completed}/{lessons.length}
              </span>
              <span>{s.total}</span>
              <span>
                <Meter value={s.accuracy} label={`Acertos em ${s.name}`} />
                <strong>{s.total ? `${s.accuracy}%` : "—"}</strong>
              </span>
            </div>
          );
        })}
      </section>
      <div className="row-heading">
        <h2>Seu próximo foco</h2>
      </div>
      {weak.length ? (
        <div className="recommendations">
          {weak.map((s) => (
            <button key={s.id} onClick={() => go("questions", s.id)}>
              <Icon name="Lightbulb" />
              <div>
                <strong>Revisar {s.name}</strong>
                <p>
                  {s.accuracy}% de acertos em {s.total} tentativas. Retome o material e tente novas
                  questões.
                </p>
              </div>
              <Icon name="ArrowRight" />
            </button>
          ))}
        </div>
      ) : (
        <Empty
          icon="Compass"
          title={
            stats.answered ? "Continue ampliando sua base." : "Ainda estamos conhecendo seu ritmo."
          }
        >
          {stats.answered
            ? "Pratique outras áreas para descobrir novas oportunidades de revisão."
            : "As sugestões aparecem quando houver respostas para analisar."}
        </Empty>
      )}
      <p className="source-note">
        O percentual é uma medida de acertos neste acervo. Não estima TRI, aprovação ou domínio
        integral do conteúdo.
      </p>
    </>
  );
}
