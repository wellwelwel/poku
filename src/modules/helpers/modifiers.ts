import { exit } from 'node:process';
import { log } from '../../services/write.js';
import { indentation } from '../../configs/indentation.js';
import { format } from '../../services/format.js';
import { itBase } from './it/core.js';
import { describeBase } from './describe.js';
import { hasOnly } from '../../parsers/get-arg.js';
import { CheckNoOnly } from '../../parsers/callback.js';
import { GLOBAL } from '../../configs/poku.js';

export function todo(message: string): void;
export async function todo(
  message: string,
  cb?: () => Promise<unknown>
): Promise<void>;
export function todo(message: string, cb?: () => unknown): void;
export async function todo(
  message: string | (() => unknown) | (() => Promise<unknown>),
  _cb?: (() => unknown) | (() => Promise<unknown>)
): Promise<void> {
  log(
    `${indentation.hasDescribe ? '  ' : ''}${format(`● ${message}`).cyan().bold()}`
  );
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

  log(
    `${indentation.hasDescribe ? '  ' : ''}${format(`◯ ${message}`).info().bold()}`
  );
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
