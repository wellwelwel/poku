import path from 'node:path';
import { GLOBAL } from '../../src/configs/poku.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import {
  executeResourceFile,
  separateResourceFiles,
} from '../../src/services/shared-resource-loader.js';

describe('Shared Resources Loader', () => {
  describe('separateResourceFiles', () => {
    it('should separate test files from resource files', () => {
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
            testFiles: [
              'test/unit/example.test.ts',
              'test/unit/another.test.ts',
            ],
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
            testFiles: [
              'test/unit/example.test.ts',
              'test/unit/another.test.ts',
            ],
            resourceFiles: ['test/unit/example.resource.js'],
          },
        },
      ];

      for (const { input, expected } of cases) {
        const result = separateResourceFiles(input);
        assert.deepStrictEqual(result, expected, `Failed for input: ${input}`);
      }
    });
  });

  describe('executeResourceFile', () => {
    const makePath = (slug: string) =>
      path.join(
        GLOBAL.cwd,
        'test',
        '__fixtures__',
        'shared-resources',
        `${slug}.resource-fixture`
      );

    it('loads a valid resource file', async () => {
      const resource = await executeResourceFile(makePath('valid'));
      assert.deepStrictEqual(resource, {
        entry: { state: { value: 42 }, subscribers: new Set() },
        name: 'valid',
      });
    });

    it('loads a valid resource file with async factory', async () => {
      const resource = await executeResourceFile(makePath('async-factory'));
      assert.deepStrictEqual(resource, {
        entry: { state: { value: 42 }, subscribers: new Set() },
        name: 'async-factory',
      });
    });

    it('throws if resource file does not exist', async () => {
      await assert.rejects(
        () => executeResourceFile(makePath('nonexistent')),
        /(Cannot find module | Module not found)/
      );
    });

    // const invalidCases = [
    //   {
    //     description: 'throws if resource file does not export default',
    //     slug: 'no-default',
    //   },
    //   {
    //     description: 'throws if resource file does not export a valid object',
    //     slug: 'not-object',
    //   },
    //   {
    //     description: 'throws if resource file default is missing entry',
    //     slug: 'missing-entry',
    //   },
    //   {
    //     description: 'throws if resource file default is missing name',
    //     slug: 'missing-name',
    //   },
    // ];

    // for (const { description, slug } of invalidCases) {
    //   it(description, async () => {
    //     await assert.rejects(
    //       () => executeResourceFile(makePath(slug)),
    //       /does not export a valid default resource object/
    //     );
    //   });
    // }
  });
});
