# Stage 1: Install dependencies
FROM node:lts-alpine AS install
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Stage 2: Compile source files
FROM node:lts-alpine AS transpile
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm install
COPY src ./src
RUN npm run build

# Stage 3: Build
FROM node:lts-alpine AS build
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

USER node

COPY --chown=node:node --from=install /app/package.json ./
COPY --chown=node:node --from=install /app/node_modules ./node_modules
COPY --chown=node:node --from=transpile /app/dist ./dist

EXPOSE 3000

CMD [ "npm", "start" ]
