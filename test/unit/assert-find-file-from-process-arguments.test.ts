import { assert } from '../../src/modules/essentials/assert.js';
import { test } from '../../src/modules/helpers/test.js';
import { findFile } from '../../src/parsers/find-file-from-process-arguments.js';

const targetFilePath =
  'test/unit/assert-find-file-from-process-arguments.test.ts';
const testCases = [
  {
    description: 'Node.js process arguments + Poku (local run)',
    args: ['node', 'src/bin/index.ts', targetFilePath, '--some-flag'],
  },
  {
    description: 'Node.js process arguments + Poku (built run)',
    args: ['node', 'poku', targetFilePath, '--some-flag'],
  },
  {
    description: 'Bun process arguments + Poku (local run)',
    args: ['bun', '--bun', 'src/bin/index.ts', targetFilePath, '--some-flag'],
  },
  {
    description: 'Bun process arguments + Poku (built run)',
    args: ['bun', '--bun', 'poku', targetFilePath, '--some-flag'],
  },
  {
    description: 'Deno process arguments + Poku (local run)',
    args: [
      'deno',
      'run',
      '--allow-read',
      'src/bin/index.ts',
      targetFilePath,
      '--some-flag',
    ],
  },
  {
    description: 'Deno process arguments + Poku (built run)',
    args: [
      'deno',
      'run',
      '--allow-read',
      'poku',
      targetFilePath,
      '--some-flag',
    ],
  },
];

for (const { description, args } of testCases) {
  test(`Assert: findFile() should correctly identify the test file path - ${description}`, () => {
    const originalArgv = process.argv;
    process.argv = args;

    const testFilePath = findFile();

    assert.strictEqual(testFilePath, targetFilePath);

    process.argv = originalArgv;
  });
}
