import { format } from '../helpers/format.js';
import { write } from '../helpers/logs.js';
/* c8 ignore next */
import type { Configs } from '../@types/poku.js';

const eachCore = async (
  type: keyof Required<Pick<Configs, 'beforeEach' | 'afterEach'>>,
  fileRelative: string,
  configs?: Configs
): Promise<boolean> => {
  if (typeof configs?.[type] !== 'function') return true;

  const cb = configs[type];
  /* c8 ignore next */
  if (typeof cb !== 'function') return true;

  write(
    `    ${format.dim(format.info('◯'))} ${format.dim(format.italic(`${cb}: ${cb.name || 'anonymous function'}`))}`
  );

  try {
    const resultCb = cb();
    /* c8 ignore next */
    if (resultCb instanceof Promise) await resultCb;
    return true;
  } catch (error) {
    write(
      format.bold(
        format.fail(`    ✘ ${type} callback failed ${format.dim(`› ${cb}`)}`)
      )
    );
    write(
      format.fail(
        `      ├─ Who's trying to run this ${type}?\n      │ └─ ${format.underline(fileRelative)}`
      )
    );

    error instanceof Error &&
      write(format.fail(`      ├─ Message:\n      │ └─ ${error.message}`));

    return false;
  }
};

export const beforeEach = async (fileRelative: string, configs?: Configs) => {
  if (configs?.beforeEach)
    return await eachCore('beforeEach', fileRelative, configs);

  return true;
};

export const afterEach = async (fileRelative: string, configs?: Configs) => {
  if (configs?.afterEach)
    return await eachCore('afterEach', fileRelative, configs);

  return true;
};
