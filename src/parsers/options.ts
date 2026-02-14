import type { ConfigFile, ConfigJSONFile } from '../@types/poku.js';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { GLOBAL } from '../configs/poku.js';
import { JSONC } from '../polyfills/jsonc.js';
import { isWindows } from './os.js';

export const getConfigs = async (
  customPath?: string
): Promise<ConfigFile | ConfigJSONFile> => {
  const expectedFiles = customPath
    ? [customPath]
    : ['poku.config.js', '.pokurc.json', '.pokurc.jsonc'];

  for (const file of expectedFiles) {
    const filePath = join(GLOBAL.cwd, file);
    const path = isWindows ? `file://${filePath}` : filePath;

    try {
      if (!existsSync(filePath)) continue;

      if (filePath.endsWith('js') || filePath.endsWith('ts')) {
        const mod = await import(path);

        return mod?.default ?? mod;
      }

      const configsFile = await readFile(filePath, 'utf8');

      return JSONC.parse<ConfigJSONFile>(configsFile);
    } catch {}
  }

  return Object.create(null);
};
