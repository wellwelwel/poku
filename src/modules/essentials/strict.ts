import { createAssert } from '../../builders/assert.js';
import { runtimeVersion } from '../../parsers/runtime-version.js';

/* c8 ignore next 4 */ // Platform version
const nodeAssert =
  !runtimeVersion || runtimeVersion >= 16
    ? require('node:assert/strict')
    : require('node:assert');

export const strict = createAssert(nodeAssert);
