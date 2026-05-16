import { readFileSync } from 'node:fs';
import { assert } from '../../src/modules/essentials/assert.js';

const { version } = JSON.parse(readFileSync('./package.json', 'utf8'));

const esm = await import('../../lib/modules/index.js');
assert.strictEqual(esm.version, version, `ESM version: ${esm.version}`);

const cjs = await import('../../lib/modules/index.cjs');
const cjsVersion = cjs.version ?? cjs.default?.version;
assert.strictEqual(cjsVersion, version, `CJS version: ${cjsVersion}`);
