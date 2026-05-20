import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import {
  LIB_CJS,
  LIB_ESM,
  skipUnlessBuilt,
} from '../__utils__/skip-unless-built.test.js';
import { assert } from '../../src/modules/essentials/assert.js';

skipUnlessBuilt();

const require = createRequire(import.meta.url);
const { version } = JSON.parse(await readFile('./package.json', 'utf8'));

const esm = await import(LIB_ESM);
assert.strictEqual(esm.version, version, `ESM version: ${esm.version}`);

const cjs = require(LIB_CJS);
const cjsVersion = cjs.version;
assert.strictEqual(cjsVersion, version, `CJS version: ${cjsVersion}`);
