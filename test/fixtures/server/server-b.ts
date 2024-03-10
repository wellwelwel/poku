import http from 'node:http';

const server = http.createServer((_, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ name: 'Poku' }));
});

server.listen(4001, () => console.log("I'm ready 🚀"));
