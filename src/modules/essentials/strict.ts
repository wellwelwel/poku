import { createAssert } from '../../builders/assert.js';
import { nodeVersion } from '../../parsers/get-runtime.js';

/* c8 ignore next 4 */ // Platform version
const nodeAssert =
  !nodeVersion || nodeVersion >= 16
    ? require('node:assert/strict')
    : require('node:assert');

export const strict = createAssert(nodeAssert);
