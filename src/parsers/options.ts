/* c8 ignore next */ // Types
import type { ConfigFile } from '../@types/poku.js';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { readFile } from '../polyfills/fs.js';
import { JSONC } from '../polyfills/jsonc.js';

const processCWD = cwd();

/* c8 ignore next */ // ?
export const getConfigs = async (customPath?: string): Promise<ConfigFile> => {
  const expectedFiles = customPath
    ? [customPath]
    : ['poku.json', 'poku.jsonc', '.pokurc.json', '.pokurc.jsonc', '.pokurc'];

  for (const file of expectedFiles) {
    const filePath = join(processCWD, file);

    try {
      const configsFile = await readFile(filePath, 'utf-8');

      return JSONC.parse<ConfigFile>(configsFile);
    } catch {}
  }

  return {};
};
