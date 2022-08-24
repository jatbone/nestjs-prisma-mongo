FROM mongo:5
COPY $PWD/dockerfiles/keyfile.pem /data/keyfile.pem
RUN mkdir -p /data/logs && chmod 777 -R /data/logs
RUN chmod 400 /data/keyfile.pem
RUN chown 999:999 /data/keyfile.pem
RUN apt-get update && apt-get install vim -y
