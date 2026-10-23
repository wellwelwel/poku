import { strict as nodeAssert } from 'node:assert';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { GLOBAL } from '../../src/configs/poku.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';

await describe('Published Poku version compatibility', async () => {
  const fixture = fileURLToPath(
    new URL(
      '../__fixtures__/integration/assertion-capture/mixed-versions.cjs',
      import.meta.url
    )
  );
  for (const legacy of ['poku-legacy-4-4', 'poku-legacy-4-5']) {
    for (const first of ['legacy', 'current']) {
      await it(`supports ${legacy} with ${first} loaded first`, () => {
        const args =
          GLOBAL.runtime === 'deno'
            ? ['run', '-A', fixture, legacy, first]
            : [fixture, legacy, first];
        const result = spawnSync(process.execPath, args, { encoding: 'utf8' });
        nodeAssert.strictEqual(result.status, 0, result.stdout + result.stderr);
        nodeAssert.match(
          result.stdout,
          new RegExp(`mixed-version verified:${legacy}:${first}`)
        );
      });
    }
  }
});
