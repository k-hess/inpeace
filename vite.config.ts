import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    // Every route is `ssr: false` (see src/routes), so this is a client-only
    // SPA. `spa.enabled` makes the build prerender a static shell — written
    // to dist/client/index.html via outputPath — so a Cloudflare Workers
    // assets-only deploy (no server Worker) has something to serve for
    // `not_found_handling: "single-page-application"`.
    tanstackStart({
      spa: {
        enabled: true,
        prerender: {
          outputPath: '/index',
        },
      },
    }),
    viteReact(),
  ],
})

export default config
