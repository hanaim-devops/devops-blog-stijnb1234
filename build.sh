#!/bin/sh

# Remove the existing devops-blog-container container if it exists
docker rm -f devops-blog-container

# Build the Docker image
docker build -t devops-blog-image .

# Run the Docker container
docker run --name devops-blog-container -d -p 8081:80 devops-blog-image

# Open the browser
open http://localhost:8081