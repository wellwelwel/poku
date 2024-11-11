import { argv } from 'node:process';
import { toDynamicCase } from './to-dynamic-case.js';
import { parseArgs as nodeParseArgs } from 'node:util';

function bool(short: string) {
    return {
      type: 'boolean',
      short,
    } as const;
}
function Options<TYPE extends string, T extends string>(type: TYPE, ...args: T[]) {
    return Object.fromEntries(args.map(x => [x, { type }] as const)) as Record<T, { type: TYPE }>;
}
const options = {
  version: bool('v'),
  help: bool('h'),
  parallel: bool('p'),
  debug: bool('d'),
  enforce: bool('x'),
  quiet: bool('q'),
  watch: bool('w'),
  ...Options('string', 'concurrency', 'watchinterval', 'include', 'denocjs', 'platform', 'filter', 'exclude', 'killport', 'killrange', 'killpid', 'envfile', 'denoallow', 'denodeny'),
  ...Options('boolean', 'listfiles', 'node', 'bun', 'deno', 'only', 'failfast'),
  config: {
    type: 'boolean',
    short: 'c',
  },
} as const;

function parseArgs(args = argv.slice(2).map(toDynamicCase)) {
  const result = nodeParseArgs({
    allowPositionals: true,
    strict: false,
    options,
    args,
  });
  return {
    values: result.values,
    positionals: result.positionals.flatMap(x => x.split(',')),
  };
}

export const { values, positionals } = parseArgs();

const only = typeof values.only === 'boolean' ? undefined : values.only;

export const hasOnly = !!values.only && !only;

export const hasDescribeOnly = only === 'describe';

export const hasItOnly = only && ['it', 'test'].includes(only);

export const test = { parseArgs };
