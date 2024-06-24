/* c8 ignore next */
import type { WaitForPortOptions } from '../@types/processes.js';
import { createConnection } from 'node:net';

const checkPort = (port: number, host: string): Promise<boolean> =>
  new Promise((resolve) => {
    const client = createConnection(port, host);

    client.on('connect', () => {
      client.destroy();
      resolve(true);
    });

    /* c8 ignore start */
    client.on('error', () => {
      resolve(false);
    });
    /* c8 ignore stop */
  });

/**
 * Wait until the defined milliseconds.
 */
export const sleep = (milliseconds: number): Promise<void> => {
  /* c8 ignore start */
  if (!Number.isInteger(milliseconds)) {
    throw new Error(`Milliseconds must be an integer.`);
  }
  /* c8 ignore stop */

  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/* c8 ignore start */ // c8 bug
/**
 * Wait until the defined port is active.
 */
export const waitForPort = async (
  port: number,
  options?: WaitForPortOptions
): Promise<void> => {
  /* c8 ignore stop */
  const delay = options?.delay || 0;
  const interval = options?.interval || 100;
  const timeout = options?.timeout || 60000;
  const host = options?.host || 'localhost';

  /* c8 ignore start */
  if (!Number.isInteger(port)) {
    throw new Error('Port must be an integer.');
  }

  if (!Number.isInteger(interval)) {
    throw new Error('Interval must be an integer.');
  }

  if (!Number.isInteger(timeout)) {
    throw new Error('Timeout must be an integer.');
  }

  if (!Number.isInteger(delay)) {
    throw new Error('Delay must be an integer.');
  }
  /* c8 ignore stop */

  await sleep(delay);

  const startTime = Date.now();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const hasPort = await checkPort(port, host);

    if (hasPort) break;

    /* c8 ignore start */
    if (Date.now() - startTime >= timeout) {
      throw new Error(`Timeout waiting for port ${port} to become active`);
    }
    /* c8 ignore stop */

    await sleep(interval);
  }

  await sleep(delay);
};
