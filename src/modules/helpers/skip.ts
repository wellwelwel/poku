import { exit } from 'node:process';
import { GLOBAL } from '../../configs/poku.js';

export class SkipFileSignal {
  constructor(public readonly message: string) {}
}

export const skip = (message = 'Skipping'): never => {
  if (message) GLOBAL.reporter.onSkipFile({ message });

  if (GLOBAL.configs.isolation === 'none') throw new SkipFileSignal(message);

  exit(0);
};
