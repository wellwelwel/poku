import type { Code } from '../../@types/code.js';
import type { Configs } from '../../@types/poku.js';
import { join } from 'node:path';
import process from 'node:process';
import { GLOBAL, results, timespan } from '../../configs/poku.js';
import { reporter } from '../../services/reporter.js';
import { runTests } from '../../services/run-tests.js';
import { exit } from '../helpers/exit.js';
import { listFiles } from '../helpers/list-files.js';

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
  const { cwd } = GLOBAL;

  const testFiles = [
    ...(await Promise.all(
      paths.map((dir) => listFiles(join(cwd, dir), configs))
    )),
  ].flat();

  if (typeof plugin === 'string' && plugin !== 'poku')
    GLOBAL.reporter = reporter[plugin]();

  try {
    if (showLogs) GLOBAL.reporter.onRunStart();

    const result = await runTests(testFiles);

    if (!result) code = 1;
  } catch {
    code = 1;
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
