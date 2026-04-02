import { assert } from '../../src/modules/essentials/assert.js';
import { test } from '../../src/modules/helpers/test.js';
import { scriptRunner } from '../../src/parsers/get-runner.js';

test('scriptRunner', () => {
  assert.deepStrictEqual(
    scriptRunner('npm'),
    [process.platform === 'win32' ? 'npm.cmd' : 'npm', 'run'],
    'npm runner'
  );

  assert.deepStrictEqual(scriptRunner('yarn'), ['yarn'], 'yarn runner');

  assert.deepStrictEqual(scriptRunner('pnpm'), ['pnpm', 'run'], 'pnpm runner');

  assert.deepStrictEqual(
    scriptRunner('invalid_runner' as Parameters<typeof scriptRunner>[0]),
    [process.platform === 'win32' ? 'npm.cmd' : 'npm', 'run'],
    'Invalid runner falls back to npm'
  );
});
