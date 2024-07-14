import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: '/test/setup.ts',
      css: true,
      globals: true,
      coverage: {
        include: ['src/**/*.ts', 'src/**/*.tsx'],
        exclude: ['src/**/excluded-folder/**', 'src/main.tsx'],
      },
    },
  })
);
