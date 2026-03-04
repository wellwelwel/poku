import { createServer } from 'node:http';
import { describe } from '../../../../../src/modules/helpers/describe.js';
import { it } from '../../../../../src/modules/helpers/it/core.js';

const server = createServer((_, res) => res.end('ok'));

describe('Service with hanging connection', async () => {
  await new Promise<void>((resolve) => server.listen(0, resolve));

  it('should fail before closing the server', () => {
    throw new Error('Intentional failure');
    // server.end() // will never be reached
  });

  // the process will remain hanging indefinitely
});
