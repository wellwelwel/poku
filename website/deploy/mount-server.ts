import 'dotenv/config';
import { exit } from 'poku';
import { svps } from './access.js';

(async () => {
  const mounted = await svps.mount({
    repair: true,
    apt: true,
    apache: true,
    docker: true,
    firewall: true,
  });

  const createdVH =
    mounted &&
    (await svps.createVirtualHosts([
      {
        domain: 'poku.io',
        port: Number(process.env.APP_PORT),
        www: true,
      },
    ]));

  await svps.end();

  exit(createdVH ? 0 : 1);
})();
