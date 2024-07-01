import { Write } from '../../services/write.js';

/** By default **Poku** only shows outputs generated from itself. This helper allows you to use an alternative to `console.log` with **Poku**. */
export const log = (message: string) => Write.log(`\x1b[0m${message}\x1b[0m`);
