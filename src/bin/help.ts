import { format } from '../services/format.js';
import { hr, log } from '../services/write.js';

const b = (text: string) => `${format(text).bold()}`;
const i = (text: string) => `${format(text).italic()}`;
const u = (text: string) => `${format(text).underline()}`;
const d = (text: string) => `${format(text).dim()}`;

const options = i('[--options]');
const paths = i('[paths]');
const bullet = d('●');
const summary: [string, string][] = [
  ['--concurrency', 'Set the number of tests running concurrently'],
  ['--config, -c', 'Specify a configuration file'],
  ['--coverage', 'Enable coverage collection'],
  ['--coverageConfig', 'Path to a coverage configuration file'],
  ['--debug, -d', 'Show detailed logs'],
  ['--denoAllow', 'Allow Deno permissions '],
  ['--denoDeny', 'Deny Deno permissions'],
  ['--enforce, -x', 'Validate options before running tests'],
  ['--envFile', 'Read and set an environment file'],
  ['--exclude', 'Exclude by path'],
  ['--failFast', 'Stop tests at the first failure'],
  ['--filter', 'Filter by path'],
  ['--help, -h', "Show Poku's CLI basic usage."],
  ['--killPid', 'Terminate the specified process'],
  ['--killPort', 'Terminate the specified port'],
  ['--killRange', 'Terminate the specified port ranges'],
  ['--listFiles', 'Display all matching files'],
  ['--isolation', 'Set test isolation mode'],
  ['--reporter, -r', 'Specify the reporter: poku, dot, compact, etc.'],
  ['--only', 'Enable selective execution of tests'],
  ['--quiet, -q', 'Run tests with no logs'],
  ['--sequential', 'Run tests files sequentially'],
  ['--testNamePattern, -t', 'Run only tests matching the given regex'],
  ['--testSkipPattern', 'Skip tests matching the given regex'],
  ['--timeout', 'Set the maximum time for each test file'],
  ['--updateSnapshot, -u', 'Update existing snapshots'],
  ['--version, -v', "Show Poku's installed version."],
  ['--watch, -w', 'Watch for test events'],
  ['--watchInterval', 'Set an interval for watch events'],
];
const sortedSummary = summary.sort(([a], [b]) => a.localeCompare(b));
const largeEndPad = Math.max(...summary.map(([start]) => start.length));

const header = `
🐷 ${format(' Poku — CLI Usage ').bg('brightMagenta')}

› ${u(b('Usage:'))}

  poku ${options} ${paths}
  poku ${paths} ${options}

› ${u(b('Tips:'))}

  ${bullet} All CLI options use camel case pattern (e.g.: ${b('--failFast')}).
  ${bullet} Use ${b('=')} to set an option value (e.g.: ${b('--concurrency=4')}).
  ${bullet} If you're seeing this, ${u('feel special')} ✨
`;

const main = `
🐽 ${format(' Poku — Options ').bg('brightMagenta')}

› ${u(b('Summary:'))}

${sortedSummary
  .map(
    ([command, description]) =>
      `${command.padEnd(largeEndPad)}  ${d(description)}`
  )
  .join('\n')}

› ${u(b('Notes:'))}

  ${bullet} For Glob support, see:
    ${u('https://poku.io/docs/documentation/poku/include-files#by-extending-glob-patterns-from-shell')}
`;

const footer = `
${b('Documentation:')} ${u('https://poku.io/docs')}

${bullet} ${b('Poku')} is made with ${b('love')} and ${b('care')} in every detail.
${bullet} Give him a ${b('star')} to show your support 🌟
`;

export const help = () => {
  hr();
  log(header.trim());
  hr();
  log(main.trim());
  hr();
  log(footer.trim());
  hr();
};
