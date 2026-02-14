import type { Code } from '../../@types/code.js';
import type { Configs } from '../../@types/poku.js';
import { join } from 'node:path';
import process, { hrtime, stdout } from 'node:process';
import { GLOBAL, results, timespan } from '../../configs/poku.js';
import { reporter } from '../../services/reporter.js';
import { runTests } from '../../services/run-tests.js';
import { exit } from '../helpers/exit.js';
import { listFiles } from '../helpers/list-files.js';

/* c8 ignore next 1 */ // Process-based
export const onSigint = () => stdout.write('\u001B[?25h');

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
  if (configs) GLOBAL.configs = { ...GLOBAL.configs, ...configs };

  timespan.started = new Date();

  const start = hrtime();
  const paths = Array.isArray(targetPaths) ? targetPaths : [targetPaths];
  const showLogs = !GLOBAL.configs.quiet;
  const { reporter: plugin } = GLOBAL.configs;
  const { cwd } = GLOBAL;

  let testFiles: string[];

  if (paths.length === 1)
    testFiles = await listFiles(join(cwd, paths[0]), GLOBAL.configs);
  else {
    const nestedFiles = await Promise.all(
      paths.map((path) => listFiles(join(cwd, path), GLOBAL.configs))
    );
    testFiles = [];

    for (const files of nestedFiles)
      for (const file of files) testFiles.push(file);
  }

  if (typeof plugin === 'string' && plugin !== 'poku')
    GLOBAL.reporter = reporter[plugin]();

  if (showLogs) GLOBAL.reporter.onRunStart();

  const result = await runTests(testFiles);
  const code: Code = result ? 0 : 1;
  const end = hrtime(start);
  const total = end[0] * 1e3 + end[1] / 1e6;

  timespan.duration = total;
  timespan.finished = new Date();

  if (showLogs) GLOBAL.reporter.onRunResult({ code, timespan, results });
  if (GLOBAL.configs.noExit) return code;

  exit(code, GLOBAL.configs.quiet);
}
