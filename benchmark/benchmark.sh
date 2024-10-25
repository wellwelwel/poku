#!/bin/bash

hyperfine -i --warmup 3 --export-json results.json \
  --command-name 'Jest' 'node --experimental-vm-modules ./node_modules/jest/bin/jest.js ./test/jest' \
  --command-name 'Mocha' './node_modules/mocha/bin/mocha.js --parallel ./test/mocha' \
  --command-name 'Vitest' './node_modules/vitest/vitest.mjs run ./test/vitest' \
  --command-name 'Poku' '../lib/bin/index.js --parallel ./test/poku'

echo '\n--------------------------------------------\n'

# Not included in result.json
hyperfine -i --warmup 3 \
  --command-name 'Node.js' 'node --test "./test/node/**.spec.js"' \
  --command-name 'Poku' '../lib/bin/index.js --parallel --node ./test/poku'

echo '\n--------------------------------------------\n'

# Not included in result.json
hyperfine -i --warmup 3 \
  --command-name 'Bun' 'bun test "test/bun/"' \
  --command-name 'Poku' '../lib/bin/index.js --parallel --bun ./test/poku'

jq -e -r '.results | sort_by(.mean) | .[0].command == "Poku"' results.json >/dev/null
