podman rm -f bs
podman rm -f bs-mongo

#podman run -d -v $(pwd)/frontend:/var/www/html/ -p 8080:80 --network bs-network --name bs b
podman run -d -p 8080:80 --network bs-network --name bs baseball-helper:latest
podman run -d  --network bs-network --name bs-mongo -p 27017:27017 mongo:4.4.15