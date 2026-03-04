import type { ReporterPlugin } from '../@types/poku.js';
import { classic } from './reporters/classic.js';
import { compact } from './reporters/compact.js';
import { dot } from './reporters/dot.js';
import { focus } from './reporters/focus.js';
import { poku } from './reporters/poku.js';

export const reporter: Record<string, ReporterPlugin> = {
  poku: () => poku,
  dot,
  compact,
  focus,
  classic,
};
