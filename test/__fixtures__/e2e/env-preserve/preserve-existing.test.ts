import process from 'node:process';
import { assert } from '../../../../src/modules/essentials/assert.js';
import { test } from '../../../../src/modules/helpers/test.js';

test('Preserve existing env vars', () => {
  assert.strictEqual(
    process.env.PRESERVE_TARGET,
    'from-shell',
    'Existing env var must not be overwritten by .env'
  );
  assert.strictEqual(
    process.env.NEW_FROM_ENV,
    'loaded',
    'New env var must still be loaded from .env'
  );
});
