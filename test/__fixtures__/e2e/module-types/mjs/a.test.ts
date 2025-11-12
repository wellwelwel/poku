import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { test } = await import('../../../../../src/modules/helpers/test.js');
const { assert } = await import(
  '../../../../../src/modules/essentials/assert.js'
);

test(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  assert.match(__dirname, /mjs$/, 'Ensure dirname');
  assert.match(__filename, /a\.test\.ts$/, 'Ensure filename');
});
