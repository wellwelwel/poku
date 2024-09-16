import { argv, exit } from 'node:process';
import { Write } from '../services/write.js';
import { format } from '../services/format.js';

export const checkFlags = () => {
  const allowedFlags = new Set([
    '--bun',
    '--concurrency',
    '--config',
    '--debug',
    '--deno',
    '--denoAllow',
    '--denoCjs',
    '--denoDeny',
    '--describeOnly',
    '--enforce',
    '--envFile',
    '--exclude',
    '--failFast',
    '--filter',
    '--itOnly',
    '--killPid',
    '--killPort',
    '--killRange',
    '--node',
    '--only',
    '--parallel',
    '--platform',
    '--quiet',
    '--watch',
    '--watchInterval',
    '-c',
    '-d',
    '-p',
    '-q',
    '-w',
    '-x',
  ]);

  const args = argv.slice(2);
  const unrecognizedFlags: string[] = [];

  for (const arg of args) {
    const flagName = arg.split('=')[0];

    if (!allowedFlags.has(flagName) && flagName.startsWith('-'))
      unrecognizedFlags.push(flagName);
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
