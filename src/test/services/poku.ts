import { Code } from '../../@types/code.js';
import { Configs } from '../../@types/poku.js';
import { forceArray } from '../../helpers/force-array.js';
import { runTests } from '../../services/runTests.js';
import { exit } from './exit.js';

export async function poku(
  targetDirs: string | string[],
  configs?: Configs
): Promise<void>;
export async function poku(
  targetDirs: string | string[],
  configs: Configs & { noExit: true }
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
