import { sep } from 'node:path';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import {
  formatSnapFile,
  getSnapFilePath,
  normalizeStackPath,
  parseSnapFile,
} from '../../src/parsers/snapshot.js';

describe('Snapshot: IO Utilities', () => {
  it('normalizeStackPath strips file:// and :line:col suffix', () => {
    assert.strictEqual(
      normalizeStackPath('file:///workdir/test/foo.test.ts:3:8'),
      '/workdir/test/foo.test.ts',
      'file:// + line:col'
    );
    assert.strictEqual(
      normalizeStackPath('/workdir/test/foo.test.ts:10:25'),
      '/workdir/test/foo.test.ts',
      'no protocol + line:col'
    );
    assert.strictEqual(
      normalizeStackPath('/workdir/test/foo.test.ts'),
      '/workdir/test/foo.test.ts',
      'plain path'
    );
    assert.strictEqual(normalizeStackPath(''), '', 'empty input');
    assert.strictEqual(
      normalizeStackPath('file:///D:/a/poku/poku/test/foo.test.js:5:5'),
      'D:/a/poku/poku/test/foo.test.js',
      'Windows file:// with drive letter D'
    );
    assert.strictEqual(
      normalizeStackPath('file:///C:/Users/me/foo.test.ts:10:25'),
      'C:/Users/me/foo.test.ts',
      'Windows file:// with drive letter C'
    );
  });

  it('getSnapFilePath places snap files in __snapshots__ adjacent to source', () => {
    const expected = `${sep}workdir${sep}test${sep}__snapshots__${sep}foo.test.ts.snap`;
    assert.strictEqual(
      getSnapFilePath(`${sep}workdir${sep}test${sep}foo.test.ts`),
      expected,
      'preserves the full filename'
    );
  });

  it('parseSnapFile reads CommonJS exports declarations', () => {
    const content = `// Poku Snapshot v1, https://poku.io/docs/documentation/api/snapshot

exports[\`name 1\`] = \`"value"\`;
`;
    const parsed = parseSnapFile(content);
    assert.strictEqual(parsed.get('name 1'), '"value"', 'parsed entry');
    assert.strictEqual(parsed.size, 1, 'single entry');
  });

  it('parseSnapFile returns empty Map for empty input', () => {
    const parsed = parseSnapFile('');
    assert.strictEqual(parsed.size, 0, 'empty input');
  });

  it('parseSnapFile returns empty Map for malformed input', () => {
    const parsed = parseSnapFile('garbage without any exports');
    assert.strictEqual(parsed.size, 0, 'malformed input does not throw');
  });

  it('formatSnapFile preserves insertion order (Bun strategy)', () => {
    const entries = new Map<string, string>([
      ['b', '"second"'],
      ['a', '"first"'],
    ]);
    const out = formatSnapFile(entries);
    const indexOfA = out.indexOf('exports[`a`]');
    const indexOfB = out.indexOf('exports[`b`]');
    assert.ok(indexOfB > 0 && indexOfA > 0, 'both entries present');
    assert.ok(indexOfB < indexOfA, 'insertion order preserved (b before a)');
  });

  it('formatSnapFile output starts with the Poku header', () => {
    const out = formatSnapFile(new Map([['name 1', '"value"']]));
    assert.ok(
      out.startsWith('// Poku Snapshot v1, '),
      'header present on the first line'
    );
  });

  it('formatSnapFile output round-trips through parseSnapFile', () => {
    const original = new Map<string, string>([
      ['name 1', '"hello"'],
      ['name 2', '"world"'],
    ]);
    const roundTrip = parseSnapFile(formatSnapFile(original));
    assert.strictEqual(roundTrip.size, original.size, 'same size');
    for (const [key, value] of original)
      assert.strictEqual(roundTrip.get(key), value, `key ${key} preserved`);
  });

  it('roundtrip preserves values containing backtick, backslash and ${ }', () => {
    const tricky = new Map<string, string>([
      ['contains backtick', 'value with ` backtick'],
      ['contains backslash', 'value with \\ backslash'],
      ['contains interpolation', 'value with ${expr} interpolation'],
    ]);
    const roundTrip = parseSnapFile(formatSnapFile(tricky));
    for (const [key, value] of tricky)
      assert.strictEqual(roundTrip.get(key), value, `roundtrip ${key}`);
  });
});
