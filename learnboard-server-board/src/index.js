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
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos, si tienes una carpeta `public` para el frontend
app.use(express.static('public'));

// Evento de conexión
io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  // Escuchar evento de inicio de dibujo
  socket.on('start-drawing', (data) => {
    // Retransmitir el evento a otros clientes
    console.log('start-drawing', data);
    socket.broadcast.emit('start-drawing', data);
  });

  // Escuchar evento de datos de dibujo en tiempo real
  socket.on('drawing-data', (data) => {
    // Retransmitir el evento a otros clientes
    socket.broadcast.emit('drawing-data', data);
  });
  socket.on('move-object', (data) => {
    // Retransmitir el evento a otros clientes
    socket.broadcast.emit('move-object', data);
  });

  // Escuchar evento de finalización de dibujo
  socket.on('stop-drawing', (data) => {
    console.log('stop-drawing', data);
    // Retransmitir el evento a otros clientes
    socket.broadcast.emit('stop-drawing', data);
  });

  // Evento de desconexión
  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});

// Iniciar el servidor
server.listen(4000, () => {
  console.log(`Servidor WebSocket escuchando en el puerto ${4000}`);
});
