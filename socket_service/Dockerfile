# ---------------------------
# 1. BUILDER STAGE
# ---------------------------
FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# ---------------------------
# 2. PRODUCTION (RUNTIME) STAGE
# ---------------------------
FROM node:18-alpine AS runtime

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist

COPY package*.json ./
RUN npm install --omit=dev

EXPOSE 3002

CMD ["npm", "start"]
