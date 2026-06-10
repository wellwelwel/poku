#!/usr/bin/env python3
from pathlib import Path

BASE = Path(__file__).parent
BASELINE = (BASE / 'impl' / 'baseline.ts').read_text()


def apply(src, old, new, count=1):
    found = src.count(old)
    if found != count:
        raise SystemExit(f'expected {count} occurrence(s), found {found}:\n{old[:120]}')
    return src.replace(old, new)


# One entry per hypothesis: 'variant-id': [(old, new, count), ...].
# Use raw triple-quoted strings so JS template literals need no escaping.
# Copy `old` blocks verbatim from impl/baseline.ts, indentation included.
variants = {
    # 'example-variant': [
    #     (
    #         r'''const compareStrings = (a, b) => a.localeCompare(b);''',
    #         r'''const compareStrings = (a, b) => (a < b ? -1 : a > b ? 1 : 0);''',
    #         1,
    #     ),
    # ],
}


def main():
    for variant_id, replacements in variants.items():
        src = BASELINE
        for old, new, count in replacements:
            src = apply(src, old, new, count)
        (BASE / 'impl' / f'{variant_id}.ts').write_text(src)
        print(f'generated {variant_id}.ts')


if __name__ == '__main__':
    main()
