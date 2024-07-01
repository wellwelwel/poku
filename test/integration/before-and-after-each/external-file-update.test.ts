import process from 'node:process';
import { nodeVersion, getRuntime } from '../../../src/parsers/get-runtime.js';

if (nodeVersion && nodeVersion < 16) {
  process.exit(0);
}

import fs from 'node:fs';
import path from 'node:path';
import { test } from '../../../src/modules/helpers/test.js';
import { poku } from '../../../src/modules/essentials/poku.js';
import { assert } from '../../../src/modules/essentials/assert.js';

const runtime = getRuntime();

if (runtime === 'deno') {
  process.exit(0);
}

const jsonFilePath = path.resolve('./test-before-and-after-each.json');

test('Before and After Each: updating an external file', async () => {
  const prepareService = () => {
    fs.writeFileSync(jsonFilePath, JSON.stringify({ value: 1 }));
  };

  const resetService = () => {
    const data = fs.readFileSync(jsonFilePath, 'utf-8');
    const json = JSON.parse(data);

    json.value += 1;

    fs.writeFileSync(jsonFilePath, JSON.stringify(json));
  };

  const exitCode = await poku(
    './fixtures/before-after-each/integration.test.cjs',
    {
      noExit: true,
      quiet: true,
      beforeEach: () => prepareService(),
      afterEach: () => resetService(),
    }
  );

  const finalData = fs.readFileSync(jsonFilePath, 'utf-8');
  const finalJson = JSON.parse(finalData);

  fs.unlinkSync(jsonFilePath);

  assert.strictEqual(exitCode, 0, 'Fixture should be passed');

  assert.deepStrictEqual(
    finalJson.value,
    3,
    'Value should be incremented to 3'
  );
});
