#!/bin/bash

SHORT_SHA=$(git rev-parse --short HEAD)
MODE=${1:-all}

HR="\n---\n"

BIN_POKU="node ./node_modules/poku/lib/bin/index.js"
BIN_JEST="node --experimental-vm-modules ./node_modules/jest/bin/jest.js"
BIN_VITEST="node ./node_modules/vitest/vitest.mjs run"
BIN_NODE="node --test"

if [ "$MODE" = "all" ]; then
  rm -rf results
elif [ "$MODE" = "execution" ]; then
  rm -rf results/execution
elif [ "$MODE" = "assertions" ]; then
  rm -rf results/assertions
elif [ "$MODE" = "nesting" ]; then
  rm -rf results/nesting
elif [ "$MODE" = "general" ]; then
  rm -rf results/general
fi

mkdir -p results/general/success
mkdir -p results/general/failure
mkdir -p results/general/balanced
mkdir -p results/assertions/success
mkdir -p results/assertions/failure
mkdir -p results/assertions/balanced
mkdir -p results/execution/success
mkdir -p results/execution/balanced
mkdir -p results/execution/failure
mkdir -p results/nesting/success
mkdir -p results/nesting/failure
mkdir -p results/nesting/balanced

h1() {
  echo "## $1\n"
}

h2() {
  echo "### $1\n"
}

h3() {
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
  local cmd_src="$bin \"./test/execution/${dir}/${path}\""
  local cmd_poku="$BIN_POKU \"./test/execution/${dir}/poku\""

  echo ""
  li "${dir}"
  echo ""
  echo "\`\`\`"
  hyperfine -i --warmup 5 --runs 10 --export-json "results/execution/${dir}/${name}.json" \
    --command-name "$name" "$cmd_src" \
    --command-name "🐷 Poku ($SHORT_SHA)" "$BIN_POKU ./test/execution/${dir}/poku" 2>/dev/null |
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
  local cmd_src="$bin \"./test/assertion/${dir}/${file}\""
  local cmd_poku="$BIN_POKU \"./test/assertion/${dir}/poku.spec.js\""

  echo ""
  li "${dir}"
  echo ""
  echo "\`\`\`"
  hyperfine -i --warmup 5 --runs 10 --export-json "results/assertions/${dir}/${name}.json" \
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
  local cmd_src="$bin \"./test/nesting/${dir}/${file}\""
  local cmd_poku="$BIN_POKU \"./test/nesting/${dir}/poku.spec.js\""

  echo ""
  li "${dir}"
  echo ""
  echo "\`\`\`"
  hyperfine -i --warmup 5 --runs 10 --export-json "results/nesting/${dir}/${name}.json" \
    --command-name "$name" "$cmd_src" \
    --command-name "🐷 Poku ($SHORT_SHA)" "$cmd_poku" 2>/dev/null |
    awk '/ ran/ {flag=1} flag'
  echo "\`\`\`"
  echo ""
  grid "$cmd_src" "$cmd_poku"
}

general() {
  local name=$1
  local bin=$2
  local dir=$3
  local path=$4
  local cmd_src="$bin \"./test/general/${dir}/${path}\""
  local cmd_poku="$BIN_POKU \"./test/general/${dir}/poku\""

  echo ""
  li "${dir}"
  echo ""
  echo "\`\`\`"
  hyperfine -i --warmup 5 --runs 10 --export-json "results/general/${dir}/${name}.json" \
    --command-name "$name" "$cmd_src" \
    --command-name "🐷 Poku ($SHORT_SHA)" "$BIN_POKU ./test/general/${dir}/poku" 2>/dev/null |
    awk '/ ran/ {flag=1} flag'
  echo "\`\`\`"
  echo ""
  grid "$cmd_src" "$cmd_poku"
}

if [ "$MODE" = "all" ]; then
  h1 "🎖️ Benchmarks"
fi

if [ "$MODE" = "all" ] || [ "$MODE" = "execution" ]; then

h2 "🏃🏻‍♀️ Test Runner"

echo "<!-- SUMMARY_TABLE -->"
echo ""

echo "<details>"
echo "<summary>"
echo "<strong>ℹ Extensive Details</strong>"
echo "</summary>"
echo "<br />"
echo ""
echo "Focuses solely in execution, using a simple \`assert(true)\` or \`assert(false)\` from **Node.js** and searches for files in four levels of depth."
echo ""
echo "- **success:** a suite of 5 tests that will pass."
echo "- **failure:** a suite of 5 tests that will fail."
echo "- **balanced:** a suite of 10 tests where 5 tests will fail and 5 tests will pass."

h3 "🃏 [Jest](https://github.com/jestjs/jest)"
execution "jest" "$BIN_JEST" "success" "jest"
execution "jest" "$BIN_JEST" "failure" "jest"
execution "jest" "$BIN_JEST" "balanced" "jest"

h3 "⚡️ [Vitest](https://github.com/vitest-dev/vitest)"
execution "vitest" "$BIN_VITEST" "success" "vitest"
execution "vitest" "$BIN_VITEST" "failure" "vitest"
execution "vitest" "$BIN_VITEST" "balanced" "vitest"

h3 "🐢 [Node.js (built-in)](https://github.com/nodejs/node)"
execution "node" "$BIN_NODE" "success" "node/**/**.spec.js"
execution "node" "$BIN_NODE" "failure" "node/**/**.spec.js"
execution "node" "$BIN_NODE" "balanced" "node/**/**.spec.js"

echo ""
echo "</details>"
echo ""

fi

if [ "$MODE" = "all" ] || [ "$MODE" = "assertions" ]; then

h2 "🧪 Assertion"

