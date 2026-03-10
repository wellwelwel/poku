import type { ConfigFile } from '../../modules/index.js';
import type { PluginContext, PokuPlugin } from '../../modules/plugins.js';
import process from 'node:process';
import { kill, envFile as loadEnvFile, poku } from '../../modules/index.js';
import { onSigint, reporterRegistry } from '../../modules/plugins.js';

export const multiSuite = (suites: ConfigFile[]): PokuPlugin => ({
  name: 'multi-suite',
  setup: async (context: PluginContext) => {
    const overallStart = new Date();
    const overallHrtime = process.hrtime();

    const onSignal = () => {
      process.stdout.write('\u001B[?25h');
      process.exit(1);
    };

    process.removeListener('SIGINT', onSigint);
    process.once('SIGINT', onSignal);

    let finalCode: 0 | 1 = 0;

    for (const { include, envFile, kill: suiteKill, ...config } of suites) {
      const dirs = include ? ([] as string[]).concat(include) : ['.'];
      const tasks: Promise<unknown>[] = [];

      if (envFile) tasks.push(loadEnvFile(envFile));
      if (suiteKill?.port?.length) tasks.push(kill.port(suiteKill.port));
      if (suiteKill?.range?.length) {
        for (const [from, to] of suiteKill.range)
          tasks.push(kill.range(from, to));
      }
      if (suiteKill?.pid?.length) tasks.push(kill.pid(suiteKill.pid));
      if (tasks.length) await Promise.all(tasks);

      const { reporter: suiteReporterConfig } = config;
      const suiteBase =
        typeof suiteReporterConfig === 'function'
          ? suiteReporterConfig(context.configs)
          : typeof suiteReporterConfig === 'string' &&
              suiteReporterConfig in reporterRegistry
            ? reporterRegistry[suiteReporterConfig](context.configs)
            : context.reporter;

      const suiteReporter = () => ({
        ...suiteBase,
        onRunResult() {},
        onExit() {},
      });

      const code = await poku(dirs, {
        plugins: config.plugins ?? [],
        ...config,
        reporter: suiteReporter,
        noExit: true,
      });

      if (code !== 0) finalCode = 1;
    }

    const elapsed = process.hrtime(overallHrtime);

    context.timespan.started = overallStart;
    context.timespan.duration = elapsed[0] * 1e3 + elapsed[1] / 1e6;
    context.timespan.finished = new Date();

    if (!context.configs.quiet) {
      context.reporter.onRunResult({
        code: finalCode,
        timespan: context.timespan,
        results: context.results,
      });

      context.reporter.onExit({
        code: finalCode,
        timespan: context.timespan,
        results: context.results,
      });
    }

    process.removeListener('SIGINT', onSignal);
    process.exit(finalCode);
  },
});
