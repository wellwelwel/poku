/* c8 ignore start */

import { EOL } from 'node:os';
import type { Configs } from '../@types/poku.js';

export const isQuiet = (configs?: Configs): boolean =>
  typeof configs?.quiet === 'boolean' && Boolean(configs?.quiet);

export const isDebug = (configs?: Configs): boolean => Boolean(configs?.debug);

export const printOutput = (options: {
  output: string;
  runtime: string;
  runtimeArguments: string[];
  fileRelative: string;
  configs?: Configs;
}) => {
  // const { output, runtime, runtimeArguments, fileRelative, configs } = options;
  const { output, configs } = options;

  const showSuccess = isDebug(configs);
  const pad = configs?.parallel ? '  ' : '    ';
  const splittedOutput = output.split(/\n/);

  const outputs = (
    showSuccess
      ? splittedOutput
      : splittedOutput.filter((current) => {
          if (current.includes('Exited with code')) return false;
          return (
            /u001b\[0m|\n/i.test(JSON.stringify(current)) || current === ''
          );
        })
  ).filter((line) => line?.trim().length > 0);

  // TODO: Create "strict" option
  // if (!showSuccess && /error:/i.test(output) && !/error:/i.test(outputs.join()))
  //   Object.assign(outputs, [
  //     ...outputs,
  //     format.bold(
  //       format.fail(`✘ External Error ${format.dim(`› ${fileRelative}`)}`)
  //     ),
  //     format.dim('  For detailed diagnostics:'),
  //     `${format.dim(`    CLI ›`)} rerun with the ${format.bold('--debug')} flag enabled.`,
  //     `${format.dim(
  //       `    API ›`
  //     )} set the config option ${format.bold('debug')} to true.`,
  //     `${format.dim('    RUN ›')} ${format.bold(
  //       `${runtime === 'tsx' ? 'npx tsx' : runtime} ${runtimeArguments.slice(0, -1).join(' ')} ${fileRelative}`
  //     )}`,
  //   ]);

  if (outputs.length === 0) return;

  const mappedOutputs = outputs.map((current) => `${pad}${current}`);

  console.log(mappedOutputs.join(EOL));
};

/* c8 ignore stop */
