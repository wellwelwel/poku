import fs from 'node:fs';
import path from 'node:path';
import { test } from '../../../src/modules/helpers/test.js';
import { poku } from '../../../src/modules/essentials/poku.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { getRuntime } from '../../../src/parsers/get-runtime.js';

const testDir = path.resolve('test/__fixtures__/.temp');
const jsonFilePath = path.resolve(`${testDir}/external-file-update.json`);

test('Before and After Each: updating an external file', async () => {
  const runtime = getRuntime();

  const prepareService = () => {
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(jsonFilePath, JSON.stringify({ value: 1 }));
  };

  const resetService = () => {
    const data = fs.readFileSync(jsonFilePath, 'utf8');
    const json = JSON.parse(data);

    json.value += 1;

    fs.writeFileSync(jsonFilePath, JSON.stringify(json));
  };

  const exitCode = await poku(
    'test/__fixtures__/integration/before-after-each/integration.test.cjs',
    {
      noExit: true,
      // quiet: true,
      beforeEach: () => prepareService(),
      afterEach: () => resetService(),
      deno: {
        allow: runtime === 'deno' ? ['all'] : undefined,
        cjs: runtime === 'deno' ? true : undefined,
      },
    }
  );

  const finalData = fs.readFileSync(jsonFilePath, 'utf8');
  const finalJson = JSON.parse(finalData);

  fs.unlinkSync(jsonFilePath);

  assert.strictEqual(exitCode, 0, 'Fixture should be passed');

  assert.deepStrictEqual(
    finalJson.value,
    3,
    'Value should be incremented to 3'
  );
});
