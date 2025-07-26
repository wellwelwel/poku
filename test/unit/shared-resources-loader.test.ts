import { mkdtempSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { test } from '../../src/modules/helpers/test.js';
import {
  executeResourceFile,
  separateResourceFiles,
} from '../../src/services/shared-resource-loader.js';

describe('Shared Resources Loader', () => {
  const cases = [
    {
      input: ['test/unit/example.test.ts', 'test/unit/example.resource.ts'],
      expected: {
        testFiles: ['test/unit/example.test.ts'],
        resourceFiles: ['test/unit/example.resource.ts'],
      },
    },
    {
      input: ['test/unit/example.test.ts', 'test/unit/example.resource.js'],
      expected: {
        testFiles: ['test/unit/example.test.ts'],
        resourceFiles: ['test/unit/example.resource.js'],
      },
    },
    {
      input: [
        'test/unit/example.test.ts',
        'test/unit/example.resource.ts',
        'test/unit/another.test.ts',
      ],
      expected: {
        testFiles: ['test/unit/example.test.ts', 'test/unit/another.test.ts'],
        resourceFiles: ['test/unit/example.resource.ts'],
      },
    },
    {
      input: [
        'test/unit/example.test.ts',
        'test/unit/example.resource.js',
        'test/unit/another.test.ts',
      ],
      expected: {
        testFiles: ['test/unit/example.test.ts', 'test/unit/another.test.ts'],
        resourceFiles: ['test/unit/example.resource.js'],
      },
    },
  ];

  test('should split test and resource files', () => {
    for (const { input, expected } of cases) {
      const result = separateResourceFiles(input);
      assert.deepStrictEqual(result, expected, `Failed for input: ${input}`);
    }
  });
});

describe('executeResourceFile', () => {
  const tempDir = mkdtempSync(join(tmpdir(), 'resource-test-'));

  function writeResourceFile(filename: string, content: string) {
    const filePath = join(tempDir, filename);
    writeFileSync(filePath, content, 'utf8');
    return filePath;
  }

  it('loads a valid resource file', async () => {
    const file = writeResourceFile(
      'valid.resource.mjs',
      `
      export default { entry: { foo: 1 }, name: "myResource" };
      `
    );

    const result = await executeResourceFile(file);
    assert.strictEqual(result.name, 'myResource');
    assert.deepStrictEqual(result.entry, { foo: 1 });
    unlinkSync(file);
  });

  const invalidCases = [
    {
      description: 'throws if resource file does not export default',
      slug: 'no-default',
      content: 'export const notDefault = {};',
    },
    {
      description: 'throws if resource file does not export a valid object',
      slug: 'not-object',
      content: 'export default 42;',
    },
    {
      description: 'throws if resource file default is missing entry',
      slug: 'missing-entry',
      content: "export default { name: 'noEntry' };",
    },
    {
      description: 'throws if resource file default is missing name',
      slug: 'missing-name',
      content: 'export default { entry: {} };',
    },
  ];

  for (const { description, content, slug } of invalidCases) {
    it(description, async () => {
      const file = writeResourceFile(`${slug}.resource.mjs`, content);
      await assert.rejects(
        () => executeResourceFile(file),
        /does not export a valid default resource object/
      );

      unlinkSync(file);
    });
  }
});
