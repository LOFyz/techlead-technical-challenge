FROM node:20-slim AS builder
ARG APP_NAME
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install --frozen-lockfile
RUN npx nx build ${APP_NAME}

FROM node:20-slim
ARG APP_NAME
WORKDIR /app
COPY --from=builder /app/dist/apps/${APP_NAME} .
# Copy only production dependencies if possible, or all for simplicity in this challenge
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "main.js"]
