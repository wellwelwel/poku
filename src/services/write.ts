/* c8 ignore next */ // Types
import type { Formatter } from '../services/format.js';
import { stdout } from 'node:process';

export class Write {
  static log(data: string | Uint8Array | Formatter) {
    stdout.write(`${String(data)}\n`);
  }

  static hr() {
    const line = '⎯'.repeat(stdout.columns - 10 || 40);

    this.log(`\n\x1b[2m\x1b[90m${line}\x1b[0m\n`);
  }
  /* c8 ignore next */ // ?
}
