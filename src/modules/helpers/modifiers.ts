import { Write } from '../../services/write.js';
import { indentation } from '../../configs/indentation.js';
import { format } from '../../services/format.js';

export const todo = (message: string, _cb?: () => unknown) =>
  Write.log(
    `${indentation.hasDescribe ? '  ' : ''}${format(`● ${message}`).cyan().bold()}`
  );

export function skip(message: string, _cb: () => unknown): void;
export function skip(_cb: () => unknown): void;
export function skip(
  messageOrCb: string | (() => unknown),
  _cb?: () => unknown
) {
  const message =
    (typeof messageOrCb === 'string' && messageOrCb) || 'Skipping';

  Write.log(
    `${indentation.hasDescribe ? '  ' : ''}${format(`◯ ${message}`).info().bold()}`
  );
}
