import process from 'node:process';

export function findFile(): string {
  for (const path of process.argv) {
    if (path.endsWith('.test.ts') || path.endsWith('.test.js')) {
      return path;
    }
  }

  throw new Error(
    `Could not find test file in process arguments: \n${process.argv.join('\n')}`
  );
}
