import type { ConfigFile, ConfigJSONFile } from '../@types/poku.js';
import { cwd } from 'node:process';
import { normalize, join } from 'node:path';
import { readFile } from '../polyfills/fs.js';
import { JSONC } from '../polyfills/jsonc.js';

const processCWD = cwd();

export const getConfigs = async (
  customPath?: string
): Promise<ConfigFile | ConfigJSONFile> => {
  const expectedFiles = customPath
    ? [customPath]
    : new Set([
        'poku.config.js',
        'poku.config.cjs',
        '.pokurc.json',
        '.pokurc.jsonc',
      ]);

  for (const file of expectedFiles) {
    const filePath = join(processCWD, file);

    try {
      if (filePath.endsWith('.js') || filePath.endsWith('.cjs'))
        return require(`file://${normalize(filePath)}`);

      const configsFile = await readFile(filePath, 'utf8');

      return JSONC.parse<ConfigJSONFile>(configsFile);
    } catch {}
  }

  return {};
};
