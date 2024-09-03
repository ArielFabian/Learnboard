// src/app/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const userRoutes = require('./routes/userRoutes');
const colabRoutes = require('./routes/colabSpacesRoutes');
const modelRoutes = require('./routes/modelRoutes');

// Configuración del servidor HTTP
const server = http.createServer(app);

// Configuración de socket.io
const io = new Server(server, {
  cors: {
    origin: '*',  // Permitir todas las conexiones de origen (esto es solo para pruebas)
    methods: ['GET', 'POST'],
  }
});
app.use(express.json());

app.use('/users', userRoutes);
app.use('/colabs', colabRoutes);
app.use('/model', modelRoutes);

// Manejar conexiones de socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Unirse a una sala específica
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`Cliente unido a la sala: ${roomId}`);
  });

  // Escuchar cambios de texto del cliente y transmitirlos solo a la sala específica
  socket.on('text-change', (roomId, text) => {
    // Emitir cambios solo a los otros clientes en la misma sala
    socket.to(roomId).emit('text-change', text); // Asegúrate de que solo se envía a la sala correspondiente
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
