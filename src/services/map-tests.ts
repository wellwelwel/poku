/* c8 ignore next */
import { relative, dirname, sep } from 'node:path';
import { stat, readFile } from '../polyfills/fs.js';
import { listFiles } from '../modules/list-files.js';

const importMap = new Map<string, Set<string>>();
const processedFiles = new Set<string>();

const extFilter = /\.(js|cjs|mjs|ts|cts|mts|jsx|tsx)$/;

export const normalizePath = (filePath: string) =>
  filePath
    .replace(/(\.\/)/g, '')
    .replace(/^\.+/, '')
    .replace(/[/\\]+/g, sep)
    .replace(/\\/g, '/');

export const getDeepImports = (content: string): Set<string> => {
  const paths: Set<string> = new Set();
  const lines = content.split('\n');

  for (const line of lines) {
    if (line.includes('import') || line.includes('require')) {
      const path = line.match(/['"](\.{1,2}\/[^'"]+)['"]/);

      if (path) paths.add(normalizePath(path[1].replace(extFilter, '')));
    }
  }

  return paths;
};

export const findMatchingFiles = (
  srcFilesWithoutExt: Set<string>,
  srcFilesWithExt: Set<string>
): Set<string> => {
  const matchingFiles = new Set<string>();

  srcFilesWithoutExt.forEach((srcFile) => {
    const normalizedSrcFile = normalizePath(srcFile);

    srcFilesWithExt.forEach((fileWithExt) => {
      const normalizedFileWithExt = normalizePath(fileWithExt);

      if (normalizedFileWithExt.includes(normalizedSrcFile))
        matchingFiles.add(fileWithExt);
    });
  });

  return matchingFiles;
};

/* c8 ignore start */
const collectTestFiles = async (
  testPaths: string[],
  testFilter?: RegExp,
  exclude?: RegExp | RegExp[]
): Promise<Set<string>> => {
  const statsPromises = testPaths.map((testPath) => stat(testPath));

  const stats = await Promise.all(statsPromises);

  const listFilesPromises = stats.map((stat, index) => {
    const testPath = testPaths[index];

    if (stat.isDirectory())
      return listFiles(testPath, {
        filter: testFilter,
        exclude,
      });

    if (stat.isFile() && extFilter.test(testPath)) return [testPath];
    else return [];
  });

  const nestedTestFiles = await Promise.all(listFilesPromises);

  return new Set(nestedTestFiles.flat());
};
/* c8 ignore stop */

/* c8 ignore start */
const processDeepImports = async (
  srcFile: string,
  testFile: string,
  intersectedSrcFiles: Set<string>
) => {
  if (processedFiles.has(srcFile)) return;
  processedFiles.add(srcFile);

  const srcContent = await readFile(srcFile, 'utf-8');
  const deepImports = getDeepImports(srcContent);
  const matchingFiles = findMatchingFiles(deepImports, intersectedSrcFiles);

  for (const deepImport of matchingFiles) {
    if (!importMap.has(deepImport)) importMap.set(deepImport, new Set());

    importMap.get(deepImport)!.add(normalizePath(testFile));

    await processDeepImports(deepImport, testFile, intersectedSrcFiles);
  }
};
/* c8 ignore stop */

const createImportMap = async (
  allTestFiles: Set<string>,
  allSrcFiles: Set<string>
) => {
  const intersectedSrcFiles = new Set(
    Array.from(allSrcFiles).filter((srcFile) => !allTestFiles.has(srcFile))
  );

  await Promise.all(
    Array.from(allTestFiles).map(async (testFile) => {
      const content = await readFile(testFile, 'utf-8');

      for (const srcFile of intersectedSrcFiles) {
        const relativePath = normalizePath(
          relative(dirname(testFile), srcFile)
        );
        const normalizedSrcFile = normalizePath(srcFile);

        /* c8 ignore start */
        if (
          content.includes(relativePath.replace(extFilter, '')) ||
          content.includes(normalizedSrcFile)
        ) {
          if (!importMap.has(normalizedSrcFile))
            importMap.set(normalizedSrcFile, new Set());
          importMap.get(normalizedSrcFile)!.add(normalizePath(testFile));

          await processDeepImports(srcFile, testFile, intersectedSrcFiles);
        }
        /* c8 ignore stop */
      }
    })
  );
};

/* c8 ignore next */
export const mapTests = async (
  srcDir: string,
  testPaths: string[],
  testFilter?: RegExp,
  exclude?: RegExp | RegExp[]
) => {
  const [allTestFiles, allSrcFiles] = await Promise.all([
    collectTestFiles(testPaths, testFilter, exclude),
    listFiles(srcDir, {
      filter: extFilter,
      exclude,
    }),
  ]);

  await createImportMap(allTestFiles, new Set(allSrcFiles));

  return importMap;
};
