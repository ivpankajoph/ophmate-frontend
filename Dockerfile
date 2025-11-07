# ==========================
# Stage 1 — Build the app
# ==========================
FROM node:20-alpine AS builder

# Create working directory
WORKDIR /app

# Copy package files first (for efficient caching)
COPY package*.json ./

# Install only production + build dependencies
RUN npm ci

# Copy rest of the app
COPY . .

# Build the Next.js app for production
RUN npm run build

# ==========================
# Stage 2 — Run the app
# ==========================
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only what's needed to run
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Environment setup
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Start the production server
CMD ["npm", "start"]
