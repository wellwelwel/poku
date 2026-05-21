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
  external?: (moduleId: string) => boolean;
  inlineDynamicImports?: boolean;
};

const { version } = JSON.parse(await readFile('./package.json', 'utf8'));

const normalizePath = (moduleId: string) => moduleId.replace(/\\/g, '/');

const isLibraryEntry = (moduleId: string) =>
  normalizePath(moduleId).endsWith('/src/modules/index.ts') ||
  normalizePath(moduleId).endsWith('/src/modules/plugins.ts');

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

    return { code: code.replace(/^#!.*\r?\n/, ''), map: null };
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

const createTranspile = (_: { minify?: boolean } = Object.create(null)) =>
  esbuild({
    target: 'node16',
    platform: 'node',
    tsconfig: './tsconfig.json',
    treeShaking: true,
    minify: false,
  });

const buildBundle = async (config: BundleConfig) => {
  const bundle = await rollup({
    input: config.inputs,
    plugins: config.plugins,
    external: config.external ?? external,
    onwarn,
  });

  const writeOptions: OutputOptions = {
    dir: './lib',
    format: config.format,
    entryFileNames: `[name].${config.extension}`,
    chunkFileNames: (chunk) =>
      chunk.name === '_shared'
        ? `modules/_shared.${config.extension}`
        : `bin/[name].${config.extension}`,
    compact: true,
    sourcemap: false,
    minifyInternalExports: false,
    ...config.writeOptions,
  };

  if (config.inlineDynamicImports) writeOptions.inlineDynamicImports = true;
  else
    writeOptions.manualChunks = (moduleId) => {
      if (
        config.isEntry(moduleId) ||
        !normalizePath(moduleId).includes('/src/')
      )
        return;

      return config.libraryReachable.has(moduleId) ? '_shared' : undefined;
    };

  await bundle.write(writeOptions);

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
    },
    plugins: [
      versionInject,
      createTranspile(),
      collector.plugin,
      stripDocComments,
    ],
    isEntry: isLibraryEntry,
    libraryReachable: collector.libraryReachable,
    writeOptions: {
      banner: (chunk) =>
        chunk.name === 'modules/plugins'
          ? "import { createRequire } from 'node:module';\nconst require = createRequire(import.meta.url);\n"
          : '',
    },
  });

  const sharedAlias: Plugin = {
    name: 'poku-shared-alias',
    async resolveId(source, importer) {
      if (!importer || source.startsWith('node:') || !source.startsWith('.'))
        return null;

      const resolved = await this.resolve(source, importer, {
        skipSelf: true,
      });

      if (resolved && collector.libraryReachable.has(resolved.id))
        return { id: '../modules/_shared.js', external: true };

      return null;
    },
  };

  await buildBundle({
    format: 'es',
    extension: 'js',
    inputs: { 'bin/index': './src/bin/index.ts' },
    plugins: [
      versionInject,
      stripShebang,
      sharedAlias,
      createTranspile(),
      stripDocComments,
    ],
    isEntry: (moduleId) =>
      normalizePath(moduleId).endsWith('/src/bin/index.ts'),
    libraryReachable: collector.libraryReachable,
    inlineDynamicImports: true,
    writeOptions: {
      banner: () => '#!/usr/bin/env node',
    },
  });

  await buildBundle({
    format: 'cjs',
    extension: 'cjs',
    inputs: {
      'modules/index': './src/modules/index.ts',
      'modules/plugins': './src/modules/plugins.ts',
    },
    plugins: [
      versionInject,
      createTranspile({ minify: true }),
      stripDocComments,
    ],
    isEntry: isLibraryEntry,
    libraryReachable: collector.libraryReachable,
    writeOptions: {
      exports: 'named',
    },
  });
};

const buildTypeDeclarations = async () => {
  const declarationsBundle = await rollup({
    input: {
      'modules/index': './src/modules/index.ts',
      'modules/plugins': './src/modules/plugins.ts',
      'modules/_globals': './src/globals.d.ts',
    },
    plugins: [declarationsPlugin()],
    external,
  });

  for (const extension of ['d.ts', 'd.cts'] as const) {
    await declarationsBundle.write({
      dir: './lib',
      format: 'es',
      entryFileNames: `[name].${extension}`,
      chunkFileNames: `modules/_shared.${extension}`,
      minifyInternalExports: false,
      compact: true,
      sourcemap: false,
    });
  }

  await declarationsBundle.close();
  await rm('./lib/modules/_globals.d.ts', { force: true });
  await rm('./lib/modules/_globals.d.cts', { force: true });
};

await Promise.all([buildJavaScript(), buildTypeDeclarations()]);
