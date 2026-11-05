import { strict as nodeAssert } from 'node:assert';
import { inspectPoku, stripAnsi } from '../__utils__/capture-cli.test.js';
import { describe, it } from '../../src/modules/index.js';

await describe('Each hooks between files without isolation', async () => {
  await it('does not run beforeEach and afterEach registered by a previous file', async () => {
    const result = await inspectPoku(
      'test/__fixtures__/e2e/each-reset --isolation=none'
    );
    const output = stripAnsi(result.stdout + result.stderr);

    nodeAssert.strictEqual(result.exitCode, 0, output);
    nodeAssert.match(output, /PASS › 2/);
    nodeAssert.match(output, /FAIL › 0/);
  });
});
