import type { Reporter, ReporterPlugin } from '../@types/poku.js';
import { poku } from './reporters/poku.js';
import { mini } from './reporters/mini.js';

export const reporter: Record<Reporter, ReporterPlugin> = {
  poku: () => poku,
  mini,
};
