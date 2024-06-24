FROM node:lts-alpine

WORKDIR /usr/app

COPY src/docker-compose-server.js /usr/app/server.js

CMD ["node", "server.js"]
