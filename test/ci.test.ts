import { poku } from '../src/modules/essentials/poku.js';
import { test } from '../src/modules/helpers/test.js';
import { exit } from '../src/modules/helpers/exit.js';
import { docker } from '../src/modules/helpers/container.js';

test(async () => {
  const compose = docker.compose({ cwd: './test/docker' });

  await compose.down();

  const result = await poku(['./test/compatibility'], {
    parallel: true,
    debug: true,
    noExit: true,
  });

  if (result === 0) {
    await compose.down();
  }

  exit(result);
});
