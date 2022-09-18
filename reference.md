## Run Local via Docker
```
docker build -t nest-google-passport -f Dockerfile .

docker run -it -p 3000:3000 nest-google-passport

```
### Running local with live-reload
```
docker build -t nest-google-passport -f Dockerfile .

docker run \
    -p 3000:3000 \
    -v nodemodules:/src/node_modules \
    -v `pwd`:/app \
    --network=mci-mysql-adminer \
    nest-google-passport npm run start:debug

```

### Running local MySQL database
```
docker run --name demo-mysql --rm -p 3306:3306 -e MYSQL_ROOT_PASSWORD=qweqwe123 -d mysql:8.0

```

## Run Local via Docker-compose
### Clean for re build
```
docker build -t nest-google-passport -f Dockerfile .

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
docker build -t nest-google-passport -f Dockerfile .

docker tag nest-google-passport gcr.io/cfe-project-357217/nest-google-passport

docker push gcr.io/cfe-project-357217/nest-google-passport

```

### via GCloud Build
```
gcloud builds submit --tag gcr.io/cfe-project-357217/nest-google-passport

```

## Running local with live-reload
```
docker build -t nest-google-passport -f Dockerfile .

docker run \
    -p 3000:3000 \
    -v nodemodules:/src/node_modules \
    -v `pwd`:/app \
    nest-google-passport npm run start:debug

```
