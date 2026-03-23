FROM node:22.19.0-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . ./
RUN yarn build

FROM node:22.19.0-alpine AS runner

RUN apk add --no-cache \
    curl \
    openssl \
    ca-certificates

WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production=true && \
    yarn cache clean

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]