import { coverage } from '@pokujs/c8';
import { defineConfig } from './src/modules/index.js';

export default defineConfig({
  plugins: [
    coverage({
      include: ['src/**'],
      reporter: ['v8', 'codecov', 'text'],
      experimental: ['monocart'],
      extension: ['.ts'],
      checkCoverage: 95,
      all: true,
      clean: true,
      exclude: [
        'src/@types', // Typings exports only
        'src/globals.d.ts', // Typings exports only
      ],
    }),
  ],
});
