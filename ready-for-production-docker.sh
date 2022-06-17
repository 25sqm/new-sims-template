#! /usr/bin/bash
docker kill $(docker ps -q)
docker build -t allenpdl/sims:v1 .
docker push allenpdl/sims:v1