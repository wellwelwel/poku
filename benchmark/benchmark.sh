#!/bin/bash

SHORT_SHA=$(git rev-parse --short HEAD)
MODE=${1:-all}

HR="\n---\n"

BIN_POKU="node ./node_modules/poku/lib/bin/index.js"
BIN_JEST="node --experimental-vm-modules ./node_modules/jest/bin/jest.js"
BIN_VITEST="node ./node_modules/vitest/vitest.mjs run"
BIN_NODE="node --test"
BIN_BUN="bun test --parallel --isolate"
BIN_POKU_BUN="bun --bun ./node_modules/poku/lib/bin/index.js"
BIN_DENO="deno test"
BIN_POKU_DENO="deno run --allow-all ./node_modules/poku/lib/bin/index.js"

BIN_POKU_NOISO="$BIN_POKU --isolation=none"
BIN_JEST_NOISO="$BIN_JEST --runInBand"
BIN_VITEST_NOISO="$BIN_VITEST --no-isolate"
BIN_NODE_NOISO="$BIN_NODE --test-isolation=none"
BIN_BUN_NOISO="bun test"
BIN_POKU_BUN_NOISO="$BIN_POKU_BUN --isolation=none"
BIN_POKU_DENO_NOISO="$BIN_POKU_DENO --isolation=none"

if [ "$MODE" = "all" ]; then
  rm -rf results
elif [ "$MODE" = "execution" ]; then
  rm -rf results/execution
elif [ "$MODE" = "assertions" ]; then
  rm -rf results/assertions
elif [ "$MODE" = "nesting" ]; then
  rm -rf results/nesting
elif [ "$MODE" = "no-isolation" ]; then
  rm -rf results/no-isolation
fi

mkdir -p results/assertions/success
mkdir -p results/assertions/failure
mkdir -p results/assertions/balanced
mkdir -p results/execution/success
mkdir -p results/execution/balanced
mkdir -p results/execution/failure
mkdir -p results/nesting/success
mkdir -p results/nesting/failure
mkdir -p results/nesting/balanced
mkdir -p results/no-isolation/success
mkdir -p results/no-isolation/failure
mkdir -p results/no-isolation/balanced

h4() {
  echo "$HR"
  echo "#### $1"
}

quote() {
  echo "> $1"
}

li() {
  echo "- $1"
}

grid() {
  quote "<details>"
  quote "<summary>"
  quote "See commands"
  quote "</summary>"
  quote "<table>"
  quote "<tr>"
  quote "<td>"
  quote "source"
  quote "</td>"
  quote "<td>"
  quote ""
  quote "\`\`\`sh"
  quote "$1"
  quote "\`\`\`"
  quote ""
  quote "</td>"
  quote "</tr>"
  quote "<tr>"
  quote "<td>"
  quote "poku"
  quote "</td>"
  quote "<td>"
  quote ""
  quote "\`\`\`sh"
  quote "$2"
  quote "\`\`\`"
  quote ""
  quote "</td>"
  quote "</tr>"
  quote "</table>"
  quote "</details>"
}

execution() {
  local name=$1
  local bin=$2
  local dir=$3
  local path=$4
  local poku_bin=${5:-$BIN_POKU}
  local out=${6:-execution}
  local cmd_src="$bin \"./test/execution/${dir}/${path}\""
  local cmd_poku="$poku_bin \"./test/execution/${dir}/poku\""

  echo ""
  li "${dir}"
  echo ""
  echo "\`\`\`"
  hyperfine -i --warmup 3 --runs 10 --export-json "results/${out}/${dir}/${name}.json" \
    --command-name "$name" "$cmd_src" \
    --command-name "🐷 Poku ($SHORT_SHA)" "$poku_bin ./test/execution/${dir}/poku" 2>/dev/null |
    awk '/ ran/ {flag=1} flag'
  echo "\`\`\`"
  echo ""
  grid "$cmd_src" "$cmd_poku"
}

