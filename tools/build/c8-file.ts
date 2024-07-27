import { platform } from 'node:os';
import { readFile, writeFile } from 'node:fs/promises';
import { JSONC } from 'jsonc.min';

(async () => {
  const OS = platform();
  const globalFile = JSONC.parse(
    await readFile('./.nycrc/_.jsonc', 'utf-8')
  ) as unknown as object;
  const osFile = JSONC.parse(
    await readFile(`./.nycrc/${OS}.jsonc`, 'utf-8')
  ) as unknown as object;
  const filenalFile = {
    ...globalFile,
    ...osFile,
  };

  await writeFile(
    './.nycrc.json',
    JSON.stringify(filenalFile, null, 2),
    'utf-8'
  );
})();
