import type { SnapshotEntry } from '../@types/snapshot.js';
import { AssertionError } from 'node:assert';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import process from 'node:process';
import {
  findFileFromStack,
  normalizeStackPath,
} from './find-file-from-stack.js';
import { serialize } from './output.js';
import { SNAPSHOT_OPERATOR } from './snapshot-operator.js';

const SNAPSHOT_DIR = '__snapshots__';
const SNAPSHOT_EXT = '.snap';

const UPDATE_SNAPSHOT = process.env.POKU_UPDATE_SNAPSHOT === '1';
const IS_CI = Boolean(process.env.CI);

let flushRegistered = false;
let cachedTestFile: string | undefined;
let cachedSnapPath: string | undefined;

export const snapshotRegistry = new Map<string, SnapshotEntry>();

export const getSnapFilePath = (testFilePath: string): string =>
  join(
    dirname(testFilePath),
    SNAPSHOT_DIR,
    `${basename(testFilePath)}${SNAPSHOT_EXT}`
  );

const escapeBacktickString = (value: string): string =>
  value.replace(/[`\\]|\$\{/g, '\\$&');

const unescapeBacktickString = (value: string): string =>
  value.replace(/\\(`|\\|\$\{)/g, '$1');

export const parseSnapFile = (content: string): Map<string, string> => {
  const entries = new Map<string, string>();
  if (!content) return entries;

  const entryPattern =
    /^exports\[`((?:\\.|[^`\\])*)`\]\s*=\s*`((?:\\.|[^`\\])*)`;\s*$/gm;

  for (
    let match = entryPattern.exec(content);
    match !== null;
    match = entryPattern.exec(content)
  )
    entries.set(
      unescapeBacktickString(match[1]),
      unescapeBacktickString(match[2])
    );

  return entries;
};

export const formatSnapFile = (entries: Map<string, string>): string => {
  const lines: string[] = [];

  for (const [key, value] of entries)
    lines.push(
      `exports[\`${escapeBacktickString(key)}\`] = \`${escapeBacktickString(value)}\`;`
    );

  return lines.length === 0 ? '' : `${lines.join('\n\n')}\n`;
};

export const loadSnapFile = (snapPath: string): Map<string, string> => {
  const cached = snapshotRegistry.get(snapPath);
  if (cached) return cached.entries;

  let content = '';
  try {
    content = readFileSync(snapPath, 'utf8');
  } catch {}

  const entries = parseSnapFile(content);

  snapshotRegistry.set(snapPath, { entries, dirty: false });
  return entries;
};

export const flushAllSnapFiles = (): void => {
  for (const [snapPath, entry] of snapshotRegistry) {
    if (!entry.dirty) continue;

    mkdirSync(dirname(snapPath), { recursive: true });
    writeFileSync(snapPath, formatSnapFile(entry.entries), 'utf8');
    entry.dirty = false;
  }
};

export const registerFlush = (): void => {
  if (flushRegistered) return;
  flushRegistered = true;

  process.on('exit', flushAllSnapFiles);
};

export const assertSnapshot = (
  value: unknown,
  hint: string | undefined,
  context: {
    itTitle: string | undefined;
    counters: Map<string, number>;
    stack: string | undefined;
  }
): void => {
  const { itTitle, counters, stack } = context;

  if (!itTitle && !hint)
    throw new Error(
      'snapshot() requires either a titled it() block or a hint to avoid name collisions'
    );

  if (!cachedTestFile) {
    cachedTestFile = normalizeStackPath(
      findFileFromStack(stack, { skipInternal: true })
    );

    if (!cachedTestFile)
      throw new Error(
        'snapshot() could not resolve the test file from the stack trace'
      );

    cachedSnapPath = getSnapFilePath(cachedTestFile);
  }

  const snapPath = cachedSnapPath!;
  const entries = loadSnapFile(snapPath);
  const registryEntry = snapshotRegistry.get(snapPath)!;

  const prefix =
    itTitle && hint ? `${itTitle} > ${hint}` : itTitle || hint || 'snapshot';
  const previous = counters.get(prefix) ?? 0;
  const name = `${prefix} ${previous + 1}`;
  const serialized = serialize(value);
  const stored = entries.get(name);

  registerFlush();

  if (stored === undefined) {
    if (IS_CI)
      throw new AssertionError({
        actual: serialized,
        expected: '(no snapshot)',
        message: `Missing snapshot "${name}" in CI. Commit the snapshot file generated locally.`,
        operator: SNAPSHOT_OPERATOR,
      });

    counters.set(prefix, previous + 1);
    entries.set(name, serialized);
    registryEntry.dirty = true;

    return;
  }

  if (UPDATE_SNAPSHOT && !IS_CI) {
    counters.set(prefix, previous + 1);

    if (stored !== serialized) {
      entries.set(name, serialized);
      registryEntry.dirty = true;
    }

    return;
  }

  if (stored === serialized) {
    counters.set(prefix, previous + 1);

    return;
  }

  throw new AssertionError({
    actual: serialized,
    expected: stored,
    message: hint ?? `Snapshot "${name}" does not match`,
    operator: SNAPSHOT_OPERATOR,
  });
};
