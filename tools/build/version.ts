import fs from 'node:fs';
import { assert } from '../../src/modules/essentials/assert.js';

const packageJsonPath = './package.json';
const cliFilePath = './lib/configs/poku.js';
const packageJson = fs.readFileSync(packageJsonPath, 'utf8');
const packageData = JSON.parse(packageJson);
const cliFileContent = fs.readFileSync(cliFilePath, 'utf8');
const newContent = cliFileContent.replace(/''/gm, `'${packageData.version}'`);

fs.writeFileSync(cliFilePath, newContent, 'utf8');

(async () => {
  const { VERSION } = await import('../../lib/configs/poku.js');

  assert.strictEqual(VERSION, packageData.version, VERSION);
})();
