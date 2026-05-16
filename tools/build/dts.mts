import { rm } from 'node:fs/promises';
import { rollup } from 'rollup';
import dts from 'rollup-plugin-dts';

const ambientOutput = './lib/modules/_globals.d.ts';
const bundle = await rollup({
  input: {
    'modules/index': './src/modules/index.ts',
    'modules/plugins': './src/modules/plugins.ts',
    'modules/_globals': './src/globals.d.ts',
  },
  plugins: [dts()],
  external: (id) => id.startsWith('node:'),
});

await bundle.write({
  dir: './lib',
  format: 'es',
  entryFileNames: '[name].d.ts',
  chunkFileNames: 'modules/_shared.d.ts',
  minifyInternalExports: false,
  compact: true,
  sourcemap: false,
});

await bundle.close();
await rm(ambientOutput, { force: true });
