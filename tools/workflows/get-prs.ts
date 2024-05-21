import { getArg } from '../../src/helpers/get-arg.js';

type PR = {
  title?: string;
};

(async () => {
  const PRs: PR[] = await (
    await fetch('https://api.github.com/repos/wellwelwel/poku/pulls?state=open')
  )
    .clone()
    .json();

  const titles = PRs.map((PR) => String(PR?.title));
  const title = String(getArg('title'));

  process.exit(titles.includes(title) ? 0 : 1);
})();
