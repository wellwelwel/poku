import { exit, env } from 'node:process';
import { Write } from '../../services/write.js';
import { format } from '../../services/format.js';

export const skip = (message = 'Skipping') => {
  const isPoku = typeof env?.FILE === 'string' && env?.FILE.length > 0;
  const FILE = env.FILE;

  if (message) {
    Write.log(
      format(
        isPoku
          ? `◯ ${message} ${format('›').dim()} ${format(`${FILE}`).italic().gray().dim()}`
          : `◯ ${message}`
      )
        .info()
        .bold()
    );
  }

  exit(0);
};
