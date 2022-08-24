# Mongodb, prisma ORM and nestjs api (dockerized)

Install all dependecies with `yarn install`

## Create .env file

Create `.env` file from `.evn.example` and set variables.

## Build docker images and start containers

After all env vars were set, run command `yarn setup-cnts`. This command
will build all docker images and start containers.

After succefull setup api will be reachable on `localhost:3000`
