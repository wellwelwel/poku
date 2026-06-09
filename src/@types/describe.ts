import type { backgroundColor } from '../services/format.js';

export type DescribeOptions = {
  background?: keyof typeof backgroundColor | boolean;
  icon?: string;
};

export type DescribeCb = () => unknown | Promise<unknown>;
export type AsyncDescribeCb = () => Promise<unknown>;

export type Describe = {
  (message: string, cb: AsyncDescribeCb): Promise<void>;
  (message: string, cb: DescribeCb): void;
  (cb: AsyncDescribeCb): Promise<void>;
  (cb: DescribeCb): void;
  (message: string, options?: DescribeOptions): void;
};
