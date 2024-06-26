FROM node:21-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
