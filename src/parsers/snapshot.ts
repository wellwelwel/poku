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

const SNAPSHOT_DIR = '__snapshots__';
const SNAPSHOT_EXT = '.snap';
export const SNAPSHOT_OPERATOR = 'snapshot';
const SNAPSHOT_HEADER =
  '// Poku Snapshot v1, https://poku.io/docs/documentation/api/snapshot';
const ENTRY_PATTERN =
  /^exports\[`((?:\\.|[^`\\])*)`\]\s*=\s*`((?:\\.|[^`\\])*)`;\s*$/gm;

let flushRegistered = false;

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

  ENTRY_PATTERN.lastIndex = 0;

  for (
    let match = ENTRY_PATTERN.exec(content);
    match !== null;
    match = ENTRY_PATTERN.exec(content)
  )
    entries.set(
      unescapeBacktickString(match[1]),
      unescapeBacktickString(match[2])
    );

  return entries;
};

export const formatSnapFile = (entries: Map<string, string>): string => {
  let output = `${SNAPSHOT_HEADER}\n`;

  for (const [key, value] of entries)
    output += `\nexports[\`${escapeBacktickString(key)}\`] = \`${escapeBacktickString(value)}\`;\n`;

  return output;
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

const buildSnapshotName = (
  itTitle: string | undefined,
  hint: string | undefined,
  counters: Map<string, number>
): string => {
  const prefix =
    itTitle && hint ? `${itTitle} > ${hint}` : itTitle || hint || 'snapshot';
  const previous = counters.get(prefix) ?? 0;
  const next = previous + 1;

  counters.set(prefix, next);

  return `${prefix} ${next}`;
};

export const assertSnapshot = (
  value: unknown,
  hint: string | undefined,
  context: {
    itTitle: string | undefined;
    counters: Map<string, number>;
  }
): void => {
  const testFile = normalizeStackPath(
    findFileFromStack(new Error().stack, { skipInternal: true })
  );
  const snapPath = getSnapFilePath(testFile);
  const entries = loadSnapFile(snapPath);
  const registryEntry = snapshotRegistry.get(snapPath)!;
  const name = buildSnapshotName(context.itTitle, hint, context.counters);
  const serialized = serialize(value);
  const stored = entries.get(name);
  const updateSnapshot = process.env.POKU_UPDATE_SNAPSHOT === '1';

  registerFlush();

  if (stored === undefined) {
    if (process.env.CI && !updateSnapshot)
      throw new AssertionError({
        actual: serialized,
        expected: '(no snapshot)',
        message: `Missing snapshot "${name}" in CI. Run with --updateSnapshot to create.`,
        operator: SNAPSHOT_OPERATOR,
      });

    entries.set(name, serialized);
    registryEntry.dirty = true;

    return;
  }

  if (updateSnapshot) {
    if (stored !== serialized) {
      entries.set(name, serialized);
      registryEntry.dirty = true;
    }

    return;
  }

  if (stored === serialized) return;

  throw new AssertionError({
    actual: serialized,
    expected: stored,
    message: hint ?? `Snapshot "${name}" does not match`,
    operator: SNAPSHOT_OPERATOR,
  });
};
