import {
  ext,
  inspectCLI,
  inspectPoku,
  isBuild,
} from '../__utils__/capture-cli.test.js';
import { receivedEvents } from '../__utils__/received-events.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { runner } from '../../src/parsers/get-runner.js';

if (isBuild) skip();

const fixtureDirectory = 'test/__fixtures__/e2e/no-isolate-reporter';

const runFixture = (filter: string) =>
  inspectPoku(
    `--config=reporter.config.ts --isolation=none --filter=${filter}`,
    { cwd: fixtureDirectory }
  );

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

  await it('returns to the default reporter in a later run', async () => {
    const command = runner(`_.${ext}`).join(' ');
    const { stdout } = await inspectCLI(`${command} consecutive-runs.ts`, {
      cwd: fixtureDirectory,
    });

    assert.deepStrictEqual(
      receivedEvents(stdout),
      ['test: custom run test', 'success: custom run assertion'],
      'The run with the default reporter must not reach the previous reporter'
    );
  });
});
