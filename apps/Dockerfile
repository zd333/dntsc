# This image is for running project (API + client) as single Heroku app

FROM mhart/alpine-node:10 as base

# Copy apps sources
WORKDIR /usr/src/
COPY . .

# Build apps
WORKDIR /usr/src/react-client
RUN yarn
RUN yarn build
WORKDIR /usr/src/api
RUN yarn
RUN yarn run build


FROM mhart/alpine-node:10

# Copy builds of apps
WORKDIR /usr/src
COPY --from=base /usr/src/react-client/build ./react-client/build
COPY --from=base /usr/src/react-client/node_modules ./react-client/node_modules
COPY --from=base /usr/src/api/dist ./api/dist
COPY --from=base /usr/src/api/node_modules ./api/node_modules

# Start API app
WORKDIR /usr/src/api/dist
CMD ["node", "main.js"]
