# Step 1: Build dell'app
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve i file statici con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Rimuovi la conf di default (opzionale)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
