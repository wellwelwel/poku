import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { assert } from '../../src/modules/essentials/assert.js';

const require = createRequire(import.meta.url);
const { version } = JSON.parse(await readFile('./package.json', 'utf8'));

// @ts-ignore <depends on build>
const esm = await import('../../lib/modules/index.js');
assert.strictEqual(esm.version, version, `ESM version: ${esm.version}`);

// @ts-ignore <depends on build>
const cjs = require('../../lib/modules/index.cjs');
const cjsVersion = cjs.version;
assert.strictEqual(cjsVersion, version, `CJS version: ${cjsVersion}`);
