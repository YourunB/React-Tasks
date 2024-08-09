import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: '/test/setup.ts',
    css: true,
    globals: true,
    coverage: {
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/pages/index.tsx', 'src/pages/_app.tsx'],
    },
  },
});
