#!/bin/bash

SHORT_SHA=$(git rev-parse --short HEAD)

echo '### 🚀 Benchmark Results\n'
echo '```'

hyperfine -i --warmup 3 --export-json results.json \
  --command-name "🐷 Poku ($SHORT_SHA)" '../lib/bin/index.js --parallel ./test/poku' \
  --command-name 'Mocha (10.7.3)' './node_modules/mocha/bin/mocha.js --parallel ./test/mocha' \
  --command-name 'Jest (29.7.0)' 'node --experimental-vm-modules ./node_modules/jest/bin/jest.js ./test/jest' \
  --command-name 'Vitest (2.1.3)' './node_modules/vitest/vitest.mjs run ./test/vitest' |
  awk '/Summary/ {flag=1} flag'

echo '```\n'
echo '<details>'
echo '<summary><h3>🔬 Native Test Runners</h3></summary>\n'
echo '#### 🐢 Comparative with Node.js\n'
echo '```'

# Not included in results.json
hyperfine -i --warmup 3 \
  --command-name 'Node.js' 'node --test "./test/node/**.spec.js"' \
  --command-name "🐷 Poku ($SHORT_SHA)" '../lib/bin/index.js --parallel --concurrency=0 --node ./test/poku' |
  awk '/Summary/ {flag=1} flag'

echo '```\n'
echo '#### 🍞 Comparative with Bun\n'
echo '```'

# Not included in results.json
hyperfine -i --warmup 3 \
  --command-name 'Bun' 'bun test "test/bun/"' \
  --command-name "🐷 Poku ($SHORT_SHA)" '../lib/bin/index.js --parallel --concurrency=0 --bun ./test/poku' |
  awk '/Summary/ {flag=1} flag'

echo '```\n'
echo '</details>\n'
echo '> [!NOTE]'
echo '> 📘 For more details and how the benchmarks are carried out, see the [**benchmark**](https://github.com/wellwelwel/poku/tree/main/benchmark) section.'
