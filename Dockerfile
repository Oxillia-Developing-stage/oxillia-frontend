# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL deps (including devDeps needed for NX build)
RUN npm ci

# Copy source
COPY . .

# Disable NX daemon (required for CI/container environments)
ENV NX_DAEMON=false

# Build the ecommerce app
RUN npx nx build ecommerce --configuration=production

# ---- Runtime Stage ----
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built output from builder
COPY --from=builder /app/dist/apps/ecommerce ./dist/apps/ecommerce

EXPOSE 4000

ENV NODE_ENV=production
ENV PORT=4000

CMD ["node", "dist/apps/ecommerce/server/server.mjs"]
