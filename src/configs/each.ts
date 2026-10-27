import type { EachConfigs } from '../@types/each.js';
import { getSharedState } from './shared-state.js';

export const each = getSharedState<{
  before: EachConfigs;
  after: EachConfigs;
}>('each', {
  before: {
    status: true,
    cb: undefined,
  },
  after: {
    status: true,
    cb: undefined,
  },
});
