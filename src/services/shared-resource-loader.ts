import type {
  Registry,
  SharedResourceEntry,
} from '../@types/shared-resources.js';
import type { createSharedResource } from '../modules/helpers/shared-resources.js';
import { relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import { GLOBAL } from '../configs/poku.js';
import { isWindows } from '../parsers/os.js';

const resourceFilePattern = /\.resource\.((c|m)?((j|t)s))$/i;

/** Execute resource files (*.resource.ts) in the current process to initialize shared resources before running tests. */
export const executeResourceFiles = async (
  files: string[],
  registry?: Registry,
  cleanupMethods?: Record<
    string,
    (arg0: SharedResourceEntry) => void | Promise<void>
  >
): Promise<void> => {
  if (!(registry && cleanupMethods)) return;

  for (const file of files) {
    const { entry, name, cleanup } = await executeResourceFile(file);

    registry[name] = entry;

    if (cleanup) {
      cleanupMethods[name] = cleanup;
    }
  }
};

/** Execute a single resource file in the parent process loads the resource module, gets the default export (should be { entry, name }), and registers it. */
export const executeResourceFile = async (path: string) => {
  const { cwd } = GLOBAL;
  const file = relative(cwd, path);
  const fileUrl = isWindows ? pathToFileURL(path).href : path;
  const mod = await import(fileUrl);
  const resource = (await mod.default) as Awaited<
    ReturnType<typeof createSharedResource>
  >;

  if (
    !resource ||
    typeof resource !== 'object' ||
    !resource.entry ||
    !resource.name
  ) {
    throw new Error(
      `Resource file ${file} does not export a valid default resource object`
    );
  }

  return resource;
};

/** Filter out resource files from the test files list */
export const separateResourceFiles = (
  files: string[]
): {
  resourceFiles: string[];
  testFiles: string[];
} => {
  const resourceFiles: string[] = [];
  const testFiles: string[] = [];

  for (const file of files) {
    if (resourceFilePattern.test(file)) {
      resourceFiles.push(file);
      continue;
    }

    testFiles.push(file);
  }

  return { resourceFiles, testFiles };
};
