import assert from 'node:assert/strict';
import { it } from '../../../../src/modules/helpers/it/core.js';

let attempts = 0;

it('flaky test with per-test retry', { retries: 2 }, () => {
  attempts++;
  // Fails on first attempt, passes on second
  if (attempts < 2) {
    assert.strictEqual(1, 2, `Fails on attempt ${attempts}`);
  }
});
