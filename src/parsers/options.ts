/* c8 ignore next */ // Types
import type { ConfigFile, ConfigModuleFile } from '../@types/poku.js';
import { cwd } from 'node:process';
import { normalize, join } from 'node:path';
import { readFile } from '../polyfills/fs.js';
import { JSONC } from '../polyfills/jsonc.js';

const processCWD = cwd();

/* c8 ignore next */ // ?
export const getConfigs = async (
  customPath?: string
): Promise<ConfigFile | ConfigModuleFile> => {
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
      if (filePath.endsWith('.js') || filePath.endsWith('.cjs')) {
        /* c8 ignore next */ // ?
        return (await import(normalize(filePath))) as ConfigModuleFile;
      }

      const configsFile = await readFile(filePath, 'utf-8');
      return JSONC.parse<ConfigFile>(configsFile);
    } catch {}
  }

  return {};
};
