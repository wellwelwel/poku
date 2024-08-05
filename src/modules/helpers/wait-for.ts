import type {
  WaitForExpectedResultOptions,
  WaitForPortOptions,
} from '../../@types/wait-for.js';
import { createConnection } from 'node:net';
import { deepEqual, deepStrictEqual } from 'node:assert';

const checkPort = (port: number, host: string): Promise<boolean> =>
  new Promise((resolve) => {
    const client = createConnection(port, host);

    client.on('connect', () => {
      client.destroy();
      resolve(true);
    });

    client.on('error', () => {
      resolve(false);
    });
  });

/** Wait until the defined milliseconds. */
export const sleep = (milliseconds: number): Promise<void> => {
  if (!Number.isInteger(milliseconds)) {
    throw new Error('Milliseconds must be an integer.');
  }

  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/** Wait until a result is equal the expected value. */
export const waitForExpectedResult = async (
  callback: () => unknown | Promise<unknown>,
  expectedResult: unknown,
  options?: WaitForExpectedResultOptions
): Promise<void> => {
  const delay = options?.delay || 0;
  const interval = options?.interval || 100;
  const timeout = options?.timeout || 60000;

  if (typeof callback !== 'function') {
    throw new Error('Callback must be a function.');
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

  await sleep(delay);

  const startTime = Date.now();

  while (true) {
    const result = await callback();

    if (typeof expectedResult === 'function') {
      if (typeof result === 'function' && result.name === expectedResult.name) {
        break;
      }
    } else if (typeof expectedResult === 'symbol') {
      if (
        typeof result === 'symbol' &&
        String(result) === String(expectedResult)
      ) {
        break;
      }
    } else {
      try {
        options?.strict
          ? deepStrictEqual(result, expectedResult)
          : deepEqual(result, expectedResult);
        break;
      } catch {}
    }

    if (Date.now() - startTime >= timeout) {
      throw new Error('Timeout');
    }

    await sleep(interval);
  }

  await sleep(delay);
};

/** Wait until the defined port is active. */
export const waitForPort = async (
  port: number,
  options?: WaitForPortOptions
): Promise<void> => {
  const host = options?.host || 'localhost';

  if (!Number.isInteger(port)) {
    throw new Error('Port must be an integer.');
  }

  await waitForExpectedResult(
    async () => await checkPort(port, host),
    true,
    options
  );
};
