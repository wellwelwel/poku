export const parseBenchmarkResults = (input, source) => {
  const results = input?.results;
  if (!Array.isArray(results))
    throw new Error(`${source}: missing benchmark results`);

  const normalized = results.map((result) => ({
    command: result.name ?? result.command,
    mean: result.summary?.time_wall_clock?.mean ?? result.mean,
  }));
  const poku = normalized.find(({ command }) => command?.includes('Poku'));
  const other = normalized.find(({ command }) => !command?.includes('Poku'));

  if (!poku || !other)
    throw new Error(`${source}: expected Poku and comparison results`);

  for (const result of [poku, other]) {
    if (!Number.isFinite(result.mean) || result.mean <= 0)
      throw new Error(
        `${source}: invalid wall-clock mean for ${result.command}`
      );
  }

  return { poku, other };
};

export const formatBenchmarkDetails = (input, source) => {
  const { poku, other } = parseBenchmarkResults(input, source);
  const [faster, slower] =
    poku.mean <= other.mean ? [poku, other] : [other, poku];
  const timing = (result) =>
    `${result.command}: ${(result.mean * 1000).toFixed(3)} ms`;
  const comparison =
    faster.mean === slower.mean
      ? 'Both commands had the same mean wall-clock time.'
      : `${faster.command} ran ${(slower.mean / faster.mean).toFixed(2)} times faster than ${slower.command}`;

  return [timing(other), timing(poku), comparison].join('\n');
};
