import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isBuild) skip();

const receivedPrefix = 'reporter received ';

const runFixture = (filter: string) =>
  inspectPoku(
    `--config=reporter.config.ts --isolation=none --filter=${filter}`,
    { cwd: 'test/__fixtures__/e2e/no-isolate-reporter' }
  );

const receivedEvents = (stdout: string) =>
  stdout
    .split(/\r?\n/)
    .filter((line) => line.startsWith(receivedPrefix))
    .map((line) => line.slice(receivedPrefix.length));

await describe('Configured reporter with --isolation=none', async () => {
  await it('receives assertion events as it receives test events', async () => {
    const { stdout } = await runFixture('assertion-events');

    assert.deepStrictEqual(
      receivedEvents(stdout),
      [
        'test: passing test',
        'success: passing assertion',
        'test: failing test',
        'failure: failing assertion',
      ],
      'Assertion events need to reach the configured reporter'
    );
  });

  await it('receives only the reported capture attempt', async () => {
    const { stdout } = await runFixture('capture-attempts');

    assert.deepStrictEqual(
      receivedEvents(stdout),
      ['success: reported attempt'],
      'The reported attempt needs to reach the configured reporter'
    );

    assert.doesNotMatch(
      stdout,
      /discarded attempt/,
      'The discarded attempt must not be printed'
    );
  });
});
