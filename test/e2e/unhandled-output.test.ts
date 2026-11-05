import { strict as nodeAssert } from 'node:assert';
import { ext, inspectPoku, stripAnsi } from '../__utils__/capture-cli.test.js';
import { GLOBAL } from '../../src/configs/poku.js';
import { describe, it } from '../../src/modules/index.js';

const fixtures = 'test/__fixtures__/e2e/unhandled-output';

await describe('Unhandled rejection output in isolated files', async () => {
  await it('prints a string reason without quotes', async () => {
    const result = await inspectPoku(`${fixtures}/string-reason.test.${ext}`);
    const output = stripAnsi(result.stdout + result.stderr);

    nodeAssert.strictEqual(result.exitCode, 1, output);
    nodeAssert.match(output, /unhandledRejection boom/);
    nodeAssert.doesNotMatch(output, /unhandledRejection 'boom'/);
  });

  if (GLOBAL.runtime === 'node')
    await it('writes through the stderr stream that the test file sees', async () => {
      const result = await inspectPoku(`${fixtures}/intercepted.test.${ext}`);
      const output = stripAnsi(result.stdout + result.stderr);

      nodeAssert.strictEqual(result.exitCode, 1, output);
      nodeAssert.match(output, /intercepted: \["unhandledRejection boom\\n"\]/);
    });
});
