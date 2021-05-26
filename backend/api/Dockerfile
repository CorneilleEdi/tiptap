FROM node:14-alpine as builder

RUN  apk add curl bash

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

USER node

WORKDIR /home/node

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . /home/node/

RUN yarn build

RUN rm -rf /home/node/dist/apps/worker

RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

# remove unused dependencies
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/
RUN rm -rf node_modules/swagger-ui-dist/*.map

# ---

FROM node:14-alpine

USER node
WORKDIR /home/node
ARG APP_NAME
ENV APP_NAME=${APP_NAME}

ENV APP_STAGE=production
ENV RUNNING_ENVIRONMENT=cloud
ARG APP_VERSION
ENV APP_VERSION=${APP_VERSION}

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/yarn.lock /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/


CMD ["node", "dist/main.js"]