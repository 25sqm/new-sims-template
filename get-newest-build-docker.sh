#! /usr/bin/bash
docker kill $(docker ps -q)
docker pull aoponcedeleon/sims-client
docker run -p 80:80 -d aooponcedeleon/sims-client
