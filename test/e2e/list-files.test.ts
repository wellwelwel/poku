import { describe } from '../../src/modules/helpers/describe.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { isWindows } from '../../src/parsers/os.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { GLOBAL } from '../../src/configs/poku.js';

if (GLOBAL.runtime === 'deno' || isBuild || isWindows) skip();

describe('List Files command', async () => {
  await it('Default', async () => {
    const output = await inspectPoku('--listFiles', {
      cwd: 'test/__fixtures__/e2e/list-files',
    });

    if (output.exitCode !== 0) {
      console.log(output.stdout);
      console.log(output.stderr);
    }

    const actual = output.stdout.split('\n');
    const offset = 2;

    assert.strictEqual(output.exitCode, 0, 'Passed');

    assert.match(actual[offset + 1], /-.+\sa\.spec\.cjs$/);
    assert.match(actual[offset + 2], /-.+\sa\.spec\.cts$/);
    assert.match(actual[offset + 3], /-.+\sa\.spec\.js$/);
    assert.match(actual[offset + 4], /-.+\sa\.spec\.mjs$/);
    assert.match(actual[offset + 5], /-.+\sa\.spec\.mts$/);
    assert.match(actual[offset + 6], /-.+\sa\.spec\.ts$/);

    assert.match(actual[offset + 7], /-.+\sa\.test\.cjs$/);
    assert.match(actual[offset + 8], /-.+\sa\.test\.cts$/);
    assert.match(actual[offset + 9], /-.+\sa\.test\.js$/);
    assert.match(actual[offset + 10], /-.+\sa\.test\.mjs$/);
    assert.match(actual[offset + 11], /-.+\sa\.test\.mts$/);
    assert.match(actual[offset + 12], /-.+\sa\.test\.ts$/);

    assert.match(actual[offset + 13], /-.+\sdepth-1\/a\.spec\.cjs$/);
    assert.match(actual[offset + 14], /-.+\sdepth-1\/a\.spec\.cts$/);
    assert.match(actual[offset + 15], /-.+\sdepth-1\/a\.spec\.js$/);
    assert.match(actual[offset + 16], /-.+\sdepth-1\/a\.spec\.mjs$/);
    assert.match(actual[offset + 17], /-.+\sdepth-1\/a\.spec\.mts$/);
    assert.match(actual[offset + 18], /-.+\sdepth-1\/a\.spec\.ts$/);

    assert.match(actual[offset + 19], /-.+\sdepth-1\/a\.test\.cjs$/);
    assert.match(actual[offset + 20], /-.+\sdepth-1\/a\.test\.cts$/);
    assert.match(actual[offset + 21], /-.+\sdepth-1\/a\.test\.js$/);
    assert.match(actual[offset + 22], /-.+\sdepth-1\/a\.test\.mjs$/);
    assert.match(actual[offset + 23], /-.+\sdepth-1\/a\.test\.mts$/);
    assert.match(actual[offset + 24], /-.+\sdepth-1\/a\.test\.ts$/);

    assert.match(actual[offset + 25], /-.+\sdepth-1\/depth-2\/a\.spec\.cjs$/);
    assert.match(actual[offset + 26], /-.+\sdepth-1\/depth-2\/a\.spec\.cts$/);
    assert.match(actual[offset + 27], /-.+\sdepth-1\/depth-2\/a\.spec\.js$/);
    assert.match(actual[offset + 28], /-.+\sdepth-1\/depth-2\/a\.spec\.mjs$/);
    assert.match(actual[offset + 29], /-.+\sdepth-1\/depth-2\/a\.spec\.mts$/);
    assert.match(actual[offset + 30], /-.+\sdepth-1\/depth-2\/a\.spec\.ts$/);

    assert.match(actual[offset + 31], /-.+\sdepth-1\/depth-2\/a\.test\.cjs$/);
    assert.match(actual[offset + 32], /-.+\sdepth-1\/depth-2\/a\.test\.cts$/);
    assert.match(actual[offset + 33], /-.+\sdepth-1\/depth-2\/a\.test\.js$/);
    assert.match(actual[offset + 34], /-.+\sdepth-1\/depth-2\/a\.test\.mjs$/);
    assert.match(actual[offset + 35], /-.+\sdepth-1\/depth-2\/a\.test\.mts$/);
    assert.match(actual[offset + 36], /-.+\sdepth-1\/depth-2\/a\.test\.ts$/);

    assert.match(
      actual[offset + 37],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.spec\.cjs$/
    );
    assert.match(
      actual[offset + 38],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.spec\.cts$/
    );
    assert.match(
      actual[offset + 39],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.spec\.js$/
    );
    assert.match(
      actual[offset + 40],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.spec\.mjs$/
    );
    assert.match(
      actual[offset + 41],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.spec\.mts$/
    );
    assert.match(
      actual[offset + 42],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.spec\.ts$/
    );

    assert.match(
      actual[offset + 43],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.test\.cjs$/
    );
    assert.match(
      actual[offset + 44],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.test\.cts$/
    );
    assert.match(
      actual[offset + 45],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.test\.js$/
    );
    assert.match(
      actual[offset + 46],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.test\.mjs$/
    );
    assert.match(
      actual[offset + 47],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.test\.mts$/
    );
    assert.match(
      actual[offset + 48],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.test\.ts$/
    );
  });

  await it('Default', async () => {
    const output = await inspectPoku(
      '--listFiles --filter=.spec. --exclude=ts',
      {
        cwd: 'test/__fixtures__/e2e/list-files',
      }
    );

    if (output.exitCode !== 0) {
      console.log(output.stdout);
      console.log(output.stderr);
    }

    const actual = output.stdout.split('\n');
    const offset = 2;

    assert.strictEqual(output.exitCode, 0, 'Passed');

    assert.match(actual[offset + 1], /-.+\sa\.spec\.cjs$/);
    assert.match(actual[offset + 2], /-.+\sa\.spec\.js$/);
    assert.match(actual[offset + 3], /-.+\sa\.spec\.mjs$/);

    assert.match(actual[offset + 4], /-.+\sdepth-1\/a\.spec\.cjs$/);
    assert.match(actual[offset + 5], /-.+\sdepth-1\/a\.spec\.js$/);
    assert.match(actual[offset + 6], /-.+\sdepth-1\/a\.spec\.mjs$/);

    assert.match(actual[offset + 7], /-.+\sdepth-1\/depth-2\/a\.spec\.cjs$/);
    assert.match(actual[offset + 8], /-.+\sdepth-1\/depth-2\/a\.spec\.js$/);
    assert.match(actual[offset + 9], /-.+\sdepth-1\/depth-2\/a\.spec\.mjs$/);

    assert.match(
      actual[offset + 10],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.spec\.cjs$/
    );
    assert.match(
      actual[offset + 11],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.spec\.js$/
    );
    assert.match(
      actual[offset + 12],
      /-.+\sdepth-1\/depth-2\/depth-3\/a\.spec\.mjs$/
    );
  });
});
