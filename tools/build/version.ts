import fs from 'node:fs';
import { assert } from '../../src/modules/essentials/assert.js';

const packageJsonPath = './package.json';
const packageJson = fs.readFileSync(packageJsonPath, 'utf8');
const packageData = JSON.parse(packageJson);

const targets = ['./lib/configs/poku.js', './ci/src/configs/poku.js'];

for (const filePath of targets) {
  const content = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(
    filePath,
    content.replace(/''/gm, `'${packageData.version}'`),
    'utf8'
  );
}

(async () => {
  const { VERSION } = await import('../../lib/configs/poku.js');

  assert.strictEqual(VERSION, packageData.version, VERSION);
})();
