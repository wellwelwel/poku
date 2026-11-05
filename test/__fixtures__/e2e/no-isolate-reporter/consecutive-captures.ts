import { poku } from '../../../../src/modules/index.js';
import { createReporter } from '../../../../src/modules/plugins.js';

await poku('first-capture.test.ts', {
  reporter: createReporter({}),
  isolation: 'none',
  noExit: true,
});

await poku('second-capture.test.ts', {
  reporter: 'poku',
  isolation: 'none',
  noExit: true,
});
