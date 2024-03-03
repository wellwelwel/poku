import { promises as fs } from 'node:fs';
import { listFiles } from '../../src/index.js';

const ensureNodeCompatibility = async (path: string) => {
  const files = listFiles(path, {
    filter: /\.(j|t)s$/,
  });

  console.log('Ensuring Node Compatibility For:', files);

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const content = raw.replace(/"node:(.+)"/g, '"$1"');

    await fs.writeFile(file, content);
  }
};

ensureNodeCompatibility('./lib');
ensureNodeCompatibility('./ci');
