import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const isDeno = typeof globalThis.Deno !== 'undefined';
const serviceArgs = isDeno
  ? ['run', '--allow-net', join(dir, 'simple-service.js')]
  : [join(dir, 'simple-service.js')];
const service = spawn(process.execPath, serviceArgs, {
  stdio: ['inherit', 'pipe', 'pipe'],
});

service.stdout.on('data', () => {});

setInterval(() => {}, 60000);

process.on('SIGINT', () => {
  try {
    process.kill(service.pid);
  } catch {}
  process.exit(0);
});
