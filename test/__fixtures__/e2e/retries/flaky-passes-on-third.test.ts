import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Simulates a flaky test: fails on first 2 attempts, passes on 3rd
const tempDir = join(
  process.cwd(),
  'test',
  '__fixtures__',
  'e2e',
  'retries',
  '.temp'
);
const counterFile = join(tempDir, 'retry-counter');

mkdirSync(tempDir, { recursive: true });

let count = 0;
if (existsSync(counterFile)) {
  count = Number(readFileSync(counterFile, 'utf8')) || 0;
}

count++;
writeFileSync(counterFile, String(count));

// Pass on the 3rd attempt
if (count >= 3) {
  assert.strictEqual(1, 1, 'Passes on 3rd attempt');
} else {
  assert.strictEqual(1, 2, `Fails on attempt ${count}`);
}
