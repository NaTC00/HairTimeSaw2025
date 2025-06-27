# Step 1: Build dell'app
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

# Prendi la variabile in fase di build
ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL

RUN npm install
RUN API_BASE_URL=$API_BASE_URL npm run build

# Step 2: Serve i file statici con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
