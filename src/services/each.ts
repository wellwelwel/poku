/* c8 ignore next */
import type { Configs } from '../@types/poku.js';
import { format } from '../helpers/format.js';
import { write } from '../helpers/logs.js';

const eachCore = async (
  type: keyof Required<Pick<Configs, 'beforeEach' | 'afterEach'>>,
  fileRelative: string,
  configs?: Configs
): Promise<boolean> => {
  /* c8 ignore start */
  if (typeof configs?.[type] !== 'function') {
    return true;
  }
  /* c8 ignore stop */

  const cb = configs[type];

  /* c8 ignore start */
  if (typeof cb !== 'function') {
    return true;
  }
  /* c8 ignore stop */

  /* c8 ignore start */
  write(
    `    ${format('◯').dim().info()} ${format(
      `${cb}: ${cb.name || 'anonymous function'}`
    )
      .dim()
      .italic()}`
  );
  /* c8 ignore stop */

  try {
    const resultCb = cb();

    /* c8 ignore start */
    if (resultCb instanceof Promise) {
      await resultCb;
    }
    /* c8 ignore stop */

    return true;
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
      write(format('      ├─ Message:').fail());
      write(format(`      │ └─ ${error.message}`).fail());
    }

    return false;
  }
};

export const beforeEach = async (fileRelative: string, configs?: Configs) => {
  if (configs?.beforeEach) {
    return await eachCore('beforeEach', fileRelative, configs);
  }

  return true;
};

/* c8 ignore next */ // c8 bug
export const afterEach = async (fileRelative: string, configs?: Configs) => {
  if (configs?.afterEach) {
    return await eachCore('afterEach', fileRelative, configs);
  }

  return true;
};
