import type { AddressInfo } from 'node:net';
import { createServer, get } from 'node:http';
import { resource } from '../../../../src/modules/index.js';

export const ServerContext = resource.create(
  async () => {
    const server = createServer((_, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ solution: 2 }));
    });

    await new Promise<void>((resolve) => server.listen(0, resolve));
    const { port } = server.address() as AddressInfo;

    return {
      port,
      getPort() {
        return port;
      },
      query(path: string): Promise<Record<string, unknown>> {
        return new Promise((resolve, reject) => {
          get(`http://localhost:${port}${path}`, (res) => {
            let data = '';

            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => resolve(JSON.parse(data)));
          }).on('error', reject);
        });
      },
      close() {
        server.close();
      },
    };
  },
  {
    onDestroy: (instance) => instance.close(),
  }
);
