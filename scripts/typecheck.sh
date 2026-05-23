#!/bin/bash
set -euo pipefail

repositoryRoot="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

typeViolations="$(
  grep -rE '^(export )?(type|interface) [A-Z]' \
    "$repositoryRoot/src" \
    --include='*.ts' \
    | grep -v '/@types/' \
    || true
)"

if [[ -n "$typeViolations" ]]; then
  echo "Forbidden type declarations found outside src/@types/:" >&2
  printf '%s\n' "$typeViolations" >&2
  exit 1
fi

doubleCastHits="$(
  cd "$repositoryRoot" && find . \
    \( -path './.git' -o -name 'node_modules' -o -path './lib' \) -prune -o \
    -type f \( -name '*.ts' -o -name '*.mts' -o -name '*.cts' \) \
    -print0 \
    | xargs -0 grep -nF 'as unknown as' \
    || true
)"

if [[ -n "$doubleCastHits" ]]; then
  echo "Forbidden \"as unknown as\" double-cast found:" >&2
  printf '%s\n' "$doubleCastHits" >&2
  exit 1
fi

tsc --noEmit
tsc -p test