echo "<!-- ASSERTION_SUMMARY_TABLE -->"
echo ""

echo "<details>"
echo "<summary>"
echo "<strong>ℹ Extensive Details</strong>"
echo "</summary>"
echo "<br />"
echo ""
echo "Focuses solely in assertions, using each runner's own assertion API with 1 test file per runner per scenario (no file discovery involved)."
echo ""
echo "- **success:** 1.000 iterations × 3 assertion types (ok, strictEqual, deepStrictEqual) — all passing."
echo "- **failure:** a suite of 3 tests, one per assertion type, all failing."
echo "- **balanced:** a suite of 6 tests where 3 tests will fail and 3 tests will pass."
echo ""
echo "> **Note:** Jest, Vitest, and Node.js assertion libraries are not independently executable and require their own runtime environments. Consequently, results include the runner's startup and harness overhead in addition to assertion execution cost."

h3 "🃏 [Jest](https://github.com/jestjs/jest)"
assertion "jest" "$BIN_JEST" "success" "jest.spec.js"
assertion "jest" "$BIN_JEST" "failure" "jest.spec.js"
assertion "jest" "$BIN_JEST" "balanced" "jest.spec.js"

h3 "⚡️ [Vitest](https://github.com/vitest-dev/vitest)"
assertion "vitest" "$BIN_VITEST" "success" "vitest.spec.js"
assertion "vitest" "$BIN_VITEST" "failure" "vitest.spec.js"
assertion "vitest" "$BIN_VITEST" "balanced" "vitest.spec.js"

h3 "🐢 [Node.js (built-in)](https://github.com/nodejs/node)"
assertion "node" "$BIN_NODE" "success" "node.spec.js"
assertion "node" "$BIN_NODE" "failure" "node.spec.js"
assertion "node" "$BIN_NODE" "balanced" "node.spec.js"

echo ""
echo "</details>"
echo ""

fi

if [ "$MODE" = "all" ] || [ "$MODE" = "nesting" ]; then

h2 "🔗 Nesting"

echo "<!-- NESTING_SUMMARY_TABLE -->"
echo ""

echo "<details>"
echo "<summary>"
echo "<strong>ℹ Extensive Details</strong>"
echo "</summary>"
echo "<br />"
echo ""
echo "Focuses on nested test suite overhead using \`describe\` blocks (3 levels deep, 100 suites), using **Node.js** \`assert\` for all runners."
echo ""
echo "- **success:** 100 suites × 3-level deep nesting — all passing."
echo "- **failure:** 100 suites × 3-level deep nesting — all failing."
echo "- **balanced:** 50 suites passing + 50 suites failing."

h3 "🃏 [Jest](https://github.com/jestjs/jest)"
nesting "jest" "$BIN_JEST" "success" "jest.spec.js"
nesting "jest" "$BIN_JEST" "failure" "jest.spec.js"
nesting "jest" "$BIN_JEST" "balanced" "jest.spec.js"

h3 "⚡️ [Vitest](https://github.com/vitest-dev/vitest)"
nesting "vitest" "$BIN_VITEST" "success" "vitest.spec.js"
nesting "vitest" "$BIN_VITEST" "failure" "vitest.spec.js"
nesting "vitest" "$BIN_VITEST" "balanced" "vitest.spec.js"

h3 "🐢 [Node.js (built-in)](https://github.com/nodejs/node)"
nesting "node" "$BIN_NODE" "success" "node.spec.js"
nesting "node" "$BIN_NODE" "failure" "node.spec.js"
nesting "node" "$BIN_NODE" "balanced" "node.spec.js"

echo ""
echo "</details>"
echo ""

fi

# This benchmark is not included in CI due to excessive runtime.
# To run it manually, execute: `cd benchmark && npm run bench:general`.
if [ "$MODE" = "general" ]; then

h2 "🧨 General Exhaustive Testing"

echo "<!-- GENERAL_SUMMARY_TABLE -->"
echo ""

echo "<details>"
echo "<summary>"
echo "<strong>ℹ Extensive Details</strong>"
echo "</summary>"
echo "<br />"
echo ""
echo "Combines everything: multi-file execution across four levels of depth, nested \`describe\` blocks (3 levels deep), flat tests, and varied runner-native assertions (ok, strictEqual/toBe, deepStrictEqual/toStrictEqual). No loops are used — each file contains only direct tests and assertions."
echo ""
echo "- **success:** a suite of 20 tests that will pass."
echo "- **failure:** a suite of 20 tests that will fail."
echo "- **balanced:** a suite of 20 tests where 10 tests will fail and 10 tests will pass."

h3 "🃏 [Jest](https://github.com/jestjs/jest)"
general "jest" "$BIN_JEST" "success" "jest"
general "jest" "$BIN_JEST" "failure" "jest"
general "jest" "$BIN_JEST" "balanced" "jest"

h3 "⚡️ [Vitest](https://github.com/vitest-dev/vitest)"
general "vitest" "$BIN_VITEST" "success" "vitest"
general "vitest" "$BIN_VITEST" "failure" "vitest"
general "vitest" "$BIN_VITEST" "balanced" "vitest"

h3 "🐢 [Node.js (built-in)](https://github.com/nodejs/node)"
general "node" "$BIN_NODE" "success" "node/**/**.spec.js"
general "node" "$BIN_NODE" "failure" "node/**/**.spec.js"
general "node" "$BIN_NODE" "balanced" "node/**/**.spec.js"

echo ""
echo "</details>"
echo ""

fi

quote "[!IMPORTANT]"
quote "Benchmarks do not indicate competitiveness; they serve as a metric to monitor the project performance."
