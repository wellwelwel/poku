import { stripAnsi } from './capture-cli.test.js';

const statusByColor: Record<string, string> = {
  '32': 'success',
  '91': 'fail',
};

export const reportLines = (output: string): string[] => {
  const lines: string[] = [];

  for (const line of output.split('\n')) {
    const text = stripAnsi(line)
      .replace(/\s*›\s*[\d.]+ms$/, '')
      .trimEnd();

    if (/^─+$/.test(text)) break;
    if (text.trim() === '' || /^\s*File\s/.test(text)) continue;

    const color = /\x1b\[(32|91)m/.exec(line)?.[1];
    lines.push(color ? `${text} [${statusByColor[color]}]` : text);
  }

  return lines;
};
