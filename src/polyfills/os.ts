import {
  cpus,
  availableParallelism as nodeAvailableParallelism,
} from 'node:os';

export const availableParallelism = (): number =>
  typeof nodeAvailableParallelism === 'function'
    ? nodeAvailableParallelism()
    : (cpus()?.length ?? 0);
