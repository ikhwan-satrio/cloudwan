FROM docker.io/oven/bun:1-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM deps AS build
COPY . .

ARG PUBLIC_SUPABASE_URL
ARG PUBLIC_SUPABASE_PUBLISHABLE_KEY
ARG SUPABASE_SERVICE_ROLE_KEY
RUN bun run build
RUN rm -rf node_modules

FROM deps AS prod-deps
RUN bun install --production --frozen-lockfile

ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./

USER bun

EXPOSE 3000
CMD ["bun", "run", "build/index.js"]
