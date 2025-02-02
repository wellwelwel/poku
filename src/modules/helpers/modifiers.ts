import { exit } from 'node:process';
import { GLOBAL } from '../../configs/poku.js';
import { CheckNoOnly } from '../../parsers/callback.js';
import { hasOnly } from '../../parsers/get-arg.js';
import { format } from '../../services/format.js';
import { log } from '../../services/write.js';
import { describeBase } from './describe.js';
import { itBase } from './it/core.js';

export function todo(message: string): void;
export async function todo(
  message: string,
  cb?: () => Promise<unknown>
): Promise<void>;
export function todo(message: string, cb?: () => unknown): void;
export async function todo(
  messageOrCb: string | (() => unknown) | (() => Promise<unknown>),
  _cb?: (() => unknown) | (() => Promise<unknown>)
): Promise<void> {
  const message = typeof messageOrCb === 'string' ? messageOrCb : 'Planning';

  GLOBAL.reporter.onTodoModifier({ message });
}

export async function skip(
  message: string,
  cb: () => Promise<unknown>
): Promise<void>;
export function skip(message: string, cb: () => unknown): void;
export async function skip(cb: () => Promise<unknown>): Promise<void>;
export function skip(cb: () => unknown): void;
export async function skip(
  messageOrCb: string | (() => unknown) | (() => Promise<unknown>),
  _cb?: (() => unknown) | (() => Promise<unknown>)
): Promise<void> {
  const message = typeof messageOrCb === 'string' ? messageOrCb : 'Skipping';

  GLOBAL.reporter.onSkipModifier({ message });
}

export async function onlyDescribe(
  message: string,
  cb: () => Promise<unknown>
): Promise<void>;
export function onlyDescribe(message: string, cb: () => unknown): void;
export async function onlyDescribe(cb: () => Promise<unknown>): Promise<void>;
export function onlyDescribe(cb: () => unknown): void;
export async function onlyDescribe(
  messageOrCb: string | (() => unknown) | (() => Promise<unknown>),
  cb?: (() => unknown) | (() => Promise<unknown>)
): Promise<void> {
  if (!hasOnly) {
    log(format("Can't run `describe.only` tests without `--only` flag").fail());
    exit(1);
  }

  const noItOnly = CheckNoOnly(
    typeof messageOrCb === 'function' ? messageOrCb : cb
  );

  if (noItOnly) GLOBAL.runAsOnly = true;

  if (typeof messageOrCb === 'string' && cb)
    return describeBase(messageOrCb, cb);
  if (typeof messageOrCb === 'function') return describeBase(messageOrCb);
}

export async function onlyIt(
  message: string,
  cb: () => Promise<unknown>
): Promise<void>;
export function onlyIt(message: string, cb: () => unknown): void;
export async function onlyIt(cb: () => Promise<unknown>): Promise<void>;
export function onlyIt(cb: () => unknown): void;
export async function onlyIt(
  messageOrCb: string | (() => unknown) | (() => Promise<unknown>),
  cb?: (() => unknown) | (() => Promise<unknown>)
): Promise<void> {
  if (!hasOnly) {
    log(
      format(
        "Can't run `it.only` and `test.only` tests without `--only` flag"
      ).fail()
    );
    exit(1);
  }

  if (typeof messageOrCb === 'string' && cb) return itBase(messageOrCb, cb);
  if (typeof messageOrCb === 'function') return itBase(messageOrCb);
}
