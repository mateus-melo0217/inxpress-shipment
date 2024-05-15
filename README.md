## Setup

Setup local app by renaming the file `.env.example` to `.env.local` and then edit the env file parameters according to your local environment. 

```
cp .env.example .env.local
```

## Docker

To get started, you only need to install [Docker Desktop](https://www.docker.com/products/docker-desktop/).

Open CLI and inside the project folder run below commands:

1. Install NPM dependencies
````
docker run --rm --interactive --tty --workdir=/app --volume $PWD:/app node:16.15.0 npm install
````

2. Start docker services
````
docker-compose up -d
````

Once the application's Docker containers have been started, you can access the application in your web browser at: 
```
http://localhost:3001
```