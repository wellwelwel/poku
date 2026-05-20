import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { skip } from '../../src/modules/helpers/skip.js';

const esmPath = resolve('lib/modules/index.js');
const cjsPath = resolve('lib/modules/index.cjs');

export const LIB_ESM = pathToFileURL(esmPath).href;
export const LIB_CJS = cjsPath;

export const skipUnlessBuilt = (): undefined | never => {
  if (!existsSync(esmPath) || !existsSync(cjsPath)) skip();
};
