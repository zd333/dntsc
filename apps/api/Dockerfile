FROM mhart/alpine-node:10 as base

WORKDIR /usr/src
COPY package.json yarn.lock /usr/src/
#TODO: fix docker flow and remove base tsconfig duplicate
# See this https://www.jamestharpe.com/include-files-outside-docker-build-context/
COPY tsconfig-base.json /usr/

RUN yarn

COPY . .
RUN yarn run build

FROM mhart/alpine-node:10
WORKDIR /usr/src
COPY --from=base /usr/src/dist .
COPY --from=base /usr/src/node_modules ./node_modules
CMD ["node", "main.js"]
