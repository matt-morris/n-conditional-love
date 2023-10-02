import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-tests.ts",
  },
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, "./index.ts"),
      fileName: "index",
      formats: ["es", "cjs"],
    },
  },
})
