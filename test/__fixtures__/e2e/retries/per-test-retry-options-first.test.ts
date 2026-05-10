import assert from 'node:assert/strict';
import { it } from '../../../../src/modules/helpers/it/core.js';

let attempts = 0;

// Test options-first syntax: it({ retries: 2 }, callback)
it({ retries: 2 }, () => {
  attempts++;
  if (attempts < 2) {
    assert.strictEqual(1, 2, `Fails on attempt ${attempts}`);
  }
});
