import type { Code } from '../../@types/code.js';
import { AssertionError } from 'node:assert';
import process from 'node:process';
import { inspect } from 'node:util';
import { GLOBAL, timespan } from '../../configs/poku.js';
import { results } from '../../configs/results.js';

export const exit = (code: Code, quiet?: boolean) => {
  const isPoku = results.passed > 0 || results.failed > 0;

  if (!quiet && isPoku)
    GLOBAL.reporter.onExit({
      code,
      timespan,
      results,
    });

  process.exitCode = code === 0 ? 0 : 1;
};

const stderrWrite = process.stderr.write.bind(process.stderr);

process.on('unhandledRejection', (err) => {
  if (!(err instanceof AssertionError))
    stderrWrite(`unhandledRejection ${inspect(err)}\n`);

  process.exitCode = 1;
});

process.on('uncaughtException', (err) => {
  if (!(err instanceof AssertionError))
    stderrWrite(`uncaughtException ${inspect(err)}\n`);

  process.exitCode = 1;
});
