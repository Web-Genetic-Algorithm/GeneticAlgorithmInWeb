FROM node:22

WORKDIR /app

COPY  package.json .

RUN npm i

COPY . .

EXPOSE 8082

CMD ["node", "server.js"]