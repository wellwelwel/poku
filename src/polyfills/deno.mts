import { createRequire } from 'node:module';
import { normalize, resolve } from 'node:path';
import { cwd, env, exit } from 'node:process';

const file = env?.POKU_FILE;
if (!file) exit(1);

const targetPath = resolve(cwd(), '');
const filePath = resolve(targetPath, file!);

globalThis.require = createRequire(targetPath);
globalThis.exports = Object.create(null);

require(normalize(filePath));
