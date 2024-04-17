# Establecer la imagen base
FROM node:20.9.0

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de la aplicación al contenedor
COPY package.json package-lock.json /app/

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación al contenedor
COPY . /app

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 8000

# Comando para iniciar la aplicación
CMD ["npm", "start"]