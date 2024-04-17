# Establecer la imagen base
FROM node:20.9.0

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos del paquete.json y paquete-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "npm", "run", "start" ]