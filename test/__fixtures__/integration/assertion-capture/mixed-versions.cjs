const nodeAssert = require('node:assert/strict');

const [legacyName, first] = process.argv.slice(2);
const legacy = first === 'legacy' ? require(legacyName) : undefined;
const current = require('../../../../lib/modules/index.cjs');
const previous = legacy || require(legacyName);
const { captureAssertions } = require('../../../../lib/modules/plugins.cjs');

async function main() {
  for (const api of [previous, current]) {
    let attempt = 0;
    await api.retry(2, () => {
      attempt++;
      api.assert.strictEqual(attempt, 2);
    });
    nodeAssert.strictEqual(attempt, 2);
    nodeAssert.strictEqual(process.exitCode ?? 0, 0);
  }

  const captured = await captureAssertions(() =>
    current.assert.strictEqual(1, 2)
  );
  nodeAssert.strictEqual(captured.status, 'failed');
  nodeAssert.strictEqual(process.exitCode ?? 0, 0);
  captured.report();
  nodeAssert.strictEqual(process.exitCode, 1);
  process.exitCode = 0;
  console.log(`mixed-version verified:${legacyName}:${first}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
