import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: "terser",
    outDir: "lib",
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      name: "Web Component November",
    },
    // rollupOptions: {
    //   external: /^lit/,
    // },
  },
});
