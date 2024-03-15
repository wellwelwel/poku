FROM denoland/deno:alpine-1.30.0

WORKDIR /usr/app

COPY ./src ./src
COPY ./test ./test
COPY ./tools ./tools
COPY ./fixtures ./fixtures

RUN deno run --allow-read --allow-write --allow-env --allow-run tools/compatibility/deno.ts

CMD ["deno", "run", "--allow-read", "--allow-env", "--allow-run", "test/run.test.ts"]
