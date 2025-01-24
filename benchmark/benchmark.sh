#!/bin/bash

SHORT_SHA=$(git rev-parse --short HEAD)

HR="-----------------------------------------------------------------------"

BIN_POKU="node ./node_modules/poku/lib/bin/index.js"
BIN_MOCHA="node ./node_modules/mocha/bin/mocha.js --parallel"
BIN_JEST="node --experimental-vm-modules ./node_modules/jest/bin/jest.js"
BIN_VITEST="node ./node_modules/vitest/vitest.mjs run"
BIN_NODE="node --test"

rm -rf results

mkdir -p results/generalist
mkdir -p results/assertions
mkdir -p results/execution/success
mkdir -p results/execution/balanced
mkdir -p results/execution/failure

h1() {
  echo "\n$1"
}

quote() {
  echo "| $1"
}

execution() {
  local name=$1
  local bin=$2
  local dir=$3
  local path=$4
  local cmd_src="$bin \"./test/execution/${dir}/${path}\""
  local cmd_poku="$BIN_POKU \"./test/execution/${dir}/poku\""
  local title_src="source (${dir}) → ${cmd_src}"
  local title_poku="  poku (${dir}) → ${cmd_poku}"

  echo "${HR}\n ${title_src}\n ${title_poku}\n${HR}"

  hyperfine -i --warmup 5 --runs 20 --export-json "results/execution/${dir}/${name}.json" \
    --command-name "$name" "$cmd_src" \
    --command-name "🐷 Poku ($SHORT_SHA)" "$BIN_POKU ./test/execution/${dir}/poku"
}

quote "EXECUTION TESTS"
quote ""
quote " Focuses solely in execution, using a simple \`assert(true)\` or \`assert(false)\` from Node.js."
quote ""
quote " ℹ success:  a suite of 5 tests that will pass."
quote " ℹ failure:  a suite of 5 tests that will fail."
quote " ℹ balanced: a suite of 10 tests where 5 tests will fail and 5 tests will pass."

h1 "Jest"
execution "jest" "$BIN_JEST" "success" "jest"
execution "jest" "$BIN_JEST" "failure" "jest"
execution "jest" "$BIN_JEST" "balanced" "jest"

h1 "Vitest"
execution "vitest" "$BIN_VITEST" "success" "vitest"
execution "vitest" "$BIN_VITEST" "failure" "vitest"
execution "vitest" "$BIN_VITEST" "balanced" "vitest"

h1 "Mocha"
execution "mocha" "$BIN_MOCHA" "success" "mocha/**"
execution "mocha" "$BIN_MOCHA" "failure" "mocha/**"
execution "mocha" "$BIN_MOCHA" "balanced" "mocha/**"

h1 "Node.js"
execution "node" "$BIN_NODE" "success" "node/**/**.spec.js"
execution "node" "$BIN_NODE" "failure" "node/**/**.spec.js"
execution "node" "$BIN_NODE" "balanced" "node/**/**.spec.js"

echo "\n"
