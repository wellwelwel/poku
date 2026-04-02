#!/bin/bash

echo '◯ prebuild'
rm -rf lib ci coverage .temp test-src test-tests
echo '◉ prebuild'

echo '◯ build'
concurrently -n "src,test" "tsc" "cd test && tsc"
echo '◉ build'

echo '◯ postbuild'
concurrently \
  -n "comments,version,fixtures,cleanup,chmod" \
  "tsx tools/compatibility/comments.ts" \
  "tsx tools/build/version.ts" \
  "cp test/__fixtures__/e2e/server/package.json ci/test/__fixtures__/e2e/server/package.json" \
  "rm -f ./lib/@types/*.js ./lib/bin/*.ts" \
  "chmod +x lib/bin/index.js"
echo '◉ postbuild'
