import type { backgroundColor } from '../services/format.js';

export type DescribeOptions = {
  background?: keyof typeof backgroundColor | boolean;
  /**
   * @default "☰"
   */
  icon?: string;
};
