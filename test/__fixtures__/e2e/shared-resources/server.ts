import type { AddressInfo } from 'node:net';
import { createServer } from 'node:http';
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
      async query(path: string) {
        const response = await fetch(`http://localhost:${port}${path}`);
        return response.json() as Promise<Record<string, unknown>>;
      },
      close() {
        server.close();
      },
    };
  },
  {
    cleanup: (instance) => instance.close(),
  }
);
