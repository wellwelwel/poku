import { strict as nodeAssert } from 'node:assert';
import { ext, inspectPoku } from '../__utils__/capture-cli.test.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';

await describe('Public retry behavior with assertion capture installed', async () => {
  await it('retries callbacks from resources created before the retry', async () => {
    const result = await inspectPoku(
      `test/__fixtures__/integration/assertion-capture/public-retry-resource.test.${ext} --debug`
    );
    nodeAssert.strictEqual(result.exitCode, 0, result.stdout + result.stderr);
    nodeAssert.match(result.stdout, /resource retry attempts:2/);
  });

  await it('fails the file when an unawaited test fails after retry has settled', async () => {
    const result = await inspectPoku(
      `test/__fixtures__/integration/assertion-capture/public-retry-late.test.${ext} --debug`
    );
    nodeAssert.strictEqual(result.exitCode, 1);
    nodeAssert.match(result.stdout, /late failure/);
    nodeAssert.match(result.stdout, /FAIL.*1/s);
  });
});
