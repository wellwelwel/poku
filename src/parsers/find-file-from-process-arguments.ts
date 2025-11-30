import process from 'node:process';

export function findFile(): string {
  if (!process.env.POKU_TEST) {
    throw new Error('findFile() can only be used within a test environment.');
  }

  for (const path of process.argv) {
    if (path.endsWith('.test.ts') || path.endsWith('.test.js')) {
      return path;
    }
  }

  throw new Error(
    'Could not determine the test file path from process arguments.'
  );
}
