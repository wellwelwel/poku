import { defineConfig, poku } from '../../../../src/modules/index.js';
import { createReporter } from '../../../../src/modules/plugins.js';

const receivedEvents: string[] = [];

const recordingReporter = (name: string) =>
  createReporter({
    onItStart: ({ title }) => {
      receivedEvents.push(`${name} test: ${title}`);
    },
    onRunResult: () => {
      receivedEvents.push(`${name} run result`);
    },
    onExit: () => {
      receivedEvents.push(`${name} exit`);
    },
  });

export default defineConfig({
  reporter: recordingReporter('outer'),
  plugins: [
    {
      name: 'nested-runs',
      discoverFiles: () => [],
      setup: async (context) => {
        const suites = [
          {
            file: 'first-suite.test.ts',
            base: recordingReporter('suite')(context.configs),
          },
          { file: 'second-suite.test.ts', base: context.reporter },
        ];

        for (const { file, base } of suites)
          await poku(file, {
            reporter: () => ({ ...base, onRunResult() {}, onExit() {} }),
            plugins: [],
            isolation: 'none',
            noExit: true,
          });

        context.reporter.onRunResult({
          code: 0,
          timespan: context.timespan,
          results: context.results,
        });

        context.reporter.onExit({
          code: 0,
          timespan: context.timespan,
          results: context.results,
        });
      },
      teardown: () => {
        for (const event of receivedEvents)
          console.log(`reporter received ${event}`);
      },
    },
  ],
});
