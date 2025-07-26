import type {
  createSharedResource,
  SharedResourceEntry,
} from '../modules/helpers/shared-resources.js';
import { relative } from 'node:path';
import { GLOBAL } from '../configs/poku.js';

/**
 * Execute resource files (*.resource.ts) in the current process
 * to initialize shared resources before running tests
 */
export async function executeResourceFiles(
  files: string[],
  registry: Record<string, SharedResourceEntry>
): Promise<void> {
  for (const file of files) {
    const { entry, name } = await executeResourceFile(file);
    registry[name] = entry as SharedResourceEntry;
  }
}

/**
 * Execute a single resource file in the parent process
 * Loads the resource module, gets the default export (should be { entry, name }), and registers it
 */
export async function executeResourceFile(path: string) {
  const { cwd } = GLOBAL;
  const file = relative(cwd, path);

  const mod = await import(path);
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

  return { entry: resource.entry, name: resource.name };
}

/**
 * Filter out resource files from the test files list
 */
export function separateResourceFiles(files: string[]): {
  resourceFiles: string[];
  testFiles: string[];
} {
  const resourceFiles: string[] = [];
  const testFiles: string[] = [];

  for (const file of files) {
    if (
      file.endsWith('.resource.ts') ||
      file.endsWith('.resource.js') ||
      file.endsWith('.resource.mjs')
    ) {
      resourceFiles.push(file);
    } else {
      testFiles.push(file);
    }
  }

  return { resourceFiles, testFiles };
}
