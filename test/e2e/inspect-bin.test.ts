import { strict as nodeAssert } from 'node:assert';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { ext } from '../__utils__/capture-cli.test.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { inspectPoku } from '../../src/modules/plugins.js';

const modulesPath = 'test/__fixtures__/e2e/no-isolate';

describe('Plugin CLI inspection', async () => {
  await it('runs an absolute CLI path from a fixture directory', async () => {
    const result = await inspectPoku({
      bin: resolve(`src/bin/index.${ext}`),
      command: `pass.test.${ext}`,
      spawnOptions: { cwd: modulesPath },
    });
    nodeAssert.strictEqual(result.exitCode, 0, result.stderr);
  });

  await it('preserves spaces in the executable module path', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'poku inspect '));
    const bin = join(directory, 'sample cli.mjs');
    try {
      await writeFile(bin, "console.log('inspection completed');\n");
      const result = await inspectPoku({ bin, command: '' });
      nodeAssert.strictEqual(result.exitCode, 0, result.stderr);
      nodeAssert.match(result.stdout, /inspection completed/);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
