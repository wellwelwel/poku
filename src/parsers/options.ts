import type { Configs } from '../@types/poku.js';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { readFile } from '../polyfills/fs.js';

const processCWD = cwd();

export const getConfigs = async (
  customPath?: string
): Promise<
  { include?: string | string[]; filter?: string; exclude?: string } & Omit<
    Configs,
    'beforeEach' | 'afterEach' | 'noExit' | 'filter' | 'exclude'
  >
> => {
  const expectedFiles = customPath
    ? [customPath]
    : ['poku.json', '.pokurc', 'poku.jsonc', '.pokurc.json', '.pokurc.jsonc'];

  for (const file of expectedFiles) {
    const filePath = join(processCWD, file);

    try {
      const configsFile = await readFile(filePath, 'utf-8');

      return JSON.parse(configsFile);
    } catch {
      return {};
    }
  }

  return {};
};
