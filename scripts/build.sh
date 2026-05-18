#!/bin/bash

set -e

echo '◯ prebuild'
rm -rf lib ci coverage .temp test-tests
echo '◉ prebuild'

echo '◯ build'
concurrently \
  -n "types,ci,lib" \
  "tsc --noEmit" \
  "cd test && tsc" \
  "tsx tools/build.ts"
echo '◉ build'

echo '◯ postbuild'
printf '{\n  "type": "module"\n}\n' > ci/package.json
(cd test && find __fixtures__ -name package.json -print0 | while IFS= read -r -d '' f; do mkdir -p "../ci/test/$(dirname "$f")" && cp "$f" "../ci/test/$f"; done)
concurrently \
  -n "version,chmod" \
  "chmod +x lib/bin/index.js"
echo '◉ postbuild'

echo '◯ testing'
tsx test/build/version.test.ts
echo '◉ testing'
