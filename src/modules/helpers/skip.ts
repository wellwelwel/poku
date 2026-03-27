import { exit } from 'node:process';
import { GLOBAL } from '../../configs/poku.js';

export const skip = (message = 'Skipping'): never => {
  if (message) GLOBAL.reporter.onSkipFile({ message });

  exit(0);
};
