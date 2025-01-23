import type { Code } from '../../@types/code.js';
import type { Configs } from '../../@types/poku.js';
import process from 'node:process';
import { exit } from '../helpers/exit.js';
import { results, timespan } from '../../configs/poku.js';
import { runTests } from '../../services/run-tests.js';
import { GLOBAL } from '../../configs/poku.js';
import { reporter } from '../../services/reporter.js';

/* c8 ignore next 1 */ // Process-based
export const onSigint = () => process.stdout.write('\u001B[?25h');

process.once('SIGINT', onSigint);

export async function poku(
  targetPaths: string | string[],
  configs: Configs & { noExit: true }
): Promise<Code>;
export async function poku(
  targetPaths: string | string[],
  configs?: Configs
): Promise<undefined>;
export async function poku(
  targetPaths: string | string[],
  configs?: Configs
): Promise<Code | undefined> {
  let code: Code = 0;

  if (configs) GLOBAL.configs = { ...GLOBAL.configs, ...configs };

  timespan.started = new Date();

  const start = process.hrtime();
  const paths: string[] = Array.prototype.concat(targetPaths);
  const showLogs = !GLOBAL.configs.quiet;
  const { reporter: plugin } = GLOBAL.configs;

  if (typeof plugin === 'string' && plugin !== 'poku')
    GLOBAL.reporter = reporter[plugin]();

  if (showLogs) GLOBAL.reporter.onRunStart();

  try {
    const promises = paths.map(async (dir) => await runTests(dir));
    const concurrency = await Promise.all(promises);

    if (concurrency.some((result) => !result)) code = 1;
  } finally {
    const end = process.hrtime(start);
    const total = end[0] * 1e3 + end[1] / 1e6;

    timespan.duration = total;
    timespan.finished = new Date();
  }

  if (showLogs) GLOBAL.reporter.onRunResult({ code, timespan, results });
  if (GLOBAL.configs.noExit) return code;

  exit(code, GLOBAL.configs.quiet);
}
