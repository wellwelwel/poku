#!/bin/bash

SHORT_SHA=$(git rev-parse --short HEAD)

HR="\n---\n"

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
  echo "# $1\n"
}

h2() {
  echo "## $1"
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

h1 "🎖️ Benchmarks"

quote "[!NOTE]"
quote ""
quote "## 🏃🏻‍♀️ 1/4 Execution Tests"
quote ""
quote "Focuses solely in execution, using a simple \`assert(true)\` or \`assert(false)\` from **Node.js** and searches for files in four levels of depth."
quote ""
quote "- **success:** a suite of 5 tests that will pass."
quote "- **failure:** a suite of 5 tests that will fail."
quote "- **balanced:** a suite of 10 tests where 5 tests will fail and 5 tests will pass."

echo ""
echo "<details>"
echo "<summary>"
echo "See Results"
echo "</summary>"

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

echo "$HR"

quote "[!IMPORTANT]"
quote ""
quote "Please take into consideration that benchmarks do not indicate the competitiveness of one over the other; rather, they serve as a metric to monitor and objectively assess the current performance state of the project."
