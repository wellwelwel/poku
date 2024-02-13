import { Configs } from '../@types/poku.js';

export const isQuiet = (configs?: Configs): boolean =>
  typeof configs?.quiet === 'boolean' && Boolean(configs?.quiet);

export const showSuccesses = (configs?: Configs): boolean =>
  Boolean(configs?.log?.success);

export const showFailures = (configs?: Configs): boolean =>
  typeof configs?.log?.fail === 'undefined' || Boolean(configs?.log?.fail);
