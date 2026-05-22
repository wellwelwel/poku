import type { Results } from '../../@types/plugin.js';
import { parseTimeToSecs } from '../../parsers/time.js';
import { format } from '../format.js';
import { hr, log } from '../write.js';

const LABEL_FILES_PASSED = '\x1b[2mtest file(s) passed\x1b[0m';
const LABEL_FILES_FAILED = '\x1b[2mtest file(s) failed\x1b[0m';

export const summaryFooter = (
  countFails: number,
  { timespan, results }: Pick<Results, 'timespan' | 'results'>
): void => {
  if (countFails > 0) hr();

  log(
    `${format(results.passed.toString()).bold().dim()} ${LABEL_FILES_PASSED}`
  );
  log(
    `${format(results.failed.toString()).bold().dim()} ${LABEL_FILES_FAILED}`
  );
  log(
    `${format(`Finished in ±${parseTimeToSecs(timespan.duration)} seconds`).dim()}`
  );
};
