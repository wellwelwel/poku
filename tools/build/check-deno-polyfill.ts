import { readFileSync } from 'node:fs';
import { assert } from '../../src/modules/essentials/assert.js';

const content = readFileSync('./lib/polyfills/deno.mjs', { encoding: 'utf-8' });

assert.match(
  content,
  /import { createRequire } from 'node:module';/,
  'Deno Polyfill'
);
