import process from 'node:process';
import { EOL } from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { runner } from '../helpers/runner.js';
import { indentation } from '../helpers/indentation.js';
import { format } from '../helpers/format.js';
import { Configs } from '../@types/poku.js';
import { isDebug, isQuiet } from '../helpers/logs.js';
import { removeConsecutiveRepeats } from '../helpers/remove-repeats.js';
import { beforeEach, afterEach } from './each.js';

export type FileResults = {
  success: string[];
  fail: string[];
};

export const fileResults: FileResults = {
  success: [],
  fail: [],
};

export const runTestFile = (
  filePath: string,
  configs?: Configs
): Promise<boolean> =>
  new Promise(async (resolve) => {
    const runtimeOptions = runner(filePath, configs);
    const runtime = runtimeOptions.shift();
    const runtimeArguments =
      runtimeOptions.length > 1 ? [...runtimeOptions, filePath] : [filePath];

    const fileRelative = path.relative(process.cwd(), filePath);
    const showLogs = !isQuiet(configs);
    const showSuccess = isDebug(configs);
    const pad = configs?.parallel ? '  ' : '    ';

    let output = '';

    const log = () => {
      const outputs = removeConsecutiveRepeats(
        showSuccess
          ? output.split(/(\r\n|\r|\n)/)
          : output.split(/(\r\n|\r|\n)/).filter((current) => {
              if (current.includes('Exited with code')) return false;
              return (
                /u001b\[0m|(\r\n|\r|\n)/i.test(JSON.stringify(current)) ||
                current === ''
              );
            }),
        /(\r\n|\r|\n)|^$/
      );

      // Remove last EOL
      outputs.length > 1 && outputs.pop();

      if (
        !showSuccess &&
        /error:/i.test(output) &&
        !/error:/i.test(outputs.join())
      )
        Object.assign(outputs, [
          ...outputs,
          format.bold(
            format.fail(`✘ External Error ${format.dim(`› ${fileRelative}`)}`)
          ),
          format.dim('  For detailed diagnostics:'),
          `${format.dim(`    CLI ›`)} rerun with the ${format.bold('--debug')} flag enabled.`,
          `${format.dim(
            `    API ›`
          )} set the config option ${format.bold('debug')} to true.`,
          `${format.dim('    RUN ›')} ${format.bold(
            `${runtime === 'tsx' ? 'npx tsx' : runtime}${runtimeArguments.slice(0, -1).join(' ')} ${fileRelative}`
          )}`,
        ]);

      const mappedOutputs = outputs.map((current) => `${pad}${current}`);

      if (outputs.length === 1 && outputs[0] === '') return;

      console.log(
        showSuccess ? mappedOutputs.join('') : mappedOutputs.join(EOL)
      );
    };

    const stdOut = (data: Buffer): void => {
      output += String(data);
    };

    if (!configs?.parallel) {
      showLogs &&
        console.log(
          `${indentation.test}${format.info(format.dim('●'))} ${format.dim(fileRelative)}`
        );
    }

    if (!(await beforeEach(fileRelative, configs))) return false;

    // Export spawn helper is not an option
    const child = spawn(runtime!, runtimeArguments, {
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: false,
      env: {
        ...process.env,
        FILE: configs?.parallel ? fileRelative : '',
      },
    });

    child.stdout.on('data', stdOut);

    child.stderr.on('data', stdOut);

    child.on('close', async (code) => {
      if (showLogs) log();

      if (!(await afterEach(fileRelative, configs))) return false;

      const result = code === 0;

      if (result) fileResults.success.push(fileRelative);
      else fileResults.fail.push(fileRelative);

      resolve(result);
    });

    child.on('error', (err) => {
      console.log(`Failed to start test: ${filePath}`, err);
      fileResults.fail.push(fileRelative);

      resolve(false);
    });
  });
