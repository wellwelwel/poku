import { Write } from '../../services/write.js';
import { indentation } from '../../configs/indentation.js';
import { format } from '../../services/format.js';
import { itBase } from './it/core.js';
import { describeBase } from './describe.js';
import { hasOnly } from '../../parsers/get-arg.js';

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
  Write.log(
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

  Write.log(
    `${indentation.hasDescribe ? '  ' : ''}${format(`◯ ${message}`).info().bold()}`
  );
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
  if (!hasOnly) throw new Error("Can't use `.only` without `--only`");

  if (typeof messageOrCb === 'string' && cb) return itBase(messageOrCb, cb);
  if (typeof messageOrCb === 'function') return itBase(messageOrCb);
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
  if (!hasOnly) throw new Error("Can't use `.only` without `--only`");

  if (typeof messageOrCb === 'string' && cb)
    return describeBase(messageOrCb, cb);
  if (typeof messageOrCb === 'function') return describeBase(messageOrCb);
}
