import { defineConfig } from '../../../../src/modules/index.js';
import { createReporter } from '../../../../src/modules/plugins.js';

const receivedEvents: string[] = [];

export default defineConfig({
  reporter: createReporter({
    onItStart: ({ title }) => {
      receivedEvents.push(`test: ${title}`);
    },
    onAssertionSuccess: ({ message }) => {
      receivedEvents.push(`success: ${message}`);
    },
    onAssertionFailure: ({ assertOptions }) => {
      receivedEvents.push(`failure: ${assertOptions.message}`);
    },
    onRunResult: () => {
      for (const event of receivedEvents)
        console.log(`reporter received ${event}`);
    },
  }),
});
