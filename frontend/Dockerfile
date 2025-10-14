# Imagen base: Nginx ligera
FROM nginx:alpine

# Copiar configuración personalizada
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar todo el contenido del frontend al directorio de Nginx
COPY . /usr/share/nginx/html

EXPOSE 80
