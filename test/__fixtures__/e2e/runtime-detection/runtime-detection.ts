import { strict as assert } from 'node:assert';
import { GLOBAL } from '../../../../src/configs/poku.js';

assert.strictEqual(GLOBAL.runtime, 'node');
