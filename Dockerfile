FROM node:18-alpine AS base

# Build the source code
FROM base AS builder
RUN apk add --no-cache bash git libc6-compat

# Add build dependencies for HNSWLib
ENV PYTHONUNBUFFERED=1
RUN apk add --no-cache make g++
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
#RUN mkdir .next
#RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/main.sh .
COPY --from=builder --chown=nextjs:nodejs /app/packages/react-docs/.next/standalone .
COPY --from=builder --chown=nextjs:nodejs /app/packages/react-docs/.next/static ./packages/react-docs/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/packages/react-docs/public ./packages/react-docs/public

USER root

EXPOSE 80

ENV PORT 80
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# Make script executable
RUN chmod +x main.sh

# Run script
CMD ["./main.sh"]
