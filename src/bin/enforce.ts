import { argv, exit } from 'node:process';
import { Write } from '../services/write.js';
import { format } from '../services/format.js';

export const checkFlags = () => {
  const allowedFlags = new Set([
    '--config',
    '--platform',
    '--filter',
    '--exclude',
    '--killPort',
    '--killRange',
    '--killPid',
    '--denoAllow',
    '--denoDeny',
    '--denoCjs',
    '--parallel',
    '--enforce',
    '--quiet',
    '--debug',
    '--failFast',
    '--watch',
    '--envFile',
    '--concurrency',
    '--watchInterval',
    '--node',
    '--bun',
    '--deno',
    '-c',
    '-p',
    '-d',
    '-q',
    '-w',
    '-x',
  ]);

  const args = argv.slice(2);
  const unrecognizedFlags: string[] = [];

  for (const arg of args) {
    const flagName = arg.split('=')[0];

    if (!allowedFlags.has(flagName) && flagName.startsWith('-')) {
      unrecognizedFlags.push(flagName);
    }
  }

  if (unrecognizedFlags.length > 0) {
    Write.hr();
    Write.log(
      `${format('Unrecognized flags:').bold()}\n\n${unrecognizedFlags.map((flag) => format(flag).fail()).join('\n')}`
    );
    Write.hr();

    exit(1);
  }
};
