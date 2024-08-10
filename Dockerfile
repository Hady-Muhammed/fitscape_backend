FROM node:20.16.0

WORKDIR /app


COPY package.json .

RUN npm install

COPY . .

EXPOSE 1234

CMD [ "npm" , "run",  "start-dev"]
