FROM node:16

WORKDIR /src

COPY package*.json ./

RUN npm install -g npm@latest

COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
