import { promises as fs } from 'node:fs';
import { getFiles } from '../../src/modules/get-files.js';

const ensureNodeCompatibility = async (path: string) => {
  const files = getFiles(path, [], {
    filter: /\.(m)?(j|t)?s$/,
  });

  // console.log('Ensuring Compatibility For:', files);

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const content = raw.replace(/"node:(.+)"/g, '"$1"');

    await fs.writeFile(file, content);
  }
};

ensureNodeCompatibility('./lib');
ensureNodeCompatibility('./ci');
