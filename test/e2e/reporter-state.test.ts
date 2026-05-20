import { mkdir, rm, writeFile } from 'node:fs/promises';
import process from 'node:process';
import { ext, stripAnsi } from '../__utils__/capture-cli.test.js';
import { results } from '../../src/configs/results.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { poku } from '../../src/modules/essentials/poku.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { errors } from '../../src/services/reporters/poku.js';

const watchResultsClear = (): void => {
  errors.length = 0;
  results.passed = 0;
  results.failed = 0;
  results.skipped = 0;
  results.todo = 0;
};

const DIR = 'test/__fixtures__/.temp/reporter-state';
const FLIP_FILE = `${DIR}/flip.test.${ext}`;
const FAILING_CONTENT =
  "import { assert } from '../../../../src/modules/index.js';\n\nassert(false, 'flip: should fail');\n";
const PASSING_CONTENT =
  "import { assert } from '../../../../src/modules/index.js';\n\nassert(true, 'flip: should pass');\n";

const reproduce = async (reporter: string) => {
  let buffer = '';

  const original = process.stdout.write.bind(process.stdout);
  const capture = ((chunk: string) => {
    buffer += chunk;
    return true;
  }) as typeof process.stdout.write;

  await rm(DIR, { recursive: true, force: true });
  await mkdir(DIR, { recursive: true });

  try {
    await writeFile(FLIP_FILE, FAILING_CONTENT, 'utf8');

    process.stdout.write = capture;

    await poku(DIR, { noExit: true, reporter });
    await writeFile(FLIP_FILE, PASSING_CONTENT, 'utf8');

    buffer = '';

    watchResultsClear();
    await poku(DIR, { noExit: true, reporter });
  } finally {
    process.stdout.write = original;
    await rm(DIR, { recursive: true, force: true });
  }

  return stripAnsi(buffer);
};

describe('Reporters must not retain failure state between consecutive runs', async () => {
  await it('classic must not keep the fixed file in the failed list', async () => {
    const secondRun = await reproduce('classic');

    assert.match(
      secondRun,
      /✔ flip: should pass/,
      'classic: second run must report the fixed file as passing'
    );
    assert.doesNotMatch(
      secondRun,
      /✘[^\n]*flip\.test\.(js|ts)/,
      'classic: second run must not keep the fixed file in the failed list'
    );
  });

  await it('compact must not re-emit the previous failure block', async () => {
    const secondRun = await reproduce('compact');

    assert.match(
      secondRun,
      /PASS\s+\S*flip\.test\.(js|ts)/,
      'compact: second run must report the fixed file as passing'
    );
    assert.doesNotMatch(
      secondRun,
      /test file\(s\) failed:/,
      'compact: second run must not re-emit the failed-files summary after the file was fixed'
    );
    assert.doesNotMatch(
      secondRun,
      /flip: should fail/,
      'compact: second run must not re-emit the stale failure output after the file was fixed'
    );
  });

  await it('focus must not re-emit the previous failure output', async () => {
    const secondRun = await reproduce('focus');

    assert.doesNotMatch(
      secondRun,
      /flip: should fail/,
      'focus: second run must not re-emit the stale failure output after the file was fixed'
    );
  });

  await it('poku must not re-emit the previous failure block', async () => {
    const secondRun = await reproduce('poku');

    assert.doesNotMatch(
      secondRun,
      /test file\(s\) failed:/,
      'poku: second run must not re-emit the failed-files summary after the file was fixed'
    );
    assert.doesNotMatch(
      secondRun,
      /flip: should fail/,
      'poku: second run must not re-emit the stale failure output after the file was fixed'
    );
  });

  await it('dot must not accumulate the failure across runs', async () => {
    const secondRun = await reproduce('dot');

    assert.doesNotMatch(
      secondRun,
      /flip: should fail/,
      'dot: second run must not re-emit the failure from the previous run after the file was fixed'
    );
  });
});
