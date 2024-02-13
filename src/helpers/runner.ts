import path from 'path';

export const runner = (filename: string) =>
  path.extname(filename) === '.ts' ? 'tsx' : 'node';
