import { coverage } from '@pokujs/c8';
import { defineConfig } from 'poku';

export default defineConfig({
  plugins: [
    coverage({
      include: ['src/**'],
      reporter: ['v8', 'codecov', 'console-details'],
      experimental: ['monocart'],
      extension: ['.ts'],
      checkCoverage: 90,
      all: true,
      clean: true,
      exclude: [
        'src/@types', // Typings exports only
        'src/globals.d.ts', // Typings exports only
        'src/bin/watch.ts', // Blocked by TSX
      ],
    }),
  ],
});
