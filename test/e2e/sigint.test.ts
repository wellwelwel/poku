import { spawn } from 'node:child_process';
import { ext, isBuild } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { test } from '../../src/modules/helpers/test.js';
import { sleep } from '../../src/modules/helpers/wait-for.js';
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

          child.stdout.on('data', (data: Buffer) => {
            stdout += String(data);
          });

          child.stderr.on('data', (data: Buffer) => {
            stderr += String(data);
          });

          child.on('close', () => {
            resolve({ stdout, stderr });
          });

          sleep(500).then(() => {
            child.kill('SIGINT');
          });
        }
      );

      assert(
        result.stdout.includes('\u001B[?25h'),
        'Should contain cursor restore sequence'
      );
    });
  });

  await describe('SIGINT cleanup for background processes', async () => {
    await it('should run create-service SIGINT handler', async () => {
      const cmd = runner(`_.${ext}`);
      const runtime = cmd.shift()!;
      const args = [...cmd, 'test/__fixtures__/e2e/sigint/start-and-wait.ts'];

      const result = await new Promise<{
        stdout: string;
        exitCode: number | null;
      }>((resolve) => {
        const child = spawn(runtime, args);

        child.stdout.setEncoding('utf8');
        child.stderr.setEncoding('utf8');

        let stdout = '';

        child.stdout.on('data', (data: Buffer) => {
          stdout += String(data);

          if (stdout.includes('service-started')) {
            sleep(250).then(() => {
              child.kill('SIGINT');
            });
          }
        });

        child.on('close', (code) => {
          resolve({ stdout, exitCode: code });
        });
      });

      assert(
        result.stdout.includes('service-started'),
        'Service should have started'
      );
    });
  });
});
