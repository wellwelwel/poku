import type { Plugin } from 'rollup';
import { readFile, rm } from 'node:fs/promises';
import { rollup } from 'rollup';
import declarationsPlugin from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const { version } = JSON.parse(await readFile('./package.json', 'utf8'));

const libraryReachable = new Set<string>();

const normalizePath = (moduleId: string) => moduleId.replace(/\\/g, '/');

const isLibraryEntry = (moduleId: string) =>
  normalizePath(moduleId).endsWith('/src/modules/index.ts') ||
  normalizePath(moduleId).endsWith('/src/modules/plugins.ts');

const isAnyEntry = (moduleId: string) =>
  isLibraryEntry(moduleId) ||
  normalizePath(moduleId).endsWith('/src/bin/index.ts');

const versionInject: Plugin = {
  name: 'poku-version-inject',
  transform(code, moduleId) {
    if (!normalizePath(moduleId).endsWith('/src/configs/poku.ts')) return null;

    return {
      code: code.replace("'0.0.0-placeholder'", JSON.stringify(version)),
      map: null,
    };
  },
};

const stripShebang: Plugin = {
  name: 'poku-strip-shebang',
  transform(code, moduleId) {
    if (!normalizePath(moduleId).endsWith('/src/bin/index.ts')) return null;

    return { code: code.replace(/^#!.*\n/, ''), map: null };
  },
};

const collectLibraryReachable: Plugin = {
  name: 'poku-collect-library-reachable',
  buildEnd() {
    const visit = (moduleId: string) => {
      if (libraryReachable.has(moduleId)) return;
      libraryReachable.add(moduleId);

      const moduleInfo = this.getModuleInfo(moduleId);
      if (!moduleInfo) return;

      for (const dependency of moduleInfo.importedIds) visit(dependency);
      for (const dependency of moduleInfo.dynamicallyImportedIds)
        visit(dependency);
    };

    for (const moduleId of this.getModuleIds())
      if (isLibraryEntry(moduleId)) visit(moduleId);
  },
};

const external = (moduleId: string) => moduleId.startsWith('node:');

const onwarn = () => {
  process.exitCode = 1;
};

const transpile = esbuild({
  target: 'node16',
  platform: 'node',
  tsconfig: './tsconfig.json',
  treeShaking: true,
});

const buildJavaScript = async () => {
  const esmBundle = await rollup({
    input: {
      'modules/index': './src/modules/index.ts',
      'modules/plugins': './src/modules/plugins.ts',
      'bin/index': './src/bin/index.ts',
    },
    plugins: [versionInject, stripShebang, transpile, collectLibraryReachable],
    external,
    onwarn,
  });

  await esmBundle.write({
    dir: './lib',
    format: 'es',
    entryFileNames: '[name].js',
    chunkFileNames: (chunk) =>
      chunk.name === 'modules/_shared' ? 'modules/_shared.js' : 'bin/[name].js',
    manualChunks: (moduleId) => {
      if (isAnyEntry(moduleId) || !normalizePath(moduleId).includes('/src/'))
        return;

      return libraryReachable.has(moduleId) ? 'modules/_shared' : undefined;
    },
    compact: true,
    sourcemap: false,
    minifyInternalExports: false,
    banner: (chunk) => {
      if (chunk.name === 'bin/index') return '#!/usr/bin/env node';
      if (chunk.name === 'modules/plugins')
        return "import { createRequire } from 'node:module';\nconst require = createRequire(import.meta.url);\n";

      return '';
    },
  });

  await esmBundle.close();

  const cjsBundle = await rollup({
    input: {
      'modules/index': './src/modules/index.ts',
      'modules/plugins': './src/modules/plugins.ts',
    },
    plugins: [versionInject, transpile],
    external,
    onwarn,
  });

  await cjsBundle.write({
    dir: './lib',
    format: 'cjs',
    entryFileNames: '[name].cjs',
    chunkFileNames: '[name].cjs',
    manualChunks: (moduleId) => {
      if (
        isLibraryEntry(moduleId) ||
        !normalizePath(moduleId).includes('/src/')
      )
        return;

      return 'modules/_shared';
    },
    exports: 'named',
    compact: true,
    sourcemap: false,
    minifyInternalExports: false,
  });

  await cjsBundle.close();
};

const buildTypeDeclarations = async () => {
  const globalsDeclarationFile = './lib/modules/_globals.d.ts';

  const declarationsBundle = await rollup({
    input: {
      'modules/index': './src/modules/index.ts',
      'modules/plugins': './src/modules/plugins.ts',
      'modules/_globals': './src/globals.d.ts',
    },
    plugins: [declarationsPlugin()],
    external,
  });

  await declarationsBundle.write({
    dir: './lib',
    format: 'es',
    entryFileNames: '[name].d.ts',
    chunkFileNames: 'modules/_shared.d.ts',
    minifyInternalExports: false,
    compact: true,
    sourcemap: false,
  });

  await declarationsBundle.close();
  await rm(globalsDeclarationFile, { force: true });
};

await Promise.all([buildJavaScript(), buildTypeDeclarations()]);
