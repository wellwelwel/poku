/* c8 ignore next */
import { relative, dirname, sep } from 'node:path';
import { stat, readFile } from '../polyfills/fs.js';
import { listFiles } from '../modules/list-files.js';

const filter = /\.(js|cjs|mjs|ts|cts|mts)$/;

const normalizePath = (filePath: string) =>
  filePath
    .replace(/(\.\/)/g, '')
    .replace(/^\.+/, '')
    .replace(/[/\\]+/g, sep)
    .replace(/\\/g, '/');

/* c8 ignore next */
export const mapTests = async (srcDir: string, testPaths: string[]) => {
  const allTestFiles: string[] = [];
  const allSrcFiles = await listFiles(srcDir, { filter });
  const importMap = new Map<string, string[]>();

  for (const testPath of testPaths) {
    const stats = await stat(testPath);

    if (stats.isDirectory()) {
      const testFiles = await listFiles(testPath, { filter });

      allTestFiles.push(...testFiles);
    } else if (stats.isFile() && filter.test(testPath))
      allTestFiles.push(testPath);
  }

  for (const testFile of allTestFiles) {
    const content = await readFile(testFile, 'utf-8');

    for (const srcFile of allSrcFiles) {
      const relativePath = normalizePath(relative(dirname(testFile), srcFile));
      const normalizedSrcFile = normalizePath(srcFile);

      /* c8 ignore start */
      if (
        content.includes(relativePath.replace(filter, '')) ||
        content.includes(normalizedSrcFile)
      ) {
        if (!importMap.has(normalizedSrcFile))
          importMap.set(normalizedSrcFile, []);

        importMap.get(normalizedSrcFile)!.push(testFile);
      }
      /* c8 ignore stop */
    }
  }

  return importMap;
};
