import nodeAssert from 'node:assert';
import { createAssert } from '../builders/assert.js';

export const assert = createAssert(nodeAssert);
