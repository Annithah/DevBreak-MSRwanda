# Frontend Build Stage
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Backend Stage
FROM node:18-alpine
WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy backend source
COPY backend/ ./

# Copy frontend build
COPY --from=frontend-build /app/frontend/build ./public

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S medihub -u 1001
USER medihub

EXPOSE 5000

CMD ["node", "server.js"]