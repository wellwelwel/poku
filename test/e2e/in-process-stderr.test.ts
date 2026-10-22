import { strict as nodeAssert } from 'node:assert';
import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';

describe('In-process asynchronous error diagnostics', async () => {
  for (const [fixture, event, message] of [
    ['uncaught.test.mts', 'uncaughtException', 'non-assertion async error'],
    [
      'unhandled.test.mts',
      'unhandledRejection',
      'non-assertion rejected promise',
    ],
  ]) {
    await it(`preserves ${event} on stderr`, async () => {
      const path = isBuild ? fixture.replace(/\.mts$/, '.mjs') : fixture;
      const result = await inspectPoku(`${path} --isolation=none`, {
        cwd: 'test/__fixtures__/e2e/no-isolate',
      });
      nodeAssert.strictEqual(result.exitCode, 1);
      nodeAssert.match(result.stderr, new RegExp(event));
      nodeAssert.match(result.stderr, new RegExp(message));
    });
  }
});
