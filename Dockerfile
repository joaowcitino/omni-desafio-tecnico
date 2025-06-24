FROM node:20-alpine

RUN apk add --no-cache tzdata

ENV TZ=America/Sao_Paulo

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build && npm prune --production

EXPOSE 3005

CMD [ "node", "dist/main.js" ]
