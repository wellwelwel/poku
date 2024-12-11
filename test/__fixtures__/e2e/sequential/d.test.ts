import { existsSync } from 'node:fs';
import { writeFile, rm, mkdir } from 'node:fs/promises';
import { test, assert } from '../../../../src/modules/index.js';

test(async () => {
  const testDir = '../../.temp/sequential';
  const testFile = `${testDir}/once-per-time.json`;

  if (existsSync(testFile)) assert.fail("File shoudn't exists");

  await mkdir(testDir);
  await writeFile(testFile, 'test', 'utf8');
  await rm(testFile);
  await rm(testDir, { recursive: true, force: true });
});
