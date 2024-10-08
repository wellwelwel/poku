import { format } from '../services/format.js';
import { Write } from '../services/write.js';

const b = (text: string) => `${format(text).bold()}`;
const i = (text: string) => `${format(text).italic()}`;
const u = (text: string) => `${format(text).underline()}`;
const d = (text: string) => `${format(text).dim()}`;

const options = i('[--options]');
const paths = i('[paths]');
const bullet = d('●');
const summary: [string, string][] = [
  ['--bun', 'Enforce tests to run through Bun.'],
  ['--concurrency', 'Limit the number of tests running concurrently.'],
  ['--config, -c', 'Specify a configuration file.'],
  ['--debug, -d', 'Show detailed logs.'],
  ['--deno', 'Enforce tests to run through Deno.'],
  ['--denoAllow', 'Allow permissions for Deno.'],
  ['--denoCjs', 'Support CommonJS in Deno.'],
  ['--denoDeny', 'Deny permissions for Deno.'],
  ['--enforce, -x', 'Validate options before running tests.'],
  ['--envFile', 'Read and set an environment file.'],
  ['--exclude', 'Exclude by path using Regex to match files.'],
  ['--failFast', 'Stop tests at the first failure.'],
  ['--filter', 'Filter by path using Regex to match files.'],
  ['--help, -h', "Show Poku's CLI basic usage."],
  ['--killPid', 'Terminate the specified processes.'],
  ['--killPort', 'Terminate the specified ports.'],
  ['--killRange', 'Terminate the specified port ranges.'],
  ['--listFiles', 'Display all the files returned in the terminal.'],
  ['--node', 'Enforce tests to run through Node.js.'],
  ['--only', 'Enable selective execution of tests.'],
  ['--parallel, -p', 'Run tests files in parallel.'],
  ['--platform', 'Enforce tests to run through a platform.'],
  ['--quiet, -q', 'Run tests with no logs.'],
  ['--version, -v', "Show Poku's installed version."],
  ['--watch, -w', 'Watch for test events.'],
  ['--watchInterval', 'Set an interval for watch events.'],
];
const sortedSummary = summary.sort(([a], [b]) => a.localeCompare(b));
const largeEndPad = (() =>
  Math.max(...summary.map(([start]) => start.length)))();

const header = `
🐷 ${format(' Poku — CLI Usage ').bg('brightMagenta')}

› ${u(b('Usage:'))}

  poku ${options} ${paths}
  poku ${paths} ${options}

› ${u(b('Ensuring platforms:'))}

  poku ${b('--node')} ${options} ${paths}
  poku ${b('--bun')} ${options} ${paths}
  poku ${b('--deno')} ${options} ${paths}

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

  ${bullet} Avoid conflicts for environments with multiple platforms:
    ${u('https://poku.io/docs/tutorials/cross-platform')}
`;

const footer = `
${b('Documentation:')} ${u('https://poku.io')}

${bullet} ${b('Poku')} is made with ${b('love')} and ${b('care')} in every detail.
${bullet} Give him a ${b('star')} to show your support 🌟
`;

export const help = () => {
  Write.hr();
  Write.log(header.trim());
  Write.hr();
  Write.log(main.trim());
  Write.hr();
  Write.log(footer.trim());
  Write.hr();
};
