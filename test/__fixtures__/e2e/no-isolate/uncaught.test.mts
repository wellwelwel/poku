setTimeout(() => {
  throw new TypeError('non-assertion async error');
}, 10);

await new Promise((resolve) => setTimeout(resolve, 100));
