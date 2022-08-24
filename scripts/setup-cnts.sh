#!/bin/bash
export $(grep -v '^#' .env | xargs)

IMAGES=(
  "${COMPOSE_PROJECT_NAME}_api"
  "${COMPOSE_PROJECT_NAME}_mongo1"
  "${COMPOSE_PROJECT_NAME}_mongo2"
  "${COMPOSE_PROJECT_NAME}_mongo3"
)

docker compose down
docker rm -f $(docker ps -a -q)
docker image rm -f ${IMAGES[0]} ${IMAGES[1]} ${IMAGES[2]} ${IMAGES[3]}
docker volume rm $(docker volume ls -q)

docker compose up -d mongo1

INIT_REPLICA_COUNTER=30
INIT_REPLICA=0
while [ $INIT_REPLICA_COUNTER -gt 0 ]; do
  IS_OK=$(docker exec mongo1 mongosh --quiet --eval "
    rs.initiate({
      _id: \"myReplicaSet\",
      version: 1,
      members: [
        {_id: 0, host: \"mongo1\"},
        {_id: 1, host: \"mongo2\"},
        {_id: 2, host: \"mongo3\"}
      ]
    }).ok;
  ")
  if [ "$IS_OK" = "1" ]; then
    INIT_REPLICA=1
    break
  fi
  ((INIT_REPLICA_COUNTER--))
  sleep 1
done

if [ "$INIT_REPLICA" = "1" ]; then
  echo "Initiliazing mongodb replica set was succefull!"
else
  echo "Initiliazing mongodb replica set was NOT succefull!"
  exit 1
fi

INIT_ADMIN_COUNTER=30
INIT_ADMIN=0
while [ $INIT_ADMIN_COUNTER -gt 0 ]; do
  IS_PRIMARY=$(docker exec mongo1 mongosh --quiet --eval 'db.hello().isWritablePrimary')
  echo "IS_PRIMARY: $IS_PRIMARY"
  if [ "$IS_PRIMARY" = "true" ]; then
    IS_OK=$(docker exec mongo1 mongosh --quiet --eval "
      db.getSiblingDB('admin').createUser({
        user: 'admin',
        pwd: 'admin',
        roles: [ { role: 'root', db: 'admin' } ]
      }).ok;
    ")
    if [ "$IS_OK" = "1" ]; then
      INIT_ADMIN=1
      break
    fi
  fi
  ((INIT_ADMIN_COUNTER--))
  sleep 1
done

if [ "$INIT_ADMIN" = "1" ]; then
  echo "Admin user was succefully created!"
else
  echo "Admin user was NOT created!"
  exit 1
fi

# docker compose -f nestjs-compose.yml up -d --force-recreate
docker compose up -d api
