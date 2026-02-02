import process from 'node:process';

const extensionsRegex = /\.(js|cjs|mjs|ts|cts|mts|jsx|tsx)$/;

export const findFile = (): string => {
  for (let i = process.argv.length - 1; i >= 0; i--) {
    const path = process.argv[i];
    if (extensionsRegex.test(path)) return path;
  }

  throw new Error(
    `Could not find test file in process arguments: \n${process.argv.join('\n')}`
  );
};
