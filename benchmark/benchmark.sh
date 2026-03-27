#!/bin/bash

SHORT_SHA=$(git rev-parse --short HEAD)
MODE=${1:-all}

HR="\n---\n"

BIN_POKU="node ./node_modules/poku/lib/bin/index.js"
BIN_MOCHA="node ./node_modules/mocha/bin/mocha.js --parallel"
BIN_JEST="node --experimental-vm-modules ./node_modules/jest/bin/jest.js"
BIN_VITEST="node ./node_modules/vitest/vitest.mjs run"
BIN_NODE="node --test"

if [ "$MODE" = "all" ]; then
  rm -rf results
elif [ "$MODE" = "execution" ]; then
  rm -rf results/execution
elif [ "$MODE" = "assertions" ]; then
  rm -rf results/assertions
fi

mkdir -p results/generalist
mkdir -p results/assertions/success
mkdir -p results/assertions/failure
mkdir -p results/assertions/balanced
mkdir -p results/execution/success
mkdir -p results/execution/balanced
mkdir -p results/execution/failure

h1() {
  echo "# $1\n"
}

h2() {
  echo "## $1\n"
}

h3() {
  echo "$HR"
  echo "### $1"
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

h1 "🎖️ Benchmarks"

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

h3 "☕️ [Mocha](https://github.com/mochajs/mocha)"
execution "mocha" "$BIN_MOCHA" "success" "mocha/**"
execution "mocha" "$BIN_MOCHA" "failure" "mocha/**"
execution "mocha" "$BIN_MOCHA" "balanced" "mocha/**"

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
echo "Uses **1 test file per runner per scenario** × **10 hyperfine runs**, using each runner's own assertion API. Each comparison is runner startup + load harness + execute assertions — no file discovery involved."
echo ""
echo "- **success**: 1.000 iterations × 3 assertion types (3k assertions per run)"
echo "- **failure**: 3 test cases, one per assertion type, all failing"
echo "- **balanced**: 3 passing test cases (500 iterations each) + 3 failing test cases"
echo "$HR"
echo "- **Jest / Vitest**: \`expect(v).toBeTruthy()\`, \`expect(a).toBe(b)\`, \`expect(a).toStrictEqual(b)\`"
echo "- **Mocha**: \`expect(v).to.be.ok\`, \`expect(a).to.equal(b)\`, \`expect(a).to.deep.equal(b)\` from \`chai\`"
echo "- **Node.js**: \`assert.ok()\`, \`assert.strictEqual()\`, \`assert.deepStrictEqual()\` from \`node:assert\`"
echo "- **Poku**: \`assert.ok()\`, \`assert.strictEqual()\`, \`assert.deepStrictEqual()\` from \`poku\`"
echo ""
echo "> **Note:** Jest, Vitest, Mocha, and Node.js assertion libraries are not independently executable and require their own runtime environments. Consequently, results include the runner's startup and harness overhead in addition to assertion execution cost."

h3 "🃏 [Jest](https://github.com/jestjs/jest)"
assertion "jest" "$BIN_JEST" "success" "jest.spec.js"
assertion "jest" "$BIN_JEST" "failure" "jest.spec.js"
assertion "jest" "$BIN_JEST" "balanced" "jest.spec.js"

h3 "⚡️ [Vitest](https://github.com/vitest-dev/vitest)"
assertion "vitest" "$BIN_VITEST" "success" "vitest.spec.js"
assertion "vitest" "$BIN_VITEST" "failure" "vitest.spec.js"
assertion "vitest" "$BIN_VITEST" "balanced" "vitest.spec.js"

h3 "☕️ [Mocha](https://github.com/mochajs/mocha)"
assertion "mocha" "$BIN_MOCHA" "success" "mocha.spec.js"
assertion "mocha" "$BIN_MOCHA" "failure" "mocha.spec.js"
assertion "mocha" "$BIN_MOCHA" "balanced" "mocha.spec.js"

h3 "🐢 [Node.js (built-in)](https://github.com/nodejs/node)"
assertion "node" "$BIN_NODE" "success" "node.spec.js"
assertion "node" "$BIN_NODE" "failure" "node.spec.js"
assertion "node" "$BIN_NODE" "balanced" "node.spec.js"

echo ""
echo "</details>"
echo ""

quote "[!IMPORTANT]"
quote "Benchmarks do not indicate competitiveness; they serve as a metric to monitor the project performance."

fi
