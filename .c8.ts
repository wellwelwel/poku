import { platform } from 'node:process';
import { coverage } from '@pokujs/c8';
import { defineConfig } from './src/modules/index.js';

const coveragePerPlatform: Record<string, number> = {
  darwin: 97,
  linux: 97,
  win32: 95,
};

export default defineConfig({
  plugins: [
    coverage({
      include: ['src/**'],
      reporter: ['v8', 'codecov', 'console-details'],
      experimental: ['monocart'],
      extension: ['.ts'],
      checkCoverage: coveragePerPlatform[platform] ?? 97,
      all: true,
      clean: true,
      exclude: [
        'src/@types', // Typings exports only
        'src/globals.d.ts', // Typings exports only
      ],
    }),
  ],
});
