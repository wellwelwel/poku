import { poku } from '../src/modules/essentials/poku.js';
import { docker } from '../src/modules/helpers/container.js';
import { exit } from '../src/modules/helpers/exit.js';
import { test } from '../src/modules/helpers/test.js';

test(async () => {
  const compose = docker.compose({ cwd: './test/__docker__' });

  await compose.down();

  const result = await poku(['./test/compatibility'], {
    debug: true,
    noExit: true,
  });

  if (result === 0) await compose.down();

  exit(result);
});
