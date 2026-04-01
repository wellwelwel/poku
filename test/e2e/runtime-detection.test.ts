import { strict as assert } from 'node:assert';
import { spawnSync } from 'node:child_process';
import { isBuild } from '../__utils__/capture-cli.test.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { runner } from '../../src/parsers/get-runner.js';

if (isBuild) skip();

describe('Runtime Detection', () => {
  const env = { ...process.env };
  env.POKU_RUNTIME = undefined;

  const cmd = runner('_.ts');
  const runtime = cmd.shift()!;

  const result = spawnSync(
    runtime,
    [...cmd, 'test/__fixtures__/e2e/runtime-detection/runtime-detection.ts'],
    { env, encoding: 'utf8' }
  );

  assert.strictEqual(result.status, 0, result.stderr);
});