assertion() {
  local name=$1
  local bin=$2
  local dir=$3
  local file=$4
  local poku_bin=${5:-$BIN_POKU}
  local cmd_src="$bin \"./test/assertion/${dir}/${file}\""
  local cmd_poku="$poku_bin \"./test/assertion/${dir}/poku.spec.js\""

  echo ""
  li "${dir}"
  echo ""
  echo "\`\`\`"
  hyperfine -i --warmup 3 --runs 10 --export-json "results/assertions/${dir}/${name}.json" \
    --command-name "$name" "$cmd_src" \
    --command-name "🐷 Poku ($SHORT_SHA)" "$cmd_poku" 2>/dev/null |
    awk '/ ran/ {flag=1} flag'
  echo "\`\`\`"
  echo ""
  grid "$cmd_src" "$cmd_poku"
}

nesting() {
  local name=$1
  local bin=$2
  local dir=$3
  local file=$4
  local poku_bin=${5:-$BIN_POKU}
  local cmd_src="$bin \"./test/nesting/${dir}/${file}\""
  local cmd_poku="$poku_bin \"./test/nesting/${dir}/poku.spec.js\""

  echo ""
  li "${dir}"
  echo ""
  echo "\`\`\`"
  hyperfine -i --warmup 3 --runs 10 --export-json "results/nesting/${dir}/${name}.json" \
    --command-name "$name" "$cmd_src" \
    --command-name "🐷 Poku ($SHORT_SHA)" "$cmd_poku" 2>/dev/null |
    awk '/ ran/ {flag=1} flag'
  echo "\`\`\`"
  echo ""
  grid "$cmd_src" "$cmd_poku"
}

if [ "$MODE" = "all" ] || [ "$MODE" = "execution" ]; then

echo "### 🏃🏻‍♀️ Test Runner"
echo ""
echo "Focuses solely in execution, using a simple \`assert(true)\` or \`assert(false)\` from **Node.js** and searches for files in four levels of depth."
echo ""
echo "- **success:** a suite of 5 tests that will pass."
echo "- **failure:** a suite of 5 tests that will fail."
echo "- **balanced:** a suite of 10 tests where 5 tests will fail and 5 tests will pass."

h4 "🃏 [Jest](https://github.com/jestjs/jest)"
execution "jest" "$BIN_JEST" "success" "jest"
execution "jest" "$BIN_JEST" "failure" "jest"
execution "jest" "$BIN_JEST" "balanced" "jest"

h4 "⚡️ [Vitest](https://github.com/vitest-dev/vitest)"
execution "vitest" "$BIN_VITEST" "success" "vitest"
execution "vitest" "$BIN_VITEST" "failure" "vitest"
execution "vitest" "$BIN_VITEST" "balanced" "vitest"

h4 "🐢 [Node.js (built-in)](https://github.com/nodejs/node)"
execution "node" "$BIN_NODE" "success" "node/**/**.spec.js"
execution "node" "$BIN_NODE" "failure" "node/**/**.spec.js"
execution "node" "$BIN_NODE" "balanced" "node/**/**.spec.js"

h4 "🍞 [Bun (built-in)](https://github.com/oven-sh/bun)"
execution "bun" "$BIN_BUN" "success" "bun" "$BIN_POKU_BUN"
execution "bun" "$BIN_BUN" "failure" "bun" "$BIN_POKU_BUN"
execution "bun" "$BIN_BUN" "balanced" "bun" "$BIN_POKU_BUN"

h4 "🦕 [Deno (built-in)](https://github.com/denoland/deno)"
execution "deno" "$BIN_DENO" "success" "deno" "$BIN_POKU_DENO"
execution "deno" "$BIN_DENO" "failure" "deno" "$BIN_POKU_DENO"
execution "deno" "$BIN_DENO" "balanced" "deno" "$BIN_POKU_DENO"

fi

if [ "$MODE" = "all" ] || [ "$MODE" = "no-isolation" ]; then

