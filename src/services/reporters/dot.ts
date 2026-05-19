import type { ReporterPlugin } from '../../@types/poku.js';
import { stdout } from 'node:process';
import { createReporter } from '../../builders/reporter.js';
import { hr } from '../write.js';
import { errors, poku } from './poku.js';

const DOT_PASS = '.';
const DOT_FAIL = '\x1b[1m\x1b[31mF\x1b[0m';

let plugin: ReporterPlugin;

const build = (): ReporterPlugin =>
  createReporter({
    onRunStart() {
      hr();
    },
    onDescribeAsTitle() {},
    onTodoModifier() {},
    onSkipModifier() {},
    onSkipFile() {},
    onFileResult({ path, status, output }) {
      stdout.write(status ? DOT_PASS : DOT_FAIL);

      if (!status)
        errors.push({
          file: path.relative,
          output,
        });
    },
    onRunResult(options) {
      stdout.write('\n');
      poku.onRunResult(options);
    },
  });

export const dot: ReporterPlugin = (configs) => {
  if (!plugin) plugin = build();

  return plugin(configs);
};
