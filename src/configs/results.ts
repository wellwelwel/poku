import { getSharedState } from './shared-state.js';

export const results = getSharedState('results', () => ({
  passed: 0,
  failed: 0,
  skipped: 0,
  todo: 0,
}));
