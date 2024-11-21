const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Permitir conexión desde cualquier origen. Modifica según tu entorno.
  },
});

// Puerto del servidor
const PORT = process.env.PORT || 4000;

// Middleware para servir archivos estáticos, si tienes una carpeta `public` para el frontend
app.use(express.static('public'));

// Evento de conexión
io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  // Escuchar evento para unirse a una sala específica (canvasId)
  socket.on('join-canvas', (canvasId) => {
    if (canvasId) {
      socket.join(canvasId); // Unir el socket a la sala del canvas
      console.log(`Usuario ${socket.id} se unió a la sala del canvas: ${canvasId}`);
    }
  });

  // Escuchar evento de inicio de dibujo
  socket.on('start-drawing', (data) => {
  const { canvasId } = data; // El ID del canvas debe estar incluido en los datos
  console.log(data);
  if (canvasId) {
      console.log(`start-drawing en canvas ${canvasId}`, data);
      // Enviar el evento solo a la sala específica
      //quitar el canvasId del objeto data para que no se envie a todos los usuarios
      delete data.canvasId;
      socket.to(canvasId).emit('start-drawing', data);
      
    }
  });

  // Escuchar evento de datos de dibujo en tiempo real
  socket.on('drawing-data', (data) => {
    const { canvasId } = data;
    if (canvasId) {
      socket.to(canvasId).emit('drawing-data', data);
    }
  });

  // Escuchar evento de movimiento de objetos
  socket.on('move-object', (data) => {
    const { canvasId } = data;
    if (canvasId) {
      socket.to(canvasId).emit('move-object', data);
    }
  });

  // Escuchar evento de finalización de dibujo
  socket.on('stop-drawing', (data) => {
    const { canvasId } = data;
    if (canvasId) {
      console.log(`stop-drawing en canvas ${canvasId}`, data);
      socket.to(canvasId).emit('stop-drawing', data);
    }
  });

  // Evento de desconexión
  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });

   // Manejar actualización de imagen procesada
   socket.on('update-image', (data) => {
    console.log(`Actualización de imagen en canvas ${data.canvasId}`);
    socket.to(data.canvasId).emit('update-image', data);
  });
  // Manejar actualizaciones de objetos
  socket.on('update-object', (data) => {
    const { canvasId, id, updates } = data;
    console.log(`Actualizar objeto ${id} en canvas ${canvasId}:`, updates);

    // Emitir la actualización a todos los sockets en el mismo canvas excepto al emisor
    socket.to(canvasId).emit('update-object', { id, updates, canvasId });
  });
  // Manejar actualización de LaTeX procesado
  socket.on('update-latex', (data) => {
    console.log(`Actualización de LaTeX en canvas ${data.canvasId}`);
    socket.to(data.canvasId).emit('update-latex', data);
  });

    // Escuchar evento de eliminación y retransmitir
    socket.on('delete-object', (data) => {
      console.log(`Eliminando objeto ${data.id} en canvas ${data.canvasId}`);
      socket.broadcast.emit('delete-object', data); // Retransmite el evento
    });

});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
});
