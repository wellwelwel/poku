import type { Results } from '../../@types/plugin.js';
import { parseTimeToSecs } from '../../parsers/time.js';
import { format } from '../format.js';
import { hr, log } from '../write.js';

const LABEL_FILES_PASSED = '\x1b[2mtest file(s) passed\x1b[0m';
const LABEL_FILES_FAILED = '\x1b[2mtest file(s) failed\x1b[0m';

export const summaryFooter = ({
  timespan,
  results,
}: Pick<Results, 'timespan' | 'results'>) => {
  if (results.failed > 0) hr();

  log(`${format(String(results.passed)).bold().dim()} ${LABEL_FILES_PASSED}`);
  log(`${format(String(results.failed)).bold().dim()} ${LABEL_FILES_FAILED}`);
  log(
    `${format(`Finished in ±${parseTimeToSecs(timespan.duration)} seconds`).dim()}`
  );
};
