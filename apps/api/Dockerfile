FROM mhart/alpine-node:10 as base
WORKDIR /usr/src
COPY package.json yarn.lock /usr/src/
RUN yarn
COPY . .
RUN yarn run build

FROM mhart/alpine-node:base-10
WORKDIR /usr/src
COPY --from=base /usr/src/dist .
COPY --from=base /usr/src/node_modules ./node_modules
CMD ["node", "main.js"]
