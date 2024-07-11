import type { EachConfigs } from '../@types/each.js';

export const each: {
  before: EachConfigs;
  after: EachConfigs;
} = {
  before: {
    status: true,
    cb: undefined,
  },
  after: {
    status: true,
    cb: undefined,
  },
};
