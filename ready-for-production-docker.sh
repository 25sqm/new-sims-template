
docker kill $(docker ps -q)
docker buildx build -t allenpdl/sims:v1 --platform=linux/amd64 .
docker push aoponcedeleon/sims-client
