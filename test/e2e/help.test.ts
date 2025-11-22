import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isBuild) skip();

describe('Help', async () => {
  await it('--help', async () => {
    const results = await inspectPoku('--help');

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0);
    assert.match(results.stdout, /Poku — CLI Usage/);
    assert.match(results.stdout, /Poku — Options/);
    assert.match(results.stdout, /https:\/\/poku.io/);
  });

  await it('-h', async () => {
    const results = await inspectPoku('-h');

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0);
    assert.match(results.stdout, /Poku — CLI Usage/);
    assert.match(results.stdout, /Poku — Options/);
    assert.match(results.stdout, /https:\/\/poku.io/);
  });
});
