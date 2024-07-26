import nodeAssert from 'node:assert';
import { createAssert } from '../../services/assert.js';

export const assert = createAssert(nodeAssert);
