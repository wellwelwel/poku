import type { ReporterEvents, ReporterPlugin } from '../@types/poku.js';
import { poku } from '../services/reporters/poku.js';

export const silentHooks: Partial<ReporterEvents> = {
  onDescribeAsTitle() {},
  onSkipFile() {},
  onSkipModifier() {},
  onTodoModifier() {},
  onRetryStart() {},
  onRetryEnd() {},
};

export const createReporter = (events: ReporterEvents): ReporterPlugin => {
  return () => ({
    ...poku,
    ...events,
  });
};
