import { Write } from '../../services/write.js';
import { indentation } from '../../configs/indentation.js';
import { format } from '../../services/format.js';

export function todo(message: string): void;
export async function todo(
  message: string,
  _cb?: () => Promise<unknown>
): Promise<void>;
export function todo(message: string, _cb?: () => unknown): void;
export async function todo(
  message: string | (() => unknown) | (() => Promise<unknown>),
  _cb?: (() => unknown) | (() => Promise<unknown>)
): Promise<void> {
  Write.log(
    `${indentation.hasDescribe ? '  ' : ''}${format(`● ${message}`).cyan().bold()}`
  );

  /* c8 ignore start */ // Type guard
  if (typeof _cb === 'function') {
    const isAsync = _cb.constructor.name === 'AsyncFunction';

    if (isAsync) return await Promise.resolve();
    return;
  }
  /* c8 ignore stop */
}

export async function skip(
  message: string,
  _cb: () => Promise<unknown>
): Promise<void>;
export function skip(message: string, _cb: () => unknown): void;
export async function skip(_cb: () => Promise<unknown>): Promise<void>;
export function skip(_cb: () => unknown): void;
export async function skip(
  messageOrCb: string | (() => unknown) | (() => Promise<unknown>),
  _cb?: (() => unknown) | (() => Promise<unknown>)
): Promise<void> {
  const message =
    (typeof messageOrCb === 'string' && messageOrCb) || 'Skipping';

  Write.log(
    `${indentation.hasDescribe ? '  ' : ''}${format(`◯ ${message}`).info().bold()}`
  );

  /* c8 ignore start */ // Type guard
  if (typeof messageOrCb === 'function') {
    const isAsync = messageOrCb.constructor.name === 'AsyncFunction';

    if (isAsync) return await Promise.resolve();
    return;
  }

  if (typeof _cb === 'function') {
    const isAsync = _cb.constructor.name === 'AsyncFunction';

    if (isAsync) return await Promise.resolve();
    return;
  }
  /* c8 ignore stop */
}
