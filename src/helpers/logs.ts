/* c8 ignore start */
import type { Configs } from '../@types/poku.js';

export const isQuiet = (configs?: Configs): boolean =>
  typeof configs?.quiet === 'boolean' && Boolean(configs?.quiet);

export const isDebug = (configs?: Configs): boolean => Boolean(configs?.debug);
/* c8 ignore stop */
