import http from 'node:http';

export const server = async () => {
  const server = http.createServer();

  await new Promise<void>((resolve) => server.listen(8000, resolve));
  await new Promise((resolve) => server.close(resolve));
};
