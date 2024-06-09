/* c8 ignore start */

import { type backgroundColor } from '../helpers/format.js';

export type DescribeOptions = {
  background?: keyof typeof backgroundColor | boolean;
  /**
   * @default "☰"
   */
  icon?: string;
  /** @deprecated */
  pad?: boolean;
  /**
   * @default "grey"
   */
};

/* c8 ignore stop */
