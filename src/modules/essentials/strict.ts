import nodeAssert from 'node:assert/strict';
import { createAssert } from '../../services/assert.js';

export const strict = createAssert(nodeAssert);
