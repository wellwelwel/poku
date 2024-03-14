// eslint-disable-next-line import/no-unresolved
import { listFiles } from 'npm:poku';

const ensureNodeCompatibility = async (path: string) => {
  const files = listFiles(path, {
    filter: /\.ts/,
  });

  console.log('Ensuring Deno Compatibility For:', files);

  for await (const file of files) {
    const raw = await Deno.readTextFile(file);
    const content = raw.replace(/((import|export|from).+)(\.js)/g, '$1.ts');

    await Deno.writeTextFile(file, content);
  }
};

ensureNodeCompatibility('./src').then(() => {
  ensureNodeCompatibility('./test').then(() => {
    Deno.exit(0);
  });
});
