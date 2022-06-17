#! /usr/bin/bash
docker pull allenpdl/sims:v1
docker run -p 80:80 -d allenpdl/sims:v1