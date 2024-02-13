import { Configs } from '../@types/poku.js';

export const isQuiet = (configs?: Configs): boolean =>
  typeof configs?.quiet === 'boolean' && Boolean(configs?.quiet);
