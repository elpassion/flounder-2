# Production image, copy all the files and run next
FROM node:16

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/apps

COPY dist/apps/frontend/package.json .

RUN npm install --production --legacy-peer-deps
RUN npm install sharp --production --legacy-peer-deps
RUN npm install uuid --production --legacy-peer-deps
RUN npm install pino-http --production --legacy-peer-deps
RUN npm install pino-pretty --production --legacy-peer-deps

COPY dist/apps/frontend/ .

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "src/run-next-server.js"]
