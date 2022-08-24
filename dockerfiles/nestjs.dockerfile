FROM node:16-slim
RUN apt-get update
RUN apt-get install -y openssl vim

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY prisma prisma
COPY src src
COPY tsconfig.* ./
COPY package.json ./
COPY yarn.lock ./
COPY .env ./.env

RUN yarn install --pure-lockfile
RUN yarn build
