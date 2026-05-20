import { cwd as processCwd } from 'node:process';
import { getSharedState } from './shared-state.js';

export const cwd = getSharedState('cwd', processCwd());
