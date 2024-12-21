import { exit } from 'node:process';
import { log } from '../../services/write.js';
import { format } from '../../services/format.js';
import { GLOBAL } from '../../configs/poku.js';

export const skip = (message = 'Skipping') => {
  const { isPoku, FILE } = GLOBAL;

  if (message)
    log(
      format(
        isPoku
          ? `◯ ${message} ${format('›').dim()} ${format(`${FILE}`).italic().gray().dim()}`
          : `◯ ${message}`
      )
        .info()
        .bold()
    );

  exit(0);
};
