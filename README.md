# dntsc

Set of apps coupled with [zeit.co](https://zeit.co).
This is to be refactored to gateway (routing) app if migrating from [zeit.co](https://zeit.co).

## How to deploy specific app

- go to app folder (`/apps/<particular app folder>`)
- deploy the app with `now` command (follow app-specific instructions in app's readme file if any)
- remember app deployment URL

Each deployment is unique and does not affect previous deployment of the same app.
To bring your app deployment to prod - you need to update (change and deploy) gateway (router) config, follow steps below:

- go to `/rules.json`
- change `dest` value of target app to remembered app deployment URL (see steps above) and save
- run `now alias dntsc.now.sh -r routing-rules.json`
