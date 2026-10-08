import { useEffect, useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { toast, Toaster } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuth } from "@/components/auth/auth-provider";
import { isFirebaseConfigured } from "@/lib/firebase";
import { TRACKS, SUBJECTS, LESSONS } from "./catalog";
import { getStats, dateKey } from "./engine";
import { useProgress } from "./use-progress";
import { useCatalog } from "./use-catalog";
import { Icon, Button, Meter, SectionHead, Empty, downloadFile } from "./ui";
import { Materials, LessonReader } from "./materials";
import { QuestionBank, Simulations } from "./practice";
import { StudyPlan } from "./study-plan";
import { EssayStudio } from "./essay";
import { Progress } from "./progress";
const navigation = [
  ["overview", "LayoutDashboard", "Visão geral"],
  ["plan", "CalendarDays", "Meu plano"],
  ["materials", "LibraryBig", "Materiais"],
  ["questions", "ListChecks", "Banco de questões"],
  ["simulations", "Timer", "Simulados"],
  ["essay", "PenLine", "Redação"],
  ["progress", "ChartNoAxesCombined", "Meu desempenho"],
];
export function TelloApp() {
  const search = useSearch({ strict: false });
  const track = search.track === "pmpe" ? "pmpe" : "enem";
  const { user, profile, loading, login, logout } = useAuth();
  return (
    <StudyWorkspace
      key={`${user?.uid || "local"}:${track}`}
      track={track}
      tab={search.tab || "overview"}
      exam={search.exam || "all"}
      user={user}
      profile={profile}
      authLoading={loading}
      login={login}
      logout={logout}
    />
  );
}
function StudyWorkspace({ track, tab, exam, user, profile, authLoading, login, logout }) {
  const navigate = useNavigate();
  const { progress, update, status, ready, retry } = useProgress(user?.uid, track);
  const { questions, catalogError } = useCatalog(track, user?.uid);
  const [mobile, setMobile] = useState(false);
  const [settings, setSettings] = useState(false);
  const [help, setHelp] = useState(false);
  const [lesson, setLesson] = useState(null);
  const [filter, setFilter] = useState("all");
  const [lessonFilter, setLessonFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [focus, setFocus] = useState({ remaining: 25 * 60, running: false, endsAt: 0 });
  const stats = getStats(progress);
  const info = TRACKS[track];
  const go = (next, subject = "all", lessonId = "all", examId) => {
    setFilter(subject);
    setLessonFilter(lessonId);
    setQuery("");
    setMobile(false);
    navigate({ to: "/", search: { track, tab: next, exam: examId } });
  };
  useEffect(() => {
    if (!focus.running) return;
    const endsAt = focus.endsAt;
    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setFocus({ remaining, running: remaining > 0, endsAt });
      if (!remaining) {
        clearInterval(timer);
        update((p) => ({ ...p, focusMinutes: p.focusMinutes + 25 }));
        toast.success("Sessão de foco concluída. Hora de uma pausa!");
      }
    }, 250);
    return () => clearInterval(timer);
  }, [focus.running, focus.endsAt, update]);
  const signIn = async () => {
    setAuthBusy(true);
    try {
      await login();
      toast.success("Conta conectada. Seus estudos por conta ficam separados do modo local.");
    } catch {
      toast.error(
        "Não foi possível entrar. Verifique o Google habilitado no Firebase e o domínio autorizado.",
      );
    } finally {
      setAuthBusy(false);
    }
  };
  const labels = {
    local: "Salvo neste dispositivo",
    synced: "Sincronizado na sua conta",
    saving: "Salvando na nuvem…",
    loading: "Carregando seus estudos…",
    offline: "Sem sincronização · cópia local",
    conflict: "Conflito entre dispositivos",
    full: "Limite de armazenamento",
    "storage-error": "Não foi possível salvar neste dispositivo",
  };
  const mainProps = { track, progress, update, questions, go };
  return (
    <div className={`tello-app track-${track}`}>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      {mobile && (
        <button
          className="nav-backdrop"
          aria-label="Fechar menu"
          onClick={() => setMobile(false)}
        />
      )}
      <aside className={`sidebar ${mobile ? "is-open" : ""}`}>
        <Link to="/" search={{ track, tab: "overview" }} className="wordmark">
          <span className="brand-mark">
            t<span />
          </span>
          tello<span className="brand-dot">.</span>
        </Link>
        <div className="workspace-label">SEU ESPAÇO DE ESTUDOS</div>
        <div className="track-switch" aria-label="Trilha de estudos">
          {Object.entries(TRACKS).map(([id, t]) => (
            <Link
              key={id}
              to="/"
              search={{ track: id, tab: tab === "essay" && id === "pmpe" ? "overview" : tab }}
              className={id === track ? "active" : ""}
              aria-current={id === track ? "true" : undefined}
            >
              <Icon name={id === "enem" ? "GraduationCap" : "ShieldCheck"} size={17} />
              {t.name}
            </Link>
          ))}
        </div>
        <div className="nav-label">APRENDER, TODOS OS DIAS</div>
        <nav aria-label="Navegação principal">
          {navigation
            .filter(([id]) => id !== "essay" || track === "enem")
            .map(([id, icon, label]) => (
              <Link
                key={id}
                to="/"
                search={{ track, tab: id }}
                className={`nav-item ${tab === id ? "active" : ""}`}
                onClick={() => {
                  setMobile(false);
                  setQuery("");
                }}
                aria-current={tab === id ? "page" : undefined}
              >
                <Icon name={icon} />
                {label}
                {id === "essay" && <span className="nav-badge">EXTRA</span>}
              </Link>
            ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="focus-card">
            <div>
              <Icon name="Headphones" size={17} />
              <strong>Um passo de cada vez.</strong>
            </div>
            <p>Reserve 25 minutos para você e seu próximo objetivo.</p>
            <button
              onClick={() =>
                setFocus((f) => ({
                  ...f,
                  running: !f.running,
                  endsAt: Date.now() + f.remaining * 1000,
                }))
              }
              className="focus-control"
            >
              <Icon name={focus.running ? "Pause" : "Play"} size={14} />
              {focus.running || focus.remaining < 1500
                ? `${String(Math.floor(focus.remaining / 60)).padStart(2, "0")}:${String(focus.remaining % 60).padStart(2, "0")} · ${focus.running ? "Pausar" : "Continuar"}`
                : "Começar um foco"}
              <Icon name="ArrowUpRight" size={14} />
            </button>
            {focus.remaining < 1500 && !focus.running && (
              <button
                className="text-link"
                onClick={() => setFocus({ remaining: 1500, running: false, endsAt: 0 })}
              >
                Reiniciar 25 min
              </button>
            )}
          </div>
          <button className="nav-item" onClick={() => setHelp(true)}>
            <Icon name="CircleHelp" />
            Como funciona
          </button>
          <button className="nav-item" onClick={() => setSettings(true)}>
            <Icon name="Settings2" />
            Preferências
          </button>
          <button className="profile-button" onClick={() => setSettings(true)}>
            <span className="avatar">
              {(profile?.name || progress.name || "E").slice(0, 1).toUpperCase()}
            </span>
            <span>
              <strong>{profile?.name || progress.name || "Estudante"}</strong>
              <small>{user ? "Minha conta" : "Modo local"}</small>
            </span>
            <Icon name="ChevronsUpDown" size={15} />
          </button>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="topbar-path">
            <button
              className="icon-button mobile-menu"
              aria-label="Abrir menu"
              onClick={() => setMobile(true)}
            >
              <Icon name="Menu" />
            </button>
            <span>Minha jornada</span>
            <Icon name="ChevronRight" size={14} />
            <strong>{info.name}</strong>
          </div>
          <div className="topbar-right">
            <span className="today-date">
              {new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long" }).format(
                new Date(),
              )}
            </span>
            <span className="streak">
              <Icon name="Flame" size={17} />
              {stats.streak} {stats.streak === 1 ? "dia" : "dias"}
            </span>
            <button
              className="avatar small"
              aria-label="Abrir minha conta"
              onClick={() => setSettings(true)}
            >
              {(profile?.name || progress.name || "E").slice(0, 1).toUpperCase()}
            </button>
          </div>
        </header>
        <main id="main-content" className="main-content">
          {["offline", "conflict", "storage-error", "full"].includes(status) && (
            <div role="alert" className="notice warning">
              <Icon name="CloudOff" />
              <span>
                {status === "conflict"
                  ? "Há alterações em outro dispositivo. Exporte sua cópia antes de reconciliar os dados."
                  : status === "storage-error"
                    ? "O navegador não conseguiu salvar. Exporte seus dados para evitar perda."
                    : status === "full"
                      ? "O acervo pessoal atingiu o limite. Exporte os seus dados."
                      : "O progresso está no dispositivo; a nuvem não confirmou o salvamento."}
              </span>
              <Button
                variant="secondary"
                onClick={() =>
                  downloadFile(
                    `tello-${track}-backup.json`,
                    JSON.stringify(progress, null, 2),
                    "application/json",
                  )
                }
              >
                Exportar
              </Button>
              {status === "offline" && (
                <Button variant="secondary" onClick={retry}>
                  Tentar novamente
                </Button>
              )}
            </div>
          )}
          {!ready ? (
            <Empty icon="LoaderCircle" title="Preparando seus estudos…">
              Estamos carregando seu progresso nesta trilha.
            </Empty>
          ) : (
            <>
              {tab === "overview" && (
                <Overview
                  {...mainProps}
                  stats={stats}
                  name={profile?.name || progress.name}
                  openLesson={setLesson}
                />
              )}
              {tab === "materials" && (
                <Materials
                  {...mainProps}
                  initialSubject={filter}
                  query={query}
                  setQuery={setQuery}
                  openLesson={setLesson}
                />
              )}
              {tab === "questions" && (
                <QuestionBank
                  {...mainProps}
                  initialSubject={filter}
                  initialLesson={lessonFilter}
                  initialExam={exam}
                  catalogError={catalogError}
                />
              )}
              {tab === "plan" && <StudyPlan {...mainProps} openLesson={setLesson} />}
              {tab === "simulations" && <Simulations {...mainProps} />}
              {tab === "essay" && track === "enem" && <EssayStudio {...mainProps} />}
              {tab === "progress" && <Progress {...mainProps} />}
            </>
          )}
          <footer className="workspace-footer">
            <span>
              tello<span className="brand-dot">.</span>{" "}
              <span>Seu futuro começa no próximo passo.</span>
            </span>
            <span className="save-status" role="status">
              <span
                className={`status-dot ${["offline", "conflict", "storage-error", "full"].includes(status) ? "warn" : ""}`}
              />
              {labels[status]}
            </span>
          </footer>
        </main>
      </div>
      <LessonReader lesson={lesson} onClose={() => setLesson(null)} {...mainProps} />
      <Dialog open={settings} onOpenChange={setSettings}>
        <DialogContent className="tello-modal">
          <DialogHeader>
            <DialogTitle>Seu espaço, do seu jeito.</DialogTitle>
            <DialogDescription>Preferências e progresso da trilha {info.name}.</DialogDescription>
          </DialogHeader>
          <label className="field-label">
            Como quer ser chamado?
            <input
              maxLength={80}
              value={progress.name}
              onChange={(e) => update((p) => ({ ...p, name: e.target.value }))}
              placeholder="Seu primeiro nome"
            />
          </label>
          <label className="field-label">
            Data da sua meta
            <input
              type="date"
              value={progress.goalDate}
              onChange={(e) => update((p) => ({ ...p, goalDate: e.target.value }))}
            />
          </label>
          <div className="notice">
            <Icon name={user ? "CloudCheck" : "Laptop"} />
            <p>
              {user
                ? `Conectado como ${user.email}. O progresso desta conta é separado dos estudos locais.`
                : "Seus estudos ficam salvos neste navegador. Entre para manter um histórico privado na nuvem. Dados locais não são transferidos automaticamente."}
            </p>
          </div>
          {user ? (
            <Button
              variant="secondary"
              disabled={status === "saving"}
              onClick={async () => {
                await logout();
                setSettings(false);
              }}
            >
              Sair da conta
            </Button>
          ) : (
            <Button
              icon="LogIn"
              disabled={!isFirebaseConfigured || authBusy || authLoading}
              onClick={signIn}
            >
              {authBusy ? "Conectando…" : "Entrar com Google"}
            </Button>
          )}
          {!isFirebaseConfigured && (
            <p className="small-muted">
              A conexão com o Firebase aguarda a configuração do app Web. O modo local já está
              disponível.
            </p>
          )}
          <Button
            variant="secondary"
            icon="Download"
            onClick={() =>
              downloadFile(
                `tello-${track}-backup.json`,
                JSON.stringify(progress, null, 2),
                "application/json",
              )
            }
          >
            Exportar meus dados
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={help} onOpenChange={setHelp}>
        <DialogContent className="tello-modal">
          <DialogHeader>
            <DialogTitle>Aprender tem um ritmo. Encontre o seu.</DialogTitle>
            <DialogDescription>Quatro passos para usar o Tello.</DialogDescription>
          </DialogHeader>
          <ol className="help-steps">
            <li>
              <strong>Escolha sua trilha.</strong> ENEM e PM-PE têm conteúdos e progresso
              independentes.
            </li>
            <li>
              <strong>Crie um plano.</strong> Defina seus dias e tempo disponível. Ajuste conforme
              sua rotina.
            </li>
            <li>
              <strong>Estude e pratique.</strong> Leia aulas, resolva questões comentadas e retome
              os erros.
            </li>
            <li>
              <strong>Acompanhe o que fez.</strong> O desempenho é calculado pelas suas respostas.
              Simulados são treinos reduzidos, sem estimativa de TRI.
            </li>
          </ol>
          <p className="small-muted">
            O acervo combina aulas autorais, provas oficiais e materiais de instituições públicas.
            PM-PE usa o edital de Soldado de 2023 como referência; não cobre todas as etapas ou todo
            o conteúdo do concurso. Redações possuem autoavaliação, sem nota oficial ou correção
            automática.
          </p>
          <a className="text-link" href={info.reference.url} target="_blank" rel="noreferrer">
            {info.reference.label} ↗
          </a>
        </DialogContent>
      </Dialog>
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}
function Overview({ track, progress, stats, name, questions, go, openLesson }) {
  const subjects = SUBJECTS.filter((s) => s.track === track);
  const lessons = LESSONS.filter((l) => l.track === track);
  const next = lessons.find((l) => !progress.completedLessons.includes(l.id)) || lessons[0];
  const sessions = progress.plan?.sessions || [];
  const upcoming = sessions.filter((s) => !s.completed).slice(0, 3);
  const completed = sessions.filter((s) => s.completed).length;
  const rate = sessions.length ? Math.round((completed / sessions.length) * 100) : 0;
  return (
    <>
      <SectionHead
        eyebrow="BOM TER VOCÊ POR AQUI"
        title={name ? `Vamos nessa, ${name.split(" ")[0]}?` : "Seu próximo capítulo começa aqui."}
        description="Um pouco de constância hoje. Novas possibilidades amanhã."
      >
        <Button variant="secondary" icon="CalendarDays" onClick={() => go("plan")}>
          Meu plano de estudos
        </Button>
      </SectionHead>
      <div className="overview-grid">
        <section className="journey-card">
          <div className="journey-content">
            <span className="hero-tag">
              <span /> TRILHA {TRACKS[track].name} <span className="tag-line" /> NO SEU RITMO
            </span>
            <h2>
              {track === "enem" ? (
                <>
                  Grandes sonhos.
                  <br />
                  Pequenos passos,
                  <br />
                  <em>todos os dias.</em>
                </>
              ) : (
                <>
                  Foco no preparo.
                  <br />
                  Disciplina hoje,
                  <br />
                  <em>conquista amanhã.</em>
                </>
              )}
            </h2>
            <p>
              {track === "enem"
                ? "Conhecimento, prática e um plano que cabe na sua vida. Sua jornada até a universidade começa por aqui."
                : "Construa sua base para Soldado da PM-PE. Estude, pratique e acompanhe cada avanço."}
            </p>
            <Button variant="hero-button" endIcon="ArrowRight" onClick={() => openLesson(next)}>
              {stats.lessons ? "Continuar estudando" : "Começar a estudar"}
            </Button>
            <span className="hero-caption">
              {next.title} · {next.minutes} min
            </span>
          </div>
          <div className="journey-art" aria-hidden="true">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <span className="art-spark spark-one">✳</span>
            <span className="art-spark spark-two">✦</span>
            <div className="art-stair step-one" />
            <div className="art-stair step-two" />
            <div className="art-stair step-three" />
            <div className="art-stair step-four" />
            <div className="art-door">
              <span />
              <div className="door-sun" />
            </div>
            <span className="art-note">
              <Icon name="Sparkles" size={16} /> o futuro é seu.
            </span>
          </div>
        </section>
        <section className="weekly-card">
          <div className="card-top">
            <span className="eyebrow">SEU PLANO, SEU RITMO</span>
            <Icon name="CalendarCheck" size={19} />
          </div>
          <h3>Constância que transforma.</h3>
          <div className="week-days">
            {["S", "T", "Q", "Q", "S", "S", "D"].map((day, i) => {
              const d = [1, 2, 3, 4, 5, 6, 0][i];
              return (
                <div key={i}>
                  <span>{day}</span>
                  <span className={progress.plan?.days.includes(d) ? "scheduled" : ""}>
                    {progress.plan?.days.includes(d) ? (
                      <Icon name="Check" size={15} />
                    ) : (
                      <span className="day-dot" />
                    )}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="weekly-metric">
            <strong>
              {completed}
              <span> / {sessions.length} sessões</span>
            </strong>
            <span>{rate}%</span>
          </div>
          <Meter value={rate} label="Sessões concluídas do plano" />
          <p>
            {sessions.length
              ? "Seu avanço no plano atual. Cada sessão conta."
              : "Seu plano ainda está em branco. Vamos dar o primeiro passo?"}
          </p>
          <button className="text-link" onClick={() => go("plan")}>
            {sessions.length ? "Ver meu planejamento" : "Montar meu plano"}
            <Icon name="ArrowRight" size={16} />
          </button>
        </section>
      </div>
      <div className="stat-grid">
        {[
          [
            "ListChecks",
            stats.answered,
            "Questões resolvidas",
            "Respostas que viram aprendizado",
            "blue",
          ],
          [
            "Target",
            stats.answered ? `${stats.accuracy}%` : "—",
            "Taxa de acerto",
            stats.answered ? `${stats.correct} respostas corretas` : "Seu ponto de partida é agora",
            "green",
          ],
          [
            "BookOpenCheck",
            `${stats.lessons}/${lessons.length}`,
            "Aulas concluídas",
            "Conhecimento, um tema por vez",
            "purple",
          ],
          [
            "Clock3",
            `${progress.focusMinutes} min`,
            "Tempo de foco",
            "Sessões completas de 25 minutos",
            "orange",
          ],
        ].map(([icon, value, label, detail, color]) => (
          <section className="stat-card" key={label}>
            <span className={`subject-icon ${color}`}>
              <Icon name={icon} />
            </span>
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{detail}</small>
            </div>
          </section>
        ))}
      </div>
      <div className="lower-grid">
        <section>
          <div className="row-heading">
            <div>
              <h2>Explore seu conhecimento</h2>
              <p>Escolha uma área e dê o próximo passo.</p>
            </div>
            <button className="text-link" onClick={() => go("materials")}>
              Ver materiais <Icon name="ArrowUpRight" size={16} />
            </button>
          </div>
          <div className="subject-grid">
            {subjects.map((s) => {
              const list = lessons.filter((l) => l.subject === s.id);
              const done = list.filter((l) => progress.completedLessons.includes(l.id)).length;
              return (
                <button key={s.id} className="subject-card" onClick={() => go("materials", s.id)}>
                  <div className="card-top">
                    <span className={`subject-icon ${s.color}`}>
                      <Icon name={s.icon} size={23} />
                    </span>
                    <Icon name="ArrowUpRight" size={18} />
                  </div>
                  <h3>{s.name}</h3>
                  <p>
                    {list.length} aulas · {questions.filter((q) => q.subject === s.id).length}{" "}
                    questões
                  </p>
                  <Meter label={`Progresso em ${s.name}`} value={(done / list.length) * 100} />
                  <small>
                    {done ? `${done} de ${list.length} aulas concluídas` : "Pronto para começar"}
                  </small>
                </button>
              );
            })}
          </div>
        </section>
        <div className="right-column">
          <section className="next-card">
            <div className="row-heading">
              <h2>Na sua agenda</h2>
              <Icon name="CalendarDays" size={19} />
            </div>
            {upcoming.length ? (
              upcoming.map((s) => (
                <button className="agenda-item" key={s.id} onClick={() => go("plan")}>
                  <span className="agenda-date">
                    {new Date(`${s.date}T12:00:00`).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                  <span>
                    <strong>{s.title}</strong>
                    <small>
                      {s.minutes} min · Semana {s.week}
                    </small>
                  </span>
                  <Icon name="ChevronRight" size={15} />
                </button>
              ))
            ) : (
              <>
                <div className="agenda-empty">
                  <span className="mini-calendar">
                    <Icon name="CalendarPlus" size={28} />
                  </span>
                  <p>
                    Tem espaço para
                    <br />
                    <strong>um novo hábito.</strong>
                  </p>
                </div>
                <Button variant="secondary" endIcon="ArrowRight" onClick={() => go("plan")}>
                  Organizar minha semana
                </Button>
              </>
            )}
          </section>
          {track === "enem" ? (
            <section className="essay-promo">
              <div className="card-top">
                <span className="eyebrow">OFICINA DE REDAÇÃO</span>
                <Icon name="PenLine" size={21} />
              </div>
              <h3>
                Suas ideias merecem
                <br />
                um bom argumento.
              </h3>
              <p>Temas para praticar e um guia pelas cinco competências.</p>
              <button className="text-link" onClick={() => go("essay")}>
                Abrir minha oficina <Icon name="ArrowRight" size={16} />
              </button>
              <span className="essay-decoration" aria-hidden="true">
                Aa
              </span>
            </section>
          ) : (
            <section className="essay-promo">
              <span className="eyebrow">DIREÇÃO PARA O SEU PREPARO</span>
              <h3>Conheça a sua prova.</h3>
              <p>A trilha usa o edital de Soldado de 2023 como referência de conteúdo.</p>
              <a
                className="text-link"
                href={TRACKS.pmpe.reference.url}
                target="_blank"
                rel="noreferrer"
              >
                Consultar edital <Icon name="ArrowUpRight" size={16} />
              </a>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
