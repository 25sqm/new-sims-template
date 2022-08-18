
docker build -t allenpdl/sims:v1 . OR docker buildx build -t allenpdl/sims:v1 --platform=linux/amd64 .
docker tag allenpdl/sims:v1 aoponcedeleon/sims-client
docker push aoponcedeleon/sims-client
ssh -i "{PEM Key}" ec2-user@ec2-54-255-223-16.ap-southeast-1.compute.amazonaws.com
