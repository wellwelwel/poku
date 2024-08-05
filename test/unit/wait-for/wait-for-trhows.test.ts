import { test } from '../../../src/modules/helpers/test.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import {
  sleep,
  waitForExpectedResult,
  waitForPort,
} from '../../../src/modules/helpers/wait-for.js';

test('Wait For Expected Result: Throws', async () => {
  await assert.rejects(
    // @ts-expect-error
    async () => await sleep(undefined),
    'Invalid milliseconds'
  );
  await assert.rejects(
    // @ts-expect-error
    async () => await waitForExpectedResult(undefined, true),
    'Invalid callback'
  );
  await assert.rejects(
    async () =>
      await waitForExpectedResult(() => true, true, {
        // @ts-expect-error
        interval: true,
      }),
    'Invalid interval'
  );
  await assert.rejects(
    async () =>
      await waitForExpectedResult(() => true, true, {
        // @ts-expect-error
        timeout: true,
      }),
    'Invalid timeout'
  );
  await assert.rejects(
    async () =>
      await waitForExpectedResult(() => true, true, {
        // @ts-expect-error
        delay: true,
      }),
    'Invalid delay'
  );
  await assert.rejects(
    async () =>
      // @ts-expect-error
      await waitForPort(undefined),
    'Invalid port'
  );
});
