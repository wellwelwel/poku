import 'dotenv/config';
import { svps } from './access.js';
import { exit } from 'poku';

(async () => {
  const port = process.env.APP_PORT;

  const uploaded = await svps.upload([
    {
      local: './server.ts',
      remote: 'server.ts',
    },
    {
      local: './build',
      remote: './',
    },
    {
      local: './Dockerfile',
      remote: 'Dockerfile',
    },
    {
      local: './docker-compose.yml',
      remote: 'docker-compose.yml',
    },
  ]);

  const composed =
    uploaded &&
    (await svps.commands([`APP_PORT=${port} docker compose up --build -d`]));

  await svps.end();

  exit(composed ? 0 : 1);
})();
