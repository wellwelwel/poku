import '../../../../src/modules/index.js';

const intercepted: string[] = [];
const write = process.stderr.write.bind(process.stderr);

process.stderr.write = (chunk: string | Uint8Array) => {
  intercepted.push(String(chunk));
  return true;
};

process.on('exit', () => {
  write(`intercepted: ${JSON.stringify(intercepted)}\n`);
});

Promise.reject('boom');
