import { sep } from 'node:path';
import { assert } from '../../src/modules/essentials/assert.js';
import { sanitizePath } from '../../src/modules/helpers/list-files.js';
import { test } from '../../src/modules/helpers/test.js';

test('Sanitize paths', () => {
  assert.strictEqual(
    sanitizePath('path//to///file'),
    `path${sep}to${sep}file`,
    'should replace multiple slashes with the OS-specific separator'
  );

  assert.strictEqual(
    sanitizePath('path/../../file'),
    `path${sep}file`,
    'should remove access to parent directories'
  );

  assert.strictEqual(
    sanitizePath('path/to/<file>?'),
    `path${sep}to${sep}file`,
    'should remove unusual path characters'
  );

  assert.strictEqual(
    sanitizePath('/absolute/path', true),
    `.${sep}absolute${sep}path`,
    'should prevent absolute path access when ensureTarget is true'
  );

  assert.strictEqual(
    sanitizePath('/absolute/path'),
    `${sep}absolute${sep}path`,
    'should allow absolute path access when ensureTarget is false'
  );

  assert.strictEqual(
    sanitizePath('./relative/path'),
    `.${sep}relative${sep}path`,
    'should keep relative path unchanged'
  );

  assert.strictEqual(
    sanitizePath('path\\to\\file'),
    `path${sep}to${sep}file`,
    'should replace backslashes with the OS-specific separator'
  );
});
