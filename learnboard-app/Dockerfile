# Establecer la imagen base
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos del package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar las dependencias del proyecto con --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "dev"]