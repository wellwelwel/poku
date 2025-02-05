import type { Configs } from '../@types/poku.js';
import { GLOBAL } from '../configs/poku.js';
import { log } from '../services/write.js';
import { format } from './format.js';

const eachCore = async (
  type: keyof Required<Pick<Configs, 'beforeEach' | 'afterEach'>>,
  fileRelative: string
): Promise<boolean> => {
  const { configs } = GLOBAL;

  if (typeof configs?.[type] !== 'function') return true;

  const cb = configs[type];
  const showLogs = !configs.quiet;
  const cbName = cb.name !== type ? cb.name : 'anonymous function';

  showLogs &&
    log(
      `    ${format('◯').dim().info()} ${format(`${type}: ${cbName}`)
        .dim()
        .italic()}`
    );

  try {
    await cb();

    return true;
  } catch (error) {
    if (showLogs) {
      log(
        format(`    ✘ ${type} callback failed ${format(`› ${cbName}`).dim()}`)
          .fail()
          .bold()
      );
      log(format(`      ├─ Who's trying to run this ${type}?`).fail());
      log(
        format(`      │ └─ ${format(fileRelative).fail().underline()}`).fail()
      );

      if (error instanceof Error) {
        log(format('      ├─ Message:').fail());
        log(format(`      │ └─ ${error.message}`).fail());
      }
    }

    return false;
  }
};

export const beforeEach = async (fileRelative: string) => {
  if (GLOBAL.configs.beforeEach) return eachCore('beforeEach', fileRelative);

  return true;
};

export const afterEach = async (fileRelative: string) => {
  if (GLOBAL.configs.afterEach) return eachCore('afterEach', fileRelative);

  return true;
};
