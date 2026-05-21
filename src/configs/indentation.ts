import { getSharedState } from './shared-state.js';

export const indentation = getSharedState('indentation', {
  test: '  ',
  stdio: '      ',
  describeDepth: 0,
  itDepth: 0,
});
