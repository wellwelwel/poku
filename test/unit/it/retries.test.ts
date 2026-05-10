import { assert } from '../../../src/modules/essentials/assert.js';
import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it/core.js';

describe('Per-test it() retries', async () => {
  await it('should work without retries option', () => {
    assert.ok(true, 'it() works without retries');
  });

  await it('should accept retries: 0 explicitly', { retries: 0 }, () => {
    assert.ok(true, 'it() accepts retries: 0');
  });

  await it('should accept retries: 3 explicitly', { retries: 3 }, () => {
    assert.ok(true, 'it() accepts retries: 3');
  });

  await it({ retries: 1 }, () => {
    assert.ok(true, 'it() accepts options-first syntax');
  });

  await it('should work with title + retries', { retries: 0 }, () => {
    assert.ok(true, 'it() title + options + callback');
  });
});