echo "### 🚀 No Isolation"
echo ""
echo "Same fixtures as **Test Runner**, but with test isolation disabled where supported (Poku \`--isolation=none\`, Jest \`--runInBand\`, Vitest \`--no-isolate\`, Node.js \`--test-isolation=none\`, Bun plain \`bun test\`). **Deno** has no per-file isolation flag, so it stays on \`deno test\`."
echo ""
echo "- **success:** a suite of 5 tests that will pass."
echo "- **failure:** a suite of 5 tests that will fail."
echo "- **balanced:** a suite of 10 tests where 5 tests will fail and 5 tests will pass."

h4 "🃏 [Jest](https://github.com/jestjs/jest)"
execution "jest" "$BIN_JEST_NOISO" "success" "jest" "$BIN_POKU_NOISO" "no-isolation"
execution "jest" "$BIN_JEST_NOISO" "failure" "jest" "$BIN_POKU_NOISO" "no-isolation"
execution "jest" "$BIN_JEST_NOISO" "balanced" "jest" "$BIN_POKU_NOISO" "no-isolation"

h4 "⚡️ [Vitest](https://github.com/vitest-dev/vitest)"
execution "vitest" "$BIN_VITEST_NOISO" "success" "vitest" "$BIN_POKU_NOISO" "no-isolation"
execution "vitest" "$BIN_VITEST_NOISO" "failure" "vitest" "$BIN_POKU_NOISO" "no-isolation"
execution "vitest" "$BIN_VITEST_NOISO" "balanced" "vitest" "$BIN_POKU_NOISO" "no-isolation"

h4 "🐢 [Node.js (built-in)](https://github.com/nodejs/node)"
execution "node" "$BIN_NODE_NOISO" "success" "node/**/**.spec.js" "$BIN_POKU_NOISO" "no-isolation"
execution "node" "$BIN_NODE_NOISO" "failure" "node/**/**.spec.js" "$BIN_POKU_NOISO" "no-isolation"
execution "node" "$BIN_NODE_NOISO" "balanced" "node/**/**.spec.js" "$BIN_POKU_NOISO" "no-isolation"

h4 "🍞 [Bun (built-in)](https://github.com/oven-sh/bun)"
execution "bun" "$BIN_BUN_NOISO" "success" "bun" "$BIN_POKU_BUN_NOISO" "no-isolation"
execution "bun" "$BIN_BUN_NOISO" "failure" "bun" "$BIN_POKU_BUN_NOISO" "no-isolation"
execution "bun" "$BIN_BUN_NOISO" "balanced" "bun" "$BIN_POKU_BUN_NOISO" "no-isolation"

h4 "🦕 [Deno (built-in)](https://github.com/denoland/deno)"
execution "deno" "$BIN_DENO" "success" "deno" "$BIN_POKU_DENO_NOISO" "no-isolation"
execution "deno" "$BIN_DENO" "failure" "deno" "$BIN_POKU_DENO_NOISO" "no-isolation"
execution "deno" "$BIN_DENO" "balanced" "deno" "$BIN_POKU_DENO_NOISO" "no-isolation"

fi

if [ "$MODE" = "all" ] || [ "$MODE" = "assertions" ]; then

echo "### 🧪 Assertion"
echo ""
echo "Focuses solely in assertions, using each runner's own assertion API with 1 test file per runner per scenario (no file discovery involved)."
echo ""
echo "- **success:** 1.000 iterations × 3 assertion types (ok, strictEqual, deepStrictEqual), all passing."
echo "- **failure:** a suite of 3 tests, one per assertion type, all failing."
echo "- **balanced:** a suite of 6 tests where 3 tests will fail and 3 tests will pass."
echo ""
echo "> **Note:** **Jest**, **Vitest**, **Bun**, **Deno**, and **Node.js** assertion libraries are not independently executable and require their own runtime environments. Consequently, results include the runner's startup and harness overhead in addition to assertion execution cost."

