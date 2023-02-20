FROM node:18.13.0-alpine3.17 AS base

FROM base AS deps_app
WORKDIR /deps_app
COPY package.json .
RUN apk add --no-cache python3 g++ make git
RUN npm install --omit=dev

FROM base AS deps_builder
WORKDIR /deps_builder
COPY --from=deps_app /deps_app/node_modules ./node_modules
COPY package.json .
RUN apk add --no-cache python3 g++ make git
RUN npm install --include=dev

FROM base AS builder
WORKDIR /builder
COPY --from=deps_builder /deps_builder/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS app
WORKDIR /app
COPY --from=deps_app /deps_app/node_modules ./node_modules
COPY --from=builder /builder/dist ./dist
COPY ./.env ./.env
ENV PORT=8080
EXPOSE 8080
CMD ["node", "dist/index.js"]
