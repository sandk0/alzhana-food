FROM node:20.2.0-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /

COPY package.json package-lock.json ./
RUN  npm install --production

FROM node:20.2.0-alpine AS builder
WORKDIR /
COPY --from=deps ./node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:20.2.0-alpine AS runner
WORKDIR /

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs ./.next ./.next
COPY --from=builder ./node_modules ./node_modules
COPY --from=builder ./package.json ./package.json

USER nextjs

EXPOSE 5555

ENV PORT 5555

CMD ["npm", "start"]