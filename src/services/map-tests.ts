import { relative, dirname } from 'node:path';
import { stat, readFile } from '../polyfills/fs.js';
import { listFiles } from '../modules/helpers/list-files.js';

const importMap = new Map<string, Set<string>>();
const processedFiles = new Set<string>();

const regex = {
  extFilter: /\.(js|cjs|mjs|ts|cts|mts|jsx|tsx)$/,
  dependecy: /['"](\.{1,2}\/[^'"]+)['"]/,
  dotBar: /(\.\/)/g,
  sep: /[/\\]+/g,
  dot: /^\.+/,
} as const;

export const normalizePath = (filePath: string) =>
  filePath
    .replace(regex.dotBar, '')
    .replace(regex.dot, '')
    .replace(regex.sep, '/');

export const getDeepImports = (content: string): Set<string> => {
  const paths: Set<string> = new Set();
  const lines = content.split('\n');

  for (const line of lines) {
    if (
      line.indexOf('import') !== -1 ||
      line.indexOf('require') !== -1 ||
      line.indexOf(' from ') !== -1
    ) {
      const path = line.match(regex.dependecy);

      if (path) {
        paths.add(normalizePath(path[1].replace(regex.extFilter, '')));
      }
    }
  }

  return paths;
};

export const findMatchingFiles = (
  srcFilesWithoutExt: Set<string>,
  srcFilesWithExt: Set<string>
): Set<string> => {
  const matchingFiles = new Set<string>();

  for (const srcFile of srcFilesWithoutExt) {
    const normalizedSrcFile = normalizePath(srcFile);

    for (const fileWithExt of srcFilesWithExt) {
      const normalizedFileWithExt = normalizePath(fileWithExt);

      if (normalizedFileWithExt.indexOf(normalizedSrcFile) !== -1) {
        matchingFiles.add(fileWithExt);
      }
    }
  }

  return matchingFiles;
};

const collectTestFiles = async (
  testPaths: string[],
  testFilter?: RegExp,
  exclude?: RegExp | RegExp[]
): Promise<Set<string>> => {
  const statsPromises = testPaths.map((testPath) => stat(testPath));

  const stats = await Promise.all(statsPromises);

  const listFilesPromises = stats.map((stat, index) => {
    const testPath = testPaths[index];

    if (stat.isDirectory()) {
      return listFiles(testPath, {
        filter: testFilter,
        exclude,
      });
    }

    if (stat.isFile() && regex.extFilter.test(testPath)) {
      return [testPath];
    }

    return [];
  });

  const nestedTestFiles = await Promise.all(listFilesPromises);

  return new Set(nestedTestFiles.flat());
};

export const processDeepImports = async (
  srcFile: string,
  testFile: string,
  intersectedSrcFiles: Set<string>
) => {
  if (processedFiles.has(srcFile)) {
    return;
  }
  processedFiles.add(srcFile);

  const srcContent = await readFile(srcFile, 'utf8');
  const deepImports = getDeepImports(srcContent);
  const matchingFiles = findMatchingFiles(deepImports, intersectedSrcFiles);

  for (const deepImport of matchingFiles) {
    if (!importMap.has(deepImport)) {
      importMap.set(deepImport, new Set());
    }

    importMap.get(deepImport)!.add(normalizePath(testFile));
    await processDeepImports(deepImport, testFile, intersectedSrcFiles);
  }
};

export const createImportMap = async (
  allTestFiles: Set<string>,
  allSrcFiles: Set<string>
) => {
  const intersectedSrcFiles = new Set(
    Array.from(allSrcFiles).filter((srcFile) => !allTestFiles.has(srcFile))
  );

  await Promise.all(
    Array.from(allTestFiles).map(async (testFile) => {
      const content = await readFile(testFile, 'utf8');

      for (const srcFile of intersectedSrcFiles) {
        const relativePath = normalizePath(
          relative(dirname(testFile), srcFile)
        );
        const normalizedSrcFile = normalizePath(srcFile);

        if (
          content.indexOf(relativePath.replace(regex.extFilter, '')) !== -1 ||
          content.indexOf(normalizedSrcFile) !== -1
        ) {
          if (!importMap.has(normalizedSrcFile)) {
            importMap.set(normalizedSrcFile, new Set());
          }
          importMap.get(normalizedSrcFile)?.add(normalizePath(testFile));

          await processDeepImports(srcFile, testFile, intersectedSrcFiles);
        }
      }
    })
  );
};

export const mapTests = async (
  srcDir: string,
  testPaths: string[],
  testFilter?: RegExp,
  exclude?: RegExp | RegExp[]
) => {
  const [allTestFiles, allSrcFiles] = await Promise.all([
    collectTestFiles(testPaths, testFilter, exclude),
    listFiles(srcDir, {
      filter: regex.extFilter,
      exclude,
    }),
  ]);

  await createImportMap(allTestFiles, new Set(allSrcFiles));

  return importMap;
};
