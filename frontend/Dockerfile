FROM node:14.17.3-alpine3.11

RUN mkdir /app && chown node:node /app

USER node

WORKDIR /app

COPY --chown=node:node . .

RUN npm ci && npm run build 

ENV PATH /app/node_modules/.bin:$PATH

CMD ["npm","run","start"]