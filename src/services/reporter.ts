import type { Reporter, ReporterPlugin } from '../@types/poku.js';
import { classic } from './reporters/classic.js';
import { compact } from './reporters/compact.js';
import { dot } from './reporters/dot.js';
import { focus } from './reporters/focus.js';
import { poku } from './reporters/poku.js';
import { verbose } from './reporters/verbose.js';

export const reporter: Record<Reporter, ReporterPlugin> = {
  poku: () => poku,
  dot,
  compact,
  focus,
  verbose,
  classic,
};
