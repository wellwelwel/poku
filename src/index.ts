#!/usr/bin/env node

import { forceArray } from './helpers/force-array.js';
import { hr } from './helpers/hr.js';
import { runTests } from './services/runTests.js';
import type { Code } from './@types/code.js';
import type { Configs } from './@types/poku.js';

export const exit = (code: Code, quiet?: boolean) => {
  !quiet &&
    process.on('exit', (code) => {
      console.log(`About to exit with code`, code);
    });

  !quiet && hr();

  if (code !== 0) {
    !quiet && console.log('Some tests failed.');
    process.exit(1);
  }

  !quiet && console.log('All tests passed.');
  process.exit(0);
};

export async function poku(
  targetDirs: string | string[],
  configs: Configs & { noExit: true }
): Promise<Code>;
export async function poku(
  targetDirs: string | string[],
  configs?: Configs
): Promise<Code>;
export async function poku(
  targetDirs: string | string[],
  configs?: Configs
): Promise<Code | void> {
  let code: Code = 0;
  const dirs = forceArray(targetDirs);

  for (const dir of dirs) {
    const result = await runTests(dir, configs);

    if (!result) code = 1;
  }

  if (configs?.noExit) return code;

  exit(code, configs?.quiet);
}

process.stdout.on('resize', hr);

process.on('unhandledRejection', (reason) => {
  console.log('unhandledRejection', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
  process.exit(1);
});
