import { useEffect, useRef, useState } from "react";
import { Button } from "./ui";
import EXAMS from "./exam-library.json";

// Loaded only when an official question is opened. No external PDF service or iframe.
export function ExamReader({ question, showAnswer = false }) {
  const source = EXAMS.find((e) => e.id === question.examId);
  const [page, setPage] = useState(question.location.page);
  const [zoom, setZoom] = useState(false);
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transcript, setTranscript] = useState(null);
  const canvas = useRef(null);
  const scroll = useRef(null);
  useEffect(() => {
    let active = true;
    let task;
    const controller = new AbortController();
    setError(false);
    setDocument(null);
    const load = async () => {
      const [pdfjs, worker] = await Promise.all([
        import("pdfjs-dist/build/pdf.mjs"),
        import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
      ]);
      if (!active) return;
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
      task = pdfjs.getDocument({
        url: source.studyPath,
        cMapUrl: "/pdfjs/cmaps/",
        cMapPacked: true,
        standardFontDataUrl: "/pdfjs/standard_fonts/",
        wasmUrl: "/pdfjs/wasm/",
        isEvalSupported: false,
      });
      const pdf = await task.promise;
      if (active) setDocument(pdf);
    };
    load().catch(() => {
      if (active) {
        setError(true);
        setLoading(false);
      }
    });
    fetch(`/exams/${source.id}-text.json`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("text");
        return r.json();
      })
      .then((text) => {
        if (active) setTranscript(text);
      })
      .catch(() => {});
    return () => {
      active = false;
      controller.abort();
      task?.destroy();
    };
  }, [source]);
  useEffect(() => {
    if (!document) return;
    let active = true;
    let rendering;
    setLoading(true);
    setError(false);
    const render = async () => {
      const pdfPage = await document.getPage(page);
      if (!active) return;
      const viewport = pdfPage.getViewport({ scale: 1 });
      const scale = 1500 / viewport.width;
      const target = pdfPage.getViewport({ scale });
      const element = canvas.current;
      element.width = Math.ceil(target.width);
      element.height = Math.ceil(target.height);
      rendering = pdfPage.render({ canvasContext: element.getContext("2d"), viewport: target });
      await rendering.promise;
      if (!active) return;
      setLoading(false);
      // Start at the selected item; preceding pages remain available for shared texts.
      requestAnimationFrame(() => {
        if (active && scroll.current) {
          scroll.current.scrollTop =
            page === question.location.page
              ? Math.max(0, question.location.y * element.clientHeight - 45)
              : 0;
          scroll.current.scrollLeft =
            page === question.location.page && zoom
              ? Math.max(0, question.location.x * element.clientWidth - 25)
              : 0;
        }
      });
    };
    render().catch((e) => {
      if (active && e.name !== "RenderingCancelledException") {
        setError(true);
        setLoading(false);
      }
    });
    return () => {
      active = false;
      rendering?.cancel();
    };
  }, [document, page, question.location, zoom]);
  if (!source) return null;
  return (
    <section
      className="exam-reader"
      aria-label={`Caderno original, questão ${question.questionNumber}`}
    >
      {question.historical && (
        <p className="notice warning">
          Prova histórica de {source.year} · {source.role}. O gabarito reflete aquela edição;
          legislação, jurisprudência e programas podem ter mudado.{" "}
          {source.role === "Oficial" &&
            "Conteúdo complementar de Oficial, distinto da preparação de Soldado."}
        </p>
      )}
      <p className="small-muted">
        Leia a questão {question.questionNumber} no caderno e marque a alternativa abaixo. Use as
        páginas anteriores para textos compartilhados e a próxima para continuações.
        {source.language && ` Língua estrangeira selecionada: ${source.language}.`}
      </p>
      <div className="exam-reader-toolbar">
        <Button variant="secondary" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Página anterior
        </Button>
        <span aria-live="polite">
          Página {page} / {source.pageCount}
        </span>
        <Button
          variant="secondary"
          disabled={page >= source.pageCount}
          onClick={() => setPage((p) => p + 1)}
        >
          Próxima página
        </Button>
        <Button variant="ghost" aria-pressed={zoom} onClick={() => setZoom((z) => !z)}>
          {zoom ? "Ajustar largura" : "Ampliar"}
        </Button>
        {page !== question.location.page && (
          <Button variant="ghost" onClick={() => setPage(question.location.page)}>
            Voltar à questão
          </Button>
        )}
      </div>
      {loading && <p role="status">Carregando página do caderno…</p>}
      {error && (
        <p role="alert">
          Não foi possível exibir esta página. Abra ou baixe o caderno no link abaixo.
        </p>
      )}
      <div
        className={`pdf-scroll ${zoom ? "zoomed" : ""}`}
        ref={scroll}
        tabIndex={0}
        aria-label="Página da prova; use as setas para rolar"
      >
        <div className="pdf-page">
          <canvas
            ref={canvas}
            role="img"
            aria-label={`Página ${page} do caderno ${source.title}. Transcrição e PDF disponíveis abaixo.`}
          />
          {!loading && !error && page === question.location.page && (
            <span
              className="pdf-question-marker"
              style={{
                top: `${question.location.y * 100}%`,
                left: `${question.location.x * 100}%`,
              }}
              aria-hidden="true"
            >
              ➜
            </span>
          )}
        </div>
      </div>
      <details className="pdf-transcript">
        <summary>Texto da página para leitura e seleção</summary>
        <p className="small-muted">
          Extração automática do original. Fórmulas, gráficos e ordem das colunas devem ser
          conferidos na página visual.
        </p>
        <pre>{transcript?.[page - 1] || "Transcrição indisponível. Consulte o PDF original."}</pre>
      </details>
      <div className="resource-links">
        <a href={`${source.studyPath}#page=${page}`} target="_blank" rel="noreferrer">
          Abrir caderno ↗
        </a>
        <a href={source.studyPath} download>
          Baixar caderno
        </a>
        {showAnswer && (
          <a href={source.answerPath} target="_blank" rel="noreferrer">
            Gabarito oficial ↗
          </a>
        )}
        {showAnswer && (
          <a href={source.sourcePage} target="_blank" rel="noreferrer">
            Fonte e publicações da banca ↗
          </a>
        )}
      </div>
      {source.studyNote && <p className="small-muted">{source.studyNote}</p>}
    </section>
  );
}
