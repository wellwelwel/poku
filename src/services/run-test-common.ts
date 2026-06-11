import type { ReporterPlugin } from '../@types/plugin.js';
import { parserOutput } from '../parsers/output.js';
import { hrtimeToMs } from '../parsers/time.js';

export const reportFileResult = (options: {
  reporter: ReturnType<ReporterPlugin>;
  file: string;
  path: string;
  outputChunks: string[];
  result: boolean;
  end: [number, number];
  debug?: boolean;
}): void => {
  const { reporter, file, path, outputChunks, result, end, debug } = options;

  const parsedOutputs = parserOutput({ chunks: outputChunks, result, debug });
  const total = hrtimeToMs(end);

  reporter.onFileResult({
    status: result,
    path: {
      relative: file,
      absolute: path,
    },
    duration: total,
    output: parsedOutputs,
  });
};
