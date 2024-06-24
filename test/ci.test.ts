import { test } from '../src/modules/test.js';
import { poku } from '../src/modules/poku.js';
import { exit } from '../src/modules/exit.js';
import { docker } from '../src/modules/container.js';

test(async () => {
  const compose = docker.compose({ cwd: './test/docker' });

  await compose.down();

  const result = await poku(['./test/compatibility'], {
    parallel: true,
    debug: true,
    noExit: true,
  });

  // if (result === 0) await compose.down();

  exit(result);
});
