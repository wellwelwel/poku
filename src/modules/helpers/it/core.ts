import { hrtime } from 'node:process';
import { each } from '../../../configs/each.js';
import { indentation } from '../../../configs/indentation.js';
import { format } from '../../../services/format.js';
import { log } from '../../../services/write.js';
import { todo, skip, onlyIt } from '../modifiers.js';
import { hasOnly } from '../../../parsers/get-arg.js';
import { GLOBAL } from '../../../configs/poku.js';

export async function itBase(
  ...args: [
    string | (() => unknown | Promise<unknown>),
    (() => unknown | Promise<unknown>)?,
  ]
): Promise<void> {
  try {
    let message: string | undefined;
    let cb: () => unknown | Promise<unknown>;

    if (typeof args[0] === 'string') {
      message = args[0];
      cb = args[1] as () => unknown | Promise<unknown>;
    } else cb = args[0] as () => unknown | Promise<unknown>;

    if (message) {
      indentation.hasItOrTest = true;

      log(
        `${indentation.hasDescribe ? '  ' : ''}${format(`◌ ${message}`).dim()}`
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
    log(
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

async function itCore(
  message: string,
  cb: () => Promise<unknown>
): Promise<void>;
function itCore(message: string, cb: () => unknown): void;
async function itCore(cb: () => Promise<unknown>): Promise<void>;
function itCore(cb: () => unknown): void;
async function itCore(
  messageOrCb: string | (() => unknown) | (() => Promise<unknown>),
  cb?: (() => unknown) | (() => Promise<unknown>)
): Promise<void> {
  if (hasOnly) {
    if (!GLOBAL.runAsOnly) return;

    if (typeof messageOrCb === 'string' && typeof cb === 'function')
      return itBase(messageOrCb, cb);

    if (typeof messageOrCb === 'function') return itBase(messageOrCb);
  }

  if (typeof messageOrCb === 'string' && cb) return itBase(messageOrCb, cb);
  if (typeof messageOrCb === 'function') return itBase(messageOrCb);
}

export const it = Object.assign(itCore, {
  todo,
  skip,
  only: onlyIt,
});
