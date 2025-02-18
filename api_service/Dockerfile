# ---------------------------
# 1. BUILDER STAGE
# ---------------------------
FROM node:18 AS builder

WORKDIR /usr/src/app

# Copy package.json / package-lock.json (or yarn.lock)
COPY package*.json ./

# Install ALL dependencies (including dev deps for building)
RUN npm install

# Copy the rest of your source code
COPY . .

# Build (e.g., compile TypeScript -> dist/)
RUN npm run build


# ---------------------------
# 2. PRODUCTION (RUNTIME) STAGE
# ---------------------------
FROM node:18-alpine AS runtime

WORKDIR /usr/src/app

# Copy only the dist folder (compiled code) from builder
COPY --from=builder /usr/src/app/dist ./dist

# Copy package.json again to install ONLY production deps
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

EXPOSE 3001

# If your "start" script is "node dist/index.js", use that
CMD ["npm", "start"]
