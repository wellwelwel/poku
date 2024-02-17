import { promises as fs } from 'node:fs';
import { getFiles } from '../../src/helpers/get-files.ts';

const ensureDenoCompatibility = async (path: string) => {
  const files = getFiles(path, [], {
    filter: /\.(m)?(t)?s$/,
  });

  // console.log('Ensuring Compatibility For:', files);

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const content = raw.replace(/((import|export).+)(\.js)/g, '$1.ts');

    await fs.writeFile(file, content);
  }
};

ensureDenoCompatibility('src');
ensureDenoCompatibility('test');