h4 "🃏 [Jest](https://github.com/jestjs/jest)"
assertion "jest" "$BIN_JEST" "success" "jest.spec.js"
assertion "jest" "$BIN_JEST" "failure" "jest.spec.js"
assertion "jest" "$BIN_JEST" "balanced" "jest.spec.js"

h4 "⚡️ [Vitest](https://github.com/vitest-dev/vitest)"
assertion "vitest" "$BIN_VITEST" "success" "vitest.spec.js"
assertion "vitest" "$BIN_VITEST" "failure" "vitest.spec.js"
assertion "vitest" "$BIN_VITEST" "balanced" "vitest.spec.js"

h4 "🐢 [Node.js (built-in)](https://github.com/nodejs/node)"
assertion "node" "$BIN_NODE" "success" "node.spec.js"
assertion "node" "$BIN_NODE" "failure" "node.spec.js"
assertion "node" "$BIN_NODE" "balanced" "node.spec.js"

h4 "🍞 [Bun (built-in)](https://github.com/oven-sh/bun)"
assertion "bun" "$BIN_BUN" "success" "bun.spec.js" "$BIN_POKU_BUN"
assertion "bun" "$BIN_BUN" "failure" "bun.spec.js" "$BIN_POKU_BUN"
assertion "bun" "$BIN_BUN" "balanced" "bun.spec.js" "$BIN_POKU_BUN"

h4 "🦕 [Deno (built-in)](https://github.com/denoland/deno)"
assertion "deno" "$BIN_DENO" "success" "deno.test.js" "$BIN_POKU_DENO"
assertion "deno" "$BIN_DENO" "failure" "deno.test.js" "$BIN_POKU_DENO"
assertion "deno" "$BIN_DENO" "balanced" "deno.test.js" "$BIN_POKU_DENO"

fi

if [ "$MODE" = "all" ] || [ "$MODE" = "nesting" ]; then

echo "### 🔗 Nesting"
echo ""
echo "Focuses on nested test suite overhead using \`describe\` blocks (3 levels deep, 100 suites), using **Node.js** \`assert\` for all runners."
echo ""
echo "- **success:** 100 suites × 3-level deep nesting, all passing."
echo "- **failure:** 100 suites × 3-level deep nesting, all failing."
echo "- **balanced:** 50 suites passing + 50 suites failing."

h4 "🃏 [Jest](https://github.com/jestjs/jest)"
nesting "jest" "$BIN_JEST" "success" "jest.spec.js"
nesting "jest" "$BIN_JEST" "failure" "jest.spec.js"
nesting "jest" "$BIN_JEST" "balanced" "jest.spec.js"

h4 "⚡️ [Vitest](https://github.com/vitest-dev/vitest)"
nesting "vitest" "$BIN_VITEST" "success" "vitest.spec.js"
nesting "vitest" "$BIN_VITEST" "failure" "vitest.spec.js"
nesting "vitest" "$BIN_VITEST" "balanced" "vitest.spec.js"

h4 "🐢 [Node.js (built-in)](https://github.com/nodejs/node)"
nesting "node" "$BIN_NODE" "success" "node.spec.js"
nesting "node" "$BIN_NODE" "failure" "node.spec.js"
nesting "node" "$BIN_NODE" "balanced" "node.spec.js"

h4 "🍞 [Bun (built-in)](https://github.com/oven-sh/bun)"
nesting "bun" "$BIN_BUN" "success" "bun.spec.js" "$BIN_POKU_BUN"
nesting "bun" "$BIN_BUN" "failure" "bun.spec.js" "$BIN_POKU_BUN"
nesting "bun" "$BIN_BUN" "balanced" "bun.spec.js" "$BIN_POKU_BUN"

h4 "🦕 [Deno (built-in)](https://github.com/denoland/deno)"
nesting "deno" "$BIN_DENO" "success" "deno.test.js" "$BIN_POKU_DENO"
nesting "deno" "$BIN_DENO" "failure" "deno.test.js" "$BIN_POKU_DENO"
nesting "deno" "$BIN_DENO" "balanced" "deno.test.js" "$BIN_POKU_DENO"

fi
