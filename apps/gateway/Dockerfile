FROM node:20-slim AS builder
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install --frozen-lockfile
RUN npx nx build gateway

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/dist/apps/gateway .
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 4000
CMD ["node", "main.js"]
