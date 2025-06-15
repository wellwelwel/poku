//! version with c8
// import { mkdir, rm } from 'node:fs/promises';
// import { join } from 'node:path';
// import { GLOBAL } from '../configs/poku.js';
// import createReporter from 'c8/lib/report.js';

//! version with instanbul
import { mkdir, readdir, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as v8 from 'node:v8';
import { GLOBAL } from '../configs/poku.js';
import v8toIstanbul from 'v8-to-istanbul';
import { createCoverageMap } from 'istanbul-lib-coverage';
import { createContext } from 'istanbul-lib-report';
import { create as createReport } from 'istanbul-reports';

//? standart init code coverage
export async function coverageStart(dir: string): Promise<void> {
  const tempDir = join(dir, '.tmp');
  await rm(tempDir, { recursive: true, force: true });
  await mkdir(tempDir, { recursive: true });
  GLOBAL.coverageDir = dir;
  GLOBAL.coverageTempDir = tempDir;
  process.env.NODE_V8_COVERAGE = tempDir;
  GLOBAL.configs.noExit = true;
}


// //! version with c8
// export async function coverageReport(reports: string[]): Promise<void> {
//   if (!GLOBAL.coverageTempDir || !GLOBAL.coverageDir) return;

//   const report = createReporter({
//     reporter: reports,
//     reportsDirectory: GLOBAL.coverageDir,
//     tempDirectory: GLOBAL.coverageTempDir,
//   });
//   await report.run();
// }

//! version with instanbul
export async function coverageReport(reports: string[]): Promise<void> {
  if (!GLOBAL.coverageTempDir || !GLOBAL.coverageDir) return;

  try {
    v8.takeCoverage();
  } catch {}

  const coverageMap = createCoverageMap({});
  const files = await readdir(GLOBAL.coverageTempDir);

  for (const file of files) {
    const data = JSON.parse(
      await readFile(join(GLOBAL.coverageTempDir, file), 'utf8')
    );
    for (const script of data.result) {
      if (!script.url.startsWith('file://')) continue;
      const filePath = fileURLToPath(script.url);
      if (!filePath.startsWith(GLOBAL.cwd) || filePath.includes('node_modules'))
        continue;
      const converter = v8toIstanbul(filePath, 0, { source: await readFile(filePath, 'utf8') });
      await converter.load();
      converter.applyCoverage(script.functions);
      coverageMap.merge(converter.toIstanbul());
    }
  }

  const context = createContext({ dir: GLOBAL.coverageDir, coverageMap });

  for (const reporter of reports) {
    createReport(reporter).execute(context);
  }

  try {
    v8.stopCoverage();
  } catch {}
}