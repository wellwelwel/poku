import type { OutputOptions, Plugin, RollupLog } from 'rollup';
import { readFile, rm } from 'node:fs/promises';
import { rollup } from 'rollup';
import declarationsPlugin from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

type BundleConfig = {
  format: 'es' | 'cjs';
  extension: 'js' | 'cjs';
  inputs: Record<string, string>;
  plugins: Plugin[];
  isEntry: (moduleId: string) => boolean;
  libraryReachable: Set<string>;
  writeOptions: OutputOptions;
};

const { version } = JSON.parse(await readFile('./package.json', 'utf8'));

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

const stripDocComments: Plugin = {
  name: 'poku-strip-doc-comments',
  renderChunk(code) {
    return {
      code: code.replace(/[ \t]*\/\*\*[\s\S]*?\*\/\n?/g, ''),
      map: null,
    };
  },
};

const makeLibraryReachableCollector = () => {
  const libraryReachable = new Set<string>();

  const plugin: Plugin = {
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

  return { plugin, libraryReachable };
};

const external = (moduleId: string) => moduleId.startsWith('node:');

const onwarn = (warning: RollupLog) => {
  process.stderr.write(
    `[rollup] ${warning.code ?? 'UNKNOWN'}: ${warning.message}\n`
  );
  process.exitCode = 1;
};

const createTranspile = () =>
  esbuild({
    target: 'node16',
    platform: 'node',
    tsconfig: './tsconfig.json',
    treeShaking: true,
  });

const buildBundle = async (config: BundleConfig) => {
  const bundle = await rollup({
    input: config.inputs,
    plugins: config.plugins,
    external,
    onwarn,
  });

  await bundle.write({
    dir: './lib',
    format: config.format,
    entryFileNames: `[name].${config.extension}`,
    chunkFileNames: (chunk) =>
      chunk.name === '_shared'
        ? `modules/_shared.${config.extension}`
        : `bin/[name].${config.extension}`,
    manualChunks: (moduleId) => {
      if (
        config.isEntry(moduleId) ||
        !normalizePath(moduleId).includes('/src/')
      )
        return;

      return config.libraryReachable.has(moduleId) ? '_shared' : undefined;
    },
    compact: true,
    sourcemap: false,
    minifyInternalExports: false,
    ...config.writeOptions,
  });

  await bundle.close();
};

const buildJavaScript = async () => {
  const collector = makeLibraryReachableCollector();

  await buildBundle({
    format: 'es',
    extension: 'js',
    inputs: {
      'modules/index': './src/modules/index.ts',
      'modules/plugins': './src/modules/plugins.ts',
      'bin/index': './src/bin/index.ts',
    },
    plugins: [
      versionInject,
      stripShebang,
      createTranspile(),
      collector.plugin,
      stripDocComments,
    ],
    isEntry: isAnyEntry,
    libraryReachable: collector.libraryReachable,
    writeOptions: {
      banner: (chunk) => {
        if (chunk.name === 'bin/index') return '#!/usr/bin/env node';
        if (chunk.name === 'modules/plugins')
          return "import { createRequire } from 'node:module';\nconst require = createRequire(import.meta.url);\n";

        return '';
      },
    },
  });

  await buildBundle({
    format: 'cjs',
    extension: 'cjs',
    inputs: {
      'modules/index': './src/modules/index.ts',
      'modules/plugins': './src/modules/plugins.ts',
    },
    plugins: [versionInject, createTranspile(), stripDocComments],
    isEntry: isLibraryEntry,
    libraryReachable: collector.libraryReachable,
    writeOptions: {
      exports: 'named',
    },
  });
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
