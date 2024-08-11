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
      include: [
        'app/**/*.ts',
        'app/**/*.tsx'
      ],
      exclude: [
        'app/state/**',
        'app/entry.client.tsx',
        'app/entry.server.tsx',
      ],
    },
  },
});
