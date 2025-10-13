# Imagen base ligera
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar package.json primero para instalar dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY src/ ./src/

# Exponer puerto 3000
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
