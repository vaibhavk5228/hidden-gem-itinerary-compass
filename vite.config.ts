// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages serves this site from /hidden-gem-itinerary-compass/. Only apply that base
// for the github-pages build so the Lovable preview and published site keep working at "/".
const isGitHubPages = process.env.NITRO_PRESET === "github-pages";
const GITHUB_PAGES_BASE = "/hidden-gem-itinerary-compass/";

export default defineConfig({
  vite: {
    base: isGitHubPages ? GITHUB_PAGES_BASE : "/",
  },
  // Tell Nitro's prerenderer about the same base so it renders pages under it.
  ...(isGitHubPages ? { nitro: { baseURL: GITHUB_PAGES_BASE } } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
