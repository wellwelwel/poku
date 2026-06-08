import type { Code } from '../../@types/code.js';
import type { PokuPlugin } from '../../@types/plugin.js';
import type { Configs, PluginContext, Poku } from '../../@types/poku.js';
import { join } from 'node:path';
import { env, hrtime, stdout } from 'node:process';
import { GLOBAL, timespan } from '../../configs/poku.js';
import { results } from '../../configs/results.js';
import { hrtimeToMs } from '../../parsers/time.js';
import { runTests } from '../../services/run-tests.js';
import { exit } from '../helpers/exit.js';
import { listFiles } from '../helpers/list-files.js';

export const onSigint = () => {
  stdout.write('\u001B[?25h');
};

process.once('SIGINT', onSigint);

export const poku = (async (
  targetPaths: string | string[],
  configs?: Configs
): Promise<Code | undefined> => {
  if (configs) GLOBAL.configs = { ...GLOBAL.configs, ...configs };

  env.POKU_RUNTIME = GLOBAL.runtime;

  if (typeof GLOBAL.configs.reporter === 'string')
    env.POKU_REPORTER = GLOBAL.configs.reporter;

  timespan.started = new Date();

  const start = hrtime();
  const paths: string[] = Array.prototype.concat(targetPaths);
  const showLogs = !GLOBAL.configs.quiet;
  const { reporter: plugin } = GLOBAL.configs;
  const { cwd } = GLOBAL;

  if (typeof plugin === 'function') {
    GLOBAL.reporter = plugin(GLOBAL.configs);
  } else if (typeof plugin === 'string' && plugin !== 'poku') {
    const { reporter } = await import('../../services/reporter.js');

    if (plugin in reporter) GLOBAL.reporter = reporter[plugin]();
  }

  const plugins = GLOBAL.configs.plugins;
  let pluginContext: PluginContext | undefined;
  let fileDiscoverer: PokuPlugin['discoverFiles'];

  if (plugins?.length) {
    pluginContext = {
      configs: GLOBAL.configs,
      runtime: GLOBAL.runtime,
      cwd: GLOBAL.cwd,
      configFile: GLOBAL.configFile,
      runAsOnly: GLOBAL.runAsOnly,
      results,
      timespan,
      reporter: GLOBAL.reporter,
    };

    for (const plugin of plugins) {
      if (!fileDiscoverer && plugin.discoverFiles)
        fileDiscoverer = plugin.discoverFiles;

      if (plugin.setup) await plugin.setup(pluginContext);
    }
  }

  const testFiles = fileDiscoverer
    ? await fileDiscoverer(paths, pluginContext!)
    : (
        await Promise.all(
          paths.map((dir) => listFiles(join(cwd, dir), GLOBAL.configs))
        )
      ).flat(1);

  if (showLogs) GLOBAL.reporter.onRunStart();

  const result = await runTests(testFiles);
  const code: Code = result ? 0 : 1;
  const end = hrtime(start);
  const total = hrtimeToMs(end);

  timespan.duration = total;
  timespan.finished = new Date();

  if (showLogs) GLOBAL.reporter.onRunResult({ code, timespan, results });

  if (!GLOBAL.configs.noExit) exit(code, GLOBAL.configs.quiet);

  if (plugins?.length && pluginContext) {
    for (const plugin of plugins)
      if (plugin.teardown) await plugin.teardown(pluginContext);
  }

  if (GLOBAL.configs.noExit) return code;
}) as Poku;
