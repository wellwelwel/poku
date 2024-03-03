// eslint-disable-next-line import/no-unresolved
import { listFiles } from 'npm:poku';

const files = listFiles('.', {
  filter: /\.ts/,
});

console.log('Ensuring Deno Compatibility For:', files);

for (const file of files) {
  const raw = await Deno.readTextFile(file);
  const content = raw.replace(/((import|export|from).+)(\.js)/g, '$1.ts');

  await Deno.writeTextFile(file, content);
}
