// import { test } from '../../../src/modules/helpers/test.js';
// import { assert } from '../../../src/modules/essentials/assert.js';
// import { docker } from '../../../src/modules/helpers/container.js';

// const serviceName = 'node-20';

// test(`Compatibility Tests: ${serviceName}`, async () => {
//   const dockerfile = docker.dockerfile({
//     detach: false,
//     containerName: serviceName,
//     tagName: serviceName,
//     file: 'test/__docker__/node/20.Dockerfile',
//     environments: ['NODE_ENV=build'],
//   });

//   await dockerfile.remove();
//   await dockerfile.build();

//   const result = await dockerfile.start();

//   if (!result) {
//     assert.fail(`See the logs by running \`docker logs ${serviceName}\``);
//   }

//   await dockerfile.remove();
// });
