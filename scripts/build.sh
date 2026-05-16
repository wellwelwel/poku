#!/bin/bash

set -e

echo '◯ prebuild'
rm -rf lib ci coverage .temp test-tests
echo '◉ prebuild'

echo '◯ build'
concurrently -n "src,test" "tsc" "cd test && tsc"
echo '◉ build'

echo '◯ postbuild'
concurrently \
  -n "version,dts,fixtures,cleanup,chmod" \
  "tsx tools/build/version.ts" \
  "tsx tools/build/dts.mts" \
  "cp test/__fixtures__/e2e/server/package.json ci/test/__fixtures__/e2e/server/package.json" \
  "rm -f ./lib/@types/*.js ./lib/bin/*.ts" \
  "chmod +x lib/bin/index.js"
echo '◉ postbuild'
