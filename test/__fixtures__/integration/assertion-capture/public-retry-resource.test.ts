import { EventEmitter } from 'node:events';
import { assert, retry } from '../../../../src/modules/index.js';

const ticker = new EventEmitter();
const interval = setInterval(() => ticker.emit('tick'), 5);
let attempt = 0;

try {
  await retry(2, () => {
    attempt++;
    return new Promise<void>((resolve, reject) => {
      ticker.once('tick', () => {
        try {
          assert.strictEqual(attempt, 2, 'passes on the second attempt');
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  });
} finally {
  clearInterval(interval);
}

console.log(`resource retry attempts:${attempt}`);
