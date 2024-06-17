import * as index from '../../src/index.js';

index.test('Import Suite', () => {
  index.assert.ok(index.poku, 'Importing poku method');
  index.assert.ok(index.assert, 'Importing assert method');
  index.assert.ok(index.assertPromise, 'Importing assertPromise method');
  index.assert.ok(index.startService, 'Importing startService method');
  index.assert.ok(index.startScript, 'Importing startScript method');

  index.assert.ok(index.getPIDs, 'Importing getPIDs helper');
  index.assert.ok(index.kill, 'Importing kill helper');
  index.assert.ok(index.describe, 'Importing describe helper');
  index.assert.ok(index.beforeEach, 'Importing beforeEach helper');
  index.assert.ok(index.afterEach, 'Importing afterEach helper');
  index.assert.ok(index.log, 'Importing log helper');
  index.assert.ok(index.test, 'Importing test helper');
  index.assert.ok(index.exit, 'Importing exit helper');
  index.assert.ok(index.listFiles, 'Importing listFiles helper');
});
