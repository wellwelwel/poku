import { serve, file } from 'bun';

const publicDir = './build';
const index = `${publicDir}/index.html`;
const docs = `${publicDir}/docs.html`;
const port = process.env.APP_PORT;

const setCache = (filePath: string): string => {
  if (filePath.endsWith('.html')) return 'public, max-age=60';
  return 'public, max-age=1800, immutable';
};

const defaultHeaders = {
  'Content-Language': 'en',
  'X-Robots-Tag': 'index, follow',
};

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
          headers: {
            ...defaultHeaders,
            'Content-Type': asset.type,
            'Cache-Control': setCache(filePath),
          },
        });
      }

      const page = pathname.includes('/docs') ? docs : index;

      return new Response(file(page).stream(), {
        headers: {
          ...defaultHeaders,
          'Content-Type': 'text/html',
          'Cache-Control': setCache(page),
        },
      });
    } catch (error) {
      return new Response('Not Found', { status: 404 });
    }
  },
});

console.log(`Serving at port ${port}`);
