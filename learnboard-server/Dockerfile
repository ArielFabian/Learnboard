# Establecer la imagen base
FROM nikolaik/python-nodejs:latest

USER root
WORKDIR /home/pn/app

# Instalar dependencias necesarias para OpenCV y Tesseract
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    tesseract-ocr

# Copiar los archivos de la aplicación al contenedor
COPY package.json package-lock.json /home/pn/app/

# Cambiar los permisos del archivo package-lock.json
RUN chown -R pn:pn /home/pn/app

# Cambiar al usuario pn
USER pn

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación al contenedor
COPY . /home/pn/app

# Cambiar los permisos del directorio donde se guardará la imagen temporal
USER root
RUN mkdir -p /home/pn/app/src/app/controllers && \
    chown -R pn:pn /home/pn/app/src/app/controllers && \
    chmod -R 755 /home/pn/app/src/app/controllers

# Cambiar al usuario pn nuevamente
USER pn

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 8000

# Instalar las dependencias de Python
RUN pip install pytesseract opencv-python

# Comando para iniciar la aplicación
CMD ["npm", "start"]