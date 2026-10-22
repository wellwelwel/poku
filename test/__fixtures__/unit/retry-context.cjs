const assert = require('node:assert/strict');
const {
  peekRetryContext,
  retryContext,
} = require('../../../src/configs/retry.ts');

const outer = { attempts: 1, currentAttempt: 1, delay: 0, failed: false };
const inner = { ...outer };

assert.strictEqual(peekRetryContext(), undefined);
retryContext.run(outer, () => {
  assert.strictEqual(peekRetryContext(), outer);
  retryContext.run(inner, () => {
    assert.strictEqual(peekRetryContext(), inner);
  });
  assert.strictEqual(peekRetryContext(), outer);
});
assert.strictEqual(peekRetryContext(), undefined);
console.log('CommonJS retry provider verified');
