import type { ConfigFile, ConfigJSONFile } from '../@types/poku.js';
import { readFile } from 'node:fs/promises';
import { join, normalize } from 'node:path';
import { GLOBAL } from '../configs/poku.js';
import { JSONC } from '../polyfills/jsonc.js';
import { isWindows } from './os.js';

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
    const filePath = join(GLOBAL.cwd, file);
    let path = '';

    if (isWindows) path += 'file://';
    path += normalize(filePath);

    try {
      if (filePath.endsWith('.js') || filePath.endsWith('.cjs'))
        return require(path);

      const configsFile = await readFile(filePath, 'utf8');

      return JSONC.parse<ConfigJSONFile>(configsFile);
    } catch {}
  }

  return Object.create(null);
};
