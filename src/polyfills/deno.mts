import process from 'node:process';
import { createRequire } from 'node:module';
import { resolve, normalize } from 'node:path';

const file = process.env?.FILE;
if (!file) {
  process.exit(1);
}

const cwd = process.cwd();
const targetPath = resolve(cwd, '');
const filePath = resolve(targetPath, file!);

globalThis.require = createRequire(targetPath);
globalThis.exports = Object.create(null);

require(normalize(filePath));
