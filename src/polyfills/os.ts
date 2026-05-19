import * as os from 'node:os';

export const availableParallelism = (): number =>
  typeof os.availableParallelism === 'function'
    ? os.availableParallelism()
    : (os.cpus()?.length ?? 0);
