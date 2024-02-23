import 'dotenv/config';
import { SVPS } from 'svps';

const { SRV_HOST, SRV_PORT, SRV_USER, SRV_PASS } = process.env;

export const svps = new SVPS({
  access: {
    host: String(SRV_HOST),
    port: Number(SRV_PORT),
    username: String(SRV_USER),
    password: String(SRV_PASS),
  },
});
