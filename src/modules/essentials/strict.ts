import nodeAssert from 'node:assert/strict';
import { createAssert } from '../../builders/assert.js';

export const strict = createAssert(nodeAssert);
