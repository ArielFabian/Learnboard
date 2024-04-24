# Establecer la imagen base
FROM node:20.9.0

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos del paquete.json y paquete-lock.json
COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app

# Instalar las dependencias del proyecto
RUN npm install

# Construir la aplicación
RUN npm run build

# Comando para iniciar la aplicación
RUN npm run start
# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

