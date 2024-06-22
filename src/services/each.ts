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
    `    ${format('◯').dim().info()} ${format(
      `${cb}: ${cb.name || 'anonymous function'}`
    )
      .dim()
      .italic()}`
  );

  try {
    const resultCb = cb();
    /* c8 ignore next */
    if (resultCb instanceof Promise) await resultCb;
    return true;
    /* c8 ignore start */
  } catch (error) {
    write(
      format(`    ✘ ${type} callback failed ${format(`› ${cb}`).dim()}`)
        .fail()
        .bold()
    );
    write(format(`      ├─ Who's trying to run this ${type}?`).fail());
    write(
      format(`      │ └─ ${format(fileRelative).fail().underline()}`).fail()
    );

    if (error instanceof Error) {
      write(format(`      ├─ Message:`).fail());
      write(format(`      │ └─ ${error.message}`).fail());
    }

    return false;
  }
  /* c8 ignore stop */
  /* c8 ignore next */
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
