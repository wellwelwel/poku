import type { readFile } from 'node:fs/promises';
import { isAbsolute } from 'node:path';
import { assert } from '../../src/modules/essentials/assert.js';
import {
  clearGlobalRegistry,
  loadResourceFromFile,
} from '../../src/modules/helpers/shared-resources.js';
import { test } from '../../src/modules/helpers/test.js';

test('loadResourceFromFile', async () => {
  await test('should use file:// URL on Windows', async () => {
    clearGlobalRegistry();

    const mockReadFile = async () =>
      `import { myResource } from './my-resource.js';`;

    let importedUrl = '';
    const mockImporter = async (url: string) => {
      importedUrl = url;
      return {
        myResource: {
          name: 'test-resource-win',
          factory: () => ({}),
        },
      };
    };

    await loadResourceFromFile('test-resource-win', '/abs/path/to/file.ts', {
      readFile: mockReadFile as unknown as typeof readFile,
      importer: mockImporter,
      platform: 'win32',
    });

    assert.ok(
      importedUrl.startsWith('file://'),
      `Expected URL to start with file:// on Windows, got: ${importedUrl}`
    );
  });

  await test('should use raw path on Linux/others', async () => {
    clearGlobalRegistry();

    const mockReadFile = async () =>
      `import { myResource } from './my-resource.js';`;

    let importedUrl = '';
    const mockImporter = async (url: string) => {
      importedUrl = url;
      return {
        myResource: {
          name: 'test-resource-linux',
          factory: () => ({}),
        },
      };
    };

    // On Linux, resolve('/abs/path/to', './my-resource.js') -> '/abs/path/to/my-resource.js'
    // We need to make sure the mockImporter receives this path.

    await loadResourceFromFile('test-resource-linux', '/abs/path/to/file.ts', {
      readFile: mockReadFile as unknown as typeof readFile,
      importer: mockImporter,
      platform: 'linux',
    });

    assert.ok(
      !importedUrl.startsWith('file://'),
      `Expected URL NOT to start with file:// on Linux, got: ${importedUrl}`
    );

    // It should be an absolute path
    assert.ok(
      isAbsolute(importedUrl),
      `Expected URL to be an absolute path, got: ${importedUrl}`
    );
  });
});
