/* c8 ignore next */ // Types
import type { Configs } from '../@types/poku.js';
import { format } from './format.js';
import { Write } from '../services/write.js';

const eachCore = async (
  type: keyof Required<Pick<Configs, 'beforeEach' | 'afterEach'>>,
  fileRelative: string,
  configs?: Configs
): Promise<boolean> => {
  /* c8 ignore next 3 */
  if (typeof configs?.[type] !== 'function') {
    return true;
  }

  const cb = configs[type];

  const cbName = cb.name !== type ? cb.name : 'anonymous function';

  Write.log(
    `    ${format('◯').dim().info()} ${format(`${type}: ${cbName}`)
      .dim()
      .italic()}`
  );

  try {
    await cb();

    return true;
  } catch (error) {
    Write.log(
      format(`    ✘ ${type} callback failed ${format(`› ${cbName}`).dim()}`)
        .fail()
        .bold()
    );
    Write.log(format(`      ├─ Who's trying to run this ${type}?`).fail());
    Write.log(
      format(`      │ └─ ${format(fileRelative).fail().underline()}`).fail()
    );

    if (error instanceof Error) {
      Write.log(format('      ├─ Message:').fail());
      Write.log(format(`      │ └─ ${error.message}`).fail());
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

/* c8 ignore next */ // ?
export const afterEach = async (fileRelative: string, configs?: Configs) => {
  if (configs?.afterEach) {
    return await eachCore('afterEach', fileRelative, configs);
  }

  return true;
};
