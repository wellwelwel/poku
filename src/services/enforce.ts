import { argv, exit } from 'node:process';
import { log, hr } from './write.js';
import { format } from './format.js';

export const checkFlags = () => {
  const allowedFlags = new Set([
    '--concurrency',
    '--config',
    '--debug',
    '--denoAllow',
    '--denoCjs',
    '--denoDeny',
    '--enforce',
    '--envFile',
    '--exclude',
    '--failFast',
    '--filter',
    '--killPid',
    '--killPort',
    '--killRange',
    '--only',
    '--quiet',
    '--sequential',
    '--watch',
    '--watchInterval',
    '-c',
    '-d',
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
    hr();
    log(
      `${format('Unrecognized flags:').bold()}\n\n${unrecognizedFlags.map((flag) => format(flag).fail()).join('\n')}`
    );
    hr();
    exit(1);
  }
};
