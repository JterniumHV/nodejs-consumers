FROM node:19-alpine

EXPOSE 5000

WORKDIR /app

COPY package*.json ./

RUN npm config set strict-ssl false

RUN npm install

COPY . .


CMD ["npm", "start"]