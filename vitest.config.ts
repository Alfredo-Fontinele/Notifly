import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true, // Ativa o uso das funções globais, como `expect`, `describe`, etc.
  },
  resolve: {
    alias: {
      '@application': '/src/application',
      '@domain': '/src/domain',
      '@helpers': '/src/helpers',
      '@infra': '/src/infra',
      '@test': '/test',
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
