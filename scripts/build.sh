#!/bin/bash

set -e

echo '◯ prebuild'
rm -rf lib ci coverage .temp test-tests
echo '◉ prebuild'

echo '◯ build'
concurrently \
  -n "types,ci,js,dts" \
  "tsc --noEmit" \
  "cd test && tsc" \
  "tsx tools/build/js.mts" \
  "tsx tools/build/dts.mts"
echo '◉ build'

echo '◯ postbuild'
printf '{\n  "type": "module"\n}\n' > ci/package.json
(cd test && find __fixtures__ -name package.json -print0 | while IFS= read -r -d '' f; do mkdir -p "../ci/test/$(dirname "$f")" && cp "$f" "../ci/test/$f"; done)
concurrently \
  -n "version,chmod" \
  "tsx tools/build/version.ts" \
  "chmod +x lib/bin/index.js"
echo '◉ postbuild'
