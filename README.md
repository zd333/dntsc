# dntsc

Set of apps coupled with [zeit.co](https://zeit.co).

## Installation

Install Node and Yarn.

## Running locally (in dev mode)

1. prepare `.env` file with development configuration values; this file is gitignored, use `.env-example` as example
2. run `yarn --cwd ./apps/react-client run start`
3. (in another terminal) run `yarn --cwd ./apps/api run start:dev`

API will be available under [localhost:4000](localhost:4000).
React client will be available under [localhost:3000](localhost:3000).
Apps will refresh/reload automatically after you make changes to source code.

## Building and deploying

### Building and deploying API app

1. prepare `/apps/api/.env.prod` file with production configuration values; this file is gitignored, use `/apps/api/.env-example` as example
1. go to `/apps/api`
1. run `now`
1. remember app deployment URL (each deployment is unique and does not affect previous deployment of the same app)

### Building and deploying react client app

1. go to `/apps/api`
1. run `now`
1. remember app deployment URL (each deployment is unique and does not affect previous deployment of the same app)

### Bringing app/apps deployment to prod (or other envs)

This requires updates (changing and deploying) of gateway (router) config, follow steps below

1. go to `/routing-rules.json`
1. change `dest` value of target app/apps to remembered deployment URL (see steps above), save updates
1. run `now alias dntsc.now.sh -r routing-rules.json` - this will bring target deployments to prod env (domain name)
