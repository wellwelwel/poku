import type { Plugin, RollupLog } from 'rollup';
import { readFileSync } from 'node:fs';
import { rollup } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';

const { version } = JSON.parse(readFileSync('./package.json', 'utf8'));

const norm = (id: string) => id.replace(/\\/g, '/');
const isLibEntry = (id: string) =>
  norm(id).endsWith('/src/modules/index.ts') ||
  norm(id).endsWith('/src/modules/plugins.ts');
const isAnyEntry = (id: string) =>
  isLibEntry(id) || norm(id).endsWith('/src/bin/index.ts');

const versionInject: Plugin = {
  name: 'poku-version-inject',
  transform(code, id) {
    if (!norm(id).endsWith('/src/configs/poku.ts')) return null;

    return {
      code: code.replace("'0.0.0-placeholder'", JSON.stringify(version)),
      map: null,
    };
  },
};

const stripShebang: Plugin = {
  name: 'poku-strip-shebang',
  transform(code, id) {
    if (!norm(id).endsWith('/src/bin/index.ts')) return null;

    return { code: code.replace(/^#!.*\n/, ''), map: null };
  },
};

const libReachable = new Set<string>();

const collectLibReachable: Plugin = {
  name: 'poku-collect-lib-reachable',
  buildEnd() {
    const visit = (id: string) => {
      if (libReachable.has(id)) return;
      libReachable.add(id);

      const info = this.getModuleInfo(id);
      if (!info) return;

      for (const dep of info.importedIds) visit(dep);
      for (const dep of info.dynamicallyImportedIds) visit(dep);
    };

    for (const id of this.getModuleIds()) if (isLibEntry(id)) visit(id);
  },
};

const external = (id: string) => id.startsWith('node:');

const onwarn = (warning: RollupLog, warn: (warning: RollupLog) => void) => {
  // TODO: resolve all circular dependencies
  if (warning.code === 'CIRCULAR_DEPENDENCY') return;
  warn(warning);
};

const transpile = esbuild({
  target: 'node16',
  platform: 'node',
  tsconfig: './tsconfig.json',
  treeShaking: true,
  minify: true,
});

const esm = await rollup({
  input: {
    'modules/index': './src/modules/index.ts',
    'modules/plugins': './src/modules/plugins.ts',
    'bin/index': './src/bin/index.ts',
  },
  plugins: [versionInject, stripShebang, transpile, collectLibReachable],
  external,
  onwarn,
});

await esm.write({
  dir: './lib',
  format: 'es',
  entryFileNames: '[name].js',
  chunkFileNames: (chunk) =>
    chunk.name === 'modules/_shared' ? 'modules/_shared.js' : 'bin/[name].js',
  manualChunks: (id) => {
    if (isAnyEntry(id) || !norm(id).includes('/src/')) return;

    return libReachable.has(id) ? 'modules/_shared' : undefined;
  },
  minifyInternalExports: false,
  compact: true,
  sourcemap: false,
  banner: (chunk) => {
    if (chunk.name === 'bin/index') return '#!/usr/bin/env node';
    if (chunk.name === 'modules/plugins')
      return "import { createRequire } from 'node:module';\nconst require = createRequire(import.meta.url);\n";

    return '';
  },
});

await esm.close();

const cjs = await rollup({
  input: {
    'modules/index': './src/modules/index.ts',
    'modules/plugins': './src/modules/plugins.ts',
  },
  plugins: [versionInject, transpile],
  external,
  onwarn,
});

await cjs.write({
  dir: './lib',
  format: 'cjs',
  entryFileNames: '[name].cjs',
  chunkFileNames: '[name].cjs',
  manualChunks: (id) => {
    if (isLibEntry(id) || !norm(id).includes('/src/')) return;

    return 'modules/_shared';
  },
  exports: 'named',
  minifyInternalExports: false,
  compact: true,
  sourcemap: false,
});

await cjs.close();
