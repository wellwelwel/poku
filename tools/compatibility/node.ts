import { promises as fs } from 'node:fs';
import { listFiles } from '../../src/modules/helpers/list-files.js';

const ensureNodeCompatibility = async (path: string) => {
  const files = await listFiles(path, {
    filter: /\.(c|m)?(j|t)?s$/,
  });

  console.log('Ensuring Compatibility For:', files);

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const content = raw.replace(/("|')node:(.+)("|')/g, '"$2"');

    await fs.writeFile(file, content, { encoding: 'utf8' });
  }
};

ensureNodeCompatibility('./lib');
ensureNodeCompatibility('./ci');
