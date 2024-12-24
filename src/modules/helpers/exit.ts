import type { Code } from '../../@types/code.js';
import process from 'node:process';
import { GLOBAL, results } from '../../configs/poku.js';
import { fileResults, finalResults } from '../../configs/files.js';
import { AssertionError } from 'node:assert';

export const exit = (code: Code, quiet?: boolean) => {
  const isPoku = results.success > 0 || results.fail > 0;

  !quiet &&
    process.on('exit', (code) => {
      if (isPoku)
        GLOBAL.reporter.onExit({
          results,
          finalResults,
          fileResults,
          code,
        });
    });

  process.exitCode = code === 0 ? 0 : 1;
};

/* c8 ignore start */ // Unknown external error
process.on('unhandledRejection', (err) => {
  if (!(err instanceof AssertionError))
    console.error('unhandledRejection', err);

  process.exitCode = 1;
});

process.on('uncaughtException', (err) => {
  if (!(err instanceof AssertionError)) console.error('uncaughtException', err);

  process.exitCode = 1;
});
/* c8 ignore stop */
