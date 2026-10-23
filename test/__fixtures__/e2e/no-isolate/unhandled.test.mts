Promise.reject(new TypeError('non-assertion rejected promise'));

await new Promise((resolve) => setTimeout(resolve, 100));
