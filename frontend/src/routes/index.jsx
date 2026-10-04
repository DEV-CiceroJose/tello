import { createFileRoute } from "@tanstack/react-router";
import { TelloApp } from "@/tello/TelloApp";
const tabs = ["overview", "plan", "materials", "questions", "simulations", "essay", "progress"];
export const Route = createFileRoute("/")({
  validateSearch: (search) => ({
    track: search.track === "pmpe" ? "pmpe" : "enem",
    tab:
      tabs.includes(search.tab) && !(search.track === "pmpe" && search.tab === "essay")
        ? search.tab
        : "overview",
  }),
  head: () => ({
    meta: [
      { title: "Tello — Seu próximo passo começa aqui" },
      {
        name: "description",
        content:
          "Seu espaço de estudos para ENEM e PM-PE. Aulas, questões comentadas, plano de estudos, simulados e oficina de redação.",
      },
    ],
  }),
  component: TelloApp,
});
