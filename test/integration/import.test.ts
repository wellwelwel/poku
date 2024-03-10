import * as index from '../../src/index.js';

index.describe('Import Suite', { background: false, icon: '🔬' });

index.assert.ok(index.poku, 'Importing poku method');
index.assert.ok(index.assert, 'Importing assert method');
index.assert.ok(index.assertPromise, 'Importing assertPromise method');
index.assert.ok(index.describe, 'Importing describe helper');
index.assert.ok(index.beforeEach, 'Importing beforeEach helper');
index.assert.ok(index.afterEach, 'Importing afterEach helper');
index.assert.ok(index.log, 'Importing log helper');
index.assert.ok(index.test, 'Importing test helper');
index.assert.ok(index.exit, 'Importing exit helper');
index.assert.ok(index.listFiles, 'Importing listFiles helper');
