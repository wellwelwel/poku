import { serve, file } from 'bun';

const publicDir = './build';
const index = `${publicDir}/index.html`;
const docs = `${publicDir}/docs.html`;
const port = process.env.APP_PORT;

serve({
  port,
  fetch: async (req: Request) => {
    try {
      const { pathname } = new URL(req.url);
      const filePath = `${publicDir}${pathname}`;

      const asset = file(filePath);
      const isAsset = await asset.exists();

      if (isAsset) {
        return new Response(asset.stream(), {
          headers: { 'Content-Type': asset.type },
        });
      }

      const page = pathname.includes('/docs') ? docs : index;

      return new Response(file(page).stream(), {
        headers: { 'Content-Type': 'text/html' },
      });
    } catch (error) {
      return new Response('Not Found', { status: 404 });
    }
  },
});

console.log(`Serving at port ${port}`);
