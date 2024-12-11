import { env, exit, cwd } from 'node:process';
import { createRequire } from 'node:module';
import { resolve, normalize } from 'node:path';

const file = env?.POKU_FILE;
if (!file) exit(1);

const targetPath = resolve(cwd(), '');
const filePath = resolve(targetPath, file!);

globalThis.require = createRequire(targetPath);
globalThis.exports = Object.create(null);

require(normalize(filePath));
