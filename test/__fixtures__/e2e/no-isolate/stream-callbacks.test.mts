import { strict as nodeAssert } from 'node:assert';
import { it } from '../../../../src/modules/index.js';

const waitForWrite = (
  write: (callback: (error?: Error | null) => void) => boolean
): Promise<void> =>
  new Promise((resolve, reject) => {
    let returned = false;
    const accepted = write((error) => {
      try {
        nodeAssert.ifError(error);
        nodeAssert.strictEqual(returned, true);
        resolve();
      } catch (failure) {
        reject(failure);
      }
    });
    returned = true;
    nodeAssert.strictEqual(accepted, true);
  });

for (const name of ['stdout', 'stderr'] as const) {
  await it(`waits for ${name} write callbacks`, async () => {
    const stream = process[name];
    await waitForWrite((callback) =>
      stream.write(`${name} string flushed\n`, callback)
    );
    await waitForWrite((callback) =>
      stream.write(Buffer.from(`${name} buffer flushed\n`), 'utf8', callback)
    );
    const bytes = new Uint8Array(Buffer.from(`skip:${name} bytes á flushed\n`));
    await waitForWrite((callback) =>
      stream.write(bytes.subarray(5), 'latin1', callback)
    );
    console.log(`${name} callbacks completed`);
  });
}
