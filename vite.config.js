import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`        → normal multi-file site for Vercel / Netlify / GitHub Pages.
// `npm run build:single` → one self-contained HTML file (used for the preview link).
//
// The single-file variant is selected with `--mode single` rather than an env
// var, because `SINGLE=1 vite build` is POSIX-only syntax and fails on Windows.
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
}))
