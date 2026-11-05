import { poku } from '../../../../src/modules/index.js';
import { createReporter } from '../../../../src/modules/plugins.js';

const receivedEvents: string[] = [];

const customReporter = createReporter({
  onItStart: ({ title }) => {
    receivedEvents.push(`test: ${title}`);
  },
  onAssertionSuccess: ({ message }) => {
    receivedEvents.push(`success: ${message}`);
  },
});

await poku('custom-run.test.ts', {
  reporter: customReporter,
  isolation: 'none',
  noExit: true,
});

await poku('default-run.test.ts', {
  reporter: 'poku',
  isolation: 'none',
  noExit: true,
});

for (const event of receivedEvents) console.log(`reporter received ${event}`);
