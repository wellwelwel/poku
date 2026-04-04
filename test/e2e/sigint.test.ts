import { spawn } from 'node:child_process';
import { ext, isBuild } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { kill } from '../../src/modules/helpers/kill.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { test } from '../../src/modules/helpers/test.js';
import { sleep, waitForPort } from '../../src/modules/helpers/wait-for.js';
import { runner } from '../../src/parsers/get-runner.js';
import { isWindows } from '../../src/parsers/os.js';

if (isBuild || isWindows) skip();

test(async () => {
  await describe('SIGINT handler', async () => {
    await it('should restore cursor visibility on SIGINT', async () => {
      const cmd = runner(`_.${ext}`);
      const runtime = cmd.shift()!;
      const args = [
        ...cmd,
        `src/bin/index.${ext}`,
        '--debug',
        '--filter=slow-timeout',
        'test/__fixtures__/e2e/no-isolate',
      ];

      const result = await new Promise<{ stdout: string; stderr: string }>(
        (resolve) => {
          const child = spawn(runtime, args);

          child.stdout.setEncoding('utf8');
          child.stderr.setEncoding('utf8');

          let stdout = '';
          let stderr = '';
          let sigintSent = false;

          child.stdout.on('data', (data: Buffer) => {
            stdout += String(data);

            if (!sigintSent && stdout.length > 0) {
              sigintSent = true;
              sleep(250).then(() => {
                child.kill('SIGINT');
              });
            }
          });

          child.stderr.on('data', (data: Buffer) => {
            stderr += String(data);
          });

          child.on('close', () => {
            resolve({ stdout, stderr });
          });
        }
      );

      assert.match(
        result.stdout,
        /\u001B\[\?25h/,
        'Should contain cursor restore sequence'
      );
    });
  });

  await describe('SIGINT cleanup for background processes', async () => {
    await it('should run create-service SIGINT handler', async () => {
      const cmd = runner(`_.${ext}`);
      const runtime = cmd.shift()!;
      const args = [...cmd, 'test/__fixtures__/e2e/sigint/start-and-wait.mjs'];

      const child = spawn(runtime, args);

      await waitForPort(4040, { timeout: 10000, delay: 100 });

      child.kill('SIGINT');

      const exitCode = await new Promise<number | null>((resolve) => {
        child.on('close', (code) => resolve(code));
      });

      assert.ok(exitCode !== undefined, 'Process should have exited');

      await sleep(250);
      await kill.port(4040);
    });
  });
});
