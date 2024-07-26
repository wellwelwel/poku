import {
  availableParallelism as nodeAvailableParallelism,
  cpus,
} from 'node:os';

export const availableParallelism = (): number =>
  typeof nodeAvailableParallelism === 'function'
    ? Math.floor(nodeAvailableParallelism() / 2)
    : (cpus()?.length ?? 1);
