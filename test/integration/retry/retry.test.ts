import { assert } from '../../../src/modules/essentials/assert.js';
import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it/core.js';
import { retry } from '../../../src/modules/helpers/retry.js';

describe('Retry: basic', async () => {
  let attempts = 0;

  await retry(3, () => {
    it('should succeed on third attempt', () => {
      attempts++;
      assert.strictEqual(attempts, 3, 'Should be third attempt');
    });
  });

  it('should have attempted 3 times', () => {
    assert.strictEqual(attempts, 3);
  });
});

describe('Retry: with config object', async () => {
  let attempts = 0;

  await retry({ attempts: 2 }, () => {
    it('should succeed on second attempt', () => {
      attempts++;
      assert.strictEqual(attempts, 2, 'Should be second attempt');
    });
  });

  it('should have attempted 2 times', () => {
    assert.strictEqual(attempts, 2);
  });
});

describe('Retry: immediate success', async () => {
  let attempts = 0;

  await retry(3, () => {
    it('should succeed immediately', () => {
      attempts++;
      assert.strictEqual(attempts, 1, 'Should be first attempt');
    });
  });

  it('should have attempted only once', () => {
    assert.strictEqual(attempts, 1);
  });
});

describe('Retry: nested', async () => {
  let outerAttempts = 0;
  let innerAttempts = 0;

  await retry(2, async () => {
    outerAttempts++;

    await retry(2, () => {
      it('nested test', () => {
        innerAttempts++;
        assert.strictEqual(innerAttempts, 2, 'Should be second inner attempt');
      });
    });
  });

  it('should have correct attempt counts', () => {
    assert.strictEqual(outerAttempts, 1);
    assert.strictEqual(innerAttempts, 2);
  });
});

describe('Retry: around describe', async () => {
  let attempts = 0;

  await retry(2, () => {
    describe('inner describe', () => {
      it('should succeed on second attempt', () => {
        attempts++;
        assert.strictEqual(attempts, 2, 'Should be second attempt');
      });
    });
  });

  it('should have attempted 2 times', () => {
    assert.strictEqual(attempts, 2);
  });
});
