import type { ConfigFile, ConfigJSONFile } from '../@types/poku.js';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { GLOBAL } from '../configs/poku.js';
import { format } from '../services/format.js';
import { log } from '../services/write.js';
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
      const { JSONC } = await import('../polyfills/jsonc.js');

      return JSONC.parse<ConfigJSONFile>(configsFile);
    } catch (error) {
      log(
        `${format('⚠').bold()} Failed to load config file ${format(file).bold()}:`
      );
      const message = error instanceof Error ? error.message : String(error);
      log(`${format(message).fail()}`);
    }
  }

  return Object.create(null);
};
