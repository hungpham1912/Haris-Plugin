FROM node:20.9.0

COPY ["package.json", "./"]

COPY .env .

RUN yarn add @nestjs/cli

RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "start:prod" ]
