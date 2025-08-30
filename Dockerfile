# Stage 1: Build
FROM node:20-alpine AS build

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json primero para aprovechar cache
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Build de producción
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copiar build al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuración de Nginx personalizada si quieres (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]