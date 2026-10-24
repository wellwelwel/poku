import { strict as nodeAssert } from 'node:assert';
import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';

describe('In-process suite exit status', async () => {
  await it('preserves a previous failure after a successful nested suite', async () => {
    const extension = isBuild ? 'mjs' : 'mts';
    const result = await inspectPoku(
      `preserve-status.test.${extension} --debug`,
      {
        cwd: 'test/__fixtures__/e2e/no-isolate',
      }
    );
    nodeAssert.strictEqual(result.exitCode, 1);
    nodeAssert.match(result.stdout, /nested suite exit code: 0/);
    nodeAssert.match(result.stdout, /preserved exit code: 1/);
  });
});
