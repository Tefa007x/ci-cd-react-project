#########################################
# Stage 1: Build
#########################################
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


#########################################
# Stage 2: Runtime (serve static)
#########################################
FROM node:22-alpine

WORKDIR /app

# Install 'serve' globally to serve static files
RUN npm install -g serve

# Copy only build output
COPY --from=builder /app/dist ./dist

USER node

EXPOSE 5000

CMD ["serve", "-s", "dist", "-l", "5000"]
