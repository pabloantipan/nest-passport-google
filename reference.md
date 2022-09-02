## Run Local via Docker
```
docker build -t mci-auth-service -f Dockerfile .

docker run -it -p 3000:3000 mci-auth-service

```
### Running local with live-reload
```
docker build -t mci-auth-service -f Dockerfile .

docker run \
    -p 3000:3000 \
    -v nodemodules:/src/node_modules \
    -v `pwd`:/app \
    mci-auth-service npm run start:debug

```
## Run Local via Docker-compose
### Clean for re build
```
docker-compose stop
docker-compose kill
docker-compose rm
docker volume prune

```
### Build and run
```
docker-compose create
docker-compose up

```

## Push to GCP Cloud Run
### Via Docker
```
docker build -t mci-auth-service -f Dockerfile .

docker tag mci-auth-service gcr.io/cfe-project-357217/mci-auth-service

docker push gcr.io/cfe-project-357217/mci-auth-service

```

### via GCloud Build
```
gcloud builds submit --tag gcr.io/cfe-project-357217/mci-auth-service

```

## Running local with live-reload
```
docker build -t mci-auth-service -f Dockerfile .

docker run \
    -p 3000:3000 \
    -v nodemodules:/src/node_modules \
    -v `pwd`:/app \
    mci-auth-service npm run start:debug

```