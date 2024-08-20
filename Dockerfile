# Stage 1: Build the Next.js application
FROM node:lts-slim AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Create the production image with only the necessary files
FROM node:lts-slim AS runner

# Set working directory
WORKDIR /app

# Copy the production dependencies from the build stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the Next.js build output and other necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/scripts ./scripts

RUN apk update && apk add --no-cache \
    libssl1.1 \
    && npm install -g prisma

# Set environment variable to run in production mode
ENV NODE_ENV=production

# Expose the port that Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["./scripts/start.sh"]