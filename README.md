# dntsc

Nothing interesting. Pet project for friends.
Set of apps (NestJS and React) coupled with [zeit.co](https://zeit.co).

## Prerequisites

Install Node, Yarn, Docker.

## Running locally (in dev mode)

### On-time needed actions

1. add your user to `docker` group by running `sudo usermod -a -G docker $USER` (this gives ability to access docker engine without `sudo`)
1. completely log out of your account and log back in (if in doubt, reboot!)
1. prepare `.env` file with development configuration values; this file is git-ignored and thus is missing after you pulled the repo, use `.env-example` as reference (most example values are for dev mode)
1. Create very platform owner - follow steps [Creating platform owner](#creating-platform-owner)

### Launching project in dev mode

1. run `yarn --cwd ./apps/react-client run start`
1. (in another terminal) run `yarn --cwd ./apps/api run start:dev`

React client will be available under [localhost:3000](localhost:3000).
With default `.env` values (copied from `.env-example`) API will be available under [localhost:4000](localhost:4000).
If you set custom value for `API_SERVING_PORT` (other than `4000`), then you also have to make corresponding change to `proxy` field of `/apps/react-client/package.json`.
Apps will refresh/reload automatically after you make changes to source code.
Development MongoDB will be available under port 27017 on localhost.
MongoDB files will be stored in `~/dntsc_dev_mongo_db_data` folder.

## Building and deploying

### Building and deploying API app

1. prepare `/apps/api/.env.prod` file with production configuration values; this file is gitignored, use `/apps/api/.env-example` as example
2. go to `/apps/api`
3. run `now`
4. remember app deployment URL (each deployment is unique and does not affect previous deployment of the same app)

### Building and deploying react client app

1. go to `/apps/api`
1. run `now`
1. remember app deployment URL (each deployment is unique and does not affect previous deployment of the same app)

### Bringing app/apps deployment to prod (or other envs)

This requires updates (changing and deploying) of gateway (router) config, follow steps below

1. go to `/routing-rules.json`
1. change `dest` value of target app/apps to remembered deployment URL (see steps above), save updates
1. run `now alias dntsc.now.sh -r routing-rules.json` - this will bring target deployments to prod env (domain name)

## Creating platform owner

For now platform owners are to be created manually.

1. run `node ./apps/api/generate-password-hash.js <desired password>` passing desired platform owner password as argument; this will print password hash - copy and save it somewhere to use in next steps
2. make sure API app was at least once successfully built and launched on target env (DB with schemas are created automatically after app first launch, we need those to exist when creating platform owner)
3. connect to mongo directly (for dev env run `docker ps`, remember ID of mongo container, then run `docker exec -it <ID of mongo container> bash`, now you are in mongo container terminal, finally run `mongo`)
4. run `use <app DB name>` (use your own DB name that is specified in .env file, default dev DB name is `dntsc-v1`)
5. run `db.Employees.insert({name: '<desired name>', isActive: true, login: '<desired login>', roles: ['_PLATFORM_OWNER'], password: '<remembered password hash>'})` (pass your own name, login and remembered password hash)
