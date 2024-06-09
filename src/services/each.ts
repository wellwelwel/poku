import { EOL } from 'node:os';
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

  const functionName = configs[type]?.name;

  write(
    `    ${format.dim(format.info('◯'))} ${format.dim(format.italic(`${configs[type]}: ${functionName !== configs[type] ? functionName : 'anonymous function'}`))}`
  );

  try {
    await configs[type]?.();
    return true;
  } catch (error) {
    write(
      format.bold(
        format.fail(
          `    ✘ ${type} callback failed ${format.dim(`› ${configs[type]}`)}`
        )
      )
    );
    write(
      format.fail(
        `      ├─ Who's trying to run this ${type}?${EOL}      │ └─ ${format.underline(fileRelative)}`
      )
    );

    error instanceof Error &&
      write(format.fail(`      ├─ Message:${EOL}      │ └─ ${error.message}`));

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
