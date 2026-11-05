import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isBuild) skip();

await describe('Reporter that implements only the events its run emits', async () => {
  await it('keeps working with process isolation', async () => {
    const { exitCode, stdout } = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/partial-reporter',
    });

    assert.strictEqual(exitCode, 0, 'Exit code needs to be 0');
    assert.match(
      stdout,
      /partial reporter file passed/,
      'The reporter needs to receive the file result'
    );
    assert.match(
      stdout,
      /partial reporter exit with 1 passed/,
      'The reporter needs to receive the exit event'
    );
  });
});
