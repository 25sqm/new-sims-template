#! /usr/bin/bash
docker kill $(docker ps -q)
docker pull allenpdl/sims:v1
docker run -p 80:80 -d allenpdl/sims:v1