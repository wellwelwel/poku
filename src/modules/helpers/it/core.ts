import { hrtime, env } from 'node:process';
import { each } from '../../../configs/each.js';
import { indentation } from '../../../configs/indentation.js';
import { format } from '../../../services/format.js';
import { Write } from '../../../services/write.js';
import { todo, skip } from '../modifiers.js';

async function itCore(
  message: string,
  cb: () => Promise<unknown>
): Promise<void>;
function itCore(message: string, cb: () => unknown): void;
async function itCore(cb: () => Promise<unknown>): Promise<void>;
function itCore(cb: () => unknown): void;
async function itCore(
  ...args: [
    string | (() => unknown | Promise<unknown>),
    (() => unknown | Promise<unknown>)?,
  ]
): Promise<void> {
  try {
    let message: string | undefined;
    let cb: () => unknown | Promise<unknown>;

    const isPoku = typeof env?.FILE === 'string' && env?.FILE.length > 0;
    const FILE = env.FILE;

    if (typeof args[0] === 'string') {
      message = args[0];
      cb = args[1] as () => unknown | Promise<unknown>;
    } else cb = args[0] as () => unknown | Promise<unknown>;

    if (message) {
      indentation.hasItOrTest = true;

      Write.log(
        isPoku
          ? `${indentation.hasDescribe ? '  ' : ''}${format(`◌ ${message} › ${format(`${FILE}`).italic().gray()}`).dim()}`
          : `${indentation.hasDescribe ? '  ' : ''}${format(`◌ ${message}`).dim()}`
      );
    }

    if (typeof each.before.cb === 'function') {
      const beforeResult = each.before.cb();

      if (beforeResult instanceof Promise) await beforeResult;
    }

    const start = hrtime();
    const resultCb = cb();

    if (resultCb instanceof Promise) await resultCb;

    const end = hrtime(start);

    if (typeof each.after.cb === 'function') {
      const afterResult = each.after.cb();

      if (afterResult instanceof Promise) await afterResult;
    }

    if (!message) return;

    const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

    indentation.hasItOrTest = false;
    Write.log(
      `${indentation.hasDescribe ? '  ' : ''}${format(`● ${message}`).success().bold()} ${format(`› ${total}ms`).success().dim()}`
    );
  } catch (error) {
    indentation.hasItOrTest = false;

    if (typeof each.after.cb === 'function') {
      const afterResult = each.after.cb();

      if (afterResult instanceof Promise) await afterResult;
    }

    throw error;
  }
}

export const it = Object.assign(itCore, {
  todo,
  skip,
});
