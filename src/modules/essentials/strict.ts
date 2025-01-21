import { createAssert } from '../../builders/assert.js';
import { GLOBAL } from '../../configs/poku.js';
import { runtimeVersion } from '../../parsers/runtime-version.js';

/* c8 ignore next 4 */ // Platform version
const nodeAssert =
  GLOBAL.runtime !== 'node' || runtimeVersion >= 16
    ? require('node:assert/strict')
    : require('node:assert');

export const strict = createAssert(nodeAssert);
