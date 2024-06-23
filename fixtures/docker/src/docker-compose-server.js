// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('node:http');

const server = http.createServer((_, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(6001);
