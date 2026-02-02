import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { afterEach, beforeEach } from '../../src/modules/helpers/each.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { loadResourceFromFile } from '../../src/modules/helpers/shared-resources.js';
import { test } from '../../src/modules/helpers/test.js';

const testDir = 'test/__fixtures__/.temp/shared-resources-extension-resolution';

const createTestSetup = async (
  baseFileName: string,
  actualExt: string,
  importExt: string
) => {
  await mkdir(testDir, { recursive: true });

  // Create the actual source file with actualExt
  const sourcePath = join(testDir, `${baseFileName}${actualExt}`);
  await writeFile(
    sourcePath,
    `export const TestResource = {
  name: 'test-resource',
  factory: () => ({ value: 42 }),
};`
  );

  // Create the test file that imports with importExt
  const testPath = join(testDir, `test-${baseFileName}${importExt}.ts`);
  await writeFile(
    testPath,
    `import { TestResource } from './resource${importExt}';
export { TestResource };`
  );

  return { sourcePath, testPath };
};

const buildTestCase = (
  actualExt: string,
  importExt: string,
  description?: string
) => {
  const importDesc = importExt || 'no extension';
  const expectedMessage = `Successfully resolved ${actualExt} file with ${importDesc}${importExt ? ' import' : ''}`;
  const name =
    description ||
    `should resolve ${actualExt} file when importing ${importExt ? `with ${importExt} extension` : 'without extension'}`;

  return {
    name,
    actualExt,
    importExt,
    expectedMessage,
  };
};

const testCases = [
  buildTestCase('.ts', '.js'),
  buildTestCase('.ts', ''),
  buildTestCase('.ts', '.cjs'),
  buildTestCase('.ts', '.mjs'),
  buildTestCase('.js', '.ts'),
  buildTestCase('.mts', ''),
  buildTestCase('.cts', '.cjs'),
  buildTestCase('.tsx', '.jsx'),
  buildTestCase('.jsx', ''),
  buildTestCase(
    '.ts',
    '.ts',
    'should resolve file when exact extension matches'
  ),
];

test(async () => {
  await describe('loadResourceFromFile - Extension Resolution', async () => {
    beforeEach(async () => {
      await mkdir(testDir, { recursive: true });
    });

    afterEach(async () => {
      await rm(testDir, { recursive: true, force: true });
    });

    for (const testCase of testCases) {
      await it(testCase.name, async () => {
        const { testPath } = await createTestSetup(
          'resource',
          testCase.actualExt,
          testCase.importExt
        );

        await loadResourceFromFile('test-resource', testPath, {
          importer: async () => ({
            TestResource: {
              name: 'test-resource',
              factory: () => ({ value: 42 }),
            },
          }),
        });
        assert.ok(true, testCase.expectedMessage);
      });
    }
  });
});
