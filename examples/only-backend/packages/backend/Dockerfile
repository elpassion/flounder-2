FROM node:16

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY dist/packages/backend/package.json .
RUN npm install --omit=dev --force
RUN npm install pg --omit=dev --force

COPY dist/packages/backend .

CMD node ./main.js
