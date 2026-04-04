import http from 'node:http';

const server = http.createServer((_, res) => {
  res.writeHead(200);
  res.end();
});

server.listen(4040, () => console.log("I'm ready"));
