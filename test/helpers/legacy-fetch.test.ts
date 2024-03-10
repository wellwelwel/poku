import http from 'node:http';

export const legacyFetch = (
  hostname: string,
  port: number
): Promise<{ statusCode?: number; body: string }> => {
  const options = {
    hostname,
    port,
    path: '/',
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};
