#!/bin/sh

docker build -t seamless-backend .
docker tag seamless-backend ejweiner/seamless-backend
docker push ejweiner/seamless-backend