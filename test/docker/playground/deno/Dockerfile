FROM denoland/deno:alpine

WORKDIR /usr/app

COPY ./src ./src
COPY ./test ./test
COPY ./tools ./tools
COPY ./fixtures ./fixtures

RUN deno run --allow-read --allow-write --allow-env --allow-run --unstable-sloppy-imports tools/compatibility/deno.ts
# deno run --allow-read --allow-net --allow-env --allow-run test/

CMD ["tail", "-f", "/dev/null"]
