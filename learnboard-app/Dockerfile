# Establecer la imagen base
FROM nextjs:latest
# Establecer el directorio de trabajo en el contenedor
WORKDIR /app
# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000
# Copiar los archivos del paquete.json y paquete-lock.json
COPY . /app

# Instalar las dependencias del proyecto
RUN npm install

# Construir la aplicación
RUN npm run build

# Comando para iniciar la aplicación
RUN npm run start


