// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

import { fileURLToPath } from "node:url";

const routeTreePath = fileURLToPath(new URL("./src/routeTree.gen.js", import.meta.url));

function removeGeneratedTypeFooter(source) {
  const sanitized = source
    .replace(/^\/\/ @ts-nocheck\r?\n/m, "")
    .replace(/\r?\nimport type \{ getRouter \}[\s\S]*$/, "");
  return `${sanitized.trimEnd()}\n`;
}

function isGeneratedRouteTree(id) {
  return id.split("?")[0].replaceAll("\\", "/") === routeTreePath.replaceAll("\\", "/");
}

const javascriptRouteTreePlugin = {
  name: "tello:javascript-route-tree",
  enforce: "pre",
  transform(source, id) {
    if (!isGeneratedRouteTree(id)) return null;
    return { code: removeGeneratedTypeFooter(source), map: null };
  },
};

const lovableConfig = defineConfig({
  plugins: [javascriptRouteTreePlugin],
  tanstackStart: {
    router: {
      generatedRouteTree: "routeTree.gen.js",
      disableTypes: true,
      enableRouteGeneration: true,
    },
    // Redirect TanStack Start's bundled server entry to src/server.js (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});

export default async function config(env) {
  const resolvedConfig = await lovableConfig(env);
  return {
    ...resolvedConfig,
    resolve: {
      ...resolvedConfig.resolve,
      tsconfigPaths: true,
    },
    // Lovable 2.7 still injects the legacy plugin; Vite 8 resolves these paths natively.
    plugins: resolvedConfig.plugins.filter((plugin) => plugin?.name !== "vite-tsconfig-paths"),
  };
}
