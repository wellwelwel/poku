import { Write } from '../../services/write.js';
import { indentation } from '../../configs/indentation.js';
import { format } from '../../services/format.js';

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
