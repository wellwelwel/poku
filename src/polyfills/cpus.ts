import {
  availableParallelism as nodeAvailableParallelism,
  cpus,
} from 'node:os';

export const availableParallelism = (): number =>
  typeof nodeAvailableParallelism === 'function'
    ? nodeAvailableParallelism()
    : (cpus()?.length ?? 1);
