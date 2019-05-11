# dntsc

Nothing interesting. Pet project for friends.
Contains API and client apps (NestJS, React).

## Prerequisites

Install Node, Yarn, Docker, Heroku CLI.

## Running locally (in dev mode)

### On-time needed actions

1. add your user to `docker` group by running `sudo usermod -a -G docker $USER` (this gives ability to access docker engine without `sudo`)
1. completely log out from your account and log back in (if in doubt, reboot!)
1. prepare `.env` file with development configuration values; this file is git-ignored and thus is missing after you pulled the repo, use `.env-example` as reference (most example values are for dev mode)
1. Create platform owner - follow steps [Creating platform owner](#creating-platform-owner)

### Launching project in dev mode

1. run `yarn --cwd ./apps/react-client run start`
1. (in another terminal) run `yarn --cwd ./apps/api run start:dev` (ignore docker error about already allocated port if any)

React client will be available under [localhost:3000](localhost:3000).
With default `.env` values (copied from `.env-example`) API will be available under [localhost:4000](localhost:4000).
If you set custom value for `PORT` (other than `4000`), then you also have to make corresponding change to `proxy` field of `/apps/react-client/package.json`.
Apps will refresh/reload automatically after you make changes to source code.
Development MongoDB will be available under port 27017 on localhost.
MongoDB files will be stored in `~/dntsc_dev_mongo_db_data` folder.

## Building and deploying

For now project is to be deployed/run on Heroku.
Due to this, it is configured to work as single Node app (including serving/reverse proxying static assets of React client app).
This works fine for MVP.

1. go to Heroku WEB console, select the app, switch to settings tab and set all env vars (Config Vars), do not set `PORT` (Heroku will set own one)
1. go to `/apps`
1. run `heroku login`
1. run `heroku container:login`
1. run `heroku container:push web -a <Heroku app name>`
1. run `heroku container:release web -a <Heroku app name>`

## Creating platform owner

For now platform owners are to be created manually.

1. run `node ./apps/api/generate-password-hash.js <desired password>` passing desired platform owner password as argument; this will print password hash - copy and save it somewhere to use in next steps
1. make sure API app was at least once successfully built and launched on target env (DB with schemas are created automatically after app first launch, we need those to exist when creating platform owner)
1. connect to mongo directly (for dev mode see [details](#connecting-to-mongo-directly-in-dev-mode) below)
1. run `use <app DB name>` (use your own DB name that is specified in .env file, default dev DB name is `dntsc-v1`)
1. run `db.Employees.insert({name: '<desired name>', isActive: true, login: '<desired login>', roles: ['_PLATFORM_OWNER'], password: '<remembered password hash>'})` (pass your own name, login and remembered password hash)

### Connecting to mongo directly in dev mode

1. go to `/apps/api`
1. run `docker run -d -p 27017:27017 -v ~/dntsc_dev_mongo_db_data:/data/db mongo` (skip this step if mongo container is already running)
1. run `docker ps` and remember ID of mongo container
1. run `docker exec -it <ID of mongo container> bash`
1. you are inside mongo container terminal, finally run `mongo`
