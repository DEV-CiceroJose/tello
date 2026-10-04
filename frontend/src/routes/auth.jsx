import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/auth")({
  beforeLoad: () => {
    throw redirect({ to: "/", search: { track: "enem", tab: "overview" } });
  },
});
