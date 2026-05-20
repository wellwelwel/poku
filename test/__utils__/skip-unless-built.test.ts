import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { skip } from '../../src/modules/helpers/skip.js';

export const LIB_ESM = resolve('lib/modules/index.js');
export const LIB_CJS = resolve('lib/modules/index.cjs');

export const skipUnlessBuilt = (): undefined | never => {
  if (!existsSync(LIB_ESM) || !existsSync(LIB_CJS)) skip();
};
