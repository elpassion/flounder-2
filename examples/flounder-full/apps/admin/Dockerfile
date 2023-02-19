# Production image, copy all the files and run next
FROM node:16

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/apps

COPY dist/apps/admin/package.json .
COPY pnpm-lock.yaml .

RUN npm install --production --legacy-peer-deps
RUN npm install sharp --production --legacy-peer-deps
RUN npm install uuid --production --legacy-peer-deps
RUN npm install tslib --production --legacy-peer-deps
RUN npm install pino-http --production --legacy-peer-deps
RUN npm install pino-pretty --production --legacy-peer-deps

COPY dist/apps/admin/ .

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "src/run-next-server.js"]
