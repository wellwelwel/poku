import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { receivedEvents } from '../__utils__/received-events.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isBuild) skip();

await describe('Plugin context reporter across nested runs', async () => {
  await it('keeps the reporter the plugin received', async () => {
    const { stdout } = await inspectPoku('--config=nested-runs.config.ts', {
      cwd: 'test/__fixtures__/e2e/plugin-reporter-context',
    });

    assert.deepStrictEqual(
      receivedEvents(stdout),
      [
        'suite test: first suite test',
        'outer test: second suite test',
        'outer run result',
        'outer exit',
      ],
      'Nested runs must not change the reporter the plugin received'
    );
  });
});
