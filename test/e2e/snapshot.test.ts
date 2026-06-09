import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import {
  LIB_ESM,
  skipUnlessBuilt,
} from '../__utils__/skip-unless-built.test.js';
import { formatSnapFile, parseSnapFile } from '../../src/parsers/snapshot.js';

skipUnlessBuilt();

const lib = (await import(
  LIB_ESM
)) as typeof import('../../src/modules/index.js');

const plugins = (await import(
  new URL('plugins.js', LIB_ESM).href
)) as typeof import('../../src/modules/plugins.js');

const { describe, it, assert } = lib;
const { inspectPoku } = plugins;

const BIN = 'lib/bin/index.js';
const BASE = 'test/__fixtures__/e2e/snapshot';
const SNAP_DIR = '__snapshots__';
const SNAP_FILE = `sample.test.js.snap`;

const snapPath = (scenario: string) =>
  join(BASE, scenario, SNAP_DIR, SNAP_FILE);

const cleanSnap = (scenario: string) => {
  rmSync(join(BASE, scenario, SNAP_DIR), { recursive: true, force: true });
};

await describe('Snapshot e2e', async () => {
  await it('passes when the stored snapshot matches', async () => {
    const result = await inspectPoku({
      bin: BIN,
      command: 'sample.test.js',
      spawnOptions: { cwd: `${BASE}/match` },
    });

    if (result.exitCode !== 0) {
      console.log(result.stdout);
      console.log(result.stderr);
    }

    assert.strictEqual(result.exitCode, 0, 'Exit 0 on match');
    assert.match(
      result.stdout,
      /matches an existing snapshot/,
      'Reports the passing test'
    );
    assert.doesNotMatch(
      result.stdout,
      /does not match/,
      'No mismatch in output'
    );
  });

  await it('fails with a diff when the snapshot does not match', async () => {
    const result = await inspectPoku({
      bin: BIN,
      command: 'sample.test.js',
      spawnOptions: { cwd: `${BASE}/fail` },
    });

    assert.strictEqual(result.exitCode, 1, 'Exit 1 on mismatch');
    assert.match(result.stdout, /does not match/, 'Reports mismatch');
    assert.match(result.stdout, /Operator/, 'Includes operator line');
    assert.match(result.stdout, /Received:/, 'Includes received block');
    assert.match(result.stdout, /Snapshot:/, 'Includes snapshot block');
  });

  await it('creates a new snapshot file when none exists', async () => {
    cleanSnap('create');

    const { CI: _ignored, ...envWithoutCI } = process.env;
    const result = await inspectPoku({
      bin: BIN,
      command: '--denoAllow=all sample.test.js',
      spawnOptions: {
        cwd: `${BASE}/create`,
        env: envWithoutCI,
      },
    });

    try {
      assert.strictEqual(result.exitCode, 0, 'Exit 0 when creating');

      const written = readFileSync(snapPath('create'), 'utf8');
      assert.ok(
        written.startsWith('exports[`'),
        'Snap file opens with the first entry'
      );
      const entries = parseSnapFile(written);
      assert.deepStrictEqual(
        [...entries.keys()],
        ['creates a brand new snapshot when none exists 1'],
        'Snap contains the new entry'
      );
    } finally {
      cleanSnap('create');
    }
  });

  await it('updates a stored snapshot under the --updateSnapshot flag', async () => {
    cleanSnap('update');

    const initialPath = snapPath('update');
    const entryName =
      'updates a stored snapshot under the --updateSnapshot flag 1';

    mkdirSync(dirname(initialPath), { recursive: true });

    writeFileSync(
      initialPath,
      formatSnapFile(new Map([[entryName, '{\n  "updated": "old value"\n}']])),
      'utf8'
    );

    const { CI: _ignored, ...envWithoutCI } = process.env;
    const result = await inspectPoku({
      bin: BIN,
      command: '--denoAllow=all --updateSnapshot sample.test.js',
      spawnOptions: { cwd: `${BASE}/update`, env: envWithoutCI },
    });

    try {
      assert.strictEqual(result.exitCode, 0, 'Exit 0 under --updateSnapshot');

      const written = parseSnapFile(readFileSync(initialPath, 'utf8'));
      assert.match(
        written.get(entryName) ?? '',
        /new value/,
        'New value persisted'
      );
    } finally {
      cleanSnap('update');
    }
  });

  await it('does not rewrite a mismatching snapshot in CI', async () => {
    cleanSnap('update');

    const initialPath = snapPath('update');
    const entryName =
      'updates a stored snapshot under the --updateSnapshot flag 1';
    const original = formatSnapFile(
      new Map([[entryName, '{\n  "updated": "old value"\n}']])
    );

    mkdirSync(dirname(initialPath), { recursive: true });
    writeFileSync(initialPath, original, 'utf8');

    const result = await inspectPoku({
      bin: BIN,
      command: '--updateSnapshot sample.test.js',
      spawnOptions: {
        cwd: `${BASE}/update`,
        env: {
          ...process.env,
          CI: '1',
        },
      },
    });

    const afterRun = readFileSync(initialPath, 'utf8');

    cleanSnap('update');

    assert.strictEqual(result.exitCode, 1, 'Exit 1 in CI on mismatch');
    assert.strictEqual(afterRun, original, 'Snapshot file is left untouched');
  });

  await it('fails in CI when no snapshot exists', async () => {
    cleanSnap('create');

    const result = await inspectPoku({
      bin: BIN,
      command: 'sample.test.js',
      spawnOptions: {
        cwd: `${BASE}/create`,
        env: {
          ...process.env,
          CI: '1',
        },
      },
    });

    cleanSnap('create');

    assert.strictEqual(result.exitCode, 1, 'Exit 1 in CI without snapshot');
    assert.match(
      result.stdout,
      /Missing snapshot/,
      'Mentions missing snapshot'
    );
  });

  await it('fails in CI even with --updateSnapshot when no snapshot exists', async () => {
    cleanSnap('create');

    const result = await inspectPoku({
      bin: BIN,
      command: '--updateSnapshot sample.test.js',
      spawnOptions: {
        cwd: `${BASE}/create`,
        env: {
          ...process.env,
          CI: '1',
        },
      },
    });

    const writtenInCI = existsSync(snapPath('create'));

    cleanSnap('create');

    assert.strictEqual(
      result.exitCode,
      1,
      'Exit 1 in CI even with --updateSnapshot'
    );
    assert.match(
      result.stdout,
      /Missing snapshot/,
      'Mentions missing snapshot'
    );
    assert.strictEqual(writtenInCI, false, 'No snapshot file is written in CI');
  });
});
