import { readFile, writeFile } from 'node:fs/promises';
import { JSONC } from 'jsonc.min';

(async () => {
  const content = await readFile('schemas/options.json', 'utf-8');
  const configs = JSONC.minify(content);

  await writeFile('./static/schemas/configs.json', configs, 'utf-8');
})();
