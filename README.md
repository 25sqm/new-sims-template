# Getting Started with SIMS Dashboard

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Setting up your dev environment

## Ubuntu

1. Before installing your dependencies, make sure you have Node and npm installed.
2. After cloning the repo: `npm install`
3. After the dependencies have been installed: `npm start`
4. Edit code in `src` folder to see changes.

# Deploying client to Docker and Production
***TAKE NOTE:*** All container names are the ones used in old unofficial FREE account (aoponcedeleon). Please use official one or your own accounts/local docker when deploying to production.

## Ubuntu

1. Before anything, make sure you have [Docker](https://www.docker.com/) installed. Create a dockerhub cloud container using your credentials from Docker. Take note of its container name (`aoponcedeleon/sims-client` for example)
2. Build local image from the root folder: `docker build -t [username]/[container-name]:[tag]`
For example: `docker build -t allenpdl/sims:v1`
3. Tag local container with cloud container: `docker tag allenpdl/sims:v1 aoponcedeleon/sims-client`
4. Push to cloud container: `docker push aoponcedeleon/sims-client`
5. Assuming you pushed successfully to cloud container. Now we connect to the EC2 Server Remotely: `ssh -i "[PEM Key]" ec2-user@ec2-54-255-223-16.ap-southeast-1.compute.amazonaws.com`
6. *In EC2 terminal*: Kill all docker instances: `docker kill $(docker ps -q)`
7. Pull docker image from cloud container: `docker pull aoponcedeleon/sims-client`
8. Run docker image in port 80: `docker run -p 80:80 -d aooponcedeleon/sims-client`
