import { promises as fs } from 'node:fs';
import { listFiles } from '../../src/modules/helpers/list-files.js';

const ensureNodeCompatibility = async (path: string) => {
  const files = await listFiles(path, {
    filter: /\.(m)?(j|t)?s$/,
  });

  console.log('Ensuring no unnecessary comments for:', files);

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const content = raw.replace(/\/\* c8.+\*\/( \/\/ .+)?( )?|\/\/ .+/gim, '');

    await fs.writeFile(file, content);
  }
};

ensureNodeCompatibility('./lib');
